// Lesson 9: common compile errors with methods (missing return, wrong types, wrong arguments ...).
(function () {
  Java.addCoreLessons('methods', [{
    id: 'method-errors',
    title: 'Common Method Errors',
    category: 'habits',
    icon: '!',
    tagline: 'Read what javac tells you',
    realWorld: 'A teacher who checks your homework before you hand it in. She points at the exact line: "the answer is missing here", "this should be a number, not a word".',
    kid: [
      'Before your program runs, a helper called javac reads all of it. It checks that every method keeps its promise and that every call fits.',
      'When something does not fit, javac does not guess. It stops and tells you the line and what is wrong, like a teacher with a red pen.',
      'That is good news. You find the mistake on your own screen, long before anyone uses your program.'
    ],
    definition: 'javac checks every method header and every call before the program runs. The most common method errors are a **missing return**, a **wrong type** (of an argument or a return value), the **wrong number of arguments**, a **name javac cannot find**, and **unreachable code** after `return`.',
    explain: [
      'A javac error has a fixed shape: the file name, the line number, the word `error:` and a short text. Below it you see the line itself, with a `^` under the spot. Read the **first** error first; later errors are often caused by it.',
      '`missing return statement`: the method promises a value (its return type is not `void`), but some path reaches the closing `}` without `return`. Often it is an `if` without a final `return` or `else`.',
      '`incompatible types`: a value has the wrong type. You return a `String` from an `int` method, or pass `"5"` where an `int` is expected. `possible lossy conversion from double to int` is a special case: Java does not drop decimals unless you say so with a cast like `(int)`.',
      '`cannot be applied to given types`: the number or the types of the arguments do not fit any method with that name. The message lists `required:` (what the header wants) and `found:` (what you passed).',
      '`cannot find symbol`: javac knows no method or variable with that name here. Usually a typo, the wrong upper/lower case (`printline` vs `printLine`), or a variable from another method. `unreachable statement`: a line after `return` that can never run.'
    ],
    why: 'Knowing the five messages turns a scary block of red text into a quick fix. Most method errors are one of them.',
    whenUse: 'Every time `javac` prints `error:`. Find the line number, find the message in this lesson, apply the fix.',
    syntax: 'The shape of every message: `File.java:LINE: error: MESSAGE`, then the line, then `^` under the spot.',
    fileName: 'FixedMethods.java',
    code: `public class FixedMethods {
    static String sign(int n) {
        if (n > 0) {
            return "positive";
        } else if (n < 0) {
            return "negative";
        }
        return "zero";                    // every path returns a String
    }

    static int half(double value) {
        return (int) (value / 2);         // cast: drop the decimals on purpose
    }

    static int parseAge(String text) {
        return Integer.parseInt(text);    // turns the text "12" into the int 12
    }

    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(sign(-3));
        System.out.println(sign(0));
        System.out.println(half(9.0));
        System.out.println(parseAge("12") + 1);
        System.out.println(add(2, 3));
    }
}`,
    output: `negative
zero
4
13
5`,
    codeSummary: 'The fixed versions of the broken methods you see in the steps below. Every method keeps its promise, and every call fits its header.',
    codeExplanation: [
      { label: 'Line 2', code: 'static String sign(int n) {', text: 'The header promises a `String` on every call.' },
      { label: 'Line 5', code: '} else if (n < 0) {', text: 'Two paths are covered. The third path, `n == 0`, still needs an answer.' },
      { label: 'Line 8', code: 'return "zero";', text: 'The last `return` covers every path that is left. Without it: `missing return statement`.' },
      { label: 'Line 12', code: 'return (int) (value / 2);', text: '`value / 2` is a `double`. The cast `(int)` says: yes, drop the decimals. 4.5 becomes 4.' },
      { label: 'Line 16', code: 'return Integer.parseInt(text);', text: 'To get an `int` from text, convert it. Returning `text` itself would be `incompatible types`.' },
      { label: 'Line 27', code: 'System.out.println(parseAge("12") + 1);', text: '`parseAge` returns an `int`, so `+ 1` is maths: 13, not `"121"`.' },
      { label: 'Line 28', code: 'System.out.println(add(2, 3));', text: 'Two `int` arguments for two `int` parameters: it fits.' }
    ],
    sections: [
      {
        title: 'missing return statement',
        text: [
          'This `sign` has no answer for 0. If `n` is 0, both conditions are false, and the method reaches its `}` with nothing to return. javac points at that `}`.'
        ],
        mermaid: `flowchart TD
    S["sign(n)"] --> A{"is n positive?"}
    A -->|yes| P["return positive"]
    A -->|no| B{"n is negative?"}
    B -->|yes| N["return negative"]
    B -->|no| X["closing brace: no value!"]`,
        diagramNote: 'javac follows every path. One path ends without a value, so the method breaks its promise.',
        fileName: 'MissingReturn.java',
        noRun: true,
        code: `public class MissingReturn {
    static String sign(int n) {
        if (n > 0) {
            return "positive";
        } else if (n < 0) {
            return "negative";
        }
    }

    public static void main(String[] args) {
        System.out.println(sign(5));
    }
}`,
        output: `MissingReturn.java:8: error: missing return statement
    }
    ^
1 error`,
        tip: 'Fix: add a `return` for the path that is left, like `return "zero";` before the `}`. Or turn the last `else if` into a plain `else`.'
      },
      {
        title: 'incompatible types in a return',
        text: [
          'The value after `return` must fit the return type. A `double` does not fit into `int` (decimals would be lost), and a `String` never fits into `int`.'
        ],
        fileName: 'WrongReturn.java',
        noRun: true,
        code: `public class WrongReturn {
    static int half(double value) {
        return value / 2;
    }

    static int count() {
        return "3";
    }

    public static void main(String[] args) {
        System.out.println(half(9.0) + count());
    }
}`,
        output: `WrongReturn.java:3: error: incompatible types: possible lossy conversion from double to int
        return value / 2;
                     ^
WrongReturn.java:7: error: incompatible types: String cannot be converted to int
        return "3";
               ^
2 errors`,
        tip: 'Fix: either change the return type (`static double half(...)`), or convert the value: `(int) (value / 2)`, `return 3;`.'
      },
      {
        title: 'Arguments that do not fit',
        text: [
          '`add` wants two `int` values. One call passes one value, the other passes a `String`. Read `required:` and `found:` side by side.'
        ],
        fileName: 'WrongArgs.java',
        noRun: true,
        code: `public class WrongArgs {
    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(add(1));
        System.out.println(add("1", 2));
    }
}`,
        output: `WrongArgs.java:7: error: method add in class WrongArgs cannot be applied to given types;
        System.out.println(add(1));
                           ^
  required: int,int
  found:    int
  reason: actual and formal argument lists differ in length
WrongArgs.java:8: error: incompatible types: String cannot be converted to int
        System.out.println(add("1", 2));
                               ^
Note: Some messages have been simplified; recompile with -Xdiags:verbose to get full output
2 errors`,
        tip: '"actual" arguments are the ones in your call; "formal" arguments are the parameters in the header. Fix: `add(1, 0)` and `add(1, 2)`.'
      },
      {
        title: 'cannot find symbol',
        text: [
          'Java names are case-sensitive. `printline` and `printLine` are two different names, and only one exists.'
        ],
        fileName: 'Typo.java',
        noRun: true,
        code: `public class Typo {
    static void printLine(String text) {
        System.out.println(text);
    }

    public static void main(String[] args) {
        printline("hello");
    }
}`,
        output: `Typo.java:7: error: cannot find symbol
        printline("hello");
        ^
  symbol:   method printline(String)
  location: class Typo
1 error`,
        tip: 'Fix: `printLine("hello");`. The `symbol:` line shows exactly which name javac looked for.'
      },
      {
        title: 'unreachable statement, and a cheat sheet',
        text: [
          '`return` ends the method. A line after it in the same block can never run, and javac refuses code that can never run.'
        ],
        fileName: 'Unreachable.java',
        noRun: true,
        code: `public class Unreachable {
    static int twice(int n) {
        return n * 2;
        System.out.println("done");
    }

    public static void main(String[] args) {
        System.out.println(twice(4));
    }
}`,
        output: `Unreachable.java:4: error: unreachable statement
        System.out.println("done");
        ^
1 error`,
        table: {
          head: ['Message', 'What it means', 'Fix'],
          rows: [
            ['`missing return statement`', 'a path ends without `return`', 'add a `return` for that path'],
            ['`incompatible types: X cannot be converted to Y`', 'a value of the wrong type', 'change the type or convert the value'],
            ['`possible lossy conversion from double to int`', 'decimals would be lost', 'cast `(int)` or use `double`'],
            ['`cannot be applied to given types`', 'wrong number or types of arguments', 'compare `required:` and `found:`'],
            ['`cannot find symbol`', 'unknown name here', 'check spelling, case and scope'],
            ['`unreachable statement`', 'a line after `return`', 'move the line before `return`'],
            ['`void cannot be converted to ...`', 'using the result of a `void` method', 'call it as a statement, or return a value']
          ]
        }
      }
    ],
    technical: [
      'javac works in steps. After reading the text (**parsing**), the **attribution** step works out the type of every expression and finds the method for every call. Wrong types, wrong arguments and unknown names come from this step.',
      'Then the **flow analysis** step follows every path through each method. It reports `missing return statement`, `unreachable statement` and `variable might not have been initialized`. It treats conditions as unknown unless they are constants, so `while (true)` without `break` counts as a loop that never ends, and no `return` is needed after it.',
      'If any error is found, javac writes no `.class` file for that class. The program cannot start at all, so these mistakes never reach a user.'
    ],
    tryIt: {
      steps: [
        'Save `FixedMethods.java`, compile and run it once.',
        'Delete the line `return "zero";` and compile. Read the message and the line number.',
        'Put it back. Change `add(2, 3)` to `add(2)` and compile again.',
        'Fix it and compile once more.'
      ],
      see: 'first `missing return statement` at line 8, then `cannot be applied to given types` with `required: int,int` and `found: int`.'
    },
    check: [
      { q: '`static int f(int n) { if (n > 0) { return 1; } }` does not compile. Why?', a: 'If `n` is 0 or negative, the method reaches `}` without a value. Add `return 0;` at the end.' },
      { q: 'What does `possible lossy conversion from double to int` ask you to do?', a: 'Decide what to do with the decimals: use `double` as the type, or cast with `(int)` to drop them on purpose.' },
      { q: 'javac shows 5 errors. Which one do you fix first?', a: 'The first one. The others are often caused by it and disappear after the fix.' }
    ],
    keyPoints: [
      'javac checks headers and calls before the program runs.',
      'Every path through a non-void method needs a `return`.',
      'The returned value and every argument must fit their types.',
      '`required:` / `found:` tells you what the header wants and what you passed.',
      'Fix the first error first, then compile again.'
    ],
    commonMistakes: [
      'An `if` without a final `return`: `if (n > 0) { return 1; }`. Fix: add `return 0;` (or an `else`).',
      'Returning a `double` from an `int` method: `return value / 2;`. Fix: `return (int) (value / 2);` or make it `double`.',
      'Passing text where a number is needed: `add("1", 2)`. Fix: `add(1, 2)`, or convert with `Integer.parseInt("1")`.',
      'Wrong case in a call: `printline(...)`. Fix: `printLine(...)`, exactly as in the header.',
      'Code after `return`: `return n * 2; System.out.println("done");`. Fix: move the line above the `return`.'
    ],
    related: ['Parameters and Return Values', 'Designing Small Methods', 'Debugging']
  }]);
})();
