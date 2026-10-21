// Debugging, part 3: print debugging done well, and the VS Code debugger.
(function () {
  Java.addCoreLessons('debugging', [
    {
      id: 'print-debugging',
      title: 'Print Debugging Done Well',
      category: 'practice',
      icon: 'log',
      tagline: 'Labelled prints at the right places',
      realWorld: 'Breadcrumbs in the forest, like in the fairy tale. You drop one at every turn. Later you follow them and see exactly which way you really went, not which way you thought you went.',
      kid: [
        'Your program runs very fast, and you cannot see inside. So you ask it to talk: "I am here now, and this box holds 1170."',
        'Each little message gets a name tag, so you know which box it is about.',
        'When you know where the problem is, you take the messages out again, like picking up your breadcrumbs.'
      ],
      definition: '**Print debugging** means adding temporary `System.out.println` lines that show **where** the program is and **what** the values are. Done well, each print has a label, sits at a point where something changes, and is removed after the fix.',
      explain: [
        'A print shows two things: that a line was reached (the program went this way), and the value of variables at that moment. Together, many prints draw the path the program really took.',
        'A **label** is the text in front of the value: `"total=" + total` instead of only `total`. Without labels, a column of numbers means nothing. A prefix such as `[DEBUG]` makes the lines easy to spot and easy to delete later.',
        'Good places for prints are where values change or decisions are made: at the start of a method (print the parameters), inside each branch of an `if`, inside a loop (print the loop variable and the running result), and right before a `return`.',
        'Put brackets around text values: `"name=[" + name + "]"`. Spaces at the start or end of a `String` are invisible otherwise, and an empty `""` looks like nothing at all. Use `Arrays.toString(array)` for arrays: printing an array directly shows only a code like `[I@6d06d69c`.',
        'Prints are quick and work everywhere, also on a server or in a terminal without an editor. Their downside: you must change and recompile the code for each new question. When you need many values at once, the debugger in the next lesson is faster.'
      ],
      why: 'You cannot fix what you cannot see. A few labelled prints turn a hidden calculation into a story you can read line by line.',
      whenUse: 'When you want to know "did this line run?" or "what was the value here?", and especially for loops: one print per round shows the whole history.',
      syntax: '`System.out.println("[DEBUG] where: name=" + name + " total=" + total);`. Arrays: `Arrays.toString(values)`. Text: `"[" + text + "]"`.',
      fileName: 'CartDebug.java',
      code: `public class CartDebug {
    static int totalCents(int[] prices, boolean member) {
        System.out.println("[DEBUG] totalCents start: member=" + member);
        int total = 0;
        for (int i = 0; i < prices.length; i++) {
            total += prices[i];
            if (member) {
                total = total - total / 10;   // 10% off
            }
            System.out.println("[DEBUG] i=" + i + " price=" + prices[i] + " total=" + total);
        }
        System.out.println("[DEBUG] return " + total);
        return total;
    }

    public static void main(String[] args) {
        int[] prices = {1299, 450, 2000};
        int total = totalCents(prices, true);
        System.out.println("Total: " + total + " cents (expected 3375)");
    }
}`,
      output: `[DEBUG] totalCents start: member=true
[DEBUG] i=0 price=1299 total=1170
[DEBUG] i=1 price=450 total=1458
[DEBUG] i=2 price=2000 total=3113
[DEBUG] return 3113
Total: 3113 cents (expected 3375)`,
      codeSummary: 'Prices add up to 3749 cents. A member gets 10% off the whole cart: 3749 - 374 = 3375. The program prints 3113. The labelled prints show why: the discount is taken in every round of the loop, not once at the end.',
      codeExplanation: [
        { label: 'Line 3', code: 'System.out.println("[DEBUG] totalCents start: member=" + member);', text: 'A print at the start of the method shows that it was called and with which parameter.' },
        { label: 'Line 6', code: 'total += prices[i];', text: 'Adds one price. After round 0 you would expect `total=1299`.' },
        { label: 'Lines 7-9', code: 'total = total - total / 10;', text: 'The bug: this sits **inside** the loop, so it runs three times. `total / 10` is integer division, so 1299 / 10 is 129.' },
        { label: 'Line 10', code: 'System.out.println("[DEBUG] i=" + i + " price=" + prices[i] + " total=" + total);', text: 'One labelled line per round. It shows `total=1170` after round 0, not 1299. That is the clue: a discount already happened.' },
        { label: 'Line 12', code: 'System.out.println("[DEBUG] return " + total);', text: 'A print right before `return` shows the final value the method hands back.' },
        { label: 'Line 19', code: 'System.out.println("Total: " + total + " cents (expected 3375)");', text: 'Writing the expected value next to the real one makes the difference jump out.' },
        { label: 'Fix', code: 'if (member) { total = total - total / 10; }  // after the loop', text: 'Move the `if` below the loop. Then the output is `Total: 3375`, and you delete the `[DEBUG]` lines.' }
      ],
      sections: [
        {
          title: 'Where to put the prints',
          mermaid: `flowchart TD
  A["Method start: print parameters"] --> B{"if / else"}
  B -->|"then"| C["print: in then-branch"]
  B -->|"else"| D["print: in else-branch"]
  C --> E["Loop body: print i and running value"]
  D --> E
  E --> F["Before return: print the result"]`,
          diagramNote: 'Every arrow is a place where the program can go a way you did not expect. A print on each path tells you which way it really went.'
        },
        {
          title: 'Wrong vs right: labels',
          text: ['Unlabelled prints give a column of numbers. Which number is which? The labelled version answers that at once.'],
          table: {
            head: ['Unlabelled (hard to read)', 'Labelled (easy to read)'],
            rows: [
              ['`System.out.println(total);`', '`System.out.println("[DEBUG] i=" + i + " total=" + total);`'],
              ['`1170`', '`[DEBUG] i=0 total=1170`'],
              ['`System.out.println(prices);` prints `[I@6d06d69c`', '`System.out.println("prices=" + Arrays.toString(prices));` prints `prices=[1299, 450, 2000]`'],
              ['`System.out.println(name);` prints `yes` (with an invisible space)', '`System.out.println("name=[" + name + "]");` prints `name=[yes ]`']
            ],
            note: 'The `[I@6d06d69c` text is the array\'s type code (`[I` means "array of int") and a number that changes on every run. It never shows the content.'
          }
        },
        {
          title: 'Brackets find invisible spaces',
          text: ['A user typed `yes ` with a space at the end. The program says it is not `yes`. A plain print looks fine. The bracket print shows the space.'],
          fileName: 'HiddenSpace.java',
          code: `public class HiddenSpace {
    public static void main(String[] args) {
        String answer = "yes ";   // imagine this came from the keyboard

        System.out.println("plain:    " + answer);
        System.out.println("brackets: [" + answer + "]");
        System.out.println("length:   " + answer.length());
        System.out.println("equals \\"yes\\"? " + answer.equals("yes"));
        System.out.println("after trim? " + answer.trim().equals("yes"));
    }
}`,
          output: `plain:    yes
brackets: [yes ]
length:   4
equals "yes"? false
after trim? true`,
          tip: 'Printing `length()` is another way to catch hidden characters: `"yes"` has length 3, so length 4 means one extra character. The fix is `answer.trim()`, from [Strings & Text](../strings/index.html).'
        },
        {
          title: 'Switch prints on and off, then clean up',
          text: [
            'A small helper method and a `DEBUG` constant let you turn all debug prints off in one place. Set it to `false` when you are done, then delete the lines.',
            'Some programmers print debug text with `System.err.println`. That goes to the error stream, which the terminal also shows, but it can appear in a different order than `System.out` lines. For beginners, `System.out` with a `[DEBUG]` label is clearer.'
          ],
          fileName: 'DebugSwitch.java',
          code: `public class DebugSwitch {
    static final boolean DEBUG = true;   // set to false to silence all debug lines

    static void debug(String message) {
        if (DEBUG) {
            System.out.println("[DEBUG] " + message);
        }
    }

    public static void main(String[] args) {
        int[] scores = {7, 9, 4};
        int best = scores[0];
        for (int i = 1; i < scores.length; i++) {
            debug("i=" + i + " score=" + scores[i] + " best so far=" + best);
            if (scores[i] > best) {
                best = scores[i];
            }
        }
        System.out.println("Best score: " + best);
    }
}`,
          output: `[DEBUG] i=1 score=9 best so far=7
[DEBUG] i=2 score=4 best so far=9
Best score: 9`,
          warn: 'Never leave debug prints in finished code. They confuse users and can leak data. Search the file for `[DEBUG]` before you call the bug fixed.'
        }
      ],
      technical: [
        '`System.out` is a `PrintStream` connected to the **standard output** of the process; `System.err` is connected to **standard error**. Both appear in the terminal, but they are two separate channels. `System.out` may collect text in a buffer before writing it, so mixing the two can change the order you see.',
        'String concatenation with `+` calls `String.valueOf(...)` on each value. For an object, that calls its `toString()` method. Arrays do not override `toString()`, so they print their type code and a hash number. `Arrays.toString` builds a readable `[a, b, c]` text instead.',
        'A `static final boolean DEBUG = false` is a **compile-time constant**. The compiler knows the `if (DEBUG)` body can never run and may leave it out of the bytecode. That is why the switch costs nothing when it is off.'
      ],
      tryIt: {
        steps: [
          'Copy `CartDebug.java` and run it. Read the `[DEBUG]` lines from top to bottom.',
          'Move the `if (member) { ... }` block below the loop (after its closing `}`).',
          'Run again and check the `Total:` line.',
          'Delete the three `[DEBUG]` lines and run one last time.'
        ],
        see: 'before: `total=1170` after round 0 and `Total: 3113`. After the fix: `[DEBUG] i=0 price=1299 total=1299` and `Total: 3375 cents (expected 3375)`.'
      },
      check: [
        { q: 'Why is `"total=" + total` better than `total` in a debug print?', a: 'The label tells you which value you see. With several prints, bare numbers are impossible to match to variables.' },
        { q: 'A `String` looks right in a print but `equals` says false. What do you print next?', a: 'The text in brackets, `"[" + text + "]"`, and its `length()`. Both reveal hidden spaces.' },
        { q: 'Where do you put a print to see how a loop builds its result?', a: 'Inside the loop body, after the value changes, with the loop variable and the running result.' }
      ],
      keyPoints: [
        'Label every value: `"i=" + i`.',
        'Print at method start, in each branch, in loops, before `return`.',
        'Brackets around text; `Arrays.toString` for arrays.',
        'Write the expected value next to the real one.',
        'Remove all debug prints when the bug is fixed.'
      ],
      commonMistakes: [
        'Printing an array directly: `System.out.println(prices)`. Fix: `Arrays.toString(prices)` with `import java.util.Arrays;`.',
        'Printing 50 values at once and drowning in output. Fix: start with one print where the value first goes wrong, then move it.',
        'Forgetting to recompile after adding prints, and wondering why nothing changed. Fix: `javac` again (VS Code does this when you press Run).',
        'Leaving `[DEBUG]` lines in the final code. Fix: search for `[DEBUG]` and delete every line.'
      ],
      related: ['ide-debugger', 'debugging-loop', 'Strings & Text']
    },
    {
      id: 'ide-debugger',
      title: 'The VS Code Debugger',
      category: 'practice',
      icon: '⏸',
      tagline: 'Pause the program and look inside',
      realWorld: 'A pause button on a film. You stop on one frame and look at every detail: who stands where, what is on the table. Then you go forward one frame at a time.',
      kid: [
        'Your program usually runs from start to end in a blink. The debugger gives you a magic pause button.',
        'You put a red dot next to a line. When the program gets there, it freezes. Now you can look into every box and see what is inside.',
        'Then you press a button to do one more step, and you watch the boxes change. No prints needed.'
      ],
      definition: 'A **debugger** runs your program under control: it stops at a **breakpoint** (a marked line), shows all variables, and lets you **step** through the code one line at a time. In VS Code you set a breakpoint by clicking left of a line number and start with **Debug** instead of **Run**.',
      explain: [
        'A **breakpoint** is a mark on a line that says "pause before this line runs". VS Code shows it as a red dot left of the line number. When the program reaches that line, it pauses and the line is highlighted in yellow. The yellow line has **not** run yet.',
        'While paused, the **Run and Debug** view on the left shows four panels. **VARIABLES** lists every local variable of the current method and its value. **WATCH** shows expressions you typed yourself, such as `sum * 2`. **CALL STACK** shows the methods that are running right now, the same list as a stack trace. **BREAKPOINTS** lists all your red dots.',
        '**Stepping** means running a little and pausing again. **Step Over** (F10) runs the current line completely and stops at the next one. **Step Into** (F11) goes into the method that the current line calls. **Step Out** (Shift+F11) runs the rest of the current method and stops back in the caller. **Continue** (F5) runs until the next breakpoint.',
        'Values that changed in the last step are highlighted in the VARIABLES panel. That is the main power of the debugger: you see every value at every step, without writing a single print and without recompiling.',
        'The **DEBUG CONSOLE** tab (at the bottom) lets you type a Java expression while paused, such as `i * i` or `limit - i`, and see its value. It uses the variables of the current frame.'
      ],
      why: 'Prints answer one question per run. The debugger answers all of them in one run, and you can follow the program into methods you did not even suspect.',
      whenUse: 'When you do not know what to print, when many values matter, or when you want to follow a call into another method step by step.',
      syntax: 'Click left of a line number → red dot. Click **Debug** above `main` (or press F5). Paused: F10 Step Over, F11 Step Into, Shift+F11 Step Out, F5 Continue, Shift+F5 Stop.',
      fileName: 'StepDemo.java',
      code: `public class StepDemo {
    static int square(int n) {
        int result = n * n;
        return result;
    }

    static int sumOfSquares(int limit) {
        int sum = 0;
        for (int i = 1; i <= limit; i++) {
            sum += square(i);
        }
        return sum;
    }

    public static void main(String[] args) {
        int total = sumOfSquares(3);
        System.out.println("Sum of squares 1..3 = " + total);
    }
}`,
      output: 'Sum of squares 1..3 = 14',
      codeSummary: 'A program with three methods that call each other: `main` calls `sumOfSquares`, which calls `square` three times. It is small, but it has everything you need to practise stepping over, into and out of methods.',
      codeExplanation: [
        { label: 'Line 16', code: 'int total = sumOfSquares(3);', text: 'Put your first breakpoint here. When the program pauses, `total` is not in VARIABLES yet, because this line has not run.' },
        { label: 'Line 8', code: 'int sum = 0;', text: 'Step Into (F11) on line 16 lands here. VARIABLES shows `limit = 3`.' },
        { label: 'Line 9', code: 'for (int i = 1; i <= limit; i++) {', text: 'The debugger stops on this line once per round, because `i++` and `i <= limit` run here.' },
        { label: 'Line 10', code: 'sum += square(i);', text: 'Step Over (F10) here runs `square(i)` completely; Step Into (F11) goes inside `square`.' },
        { label: 'Line 3', code: 'int result = n * n;', text: 'Inside `square`. CALL STACK now shows three frames: `square`, `sumOfSquares`, `main`.' },
        { label: 'Line 4', code: 'return result;', text: 'Step Out (Shift+F11) here returns to line 10 in `sumOfSquares`.' },
        { label: 'Line 12', code: 'return sum;', text: 'After three rounds, VARIABLES shows `sum = 14`.' },
        { label: 'Line 17', code: 'System.out.println("Sum of squares 1..3 = " + total);', text: 'Press Continue (F5): the program runs to the end and the output appears in the DEBUG CONSOLE or TERMINAL tab.' }
      ],
      sections: [
        {
          title: 'Set up once',
          bullets: [
            'Install the **Extension Pack for Java** (by Microsoft): click the Extensions icon (four squares) in the left bar, search `Extension Pack for Java`, click **Install**.',
            'Open the folder with your file: **File → Open Folder…**, pick the folder, then click `StepDemo.java` in the Explorer.',
            'Wait until the status bar at the bottom shows that Java is ready (a thumbs-up or `Java: Ready`). Now the words **Run | Debug** appear above `public static void main`.'
          ],
          tip: 'Those two words are called a **CodeLens**: small clickable links above a line. **Run** starts the program normally; **Debug** starts it under the debugger.'
        },
        {
          title: 'Set a breakpoint and start',
          bullets: [
            'Move the mouse left of the number **16**. A faint red dot appears. Click it: the dot turns bright red. That is your breakpoint.',
            'Click **Debug** above `main` (or press **F5**, or choose **Run → Start Debugging**).',
            'The program starts and pauses. Line 16 is highlighted in yellow with a small arrow. The left side switches to the **Run and Debug** view.',
            'A small toolbar floats at the top of the editor. Its buttons control the paused program.'
          ],
          warn: 'If you click **Run** instead of **Debug**, the program ignores every red dot and runs to the end. Only **Debug** pauses.'
        },
        {
          title: 'The toolbar buttons',
          table: {
            head: ['Button (icon)', 'Key (Ubuntu / Windows)', 'What it does'],
            rows: [
              ['Continue (▶ triangle)', 'F5', 'runs until the next breakpoint or the end'],
              ['Step Over (arc arrow over a dot)', 'F10', 'runs the current line completely, pauses on the next line'],
              ['Step Into (arrow down to a dot)', 'F11', 'if the line calls your method, goes inside and pauses on its first line'],
              ['Step Out (arrow up from a dot)', 'Shift+F11', 'finishes the current method, pauses back in the caller'],
              ['Restart (circle arrow)', 'Ctrl+Shift+F5', 'starts the program again from the beginning'],
              ['Stop (red square)', 'Shift+F5', 'ends the program and the debug session']
            ],
            note: 'On a Mac the same keys work, but you may need to hold `fn` for F5, F10 and F11, and Restart is Cmd+Shift+F5.'
          }
        },
        {
          title: 'Over, into, out: what happens',
          text: ['You are paused on line 10, `sum += square(i);`. The three step buttons give three different journeys.'],
          mermaid: `sequenceDiagram
  participant S as sumOfSquares line 10
  participant Q as square
  Note over S: paused on line 10
  S->>Q: Step Into (F11): pause on line 3
  Q-->>S: Step Out (Shift+F11): back on line 10
  Note over S: Step Over (F10) runs square unseen
  Note over S: and pauses on the next line`,
          diagramNote: 'Step Over still runs `square`. It only does not stop inside it. Use Step Into when you suspect the called method; use Step Over when you trust it.'
        },
        {
          title: 'Read the panels while you step',
          text: ['Start at the breakpoint on line 16. Each row is one button press. The VARIABLES column shows what the panel lists after that press.'],
          table: {
            head: ['You press', 'Paused on', 'VARIABLES shows', 'CALL STACK top'],
            rows: [
              ['Debug (start)', 'line 16', '`args = String[0]`', '`main`'],
              ['F11 Step Into', 'line 8', '`limit = 3`', '`sumOfSquares`'],
              ['F10 Step Over', 'line 9', '`limit = 3`, `sum = 0`', '`sumOfSquares`'],
              ['F10 Step Over', 'line 10', '`sum = 0`, `i = 1`', '`sumOfSquares`'],
              ['F11 Step Into', 'line 3', '`n = 1`', '`square`'],
              ['Shift+F11 Step Out', 'line 10', '`sum = 0`, `i = 1`', '`sumOfSquares`'],
              ['F10, F10', 'line 10', '`sum = 1`, `i = 2`', '`sumOfSquares`'],
              ['F5 Continue', '(end)', 'program finished', '(none)']
            ],
            note: 'VS Code sometimes pauses on the same line twice, for example on line 10 after Step Out, because the `sum +=` part still has to run. That is normal.'
          },
          bullets: [
            '**WATCH:** click the **+** in the WATCH panel, type `i * i`, press Enter. It updates on every step.',
            '**Hover:** while paused, rest the mouse on a variable in the editor. A small box shows its value.',
            '**CALL STACK:** click the `main` frame while paused in `square`. VARIABLES now shows `main`\'s variables. Click `square` again to go back.',
            '**Change a value:** double-click `sum` in VARIABLES, type `100`, press Enter. The program goes on with the new value. Good for "what if" tests.'
          ]
        }
      ],
      technical: [
        'VS Code does not run Java itself. The Java extension starts your program with the **Java Debug Wire Protocol** (JDWP) turned on, an option of the JVM that lets another program connect, set breakpoints, pause threads and read variables. VS Code talks to the extension through the **Debug Adapter Protocol**, the same protocol it uses for every language.',
        'A breakpoint is stored as "class + line". When the JVM loads that class, the debugger looks up the bytecode position for that line in the **LineNumberTable** and asks the JVM to pause there. If a line has no code (an empty line or a lone `}`), the breakpoint moves to the next line with code or shows as grey.',
        'Variable names in VARIABLES come from the **LocalVariableTable**, which the compiler writes when it compiles with debug information (`javac -g`). The Java extension compiles with it, which is why the debugger knows `sum` and `i` by name.'
      ],
      tryIt: {
        steps: [
          'Open `StepDemo.java` in VS Code and set a breakpoint on line 16.',
          'Click **Debug** above `main`. Press F11 once and look at VARIABLES.',
          'Press F10 twice, then F11. Look at CALL STACK.',
          'Add `i * i` to WATCH. Press Shift+F11, then F10 a few times and watch `sum` and `i * i` change.',
          'Press F5.'
        ],
        see: '`limit = 3` after the first F11, three frames (`square`, `sumOfSquares`, `main`) after the second F11, `sum` growing 0 → 1 → 5 → 14, and finally `Sum of squares 1..3 = 14`.'
      },
      check: [
        { q: 'The program is paused on a yellow line. Has that line run yet?', a: 'No. The debugger pauses before the highlighted line runs.' },
        { q: 'You are paused on `sum += square(i);` and you trust `square`. Which key do you press?', a: 'F10 Step Over. It runs the whole line, including `square`, and pauses on the next line.' },
        { q: 'You stepped into a method by mistake. How do you get out fast?', a: 'Shift+F11 Step Out. It finishes the method and pauses back in the caller.' }
      ],
      keyPoints: [
        'Red dot = breakpoint; start with **Debug**, not Run.',
        'Yellow line = paused before it runs.',
        'F10 over, F11 into, Shift+F11 out, F5 continue.',
        'VARIABLES, WATCH and CALL STACK show everything at once.',
        'No prints to add, no code to clean up afterwards.'
      ],
      commonMistakes: [
        'Pressing **Run** instead of **Debug**. Fix: use the **Debug** CodeLens or F5.',
        'Setting a breakpoint on an empty line or a lone `}`. Fix: put it on a line with a statement.',
        'Pressing F11 on `System.out.println(...)` and landing in the JDK. Fix: press Shift+F11 to come back; use F10 on lines you trust.',
        'Stepping 500 times through a long loop. Fix: use a conditional breakpoint (next lesson).'
      ],
      related: ['conditional-breakpoints', 'print-debugging', 'stack-traces']
    }
  ]);
})();
