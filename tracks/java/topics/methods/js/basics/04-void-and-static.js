// Lesson 4: void methods and static methods.
(function () {
  Java.addCoreLessons('methods', [{
    id: 'void-and-static',
    title: 'void and static',
    category: 'practice',
    icon: '()',
    tagline: 'Use helper methods from main',
    realWorld: 'A doorbell and a calculator. The doorbell does something (it rings), but you get nothing to keep. The calculator works and shows you a number. A `void` method is a doorbell.',
    kid: [
      'Some jobs give you something back, like a juice machine. Other jobs only do something, like ringing a bell. When you press the bell, it rings. Nothing lands in your hand.',
      'In Java, a method that only does something has the word `void` on its name tag. "Void" means "empty": nothing comes back.',
      'The word `static` means the job belongs to the whole program file, not to one special thing in it. So `main` can use it right away.'
    ],
    definition: 'A `void` method does a job and returns no value. A `static` method belongs to the class, so `main` (which is also `static`) can call it by its name without creating an object.',
    explain: [
      '`void` is the return type that means "no value". Use it for methods whose job is a **side effect**: a change outside the method, like printing a line, writing a file, or changing an array the caller can see.',
      'A `void` method can use `return;` with no value. It ends the method early. Without it, the method ends at its closing `}`.',
      'A call of a `void` method is a statement on its own: `printHeader("Cart");`. You cannot store it in a variable or print it, because there is no value to store.',
      '`static` means the method belongs to the **class** (the `public class ...` block around your code), not to an object made from that class. `main` is `static`, and a static method can call the other static methods of its class by their plain name.',
      'From another class you write the class name and a dot in front: `Math.max(3, 9)`. Inside its own class the class name is optional: `printHeader("Done")` and `VoidHelpers.printHeader("Done")` call the same method.',
      'Methods without `static` are **instance methods**: they belong to one object, like `"hello".length()` belongs to that one piece of text. You learn them in [Classes and objects](../classes-and-objects/index.html). Until then, write `static` on every helper.'
    ],
    why: 'Many jobs have no answer to hand back. They print, save or show something. `void` says this clearly in the header. `static` lets you write helpers long before you learn objects.',
    whenUse: '`void` for a method whose job is to print, save or change something. A real return type for a method that computes an answer. `static` on every helper in this topic.',
    syntax: '`static void name(params) { … }`, called as a statement: `name(args);`. From another class: `ClassName.name(args);`',
    fileName: 'VoidHelpers.java',
    code: `public class VoidHelpers {
    static void printHeader(String title) {
        System.out.println("== " + title + " ==");
    }

    static void printLine(String label, int value) {
        if (value < 0) {
            System.out.println(label + ": (invalid)");
            return;                       // ends the method early
        }
        System.out.println(label + ": " + value);
    }

    static int totalCents(int price, int count) {
        return price * count;
    }

    public static void main(String[] args) {
        printHeader("Cart");
        printLine("Items", 3);
        printLine("Total cents", totalCents(433, 3));
        printLine("Discount", -5);
        VoidHelpers.printHeader("Done");  // with the class name: same method
        System.out.println(Math.max(3, 9)); // a static method of another class
    }
}`,
    output: `== Cart ==
Items: 3
Total cents: 1299
Discount: (invalid)
== Done ==
9`,
    codeSummary: 'Two `void` helpers that print, one helper that returns an `int`, and calls with and without the class name in front.',
    codeExplanation: [
      { label: 'Line 2', code: 'static void printHeader(String title) {', text: '`void`: this method prints and gives nothing back.' },
      { label: 'Line 6', code: 'static void printLine(String label, int value) {', text: 'A `void` method can still take parameters.' },
      { label: 'Line 9', code: 'return;', text: '`return` without a value ends a `void` method early. Line 11 does not run for negative values.' },
      { label: 'Line 14', code: 'static int totalCents(int price, int count) {', text: 'Not `void`: this helper computes and returns an answer.' },
      { label: 'Line 19', code: 'printHeader("Cart");', text: 'A `void` call is a statement of its own. Nothing to store.' },
      { label: 'Line 21', code: 'printLine("Total cents", totalCents(433, 3));', text: 'The `int` result of `totalCents` (1299) becomes the argument of the `void` method `printLine`.' },
      { label: 'Line 22', code: 'printLine("Discount", -5);', text: 'The early `return` runs, so it prints `(invalid)`.' },
      { label: 'Line 23', code: 'VoidHelpers.printHeader("Done");', text: 'The class name in front is allowed, but not needed inside the own class.' },
      { label: 'Line 24', code: 'System.out.println(Math.max(3, 9));', text: '`max` is a static method of the class `Math`. From outside you need the class name.' }
    ],
    sections: [
      {
        title: 'void or a return type?',
        text: [
          'Both kinds are useful. The question is: does the caller need a value back?',
          'The second program shows the difference. `printDouble` can only print. `doubled` gives back a number, so the caller can print it, store it, or pass it on, even into `doubled` again.'
        ],
        table: {
          head: ['', '`static void printDouble(int n)`', '`static int doubled(int n)`'],
          rows: [
            ['What comes back', 'nothing', 'an `int`'],
            ['How you call it', '`printDouble(4);`', '`int d = doubled(4);`'],
            ['Can you store the result?', 'no', 'yes'],
            ['Typical job', 'print, save, show', 'compute, check, convert']
          ]
        },
        fileName: 'PrintOrReturn.java',
        code: `public class PrintOrReturn {
    static void printDouble(int n) {
        System.out.println(n * 2);
    }

    static int doubled(int n) {
        return n * 2;
    }

    public static void main(String[] args) {
        printDouble(4);
        int d = doubled(4);
        System.out.println(d + 1);
        System.out.println(doubled(doubled(3)));
    }
}`,
        output: `8
9
12`
      },
      {
        title: 'return; in a void method',
        text: [
          'In `printLine`, a negative value is a problem. The method prints a warning and leaves with `return;`. This pattern is called a **guard**: check the bad case first and leave, then do the normal work without extra nesting.'
        ],
        mermaid: `flowchart TD
    S["printLine(label, value)"] --> Q{"is value negative?"}
    Q -->|yes| W["print label: (invalid)"]
    W --> R["return: leave the method"]
    Q -->|no| P["print label: value"]
    P --> E["closing brace: method ends"]`,
        diagramNote: 'Two ways out of the method. Both end it; neither hands back a value.'
      },
      {
        title: 'static: calling from another class',
        text: [
          'A file may hold more than one class, but only one may be `public`, and the file is named after that one. Below, `Tools` is a second class. `main` must call its methods as `Tools.square(...)`.',
          'This is the same as `Math.max(...)`: `Math` is a class from Java, and `max` is one of its static methods.'
        ],
        fileName: 'StaticCalls.java',
        code: `class Tools {
    static int square(int n) {
        return n * n;
    }

    static void shout(String word) {
        System.out.println(word + "!");
    }
}

public class StaticCalls {
    public static void main(String[] args) {
        System.out.println(Tools.square(4));
        Tools.shout("Hello");
        System.out.println(Math.abs(-7));
    }
}`,
        output: `16
Hello!
7`
      },
      {
        title: 'Wrong: using the result of a void method',
        text: [
          'A `void` method has no result, so it cannot be stored or printed. javac stops at both lines.'
        ],
        fileName: 'VoidResult.java',
        noRun: true,
        code: `public class VoidResult {
    static void printHeader(String title) {
        System.out.println("== " + title + " ==");
    }

    public static void main(String[] args) {
        int n = printHeader("Cart");               // wrong
        System.out.println(printHeader("Cart"));   // wrong
    }
}`,
        output: `VoidResult.java:7: error: incompatible types: void cannot be converted to int
        int n = printHeader("Cart");               // wrong
                           ^
VoidResult.java:8: error: 'void' type not allowed here
        System.out.println(printHeader("Cart"));   // wrong
                                      ^
2 errors`,
        warn: 'This code does not compile on purpose. Fix: call `printHeader("Cart");` as its own statement, or give the method a return type and `return` a value.'
      },
      {
        title: 'Wrong: forgetting static',
        text: [
          'Without `static`, `greet` is an instance method. It belongs to an object, but `main` has no object. javac says so.'
        ],
        fileName: 'MissingStatic.java',
        noRun: true,
        code: `public class MissingStatic {
    void greet() {                 // no static
        System.out.println("Hi");
    }

    public static void main(String[] args) {
        greet();
    }
}`,
        output: `MissingStatic.java:7: error: non-static method greet() cannot be referenced from a static context
        greet();
        ^
1 error`,
        tip: 'Fix: `static void greet()`. When you learn objects, you will also meet the other fix: make an object and call the method on it.'
      }
    ],
    technical: [
      'A static method compiles to bytecode that is called with the instruction `invokestatic`. The class and method are fixed at compile time, so no object is needed for the call.',
      'Instance methods are called with `invokevirtual`. That instruction needs an object as a hidden first argument, which the method sees as `this`. A static method has no `this`. That is why a static `main` cannot call an instance method on its own: there is no object to pass.',
      'For a `void` method javac writes a plain `return` instruction with no value. Nothing lands on the caller\'s scratch pad, so there is nothing to store, and javac refuses `int n = printHeader(...)` before the program runs.'
    ],
    tryIt: {
      steps: [
        'Make `Boxes.java` with `static void printBox(String text)`.',
        'Let it print three lines: `+-------+`, then `| ` + text + ` |`, then `+-------+`.',
        'In `main`, call `printBox("Hello")` and `printBox("Bye")`.',
        'Compile and run. Then try `String s = printBox("Hi");` and read the error.'
      ],
      see: 'two small boxes, each with its own word; the extra line gives `void cannot be converted to String`.'
    },
    check: [
      { q: 'Why does `int n = printHeader("Cart");` not compile?', a: '`printHeader` is `void`. It gives back no value, so there is nothing to put into `n`.' },
      { q: 'What does `return;` do inside a `void` method?', a: 'It ends the method early. No value goes back.' },
      { q: 'How do you call the static method `square` of the class `Tools` from another class?', a: '`Tools.square(4)`: the class name, a dot, then the call.' }
    ],
    keyPoints: [
      '`void` means the method returns no value.',
      'A `void` call is a statement on its own.',
      '`return;` ends a `void` method early.',
      '`static` methods belong to the class; `main` can call them by name.',
      'From another class: `ClassName.method(...)`, like `Math.max(3, 9)`.'
    ],
    commonMistakes: [
      'Storing a void result: `int n = printHeader("Cart");`. Fix: call it as its own statement, or give the method a return type.',
      'Forgetting `static`: `void greet()` called from `main` gives `non-static method greet() cannot be referenced from a static context`. Fix: `static void greet()`.',
      'A value in a void return: `return 0;` gives `incompatible types: unexpected return value`. Fix: `return;`, or change the return type to `int`.',
      'Printing when the caller needs the value: `static void sum(int a, int b) { System.out.println(a + b); }`. Fix: `return a + b;` and let the caller print.'
    ],
    related: ['Parameters and Return Values', 'Classes & Objects']
  }]);
})();
