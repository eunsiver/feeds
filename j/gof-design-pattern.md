# [Kotlin] GoF 디자인패턴 by 코틀린
잘 짜여진 코드를 작성하고 싶다..

## 디자인 패턴

디자인 패턴은 개발을 처음 시작할 때부터 들었던 것 같다. 부트캠프에 들어가기 전에 면접에서 나왔던 키워드이기도 하지만, 개발에 이제 막 발을 딛기 시작했던 그때의 나는 디자인 패턴은 커녕 파이썬의 반복문 하나도 제대로 못 짜던 사람이었으니 눈에 들어왔으리가 전무하다.

어느덧 제대로 된 개발을 시작한 지는 1년이 조금 넘은 것 같다. 스프링을 처음 접한 건 작년 5월쯤이었으니 얼추 그 정도 된 것 같다. 그런 본인이 디자인 패턴에 대한 키워드를 가지고 포스팅을 하려는 이유는 뭘까

1. 내가 짠 코드가 얼마나 지저분한지 모르고 있었다는 점

2. 코드에도 미의 기준이 있다는 점

처음 개발을 시작했을 때 남에게 코드를 보여주기도 부끄러워서 리뷰 받기를 꺼려했었고 스스로 길을 개척해서 나아간다는 느낌으로 달려왔지만 지금은 되게 후회스럽기 그지없다. 그냥 돌아가는 코드에 만족하고, 코드 라인마다 적당히 칸 맞추고, 들여쓰기를 한 후에 주석만 잘 작성해도 반은 가겠지라는 생각에서부터 시작된 것 같은데 껍데기만 깔끔하게 유지하기 위해 달려온 시간들이 아까울 지경이다.

그래서 좀 더 기능적인 쪽으로 초점을 두고 파고 들기로 마음 먹었다. 집에 묵혀뒀던 이펙티브 자바, 모던 인 자바 액션, 클린 코드 등 앞으로 블로그를 통해 하나씩 정리해보려고 한다. 이펙티브 자바의 경우 Github에 Study 자료들이 잘 돼있어서 참고하기 너무 좋더라.

그러면 본론으로 들어가기 전에 어떤 디자인 패턴이 있으며, 어떤 디자인 패턴부터 공부를 하는 게 좋을까에 대한 이야기를 해보려고 한다.

GoF(Gang of Four)라는 책을 혹시 들어봤을지 모르겠다. 소프트웨어 설계에 있어 공통된 문제들에 대한 표준적인 해법과 작명법을 제안한 책인데, 이 분야의 사인방으로 불리는 에리히 감마, 리처드 헬름, 랄프 존슨, 존 블리시데스가 같이 썼다고 한다.

이 디자인 패턴 책에서 제안하는 23가지 패턴 중에 대표적인 7개 정도만 공부해도 지금 당장은 충분하지 않을까 생각한다. 공부 순서 또한 난이도를 고려하여 쉬운 패턴부터 공부하는 게 좋지 않을까 생각이 든다.

## 카테고리
GoF에서는 디자인 패턴을 아래와 같은 카테고리로 분류한다.

[1] 생성 패턴
객체 생성과 관련된 문제를 해결하기 위한 패턴

[2] 구조 패턴
클래스와 객체를 조합하여 더 큰 구조를 만들기 위한 패턴

[3] 행동 패턴
객체들이 상호작용하며 작업을 처리하는 방식과 관련된 패턴

## 디자인 패턴 종류
사실 위와 같이 카테고리만 봐서는 대체 어떤 걸 말하는지 감이 안 잡힐 것이다. 분류를 통해 무엇이 있는지 확인해보고 구현을 통해서 감을 잡아보자 !

예제를 통한 학습이 필수라는 점 인지할 것 & 모든 코드는 Kotlin 코드 기준

## Singleton
Singleton 패턴의 경우에는 아마 제일 많이 들어본 패턴이지 않을까 싶다. Spring에서도 기본적으로 Bean을 Singleton패턴으로 생성하고 있는데, 쉽다고 생각이 들면서도 만만치 않은 개념이었던 것 같다.

    object Singleton{//object는 Singleton 객체로 만들어준다. 주의할 점은 class가 안 붙는다는 것
      doSomthing(){
        print("Doing something in Singleton!")
      }
    }
코드를 보면 뭐지 싶겠지만 코틀린이라서 이렇게 간결한 것이다. 비교를 위해서 Java 코드를 작성해보겠다.

    public class Singleton{

    public static SingleTon singleTon;

    private SingleTon(){}

    public SingleTon getInstance() {
          if(singleTon == null){
              singleTon = new SingleTon();
          }
          return singleTon;
      }
    }
위를 보면, 생성자가 private으로 막혀있고, 하나의 인스턴스만 생성을 해서 static하게 쓰는 것이라고 보면 된다. 이렇게 클래스를 정의하면, 인스턴스 생성은 제한되면서 하나의 인스턴스만 getInstance()를 해서 사용할 수 있게 된다. 값의 수정은 상황에 따라 제한하면 되기 때문에 입맛에 맞게 쓰자

## Factory
아마 이펙티브 자바였던 것 같다. 제일 처음에 나오는 아이템이 팩토리였던 걸로 기억하고 있는데, 기존의 생성자 타입으로 인스턴스를 생성하는 방식에서 오는 불편함을 조금이나마 해소하고자 나온 게 아닐까 싶다.

프로그램을 실행하는 시점에서 로드되는 플러그인이나 모듈이 있을 때 객체들의 타입을 사전에 알 수 없는 상황이 발생하게 될 수도 있는데, 그러한 상황을 방지하고 싶을 때 Facotry 패턴을 구현하고 인자만 입력 받으면 그에 맞는 인스턴스를 생성줄 수 있게 된다.

여기서 런타임 시점까지 객체를 알 수 없는 경우라는 것은 예를 들어 객체의 타입이 동적으로 결정되는 경우라던지의 경우를 말하는데 아래의 코드로 예를 들어보겠다.

    // 정적 타입
    class Ex{
        var list: MutableList = mutableOf()...
    }
위의 코드 경우에는, 컴파일 시점에 이미 MutableList라는 타입이 정해지게 된다. 그래서 런타임(쉽게 말하면 main메서드에 작성하는 시점)해당 list를 사용하려고 하면 항상 MutableList를 써야하게 되는 것이다.

이때, Factory를 만들어서 사용하면, main메서드를 작성하는 시점에 이미 구현되어 있는 코드를 수정할 필요 없이 원하는 객체를 만들어주는 Factory를 가지고 생성만 하면 된다.

    interface Animals {
      fun eat()
    }

    class Dog: Animals {
      override fun eat(){
        println("Eat some feeds")
      }
    }

    class Cat: Animals {
      override fun eat(){
        println("Eat some chao")
      }
    }

    class AnimalsFactory{

      fun callAnimals(type: String): Animals{
        return when(type){
            "cat" -> Cat()
            "dog" -> Dog()
            else -> throw IllegalArgumentException("Invalid Type")
        }
      }
    }

    // 동적 타입 -> 컴파일 시점에 dog인지 cat인지 선택을 하지 않고 런타임 시점에 선택 -> 다형성 이용
    fun main(){

      var factory = AnimalsFactory()
      var dog: Animals = factory.callAnimals("dog") // Cat 인스턴스를 만들고 싶을 땐 기존의 코드 수정 없이 "cat"을 주입하면 됨 + 타입 생략 가능
      dog.eat()

    }
이렇게 추가만 하면 되니 유지보수나 확장성 측면에선 매우 효율적인 코드를 작성할 수 있게 된다. 처음이라 안 익숙할테지만 여러 번 써보면서 체득하자 !

## Observer
Observer 패턴은 개체 간 일대다 종속성을 정의한다. 그래서 개체 하나가 변경되면 모든 종속 개체에게 알림이 가게 되고 업데이트가 된다. 느슨하게 결합된 개체들 간의 통신이 필요한 경우 사용하면 될 듯하다.

본인은 정말 가끔 가다가 한 번씩 들어본 패턴인 것 같은데 우선 예시코드를 먼저 보고 나머지를 이야기하면 좋을 것 같다.

    package com.many.affection.group.entity

    interface Observer {
        fun update(subject: Subject)
    }

    class Subject {

        var observers = mutableListOf<Observer>()

        fun attach(observer: Observer) {
            observers.add(observer)
        }

        fun detach(observer: Observer) {
            observers.remove(observer)
        }

        fun notifyObservers() {
            for (observer in observers) {
                observer.update(this)
            }
        }

        fun doSomething() {
            println("Doing something in Subject!")
            notifyObservers()
        }
    }

    class ConcreteObserver : Observer {
        override fun update(subject: Subject){
            println("Subject state changed")
        }
    }

    fun main() {
        var concretObserver = ConcreteObserver()
        var subject = Subject()

        subject.attach(concretObserver)
        subject.notifyObservers() // "Subject state changed" 출력
    }
코드가 그렇게 어렵지 않으니 이해하기 수월할 것이다. 알림을 받는 쪽과 보내는 쪽으로 나누고, 개체가 추가적으로 더 생길 것을 고려해서 인터페이스로 구현 및 MutableList를 통한 개체 관리를 하는 코드인데, 본인 같은 초보 개발자는 이런 거 실제로 쓸 생각도 못하지 않을까…적인 일반화를 해보려고 한다. 객체지향적인 사고와 추상화에 대한 이해도가 어느 정도는 있어야 실전에서도 써먹을 수 있지 않을까 싶다.

## Decorator
이름만 봐도 뭔가 메인은 아니고 사이드에 덧붙여서 사용될 것 같은 느낌이 들지 않는가,, Decorator 패턴이 그런 패턴이다. 예를 들어 eat()메서드가 있고, 밥을 다 먹고 난 후에 밥 다 먹었어요 라고 println으로 전달하고 싶은 경우에 쓸 수 있을 것 같다.

    interface Component{
        fun eat()
    }

    class ConcreteComponent: Component{

        override fun eat(){
            println("Eating some foods!")
        }
    }

    class Decorator(var component: Component): Component{
        override fun eat(){
            comopnent.eat()
            println("I'm full....!")
        }
    }
해당 패턴도 그렇게 어렵지 않은 것 같다. 동적으로 기능을 추가한다거나 수정하려고 할 때 사용하면 유용하지 않을까 생각이 든다. 좋은 점 중 하나는 확장할 때 서브 클래스를 만들지 않고 객체를 래핑해서 추가하면 되니까 확장성과 재사용성을 높일 수 있다는 것이다.

    public interface Pizza {
        public String getDescription();
        public double getCost();
    }

    public class Margherita implements Pizza {
        @Override
        public String getDescription() {
            return "Margherita";
        }

        @Override
        public double getCost() {
            return 10.0;
        }
    }

    public abstract class PizzaTopping implements Pizza {
        protected Pizza pizza;
        public PizzaTopping(Pizza pizza) {
            this.pizza = pizza;
        }
    }

    public class CheeseTopping extends PizzaTopping {
        public CheeseTopping(Pizza pizza) {
            super(pizza);
        }
        @Override
        public String getDescription() {
            return pizza.getDescription() + " + Cheese";
        }
        @Override
        public double getCost() {
            return pizza.getCost() + 2.0;
        }
    }


    public class MeatTopping extends PizzaTopping {
        public MeatTopping(Pizza pizza) {
            super(pizza);
        }
        @Override
        public String getDescription() {
            return pizza.getDescription() + " + Meat";
        }
        @Override
        public double getCost() {
            return pizza.getCost() + 3.0;
        }
    }

    public class PizzaShop {
      public static void main(String[] args) {

        Pizza margherita = new Margherita();
        System.out.println("Base pizza: " + margherita.getDescription() + " - Cost: $" + margherita.getCost());

        // Add cheese topping
        margherita = new CheeseTopping(margherita);
        System.out.println("Pizza with Cheese Topping: " + margherita.getDescription() + " - Cost: $" + margherita.getCost());

        // Add meat topping
        margherita = new MeatTopping(margherita);
        System.out.println("Pizza with Meat and Cheese Topping: " + margherita.getDescription() + " - Cost: $" + margherita.getCost());

       }
    }
하나의 예시로는 부실한 느낌이 들어서 GPT한테 받아온 예시 코드이다. 추상클래스에 익숙하지 않다면 학습하면서 직접 한 번 작성해보길 바란다.

## Iterator
Iterator 패턴은 우리가 익히 알고 있는 그런 Iterator가 맞다. 해당 패턴을 사용하는 이유는 각 요소의 내부를 노출하지 않고 하나씩 순차적으로 접근하는 방법을 제공하기 때문이다. 동일한 타입의 개체들을 가지고 반복해서 일처리를 하는 경우에 사용되는 패턴이라고 이해하면 된다.

사실 Java나 Kotlin의 경우 Iterator 패턴을 직접 구현하지 않아도 기본적으로 제공해주기 때문에 편하긴 하지만, 내부적으로 어떻게 이루어져 있는지는 알면 좋을 것 같아서 구현 코드를 작성해보려고 한다.

    package com.many.affection.group.entity

    interface Iterator<T> {
        fun hasNext(): Boolean
        fun next(): T
    }

    // 예를 들면 Aggregate<Animals>를 만들면 Iterator<Animals>가 생성됨
    interface Aggregate<T> {
        fun createIterator(): Iterator<T>
    }

    class ConcreteIterator<T>(var items: List<T>): Iterator<T> {
        var current = 0
        override fun hasNext(): Boolean{
            if(current < items.size){
                return true
            } else {
                return false
            }
        }
        override fun next(): T{
            if(hasNext()){
                return items[current++]
            } else {
                throw NoSuchElementException()
            }
        }
    }

    class ConcreteAggregate<T>(var items: List<T>): Aggregate<T>{
        override fun createIterator(): Iterator<T>{
            return ConcreteIterator(items)
        }
    }

    fun main(){
        var concreteAggregate = ConcreteAggregate(listOf("hi", "bye", "nice to meet you"))
        var iterator = concreteAggregate.createIterator()
        println(iterator.next())
        println(iterator.next())
        println(iterator.next())
    }
## Adapter
Adapter 패턴은 쉽게 설명하자면, 평소에는 어떤 인터페이스도 구현하고 있지 않다가 필요한 인터페이스가 있을 때마다 주입해줄 수(?) 있게끔 하는 것이며, 추가로 호환되지 않는 두 인터페이스 간 브릿지 역할 또한 해줄 수 있다.

    interface Target{
      fun request()
    }

    class Adaptee {
      fun specifiRequest(){
        println("Doing something in Adaptee")
      }
    }

    class Adapter(val adaptee: Adaptee): Target{
      override fun request(){
        adaptee.specifiRequest()
      }
    }
평소에 Adaptee는 Target 인터페이스를 구현하고 있지 않은 상태를 유지하고 있다가. Target 인터페이스를 구현한 Adapter 클래스를 사용하여 Target의 메서드인 request에 Join할 수 있게 된다. 해당 request영역은 어떻게 보면 Adaptee 클래스가 입맛에 맞게 메서드를 구성하여 request라는 평소에는 관련 없던 메서드를 사용할 수 있게 되는 것이다.

## Facade
대망의 마지막. Facade라 쓰고 파사드 패턴이라고 읽는 듯하다. Facade 패턴은 하위에 있는 복잡한 시스템에 통합되어 단순화된 인터페이스를 제공하는 데 중점을 두는 패턴이다. 하위 시스템과 클라이언트의 브릿지 역할을 하여 하위 시스템의 복잡성으로부터 클라이언트를 보호하는 패턴이다. 즉, 추상화를 위한 인터페이스의 인터페이스라고 생각하면 된다.

    class CPU{
        fun processData(){
            println("프로세스를 실행하는 중")
        }
    }

    class Memory{
        fun loadMemory(){
            println("메모리를 읽는 중")
        }
    }
    class HardDrive{
        fun readData(){
            println("드라이브에서 데이터를 읽는 중")
        }
    }
    class Computer(
        var cpu: CPU,
        var memory: Memory,
        var hardDrive: HardDrive,
    ){

        fun startComputer(){
            hardDrive.readData()
            memory.loadMemory()
            cpu.processData()
            println("컴퓨터가 실행됨")
        }
    }


    fun main(){
        var computer = Computer(cpu = CPU(), memory = Memory(), hardDrive = HardDrive())
        computer.startComputer() // 모든 부품이 실행 후 "컴퓨터가 실행됨" 출력
    }
위의 코드를 마지막으로 GoF에서 소개하는 대표적인 디자인 패턴 21개 중 7개를 알아봤는데, 아직은 디자인패턴에 익숙한 편이 아니기에 하나씩 써보는 습관을 길러야 할 것 같기도 하고, 막상 실무에서 잘 쓰게 될까? 생각이나 날까? 싶기 때문에 스스로 마음을 다잡게 된다. 그동안 Java의 정석이나, 코틀린 문법 강의를 보면서 인터페이스나 추상화가 나오면 넘어가기 급했는데 후회가 급 밀려온다..; ^^ 시간적 여유가 생기게 되면 깊이 있는 학습을 해보고 싶으면서도 남은 디자인 패턴에 대해서도 배울 수 있는 기회가 생겼으면 좋겠다.
