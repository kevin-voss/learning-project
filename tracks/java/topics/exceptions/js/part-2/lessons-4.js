(function () {
  Java.addCoreLessons('exceptions', [
    {
      id: 'throw',
      title: 'throw: Raise Your Own Exception',
      category: 'practice',
      icon: '!',
      tagline: 'Refuse bad input loudly',
      realWorld: 'A ticket machine at the train station. If you push in a button instead of a coin, it does not print a ticket. It spits the button back out and shows "invalid coin".',
      kid: [
        'Your friend asks you to draw a square with minus three corners. That makes no sense!',
        'You do not draw something strange and pretend it is fine. You say: "I cannot do that. A square needs four corners."',
        'In Java, `throw` is how a method says "I cannot do that, and here is why". The method stops and gives the problem back to whoever asked.'
      ],
      definition: '`throw` hands an exception object to Java and stops the method at once. You create the object with `new`, usually with a message: `throw new IllegalArgumentException("age must be 0 or more")`.',
      explain: [
        'So far Java threw exceptions for you. Your own methods can do it too. When a method gets a value it cannot work with, it should not guess or return nonsense. It should **throw**.',
        '`throw` works like a `return` that goes wrong on purpose. The lines after it in the method do not run. Instead of a result, the caller gets the exception. If the caller has a matching catch, it handles it; if not, the exception goes on up (lesson 8).',
        'Checking the input at the start of a method and throwing is called **validating** the input. A short `if` that throws at the top of a method is called a **guard clause**: it guards the rest of the method from bad values.',
        'Most of the time you throw one of Java\'s ready-made unchecked exceptions. `IllegalArgumentException` means "the argument you gave me is not allowed". `IllegalStateException` means "the object is not in a state where this works right now", for example withdrawing from a closed account.',
        'The message is for the person who reads the stack trace later, maybe you in two weeks. Say what was expected and what came in: `"age must be 0 or more, but was -2"` beats `"error"`.'
      ],
      why: 'A method that silently accepts bad values spreads the problem: a negative price ends up in a total, a bill, a database. Throwing at the first sign stops the problem where it starts, and the trace points right at it.',
      whenUse: 'At the start of a method or constructor when an argument breaks the rules, and whenever a method is asked to do something it cannot do in the current state.',
      syntax: '`if (badCondition) { throw new ExceptionType("what is wrong, and the value"); }`',
      fileName: 'TicketMachine.java',
      code: `public class TicketMachine {
    static int priceInCents(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("age must be 0 or more, but was " + age);
        }
        if (age < 6) {
            return 0;
        }
        if (age < 18) {
            return 150;
        }
        return 300;
    }

    public static void main(String[] args) {
        int[] ages = {35, 4, 12, -2, 70};

        for (int age : ages) {
            System.out.println("age " + age + ": " + priceInCents(age) + " cents");
        }
    }
}`,
      output: `age 35: 300 cents
age 4: 0 cents
age 12: 150 cents
Exception in thread "main" java.lang.IllegalArgumentException: age must be 0 or more, but was -2
\tat TicketMachine.priceInCents(TicketMachine.java:4)
\tat TicketMachine.main(TicketMachine.java:19)`,
      codeSummary: 'The method refuses a negative age with an exception. The first three ages work. For `-2` the guard clause throws, nobody catches it, and the program stops; `70` is never reached. The trace points to line 4, the `throw`, and to line 19, the caller.',
      codeExplanation: [
        { label: 'Line 3', code: 'if (age < 0) {', text: 'The guard clause: check the rule first, before any real work.' },
        { label: 'Line 4', code: 'throw new IllegalArgumentException("age must be 0 or more, but was " + age);', text: '`new` creates the exception object with a message. `throw` hands it to Java and ends the method here.' },
        { label: 'Line 6', code: 'if (age < 6) {', text: 'Only reached with a valid age. The rest of the method can trust `age`.' },
        { label: 'Line 12', code: 'return 300;', text: 'The normal way out. A method ends either with `return` or with `throw`.' },
        { label: 'Line 16', code: 'int[] ages = {35, 4, 12, -2, 70};', text: 'The fourth value breaks the rule.' },
        { label: 'Line 19', code: 'System.out.println("age " + age + ": " + priceInCents(age) + " cents");', text: 'For `-2`, `priceInCents` throws before `println` can print anything, so there is no "age -2" line.' },
        { label: 'Output', code: 'at TicketMachine.priceInCents(TicketMachine.java:4)', text: 'The top `at` line is the `throw` statement: the exception was created there.' }
      ],
      sections: [
        {
          title: 'throw ends the method, like return',
          mermaid: `flowchart TD
  S["method starts"] --> G{"is the argument valid?"}
  G -- "no" --> T["throw new IllegalArgumentException(...)"]
  T --> X["method ends, the caller gets the exception"]
  G -- "yes" --> W["do the real work"]
  W --> R["return the result"]`,
          diagramNote: 'There are two exits: `return` with a value, or `throw` with an exception. Never both.'
        },
        {
          title: 'Three words that look alike',
          table: {
            head: ['Word', 'What it is', 'Example'],
            rows: [
              ['`throw`', 'A statement: throw this exception now', '`throw new IllegalStateException("closed");`'],
              ['`throws`', 'Part of a method header: this method may throw these checked exceptions (lesson 9)', '`static void load() throws IOException`'],
              ['`Throwable`', 'The class at the top of the family tree (lesson 4)', '`class Exception extends Throwable`']
            ]
          }
        },
        {
          title: 'Which exception to throw',
          text: ['You rarely need your own class. Pick the ready-made exception whose name fits the problem.'],
          table: {
            head: ['Exception', 'Throw it when', 'Example message'],
            rows: [
              ['`IllegalArgumentException`', 'An argument breaks the rules', '`"amount must be positive, but was -5"`'],
              ['`IllegalStateException`', 'The object is in the wrong state for this call', '`"account 42 is closed"`'],
              ['`NullPointerException`', 'An argument is `null` but must not be; write `Objects.requireNonNull(name, "name")`', '`"name"`'],
              ['`IndexOutOfBoundsException`', 'A position is outside your own list or table', '`"row 9, but there are 5 rows"`'],
              ['`UnsupportedOperationException`', 'The method exists but this object cannot do it', '`"this list is read-only"`']
            ]
          }
        },
        {
          title: 'Guard a constructor and an object\'s state',
          text: ['Constructors validate too, so an object can never start in a broken state. Here the account refuses a negative start balance, and `withdraw` refuses to work on a closed account or with too little money. The catch in `main` shows each message.'],
          fileName: 'BankDemo.java',
          code: `public class BankDemo {
    public static void main(String[] args) {
        Account account = new Account(100);
        try {
            account.withdraw(30);
            System.out.println("balance: " + account.balance);
            account.withdraw(500);
        } catch (IllegalArgumentException e) {
            System.out.println("refused: " + e.getMessage());
        }

        account.close();
        try {
            account.withdraw(10);
        } catch (IllegalStateException e) {
            System.out.println("refused: " + e.getMessage());
        }
    }
}

class Account {
    int balance;
    boolean open = true;

    Account(int startBalance) {
        if (startBalance < 0) {
            throw new IllegalArgumentException("start balance must be 0 or more, but was " + startBalance);
        }
        balance = startBalance;
    }

    void withdraw(int amount) {
        if (!open) {
            throw new IllegalStateException("the account is closed");
        }
        if (amount > balance) {
            throw new IllegalArgumentException("cannot withdraw " + amount + ", balance is only " + balance);
        }
        balance = balance - amount;
    }

    void close() {
        open = false;
    }
}`,
          output: `balance: 70
refused: cannot withdraw 500, balance is only 70
refused: the account is closed`,
          tip: 'Validate in the method that owns the rule. Then every caller is protected, not only the ones that remember to check.'
        },
        {
          title: 'Good messages and bad messages',
          bullets: [
            'Bad: `throw new RuntimeException("error");`. Which error? Which value?',
            'Bad: `throw new IllegalArgumentException();` with no message. The trace shows only the type.',
            'Good: `throw new IllegalArgumentException("amount must be positive, but was " + amount);` names the rule and the real value.',
            'Good: `throw new IllegalStateException("order 17 is already shipped");` names the object and its state.',
            'Never put secrets (passwords, card numbers) into a message. Traces end up in log files.'
          ]
        }
      ],
      technical: [
        '`throw` compiles to the bytecode `athrow`. It takes the object from the top of the operand stack and starts the same search for a handler that a division by zero starts. For the JVM, an exception you throw and one it throws itself are the same thing.',
        'The stack trace is filled in by the constructor, at `new`, not at `throw`. Normally both are on the same line, so you never notice. If you created the exception in one method and threw it in another, the trace would point to the `new`.',
        'The compiler knows that `throw` ends the method. In `int f() { throw new IllegalStateException(); }` it does not ask for a `return`, and a line directly after a `throw` is a compile error: `unreachable statement`.',
        '`throw null;` compiles but throws a `NullPointerException`. You can only throw a real `Throwable` object.'
      ],
      tryIt: {
        steps: [
          'Copy `TicketMachine.java` and run it.',
          'Wrap the `println` line inside the loop in `try { ... } catch (IllegalArgumentException e) { System.out.println("skipped: " + e.getMessage()); }`.',
          'Run it again.'
        ],
        see: 'first the crash at age -2. After the change: `skipped: age must be 0 or more, but was -2`, and then `age 70: 300 cents`, because the loop goes on.'
      },
      check: [
        { q: 'What happens to the lines after `throw` in the same method?', a: 'They do not run. `throw` ends the method like `return`, but the caller gets an exception instead of a value.' },
        { q: 'Which exception fits "the argument is negative but must be positive"?', a: '`IllegalArgumentException`, with a message that names the rule and the value.' },
        { q: 'What is the difference between `throw` and `throws`?', a: '`throw` is a statement that throws an exception now. `throws` in a method header lists the checked exceptions the method may let out.' }
      ],
      keyPoints: [
        '`throw new SomeException("message")` stops the method and hands the problem to the caller.',
        'Validate arguments at the top of methods and constructors (guard clauses).',
        '`IllegalArgumentException` for bad arguments, `IllegalStateException` for a wrong state.',
        'Messages name the rule and the real value.',
        'A method ends with either `return` or `throw`.'
      ],
      commonMistakes: [
        'Returning a magic value like `-1` for "failed". The caller can forget to check it. Throw an exception instead.',
        'Writing `new IllegalArgumentException("...")` without `throw`. The object is created and thrown away; nothing happens. Write `throw new ...`.',
        'Vague messages like `"error"` or no message at all. Write what was expected and what came in.',
        'Checking too late: after the bad value was already saved or printed. Put the guard clause first.'
      ],
      related: ['How an Exception Travels', 'Your Own Exception Classes', 'Classes & Objects', 'Methods']
    },
    {
      id: 'exception-propagation',
      title: 'How an Exception Travels',
      category: 'concept',
      icon: 'up',
      tagline: 'Up the call stack until someone catches it',
      realWorld: 'A question in a big company. The worker cannot answer it and asks the team leader. The team leader cannot answer either and asks the boss. The question goes up until somebody can answer it.',
      kid: [
        'Grandma asks Mum to make a cake. Mum asks you to get the eggs. You ask your little brother to open the fridge.',
        'The fridge is locked! Your brother cannot do it. He tells you. You cannot get the eggs, so you tell Mum. Maybe Mum knows where the key is.',
        'If Mum does not know either, she tells Grandma. The bad news travels back up, person by person, until someone can fix it. That is how an exception travels.'
      ],
      definition: 'When a method throws and does not catch the exception itself, the method ends at once and the exception goes to its caller. This repeats up the **call stack** until a method with a matching catch is found. This is called **propagation**. If no method catches it, the JVM stops the program.',
      explain: [
        'Methods call methods: `main` calls `orderPizza`, which calls `bake`, which calls `checkOven`. Java keeps them on the call stack, newest on top. Each running method is a frame that waits for the one above it to finish.',
        'When `checkOven` throws, Java first looks for a matching catch inside `checkOven`. There is none, so `checkOven` ends right away, without finishing its lines. Its frame is removed from the stack.',
        'Now the exception appears in `bake`, at the line that called `checkOven`. To `bake` it looks as if that call line threw. Again: no catch, so `bake` ends too. Then the same happens in `orderPizza`.',
        'In `main` the call sits inside a try with a matching catch. The search stops there. The catch block runs, and `main` goes on normally after the try statement. Removing frames on the way up is called **unwinding the stack**.',
        'The methods in the middle never see the exception as a value. They do not need any code for it; they are skipped. Their remaining lines ("end" in the example) never run. If they have finally blocks, those still run on the way up.'
      ],
      why: 'Often the method that finds a problem is not the one that knows what to do about it. `checkOven` knows the oven is cold, but only `main` knows whether to ask the user, try again or give up. Propagation carries the problem to the place that can decide.',
      whenUse: 'Always, without writing anything: every exception propagates. Your job is to decide where to put the catch: at the level that can really do something useful.',
      syntax: 'Nothing to write. A method without a matching catch lets the exception pass through to its caller.',
      fileName: 'PizzaShop.java',
      code: `public class PizzaShop {
    public static void main(String[] args) {
        System.out.println("main: start");
        try {
            orderPizza();
            System.out.println("main: pizza is ready");
        } catch (IllegalStateException e) {
            System.out.println("main: caught -> " + e.getMessage());
        }
        System.out.println("main: end");
    }

    static void orderPizza() {
        System.out.println("  orderPizza: start");
        bake();
        System.out.println("  orderPizza: end");
    }

    static void bake() {
        System.out.println("    bake: start");
        checkOven(false);
        System.out.println("    bake: end");
    }

    static void checkOven(boolean hot) {
        System.out.println("      checkOven: start");
        if (!hot) {
            throw new IllegalStateException("the oven is cold");
        }
        System.out.println("      checkOven: end");
    }
}`,
      output: `main: start
  orderPizza: start
    bake: start
      checkOven: start
main: caught -> the oven is cold
main: end`,
      codeSummary: 'Every method prints "start". Only `main` prints "end": the exception from `checkOven` skips the end of `checkOven`, `bake` and `orderPizza`, and lands in the catch block in `main`.',
      codeExplanation: [
        { label: 'Line 5', code: 'orderPizza();', text: 'The call starts a chain of three more calls. The try around it is the only catch in the whole program.' },
        { label: 'Line 6', code: 'System.out.println("main: pizza is ready");', text: 'Skipped: the exception arrives at line 5 and jumps over this line to the catch.' },
        { label: 'Line 7', code: '} catch (IllegalStateException e) {', text: 'The first matching catch on the way up. The search stops here.' },
        { label: 'Line 10', code: 'System.out.println("main: end");', text: 'Runs: the exception was handled, so `main` goes on normally.' },
        { label: 'Line 16', code: 'System.out.println("  orderPizza: end");', text: 'Never runs. `orderPizza` has no catch, so it ends as soon as the exception comes out of `bake()`.' },
        { label: 'Line 22', code: 'System.out.println("    bake: end");', text: 'Never runs, for the same reason.' },
        { label: 'Line 28', code: 'throw new IllegalStateException("the oven is cold");', text: 'The start of the journey: four frames are on the stack at this moment.' },
        { label: 'Line 30', code: 'System.out.println("      checkOven: end");', text: 'Never runs: `throw` ended the method.' }
      ],
      sections: [
        {
          title: 'The journey as a sequence diagram',
          text: ['A **sequence diagram** shows calls between methods over time, from top to bottom. Solid arrows are calls. The crossed arrows are the exception going back up.'],
          mermaid: `sequenceDiagram
  participant M as main
  participant O as orderPizza
  participant B as bake
  participant C as checkOven
  M->>O: call
  O->>B: call
  B->>C: call checkOven(false)
  C--xB: IllegalStateException
  Note over B: no catch, bake ends
  B--xO: same exception
  Note over O: no catch, orderPizza ends
  O--xM: same exception
  Note over M: catch matches, main goes on`,
          diagramNote: 'The exception object is the same one all the way up. Each method without a catch is left at the line where its call failed.'
        },
        {
          title: 'The call stack shrinks on the way up',
          mermaid: `flowchart TD
  S1["checkOven / bake / orderPizza / main"] -->|"checkOven has no catch"| S2["bake / orderPizza / main"]
  S2 -->|"bake has no catch"| S3["orderPizza / main"]
  S3 -->|"orderPizza has no catch"| S4["main: catch runs"]`,
          diagramNote: 'Each box is the stack, newest frame first. A frame that is removed loses its local variables. That is why the stack trace must be saved inside the exception at the start.'
        },
        {
          title: 'Catch in the middle',
          text: ['Move the catch into `bake`, and `bake` handles the problem itself: it waits and uses a second oven. Now `orderPizza` and `main` never hear about the exception, and all their "end" lines run.'],
          fileName: 'PizzaShopMiddle.java',
          code: `public class PizzaShopMiddle {
    public static void main(String[] args) {
        System.out.println("main: start");
        orderPizza();
        System.out.println("main: end");
    }

    static void orderPizza() {
        System.out.println("  orderPizza: start");
        bake();
        System.out.println("  orderPizza: end");
    }

    static void bake() {
        System.out.println("    bake: start");
        try {
            checkOven(false);
        } catch (IllegalStateException e) {
            System.out.println("    bake: " + e.getMessage() + ", using the second oven");
        }
        System.out.println("    bake: end");
    }

    static void checkOven(boolean hot) {
        if (!hot) {
            throw new IllegalStateException("the oven is cold");
        }
    }
}`,
          output: `main: start
  orderPizza: start
    bake: start
    bake: the oven is cold, using the second oven
    bake: end
  orderPizza: end
main: end`
        },
        {
          title: 'Nobody catches it: the trace is the journey',
          text: ['Without any catch, the exception leaves `main` too, and the JVM prints the trace. Each `at` line is one frame the exception left on its way up. Compare it with the sequence diagram.'],
          fileName: 'PizzaCrash.java',
          code: `public class PizzaCrash {
    public static void main(String[] args) {
        orderPizza();
    }

    static void orderPizza() {
        bake();
    }

    static void bake() {
        checkOven(false);
    }

    static void checkOven(boolean hot) {
        if (!hot) {
            throw new IllegalStateException("the oven is cold");
        }
    }
}`,
          output: `Exception in thread "main" java.lang.IllegalStateException: the oven is cold
\tat PizzaCrash.checkOven(PizzaCrash.java:16)
\tat PizzaCrash.bake(PizzaCrash.java:11)
\tat PizzaCrash.orderPizza(PizzaCrash.java:7)
\tat PizzaCrash.main(PizzaCrash.java:3)`
        },
        {
          title: 'Where should the catch go?',
          table: {
            head: ['Level', 'Knows', 'Good place to catch?'],
            rows: [
              ['The method that finds the problem (`checkOven`)', 'What is wrong', 'Rarely. It should throw and let others decide.'],
              ['A method that has a second plan (`bake` with a second oven)', 'An alternative', 'Yes, if the plan really solves it.'],
              ['The top (`main`, a menu loop, a web request handler)', 'How to talk to the user', 'Yes: show a clear message, ask again or stop.']
            ],
            note: 'Rule of thumb: throw low, catch high. Catch where you can do something better than crash.'
          }
        }
      ],
      technical: [
        'Each frame has its own exception table. When an exception arrives, the JVM checks the table of the current frame for the bytecode position of the failing call. With no match, it pops the frame and repeats in the next one. This loop is the **stack unwinding**.',
        'Popping a frame throws away its local variables. Any object only those variables pointed to becomes garbage that the garbage collector may free later. finally blocks on the way are run before their frame is popped.',
        'If the main thread\'s stack is empty and nobody caught the exception, the JVM calls the thread\'s **uncaught exception handler**. The default one prints `Exception in thread "main"` and the trace. Then the JVM ends with exit code 1.',
        'Unchecked exceptions travel without any marking in the code. Checked exceptions travel the same way, but the compiler makes every method on the way either catch them or declare them with `throws` (next lesson).'
      ],
      tryIt: {
        steps: [
          'Copy `PizzaShop.java` and run it.',
          'Change `checkOven(false)` to `checkOven(true)` and run it again.',
          'Change it back, then move the try/catch from `main` into `orderPizza` around the `bake()` call.'
        ],
        see: 'with `true` every method prints "start" and "end" and "pizza is ready". With the catch in `orderPizza`, "bake: end" is still missing, but "orderPizza: end", "main: pizza is ready" and "main: end" are back.'
      },
      check: [
        { q: 'A method has no catch for an exception that happens inside it. What happens to its remaining lines?', a: 'They are skipped. The method ends at once and the exception goes on to its caller. Only finally blocks still run.' },
        { q: 'Where does the search for a catch stop?', a: 'At the first method on the way up that has a matching catch around the failing call. If there is none, at the top, and the program stops with a trace.' },
        { q: 'Why is "throw low, catch high" a good rule?', a: 'The low method knows what went wrong, but the high one (near the user) knows what to do about it: ask again, show a message, or stop.' }
      ],
      keyPoints: [
        'An uncaught exception ends the method and goes to its caller.',
        'It travels up the call stack until a matching catch is found.',
        'Methods in between are left at the call line; their remaining lines do not run.',
        'If nobody catches it, the JVM prints the trace and stops.',
        'Throw where you find the problem, catch where you can handle it.'
      ],
      commonMistakes: [
        'Catching in every method "to be safe". Only catch where you can handle the problem; let it pass through the others.',
        'Catching low and returning a fake value like `0`, so callers go on with wrong data. Let it travel up instead.',
        'Expecting the lines after a failed call to run. In `bake(); System.out.println("done");` the print is skipped when `bake()` throws.'
      ],
      related: ['Read a Stack Trace', 'throw: Raise Your Own Exception', 'Checked vs Unchecked, and throws', 'Methods']
    }
  ]);
})();
