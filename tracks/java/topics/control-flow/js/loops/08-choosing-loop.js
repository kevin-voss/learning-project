(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'choosing-loop',
    num: '08',
    title: 'Choosing the Right Loop',
    category: 'loops',
    icon: '⚖',
    tagline: 'for, for-each, while or do-while?',
    realWorld: 'A toolbox with a hammer, a screwdriver, pliers and a saw. You could hit a screw with a hammer, but the screwdriver does the job better. Each loop is a tool for one kind of repeating.',
    kid: [
      'If Grandma says "sing the song three times", you count: one, two, three. That is a `for` loop.',
      'If she says "give a cookie to every child", you walk along the children. That is a for-each loop.',
      'If she says "stir the soup until it boils", you do not know how long it takes. That is a `while` loop. And if she says "taste it, and taste again until it is salty enough", you taste at least once. That is a `do-while` loop.'
    ],
    definition: 'Every Java loop can do the work of every other loop, but each one says something different to the reader. Pick the loop whose shape matches the question: **counted** (`for`), **every item** (enhanced for), **until something happens** (`while`) or **at least once** (`do-while`).',
    explain: [
      'Choose with three questions. First: do I need every item of an array or list, and not the index? Then use the enhanced for.',
      'Second: do I know how many rounds there are before the loop starts, because it is a number like 10, `n` or `names.length`? Then use a counting `for`. Its header shows start, end and step in one line.',
      'Third: if the count is unknown, must the body run before the check makes sense? Then use `do-while`. Otherwise use `while`.',
      'A good loop choice makes the code shorter and removes a whole class of bugs. A `for` cannot forget its update so easily, because the update is in the header. An enhanced for cannot go one step too far. A `do-while` cannot skip the first round.',
      'If you hesitate, write the loop as a `while` first. Then look: does it have an init before it and an update at the end of its body? Then turn it into a `for`.'
    ],
    why: 'Code is read far more often than it is written. The right loop tells the reader at the first glance what kind of repetition happens.',
    whenUse: 'Every time you write a loop. Ask the three questions from the flowchart.',
    syntax: '`for (int i = 0; i < n; i++)` · `for (Type x : items)` · `while (condition)` · `do { … } while (condition);`',
    mermaid: `flowchart TD
  Q1{"Every item of an array or list, no index needed?"} -- yes --> FE["enhanced for"]
  Q1 -- no --> Q2{"Number of rounds known before the loop?"}
  Q2 -- yes --> F["for"]
  Q2 -- no --> Q3{"Must the body run once before the check?"}
  Q3 -- yes --> DW["do-while"]
  Q3 -- no --> W["while"]`,
    visualLabel: 'Which loop? Three questions',
    visualNote: 'Start at the top and answer each question with yes or no. You end at the loop that fits.',
    fileName: 'RightLoop.java',
    code: `public class RightLoop {
    public static void main(String[] args) {
        // Known count: for
        System.out.print("for:      ");
        for (int i = 0; i < 5; i++) {
            System.out.print("*");
        }
        System.out.println();

        // Every item: enhanced for
        String[] fruits = {"apple", "pear", "plum"};
        System.out.print("for-each: ");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println();

        // Until a goal, count unknown: while
        int bacteria = 1;
        int hours = 0;
        while (bacteria < 1000) {
            bacteria = bacteria * 2;
            hours++;
        }
        System.out.println("while:    " + hours + " hours to reach " + bacteria);

        // At least once: do-while
        int n = 0;
        int digits = 0;
        do {
            digits++;
            n = n / 10;
        } while (n != 0);
        System.out.println("do-while: the number 0 has " + digits + " digit");
    }
}`,
    output: `for:      *****
for-each: apple pear plum
while:    10 hours to reach 1024
do-while: the number 0 has 1 digit`,
    codeSummary: 'Four small jobs, each done with the loop that fits it best.',
    codeExplanation: [
      { label: 'Line 5', code: 'for (int i = 0; i < 5; i++) {', text: 'We know the count (5) before the loop, so `for` fits. Start, end and step are in one line.' },
      { label: 'Line 13', code: 'for (String fruit : fruits) {', text: 'We want every fruit and do not care about positions: enhanced for.' },
      { label: 'Line 21', code: 'while (bacteria < 1000) {', text: 'Nobody knows in advance how many doublings it takes. The loop runs until the goal is reached: `while`.' },
      { label: 'Line 22', code: 'bacteria = bacteria * 2;', text: 'Moves the loop toward its end. After 10 rounds the value is 1024.' },
      { label: 'Line 30', code: 'do {', text: 'Every number has at least one digit, even 0. So the body must run once before any check.' },
      { label: 'Line 32', code: 'n = n / 10;', text: '0 / 10 is 0, so the check `n != 0` is false right after the first round.' },
      { label: 'Line 33', code: '} while (n != 0);', text: 'With a plain `while (n != 0)`, the body would never run for 0, and the program would say "0 digits".' }
    ],
    sections: [
      {
        title: 'The four loops at a glance',
        text: [
          'All four loops repeat a body. They differ in where the check is and what the header says.'
        ],
        table: {
          head: ['Loop', 'Check', 'Fewest rounds', 'Best for', 'Typical header'],
          rows: [
            ['`for`', 'before each round', '0', 'counting, known number of rounds', '`for (int i = 0; i < n; i++)`'],
            ['enhanced for', 'hidden: "item left?"', '0', 'every item of an array or list', '`for (String s : names)`'],
            ['`while`', 'before each round', '0', 'until a goal, unknown count', '`while (money < price)`'],
            ['`do-while`', 'after each round', '1', 'menus, questions, "at least once"', '`do { … } while (again);`']
          ]
        }
      },
      {
        title: 'One task, four loops',
        text: [
          'All four loops below print `1 2 3`. They show that the loops can replace each other. Look at how much you must write for each one, and where the start, the end and the step are.'
        ],
        fileName: 'OneTwoThree.java',
        code: `public class OneTwoThree {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.print(i + " ");
        }
        System.out.println("(for)");

        int w = 1;
        while (w <= 3) {
            System.out.print(w + " ");
            w++;
        }
        System.out.println("(while)");

        int d = 1;
        do {
            System.out.print(d + " ");
            d++;
        } while (d <= 3);
        System.out.println("(do-while)");

        int[] numbers = {1, 2, 3};
        for (int number : numbers) {
            System.out.print(number + " ");
        }
        System.out.println("(enhanced for)");
    }
}`,
        output: `1 2 3 (for)
1 2 3 (while)
1 2 3 (do-while)
1 2 3 (enhanced for)`,
        table: {
          head: ['Round', '`for`: i', '`while`: w', '`do-while`: d', 'enhanced for: number'],
          rows: [
            ['1', '1', '1', '1', '1'],
            ['2', '2', '2', '2', '2'],
            ['3', '3', '3', '3', '3'],
            ['end', 'i = 4, `4 <= 3` false', 'w = 4, `4 <= 3` false', 'd = 4, `4 <= 3` false', 'no item left']
          ],
          note: 'The same trace for all four. The `for` keeps start, end and step in one line; the `while` spreads them over three places.'
        }
      },
      {
        title: 'When while and do-while give different answers',
        text: [
          'The two forms only differ when the condition is false at the very first check. Counting digits shows why it matters: for 507 both are right, for 0 only `do-while` is right.'
        ],
        fileName: 'CountDigits.java',
        code: `public class CountDigits {
    public static void main(String[] args) {
        int[] inputs = {507, 0};

        for (int value : inputs) {
            int n = value;
            int withWhile = 0;
            while (n != 0) {
                withWhile++;
                n = n / 10;
            }

            n = value;
            int withDoWhile = 0;
            do {
                withDoWhile++;
                n = n / 10;
            } while (n != 0);

            System.out.println(value + ": while says " + withWhile + ", do-while says " + withDoWhile);
        }
    }
}`,
        output: `507: while says 3, do-while says 3
0: while says 0, do-while says 1`,
        table: {
          head: ['value', 'first check of `n != 0`', '`while` rounds', '`do-while` rounds'],
          rows: [
            ['507', 'true', '3 (507 → 50 → 5 → 0)', '3'],
            ['0', 'false', '0', '1 (body runs before the check)']
          ]
        }
      },
      {
        title: 'Signs that you picked the wrong loop',
        text: [
          'These patterns compile and often work, but a different loop says the same thing more clearly and more safely.'
        ],
        table: {
          head: ['You see …', 'Problem', 'Better'],
          rows: [
            ['`int i = 0; while (i < 10) { …; i++; }`', 'start, end and step are spread out; the `i++` is easy to lose', '`for (int i = 0; i < 10; i++)`'],
            ['`for (int i = 0; i < a.length; i++)` that only reads `a[i]`', 'an index you never need', '`for (int x : a)`'],
            ['`for (; money < price; )`', 'a `for` with no init and no update is a `while` in disguise', '`while (money < price)`'],
            ['the same lines before a `while` and inside it', 'the first round is copied by hand', '`do { … } while (…);`']
          ]
        },
        tip: 'When two loops fit equally well, choose the one with fewer moving parts. Fewer parts mean fewer places for bugs.'
      }
    ],
    technical: [
      '`for`, `while` and the enhanced for over an array all compile to almost the same bytecode: a check, a body and a jump back. The choice is about the reader, not about speed.',
      '`do-while` saves the first check: its bytecode starts directly with the body and ends with a conditional jump back. That is the only real difference at the bytecode level.',
      'The enhanced for over a list uses an iterator object, which costs a tiny bit more than an index. For every normal program this difference is far too small to matter.'
    ],
    tryIt: {
      steps: [
        'Copy `RightLoop.java` and run it.',
        'Change `while (bacteria < 1000)` to `while (bacteria < 1000000)` and run it.',
        'Rewrite the first `for` loop as a `while` loop with the same output.',
        'Change `int n = 0;` to `int n = 2024;` and run it.'
      ],
      see: '`20 hours to reach 1048576`, the same five stars from your while loop, and `the number 0 has 4 digit`, because the text still says 0. Print `n` before the loop to fix the message.'
    },
    check: [
      { q: 'You must ask the user "Play again?" after each game, and there is always at least one game. Which loop?', a: '`do-while`: the game and the question come before the check.' },
      { q: 'You want to print every name in an array, without numbers. Which loop?', a: 'The enhanced for: `for (String name : names)`.' },
      { q: 'You see `int i = 0; while (i < n) { …; i++; }`. What is the better form?', a: '`for (int i = 0; i < n; i++) { … }`. The count is known, so `for` puts start, end and step in one line.' }
    ],
    keyPoints: [
      'Every item, no index: enhanced for.',
      'Known number of rounds: `for`.',
      'Unknown count, zero rounds possible: `while`.',
      'At least one round: `do-while`.',
      'A `while` with an init before it and an update at its end is a `for`.'
    ],
    commonMistakes: [
      'A `while` loop for counting that loses its `i++`. Use a `for` loop.',
      'An index loop that only reads `a[i]`. Use `for (int x : a)`.',
      'A `while` that gives the wrong answer for the empty or zero case (like 0 digits). Use `do-while` when one round is always needed.',
      'Copying the body above a `while` so it runs once first. Use `do-while`.'
    ],
    related: ['for Loop', 'while and do-while', 'Enhanced for'],
    glossary: CF.glossary
  });
})();
