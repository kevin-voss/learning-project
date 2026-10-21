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
      'Imagine you have a star-shaped cookie cutter. You press it into the dough again and again. Now you have many star cookies.',
      'All cookies have the same shape, because they come from the same cutter. But one cookie has red sprinkles and another has blue sprinkles. Each cookie is its own cookie.',
      'In Java, the cookie cutter is called a **class**. Each cookie is called an **object**. You write the class once, and then you make as many objects as you want.'
    ],
    definition: 'A **class** is a plan for a new type: it says which data (fields) and which actions (methods) every thing of that type has. An **object** is one real thing made from that plan while the program runs.',
    explain: [
      'Until now you stored data in loose variables: `String name = "Rex";` and `int age = 3;`. That works for one dog. For three dogs you need six variables, and nothing tells Java which name belongs to which age.',
      'A class groups the data that belongs together under one name. You write `class Dog { String name; int age; }` and now `Dog` is a **type**, like `int` or `String`. A variable of type `Dog` holds one whole dog.',
      'The variables inside a class are called **fields**. They hold the **state** of an object: what it knows right now (its name, its age). The methods inside a class are its **behavior**: what it can do (bark, have a birthday). Fields and methods together are the **members** of the class.',
      'An object is also called an **instance** of its class. "`rex` is an instance of `Dog`" means "`rex` is one dog made from the `Dog` plan". You make an instance with the keyword `new`: `Dog rex = new Dog();`.',
      'This way of building programs is called **object-oriented programming** (OOP): you model the things of your problem (dogs, books, bank accounts) as classes, and let objects of those classes work together.'
    ],
    why: 'Real programs talk about things: students, orders, books. A class keeps all data about one thing together, gives it a name, and puts the code that works on that data right next to it.',
    whenUse: 'As soon as several values describe one thing (a name and an age, a title and an author), make a class for that thing.',
    syntax: '`class ClassName { fields … methods … }` defines the plan. `ClassName variable = new ClassName();` makes one object and stores a reference to it in the variable.',
    mermaid: `flowchart LR
  C["class Dog (the cookie cutter)"] -->|"new Dog()"| A["object rex: name = Rex, age = 3"]
  C -->|"new Dog()"| B["object bella: name = Bella, age = 5"]
  C -->|"new Dog()"| D["object max: name = Max, age = 1"]`,
    visualLabel: 'One class, many objects',
    visualNote: 'You write the class `Dog` once. Each `new Dog()` presses out one more object. All three have the fields `name` and `age`, but each object holds its own values.',
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
    codeSummary: 'The file holds two classes. `Dog` is the plan with two fields and one method. `main` makes two `Dog` objects, gives each its own values, and asks each one to bark.',
    codeExplanation: [
      { label: 'Line 1', code: 'public class DogDemo {', text: 'The class with `main`. It is `public`, so the file must be called `DogDemo.java`. It comes first in the file, so `java DogDemo.java` finds `main` on Java 21.' },
      { label: 'Line 3', code: 'Dog rex = new Dog();      // object number 1', text: '`new Dog()` makes one new `Dog` object. The variable `rex` has the type `Dog` and now points to that object.' },
      { label: 'Line 4', code: 'rex.name = "Rex";', text: 'The dot `.` means "inside". `rex.name` is the field `name` inside the object `rex`. You write a value into it.' },
      { label: 'Line 7', code: 'Dog bella = new Dog();    // object number 2', text: 'A second object from the same plan. It has its own `name` and its own `age`, separate from `rex`.' },
      { label: 'Line 11', code: 'rex.bark();', text: 'You call the method `bark` on the object `rex`. Inside `bark`, the word `name` means the name of `rex`.' },
      { label: 'Line 12', code: 'bella.bark();', text: 'The same method, called on `bella`. Now `name` inside `bark` is `"Bella"`. One method, different objects, different results.' },
      { label: 'Line 19', code: 'class Dog {', text: 'The plan. There is no `public` here: a file may hold many classes, but only one of them may be `public`.' },
      { label: 'Line 20', code: 'String name;   // field (state)', text: 'A field: a variable that lives inside each object, not inside a method. Every `Dog` object gets its own `name`.' },
      { label: 'Line 23', code: 'void bark() {  // method (behavior)', text: 'A method without `static`. It belongs to each object and can read that object’s fields directly.' }
    ],
    sections: [
      {
        title: 'The problem: loose variables',
        text: [
          'Look at a program that stores two dogs without a class. Each fact is its own variable. The only thing that ties `dog1Name` to `dog1Age` is the number in the name.',
          'The method `printDog` needs two parameters for one dog. If a dog later gets a third fact (a breed), you change every variable list and every method call.'
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
        warn: 'The last call mixes two dogs and the compiler cannot notice. Nothing in the code says that `dog1Name` and `dog2Age` do not belong together.'
      },
      {
        title: 'The fix: a class groups what belongs together',
        text: [
          'With a class, one dog is one value. You pass the whole dog around, and its name and age always travel together.'
        ],
        table: {
          head: ['Question', 'Loose variables', 'A class `Dog`'],
          rows: [
            ['How do you store one dog?', 'Two variables: `dog1Name`, `dog1Age`', 'One variable: `Dog rex`'],
            ['How do you pass a dog to a method?', '`printDog(dog1Name, dog1Age)`', '`printDog(rex)`'],
            ['Can you mix up two dogs by mistake?', 'Yes, easily', 'No, each object keeps its own data'],
            ['A dog gets a new fact (breed)', 'New variables everywhere', 'One new field in the class'],
            ['Where is the code that works on a dog?', 'Somewhere in the program', 'Inside the class, as methods']
          ],
          note: 'This idea of keeping data and the code for it together is the heart of object-oriented programming.'
        }
      },
      {
        title: 'The words you need',
        text: [
          'Classes come with a few new words. You meet all of them again in the next lessons, so read them once now.'
        ],
        table: {
          head: ['Word', 'Meaning', 'In the cookie picture'],
          rows: [
            ['**class**', 'The plan for a type: which fields and methods exist', 'The cookie cutter'],
            ['**object** / **instance**', 'One thing made from the class with `new`', 'One cookie'],
            ['**field**', 'A variable inside each object (its state)', 'The sprinkles on one cookie'],
            ['**method**', 'An action the object can do (its behavior)', 'What you can do with a cookie: eat it, share it'],
            ['**member**', 'A field or a method of a class', 'Any part of the plan'],
            ['**reference**', 'The arrow in a variable that points to an object', 'A label with a string tied to one cookie']
          ]
        },
        tip: 'Class names start with a capital letter (`Dog`, `BankAccount`). Variable names start small (`rex`, `myAccount`). You know this from [Naming Conventions](../syntax-fundamentals/index.html).'
      },
      {
        title: 'Read a class diagram',
        text: [
          'Programmers draw classes as boxes. This drawing is a **UML class diagram** (UML is a standard way to draw programs; you meet it again in its own topic at the end).',
          'The top part is the class name. The middle part lists the fields with their types. The bottom part lists the methods with their return type. The `+` means "everyone may use this".'
        ],
        mermaid: `classDiagram
  class Dog {
    +String name
    +int age
    +bark() void
  }`,
        diagramNote: 'Read it as: "a `Dog` has a `name` of type `String`, an `age` of type `int`, and can `bark()`, which returns nothing (`void`)."'
      },
      {
        title: 'Many classes in one file',
        text: [
          'In this topic most examples put several classes into one file. That is allowed. There are two rules: at most one class is `public`, and the file name equals the name of that `public` class.',
          'Put the `public` class with `main` **first**. On Java 21, `java File.java` runs the first class in the file, so `main` must be there. With `javac` + `java ClassName` the order does not matter.'
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
        tip: 'When `javac Bakery.java` compiles this file, you get two files: `Bakery.class` and `Cookie.class`. Every class gets its own `.class` file.'
      }
    ],
    technical: [
      'When you compile, `javac` turns every class into its own `.class` file with bytecode. The file `DogDemo.java` gives `DogDemo.class` and `Dog.class`.',
      'When the program first needs `Dog`, the JVM loads `Dog.class` once. It keeps the class information (the list of fields and the code of the methods) in a memory area for classes. The code of `bark()` exists only once, no matter how many dogs you make.',
      'Each `new Dog()` reserves a new piece of memory on the **heap** (the memory area for objects). That piece holds this object’s own `name` and `age`. When you call `rex.bark()`, the JVM runs the one shared `bark` code and hands it the object `rex`, so `name` inside the method means `rex`’s name.'
    ],
    tryIt: {
      steps: [
        'Copy `DogDemo.java` from above into a new folder.',
        'Add a third dog: `Dog max = new Dog();`, set `max.name = "Max";` and `max.age = 1;`.',
        'Call `max.bark();` and print his age like the others.',
        'Run `java DogDemo.java`.'
      ],
      see: 'three barks and three ages. You changed nothing in the class `Dog`: the plan stays the same, you only pressed out one more cookie.'
    },
    check: [
      { q: 'Is `Dog` in `Dog rex = new Dog();` a class or an object? And `rex`?', a: '`Dog` is the class (the plan and the type). `rex` is a variable that points to one object, an instance of `Dog`.' },
      { q: 'You make 100 `Dog` objects. How many copies of the `bark()` code exist? How many `name` fields?', a: 'One copy of `bark()`, shared by all dogs. 100 `name` fields, one inside each object.' },
      { q: 'A file `Zoo.java` holds `public class Zoo` and `public class Lion`. What happens?', a: 'It does not compile. Only one class per file may be `public`. Remove `public` from `Lion`, or move `Lion` into its own file `Lion.java`.' }
    ],
    keyPoints: [
      'A class is a plan (a new type). An object is one thing made from it with `new`.',
      'Fields hold the state of each object. Methods are its behavior.',
      'Each object has its own copy of the fields. The method code is shared.',
      'Use a class as soon as several values describe one thing.',
      'One file may hold many classes, but only one `public` class, named like the file.'
    ],
    commonMistakes: [
      '`Dog.name = "Rex";` uses the class instead of an object. Make an object first: `Dog rex = new Dog(); rex.name = "Rex";`.',
      '`dog rex = new dog();` with a small letter. Class names start with a capital letter: `Dog`.',
      'Two `public` classes in one file. Keep `public` only on the class that matches the file name.',
      'Putting the helper class first and running `java DogDemo.java` on Java 21: it looks for `main` in the first class. Put the class with `main` first.'
    ],
    related: ['Fields and Default Values', 'Creating Objects with new', 'Methods', 'UML Diagrams']
  }]);
})();
