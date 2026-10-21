Java.topics.operators.lessons.push(
  {
    id: 'modulo',
    num: '02',
    title: 'Modulo: the Remainder',
    category: 'calculation',
    icon: '%',
    tagline: 'What is left over, and why that is useful',
    realWorld: 'A clock face. After 12 the hand does not go to 13. It goes back to 1. Counting starts again from the beginning.',
    kid: [
      'You put 14 eggs into boxes. Each box holds 6 eggs. You fill 2 boxes. Then 2 eggs are left on the table.',
      'Those 2 eggs are the **remainder**. In Java you ask for it with `%`: `14 % 6` is `2`.',
      'The remainder is always smaller than the box size. With boxes of 6, the rest is 0, 1, 2, 3, 4 or 5. After 5 it goes back to 0, like a clock that starts again.'
    ],
    definition: '`a % b` (say "a modulo b" or "a mod b") is the **remainder** of the division `a / b`: what is left over after `b` fits into `a` as many whole times as possible.',
    explain: [
      'For whole numbers, `/` and `%` are a pair. `/` tells you how many times `b` fits into `a`. `%` tells you what is left. Together they always fit: `(a / b) * b + (a % b)` equals `a`.',
      'Example: `17 / 5` is `3` and `17 % 5` is `2`, because `3 * 5 + 2` is `17`.',
      'For positive numbers, `a % b` is always between `0` and `b - 1`. This makes `%` great for three jobs: **even or odd** (`n % 2`), **digits** (`n % 10` is the last digit) and **wrap-around** (counting that starts again, like clock hours).',
      'If `a` is smaller than `b`, `b` fits zero times and everything is left over: `3 % 5` is `3`.',
      'With negative numbers, the result takes the sign of the left operand: `-7 % 3` is `-1`. Step 5 shows this and how to get a positive result.'
    ],
    why: 'Many problems are about "what is left", "every n-th" or "start again after n": even numbers, digits of a number, clocks, weekdays, rows of a grid.',
    whenUse: 'Use `%` to test divisibility (`n % 3 == 0`), to split a number into parts (minutes and seconds), and to wrap a counter around (`(hour + 5) % 24`).',
    syntax: '`dividend % divisor`, for example `n % 2`, `seconds % 60`, `(day + 1) % 7`.',
    fileName: 'Modulo.java',
    code: `public class Modulo {
    public static void main(String[] args) {
        // Even or odd: look at the remainder after dividing by 2
        System.out.println("12 % 2 = " + (12 % 2));
        System.out.println("13 % 2 = " + (13 % 2));

        // Digits: % 10 gives the last digit, / 10 removes it
        int year = 2048;
        System.out.println("Last digit: " + (year % 10));
        System.out.println("Tens digit: " + (year / 10 % 10));
        System.out.println("Without the last digit: " + (year / 10));

        // Time: split seconds into minutes and seconds
        int totalSeconds = 135;
        int minutes = totalSeconds / 60;
        int seconds = totalSeconds % 60;
        System.out.println(totalSeconds + " s = " + minutes + " min " + seconds + " s");

        // Wrap-around: a 24-hour clock starts again at 0
        int now = 22;
        int later = (now + 5) % 24;
        System.out.println("5 hours after 22:00 it is " + later + ":00");
    }
}`,
    output: `12 % 2 = 0
13 % 2 = 1
Last digit: 8
Tens digit: 4
Without the last digit: 204
135 s = 2 min 15 s
5 hours after 22:00 it is 3:00`,
    codeSummary: 'One program, the three classic jobs of `%`: even or odd, digits of a number, and wrap-around on a clock.',
    codeExplanation: [
      { label: 'Line 4', code: `System.out.println("12 % 2 = " + (12 % 2));`, text: '2 fits 6 times into 12 and nothing is left: the remainder `0` means 12 is even.' },
      { label: 'Line 5', code: `System.out.println("13 % 2 = " + (13 % 2));`, text: 'Remainder `1` means odd. Every whole number gives `0` or `1` here.' },
      { label: 'Line 9', code: `System.out.println("Last digit: " + (year % 10));`, text: 'Dividing by 10 leaves the last digit as remainder: `2048 % 10` is `8`.' },
      { label: 'Line 10', code: `System.out.println("Tens digit: " + (year / 10 % 10));`, text: '`/` and `%` have the same priority, so Java goes left to right: `2048 / 10` is `204`, then `204 % 10` is `4`.' },
      { label: 'Line 15', code: `int minutes = totalSeconds / 60;`, text: '`/` counts the full minutes: 60 fits 2 times into 135.' },
      { label: 'Line 16', code: `int seconds = totalSeconds % 60;`, text: '`%` gives the seconds that do not make a full minute: `135 - 120` is `15`.' },
      { label: 'Line 21', code: `int later = (now + 5) % 24;`, text: '`22 + 5` is `27`. There is no hour 27, so `% 24` wraps it around: `27 % 24` is `3`.' }
    ],
    sections: [
      {
        title: 'What the remainder is',
        text: [
          'Do the division the way you learned it at school: how many times does the divisor fit, and what is left?',
          'The remainder is always smaller than the divisor. If it were bigger, the divisor would fit one more time.'
        ],
        table: {
          head: ['Expression', 'Fits how often (`/`)', 'Used up', 'Remainder (`%`)'],
          rows: [
            ['`17 % 5`', '3', '15', '`2`'],
            ['`20 % 5`', '4', '20', '`0`'],
            ['`3 % 5`', '0', '0', '`3`'],
            ['`0 % 5`', '0', '0', '`0`'],
            ['`7.5 % 2`', '3', '6.0', '`1.5`']
          ],
          note: '`%` also works with `double`: `7.5 % 2` is `1.5`. You need this rarely.'
        }
      },
      {
        title: 'Even, odd and "every n-th"',
        text: [
          'A number is **even** when 2 fits into it with nothing left: `n % 2` is `0`. It is **odd** when `n % 2` is not `0`.',
          'The same idea works for any number: `n % 3 == 0` asks "can I divide n by 3 without a rest?". `==` asks "are these equal?" and gives `true` or `false`; the lesson **Comparison** explains it.'
        ],
        mermaid: 'flowchart LR\n  N["n"] --> M["n % 2"]\n  M -->|"0"| E["even"]\n  M -->|"not 0"| O["odd"]',
        diagramNote: 'Every whole number lands on one of the two sides.',
        fileName: 'EvenOdd.java',
        code: `public class EvenOdd {
    public static void main(String[] args) {
        int a = 8;
        int b = 15;
        System.out.println(a + " is even: " + (a % 2 == 0));
        System.out.println(b + " is even: " + (b % 2 == 0));
        System.out.println(b + " divides by 3: " + (b % 3 == 0));
        System.out.println(b + " divides by 4: " + (b % 4 == 0));
    }
}`,
        output: `8 is even: true
15 is even: false
15 divides by 3: true
15 divides by 4: false`
      },
      {
        title: 'Taking a number apart into digits',
        text: [
          'In our number system every place is worth 10 times the next one. So `% 10` gives the last digit, and `/ 10` removes it. Do both again and again, and you get every digit from right to left.',
          'Here is the trace for `4827`. Each row uses the number from the row before.'
        ],
        table: {
          head: ['Step', 'Number', '`number % 10`', '`number / 10`'],
          rows: [
            ['1', '`4827`', '`7` (ones)', '`482`'],
            ['2', '`482`', '`2` (tens)', '`48`'],
            ['3', '`48`', '`8` (hundreds)', '`4`'],
            ['4', '`4`', '`4` (thousands)', '`0`, done']
          ]
        },
        fileName: 'Digits.java',
        code: `public class Digits {
    public static void main(String[] args) {
        int number = 4827;

        int ones = number % 10;
        int tens = number / 10 % 10;
        int hundreds = number / 100 % 10;
        int thousands = number / 1000 % 10;

        System.out.println("thousands=" + thousands + " hundreds=" + hundreds
                + " tens=" + tens + " ones=" + ones);
        System.out.println("digit sum = " + (thousands + hundreds + tens + ones));
    }
}`,
        output: `thousands=4 hundreds=8 tens=2 ones=7
digit sum = 21`,
        tip: 'With a loop (next topic, [Control Flow](../control-flow/index.html)) you repeat `% 10` and `/ 10` until the number is `0`. That works for numbers of any length.'
      },
      {
        title: 'Wrap-around: counting in a circle',
        text: [
          '`x % n` is always between `0` and `n - 1`. So if you add to a counter and then take `% n`, the counter walks in a circle: `0, 1, 2, …, n - 1, 0, 1, …`.',
          'Clocks (`% 24`, `% 60`), weekdays (`% 7`) and players taking turns (`% numberOfPlayers`) all work this way.'
        ],
        mermaid: 'flowchart LR\n  P0["player 0"] -->|"+1"| P1["player 1"]\n  P1 -->|"+1"| P2["player 2"]\n  P2 -->|"(2 + 1) % 3 = 0"| P0',
        diagramNote: 'Three players. After player 2, `(2 + 1) % 3` is `0`, so player 0 is next again.',
        fileName: 'WrapAround.java',
        code: `public class WrapAround {
    public static void main(String[] args) {
        // Days: 0 = Monday, 1 = Tuesday, ... 6 = Sunday
        int today = 4;                       // Friday
        int inTenDays = (today + 10) % 7;
        System.out.println("In 10 days it is day " + inTenDays);

        // Turns: 3 players take turns, 0, 1, 2, 0, 1 ...
        int player = 2;
        player = (player + 1) % 3;
        System.out.println("Next player: " + player);

        // Minutes on a clock
        int minute = 50;
        int afterTwenty = (minute + 20) % 60;
        System.out.println("20 minutes after :50 is :" + afterTwenty);
    }
}`,
        output: `In 10 days it is day 0
Next player: 0
20 minutes after :50 is :10`
      },
      {
        title: 'Negative numbers and floorMod',
        text: [
          'In Java, the sign of `a % b` is the sign of `a`, the left operand. So `-7 % 3` is `-1`, not `2`. This follows from integer division cutting toward zero: `-7 / 3` is `-2`, and `-2 * 3 + (-1)` is `-7`.',
          'For wrap-around with numbers that can be negative (going back in time, moving left on a board), use `Math.floorMod(a, b)`. Its result always has the sign of `b`, so with a positive `b` it is never negative. The lesson **Math Helpers** shows more of `Math`.'
        ],
        fileName: 'NegativeRemainder.java',
        code: `public class NegativeRemainder {
    public static void main(String[] args) {
        System.out.println(-7 % 3);
        System.out.println(7 % -3);
        System.out.println(Math.floorMod(-7, 3));

        // 3 hours before 1:00 on a 24-hour clock
        int hour = 1;
        System.out.println("with %:        " + ((hour - 3) % 24));
        System.out.println("with floorMod: " + Math.floorMod(hour - 3, 24));

        // Odd test that breaks for negative numbers
        int n = -5;
        System.out.println("n % 2 == 1: " + (n % 2 == 1));
        System.out.println("n % 2 != 0: " + (n % 2 != 0));
    }
}`,
        output: `-1
1
2
with %:        -2
with floorMod: 22
n % 2 == 1: false
n % 2 != 0: true`,
        warn: '`n % 2 == 1` says `false` for odd negative numbers, because `-5 % 2` is `-1`. Test odd numbers with `n % 2 != 0`.'
      }
    ],
    technical: [
      'For `int` operands the compiler emits the bytecode `irem` (integer remainder); for `long` it is `lrem`, for `double` it is `drem`. The JVM defines them so that `(a / b) * b + (a % b) == a` is always true. Because `/` cuts toward zero, the remainder gets the sign of the dividend.',
      '`a % 0` with whole numbers throws `ArithmeticException: / by zero`, like `a / 0`. With `double`, `5.0 % 0` is `NaN`.',
      '`Math.floorMod(a, b)` uses floor division instead (rounding down, toward minus infinity). That is the "mathematical" modulo many other languages use. `Math.floorDiv(a, b)` is its partner for division.',
      'When `b` is a power of two, the JIT compiler (the part of the JVM that turns hot bytecode into machine code) often replaces `% 8` with a faster bit operation. You do not have to do this yourself.'
    ],
    tryIt: {
      steps: [
        'Create `Clock.java` with a `main` method.',
        'Make `int totalMinutes = 200;`.',
        'Print the hours with `totalMinutes / 60` and the rest with `totalMinutes % 60`.',
        'Print `(totalMinutes / 60 + 23) % 24` to see the hour 23 hours later.'
      ],
      see: '`3`, `20` and `2`.'
    },
    check: [
      { q: 'What is `25 % 7`?', a: '`4`. 7 fits 3 times into 25 (that is 21) and 4 are left.' },
      { q: 'How do you get the last two digits of `2048`?', a: '`2048 % 100`, which is `48`.' },
      { q: 'Why can `n % 2 == 1` be wrong?', a: 'For negative odd `n` the remainder is `-1`. Use `n % 2 != 0` to test for odd.' }
    ],
    keyPoints: [
      '`a % b` is what is left after `b` fits into `a` as many whole times as possible.',
      '`(a / b) * b + (a % b)` always equals `a`.',
      '`n % 2 == 0` means even. `n % 10` is the last digit.',
      '`(x + step) % n` walks around a circle of `n` values.',
      'The result has the sign of the left operand. `Math.floorMod` gives a non-negative result for a positive `b`.'
    ],
    commonMistakes: [
      'Thinking `%` means percent. `50 % 10` is `0`, not five. For a percentage, write `value * 10 / 100`.',
      'Testing odd with `n % 2 == 1`. It fails for negative numbers. Use `n % 2 != 0`.',
      'Forgetting the parentheses: `now + 5 % 24` is `now + 5`, because `%` runs before `+`. Write `(now + 5) % 24`.',
      'Using `%` for wrap-around with negative steps. `(hour - 3) % 24` can be negative. Use `Math.floorMod(hour - 3, 24)`.'
    ],
    related: ['Arithmetic', 'Comparison', 'Math Helpers', 'Control Flow'],
    glossary: [
      { term: 'remainder', definition: 'What is left over after dividing whole numbers. 17 % 5 is 2.' },
      { term: 'wrap-around', definition: 'Counting that starts again at 0 after reaching n, done with % n.' }
    ]
  }
);
