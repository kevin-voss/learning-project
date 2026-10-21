(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'inheritance-basics',
    title: 'Inheritance: extends and super',
    category: 'deeper',
    icon: 'I',
    tagline: 'A Dog is an Animal',
    glossary: terms,
    realWorld: 'Animals at a farm. Every animal has a name, eats and sleeps. A dog is an animal, so it does all of that too, and on top it barks. A cat is also an animal: it eats and sleeps, and it purrs.',
    kid: [
      'Think of all the animals on a farm. Every animal has a name. Every animal can eat. Every animal can sleep.',
      'A dog is an animal. So a dog has a name, eats and sleeps, like every animal. But a dog can also bark. A cat is an animal too, and a cat can purr.',
      'In Java you write "everything every animal has" once, in a class `Animal`. Then you say `class Dog extends Animal`: "a dog is an animal, plus barking". The dog gets all the animal things for free. This is called **inheritance**.'
    ],
    definition: '**Inheritance** lets a class take over the fields and methods of another class and add its own. `class Dog extends Animal` makes `Dog` a **subclass** (child) of the **superclass** (parent) `Animal`. A `Dog` object is also an `Animal`: an "is-a" relationship.',
    explain: [
      'With `extends`, the subclass gets every method and field of the superclass. A `Dog` can call `eat()` although `Dog` does not write it: it **inherits** it from `Animal`. The subclass then adds what is special about it, like `bark()`.',
      '`private` members are inherited but hidden: a `Dog` object does contain the private field `name` of `Animal`, but the code in `Dog` cannot touch it directly. It uses the public getter `getName()`, or the superclass makes the member `protected` (lesson "Access Modifiers").',
      'Constructors are **not** inherited. Every subclass constructor must first let the superclass set up its part of the object, by calling `super(arguments)`. In Java 21 this call must be the first statement. If you write no `super(...)`, the compiler inserts `super()` with no arguments, which only works if the superclass has such a constructor.',
      '`super.method()` calls the superclass version of a method. You use it when the subclass replaces a method (overriding, next lesson) but still wants the parent’s part of the work.',
      'A class can extend only **one** class. At the very top sits the class `Object`: a class without `extends` extends `Object` automatically. That is where every class gets `toString()`, `equals()` and `hashCode()` from. (For "can-do" abilities that many unrelated classes share, Java has interfaces, the topic [Interfaces](../interfaces/index.html).)'
    ],
    why: 'When several classes share the same fields and methods, inheritance lets you write that shared part once. A change in `Animal` then reaches every kind of animal.',
    whenUse: 'Only when "X is a Y" is really true and stays true (a `Dog` is an `Animal`, a `SavingsAccount` is an `Account`). If the sentence is "X has a Y", use composition (lesson "Objects Working Together") instead.',
    syntax: '`class Sub extends Super { Sub(…) { super(…); … } }`. `super(…)` calls the parent constructor, `super.method()` the parent version of a method.',
    fileName: 'FarmDemo.java',
    code: `public class FarmDemo {
    public static void main(String[] args) {
        Dog rex = new Dog("Rex", "beagle");
        Cat tom = new Cat("Tom");

        rex.eat();       // inherited from Animal
        rex.bark();      // only dogs
        tom.eat();       // inherited from Animal
        tom.purr();      // only cats
        System.out.println(rex.getName() + " is a " + rex.getBreed());
    }
}

class Animal {
    private final String name;

    Animal(String name) {
        this.name = name;
    }

    String getName() { return name; }

    void eat() {
        System.out.println(name + " eats");
    }
}

class Dog extends Animal {
    private final String breed;      // what only dogs have

    Dog(String name, String breed) {
        super(name);                 // let Animal set its part first
        this.breed = breed;
    }

    String getBreed() { return breed; }

    void bark() {
        System.out.println(getName() + " says Woof");   // name is private in Animal
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }

    void purr() {
        System.out.println(getName() + " purrs");
    }
}`,
    output: `Rex eats
Rex says Woof
Tom eats
Tom purrs
Rex is a beagle`,
    codeSummary: '`Animal` holds what all animals share: a name and `eat()`. `Dog` and `Cat` extend it, call `super(name)` in their constructors, and add their own methods. Both can `eat()` without writing it.',
    codeExplanation: [
      { label: 'Line 6', code: 'rex.eat();       // inherited from Animal', text: '`Dog` has no `eat()` of its own. Java finds it in the superclass `Animal`.' },
      { label: 'Line 7', code: 'rex.bark();      // only dogs', text: 'A method that only `Dog` has. `tom.bark()` would not compile.' },
      { label: 'Line 15', code: 'private final String name;', text: 'Every `Dog` and `Cat` object contains this field, but only code in `Animal` may use it directly.' },
      { label: 'Line 28', code: 'class Dog extends Animal {', text: '`extends Animal`: a `Dog` is an `Animal` and inherits its methods.' },
      { label: 'Line 29', code: 'private final String breed;      // what only dogs have', text: 'The subclass adds its own field on top of the inherited ones.' },
      { label: 'Line 32', code: 'super(name);                 // let Animal set its part first', text: 'Calls the `Animal(String)` constructor. It must be the first statement, so the animal part is ready before the dog part.' },
      { label: 'Line 39', code: 'System.out.println(getName() + " says Woof");   // name is private in Animal', text: '`name` alone would not compile here (`name has private access in Animal`). The inherited public getter works.' },
      { label: 'Line 43', code: 'class Cat extends Animal {', text: 'A second subclass. `Dog` and `Cat` share `Animal`, but know nothing about each other.' }
    ],
    sections: [
      {
        title: 'The family tree',
        text: [
          'In a class diagram, inheritance is an arrow with a hollow triangle pointing **to the parent**. `Object` sits at the top of every tree, even when you never write it.'
        ],
        mermaid: `classDiagram
  Object <|-- Animal
  Animal <|-- Dog
  Animal <|-- Cat
  class Object {
    +toString() String
    +equals(Object o) boolean
    +hashCode() int
  }
  class Animal {
    -String name
    +getName() String
    +eat() void
  }
  class Dog {
    -String breed
    +getBreed() String
    +bark() void
  }
  class Cat {
    +purr() void
  }`,
        diagramNote: 'Read the arrows as "is a": a `Dog` is an `Animal`, an `Animal` is an `Object`. So a `Dog` has everything in the boxes above it.'
      },
      {
        title: 'What a subclass gets',
        text: [
          'Not everything travels down the tree in the same way. This table shows what code inside `Dog` can do with the members of `Animal`.'
        ],
        table: {
          head: ['Member of `Animal`', 'Does a `Dog` object have it?', 'Can code in `Dog` use it directly?'],
          rows: [
            ['`public` / package-private method `eat()`', 'Yes', 'Yes: `eat()`'],
            ['`private` field `name`', 'Yes, inside the object', 'No: use `getName()`'],
            ['`protected` field or method', 'Yes', 'Yes, even from another package'],
            ['Constructor `Animal(String)`', 'Not inherited', 'Only through `super(name)`'],
            ['Methods from `Object` (`toString` …)', 'Yes', 'Yes']
          ]
        },
        warn: 'Writing `return name;` inside `Dog` gives `error: name has private access in Animal`. That is encapsulation working: `Animal` still guards its own field.'
      },
      {
        title: 'Constructors run from the top down',
        text: [
          'A `Puppy` is a `Dog`, which is an `Animal`. When you write `new Puppy()`, each constructor first calls the one above it. So the printing happens from the top of the tree down: the animal part is built first, the puppy part last.'
        ],
        mermaid: `flowchart TD
  A["new Puppy()"] --> B["Puppy() calls super()"]
  B --> C["Dog() calls super()"]
  C --> D["Animal() calls super(): Object()"]
  D --> E["Animal body runs"]
  E --> F["Dog body runs"]
  F --> G["Puppy body runs"]`,
        diagramNote: 'Down the left: the calls go up the tree. Then the bodies run in the other direction, parent first.',
        fileName: 'BuildOrder.java',
        code: `public class BuildOrder {
    public static void main(String[] args) {
        new Puppy();
    }
}

class Animal {
    Animal() {
        System.out.println("1. Animal part ready");
    }
}

class Dog extends Animal {
    Dog() {
        // the compiler puts super(); here for you
        System.out.println("2. Dog part ready");
    }
}

class Puppy extends Dog {
    Puppy() {
        super();   // the same as what the compiler would add
        System.out.println("3. Puppy part ready");
    }
}`,
        output: `1. Animal part ready
2. Dog part ready
3. Puppy part ready`
      },
      {
        title: 'When the compiler cannot add super() for you',
        text: [
          'If the superclass has only a constructor with parameters, the automatic `super()` has nothing to call. Then you must write `super(…)` yourself.'
        ],
        fileName: 'Zoo.java',
        codeLanguage: 'plaintext',
        code: `public class Zoo {
    public static void main(String[] args) {
        Dog rex = new Dog("Rex");
    }
}

class Animal {
    private final String name;

    Animal(String name) {
        this.name = name;
    }
}

class Dog extends Animal {
    Dog(String name) {
        System.out.println("making a dog");
    }
}

$ javac Zoo.java
Zoo.java:16: error: constructor Animal in class Animal cannot be applied to given types;
    Dog(String name) {
                     ^
  required: String
  found:    no arguments
  reason: actual and formal argument lists differ in length
1 error`,
        tip: 'The fix: make `super(name);` the first line of the `Dog` constructor.'
      },
      {
        title: 'super.method(): add to the parent’s work',
        text: [
          'A subclass can write a method with the same header as a parent method. Its version then replaces the parent’s version for its objects; this is **overriding**, explained in the next lesson. Inside it, `super.describe()` still calls the parent’s version, so you can add to it instead of rewriting it.'
        ],
        fileName: 'Describe.java',
        code: `public class Describe {
    public static void main(String[] args) {
        Animal generic = new Animal("Nemo");
        Dog rex = new Dog("Rex", "beagle");
        System.out.println(generic.describe());
        System.out.println(rex.describe());
        System.out.println("rex is an Animal: " + (rex instanceof Animal));
        System.out.println("rex is an Object: " + (rex instanceof Object));
    }
}

class Animal {
    private final String name;

    Animal(String name) { this.name = name; }

    String describe() {
        return "Animal " + name;
    }
}

class Dog extends Animal {
    private final String breed;

    Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }

    @Override
    String describe() {
        return super.describe() + ", a " + breed;   // parent's text + more
    }
}`,
        output: `Animal Nemo
Animal Rex, a beagle
rex is an Animal: true
rex is an Object: true`,
        tip: '`x instanceof Animal` asks "is the object in `x` an `Animal` (or a subclass of it)?". Every object is an `Object`.'
      },
      {
        title: 'Use inheritance carefully',
        text: [
          'Inheritance ties two classes together tightly: every change in the parent reaches every child. That is great for a real "is-a", and painful when the relationship is not real. Ask the "is-a" question, and when in doubt, use composition.'
        ],
        table: {
          head: ['Idea', 'Is it really "is-a"?', 'Better choice'],
          rows: [
            ['`Dog extends Animal`', 'Yes, always', 'Inheritance is fine'],
            ['`SavingsAccount extends Account`', 'Yes', 'Inheritance is fine'],
            ['`Car extends Engine` (to reuse `start()`)', 'No: a car has an engine', 'Composition: a field `Engine engine`'],
            ['`Library extends ArrayList<Book>`', 'No: a library has books', 'Composition: a field `ArrayList<Book> books`'],
            ['`Square extends Rectangle`', 'Tricky: setting the width of a square must change its height', 'Often two separate classes']
          ]
        },
        warn: 'Java allows only one superclass. `class Bat extends Mammal, Bird` does not compile. Shared abilities like "can fly" are modelled with interfaces (topic 14).'
      }
    ],
    technical: [
      'A subclass object is one object on the heap that contains all fields of all its classes: first the fields of `Object` (none), then those of `Animal` (`name`), then those of `Dog` (`breed`). Private fields of the parent are physically there; only the compiler stops `Dog`’s code from naming them.',
      'In the bytecode, every constructor of `Dog` starts with `invokespecial Animal.<init>`, either the call you wrote or the `super()` the compiler added. That chain always ends at `Object.<init>`, which is why the parent part of an object is always ready before the child part.',
      'When you call `rex.eat()`, the JVM looks for `eat` in the class of the object (`Dog`). If it is not there, it looks in the parent (`Animal`), then the grandparent, up to `Object`. The JVM speeds this up with a table of methods per class, built once when the class is loaded.'
    ],
    tryIt: {
      steps: [
        'Copy `FarmDemo.java` and run it.',
        'Add a method `void sleep()` to `Animal` that prints `getName() + " sleeps"`.',
        'Call `rex.sleep();` and `tom.sleep();` in `main` without changing `Dog` or `Cat`.',
        'Then add a class `Cow extends Animal` with a method `moo()`, make a cow in `main`, and let it eat, sleep and moo.'
      ],
      see: '`Rex sleeps`, `Tom sleeps` and your cow eating, sleeping and mooing: one new method in `Animal` reached every animal at once.'
    },
    check: [
      { q: 'What does `class Cat extends Animal` give a `Cat`?', a: 'All methods and fields of `Animal` (private ones exist but are hidden), and the fact that a `Cat` is an `Animal`. Constructors are not inherited; `Cat` calls one with `super(…)`.' },
      { q: 'Why must `super(name)` come first in the `Dog` constructor?', a: 'The animal part of the object must be ready before the dog part uses it. Java 21 enforces this by requiring `super(…)` as the first statement.' },
      { q: 'Which class does `class Book { }` extend?', a: '`Object`. Every class without `extends` extends `Object`, which gives it `toString()`, `equals()` and `hashCode()`.' }
    ],
    keyPoints: [
      '`class Dog extends Animal`: a `Dog` is an `Animal` and inherits its methods and fields.',
      'Private parent fields exist in the object but are hidden; use getters (or `protected`).',
      'Constructors are not inherited; call the parent one with `super(…)` as the first line.',
      '`super.method()` calls the parent’s version of a method.',
      'One superclass only; every class ends at `Object`.',
      'Use inheritance only for a real "is-a"; otherwise prefer composition.'
    ],
    commonMistakes: [
      'Forgetting `super(name);` when `Animal` has no empty constructor: compile error `constructor Animal in class Animal cannot be applied to given types`. Call `super(name)` first.',
      'Using a parent’s private field in the child: `return name;` in `Dog`. Call `getName()` instead.',
      'Inheriting to reuse code without "is-a": `class Car extends Engine`. Give `Car` a field `Engine engine`.',
      '`class Bat extends Mammal, Bird`: only one superclass is allowed. Use interfaces for extra abilities.'
    ],
    related: ['Overriding and Polymorphism', 'Objects Working Together', 'Access Modifiers', 'Interfaces', 'UML Diagrams']
  }]);
})();
