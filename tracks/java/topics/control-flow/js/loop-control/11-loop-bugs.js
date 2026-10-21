(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'loop-bugs',
    num: '11',
    title: 'Off-by-One and Infinite Loops',
    category: 'loops',
    icon: '∞',
    tagline: 'The two classic loop bugs and how to avoid them',
    realWorld: 'A fence with 5 sections needs 6 posts, not 5. And a hamster wheel never arrives anywhere, however fast the hamster runs.',
    kid: [
      'You want to jump over 5 stones in a river. You count "0, 1, 2, 3, 4, 5" and jump six times. Splash! You counted one too many. That is an off-by-one error.',
      'Now imagine a song that says "sing this song again" at its end. You sing it, and at the end it says: again. And again. It never stops. That is an infinite loop.',
      'Both mistakes are very easy to make, even for grown-up programmers. The trick is to check the first and the last round very carefully.'
    ],
    definition: 'An **off-by-one error** is a loop that runs one round too many or one too few, usually because of `<` versus `<=` or a wrong start value. An **infinite loop** is a loop whose condition never becomes false, so it never ends by itself.',
    explain: [
      'Off-by-one errors hide in the edges: the first round and the last round. The middle rounds are almost always right. So test the edges: what is the counter in round 1, what in the last round, and what happens at the check right after it?',
      'One rule removes most of them: count from 0 with `<`. `for (int i = 0; i < n; i++)` runs exactly n times, with i from 0 to n - 1. This is called a **half-open** range: the start is included, the end is not. It fits arrays, whose boxes are numbered 0 to length - 1.',
      'An **infinite loop** happens when the body never moves the condition toward false. The usual reasons: no update at all, an update in the wrong direction (`i--` instead of `i++`), an update that jumps over the end value (`i += 2` with `i != 7`), a `continue` that skips the update, or a `double` test with `==` or `!=`.',
      'Not every endless loop is a bug. `while (true) { … }` with a `break` inside is a normal pattern. It is only a bug when there is no way out.',
      'When a program hangs in the terminal, press **Ctrl+C**. That stops the running Java program.'
    ],
    why: 'These two bugs are the most common loop bugs of all. Knowing their causes lets you spot them by reading, before they cost you an hour of searching.',
    whenUse: 'Every time you write or review a loop: check the first round, the last round, and that the body moves the condition toward false.',
    syntax: 'Safe default: `for (int i = 0; i < n; i++)` runs n times. Use `<= n` only when you count from 1: `for (int i = 1; i <= n; i++)`.',
    mermaid: `flowchart TD
  A["you wrote a loop"] --> B{"Does the body change what the condition reads?"}
  B -- no --> X["infinite loop: add an update"]
  B -- yes --> C{"Does it move toward false?"}
  C -- no --> X2["infinite loop: fix the direction or the end test"]
  C -- yes --> D{"First round and last round right?"}
  D -- no --> O["off-by-one: fix start, < or <="]
  D -- yes --> OK["the loop is safe"]`,
    visualLabel: 'Is my loop safe? A checklist',
    visualNote: 'Ask these three questions about every loop. The first two catch infinite loops, the last one catches off-by-one errors.',
    fileName: 'OffByOne.java',
    code: `public class OffByOne {
    public static void main(String[] args) {
        int runs = 0;
        for (int i = 0; i < 5; i++) {
            runs++;
        }
        System.out.println("i = 0; i < 5   -> " + runs + " runs");

        runs = 0;
        for (int i = 0; i <= 5; i++) {
            runs++;
        }
        System.out.println("i = 0; i <= 5  -> " + runs + " runs (one too many)");

        runs = 0;
        for (int i = 1; i < 5; i++) {
            runs++;
        }
        System.out.println("i = 1; i < 5   -> " + runs + " runs (one too few)");

        runs = 0;
        for (int i = 1; i <= 5; i++) {
            runs++;
        }
        System.out.println("i = 1; i <= 5  -> " + runs + " runs");
    }
}`,
    output: `i = 0; i < 5   -> 5 runs
i = 0; i <= 5  -> 6 runs (one too many)
i = 1; i < 5   -> 4 runs (one too few)
i = 1; i <= 5  -> 5 runs`,
    codeSummary: 'Four headers that look almost the same. Two run 5 times, one runs 6 times and one runs 4 times.',
    codeExplanation: [
      { label: 'Line 4', code: 'for (int i = 0; i < 5; i++) {', text: 'Start at 0, stop before 5: i is 0, 1, 2, 3, 4. Five rounds. The standard form.' },
      { label: 'Line 5', code: 'runs++;', text: 'The body only counts its own rounds, so you can see the effect of each header.' },
      { label: 'Line 9', code: 'runs = 0;', text: 'Reset the counter before each test, or the numbers would add up.' },
      { label: 'Line 10', code: 'for (int i = 0; i <= 5; i++) {', text: 'Start at 0 and include 5: i is 0 to 5. Six rounds, one too many.' },
      { label: 'Line 16', code: 'for (int i = 1; i < 5; i++) {', text: 'Start at 1 and stop before 5: i is 1 to 4. Four rounds, one too few.' },
      { label: 'Line 22', code: 'for (int i = 1; i <= 5; i++) {', text: 'Start at 1 and include 5. Five rounds. Fine for counting like a person does.' }
    ],
    sections: [
      {
        title: 'Count the rounds before you run',
        text: [
          'You can compute the number of rounds from the header, without running anything. Choose one style and stay with it: **0 with `<`** (Java style) or **1 with `<=`** (counting like a person).'
        ],
        table: {
          head: ['Header', 'Values of i', 'Rounds', 'Formula'],
          rows: [
            ['`i = 0; i < n`', '0 … n-1', 'n', 'end - start'],
            ['`i = 1; i <= n`', '1 … n', 'n', 'end - start + 1'],
            ['`i = 0; i <= n`', '0 … n', 'n + 1', 'one too many'],
            ['`i = 1; i < n`', '1 … n-1', 'n - 1', 'one too few'],
            ['`i = n; i > 0; i--`', 'n … 1', 'n', 'counting down']
          ]
        }
      },
      {
        title: 'The array crash: <= length',
        text: [
          'Arrays are numbered from 0, so the last box is `length - 1`. A loop with `i <= names.length` asks for one box too many. Java stops the program with an exception (a run-time error):'
        ],
        fileName: 'terminal',
        codeLanguage: 'text',
        code: `Ari
Mina
Sol
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
    at Names.main(Names.java:5)`,
        warn: 'This came from `for (int i = 0; i <= names.length; i++)` with three names. The fix is `i < names.length`, or the enhanced for `for (String name : names)`, which cannot go too far.'
      },
      {
        title: 'The fence-post problem: commas between items',
        text: [
          'You want `1, 2, 3, 4, 5`: five numbers but only four commas, like five posts and four fence sections. Printing a comma after every number gives one comma too many at the end.',
          'The fix: print the separator **before** every item except the first.'
        ],
        fileName: 'FencePosts.java',
        code: `public class FencePosts {
    public static void main(String[] args) {
        // Wrong: a comma after every number
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + ", ");
        }
        System.out.println();

        // Right: a comma before every number except the first
        for (int i = 1; i <= 5; i++) {
            if (i > 1) {
                System.out.print(", ");
            }
            System.out.print(i);
        }
        System.out.println();
    }
}`,
        output: `1, 2, 3, 4, 5,
1, 2, 3, 4, 5`,
        table: {
          head: ['i', '`i > 1`?', 'printed in the right loop'],
          rows: [['1', 'false', '`1`'], ['2', 'true', '`, 2`'], ['3', 'true', '`, 3`'], ['4', 'true', '`, 4`'], ['5', 'true', '`, 5`']]
        }
      },
      {
        title: 'Infinite loops, made visible',
        text: [
          'Both loops below would run forever. A safety counter `guard` stops each one after a few rounds, so you can see what goes wrong.',
          'Loop 1 counts in steps of 2 and waits for `i != 7`. i starts at 0 and goes 2, 4, 6, 8: it jumps over 7, so `i != 7` stays true. Loop 2 adds 0.1 and waits for exactly 1.0. A `double` cannot store 0.1 exactly, so the sum is never exactly 1.0.'
        ],
        fileName: 'NeverEnding.java',
        code: `public class NeverEnding {
    public static void main(String[] args) {
        int i = 0;
        int guard = 0;
        while (i != 7) {        // bug: i jumps over 7
            i += 2;
            guard++;
            System.out.print(i + " ");
            if (guard == 6) {
                System.out.println("... stopped by the guard");
                break;
            }
        }

        double x = 0.0;
        guard = 0;
        while (x != 1.0) {      // bug: x is never exactly 1.0
            x = x + 0.1;
            guard++;
            if (guard >= 9) {
                System.out.println("x = " + x);
            }
            if (guard == 12) {
                System.out.println("... stopped by the guard");
                break;
            }
        }
    }
}`,
        output: `2 4 6 8 10 12 ... stopped by the guard
x = 0.8999999999999999
x = 0.9999999999999999
x = 1.0999999999999999
x = 1.2
... stopped by the guard`,
        table: {
          head: ['Cause', 'Example', 'Fix'],
          rows: [
            ['no update', '`while (n > 0) { print(n); }`', 'add `n--;`'],
            ['wrong direction', '`for (int i = 10; i > 0; i++)`', '`i--`'],
            ['jumps over the end', '`i += 2` with `i != 7`', 'use `<` or `<=`: `i < 7`'],
            ['`continue` skips the update', '`while (…) { if (…) continue; i++; }`', 'update before `continue`'],
            ['`double` with `!=`', '`while (x != 1.0)`', '`while (x < 1.0)`, or count with an int']
          ]
        },
        tip: 'Prefer `<` and `>` in loop conditions over `!=`. A `<` test still stops when the counter jumps over the end value.'
      },
      {
        title: 'When your program hangs',
        text: [
          'If the terminal shows nothing new and the program does not end, it is probably stuck in an infinite loop. Press Ctrl+C to stop it. Then add a print as the first line of the loop body to see the counter in each round.'
        ],
        fileName: 'terminal',
        codeLanguage: 'bash',
        code: `java NeverEnding.java
# ... nothing happens, the loop runs forever ...
# press Ctrl+C to stop the program`,
        tip: 'A loop that prints forever is easy to notice. A loop that prints nothing and never ends looks like a frozen program. A temporary `System.out.println("i = " + i);` shows what is going on.'
      }
    ],
    technical: [
      'The compiler cannot find infinite loops in general: whether a loop ends depends on the values at run time. It only spots obvious cases. For `while (true)` without `break`, it knows that the code after the loop is unreachable and reports an error there.',
      'An int that keeps counting up does not run forever, but not in the way you want: after 2 147 483 647 it overflows to -2 147 483 648 (see [Ranges and Overflow](../types-and-variables/index.html)). So `for (int i = 1; i > 0; i++)` ends after about two billion rounds, with a negative i.',
      'A `double` stores numbers in binary. 0.1 has no exact binary form, like 1/3 has no exact decimal form (0.333…). Each addition adds a tiny error. That is why counting loops use int counters, and doubles are compared with `<` or `>`.'
    ],
    tryIt: {
      steps: [
        'Copy `FencePosts.java` and run it.',
        'Change both loops to count from 1 to 10.',
        'Write a loop `for (int i = 10; i > 0; i -= 3)` and predict the values with a trace table first.',
        'Run it and compare.'
      ],
      see: 'The right loop prints `1, 2, … , 10` without a final comma. Your loop prints `10 7 4 1`: four rounds, then -2 fails `i > 0`.'
    },
    check: [
      { q: 'How many times does `for (int i = 0; i <= 10; i++)` run?', a: '11 times: i is 0, 1, … , 10.' },
      { q: 'Why is `while (i != 7)` with `i += 2` starting at 0 an infinite loop?', a: 'i takes only even values (0, 2, 4, 6, 8 …) and never equals 7. `while (i < 7)` would stop.' },
      { q: 'An array has length 4. What is the last valid index, and which loop condition fits?', a: 'Index 3. Use `i < array.length`, not `i <= array.length`.' }
    ],
    keyPoints: [
      'Check the first and the last round of every loop.',
      '`for (int i = 0; i < n; i++)` runs exactly n times.',
      'Array indexes go from 0 to `length - 1`: use `i < length`.',
      'The body must move the condition toward false.',
      'Prefer `<` over `!=` in loop conditions; never use `!=` with doubles.',
      'Ctrl+C stops a program that hangs.'
    ],
    commonMistakes: [
      '`for (int i = 0; i <= n; i++)` for n rounds. Use `i < n`.',
      '`i <= array.length` crashes. Use `i < array.length`.',
      'A comma after every item. Print the separator before every item except the first.',
      '`while (x != 1.0)` with a double. Use `x < 1.0` or an int counter.',
      'Forgetting the update in a `while` body. Add it, and put it before any `continue`.'
    ],
    related: ['for Loop', 'while and do-while', 'break and continue', 'Ranges and Overflow'],
    glossary: CF.glossary
  });
})();
