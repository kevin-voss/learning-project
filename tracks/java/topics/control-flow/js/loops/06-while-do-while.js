(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'while-do-while',
    num: '06',
    title: 'while and do-while',
    category: 'loops',
    icon: '↻',
    tagline: 'Repeat while a condition holds',
    realWorld: '`while` is a child who asks "Am I hungry?" before each bite and stops when the answer is no. `do-while` is tasting a new soup: you always take one spoon first, then you decide whether you want more.',
    kid: [
      'You put coins in your piggy bank every week. Before each week you look: "Do I have enough for the toy yet?" If not, you save another week. You do not know at the start how many weeks it takes.',
      'That is a `while` loop: look first, then do. If you already have enough money, you save zero weeks.',
      'A `do-while` loop is the other way round: do first, then look. Like a game round: you always play at least one round, and after it you ask "again?".'
    ],
    definition: 'A `while` loop checks its condition **before** each round and runs the body as long as the condition is true; it can run zero times. A `do-while` loop runs the body **first** and checks afterwards, so it always runs at least once.',
    explain: [
      'A `while` loop has only a condition, no init and no update in its header: `while (savings < goal) { … }`. You prepare the variables before the loop, and the body must change something that the condition reads. Otherwise the condition never becomes false and the loop never ends.',
      'Because the check comes first, a `while` loop with a condition that is false from the start does nothing at all. That is often exactly right, for example "while there is still work, do it" when there is no work.',
      'A `do-while` loop puts the check at the end: `do { … } while (condition);`. Note the semicolon after the round bracket. The body runs once, then the condition decides whether it runs again.',
      'Use `while` when you do not know how many rounds you need: until a goal is reached, until a number is used up, until the user types "quit". Use `do-while` when the first round must happen before you can even ask the question, such as reading an answer before you can check it.',
      'Variables used in the condition must be declared **before** the loop. A variable declared inside the body does not exist in the `while (…)` part of a do-while.'
    ],
    why: 'A `for` loop is made for counting. Many repeats are not about counting but about a goal: "keep going until it is done". `while` says that directly.',
    whenUse: '`while`: the number of rounds depends on the data and zero rounds are fine. `do-while`: the body must run once before the check, like a menu or a question.',
    syntax: '`while (condition) { body }`   `do { body } while (condition);`',
    mermaid: `flowchart LR
  subgraph W["while: check first"]
    WC{"condition?"} -- true --> WB["body"]
    WB --> WC
    WC -- false --> WE["after"]
  end
  subgraph D["do-while: body first"]
    DB["body"] --> DC{"condition?"}
    DC -- true --> DB
    DC -- false --> DE["after"]
  end`,
    visualLabel: 'Check first or body first',
    visualNote: 'In `while` the arrow enters at the diamond, so the body can be skipped. In `do-while` the arrow enters at the body, so it runs at least once.',
    fileName: 'PiggyBank.java',
    code: `public class PiggyBank {
    public static void main(String[] args) {
        int savings = 0;
        int week = 0;
        int goal = 20;

        while (savings < goal) {
            week++;
            savings = savings + 6;
            System.out.println("Week " + week + ": " + savings + " euros");
        }

        System.out.println("Goal of " + goal + " reached after " + week + " weeks.");

        int tries = 0;
        do {
            tries++;
            System.out.println("do-while round " + tries);
        } while (tries < 0);

        System.out.println("The do-while ran " + tries + " time, although the condition was false.");
    }
}`,
    output: `Week 1: 6 euros
Week 2: 12 euros
Week 3: 18 euros
Week 4: 24 euros
Goal of 20 reached after 4 weeks.
do-while round 1
The do-while ran 1 time, although the condition was false.`,
    codeSummary: 'A `while` loop saves 6 euros a week until 20 euros are reached. Then a `do-while` with a condition that is false from the start still runs once.',
    codeExplanation: [
      { label: 'Line 3', code: 'int savings = 0;', text: 'The value the condition reads. It must exist before the loop starts.' },
      { label: 'Line 7', code: 'while (savings < goal) {', text: 'Checked before each week. `0 < 20` is true, so the first round runs. Nobody wrote down "4 weeks"; the loop finds it out.' },
      { label: 'Line 9', code: 'savings = savings + 6;', text: 'The line that moves the loop toward its end. Without it, savings stays 0 and the loop never stops.' },
      { label: 'Line 11', code: '}', text: 'End of the body. Java jumps back to line 7 and checks again.' },
      { label: 'Line 13', code: 'System.out.println("Goal of " + goal + " reached after " + week + " weeks.");', text: 'Runs after the check `24 < 20` was false. Note that savings is 24, more than the goal: the loop stops at the first round that reaches it.' },
      { label: 'Line 16', code: 'do {', text: 'The body starts without any check.' },
      { label: 'Line 19', code: '} while (tries < 0);', text: 'The check comes after the body. `1 < 0` is false, so the loop ends after one round. Note the semicolon.' }
    ],
    sections: [
      {
        title: 'Trace the piggy bank',
        text: [
          'One row per check of the condition. The last row is the false check that ends the loop.'
        ],
        table: {
          head: ['Check', 'savings before', '`savings < 20`', 'week after body', 'savings after body'],
          rows: [
            ['1', '0', 'true', '1', '6'],
            ['2', '6', 'true', '2', '12'],
            ['3', '12', 'true', '3', '18'],
            ['4', '18', 'true', '4', '24'],
            ['5', '24', 'false: stop', '4', '24']
          ],
          note: 'Four rounds, five checks. A `while` loop always has one check more than rounds.'
        }
      },
      {
        title: 'A loop that does not know its count',
        text: [
          'How many digits does 40213 have? The program does not know, but it can find out: take the last digit with `n % 10`, cut it off with `n / 10`, and repeat while something is left.',
          'Integer division `n / 10` drops the last digit: 40213 / 10 is 4021.'
        ],
        fileName: 'Digits.java',
        code: `public class Digits {
    public static void main(String[] args) {
        int number = 40213;
        int n = number;
        int count = 0;
        int digitSum = 0;

        while (n > 0) {
            int lastDigit = n % 10;
            digitSum = digitSum + lastDigit;
            count++;
            System.out.println("took " + lastDigit + ", left " + (n / 10));
            n = n / 10;
        }

        System.out.println(number + " has " + count + " digits, digit sum " + digitSum);
    }
}`,
        output: `took 3, left 4021
took 1, left 402
took 2, left 40
took 0, left 4
took 4, left 0
40213 has 5 digits, digit sum 10`,
        table: {
          head: ['Round', 'n at start', 'lastDigit', 'digitSum', 'count', 'n at end'],
          rows: [
            ['1', '40213', '3', '3', '1', '4021'],
            ['2', '4021', '1', '4', '2', '402'],
            ['3', '402', '2', '6', '3', '40'],
            ['4', '40', '0', '6', '4', '4'],
            ['5', '4', '4', '10', '5', '0']
          ],
          note: 'After round 5, `0 > 0` is false and the loop ends. A for loop would need to know the 5 in advance.'
        }
      },
      {
        title: 'do-while: ask first, check the answer after',
        text: [
          'A guessing game cannot check the guess before the player made one. So the body (ask and read) comes first, and the check `guess != secret` comes at the end.',
          '`Scanner` reads what the user types; `in.nextInt()` waits for a whole number. Reading input is taught in [I/O Basics](../io-basics/index.html); here it only feeds the loop. The example input is 3, 9 and 7, one per line. The numbers you type do not appear in the output below, only what the program prints.'
        ],
        fileName: 'GuessGame.java',
        code: `import java.util.Scanner;

public class GuessGame {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int secret = 7;
        int guess;
        int tries = 0;

        do {
            System.out.println("Guess a number from 1 to 10:");
            guess = in.nextInt();
            tries++;
            if (guess < secret) {
                System.out.println(guess + " is too small.");
            } else if (guess > secret) {
                System.out.println(guess + " is too big.");
            }
        } while (guess != secret);

        System.out.println("Right! " + secret + " after " + tries + " tries.");
    }
}`,
        input: '3\n9\n7\n',
        output: `Guess a number from 1 to 10:
3 is too small.
Guess a number from 1 to 10:
9 is too big.
Guess a number from 1 to 10:
Right! 7 after 3 tries.`,
        table: {
          head: ['Round', 'typed', 'guess', 'tries', '`guess != secret`'],
          rows: [
            ['1', '3', '3', '1', 'true: again'],
            ['2', '9', '9', '2', 'true: again'],
            ['3', '7', '7', '3', 'false: stop']
          ]
        },
        warn: '`int guess;` is declared before `do`. If you declare it inside the body, the line `while (guess != secret);` cannot see it and the program does not compile.'
      },
      {
        title: 'Zero rounds or one round',
        text: [
          'Here both loops get a condition that is false from the start. The difference between them is exactly one round.'
        ],
        fileName: 'ZeroOrOne.java',
        code: `public class ZeroOrOne {
    public static void main(String[] args) {
        int n = 100;

        while (n < 10) {
            System.out.println("while body, n = " + n);
            n++;
        }
        System.out.println("while finished, n = " + n);

        n = 100;
        do {
            System.out.println("do-while body, n = " + n);
            n++;
        } while (n < 10);
        System.out.println("do-while finished, n = " + n);
    }
}`,
        output: `while finished, n = 100
do-while body, n = 100
do-while finished, n = 101`,
        table: {
          head: ['', '`while`', '`do-while`'],
          rows: [
            ['Check happens', 'before the body', 'after the body'],
            ['Fewest rounds', '0', '1'],
            ['Semicolon after `while (…)`', 'no (it would be a bug)', 'yes, required'],
            ['Typical use', 'until a goal, while data is left', 'menus, questions, "again?"']
          ]
        }
      }
    ],
    technical: [
      'A `while` loop compiles to the same bytecode as a `for` loop: a jump to the check, the body, and a conditional jump back. `for` is only a tidier way to write a `while` that has an init and an update.',
      'A `do-while` is even simpler in bytecode: the body comes first and ends with one conditional jump back to its start. There is no jump over the body at the beginning, which is why it always runs once.',
      'When a loop waits for input, as with `in.nextInt()`, the thread (the line of work the JVM runs your `main` in) is blocked: it sleeps until the user presses Enter. The loop does not use the processor while it waits.'
    ],
    tryIt: {
      steps: [
        'Copy `PiggyBank.java` and run it.',
        'Change the goal to 6, then to 0. Run after each change.',
        'Change `while (tries < 0)` to `while (tries < 3)` and run it.',
        'Write a trace table for `int n = 1; while (n < 50) { n = n * 3; }` and then check it with a print in the body.'
      ],
      see: 'Goal 6: one week. Goal 0: no week at all, `reached after 0 weeks`. The do-while prints rounds 1, 2 and 3. Your trace ends with n = 81.'
    },
    check: [
      { q: 'How many times does `while (x > 5) { … }` run when x starts at 2?', a: 'Zero times. The condition is false at the first check, so the body is skipped.' },
      { q: 'Why is `do-while` a good fit for a menu?', a: 'The menu must be shown and an answer read at least once before you can check whether the user wants to quit.' },
      { q: 'What must every `while` body do?', a: 'Change something the condition reads, so that the condition becomes false at some point. Otherwise the loop never ends.' }
    ],
    keyPoints: [
      '`while` checks first and can run zero times.',
      '`do-while` runs the body first and always runs at least once.',
      'The body must move the condition toward false.',
      'Variables used in the condition are declared before the loop.',
      '`do { … } while (condition);` ends with a semicolon.',
      'Use `while` when the number of rounds depends on the data.'
    ],
    commonMistakes: [
      '`while (savings < goal);` with a semicolon: an empty body that never ends. Delete the `;`.',
      'Forgetting the update in the body, e.g. no `n = n / 10;`. The loop never ends.',
      'Declaring `int guess` inside the do body and using it in `while (guess != secret);`. Declare it before `do`.',
      'Forgetting the `;` after `} while (condition)` in a do-while. It does not compile.',
      'Using `do-while` when zero rounds must be possible. Use `while`.'
    ],
    related: ['for Loop', 'Choosing the Right Loop', 'Off-by-One and Infinite Loops', 'I/O Basics'],
    glossary: CF.glossary
  });
})();
