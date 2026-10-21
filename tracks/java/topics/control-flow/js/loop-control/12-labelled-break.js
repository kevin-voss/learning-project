(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'labelled-break',
    num: '12',
    title: 'Labelled break and continue',
    category: 'deeper',
    icon: '⤴',
    tagline: 'Leave two loops at once',
    realWorld: 'A treasure hunt in a big house. You search room after room, and in each room drawer after drawer. When you find the treasure, you do not only stop searching this room: you stop the whole hunt.',
    kid: [
      'You look for your friend in a hotel. You walk floor by floor, and on each floor you knock at every door.',
      'A normal `break` is like stopping on this floor when you found your friend, and then still walking up to the next floor and knocking again. Silly!',
      'A labelled break is like giving the whole search a name, "the hunt", and shouting "stop the hunt!". Then you stop all of it at once.'
    ],
    definition: 'A **label** is a name followed by a colon in front of a loop, like `search:`. `break search;` ends that labelled loop, even from inside a nested loop. `continue search;` ends the current round of the inner loop **and** jumps to the next round of the labelled outer loop.',
    explain: [
      'A plain `break` or `continue` always acts on the **nearest** loop, the innermost one around it. In nested loops, that is the inner loop. The outer loop does not notice and goes on.',
      'A **label** names a loop. You write it directly in front of the loop: `outer: for (…) { … }`. A label name follows the same rules as variable names; by convention it is short and lower case.',
      '`break outer;` jumps to the first line after the labelled loop. Every loop inside it ends too.',
      '`continue outer;` jumps to the next round of the labelled loop. The rest of the inner loop is skipped, and in a `for` loop the outer update runs first, as with a normal `continue`.',
      'Labels are rare in everyday Java code. Often a small method with `return` (topic 6, [Methods](../methods/index.html)) or a boolean flag says the same thing. But when you meet a label, you now know what it does.'
    ],
    why: 'A search in nested loops often needs to stop everything once it finds the answer. Without labels, you need an extra flag and an extra check in the outer loop.',
    whenUse: 'Rarely: in nested loops, when the inner loop decides that the outer loop must stop (`break label`) or move on to its next round (`continue label`).',
    syntax: '`label: for (…) { for (…) { if (…) { break label; } if (…) { continue label; } } }`',
    mermaid: `flowchart TD
  O{"search: a <= 9?"} -- false --> E["after both loops"]
  O -- true --> I{"b <= 9?"}
  I -- false --> NA["a++"]
  NA --> O
  I -- true --> T{"a + b == 10 and a * b == 24?"}
  T -- no --> NB["b++"]
  NB --> I
  T -- yes --> BR["break search"]
  BR --> E`,
    visualLabel: 'break search jumps out of both loops',
    visualNote: 'A plain `break` would go to `a++` and start the next outer round. `break search` goes straight to the end, past the outer loop.',
    fileName: 'FindPair.java',
    code: `public class FindPair {
    public static void main(String[] args) {
        int wantedSum = 10;
        int wantedProduct = 24;
        int checked = 0;
        String result = "no pair found";

        search:
        for (int a = 1; a <= 9; a++) {
            for (int b = 1; b <= 9; b++) {
                checked++;
                if (a + b == wantedSum && a * b == wantedProduct) {
                    result = a + " and " + b;
                    break search; // leave BOTH loops
                }
            }
        }

        System.out.println("Found: " + result);
        System.out.println("Pairs checked: " + checked);
    }
}`,
    output: `Found: 4 and 6
Pairs checked: 33`,
    codeSummary: 'Two nested loops try every pair of digits. The first pair with sum 10 and product 24 ends the whole search.',
    codeExplanation: [
      { label: 'Line 6', code: 'String result = "no pair found";', text: 'The start value tells you that nothing was found if the loops end on their own.' },
      { label: 'Line 8', code: 'search:', text: 'The label. It names the loop that follows. A label on its own line is fine; it belongs to the next statement.' },
      { label: 'Line 9', code: 'for (int a = 1; a <= 9; a++) {', text: 'The outer loop, now called `search`.' },
      { label: 'Line 10', code: 'for (int b = 1; b <= 9; b++) {', text: 'The inner loop. It has no label.' },
      { label: 'Line 11', code: 'checked++;', text: 'Counts how many pairs were tried, to show how much work the labelled break saves.' },
      { label: 'Line 12', code: 'if (a + b == wantedSum && a * b == wantedProduct) {', text: 'True for the first time at a = 4, b = 6.' },
      { label: 'Line 14', code: 'break search; // leave BOTH loops', text: 'Ends the loop called `search`, and with it the inner loop. Java goes on at line 19.' },
      { label: 'Line 20', code: 'System.out.println("Pairs checked: " + checked);', text: '3 full rows of 9 (a = 1, 2, 3) plus 6 pairs in row 4: 33.' }
    ],
    sections: [
      {
        title: 'What a plain break would do',
        text: [
          'With a plain `break`, only the inner loop ends. The outer loop goes on with a = 5, 6 … and finds the pair again the other way round (6 and 4), overwriting the first answer.'
        ],
        fileName: 'PlainBreak.java',
        code: `public class PlainBreak {
    public static void main(String[] args) {
        int checked = 0;
        String result = "no pair found";

        for (int a = 1; a <= 9; a++) {
            for (int b = 1; b <= 9; b++) {
                checked++;
                if (a + b == 10 && a * b == 24) {
                    result = a + " and " + b;
                    break; // leaves only the inner loop
                }
            }
        }

        System.out.println("Found: " + result);
        System.out.println("Pairs checked: " + checked);
    }
}`,
        output: `Found: 6 and 4
Pairs checked: 73`,
        table: {
          head: ['', '`break search;`', 'plain `break;`'],
          rows: [
            ['ends', 'both loops', 'the inner loop only'],
            ['after the first match', 'search is over', 'next outer round, a = 5'],
            ['pairs checked', '33', '73'],
            ['answer', '4 and 6 (the first)', '6 and 4 (the last)']
          ]
        }
      },
      {
        title: 'continue with a label: next outer round',
        text: [
          'Find the prime numbers up to 20. A prime has no divisor between 2 and itself. For each number `n`, the inner loop tries divisors `d`. As soon as one divides `n`, it is not a prime, and there is no point in trying more divisors: `continue nextNumber;` moves on to the next n at once.',
          'The print after the inner loop is only reached when no divisor was found.'
        ],
        fileName: 'Primes.java',
        code: `public class Primes {
    public static void main(String[] args) {
        nextNumber:
        for (int n = 2; n <= 20; n++) {
            for (int d = 2; d < n; d++) {
                if (n % d == 0) {
                    continue nextNumber; // not a prime: try the next n
                }
            }
            System.out.print(n + " ");
        }
        System.out.println();
    }
}`,
        output: '2 3 5 7 11 13 17 19',
        table: {
          head: ['n', 'divisors tried', 'what happens'],
          rows: [
            ['7', '2, 3, 4, 5, 6: none divides', 'inner loop ends normally, prints 7'],
            ['8', '2 divides', '`continue nextNumber`, nothing printed'],
            ['9', '2 no, 3 divides', '`continue nextNumber`, nothing printed'],
            ['11', '2 to 10: none divides', 'prints 11']
          ],
          note: 'For n = 2 the inner loop runs zero times (`2 < 2` is false), so 2 is printed.'
        }
      },
      {
        title: 'The same without a label: a flag',
        text: [
          'A **flag** is a boolean variable that remembers "something happened". The inner loop sets it, and the outer loop checks it. It needs more lines, but some teams prefer it because every exit is a normal `break`.'
        ],
        fileName: 'FlagSearch.java',
        code: `public class FlagSearch {
    public static void main(String[] args) {
        boolean found = false;
        int checked = 0;

        for (int a = 1; a <= 9 && !found; a++) {
            for (int b = 1; b <= 9; b++) {
                checked++;
                if (a + b == 10 && a * b == 24) {
                    System.out.println("Found: " + a + " and " + b);
                    found = true;
                    break;
                }
            }
        }

        System.out.println("Pairs checked: " + checked);
    }
}`,
        output: `Found: 4 and 6
Pairs checked: 33`,
        tip: 'Once you know methods, the cleanest form is often a method that contains both loops and `return`s the answer. `return` leaves every loop and the whole method at once.'
      },
      {
        title: 'Rules for labels',
        text: [
          'Labels are simple, but they have a few rules the compiler checks.'
        ],
        table: {
          head: ['Rule', 'Example'],
          rows: [
            ['The label stands right before the loop it names.', '`outer: for (…)` or the label on the line above'],
            ['`break label;` and `continue label;` only work inside that loop.', 'using `break outer;` after the loop does not compile'],
            ['`continue label;` needs a loop label, not a block label.', '`continue` on a labelled `{ … }` block does not compile'],
            ['Label names are like variable names.', '`search`, `outer`, `nextRow`'],
            ['Use them rarely.', 'one label per method at most is a good habit']
          ]
        }
      }
    ],
    technical: [
      'A labelled `break` compiles to one `goto` to the first instruction after the labelled loop. A labelled `continue` is one `goto` to the update (or condition) of the labelled loop. No extra checks run, so it is as fast as a plain break.',
      'The label is only known to the compiler. It is not stored in the `.class` file and costs nothing at run time.',
      'Java has no general `goto` statement; `goto` is a reserved word that you cannot use. Labelled break and continue are the controlled form of jumping that Java allows: they can only jump out of a loop, never into one.'
    ],
    tryIt: {
      steps: [
        'Copy `FindPair.java` and run it.',
        'Change `wantedProduct` to 21 and run it.',
        'Change it to 50 and run it.',
        'Replace `break search;` with a plain `break;` and run it with 21 again.'
      ],
      see: '`3 and 7` after 25 checks; `no pair found` after 81 checks; and with the plain break `7 and 3` after 73 checks.'
    },
    check: [
      { q: 'Which loop does a plain `break;` inside two nested loops end?', a: 'Only the inner loop, the nearest one.' },
      { q: 'What does `continue outer;` do?', a: 'It ends the current round of the inner loop and of the outer body, and jumps to the next round of the loop labelled `outer`.' },
      { q: 'Name an alternative to a labelled break.', a: 'A boolean flag checked by the outer loop, or a method that uses `return` to leave both loops.' }
    ],
    keyPoints: [
      'A label is `name:` right before a loop.',
      '`break name;` ends the labelled loop and all loops inside it.',
      '`continue name;` jumps to the next round of the labelled loop.',
      'A plain break or continue always acts on the nearest loop.',
      'Flags and methods with `return` are the common alternatives.'
    ],
    commonMistakes: [
      'Expecting a plain `break;` in the inner loop to end the outer loop. Use `break label;`.',
      'Putting other code between the label and its loop. The label must name the loop directly.',
      'Using `break search;` outside the `search` loop. It does not compile.',
      'Labels everywhere. Use one only where nested loops need it.'
    ],
    related: ['break and continue', 'Nested Loops', 'Methods'],
    glossary: CF.glossary
  });
})();
