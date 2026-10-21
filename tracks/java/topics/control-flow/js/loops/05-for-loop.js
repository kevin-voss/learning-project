(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'for-loop',
    num: '05',
    title: 'for Loop',
    category: 'loops',
    icon: 'for',
    tagline: 'Repeat with a counter',
    realWorld: 'Running laps in the school yard. The teacher says: "Start at lap 1. Keep running while you have done 5 laps or fewer. After each lap, count one up."',
    kid: [
      'Imagine you must put 5 stickers in your album. You do not think about it as five different jobs. You think: "Take a sticker, stick it in, count. Again. Again." until you counted to 5.',
      'A `for` loop is that counting. It has a counter (often called `i`), a rule for when to stop, and a step that counts up after each sticker.',
      'The computer never gets bored. It can count to 5 or to 5 million in exactly the same way.'
    ],
    definition: 'A `for` loop repeats a block of code a counted number of times. Its header holds three parts: **init** (start the counter), **condition** (keep going while it is true) and **update** (change the counter after each round).',
    explain: [
      'A **loop** is code that repeats. The block in braces that repeats is the **loop body**, and one run of the body is one **iteration** (one round).',
      'The header `for (int i = 1; i <= 5; i++)` has three parts separated by semicolons. The **init** `int i = 1` runs once, before anything else. It creates the **loop variable** `i`, the counter.',
      'The **condition** `i <= 5` is checked before every round, including the first. When it is true, the body runs. When it is false, the loop ends and Java goes on after the closing brace.',
      'The **update** `i++` runs after every round, right before the next check. `i++` adds 1 to `i` (from [Operators](../operators/index.html)). Other updates like `i--` or `i += 2` work the same way.',
      'So the order is: init, check, body, update, check, body, update, check … until a check is false. A **trace table** (one row per step, one column per variable) is the best way to follow this by hand.'
    ],
    why: 'Without loops, printing 100 lines needs 100 lines of code. With a loop it needs three. Loops also work when the count is only known while the program runs.',
    whenUse: 'When you know how many times to repeat, or you count through numbers in steps: 1 to 10, 10 down to 0, every second number.',
    syntax: '`for (init; condition; update) { body }` for example `for (int i = 0; i < n; i++) { … }` runs n times.',
    mermaid: `flowchart TD
  I["init: int i = 1 (once)"] --> C{"condition: i <= 5?"}
  C -- true --> B["body: total = total + i, print"]
  B --> U["update: i++"]
  U --> C
  C -- false --> E["after the loop: print the sum"]`,
    visualLabel: 'The loop as a flowchart',
    visualNote: 'The arrow from the update goes back up to the condition. That backwards arrow is what makes it a loop. The only way out is the false arrow.',
    fileName: 'SumToFive.java',
    code: `public class SumToFive {
    public static void main(String[] args) {
        int total = 0;
        int rounds = 0;

        // start ; keep going while ; after each round
        for (int i = 1; i <= 5; i++) {
            total = total + i;
            rounds++;
            System.out.println("Round " + rounds + ": i = " + i + ", total = " + total);
        }

        System.out.println("The loop ran " + rounds + " times.");
        System.out.println("Sum of 1 to 5: " + total);
    }
}`,
    output: `Round 1: i = 1, total = 1
Round 2: i = 2, total = 3
Round 3: i = 3, total = 6
Round 4: i = 4, total = 10
Round 5: i = 5, total = 15
The loop ran 5 times.
Sum of 1 to 5: 15`,
    codeSummary: 'The loop adds 1 + 2 + 3 + 4 + 5 and prints every round, so you can see how `i` and `total` change.',
    codeExplanation: [
      { label: 'Line 3', code: 'int total = 0;', text: 'The running sum. It is declared before the loop, so it keeps its value from round to round and still exists after the loop.' },
      { label: 'Line 4', code: 'int rounds = 0;', text: 'Counts the rounds, only to show you how often the body runs.' },
      { label: 'Line 7', code: 'for (int i = 1; i <= 5; i++) {', text: 'Init `int i = 1` runs once. Then `i <= 5` is checked before each round, and `i++` runs after each round.' },
      { label: 'Line 8', code: 'total = total + i;', text: 'The work of one round: add the current `i` to the sum. In round 3, total goes from 3 to 6.' },
      { label: 'Line 9', code: 'rounds++;', text: 'One more round done.' },
      { label: 'Line 10', code: 'System.out.println("Round " + rounds + ": i = " + i + ", total = " + total);', text: 'Prints the values at the end of each round. This is a trace table printed by the program itself.' },
      { label: 'Line 11', code: '}', text: 'End of the body. Java now runs the update `i++` and jumps back to the condition.' },
      { label: 'Line 13', code: 'System.out.println("The loop ran " + rounds + " times.");', text: 'Runs once, after the condition `6 <= 5` was false.' }
    ],
    sections: [
      {
        title: 'The three parts of the header',
        text: [
          'Read the header out loud: "start with i equal to 1; while i is at most 5; add one to i after each round". The semicolons separate the three parts.'
        ],
        table: {
          head: ['Part', 'Code', 'When it runs', 'How often (here)'],
          rows: [
            ['init', '`int i = 1`', 'once, before the first check', '1 time'],
            ['condition', '`i <= 5`', 'before every round', '6 times (5 true, 1 false)'],
            ['body', '`{ total = total + i; … }`', 'when the condition is true', '5 times'],
            ['update', '`i++`', 'after every round', '5 times']
          ],
          note: 'The condition runs one time more than the body: the last check is the false one that ends the loop.'
        }
      },
      {
        title: 'Trace every step by hand',
        text: [
          'A trace table writes down what each part of the loop does and what the variables are afterwards. Make one for every new loop; it finds most bugs before you run the code.'
        ],
        table: {
          head: ['Step', 'Part', 'What happens', 'i', 'total'],
          rows: [
            ['1', 'init', '`int i = 1`', '1', '0'],
            ['2', 'condition', '`1 <= 5` is true', '1', '0'],
            ['3', 'body', 'total = 0 + 1', '1', '1'],
            ['4', 'update', '`i++`', '2', '1'],
            ['5', 'condition', '`2 <= 5` is true', '2', '1'],
            ['6', 'body', 'total = 1 + 2', '2', '3'],
            ['7', 'update', '`i++`', '3', '3'],
            ['…', '…', 'rounds 3 and 4 the same way', '…', '…'],
            ['14', 'condition', '`5 <= 5` is true', '5', '10'],
            ['15', 'body', 'total = 10 + 5', '5', '15'],
            ['16', 'update', '`i++`', '6', '15'],
            ['17', 'condition', '`6 <= 5` is false: leave the loop', '6', '15']
          ],
          note: 'At the end `i` is 6, not 5. The update runs once more before the last check.'
        }
      },
      {
        title: 'Count up, down, in steps',
        text: [
          'Change the three parts and the loop counts in other ways. `System.out.print` prints without a line break, so the numbers stay on one line; the empty `System.out.println()` then ends the line.',
          'How many rounds? For `for (int i = a; i < b; i++)` it is `b - a`. For `i <= b` it is `b - a + 1`.'
        ],
        fileName: 'CountingWays.java',
        code: `public class CountingWays {
    public static void main(String[] args) {
        System.out.print("Up from 0, i < 4:  ");
        for (int i = 0; i < 4; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        System.out.print("Down from 5 to 1:  ");
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println();

        System.out.print("Even, 2 to 10:     ");
        for (int i = 2; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();

        System.out.print("Doubling, 1 to 64: ");
        for (int i = 1; i <= 64; i *= 2) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
        output: `Up from 0, i < 4:  0 1 2 3
Down from 5 to 1:  5 4 3 2 1
Even, 2 to 10:     2 4 6 8 10
Doubling, 1 to 64: 1 2 4 8 16 32 64`,
        table: {
          head: ['Header', 'Values of i', 'Rounds'],
          rows: [
            ['`int i = 0; i < 4; i++`', '0 1 2 3', '4'],
            ['`int i = 5; i >= 1; i--`', '5 4 3 2 1', '5'],
            ['`int i = 2; i <= 10; i += 2`', '2 4 6 8 10', '5'],
            ['`int i = 1; i <= 64; i *= 2`', '1 2 4 8 16 32 64', '7']
          ]
        },
        tip: 'Counting from 0 with `i < n` is the most common form in Java. It fits arrays (topic 7), whose first box has number 0.'
      },
      {
        title: 'Where the loop variable lives',
        text: [
          'A variable made in the init part, like `int i`, exists only inside the loop. This is its **scope** (see [Scope](../types-and-variables/index.html)). After the closing brace, the name `i` is gone.',
          'The program `LoopScope.java` below has `for (int i = 0; i < 3; i++) { … }` and then `System.out.println(i);` on line 6, after the loop. `javac` stops with this error:'
        ],
        fileName: 'terminal',
        codeLanguage: 'text',
        code: `LoopScope.java:6: error: cannot find symbol
        System.out.println(i);
                           ^
  symbol:   variable i
  location: class LoopScope
1 error`,
        warn: 'If you need the counter after the loop, declare it before the loop: `int i; for (i = 0; i < 3; i++) { … }`. Then `i` is 3 after the loop.'
      },
      {
        title: 'Build a result round by round',
        text: [
          'Many loops build up one result: a sum, a product, a line of text. The pattern is always the same: a variable before the loop with a start value, one change per round, and the use after the loop.',
          'The factorial `6!` means 1 × 2 × 3 × 4 × 5 × 6. The product starts at 1, not 0, because 0 times anything stays 0. It is a `long` because factorials grow very fast.'
        ],
        fileName: 'Factorial.java',
        code: `public class Factorial {
    public static void main(String[] args) {
        int n = 6;
        long product = 1;

        for (int i = 1; i <= n; i++) {
            product = product * i;
        }

        System.out.println(n + "! = " + product);

        System.out.print("7 times table: ");
        for (int i = 1; i <= 10; i++) {
            System.out.print(7 * i + " ");
        }
        System.out.println();
    }
}`,
        output: `6! = 720
7 times table: 7 14 21 28 35 42 49 56 63 70`,
        table: {
          head: ['i', 'product before', 'product after'],
          rows: [['1', '1', '1'], ['2', '1', '2'], ['3', '2', '6'], ['4', '6', '24'], ['5', '24', '120'], ['6', '120', '720']],
          note: 'The trace of the factorial loop. After i = 6 the update makes i 7, and `7 <= 6` ends the loop.'
        }
      }
    ],
    technical: [
      '`javac` compiles a for loop to plain jumps. Roughly: store 1 in `i`; jump to the check; body; `iinc i 1` (a special bytecode that adds a number to an int variable, made for `i++`); check: load `i`, load 5, "if less or equal, jump back to the body". A `for` and the matching `while` loop give the same bytecode.',
      'All three header parts are optional. `for (;;) { … }` has no condition, which counts as true: it is an endless loop that only `break` or `return` can end. You can also put two variables in the init and update, like `for (int i = 0, j = 10; i < j; i++, j--)`.',
      'The JVM first interprets the bytecode. When a loop runs many thousand times, the JIT compiler (the part of the JVM that compiles code while the program runs) turns it into fast machine code for your processor. That is why a long loop gets faster after a short warm-up.'
    ],
    tryIt: {
      steps: [
        'Copy `SumToFive.java` and run it.',
        'Change the header to `for (int i = 1; i <= 10; i++)` and run it.',
        'Now try `for (int i = 10; i >= 1; i--)`. Is the sum the same?',
        'Write a trace table on paper for `for (int i = 0; i < 3; i++)` before you run it.'
      ],
      see: 'Sum 55 for 1 to 10, and again 55 counting down: the order changes, the sum does not.'
    },
    check: [
      { q: 'In which order do the parts of `for (init; condition; update)` run?', a: 'Init once. Then check, body, update, check, body, update … until a check is false.' },
      { q: 'How many times does `for (int i = 3; i < 8; i++)` run?', a: 'Five times: 8 - 3 = 5, with i = 3, 4, 5, 6, 7.' },
      { q: 'What is the value of the counter right after `for (i = 1; i <= 5; i++)` ends?', a: '6. The update makes it 6, then `6 <= 5` is false and the loop ends.' }
    ],
    keyPoints: [
      'Header: init (once), condition (before each round), update (after each round).',
      'The condition is checked before the first round, so a loop can run 0 times.',
      '`i = 0; i < n` and `i = 1; i <= n` both run n times.',
      'A variable declared in the header exists only inside the loop.',
      'Keep a result variable before the loop and change it once per round.',
      'Write a trace table for every new loop.'
    ],
    commonMistakes: [
      '`for (int i = 0; i <= 5; i++)` when you want 5 rounds. It runs 6. Use `i < 5`.',
      '`for (int i = 0; i < 5; i++);` A `;` after the header makes an empty body. Delete it.',
      'Using `i` after the loop when it was declared in the header. Declare it before the loop.',
      '`long product = 0;` for a product. Start a product at 1, a sum at 0.',
      'Commas instead of semicolons: `for (int i = 0, i < 5, i++)`. Use `;`.'
    ],
    related: ['while and do-while', 'Nested Loops', 'Off-by-One and Infinite Loops', 'Scope'],
    glossary: CF.glossary
  });
})();
