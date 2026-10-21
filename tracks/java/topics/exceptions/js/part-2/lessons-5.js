(function () {
  Java.addCoreLessons('exceptions', [
    {
      id: 'checked-and-finally',
      title: 'Checked vs Unchecked, and throws',
      category: 'concept',
      icon: 'chk',
      tagline: 'Some failures must be planned for',
      realWorld: 'A school trip form. Before the trip, a parent must sign: "I know my child goes to the zoo". The teacher does not let anyone on the bus without that signature.',
      kid: [
        'Some problems can happen even when everybody is careful: it rains on the picnic day, the bus is late. You must have a plan for those. Your teacher checks that you have one before you leave.',
        'Other problems only happen when someone makes a silly mistake, like forgetting to tie a shoe. Nobody checks a plan for those. You learn to tie your shoes instead.',
        'Java works the same. For the first kind (checked exceptions) the compiler checks that you have a plan. For the second kind (unchecked exceptions) it does not.'
      ],
      definition: 'A **checked exception** is one the compiler forces you to deal with: every method that can throw it must either catch it or declare it with `throws` in its header. **Unchecked exceptions** (`RuntimeException`, `Error` and their subclasses) do not have this rule.',
      explain: [
        'Look at the family tree from lesson 4. Everything under `RuntimeException` or `Error` is **unchecked**. Everything else under `Throwable`, for example `IOException`, `InterruptedException` or `URISyntaxException`, is **checked**.',
        'Checked exceptions are for problems outside your code that can happen even in a correct program: a file is missing, the network is down, the user typed a web address with a space in it. The caller must think about them, so Java makes them part of the method\'s contract.',
        'The rule is called **catch or declare**. If your code calls a method that throws a checked exception, you have two choices. Catch it with try/catch. Or write `throws ThatException` in your own method header and pass it on to your caller, who then has the same two choices.',
        'The `throws` part goes after the parameter list: `static URI parseAddress(String text) throws URISyntaxException`. It does not throw anything by itself. It is a label that says "this method may let this exception out". Several types are separated by commas.',
        'Unchecked exceptions usually mean a bug or a wrong value: `null`, an index too big, a bad argument. Java does not force you to plan for them, because the right answer is to fix the code or check the value first. You can still catch them, as with `NumberFormatException`.'
      ],
      why: 'Checked exceptions make the risky spots visible. When a method header says `throws IOException`, every reader and the compiler know that the call can fail, and nobody can forget to handle it.',
      whenUse: 'You meet checked exceptions with files, the network, waiting (`Thread.sleep`) and parsing addresses. Each time, decide: can I handle it here (catch), or should my caller decide (declare with `throws`)?',
      syntax: '`returnType name(parameters) throws ExceptionA, ExceptionB { ... }`',
      fileName: 'CheckedDemo.java',
      code: `import java.net.URI;
import java.net.URISyntaxException;

public class CheckedDemo {
    // The header warns every caller: this can fail with URISyntaxException.
    static URI parseAddress(String text) throws URISyntaxException {
        return new URI(text);
    }

    public static void main(String[] args) {
        String[] addresses = {"https://example.com/home", "https://exa mple.com"};

        for (String address : addresses) {
            try {
                URI uri = parseAddress(address);
                System.out.println("host: " + uri.getHost());
            } catch (URISyntaxException e) {
                System.out.println("bad address: " + e.getMessage());
            }
        }
    }
}`,
      output: `host: example.com
bad address: Illegal character in authority at index 11: https://exa mple.com`,
      codeSummary: '`new URI(text)` can throw the checked `URISyntaxException`. `parseAddress` does not handle it and declares it with `throws`. `main` calls `parseAddress`, so `main` must catch it, and it does. The second address has a space, which is not allowed.',
      codeExplanation: [
        { label: 'Line 1', code: 'import java.net.URI;', text: '`URI` is Java\'s class for a web address. It lives in the package `java.net`, so you import it.' },
        { label: 'Line 2', code: 'import java.net.URISyntaxException;', text: 'The checked exception class also needs an import, because it is not in `java.lang`.' },
        { label: 'Line 6', code: 'static URI parseAddress(String text) throws URISyntaxException {', text: 'Declare: "I do not handle this, my caller must". Without `throws` here, this line would not compile.' },
        { label: 'Line 7', code: 'return new URI(text);', text: 'The constructor of `URI` is declared with `throws URISyntaxException`. That is why the rule applies.' },
        { label: 'Line 14', code: 'try {', text: 'Catch: `main` is the place that can react, so it handles the exception.' },
        { label: 'Line 15', code: 'URI uri = parseAddress(address);', text: 'Calling a method with a checked exception in its header. Outside a matching try, the compiler would refuse it.' },
        { label: 'Line 17', code: '} catch (URISyntaxException e) {', text: 'Handles the bad address. The loop goes on afterwards.' },
        { label: 'Output', code: 'Illegal character in authority at index 11', text: 'The "authority" is the host part. Index 11 is the space: counting from 0, `https://exa` fills the places 0 to 10.' }
      ],
      sections: [
        {
          title: 'Checked and unchecked side by side',
          table: {
            head: ['', 'Checked', 'Unchecked'],
            rows: [
              ['Which classes', 'Subclasses of `Exception` that are not `RuntimeException`', '`RuntimeException`, `Error` and their subclasses'],
              ['Examples', '`IOException`, `InterruptedException`, `URISyntaxException`', '`NullPointerException`, `IllegalArgumentException`, `ArithmeticException`'],
              ['Typical cause', 'The world outside: files, network, time', 'A bug or a wrong value in your program'],
              ['Compiler rule', 'Catch or declare with `throws`, or it does not compile', 'None'],
              ['Usual fix', 'Handle it: message, retry, other plan', 'Fix the code or check the value first']
            ]
          }
        },
        {
          title: 'Forget the rule, and javac refuses',
          text: ['Here `parseAddress` neither catches nor declares. `javac` stops with the most famous compile error about exceptions. Both fixes work: add `throws URISyntaxException` to the header, or wrap the line in try/catch.'],
          fileName: 'NoDeclare.java',
          code: `import java.net.URI;

public class NoDeclare {
    static URI parseAddress(String text) {
        return new URI(text);
    }

    public static void main(String[] args) {
        System.out.println(parseAddress("https://example.com"));
    }
}`,
          noRun: true,
          output: `NoDeclare.java:5: error: unreported exception URISyntaxException; must be caught or declared to be thrown
        return new URI(text);
               ^
1 error`,
          warn: 'This program does not compile on purpose. The output is what `javac` prints.'
        },
        {
          title: 'The decision for every checked exception',
          mermaid: `flowchart TD
  A["your code calls a method that throws a checked exception"] --> B{"can you handle it here?"}
  B -- "yes" --> C["catch it with try and catch"]
  B -- "no" --> D["declare it: add throws TheException to your header"]
  D --> E["your caller faces the same question"]
  E --> B`,
          diagramNote: 'Declaring moves the question one level up the call stack. At the top, someone must catch it, or `main` declares it and the JVM prints the trace.'
        },
        {
          title: 'main can declare too',
          text: [
            '`Thread.sleep(ms)` pauses the program and is declared with `throws InterruptedException` (the pause could be interrupted by another part of the program). In a small program you can let `main` declare it.',
            'If the exception really happens, it leaves `main` and the JVM prints the trace, the same as an unchecked crash. Fine for practice programs; in real programs, catch near the top and print a clear message.'
          ],
          fileName: 'Countdown.java',
          code: `public class Countdown {
    public static void main(String[] args) throws InterruptedException {
        for (int i = 3; i >= 1; i--) {
            System.out.println(i + " ...");
            Thread.sleep(100); // may throw InterruptedException (checked)
        }
        System.out.println("Go!");
    }
}`,
          output: `3 ...
2 ...
1 ...
Go!`
        },
        {
          title: 'throws can list unchecked ones too, but need not',
          bullets: [
            'You may write `throws IllegalArgumentException` in a header to document it. The compiler does not require it and does not check callers.',
            'Several checked types: `static void load(String name) throws IOException, InterruptedException`.',
            'A parent type covers its children: `throws IOException` also covers `FileNotFoundException`.',
            'Avoid `throws Exception` in real methods. It tells the caller nothing about what can go wrong.'
          ],
          tip: 'For your own exceptions, most Java developers today choose unchecked (`extends RuntimeException`) unless the caller can really do something about the problem.'
        }
      ],
      technical: [
        'Checked exceptions exist only in the compiler. `javac` looks at every call and every `throw` and checks that each checked type is caught by a surrounding try or listed in the method\'s `throws`. The JVM itself treats checked and unchecked exceptions the same way.',
        'The `throws` list is stored in the `.class` file as the method\'s `Exceptions` attribute. That is how `javac` knows that `new URI(...)` throws `URISyntaxException`, although you only have the compiled class, not its source.',
        'A method that **overrides** another (redefines it in a subclass, like `close()` in lesson 6) may not add new checked exceptions to its `throws` list. It may list fewer or none. That is why `Lamp.close()` could leave out the `throws Exception` that `AutoCloseable.close()` declares.',
        'Other JVM languages, such as Kotlin, have no checked exceptions at all. In Java the rule remains, so you meet it in every file and network API.'
      ],
      tryIt: {
        steps: [
          'Copy `CheckedDemo.java` and run it.',
          'Remove `throws URISyntaxException` from line 6 and compile again.',
          'Put it back. Remove the try/catch in `main` (keep the two lines inside) and compile again. Then add `throws URISyntaxException` to the header of `main`.'
        ],
        see: '`unreported exception URISyntaxException; must be caught or declared to be thrown` twice. After adding `throws` to `main`, it compiles: the first address prints its host, and the second one stops the program with a stack trace.'
      },
      check: [
        { q: 'Is `NumberFormatException` checked or unchecked?', a: 'Unchecked. It is a subclass of `IllegalArgumentException`, which is a `RuntimeException`.' },
        { q: 'Your method calls `Thread.sleep(500)`. What are your two options?', a: 'Catch `InterruptedException` in a try/catch, or declare it with `throws InterruptedException` in your method header.' },
        { q: 'Does `throws` in a method header throw an exception?', a: 'No. It only declares that the method may let that exception out. `throw` (without s) is the statement that throws.' }
      ],
      keyPoints: [
        'Checked: subclasses of `Exception` except `RuntimeException`. Unchecked: `RuntimeException` and `Error` families.',
        'For checked exceptions the compiler demands: catch or declare.',
        '`throws` in the header declares; it passes the question to the caller.',
        'Checked exceptions are for problems from outside: files, network, time.',
        'Unchecked exceptions usually point to a bug or a bad value.'
      ],
      commonMistakes: [
        'Adding `throws Exception` everywhere to silence the compiler. Name the exact type, and catch it where you can handle it.',
        'Catching a checked exception with an empty block to make `javac` happy: `catch (InterruptedException e) { }`. At least print a message.',
        'Mixing up `throw` and `throws`: `throws new IllegalArgumentException()` does not compile. Statements use `throw`, headers use `throws`.',
        'Expecting `throws` on unchecked exceptions to be enforced. The compiler only checks checked ones.'
      ],
      related: ['The Exception Family Tree', 'How an Exception Travels', 'I/O Basics', 'Your Own Exception Classes']
    },
    {
      id: 'custom-exceptions',
      title: 'Your Own Exception Classes',
      category: 'deeper',
      icon: 'new',
      tagline: 'Give your problem its own name',
      realWorld: 'Labels on the drawers in a workshop. Instead of one big drawer "stuff", there is one for screws, one for nails and one for tape. You find the right thing at once.',
      kid: [
        'When you are sick, "I feel bad" does not help the doctor much. "My tummy hurts after I ate ice cream" helps a lot.',
        'Your own exception class is like giving a problem its exact name. Then everybody knows at once what happened, and they can catch exactly that problem.'
      ],
      definition: 'You write your own exception by making a class that **extends** `Exception` (checked) or `RuntimeException` (unchecked). Its constructor passes the message to the parent with `super(message)`. It can carry extra data and a **cause**, the exception that started the problem.',
      explain: [
        '`class OutOfStockException extends RuntimeException` means: "my class is a special kind of `RuntimeException`". It inherits everything a `RuntimeException` has: the message, the stack trace, `getMessage()`. You only add a name and maybe some fields.',
        'The constructor calls `super(message)`. `super(...)` calls the constructor of the parent class, here the one that stores the message. It must be the first line of your constructor.',
        'Extra fields make the exception useful for the catcher. An `InsufficientFundsException` can carry the amount that is missing, so the catch block can say "you need 20 more" without parsing the message text.',
        'Often one problem causes another: a `NumberFormatException` while reading an order means "this order is invalid". You can **wrap** the first exception in your own: `new InvalidOrderException("order line 3 is broken", e)`. The original becomes the **cause**. The trace then shows both, with a `Caused by:` part.',
        'Choose the parent with lesson 9 in mind: `extends RuntimeException` (unchecked) for most cases; `extends Exception` (checked) when every caller must plan for the problem.'
      ],
      why: 'A custom type lets callers catch exactly your problem and nothing else, and carry data about it. Wrapping with a cause keeps the full story: what your program was doing, and what went wrong deep inside.',
      whenUse: 'When no ready-made exception fits, when callers should be able to catch this one problem separately, or when you want to add data or translate a low-level exception into a message about your own program.',
      syntax: '`class NameException extends RuntimeException { NameException(String message) { super(message); } }`',
      fileName: 'Shop.java',
      code: `public class Shop {
    static int stock = 3;

    static void buy(int amount) {
        if (amount > stock) {
            throw new OutOfStockException(amount, stock);
        }
        stock = stock - amount;
        System.out.println("bought " + amount + ", left " + stock);
    }

    public static void main(String[] args) {
        try {
            buy(2);
            buy(5);
        } catch (OutOfStockException e) {
            System.out.println("sorry: " + e.getMessage());
            System.out.println("missing: " + e.missing);
        }
    }
}

class OutOfStockException extends RuntimeException {
    final int missing;

    OutOfStockException(int wanted, int available) {
        super("wanted " + wanted + ", but only " + available + " left");
        this.missing = wanted - available;
    }
}`,
      output: `bought 2, left 1
sorry: wanted 5, but only 1 left
missing: 4`,
      codeSummary: '`OutOfStockException` is a new unchecked exception with its own field `missing`. `buy` throws it when the stock is too low; `main` catches exactly this type and reads both the message and the extra number.',
      codeExplanation: [
        { label: 'Line 6', code: 'throw new OutOfStockException(amount, stock);', text: 'Thrown like any other exception. The constructor builds the message from the two numbers.' },
        { label: 'Line 16', code: '} catch (OutOfStockException e) {', text: 'Catches only this problem. A `NullPointerException` from a bug would not land here.' },
        { label: 'Line 18', code: 'System.out.println("missing: " + e.missing);', text: 'The extra field: data for the catcher, no need to read it out of the message text.' },
        { label: 'Line 23', code: 'class OutOfStockException extends RuntimeException {', text: 'The new class is a `RuntimeException`, so it is unchecked: `buy` needs no `throws`.' },
        { label: 'Line 24', code: 'final int missing;', text: '`final` means the value is set once in the constructor and never changes. Exceptions should not change after they are created.' },
        { label: 'Line 27', code: 'super("wanted " + wanted + ", but only " + available + " left");', text: 'Hands the message to the parent constructor, which stores it for `getMessage()`.' },
        { label: 'Line 28', code: 'this.missing = wanted - available;', text: 'Stores the extra data after `super(...)`.' }
      ],
      sections: [
        {
          title: 'Where your class sits in the tree',
          mermaid: `classDiagram
  Exception <|-- RuntimeException
  RuntimeException <|-- OutOfStockException
  RuntimeException <|-- InvalidOrderException
  Exception <|-- InsufficientFundsException
  class OutOfStockException {
    int missing
  }
  class InsufficientFundsException {
    int needed
  }`,
          diagramNote: 'The two classes under `RuntimeException` are unchecked. `InsufficientFundsException` extends `Exception` directly, so it is checked.'
        },
        {
          title: 'A checked custom exception',
          text: ['Extend `Exception` when the caller must plan for the problem. Now `pay` must declare it with `throws`, and the compiler makes `main` catch it.'],
          fileName: 'Wallet.java',
          code: `public class Wallet {
    static int coins = 10;

    static void pay(int price) throws InsufficientFundsException {
        if (price > coins) {
            throw new InsufficientFundsException(price - coins);
        }
        coins = coins - price;
        System.out.println("paid " + price + ", " + coins + " coins left");
    }

    public static void main(String[] args) {
        try {
            pay(4);
            pay(9);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage() + " (save up " + e.needed + " coins)");
        }
    }
}

class InsufficientFundsException extends Exception {
    final int needed;

    InsufficientFundsException(int needed) {
        super("not enough coins");
        this.needed = needed;
    }
}`,
          output: `paid 4, 6 coins left
not enough coins (save up 3 coins)`
        },
        {
          title: 'Wrap a cause and read "Caused by"',
          text: [
            'Here a text order line `"3 x apple"` should hold a number first. Parsing `"three"` throws a `NumberFormatException`. The method wraps it in its own `InvalidOrderException` that says which line was broken, and passes the original as the cause.',
            'Nobody catches it, so you see the full trace: first your exception, then `Caused by:` with the original. `... 2 more` means "the remaining frames are the same as above".'
          ],
          fileName: 'OrderReader.java',
          code: `public class OrderReader {
    static int readCount(String line, int lineNumber) {
        try {
            return Integer.parseInt(line.split(" ")[0]);
        } catch (NumberFormatException e) {
            throw new InvalidOrderException("order line " + lineNumber + " has no count: " + line, e);
        }
    }

    public static void main(String[] args) {
        System.out.println(readCount("3 x apple", 1));
        System.out.println(readCount("three x pear", 2));
    }
}

class InvalidOrderException extends RuntimeException {
    InvalidOrderException(String message, Throwable cause) {
        super(message, cause);
    }
}`,
          output: `3
Exception in thread "main" InvalidOrderException: order line 2 has no count: three x pear
\tat OrderReader.readCount(OrderReader.java:6)
\tat OrderReader.main(OrderReader.java:12)
Caused by: java.lang.NumberFormatException: For input string: "three"
\tat java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)
\tat java.base/java.lang.Integer.parseInt(Integer.java:565)
\tat java.base/java.lang.Integer.parseInt(Integer.java:662)
\tat OrderReader.readCount(OrderReader.java:4)
\t... 1 more`,
          tip: 'Always pass the cause when you wrap: `new MyException("...", e)`. Without it, the original trace is lost.'
        },
        {
          title: 'Checklist for a good exception class',
          bullets: [
            'The name ends in `Exception` and says the problem: `OutOfStockException`, not `ShopError`.',
            'Extend `RuntimeException` unless every caller must handle it; then extend `Exception`.',
            'Offer a constructor with a message, and one with message and cause: `super(message, cause)`.',
            'Extra data goes into `final` fields with clear names.',
            'Do not create a new class when a ready-made one fits, like `IllegalArgumentException`.'
          ]
        }
      ],
      technical: [
        '`Throwable` stores the message in a private field and the cause in another. `super(message)` and `super(message, cause)` call the matching `Throwable` constructors through `RuntimeException` and `Exception`. `getCause()` returns the stored cause.',
        'When printing a trace, `printStackTrace()` prints the exception, then for each cause a `Caused by:` block. To keep it short, it leaves out the frames a cause shares with the exception above it and writes `... n more` instead.',
        'Your exception class has no package here, so the trace shows `InvalidOrderException` without `java.lang.` in front. In a real project it would read `shop.orders.InvalidOrderException`.',
        'Exceptions can be **serialized** (turned into bytes and sent somewhere). That is why some editors warn about a missing `serialVersionUID` field. For learning programs you can ignore that warning.'
      ],
      tryIt: {
        steps: [
          'Copy `Shop.java` and run it.',
          'Change `extends RuntimeException` to `extends Exception` and compile.',
          'Fix the error by adding `throws OutOfStockException` to `buy`. Compile and run again.'
        ],
        see: 'after the change: `unreported exception OutOfStockException; must be caught or declared to be thrown` at the `throw` line. After adding `throws` to `buy`, the output is the same as before.'
      },
      check: [
        { q: 'What makes your exception class checked or unchecked?', a: 'Its parent: `extends Exception` makes it checked, `extends RuntimeException` makes it unchecked.' },
        { q: 'What does `super(message)` do in an exception constructor?', a: 'It calls the parent constructor, which stores the message so that `getMessage()` and the stack trace show it.' },
        { q: 'Why pass `e` as a cause when you wrap an exception?', a: 'So the original exception and its trace are kept. The output then shows a `Caused by:` part with the real origin.' }
      ],
      keyPoints: [
        'Your own exception: a class that extends `RuntimeException` or `Exception`.',
        'Pass the message with `super(message)`, as the first line of the constructor.',
        'Extra `final` fields give the catcher data about the problem.',
        'Wrap with a cause: `new MyException("what we were doing", e)`.',
        '`Caused by:` in a trace shows the original problem.'
      ],
      commonMistakes: [
        'Forgetting `super(message)`. Then `getMessage()` returns `null`. Always pass the message to the parent.',
        'Wrapping without the cause: `throw new InvalidOrderException("bad order");` inside a catch. Pass `e` too, or the original trace is lost.',
        'Extending `Throwable` or `Error`. Extend `Exception` or `RuntimeException`.',
        'Making a new class for every small case. Use `IllegalArgumentException` and `IllegalStateException` when they fit.'
      ],
      related: ['The Exception Family Tree', 'Checked vs Unchecked, and throws', 'throw: Raise Your Own Exception', 'Classes & Objects']
    }
  ]);
})();
