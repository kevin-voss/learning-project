(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'class-fields-constructor',
    title: 'Constructors',
    category: 'concept',
    icon: 'C',
    tagline: 'Create objects with state',
    glossary: terms,
    realWorld: 'A teddy bear workshop. A new bear never leaves the workshop half-finished: at the counter you say its name and its colour, the worker sews them in, and only then do you get your bear.',
    kid: [
      'At the teddy workshop the worker asks you two questions before the bear is made: "What is its name?" and "What colour?". You say "Bruno, brown". Then the worker sews a name tag and picks brown fur.',
      'This little "ask and sew" moment happens exactly once for every bear, right when it is born. You never get a bear without a name tag.',
      'In Java this moment is the **constructor**. It runs once when you write `new`. It takes your answers as parameters and puts them into the fields of the new object.'
    ],
    definition: 'A **constructor** is a block of code with the same name as the class and no return type. It runs exactly once for each `new` and gives the fields of the new object their start values.',
    explain: [
      'A constructor looks like a method, with two differences: its name is the class name (`Student`), and it has no return type, not even `void`. You never call it by its name. `new Student("Ada", 92)` calls it for you and passes the arguments.',
      'If you write no constructor at all, the compiler adds an empty one with no parameters: `Student() { }`. It is called the **default constructor**. That is why `new Dog()` worked in the earlier lessons.',
      'A constructor with parameters forces the caller to give the important data at once. `new Student("Ada", 92)` gives you a complete student; nobody can forget the name. As soon as you write **any** constructor yourself, the free default constructor is gone.',
      'A class can have several constructors with different parameter lists. This is **constructor overloading**, the same idea as [method overloading](../methods/index.html): Java picks the constructor whose parameters fit the arguments.',
      'To avoid writing the same code twice, one constructor can call another one of the same class with `this(...)`. This is **constructor chaining**. In Java 21, `this(...)` must be the first statement of the constructor.',
      'Inside a constructor you often see `this.name = name;`. `this.name` is the field of the new object, `name` is the parameter. The next lesson, "The this Keyword", explains it fully.'
    ],
    why: 'Without a constructor, every caller must set every field by hand, and it is easy to forget one. A constructor makes sure each object is complete and valid from its first moment.',
    whenUse: 'Give a class a constructor with parameters for every field that must be known from the start (a name, an id). Add more constructors when callers often want sensible default values.',
    syntax: '`ClassName(type param, …) { this.field = param; … }`: no return type, same name as the class. Call it with `new ClassName(arguments)`.',
    fileName: 'StudentDemo.java',
    code: `public class StudentDemo {
    public static void main(String[] args) {
        Student ada = new Student("Ada", 92);
        Student bob = new Student("Bob");
        Student someone = new Student();

        System.out.println(ada.report());
        System.out.println(bob.report());
        System.out.println(someone.report());
    }
}

class Student {
    String name;
    int grade;

    Student(String name, int grade) {      // the main constructor
        this.name = name;
        this.grade = grade;
        System.out.println("made " + name);
    }

    Student(String name) {                 // no grade yet: start at 0
        this(name, 0);
    }

    Student() {                            // nothing known yet
        this("Unknown");
    }

    String report() {
        return name + " scored " + grade;
    }
}`,
    output: `made Ada
made Bob
made Unknown
Ada scored 92
Bob scored 0
Unknown scored 0`,
    codeSummary: '`Student` has three overloaded constructors. The two short ones pass their work on with `this(...)`, so only the main constructor sets the fields and prints "made …".',
    codeExplanation: [
      { label: 'Line 3', code: 'Student ada = new Student("Ada", 92);', text: 'Two arguments, a `String` and an `int`, so Java runs the constructor `Student(String name, int grade)`.' },
      { label: 'Line 4', code: 'Student bob = new Student("Bob");', text: 'One `String` argument, so Java runs `Student(String name)`.' },
      { label: 'Line 5', code: 'Student someone = new Student();', text: 'No arguments, so Java runs `Student()`. This works only because the class writes that constructor itself.' },
      { label: 'Line 17', code: 'Student(String name, int grade) {      // the main constructor', text: 'Same name as the class, no return type. The parameters carry the start values.' },
      { label: 'Line 18', code: 'this.name = name;', text: 'Copies the parameter `name` into the field `name` of the new object.' },
      { label: 'Line 20', code: 'System.out.println("made " + name);', text: 'Proves when the constructor runs: once per `new`, before `main` goes on.' },
      { label: 'Line 23', code: 'Student(String name) {                 // no grade yet: start at 0', text: 'A second constructor with a different parameter list: constructor overloading.' },
      { label: 'Line 24', code: 'this(name, 0);', text: 'Constructor chaining: run the main constructor with `name` and `0`. No code is written twice.' },
      { label: 'Line 28', code: 'this("Unknown");', text: 'Chains to `Student(String)`, which chains to the main constructor. That is why "made Unknown" is printed.' }
    ],
    sections: [
      {
        title: 'The default constructor you get for free',
        text: [
          'A class without any constructor still works with `new`. The compiler quietly adds `Lamp() { }`: no parameters, empty body. All fields keep their default or start values.'
        ],
        fileName: 'LampDemo.java',
        code: `public class LampDemo {
    public static void main(String[] args) {
        Lamp lamp = new Lamp();   // uses the default constructor
        System.out.println("watts: " + lamp.watts + ", on: " + lamp.on);
    }
}

class Lamp {
    int watts = 40;
    boolean on;
    // no constructor written: the compiler adds Lamp() { }
}`,
        output: 'watts: 40, on: false'
      },
      {
        title: 'Parameters make complete objects',
        text: [
          'With parameters, the caller must give the values at once. You cannot make a `Teddy` without a name and a colour any more, so you never meet a nameless bear.',
          'The price: once you write a constructor, the free default constructor disappears. `new Teddy()` then stops compiling.'
        ],
        fileName: 'TeddyShop.java',
        code: `public class TeddyShop {
    public static void main(String[] args) {
        Teddy bruno = new Teddy("Bruno", "brown");
        Teddy snow = new Teddy("Snow", "white");
        System.out.println(bruno.name + " is " + bruno.color);
        System.out.println(snow.name + " is " + snow.color);
    }
}

class Teddy {
    String name;
    String color;

    Teddy(String name, String color) {
        this.name = name;
        this.color = color;
    }
}`,
        output: `Bruno is brown
Snow is white`,
        warn: 'Add `Teddy t = new Teddy();` to `main` and `javac` says: `error: constructor Teddy in class Teddy cannot be applied to given types;` with `required: String,String` and `found: no arguments`. Either pass the arguments or write a `Teddy()` constructor yourself.'
      },
      {
        title: 'Several constructors: overloading',
        text: [
          'Each constructor needs a different parameter list: a different number of parameters, or different types. Java looks at the arguments of `new` and picks the matching one. The names of the parameters do not count.'
        ],
        table: {
          head: ['You write', 'Java picks', 'Result'],
          rows: [
            ['`new Student("Ada", 92)`', '`Student(String, int)`', 'name Ada, grade 92'],
            ['`new Student("Bob")`', '`Student(String)`', 'name Bob, grade 0'],
            ['`new Student()`', '`Student()`', 'name Unknown, grade 0'],
            ['`new Student(92)`', 'nothing fits', 'compile error: no constructor takes one `int`']
          ]
        }
      },
      {
        title: 'Chaining with this(...)',
        text: [
          'Each short constructor fills in a missing value and hands the work to a longer one with `this(...)`. In the end, one main constructor does the real work. If you later add a check (for example "grade must be 0 to 100"), you add it in one place only.'
        ],
        mermaid: `flowchart LR
  A["new Student()"] --> B["Student(): this(#quot;Unknown#quot;)"]
  B --> C["Student(String): this(name, 0)"]
  C --> D["Student(String, int): sets the fields"]
  E["new Student(#quot;Bob#quot;)"] --> C
  F["new Student(#quot;Ada#quot;, 92)"] --> D`,
        diagramNote: 'Every arrow ends at the main constructor. That is the only place that writes the fields.',
        warn: 'In Java 21, `this(...)` must be the **first** statement in the constructor. A `println` before it is a compile error. And a constructor may not chain to itself in a circle.'
      },
      {
        title: 'Constructor or method? And a copy constructor',
        text: [
          'A constructor builds the object. A method works with an object that already exists. A useful kind of constructor is the **copy constructor**: it takes another object of the same class and copies its values into the new one. This gives you a real copy, not a second arrow to the same object.'
        ],
        table: {
          head: ['', 'Constructor', 'Method'],
          rows: [
            ['Name', 'Always the class name', 'Any name, starts small'],
            ['Return type', 'None, not even `void`', 'Always one (`void`, `int`, `String` …)'],
            ['How it is called', 'With `new ClassName(...)`', 'With `object.name(...)`'],
            ['How often', 'Once per object, at birth', 'As often as you like']
          ]
        },
        fileName: 'CopyDemo.java',
        code: `public class CopyDemo {
    public static void main(String[] args) {
        Teddy bruno = new Teddy("Bruno", "brown");
        Teddy twin = new Teddy(bruno);   // a real copy, a new object
        twin.name = "Bruno Two";

        System.out.println(bruno.name + " / " + twin.name);
        System.out.println("same object? " + (bruno == twin));
    }
}

class Teddy {
    String name;
    String color;

    Teddy(String name, String color) {
        this.name = name;
        this.color = color;
    }

    Teddy(Teddy other) {                 // copy constructor
        this(other.name, other.color);
    }
}`,
        output: `Bruno / Bruno Two
same object? false`,
        tip: 'Writing `void Teddy(String name)` by mistake makes a **method** called `Teddy`, not a constructor. It compiles, but `new Teddy("x")` then fails. Constructors never have a return type.'
      }
    ],
    technical: [
      'In the bytecode, every constructor is a special method named `<init>`. `new Student("Ada", 92)` becomes: reserve memory and zero it (`new`), then call `<init>(String, int)` on that memory (`invokespecial`). The constructor itself returns nothing; the expression `new …` is what hands you the reference.',
      'The compiler builds each constructor in this order: first a call to the constructor of the parent class (for your classes that is `Object()`, see the Deeper lesson "Inheritance: extends and super"), then all field initializers like `int watts = 40;` in the order they appear, then your own constructor body.',
      'If a constructor starts with `this(...)`, the field initializers run only once, inside the constructor at the end of the chain. You can see the generated default constructor with `javap -c Lamp`, which prints the bytecode of a `.class` file.',
      'A `final` field (you know `final` from [Types and Variables](../types-and-variables/index.html)) must get its value exactly once. The compiler checks that every constructor sets it, which makes constructors the natural home for values that never change, like an id.'
    ],
    tryIt: {
      steps: [
        'Copy `StudentDemo.java` and run it.',
        'Add a fourth constructor `Student(int grade)` that calls `this("Anonymous", grade);`.',
        'In `main`, add `Student x = new Student(75);` and print `x.report()`.',
        'Then put `System.out.println("hi");` above `this(name, 0);` and compile with `javac --release 21 StudentDemo.java`.'
      ],
      see: 'a new line `made Anonymous` and later `Anonymous scored 75`. After the last step, a compile error: in Java 21 the call to `this(...)` must come first.'
    },
    check: [
      { q: 'A class has only `Car(String model)`. Does `new Car()` compile?', a: 'No. Once you write a constructor, the compiler no longer adds the default one. Pass a model or add a `Car()` constructor.' },
      { q: 'What is wrong with `public void Car(String model) { … }` if you meant a constructor?', a: 'It has a return type (`void`), so it is a normal method named `Car`. A constructor has no return type at all.' },
      { q: 'Why chain constructors with `this(...)` instead of copying the assignments into each one?', a: 'So the setup code exists once. A later change or check goes into the main constructor and every other constructor uses it.' }
    ],
    keyPoints: [
      'A constructor has the class name and no return type; `new` runs it once per object.',
      'Without any constructor you get a free, empty default constructor.',
      'Writing any constructor removes the free one.',
      'Several constructors with different parameter lists = overloading.',
      '`this(...)` calls another constructor of the same class; in Java 21 it must come first.',
      'A copy constructor `Teddy(Teddy other)` makes a real copy, not an alias.'
    ],
    commonMistakes: [
      '`void Student(String name)`: the `void` turns it into a method. Remove the return type.',
      '`Student(String name) { name = name; }`: assigns the parameter to itself, the field stays `null`. Write `this.name = name;`.',
      'Writing a constructor with parameters and still calling `new Student()` somewhere. Add a `Student()` constructor or pass the arguments.',
      '`System.out.println("start"); this(name, 0);`: in Java 21 `this(...)` must be the first statement. Move it to the top.'
    ],
    related: ['Creating Objects with new', 'The this Keyword', 'Encapsulation: private, Getters, Setters', 'Methods']
  }]);
})();
