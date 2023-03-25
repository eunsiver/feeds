테스트 코드를 작성하다가 궁금함이 생겨서 이것저것 찾아본 결과를 정리한다.

img 태그를 검증하고 싶은데 이걸 어떻게 검증을 할 수 있을지에 대한 궁금함이었다. 찾아보니 document.querySelector을 사용해서 img 태그에 접근을 했다. 여기서 든 첫 번째 의문은 'react jsx에 대한 테스트인데 document로 접근하는 것이 과연 최선의 선택일까?'였다. 그에 대한 문제는 아래와 같은 에러로 어느 정도 확인이 됐다.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c3311ab5-ee29-4076-be34-d081dd4a79e0/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230321T154917Z&X-Amz-Expires=86400&X-Amz-Signature=eec2156a6207cf203258ce1905c9aa97d50cc269cff297faa9f481c71c71f3f0&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

> 노드에 직접적인 접근은 피하세요. Testing Library의 메소드를 사용해 주세요.

그래서 다른 방법으로 container를 써볼까 했다. render 메소드를 이용해서 렌더링을 하고 나면 HTML Element를 가지는 container를 반환하는데 method들도 다 가지고 있으니 testing library를 통한 접근이 아닐까 하는 생각이 들었다.

하지만 이 방법 역시 다음과 같은 에러가 발생했다.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/15161ac3-2fe5-4482-9fe4-c1292975c82b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230321T155437Z&X-Amz-Expires=86400&X-Amz-Signature=e0a7873986ef926e2d808e5408aac53b3fd0501300771e16ba47e29229567e7a&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

여기서는 container를 사용하는 것도 피하라고 했다. 아마 같은 이유였던 것 같다. 결국에는 HTML에 직접 접근하는 것으로 판단하는 것 같았다. 여기서는 getByRole()와 같은 메소드를 사용하길 권장했다.

하지만 getByRole()을 사용 해보니 다음과 같은 에러가 발생했다.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/283cac58-a6b0-4db9-9f37-6116bddf9920/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230321T155809Z&X-Amz-Expires=86400&X-Amz-Signature=fae7512dcd6b485c286fd38f7362862d81daec835f80ca1fd83abc51e7738e01&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
여기서 Screen이라는 친구를 처음 봤다. 이쯤 되니 '굳이 screen을 왜 거쳐야 할까?'에 대해서 궁금해졌다.

testing-library 문서를 확인해 보니 Queries 항목에 있었다. Queries는 뭘까?

> Queries는 페이지에서 Testing Library가 당신에게 elements를 찾을 수 있게 해주는 메소드 입니다.

그리고 Screen은 다음과 같은 설명이 있었다.

> DOM Testing Library에서 exports되는 모든 메소드들은 첫 번째 arguments로 container를 받습니다. 왜냐하면 전체 document.body를 조회하는 것은 매우 흔한데, DOM Testing Library는 또한 document.body에 미리 바인딩 된 모든 query를 가진 screen을 exports 합니다.

이것만 보고는 의문이 확실히 가시지 않았다. testing-library의 github을 보고도 100% 납득되진 않았다.

> 이 규칙은 render 결과로부터 구조분해를 하는 것 보다 screen 객체로부터 직접 빌트인 queries 메소드들을 사용해서 테스트를 작성하는 것을 강제하는 목적을 가지고 있습니다.

## **'왜 그렇게 강제를 하는 것일까?'**

이 부분이 결국은 해소가 되지 않아서 chatGPT에게 물어봤다. gpt는 두 가지 측면에서 사용하는 것이 추천된다고 했다.

> Q. getByRole()과 같은 메소드로 바로 접근이 가능한데 왜 screen이라는 object를 거쳐야 할까요?
>
> A. 두 가지 이유가 크게 있습니다. 안정성 문제와 가독성의 측면 입니다.
> screen object는 테스트 환경에서 DOM과 함께 작동하기 쉽게 만들어 줍니다.
> screen.getByRole()을 사용하는 것은 getByRole()을 사용하는 것 보다 추가적인 기능을 제공합니다. screen은 그 페이지가 나타날 때까지 기다리는 방법을 제공하고 이는 비동기적인 행동을 테스트 하는 것에서 중요한 부분입니다. 추가적으로 screen을 사용하는 것은 테스트 환경에서 중복 queries를 관리하기 더 쉽게 만들어 주고, 더 읽기 좋고 관리하기 좋은 테스트 코드를 작성할 수 있습니다.

기능적인 차이는 앞에 있는 부분에서 알 수 있었다. 차이는 screen을 거치면 페이지가 나타날 때까지 기다린다는 것과 그 결과 비동기적인 부분에서 확실한 테스트를 보장한다는 것이다.

# 마무리

궁금해서 찾아보고 다 영어라서 해석하다 보니 시간이 꽤나 걸렸지만 정답을 chatGPT에서 얻어서 살짝 서운했달까?.. 그래도 덕분에 이것저것 읽어 보면서 배울 수 있는 시간이 되었다. 또 결국엔 답을 찾았기 때문에 '그래서 뭐가 다른데?'라는 생각으로 끝까지 물어 뜯은 보람이 있었다.

그리고 찾은 결과들을 바탕으로 작성을 하니 테스트가 잘 통과했다!

```ts
describe('Welcome', () => {
  describe('유저가 로그인을 안했을 경우', () => {
    it('타이틀과 로그인 버튼을 렌더링 한다.', () => {
      const { container } = render(
        <div>
          <h1>EXTREME TODO</h1>
          <div>
            <img
              src="../../public/2x/btn_google_signin_dark_pressed_web@2x.png"
              alt="google login button"
            ></img>
          </div>
        </div>
      );

      const googleImage = screen.getByAltText(
        /google login button/i
      ) as HTMLImageElement;

      expect(container).toHaveTextContent('EXTREME TODO');
      expect(googleImage.src).toContain('btn_google_signin');
    });
  });
});
```

![](https://velog.velcdn.com/images/ferrari_roma/post/f454af61-82e7-4258-a7f5-0ec2f9d85afb/image.png)

<참고자료>
https://medium.com/@drake_beth/how-to-test-images-in-react-a70053b1634a

https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-screen-queries.md

https://testing-library.com/docs/queries/about/#screen

<span style="background-color:rgba(0,0,0,0.2);padding:0.2rem;font-size:1rem;border-radius:5px"></span>
