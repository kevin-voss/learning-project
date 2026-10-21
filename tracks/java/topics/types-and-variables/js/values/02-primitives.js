// Lesson 02: the eight primitive types, their sizes, ranges and when to use each.
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '02',
    id: 'primitives',
    anim: 'boxes',
    title: 'The Eight Primitive Types',
    category: 'values',
    icon: 'int',
    tagline: 'Eight box shapes built into Java',
    realWorld: 'A toy kitchen has cups in different sizes: a tiny one for salt, a big one for water. Java has eight box sizes for simple values. You pick the box that fits what you want to keep.',
    kid: [
      'Java has eight ready-made kinds of boxes. Four are for counting whole things, like apples. Two are for numbers with a dot, like 1.5 litres. One holds a single letter. One holds only "yes" or "no".',
      'Small boxes hold small numbers. Big boxes hold big numbers. If you try to put too big a number into a small box, it does not fit.',
      'Most of the time you use four boxes: `int` for counting, `double` for numbers with a dot, `boolean` for yes or no, and `char` for one letter.'
    ],
    definition: 'A **primitive type** is one of the eight simple types built into the Java language: `byte`, `short`, `int`, `long`, `float`, `double`, `char` and `boolean`. A primitive variable holds the value itself, directly in its box.',
    explain: [
      'Four primitive types hold **integers** (whole numbers without a decimal point): `byte`, `short`, `int` and `long`. They differ only in size, measured in **bits**. A bit is one tiny switch that is 0 or 1. More bits means more possible numbers.',
      'Two primitive types hold **floating-point numbers** (numbers with a decimal point): `float` and `double`. "Floating point" means the computer stores the digits and, separately, where the dot goes. These numbers are very close to the real value, but often not exact.',
      '`char` holds one **character**, like `\'A\'`, `\'7\'` or `\'?\'`. Inside, it is a number from 0 to 65,535 that stands for a letter in the Unicode table. `boolean` holds a truth value: only `true` or `false`.',
      'Everything else in Java, for example `String`, is not a primitive. Those types are called **reference types**. You meet them in the lessons String and Primitives vs Reference Types.',
      'The sizes are the same on every computer. An `int` is always 32 bits, on Linux, macOS, Windows and phones. That is one reason a Java program behaves the same everywhere.'
    ],
    why: 'Each type is a promise about what the box holds. Java can check that promise, store the value in the right amount of memory, and do fast maths with it.',
    whenUse: 'Use `int` for counting, `long` for very big whole numbers, `double` for measurements, `boolean` for yes/no and `char` for one letter. `byte`, `short` and `float` are for special cases.',
    syntax: '`type name = value;` with one of: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`. All eight are lowercase keywords.',
    primitiveTypes: [
      { name: 'int', size: '32 bits', range: '-2,147,483,648 to 2,147,483,647', defaultValue: '0', literalExamples: 'int age = 9;\nint citizens = 3_400_000;', whenUse: 'Counting things: age, score, number of items. The normal choice for whole numbers.', mistake: 'Past about 2.1 billion it wraps around. Use `long` for bigger numbers.', emphasis: true },
      { name: 'double', size: '64 bits', range: 'about ±1.8 × 10^308, 15–16 digits', defaultValue: '0.0', literalExamples: 'double price = 19.99;\ndouble height = 1.42;', whenUse: 'Measurements, averages, anything with a decimal point.', mistake: 'Not exact: `0.1 + 0.2` is `0.30000000000000004`.', emphasis: true },
      { name: 'boolean', size: 'not fixed (true/false)', range: 'true or false', defaultValue: 'false', literalExamples: 'boolean done = false;\nboolean isAdult = age >= 18;', whenUse: 'Answers to yes/no questions.', mistake: 'Writing `True` or `1`. Java wants lowercase `true`.', emphasis: true },
      { name: 'char', size: '16 bits', range: "0 to 65,535 ('\\u0000' to '\\uffff')", defaultValue: "'\\u0000'", literalExamples: "char grade = 'A';\nchar digit = '7';", whenUse: 'One letter, digit or symbol.', mistake: 'Double quotes make a `String`, not a `char`.', emphasis: true },
      { name: 'long', size: '64 bits', range: '-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807', defaultValue: '0L', literalExamples: 'long stars = 100_000_000_000L;\nlong millis = 1_700_000_000_000L;', whenUse: 'Whole numbers that can pass 2 billion: time in milliseconds, big ids, money in cents.', mistake: 'Forgetting the `L` on a big literal.' },
      { name: 'float', size: '32 bits', range: 'about ±3.4 × 10^38, about 7 digits', defaultValue: '0.0f', literalExamples: 'float speed = 12.5f;', whenUse: 'Graphics and games that store millions of numbers. Use `double` otherwise.', mistake: 'Forgetting the `f`: `float speed = 12.5;` does not compile.' },
      { name: 'short', size: '16 bits', range: '-32,768 to 32,767', defaultValue: '0', literalExamples: 'short year = 1998;', whenUse: 'Almost never in your own code. Some file formats use it.', mistake: 'Picking it to "save memory" for one variable. It saves nothing that matters.' },
      { name: 'byte', size: '8 bits', range: '-128 to 127', defaultValue: '0', literalExamples: 'byte floor = 3;', whenUse: 'Raw data from files and the network.', mistake: '`byte` maths gives an `int`: `byte c = a + b;` does not compile.' }
    ],
    fileName: 'PrimitiveTour.java',
    code: `public class PrimitiveTour {
    public static void main(String[] args) {
        // Whole numbers
        byte floorNumber = 3;
        short yearBuilt = 1998;
        int citizens = 3_400_000;
        long starsInGalaxy = 100_000_000_000L;

        // Numbers with a decimal point
        float speedKmh = 12.5f;
        double bodyTemperature = 36.6;

        // One character and one yes/no answer
        char grade = 'A';
        boolean isOpen = true;

        System.out.println("byte:    " + floorNumber);
        System.out.println("short:   " + yearBuilt);
        System.out.println("int:     " + citizens);
        System.out.println("long:    " + starsInGalaxy);
        System.out.println("float:   " + speedKmh);
        System.out.println("double:  " + bodyTemperature);
        System.out.println("char:    " + grade);
        System.out.println("boolean: " + isOpen);
    }
}`,
    output: `byte:    3
short:   1998
int:     3400000
long:    100000000000
float:   12.5
double:  36.6
char:    A
boolean: true`,
    codeSummary: 'One variable of each of the eight primitive types, then all eight printed.',
    codeExplanation: [
      { label: 'Line 4', code: 'byte floorNumber = 3;', text: '`byte` is the smallest integer box: 8 bits, from -128 to 127. A floor number fits easily.' },
      { label: 'Line 5', code: 'short yearBuilt = 1998;', text: '`short` is 16 bits, up to 32,767. Fine for a year, but in real code you would use `int`.' },
      { label: 'Line 6', code: 'int citizens = 3_400_000;', text: '`int` is the normal whole-number type. The underscores only help you read the number. Java ignores them.' },
      { label: 'Line 7', code: 'long starsInGalaxy = 100_000_000_000L;', text: '100 billion does not fit in an `int`. The `L` at the end makes the literal a `long`.' },
      { label: 'Line 10', code: 'float speedKmh = 12.5f;', text: '`float` needs an `f` at the end, because `12.5` alone is a `double`.' },
      { label: 'Line 11', code: 'double bodyTemperature = 36.6;', text: '`double` is the normal type for numbers with a decimal point.' },
      { label: 'Line 14', code: "char grade = 'A';", text: 'A `char` uses single quotes and holds exactly one character.' },
      { label: 'Line 15', code: 'boolean isOpen = true;', text: '`boolean` holds `true` or `false`, always lowercase.' },
      { label: 'Line 20', code: 'System.out.println("long:    " + starsInGalaxy);', text: 'Printing shows the number without underscores and without the `L`. Those exist only in your source code.' }
    ],
    sections: [
      {
        title: 'Ask Java for the limits',
        text: [
          'Each primitive type has a helper class with a similar name that starts with a capital letter: `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character`, `Boolean`. These helpers know the smallest and biggest value of their type as `MIN_VALUE` and `MAX_VALUE`. You learn more about them in Wrapper Types and Autoboxing.',
          '`E38` in the output means "times 10 to the power of 38". So `3.4028235E38` is 34 followed by 37 more digits.'
        ],
        fileName: 'Limits.java',
        code: `public class Limits {
    public static void main(String[] args) {
        System.out.println("byte:  " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
        System.out.println("short: " + Short.MIN_VALUE + " to " + Short.MAX_VALUE);
        System.out.println("int:   " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
        System.out.println("long:  " + Long.MIN_VALUE + " to " + Long.MAX_VALUE);
        // (int) turns the char into its number, see the lesson Casting
        System.out.println("char:  " + (int) Character.MIN_VALUE + " to " + (int) Character.MAX_VALUE);
        System.out.println("float max:  " + Float.MAX_VALUE);
        System.out.println("double max: " + Double.MAX_VALUE);
    }
}`,
        output: `byte:  -128 to 127
short: -32768 to 32767
int:   -2147483648 to 2147483647
long:  -9223372036854775808 to 9223372036854775807
char:  0 to 65535
float max:  3.4028235E38
double max: 1.7976931348623157E308`
      },
      {
        title: 'Why bits decide the range',
        text: [
          'One bit has 2 patterns (0 or 1). Two bits have 4 patterns (00, 01, 10, 11). Every extra bit doubles the number of patterns. So 8 bits give 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 256 patterns.',
          'The integer types use half of the patterns for negative numbers and half for zero and the positive numbers. That is why `byte` goes from -128 to 127: 128 negative values, zero, and 127 positive values, 256 in total. `char` has no negative values, so its 16 bits go from 0 to 65,535.'
        ],
        table: {
          head: ['Type', 'Bits', 'Patterns', 'Smallest', 'Biggest'],
          rows: [
            ['`byte`', '8', '256', '-128', '127'],
            ['`short`', '16', '65,536', '-32,768', '32,767'],
            ['`char`', '16', '65,536', '0', '65,535'],
            ['`int`', '32', 'about 4.3 billion', '-2,147,483,648', '2,147,483,647'],
            ['`long`', '64', 'about 18 quintillion', '-9.2 quintillion', '9.2 quintillion']
          ],
          note: 'A quintillion is 1 followed by 18 zeros. A `long` is big enough for the milliseconds of 292 million years.'
        }
      },
      {
        title: 'Decimals are close, not exact',
        text: [
          'A `double` stores about 15 to 16 significant digits (digits that count, from the first non-zero one). A `float` stores only about 7. Many decimal numbers, like `0.1`, cannot be written exactly in bits, in the same way 1/3 cannot be written exactly as a decimal (0.333...). The computer stores the closest value it can.',
          'The `==` sign below asks "are these two values equal?" and gives `true` or `false`. You learn it properly in [Operators](../operators/index.html).'
        ],
        fileName: 'DecimalPrecision.java',
        code: `public class DecimalPrecision {
    public static void main(String[] args) {
        double sum = 0.1 + 0.2;
        float thirdFloat = 1.0f / 3;
        double thirdDouble = 1.0 / 3;

        System.out.println(sum);
        System.out.println(thirdFloat);
        System.out.println(thirdDouble);
        System.out.println(sum == 0.3);
    }
}`,
        output: `0.30000000000000004
0.33333334
0.3333333333333333
false`,
        warn: 'Never keep money in a `double`: tiny errors add up. Store cents in a `long` (`long priceCents = 1999;`) or use the class `BigDecimal`.'
      },
      {
        title: 'char is a number in disguise',
        text: [
          'Every `char` is a number from the **Unicode** table, a big list that gives every letter of every language a number. `\'A\'` is 65, `\'B\'` is 66, `\'a\'` is 97. When you do maths with a `char`, Java uses that number.',
          'That is why `\'A\' + \'B\'` prints `131` and not `AB`: 65 + 66 = 131. To glue letters into text, use a `String`.'
        ],
        fileName: 'CharNumbers.java',
        code: `public class CharNumbers {
    public static void main(String[] args) {
        char letter = 'A';
        int code = letter;                 // a char fits into an int
        char next = (char) (letter + 1);   // 65 + 1 = 66, back to a char

        System.out.println(letter);
        System.out.println(code);
        System.out.println(next);
        System.out.println('A' + 'B');
    }
}`,
        output: `A
65
B
131`
      },
      {
        title: 'Which type should I pick?',
        text: 'Ask these questions in order. Text with more than one letter, like a name, is a `String`, which is not a primitive.',
        mermaid: `flowchart TD
  Q1{"Only yes or no?"} -->|yes| B["boolean"]
  Q1 -->|no| Q2{"One letter or symbol?"}
  Q2 -->|yes| C["char"]
  Q2 -->|no| Q3{"Has a decimal point?"}
  Q3 -->|yes| D["double"]
  Q3 -->|no| Q4{"Can it pass 2 billion?"}
  Q4 -->|yes| L["long"]
  Q4 -->|no| I["int"]`,
        diagramNote: '`byte`, `short` and `float` are missing on purpose. You choose them only when a library or a file format asks for them.'
      }
    ],
    technical: [
      'The Java Language Specification fixes the size of every primitive type, so it is the same on every computer. Integers are stored in **two’s complement**, a bit pattern where the highest bit marks a negative number. `float` and `double` follow the IEEE 754 standard that almost every processor uses.',
      'Inside a method frame, the JVM gives each local `int`, `float`, `char`, `short`, `byte` and `boolean` one 32-bit slot. A `long` or `double` takes two slots. That is why `byte` and `short` locals save no memory: they still use a whole slot. Their small size matters only in big arrays.',
      'The JVM has no real `boolean` type in its instructions: a `boolean` local is stored as the `int` 0 or 1. A `char` is one UTF-16 code unit. Most letters fit in one, but some emoji need two `char` values side by side.'
    ],
    tryIt: {
      steps: [
        'Copy `Limits.java` from step 1 above and run it.',
        'Add a line that prints `Integer.MAX_VALUE + 1`.',
        "Add `char letter = 'J';` and print `letter + 1`, then `(char) (letter + 1)`."
      ],
      see: '`-2147483648` (the number wrapped around, see Ranges and Overflow), then `75` and `K`.'
    },
    check: [
      { q: 'Which type would you pick for the number of people on Earth (about 8 billion)?', a: '`long`. An `int` stops at about 2.1 billion.' },
      { q: 'Why is `byte` from -128 to 127 and not from -128 to 128?', a: '8 bits give 256 patterns. 128 are negative, one is zero, so 127 are left for positive numbers.' },
      { q: "What does `System.out.println('a' + 1);` print?", a: "`98`. `'a'` is 97 in Unicode, and maths with a `char` uses its number." }
    ],
    keyPoints: [
      'There are exactly 8 primitive types, all lowercase.',
      'Integers: `byte`, `short`, `int`, `long`. Decimals: `float`, `double`. Plus `char` and `boolean`.',
      'Start with `int`, `double`, `boolean` and `char`.',
      'More bits mean a bigger range. Sizes are the same on every computer.',
      '`double` is close, not exact. Never use it for money.'
    ],
    commonMistakes: [
      'Writing `Int` or `Boolean` when you mean the primitive. Fix: primitives are lowercase, `int` and `boolean`.',
      'Picking `float` for normal decimals: `float price = 19.99;` does not compile. Fix: use `double price = 19.99;`.',
      "Expecting `'A' + 'B'` to be `\"AB\"`. Fix: `char` maths adds numbers. Use Strings to glue text: `\"A\" + \"B\"`.",
      'Using `int` for values that can pass 2 billion. Fix: use `long`.'
    ],
    related: ['Literals', 'Ranges and Overflow', 'Wrapper Types and Autoboxing'],
    glossary: topic.glossary
  });
})();
