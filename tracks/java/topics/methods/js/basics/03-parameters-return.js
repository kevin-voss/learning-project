// Lesson 3: parameters vs arguments, return values.
(function () {
  Java.addCoreLessons('methods', [{
    id: 'parameters-return',
    anim: 'vending',
    title: 'Parameters and Return Values',
    category: 'concept',
    icon: 'fn',
    tagline: 'Inputs in, result out',
    realWorld: 'A vending machine. You put in a coin and press a number: those are the inputs. The machine does its job and drops one snack into the tray: that is the result.',
    kid: [
      'A vending machine needs two things from you: a coin and a button number. Those are the things you give it.',
      'Then it works inside, where you cannot see. At the end it drops out one snack. That is the thing it gives back.',
      'A method can work the same way. You hand it some values. It does its job. It hands one value back, and you can keep it in a variable, like you keep the snack in your bag.'
    ],
    definition: '**Parameters** are the input variables in a method header. **Arguments** are the real values you pass when you call the method. `return` ends the method and sends one value back to the caller.',
    explain: [
      'In `static int add(int a, int b)`, `a` and `b` are parameters. Think of them as empty boxes with labels. In the call `add(7, 5)`, the values `7` and `5` are arguments. Java copies the first argument into the first parameter and the second into the second.',
      'Arguments are matched by **position**, not by name. The call `add(x, y)` copies `x` into `a` and `y` into `b`, whatever the caller calls its variables. The number of arguments must equal the number of parameters, and each type must fit.',
      'An argument can be any **expression** (a piece of code that produces a value): a literal `7`, a variable `price`, a sum `price * 2`, even another call `add(1, 2)`. Java works out the value first, then passes that value.',
      'The **return type** in the header promises what kind of value comes back. `return a + b;` does two things: it stops the method right away, and it hands the value back. The call `add(7, 5)` then stands for `12` in the line where it was written.',
      'The **caller** is the code that called the method. It can store the result (`int total = add(7, 5);`), print it, or use it in a bigger expression (`add(7, 5) * 2`).'
    ],
    why: 'Parameters make one method work for many values. A return value lets the caller decide what to do with the result: print it, store it, or compute more with it.',
    whenUse: 'Whenever a method computes something: a total, a yes/no check, a converted value. Give it the inputs it needs and return the answer.',
    syntax: '`static returnType name(type param1, type param2) { … return value; }` and the call `returnType result = name(arg1, arg2);`',
    fileName: 'MethodBasics.java',
    code: `public class MethodBasics {
    static int add(int a, int b) {
        return a + b;
    }

    static double celsiusToFahrenheit(double celsius) {
        return celsius * 9 / 5 + 32;
    }

    static String labelScore(String name, int score) {
        return name + ": " + score + " points";
    }

    static boolean isPassing(int score) {
        return score >= 50;
    }

    public static void main(String[] args) {
        int total = add(7, 5);
        System.out.println(total);

        int x = 30;
        int y = 12;
        System.out.println(add(x, y));          // variables as arguments
        System.out.println(add(total, 1) * 2);  // a call inside an expression

        System.out.println(celsiusToFahrenheit(20.0));
        System.out.println(labelScore("Ada", total));
        System.out.println("Passed? " + isPassing(total));
    }
}`,
    output: `12
42
26
68.0
Ada: 12 points
Passed? false`,
    codeSummary: 'Four methods that each take inputs and return one value of a different type: `int`, `double`, `String` and `boolean`. `main` uses the results in different ways.',
    codeExplanation: [
      { label: 'Line 2', code: 'static int add(int a, int b) {', text: 'Two parameters, `a` and `b`. The return type `int` promises an `int` back.' },
      { label: 'Line 3', code: 'return a + b;', text: 'Works out the sum and hands it back. The method ends here.' },
      { label: 'Line 7', code: 'return celsius * 9 / 5 + 32;', text: '`celsius` is a `double`, so the whole calculation is done with decimals.' },
      { label: 'Line 11', code: 'return name + ": " + score + " points";', text: 'A method can build and return text.' },
      { label: 'Line 15', code: 'return score >= 50;', text: 'The comparison is `true` or `false`. That value is returned.' },
      { label: 'Line 19', code: 'int total = add(7, 5);', text: '`7` and `5` are the arguments. They are copied into `a` and `b`. The result `12` goes into `total`.' },
      { label: 'Line 24', code: 'System.out.println(add(x, y));', text: 'Arguments can be variables. Java passes their values, 30 and 12. The names `x` and `y` do not need to match `a` and `b`.' },
      { label: 'Line 25', code: 'System.out.println(add(total, 1) * 2);', text: 'First `add(12, 1)` becomes `13`, then `13 * 2` is `26`.' },
      { label: 'Line 27', code: 'System.out.println(celsiusToFahrenheit(20.0));', text: '20 °C is 68 °F. A `double` always prints with a decimal point: `68.0`.' },
      { label: 'Line 29', code: 'System.out.println("Passed? " + isPassing(total));', text: '`isPassing(12)` is `false`, because 12 is less than 50.' }
    ],
    sections: [
      {
        title: 'Parameters vs arguments',
        text: [
          'The two words are easy to mix up. A **parameter** lives in the header. An **argument** lives in the call. On every call, each argument is copied into its parameter.'
        ],
        table: {
          head: ['Word', 'Where you see it', 'Example', 'What it is'],
          rows: [
            ['Parameter', 'In the method header', '`int a` in `add(int a, int b)`', 'A variable with a type, waiting for a value'],
            ['Argument', 'In the call', '`7` in `add(7, 5)`', 'The real value handed in']
          ]
        },
        mermaid: `flowchart LR
    A1["argument 7"] -->|copied into| P1["parameter a"]
    A2["argument 5"] -->|copied into| P2["parameter b"]
    P1 --> R["return a + b"]
    P2 --> R
    R -->|"gives back 12"| C["int total = 12"]`,
        diagramNote: 'Left: the call `add(7, 5)` in `main`. Middle: inside `add`. Right: back in `main`, the result lands in `total`.'
      },
      {
        title: 'What return really does',
        text: [
          '`return` ends the method at once, even in the middle. That lets you answer early. The method below checks the best grade first and returns as soon as it knows the answer.',
          'Only one `return` runs per call. The others are skipped.'
        ],
        fileName: 'GradeDemo.java',
        code: `public class GradeDemo {
    static String grade(int score) {
        if (score >= 90) {
            return "A";
        }
        if (score >= 70) {
            return "B";
        }
        if (score >= 50) {
            return "C";
        }
        return "not passed";
    }

    public static void main(String[] args) {
        System.out.println(grade(95));
        System.out.println(grade(72));
        System.out.println(grade(50));
        System.out.println(grade(10));
    }
}`,
        output: `A
B
C
not passed`,
        tip: 'The last `return "not passed";` has no `if`. It makes sure every path through the method returns something. Without it, javac says `missing return statement`.'
      },
      {
        title: 'A call becomes its value',
        text: [
          'Java replaces each call with its result, from the inside out and from left to right. Follow `add(2, 3) * add(1, 1)`:'
        ],
        bullets: [
          'Step 1: `add(2, 3)` runs and returns `5`. The line is now `5 * add(1, 1)`.',
          'Step 2: `add(1, 1)` runs and returns `2`. The line is now `5 * 2`.',
          'Step 3: `5 * 2` is `10`.',
          'A call can even be an argument: in `add(add(1, 2), 3)` the inner call runs first and becomes `3`, so the outer call is `add(3, 3)`.'
        ],
        fileName: 'NestedCalls.java',
        code: `public class NestedCalls {
    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = add(2, 3) * add(1, 1);
        System.out.println(result);
        System.out.println(add(add(1, 2), 3));
    }
}`,
        output: `10
6`
      },
      {
        title: 'Number, order and types must fit',
        text: [
          'javac checks every call against the header. Too many or too few arguments, or a value of the wrong type, and the program does not compile.',
          'One thing Java does for you: it turns a smaller number type into a bigger one by itself (this is called **widening**). An `int` fits into a `double` parameter, so `celsiusToFahrenheit(20)` works. The other way round, `double` into `int`, is refused because the decimals would be lost.'
        ],
        table: {
          head: ['Call of `add(int a, int b)`', 'Compiles?', 'Why'],
          rows: [
            ['`add(1, 2)`', 'yes', 'two `int` values'],
            ['`add(1)`', 'no', 'one argument too few'],
            ['`add("1", 2)`', 'no', '`"1"` is a `String`, not an `int`'],
            ['`add(1.5, 2)`', 'no', '`double` does not fit into `int`'],
            ['`add(\'a\', 2)`', 'yes', 'a `char` widens to `int` (the letter code 97)']
          ]
        },
        fileName: 'Widening.java',
        code: `public class Widening {
    static double celsiusToFahrenheit(double celsius) {
        return celsius * 9 / 5 + 32;
    }

    public static void main(String[] args) {
        int warm = 30;
        System.out.println(celsiusToFahrenheit(warm));  // int widens to double
    }
}`,
        output: '86.0'
      },
      {
        title: 'One method, one return value',
        text: [
          'A method returns exactly one value. If you need two results, for example the smallest and the largest number, write two methods: `min` and `max`.',
          'Later you can bundle several values into one array or one object and return that. [Arrays](../arrays/index.html) and [Classes and objects](../classes-and-objects/index.html) show how.'
        ],
        warn: '`return a, b;` does not exist in Java. javac stops with an error.'
      }
    ],
    technical: [
      'For a call, the JVM first works out every argument from left to right and puts the values on the caller\'s **operand stack** (a small scratch pad for values being computed). Then it creates a fresh frame for the method and copies those values into the parameter slots. The call stack lesson below shows the frames.',
      'At `return`, an instruction such as `ireturn` (for `int`), `dreturn` (for `double`) or `areturn` (for a reference like a `String`) takes the value from the method\'s scratch pad and puts it on the caller\'s. Then the method\'s frame is thrown away.',
      'javac checks every path through the method before the program runs. If any path can reach the closing `}` without a `return` of the right type, you get `missing return statement`. That is why the program never even starts with such a mistake.'
    ],
    tryIt: {
      steps: [
        'Make `MaxDemo.java` with a method `static int max(int a, int b)`.',
        'Inside, use `if (a > b)` to `return a;`, otherwise `return b;`.',
        'In `main`, print `max(3, 9)` and `max(10, -2)`.',
        'Compile and run.'
      ],
      see: '`9` and then `10`.'
    },
    check: [
      { q: 'In the call `add(price, 2)`, what are the arguments?', a: 'The value of `price` and the literal `2`.' },
      { q: 'What does `return` do besides giving back a value?', a: 'It ends the method at once. Lines after it in that method do not run.' },
      { q: 'What does `System.out.println(add(2, 3) * 10);` print?', a: '`50`. The call becomes `5`, then `5 * 10` is `50`.' }
    ],
    keyPoints: [
      'Parameters are in the header; arguments are in the call.',
      'Arguments are copied into parameters by position.',
      '`return` stops the method and hands back one value.',
      'The returned value must fit the return type.',
      'A call that returns a value can stand anywhere a value can stand.'
    ],
    commonMistakes: [
      'Too few arguments: `add(7)`. Fix: pass one value per parameter, like `add(7, 0)`.',
      'Swapped arguments: `divide(2, 10)` when you meant 10 / 2. Fix: pass the values in the order of the parameters.',
      'Ignoring the result: `add(7, 5);` alone on a line computes 12 and throws it away. Fix: `int total = add(7, 5);`.',
      'Types in the call: `add(int 7, int 5)`. Fix: types go only in the header. The call is `add(7, 5)`.'
    ],
    related: ['Anatomy of a Method', 'void and static', 'Types & Variables']
  }]);
})();
