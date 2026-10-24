(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'class-fields-constructor',
    title: 'Constructors',
    category: 'concept',
    icon: 'C',
    tagline: 'Create objects with state',
    glossary: terms,
    realWorld: 'A teddy bear workshop. You say the name and colour at the counter. The worker sews them in, then you get your bear — never half-finished.',
    kid: [
      'That "ask and sew" moment is the **constructor**. It runs once when you write `new`, takes your answers as parameters, and puts them into the fields.'
    ],
    definition: 'A **constructor** is a block with the same name as the class and **no return type**. It runs exactly once per `new` and gives the new object its start values.',
    explain: [
      'Looks like a method, but: name = class name, no return type (not even `void`). You never call it by name — `new Student("Ada", 92)` does.',
      'Write no constructor → compiler adds empty **default constructor** `Student() { }` (why `new Dog()` worked earlier). Write **any** constructor yourself → the free default is gone.',
      'Several constructors with different parameter lists = **constructor overloading** (like [method overloading](../methods/index.html)). One can call another with `this(...)` (**constructor chaining**). In Java 21, `this(...)` must be first. `this.name = name;` means field = parameter — next lesson.'
    ],
    why: 'Without a constructor, every caller sets fields by hand and can forget one. A constructor makes each object complete from its first moment.',
    whenUse: 'Parameters for every field that must be known from the start. Extra constructors when callers often want defaults.',
    syntax: '`ClassName(type param, …) { this.field = param; }` — no return type. Call with `new ClassName(arguments)`.',
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
    codeSummary: 'Three overloaded constructors. The short ones chain with `this(...)`, so only the main one sets fields and prints.',
    codeExplanation: [
      { label: 'Line 3', code: 'Student ada = new Student("Ada", 92);', text: 'Matches `Student(String, int)`.' },
      { label: 'Line 4', code: 'Student bob = new Student("Bob");', text: 'Matches `Student(String)`.' },
      { label: 'Line 5', code: 'Student someone = new Student();', text: 'Matches `Student()` — only because the class writes it.' },
      { label: 'Line 17', code: 'Student(String name, int grade) {      // the main constructor', text: 'Same name as the class, no return type.' },
      { label: 'Line 18', code: 'this.name = name;', text: 'Field ← parameter.' },
      { label: 'Line 23', code: 'Student(String name) {                 // no grade yet: start at 0', text: 'Different parameter list = overloading.' },
      { label: 'Line 24', code: 'this(name, 0);', text: 'Constructor chaining: run the main constructor.' },
      { label: 'Line 28', code: 'this("Unknown");', text: 'Chains to `Student(String)`, which chains to the main one.' }
    ],
    sections: [
      {
        title: 'The default constructor you get for free',
        text: [
          'No constructor written → free empty default; fields keep defaults/initializers.'
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
          'With parameters, the caller must give the values at once. Price: once you write a constructor, the free default disappears — `new Teddy()` stops compiling.'
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
        warn: '`new Teddy()` then fails: `required: String,String` / `found: no arguments`. Pass arguments or add `Teddy()`.'
      },
      {
        title: 'Overloading and chaining',
        table: {
          head: ['You write', 'Java picks', 'Result'],
          rows: [
            ['`new Student("Ada", 92)`', '`Student(String, int)`', 'name Ada, grade 92'],
            ['`new Student("Bob")`', '`Student(String)`', 'name Bob, grade 0'],
            ['`new Student()`', '`Student()`', 'name Unknown, grade 0'],
            ['`new Student(92)`', 'nothing fits', 'compile error']
          ]
        },
        mermaid: `flowchart LR
  A["new Student()"] --> B["Student(): this(#quot;Unknown#quot;)"]
  B --> C["Student(String): this(name, 0)"]
  C --> D["Student(String, int): sets fields"]
  E["new Student(#quot;Bob#quot;)"] --> C
  F["new Student(#quot;Ada#quot;, 92)"] --> D`,
        diagramNote: 'Every path ends at the main constructor — setup code in one place.',
        warn: 'In Java 21, `this(...)` must be first. A constructor must not chain in a circle.'
      },
      {
        title: 'Constructor vs method · copy constructor',
        table: {
          head: ['', 'Constructor', 'Method'],
          rows: [
            ['Name', 'Always the class name', 'Any name'],
            ['Return type', 'None, not even `void`', 'Always one'],
            ['Called', '`new ClassName(...)`', '`object.name(...)`'],
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
        tip: '`void Teddy(String name)` is a **method**, not a constructor. Constructors never have a return type.'
      }
    ],
    technical: [
      'Bytecode name: `<init>`. Order: parent constructor, then field initializers, then your body. With `this(...)`, initializers run once at the end of the chain.',
      'A `final` field must be set exactly once — the compiler checks every constructor sets it.'
    ],
    tryIt: {
      steps: [
        'Copy `StudentDemo.java` and run it.',
        'Add `Student(int grade)` that calls `this("Anonymous", grade);`, then `new Student(75)` in `main`.',
        'Put `System.out.println("hi");` above `this(name, 0);` and compile with `javac --release 21`.'
      ],
      see: '`Anonymous scored 75`. After the last step: compile error — `this(...)` must come first.'
    },
    check: [
      { q: 'A class has only `Car(String model)`. Does `new Car()` compile?', a: 'No. Writing any constructor removes the free default.' },
      { q: 'What is wrong with `public void Car(String model)` if you meant a constructor?', a: 'It has a return type, so it is a method. Constructors have none.' },
      { q: 'Why chain with `this(...)` instead of copying assignments?', a: 'Setup exists once. Later checks go in the main constructor only.' }
    ],
    keyPoints: [
      'Constructor: class name, no return type, runs once per `new`.',
      'No constructor → free empty default. Any constructor you write removes it.',
      'Overloading = different parameter lists. `this(...)` chains (must be first in Java 21).',
      'A copy constructor `Teddy(Teddy other)` makes a real copy, not an alias.'
    ],
    commonMistakes: [
      '`void Student(String name)` — remove the return type.',
      '`name = name;` — assigns the parameter to itself. Use `this.name = name;`.',
      'Writing a parameterized constructor and still calling `new Student()`.',
      '`println` before `this(...)` in Java 21 — move `this(...)` to the top.'
    ],
    related: ['Creating Objects with new', 'The this Keyword', 'Encapsulation: private, Getters, Setters', 'Methods']
  }]);
})();
