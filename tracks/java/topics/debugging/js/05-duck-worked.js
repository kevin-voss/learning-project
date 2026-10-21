// Debugging, part 5: rubber duck and the smallest failing example, then one bug from start to end.
(function () {
  Java.addCoreLessons('debugging', [
    {
      id: 'rubber-duck',
      title: 'Rubber Duck and the Smallest Failing Example',
      category: 'habits',
      icon: '🦆',
      tagline: 'Explain it out loud, then cut it down',
      realWorld: 'You lost your keys. You tell a friend every step of your day: "I came home, put my bag down, went to the kitchen…" Halfway through the story you stop: "The kitchen! I put them in the fridge with the milk." Your friend did not say a word.',
      kid: [
        'Put a toy duck next to your computer. When your program does something strange, explain it to the duck, one line at a time: "This line takes the score. This line asks: is it bigger than 90?"',
        'The duck says nothing. But while you explain, you have to say what the code really does, not what you hoped it does. Very often you hear the mistake in your own words.',
        'If the duck does not help, you make the problem smaller and smaller, like cutting a big cake into tiny pieces, until only the broken crumb is left.'
      ],
      definition: '**Rubber duck debugging** means explaining your code out loud, line by line, to someone or something that does not answer. A **minimal failing example** is the smallest program that still shows the bug: everything that does not matter for the bug is removed.',
      explain: [
        'When you read your own code silently, your brain reads what you **meant**. When you explain it out loud, you must say what each line **does**. The gap between the two is where the bug lives. The name comes from a book where a programmer carries a rubber duck and explains code to it.',
        'Explain it to the duck as if it knew nothing: what the method should do, what the input is, and then each line with real values. "Ben has 90. The first `if` asks: is 90 greater than 90?" That sentence alone shows the bug in this lesson.',
        '**Minimizing** means removing parts of a failing program while it still fails. Remove a method, a loop, half of the data, then run again. If it still fails, the removed part was not the cause: leave it out. If it suddenly works, the removed part matters: put it back and remove something else.',
        'At the end you have a few lines that fail. Often the bug is easy to see then. If not, the small example is exactly what you show a teacher or a forum: short code, the input, the expected output, the real output and the full error message.',
        'The two ideas work together. A small example is easy to explain to the duck, and explaining tells you which part to cut next.'
      ],
      why: 'Big programs hide bugs behind many lines that do not matter. Talking slows you down enough to see the real code, and cutting removes everything that distracts you.',
      whenUse: 'When you stare at code and "it should work". When you want to ask someone for help. When a bug only shows up inside a large program.',
      syntax: 'Explain: goal → input → each line with real values. Minimize: remove one part → run → still fails? keep it removed : put it back.',
      fileName: 'MinimalGrade.java',
      code: `public class MinimalGrade {
    // Rule: 90 or more is an A, 80 or more a B, 70 or more a C.
    static String grade(int score) {
        if (score > 90) {
            return "A";
        } else if (score > 80) {
            return "B";
        } else if (score > 70) {
            return "C";
        }
        return "D";
    }

    public static void main(String[] args) {
        System.out.println("grade(90) = " + grade(90) + " (expected A)");
    }
}`,
      output: 'grade(90) = B (expected A)',
      codeSummary: 'This is the end result of minimizing a 30-line report program (shown below): one method and one call that still fails. Explaining line 4 to the duck finds the bug.',
      codeExplanation: [
        { label: 'Line 2', code: '// Rule: 90 or more is an A, 80 or more a B, 70 or more a C.', text: 'Write the rule down first. You compare the code with this sentence.' },
        { label: 'Line 4', code: 'if (score > 90) {', text: 'Say it out loud with the value: "is 90 greater than 90?" No, it is equal. So 90 does not get an A. The rule says "90 or more", which is `>=`.' },
        { label: 'Line 6', code: '} else if (score > 80) {', text: '"Is 90 greater than 80?" Yes, so the method returns "B". That is the wrong answer you saw.' },
        { label: 'Line 8', code: '} else if (score > 70) {', text: 'The same mistake again: 70 would get a D instead of a C. Bugs of one kind often come in groups.' },
        { label: 'Line 15', code: 'System.out.println("grade(90) = " + grade(90) + " (expected A)");', text: 'The smallest failing example: one call with the exact value that fails, and the expected answer.' },
        { label: 'Fix', code: 'if (score >= 90) { ... } else if (score >= 80) { ... } else if (score >= 70)', text: 'Change every `>` to `>=`. Then the code says the same as the rule on line 2.' }
      ],
      sections: [
        {
          title: 'How to talk to the duck',
          bullets: [
            'Say what the program **should** do, in one sentence: "Give each student a grade; 90 or more is an A."',
            'Say the **input** that fails: "Ben has 92 and 88, so his average is 90."',
            'Go through the code **line by line**, with the real values. Do not skip lines that "surely work". Bugs hide there.',
            'After each line, say what every variable holds now.',
            'When what you say differs from the rule, stop. That is the bug.'
          ],
          tip: 'No duck? A plant, a teddy bear, a classmate, or writing the explanation as a message works the same. Many people find the bug while typing a question, before they press Send.'
        },
        {
          title: 'The program before minimizing',
          text: [
            'This is where the bug was first noticed. Ben\'s average is 90, so he should get an A, but the report counts only one A. The program has an `average` method, a `line` method, two arrays and a counter. Which part is wrong?'
          ],
          fileName: 'GradeReport.java',
          code: `public class GradeReport {
    static String grade(int score) {
        if (score > 90) {
            return "A";
        } else if (score > 80) {
            return "B";
        } else if (score > 70) {
            return "C";
        }
        return "D";
    }

    static int average(int first, int second) {
        return (first + second) / 2;
    }

    static String line(String name, int avg) {
        return name + ": average " + avg + ", grade " + grade(avg);
    }

    public static void main(String[] args) {
        String[] names = {"Ava", "Ben", "Cara", "Dan"};
        int[] test1 = {95, 92, 70, 60};
        int[] test2 = {88, 88, 81, 65};
        int countA = 0;
        for (int i = 0; i < names.length; i++) {
            int avg = average(test1[i], test2[i]);
            System.out.println(line(names[i], avg));
            if (grade(avg).equals("A")) {
                countA++;
            }
        }
        System.out.println("Students with an A: " + countA + " (expected 2: Ava and Ben)");
    }
}`,
          output: `Ava: average 91, grade A
Ben: average 90, grade B
Cara: average 75, grade C
Dan: average 62, grade D
Students with an A: 1 (expected 2: Ava and Ben)`
        },
        {
          title: 'Cut, run, repeat',
          mermaid: `flowchart TD
  A["Failing program"] --> B["Remove one part"]
  B --> C["Run it"]
  C --> D{"Still fails?"}
  D -->|"yes"| E["Keep it removed"]
  D -->|"no"| F["Put it back, remove another part"]
  E --> G{"Anything left to remove?"}
  F --> B
  G -->|"yes"| B
  G -->|"no"| H["Minimal failing example"]`,
          diagramNote: 'Each round makes the program smaller or tells you a part matters. Both are progress.'
        },
        {
          title: 'The cuts on GradeReport',
          table: {
            head: ['Round', 'What you remove', 'Run shows', 'Still fails?'],
            rows: [
              ['1', 'Ava, Cara and Dan: keep only Ben', '`Ben: average 90, grade B`', 'yes'],
              ['2', 'the `countA` counter', '`Ben: average 90, grade B`', 'yes'],
              ['3', 'the `average` method: call `line("Ben", 90)`', '`Ben: average 90, grade B`', 'yes'],
              ['4', 'the `line` method: print `grade(90)`', '`B`', 'yes'],
              ['5', 'try the neighbours: `grade(91)`, `grade(89)`', '`A`, `B`', 'only 90 is wrong']
            ],
            note: 'Round 5 is a **boundary test**: values right at the edge of a rule (89, 90, 91). Off-by-one bugs live exactly on the edge.'
          }
        },
        {
          title: 'Fixed and checked on every boundary',
          fileName: 'MinimalGradeFixed.java',
          code: `public class MinimalGradeFixed {
    static String grade(int score) {
        if (score >= 90) {
            return "A";
        } else if (score >= 80) {
            return "B";
        } else if (score >= 70) {
            return "C";
        }
        return "D";
    }

    public static void main(String[] args) {
        int[] edges = {91, 90, 89, 80, 79, 70, 69};
        for (int score : edges) {
            System.out.println("grade(" + score + ") = " + grade(score));
        }
    }
}`,
          output: `grade(91) = A
grade(90) = A
grade(89) = B
grade(80) = B
grade(79) = C
grade(70) = C
grade(69) = D`,
          tip: 'When you ask for help, send this kind of example: under 20 lines, one run, expected and real output. People can copy it, run it and answer in a minute.'
        }
      ],
      technical: [
        'Explaining works because it switches your brain from "recognizing" to "reproducing". Reading familiar code, you match patterns and fill in what you expect. Speaking forces you to produce each step yourself, which uncovers the steps you were skipping.',
        'Minimizing is a search. Each cut that keeps the failure removes code from the list of suspects. If you remove half of the remaining code each time, a 1000-line program needs only about 10 rounds (2 to the power 10 is 1024). Tools such as `git bisect` (a later skill) do the same with versions of a program instead of lines.',
        'A minimal example also removes **coincidences**. In the big program, `average` rounds with integer division, and that could also have been a suspect. Once `grade(90)` alone fails, `average` is cleared.'
      ],
      tryIt: {
        steps: [
          'Copy `GradeReport.java` and run it.',
          'Do the five rounds of cuts from the table yourself, running after each cut.',
          'Explain `grade` to a duck (or a plant) with the value 90, line by line, out loud.',
          'Fix the three comparisons and run `MinimalGradeFixed`.'
        ],
        see: '`Ben: average 90, grade B` until the fix, then `grade(90) = A`, `grade(80) = B` and `grade(70) = C`.'
      },
      check: [
        { q: 'You remove a method and the bug disappears. What does that tell you?', a: 'That method (or how it is used) matters for the bug. Put it back and remove something else.' },
        { q: 'Why do you say the real values out loud ("Ben has 90") and not only the variable names?', a: 'With real values you must compute each condition, such as `90 > 90`, and that is where the difference shows.' },
        { q: 'What do you include when you ask someone for help?', a: 'A minimal failing example, the input, the expected output, the real output and the full error message.' }
      ],
      keyPoints: [
        'Explain the code out loud, line by line, with real values.',
        'Say the rule first, then compare each line with it.',
        'Minimize: remove a part, run, keep it removed if it still fails.',
        'Test the boundaries: one below, on, and one above the edge.',
        'A minimal example is the best way to ask for help.'
      ],
      commonMistakes: [
        'Skipping lines while explaining ("this part is fine"). Fix: explain every line, especially the "easy" ones.',
        'Removing several parts at once. Fix: one cut per run, so you know which part matters.',
        'Asking for help with the whole 300-line project. Fix: send a minimal failing example.',
        'Fixing only `> 90` and missing the same mistake in `> 80` and `> 70`. Fix: test every boundary.'
      ],
      related: ['debugging-loop', 'bug-three-ways', 'Control Flow']
    },
    {
      id: 'bug-three-ways',
      title: 'Worked Example: The Wrong Average',
      category: 'habits',
      icon: '3×',
      tagline: 'One bug, found by thinking, printing and pausing',
      realWorld: 'A detective with a missing cake. First she looks at the clues (crumbs lead to the dog). Then she asks witnesses (prints). Then she watches the camera recording frame by frame (the debugger). All three point to the same dog.',
      kid: [
        'Three friends got 80, 90 and 100 points. The average should be 90. The program says 56 and a bit. Something is wrong.',
        'We will be detectives and follow the steps: make it happen again, think about the numbers, ask the program to tell us what it does, pause it and look inside.',
        'At the end we find the mistake: the program forgot to count the last friend.'
      ],
      definition: 'This lesson follows one real bug from start to end with every tool of this topic. `average` should return 90.0 for `{80, 90, 100}` but returns 56.666666666666664. The cause is an **off-by-one error**: a loop that stops one step too early.',
      explain: [
        'An **off-by-one error** is a loop or index that is wrong by exactly one: it starts at 1 instead of 0, stops one round early, or one round late. It is the most common logic error, because `<` and `<=`, `length` and `length - 1` look so similar.',
        'An array of length 3 has the indexes 0, 1 and 2. The loop `for (int i = 0; i < scores.length; i++)` visits exactly these. With `i < scores.length - 1` it stops when `i` is 2, so the last element is never added. With `i <= scores.length` it would try index 3 and crash with `ArrayIndexOutOfBoundsException`.',
        'The three ways to find it are the three tools of this topic: **think** (do the maths on the wrong number), **print** (show `i` and `sum` in each round), and **pause** (a breakpoint and the VARIABLES panel). In real work you use whichever is fastest; here you see all three.',
        'The steps follow the debugging loop from earlier in this topic: reproduce, isolate, hypothesize, test, fix, verify.'
      ],
      why: 'Seeing all the tools on one bug shows how they fit together, and the off-by-one error is a bug you will meet again and again.',
      whenUse: 'Any time a loop result is "almost right", or the first or last element seems to be missing or counted twice.',
      syntax: 'Visit every index of an array: `for (int i = 0; i < array.length; i++)`. Start at 0, stop before `length`.',
      fileName: 'AverageBug.java',
      code: `public class AverageBug {
    static double average(int[] scores) {
        int sum = 0;
        for (int i = 0; i < scores.length - 1; i++) {
            sum += scores[i];
        }
        return (double) sum / scores.length;
    }

    public static void main(String[] args) {
        int[] scores = {80, 90, 100};
        System.out.println("Average: " + average(scores));
        System.out.println("Expected: 90.0");
    }
}`,
      output: `Average: 56.666666666666664
Expected: 90.0`,
      codeSummary: 'The buggy program. It compiles, runs and prints no error, but the average is wrong: a logic error. The steps below find the cause on line 4.',
      codeExplanation: [
        { label: 'Line 2', code: 'static double average(int[] scores) {', text: 'Returns a `double`, so the average can have decimals.' },
        { label: 'Line 3', code: 'int sum = 0;', text: 'The running total starts at 0.' },
        { label: 'Line 4', code: 'for (int i = 0; i < scores.length - 1; i++) {', text: 'The bug. `scores.length - 1` is 2, so the loop runs for `i = 0` and `i = 1` only.' },
        { label: 'Line 5', code: 'sum += scores[i];', text: 'Adds one score per round. It never runs for `scores[2]`, the 100.' },
        { label: 'Line 7', code: 'return (double) sum / scores.length;', text: 'The cast `(double)` turns `sum` into a `double` first, so the division keeps the decimals. It divides by 3, the right count, but `sum` is only 170.' },
        { label: 'Line 11', code: 'int[] scores = {80, 90, 100};', text: 'An input where you know the answer by heart: 90. Always reproduce with such numbers.' },
        { label: 'Line 12', code: 'System.out.println("Average: " + average(scores));', text: 'Prints `56.666666666666664`. The long tail of digits is normal for `double`; the point is that it is not 90.' }
      ],
      sections: [
        {
          title: 'Step 1: reproduce and shrink the input',
          text: ['Try more inputs, smaller ones first, and write expected and real side by side. Each line is a clue.'],
          fileName: 'AverageProbe.java',
          code: `public class AverageProbe {
    static double average(int[] scores) {
        int sum = 0;
        for (int i = 0; i < scores.length - 1; i++) {
            sum += scores[i];
        }
        return (double) sum / scores.length;
    }

    public static void main(String[] args) {
        System.out.println("{10}          -> " + average(new int[] {10}) + "  expected 10.0");
        System.out.println("{10, 20}      -> " + average(new int[] {10, 20}) + "  expected 15.0");
        System.out.println("{80, 90, 100} -> " + average(new int[] {80, 90, 100}) + "  expected 90.0");
        System.out.println("{5, 5, 5, 5}  -> " + average(new int[] {5, 5, 5, 5}) + "  expected 5.0");
    }
}`,
          output: `{10}          -> 0.0  expected 10.0
{10, 20}      -> 5.0  expected 15.0
{80, 90, 100} -> 56.666666666666664  expected 90.0
{5, 5, 5, 5}  -> 3.75  expected 5.0`,
          tip: 'The smallest failing input is `{10}`: one score, and the result is 0.0. A one-element array that gives 0 means the loop body did not run even once.'
        },
        {
          title: 'Step 2: think with the numbers',
          text: [
            'Work backwards from each wrong result. The average times the count gives the sum the program used.',
            'Every time, exactly the **last** score is missing. That gives a clear hypothesis: "the loop never adds the last element".'
          ],
          table: {
            head: ['Input', 'Result', 'Result × count = sum used', 'Real sum', 'Missing'],
            rows: [
              ['`{10}`', '0.0', '0', '10', '10 (the last)'],
              ['`{10, 20}`', '5.0', '10', '30', '20 (the last)'],
              ['`{80, 90, 100}`', '56.67', '170', '270', '100 (the last)'],
              ['`{5, 5, 5, 5}`', '3.75', '15', '20', '5 (the last)']
            ]
          }
        },
        {
          title: 'Step 3: test the guess with prints',
          text: ['Two labelled prints test the hypothesis: one inside the loop (which `i` values run?) and one after it (what is `sum`?).'],
          fileName: 'AverageTrace.java',
          code: `public class AverageTrace {
    static double average(int[] scores) {
        int sum = 0;
        for (int i = 0; i < scores.length - 1; i++) {
            sum += scores[i];
            System.out.println("[DEBUG] i=" + i + " score=" + scores[i] + " sum=" + sum);
        }
        System.out.println("[DEBUG] after loop: sum=" + sum + " length=" + scores.length);
        return (double) sum / scores.length;
    }

    public static void main(String[] args) {
        System.out.println("Average: " + average(new int[] {80, 90, 100}));
    }
}`,
          output: `[DEBUG] i=0 score=80 sum=80
[DEBUG] i=1 score=90 sum=170
[DEBUG] after loop: sum=170 length=3
Average: 56.666666666666664`,
          tip: 'There is no `i=2` line. The guess is confirmed: the loop stops before the last index.'
        },
        {
          title: 'Step 4: see it in the debugger',
          text: [
            'Without any prints: set a breakpoint on line 5 (`sum += scores[i];`) of `AverageBug.java`, click **Debug**, and press **F5** (Continue) each time it pauses. Add `i < scores.length - 1` to the WATCH panel.'
          ],
          table: {
            head: ['Pause', 'VARIABLES', 'WATCH `i < scores.length - 1`'],
            rows: [
              ['1st (line 5)', '`i = 0`, `sum = 0`', '`true`'],
              ['2nd (line 5)', '`i = 1`, `sum = 80`', '`true`'],
              ['no 3rd pause', 'F5 runs to the end', 'with `i = 2` it is `2 < 2`, so `false`']
            ]
          },
          mermaid: `flowchart TD
  S["i = 0, sum = 0"] --> C{"i < scores.length - 1 ?"}
  C -->|"true: i is 0 or 1"| B["sum += scores[i]"]
  B --> U["i++"]
  U --> C
  C -->|"false: i is 2"| R["return sum / 3, but scores[2] was never added"]`,
          diagramNote: 'The loop leaves at `i = 2`, exactly the index of the last element. The condition must be `i < scores.length`, which is `false` only at `i = 3`.'
        },
        {
          title: 'Step 5 and 6: fix the cause and verify',
          text: [
            'Change the condition to `i < scores.length`. Then run every earlier input again, plus a new edge case: an empty array.',
            'The empty array prints `NaN`, short for "Not a Number": `0.0 / 0` has no answer for `double`. That is not the off-by-one bug, but verifying found it. Decide what you want: here, refuse an empty array with an exception.'
          ],
          fileName: 'AverageFixed.java',
          code: `public class AverageFixed {
    static double average(int[] scores) {
        int sum = 0;
        for (int i = 0; i < scores.length; i++) {   // the fix: no "- 1"
            sum += scores[i];
        }
        return (double) sum / scores.length;
    }

    public static void main(String[] args) {
        System.out.println("{10}          -> " + average(new int[] {10}));
        System.out.println("{10, 20}      -> " + average(new int[] {10, 20}));
        System.out.println("{80, 90, 100} -> " + average(new int[] {80, 90, 100}));
        System.out.println("{5, 5, 5, 5}  -> " + average(new int[] {5, 5, 5, 5}));
        System.out.println("{}            -> " + average(new int[0]));
    }
}`,
          output: `{10}          -> 10.0
{10, 20}      -> 15.0
{80, 90, 100} -> 90.0
{5, 5, 5, 5}  -> 5.0
{}            -> NaN`,
          warn: 'To refuse the empty array, add `if (scores.length == 0) { throw new IllegalArgumentException("need at least one score"); }` as the first line of `average`. Then delete every `[DEBUG]` line before you call the work done.'
        }
      ],
      technical: [
        'A `for` loop checks its condition **before** each round. For `i < n` the body runs for `i = 0 … n - 1`: exactly `n` rounds. Subtracting 1 in the condition removes one round; using `<=` adds one. Counting the rounds for the smallest input (here: one element, so one round) is the fastest way to check a loop by hand.',
        '`(double) sum / scores.length` first converts `sum` to `double`, then divides. Without the cast, `170 / 3` is integer division and gives 56, which would hide the problem behind a second one. With an `int` divided by zero you get an `ArithmeticException`; with a `double` you get `NaN` (for 0.0 / 0) or `Infinity` (for 5.0 / 0), following the IEEE 754 rules for floating-point numbers.',
        'An enhanced `for` loop, `for (int score : scores)`, cannot be off by one: it always visits every element. When you do not need the index, it is the safer choice.'
      ],
      tryIt: {
        steps: [
          'Copy `AverageBug.java` and run it. Write expected and got on paper.',
          'Do the maths from step 2 for `{80, 90, 100}`: which score is missing?',
          'Add the print from `AverageTrace` and run. Then remove it and find the same thing with a breakpoint on line 5.',
          'Fix line 4, run `AverageFixed`, and add the empty-array check from the warning box.'
        ],
        see: '`Average: 56.666666666666664` first, `[DEBUG]` lines for `i=0` and `i=1` only, then `Average: 90.0`, and with the check an `IllegalArgumentException: need at least one score` for `{}`.'
      },
      check: [
        { q: 'An array has length 4. Which indexes does `for (int i = 0; i < arr.length - 1; i++)` visit?', a: '0, 1 and 2. Index 3, the last one, is skipped.' },
        { q: 'Why is `{10}` a better test input than `{80, 90, 100}`?', a: 'It is the smallest failing input. A result of 0.0 shows at once that the loop body did not run at all.' },
        { q: 'How could you write this loop so it cannot be off by one?', a: 'With an enhanced for loop: `for (int score : scores) { sum += score; }`.' }
      ],
      keyPoints: [
        'Off-by-one: a loop or index wrong by exactly one.',
        'All indexes of an array: `i = 0` while `i < length`.',
        'Work backwards from the wrong number to find what is missing.',
        'Think, print or pause: all three find the same line.',
        'Verify with old inputs and new edge cases such as `{}`.'
      ],
      commonMistakes: [
        '`i < scores.length - 1`: skips the last element. Fix: `i < scores.length`.',
        '`i <= scores.length`: one round too many, `ArrayIndexOutOfBoundsException`. Fix: `<`, not `<=`.',
        'Starting at `i = 1`: skips the first element. Fix: start at `i = 0`.',
        '`sum / scores.length` with two `int`s: the decimals are cut off. Fix: `(double) sum / scores.length`.'
      ],
      related: ['debugging-loop', 'print-debugging', 'ide-debugger', 'Arrays']
    }
  ]);
})();
