// Design Patterns: shared glossary, the empty lesson list and the topic-level practice.
// Every lesson file in basics/, creational/, structural/, behavioral/ and architectural/
// pushes one lesson onto Java.topics.designPatterns.lessons, in page order.
Java.topics.designPatterns = Java.topics.designPatterns || {};

Java.topics.designPatterns.glossary = [
  { term: 'design pattern', definition: 'A named, well-known solution to a problem that comes up again and again in object-oriented code. It is an idea you write yourself, not a library you download.' },
  { term: 'Gang of Four', definition: 'The four authors of the 1994 book "Design Patterns" (Gamma, Helm, Johnson, Vlissides). Their book named 23 patterns, among them most of the ones on this page.' },
  { term: 'creational pattern', definition: 'A pattern about how objects are made: who calls `new`, and when.' },
  { term: 'structural pattern', definition: 'A pattern about how classes and objects are put together into bigger structures.' },
  { term: 'behavioral pattern', definition: 'A pattern about how objects talk to each other and share the work.' },
  { term: 'client', definition: 'The code that uses a class or a pattern. Often it is `main` or another class that calls the methods.' },
  { term: 'concrete class', definition: 'A normal class you can create with `new`, as opposed to an interface or an abstract class.' },
  { term: 'coupling', definition: 'How much one class depends on the details of another. Tight coupling means a change in one class forces changes in the other.' },
  { term: 'composition', definition: 'Building an object from other objects that it keeps in fields ("has a"), instead of inheriting from them ("is a").' },
  { term: 'delegate', definition: 'To hand a job to another object: a method calls the same or a similar method on an object it holds.' },
  { term: 'program to an interface', definition: 'Declare variables and parameters with an interface type (`List`, `Shape`) and not with a concrete class, so the concrete class can change.' },
  { term: 'open/closed principle', definition: 'Code should be open for extension (you can add new behavior) but closed for modification (you do not need to edit tested code to do so).' },
  { term: 'single responsibility', definition: 'A class should have one job, so it has only one reason to change.' },
  { term: 'role', definition: 'The part a class plays inside a pattern, such as "product", "creator" or "observer". One class can play a role in one pattern and a different role in another.' },
  { term: 'boilerplate', definition: 'Code you must write again and again that adds no new idea, such as many small classes or getters.' },
  { term: 'lazy initialization', definition: 'Creating an object only the first time someone asks for it, not earlier.' },
  { term: 'thread', definition: 'One path of execution inside a running program. A program with several threads runs several pieces of code at the same time.' },
  { term: 'immutable', definition: 'Cannot be changed after it was created. A `String` is immutable.' },
  { term: 'fluent interface', definition: 'Methods that return the object itself, so you can chain calls: `builder.name("Ann").age(9).build()`.' },
  { term: 'wrapper', definition: 'An object that holds another object and puts its own methods around it, like the paper around a gift.' },
  { term: 'subject', definition: 'In the Observer pattern: the object that is watched and sends the news.' },
  { term: 'observer', definition: 'In the Observer pattern: an object that registers with a subject and gets a method call when something changes.' },
  { term: 'callback', definition: 'A method you hand to someone else so they can call it later, when something happens.' },
  { term: 'lambda', definition: 'A short way to write an object of a functional interface: `x -> x * 2`. See the interfaces topic.' },
  { term: 'functional interface', definition: 'An interface with exactly one abstract method, such as `Comparator` or `Runnable`. A lambda can stand in for it.' },
  { term: 'hook method', definition: 'A method in a base class that does nothing or something small, which a subclass may override to plug in extra behavior.' },
  { term: 'model', definition: 'In MVC: the data and the rules about the data, with no screen code.' },
  { term: 'view', definition: 'In MVC: the part that shows the data to the user.' },
  { term: 'controller', definition: 'In MVC: the part that takes the user input and tells the model and the view what to do.' },
  { term: 'dependency injection', definition: 'Giving an object the objects it needs (through its constructor) instead of letting it create or fetch them itself.' }
];

Java.topics.designPatterns.lessons = [];

Java.topics.designPatterns.tryIt = {
  steps: [
    'Make a file `PriceShop.java` with a `public class PriceShop` and a `main` method.',
    'Strategy: write an interface `Discount` with `int apply(int price)`, and two classes `NoDiscount` (returns the price) and `HalfPrice` (returns `price / 2`).',
    'Decorator: write a class `PlusTen implements Discount` that holds another `Discount` in a field and returns `inner.apply(price) + 10`.',
    'In `main`, put `new NoDiscount()`, `new HalfPrice()` and `new PlusTen(new HalfPrice())` in a `List<Discount>` and print `apply(100)` for each one in a loop.',
    'Run `java PriceShop.java`.'
  ],
  see: '`100`, `50` and `60`. The loop never needs an `if` to choose the discount, and `PlusTen` adds behavior without changing `HalfPrice`.'
};

Java.topics.designPatterns.check = [
  { q: 'What is a design pattern, and what is it not?', a: 'A named, well-known solution to a problem that comes up again and again. It is an idea with roles that you write yourself. It is not a library, and it is not finished code you can copy without thinking.' },
  { q: 'You need exactly one shared settings object for the whole program. Which pattern fits, and what is the danger?', a: 'Singleton. The danger: it is a global value in disguise. Every class can reach it, so dependencies hide and tests get harder. Often it is better to create one object in `main` and pass it in.' },
  { q: 'Several screens must update when one piece of data changes. Which pattern fits?', a: 'Observer: the data (subject) keeps a list of listeners and calls a method on each one when it changes. The data does not need to know what the listeners do.' },
  { q: 'Decorator and Adapter both wrap an object. What is the difference?', a: 'An Adapter changes the interface: it makes an object fit a different interface. A Decorator keeps the same interface and adds behavior. A decorator can wrap another decorator; an adapter usually is a single translation step.' },
  { q: 'Strategy and Template Method both let you swap a part of an algorithm. How do they do it differently?', a: 'Strategy uses composition: the object holds a strategy in a field and you can swap it at run time. Template Method uses inheritance: the base class has the fixed steps and a subclass overrides some of them, fixed when you pick the class.' }
];
