// Lesson 7: overloading (same name, different parameter lists).
(function () {
  Java.addCoreLessons('methods', [{
    id: 'overloading',
    title: 'Overloading',
    category: 'practice',
    icon: '+',
    tagline: 'Same name, different parameters',
    realWorld: 'The word "play". You can play, play with Tom, or play football with Tom. It is the same word, and what comes after it tells your friends which kind of playing you mean.',
    kid: [
      'When you say "draw", you can mean "draw with a pencil" or "draw with a pencil in red". It is the same job. What you hand over decides how it is done.',
      'Java lets you do the same with methods. Several methods may have the same name, as long as each one takes different things.',
      'When you call one, Java looks at what you gave it and picks the method that fits, like a key that fits only one lock.'
    ],
    definition: '**Overloading** means several methods in one class share a name but have different parameter lists: a different number of parameters, different types, or the types in a different order. javac picks the method whose parameters fit the arguments.',
    explain: [
      'Java tells methods apart by their **signature**: the name plus the parameter types. `area(int)` and `area(int, int)` have different signatures, so both may live in the same class.',
      'The choice happens at **compile time** (when javac translates your code), not while the program runs. javac looks at the number and the types of the arguments and picks the best match.',
      'The return type does not count. `int size(String s)` and `double size(String s)` cannot both exist: for a call `size("hi")` javac could not choose.',
      'Parameter names do not count either. `add(int a, int b)` and `add(int x, int y)` have the same signature, so the second one is a duplicate, not an overload.',
      'A useful pattern: the short version calls the long version with a default value. `badge(name)` calls `badge(name, "beginner")`. The real work lives in one place.',
      'You already use overloading every day. `System.out.println` has versions for `int`, `double`, `boolean`, `char`, `String` and more. That is why `println(5)` and `println("five")` both work.'
    ],
    why: 'One familiar name for one kind of action, with or without extra details. The caller does not have to remember `areaOfSquare` and `areaOfRectangle`.',
    whenUse: 'When the methods really do the same job and only the inputs differ. If they do different jobs, give them different names.',
    syntax: '`static int area(int side) { … }` and `static int area(int width, int height) { … }` side by side in one class.',
    fileName: 'OverloadingDemo.java',
    code: `public class OverloadingDemo {
    static String badge(String name) {
        return badge(name, "beginner");       // calls the two-parameter version
    }

    static String badge(String name, String level) {
        return name + " [" + level + "]";
    }

    static int area(int side) {
        return side * side;
    }

    static int area(int width, int height) {
        return width * height;
    }

    static String describe(int value) {
        return "int " + value;
    }

    static String describe(double value) {
        return "double " + value;
    }

    static String describe(String value) {
        return "String '" + value + "'";
    }

    public static void main(String[] args) {
        System.out.println(badge("Mina"));
        System.out.println(badge("Kai", "practice"));
        System.out.println(area(4));
        System.out.println(area(4, 7));
        System.out.println(describe(5));
        System.out.println(describe(5.0));
        System.out.println(describe("5"));
    }
}`,
    output: `Mina [beginner]
Kai [practice]
16
28
int 5
double 5.0
String '5'`,
    codeSummary: 'Three names, seven methods. `badge` and `area` differ in the number of parameters, `describe` in the type. javac picks the right one for each call.',
    codeExplanation: [
      { label: 'Line 2', code: 'static String badge(String name) {', text: 'The short version: one parameter.' },
      { label: 'Line 3', code: 'return badge(name, "beginner");', text: 'It calls the long version with a default level. The building of the text lives in one method only.' },
      { label: 'Line 6', code: 'static String badge(String name, String level) {', text: 'Same name, two parameters: a different signature, so it is allowed.' },
      { label: 'Line 14', code: 'static int area(int width, int height) {', text: 'A rectangle. `area(int)` above is a square. Same job, different inputs.' },
      { label: 'Line 22', code: 'static String describe(double value) {', text: 'Same number of parameters as `describe(int)`, but a different type.' },
      { label: 'Line 31', code: 'System.out.println(badge("Mina"));', text: 'One `String` argument: javac picks `badge(String)`.' },
      { label: 'Line 34', code: 'System.out.println(area(4, 7));', text: 'Two `int` arguments: javac picks `area(int, int)`.' },
      { label: 'Line 35', code: 'System.out.println(describe(5));', text: '`5` is an `int` literal, so `describe(int)` is an exact match.' },
      { label: 'Line 36', code: 'System.out.println(describe(5.0));', text: '`5.0` is a `double` literal: `describe(double)`.' },
      { label: 'Line 37', code: 'System.out.println(describe("5"));', text: '`"5"` is text: `describe(String)`.' }
    ],
    sections: [
      {
        title: 'How javac picks a method',
        text: [
          'javac collects all methods with the right name and the right number of parameters. Then it looks for a fit.',
          'If no method takes the exact type, javac tries **widening**: a smaller number type grows into a bigger one, in the order `byte → short → int → long → float → double`. Among several that fit, it takes the most specific one, the closest step.'
        ],
        mermaid: `flowchart TD
    C["call: show(5)"] --> N["methods named show with 1 parameter"]
    N --> E{"one takes int exactly?"}
    E -->|yes| U["use it"]
    E -->|no| W{"one fits after widening?"}
    W -->|yes| S["use the closest fit"]
    W -->|no| X["compile error"]`,
        diagramNote: 'All of this happens inside javac. When the program runs, the choice is already made.',
        fileName: 'WideningPick.java',
        code: `public class WideningPick {
    static String show(long value) {
        return "long " + value;
    }

    static String show(double value) {
        return "double " + value;
    }

    public static void main(String[] args) {
        System.out.println(show(5));      // int: no exact match, long is closest
        System.out.println(show(5L));     // long: exact
        System.out.println(show(2.5));    // double: exact
    }
}`,
        output: `long 5
long 5
double 2.5`
      },
      {
        title: 'What counts and what does not',
        table: {
          head: ['Two methods', 'Valid overload?', 'Why'],
          rows: [
            ['`area(int)` and `area(int, int)`', 'yes', 'different number of parameters'],
            ['`show(int)` and `show(double)`', 'yes', 'different types'],
            ['`pair(int, String)` and `pair(String, int)`', 'yes', 'types in a different order'],
            ['`int size(String)` and `double size(String)`', 'no', 'only the return type differs'],
            ['`add(int a, int b)` and `add(int x, int y)`', 'no', 'only the parameter names differ']
          ],
          note: 'Only the parameter types (count, type, order) count.'
        }
      },
      {
        title: 'Wrong: overloading by return type',
        text: [
          'Both methods below have the signature `size(String)`. javac sees the same method twice.'
        ],
        fileName: 'ReturnOnly.java',
        noRun: true,
        code: `public class ReturnOnly {
    static int size(String text) {
        return 2;
    }

    static double size(String text) {     // wrong: same signature
        return 2.0;
    }

    public static void main(String[] args) {
        System.out.println(size("hi"));
    }
}`,
        output: `ReturnOnly.java:6: error: method size(String) is already defined in class ReturnOnly
    static double size(String text) {     // wrong: same signature
                  ^
1 error`,
        warn: 'This code does not compile on purpose. Fix: give the second method another name, like `sizeAsDouble`, or a different parameter list.'
      },
      {
        title: 'Default values with overloads',
        text: [
          'Some languages let you write a default value right in the parameter list. Java does not. Overloads are the Java way: the shorter version fills in the default and calls the longer one.'
        ],
        fileName: 'Greeter.java',
        code: `public class Greeter {
    static void greet(String name) {
        greet(name, 1);                    // default: greet once
    }

    static void greet(String name, int times) {
        for (int i = 0; i < times; i++) {
            System.out.println("Hi, " + name + "!");
        }
    }

    public static void main(String[] args) {
        greet("Lea");
        greet("Ben", 3);
    }
}`,
        output: `Hi, Lea!
Hi, Ben!
Hi, Ben!
Hi, Ben!`
      },
      {
        title: 'Wrong: an ambiguous call',
        text: [
          'Sometimes two methods fit equally well. For `pick(1, 2)`, both need one widening step from `int` to `double`. Neither is closer, so javac refuses to guess.'
        ],
        fileName: 'Ambiguous.java',
        noRun: true,
        code: `public class Ambiguous {
    static void pick(int a, double b) {
        System.out.println("int, double");
    }

    static void pick(double a, int b) {
        System.out.println("double, int");
    }

    public static void main(String[] args) {
        pick(1, 2);                        // wrong: both fit equally
    }
}`,
        output: `Ambiguous.java:11: error: reference to pick is ambiguous
        pick(1, 2);                        // wrong: both fit equally
        ^
  both method pick(int,double) in Ambiguous and method pick(double,int) in Ambiguous match
1 error`,
        tip: 'This code does not compile on purpose. Fix: make the call exact, like `pick(1, 2.0)`, or remove one of the two overloads.'
      }
    ],
    technical: [
      'javac picks an overload in up to three rounds. Round 1 allows exact matches and widening only. Round 2 also allows **boxing** (an `int` becoming an `Integer` object, see [Types and variables](../types-and-variables/index.html)). Round 3 also allows varargs (the Deeper lesson at the end). It stops at the first round that finds a fit and takes the most specific method there.',
      'The chosen method is written into the bytecode with its full descriptor, for example `area:(II)I`. At run time nothing is chosen any more; the JVM calls exactly that method.',
      'Inside the `.class` file the return type is part of the descriptor, so the JVM itself could tell `size()I` from `size()D` apart. The Java language forbids it anyway, because a call would be unclear to javac and to the reader.'
    ],
    tryIt: {
      steps: [
        'Make `MaxOverloads.java` with `static int max(int a, int b)` that returns the bigger number.',
        'Add `static int max(int a, int b, int c)` that returns `max(max(a, b), c)`.',
        'In `main`, print `max(4, 9)` and `max(4, 9, 2)`.',
        'Compile and run.'
      ],
      see: '`9` and `9`. The three-parameter version reuses the two-parameter one.'
    },
    check: [
      { q: 'Can a class have `int total(int a)` and `int total(int a, int b)`?', a: 'Yes. The number of parameters differs, so the signatures differ.' },
      { q: 'Can a class have `int read()` and `String read()`?', a: 'No. Only the return type differs; the signature `read()` is the same.' },
      { q: 'When does Java decide which overload to call: when compiling or when running?', a: 'When compiling. javac picks the method from the argument types and writes that choice into the bytecode.' }
    ],
    keyPoints: [
      'Overloads share a name but differ in their parameter list.',
      'Count, types and order of parameters count; return type and names do not.',
      'javac picks the overload at compile time from the arguments.',
      'A short overload can call a long one to supply a default value.',
      'Overload only when the methods do the same job.'
    ],
    commonMistakes: [
      'Overloading by return type only: `int size(String s)` and `double size(String s)`. Fix: a different name or different parameters.',
      'Overloads that do unrelated jobs, like `print(int)` that prints and `print(String)` that saves a file. Fix: give different jobs different names.',
      'Copying the whole body into every overload. Fix: let the short version call the long one, like `badge(name, "beginner")`.',
      'An ambiguous call like `pick(1, 2)` with `pick(int, double)` and `pick(double, int)`. Fix: pass exact types, `pick(1, 2.0)`.'
    ],
    related: ['Anatomy of a Method', 'Varargs: Any Number of Arguments', 'Types & Variables']
  }]);
})();
