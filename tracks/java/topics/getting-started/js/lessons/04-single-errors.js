// Lessons 07–08: running one file directly, and reading the first errors.
(function () {
  const topic = Java.topics.gettingStarted;
  const glossary = topic.glossary;

  topic.lessons.push(
    {
      id: 'run-single-file',
      num: '07',
      title: 'Run One File with java Hello.java',
      category: 'firstRun',
      icon: '▶',
      tagline: 'Compile and run in one command',
      realWorld: 'A microwave meal: you do not cook it first and then heat it; one button does both. For a quick snack that is perfect. For a big family dinner you still use the kitchen.',
      kid: [
        'Usually Java needs two steps: first translate, then run. But for a small program there is a shortcut.',
        'You give java the whole file name, with .java at the end. Java translates it quietly in its head, runs it at once and throws the translation away.',
        'No extra file appears in your folder. It is great for quick tries. For bigger programs with many files you still use the two steps.'
      ],
      definition: '`java Hello.java` compiles `Hello.java` in memory and runs it right away, in one command. No `.class` file is written. This works for programs that fit in one file.',
      explain: [
        'This is the **source-file mode** of the `java` launcher. It exists since Java 11. The launcher sees the `.java` ending and knows: "this is source code, compile it first".',
        'The compiled bytecode stays in the computer\'s memory (RAM) and is gone when the program ends. Your folder stays clean: only `Hello.java`.',
        'A single file may hold more than one class. In Java 21 the **first** class in the file must contain `main`; that is the one that runs.',
        'For programs made of several files you use `javac` and `java Name` (later, build tools such as Maven do it for you; see [Maven & Gradle Basics](../build-tools/index.html)). Compile errors look the same in both ways.'
      ],
      why: 'Trying out a small idea becomes one command instead of two, and you can never run an old `.class` file by mistake.',
      whenUse: 'For one-file programs: exercises, quick tests, small tools. Use `javac` when a program has several files or when you want to keep the `.class` files.',
      syntax: '`java FileName.java` (with the ending). Words after it go into `args`: `java Greet.java Sam`.',
      fileName: 'Rocket.java',
      code: `public class Rocket {
    public static void main(String[] args) {
        System.out.println("Countdown!");
        System.out.println("3...");
        System.out.println("2...");
        System.out.println("1...");
        System.out.println("Lift off!");
    }
}`,
      output: `Countdown!
3...
2...
1...
Lift off!`,
      codeSummary: 'An ordinary program. The only new thing is how you start it: `java Rocket.java`, with the ending. The output is the same as with `javac` + `java Rocket`.',
      codeExplanation: [
        { label: 'Line 1', code: 'public class Rocket {', text: 'The first class in the file. In source-file mode this is the one Java runs.' },
        { label: 'Line 2', code: 'public static void main(String[] args) {', text: 'The same main line as always. Source-file mode needs it too.' },
        { label: 'Line 3', code: 'System.out.println("Countdown!");', text: 'The first output line.' },
        { label: 'Lines 4–6', code: 'System.out.println("3...");', text: 'Three lines that count down, in the order written.' },
        { label: 'Line 7', code: 'System.out.println("Lift off!");', text: 'The last line. Then `main` ends and the JVM stops.' },
        { label: 'Command', code: 'java Rocket.java', text: 'Compile in memory and run, in one step. Note the `.java` ending: here it is required.' },
        { label: 'Compare', code: 'javac Rocket.java && java Rocket', text: 'The two-step way. `&&` means "run the second command only if the first worked".' }
      ],
      sections: [
        {
          title: 'Two ways to the same output',
          text: [
            'Both ways compile and run. The difference is where the bytecode goes.'
          ],
          mermaid: 'flowchart LR\n  F["Rocket.java"] --> A["javac Rocket.java"]\n  A --> C["Rocket.class on disk"]\n  C --> R["java Rocket"]\n  R --> O["output"]\n  F --> S["java Rocket.java"]\n  S --> M["bytecode in memory only"]\n  M --> O',
          diagramNote: 'Top path: two commands and a file on disk. Bottom path: one command, nothing written.',
          table: {
            head: ['', '`javac` + `java Rocket`', '`java Rocket.java`'],
            rows: [
              ['Commands', 'two', 'one'],
              ['`.class` file on disk', 'yes', 'no'],
              ['Several files', 'yes', 'no (one file in Java 21)'],
              ['Starts fast next time', 'yes, already compiled', 'compiles again on every run'],
              ['Good for', 'real projects', 'quick tries and exercises']
            ]
          }
        },
        {
          title: 'Nothing lands on disk',
          text: [
            'Watch the folder before and after. `ls` shows only the source file both times.'
          ],
          codeLanguage: 'bash',
          fileName: 'single.sh',
          code: `ls
java Rocket.java
ls`,
          output: `Rocket.java
Countdown!
3...
2...
1...
Lift off!
Rocket.java`
        },
        {
          title: 'Several classes in one file',
          text: [
            'One file can hold more than one class. Only one of them may be `public`, and its name gives the file name. In source-file mode the first class runs, so put the class with `main` at the top.',
            '`Dog.bark();` calls a method `bark` that lives in the class `Dog`. You learn to write your own methods in [Methods](../methods/index.html).'
          ],
          fileName: 'Pets.java',
          code: `public class Pets {
    public static void main(String[] args) {
        System.out.println("The first class in the file runs.");
        Dog.bark();
        Cat.meow();
    }
}

class Dog {
    static void bark() {
        System.out.println("Dog says: woof");
    }
}

class Cat {
    static void meow() {
        System.out.println("Cat says: meow");
    }
}`,
          output: `The first class in the file runs.
Dog says: woof
Cat says: meow`,
          tip: 'With `javac Pets.java` you get three files: `Pets.class`, `Dog.class` and `Cat.class`. Each class gets its own `.class` file.'
        },
        {
          title: 'A mistake in source-file mode',
          text: [
            'If the file does not compile, you see the same error as from `javac`, plus one more line: `error: compilation failed`. Nothing runs.'
          ],
          codeLanguage: 'bash',
          fileName: 'broken.sh',
          code: 'java Hello.java',
          output: `Hello.java:3: error: ';' expected
        System.out.println("Hello, World!")
                                           ^
1 error
error: compilation failed`,
          tip: 'Read the first line, fix it, and run `java Hello.java` again. The lesson "If Something Breaks" shows the common messages.'
        },
        {
          title: 'Deeper: a Java file that runs like a script',
          text: [
            'On Ubuntu a file can start with a **shebang** line: `#!` followed by the program that should run it. With `java --source 21` the file does not even need the `.java` ending.',
            'Save this as `rocket` (no ending), make it runnable with `chmod +x rocket` and start it with `./rocket`. It prints `Lift off!`.'
          ],
          fileName: 'rocket',
          noRun: true,
          code: `#!/usr/bin/java --source 21
public class Rocket {
    public static void main(String[] args) {
        System.out.println("Lift off!");
    }
}`,
          warn: 'This file is not valid for `javac`, because `#!` is not Java. Use it only with the shebang way.'
        }
      ],
      technical: [
        'In source-file mode the launcher calls the Java compiler from inside the JVM, writes the bytecode into memory and loads it with a special class loader. Then it calls `main` like always.',
        'Because nothing is saved, every run compiles again. For a small file that takes a fraction of a second; for real projects compiling once with `javac` (or a build tool) is faster.',
        'The launcher switches to source-file mode when the first argument ends in `.java`, or when you pass `--source N`. Java 22 and newer can also compile other files that the first file uses; Java 21 compiles only the one file you name.'
      ],
      tryIt: {
        steps: [
          'Save `Rocket.java` in `~/java-practice`.',
          'Run `ls`, then `java Rocket.java`, then `ls` again.',
          'Save `Pets.java` and run `java Pets.java`.',
          'Move the `Dog` class to the top of `Pets.java` (above `Pets`) and run `java Pets.java` again.'
        ],
        see: 'the countdown with no new file in the folder, the three Pets lines, and after step 4 an error, because the first class (`Dog`) has no `main`.'
      },
      check: [
        { q: 'Does `java Hello.java` create `Hello.class`?', a: 'No. The bytecode stays in memory and disappears when the program ends.' },
        { q: 'A file holds three classes. Which one runs with `java File.java` in Java 21?', a: 'The first class in the file. It must have the `main` method.' },
        { q: 'When do you still use `javac`?', a: 'When the program has several files, or when you want to keep the compiled `.class` files.' }
      ],
      keyPoints: [
        '`java Name.java` compiles in memory and runs in one step.',
        'No `.class` file is written.',
        'In Java 21 it works for one file; the first class must have `main`.',
        'Compile errors look the same, plus `error: compilation failed`.',
        'For bigger programs use `javac` and `java Name`.'
      ],
      commonMistakes: [
        'Mixing the two forms: `java Rocket` needs `Rocket.class`; `java Rocket.java` needs the source file. Pick one form and type it exactly.',
        'Putting a helper class above the class with `main`. In source-file mode the first class runs. Put the `main` class first.',
        'Expecting `java App.java` to find a second file `Helper.java` in Java 21. It does not. Compile both with `javac *.java`, then run `java App`.'
      ],
      related: ['Compile and Run', 'If Something Breaks'],
      glossary
    },
    {
      id: 'if-something-breaks',
      num: '08',
      title: 'If Something Breaks',
      category: 'help',
      icon: '!',
      tagline: 'Read the first line of the error',
      realWorld: 'When a car shows a warning light, you read which light it is before you open the hood. An error message is that warning light: it says where to look.',
      kid: [
        'Everybody makes typing mistakes. Even people who program every day. That is normal.',
        'When you make one, javac does not get angry. It writes a note: the file, the line number and what it missed. It even draws a little arrow under the spot.',
        'You read the first note, fix that one thing and try again. Step by step, until javac is quiet.'
      ],
      definition: 'A **compile error** is a mistake javac finds before the program runs. The message names the file, the line, and what is wrong, and a `^` marks the spot. Fix the first error, then compile again.',
      explain: [
        'Every javac message has the same shape: `File.java:LINE: error: MESSAGE`. Below it javac prints the line of code and a `^` (caret) under the place where it got confused. At the end it counts: `1 error`.',
        'The **line number** is where javac noticed the problem. Often the real mistake is right there; sometimes it is at the end of the line before (a missing `;` or `)`).',
        'One mistake can cause several messages, and some mistakes only show up after you fix others. So fix **only the first** error, then compile again.',
        'Not every error comes from javac. When the program is already running, a problem stops it with an **exception**, such as dividing by zero. You meet those in [Exceptions](../exceptions/index.html); here you learn to recognise them.'
      ],
      why: 'Error messages are help, not punishment. Reading them well saves you most of your debugging time.',
      whenUse: 'Every time javac or java prints something other than your output.',
      syntax: '`File.java:LINE: error: MESSAGE` → code line → `^` under the spot → `N error(s)`.',
      table: {
        label: 'Common first errors',
        head: ['You see', 'It means', 'Fix'],
        rows: [
          ['`javac: command not found`', 'The JDK is not installed.', '`sudo apt install openjdk-21-jdk`'],
          ['`error: \';\' expected`', 'A statement is missing its semicolon.', 'Add `;` where the `^` points.'],
          ['`error: cannot find symbol`', 'A name is misspelled or has wrong capitals.', 'Compare it letter by letter: `println`, `System`, `String`.'],
          ['`error: unclosed string literal`', 'A string is missing its closing `"`.', 'Add the second `"`.'],
          ['`error: reached end of file while parsing`', 'A `}` is missing at the end.', 'Count braces; add the missing `}`.'],
          ['`class Hello is public, should be declared in a file named Hello.java`', 'File name and class name differ.', 'Rename the file (or the class) so they match.'],
          ['`Could not find or load main class Hello`', 'Wrong folder, a typo, or you typed `.class`.', '`cd` to the folder, check `ls`, run `java Hello`.'],
          ['`Main method not found in class Hello`', '`main` is misspelled or its line is wrong.', 'Write `public static void main(String[] args)`.']
        ],
        note: 'The first six come from `javac` (compiling). The last two come from `java` (starting the program).'
      },
      fileName: 'Hello.java',
      noRun: true,
      code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!")
    }
}`,
      output: `Hello.java:3: error: ';' expected
        System.out.println("Hello, World!")
                                           ^
1 error`,
      codeSummary: 'This file has one mistake on purpose: line 3 has no `;`. The output panel shows what `javac Hello.java` prints. No `Hello.class` is made.',
      codeExplanation: [
        { label: 'Line 3', code: 'System.out.println("Hello, World!")', text: 'The mistake: the statement has no `;` at the end.' },
        { label: 'Error line', code: 'Hello.java:3:', text: 'The file and the line number. Open `Hello.java` and go to line 3.' },
        { label: 'Error line', code: "error: ';' expected", text: 'What is wrong: javac expected a `;` and did not find one.' },
        { label: 'Code line', code: 'System.out.println("Hello, World!")', text: 'javac repeats the line, so you see it without opening the file.' },
        { label: 'Caret', code: '^', text: 'The caret points at the exact spot: right after the `)`, where the `;` belongs.' },
        { label: 'Count', code: '1 error', text: 'How many errors javac found this time. After you fix one, others may appear.' },
        { label: 'Fix', code: 'System.out.println("Hello, World!");', text: 'Add the semicolon, save, and run `javac Hello.java` again. Silence means fixed.' }
      ],
      sections: [
        {
          title: 'The parts of an error message',
          text: [
            'Read a message from left to right, top to bottom. You only need the first three parts to find the problem.'
          ],
          mermaid: 'flowchart LR\n  A["Hello.java (which file)"] --> B["3 (which line)"]\n  B --> C["error: (a compile error)"]\n  C --> D["semicolon expected (what is wrong)"]\n  D --> E["the code line"]\n  E --> F["^ (the exact spot)"]',
          diagramNote: 'File, line, message: go there, look under the `^`, fix that one thing.'
        },
        {
          title: 'Spelling and capital letters',
          text: [
            'Java is **case-sensitive**: `System` and `system` are different words. A name that does not exist gives `cannot find symbol`. The lines `symbol:` and `location:` tell you which name and where javac looked.'
          ],
          fileName: 'Hello.java',
          noRun: true,
          code: `public class Hello {
    public static void main(String[] args) {
        System.out.printn("Hello, World!");
    }
}`,
          output: `Hello.java:3: error: cannot find symbol
        System.out.printn("Hello, World!");
                  ^
  symbol:   method printn(String)
  location: variable out of type PrintStream
1 error`,
          bullets: [
            '`system.out.println(…)` gives `error: package system does not exist`. Fix: capital S.',
            '`main(string[] args)` gives `cannot find symbol` with `symbol: class string`. Fix: `String`.',
            '`printIn` (capital i) gives `cannot find symbol` too. Fix: `println` with a small L.'
          ]
        },
        {
          title: 'Quotes and braces',
          text: [
            'Quotes and braces come in pairs. If the second one is missing, javac reads on and gets confused.',
            'A missing closing `"`: javac points at the opening quote.'
          ],
          fileName: 'Hello.java',
          noRun: true,
          code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!);
    }
}`,
          output: `Hello.java:3: error: unclosed string literal
        System.out.println("Hello, World!);
                           ^
1 error`,
          tip: 'A missing `}` at the end gives `error: reached end of file while parsing`: javac reached the end of the file and was still waiting for a `}`.'
        },
        {
          title: 'File name and class name',
          text: [
            'A public class must live in a file with its exact name. Here the class is `Hello` but the file is `Greeting.java`.'
          ],
          fileName: 'Greeting.java',
          noRun: true,
          code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
          output: `Greeting.java:1: error: class Hello is public, should be declared in a file named Hello.java
public class Hello {
       ^
1 error`,
          tip: 'Rename the file with `mv Greeting.java Hello.java`, or rename the class to `Greeting`. Either way, the names must match.'
        },
        {
          title: 'One error at a time',
          text: [
            'This file has two mistakes: line 4 misses a `;` and line 5 says `printn`. javac reports only the first one. It checks grammar before names, so the second error waits.',
            'After you add the `;` and compile again, javac shows the next one: `Two.java:5: error: cannot find symbol`. Fix it, compile again, and javac is quiet.'
          ],
          fileName: 'Two.java',
          noRun: true,
          code: `public class Two {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Bye")
        System.out.printn("x");
    }
}`,
          output: `Two.java:4: error: ';' expected
        System.out.println("Bye")
                                 ^
1 error`,
          warn: 'Do not change five things at once. Fix the first error, compile, read again. Small steps find mistakes fast.'
        },
        {
          title: 'Errors while the program runs',
          text: [
            'This program compiles fine. But dividing by zero is impossible, so the JVM stops the program at line 4 with an **exception**. The line before it already ran; the line after it never runs.',
            'Read the exception like a compile error: the name says what happened (`ArithmeticException: / by zero`), and the `at` line says where (`Crash.java:4`).'
          ],
          fileName: 'Crash.java',
          code: `public class Crash {
    public static void main(String[] args) {
        System.out.println("Before the crash");
        System.out.println(10 / 0);
        System.out.println("After the crash");
    }
}`,
          output: 'Before the crash\nException in thread "main" java.lang.ArithmeticException: / by zero\n\tat Crash.main(Crash.java:4)',
          tip: 'Compile errors: javac, before running, no `.class` file. Exceptions: java, while running, after some output. Both tell you the line.'
        }
      ],
      technical: [
        'javac first **parses** the file: it checks the grammar (semicolons, braces, quotes). If that fails, it stops and reports only grammar errors. Then it **attributes** the program: it looks up every name such as `System`, `out` and `println`. Name errors come from this second stage.',
        'That is why fixing one error can reveal new ones. It does not mean you made things worse; javac can now see further.',
        'Launcher errors (`Could not find or load main class`, `Main method not found`) come from `java` before your code starts. Exceptions come from the JVM while your code runs; the lines starting with `at` are the **stack trace**, the list of methods that were running. The [Debugging](../debugging/index.html) topic goes deeper.'
      ],
      tryIt: {
        steps: [
          'Open `Hello.java` and delete the `;` at the end of the println line. Save.',
          'Run `javac Hello.java` and find the file, the line and the `^`.',
          'Put the `;` back. Change `System` to `system`. Compile again.',
          'Fix it and remove the last `}`. Compile again.',
          'Fix everything and compile one last time.'
        ],
        see: '`\';\' expected`, then `package system does not exist`, then `reached end of file while parsing`, and finally no message at all.'
      },
      check: [
        { q: 'In `Hello.java:7: error: cannot find symbol`, which line do you open?', a: 'Line 7 of `Hello.java`.' },
        { q: 'javac shows 3 errors. Which do you fix first?', a: 'The first one. Then compile again, because the others may disappear or change.' },
        { q: 'Is `Exception in thread "main"` a compile error?', a: 'No. The program compiled and started; the JVM stopped it while it was running.' }
      ],
      keyPoints: [
        'Read the first error line: file, line number, message.',
        'Look under the `^`; sometimes the mistake is at the end of the line before.',
        'Fix one error, compile again, repeat.',
        'No output from javac means success.',
        'Exceptions happen while running; the `at` line gives the place.'
      ],
      commonMistakes: [
        'Changing many things at once. Change one thing, then compile.',
        'Reading only the last line (`1 error`). The useful part is the first line.',
        'Running `java Hello` after a failed `javac`. There is no new `.class` file yet; fix the error first.',
        'Adding a `;` after `public static void main(String[] args)`. Lines that end with `{` never get a `;`.'
      ],
      related: ['Your First Program', 'Hello World, Word by Word', 'Debugging'],
      glossary
    }
  );
})();
