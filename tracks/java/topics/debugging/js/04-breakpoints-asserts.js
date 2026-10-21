// Debugging, part 4: conditional breakpoints, and assert with -ea.
(function () {
  Java.addCoreLessons('debugging', [
    {
      id: 'conditional-breakpoints',
      title: 'Conditional Breakpoints',
      category: 'practice',
      icon: '◆',
      tagline: 'Pause only when it matters',
      realWorld: 'A mouse trap that only snaps for the one mouse with a red tail. All other mice walk past, and you are not woken up a thousand times in the night.',
      kid: [
        'A normal red dot stops the program every single time it reaches that line. In a loop that runs 1000 times, you would press the button 1000 times.',
        'A **conditional** red dot has a little question on it, like "is this number below zero?". The program only stops when the answer is yes.',
        'So you jump straight to the one moment that is interesting.'
      ],
      definition: 'A **conditional breakpoint** pauses only when a Java expression you give it is `true`, for example `readings[i] < 0`. VS Code also has **hit count** breakpoints (pause on the Nth time) and **logpoints** (print a message without pausing).',
      explain: [
        'A breakpoint inside a loop stops on every round. When the bug appears in round 742 of 1000, that is useless. A **condition** fixes this: the debugger checks the expression each time it reaches the line and only pauses when it is `true`.',
        'The condition is a normal Java boolean expression. It can use every variable that exists on that line: `i == 742`, `readings[i] < 0`, `name.equals("Cara")`, `total > 10000`. It is checked **before** the line runs, the same as a normal breakpoint.',
        'A **hit count** counts how often the line is reached and pauses when the count reaches the number you typed. That helps when you know "it goes wrong around the 500th time" but not which value causes it.',
        'A **logpoint** is a breakpoint that never pauses. It prints a message to the DEBUG CONSOLE instead, like a `println` you do not have to write into the code. Inside the message, expressions in curly braces are replaced by their values: `i={i} value={readings[i]}`.',
        'An **exception breakpoint** is not tied to a line at all. You tick **Uncaught Exceptions** in the BREAKPOINTS panel, and the debugger pauses on the exact line that throws, with all variables still visible. You see the values that caused the crash, not only the stack trace.'
      ],
      why: 'Many bugs only appear for one value among thousands. A condition takes you there in one click instead of a thousand.',
      whenUse: 'Loops with many rounds, methods called many times, or any time you can describe the bad moment as a `true`/`false` question.',
      syntax: 'Right-click left of a line number → **Add Conditional Breakpoint…** → choose **Expression**, **Hit Count** or **Log Message** → type → Enter.',
      fileName: 'SensorLog.java',
      code: `public class SensorLog {
    public static void main(String[] args) {
        // Pretend these 1000 readings come from a file.
        int[] readings = new int[1000];
        for (int i = 0; i < readings.length; i++) {
            readings[i] = 20 + (i * 7) % 11;   // values between 20 and 30
        }
        readings[742] = -999;   // one broken reading, hidden in the middle

        int sum = 0;
        for (int i = 0; i < readings.length; i++) {
            sum += readings[i];
        }
        System.out.println("Sum: " + sum);
        System.out.println("Average: " + sum / readings.length + " (expected about 25)");
    }
}`,
      output: `Sum: 23980
Average: 23 (expected about 25)`,
      codeSummary: 'The average is too low. Somewhere in 1000 readings there is a bad value. A breakpoint on line 12 with the condition `readings[i] < 0` pauses once, with `i = 742`, instead of 1000 times.',
      codeExplanation: [
        { label: 'Line 4', code: 'int[] readings = new int[1000];', text: 'A large array. Stepping through it by hand is not an option.' },
        { label: 'Line 6', code: 'readings[i] = 20 + (i * 7) % 11;', text: 'Fills it with values from 20 to 30. In real life this would be data from a file or a sensor.' },
        { label: 'Line 8', code: 'readings[742] = -999;', text: 'The broken value. In real data you would not see this line; you would only see the wrong average.' },
        { label: 'Line 11', code: 'for (int i = 0; i < readings.length; i++) {', text: 'The loop that adds everything up. It runs 1000 times.' },
        { label: 'Line 12', code: 'sum += readings[i];', text: 'Put the conditional breakpoint here with `readings[i] < 0`. It pauses only for the broken reading.' },
        { label: 'Line 15', code: 'System.out.println("Average: " + sum / readings.length + " (expected about 25)");', text: 'Integer division: 23980 / 1000 is 23. Printing the expected value next to it shows something is off.' }
      ],
      sections: [
        {
          title: 'Add a conditional breakpoint, click by click',
          bullets: [
            '**Right-click** in the space left of the number **12** (where the red dot would go).',
            'Choose **Add Conditional Breakpoint…** from the menu.',
            'A small box opens below the line. A dropdown on its left says **Expression**. Leave it.',
            'Type `readings[i] < 0` and press **Enter**. The dot appears with a small `=` sign inside: that marks a condition.',
            'Click **Debug** above `main`. The program runs through 742 rounds and pauses with `i = 742` and `readings[i]` showing `-999` in VARIABLES (hover over `readings[i]`, or add it to WATCH).'
          ],
          tip: 'To change a condition later, right-click the dot → **Edit Breakpoint…**. To turn a normal breakpoint into a conditional one, use the same menu.'
        },
        {
          title: 'Normal vs conditional: how often it pauses',
          mermaid: `flowchart TD
  A["Program reaches line 12"] --> B{"Breakpoint type?"}
  B -->|"normal"| P["Pause (1000 times)"]
  B -->|"condition"| C{"readings[i] < 0 ?"}
  C -->|"false"| G["Go on, no pause"]
  C -->|"true"| P2["Pause once: i = 742"]
  B -->|"logpoint"| L["Print message, go on"]`,
          diagramNote: 'The debugger checks the condition every time, but you only see the program stop when the answer is `true`.'
        },
        {
          title: 'Three kinds in the dropdown',
          table: {
            head: ['Kind', 'You type', 'What happens', 'Good for'],
            rows: [
              ['Expression', '`readings[i] < 0`', 'pauses when the expression is `true`', 'you can describe the bad value'],
              ['Hit Count', '`500`', 'pauses when the line is reached for the 500th time', 'you know roughly when, not which value'],
              ['Log Message', '`i={i} value={readings[i]}`', 'prints to the DEBUG CONSOLE, never pauses', 'a print without editing the code']
            ],
            note: 'A logpoint shows as a diamond instead of a dot. Nothing is added to your source file, so there is nothing to clean up.'
          }
        },
        {
          title: 'Good conditions to copy',
          table: {
            head: ['You suspect…', 'Condition'],
            rows: [
              ['one round of the loop', '`i == 742`'],
              ['a bad value', '`readings[i] < 0` or `price > 100000`'],
              ['one name in a list', '`name.equals("Cara")`'],
              ['a missing value', '`name == null`'],
              ['the last round', '`i == readings.length - 1`'],
              ['a total that grows too big', '`sum > 30000`']
            ]
          },
          warn: 'The condition must be a comparison, not an assignment. `i = 742` is an error (or worse, it changes `i`). Write `i == 742`. For `String`s use `.equals(...)`, not `==`.'
        },
        {
          title: 'Pause where an exception is thrown',
          text: [
            'Open the **BREAKPOINTS** panel at the bottom of the Run and Debug view. At the top of its list there are two checkboxes: **Uncaught Exceptions** and **Caught Exceptions**.',
            'Tick **Uncaught Exceptions** and debug a program that crashes, such as `ScoreReport` from the lesson "Stack Traces as a Map". The debugger pauses on line 18 the moment `parseInt` throws. VARIABLES shows `line = "Cara,x"` and `parts`. You see the cause without adding a single print.'
          ],
          tip: '**Caught Exceptions** also pauses on exceptions that a `catch` handles. That is useful when a `catch` hides a problem, but it can also stop inside the JDK. Turn it on only when you need it.'
        }
      ],
      technical: [
        'For a conditional breakpoint the JVM still pauses the thread at the line every time. The Java extension then evaluates your expression in that frame and, if it is `false`, tells the JVM to resume at once. You do not see these short pauses, but they make a loop with a conditional breakpoint run slower than normal.',
        'The expression is compiled and run by the debugger with the frame\'s local variables, so it must be valid Java on that line. A typo in the condition shows an error in the DEBUG CONSOLE, and some versions then pause every time.',
        'Exception breakpoints use a JDWP event called **exception event**: the JVM reports every throw to the debugger, together with whether a `catch` will handle it. "Uncaught" filters to the throws that nobody catches.'
      ],
      tryIt: {
        steps: [
          'Copy `SensorLog.java`. Set a normal breakpoint on line 12 and debug. Press F5 three times and see how slow that is. Stop with Shift+F5.',
          'Right-click the dot → **Edit Breakpoint…**, type `readings[i] < 0`, Enter. Debug again.',
          'Hover over `i` and over `readings[i]`.',
          'Change the breakpoint to a **Log Message** `i={i}` with the condition removed, debug, and look at the DEBUG CONSOLE.'
        ],
        see: 'a pause with `i = 742` and the value `-999`; with the logpoint, 1000 lines `i=0` to `i=999` in the DEBUG CONSOLE and no pause.'
      },
      check: [
        { q: 'A loop runs 10 000 times and goes wrong when `total` goes above 5000. What condition do you use?', a: '`total > 5000` on a line inside the loop.' },
        { q: 'What is the difference between a logpoint and a `println`?', a: 'A logpoint prints from the debugger. Your source file does not change, so nothing needs to be removed later.' },
        { q: 'Why is `i = 742` a bad condition?', a: 'It is an assignment, not a comparison. Use `i == 742`.' }
      ],
      keyPoints: [
        'Right-click the gutter → Add Conditional Breakpoint.',
        'Expression: pause when `true`. Hit Count: pause on the Nth time.',
        'Log Message: print without pausing, `{expr}` for values.',
        'Uncaught Exceptions: pause on the line that throws.',
        'Conditions use `==` and `.equals`, never `=`.'
      ],
      commonMistakes: [
        'Writing `i = 742` as a condition. Fix: `i == 742`.',
        'Comparing text with `==`: `name == "Cara"`. Fix: `name.equals("Cara")`.',
        'Using a variable that does not exist yet on that line (declared further down). Fix: put the breakpoint after the variable is declared.',
        'Forgetting that **Caught Exceptions** is ticked, and pausing inside the JDK over and over. Fix: untick it.'
      ],
      related: ['ide-debugger', 'stack-traces', 'print-debugging']
    },
    {
      id: 'assertions',
      title: 'assert and -ea',
      category: 'practice',
      icon: '!',
      tagline: 'Check your own assumptions while you develop',
      realWorld: 'Before you cross the road, you say "the light is green" and check it. If it is not green, you stop at once, right at the corner, instead of finding out in the middle of the road.',
      kid: [
        'Sometimes you are sure about something: "this list is never empty here". An `assert` is you writing that down for the computer.',
        'When the computer reaches the `assert`, it checks: is that really true? If yes, it goes on. If no, it stops right there and tells you which promise was broken.',
        'There is one surprise: the computer only checks if you ask it to, with a switch called `-ea`.'
      ],
      definition: 'An **assertion** is a statement `assert condition : message;` that says "this must be true here". With assertions turned on (`java -ea ClassName`) a false condition throws an `AssertionError` with your message. Without `-ea` Java skips every `assert`.',
      explain: [
        'An **assumption** is something your code relies on but does not check, such as "the array has at least one value" or "the index is never negative". Bugs often hide in assumptions that turn out to be false.',
        '`assert values.length > 0 : "average() needs at least one value";` writes the assumption down. The part before `:` is a boolean condition. The part after `:` is the message (optional). If the condition is `false`, Java throws an `AssertionError`, an error (a kind of exception that you normally do not catch) that names your message and the line.',
        'Assertions are **off** by default. Plain `java AssertDemo` ignores them completely. `java -ea AssertDemo` (short for `-enableassertions`) turns them on. The idea: you check assumptions while developing and testing, and they cost nothing in the finished program.',
        'The value of an `assert` is **where** it stops. Without it, the bad value travels on and crashes somewhere later, or worse, gives a wrong answer. With it, the program stops at the first place where your assumption breaks, and the message says which one.',
        'Because assertions can be off, they are only for checking **your own** code. Input from users or files must always be checked with `if` and `throw`, which always runs. You learned `throw` in [Exceptions](../exceptions/index.html).'
      ],
      why: 'Assertions catch a bug close to its cause and turn a silent assumption into a check with a clear message.',
      whenUse: 'Inside your methods, for things that "can never happen" if the rest of your code is right: a list is not empty, an index is in range, a result is between 0 and 100.',
      syntax: '`assert condition;` or `assert condition : "message";` Run with `java -ea ClassName`.',
      fileName: 'AssertDemo.java',
      code: `public class AssertDemo {
    static int average(int[] values) {
        assert values.length > 0 : "average() needs at least one value";
        int sum = 0;
        for (int value : values) {
            sum += value;
        }
        return sum / values.length;
    }

    public static void main(String[] args) {
        System.out.println("Average of 4 and 8: " + average(new int[] {4, 8}));
        System.out.println("Average of nothing: " + average(new int[0]));
    }
}`,
      output: `Average of 4 and 8: 6
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at AssertDemo.average(AssertDemo.java:8)
	at AssertDemo.main(AssertDemo.java:13)`,
      codeSummary: 'This is the output of `java AssertDemo` **without** `-ea`: the `assert` is skipped, and the program crashes later with a less helpful message. The next section shows the same program with `-ea`.',
      codeExplanation: [
        { label: 'Line 3', code: 'assert values.length > 0 : "average() needs at least one value";', text: 'The assumption, written down: there is at least one value. The text after `:` is the message you will see if it fails.' },
        { label: 'Line 5', code: 'for (int value : values) {', text: 'Adds up all values. For an empty array the loop runs zero times and `sum` stays 0.' },
        { label: 'Line 8', code: 'return sum / values.length;', text: 'For an empty array this is `0 / 0`, an integer division by zero. Without `-ea` this is where the program crashes.' },
        { label: 'Line 12', code: 'average(new int[] {4, 8})', text: 'A good call. The `assert` passes (length 2), the result is 6.' },
        { label: 'Line 13', code: 'average(new int[0])', text: 'A call that breaks the assumption: an array with no values.' },
        { label: 'Output', code: 'ArithmeticException: / by zero', text: 'Without `-ea` you get this message. It says what happened (division by zero) but not why (the array was empty).' }
      ],
      sections: [
        {
          title: 'The same program with -ea',
          text: ['Now run it with assertions on. The program stops on line 3, at the broken assumption, and the message says exactly what was wrong.'],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `javac AssertDemo.java
java -ea AssertDemo`,
          output: `Average of 4 and 8: 6
Exception in thread "main" java.lang.AssertionError: average() needs at least one value
	at AssertDemo.average(AssertDemo.java:3)
	at AssertDemo.main(AssertDemo.java:13)`,
          tip: '`-ea` goes after `java` and **before** the class name. `java AssertDemo -ea` passes `-ea` to your program as `args[0]` and leaves assertions off.'
        },
        {
          title: 'What Java does at an assert',
          mermaid: `flowchart TD
  A["Program reaches assert"] --> B{"Started with -ea?"}
  B -->|"no"| S["Skip the whole line"]
  B -->|"yes"| C{"Condition true?"}
  C -->|"yes"| N["Go on to the next line"]
  C -->|"no"| E["throw AssertionError with the message"]`,
          diagramNote: 'Without `-ea` even the condition is not computed. That is why an `assert` costs nothing when it is off, and also why it must never do real work.'
        },
        {
          title: 'Turn assertions on in VS Code',
          text: [
            'The **Run** and **Debug** links start Java without `-ea`. To change that, give VS Code a launch configuration (a file `.vscode/launch.json` that says how to start your program).',
            'Open the Run and Debug view (Ctrl+Shift+D), click **create a launch.json file**, choose **Java**. VS Code writes a file with one entry per class. Add the line `"vmArgs": "-ea"` to the entry for your class and save. Now **Run → Start Debugging** (F5) uses it.'
          ],
          codeLanguage: 'json',
          fileName: '.vscode/launch.json',
          code: `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "AssertDemo",
      "request": "launch",
      "mainClass": "AssertDemo",
      "vmArgs": "-ea"
    }
  ]
}`,
          warn: '**vmArgs** are options for the JVM (like `-ea`). **args** are values for your `main` method. Putting `-ea` into `args` does nothing for assertions.'
        },
        {
          title: 'Never do real work inside an assert',
          text: ['This little program checks whether assertions are on. The assignment `enabled = true` sits inside the `assert`, so it only happens with `-ea`. That trick shows the danger: any work inside an `assert` disappears without `-ea`.'],
          fileName: 'AssertCheck.java',
          code: `public class AssertCheck {
    public static void main(String[] args) {
        boolean enabled = false;
        assert enabled = true;   // this assignment only runs when assertions are on
        System.out.println("Assertions enabled: " + enabled);
    }
}`,
          output: 'Assertions enabled: false',
          table: {
            head: ['Wrong', 'Right'],
            rows: [
              ['`assert names.remove("Ava");` (the remove vanishes without `-ea`)', '`boolean removed = names.remove("Ava");` then `assert removed;`'],
              ['`assert age >= 0;` for an age the user typed', '`if (age < 0) { throw new IllegalArgumentException("age must be 0 or more"); }`'],
              ['`assert false;` with no message', '`assert false : "unknown command: " + command;`']
            ],
            note: 'With `java -ea AssertCheck` the same program prints `Assertions enabled: true`.'
          }
        },
        {
          title: 'assert or if + throw?',
          table: {
            head: ['', '`assert`', '`if` + `throw`'],
            rows: [
              ['Runs when?', 'only with `-ea`', 'always'],
              ['Checks', 'your own assumptions ("cannot happen")', 'input from users, files, other code'],
              ['Error', '`AssertionError`', 'an exception you choose, e.g. `IllegalArgumentException`'],
              ['Typical place', 'middle or end of a method, in loops', 'start of a public method'],
              ['Example', '`assert index >= 0 : index;`', '`if (text.isBlank()) throw new IllegalArgumentException(...)`']
            ],
            note: 'A good rule: if the program must refuse the value even after it is finished and shipped, use `if` + `throw`. If only a bug in your own code could make it false, use `assert`.'
          }
        }
      ],
      technical: [
        'The compiler turns `assert cond : msg;` into bytecode that first reads a hidden static field `$assertionsDisabled` of the class. If it is `true`, the whole check is jumped over. If not, it computes `cond` and, when it is `false`, runs `throw new AssertionError(msg)`.',
        'The field is set once, when the class is loaded, from the JVM options: `-ea` turns assertions on for all your classes, `-ea:ClassName` for one class, `-da` turns them off again. JDK classes such as `String` stay off unless you add `-esa` (enable system assertions).',
        '`AssertionError` extends `Error`, not `Exception`. An `Error` signals a problem that the program is not expected to handle, so a normal `catch (Exception e)` does not catch it. That is on purpose: a broken assumption should stop the program, not be hidden.'
      ],
      tryIt: {
        steps: [
          'Copy `AssertDemo.java`. Run `javac AssertDemo.java` and `java AssertDemo`.',
          'Run `java -ea AssertDemo`. Compare the two error messages.',
          'Copy `AssertCheck.java`. Run it once without and once with `-ea`.'
        ],
        see: '`/ by zero` without `-ea` and `AssertionError: average() needs at least one value` with it; then `Assertions enabled: false` without `-ea` and `Assertions enabled: true` with it.'
      },
      check: [
        { q: 'You run `java AssertDemo` and the `assert` never fails. Why?', a: 'Assertions are off by default. Run `java -ea AssertDemo`.' },
        { q: 'Should you check a number the user typed with `assert`?', a: 'No. Assertions can be off. Use `if` and `throw` so the check always runs.' },
        { q: 'What is wrong with `assert list.add(x);`?', a: 'Without `-ea` the whole line is skipped, so `x` is never added. Do the work first, then assert the result.' }
      ],
      keyPoints: [
        '`assert condition : message;` writes an assumption down.',
        'Off by default; `java -ea ClassName` turns it on.',
        'A failed assert throws `AssertionError` at the broken assumption.',
        'Never put real work inside an `assert`.',
        'User input: `if` + `throw`, not `assert`.'
      ],
      commonMistakes: [
        'Forgetting `-ea` and thinking all assumptions hold. Fix: `java -ea ClassName`, or `"vmArgs": "-ea"` in VS Code.',
        'Writing `java AssertDemo -ea`. Fix: options go before the class name: `java -ea AssertDemo`.',
        'Doing work in the condition: `assert names.remove("Ava");`. Fix: do the work on its own line, then assert the result.',
        'Validating user input with `assert`. Fix: `if (...) throw new IllegalArgumentException(...)`.'
      ],
      related: ['Exceptions', 'bug-three-ways', 'Testing']
    }
  ]);
})();
