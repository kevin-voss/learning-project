Java.topics.operators.lessons.push(
  {
    id: 'math-helpers',
    num: '06',
    title: 'Math Helpers',
    category: 'calculation',
    icon: '√',
    tagline: 'abs, max, min, pow, sqrt, round, and why 0.1 + 0.2 is not 0.3',
    realWorld: 'A toolbox next to the calculator. The calculator has + and -. The toolbox has special tools: one for the bigger of two numbers, one for square roots, one for rounding.',
    kid: [
      'Java has operators for plus, minus, times and divide. For harder jobs it has a toolbox called `Math`.',
      'You ask a tool for help like this: `Math.max(4, 9)`. That means: "Math toolbox, please give me the bigger of 4 and 9". The answer comes back: 9.',
      'One strange thing: computers store decimal numbers like 0.1 a tiny bit wrong, like a ruler that is almost, but not exactly, right. Most of the time you do not notice. Sometimes you see a funny tail like 0.30000000000000004.'
    ],
    definition: '`Math` is a built-in Java class with ready-made **methods** for common math: `Math.abs`, `Math.max`, `Math.min`, `Math.pow`, `Math.sqrt`, `Math.round` and more. You call them as `Math.name(arguments)` and they give back a result.',
    explain: [
      'A **method** is a named piece of code that does one job. You **call** it by its name, give it values in parentheses (the **arguments**), and it hands back a value (the **return value**). The topic [Methods](../methods/index.html) teaches how to write your own.',
      '`Math` belongs to the package `java.lang`, which every Java program can use without an `import`. So `Math.sqrt(81)` works in any file.',
      'Each method has a fixed **return type**. `Math.abs`, `Math.max` and `Math.min` keep the type you give them: two `int` in, one `int` out. `Math.pow`, `Math.sqrt`, `Math.floor` and `Math.ceil` always return a `double`. `Math.round` of a `double` returns a `long`.',
      'Decimal numbers in `double` are **floating-point** numbers. They are stored in binary (base 2), with about 15 to 17 correct digits. Many simple decimals like `0.1` have no exact binary form, so the stored value is a tiny bit off. That is why `0.1 + 0.2` prints `0.30000000000000004`.',
      'So: never compare `double` results with `==`. Check whether they are close enough, and for money use whole cents in a `long`.'
    ],
    why: 'Many calculations need more than `+ - * /`: the distance between two points, the larger of two scores, a price rounded to cents. `Math` gives you tested tools for that.',
    whenUse: 'Use `Math.max`/`Math.min` to pick or limit values, `Math.abs` for a distance without a sign, `Math.pow`/`Math.sqrt` for powers and roots, and `Math.round`/`floor`/`ceil` to round.',
    syntax: '`Math.methodName(argument1, argument2, …)`, for example `Math.max(a, b)` or `Math.sqrt(x)`.',
    fileName: 'MathHelpers.java',
    code: `public class MathHelpers {
    public static void main(String[] args) {
        System.out.println("abs(-7)     = " + Math.abs(-7));
        System.out.println("max(4, 9)   = " + Math.max(4, 9));
        System.out.println("min(4, 9)   = " + Math.min(4, 9));
        System.out.println("pow(2, 10)  = " + Math.pow(2, 10));
        System.out.println("sqrt(81)    = " + Math.sqrt(81));
        System.out.println("round(2.5)  = " + Math.round(2.5));
        System.out.println("round(-2.5) = " + Math.round(-2.5));
        System.out.println("floor(2.7)  = " + Math.floor(2.7));
        System.out.println("ceil(2.1)   = " + Math.ceil(2.1));

        // Distance between two points with Pythagoras: sqrt(dx*dx + dy*dy)
        double dx = 3;
        double dy = 4;
        double distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        System.out.println("distance    = " + distance);

        // A floating-point surprise
        System.out.println("0.1 + 0.2   = " + (0.1 + 0.2));
    }
}`,
    output: `abs(-7)     = 7
max(4, 9)   = 9
min(4, 9)   = 4
pow(2, 10)  = 1024.0
sqrt(81)    = 9.0
round(2.5)  = 3
round(-2.5) = -2
floor(2.7)  = 2.0
ceil(2.1)   = 3.0
distance    = 5.0
0.1 + 0.2   = 0.30000000000000004`,
    codeSummary: 'Each line calls one `Math` method and prints its return value. Watch the types: some results end in `.0` because the method returns a `double`.',
    codeExplanation: [
      { label: 'Line 3', code: `System.out.println("abs(-7)     = " + Math.abs(-7));`, text: '`abs` is the **absolute value**: the number without its minus sign. It is the distance from 0.' },
      { label: 'Line 4', code: `System.out.println("max(4, 9)   = " + Math.max(4, 9));`, text: '`max` returns the bigger of its two arguments. Two `int` in, one `int` out.' },
      { label: 'Line 6', code: `System.out.println("pow(2, 10)  = " + Math.pow(2, 10));`, text: '`pow(a, b)` is a to the power of b: 2 × 2 × … ten times. It always returns a `double`, so you see `1024.0`.' },
      { label: 'Line 7', code: `System.out.println("sqrt(81)    = " + Math.sqrt(81));`, text: '`sqrt` is the square root: the number that, times itself, gives 81. Also a `double`.' },
      { label: 'Line 8', code: `System.out.println("round(2.5)  = " + Math.round(2.5));`, text: '`round` goes to the nearest whole number; an exact `.5` goes up. It returns a `long`, so no `.0`.' },
      { label: 'Line 9', code: `System.out.println("round(-2.5) = " + Math.round(-2.5));`, text: '"Up" means toward plus infinity. So `-2.5` rounds to `-2`, not `-3`.' },
      { label: 'Line 10', code: `System.out.println("floor(2.7)  = " + Math.floor(2.7));`, text: '`floor` always rounds down (to the floor), `ceil` always rounds up (to the ceiling).' },
      { label: 'Line 16', code: `double distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));`, text: 'Calls inside calls: the inner `pow` calls run first, then `+`, then `sqrt`. The result is 5.' },
      { label: 'Line 20', code: `System.out.println("0.1 + 0.2   = " + (0.1 + 0.2));`, text: 'Neither 0.1 nor 0.2 is stored exactly, so their sum is a tiny bit more than 0.3.' }
    ],
    sections: [
      {
        title: 'How a method call works',
        text: [
          'A call has three parts: who owns the method (`Math`), the method name (`pow`), and the arguments in parentheses (`2, 10`). Java runs the method and the whole call is replaced by the return value.',
          'Because a call has a value, you can use it anywhere you can use a number: in a calculation, in `println`, as an argument of another call.'
        ],
        mermaid: 'flowchart LR\n  A["arguments 2 and 10"] --> M["Math.pow"]\n  M --> R["return value 1024.0 (double)"]\n  R --> P["used in println"]',
        diagramNote: 'Values go in, one value comes out. The call `Math.pow(2, 10)` then stands for `1024.0`.',
        table: {
          head: ['Method', 'What it does', 'Example', 'Result', 'Return type'],
          rows: [
            ['`Math.abs(x)`', 'drop the minus sign', '`Math.abs(-3.5)`', '`3.5`', 'same as `x`'],
            ['`Math.max(a, b)`', 'the bigger value', '`Math.max(3, 8)`', '`8`', 'same as `a`, `b`'],
            ['`Math.min(a, b)`', 'the smaller value', '`Math.min(3, 8)`', '`3`', 'same as `a`, `b`'],
            ['`Math.pow(a, b)`', 'a to the power b', '`Math.pow(3, 2)`', '`9.0`', '`double`'],
            ['`Math.sqrt(x)`', 'square root', '`Math.sqrt(2)`', '`1.4142135623730951`', '`double`'],
            ['`Math.round(x)`', 'nearest whole number', '`Math.round(2.4)`', '`2`', '`long` (for `double`)'],
            ['`Math.floor(x)`', 'round down', '`Math.floor(-2.1)`', '`-3.0`', '`double`'],
            ['`Math.ceil(x)`', 'round up', '`Math.ceil(-2.9)`', '`-2.0`', '`double`']
          ]
        }
      },
      {
        title: 'Rounding: four ways that differ',
        text: [
          '`Math.round`, `Math.floor`, `Math.ceil` and a cast `(int)` all make a whole number, but they do not agree. The difference shows with negative numbers.',
          'A cast `(int) 2.9` does not round. It cuts the decimals off toward zero, like integer division.',
          'To round to 2 decimal places, multiply by 100, round, and divide by `100.0`. Dividing by `100` (an `int`) would cut the decimals away again.'
        ],
        table: {
          head: ['x', '`Math.round(x)`', '`Math.floor(x)`', '`Math.ceil(x)`', '`(int) x`'],
          rows: [
            ['`2.4`', '`2`', '`2.0`', '`3.0`', '`2`'],
            ['`2.5`', '`3`', '`2.0`', '`3.0`', '`2`'],
            ['`2.9`', '`3`', '`2.0`', '`3.0`', '`2`'],
            ['`-2.5`', '`-2`', '`-3.0`', '`-2.0`', '`-2`'],
            ['`-2.9`', '`-3`', '`-3.0`', '`-2.0`', '`-2`']
          ]
        },
        fileName: 'Rounding.java',
        code: `public class Rounding {
    public static void main(String[] args) {
        double price = 19.987;

        System.out.println((int) price);                 // cut off
        System.out.println(Math.round(price));           // nearest
        System.out.println(Math.round(price * 100) / 100.0);  // 2 decimals
        System.out.println(Math.round(price * 100) / 100);    // wrong: long / int

        long rounded = Math.round(price);                // round returns long
        int asInt = (int) Math.round(price);             // cast if you need int
        System.out.println(rounded + " " + asInt);
    }
}`,
        output: `19
20
19.99
19
20 20`
      },
      {
        title: 'Floating-point surprises',
        text: [
          'You know that 1/3 has no exact decimal form: 0.3333… goes on forever. In binary, 1/10 has the same problem. So `0.1` is stored as the closest binary number, which is a tiny bit more than 0.1.',
          'Usually Java prints the shortest decimal that points back to the stored number, so you see `0.1`. When small errors add up, the tail becomes visible.',
          'To compare two `double` values, check that their distance is smaller than a tiny **tolerance**: `Math.abs(a - b) < 1e-9`. `1e-9` means 1 × 10⁻⁹, that is 0.000000001.'
        ],
        fileName: 'FloatSurprise.java',
        code: `public class FloatSurprise {
    public static void main(String[] args) {
        System.out.println(0.1 + 0.2);
        System.out.println(1.1 * 3);
        System.out.println(1.0 - 0.9);

        double sum = 0.1 + 0.2;
        System.out.println("sum == 0.3: " + (sum == 0.3));
        System.out.println("close to 0.3: " + (Math.abs(sum - 0.3) < 1e-9));

        // Money: count whole cents in a long instead
        long cents = 10 + 20;
        System.out.println("cents: " + cents + " = " + cents / 100.0 + " euro");
    }
}`,
        output: `0.30000000000000004
3.3000000000000003
0.09999999999999998
sum == 0.3: false
close to 0.3: true
cents: 30 = 0.3 euro`,
        warn: 'Never store money in a `double`. Use whole cents in a `long`, or the class `BigDecimal`, which stores decimal digits exactly.'
      },
      {
        title: 'Edge cases worth knowing',
        text: [
          '`Math.pow` returns a `double`, so `int area = Math.pow(5, 2);` does not compile. Cast it, `(int) Math.pow(5, 2)`, or write `5 * 5` for small powers.',
          'The square root of a negative number is not a real number, so `Math.sqrt(-1)` returns `NaN`. No exception, no crash.',
          'One famous trap: the smallest `int` has no positive partner, because the `int` range goes from -2147483648 to 2147483647. So `Math.abs(Integer.MIN_VALUE)` is still negative.'
        ],
        fileName: 'MathEdgeCases.java',
        code: `public class MathEdgeCases {
    public static void main(String[] args) {
        int area = (int) Math.pow(5, 2);
        System.out.println("area: " + area);

        System.out.println("sqrt(-1): " + Math.sqrt(-1));
        System.out.println("abs(MIN_VALUE): " + Math.abs(Integer.MIN_VALUE));

        // Limit a value to a range with max and min
        int volume = 130;
        int limited = Math.min(Math.max(volume, 0), 100);
        System.out.println("limited volume: " + limited);

        System.out.println("PI: " + Math.PI);
        System.out.println("circle area r=2: " + Math.PI * Math.pow(2, 2));
    }
}`,
        output: `area: 25
sqrt(-1): NaN
abs(MIN_VALUE): -2147483648
limited volume: 100
PI: 3.141592653589793
circle area r=2: 12.566370614359172`,
        tip: '`Math.min(Math.max(value, low), high)` keeps a value between `low` and `high`. Since Java 21 you can also write `Math.clamp(value, low, high)`.'
      },
      {
        title: 'More of the toolbox',
        text: [
          'You do not need to learn all of these now. Know that they exist and look them up when you need them.'
        ],
        table: {
          head: ['Member', 'What it gives you'],
          rows: [
            ['`Math.PI`, `Math.E`', 'the constants π (3.14159…) and e (2.71828…)'],
            ['`Math.random()`', 'a random `double` from `0.0` up to, but not including, `1.0`'],
            ['`Math.floorMod(a, b)`', 'a remainder that is never negative for a positive `b` (see **Modulo**)'],
            ['`Math.addExact(a, b)`', 'like `a + b`, but throws `ArithmeticException` on overflow instead of wrapping'],
            ['`Math.clamp(v, lo, hi)`', 'keeps `v` between `lo` and `hi` (Java 21+)'],
            ['`Math.hypot(x, y)`', '`sqrt(x*x + y*y)` without overflow on the way'],
            ['`Math.cbrt(x)`', 'cube root']
          ],
          note: 'The full list is in the official API documentation of `java.lang.Math`.'
        }
      }
    ],
    technical: [
      '`Math` is a class with only **static** methods: you call them on the class itself, you never create a `Math` object. The keyword `static` is explained in [Classes and Objects](../classes-and-objects/index.html).',
      'Many `Math` methods are **intrinsics**: the JIT compiler replaces the call with one CPU instruction. `Math.sqrt` becomes the processor\'s square-root instruction, `Math.abs` and `Math.max` become a few instructions without a real call.',
      'A `double` follows the IEEE 754 standard: 64 bits split into a sign, an exponent and 52 bits of fraction (the **mantissa**). Every stored value is a fraction with a power of two below it. `0.1` would need endless binary digits, so it is rounded to the nearest one that fits. The result of each `+` or `*` is rounded again.',
      'When Java prints a `double`, it prints the shortest decimal text that converts back to exactly the same bits. That is why `0.1` prints as `0.1`, but `0.1 + 0.2` (a different bit pattern than `0.3`) prints all its digits.'
    ],
    tryIt: {
      steps: [
        'Create `Circle.java` with `double r = 3;`.',
        'Print the area `Math.PI * r * r`.',
        'Print it rounded to 2 decimals with `Math.round(area * 100) / 100.0`.',
        'Print `Math.max(7, 12)` and `Math.sqrt(144)`.'
      ],
      see: '`28.274333882308138`, then `28.27`, then `12` and `12.0`.'
    },
    check: [
      { q: 'Why does `Math.sqrt(16)` print `4.0` and not `4`?', a: '`Math.sqrt` returns a `double`. A `double` always prints with a decimal point.' },
      { q: 'What is `Math.round(-3.5)`?', a: '`-3`. An exact `.5` rounds toward plus infinity, and `-3` is bigger than `-4`.' },
      { q: 'How should you check if a `double` result `x` equals `0.3`?', a: 'With a tolerance: `Math.abs(x - 0.3) < 1e-9`. `x == 0.3` can be `false` because of tiny rounding errors.' }
    ],
    keyPoints: [
      'Call `Math` methods as `Math.name(arguments)`; the call stands for its return value.',
      '`abs`, `max`, `min` keep the type; `pow`, `sqrt`, `floor`, `ceil` return `double`; `round` returns `long`.',
      '`Math.round` rounds `.5` up toward plus infinity; a cast `(int)` cuts off toward zero.',
      '`double` values are binary approximations: `0.1 + 0.2` is `0.30000000000000004`.',
      'Compare `double` values with a tolerance and keep money in whole cents.'
    ],
    commonMistakes: [
      'Writing `int x = Math.pow(2, 3);`. `pow` returns `double`. Write `(int) Math.pow(2, 3)`.',
      'Writing `int r = Math.round(2.6);`. `round` of a `double` returns `long`. Use `long r` or cast to `int`.',
      'Rounding to cents with `Math.round(x * 100) / 100`. The `int` division drops the cents. Divide by `100.0`.',
      'Comparing `0.1 + 0.2 == 0.3`. It is `false`. Use `Math.abs(a - b) < 1e-9`.',
      'Writing `2 ^ 3` for a power. In Java `^` is XOR (see **Bitwise Basics**) and gives `1`. Use `Math.pow(2, 3)`.'
    ],
    related: ['Arithmetic', 'Modulo', 'Comparison', 'Methods'],
    glossary: [
      { term: 'method', definition: 'A named piece of code you call with arguments; it can return a value.' },
      { term: 'argument', definition: 'A value you pass to a method inside the parentheses of the call.' },
      { term: 'return value', definition: 'The value a method hands back to the place where it was called.' },
      { term: 'floating-point', definition: 'A way of storing decimal numbers in binary with a limited number of digits, so some values are only close.' },
      { term: 'tolerance', definition: 'A tiny allowed difference when you compare two floating-point numbers.' }
    ]
  }
);
