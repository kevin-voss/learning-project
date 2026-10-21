(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'if-else',
    anim: 'traffic',
    num: '01',
    title: 'if / else if / else',
    category: 'branches',
    icon: '?',
    tagline: 'Run code only when a condition matches',
    realWorld: 'A traffic light at a crossing. If it is green, you walk. Else, if it is yellow, you get ready. Else you wait. You do exactly one of the three things.',
    kid: [
      'Every morning your mum looks out of the window. If it rains, you get your rain boots. If it does not rain, you get your sneakers. You never wear both.',
      'A computer can do the same. It asks a question that has only two answers: yes or no. Then it picks one path and skips the other one.',
      'Sometimes there are more than two choices. "Is it raining? No? Is it snowing? No? Is it sunny?" The computer asks one question after the other and stops at the first yes.'
    ],
    definition: 'An `if` statement runs a block of code only when its **condition** is `true`. `else if` adds more questions, and `else` is the path for "none of the above". Java runs at most one block of the whole chain.',
    explain: [
      'So far every program ran from the first line to the last, every line exactly once. **Control flow** is the order in which lines run, and an `if` is the first tool that changes it: some lines run only sometimes.',
      'The **condition** is the part in round brackets after `if`. It must be a `boolean` expression: something that is either `true` or `false`, such as `score >= 90` or a boolean variable. You built such questions with the comparison and logical operators in [Operators](../operators/index.html).',
      'A **block** is the code between `{` and `}`. When the condition is true, Java runs the block. When it is false, Java skips the block and goes on after it.',
      'Each `else if` is one more question. Java asks them **from top to bottom** and stops at the first one that is true. The `else` at the end has no condition: it runs when every question before it was false. Both `else if` and `else` are optional.',
      'Each possible path is called a **branch**, like the branches of a tree. In one run of the chain, exactly one branch runs (or none, when there is no `else`).'
    ],
    why: 'Programs must react to data: a game checks if you lost, a shop checks if you paid, an app checks if the password is right. Without `if`, a program does the same thing every time.',
    whenUse: 'Whenever the next step depends on a value: ranges (`score >= 90`), yes/no flags (`isRaining`), or any mix of conditions.',
    syntax: '`if (condition) { … } else if (otherCondition) { … } else { … }` The condition must be a boolean. `else if` and `else` are optional and always come after an `if`.',
    mermaid: `flowchart TD
  S["score = 82"] --> A{"score >= 90?"}
  A -- yes --> PA["print Grade A"]
  A -- no --> B{"score >= 80?"}
  B -- yes --> PB["print Grade B"]
  B -- no --> C{"score >= 70?"}
  C -- yes --> PC["print Grade C"]
  C -- no --> D{"score >= 50?"}
  D -- yes --> PD["print Grade D"]
  D -- no --> PF["print Grade F"]
  PA & PB & PC & PD & PF --> E["print Done checking."]`,
    visualLabel: 'The chain as a flowchart',
    visualNote: 'A diamond is a question. Follow the arrows: with 82 the first question says no, the second says yes, so Java prints Grade B and jumps straight to the end. The other questions are never asked.',
    fileName: 'GradeChecker.java',
    code: `public class GradeChecker {
    public static void main(String[] args) {
        int score = 82;
        System.out.println("Score: " + score);

        if (score >= 90) {
            System.out.println("Grade A: excellent");
        } else if (score >= 80) {
            System.out.println("Grade B: very good");
        } else if (score >= 70) {
            System.out.println("Grade C: good");
        } else if (score >= 50) {
            System.out.println("Grade D: passed");
        } else {
            System.out.println("Grade F: try again");
        }

        System.out.println("Done checking.");
    }
}`,
    output: `Score: 82
Grade B: very good
Done checking.`,
    codeSummary: 'The program turns a score into a grade. Five branches, but only one of them prints, and the last line always runs.',
    codeExplanation: [
      { label: 'Line 3', code: 'int score = 82;', text: 'The value the decisions are about. Change it and run again to see other branches.' },
      { label: 'Line 6', code: 'if (score >= 90) {', text: 'The first question. `82 >= 90` is false, so Java skips its block (line 7) and goes to the next question.' },
      { label: 'Line 8', code: '} else if (score >= 80) {', text: '`82 >= 80` is true. Java runs this block and will skip every other branch of the chain.' },
      { label: 'Line 9', code: 'System.out.println("Grade B: very good");', text: 'The only line inside the chain that runs for 82.' },
      { label: 'Line 10', code: '} else if (score >= 70) {', text: 'Never asked for 82. It does not need `score < 80`: if we get here, the test above was already false.' },
      { label: 'Line 14', code: '} else {', text: 'The fallback. It has no condition and runs only when all four questions were false, for example for a score of 30.' },
      { label: 'Line 16', code: '}', text: 'The end of the whole chain. After one branch has run, Java continues here.' },
      { label: 'Line 18', code: 'System.out.println("Done checking.");', text: 'This line is outside the chain, so it runs every time, whatever the score is.' }
    ],
    sections: [
      {
        title: 'One question, one path: the plain if',
        text: [
          'The smallest form is an `if` without `else`. When the condition is true, the block runs. When it is false, nothing happens and the program goes on.',
          'Several plain `if` statements in a row are **independent**: Java asks every one of them. More than one can run.'
        ],
        mermaid: `flowchart TD
  A{"isRaining?"} -- true --> B["print Take an umbrella."]
  A -- false --> C["go on"]
  B --> C`,
        diagramNote: 'A plain if has one side path. Both arrows meet again below the if.',
        fileName: 'Umbrella.java',
        code: `public class Umbrella {
    public static void main(String[] args) {
        boolean isRaining = true;
        int temperature = 8;

        if (isRaining) {
            System.out.println("Take an umbrella.");
        }

        if (temperature < 10) {
            System.out.println("Wear a warm jacket.");
        }

        if (temperature > 25) {
            System.out.println("Wear a sun hat.");
        }

        System.out.println("Have a nice walk!");
    }
}`,
        output: `Take an umbrella.
Wear a warm jacket.
Have a nice walk!`,
        tip: 'A boolean variable is already a condition. Write `if (isRaining)`, not `if (isRaining == true)`. For the opposite, write `if (!isRaining)`.'
      },
      {
        title: 'Two paths: if and else',
        text: [
          'With `else` you get exactly two paths. One of them always runs, never both and never none.',
          'The test `number % 2 == 0` asks "is the rest after dividing by 2 equal to 0?", which means "is the number even?".'
        ],
        fileName: 'EvenOrOdd.java',
        code: `public class EvenOrOdd {
    public static void main(String[] args) {
        int number = 7;

        if (number % 2 == 0) {
            System.out.println(number + " is even");
        } else {
            System.out.println(number + " is odd");
        }

        number = 10;

        if (number % 2 == 0) {
            System.out.println(number + " is even");
        } else {
            System.out.println(number + " is odd");
        }
    }
}`,
        output: `7 is odd
10 is even`,
        table: {
          head: ['number', '`number % 2`', '`number % 2 == 0`', 'Block that runs'],
          rows: [
            ['7', '1', 'false', 'the `else` block'],
            ['10', '0', 'true', 'the `if` block']
          ],
          note: 'A small trace table: one row per check. Writing such a table by hand is the best way to predict what a program does.'
        }
      },
      {
        title: 'Many paths: why the order of else if matters',
        text: [
          'Java stops at the **first** true test. So the order of the tests is part of the logic. A loose test (one that many values pass) placed first steals values from the tests below it.',
          'Rule of thumb for ranges: start with the strictest test, or sort the limits from high to low (or low to high) and stay with that order.'
        ],
        fileName: 'OrderMatters.java',
        code: `public class OrderMatters {
    public static void main(String[] args) {
        int score = 95;

        // Wrong order: the loose test comes first
        if (score >= 50) {
            System.out.println("Wrong order says: D");
        } else if (score >= 90) {
            System.out.println("Wrong order says: A");
        }

        // Right order: the strict test comes first
        if (score >= 90) {
            System.out.println("Right order says: A");
        } else if (score >= 50) {
            System.out.println("Right order says: D");
        }
    }
}`,
        output: `Wrong order says: D
Right order says: A`,
        table: {
          head: ['score', 'Wrong order: first true test', 'Right order: first true test'],
          rows: [
            ['95', '`>= 50` → D (wrong)', '`>= 90` → A'],
            ['60', '`>= 50` → D', '`>= 50` → D'],
            ['20', 'none, nothing prints', 'none, nothing prints']
          ],
          note: 'In the wrong order, the `>= 90` branch can never run. Code that can never run is called dead code.'
        }
      },
      {
        title: 'The sneaky semicolon and missing braces',
        text: [
          'A semicolon right after `if (…)` ends the if at once. The block below is then a normal block that always runs. Java compiles it without an error, so this bug is hard to see.',
          'Java also lets you leave out the braces when the branch is one single line. Only that one line belongs to the if. The indentation does not matter to Java at all.'
        ],
        fileName: 'SneakySemicolon.java',
        code: `public class SneakySemicolon {
    public static void main(String[] args) {
        int age = 5;

        if (age >= 18); // this semicolon ends the if right here
        {
            System.out.println("You may vote.");
        }

        if (age >= 18)
            System.out.println("Adult ticket");
            System.out.println("Pay 10 euros"); // not part of the if!
    }
}`,
        output: `You may vote.
Pay 10 euros`,
        warn: 'A 5-year-old "may vote" and "pays 10 euros". Both lines run although the condition is false. Always write braces, and never put `;` after the round bracket of an `if`.'
      },
      {
        title: 'A tiny if that gives a value: the ternary operator',
        text: [
          'Often both branches only choose a value. Java has a short form for that: `condition ? valueIfTrue : valueIfFalse`. It is called the **ternary operator** because it has three parts.',
          'Use it for small choices like a word or a number. When a branch needs real work (several lines), write a normal `if / else`.'
        ],
        fileName: 'Ternary.java',
        code: `public class Ternary {
    public static void main(String[] args) {
        int apples = 1;
        String word = (apples == 1) ? "apple" : "apples";
        System.out.println("You have " + apples + " " + word);

        apples = 3;
        word = (apples == 1) ? "apple" : "apples";
        System.out.println("You have " + apples + " " + word);

        int a = 12;
        int b = 30;
        int bigger = (a > b) ? a : b;
        System.out.println("Bigger: " + bigger);
    }
}`,
        output: `You have 1 apple
You have 3 apples
Bigger: 30`
      }
    ],
    technical: [
      '`javac` turns an `if` into **bytecode** with a compare and a conditional jump. For `if (score >= 90)` it writes roughly: load `score`, load `90`, "if less than, jump to the next test". The block of the branch sits right after the jump, and at its end there is a `goto` to the end of the chain. That `goto` is why only one branch runs.',
      'The condition must have the type `boolean`. In C or JavaScript, a number like `0` or `1` can act as false or true. Java refuses that: `if (count)` with an `int` is a compile error. `if (x = 5)` is an error too, because `x = 5` is an assignment of type `int`, not a comparison.',
      'The compiler also checks definite assignment: if you declare `String grade;` and set it in every branch of an `if / else if / else`, you may use it after the chain. Without the final `else`, Java says "variable grade might not have been initialized", because one path leaves it empty.'
    ],
    tryIt: {
      steps: [
        'Copy `GradeChecker.java` and run it with `java GradeChecker.java`.',
        'Change `score` to 95, then 70, then 49, and run it after each change.',
        'Add a new first branch: `if (score > 100)` prints `Score is too high`.',
        'Set `score` to 120 and run it.'
      ],
      see: '`Grade A`, `Grade C`, `Grade F` for the first three runs, and `Score is too high` for 120.'
    },
    check: [
      { q: 'How many branches of an `if / else if / else` chain run at most?', a: 'One. Java stops at the first true condition. With a final `else`, exactly one branch runs.' },
      { q: 'What does `if (age >= 18);` with a semicolon do?', a: 'The semicolon is an empty statement and ends the if. The block below always runs, whatever `age` is.' },
      { q: 'Three plain `if` statements follow each other. Can all three run?', a: 'Yes. Plain ifs in a row are independent questions. Only `else if` makes them a chain where at most one runs.' }
    ],
    keyPoints: [
      'The condition in `if (…)` must be a boolean: `true` or `false`.',
      'Java checks `else if` tests from top to bottom and stops at the first true one.',
      'Put the strictest range test first, or later branches become dead code.',
      '`else` has no condition and catches everything that is left.',
      'Always write braces, even for one line.',
      '`condition ? a : b` chooses between two values in one expression.'
    ],
    commonMistakes: [
      '`if (x = 5)` assigns instead of compares. Write `if (x == 5)`.',
      '`if (age >= 18);` with a semicolon. Remove the `;` after the round bracket.',
      'A loose test first: `if (score >= 50) … else if (score >= 90)`. Put `>= 90` first.',
      'Two lines under an if without braces. Only the first belongs to the if. Add `{ }`.',
      '`if (done == true)`. Write `if (done)`, and `if (!done)` for the opposite.'
    ],
    related: ['Nested and Combined Conditions', 'switch Statement', 'Operators'],
    glossary: CF.glossary
  });
})();
