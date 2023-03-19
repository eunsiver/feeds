const fetch = require("node-fetch");
const fs = require("fs").promises;

const USER_NAME = "YOUR_GITHUB_USERNAME";
const REPO_NAME = "YOUR_REPO_NAME";
const MAX_POSTS = 8;
const MD_FILE_PATH = "README.md";

const generateMarkdown = (data) => {
  let content = "";

  data.forEach((post) => {
    content += `- [${post.title}](${post.link})\n`;
  });

  return content;
};

const getPosts = async () => {
  const response = await fetch(
    `https://api.github.com/repos/${USER_NAME}/${REPO_NAME}/contents`
  );
  const contents = await response.json();
  const folders = contents.filter((c) => c.type === "dir");

  const posts = [];

  for (let i = 0; i < folders.length; i++) {
    const folderName = folders[i].name;
    const response = await fetch(
      `https://api.github.com/repos/${USER_NAME}/${REPO_NAME}/contents/${folderName}`
    );
    const contents = await response.json();
    const mdFiles = contents.filter(
      (c) => c.type === "file" && c.name.endsWith(".md")
    );

    for (let j = 0; j < mdFiles.length; j++) {
      const mdFile = mdFiles[j];
      const mdContentResponse = await fetch(mdFile.download_url);
      const mdContent = await mdContentResponse.text();

      const regex = /^#\s+(.*)\s+[\r\n]/gm;
      const matches = regex.exec(mdContent);
      const title = matches ? matches[1] : "";

      const post = {
        title,
        link: mdFile.html_url,
        created_at: mdFile.created_at,
      };

      posts.push(post);
    }
  }

  posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return posts.slice(0, MAX_POSTS);
};

const updateReadme = async () => {
  const posts = await getPosts();
  const markdownContent = generateMarkdown(posts);
  const mdFile = await fs.readFile(MD_FILE_PATH, "utf8");
  const startToken = "<!-- START_SECTION:latest-posts -->";
  const endToken = "<!-- END_SECTION:latest-posts -->";
  const startIndex = mdFile.indexOf(startToken) + startToken.length;
  const endIndex = mdFile.indexOf(endToken);
  const newMdContent = `${mdFile.slice(0, startIndex)}\n${markdownContent}\n${mdFile.slice(endIndex)
}`;

await fs.writeFile(MD_FILE_PATH, newMdContent, "utf8");

