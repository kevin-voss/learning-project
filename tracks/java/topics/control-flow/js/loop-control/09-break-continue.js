(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'break-continue',
    num: '09',
    title: 'break and continue',
    category: 'loops',
    icon: '↯',
    tagline: 'Leave a loop early, or skip one round',
    realWorld: 'Looking for your red sock in a pile of laundry. You skip every sock that is not red (continue). The moment you find the red one, you stop searching (break).',
    kid: [
      'You eat cherries from a bowl, one after another. When a cherry is rotten, you put it aside and take the next one. That is `continue`: skip this one, go on with the next.',
      'When mum calls "Dinner is ready!", you stop eating cherries at once, even if the bowl is not empty. That is `break`: stop the whole thing now.',
      'Both words only work inside loops (and `break` also inside a switch).'
    ],
    definition: '`break;` ends the nearest loop at once; Java goes on after the loop. `continue;` ends only the current round; the loop goes on with its next round (in a `for`, the update runs first).',
    explain: [
      'Normally a loop decides only at its condition whether to go on. `break` and `continue` let the body decide too. They almost always sit inside an `if`, because "always break" would end the loop in the first round.',
      '`break` jumps out of the **nearest** enclosing loop (or switch). The rest of the body and all later rounds are skipped. Use it when you found what you searched for, or when an end marker appears.',
      '`continue` jumps to the end of the current round. In a `while` or `do-while`, Java goes straight to the condition. In a `for`, it runs the update first and then the condition. In an enhanced for, it takes the next item.',
      'A common pattern is the **guard at the top**: `if (bad) { continue; }` throws out the rounds you do not want, so the rest of the body has no extra nesting.',
      'Use both words sparingly. One `break` for "found it" is clear. Five jumps in one body make the flow hard to follow; then a better condition is often the cleaner way.'
    ],
    why: 'Some loops have a natural early end (found the item, got the stop signal), and some rounds are not worth processing (bad data). Without break and continue, you need extra boolean flags and nesting.',
    whenUse: '`break` to stop searching once you found something, or at an end marker. `continue` to skip invalid or unwanted items at the start of the body.',
    syntax: '`for (…) { if (skipThis) { continue; } if (done) { break; } … }`',
    mermaid: `flowchart TD
  N{"next value left?"} -- no --> E["print Final sum"]
  N -- yes --> A{"value < 0?"}
  A -- yes --> S["print skip, continue"]
  S --> N
  A -- no --> B{"value == 0?"}
  B -- yes --> X["print stop, break"]
  X --> E
  B -- no --> W["sum = sum + value, print"]
  W --> N`,
    visualLabel: 'Two exits from the body',
    visualNote: '`continue` takes a short cut back to the top of the loop. `break` takes a short cut out of the loop, straight to the line after it.',
    fileName: 'Readings.java',
    code: `public class Readings {
    public static void main(String[] args) {
        int[] readings = {4, -1, 7, 3, 0, 9, 2};
        int sum = 0;

        for (int value : readings) {
            if (value < 0) {
                System.out.println("skip " + value + " (broken sensor)");
                continue;
            }
            if (value == 0) {
                System.out.println("stop at 0 (end marker)");
                break;
            }
            sum = sum + value;
            System.out.println("add " + value + " -> sum " + sum);
        }

        System.out.println("Final sum: " + sum);
    }
}`,
    output: `add 4 -> sum 4
skip -1 (broken sensor)
add 7 -> sum 11
add 3 -> sum 14
stop at 0 (end marker)
Final sum: 14`,
    codeSummary: 'Sensor readings are added up. Negative values are broken and get skipped with `continue`. A 0 marks the end of the data, so `break` stops the loop; 9 and 2 are never read.',
    codeExplanation: [
      { label: 'Line 3', code: 'int[] readings = {4, -1, 7, 3, 0, 9, 2};', text: 'The data. The 0 is an end marker: everything after it does not count.' },
      { label: 'Line 6', code: 'for (int value : readings) {', text: 'Visits the readings one by one, until the end or until a `break`.' },
      { label: 'Line 7', code: 'if (value < 0) {', text: 'The guard at the top of the body: throw out bad data first.' },
      { label: 'Line 9', code: 'continue;', text: 'Ends this round only. Lines 11 to 16 are skipped for -1, and the loop takes the next value (7).' },
      { label: 'Line 11', code: 'if (value == 0) {', text: 'The second check: is this the end marker?' },
      { label: 'Line 13', code: 'break;', text: 'Ends the whole loop. Java jumps to line 19. The values 9 and 2 are never visited.' },
      { label: 'Line 15', code: 'sum = sum + value;', text: 'The normal work. It only runs for values that passed both checks.' },
      { label: 'Line 19', code: 'System.out.println("Final sum: " + sum);', text: 'Reached after the `break`, or after the last item if there is no 0.' }
    ],
    sections: [
      {
        title: 'Trace: which value takes which exit?',
        text: [
          'One row per round. The last column says where Java goes after the round.'
        ],
        table: {
          head: ['Round', 'value', '`value < 0`', '`value == 0`', 'sum after', 'next step'],
          rows: [
            ['1', '4', 'false', 'false', '4', 'next round'],
            ['2', '-1', 'true', 'not asked', '4', '`continue`: next round'],
            ['3', '7', 'false', 'false', '11', 'next round'],
            ['4', '3', 'false', 'false', '14', 'next round'],
            ['5', '0', 'false', 'true', '14', '`break`: leave the loop'],
            ['–', '9, 2', '', '', '14', 'never visited']
          ]
        }
      },
      {
        title: 'break: stop when you found it',
        text: [
          'Searching is the classic use of `break`. Which is the first number from 50 on that both 7 and 4 divide? The loop could go to 100, but once it has found 56, every further round is wasted.',
          'A second classic is `while (true)` with a `break` inside: a loop that only stops from within its body.'
        ],
        fileName: 'FirstMatch.java',
        code: `public class FirstMatch {
    public static void main(String[] args) {
        int found = -1;

        for (int n = 50; n <= 100; n++) {
            if (n % 7 == 0 && n % 4 == 0) {
                found = n;
                break;
            }
        }
        System.out.println("First number divisible by 7 and 4: " + found);

        int value = 1;
        while (true) {
            value = value * 3;
            if (value > 200) {
                break;
            }
        }
        System.out.println("First power of 3 above 200: " + value);
    }
}`,
        output: `First number divisible by 7 and 4: 56
First power of 3 above 200: 243`,
        tip: 'Starting `found` at -1 is a common trick: if the loop ends without a `break`, -1 tells you that nothing was found.'
      },
      {
        title: 'continue: skip this round',
        text: [
          'Here `continue` skips every multiple of 3. In a `for` loop, `continue` still runs the update `i++`, so the loop moves on safely.'
        ],
        mermaid: `flowchart LR
  C{"i <= 10?"} -- true --> T{"i % 3 == 0?"}
  T -- yes --> U["i++"]
  T -- no --> P["print i"]
  P --> U
  U --> C
  C -- false --> E["end"]`,
        diagramNote: 'In a `for` loop, `continue` jumps to the update, not straight to the check.',
        fileName: 'SkipThrees.java',
        code: `public class SkipThrees {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i % 3 == 0) {
                continue;
            }
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
        output: '1 2 4 5 7 8 10',
        warn: 'In a `while` loop, `continue` jumps straight to the condition. If your update (`i++`) sits below the `continue`, it is skipped too, and the loop never ends. In a while loop, put the update before the `continue`.'
      },
      {
        title: 'continue in a while loop, done right',
        text: [
          'The same task as a `while`. The update `i++` comes first in the body, so a `continue` can never skip it.'
        ],
        fileName: 'SkipThreesWhile.java',
        code: `public class SkipThreesWhile {
    public static void main(String[] args) {
        int i = 0;
        while (i < 10) {
            i++; // update first: continue cannot skip it
            if (i % 3 == 0) {
                continue;
            }
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
        output: '1 2 4 5 7 8 10'
      },
      {
        title: 'break inside a switch inside a loop',
        text: [
          'In a classic switch, `break` belongs to the switch. Inside a loop, it leaves the switch, not the loop. Here "quit" does not stop anything: the loop goes on with "right".',
          'The fix: let the switch set a flag (a boolean variable that remembers something), and break out of the loop after the switch.'
        ],
        fileName: 'LoopCommands.java',
        code: `public class LoopCommands {
    public static void main(String[] args) {
        String[] commands = {"left", "quit", "right"};

        for (String command : commands) {
            switch (command) {
                case "quit":
                    System.out.println("quit: this break only leaves the switch");
                    break;
                default:
                    System.out.println("do " + command);
            }
        }

        System.out.println("--- with a flag ---");
        for (String command : commands) {
            boolean quit = false;
            switch (command) {
                case "quit" -> quit = true;
                default -> System.out.println("do " + command);
            }
            if (quit) {
                break;
            }
        }
        System.out.println("stopped");
    }
}`,
        output: `do left
quit: this break only leaves the switch
do right
--- with a flag ---
do left
stopped`,
        tip: 'With two nested loops, a plain `break` also leaves only the inner loop. The Deeper lesson **Labelled break and continue** shows how to leave both at once.'
      }
    ],
    technical: [
      'Both words compile to a single `goto` in the bytecode. `break` jumps to the first instruction after the loop. `continue` jumps to the update of a `for` loop, or to the condition of a `while` loop.',
      'The compiler checks that `break` and `continue` stand inside a loop (or, for `break`, a switch). Outside, you get the error "break outside switch or loop". It also notices code that can never run: a line right after `break;` in the same block is an error, "unreachable statement".',
      'A loop like `while (true)` with a `break` inside is fine for the compiler. Without any `break`, it knows that the loop never ends, so code after it is unreachable and does not compile.'
    ],
    tryIt: {
      steps: [
        'Copy `Readings.java` and run it.',
        'Remove the 0 from the array and run it again.',
        'Add a third check at the top of the body: skip values above 8 with `continue`.',
        'Run it and compare with a trace table you write first.'
      ],
      see: 'Without the 0, the sum is 25 (9 and 2 are now added). With the new check, 9 is skipped too and the sum is 16.'
    },
    check: [
      { q: 'What is the difference between `break` and `continue`?', a: '`break` ends the whole loop. `continue` ends only the current round and goes on with the next round.' },
      { q: 'In a `for` loop, does `continue` skip the update `i++`?', a: 'No. In a `for` loop, `continue` jumps to the update, then to the condition.' },
      { q: 'A classic `switch` with `break` stands inside a loop. Which one does the `break` leave?', a: 'Only the switch. The loop goes on with its next round.' }
    ],
    keyPoints: [
      '`break` ends the nearest loop; Java goes on after it.',
      '`continue` ends the current round only.',
      'In a `for`, `continue` still runs the update; in a `while`, it does not.',
      'Put guards with `continue` at the top of the body.',
      'Inside a switch, `break` leaves the switch, not the loop.',
      'Use them sparingly so the flow stays readable.'
    ],
    commonMistakes: [
      'Writing `break` when you meant `continue`: the loop stops instead of skipping one round.',
      '`while (i < 10) { if (i % 3 == 0) { continue; } i++; }` never ends at i = 3. Move `i++` above the `continue`.',
      'Expecting `break` in a switch to end the surrounding loop. Use a flag and break after the switch.',
      'A line right after `break;` in the same block. It can never run and does not compile.'
    ],
    related: ['Labelled break and continue', 'Nested Loops', 'switch Statement', 'Off-by-One and Infinite Loops'],
    glossary: CF.glossary
  });
})();
