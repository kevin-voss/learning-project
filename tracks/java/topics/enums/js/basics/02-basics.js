// Enums, lesson 2: declare and use an enum.
(function () {
  Java.addCoreLessons('enums', [
    {
      id: 'enum-basics',
      title: 'A Fixed List of Choices',
      category: 'concept',
      icon: 'E',
      tagline: 'Typos stop compiling',
      realWorld: 'A traffic light has three colours. Nobody can switch it to purple. An enum is a type with a fixed guest list: only the guests on the list get in.',
      kid: [
        'A traffic light knows three colours: red, yellow and green. It can only show one of them at a time. It never shows purple.',
        'In Java you can write down such a list: “these are all the colours, there are no others”. That list is an enum.',
        'Every colour on the list is made once, like a single painted card. When two people talk about RED, they point at the very same card.'
      ],
      definition: 'An `enum` declares a new type and lists every allowed value once: `enum Status { CREATED, PICKED_UP, DELIVERED }`. A variable of type `Status` can only hold one of these **constants**, or `null`.',
      explain: [
        'You declare an enum like a class, with the keyword `enum` instead of `class`. Inside the curly braces you list the **constants** (the allowed values), separated by commas. By convention the type name is singular and in PascalCase (`Status`, `Size`), and the constants are in CAPITALS with underscores (`PICKED_UP`).',
        'The enum is a real **type**, like `int` or `String`. You use it for variables, parameters, return values and arrays: `Status s;`, `void ship(Status s)`, `Status[] all`.',
        'You reach a constant through the type name and a dot: `Status.CREATED`. Each constant is an **object**: Java creates exactly one object per constant, when the enum is first used, and never more. When you print a constant, you see its name, like `PICKED_UP`.',
        'Because there is only one object per constant, you compare with `==`. Two variables that hold `Status.DELIVERED` point at the same object, so `a == b` is `true`. You saw the difference between `==` and `equals` in [Strings](../strings/index.html); for enums `==` is the right choice.',
        'Every enum gets a few methods for free. The most useful one is `values()`: it returns an array with all constants in the order you wrote them. A [for-each loop](../control-flow/index.html) over it visits every constant. The other free methods have their own lesson below.'
      ],
      why: 'You get a type that only allows the right values, prints readable names and can list all of its values.',
      whenUse: 'Status, colour, size, direction, role, day of the week, card suit: anything with a short list that is known when you write the code.',
      syntax: '`enum TypeName { CONSTANT_ONE, CONSTANT_TWO, CONSTANT_THREE }`, then use `TypeName.CONSTANT_ONE`.',
      fileName: 'Parcel.java',
      code: `enum Status { CREATED, PICKED_UP, DELIVERED }

public class Parcel {
    static void report(String id, Status status) {
        System.out.println("Parcel " + id + " is " + status);
    }

    public static void main(String[] args) {
        Status status = Status.CREATED;
        report("A-17", status);

        status = Status.PICKED_UP;
        report("A-17", status);

        Status other = Status.PICKED_UP;
        System.out.println(status == other);

        System.out.println("All statuses:");
        for (Status s : Status.values()) {
            System.out.println("- " + s);
        }
    }
}`,
      output: `Parcel A-17 is CREATED
Parcel A-17 is PICKED_UP
true
All statuses:
- CREATED
- PICKED_UP
- DELIVERED`,
      codeSummary: 'Declare an enum, store a constant in a variable, pass it to a method, compare it and loop over all constants.',
      codeExplanation: [
        { label: 'Line 1', code: 'enum Status { CREATED, PICKED_UP, DELIVERED }', text: 'Declares the type `Status` with three constants. It sits in the same file as the class, so it is not `public`.' },
        { label: 'Line 4', code: 'static void report(String id, Status status) {', text: 'A parameter of type `Status`. Callers can only pass one of the three constants (or `null`).' },
        { label: 'Line 5', code: 'System.out.println("Parcel " + id + " is " + status);', text: 'Joining an enum with a String uses its name, so you see `CREATED`, not a number.' },
        { label: 'Line 9', code: 'Status status = Status.CREATED;', text: 'A variable of the enum type. The constant is reached with the type name and a dot.' },
        { label: 'Line 12', code: 'status = Status.PICKED_UP;', text: 'You can change which constant the variable holds, like with any variable.' },
        { label: 'Line 16', code: 'System.out.println(status == other);', text: 'Both variables point at the one and only `PICKED_UP` object, so `==` gives `true`.' },
        { label: 'Line 19', code: 'for (Status s : Status.values()) {', text: '`values()` returns all constants as an array, in the order of the declaration.' }
      ],
      sections: [
        {
          title: 'Where an enum can live',
          text: [
            'An enum can sit in three places. All three work the same way; they only change how other code reaches it.'
          ],
          table: {
            head: ['Where', 'How it looks', 'How you reach it'],
            rows: [
              ['Own file `Status.java`', '`public enum Status { … }`', '`Status.CREATED` from every class'],
              ['Same file as a class', '`enum Status { … }` (not public)', '`Status.CREATED` from the same package'],
              ['Inside a class (nested)', '`class Pizza { enum Size { … } }`', '`Pizza.Size.SMALL` from outside, `Size.SMALL` inside']
            ],
            note: 'A file can have only one public type, and its name must match the file name. That rule from [Getting Started](../getting-started/index.html) also holds for enums. In real projects most enums get their own file.'
          },
          fileName: 'PizzaShop.java',
          code: `public class PizzaShop {
    enum Size { SMALL, MEDIUM, LARGE }

    static int price(Size size) {
        if (size == Size.SMALL) return 8;
        if (size == Size.MEDIUM) return 10;
        return 12;
    }

    public static void main(String[] args) {
        Size mine = Size.MEDIUM;
        System.out.println(mine + " costs " + price(mine) + " euros");
        System.out.println(Size.LARGE + " costs " + price(Size.LARGE) + " euros");
    }
}`,
          output: `MEDIUM costs 10 euros
LARGE costs 12 euros`,
          tip: 'A nested enum is always `static` by itself. You do not need an object of `PizzaShop` to use `PizzaShop.Size.SMALL`.'
        },
        {
          title: 'One object per constant',
          text: [
            'When the enum is used for the first time, the JVM creates one object for each constant and keeps it forever. Variables only hold a **reference** (an arrow) to one of these objects, as you know from [Classes & Objects](../classes-and-objects/index.html).',
            'That is why `==` works: it asks “do both arrows point at the same object?”, and for the same constant the answer is always yes.'
          ],
          mermaid: `flowchart LR
  a["variable a"] --> D["object DELIVERED"]
  b["variable b"] --> D
  c["variable c"] --> P["object PICKED_UP"]
  X["object CREATED"]`,
          diagramNote: 'Three objects exist, one per constant. `a == b` is `true`, `a == c` is `false`. No code can create a fourth object.'
        },
        {
          title: '== or equals?',
          text: [
            'Both `==` and `equals` give the same answer for enums, because `equals` of an enum is written as `this == other`. Still, `==` is the better habit, for two reasons.',
            'First, `==` works when the left side is `null`, while `null.equals(...)` throws a `NullPointerException`. Second, `==` is checked by the compiler: comparing a `Status` with a `Color` does not compile (`incomparable types: Status and Color`), while `equals` with the wrong type compiles and returns `false`.'
          ],
          fileName: 'CompareEnums.java',
          code: `enum Status { CREATED, PICKED_UP, DELIVERED }

public class CompareEnums {
    public static void main(String[] args) {
        Status a = Status.DELIVERED;
        Status b = Status.DELIVERED;
        Status nothing = null;

        System.out.println(a == b);
        System.out.println(a.equals(b));
        System.out.println(nothing == Status.DELIVERED);
        System.out.println(Status.DELIVERED.equals(nothing));
        try {
            System.out.println(nothing.equals(Status.DELIVERED));
        } catch (NullPointerException e) {
            System.out.println("NullPointerException");
        }
    }
}`,
          output: `true
true
false
false
NullPointerException`
        },
        {
          title: 'An enum variable can be null',
          text: [
            'An enum is a reference type, so a variable of that type can hold `null` (“no constant at all”). A field of an enum type that you never set is `null`, too.',
            'Calling a method on `null` throws a `NullPointerException`, the same as with any object. When a value can be missing, check it with `== null` first, or give the field a start value like `Status.CREATED`.'
          ],
          fileName: 'NullStatus.java',
          code: `enum Status { CREATED, PICKED_UP, DELIVERED }

public class NullStatus {
    static Status lastSeen;            // never set, so it is null

    public static void main(String[] args) {
        System.out.println("lastSeen = " + lastSeen);
        if (lastSeen == null) {
            System.out.println("No status yet, using CREATED");
            lastSeen = Status.CREATED;
        }
        System.out.println("lastSeen = " + lastSeen);
    }
}`,
          output: `lastSeen = null
No status yet, using CREATED
lastSeen = CREATED`,
          warn: 'Give enum fields a start value when you can: `Status status = Status.CREATED;`. A `null` that travels far through the program is hard to trace back.'
        }
      ],
      technical: [
        'javac turns `enum Status { … }` into a class `Status` that extends `java.lang.Enum`. Each constant becomes a `public static final` field that holds one `Status` object. The last lesson on this page shows the generated class in detail.',
        'The objects are created in the **static initializer** of the class, a block of code the JVM runs once, the first time the class is used. After that, no new `Status` object can be made: the constructor is private, and `new Status()` is a compile error.',
        'A variable of type `Status` holds a reference of 4 or 8 bytes, like any object variable. `==` compares two references, which takes one CPU instruction.'
      ],
      tryIt: {
        steps: [
          'Copy `Parcel.java`, compile and run it.',
          'Add a fourth constant `RETURNED` at the end of the enum and run again.',
          'Write `Status s = Status.Delivered;` in `main` and compile.',
          'Delete that line again.'
        ],
        see: 'With RETURNED the loop prints four statuses without any other change. `Status.Delivered` fails with `cannot find symbol`, because case matters.'
      },
      check: [
        { q: 'How do you write a constant of the enum `Size` in your code?', a: 'With the type name and a dot: `Size.SMALL`. Inside the enum itself or in a `switch` case you can write `SMALL`.' },
        { q: 'How many `Status.DELIVERED` objects exist in a running program?', a: 'Exactly one. Every variable that holds `Status.DELIVERED` points at that object.' },
        { q: 'What does `Status.values()` return?', a: 'A new array with all constants of `Status`, in the order of the declaration.' }
      ],
      keyPoints: [
        '`enum Name { A, B, C }` declares a new type with exactly these values.',
        'Constants are in CAPITALS, the type name is singular PascalCase.',
        'Each constant is one object; compare with `==`.',
        '`values()` gives all constants, in declaration order.',
        'An enum variable can still be `null`.'
      ],
      commonMistakes: [
        '`Status s = "CREATED";`: a String is not a `Status`. Write `Status.CREATED`, or convert text with `Status.valueOf("CREATED")`.',
        '`public enum Status` in a file called `Parcel.java`: only the type named like the file may be public. Drop `public` or move the enum to `Status.java`.',
        '`if (status.equals(Status.DELIVERED))` when `status` can be `null`: it throws. Write `status == Status.DELIVERED`.',
        'Plural type names like `enum Colors`. One value is one colour: `Color.RED` reads better than `Colors.RED`.'
      ],
      related: ['Classes & Objects', 'Strings', 'Control Flow']
    }
  ]);
})();
