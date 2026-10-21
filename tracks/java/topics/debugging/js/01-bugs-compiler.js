// Debugging, part 1: what a bug is, and how to read compiler messages.
(function () {
  Java.addCoreTopic('debugging', {
    label: 'Debugging',
    headline: 'Debugging,',
    accent: 'small calm steps.',
    intro: 'Learn what bugs are, how to read compiler messages and stack traces, and how to find a wrong line with prints, the VS Code debugger and a calm step-by-step loop.',
    overview: 'Start with the three kinds of bugs and the messages Java gives you. Then learn the debugging loop, print debugging and the debugger. The last lessons put it all together on one real bug. Most examples are Java programs; terminal commands are marked as Bash.',
    tryIt: {
      steps: [
        'Open the lesson "Worked Example: The Wrong Average" and copy `AverageBug.java` into a new folder.',
        'Run it with `javac AverageBug.java` and `java AverageBug`. Write down what you expected and what you got.',
        'Add one labelled print inside the loop: `System.out.println("DEBUG i=" + i + " score=" + scores[i]);`. Run again.',
        'Look at which `i` values appear. Find the wrong condition, fix it, run again, then delete the DEBUG line.'
      ],
      see: 'before the fix: `DEBUG i=0` and `DEBUG i=1` only, and an average of `56.666666666666664`. After the fix: `Average: 90.0`.'
    },
    check: [
      { q: 'The compiler prints 5 errors. Which one do you fix first, and why?', a: 'The first one. Later errors are often follow-up errors caused by the first. Fix it, compile again, and read the new list.' },
      { q: 'A program crashes with a long stack trace. Which two lines do you read first?', a: 'The first line (exception type and message: what went wrong) and the first `at` line that names a file you wrote (where it went wrong in your code).' },
      { q: 'The program runs, prints no error, but the answer is wrong. What kind of bug is that, and what is your first step?', a: 'A logic error. First reproduce it: write down the input, the expected output and the real output. Then make the input as small as possible.' },
      { q: 'What is the difference between Step Over (F10) and Step Into (F11)?', a: 'Step Over runs the whole current line, including any method it calls, and stops on the next line. Step Into goes inside the method that the line calls and stops on its first line.' },
      { q: 'Your `assert` never fails, even with bad input. What is the most likely reason?', a: 'Assertions are off by default. Run the program with `java -ea ClassName` (or add `-ea` to `vmArgs` in VS Code).' }
    ]
  }, [
    {
      id: 'what-is-a-bug',
      title: 'What a Bug Is',
      category: 'concept',
      icon: '🐞',
      tagline: 'Three kinds: compile, crash, wrong answer',
      realWorld: 'A recipe for pancakes. A word is smudged so you cannot read it (you notice before you start). You run out of eggs in the middle (you stop while cooking). Or you follow every step, but the recipe says salt where it meant sugar (the pancakes are finished and taste wrong).',
      kid: [
        'A program is a list of steps for the computer. A **bug** is a step that is wrong.',
        'Sometimes the computer says "I cannot even read this" before it starts. Sometimes it starts, then stops in the middle and shouts "help!". And sometimes it does every step happily, but the answer is wrong, and it does not even notice.',
        'Debugging means playing detective: you find the wrong step and fix it.'
      ],
      definition: 'A **bug** is a mistake in a program that makes it behave differently from what you meant. Java bugs come in three kinds: **compile errors**, **runtime exceptions** and **logic errors**.',
      explain: [
        'A **compile error** is found by `javac`, the compiler, before your program runs at all. The code breaks a rule of the Java language: a missing `;`, a misspelled name, a `String` where an `int` must go. No `.class` file is made, so there is nothing to run.',
        'A **runtime exception** happens while the program runs. The code is valid Java, but one step cannot be done: dividing by zero, reading index 5 of an array with 3 items, calling a method on `null`. The JVM (the Java Virtual Machine, the program that runs your `.class` files) stops and prints a **stack trace**: a report of what went wrong and where. You met exceptions in [Exceptions](../exceptions/index.html).',
        'A **logic error** is the hardest kind. The program compiles, runs and finishes without any message, but the result is wrong. `3 + 4` where you meant `3 * 4`. A loop that stops one step too early. Java cannot find these for you, because the code does exactly what it says. Only you know what you meant.',
        '**Debugging** is the work of finding and fixing bugs. The word comes from the early days of computers, when engineers once found a real moth stuck inside a machine and taped it into their logbook as the "first actual case of bug being found".',
        'The good news: compile errors and runtime exceptions come with a message that names a line. Logic errors need your tools: prints, the debugger and careful thinking. The rest of this topic teaches all of them.'
      ],
      why: 'Every programmer writes bugs every day. Knowing the kind of bug tells you which tool to pick and where to look first.',
      whenUse: 'Every time a program does not do what you expect. Ask first: does it compile? Does it crash? Or is the answer wrong?',
      syntax: 'No new Java syntax. The question to ask is: did `javac` fail (compile error), did `java` stop with a stack trace (runtime exception), or did it finish with a wrong result (logic error)?',
      fileName: 'BugKinds.java',
      code: `public class BugKinds {
    // Should return the area of a rectangle.
    static int area(int width, int height) {
        return width + height;   // logic error: + instead of *
    }

    public static void main(String[] args) {
        int result = area(3, 4);
        System.out.println("Area of 3 x 4: " + result);
        System.out.println("Expected:      12");
    }
}`,
      output: `Area of 3 x 4: 7
Expected:      12`,
      codeSummary: 'This program compiles and runs without any error message. It still has a bug: a logic error. It prints 7 where the right answer is 12.',
      codeExplanation: [
        { label: 'Line 1', code: 'public class BugKinds {', text: 'A normal class. The file must be called `BugKinds.java`.' },
        { label: 'Line 3', code: 'static int area(int width, int height) {', text: 'A method that should compute width times height.' },
        { label: 'Line 4', code: 'return width + height;', text: 'The bug. The code adds instead of multiplying. Java is happy: `+` on two `int`s is valid.' },
        { label: 'Line 8', code: 'int result = area(3, 4);', text: 'Calls the method with a small input where you know the answer by heart: 12.' },
        { label: 'Line 9', code: 'System.out.println("Area of 3 x 4: " + result);', text: 'Prints what the program really computed: 7.' },
        { label: 'Line 10', code: 'System.out.println("Expected:      12");', text: 'Prints what you expected right below it. Seeing both side by side is the first step of finding a logic error.' },
        { label: 'Fix', code: 'return width * height;', text: 'Change `+` to `*`, run again, and both lines show 12.' }
      ],
      sections: [
        {
          title: 'The three kinds side by side',
          text: ['Each kind shows up at a different moment and gives you a different clue.'],
          table: {
            head: ['Kind', 'When you notice', 'What you see', 'Example', 'Who finds it'],
            rows: [
              ['Compile error', 'when you run `javac`', '`File.java:5: error: ...` and no `.class` file', '`int age = "9";`', 'the compiler'],
              ['Runtime exception', 'while `java` runs', '`Exception in thread "main" ...` and a stack trace', '`int x = 10 / 0;`', 'the JVM'],
              ['Logic error', 'when you read the result', 'nothing: a wrong number or text', '`width + height` instead of `width * height`', 'only you (or a test)']
            ],
            note: 'Testing (a later topic) writes down the expected answers so that the computer can check logic errors for you.'
          }
        },
        {
          title: 'Where each kind appears on the way',
          text: ['Your code takes a trip from the editor to the answer. Each kind of bug can stop it at a different point.'],
          mermaid: `flowchart LR
  A["You write Code.java"] --> B["javac Code.java"]
  B -->|"rule broken"| C["Compile error"]
  B -->|"OK: Code.class"| D["java Code"]
  D -->|"a step is impossible"| E["Runtime exception"]
  D -->|"finishes"| F["Output"]
  F -->|"not what you meant"| G["Logic error"]
  F -->|"what you meant"| H["Correct"]`,
          diagramNote: 'Read from left to right. The later a bug shows up, the less help Java can give you. A compile error names the line. A logic error names nothing.'
        },
        {
          title: 'A runtime exception in action',
          text: [
            'This program compiles fine. It crashes on the second division, because dividing an `int` by zero is impossible.',
            'Notice that the first line is printed. The program runs line by line until the impossible step, then stops. The last `println` never runs.'
          ],
          fileName: 'Crash.java',
          code: `public class Crash {
    public static void main(String[] args) {
        int apples = 10;
        int friends = 2;
        System.out.println("Each friend gets " + apples / friends);

        friends = 0;
        System.out.println("Each friend gets " + apples / friends);
        System.out.println("This line never runs.");
    }
}`,
          output: `Each friend gets 5
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at Crash.main(Crash.java:8)`,
          tip: 'The last line, `at Crash.main(Crash.java:8)`, is the address of the crash: class `Crash`, method `main`, file `Crash.java`, line 8. The lesson "Stack Traces as a Map" reads longer ones.'
        },
        {
          title: 'Which tool for which kind?',
          bullets: [
            '**Compile error:** read the message, go to the line and the caret `^`, fix the first error, compile again.',
            '**Runtime exception:** read the first line of the stack trace (what) and the first `at` line in your own file (where).',
            '**Logic error:** compare expected and real output, shrink the input, then use prints or the debugger to watch the values change.'
          ],
          warn: 'A program that prints no error is not proven correct. "It ran" only means it had no compile error and no exception.'
        }
      ],
      technical: [
        '`javac` reads your source text in passes. First it **parses**: it checks that the words and symbols form valid Java sentences (a missing `;` or `}` fails here). Then it **attributes**: it looks up every name and checks every type (`cannot find symbol` and `incompatible types` come from here). Then it checks the **flow**, such as "every path returns a value". Only if all of this passes does it write bytecode into a `.class` file.',
        'At run time the JVM executes bytecode. Some instructions can fail: `idiv` (integer division) throws `ArithmeticException` when the divisor is 0; reading an array element checks the index and throws `ArrayIndexOutOfBoundsException`. The JVM creates an exception object, records the current call stack in it, and if nobody catches it, prints that record as the stack trace and ends the program.',
        'For a logic error there is no failing instruction. `iadd` (add) and `imul` (multiply) are both perfectly valid. That is why no tool can report a logic error by itself: it needs to know what you meant, and that lives only in your head or in a test.'
      ],
      tryIt: {
        steps: [
          'Copy `BugKinds.java`, compile it with `javac BugKinds.java` and run it with `java BugKinds`.',
          'Change line 4 to `return width * height`, without the `;`. Compile. Read the message.',
          'Add the `;` back. Compile and run.',
          'Now change `area(3, 4)` to `area(3, 4) / 0`. Compile and run.'
        ],
        see: 'first a logic error (`7`), then a compile error (`\';\' expected`), then the correct `12`, and last a runtime exception (`ArithmeticException: / by zero`).'
      },
      check: [
        { q: '`int count = "three";` Which kind of bug is this?', a: 'A compile error. `javac` refuses it: `incompatible types: String cannot be converted to int`.' },
        { q: 'A program prints `Total: -5` for a shopping cart. There is no error message. Which kind of bug?', a: 'A logic error. The code ran to the end, but the result is not what you meant.' },
        { q: 'Why can Java not find logic errors for you?', a: 'Because the code is valid and every step can be done. Only you know what the right answer should be.' }
      ],
      keyPoints: [
        'A bug is a difference between what the program does and what you meant.',
        'Compile errors: found by `javac` before the program runs.',
        'Runtime exceptions: the JVM stops and prints a stack trace.',
        'Logic errors: no message at all, only a wrong result.',
        'Always write down the expected result next to the real one.'
      ],
      commonMistakes: [
        'Thinking "no error message" means "correct". Fix: compare the output with an answer you know, such as `area(3, 4)` must be `12`.',
        'Running `java BugKinds` after `javac` failed, and running the old `.class` file. Fix: only run when `javac` printed nothing.',
        'Trying to fix a logic error by reading the code only. Fix: print or watch the values, as the next lessons show.'
      ],
      related: ['compiler-errors', 'stack-traces', 'Exceptions']
    },
    {
      id: 'compiler-errors',
      title: 'Read Compiler Errors',
      category: 'concept',
      icon: 'javac',
      tagline: 'File, line, caret, message: fix the first one',
      realWorld: 'A teacher marks your homework with a red pen. She writes the page number, draws an arrow to the exact word, and writes a short note: "missing full stop". You fix that one, and the next mark often disappears with it.',
      kid: [
        'Before Java runs your program, a careful reader called the **compiler** reads every line.',
        'If something is wrong, it tells you three things: the line, a little arrow `^` under the spot, and what it thinks is wrong.',
        'It sometimes gets confused after the first mistake, like a reader who lost their place. So you always fix the first note first, then ask it to read again.'
      ],
      definition: 'When `javac` finds a compile error it prints `FileName.java:LINE: error: MESSAGE`, then the broken source line, then a caret `^` under the place it got stuck. Fix the **first** error, compile again, and repeat.',
      explain: [
        'A compiler message has a fixed shape. `Greeting.java:5: error: \';\' expected` means: in the file `Greeting.java`, on line 5, I expected a semicolon. The next line repeats your code. The line after that has a **caret** (`^`), the little arrow that points at the exact column.',
        'The caret marks where the compiler **noticed** the problem. That is often right after the real mistake. For `\';\' expected` the caret sits at the end of the line where the `;` is missing. For a missing `}` the caret can sit at the very end of the file.',
        'Some messages have extra lines. `cannot find symbol` adds `symbol:` (the name it could not find) and `location:` (where it looked). These two lines usually show a typo at once: `symbol: method lenght()` should be `length()`.',
        'The compiler works in rounds. If the file has a syntax error (a broken sentence, such as a missing `;`), it often stops there and does not report type errors yet. So after you fix one error, new ones can appear. That is normal progress, not new damage.',
        'The last line counts the errors: `1 error`, `3 errors`. Compile again after every fix until `javac` prints nothing at all. Silence means success: a `.class` file was written.'
      ],
      why: 'The compiler finds many mistakes for free, before your program can do anything wrong. Reading its message well saves you from guessing.',
      whenUse: 'Every time `javac` prints `error:`. Also for `warning:` lines, which point at code that compiles but is risky.',
      syntax: '`FileName.java:LINE: error: MESSAGE`, then the source line, then `^` under the spot. Fix → `javac FileName.java` again → repeat until it prints nothing.',
      fileName: 'Greeting.java',
      noRun: true,
      code: `public class Greeting {
    public static void main(String[] args) {
        String name = "Ava";
        int age = "9";
        System.out.println("Hello, " + nme)
        System.out.println(name + " is " + age);
    }
}`,
      output: `Greeting.java:5: error: ';' expected
        System.out.println("Hello, " + nme)
                                           ^
1 error`,
      codeSummary: 'This program does not compile on purpose (so the page does not run it). It has three mistakes, but `javac` reports only one in the first round. Below, the output box shows exactly what `javac Greeting.java` prints.',
      codeExplanation: [
        { label: 'Message', code: "Greeting.java:5: error: ';' expected", text: 'File `Greeting.java`, line 5, a semicolon is missing. Go to line 5 in your editor.' },
        { label: 'Source', code: 'System.out.println("Hello, " + nme)', text: 'The compiler repeats the line so you do not need to count.' },
        { label: 'Caret', code: '^', text: 'Points right after the `)`. That is where the `;` must go.' },
        { label: 'Line 4', code: 'int age = "9";', text: 'Also wrong (a `String` into an `int`), but not reported yet. The compiler stopped at the syntax error first.' },
        { label: 'Line 5', code: '+ nme', text: 'Also wrong (a typo for `name`), also not reported yet.' },
        { label: 'Count', code: '1 error', text: 'One error in this round. Fix it and compile again: the next round shows the other two.' }
      ],
      sections: [
        {
          title: 'Round 2 and round 3: fix, compile, repeat',
          text: ['Add the `;` at the end of line 5 and run `javac Greeting.java` again. Now the compiler gets past the syntax check and looks at names and types:'],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `javac Greeting.java`,
          output: `Greeting.java:4: error: incompatible types: String cannot be converted to int
        int age = "9";
                  ^
Greeting.java:5: error: cannot find symbol
        System.out.println("Hello, " + nme);
                                       ^
  symbol:   variable nme
  location: class Greeting
2 errors`,
          tip: 'Change `"9"` to `9` and `nme` to `name`. The third `javac` prints nothing, and `java Greeting` prints `Hello, Ava` and `Ava is 9`.'
        },
        {
          title: 'The loop you repeat',
          mermaid: `flowchart TD
  A["javac File.java"] --> B{"Any output?"}
  B -->|"no"| C["Success: run java File"]
  B -->|"yes"| D["Read the FIRST error"]
  D --> E["Go to file:line, look at the caret"]
  E --> F["Fix that one thing"]
  F --> A`,
          diagramNote: 'One fix per round. Changing five things at once makes it hard to know which change helped, and which one broke something new.'
        },
        {
          title: 'The most common messages and their fix',
          table: {
            head: ['Message', 'What it means', 'Typical cause', 'Fix'],
            rows: [
              ["`';' expected`", 'a statement is not finished', 'missing `;` at the end of the line', 'add `;` where the caret points'],
              ['`cannot find symbol`', 'a name is unknown here', 'typo (`nme`, `lenght()`), missing `import`, variable declared in another block', 'read `symbol:`, fix the spelling or the import'],
              ['`incompatible types: String cannot be converted to int`', 'the value has the wrong type', '`int age = "9";`', 'use the right type: `int age = 9;` or `Integer.parseInt("9")`'],
              ['`missing return statement`', 'a path through the method returns nothing', 'forgot `return sum;` at the end', 'add a `return` on every path'],
              ['`variable count might not have been initialized`', 'a variable is read before it gets a value', '`int count;` then `println(count)`', 'give it a start value: `int count = 0;`'],
              ['`reached end of file while parsing`', 'a `{` was never closed', 'missing `}`', 'count braces; let the editor format the file'],
              ['`class Right is public, should be declared in a file named Right.java`', 'class name and file name differ', 'renamed the class, not the file', 'make both names the same'],
              ['`unreachable statement`', 'a line can never run', 'code after `return` or `break`', 'delete it or move it before the `return`']
            ],
            note: 'All messages above are real `javac` output. If your terminal shows them in another language, run `javac -J-Duser.language=en File.java` to get the English text, which is easier to search for.'
          }
        },
        {
          title: 'Two errors in one file, one at a time',
          text: ['This file has a method without a `return` and a variable without a value. Both are reported in the same round, because neither is a syntax error.'],
          fileName: 'Total.java',
          noRun: true,
          code: `public class Total {
    static int total(int[] prices) {
        int sum = 0;
        for (int price : prices) {
            sum += price;
        }
    }

    public static void main(String[] args) {
        int count;
        System.out.println(count);
    }
}`,
          output: `Total.java:7: error: missing return statement
    }
    ^
Total.java:11: error: variable count might not have been initialized
        System.out.println(count);
                           ^
2 errors`,
          tip: 'The caret of `missing return statement` points at the closing `}` of the method: that is where the compiler noticed that the method ends without a `return`. The fix goes right above it: `return sum;`.'
        },
        {
          title: 'Warnings: compiles, but risky',
          text: [
            'A **warning** does not stop compiling, but it points at code that may cause a bug later. By default `javac` only prints a short `Note:`. The flag `-Xlint:all` asks for every warning in full.',
            'Here a list was created without `<String>`. That is called a **raw type**: Java can no longer check what goes into the list.'
          ],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `javac -Xlint:all Lint.java`,
          output: `Lint.java:6: warning: [rawtypes] found raw type: List
        List names = new ArrayList();
        ^
  missing type arguments for generic class List<E>
  where E is a type-variable:
    E extends Object declared in interface List`,
          warn: 'The output above is shortened to the first warning. The fix is `List<String> names = new ArrayList<>();`, as in [Collections](../collections/index.html).'
        }
      ],
      technical: [
        '`javac` has a **parser** that turns text into a tree of Java constructs. When the text does not fit the grammar, the parser reports the first point where it cannot go on, tries to recover, and often gives up on further checks. That is why syntax errors come alone and why a missing `}` can make it report the end of the file.',
        'After parsing, the **attribution** step looks up every name in a symbol table (the list of known classes, methods and variables in each scope) and checks every type. A miss produces `cannot find symbol`; a type mismatch produces `incompatible types`. The **flow analysis** step then checks definite assignment (`might not have been initialized`), reachability (`unreachable statement`) and returns (`missing return statement`).',
        'Messages come from a resource file in the JDK and are translated into the language of your system. The structure `file:line: error: text` is the same in every language, and editors such as VS Code read it to draw a red squiggle under the same spot.'
      ],
      tryIt: {
        steps: [
          'Save the broken `Greeting.java` above and run `javac Greeting.java`.',
          'Fix only the `;`. Compile again and read both new errors.',
          'Fix `"9"` and `nme`. Compile. Then run `java Greeting`.'
        ],
        see: '`1 error`, then `2 errors`, then no output from `javac`, and finally `Hello, Ava` and `Ava is 9`.'
      },
      check: [
        { q: 'What do the three parts of `Calc.java:12: error: cannot find symbol` tell you?', a: 'The file (`Calc.java`), the line (12) and the problem (a name the compiler does not know there).' },
        { q: 'You fixed one error and now there are two. Did you make it worse?', a: 'Usually not. The compiler got further and can now check names and types it skipped before.' },
        { q: 'The message says `reached end of file while parsing`, and the caret is on the last line. Where is the real mistake?', a: 'Somewhere earlier: a `{` that was never closed. Count the braces or let the editor format the code.' }
      ],
      keyPoints: [
        'Read file, line, caret and message.',
        'Fix the first error first, then compile again.',
        'The caret marks where the compiler noticed the problem, often right after the mistake.',
        '`symbol:` and `location:` lines show the misspelled name.',
        'No output from `javac` means success.'
      ],
      commonMistakes: [
        'Starting with the last message in the list. Fix: scroll up and start with the first.',
        'Changing many lines before compiling again. Fix: one fix, one `javac`.',
        'Looking only at the caret column for `\';\' expected`. Fix: the `;` belongs at the end of the line before the caret, or at the caret.',
        'Ignoring `Note: ... uses unchecked or unsafe operations`. Fix: compile with `-Xlint:all` and read the warning.'
      ],
      related: ['what-is-a-bug', 'Syntax Fundamentals', 'Getting Started on Ubuntu']
    }
  ]);
})();
