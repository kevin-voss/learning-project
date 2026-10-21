(function () {
  Java.addCoreLessons('exceptions', [
    {
      id: 'multiple-catch',
      title: 'Many catch Blocks and Multi-catch',
      category: 'practice',
      icon: '| |',
      tagline: 'A different plan for each kind of problem',
      realWorld: 'A sorting machine for coins. Each coin rolls along a rail and falls into the first hole it fits. Small holes come first; the big hole at the end takes what is left.',
      kid: [
        'Your bike can have different problems. A flat tyre? You pump it up. A loose chain? You put it back on.',
        'You do not fix every problem the same way. You look at what is wrong and pick the matching fix.',
        'With many `catch` blocks, Java does the same: it looks at the problem and picks the first fix that matches.'
      ],
      definition: 'One `try` can have several `catch` blocks. Java checks them from top to bottom and runs only the **first** one whose type matches. A **multi-catch** `catch (A | B e)` handles two or more unrelated types with the same code.',
      explain: [
        'Real code can fail in more than one way. `Integer.parseInt` can throw a `NumberFormatException`; reading `menu[index]` can throw an `ArrayIndexOutOfBoundsException`. Each problem deserves its own message.',
        'You write the catch blocks one after the other. When an exception is thrown, Java tests the first catch: "is the exception one of these?" If not, the second, and so on. Only one catch block ever runs per exception. If none matches, the exception leaves the try statement.',
        'Because the first match wins, the **order** matters. A catch for a parent class, like `IllegalArgumentException`, would also match its child `NumberFormatException`. So the child must come first, the more general type later. If you put the general one first, the compiler refuses the code: the second catch could never run.',
        'When two types need the same handling, write them in one **multi-catch** with `|` between the types: `catch (NumberFormatException | ArrayIndexOutOfBoundsException e)`. The `|` reads as "or". The types must not be parent and child of each other.',
        'Inside a multi-catch, `e` has the closest common parent type, here `RuntimeException`, so you can call all methods that every exception has.'
      ],
      why: 'Different problems need different answers: "please type a number" is not the same as "there is no dish 7". Several catch blocks keep each answer short and exact. Multi-catch avoids copying the same lines twice.',
      whenUse: 'When one block of code can throw two or more exception types and you want to react to each one. Use multi-catch when the reaction is the same.',
      syntax: '`try { ... } catch (ChildType e) { ... } catch (ParentType e) { ... }` and `catch (TypeA | TypeB e) { ... }`',
      fileName: 'MenuPicker.java',
      code: `public class MenuPicker {
    static String pick(String[] menu, String choice) {
        int index = Integer.parseInt(choice);
        return menu[index];
    }

    public static void main(String[] args) {
        String[] menu = {"pizza", "pasta", "salad"};
        String[] choices = {"1", "abc", "7"};

        for (String choice : choices) {
            try {
                String dish = pick(menu, choice);
                System.out.println(choice + " -> " + dish);
            } catch (NumberFormatException e) {
                System.out.println(choice + " -> please type a number");
            } catch (ArrayIndexOutOfBoundsException e) {
                System.out.println(choice + " -> there is no dish " + choice);
            }
        }
    }
}`,
      output: `1 -> pasta
abc -> please type a number
7 -> there is no dish 7`,
      codeSummary: 'The method `pick` can fail in two ways. `"abc"` fails in `parseInt`; `"7"` parses but is too big for the array. Each problem lands in its own catch block with its own message.',
      codeExplanation: [
        { label: 'Line 3', code: 'int index = Integer.parseInt(choice);', text: 'First possible failure: `NumberFormatException` when `choice` is not digits.' },
        { label: 'Line 4', code: 'return menu[index];', text: 'Second possible failure: `ArrayIndexOutOfBoundsException` when `index` is not 0, 1 or 2.' },
        { label: 'Line 13', code: 'String dish = pick(menu, choice);', text: 'The call that may throw. The exception comes up out of `pick` into this try block.' },
        { label: 'Line 14', code: 'System.out.println(choice + " -> " + dish);', text: 'Only runs when `pick` worked, so only for `"1"`.' },
        { label: 'Line 15', code: '} catch (NumberFormatException e) {', text: 'Tested first. Matches for `"abc"`.' },
        { label: 'Line 17', code: '} catch (ArrayIndexOutOfBoundsException e) {', text: 'Tested only if the first catch did not match. Matches for `"7"`.' },
        { label: 'Line 18', code: 'System.out.println(choice + " -> there is no dish " + choice);', text: 'A message that fits this exact problem. A single general catch could not say this.' }
      ],
      sections: [
        {
          title: 'How Java picks the catch block',
          mermaid: `flowchart TD
  T["exception thrown in try"] --> A{"is it a NumberFormatException?"}
  A -- "yes" --> A1["run catch 1"]
  A -- "no" --> B{"is it an ArrayIndexOutOfBoundsException?"}
  B -- "yes" --> B1["run catch 2"]
  B -- "no" --> X["leave the try statement, the exception goes on"]
  A1 --> N["code after the try statement"]
  B1 --> N`,
          diagramNote: 'Top to bottom, first match wins, at most one catch block runs.'
        },
        {
          title: 'Child before parent, or it does not compile',
          text: [
            '`NumberFormatException` is a child of `IllegalArgumentException` (see the family tree in lesson 4). In the code below the parent comes first. It would catch every `NumberFormatException`, so the second block could never run. `javac` stops with an error.',
            'The fix: swap the two catch blocks. The more exact type goes first.'
          ],
          fileName: 'WrongOrder.java',
          code: `public class WrongOrder {
    public static void main(String[] args) {
        try {
            int n = Integer.parseInt("abc");
            System.out.println(n);
        } catch (IllegalArgumentException e) {
            System.out.println("bad argument");
        } catch (NumberFormatException e) {
            System.out.println("not a number");
        }
    }
}`,
          noRun: true,
          output: `WrongOrder.java:8: error: exception NumberFormatException has already been caught
        } catch (NumberFormatException e) {
          ^
1 error`,
          warn: 'This program does not compile on purpose. The output shown is what `javac` prints.'
        },
        {
          title: 'Multi-catch: one block for two types',
          text: ['When the reaction is the same, list the types with `|`. Here both problems mean "the input is not usable", so one message is enough. `e.getClass().getSimpleName()` still tells you which one it was.'],
          fileName: 'MultiCatch.java',
          code: `public class MultiCatch {
    static int readSeat(String[] seats, String text) {
        int number = Integer.parseInt(text);
        return Integer.parseInt(seats[number]);
    }

    public static void main(String[] args) {
        String[] seats = {"10", "11", "12"};
        String[] inputs = {"2", "two", "9"};

        for (String input : inputs) {
            try {
                System.out.println("seat " + readSeat(seats, input));
            } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
                System.out.println("unusable input '" + input + "' ("
                        + e.getClass().getSimpleName() + ")");
            }
        }
    }
}`,
          output: `seat 12
unusable input 'two' (NumberFormatException)
unusable input '9' (ArrayIndexOutOfBoundsException)`,
          bullets: [
            'The types in a multi-catch must not be parent and child. `catch (NumberFormatException | IllegalArgumentException e)` is a compile error: `Alternatives in a multi-catch statement cannot be related by subclassing`. Keep only the parent.',
            'In a multi-catch you cannot assign a new value to `e`. It is **effectively final**: it keeps the value it got.'
          ]
        },
        {
          title: 'Which form to choose',
          table: {
            head: ['You want', 'Write', 'Example'],
            rows: [
              ['A different reaction per type', 'Several catch blocks, child types first', '`catch (NumberFormatException e) {...} catch (ArrayIndexOutOfBoundsException e) {...}`'],
              ['The same reaction for unrelated types', 'Multi-catch', '`catch (NumberFormatException | ArrayIndexOutOfBoundsException e)`'],
              ['The same reaction for a whole family', 'One catch for the parent', '`catch (IllegalArgumentException e)` also takes `NumberFormatException`'],
              ['A last safety net at the very top', 'A final `catch (Exception e)` in `main` that prints and ends', 'See lesson 11']
            ]
          }
        },
        {
          title: 'A specific catch and a safety net',
          text: ['You can end with a wide catch after the exact ones. The exact ones handle what you expect; the last one makes sure the user gets a clear message for anything else. Here a `null` in the list causes a `NullPointerException` that nobody planned for.'],
          fileName: 'SafetyNet.java',
          code: `public class SafetyNet {
    public static void main(String[] args) {
        String[] words = {"12", "x", null};

        for (String word : words) {
            try {
                int length = word.length();
                int value = Integer.parseInt(word);
                System.out.println(word + " has " + length + " digits, value " + value);
            } catch (NumberFormatException e) {
                System.out.println("'" + word + "' is not a number");
            } catch (RuntimeException e) {
                System.out.println("unexpected problem: " + e.getClass().getSimpleName());
            }
        }
    }
}`,
          output: `12 has 2 digits, value 12
'x' is not a number
unexpected problem: NullPointerException`,
          tip: 'The wide catch must come last. Put it first and the compiler complains, as in step 2.'
        }
      ],
      technical: [
        'Each catch block becomes one row in the method\'s exception table, in the order you wrote them. The JVM tests the rows top to bottom, which is why the first match wins.',
        '`javac` checks the order for you. If a catch type is a subclass of a type above it, that row could never be reached, so the compiler reports `has already been caught`. The same check stops a multi-catch with related types.',
        'A multi-catch compiles to one handler with several rows in the exception table that all jump to the same code. The bytecode is shorter than two copied blocks.',
        'The compiler also refuses a catch for a checked exception that the try block can never throw, for example `catch (java.io.IOException e)` around a `println`: `exception IOException is never thrown in body of corresponding try statement`.'
      ],
      tryIt: {
        steps: [
          'Copy `MenuPicker.java` and run it.',
          'Add `"-1"` to `choices` and run it again.',
          'Swap the two catch blocks. Does it still compile? Why?'
        ],
        see: '`-1 -> there is no dish -1`. After the swap it still compiles and works: the two types are siblings, so neither hides the other.'
      },
      check: [
        { q: 'Two catch blocks both match. Which one runs?', a: 'Only the first one from the top that matches.' },
        { q: 'Why does `catch (IllegalArgumentException e)` before `catch (NumberFormatException e)` not compile?', a: 'The first block already catches every `NumberFormatException`, because it is a subclass. The second block could never run, and `javac` refuses unreachable catch blocks.' },
        { q: 'Is `catch (ArithmeticException | NumberFormatException e)` allowed?', a: 'Yes. Both are children of `RuntimeException`, but neither is a child of the other.' }
      ],
      keyPoints: [
        'One try, many catch blocks: top to bottom, first match wins.',
        'At most one catch block runs per exception.',
        'Exact (child) types first, general (parent) types last.',
        'Multi-catch `A | B` for the same reaction to unrelated types.',
        'Unmatched exceptions leave the try statement and go on.'
      ],
      commonMistakes: [
        'Putting `catch (Exception e)` first. Every later catch is unreachable and `javac` refuses it. Move the wide catch to the end.',
        'A multi-catch with parent and child: `catch (NumberFormatException | IllegalArgumentException e)`. Write only `catch (IllegalArgumentException e)`.',
        'Copying the same three lines into two catch blocks. Use a multi-catch instead.',
        'Using a wide catch to hide a real bug, like the `NullPointerException` above. Use the safety net to report, then fix the cause.'
      ],
      related: ['try and catch', 'The Exception Family Tree', 'Good Habits with Exceptions']
    },
    {
      id: 'finally-and-resources',
      title: 'finally and try-with-resources',
      category: 'practice',
      icon: 'fin',
      tagline: 'Clean up, whatever happens',
      realWorld: 'Leaving the bathroom. Whether you washed your hands, brushed your teeth or dropped the soap, you always turn off the light on the way out.',
      kid: [
        'After playing with blocks, you put them back in the box. Always.',
        'If the tower was great: blocks back in the box. If the tower fell over: blocks back in the box. If Mum called you for dinner in the middle: blocks back in the box.',
        '`finally` is the "always put the blocks back" rule. Try-with-resources is a box with a lid that closes by itself when you leave the room.'
      ],
      definition: 'A `finally` block after `try` (and its catch blocks) **always** runs: after normal success, after a handled exception, after an unhandled exception, and even after `return`. **Try-with-resources**, `try (Resource r = ...) { }`, closes the resource automatically at the end, using its `close()` method.',
      explain: [
        'Some things must be cleaned up after use: a file you opened, a network connection, a `Scanner`, a lock. Such a thing is called a **resource**. If the cleanup is skipped because of an exception, the resource stays open and wastes memory or blocks other programs.',
        'A `finally` block holds that cleanup. You write it after the last catch block, or right after the try block if there is no catch. Java guarantees it runs whichever way the try block ends.',
        'Try-with-resources is the modern, shorter way for resources. You create the resource in round brackets after `try`. When the try block ends, in any way, Java calls `close()` on it for you. More than one resource is allowed, separated by `;`. They are closed in reverse order: the last one opened is closed first.',
        'This works for every class that **implements** `AutoCloseable`. "Implements" means the class promises to have certain methods, here one method `close()`. You learn the details in [Interfaces](../interfaces/index.html). `Scanner` and every file class from [I/O Basics](../io-basics/index.html) are `AutoCloseable`.',
        'Order of events in try-with-resources with a catch: the try block runs, the resources are closed, and **then** the catch block runs. When the catch starts, the resource is already closed.'
      ],
      why: 'Without `finally` you would need to copy the cleanup into the end of the try block and into every catch block, and you would still miss the case where an exception is not caught. Try-with-resources removes the cleanup code completely, so you cannot forget it.',
      whenUse: '`finally`: for cleanup that is not a resource, like printing "done", resetting a flag or stopping a timer. Try-with-resources: for everything that has a `close()` method, like files, scanners and connections.',
      syntax: '`try { ... } catch (E e) { ... } finally { cleanup(); }` and `try (Type r = new Type()) { use(r); }`',
      fileName: 'FinallyDemo.java',
      code: `public class FinallyDemo {
    static int divide(int a, int b) {
        try {
            System.out.println("  try: " + a + " / " + b);
            return a / b;
        } catch (ArithmeticException e) {
            System.out.println("  catch: " + e.getMessage());
            return 0;
        } finally {
            System.out.println("  finally: always runs");
        }
    }

    public static void main(String[] args) {
        System.out.println("first call");
        int good = divide(10, 2);
        System.out.println("result " + good);

        System.out.println("second call");
        int bad = divide(1, 0);
        System.out.println("result " + bad);
    }
}`,
      output: `first call
  try: 10 / 2
  finally: always runs
result 5
second call
  try: 1 / 0
  catch: / by zero
  finally: always runs
result 0`,
      codeSummary: 'Both calls print the finally line. In the first call the try block returns 5, but before the method really ends, the finally block runs. In the second call the catch block returns 0, and again the finally block runs first.',
      codeExplanation: [
        { label: 'Line 3', code: 'try {', text: 'The work that may fail.' },
        { label: 'Line 5', code: 'return a / b;', text: 'For 10 / 2 this returns 5. Java remembers the 5, runs `finally`, and only then leaves the method.' },
        { label: 'Line 6', code: '} catch (ArithmeticException e) {', text: 'For 1 / 0 the division throws and this catch handles it.' },
        { label: 'Line 8', code: 'return 0;', text: 'The catch also returns. Even this return waits until the finally block is done.' },
        { label: 'Line 9', code: '} finally {', text: 'Starts the block that runs in every case.' },
        { label: 'Line 10', code: 'System.out.println("  finally: always runs");', text: 'Printed in both calls, after the try or catch line and before "result".' },
        { label: 'Line 16', code: 'int good = divide(10, 2);', text: 'All three lines of `divide` that print appear before "result 5", because the method finishes completely before `good` gets its value.' },
        { label: 'Line 20', code: 'int bad = divide(1, 0);', text: 'This time the order is try, catch, finally.' }
      ],
      sections: [
        {
          title: 'Three ways through, one finally',
          mermaid: `flowchart TD
  T["try block"] -->|"no exception"| F["finally block"]
  T -->|"exception, a catch matches"| C["catch block"]
  C --> F
  T -->|"exception, no catch matches"| F2["finally block"]
  F --> N["code after the try statement"]
  F2 --> U["the exception goes on to the caller"]`,
          diagramNote: 'Whatever path the code takes, it passes through a finally block. Only on the last path does the exception go on afterwards.'
        },
        {
          title: 'finally runs even when the program crashes',
          text: ['Here no catch block matches. The finally block still runs, and only after it does the exception leave `main` and stop the program. That is why "closing the door" appears before the stack trace.'],
          fileName: 'FinallyCrash.java',
          code: `public class FinallyCrash {
    public static void main(String[] args) {
        try {
            System.out.println("opening the door");
            String name = null;
            System.out.println(name.length());
        } finally {
            System.out.println("closing the door");
        }
        System.out.println("this line never runs");
    }
}`,
          output: `opening the door
closing the door
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "<local1>" is null
\tat FinallyCrash.main(FinallyCrash.java:6)`,
          tip: '`<local1>` is the variable `name`. The class was compiled without the variable names; compile with `javac -g FinallyCrash.java` and the message says `because "name" is null`.'
        },
        {
          title: 'try-with-resources and AutoCloseable',
          text: [
            'To see when `close()` runs, the class `Lamp` below implements `AutoCloseable` and prints a line in `close()`. Two lamps are opened in the brackets after `try`. Then the try block throws on purpose.',
            'Watch the order: both lamps close (the second one first), and only then does the catch block run.'
          ],
          fileName: 'LampRoom.java',
          code: `public class LampRoom {
    public static void main(String[] args) {
        try (Lamp hall = new Lamp("hall"); Lamp kitchen = new Lamp("kitchen")) {
            System.out.println("working with both lamps");
            Integer.parseInt("no number");
            System.out.println("this line is skipped");
        } catch (NumberFormatException e) {
            System.out.println("catch: " + e.getMessage());
        } finally {
            System.out.println("finally: done");
        }
    }
}

class Lamp implements AutoCloseable {
    private final String room;

    Lamp(String room) {
        this.room = room;
        System.out.println("on:  " + room);
    }

    @Override
    public void close() {
        System.out.println("off: " + room);
    }
}`,
          output: `on:  hall
on:  kitchen
working with both lamps
off: kitchen
off: hall
catch: For input string: "no number"
finally: done`,
          bullets: [
            '`implements AutoCloseable` promises a `public void close()` method. `@Override` tells the compiler that this method fulfils that promise.',
            'Resources close in reverse order: kitchen was opened last, so it closes first.',
            'The close happens before the catch and before the finally.'
          ]
        },
        {
          title: 'finally or try-with-resources?',
          table: {
            head: ['', '`finally`', 'try-with-resources'],
            rows: [
              ['Works with', 'Any code', 'Objects that implement `AutoCloseable`'],
              ['Who writes the cleanup', 'You, in the finally block', 'The class, in `close()`; Java calls it'],
              ['Can you forget it?', 'Yes, if you forget the block', 'No'],
              ['Typical use', 'Print "done", reset a value, stop a timer', '`Scanner`, files, network connections'],
              ['Since', 'Java 1.0', 'Java 7']
            ],
            note: 'You can use both together: try-with-resources for the resource and finally for other cleanup.'
          }
        },
        {
          title: 'Never return from finally',
          text: ['A `return` in a finally block replaces whatever happened before, even an exception. The exception below vanishes without a trace, and the caller gets a wrong value. Keep `return` out of finally; use it only for cleanup.'],
          fileName: 'LostException.java',
          code: `public class LostException {
    @SuppressWarnings("finally")
    static int riskyCount() {
        try {
            throw new IllegalStateException("the counter is broken");
        } finally {
            return 0; // swallows the exception above
        }
    }

    public static void main(String[] args) {
        System.out.println("count = " + riskyCount());
        System.out.println("nobody heard about the broken counter");
    }
}`,
          output: `count = 0
nobody heard about the broken counter`,
          warn: '`@SuppressWarnings("finally")` only silences the warning that `javac -Xlint` gives here. The warning is right: do not write this.'
        }
      ],
      technical: [
        'The compiler copies the finally code into every exit of the try statement: the normal end, the end of each catch block, before each `return`, and into an extra handler that catches anything, runs the finally code and throws the same exception again. That is how "always" works.',
        'For `return a / b;` inside try, the JVM first computes the value and stores it in a hidden local variable, then runs the finally code, then returns the stored value. That is why the finally block cannot change a returned `int` by changing `a`.',
        'Try-with-resources compiles into a try/finally that calls `close()` and is careful with a second problem: if the try block throws and `close()` throws too, the exception from `close()` is attached to the first one as a **suppressed** exception (`e.getSuppressed()`) instead of replacing it. Hand-written finally blocks usually lose one of the two.',
        'The only ways to skip a finally block are to stop the JVM itself, for example `System.exit(0)`, a crash of the JVM, or switching off the computer.'
      ],
      tryIt: {
        steps: [
          'Copy `LampRoom.java` and run it.',
          'Remove the line `Integer.parseInt("no number");` and run it again.',
          'Add a third lamp `Lamp bath = new Lamp("bath")` to the brackets (separate it with `;`).'
        ],
        see: 'without the exception: both lamps on, "working", "this line is skipped" now printed, both lamps off, "finally: done", and no catch line. With three lamps they switch off as bath, kitchen, hall.'
      },
      check: [
        { q: 'The try block contains `return 5;`. Does the finally block still run?', a: 'Yes. Java remembers the 5, runs the finally block, and then returns.' },
        { q: 'In try-with-resources with a catch, which comes first: `close()` or the catch block?', a: '`close()`. The resources are closed as the try block ends, before the catch block starts.' },
        { q: 'What does a class need so that you can use it in `try ( ... )`?', a: 'It must implement `AutoCloseable` (or its child `Closeable`), which means it has a `close()` method.' }
      ],
      keyPoints: [
        '`finally` runs in every case: success, handled exception, unhandled exception, return.',
        'Use `finally` for cleanup that is not a resource.',
        'Use try-with-resources for everything with `close()`.',
        'Resources close in reverse order, before catch and finally run.',
        'Never `return` from a finally block.'
      ],
      commonMistakes: [
        'Closing a resource at the end of the try block: `scanner.close();` as the last line is skipped when an exception comes first. Write `try (Scanner scanner = new Scanner(System.in)) { ... }`.',
        'Using a resource variable after the try: `try (Lamp l = new Lamp("x")) { } l.close();` does not compile; the variable only lives inside.',
        'A `return` in finally. It hides exceptions and replaces return values. Move the return out.',
        'Putting the main work into finally. finally is for cleanup only; it should not throw itself.'
      ],
      related: ['try and catch', 'I/O Basics', 'Interfaces', 'Good Habits with Exceptions']
    }
  ]);
})();
