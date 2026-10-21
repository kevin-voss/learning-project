(function () {
  Java.addCoreTopic('exceptions', {
    label: 'Exceptions',
    headline: 'Exceptions,',
    accent: 'visible failure.',
    intro: 'Keep failures explicit with try/catch, throw, checked exceptions, and clear boundaries.',
    overview: 'Exception handling prepares you for files, parsing, tests, and command-line projects.',
    tryIt: {
      steps: [
        'Make `Parse.java`. Call `Integer.parseInt("12a")` in `main`. Run it.',
        'Read the first line and the first `at` line of the stack trace.',
        'Wrap the call in `try { ... } catch (NumberFormatException e) { ... }` and print a friendly message.'
      ],
      see: 'first a crash with `NumberFormatException: For input string: "12a"`, then only your friendly message.'
    },
    check: [
      { q: 'Which line of a stack trace do you read first?', a: 'The first line: the exception type and its message. Then the first `at` line in your own code.' },
      { q: 'What does `throw new IllegalArgumentException("age < 0")` do?', a: 'It stops the method right there and reports the problem to the caller.' },
      { q: 'Is an empty `catch { }` a good idea?', a: 'No. It hides the problem. At least print or log what went wrong.' }
    ]
  }, [
    {
      id: 'try-catch',
      title: 'try and catch',
      category: 'concept',
      icon: 'try',
      tagline: 'Handle risky code',
      definition: 'An exception interrupts normal flow. try marks risky code, and catch handles a specific failure type.',
      realWorld: 'A try block is like carrying a tray carefully; catch is the cleanup plan if something spills.',
      syntax: 'catch (NumberFormatException ex) handles only that exception type.',
      fileName: 'TryCatchDemo.java',
      code: `public class TryCatchDemo {
    static int parsePort(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException ex) {
            return 8080;
        }
    }

    public static void main(String[] args) {
        System.out.println(parsePort("3000"));
        System.out.println(parsePort("oops"));
    }
}`,
      keyPoints: [
        'Catch the most specific exception you can handle.',
        'Do not hide failures silently.',
        'Fallback values should be intentional and visible.'
      ],
      commonMistakes: [
        'Catching Exception everywhere.',
        'Leaving catch blocks empty.',
        'Using exceptions for normal if/else decisions.'
      ],
      related: ['I/O Basics', 'Debugging']
    },
    {
      id: 'throw',
      title: 'throw',
      category: 'practice',
      icon: '!',
      tagline: 'Reject invalid input',
      definition: 'throw creates and raises an exception when a method cannot continue correctly.',
      realWorld: 'A ticket machine rejects a negative payment instead of pretending the ticket was purchased.',
      syntax: 'throw new IllegalArgumentException("message") is common for invalid method arguments.',
      fileName: 'ThrowDemo.java',
      code: `public class ThrowDemo {
    static int centsFromDollars(int dollars) {
        if (dollars < 0) {
            throw new IllegalArgumentException("dollars must be positive");
        }
        return dollars * 100;
    }

    public static void main(String[] args) {
        System.out.println(centsFromDollars(5));
    }
}`,
      keyPoints: [
        'Validate method inputs near the boundary.',
        'IllegalArgumentException is unchecked.',
        'Exception messages should help the next reader.'
      ],
      commonMistakes: [
        'Returning magic values like -1 for every failure.',
        'Throwing vague RuntimeException messages.',
        'Failing late after bad state spreads.'
      ],
      related: ['Testing', 'Methods']
    },
    {
      id: 'checked-and-finally',
      title: 'Checked Exceptions and finally',
      category: 'habits',
      icon: 'file',
      tagline: 'Some failures must be declared',
      definition: 'Checked exceptions must be caught or declared. finally runs cleanup after try/catch.',
      realWorld: 'Borrowing a library book has a checkout record; Java makes some risky operations part of the method contract.',
      syntax: 'throws Exception declares that main may pass a checked exception to the JVM.',
      fileName: 'CheckedDemo.java',
      code: `public class CheckedDemo {
    static void pauseBriefly() throws InterruptedException {
        Thread.sleep(10);
    }

    public static void main(String[] args) throws InterruptedException {
        try {
            pauseBriefly();
            System.out.println("done");
        } finally {
            System.out.println("cleanup always runs");
        }
    }
}`,
      keyPoints: [
        'Checked exceptions are part of a method signature.',
        'finally is for cleanup that must run.',
        'try-with-resources is usually better for files and streams.'
      ],
      commonMistakes: [
        'Adding throws everywhere without understanding the failure.',
        'Putting return statements in finally.',
        'Using finally instead of try-with-resources for closeable resources.'
      ],
      related: ['I/O Basics', 'Testing']
    },
    {
      id: 'read-stack-trace',
      title: 'Read a Stack Trace',
      category: 'practice',
      icon: 'at',
      tagline: 'First line first, then your own code',
      realWorld: 'A trail of breadcrumbs. The first crumb says what went wrong. The next crumbs show the path back to where you started.',
      definition: 'When an exception is not caught, Java prints a stack trace. Line 1 says what went wrong: the type and the message. The `at` lines show where, newest call first. Find the first `at` line in a file you wrote and go there.',
      why: 'The trace names the problem and the exact line. It is the best clue you get.',
      whenUse: 'Every crash.',
      codeLanguage: 'plaintext',
      fileName: 'terminal output',
      code: `Exception in thread "main" java.lang.IllegalArgumentException: id is required
        at Parcel.<init>(Parcel.java:8)
        at Main.createFromInput(Main.java:9)
        at Main.main(Main.java:3)`,
      codeExplanation: [
        { label: 'Line 1', code: 'IllegalArgumentException: id is required', text: 'What went wrong. Read this first. Often it is the whole answer.' },
        { label: 'Line 2', code: 'at Parcel.<init>(Parcel.java:8)', text: 'Where it was thrown: Parcel.java line 8. <init> means "constructor".' },
        { label: 'Line 3', code: 'at Main.createFromInput(Main.java:9)', text: 'Who called it: createFromInput, line 9.' },
        { label: 'Line 4', code: 'at Main.main(Main.java:3)', text: 'Who called that: main, line 3. The bottom is where the program started.' }
      ],
      keyPoints: ['Read the first line, then the first `at` line in your code.', 'Later traces are long. Skip lines from libraries.'],
      commonMistakes: ['Scrolling past the red text without reading it.'],
      related: ['Debugging']
    }
  ]);
})();
