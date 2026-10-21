Java.topics.operators = Java.topics.operators || {};

// Lesson 01 and the topic practice. The other lessons are appended by js/calculation/ and js/decisions/.
Java.topics.operators.lessons = [
  {
    id: 'arithmetic',
    num: '01',
    title: 'Arithmetic',
    category: 'calculation',
    icon: '+',
    tagline: 'Calculate with numbers',
    realWorld: 'A pocket calculator. You type a number, press a button like + or ÷, type another number, and the screen shows the answer.',
    kid: [
      'You have 17 sweets and 5 friends. You want to share them fairly.',
      'Java can count for you. `+` puts sweets together, `-` takes some away, `*` makes many piles of the same size, and `/` shares them out.',
      'Java shares whole sweets only, like you do. Every friend gets 3 sweets. The 2 sweets that are left over stay in the bag. The `%` button tells you how many are left over.'
    ],
    definition: 'Arithmetic operators do math with numbers: `+` adds, `-` subtracts, `*` multiplies, `/` divides and `%` gives the remainder (what is left over after dividing).',
    explain: [
      'An **operator** is a symbol that does work with values. The values it works with are its **operands**. In `17 + 5` the operator is `+` and the operands are `17` and `5`.',
      'An **expression** is any piece of code that produces a value. `17 + 5` is an expression with the value `22`. `apples / kids` is an expression too: Java reads both variables and divides.',
      'The five arithmetic operators are **binary operators**: each one takes two operands, one on the left and one on the right.',
      'The **type** of the operands decides the type of the result. Two `int` values give an `int`. If one operand is a `double`, the result is a `double`. This one rule explains most surprises with division.',
      'With two `int` operands, `/` does **integer division**: it keeps the whole part and throws the rest away. `17 / 5` is `3`, not `3.4`. With a `double` operand, `/` does **floating-point division** and keeps the decimals: `17 / 5.0` is `3.4`.'
    ],
    why: 'Programs count, measure and share all the time: prices, scores, ages, sizes, time. Arithmetic operators let you write that math as short code.',
    whenUse: 'Every time you calculate a new value from numbers you already have: a total, a difference, an average, a share.',
    syntax: '`operand operator operand`, for example `a + b`, `price * 3`, `total / count`, `n % 2`.',
    fileName: 'Arithmetic.java',
    code: `public class Arithmetic {
    public static void main(String[] args) {
        int apples = 17;
        int kids = 5;

        // The five arithmetic operators
        System.out.println("17 + 5 = " + (apples + kids));
        System.out.println("17 - 5 = " + (apples - kids));
        System.out.println("17 * 5 = " + (apples * kids));
        System.out.println("17 / 5 = " + (apples / kids));
        System.out.println("17 % 5 = " + (apples % kids));

        // Share fairly: each kid gets 3, 2 are left over
        int each = apples / kids;
        int left = apples % kids;
        System.out.println("Each kid gets " + each + ", left over: " + left);

        // With a double, division keeps the decimal part
        double share = apples / 5.0;
        System.out.println("17 / 5.0 = " + share);

        // Mixed types: int * double gives a double
        double price = 2.5;
        System.out.println("3 bags cost " + (3 * price));
    }
}`,
    output: `17 + 5 = 22
17 - 5 = 12
17 * 5 = 85
17 / 5 = 3
17 % 5 = 2
Each kid gets 3, left over: 2
17 / 5.0 = 3.4
3 bags cost 7.5`,
    codeSummary: 'The program uses all five arithmetic operators on the same two numbers. Then it shows that `int / int` drops the decimals, while a `double` keeps them.',
    codeExplanation: [
      { label: 'Line 3', code: `int apples = 17;`, text: 'An `int` variable holds a whole number. Both operands of the first calculations are `int`.' },
      { label: 'Line 7', code: `System.out.println("17 + 5 = " + (apples + kids));`, text: 'The parentheses make Java add the two numbers first. Then the result `22` is glued to the text. The lesson **String Concatenation** explains why the parentheses matter.' },
      { label: 'Line 9', code: `System.out.println("17 * 5 = " + (apples * kids));`, text: 'Java writes multiplication with `*`, not with `x` or a dot.' },
      { label: 'Line 10', code: `System.out.println("17 / 5 = " + (apples / kids));`, text: 'Both operands are `int`, so this is integer division. The result is `3`. The `.4` is thrown away, not rounded.' },
      { label: 'Line 11', code: `System.out.println("17 % 5 = " + (apples % kids));`, text: '`%` is the remainder: 5 fits 3 times into 17 (that is 15), and 2 are left.' },
      { label: 'Line 14', code: `int each = apples / kids;`, text: 'Store the result of an expression in a variable to use it later.' },
      { label: 'Line 19', code: `double share = apples / 5.0;`, text: '`5.0` is a `double` literal. One `double` operand is enough: Java does floating-point division and the result is `3.4`.' },
      { label: 'Line 24', code: `System.out.println("3 bags cost " + (3 * price));`, text: '`3` is an `int`, `price` is a `double`. Java widens the `3` to `3.0` first, so the result is the `double` `7.5`.' }
    ],
    sections: [
      {
        title: 'Operators, operands, expressions',
        text: [
          'Read `apples / kids` like a tiny machine. Two values go in, the operator does its job, one value comes out.',
          'That value has a type too. Java knows the type before the program runs, because it knows the types of the operands.'
        ],
        mermaid: 'flowchart LR\n  A["apples = 17 (int)"] --> OP(("/"))\n  B["kids = 5 (int)"] --> OP\n  OP --> R["3 (int)"]',
        diagramNote: 'Two `int` operands go into `/`. One `int` result comes out. The `.4` never appears.',
        table: {
          head: ['Operator', 'Name', 'Example', 'Result'],
          rows: [
            ['`+`', 'addition', '`7 + 2`', '`9`'],
            ['`-`', 'subtraction', '`7 - 2`', '`5`'],
            ['`*`', 'multiplication', '`7 * 2`', '`14`'],
            ['`/`', 'division', '`7 / 2`', '`3` (both `int`)'],
            ['`%`', 'remainder (modulo)', '`7 % 2`', '`1`']
          ],
          note: '`-` also has a one-operand form: `-x` flips the sign. An operator with one operand is a **unary** operator.'
        }
      },
      {
        title: 'Integer division and floating-point division',
        text: [
          'This is the most common surprise for beginners. Java looks at the types of the two operands, not at the numbers.',
          'If both are whole-number types (`int`, `long`), the result is a whole number. The decimal part is cut off. It is not rounded: `9 / 10` is `0`, not `1`.',
          'To get decimals, make at least one operand a `double`: write `7.0` instead of `7`, or cast with `(double)`. A **cast** converts a value to another type; the topic [Types and Variables](../types-and-variables/index.html) explains casting in depth.'
        ],
        fileName: 'Division.java',
        code: `public class Division {
    public static void main(String[] args) {
        System.out.println(7 / 2);
        System.out.println(7.0 / 2);
        System.out.println(7 / 2.0);
        System.out.println((double) 7 / 2);
        System.out.println((double) (7 / 2));
        System.out.println(9 / 10);
        System.out.println(-7 / 2);
    }
}`,
        output: `3
3.5
3.5
3.5
3.0
0
-3`,
        table: {
          head: ['Expression', 'Operand types', 'Result', 'Why'],
          rows: [
            ['`7 / 2`', '`int`, `int`', '`3`', 'integer division cuts off `.5`'],
            ['`7.0 / 2`', '`double`, `int`', '`3.5`', 'one `double` is enough'],
            ['`(double) 7 / 2`', '`double`, `int`', '`3.5`', 'the cast runs first, then `/`'],
            ['`(double) (7 / 2)`', '`int`, `int`', '`3.0`', '`7 / 2` is already `3`; the cast is too late'],
            ['`-7 / 2`', '`int`, `int`', '`-3`', 'cut off toward zero, not down to `-4`']
          ]
        },
        warn: '`(double) (7 / 2)` is `3.0`, not `3.5`. The parentheses make the integer division happen first. Put the cast on an operand, not on the result.'
      },
      {
        title: 'Mixing types: the smaller type grows',
        text: [
          'When two operands have different types, Java first converts the smaller one to the bigger one. This is called **numeric promotion** (also *widening*). Then it calculates in the bigger type.',
          'There is one more rule: `byte`, `short` and `char` always grow to at least `int` before any math. So `byte + byte` is an `int`.'
        ],
        table: {
          head: ['Left', 'Right', 'Java calculates in', 'Example'],
          rows: [
            ['`int`', '`int`', '`int`', '`3 * 4` is `12`'],
            ['`int`', '`long`', '`long`', '`3 * 4L` is `12L`'],
            ['`int`', '`double`', '`double`', '`3 * 2.5` is `7.5`'],
            ['`long`', '`float`', '`float`', '`2L * 1.5f` is `3.0f`'],
            ['`byte`', '`byte`', '`int`', '`b1 + b2` is an `int`']
          ],
          note: 'The order of growth is `byte` → `short` → `int` → `long` → `float` → `double`.'
        },
        warn: '`byte total = b1 + b2;` does not compile: the sum is an `int`, and Java will not squeeze an `int` into a `byte` without a cast.'
      },
      {
        title: 'The average trap',
        text: [
          'You want the average of 7 and 8. The answer is 7.5. Many people write `double avg = sum / 2;` and get `7.0`.',
          'The variable on the left is a `double`, but that does not matter. Java calculates the right side first, with the types it finds there: `int / int`. Only the finished `7` is then widened to `7.0`.'
        ],
        fileName: 'Average.java',
        code: `public class Average {
    public static void main(String[] args) {
        int sum = 7 + 8;

        double wrong = sum / 2;      // int / int = 7, then 7.0
        double right = sum / 2.0;    // int / double = 7.5

        System.out.println("wrong: " + wrong);
        System.out.println("right: " + right);
    }
}`,
        output: `wrong: 7.0
right: 7.5`,
        tip: 'Ask yourself before every `/`: are both sides whole numbers? If yes, do you want the decimals? If you do, write `2.0` or cast one operand.'
      },
      {
        title: 'Dividing by zero',
        text: [
          'Whole numbers cannot be divided by zero. Java stops the program with an **exception**: an error report that ends the program unless you handle it. The topic [Exceptions](../exceptions/index.html) shows how to handle one.',
          'Floating-point numbers do not stop. `5.0 / 0` gives the special value `Infinity`, and `0.0 / 0` gives `NaN` (Not a Number). The program goes on with a strange value.'
        ],
        fileName: 'DivideByZero.java',
        code: `public class DivideByZero {
    public static void main(String[] args) {
        System.out.println(5.0 / 0);
        System.out.println(-5.0 / 0);
        System.out.println(0.0 / 0);

        int zero = 0;
        System.out.println("Now an int division by zero:");
        System.out.println(5 / zero);
        System.out.println("This line never runs.");
    }
}`,
        output: `Infinity
-Infinity
NaN
Now an int division by zero:
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at DivideByZero.main(DivideByZero.java:9)`,
        warn: 'The last line never prints. The exception stops `main` at line 9. `% 0` with whole numbers throws the same `ArithmeticException`.'
      }
    ],
    technical: [
      'The compiler `javac` picks a different bytecode instruction for each type. `int + int` becomes `iadd`, `double + double` becomes `dadd`, `int / int` becomes `idiv`. Bytecode is the list of small instructions inside a `.class` file that the JVM (Java Virtual Machine) runs.',
      'Before it picks the instruction, the compiler applies **binary numeric promotion**: if either operand is `double`, both become `double`; else if either is `float`, both become `float`; else if either is `long`, both become `long`; else both become `int`. That is why `byte + byte` is an `int`.',
      '`idiv` rounds toward zero, so `-7 / 2` is `-3`. Integer math is done in 32 bits (64 for `long`). If a result is too big, it wraps around silently, without an error. The lesson [Ranges and Overflow](../types-and-variables/index.html) shows this.',
      'When all operands are literals, `javac` calculates the result while compiling. `int seconds = 60 * 60 * 24;` is stored in the `.class` file as `86400`. This is called **constant folding**.'
    ],
    tryIt: {
      steps: [
        'Create `Shop.java` with a `main` method.',
        'Make `int price = 7;` and `int people = 2;`.',
        'Print `price / people`, `price % people` and `price / (double) people`.',
        'Change `people` to `0` and run again.'
      ],
      see: '`3`, `1` and `3.5`. With `0` people, the program stops with `ArithmeticException: / by zero` at the first division.'
    },
    check: [
      { q: 'What does `10 / 4` print, and why?', a: '`2`. Both operands are `int`, so Java does integer division and cuts off the `.5`.' },
      { q: 'Name two ways to get `2.5` from 10 and 4.', a: '`10.0 / 4` or `10 / 4.0`, or cast one operand: `(double) 10 / 4`.' },
      { q: 'What is the type of `3 * 1.5`?', a: '`double`. The `int` 3 is promoted to `3.0` first. The result is `4.5`.' }
    ],
    keyPoints: [
      '`+ - * / %` are the five arithmetic operators. Each takes two operands.',
      'The operand types decide the result type. `int` and `int` give `int`.',
      '`int / int` cuts off the decimals toward zero. It does not round.',
      'One `double` operand turns the whole operation into floating-point math.',
      '`int / 0` throws `ArithmeticException`. `double / 0` gives `Infinity` or `NaN`.'
    ],
    commonMistakes: [
      'Expecting `7 / 2` to be `3.5`. Write `7 / 2.0` or `(double) 7 / 2`.',
      'Casting too late: `(double) (sum / count)` is already cut off. Cast an operand: `(double) sum / count`.',
      'Thinking `double avg = sum / 2;` fixes the division. The right side is calculated first, as `int`. Write `sum / 2.0`.',
      'Writing `x` or `·` for multiplication. Java uses `*`.',
      'Dividing by a variable that can be `0`. Check the value first (the lesson **Logical Operators** shows a safe check).'
    ],
    related: ['Modulo', 'Assignment', 'Math Helpers', 'Types and Variables'],
    glossary: [
      { term: 'operand', definition: 'A value an operator works with. In 3 + 4 the operands are 3 and 4.' },
      { term: 'expression', definition: 'Code that produces a value, like 3 + 4 or price * count.' },
      { term: 'integer division', definition: 'Division of two whole numbers. The decimal part is cut off toward zero: 7 / 2 is 3.' },
      { term: 'numeric promotion', definition: 'Java converts the smaller operand type to the bigger one before it calculates, e.g. int to double.' }
    ]
  }

];

Java.topics.operators.tryIt = {
  steps: [
    'Create `Operators.java` with a `main` method.',
    'Print `7 / 2`, `7 % 2` and `7.0 / 2`.',
    'Make `int age = 12;` and print `age >= 10 && age < 13`.',
    'Print `2 + 3 * 4` and `(2 + 3) * 4`.',
    'Print `"1" + 2 + 3` and `1 + 2 + "3"`.',
    'Make `int x = 5;`, then print `x++` and then `x`.'
  ],
  see: '`3`, `1`, `3.5`, then `true`, then `14` and `20`, then `123` and `33`, then `5` and `6`.'
};

Java.topics.operators.check = [
  { q: 'Why is `7 / 2` equal to `3` in Java?', a: 'Both operands are `int`, so Java does integer division and cuts off the `.5`. Write `7 / 2.0` to get `3.5`.' },
  { q: 'What does `%` give you, and name one use?', a: 'The remainder after dividing. `7 % 2` is `1`. Uses: even or odd (`n % 2`), the last digit (`n % 10`), wrap-around (`(hour + 1) % 24`).' },
  { q: 'What is the difference between `=` and `==`?', a: '`=` stores a value in a variable. `==` asks "are these equal?" and gives `true` or `false`.' },
  { q: 'After `int a = 5; int b = a++;`, what are `a` and `b`?', a: '`a` is `6` and `b` is `5`. Postfix `a++` hands out the old value, then adds 1.' },
  { q: 'Why does `name != null && name.length() > 3` never crash on a `null` name?', a: '`&&` short-circuits: when the left side is `false`, Java skips the right side, so `name.length()` never runs.' }
];
