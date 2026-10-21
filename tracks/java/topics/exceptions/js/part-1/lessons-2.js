(function () {
  Java.addCoreLessons('exceptions', [
    {
      id: 'try-catch',
      title: 'try and catch',
      category: 'concept',
      icon: 'try',
      tagline: 'Handle risky code without crashing',
      realWorld: 'A circus artist on the high wire with a safety net below. Walking the wire is the `try`. The net is the `catch`: if the artist falls, the net catches them and the show goes on.',
      kid: [
        'You carry a full glass of juice to the table. That is a little risky.',
        'Your plan: "I try to carry it. If it spills, I get a cloth and wipe it up."',
        'If nothing spills, you never need the cloth. If it spills, you stop carrying, wipe up, and then the day goes on. That is `try` and `catch`.'
      ],
      definition: 'A `try` block holds code that might throw an exception. A `catch` block right after it names one exception type and holds the code that runs when exactly that kind of exception is thrown inside the `try`.',
      explain: [
        'You write the risky lines inside `try { ... }`. Directly after it you write `catch (SomeException e) { ... }`. Together they form one **try statement**.',
        'If no line in the `try` block throws, the `catch` block is skipped completely. The program goes on after the whole try statement.',
        'If a line throws, the rest of the `try` block is skipped. Java jumps straight into the matching `catch` block. After the catch block ends, the program goes on after the try statement as if nothing happened. The exception is now **handled**.',
        'The part in brackets, `(NumberFormatException e)`, works like a method parameter. It says which type this block handles, and it gives you a variable `e` that points to the exception object. You can ask it for `e.getMessage()`.',
        'A catch block only handles its own type (and its subtypes, see the next lesson). Any other exception flies past it, as if the try statement was not there.'
      ],
      why: 'Some failures are normal in real programs: users type letters into a number field, a file is missing, the network is down. `try`/`catch` lets your program react with a clear message or a second plan instead of crashing.',
      whenUse: 'Around a call that can fail for reasons outside your code, when you know what to do instead: ask again, skip the bad item, use a default, or print a helpful message.',
      syntax: '`try { riskyCode(); } catch (ExceptionType name) { whatToDoInstead(); }`',
      fileName: 'TryCatchDemo.java',
      code: `public class TryCatchDemo {
    public static void main(String[] args) {
        String[] inputs = {"42", "seven", "100"};
        int total = 0;

        for (String input : inputs) {
            try {
                System.out.println("Reading '" + input + "'");
                int number = Integer.parseInt(input);
                total = total + number;
                System.out.println("  added " + number);
            } catch (NumberFormatException e) {
                System.out.println("  skipped: " + e.getMessage());
            }
        }

        System.out.println("Total: " + total);
    }
}`,
      output: `Reading '42'
  added 42
Reading 'seven'
  skipped: For input string: "seven"
Reading '100'
  added 100
Total: 142`,
      codeSummary: 'The loop reads three texts. Two are numbers and get added. `"seven"` makes `parseInt` throw; the catch block prints a short message and the loop goes on with the next text. The program never crashes.',
      codeExplanation: [
        { label: 'Line 7', code: 'try {', text: 'Starts the risky part. Everything up to the closing `}` is watched for exceptions.' },
        { label: 'Line 8', code: 'System.out.println("Reading \'" + input + "\'");', text: 'Runs for every input, also for `"seven"`, because it comes before the line that throws.' },
        { label: 'Line 9', code: 'int number = Integer.parseInt(input);', text: 'The risky line. For `"seven"` it throws a `NumberFormatException` and Java jumps to the catch block.' },
        { label: 'Line 10', code: 'total = total + number;', text: 'Skipped for `"seven"`. The jump to `catch` leaves out the rest of the try block, so a bad value is never added.' },
        { label: 'Line 11', code: 'System.out.println("  added " + number);', text: 'Also skipped for `"seven"`. That is why there is no "added" line for it.' },
        { label: 'Line 12', code: '} catch (NumberFormatException e) {', text: 'Handles only `NumberFormatException`. `e` is the exception object that `parseInt` created.' },
        { label: 'Line 13', code: 'System.out.println("  skipped: " + e.getMessage());', text: '`getMessage()` returns the text that Java put into the exception: `For input string: "seven"`.' },
        { label: 'Line 15', code: '}', text: 'End of the loop body. After the catch, the loop goes on with `"100"` as if nothing had happened.' },
        { label: 'Line 17', code: 'System.out.println("Total: " + total);', text: 'Runs because the exception was handled. 42 + 100 = 142.' }
      ],
      sections: [
        {
          title: 'The two paths through a try statement',
          text: ['There are only two ways through. Either the try block runs to its end, or it stops at the first line that throws and the catch block runs. Both paths meet again after the try statement.'],
          mermaid: `flowchart TD
  S["try block starts"] --> L1["line 1 runs"]
  L1 --> L2{"line 2 throws?"}
  L2 -- "no" --> L3["line 3 runs, try block ends"]
  L2 -- "yes" --> C["catch block runs"]
  L3 --> N["code after the try statement"]
  C --> N`,
          diagramNote: 'Line 3 never runs on the "yes" path. The catch block never runs on the "no" path.'
        },
        {
          title: 'Inside a method: return a default',
          text: ['A common use: a small method that turns text into a number and falls back to a default when that fails. The fallback is a decision you make on purpose, and the method name says it.'],
          fileName: 'PortSetting.java',
          code: `public class PortSetting {
    static int parsePortOrDefault(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            System.out.println("'" + value + "' is not a port, using 8080");
            return 8080;
        }
    }

    public static void main(String[] args) {
        System.out.println(parsePortOrDefault("3000"));
        System.out.println(parsePortOrDefault("oops"));
    }
}`,
          output: `3000
'oops' is not a port, using 8080
8080`,
          tip: 'Print or log the fallback. A silent default hides a typo in a settings file for weeks.'
        },
        {
          title: 'What you can ask the exception object',
          text: ['The variable `e` in the catch block is a normal object. These methods exist on every exception.'],
          table: {
            head: ['Call', 'Returns', 'Use it for'],
            rows: [
              ['`e.getMessage()`', 'The message, for example `For input string: "seven"`', 'A short text for the user or a log'],
              ['`e.toString()` or `"" + e`', 'Class name and message', 'A log line that also shows the type'],
              ['`e.getClass().getSimpleName()`', 'The class name without package: `NumberFormatException`', 'Showing which kind of problem it was'],
              ['`e.printStackTrace()`', 'Nothing; prints the full trace to standard error', 'Debugging: you see where it happened'],
              ['`e.getCause()`', 'The exception that caused this one, or `null`', 'Wrapped exceptions (lesson 10)']
            ],
            note: '`getMessage()` can return `null` when the thrower gave no message. `toString()` is safer for logs.'
          }
        },
        {
          title: 'A catch only handles its own type',
          text: [
            'The catch below is for `NumberFormatException`. The input `"0"` parses fine, but then the division by zero throws an `ArithmeticException`. That type does not match, so the catch block is skipped and the program crashes.',
            'The fix is not "catch everything". The fix is to decide: can I handle a zero here? If yes, add a second catch block (lesson 5) or check for zero with an `if` first.'
          ],
          fileName: 'WrongType.java',
          code: `public class WrongType {
    public static void main(String[] args) {
        String[] inputs = {"5", "x", "0"};

        for (String input : inputs) {
            try {
                int number = Integer.parseInt(input);
                System.out.println("100 / " + number + " = " + (100 / number));
            } catch (NumberFormatException e) {
                System.out.println("not a number: " + input);
            }
        }
        System.out.println("finished");
    }
}`,
          output: `100 / 5 = 20
not a number: x
Exception in thread "main" java.lang.ArithmeticException: / by zero
\tat WrongType.main(WrongType.java:8)`
        },
        {
          title: 'Variables from the try block stay inside it',
          text: [
            'A variable declared inside `try { }` exists only inside those braces, like any block in [Control flow](../control-flow/index.html). Writing `int n = Integer.parseInt(s);` inside the try and `System.out.println(n);` after it is a compile error: `cannot find symbol`.',
            'Declare the variable before the try and give it a starting value. Then both the try and the catch can set it, and the code after can read it.'
          ],
          fileName: 'ScopeDemo.java',
          code: `public class ScopeDemo {
    public static void main(String[] args) {
        String text = "12x";
        int amount = 0; // declared before the try, so it lives on after it

        try {
            amount = Integer.parseInt(text);
        } catch (NumberFormatException e) {
            System.out.println("Could not read '" + text + "', keeping 0");
        }

        System.out.println("amount = " + amount);
    }
}`,
          output: `Could not read '12x', keeping 0
amount = 0`
        }
      ],
      technical: [
        'For every try statement, `javac` writes an entry into the method\'s **exception table** in the `.class` file: "from bytecode position A to B, if an exception of type T is thrown, jump to position C". No extra work happens while the try block runs normally, so a try block costs almost nothing when nothing goes wrong.',
        'When something throws, the JVM looks up the current bytecode position in that table. It checks the entries in order and asks for each: is the thrown object an instance of T (or of a subclass of T)? The first match wins, and the JVM jumps to its handler with the exception object as the value of `e`.',
        'If no entry matches, the JVM removes the current frame from the call stack and repeats the search in the calling method. This is called **unwinding the stack** (lesson 8 shows it step by step).',
        'Creating an exception is the slow part: filling in the stack trace walks all frames. That is one reason why exceptions are for unusual cases, not for normal decisions (lesson 11).'
      ],
      tryIt: {
        steps: [
          'Copy `TryCatchDemo.java` and run it.',
          'Add `"3.5"` and `""` (an empty text) to the `inputs` array and run it again.',
          'Move the line `System.out.println("Reading \'" + input + "\'");` below the `parseInt` line and run it again.'
        ],
        see: 'two more "skipped" lines: `For input string: "3.5"` and `For input string: ""`. After the move, the "Reading" line is missing for every bad input, because the lines after the throw are skipped.'
      },
      check: [
        { q: 'The second of four lines in a try block throws. Which lines run?', a: 'Line 1 and the part of line 2 before the throw. Then the matching catch block. Lines 3 and 4 are skipped.' },
        { q: 'No exception is thrown in the try block. Does the catch block run?', a: 'No. It only runs when a matching exception is thrown.' },
        { q: 'A catch for `NumberFormatException` is there, but an `ArithmeticException` is thrown. What happens?', a: 'The catch does not match, so the exception goes on as if there was no try statement. Without another matching catch the program stops.' }
      ],
      keyPoints: [
        '`try` holds the risky code, `catch (Type e)` the plan for one exception type.',
        'The first line that throws ends the try block; the rest of it is skipped.',
        'After a catch block, the program goes on after the try statement.',
        'A catch only handles its own type and its subtypes.',
        'Declare variables before the try if you need them after it.'
      ],
      commonMistakes: [
        'Wrapping the whole `main` in one big try. Keep the try block small, around the lines that can really fail, so you know which line caused the catch.',
        'An empty catch: `catch (NumberFormatException e) { }`. The problem disappears without a trace. Print a message or handle it.',
        'Using a variable from inside the try after it: `try { int n = ...; } ... System.out.println(n);` does not compile. Declare `int n = 0;` before the try.',
        'Catching a type that is never thrown there. Catch the type the trace or the method documentation names.'
      ],
      related: ['Many catch Blocks and Multi-catch', 'The Exception Family Tree', 'finally and try-with-resources', 'Control Flow']
    },
    {
      id: 'exception-hierarchy',
      title: 'The Exception Family Tree',
      category: 'concept',
      icon: 'tree',
      tagline: 'Every exception is a kind of Throwable',
      realWorld: 'Animals in a picture book. A poodle is a dog, a dog is a mammal, a mammal is an animal. A sign "No dogs allowed" also keeps poodles out.',
      kid: [
        'Think of a family tree for problems. At the very top sits the great-grandmother: "Something can go wrong". Her name is `Throwable`.',
        'She has two children. `Error` is the big, scary family: "the whole house is on fire". You do not fix those. `Exception` is the family of everyday problems: "the milk is gone", "the door is locked".',
        'Each family has more children, and each child is a more exact kind of problem. When you say "I help with any door problem", you also help with "the door is locked" and "the key is broken".'
      ],
      definition: 'Exception classes are arranged in a tree. `Throwable` is at the top, with two branches: `Error` (serious problems of the JVM) and `Exception` (problems a program can handle). `RuntimeException` is a branch of `Exception`. A catch for a class also catches every class below it.',
      explain: [
        'In Java a class can **extend** another class: it is a more special kind of the other class and inherits all its methods. The general class is the **superclass** (parent), the special one is the **subclass** (child). You see the word `extends` again in lesson 10, when you write your own exception.',
        '`Throwable` is the top of the tree. Only objects of `Throwable` or its subclasses can be thrown and caught. It holds the message, the stack trace and the methods `getMessage()` and `printStackTrace()`. Every exception has them, because every exception inherits them.',
        '`Error` means the JVM itself is in trouble: `OutOfMemoryError` (no memory left), `StackOverflowError` (too many nested method calls). Programs normally do not catch these; there is nothing sensible to do.',
        '`Exception` is the family of problems a program can expect and handle. Its subclass `RuntimeException` holds the problems that usually come from a mistake in the code: a null value, a wrong index, a bad argument. The difference between `RuntimeException` and the rest of `Exception` matters for the compiler; lesson 9 explains it.',
        'The rule for catching: a `catch (X e)` matches an exception when it **is an** X. A `NumberFormatException` is an `IllegalArgumentException`, is a `RuntimeException`, is an `Exception`, is a `Throwable`. So all five catch types would catch it.'
      ],
      why: 'The tree lets you choose how exact you want to be. You can catch one precise problem (`NumberFormatException`) or a whole family (`RuntimeException`) with one catch block. It also lets the compiler tell checked and unchecked exceptions apart.',
      whenUse: 'Every time you write a catch: pick the lowest class in the tree that still covers what you can handle. And every time you read an unknown exception name: look up its parent to know what kind of problem it is.',
      syntax: '`class NumberFormatException extends IllegalArgumentException` — each class names its parent with `extends`.',
      mermaid: `classDiagram
  Throwable <|-- Error
  Throwable <|-- Exception
  Error <|-- OutOfMemoryError
  Error <|-- StackOverflowError
  Exception <|-- IOException
  Exception <|-- InterruptedException
  Exception <|-- RuntimeException
  RuntimeException <|-- ArithmeticException
  RuntimeException <|-- IllegalArgumentException
  RuntimeException <|-- NullPointerException
  RuntimeException <|-- IndexOutOfBoundsException
  IllegalArgumentException <|-- NumberFormatException`,
      visualLabel: 'The family tree',
      visualNote: 'An arrow points from a child to its parent. Read it as "is a": `NumberFormatException` is an `IllegalArgumentException`. `IOException` is for files and the network ([I/O Basics](../io-basics/index.html)).',
      fileName: 'FamilyTree.java',
      code: `public class FamilyTree {
    public static void main(String[] args) {
        // Start with one exception class and climb up to the top.
        Class<?> type = NumberFormatException.class;
        int level = 0;

        while (type != null) {
            System.out.println("level " + level + ": " + type.getName());
            type = type.getSuperclass(); // the parent class, or null at the top
            level++;
        }
    }
}`,
      output: `level 0: java.lang.NumberFormatException
level 1: java.lang.IllegalArgumentException
level 2: java.lang.RuntimeException
level 3: java.lang.Exception
level 4: java.lang.Throwable
level 5: java.lang.Object`,
      codeSummary: 'The program asks Java for the parent of `NumberFormatException`, then for the parent of that parent, until there is none. The output is the real path through the tree. `Object` is the parent of every class in Java.',
      codeExplanation: [
        { label: 'Line 4', code: 'Class<?> type = NumberFormatException.class;', text: '`.class` gives you an object that describes a class. `Class<?>` means "a description of some class"; the `?` stands for "any type".' },
        { label: 'Line 5', code: 'int level = 0;', text: 'Counts how far up the tree we are.' },
        { label: 'Line 7', code: 'while (type != null) {', text: 'Keep climbing until there is no parent left.' },
        { label: 'Line 8', code: 'System.out.println("level " + level + ": " + type.getName());', text: '`getName()` returns the full class name with its package, `java.lang.`.' },
        { label: 'Line 9', code: 'type = type.getSuperclass();', text: 'Move one step up: the superclass. For `Object` it returns `null`, which ends the loop.' },
        { label: 'Output', code: 'level 4: java.lang.Throwable', text: 'The top of all exceptions. Above it there is only `Object`.' }
      ],
      sections: [
        {
          title: 'The three big branches',
          table: {
            head: ['Branch', 'Means', 'Examples', 'Do you catch it?'],
            rows: [
              ['`Error`', 'The JVM is in serious trouble', '`OutOfMemoryError`, `StackOverflowError`', 'No. Let the program stop.'],
              ['`RuntimeException`', 'Usually a mistake in the code or a bad value', '`NullPointerException`, `ArithmeticException`, `IllegalArgumentException`', 'Sometimes, when bad input is expected (parsing). Better: fix the code or check first.'],
              ['Other `Exception`', 'Problems outside your code that you must expect', '`IOException`, `InterruptedException`', 'Yes. The compiler even makes you (lesson 9).']
            ]
          }
        },
        {
          title: 'A catch for a parent catches the children',
          text: ['Both problems below are children of `RuntimeException`. One catch block for the parent handles both. The class name in the output shows what was really thrown.'],
          fileName: 'ParentCatch.java',
          code: `public class ParentCatch {
    static void risky(int choice) {
        if (choice == 1) {
            Integer.parseInt("abc");
        } else {
            int[] box = new int[2];
            box[5] = 1;
        }
    }

    public static void main(String[] args) {
        for (int choice = 1; choice <= 2; choice++) {
            try {
                risky(choice);
            } catch (RuntimeException e) {
                System.out.println("caught " + e.getClass().getSimpleName());
            }
        }
    }
}`,
          output: `caught NumberFormatException
caught ArrayIndexOutOfBoundsException`,
          warn: 'Catching a parent is wide. `catch (RuntimeException e)` also catches a `NullPointerException` from a real bug, and hides it. Use parent catches rarely and on purpose.'
        },
        {
          title: 'Check "is a" with instanceof',
          text: ['The `instanceof` operator answers the same question the catch asks: "is this object an X?". It returns `true` for the class itself and for every parent.'],
          fileName: 'IsA.java',
          code: `public class IsA {
    public static void main(String[] args) {
        Exception e = new NumberFormatException("bad digits");

        System.out.println(e instanceof NumberFormatException);
        System.out.println(e instanceof IllegalArgumentException);
        System.out.println(e instanceof RuntimeException);
        System.out.println(e instanceof Exception);
        System.out.println(e instanceof ArithmeticException);
    }
}`,
          output: `true
true
true
true
false`,
          tip: 'You can create an exception object with `new` like any other object. Creating it does not throw it; that needs `throw` (lesson 7).'
        },
        {
          title: 'Where to find the parent of any exception',
          bullets: [
            'The Java documentation (the **Javadoc**) of every class starts with its tree, for example `java.lang.Object → java.lang.Throwable → java.lang.Exception → java.io.IOException`.',
            'In most editors, hover over the class name or press "Go to definition" and read the `extends` part.',
            'Or run `FamilyTree.java` with another class, for example `java.io.IOException.class`.'
          ]
        }
      ],
      technical: [
        'Each `.class` file stores the name of its superclass. When the JVM checks a catch entry for type T, it walks the superclass chain of the thrown object\'s class, the same walk `FamilyTree.java` does. If it meets T, the catch matches.',
        '`throw` and `catch` only work with `Throwable`. `throw "oops";` or `catch (String s)` do not compile: `incompatible types: String cannot be converted to Throwable`.',
        'The split between checked and unchecked is pure compiler work. `javac` treats `RuntimeException`, `Error` and all their subclasses as **unchecked**. Every other `Throwable` is **checked**. In the `.class` file and in the JVM, both kinds behave exactly the same.',
        'Most exception classes add nothing but a name. `NumberFormatException` has the same methods as `IllegalArgumentException`; the extra class only makes the problem more exact, so a catch can pick it out.'
      ],
      tryIt: {
        steps: [
          'Copy `FamilyTree.java` and run it.',
          'Replace `NumberFormatException.class` with `ArrayIndexOutOfBoundsException.class` and run it again.',
          'Try `java.io.IOException.class` and `StackOverflowError.class`.'
        ],
        see: '`ArrayIndexOutOfBoundsException` → `IndexOutOfBoundsException` → `RuntimeException` → `Exception` → `Throwable` → `Object`. `IOException` goes straight to `Exception`; `StackOverflowError` climbs through `VirtualMachineError` to `Error`.'
      },
      check: [
        { q: 'Does `catch (IllegalArgumentException e)` catch a `NumberFormatException`?', a: 'Yes. `NumberFormatException` extends `IllegalArgumentException`, so it is one.' },
        { q: 'Does `catch (ArithmeticException e)` catch a `NumberFormatException`?', a: 'No. They are siblings under `RuntimeException`; neither is a kind of the other.' },
        { q: 'Why do you normally not catch `Error`?', a: 'Errors like `OutOfMemoryError` mean the JVM itself is in trouble. Your program cannot repair that, so it is better to stop.' }
      ],
      keyPoints: [
        '`Throwable` is the top. Below it: `Error` and `Exception`.',
        '`RuntimeException` is a branch of `Exception` for problems that usually come from code mistakes.',
        'A catch for a class also catches all its subclasses ("is a").',
        'Catch as low in the tree as you can.',
        'Do not catch `Error` or `Throwable` in normal code.'
      ],
      commonMistakes: [
        'Catching `Throwable` or `Exception` "to be safe". It also catches bugs you wanted to see. Catch the exact type, for example `NumberFormatException`.',
        'Thinking `Error` and `Exception` are the same. `catch (Exception e)` does not catch a `StackOverflowError`; that one should stop the program anyway.',
        'Mixing up "is a" with "has the same name part". `IndexOutOfBoundsException` is not a parent of `NumberFormatException`, although both end in "Exception".'
      ],
      related: ['try and catch', 'Many catch Blocks and Multi-catch', 'Checked vs Unchecked, and throws', 'Your Own Exception Classes']
    }
  ]);
})();
