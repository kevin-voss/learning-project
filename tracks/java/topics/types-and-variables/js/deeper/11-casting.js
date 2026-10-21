// Lesson 11 (deeper): type conversion (widening, narrowing casts, integer division, promotion, text to number).
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '11',
    id: 'casting',
    title: 'Type Conversion and Casting',
    category: 'deeper',
    icon: '↧',
    tagline: 'Pour a big cup into a small cup',
    realWorld: 'Pouring a small cup of water into a big jug always works. Pouring a big jug into a small cup may spill. Java pours small into big by itself, but for big into small it makes you say "I know it may spill".',
    kid: [
      'Sometimes a number must move from one kind of box into another. If the new box is bigger, Java moves it for you. Nothing gets lost.',
      'If the new box is smaller, some of the number may not fit. Java will not do it unless you write a little note in brackets, like `(int)`, which means "yes, I really want this".',
      'One surprise: when you share 7 apples between 2 children with whole numbers, Java says each gets 3. The half apple is dropped from the answer, because whole-number boxes cannot hold halves.'
    ],
    definition: '**Type conversion** changes a value from one type to another. **Widening** (to a bigger type, like `int` to `double`) happens automatically. **Narrowing** (to a smaller type, like `double` to `int`) needs a **cast**: the target type in parentheses, like `(int) 9.99`.',
    explain: [
      '**Widening conversion** goes from a type with a smaller range to one with a bigger range: `byte` → `short` → `int` → `long` → `float` → `double`, and `char` → `int`. Every value fits, so Java does it silently: `double d = 7;` stores `7.0`.',
      '**Narrowing conversion** goes the other way. The value may not fit, so the compiler refuses unless you write a **cast**: `int whole = (int) 9.99;`. A cast from a decimal to an integer type cuts off everything after the dot. It does **not** round: `(int) 9.99` is `9`. To round, use `Math.round(9.99)`, which gives `10`.',
      'A cast between integer types keeps only the lowest bits that fit. If the value is too big, the result looks random: `(byte) 200` is `-56`. That is overflow again, now caused on purpose by you.',
      '**Integer division**: when both operands of `/` are integers, the result is an integer and the remainder is dropped. `7 / 2` is `3`, not `3.5`. The `%` operator gives the remainder: `7 % 2` is `1`. As soon as one operand is a decimal, the division is decimal: `7 / 2.0` is `3.5`.',
      'Java also converts inside calculations. Before it does maths, it **promotes** small types: `byte`, `short` and `char` become `int`. If one operand is `long`, `float` or `double`, the other becomes that type too. So `byte + byte` is an `int`, and `int * double` is a `double`.',
      'Text is not a number type, so a cast cannot turn `"42"` into `42`. Use `Integer.parseInt("42")` or `Double.parseDouble("3.5")`. The other way round, `String.valueOf(42)` or `"" + 42` gives the text `"42"`.'
    ],
    why: 'Values often arrive in one type and are needed in another: an average from whole numbers, a whole price from a decimal, a number from text a user typed.',
    whenUse: 'When you divide integers and need decimals, when you need a whole number from a decimal, and when you read numbers from text.',
    syntax: 'Widening: `double d = intValue;` · Narrowing: `int i = (int) doubleValue;` · Decimal division: `(double) a / b` or `a / 2.0` · Rounding: `Math.round(x)` · Text: `Integer.parseInt("42")`, `String.valueOf(42)`',
    fileName: 'Conversions.java',
    code: `public class Conversions {
    public static void main(String[] args) {
        // Widening: small box into a big box, automatic
        int apples = 7;
        long manyApples = apples;          // int -> long
        double exactApples = apples;       // int -> double
        System.out.println(manyApples + " " + exactApples);

        // Narrowing: big box into a small box, needs a cast
        double price = 9.99;
        int wholePrice = (int) price;      // cuts off .99, no rounding
        long rounded = Math.round(price);  // rounds to the nearest
        System.out.println(wholePrice + " " + rounded);

        // Integer division: int / int gives an int
        int children = 2;
        System.out.println(apples / children);
        System.out.println(apples % children);             // what is left over
        System.out.println((double) apples / children);
        System.out.println(apples / 2.0);

        // Text to number and back
        int fromText = Integer.parseInt("42");
        String toText = String.valueOf(fromText);
        System.out.println(fromText + 1);    // number maths
        System.out.println(toText + 1);      // text gluing
    }
}`,
    output: `7 7.0
9 10
3
1
3.5
3.5
43
421`,
    codeSummary: 'Widening without a cast, narrowing with a cast, the integer division surprise and its fixes, and text to number and back.',
    codeExplanation: [
      { label: 'Line 5', code: 'long manyApples = apples;          // int -> long', text: 'Widening. Every `int` fits into a `long`, so no cast is needed.' },
      { label: 'Line 6', code: 'double exactApples = apples;       // int -> double', text: 'Widening to a decimal type. It prints as `7.0`.' },
      { label: 'Line 11', code: 'int wholePrice = (int) price;      // cuts off .99, no rounding', text: 'Narrowing with a cast. `(int)` cuts off the decimals: `9.99` becomes `9`.' },
      { label: 'Line 12', code: 'long rounded = Math.round(price);  // rounds to the nearest', text: '`Math.round` rounds to the nearest whole number and gives a `long`: `10`.' },
      { label: 'Line 17', code: 'System.out.println(apples / children);', text: '`int / int`: integer division. `7 / 2` is `3`. The half is dropped.' },
      { label: 'Line 18', code: 'System.out.println(apples % children);             // what is left over', text: '`%` (remainder) gives what is left after dividing: `7 = 2 × 3 + 1`, so `1`.' },
      { label: 'Line 19', code: 'System.out.println((double) apples / children);', text: 'The cast turns `apples` into `7.0` first. Then `7.0 / 2` is decimal division: `3.5`.' },
      { label: 'Line 20', code: 'System.out.println(apples / 2.0);', text: 'A decimal literal on one side has the same effect.' },
      { label: 'Line 23', code: 'int fromText = Integer.parseInt("42");', text: 'Reads the text `"42"` and gives the `int` 42. A cast could not do this.' },
      { label: 'Line 26', code: 'System.out.println(toText + 1);      // text gluing', text: '`toText` is a String, so `+ 1` glues: `"421"`. Line 25 with the `int` adds: `43`.' }
    ],
    sections: [
      {
        title: 'Widening happens by itself',
        text: 'Follow the arrows: Java converts along them without a cast. Against the arrows, you need a cast.',
        mermaid: `flowchart LR
  B["byte"] --> S["short"]
  S --> I["int"]
  C["char"] --> I
  I --> L["long"]
  L --> F["float"]
  F --> D["double"]`,
        diagramNote: 'One catch: `long` → `float` and `int` → `float` are widening, but `float` has only about 7 exact digits, so very big numbers can lose their last digits.'
      },
      {
        title: 'Narrowing needs a cast',
        text: [
          'Without a cast, the compiler refuses to put a `double` into an `int`. The message says why: the conversion could lose information.',
          'The fix is `int whole = (int) 9.8;`. With the cast you tell the compiler: I know, and I accept losing the decimals.'
        ],
        fileName: 'Lossy.java',
        code: `public class Lossy {
    public static void main(String[] args) {
        int whole = 9.8;
    }
}`,
        noRun: true,
        output: `Lossy.java:3: error: incompatible types: possible lossy conversion from double to int
        int whole = 9.8;
                    ^
1 error`
      },
      {
        title: 'What a cast really does',
        text: [
          'A cast never rounds and never stops with an error. Decimals are cut off towards zero, and integers that are too big keep only the bits that fit.',
          'A decimal that is too big for the target becomes the biggest value of that type. `(char) 66` turns the number into the character with Unicode number 66.'
        ],
        fileName: 'NarrowingSurprises.java',
        code: `public class NarrowingSurprises {
    public static void main(String[] args) {
        System.out.println((int) 9.99);
        System.out.println((int) -9.99);
        System.out.println((int) 3_000_000_000L);
        System.out.println((byte) 200);
        System.out.println((int) 1e20);
        System.out.println((char) 66);
    }
}`,
        output: `9
-9
-1294967296
-56
2147483647
B`
      },
      {
        title: 'The integer division surprise',
        text: [
          'The average of 17 and 4 items is 4.25. But `double average = total / count;` stores `4.0`. Java divides `int` by `int` first (result `4`), and only then widens the `4` to `4.0` for the box.',
          'Where you put the cast matters. `(double) (total / count)` casts the already wrong result. `(double) total / count` casts `total` first, so the division itself is decimal.'
        ],
        mermaid: `flowchart TD
  A["(double) (17 / 4)"] --> B["17 / 4 = 4, int maths"]
  B --> C["4.0, wrong"]
  D["(double) 17 / 4"] --> E["17.0 / 4, double maths"]
  E --> F["4.25, right"]`,
        diagramNote: 'A cast binds tighter than `/`: `(double) total / count` means `((double) total) / count`.',
        fileName: 'AverageBug.java',
        code: `public class AverageBug {
    public static void main(String[] args) {
        int total = 17;
        int count = 4;

        double wrong = total / count;               // 4, then widened to 4.0
        double alsoWrong = (double) (total / count);
        double right = (double) total / count;      // 17.0 / 4

        System.out.println(wrong);
        System.out.println(alsoWrong);
        System.out.println(right);
    }
}`,
        output: `4.0
4.0
4.25`
      },
      {
        title: 'Hidden conversions in calculations',
        text: [
          'Java promotes `byte`, `short` and `char` to `int` before maths. That is why `byte c = a + b;` does not compile: the result is an `int`, and storing it back needs a cast.',
          'Compound assignments like `+=` contain a hidden cast. `a += 120;` means `a = (byte) (a + 120);`, so it compiles, and it can overflow without a word.'
        ],
        fileName: 'Promotion.java',
        code: `public class Promotion {
    public static void main(String[] args) {
        byte a = 10;
        byte b = 20;
        int sum = a + b;                // byte + byte is int maths
        byte small = (byte) (a + b);    // a cast to store it in a byte
        a += 120;                       // hidden cast: (byte) (a + 120)

        char letter = 'A';
        int code = letter + 2;          // char + int is int

        System.out.println(sum);
        System.out.println(small);
        System.out.println(a);
        System.out.println(code);
        System.out.println((char) code);
    }
}`,
        output: `30
30
-126
67
C`,
        warn: '`a += 120` gave `-126`: 130 does not fit in a `byte`, and the hidden cast wrapped it silently.'
      },
      {
        title: 'Between text and numbers',
        text: 'Casts work only between number types (and `char`). For text, use these methods.',
        table: {
          head: ['You have', 'You want', 'Write', 'Result'],
          rows: [
            ['`"42"`', '`int`', '`Integer.parseInt("42")`', '`42`'],
            ['`"3.5"`', '`double`', '`Double.parseDouble("3.5")`', '`3.5`'],
            ['`42`', '`String`', '`String.valueOf(42)`', '`"42"`'],
            ['`42`', '`String`', '`"" + 42`', '`"42"`'],
            ['`"abc"`', '`int`', '`Integer.parseInt("abc")`', 'crash: `NumberFormatException`']
          ],
          note: '`(int) "42"` does not compile: a String is not a number type.'
        }
      }
    ],
    technical: [
      'Every primitive conversion is a bytecode instruction: `i2l` (int to long), `i2d` (int to double), `d2i` (double to int), `l2i`, `i2b` and so on. Widening ones are inserted by `javac` without you asking. Narrowing ones appear only where you write a cast, or in a compound assignment like `+=`.',
      '`l2i` and `i2b` drop the high bits, which is why `(byte) 200` is `-56`: 200 is `11001000` in binary, and as a signed `byte` that pattern means -56. `d2i` is different: it rounds towards zero, turns values that are too big into `Integer.MAX_VALUE` or `MIN_VALUE`, and turns `NaN` into `0`.',
      'The promotion rule for operators (called **binary numeric promotion**): if either operand is `double`, both become `double`; else if either is `float`, both become `float`; else if either is `long`, both become `long`; otherwise both become `int`. That is why there is no `byte` maths in Java at all.'
    ],
    tryIt: {
      steps: [
        'Copy `AverageBug.java` and run it.',
        'Change `int total = 17;` to `double total = 17;` and run again.',
        'Add `System.out.println((int) 2.99 + (int) 2.99);` and `System.out.println((int) (2.99 + 2.99));`.'
      ],
      see: 'with `double total` all three lines print `4.25`, because now the division itself is decimal. The last two lines print `4` and `5`.'
    },
    check: [
      { q: 'What do `7 / 2`, `7 % 2` and `7 / 2.0` give?', a: '`3`, `1` and `3.5`. Integer division drops the remainder, `%` gives it, and one decimal operand makes the division decimal.' },
      { q: 'What does `(int) 4.99` give, and how do you get 5 instead?', a: '`4`: the cast cuts off the decimals. Use `Math.round(4.99)`, which gives `5`.' },
      { q: 'Why does `byte c = a + b;` not compile when `a` and `b` are bytes?', a: 'Java promotes both to `int` before adding, so the result is an `int`. Write `byte c = (byte) (a + b);`.' }
    ],
    keyPoints: [
      'Small to big (widening): automatic.',
      'Big to small (narrowing): you must write a cast like `(int)`.',
      'A cast to an integer cuts off decimals. It does not round.',
      '`int / int` is integer division. Make one side a decimal for a decimal result.',
      'Text needs `Integer.parseInt` and `String.valueOf`, not a cast.'
    ],
    commonMistakes: [
      'Expecting `(int) 9.8` to be `10`. Fix: `Math.round(9.8)`.',
      'Casting too late: `(double) (sum / count)`. Fix: `(double) sum / count`.',
      'Averages with only ints: `double avg = sum / count;`. Fix: `double avg = (double) sum / count;`.',
      'Casting text: `int n = (int) "5";`. Fix: `Integer.parseInt("5")`.',
      'Forgetting that `+=` hides a cast and can overflow a `byte` or `short`. Fix: use `int` for calculations.'
    ],
    related: ['Ranges and Overflow', 'The Eight Primitive Types', 'Operators'],
    glossary: topic.glossary
  });
})();
