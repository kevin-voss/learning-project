// Lessons 05–06: every word of Hello World, and the compile-and-run loop.
(function () {
  const topic = Java.topics.gettingStarted;
  const glossary = topic.glossary;

  topic.lessons.push(
    {
      id: 'hello-word-by-word',
      num: '05',
      title: 'Hello World, Word by Word',
      category: 'firstRun',
      icon: '{}',
      tagline: 'What every word in the first program means',
      realWorld: 'An address on a letter: country, city, street, house, name. Each part narrows it down until the postman finds the one right door. `System.out.println` works the same way.',
      kid: [
        'Your program is like a set of boxes inside boxes. The big box is the class. Inside it is a smaller box called main. Inside main are the orders, like "say hello".',
        'Curly brackets `{` and `}` are the lids of the boxes. Every box you open, you must close again.',
        'Java is a careful reader. It wants every word spelled the same way every time, with the same big and small letters. When you write it the right way, Java knows exactly where to start and what to do.'
      ],
      definition: '`public class Hello { … }` makes a class named `Hello`. `public static void main(String[] args) { … }` is the method Java starts with. `System.out.println("…");` is a statement that prints one line.',
      explain: [
        'A **keyword** is a word that Java itself owns, such as `public`, `class`, `static` and `void`. You cannot use a keyword as a name. Names you choose, such as `Hello`, are called **identifiers**.',
        '`public` means "everyone may use this". `class` starts a class. `Hello` is its name. By convention class names start with a capital letter.',
        '`static` means "this belongs to the class itself", so Java can call `main` without making anything first (objects come in [Classes & Objects](../classes-and-objects/index.html)). `void` means "this method gives no result back". `main` is the name the JVM looks for.',
        '`(String[] args)` is the **parameter list**: the method receives a list of texts called `args`. They are the words you type after the class name, such as `java Greet Sam`. `String` means text, and `[]` means "a list of".',
        '`System.out.println("Hello, World!");` reads from left to right like an address: in the class `System`, take `out` (the screen output), and call `println` with the string `"Hello, World!"`. The dots mean "the part inside".'
      ],
      why: 'When you know what each word does, error messages start to make sense, and you can change the program without guessing.',
      whenUse: 'Every Java program in this course has this outer shape. You write it at the start of every new file.',
      syntax: '`public class ClassName { public static void main(String[] args) { statement; statement; } }`',
      fileName: 'Hello.java',
      code: `// A class is a named box for code. Its name is Hello.
public class Hello {

    // main is where Java starts the program.
    public static void main(String[] args) {

        // Print one line of text, then move to the next line.
        System.out.println("Hello, World!");

    } // end of main

} // end of class Hello`,
      output: 'Hello, World!',
      codeSummary: 'The same Hello program, with notes and empty lines. Empty lines and comments change nothing: the output is the same. Open "Line by line" and read the words one at a time.',
      codeExplanation: [
        { label: 'Line 2', code: 'public', text: 'An **access modifier**: "everyone may use this class". The JVM must be able to reach your class, so it is public.' },
        { label: 'Line 2', code: 'class Hello {', text: '`class` starts a class. `Hello` is the name you chose; the file must be `Hello.java`. `{` opens the class body.' },
        { label: 'Line 5', code: 'public static', text: '`main` is public too, so the JVM can call it. `static` means it belongs to the class, so the JVM can call it without creating an object first.' },
        { label: 'Line 5', code: 'void', text: 'The **return type**. `void` means "returns nothing". `main` does its work and gives no value back.' },
        { label: 'Line 5', code: 'main', text: 'The method name. The JVM looks for exactly this name, all small letters.' },
        { label: 'Line 5', code: '(String[] args)', text: 'The **parameter**: a list (`[]`) of texts (`String`) named `args`. It holds the words typed after `java Hello`. Here it is empty and unused, but it must be there.' },
        { label: 'Line 8', code: 'System.out', text: '`System` is a class that comes with Java. `out` is the standard output inside it: the text that appears in your terminal.' },
        { label: 'Line 8', code: '.println("Hello, World!")', text: '`println` is a method of `out`. The round brackets hold what you give it: the string `"Hello, World!"`.' },
        { label: 'Line 8', code: ';', text: 'Ends the statement. Without it, javac stops with `\';\' expected`.' },
        { label: 'Lines 10 and 12', code: '}', text: 'The first `}` closes `main`, the second closes the class. Comments after them help you see which is which.' }
      ],
      sections: [
        {
          title: 'Boxes inside boxes',
          text: [
            'A Java file has a clear nesting: the file holds a class, the class holds methods, and a method holds statements. Braces `{ }` mark where each part starts and ends.',
            'Indentation (the spaces at the start of a line) shows the nesting to you. Java itself only looks at the braces.'
          ],
          mermaid: 'flowchart TD\n  F["File: Hello.java"] --> C["class Hello { ... }"]\n  C --> M["method main(String[] args) { ... }"]\n  M --> S1["statement: System.out.println(...);"]',
          diagramNote: 'Each level sits inside the one above it. A statement can only live inside a method, and a method only inside a class.'
        },
        {
          title: 'The main line, word by word',
          text: [
            'This one line is the hardest part of a first program. Here are its six pieces side by side.'
          ],
          table: {
            head: ['Piece', 'Meaning', 'Can you change it?'],
            rows: [
              ['`public`', 'the JVM may call it', 'no'],
              ['`static`', 'belongs to the class, no object needed', 'no'],
              ['`void`', 'returns nothing', 'no'],
              ['`main`', 'the name the JVM looks for', 'no'],
              ['`String[]`', 'a list of texts', 'no (`String... args` also works)'],
              ['`args`', 'the name of that list', 'yes, any name works, but everyone writes `args`']
            ],
            note: 'Java 25 allows a shorter `void main()`. This course targets Java 21, so you always write the full line.'
          }
        },
        {
          title: 'Wrong vs right: a misspelled main',
          text: [
            'If you write `Main` with a capital M, the program still compiles. javac sees a normal method named `Main`. But when you run it, the JVM looks for `main` and does not find it.'
          ],
          fileName: 'Hello.java',
          noRun: true,
          code: `public class Hello {
    public static void Main(String[] args) {   // wrong: capital M
        System.out.println("Hello, World!");
    }
}`,
          output: `Error: Main method not found in class Hello, please define the main method as:
   public static void main(String[] args)
or a JavaFX application class must extend javafx.application.Application`,
          tip: 'This message comes from `java`, not from `javac`. It even tells you the line to write. (Ignore the JavaFX part; it is about window apps.)'
        },
        {
          title: 'The address: System.out.println',
          text: [
            'Read the dots like an address from big to small. Each step goes one part deeper.'
          ],
          mermaid: 'flowchart LR\n  S["System (a class that comes with Java)"] --> O["out (the screen output)"]\n  O --> P["println (a method: print a line)"]\n  P --> T["the text Hello, World! (what to print)"]',
          diagramNote: 'Java finds `System`, then `out` inside it, then the method `println`, and hands it the text in the round brackets.',
          table: {
            head: ['Symbol', 'Name', 'Job'],
            rows: [
              ['`{ }`', 'braces', 'start and end a class or method'],
              ['`( )`', 'parentheses', 'hold what you give a method'],
              ['`[ ]`', 'brackets', 'mean "a list of" (an array)'],
              ['`" "`', 'double quotes', 'start and end a string'],
              ['`;`', 'semicolon', 'ends a statement'],
              ['`.`', 'dot', 'goes into a part: `System.out`']
            ]
          }
        },
        {
          title: 'Using args: words from the command line',
          text: [
            '`args` holds the words you type after the class name. `args.length` is how many there are. The `+` glues text and the number together into one line (more in [Strings & Text](../strings/index.html)).',
            'Run without extra words, the list is empty and `args.length` is 0.'
          ],
          fileName: 'Greet.java',
          code: `public class Greet {
    public static void main(String[] args) {
        // args holds the words typed after "java Greet"
        System.out.println("You typed " + args.length + " words after the class name.");
        System.out.println("Greet is done.");
    }
}`,
          output: `You typed 0 words after the class name.
Greet is done.`,
          tip: 'Now try `java Greet Sam Alex` in the terminal. The first line becomes `You typed 2 words after the class name.`'
        }
      ],
      technical: [
        'When you run `java Hello`, the launcher starts the JVM, loads the class `Hello` and searches it for a method that is `public`, `static`, named `main`, returns `void` and takes one `String[]`. Only an exact match counts; that is why `Main` fails.',
        'The JVM turns the words after the class name into a `String[]` and passes it to `main`. With no words, it passes an empty list, never "nothing", so `args.length` is 0.',
        '`System.out` is a ready-made object of the class `PrintStream`. The JVM connects it to the terminal before `main` starts. `println` is one of its methods; `print` and `printf` are others.'
      ],
      tryIt: {
        steps: [
          'Copy the annotated `Hello` program into `Hello.java` and run it with `java Hello.java`.',
          'Change `main` to `Main`, then run `javac Hello.java` and `java Hello`.',
          'Read the message, change it back to `main`, compile and run again.',
          'Save `Greet.java`, compile it and run `java Greet one two three`.'
        ],
        see: '`Error: Main method not found in class Hello` after step 2, `Hello, World!` after step 3, and `You typed 3 words after the class name.` after step 4.'
      },
      check: [
        { q: 'What does `void` mean in the main line?', a: 'The method returns no value.' },
        { q: 'Which part of the main line may you rename without breaking anything?', a: 'Only `args`. Everything else must stay exactly as it is.' },
        { q: 'In `System.out.println("Hi");`, what do the round brackets hold?', a: 'What you give the method: the string `"Hi"`, which `println` prints.' }
      ],
      keyPoints: [
        'Class → method → statement: each sits inside the one before, marked with `{ }`.',
        'The main line is `public static void main(String[] args)`, letter for letter.',
        '`System.out.println(…)` reads like an address: class, output, method.',
        'Strings go in double quotes; statements end with `;`.',
        '`args` holds the words typed after the class name.'
      ],
      commonMistakes: [
        'Writing `public static void Main(String[] args)`. It compiles but does not run. Use small `main`.',
        'Writing `string[] args`. javac says `cannot find symbol ... class string`. Use `String` with a capital S.',
        'Leaving out `static`: `public void main(String[] args)`. Java 21 then cannot start the program. Write `public static void main`.',
        'Closing a brace too early, so `println` ends up outside `main`. Count: every `{` needs its `}` at the right place.'
      ],
      related: ['Your First Program', 'If Something Breaks', 'Syntax Fundamentals'],
      glossary
    },
    {
      id: 'compile-run-flow',
      num: '06',
      title: 'Compile and Run',
      category: 'firstRun',
      icon: '⇢',
      tagline: 'javac builds, java runs',
      realWorld: 'You write a letter in your language. A translator turns it into a language the machine reads. Then the machine reads it out loud. `javac` is the translator. `java` reads it out loud.',
      kid: [
        'Making a Java program run takes two steps, like baking a cake: first you mix the dough, then you put it in the oven.',
        'Step one is javac. It reads your file and checks it. If something is wrong, it tells you and stops. If all is fine, it makes a new file that ends in .class.',
        'Step two is java. It takes the .class file and runs it. If you change your file, you must do step one again, or the oven bakes the old cake.'
      ],
      definition: 'Java has two steps. `javac Name.java` checks your code and makes `Name.class`. `java Name` runs that class. After every change you compile again.',
      explain: [
        '**Compiling** means translating source code into bytecode. `javac` takes a **file name**, so you write the `.java` ending: `javac Flow.java`.',
        'If javac finds a mistake, it prints a **compile error** and writes no `.class` file. If the code is correct, it prints nothing and writes `Flow.class` next to `Flow.java`.',
        '**Running** means starting the JVM with your class. `java` takes a **class name**, not a file name, so you write no ending: `java Flow`. The JVM finds `Flow.class` in the current folder.',
        'The `.class` file does not update itself. If you edit `Flow.java` and only run `java Flow`, you see the old behaviour. The loop is always: edit, save, compile, run, read.'
      ],
      why: 'javac finds many mistakes before the program even starts. Then the JVM runs a checked, fast file.',
      whenUse: 'Every time you change a file: save, compile, run, read the output, fix.',
      syntax: 'Compile with the file name: `javac Flow.java`. Run with the class name: `java Flow` (no `.java`, no `.class`).',
      fileName: 'Flow.java',
      code: `public class Flow {
    public static void main(String[] args) {
        System.out.println("1. You write Flow.java (source code).");
        System.out.println("2. javac Flow.java checks it and writes Flow.class.");
        System.out.println("3. java Flow starts the JVM.");
        System.out.println("4. The JVM loads Flow.class and runs main.");
        System.out.println("5. You read this output.");
    }
}`,
      output: `1. You write Flow.java (source code).
2. javac Flow.java checks it and writes Flow.class.
3. java Flow starts the JVM.
4. The JVM loads Flow.class and runs main.
5. You read this output.`,
      codeSummary: 'The program prints the five stages it goes through itself. Compile it with `javac Flow.java`, run it with `java Flow`.',
      codeExplanation: [
        { label: 'Line 1', code: 'public class Flow {', text: 'The class `Flow`, so the file is `Flow.java` and javac makes `Flow.class`.' },
        { label: 'Line 2', code: 'public static void main(String[] args) {', text: 'The start. `java Flow` makes the JVM call this method.' },
        { label: 'Line 3', code: 'System.out.println("1. You write Flow.java (source code).");', text: 'Stage one happened before you ran anything: you typed the file.' },
        { label: 'Line 4', code: 'System.out.println("2. javac Flow.java checks it and writes Flow.class.");', text: 'Stage two: the compiler. It works once, before the run.' },
        { label: 'Line 5', code: 'System.out.println("3. java Flow starts the JVM.");', text: 'Stage three: `java` is the launcher that starts the JVM.' },
        { label: 'Line 6', code: 'System.out.println("4. The JVM loads Flow.class and runs main.");', text: 'Stage four: the JVM reads the bytecode, not your `.java` file.' },
        { label: 'Line 7', code: 'System.out.println("5. You read this output.");', text: 'Stage five: the text appears in the terminal.' },
        { label: 'Lines 8–9', code: '}', text: 'Close `main` and the class. When `main` ends, the JVM stops.' }
      ],
      sections: [
        {
          title: 'Step one: compile',
          text: [
            'Before compiling, the folder holds only your source file. After `javac`, there is a second file. javac itself prints nothing.'
          ],
          codeLanguage: 'bash',
          fileName: 'compile.sh',
          code: `ls
javac Flow.java
ls`,
          output: `Flow.java
Flow.class  Flow.java`
        },
        {
          title: 'Step two: run, with the class name',
          text: [
            'The two tools want different things. This trips up almost every beginner once.'
          ],
          table: {
            head: ['Command', 'Gets', 'Makes'],
            rows: [
              ['`javac Flow.java`', 'a file name, with `.java`', '`Flow.class`, or error messages'],
              ['`java Flow`', 'a class name, no ending', 'a running program and its output'],
              ['`java Flow.class`', 'wrong: Java looks for a class named "Flow.class"', '`Error: Could not find or load main class Flow.class`']
            ]
          },
          codeLanguage: 'bash',
          fileName: 'run.sh',
          code: 'java Flow.class',
          output: `Error: Could not find or load main class Flow.class
Caused by: java.lang.ClassNotFoundException: Flow.class`,
          tip: 'Fix: drop the ending and run `java Flow`.'
        },
        {
          title: 'The edit loop',
          text: [
            'Programming is a loop. You change a little, compile, run and look. When something is wrong, you go back to the editor.'
          ],
          mermaid: 'flowchart TD\n  E["Edit Flow.java"] --> S["Save the file"]\n  S --> C["javac Flow.java"]\n  C --> Q{"Errors?"}\n  Q -->|yes| R["Read the first error"]\n  R --> E\n  Q -->|no| J["java Flow"]\n  J --> O{"Output right?"}\n  O -->|no| E\n  O -->|yes| D["Done"]',
          diagramNote: 'Two checks: the compiler checks the grammar, you check the output. Only when both are fine are you done.'
        },
        {
          title: 'Forgot to compile? You see the old output',
          text: [
            'Change the text in line 3 of `Flow.java` to `"1. I changed this line."` and save. Run `java Flow` without compiling: the JVM still runs the old `Flow.class`. Compile, and the change appears.'
          ],
          codeLanguage: 'bash',
          fileName: 'old-class.sh',
          code: `java Flow          # old Flow.class: old first line
javac Flow.java    # make a new Flow.class
java Flow          # now the change shows`,
          output: `1. You write Flow.java (source code).
...
1. I changed this line.
...`,
          warn: 'Saving is not compiling. After every save, run `javac` again before `java`.'
        },
        {
          title: 'Keep the folder tidy with -d',
          text: [
            'With many programs, `.class` files fill your folder. The option `-d out` tells javac to put them into a folder `out`. Then you tell `java` where to look with `-cp out` (**class path**: the list of places where the JVM searches for classes).'
          ],
          codeLanguage: 'bash',
          fileName: 'tidy.sh',
          code: `javac -d out Flow.java
ls out
java -cp out Flow`,
          output: `Flow.class
1. You write Flow.java (source code).
2. javac Flow.java checks it and writes Flow.class.
3. java Flow starts the JVM.
4. The JVM loads Flow.class and runs main.
5. You read this output.`
        },
        {
          title: 'Peek inside a .class file with javap',
          text: [
            'The JDK has a tool that shows the bytecode in a readable form: `javap -c`. You never need to write bytecode, but seeing it once makes the word real.'
          ],
          codeLanguage: 'bash',
          fileName: 'peek.sh',
          code: `javac Hello.java
javap -c Hello`,
          output: `Compiled from "Hello.java"
public class Hello {
  public Hello();
    Code:
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return

  public static void main(java.lang.String[]);
    Code:
         0: getstatic     #7                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #13                 // String Hello, World!
         5: invokevirtual #15                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
}`,
          tip: 'Read the `main` part: `getstatic` fetches `System.out`, `ldc` loads the text, `invokevirtual` calls `println`, `return` ends. Four bytecode steps for your one line.'
        }
      ],
      technical: [
        'javac works in stages: it splits the text into tokens, builds a tree of the program (the **parse**), checks names and types, and only then writes bytecode. A grammar mistake stops it at the first stage, so other mistakes may only show up after you fix that one.',
        'Every `.class` file carries a version number. Java 21 writes version 65, Java 25 writes 69. An older JVM refuses newer files: `java.lang.UnsupportedClassVersionError: Hello has been compiled by a more recent version of the Java Runtime (class file version 69.0), this version of the Java Runtime only recognizes class file versions up to 65.0`. Fix: compile and run with the same Java, or compile with `javac --release 21`.',
        'When `java Flow` starts, the class loader looks for `Flow.class` in each place on the class path. Without `-cp` the class path is the current folder (`.`). That is why `java Flow` fails when you stand in another folder.'
      ],
      tryIt: {
        steps: [
          'Save the code as `Flow.java` in `~/java-practice`.',
          'Run `javac Flow.java`, then `ls`.',
          'Run `java Flow`.',
          'Change the text in line 3 and save. Run `java Flow` again without compiling.',
          'Now run `javac Flow.java` and `java Flow`.'
        ],
        see: 'a new `Flow.class` after step 2, the five lines after step 3, the old first line after step 4 and your new first line after step 5.'
      },
      check: [
        { q: 'Why do you write `.java` after `javac` but nothing after `java`?', a: '`javac` wants a file name. `java` wants a class name; it finds the `.class` file by itself.' },
        { q: 'javac printed nothing. Did it work?', a: 'Yes. Silence means success. `ls` shows the new `.class` file.' },
        { q: 'You edited and saved your file, but the output did not change. What did you forget?', a: 'To compile again with `javac`. The JVM runs the old `.class` file.' }
      ],
      keyPoints: [
        '`.java` is the code you write; `.class` is the bytecode the JVM runs.',
        '`javac Name.java` compiles; silence means success.',
        '`java Name` runs, with the class name only.',
        'Compile again after every change.',
        '`-d out` and `-cp out` keep `.class` files in their own folder.'
      ],
      commonMistakes: [
        'Running `java Flow.class` instead of `java Flow`. Drop the ending.',
        'Forgetting to save before `javac`. Save first, then compile.',
        'Running `java Flow` after an edit without compiling. Run `javac Flow.java` first.',
        'Running from another folder: `Error: Could not find or load main class Flow`. `cd` to the folder with `Flow.class`.'
      ],
      related: ['Run One File with java Hello.java', 'If Something Breaks', 'JDK, JRE, JVM'],
      glossary
    }
  );
})();
