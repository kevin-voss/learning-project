(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'why-classes',
    title: 'Why Classes Exist',
    category: 'concept',
    icon: 'W',
    tagline: 'From loose variables to a model',
    glossary: terms,
    realWorld: 'A cookie cutter and the cookies you press out with it. The cutter is the plan: it decides the shape. Every cookie has that shape, but each cookie can have its own sprinkles.',
    kid: [
      'The cookie cutter is a **class**. Each cookie is an **object**. You write the class once, then make as many objects as you want. Same shape, own sprinkles.'
    ],
    definition: 'A **class** is a plan for a new type: which data (**fields**) and which actions (**methods**) every thing of that type has. An **object** (also called an **instance**) is one real thing made from that plan with `new`.',
    explain: [
      'Loose variables (`String name`, `int age`) work for one dog. For three dogs you need six variables, and nothing ties which name belongs to which age.',
      'A class groups what belongs together: `class Dog { String name; int age; }`. Now `Dog` is a type, like `int` or `String`. Fields hold **state** (what it knows). Methods hold **behavior** (what it can do). Together they are the **members** of the class.',
      'Building programs this way is **object-oriented programming** (OOP): model the things of your problem as classes, and let objects work together.'
    ],
    why: 'Real programs talk about things: students, orders, books. A class keeps that data together and puts the code next to it.',
    whenUse: 'As soon as several values describe one thing (a name and an age), make a class for that thing.',
    syntax: '`class ClassName { fields … methods … }` defines the plan. `ClassName variable = new ClassName();` makes one object.',
    mermaid: `flowchart LR
  C["class Dog (the cookie cutter)"] -->|"new Dog()"| A["object rex: name = Rex, age = 3"]
  C -->|"new Dog()"| B["object bella: name = Bella, age = 5"]
  C -->|"new Dog()"| D["object max: name = Max, age = 1"]`,
    visualLabel: 'One class, many objects',
    visualNote: 'One plan. Each `new Dog()` presses out one more object with its own field values.',
    fileName: 'DogDemo.java',
    code: `public class DogDemo {
    public static void main(String[] args) {
        Dog rex = new Dog();      // object number 1
        rex.name = "Rex";
        rex.age = 3;

        Dog bella = new Dog();    // object number 2
        bella.name = "Bella";
        bella.age = 5;

        rex.bark();
        bella.bark();
        System.out.println(rex.name + " is " + rex.age);
        System.out.println(bella.name + " is " + bella.age);
    }
}

// The plan: every Dog has a name, an age and can bark.
class Dog {
    String name;   // field (state)
    int age;       // field (state)

    void bark() {  // method (behavior)
        System.out.println(name + " says: Woof!");
    }
}`,
    output: `Rex says: Woof!
Bella says: Woof!
Rex is 3
Bella is 5`,
    codeSummary: '`Dog` is the plan. `main` makes two objects, gives each its own values, and asks each to bark.',
    codeExplanation: [
      { label: 'Line 3', code: 'Dog rex = new Dog();      // object number 1', text: '`new Dog()` makes one object. `rex` points to it.' },
      { label: 'Line 4', code: 'rex.name = "Rex";', text: 'The dot means "inside". Writes into this object’s `name` field.' },
      { label: 'Line 7', code: 'Dog bella = new Dog();    // object number 2', text: 'A second object from the same plan, with its own fields.' },
      { label: 'Line 11', code: 'rex.bark();', text: 'Calls `bark` on `rex`. Inside, `name` means Rex’s name.' },
      { label: 'Line 20', code: 'class Dog {', text: 'The plan. No `public` here: only one class per file may be `public` (named like the file).' },
      { label: 'Line 21', code: 'String name;   // field (state)', text: 'A field lives inside each object, not inside a method.' },
      { label: 'Line 24', code: 'void bark() {  // method (behavior)', text: 'No `static`: belongs to each object and can read that object’s fields.' }
    ],
    sections: [
      {
        title: 'Loose variables vs a class',
        text: [
          'Without a class, each fact is its own variable. You can mix two dogs by mistake — the compiler cannot notice. If a dog later gets a breed, you change every variable list and every call.'
        ],
        fileName: 'LooseVariables.java',
        code: `public class LooseVariables {
    public static void main(String[] args) {
        String dog1Name = "Rex";
        int dog1Age = 3;
        String dog2Name = "Bella";
        int dog2Age = 5;

        printDog(dog1Name, dog1Age);
        printDog(dog2Name, dog2Age);
        printDog(dog1Name, dog2Age);   // oops: Rex with Bella's age
    }

    static void printDog(String name, int age) {
        System.out.println(name + " is " + age);
    }
}`,
        output: `Rex is 3
Bella is 5
Rex is 5`,
        table: {
          head: ['Question', 'Loose variables', 'A class `Dog`'],
          rows: [
            ['Store one dog', 'Two variables', 'One: `Dog rex`'],
            ['Pass a dog to a method', '`printDog(name, age)`', '`printDog(rex)`'],
            ['Mix two dogs by mistake?', 'Yes, easily', 'No'],
            ['Add a new fact (breed)', 'New variables everywhere', 'One new field'],
            ['Where is the dog code?', 'Somewhere in the program', 'Inside the class, as methods']
          ]
        },
        warn: 'The last call mixes two dogs. Nothing says `dog1Name` and `dog2Age` belong together.'
      },
      {
        title: 'The words you need',
        table: {
          head: ['Word', 'Meaning', 'Cookie picture'],
          rows: [
            ['**class**', 'The plan: which fields and methods exist', 'The cutter'],
            ['**object** / **instance**', 'One thing made with `new`', 'One cookie'],
            ['**field**', 'A variable inside each object (state)', 'Sprinkles on one cookie'],
            ['**method**', 'An action the object can do (behavior)', 'Eat it, share it'],
            ['**member**', 'A field or a method', 'Any part of the plan'],
            ['**reference**', 'The arrow in a variable that points to an object', 'A string tied to one cookie']
          ]
        },
        tip: 'Class names start with a capital (`Dog`). Variable names start small (`rex`). See [Naming Conventions](../syntax-fundamentals/index.html).'
      },
      {
        title: 'Read a class diagram',
        text: [
          'Programmers draw classes as boxes (**UML class diagram**). Top: name. Middle: fields. Bottom: methods. `+` means everyone may use it. You meet UML again in its own topic.'
        ],
        mermaid: `classDiagram
  class Dog {
    +String name
    +int age
    +bark() void
  }`,
        diagramNote: 'A `Dog` has `name` (`String`), `age` (`int`), and can `bark()` (`void`).'
      },
      {
        title: 'Many classes in one file',
        text: [
          'Allowed: at most one `public` class, file name equals that class. Put the `public` class with `main` **first** — on Java 21, `java File.java` runs the first class in the file.'
        ],
        fileName: 'Bakery.java',
        code: `public class Bakery {
    public static void main(String[] args) {
        Cookie first = new Cookie();
        first.sprinkles = "red";
        Cookie second = new Cookie();
        second.sprinkles = "blue";

        first.describe();
        second.describe();
    }
}

class Cookie {
    String shape = "star";   // the same for every cookie
    String sprinkles;        // each cookie has its own

    void describe() {
        System.out.println("A " + shape + " cookie with " + sprinkles + " sprinkles");
    }
}`,
        output: `A star cookie with red sprinkles
A star cookie with blue sprinkles`,
        tip: '`javac Bakery.java` makes one `.class` file per class: `Bakery.class` and `Cookie.class`.'
      }
    ],
    technical: [
      '`javac` turns every class into its own `.class` file. The JVM loads a class once; method code like `bark()` exists only once.',
      'Each `new Dog()` reserves memory on the **heap** for that object’s own fields. When you call `rex.bark()`, the shared code runs with `rex` as the current object.'
    ],
    tryIt: {
      steps: [
        'Copy `DogDemo.java` into a new folder.',
        'Add a third dog: `Dog max = new Dog();`, set name and age, call `max.bark();`.',
        'Run `java DogDemo.java`.'
      ],
      see: 'three barks and ages. You changed nothing in `Dog` — only pressed out one more cookie.'
    },
    check: [
      { q: 'Is `Dog` in `Dog rex = new Dog();` a class or an object? And `rex`?', a: '`Dog` is the class. `rex` points to one object (an instance of `Dog`).' },
      { q: 'You make 100 `Dog` objects. How many copies of `bark()`? How many `name` fields?', a: 'One copy of `bark()`. 100 `name` fields, one per object.' },
      { q: 'A file holds `public class Zoo` and `public class Lion`. What happens?', a: 'It does not compile. Only one class per file may be `public`.' }
    ],
    keyPoints: [
      'A class is a plan. An object is one thing made with `new`.',
      'Fields = state. Methods = behavior. Each object has its own field values; method code is shared.',
      'Use a class when several values describe one thing.',
      'One file: at most one `public` class, named like the file, with `main` first for `java File.java`.'
    ],
    commonMistakes: [
      '`Dog.name = "Rex";` — use an object: `Dog rex = new Dog(); rex.name = "Rex";`.',
      '`dog rex = new dog();` — class names start with a capital: `Dog`.',
      'Two `public` classes in one file.',
      'Helper class first, then `java DogDemo.java` on Java 21: put the class with `main` first.'
    ],
    related: ['Fields and Default Values', 'Creating Objects with new', 'Methods', 'UML Diagrams']
  }]);
})();
