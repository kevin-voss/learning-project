// Interfaces, lesson 6: interface vs abstract class vs class (with a short intro to extends).
(function () {
  Java.addCoreLessons('interfaces', [
    {
      id: 'interface-or-abstract',
      title: 'Interface or Abstract Class',
      category: 'habits',
      icon: '≠',
      tagline: 'Pure promise or half-built class',
      realWorld: 'An interface is a job advert: "must be able to drive a car". An abstract class is a half-built house: the walls and the roof stand, you only finish the rooms. A normal class is a house you can move into today.',
      kid: [
        'Think of a colouring book. One page only says: "Draw an animal that makes a sound." That is an **interface**: a task, nothing drawn yet.',
        'Another page already has the farm, the fence and the sun printed on it. Only the animal in the middle is missing. That is an **abstract class**: most of the picture is done, one part is yours.',
        'A finished, coloured picture is a normal **class**. You can hang it on the wall right away.'
      ],
      definition: 'An **abstract class** is a class marked `abstract`. It may have fields, constructors and finished methods, plus `abstract` methods without a body. You cannot create it with `new`; a normal class must `extend` it and fill in the abstract methods.',
      explain: [
        'First a new keyword: `extends`. `class Dog extends Animal` makes Dog a **subclass** (child) of Animal, the **superclass** (parent). Dog **inherits** every field and method of Animal and may add its own. A class can extend **only one** class. This is called **inheritance**.',
        'The subclass runs the parent constructor with `super(…)` as the first line of its own constructor. That way the parent can set up its fields, for example the name.',
        'Now `abstract`. An `abstract class Animal` is not finished, so `new Animal(…)` is forbidden: `error: Animal is abstract; cannot be instantiated`. It can declare `abstract String sound();`, a method without a body, like in an interface. Every normal subclass must write it.',
        'So what is the difference to an interface? An abstract class can **store data** (fields) and share **finished code** that uses that data. An interface stores no data, but a class can implement **many** interfaces and extend only **one** class.',
        'The habit: **start with an interface**. Add an abstract class only when several classes really repeat the same fields and code. Often you use both: the interface is the type everyone talks to, the abstract class is an optional helper that implements it. The JDK does this with `List` (interface) and `AbstractList` (abstract class).'
      ],
      why: 'Choosing the right tool keeps classes flexible. An interface never blocks the single `extends` slot of a class; an abstract class saves repeating the same fields and code.',
      whenUse: 'Interface: any time you describe what something can do. Abstract class: when related classes share real fields and code, and they are all "a kind of" the same thing.',
      syntax: '`abstract class Name { fields; Name(…) { … } abstract returnType m(); returnType done() { … } }` · `class Sub extends Name implements I { Sub(…) { super(…); } … }`',
      fileName: 'Farm.java',
      code: `// An interface: a pure promise.
interface Pet {
    String ownerName();
}

// An abstract class: a half-built class with a field and finished code.
abstract class Animal {
    private final String name;              // shared field

    Animal(String name) {
        this.name = name;
    }

    abstract String sound();                // each animal fills this in

    String introduce() {                    // shared, finished code
        return name + " says " + sound();
    }
}

// Normal classes: each extends one class; Dog also implements an interface.
class Dog extends Animal implements Pet {
    Dog(String name) {
        super(name);                        // run the Animal constructor
    }
    @Override String sound() { return "Woof"; }
    @Override public String ownerName() { return "Sam"; }
}

class Cow extends Animal {
    Cow(String name) { super(name); }
    @Override String sound() { return "Moo"; }
}

public class Farm {
    public static void main(String[] args) {
        Animal[] animals = { new Dog("Rex"), new Cow("Bella") };
        for (Animal a : animals) {
            System.out.println(a.introduce());
        }
        Pet pet = new Dog("Rex");
        System.out.println("Rex belongs to " + pet.ownerName());
    }
}`,
      output: `Rex says Woof
Bella says Moo
Rex belongs to Sam`,
      codeSummary: 'All three kinds of type in one program: the interface `Pet`, the abstract class `Animal` with a shared field and method, and the normal classes `Dog` and `Cow`.',
      codeExplanation: [
        { label: 'Line 7', code: 'abstract class Animal {', text: '`abstract` marks the class as not finished. Nobody may write `new Animal(…)`.' },
        { label: 'Line 8', code: 'private final String name;              // shared field', text: 'A field. An interface could not have this. Every animal stores its name here, written once for all.' },
        { label: 'Line 10', code: 'Animal(String name) {', text: 'An abstract class can have a constructor. Subclasses call it with `super(name)`.' },
        { label: 'Line 14', code: 'abstract String sound();                // each animal fills this in', text: 'An abstract method: no body. Every normal subclass must write `sound()`.' },
        { label: 'Line 16', code: 'String introduce() {                    // shared, finished code', text: 'Finished code that every subclass inherits. It uses the field and calls the abstract `sound()`.' },
        { label: 'Line 22', code: 'class Dog extends Animal implements Pet {', text: '`extends` comes first (one class), then `implements` (any number of interfaces).' },
        { label: 'Line 24', code: 'super(name);                        // run the Animal constructor', text: 'The first line of a subclass constructor: hand the name up to Animal.' },
        { label: 'Line 26', code: '@Override String sound() { return "Woof"; }', text: 'Dog fills in the missing part. It needs no `public` here, because `sound()` in Animal is not public either.' },
        { label: 'Line 37', code: 'Animal[] animals = { new Dog("Rex"), new Cow("Bella") };', text: 'Polymorphism also works with an abstract class: an `Animal` variable can hold a Dog or a Cow.' },
        { label: 'Line 39', code: 'System.out.println(a.introduce());', text: 'The shared method from Animal runs; inside it, `sound()` runs the Dog or Cow version.' }
      ],
      table: {
        label: 'Interface vs abstract class vs class',
        head: ['Question', 'Interface', 'Abstract class', 'Normal class'],
        rows: [
          ['Can you `new` it?', 'no', 'no', 'yes'],
          ['Methods without a body?', 'yes (the normal case)', 'yes, marked `abstract`', 'no'],
          ['Finished methods?', 'only `default`, `static`, `private`', 'yes', 'yes'],
          ['Fields (stored data)?', 'no, only constants', 'yes', 'yes'],
          ['Constructor?', 'no', 'yes (called with `super(…)`)', 'yes'],
          ['How many per class?', 'many: `implements A, B`', 'one: `extends`', 'one: `extends`'],
          ['Reads like…', '"can do"', '"is a kind of, partly built"', '"is a, ready to use"'],
          ['Default choice?', 'yes, start here', 'when code repeats', 'when there is one way to do it']
        ],
        note: 'Interface methods are `public` automatically. Methods of an abstract class have the visibility you write.'
      },
      sections: [
        {
          title: 'Two kinds of arrows',
          text: [
            'In a class diagram, `extends` is a **solid** line with a hollow triangle, `implements` is a **dashed** one. The italic or `<<abstract>>` label marks a class you cannot create.'
          ],
          mermaid: `classDiagram
  class Pet {
    <<interface>>
    +ownerName() String
  }
  class Animal {
    <<abstract>>
    -String name
    +sound()* String
    +introduce() String
  }
  Animal <|-- Dog
  Animal <|-- Cow
  Pet <|.. Dog`,
          diagramNote: '`sound()*` marks an abstract method. Dog has one solid arrow (its only parent class) and one dashed arrow (an interface). It could have more dashed arrows, but never a second solid one.'
        },
        {
          title: 'Which one do I need?',
          mermaid: `flowchart TD
  A["I want several classes to do the same job"] --> B{"Do they share fields and real code?"}
  B -- no --> C["interface"]
  B -- yes --> D{"Are they all a kind of the same thing?"}
  D -- yes --> E["interface + abstract class that implements it"]
  D -- no --> F["interface + a helper class they use (composition)"]`,
          diagramNote: '**Composition** means "has a": a class keeps a helper object in a field instead of inheriting from it. It is often more flexible than `extends`.'
        },
        {
          title: 'Both together: an interface plus an abstract helper',
          text: [
            'The interface `Shape` is what the rest of the program uses. The abstract class `NamedShape` implements it and saves each shape from writing the name field and `describe()` again. A shape may also skip the helper and implement `Shape` directly, like `Dot`.'
          ],
          fileName: 'ShapeKit.java',
          code: `interface Shape {
    double area();
    String describe();
}

abstract class NamedShape implements Shape {
    private final String name;
    NamedShape(String name) { this.name = name; }

    @Override
    public String describe() {
        return name + " with area " + area();
    }
}

class Square extends NamedShape {
    private final double side;
    Square(double side) { super("square"); this.side = side; }
    @Override public double area() { return side * side; }
}

class Dot implements Shape {          // skips the helper, still a Shape
    @Override public double area() { return 0; }
    @Override public String describe() { return "a tiny dot"; }
}

public class ShapeKit {
    public static void main(String[] args) {
        Shape[] shapes = { new Square(3), new Dot() };
        for (Shape s : shapes) {
            System.out.println(s.describe());
        }
    }
}`,
          output: `square with area 9.0
a tiny dot`,
          tip: 'An abstract class that implements an interface does not need to write every interface method. `NamedShape` leaves `area()` open; its subclasses must write it.'
        },
        {
          title: 'Wrong vs right: the "Base" class trap',
          text: [
            'Beginners often make a `Base` class full of helpers and let unrelated classes extend it, only to reuse a few methods. Now those classes have used their one `extends` slot, and they are tied to code they do not need.'
          ],
          table: {
            head: ['Avoid', 'Prefer'],
            rows: [
              ['`class Invoice extends BaseHelper` (only for a `format()` method)', 'a static helper method, or a `Formatter` field (composition)'],
              ['`abstract class Flyer { abstract void fly(); }` with no fields or code', '`interface Flyer { void fly(); }`'],
              ['copying the same three fields into five sibling classes', 'one abstract parent class with those fields']
            ],
            note: 'An abstract class with only abstract methods and no fields should be an interface.'
          }
        }
      ],
      technical: [
        'An abstract class compiles to a normal `.class` file with the flag `ACC_ABSTRACT`. The JVM refuses to create objects of it; the compiler already stops `new Animal(…)` before that.',
        'A `Dog` object holds the fields of every class in its chain. Memory for a Dog contains the `name` field from Animal, even though Dog never declares it. The constructor chain (`super(name)`) runs the Animal constructor first so this field is set before Dog\'s own code runs.',
        'A class file has exactly one "super class" entry, which is why Java allows only one `extends`. It has a list of interfaces, which may be as long as you like. If you write no `extends`, the super class is `java.lang.Object`.',
        'Calls on an `Animal` variable use `invokevirtual` (a class method), calls on a `Pet` variable use `invokeinterface`. Both choose the method of the real object at run time.'
      ],
      tryIt: {
        steps: [
          'Run `Farm.java`.',
          'Add `class Cat extends Animal` with `sound()` returning `"Meow"`, and put `new Cat("Tom")` into the array.',
          'Try to write `Animal a = new Animal("X");` in `main` and compile.',
          'Remove the `sound()` method from `Cow` and compile again.'
        ],
        see: '`Tom says Meow` in the loop. Then the error `Animal is abstract; cannot be instantiated`, and without `sound()`: `Cow is not abstract and does not override abstract method sound() in Animal`.'
      },
      check: [
        { q: 'Name two things an abstract class can have that an interface cannot.', a: 'Fields (stored data) and constructors. (Also normal non-public methods with any visibility.)' },
        { q: 'Why can a class implement many interfaces but extend only one class?', a: 'A class has exactly one parent class with fields and constructors. Interfaces bring no fields, so combining many of them is safe.' },
        { q: 'You need a type `Flyer` with one method `fly()` and no shared code. Interface or abstract class?', a: 'An interface. There is no shared data or code, and an interface leaves the `extends` slot free.' }
      ],
      keyPoints: [
        '`extends` = inherit from one parent class; `super(…)` calls its constructor.',
        'An abstract class can have fields, constructors and finished code, plus abstract methods. You cannot `new` it.',
        'Only a promise: interface. A promise plus shared fields and code: interface plus abstract class.',
        'Start with an interface; reach for `extends` only when code really repeats.',
        'Solid arrow = extends, dashed arrow = implements.'
      ],
      commonMistakes: [
        '`new Animal("Rex")` on an abstract class. Fix: create a subclass object, `new Dog("Rex")`.',
        'Forgetting `super(…)` when the parent has only a constructor with parameters. Fix: start the subclass constructor with `super(name);`.',
        'Writing `class Dog extends Animal, Pet`. Fix: `class Dog extends Animal implements Pet`.',
        'An abstract class with only abstract methods and no fields. Fix: make it an interface.'
      ],
      related: ['interface-promise', 'multiple-interfaces', 'Classes & Objects', 'Design Patterns']
    }
  ]);
})();
