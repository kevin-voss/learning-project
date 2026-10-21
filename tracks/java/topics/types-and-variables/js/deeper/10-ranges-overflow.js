// Lesson 10 (deeper): exact ranges, integer overflow with a real bug, Math.addExact, decimal limits.
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '10',
    id: 'ranges-overflow',
    title: 'Ranges and Overflow',
    category: 'deeper',
    icon: 'max',
    tagline: 'Every number box has a limit',
    realWorld: 'An old car counter shows 999999 kilometres. Drive one more kilometre and it shows 000000. The counter did not break. It ran out of digits and started again.',
    kid: [
      'Every number box has a biggest number it can hold. An `int` box can count up to about 2 billion.',
      'If you add one more to the biggest number, the box does not complain. It jumps all the way round to the smallest number, a big minus number, like a counter that rolls over.',
      'Java does not warn you when that happens. So for really big numbers you pick a bigger box, `long`.'
    ],
    definition: '**Overflow** happens when the result of integer maths is bigger than the type can hold (or smaller than its minimum). Java does not stop: the value silently **wraps around** to the other end of the range. `Integer.MAX_VALUE + 1` is `Integer.MIN_VALUE`.',
    explain: [
      'Each integer type has a fixed number of bits, so it has a fixed **range**: a smallest and a biggest value. For `int` that is -2,147,483,648 to 2,147,483,647. Java keeps these limits as constants: `Integer.MIN_VALUE` and `Integer.MAX_VALUE`, and the same for `Byte`, `Short` and `Long`.',
      'When a calculation goes past the limit, the extra bits fall off the end, like the counter that rolls over. The result is wrong, but it is a valid `int`, so Java gives no error and no warning. That makes overflow bugs hard to find.',
      'The type of a calculation is decided by its operands (the values on both sides of the operator), not by the box you store the result in. `int * int` is `int` maths, even in `long x = a * b;`. To get `long` maths, at least one operand must be a `long` before the calculation starts.',
      'If overflow must never go unnoticed, use `Math.addExact`, `Math.subtractExact` and `Math.multiplyExact`. They do the same maths but stop with an `ArithmeticException` when the result does not fit. For numbers without any limit there is the class `BigInteger`.',
      'Decimal types behave differently. A `double` that grows too big becomes `Infinity`. And far before that, `float` and `double` run out of digits: the value is rounded to the nearest number they can store.'
    ],
    why: 'Silent wrap-around makes very strange bugs: negative ages, negative prices, timers that fire at the wrong time.',
    whenUse: 'Think about it for big totals, time in milliseconds, counts that keep growing, money in cents, and every multiplication of large numbers.',
    syntax: 'Limits: `Integer.MAX_VALUE`, `Long.MIN_VALUE` · long maths: `30L * 24 * 60` · checked maths: `Math.addExact(a, b)`, `Math.multiplyExact(a, b)`',
    fileName: 'OverflowTimer.java',
    code: `public class OverflowTimer {
    public static void main(String[] args) {
        // The biggest int, and one more
        int max = Integer.MAX_VALUE;
        System.out.println("max:     " + max);
        System.out.println("max + 1: " + (max + 1));

        // A real bug: milliseconds in 30 days
        int daysInMonth = 30;
        int wrongMillis = daysInMonth * 24 * 60 * 60 * 1000;
        System.out.println("wrong: " + wrongMillis);

        // Fix: make one number a long, so all the maths is long
        long rightMillis = daysInMonth * 24L * 60 * 60 * 1000;
        System.out.println("right: " + rightMillis);

        // Overflow works downwards too
        int min = Integer.MIN_VALUE;
        System.out.println("min - 1: " + (min - 1));
    }
}`,
    output: `max:     2147483647
max + 1: -2147483648
wrong: -1702967296
right: 2592000000
min - 1: 2147483647`,
    codeSummary: 'An `int` at its limit wraps round, a real-world time calculation goes negative, and one `L` fixes it.',
    codeExplanation: [
      { label: 'Line 4', code: 'int max = Integer.MAX_VALUE;', text: 'The biggest possible `int`: 2,147,483,647.' },
      { label: 'Line 6', code: 'System.out.println("max + 1: " + (max + 1));', text: 'One more wraps round to the smallest `int`. No error, no warning.' },
      { label: 'Line 10', code: 'int wrongMillis = daysInMonth * 24 * 60 * 60 * 1000;', text: '30 days are 2,592,000,000 milliseconds. That is more than `int` can hold, so the result wraps to a negative number.' },
      { label: 'Line 11', code: 'System.out.println("wrong: " + wrongMillis);', text: 'A timer with this value would never fire, or fire at once. A real bug that has happened in real programs.' },
      { label: 'Line 14', code: 'long rightMillis = daysInMonth * 24L * 60 * 60 * 1000;', text: '`24L` is a `long`. `int * long` is `long` maths, and every step after it stays `long`. The result fits.' },
      { label: 'Line 18', code: 'int min = Integer.MIN_VALUE;', text: 'The smallest `int`: -2,147,483,648.' },
      { label: 'Line 19', code: 'System.out.println("min - 1: " + (min - 1));', text: 'One less wraps round to the biggest `int`. Overflow goes both ways.' }
    ],
    sections: [
      {
        title: 'The exact ranges',
        text: 'You do not need to learn these numbers by heart. Remember "`int` is about ±2 billion" and ask Java for the rest with `MIN_VALUE` and `MAX_VALUE`.',
        table: {
          head: ['Type', 'Smallest', 'Biggest', 'Rule of thumb'],
          rows: [
            ['`byte`', '-128', '127', 'tiny'],
            ['`short`', '-32,768', '32,767', 'about ±32 thousand'],
            ['`int`', '-2,147,483,648', '2,147,483,647', 'about ±2 billion'],
            ['`long`', '-9,223,372,036,854,775,808', '9,223,372,036,854,775,807', 'about ±9 quintillion'],
            ['`char`', '0', '65,535', 'no negatives'],
            ['`float`', 'about -3.4 × 10^38', 'about 3.4 × 10^38', 'only about 7 exact digits'],
            ['`double`', 'about -1.8 × 10^308', 'about 1.8 × 10^308', 'about 15–16 exact digits']
          ]
        }
      },
      {
        title: 'Why it wraps: the rolling counter',
        text: [
          'Look at `byte`, the smallest type. Counting up from 126, the next values are 127, then -128, then -127. The range is a circle: after the biggest value comes the smallest.',
          '`b++` below adds 1 to `b`, and `b--` takes 1 away (more in [Operators](../operators/index.html)).'
        ],
        mermaid: `flowchart LR
  A["126"] -->|+1| B["127 = MAX"]
  B -->|+1| C["-128 = MIN"]
  C -->|+1| D["-127"]
  D -->|"... +1 ..."| E["0"]
  E -->|"... +1 ..."| A`,
        diagramNote: 'The same circle exists for every integer type, only much bigger. For `int` it has about 4.3 billion steps.',
        fileName: 'ByteWrap.java',
        code: `public class ByteWrap {
    public static void main(String[] args) {
        byte b = 127;
        b++;                    // one more than the maximum
        System.out.println(b);
        b--;                    // one less than the minimum
        System.out.println(b);
    }
}`,
        output: `-128
127`
      },
      {
        title: 'A long box is not enough',
        text: [
          'A common wrong fix: change only the box to `long`. Java still multiplies `int` by `int`, gets the wrapped result, and only then puts it into the `long` box. The damage is already done.',
          'The `L` must be in the calculation, ideally on the first number, so that every step is `long` maths.'
        ],
        fileName: 'LongTooLate.java',
        code: `public class LongTooLate {
    public static void main(String[] args) {
        long tooLate = 30 * 24 * 60 * 60 * 1000;    // int maths, then stored
        long inTime = 30L * 24 * 60 * 60 * 1000;    // long maths from the start
        System.out.println(tooLate);
        System.out.println(inTime);
    }
}`,
        output: `-1702967296
2592000000`
      },
      {
        title: 'Let Java check for you',
        text: [
          '`Math.addExact(a, b)` adds like `a + b`, but if the result does not fit, it throws an `ArithmeticException` instead of wrapping. A wrong number becomes a clear error.',
          'The `try { ... } catch (...) { ... }` below runs the `try` block, and if that exception happens, it jumps to the `catch` block instead of stopping the program. You learn it in [Exceptions](../exceptions/index.html).'
        ],
        fileName: 'ExactMath.java',
        code: `public class ExactMath {
    public static void main(String[] args) {
        int big = 2_000_000_000;
        System.out.println(big + big);                    // silent overflow
        System.out.println(Math.addExact(big, 100));      // fits: fine

        try {
            System.out.println(Math.addExact(big, big));  // does not fit
        } catch (ArithmeticException e) {
            System.out.println("Stopped: " + e.getMessage());
        }
    }
}`,
        output: `-294967296
2000000100
Stopped: integer overflow`,
        tip: 'Use the `Exact` methods where a wrong number would hurt: money, stock counts, sizes. For numbers of any size, use `BigInteger`.'
      },
      {
        title: 'Decimals: Infinity and lost digits',
        text: [
          'A `double` that grows too big becomes `Infinity`. Dividing a decimal by zero also gives `Infinity`, and `0.0 / 0` gives `NaN` ("Not a Number"). No error either. (An `int` divided by `0` is different: it throws an `ArithmeticException`.)',
          'A `float` has about 7 exact digits. The whole number 16,777,217 needs 8, so `float` rounds it to 16,777,216. Decimal fractions like `0.1` are never stored exactly in the first place.'
        ],
        fileName: 'DecimalLimits.java',
        code: `public class DecimalLimits {
    public static void main(String[] args) {
        double huge = Double.MAX_VALUE;
        System.out.println(huge * 2);
        System.out.println(1.0 / 0);
        System.out.println(0.0 / 0);

        float rounded = 16_777_217;         // 2 to the power 24, plus 1
        System.out.println(rounded);
        System.out.println(0.1 + 0.1 + 0.1);
    }
}`,
        output: `Infinity
Infinity
NaN
1.6777216E7
0.30000000000000004`,
        warn: 'This is why money never goes into `float` or `double`. Keep money as whole cents in a `long`, or use `BigDecimal`.'
      }
    ],
    technical: [
      'Integers are stored in **two’s complement**. The biggest `int` is the bit pattern `0111...1` (a 0 and 31 ones). Adding 1 gives `1000...0`, and in two’s complement a leading 1 means negative: that pattern is -2,147,483,648. The processor does this addition in one step with no check, which is why integer maths in Java is fast and why overflow is silent.',
      'The Java Language Specification says so directly: integer operators never report overflow. Only integer division by zero (`/` and `%`) throws an `ArithmeticException`. The `Math.*Exact` methods are special: the JIT compiler turns them into the plain processor instruction plus a check of the processor’s overflow flag, so they cost almost nothing.',
      '`float` and `double` follow IEEE 754. They have special values for `Infinity`, `-Infinity` and `NaN`. `NaN` is not equal to anything, not even itself: `Double.NaN == Double.NaN` is `false`. Check it with `Double.isNaN(x)`.'
    ],
    tryIt: {
      steps: [
        'Copy `OverflowTimer.java` and run it.',
        'Change `daysInMonth` to `365` and run again. Look at both lines.',
        'Replace line 10 with `int wrongMillis = Math.multiplyExact(daysInMonth, 24 * 60 * 60 * 1000);` and run once more.'
      ],
      see: 'for 365 days `wrong: 1471228928` (wrong, but positive, which makes it even harder to spot) and `right: 31536000000`, then an `ArithmeticException: integer overflow` that stops the program.'
    },
    check: [
      { q: 'What does `Integer.MAX_VALUE + 1` give?', a: '`-2147483648`, which is `Integer.MIN_VALUE`. The value wraps round with no error.' },
      { q: 'Why does `long ms = 1000 * 60 * 60 * 24 * 30;` still give a negative number?', a: 'All operands are `int`, so the maths is `int` maths and overflows before the result reaches the `long` box. Write `1000L * 60 * 60 * 24 * 30`.' },
      { q: 'How can you make Java stop instead of wrapping?', a: 'Use `Math.addExact`, `Math.subtractExact` or `Math.multiplyExact`. They throw an `ArithmeticException` on overflow.' }
    ],
    keyPoints: [
      'Every integer type has a fixed range. `int` is about ±2 billion.',
      'Integer overflow wraps round silently.',
      'The operands decide the maths type, not the box. Put the `L` into the calculation.',
      '`Math.addExact` and friends turn overflow into an error.',
      'Decimals become `Infinity` or lose digits instead of wrapping.'
    ],
    commonMistakes: [
      'Expecting an error on overflow. Fix: there is none. Use `long` or `Math.addExact`.',
      'Fixing only the box: `long x = a * b;` with `int a, b`. Fix: `long x = (long) a * b;` or make one literal `L`.',
      'Putting the `L` at the end: `30 * 24 * 60 * 60 * 1000L`. It works here, because the maths before it still fits, but the safe habit is the `L` on the first number.',
      'Storing money in `double`. Fix: whole cents in a `long`, or `BigDecimal`.'
    ],
    related: ['The Eight Primitive Types', 'Type Conversion and Casting', 'Operators'],
    glossary: topic.glossary
  });
})();
