// Testing lessons 5–6: the assertion toolbox, and testing exceptions with assertThrows.
(function () {
  Java.addCoreLessons('testing', [
    {
      id: 'assertions',
      title: 'Assertions',
      category: 'practice',
      icon: '=',
      tagline: 'assertEquals, assertTrue, assertAll and their messages',
      realWorld: 'A doctor\'s check-up has many small checks: height, weight, eyes, ears. Each check has its own tool. Assertions are the tools for checking your code.',
      kid: [
        'You check your school bag before you leave. Is the lunch box in it? Yes or no. How many pencils? It should be 3. Is the bag empty? It should not be.',
        'Each of those is a different kind of question. Some ask "is it the same number?", some ask "is it true?". You pick the question that fits.',
        'And if you want to know **everything** that is missing, not only the first thing, you check the whole list and then tell your mum all of it at once. That is `assertAll`.'
      ],
      definition: 'An **assertion** is a JUnit method that checks one fact and fails the test with a clear message when the fact is false. The most used are `assertEquals`, `assertTrue`, `assertFalse`, `assertNull`, `assertThrows` and `assertAll`.',
      explain: [
        'All assertions live in the class `org.junit.jupiter.api.Assertions`. You import the ones you use with `import static`. Each assertion either returns quietly (the fact holds) or throws an `AssertionFailedError` (it does not). The first failing assertion ends the test method right there.',
        '`assertEquals(expected, actual)` compares two values. For numbers and `char` it compares the values; for objects such as `String` or `List` it calls `equals`, so two different objects with the same content are equal. `assertTrue(condition)` and `assertFalse(condition)` check a `boolean`.',
        'Every assertion has a version with one more argument at the end: a **message**. `assertEquals(300, cart.totalCents(), "total of apple + bread in cents")`. The message is printed in front of the values when the test fails. Use it when the bare values alone would not tell you which fact broke.',
        '`assertAll(…)` takes several checks and runs **all** of them, even when the first one fails. Then it reports every failure together. Each check is written as a **lambda**: `() -> assertEquals(2, cart.count())`. A lambda is a short way to write "a piece of code to run later": `()` means it takes no input, `->` separates the input from the code. `assertAll` runs each piece for you inside its own safety net.',
        'Decimal numbers (`double`) are stored in binary and are often a tiny bit off: `0.1 + 0.2` is `0.30000000000000004`. So for `double` you pass a third number, the **delta**: how far apart the two values may be. `assertEquals(0.3, sum, 0.000001)` passes.'
      ],
      why: 'The right assertion gives the right message. `assertTrue(count == 2)` only says "expected true"; `assertEquals(2, count)` says "expected 2 but was 3".',
      whenUse: '`assertEquals` for values, `assertTrue`/`assertFalse` for yes/no questions, `assertAll` when one action changes several things you want to see together.',
      syntax: '`assertEquals(expected, actual)` · `assertEquals(expected, actual, "message")` · `assertTrue(condition)` · `assertAll(() -> …, () -> …)`',
      fileName: 'src/test/java/CartTest.java',
      code: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CartTest {

    @Test
    void newCartIsEmpty() {
        Cart cart = new Cart();
        assertTrue(cart.isEmpty());
        assertEquals(0, cart.totalCents());
    }

    @Test
    void addingAnItemChangesCountAndTotal() {
        Cart cart = new Cart();
        cart.add("apple", 50);
        cart.add("bread", 250);

        assertAll(
            () -> assertEquals(2, cart.count()),
            () -> assertEquals(300, cart.totalCents()),
            () -> assertTrue(cart.contains("bread")),
            () -> assertFalse(cart.isEmpty())
        );
    }
}`,
      output: `[INFO] Running CartTest
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.001 s -- in CartTest
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] BUILD SUCCESS`,
      codeSummary: 'Two tests for a shopping cart (the `Cart` class is in step 1 below). The second test checks four facts after one action and uses `assertAll` so every broken fact is reported. Real `mvn test` output.',
      commands: [
        { label: 'Run only this class', note: 'In the folder with `pom.xml`.', command: 'mvn test -Dtest=CartTest' }
      ],
      codeExplanation: [
        { label: 'Line 3', code: 'import static org.junit.jupiter.api.Assertions.assertAll;', text: 'One static import per assertion you use. (`import static org.junit.jupiter.api.Assertions.*;` imports all of them at once.)' },
        { label: 'Line 13', code: 'assertTrue(cart.isEmpty());', text: '`isEmpty()` returns a `boolean`. `assertTrue` fails if it is `false`.' },
        { label: 'Line 14', code: 'assertEquals(0, cart.totalCents());', text: 'A second fact in the same test. If line 13 fails, this line never runs.' },
        { label: 'Lines 20–21', code: 'cart.add("apple", 50);', text: 'Arrange and Act: put two things into the cart, 50 + 250 cents.' },
        { label: 'Line 23', code: 'assertAll(', text: 'Starts a group. Every check inside runs, even after a failure.' },
        { label: 'Line 24', code: '() -> assertEquals(2, cart.count()),', text: 'A lambda: code handed to `assertAll` to run later. Commas separate the checks.' },
        { label: 'Line 26', code: '() -> assertTrue(cart.contains("bread")),', text: '`contains` uses `equals`, so the text must match exactly, including upper and lower case.' },
        { label: 'Line 27', code: '() -> assertFalse(cart.isEmpty())', text: 'The opposite of `assertTrue`. Prefer it over `assertTrue(!cart.isEmpty())`, which is harder to read.' }
      ],
      sections: [
        {
          title: 'The class under test',
          text: ['This goes in `src/main/java/Cart.java`. Prices are in cents. A negative price is refused with an exception; the next lesson tests that.'],
          fileName: 'src/main/java/Cart.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class Cart {
    private final List<String> items = new ArrayList<>();
    private int totalCents = 0;

    public void add(String item, int priceCents) {
        if (priceCents < 0) {
            throw new IllegalArgumentException("price must not be negative: " + priceCents);
        }
        items.add(item);
        totalCents += priceCents;
    }

    public int count() {
        return items.size();
    }

    public int totalCents() {
        return totalCents;
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    public boolean contains(String item) {
        return items.contains(item);
    }
}`
        },
        {
          title: 'The assertion toolbox',
          table: {
            head: ['Assertion', 'Passes when', 'Example'],
            rows: [
              ['`assertEquals(e, a)`', '`e` equals `a` (`equals` for objects)', '`assertEquals(2, cart.count())`'],
              ['`assertNotEquals(e, a)`', 'they differ', '`assertNotEquals(0, total)`'],
              ['`assertEquals(e, a, delta)`', 'two `double`s are at most `delta` apart', '`assertEquals(0.3, sum, 0.000001)`'],
              ['`assertTrue(c)` / `assertFalse(c)`', 'the condition is `true` / `false`', '`assertTrue(cart.isEmpty())`'],
              ['`assertNull(x)` / `assertNotNull(x)`', '`x` is / is not `null`', '`assertNotNull(map.get("id"))`'],
              ['`assertSame(e, a)`', 'both are the very same object (`==`)', 'rarely needed'],
              ['`assertThrows(Type.class, () -> …)`', 'the code throws that exception', 'next lesson'],
              ['`assertAll(() -> …, () -> …)`', 'every check inside passes', 'see step 4'],
              ['`fail("why")`', 'never: it always fails', 'marks code that must not be reached']
            ],
            note: 'Lists compare their content in order: `assertEquals(List.of("a", "b"), names)` passes when `names` holds exactly "a" then "b".'
          }
        },
        {
          title: 'Reading a real failure, with a message',
          text: [
            'Below, `Cart.add` had a bug: `totalCents = priceCents;` instead of `+=`. The test used separate assertions with messages. This is the real line from `mvn test`.',
            'Read it from left to right: test class and method, the **line number** in the test file, your message, then `==>`, then the two values. Only the **first** failing assertion is reported, because it stops the test method.'
          ],
          codeLanguage: 'plaintext',
          fileName: 'mvn test (bug: = instead of +=)',
          code: `[ERROR]   CartPlainTest.addingAnItemChangesCountAndTotal:15 total of apple + bread in cents ==> expected: <300> but was: <250>`,
          tip: '250 is the price of the bread alone. "Only the last price is kept" is a strong hint: look for `=` where `+=` belongs.'
        },
        {
          title: 'assertAll reports everything at once',
          text: [
            'Now the same bug plus a second one: `add` stored the item in upper case ("BREAD"). With `assertAll`, both broken facts appear in one run. Without it you would fix one, run again, and only then see the second.'
          ],
          mermaid: `flowchart TB
  subgraph S["separate assertions"]
    direction LR
    A1["count OK"] --> A2["total FAILS"] --> A3["stop here"]
  end
  subgraph G["assertAll"]
    direction LR
    B1["count OK"] --> B2["total FAILS"] --> B3["contains FAILS"] --> B4["isEmpty OK"] --> B5["2 failures"]
  end
  S ~~~ G`,
          diagramNote: 'Separate assertions stop at the first failure. `assertAll` runs every check and collects the failures.',
          codeLanguage: 'plaintext',
          fileName: 'mvn test (two bugs, real output)',
          code: `[ERROR] CartTest.addingAnItemChangesCountAndTotal -- Time elapsed: 0.003 s <<< FAILURE!
org.opentest4j.MultipleFailuresError:
Multiple Failures (2 failures)
\torg.opentest4j.AssertionFailedError: expected: <300> but was: <250>
\torg.opentest4j.AssertionFailedError: expected: <true> but was: <false>
\tat CartTest.addingAnItemChangesCountAndTotal(CartTest.java:23)`
        },
        {
          title: 'Decimal numbers need a delta',
          text: ['First see the problem in plain Java. Then the JUnit version.'],
          fileName: 'DecimalCompare.java',
          code: `public class DecimalCompare {
    public static void main(String[] args) {
        double sum = 0.1 + 0.2;
        System.out.println(sum);
        System.out.println(sum == 0.3);
        System.out.println(Math.abs(sum - 0.3) < 0.000001);
    }
}`,
          output: `0.30000000000000004
false
true`,
          bullets: [
            '`assertEquals(0.3, 0.1 + 0.2)` fails for real with `expected: <0.3> but was: <0.30000000000000004>`.',
            '`assertEquals(0.3, 0.1 + 0.2, 0.000001)` passes: the delta allows a tiny difference.',
            'For money, avoid `double` altogether: count cents in an `int` or `long`, like `Cart` does.'
          ]
        }
      ],
      technical: [
        'Each assertion is a `static` method. On failure it builds an `org.opentest4j.AssertionFailedError` that carries the expected and actual values as fields. Editors read those fields to show a side-by-side "diff" view. The message text `expected: <300> but was: <250>` is built from the values\' `toString()`.',
        'The message argument also exists as a lambda, `() -> "total is " + expensiveText()`. JUnit only builds that text when the assertion fails, which saves time when building the message is costly.',
        '`assertAll` runs each lambda inside its own `try`/`catch`, collects every thrown `AssertionError`, and at the end throws one `MultipleFailuresError` that holds them all (they appear as "Suppressed" in the full stack trace). `assertEquals` on objects calls `expected.equals(actual)`, so your own classes need a correct `equals` method for this to work. Without one, two objects with the same content are "not equal".'
      ],
      tryIt: {
        steps: [
          'Add `Cart.java` to `src/main/java` and `CartTest.java` to `src/test/java`. Run `mvn test -Dtest=CartTest`.',
          'Break `Cart.add`: change `totalCents += priceCents;` to `totalCents = priceCents;`. Run again.',
          'Also change `items.add(item);` to `items.add(item.toUpperCase());`. Run again.',
          'Undo both changes.'
        ],
        see: 'First one failure `expected: <300> but was: <250>`, then `Multiple Failures (2 failures)` with both values listed. Green again after the undo.'
      },
      check: [
        { q: 'Why is `assertEquals(2, cart.count())` better than `assertTrue(cart.count() == 2)`?', a: 'On failure, `assertEquals` prints both numbers (`expected: <2> but was: <3>`). `assertTrue` can only say `expected: <true> but was: <false>`.' },
        { q: 'A test has three separate assertions and the first one fails. Do the other two run?', a: 'No. The first failing assertion throws and ends the method. Use `assertAll` to run all of them.' },
        { q: 'How do you compare two `double` values in a test?', a: 'With a delta: `assertEquals(expected, actual, 0.000001)`. Exact comparison fails for values like `0.1 + 0.2`.' }
      ],
      keyPoints: [
        'Pick the assertion that gives the clearest message.',
        'The first failing assertion stops the test method.',
        '`assertAll` runs every check and reports all failures.',
        'Add a message when the values alone are not clear.',
        'Use a delta for `double`; use `int` cents for money.'
      ],
      commonMistakes: [
        '`assertTrue(name == "Sam")`: compares references, not text. Fix: `assertEquals("Sam", name)`.',
        '`assertEquals(0.3, 0.1 + 0.2)` without a delta. Fix: `assertEquals(0.3, 0.1 + 0.2, 0.000001)`.',
        '`assertAll(assertEquals(2, a), assertEquals(3, b))` without `() ->`. It does not compile, because `assertEquals` returns nothing. Fix: wrap each check in `() -> …`.',
        'A test with no assertion at all. It always passes. Fix: every test needs at least one assertion.'
      ],
      related: ['testing-exceptions', 'first-junit-test', 'Strings']
    },
    {
      id: 'testing-exceptions',
      title: 'Testing Exceptions',
      category: 'practice',
      icon: '!',
      tagline: 'assertThrows checks that bad input is refused',
      realWorld: 'A vending machine must spit out a fake coin. To test that, you push a fake coin in on purpose and watch: does it come back out? If the machine swallows it, the test failed.',
      kid: [
        'Your little brother is not allowed to cross the road alone. You want to check that the garden door stays shut.',
        'So you push the door on purpose. If it stays shut, good: that is what you wanted. If it swings open, something is broken.',
        'Testing exceptions is the same. You give your code bad input **on purpose** and check that it says "no" in the right way.'
      ],
      definition: '`assertThrows(SomeException.class, () -> code)` runs the code and passes only if that code throws `SomeException` (or a subclass). It returns the caught exception, so you can also check its message.',
      explain: [
        'Your code should refuse bad input. In [Exceptions](../exceptions/index.html) you learned to `throw new IllegalArgumentException(…)` for that. A refusal is a behavior too, so it needs a test: "a negative price is refused".',
        'You cannot write `cart.add("broken", -5);` directly in the test. The exception would fly out of the test method and JUnit would report an **error**. Instead you hand the code to `assertThrows` as a lambda, `() -> cart.add("broken", -5)`. `assertThrows` runs it inside its own `try`/`catch` and checks what came out.',
        'Three outcomes are possible. The expected exception is thrown: pass. Nothing is thrown: fail with `Expected java.lang.IllegalArgumentException to be thrown, but nothing was thrown.` A different exception is thrown: fail with `Unexpected exception type thrown`.',
        '`assertThrows` **returns** the exception it caught. Keep it in a variable and check `getMessage()`. That proves the code refused for the right reason, not by accident somewhere else. Also check that nothing changed: a refused item must not be in the cart.',
        'The opposite also matters at the border: `assertDoesNotThrow(() -> cart.add("free sticker", 0))` checks that a price of exactly 0 is allowed.'
      ],
      why: 'Refusing bad input protects your program. Without a test, a later change can remove the check and nobody notices.',
      whenUse: 'Every time your method throws on purpose: invalid arguments, empty input, a missing file, a state where an action is not allowed.',
      syntax: '`ExceptionType e = assertThrows(ExceptionType.class, () -> code());` then `assertEquals("message", e.getMessage());`',
      fileName: 'src/test/java/CartExceptionTest.java',
      code: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CartExceptionTest {

    @Test
    void negativePriceIsRefused() {
        Cart cart = new Cart();

        IllegalArgumentException error = assertThrows(
            IllegalArgumentException.class,
            () -> cart.add("broken", -5)
        );

        assertEquals("price must not be negative: -5", error.getMessage());
        assertEquals(0, cart.count());
    }

    @Test
    void zeroPriceIsAllowed() {
        Cart cart = new Cart();
        assertDoesNotThrow(() -> cart.add("free sticker", 0));
    }
}`,
      output: `[INFO] Running CartExceptionTest
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.002 s -- in CartExceptionTest
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] BUILD SUCCESS`,
      codeSummary: 'Two tests for the border of `Cart.add` (the class is in the lesson "Assertions"): a negative price must throw with the right message and leave the cart empty; a price of 0 must not throw. Real `mvn test` output.',
      commands: [
        { label: 'Run only this class', note: 'In the folder with `pom.xml`.', command: 'mvn test -Dtest=CartExceptionTest' }
      ],
      codeExplanation: [
        { label: 'Line 3', code: 'import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;', text: 'The opposite of `assertThrows`, for the "this is allowed" side of the border.' },
        { label: 'Line 13', code: 'IllegalArgumentException error = assertThrows(', text: '`assertThrows` returns the caught exception, already with the right type.' },
        { label: 'Line 14', code: 'IllegalArgumentException.class,', text: 'Which exception you expect. `.class` gives the type itself as a value.' },
        { label: 'Line 15', code: '() -> cart.add("broken", -5)', text: 'The lambda: the code is **not** run here. `assertThrows` runs it later, inside its own `try`/`catch`.' },
        { label: 'Line 18', code: 'assertEquals("price must not be negative: -5", error.getMessage());', text: 'Checks the reason. A different `IllegalArgumentException` from somewhere else would fail here.' },
        { label: 'Line 19', code: 'assertEquals(0, cart.count());', text: 'Checks the state: the refused item was not added.' },
        { label: 'Line 25', code: 'assertDoesNotThrow(() -> cart.add("free sticker", 0));', text: 'The border value 0 is allowed. This fails if someone changes `< 0` to `<= 0`.' }
      ],
      sections: [
        {
          title: 'Why the code must be wrapped in a lambda',
          text: [
            'Here is what `assertThrows` does inside, in plain Java. `Runnable` is a small interface from the JDK with one method, `run()`. A lambda `() -> divide(1, 0)` is a short way to make an object that implements it (interfaces are in [Interfaces](../interfaces/index.html)).',
            'The division by zero happens only when `whatHappens` calls `code.run()`, inside its `try`. That is why `main` keeps running.'
          ],
          fileName: 'ExpectThrowsDemo.java',
          code: `public class ExpectThrowsDemo {
    static int divide(int a, int b) {
        return a / b;
    }

    // Runs the code it is given and reports what happened.
    static String whatHappens(Runnable code) {
        try {
            code.run();
            return "nothing was thrown";
        } catch (RuntimeException e) {
            return "threw " + e.getClass().getSimpleName() + ": " + e.getMessage();
        }
    }

    public static void main(String[] args) {
        System.out.println(whatHappens(() -> divide(10, 2)));
        System.out.println(whatHappens(() -> divide(1, 0)));
        System.out.println("main is still running");
    }
}`,
          output: `nothing was thrown
threw ArithmeticException: / by zero
main is still running`
        },
        {
          title: 'What happens in one assertThrows call',
          mermaid: `sequenceDiagram
  participant T as Test method
  participant A as assertThrows
  participant C as Cart
  T->>A: type IllegalArgumentException, lambda
  A->>C: run lambda: add("broken", -5)
  C-->>A: throws IllegalArgumentException
  A->>A: type matches? yes
  A-->>T: returns the exception
  T->>T: assertEquals on getMessage()`,
          diagramNote: 'The exception never reaches the test method. `assertThrows` catches it, checks the type and hands it back as a normal value.'
        },
        {
          title: 'When assertThrows fails',
          text: ['Two real failures. First the check `if (priceCents < 0)` was removed, so nothing was thrown. Then the test expected the wrong type.'],
          codeLanguage: 'plaintext',
          fileName: 'mvn test (two kinds of failure)',
          code: `[ERROR]   CartExceptionTest.negativePriceIsRefused:13 Expected java.lang.IllegalArgumentException to be thrown, but nothing was thrown.

org.opentest4j.AssertionFailedError: Unexpected exception type thrown, expected: <java.lang.IllegalStateException> but was: <java.lang.IllegalArgumentException>
\tat WrongTypeTest.wrongType(WrongTypeTest.java:9)
Caused by: java.lang.IllegalArgumentException: price must not be negative: -5
\tat Cart.add(Cart.java:10)`,
          tip: 'The `Caused by:` line shows the exception that was really thrown, with its message and the line in `Cart.java`.'
        },
        {
          title: 'Failure or error?',
          text: ['If you forget `assertThrows` and the code throws, the test is not "failed", it is an **error**. Here is the real output of `assertEquals(0, Calculator.divide(1, 0));`.'],
          codeLanguage: 'plaintext',
          fileName: 'mvn test (an unexpected exception)',
          code: `[ERROR] Tests run: 1, Failures: 0, Errors: 1, Skipped: 0, Time elapsed: 0.015 s <<< FAILURE! -- in DivideTest
[ERROR] DivideTest.divideByZeroWithoutAssertThrows -- Time elapsed: 0.008 s <<< ERROR!
java.lang.ArithmeticException: / by zero
\tat Calculator.divide(Calculator.java:7)
\tat DivideTest.divideByZeroWithoutAssertThrows(DivideTest.java:9)`,
          table: {
            head: ['Report word', 'Meaning', 'Typical cause'],
            rows: [
              ['Failure', 'An assertion said "wrong value"', 'A bug in the result'],
              ['Error', 'An exception nobody expected', 'A crash: `/ by zero`, `NullPointerException`, missing `assertThrows`'],
              ['Skipped', 'The test was switched off', '`@Disabled` on the test']
            ]
          }
        },
        {
          title: 'Wrong versus right: try/catch in a test',
          text: ['The wrong version looks careful, but it passes even when nothing is thrown, because the `catch` is then never entered and the method ends normally.'],
          codeLanguage: 'java',
          fileName: 'fragment: inside a test class',
          code: `// WRONG: passes even if add() throws nothing
@Test
void negativePriceIsRefusedWrong() {
    try {
        cart.add("broken", -5);
    } catch (IllegalArgumentException e) {
        // fine
    }
}

// RIGHT: fails if nothing (or the wrong thing) is thrown
@Test
void negativePriceIsRefused() {
    assertThrows(IllegalArgumentException.class, () -> cart.add("broken", -5));
}`,
          noRun: true,
          warn: 'A test that can never fail is worse than no test: it makes you feel safe.'
        }
      ],
      technical: [
        '`assertThrows(Class<T> type, Executable code)` takes an `Executable`, a JUnit interface like `Runnable` whose `execute()` may throw any exception, even checked ones. Your lambda becomes an object of that interface. JUnit calls `execute()` inside `try { … } catch (Throwable t)`.',
        'The type check uses `type.isInstance(t)`, so a subclass also passes: `assertThrows(RuntimeException.class, …)` passes for an `IllegalArgumentException`. If you need the exact class, use `assertThrowsExactly`.',
        'A lambda can use local variables from around it, like `cart`, as long as they are not reassigned later ("effectively final"). The compiler turns the lambda into a hidden method and passes `cart` along.'
      ],
      tryIt: {
        steps: [
          'Add `CartExceptionTest.java` next to `CartTest.java` and run `mvn test -Dtest=CartExceptionTest`.',
          'In `Cart.add`, change `if (priceCents < 0)` to `if (priceCents < -100)`. Run again.',
          'Change it to `if (priceCents <= 0)`. Run again.',
          'Put `< 0` back.'
        ],
        see: 'First `Expected java.lang.IllegalArgumentException to be thrown, but nothing was thrown.`, then `zeroPriceIsAllowed:25 Unexpected exception thrown: java.lang.IllegalArgumentException: price must not be negative: 0`. Each test guards one side of the border.'
      },
      check: [
        { q: 'Why does `assertThrows` need `() -> cart.add("broken", -5)` and not `cart.add("broken", -5)`?', a: 'Without the lambda the call runs right away, before `assertThrows` starts, and the exception flies out of the test. The lambda lets `assertThrows` run the code inside its own `try`/`catch`.' },
        { q: 'What does `assertThrows` return, and why is that useful?', a: 'The caught exception. You can check its message, so you know the code refused for the right reason.' },
        { q: 'A test calls `Calculator.divide(1, 0)` without `assertThrows`. Is it a failure or an error?', a: 'An error: an unexpected `ArithmeticException` was thrown. Failures come only from assertions.' }
      ],
      keyPoints: [
        'Refusing bad input is a behavior and needs a test.',
        '`assertThrows(Type.class, () -> code)` passes only if that exception is thrown.',
        'Keep the returned exception and check its message.',
        'Check the state after the refusal too.',
        'Test both sides of the border: `assertThrows` and `assertDoesNotThrow`.'
      ],
      commonMistakes: [
        '`assertThrows(IllegalArgumentException.class, cart.add("x", -5))` without `() ->`. It does not compile. Fix: wrap the call in a lambda.',
        'An empty `try`/`catch` instead of `assertThrows`. It passes when nothing is thrown. Fix: use `assertThrows`.',
        'Expecting `Exception.class`. Almost anything passes, even a `NullPointerException` from a typo. Fix: expect the exact type your code throws.',
        'Putting several statements in the lambda. You no longer know which one threw. Fix: arrange outside, put only the one call inside.'
      ],
      related: ['assertions', 'red-test', 'Exceptions']
    }
  ]);
})();
