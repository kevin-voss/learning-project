(function () {
  Java.addCoreTopic('exceptions', {
    label: 'Exceptions',
    headline: 'Exceptions,',
    accent: 'visible failure.',
    intro: 'Learn what happens when a running program hits a problem: read the stack trace, catch the problem with try/catch, clean up with finally, throw your own exceptions and keep failures visible.',
    overview: 'Eleven small lessons, from your first crash to your own exception classes. Exception handling prepares you for files, parsing user input, tests and command-line projects.',
    tryIt: {
      steps: [
        'Make `Parse.java` with a `main` method. Inside, write `int n = Integer.parseInt("12a");` and print `n`. Compile and run it.',
        'Read the first line of the stack trace. Then find the first `at` line that names `Parse.java`.',
        'Wrap the call in `try { ... } catch (NumberFormatException e) { ... }` and print `"Not a number: " + e.getMessage()` in the catch block.',
        'Add a `finally` block that prints `"done"`. Run it once with `"12a"` and once with `"12"`.',
        'Write a method `static int checkAge(int age)` that throws `new IllegalArgumentException("age must be 0 or more, but was " + age)` for negative ages. Call it with `-3`.'
      ],
      see: 'first a crash with `NumberFormatException: For input string: "12a"`, then your friendly message, then `done` in both runs, and at the end a stack trace that starts with `IllegalArgumentException: age must be 0 or more, but was -3`.'
    },
    check: [
      { q: 'Which line of a stack trace do you read first, and which one next?', a: 'The first line: the exception type and its message. Next, the first `at` line that names a file you wrote. That is where you start looking.' },
      { q: 'What does `throw new IllegalArgumentException("age < 0")` do?', a: 'It creates an exception object and throws it. The method stops at once, and the exception travels up to the caller until some `catch` block handles it, or the program stops.' },
      { q: 'What is the difference between a checked and an unchecked exception?', a: 'For a checked exception (a subclass of `Exception` but not of `RuntimeException`, such as `IOException`) the compiler forces you to catch it or to declare it with `throws`. Unchecked exceptions (`RuntimeException` and its subclasses) are not checked by the compiler.' },
      { q: 'When does a `finally` block run?', a: 'Always after the try block: when it ends normally, when a catch handled an exception, and even when the exception is not caught or the try block returns.' },
      { q: 'Is an empty `catch (Exception e) { }` a good idea?', a: 'No. It swallows every problem, so the program goes on with wrong data and nobody knows why. Catch only the type you can handle, and at least print what went wrong.' }
    ]
  }, [
    {
      id: 'what-is-exception',
      title: 'What Is an Exception?',
      category: 'concept',
      icon: '!?',
      tagline: 'A problem that shows up while the program runs',
      realWorld: 'A smoke alarm in the kitchen. When something goes wrong, it beeps loudly. Cooking stops until somebody comes and deals with it.',
      kid: [
        'You follow a recipe, one step after the other. Step 3 says: "Crack two eggs." You open the box. It is empty!',
        'You cannot go on with step 4. So you stop and shout: "No eggs!" That shout is an exception.',
        'If a grown-up hears you, they can help: they bring eggs, or they say "let us make pancakes without eggs". If nobody hears you, the cooking stops for good.'
      ],
      definition: 'An **exception** is an object that Java creates when something goes wrong while the program runs. It stops the normal flow at that line and carries a message that says what went wrong and where.',
      explain: [
        'Some mistakes are found before the program runs. The compiler `javac` checks your code and refuses a missing `;` or a wrong type. These are **compile errors**. You saw them in [Getting started](../getting-started/index.html).',
        'Other problems only show up while the program runs, at **run time**: you divide by zero, you turn the text `"abc"` into a number, or you ask an array for a place it does not have. The code is correct Java, but the values are wrong.',
        'At that moment the JVM (the Java Virtual Machine, the program that runs your `.class` files) **throws** an exception. It creates an object, for example of the class `ArithmeticException`, puts a message into it ("/ by zero") and records which method and which line was running.',
        'Then Java looks for code that wants to **catch** this exception, that is, code that says "I know how to deal with this". You learn that in lesson 3, "try and catch". If nobody catches it, the exception is **uncaught**: the program stops (it "crashes") and prints a **stack trace**, a report of what went wrong and where.',
        'The lines after the bad line never run. In the example below, "Step 3" and "Done" are never printed.'
      ],
      why: 'Without exceptions, a method would need a special return value like `-1` for "it failed", and every caller would need to check it. People forget those checks. An exception cannot be overlooked: either somebody handles it, or the program stops loudly.',
      whenUse: 'You meet exceptions from day one: every crash with a red `Exception in thread "main"` is one. You handle them whenever a value can be wrong: user input, numbers in text, files, the network.',
      syntax: 'You write nothing yet: Java throws these for you. The report looks like `Exception in thread "main" java.lang.ArithmeticException: / by zero` followed by `at` lines.',
      fileName: 'FirstCrash.java',
      code: `public class FirstCrash {
    public static void main(String[] args) {
        int apples = 10;
        int children = 0;

        System.out.println("Step 1: we have " + apples + " apples");
        System.out.println("Step 2: we share them with " + children + " children");

        int each = apples / children; // this line throws an exception

        System.out.println("Step 3: each child gets " + each);
        System.out.println("Done");
    }
}`,
      output: `Step 1: we have 10 apples
Step 2: we share them with 0 children
Exception in thread "main" java.lang.ArithmeticException: / by zero
\tat FirstCrash.main(FirstCrash.java:9)`,
      codeSummary: 'The program prints two steps, then divides by zero on line 9. Java throws an `ArithmeticException`, nobody catches it, and the program stops with a stack trace. Steps 3 and "Done" never appear.',
      codeExplanation: [
        { label: 'Line 3', code: 'int apples = 10;', text: 'A normal variable. Nothing can go wrong here.' },
        { label: 'Line 4', code: 'int children = 0;', text: 'The value that causes the problem later. The code is valid Java, the value is the trouble.' },
        { label: 'Line 6', code: 'System.out.println("Step 1: we have " + apples + " apples");', text: 'Runs normally and prints the first line of the output.' },
        { label: 'Line 7', code: 'System.out.println("Step 2: we share them with " + children + " children");', text: 'Runs normally too. Everything before the bad line still happens.' },
        { label: 'Line 9', code: 'int each = apples / children;', text: 'Whole-number division by zero has no answer. The JVM creates an `ArithmeticException` with the message "/ by zero" and throws it.' },
        { label: 'Line 11', code: 'System.out.println("Step 3: each child gets " + each);', text: 'Never runs. The exception stopped `main` at line 9.' },
        { label: 'Output', code: 'Exception in thread "main" java.lang.ArithmeticException: / by zero', text: 'Printed by the JVM, not by you. It names the thread ("main"), the exception class with its package (`java.lang`) and the message.' },
        { label: 'Output', code: 'at FirstCrash.main(FirstCrash.java:9)', text: 'Where it happened: class `FirstCrash`, method `main`, file `FirstCrash.java`, line 9.' }
      ],
      sections: [
        {
          title: 'Compile errors and exceptions are different',
          text: ['A compile error stops `javac`. You get no `.class` file and the program never starts. An exception happens later, while `java` runs the program. The compiler cannot know that `children` will be `0`.'],
          table: {
            head: ['', 'Compile error', 'Exception'],
            rows: [
              ['When', 'Before the program runs', 'While the program runs'],
              ['Who finds it', 'The compiler `javac`', 'The JVM (`java`)'],
              ['Typical cause', 'Wrong grammar: missing `;`, wrong type', 'Wrong value: zero, bad text, missing element'],
              ['What you see', '`error: \';\' expected`', '`Exception in thread "main" ...`'],
              ['Does any code run?', 'No', 'Yes, every line before the bad one']
            ]
          }
        },
        {
          title: 'What happens at the bad line',
          text: ['Every line either finishes normally or throws. When it throws, Java leaves the normal path and looks for a catch. The picture shows both ways.'],
          mermaid: `flowchart TD
  A["Java runs a line"] --> B{"Did something go wrong?"}
  B -- "no" --> C["Go on with the next line"]
  B -- "yes" --> D["JVM creates an exception object"]
  D --> E{"Is there a matching catch?"}
  E -- "yes" --> F["The catch block runs, the program goes on"]
  E -- "no" --> G["Program stops and prints a stack trace"]`,
          diagramNote: 'Today you only see the right-hand path at the bottom: no catch, so the program stops. Lesson 3 adds the catch.'
        },
        {
          title: 'The exceptions you meet first',
          text: ['Each problem has its own exception class. The name already tells you a lot. Here are the ones beginners see most.'],
          table: {
            head: ['Exception', 'Typical cause', 'Message you see'],
            rows: [
              ['`ArithmeticException`', 'Whole-number division by zero: `10 / 0`', '`/ by zero`'],
              ['`ArrayIndexOutOfBoundsException`', 'Index outside the array: `arr[3]` when the length is 3', '`Index 3 out of bounds for length 3`'],
              ['`NumberFormatException`', '`Integer.parseInt("abc")`', '`For input string: "abc"`'],
              ['`NullPointerException`', 'Calling a method on a variable that holds `null`', '`Cannot invoke "String.length()" because ... is null`'],
              ['`StringIndexOutOfBoundsException`', '`"cat".charAt(5)`', '`Index 5 out of bounds for length 3`'],
              ['`IllegalArgumentException`', 'A method got an argument it cannot accept (often thrown by you)', 'Whatever the thrower wrote']
            ],
            note: 'All of them end in "Exception". That is a naming rule in Java, so you always recognise one.'
          }
        },
        {
          title: 'A second crash: an array index',
          text: ['Arrays count from 0, so an array of length 3 has the places 0, 1 and 2. Asking for place 3 throws. The loop below goes one step too far.'],
          fileName: 'TooFar.java',
          code: `public class TooFar {
    public static void main(String[] args) {
        String[] pets = {"cat", "dog", "fish"};

        for (int i = 0; i <= pets.length; i++) {
            System.out.println("Pet " + i + ": " + pets[i]);
        }
        System.out.println("All pets printed");
    }
}`,
          output: `Pet 0: cat
Pet 1: dog
Pet 2: fish
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
\tat TooFar.main(TooFar.java:6)`,
          tip: 'The message gives you the exact numbers: index 3, length 3. The fix is `i < pets.length` instead of `i <= pets.length`.'
        },
        {
          title: 'An exception is an object',
          text: [
            'An exception is a real Java object, like the objects from [Classes and objects](../classes-and-objects/index.html). It has a class (its type), a message, and a record of where it was created.',
            'Here is a peek ahead: the `try`/`catch` below catches the exception, so you can look at the object. Lesson 3 explains `try` and `catch` in detail.'
          ],
          fileName: 'LookInside.java',
          code: `public class LookInside {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Class:   " + e.getClass().getName());
            System.out.println("Message: " + e.getMessage());
            System.out.println("As text: " + e);
        }
        System.out.println("The program goes on");
    }
}`,
          output: `Class:   java.lang.ArithmeticException
Message: / by zero
As text: java.lang.ArithmeticException: / by zero
The program goes on`
        }
      ],
      technical: [
        'For `apples / children` the compiler writes the bytecode instruction `idiv` (integer divide). When the JVM runs `idiv` and the divisor is `0`, it creates a new `ArithmeticException` object on the heap. While the object is created, it fills in its **stack trace**: the list of methods that were running at that moment, with file names and line numbers.',
        'The JVM then searches the current method for a matching catch block. The compiler stores a small **exception table** in each `.class` file for that: "if line range X throws type Y, jump to Z". With no match, the JVM leaves the method and searches the caller, then the caller of the caller.',
        'When even `main` has no match, the thread\'s default handler prints `Exception in thread "main"`, the exception (`toString()`) and the stack trace to **standard error** (`System.err`, a second output channel next to `System.out`). The `java` command then ends with exit code 1 instead of 0, so scripts can see that it failed.',
        'Only whole-number division throws. `10.0 / 0` with `double` gives `Infinity` and no exception, because floating-point numbers have a special value for that.'
      ],
      tryIt: {
        steps: [
          'Copy `FirstCrash.java`, compile it with `javac FirstCrash.java` and run it with `java FirstCrash`.',
          'Change `children` to `2` and run it again.',
          'Change the division to `10.0 / 0` (store it in a `double`) and run it again.'
        ],
        see: 'first the `ArithmeticException` at line 9, then all four lines with `each child gets 5`, then `Infinity` and no exception.'
      },
      check: [
        { q: 'Does `javac` find a division by zero in `apples / children`?', a: 'No. The code is valid. The value `0` is only known while the program runs, so the JVM throws an exception at run time.' },
        { q: 'What happens to the lines after the line that throws?', a: 'They do not run, unless a catch block handles the exception. Without a catch, the program stops at that line.' },
        { q: 'Where does the stack trace come from?', a: 'The JVM prints it when an exception is not caught. It is printed to standard error, not by your own `println`.' }
      ],
      keyPoints: [
        'An exception is an object that reports a problem at run time.',
        'The line that throws stops; the lines after it are skipped.',
        'An uncaught exception stops the program and prints a stack trace.',
        'The class name says what kind of problem it is, the message says the details.',
        'Compile errors happen before the program runs; exceptions happen while it runs.'
      ],
      commonMistakes: [
        'Thinking the compiler should have caught it. `10 / children` compiles fine; only the value is wrong. Check values that can be zero or empty before you use them.',
        'Ignoring the message. `Index 3 out of bounds for length 3` already tells you the loop runs once too often: write `i < arr.length`, not `i <= arr.length`.',
        'Expecting `10.0 / 0` to throw. It gives `Infinity`. Only `int` and `long` division by zero throws.'
      ],
      related: ['Read a Stack Trace', 'try and catch', 'Arrays', 'Debugging']
    },
    {
      id: 'read-stack-trace',
      title: 'Read a Stack Trace',
      category: 'practice',
      icon: 'at',
      tagline: 'First line first, then your own code',
      realWorld: 'A trail of breadcrumbs in the forest. The first crumb says what went wrong. The next crumbs show the path back to where you started.',
      kid: [
        'You come home and your shoes are full of mud. Mum asks: "Where have you been?"',
        'You answer backwards: "I stepped in a puddle. Before that I was in the park. Before that I walked out of our door."',
        'A stack trace tells the same story. First what went wrong, then where you were, then where you were before that, all the way back to the start.'
      ],
      definition: 'A **stack trace** is the report Java prints for an uncaught exception. Line 1 says what went wrong: the exception type and its message. Each `at` line below names one method that was running, with its file and line number, newest call first.',
      explain: [
        'When `main` calls `readAge`, and `readAge` calls `toNumber`, Java keeps a list of the running methods: the **call stack**. Each entry is a **frame**: one running method with its own variables and the line it is on. You met the idea in [Methods](../methods/index.html). The newest frame is on top.',
        'When an exception is created, Java copies this list into the exception. That copy is the stack trace. The top `at` line is the place where the exception was thrown. Each line below it is the place that called the line above.',
        'Many traces start with lines from Java itself. They begin with `java.base/`, the name of the **module** (a package of Java\'s own classes). You did not write that code and you cannot change it. Skip those lines until you reach the first line in a file you wrote.',
        'That first line in your own code is where you start looking. Very often the bug is the value you passed to Java\'s method on that line, or one line further down the trace, where that value came from.'
      ],
      why: 'The trace names the problem and the exact line. It is the best clue you ever get. Most beginner bugs are solved by reading the first line and the first own `at` line carefully.',
      whenUse: 'Every crash. Also every `e.printStackTrace()` you print yourself, and every failing test later in [Testing](../testing/index.html).',
      syntax: '`ExceptionType: message` on line 1, then `at package.Class.method(File.java:line)` lines, newest first. `<init>` means a constructor.',
      fileName: 'AgeReader.java',
      code: `public class AgeReader {
    public static void main(String[] args) {
        System.out.println("Reading the form ...");
        int age = readAge(" twelve ");
        System.out.println("Age: " + age);
    }

    static int readAge(String text) {
        String cleaned = text.trim();
        return toNumber(cleaned);
    }

    static int toNumber(String text) {
        return Integer.parseInt(text);
    }
}`,
      output: `Reading the form ...
Exception in thread "main" java.lang.NumberFormatException: For input string: "twelve"
\tat java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)
\tat java.base/java.lang.Integer.parseInt(Integer.java:565)
\tat java.base/java.lang.Integer.parseInt(Integer.java:662)
\tat AgeReader.toNumber(AgeReader.java:14)
\tat AgeReader.readAge(AgeReader.java:10)
\tat AgeReader.main(AgeReader.java:4)`,
      codeSummary: 'Three of your methods call each other: `main` → `readAge` → `toNumber`, and `toNumber` asks Java\'s `Integer.parseInt` to read `"twelve"`. The trace lists all frames, newest first. The line numbers inside `java.base` depend on your JDK version and can differ from these.',
      codeExplanation: [
        { label: 'Trace line 1', code: 'java.lang.NumberFormatException: For input string: "twelve"', text: 'What went wrong. Read this first. The text `"twelve"` is not a number. Often this line is the whole answer.' },
        { label: 'Trace line 2', code: 'at java.base/java.lang.NumberFormatException.forInputString(...)', text: 'Inside Java itself (`java.base/`). Here the exception object was created. Skip it.' },
        { label: 'Trace lines 3-4', code: 'at java.base/java.lang.Integer.parseInt(Integer.java:662)', text: 'Still inside Java: `parseInt` calls a second `parseInt`. Skip these too.' },
        { label: 'Trace line 5', code: 'at AgeReader.toNumber(AgeReader.java:14)', text: 'The first line in your own file. Start here: line 14 calls `Integer.parseInt(text)`. Which text did it get?' },
        { label: 'Trace line 6', code: 'at AgeReader.readAge(AgeReader.java:10)', text: 'Who called `toNumber`: `readAge` on line 10, with the trimmed text.' },
        { label: 'Trace line 7', code: 'at AgeReader.main(AgeReader.java:4)', text: 'Who called `readAge`: `main` on line 4, with `" twelve "`. Here is the real cause: the form value is a word, not digits.' },
        { label: 'Line 5', code: 'System.out.println("Age: " + age);', text: 'Never runs, so "Age:" is missing from the output.' }
      ],
      sections: [
        {
          title: 'The parts of one `at` line',
          text: ['Every `at` line has the same shape. Once you know the parts, you can read any trace.'],
          table: {
            head: ['Part', 'In `at AgeReader.toNumber(AgeReader.java:14)`', 'Meaning'],
            rows: [
              ['Module', '(none here)', '`java.base/` means Java\'s own code. Your code has no module name.'],
              ['Class', '`AgeReader`', 'The class that holds the method. With a package it reads `shop.AgeReader`.'],
              ['Method', '`toNumber`', 'The method that was running. `<init>` is a constructor, `<clinit>` is static setup code.'],
              ['File', '`AgeReader.java`', 'The source file to open.'],
              ['Line', '`14`', 'The line that was running in that method.']
            ]
          }
        },
        {
          title: 'Newest call on top',
          text: ['The trace is the call stack at the moment of the throw. `main` started first, so it is at the bottom. The method that threw is at the top.'],
          mermaid: `flowchart TD
  T["Integer.parseInt (java.base) : threw here"] --> A["AgeReader.toNumber line 14"]
  A --> B["AgeReader.readAge line 10"]
  B --> C["AgeReader.main line 4 : the program started here"]`,
          diagramNote: 'Read from the top: each box was called by the box below it. Your search starts at the first box that is your own code.'
        },
        {
          title: 'Five steps for every trace',
          bullets: [
            '**1. Read line 1.** Which type? Which message? `"twelve"`, `Index 3`, `/ by zero` are clues.',
            '**2. Skip the `java.base/` lines** until you reach a file you wrote.',
            '**3. Open that file at that line.** Ask: which value on this line could be wrong?',
            '**4. Walk down the trace** to see where that value came from (the caller passed it in).',
            '**5. Fix the cause, not the symptom.** Here: check the form input, or tell the user that "twelve" must be written as 12.'
          ],
          tip: 'Most editors make the `File.java:14` part clickable. One click takes you to the line.'
        },
        {
          title: 'A trace from a constructor: `<init>`',
          text: ['When an exception comes from a constructor (the code that runs on `new`), the trace shows `<init>` instead of a method name. Here `Parcel` refuses an empty id. You learn `throw` in lesson 7; for now read the trace.'],
          fileName: 'ParcelShop.java',
          code: `public class ParcelShop {
    public static void main(String[] args) {
        Parcel first = new Parcel("P-100");
        System.out.println("Created " + first.id);
        Parcel second = new Parcel("");
        System.out.println("Created " + second.id);
    }
}

class Parcel {
    String id;

    Parcel(String id) {
        if (id.isEmpty()) {
            throw new IllegalArgumentException("id is required");
        }
        this.id = id;
    }
}`,
          output: `Created P-100
Exception in thread "main" java.lang.IllegalArgumentException: id is required
\tat Parcel.<init>(ParcelShop.java:15)
\tat ParcelShop.main(ParcelShop.java:5)`,
          tip: 'The file name is `ParcelShop.java` even for class `Parcel`, because both classes live in that file.'
        }
      ],
      technical: [
        'The trace is captured when the exception object is created: the constructor of `Throwable` calls `fillInStackTrace()`, which asks the JVM for the current frames. That is why the top line is where `new ...Exception(...)` ran, not where it was caught.',
        'The line numbers come from the **line number table** that `javac` writes into each `.class` file. It maps bytecode positions to source lines. That is how the JVM can say `AgeReader.java:14` although it only runs bytecode.',
        'The default handler prints the trace with `printStackTrace()`. You can call that yourself inside a catch block, or read the frames as data with `e.getStackTrace()`, which returns an array of `StackTraceElement` objects with `getMethodName()` and `getLineNumber()`.',
        'Long traces from frameworks can have hundreds of lines and end with `... 42 more`. That means "the rest is the same as the trace above". The rule stays the same: line 1, then the first line of your own code.'
      ],
      tryIt: {
        steps: [
          'Copy `AgeReader.java`, compile and run it.',
          'Point at the first `at` line that names `AgeReader.java`. Open the file at that line.',
          'Change `" twelve "` to `" 12 "` and run it again.'
        ],
        see: 'first the `NumberFormatException` with the trace, then `Reading the form ...` and `Age: 12`. The `trim()` on line 9 removed the spaces.'
      },
      check: [
        { q: 'Which `at` line was running when the exception was created?', a: 'The top one. The trace lists frames newest first.' },
        { q: 'You see `at java.base/java.lang.Integer.parseInt(...)`. Do you fix `Integer.java`?', a: 'No. That is Java\'s own code. Skip to the first line in your own file and check the value you passed to `parseInt`.' },
        { q: 'What does `<init>` in a trace mean?', a: 'A constructor. The exception came from code that ran during `new`.' }
      ],
      keyPoints: [
        'Line 1: the exception type and the message. Read it first.',
        'The `at` lines are the call stack, newest call on top.',
        'Skip `java.base/` lines; start at the first line in your own code.',
        'Walk down the trace to find where a wrong value came from.',
        '`<init>` means constructor.'
      ],
      commonMistakes: [
        'Scrolling past the red text without reading it. Read line 1 aloud; it often names the bug.',
        'Looking at the bottom line first. `main` is where the program started, not where it broke. Start at the top and skip down to your own code.',
        'Trying to fix Java\'s code in `java.base/...`. The bug is almost always the value your code passed in.',
        'Expecting the same line numbers inside `java.base` on every computer. They change with the JDK version; your own line numbers do not.'
      ],
      related: ['What Is an Exception?', 'How an Exception Travels', 'Debugging', 'Methods']
    }
  ]);
})();
