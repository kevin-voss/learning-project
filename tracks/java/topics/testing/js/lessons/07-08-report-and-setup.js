// Testing lessons 7–8: run tests with mvn test and read the report; @BeforeEach / @AfterEach.
(function () {
  Java.addCoreLessons('testing', [
    {
      id: 'red-test',
      title: 'Run Tests and Read a Red Report',
      category: 'practice',
      icon: '✗',
      tagline: 'Which test, which line, which values',
      realWorld: 'A red mark on your homework says which question was wrong and what the right answer was. The test report says the same about your code.',
      kid: [
        'Your teacher gives back the quiz. On top it says: 10 questions, 2 wrong. Then each wrong question has a red circle, the right answer and your answer.',
        'You do not panic and start the whole quiz again. You look at the first red circle, see what you wrote, see what was right, and think: "Oh, I forgot to carry the one."',
        'A red test report is that quiz sheet. It tells you how many tests ran, which ones were wrong, on which line, and what the right answer was.'
      ],
      definition: '`mvn test` compiles your code and tests and runs every test. When a test fails, Maven prints three clues: the **test name**, the **line number** in the test file, and **expected X but was Y**. Then it says `BUILD FAILURE`.',
      explain: [
        'A run has a fixed shape. First a `T E S T S` block with one `Running …` line per test class. Then, for each failing test, a block with the exception and a **stack trace** (the list of method calls that were active, newest first, which you know from [Debugging](../debugging/index.html)). At the end come `Results:`, a short list of failures and the total line `Tests run: 3, Failures: 2, Errors: 0, Skipped: 0`.',
        'The short list is the fastest place to read. Each line looks like `CalculatorTest.addsTwoPositiveNumbers:18 expected: <5> but was: <-1>`: class, method, line number in the test, then the values.',
        'Now think like a detective. The test said "5", the code said "-1". What could turn 2 and 3 into −1? Subtraction. Open the code under test and look for a minus. You do not need to guess or add `println`; the report already narrowed the search.',
        'Fix the **code**, not the test, unless the test itself was wrong (a wrong expected value or a wrong rule). Changing the expected value until the test turns green destroys the test.',
        'Maven also writes the full report to files in `target/surefire-reports/`: one `.txt` file per test class for you to read, and one `.xml` file for tools such as build servers and editors.'
      ],
      why: 'The report points at the exact test, line and values. A two-minute fix instead of an hour of guessing.',
      whenUse: 'Every time you see `BUILD FAILURE` after `mvn test`, `mvn package` or on a build server.',
      syntax: '`mvn test` · `mvn test -Dtest=ClassName` · `mvn test -Dtest=\'ClassName#methodName\'`',
      codeLanguage: 'plaintext',
      fileName: 'mvn test (real output, bug: a - b)',
      code: `[INFO] Running CalculatorTest
[ERROR] Tests run: 3, Failures: 2, Errors: 0, Skipped: 0, Time elapsed: 0.019 s <<< FAILURE! -- in CalculatorTest
[ERROR] CalculatorTest.addsTwoPositiveNumbers -- Time elapsed: 0.001 s <<< FAILURE!
org.opentest4j.AssertionFailedError: expected: <5> but was: <-1>
\tat org.junit.jupiter.api.AssertionFailureBuilder.build(AssertionFailureBuilder.java:151)
\tat org.junit.jupiter.api.Assertions.assertEquals(Assertions.java:531)
\tat CalculatorTest.addsTwoPositiveNumbers(CalculatorTest.java:18)

[INFO] Results:
[INFO]
[ERROR] Failures:
[ERROR]   CalculatorTest.addsNegativeNumber:24 expected: <-1> but was: <5>
[ERROR]   CalculatorTest.addsTwoPositiveNumbers:18 expected: <5> but was: <-1>
[INFO]
[ERROR] Tests run: 3, Failures: 2, Errors: 0, Skipped: 0
[INFO]
[INFO] BUILD FAILURE`,
      codeSummary: 'The real output after `return a + b;` was changed to `return a - b;` in `Calculator`. Some JUnit-internal `at` lines are cut out to keep it short.',
      codeExplanation: [
        { label: 'Line 1', code: '[INFO] Running CalculatorTest', text: 'Surefire starts one test class.' },
        { label: 'Line 2', code: '[ERROR] Tests run: 3, Failures: 2, Errors: 0, Skipped: 0, … <<< FAILURE!', text: 'The score for this class: 3 tests, 2 failed by assertion, none crashed, none switched off.' },
        { label: 'Line 3', code: '[ERROR] CalculatorTest.addsTwoPositiveNumbers -- … <<< FAILURE!', text: 'The detail block for one failing test begins.' },
        { label: 'Line 4', code: 'org.opentest4j.AssertionFailedError: expected: <5> but was: <-1>', text: 'The exception thrown by `assertEquals`, with both values.' },
        { label: 'Lines 5–6', code: 'at org.junit.jupiter.api.Assertions.assertEquals(…)', text: 'Lines inside JUnit. Skip them: the bug is not in JUnit.' },
        { label: 'Line 7', code: 'at CalculatorTest.addsTwoPositiveNumbers(CalculatorTest.java:18)', text: 'The first line with **your** class: the assertion on line 18 of the test file.' },
        { label: 'Lines 12–13', code: 'CalculatorTest.addsTwoPositiveNumbers:18 expected: <5> but was: <-1>', text: 'The short list. Read this first: method, line, values. Two tests, one cause.' },
        { label: 'Line 17', code: '[INFO] BUILD FAILURE', text: 'Maven stops here. Later steps such as `package` do not run while a test is red.' }
      ],
      sections: [
        {
          title: 'The shape of every report',
          mermaid: `flowchart TD
  A["T E S T S"] --> B["Running ClassName (one per class)"]
  B --> C["score line for the class"]
  C --> D["detail block per failing test: exception + stack trace"]
  D --> E["Results: short list of failures"]
  E --> F["Tests run, Failures, Errors, Skipped"]
  F --> G{"all zero?"}
  G -->|"yes"| H["BUILD SUCCESS"]
  G -->|"no"| I["BUILD FAILURE"]`,
          diagramNote: 'Scroll to `Results:` first. Go up to the detail block only when the short line is not enough.'
        },
        {
          title: 'From the report to the fix',
          text: ['Use the same four steps every time. They keep you calm and stop you from changing random lines.'],
          mermaid: `flowchart LR
  A["1 Which test?"] --> B["2 Which line?"]
  B --> C["3 Expected vs actual"]
  C --> D["4 How could the code give that value?"]
  D --> E{"test or code wrong?"}
  E -->|"code"| F["fix the code"]
  E -->|"test"| G["fix the test, then re-check the rule"]
  F --> H["run mvn test again"]
  G --> H`,
          diagramNote: 'Most of the time the answer at step 4 is "the code". The test was written from the rule; the code was written in a hurry.'
        },
        {
          title: 'The summary words',
          table: {
            head: ['Word', 'Meaning', 'What you do'],
            rows: [
              ['`Tests run: 3`', 'how many tests ran', 'If it is 0, check the class names (`*Test`)'],
              ['`Failures: 2`', 'assertions that said "wrong value"', 'Read expected vs actual'],
              ['`Errors: 1`', 'tests that crashed with an unexpected exception', 'Read the exception and the first `at` line with your class'],
              ['`Skipped: 1`', 'tests switched off with `@Disabled`', 'Make sure that is on purpose'],
              ['`<<< FAILURE!`', 'this class or test did not pass', 'Find its detail block'],
              ['`BUILD FAILURE`', 'Maven stopped', 'Nothing after `test` (like the jar) was made']
            ]
          }
        },
        {
          title: 'The report files',
          text: ['After every run, Surefire writes two files per test class into `target/surefire-reports/`. This is the real `.txt` file of a green run and the test lines of its `.xml` file.'],
          codeLanguage: 'plaintext',
          fileName: 'target/surefire-reports/',
          code: `CalculatorTest.txt
-------------------------------------------------------------------------------
Test set: CalculatorTest
-------------------------------------------------------------------------------
Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.002 s -- in CalculatorTest

TEST-CalculatorTest.xml (part)
  <testcase name="addsNegativeNumber" classname="CalculatorTest" time="0.0"/>
  <testcase name="addsTwoPositiveNumbers" classname="CalculatorTest" time="0.001"/>
  <testcase name="divideRoundsTowardZero" classname="CalculatorTest" time="0.0"/>`,
          tip: 'Build servers (such as GitHub Actions or Jenkins) read the `.xml` files and draw a table of passed and failed tests from them.'
        },
        {
          title: 'Running only some tests',
          text: ['While you fix one test, you do not need to run all of them. The `-Dtest=` option picks tests by name. Run everything again before you finish.'],
          table: {
            head: ['Command', 'Runs'],
            rows: [
              ['`mvn test`', 'every test class'],
              ['`mvn test -Dtest=CalculatorTest`', 'one class'],
              ["`mvn test -Dtest='CalculatorTest#addsTwoPositiveNumbers'`", 'one method'],
              ["`mvn test -Dtest='Cart*'`", 'every class whose name starts with `Cart`'],
              ['`mvn package`', 'all tests too: `package` comes after `test` in the lifecycle']
            ]
          },
          warn: '`mvn package -DskipTests` builds a jar without running tests. Use it only when you know why; it is the easiest way to ship a bug.'
        }
      ],
      technical: [
        'Surefire runs the tests in a forked JVM and gets results through the JUnit Platform\'s listener interface: "test started", "test finished: successful / failed / aborted". From those events it prints the console lines and writes the XML report in a format that started with the old Ant build tool and is now understood everywhere.',
        'The stack trace in a failure is the stack of the thread at the moment `AssertionFailedError` was created. The newest call is on top, so the top lines are inside JUnit (`AssertionFailureBuilder.build`). Your test method is further down, and the test runner\'s own frames sit below it. Surefire already trims many of those frames for you.',
        'When any test fails or errors, Surefire makes Maven\'s `test` step fail, and Maven exits with code 1. A script or build server sees that number and marks the build red. That is the same exit-code idea as in the lesson "A Tiny Self-Check".'
      ],
      tryIt: {
        steps: [
          'In `Calculator.java` change `return a + b;` to `return a - b;`.',
          'Run `mvn test`. Scroll to `Results:` and read the two lines.',
          'Open `target/surefire-reports/CalculatorTest.txt` and find the same information.',
          'Fix the code. Run only the class: `mvn test -Dtest=CalculatorTest`. Then run all tests.'
        ],
        see: '`CalculatorTest.addsTwoPositiveNumbers:18 expected: <5> but was: <-1>` and `BUILD FAILURE`, then `Tests run: 3, Failures: 0` and `BUILD SUCCESS`.'
      },
      check: [
        { q: 'In `CalculatorTest.addsNegativeNumber:24 expected: <-1> but was: <5>`, what does `24` mean?', a: 'The line number in `CalculatorTest.java` where the failing assertion is.' },
        { q: 'In a stack trace, which `at` line do you read first?', a: 'The first one that names your own class (test or code). The lines above it are inside JUnit.' },
        { q: 'Why does `mvn package` not build a jar when a test is red?', a: '`package` comes after `test` in the Maven lifecycle. A failing `test` step stops the build before `package`.' }
      ],
      keyPoints: [
        'Read `Results:` first: test name, line, expected and actual.',
        'Skip JUnit\'s own `at` lines; find the first line with your class.',
        'Failures are wrong values; errors are crashes.',
        'Full reports are in `target/surefire-reports/`.',
        'Fix the code, not the expected value.'
      ],
      commonMistakes: [
        'Changing `assertEquals(5, …)` to `assertEquals(-1, …)` to make it green. Fix: find out why the code gives −1.',
        'Reading only `BUILD FAILURE` and guessing. Fix: scroll up to `Results:`.',
        'Running only one test class, fixing it, and stopping. Another test may now be red. Fix: run all tests with `mvn test` at the end.',
        'Using `-DskipTests` to "get the build through". Fix: make the tests green.'
      ],
      related: ['testing-exceptions', 'setup-and-teardown', 'Debugging', 'Build Tools']
    },
    {
      id: 'setup-and-teardown',
      title: 'Before and After Each Test',
      category: 'practice',
      icon: '↻',
      tagline: '@BeforeEach, @AfterEach and a fresh start',
      realWorld: 'Before every football match the pitch is reset: new lines, the ball in the middle, both goals empty. After the match someone tidies up. No match starts with the mess of the last one.',
      kid: [
        'Every morning before school you get a clean plate for breakfast. Not yesterday\'s plate with old jam on it.',
        'Someone sets the table before you eat and clears it after you eat. You do not have to think about it; it happens every time.',
        'In JUnit, `@BeforeEach` sets the table before every test, and `@AfterEach` clears it afterwards.'
      ],
      definition: 'A method marked `@BeforeEach` runs before **every** test method in the class; a method marked `@AfterEach` runs after every one. You use them to build a fresh starting state (the **fixture**) once in code, and to clean up.',
      explain: [
        'Often several tests start the same way: make a cart, put an apple in. Copying those lines into every test is noisy, and when the setup changes you must change it everywhere. So you move the shared Arrange part into one method and mark it `@BeforeEach`.',
        'The things a test needs before it can start are called its **fixture**: here, a cart with one apple. The fixture lives in a **field** of the test class (`private Cart cart;`), so the `@BeforeEach` method and the test methods can all reach it.',
        'Remember: JUnit makes a **new object** of the test class for every test. So for each test it does: new object → `@BeforeEach` → the test → `@AfterEach`. Every test gets its own fresh cart. What one test changes can never leak into the next.',
        '`@AfterEach` is for cleaning up things outside the object: deleting a temporary file, closing a connection. It runs even when the test failed. Many test classes do not need it at all.',
        'There are also `@BeforeAll` and `@AfterAll`. They run **once** for the whole class, before the first and after the last test, and must be `static`. Use them only for slow things you may safely share, like starting a test server.'
      ],
      why: 'Shared setup in one place keeps tests short, and a fresh fixture per test keeps them independent.',
      whenUse: 'When two or more tests in a class start with the same Arrange lines, or when tests create things that must be cleaned up.',
      syntax: '`private Cart cart;` · `@BeforeEach void setUp() { cart = new Cart(); }` · `@AfterEach void tearDown() { … }`',
      fileName: 'src/test/java/CartLifecycleTest.java',
      code: `import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CartLifecycleTest {

    private Cart cart;

    @BeforeEach
    void setUp() {
        cart = new Cart();
        cart.add("apple", 50);
        System.out.println("before: fresh cart with 1 item");
    }

    @AfterEach
    void tearDown() {
        System.out.println("after: cart had " + cart.count() + " items");
    }

    @Test
    void addingOneMoreMakesTwo() {
        cart.add("pear", 70);
        assertEquals(2, cart.count());
    }

    @Test
    void totalIsThePriceOfTheApple() {
        assertEquals(50, cart.totalCents());
    }
}`,
      output: `[INFO] Running CartLifecycleTest
before: fresh cart with 1 item
after: cart had 2 items
before: fresh cart with 1 item
after: cart had 1 items
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.015 s -- in CartLifecycleTest`,
      codeSummary: 'Both tests start from a cart with one apple. The `println` lines are only there so you can watch the order; real tests rarely print. Real `mvn test` output.',
      commands: [
        { label: 'Run only this class', note: 'In the folder with `pom.xml`.', command: 'mvn test -Dtest=CartLifecycleTest' }
      ],
      codeExplanation: [
        { label: 'Line 9', code: 'private Cart cart;', text: 'The fixture lives in a field, so every method of the class can use it.' },
        { label: 'Line 11', code: '@BeforeEach', text: 'JUnit calls the method below before each `@Test` method.' },
        { label: 'Line 13', code: 'cart = new Cart();', text: 'A brand-new cart every time. No test sees another test\'s pear.' },
        { label: 'Line 14', code: 'cart.add("apple", 50);', text: 'The shared Arrange step, written once instead of in every test.' },
        { label: 'Line 18', code: '@AfterEach', text: 'Runs after each test, also after a failing one.' },
        { label: 'Line 25', code: 'cart.add("pear", 70);', text: 'This test changes the cart. Its after-line prints `2 items`.' },
        { label: 'Line 31', code: 'assertEquals(50, cart.totalCents());', text: 'The other test still sees only the apple, because it got its own fresh cart.' }
      ],
      sections: [
        {
          title: 'The order JUnit follows',
          mermaid: `sequenceDiagram
  participant J as JUnit
  participant A as test object 1
  participant B as test object 2
  J->>A: new CartLifecycleTest()
  J->>A: setUp()
  J->>A: addingOneMoreMakesTwo()
  J->>A: tearDown()
  J->>B: new CartLifecycleTest()
  J->>B: setUp()
  J->>B: totalIsThePriceOfTheApple()
  J->>B: tearDown()`,
          diagramNote: 'Two tests, two objects, two fresh carts. The order of the two tests is up to JUnit; never rely on it.'
        },
        {
          title: 'Why shared state is dangerous',
          text: [
            'This plain-Java program fakes two "tests" that share one list, like a `static` field would. The result depends on the order the tests run in. That kind of test is called **flaky**: sometimes green, sometimes red, with no code change.'
          ],
          fileName: 'SharedStateDemo.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class SharedStateDemo {
    static List<String> sharedCart = new ArrayList<>(); // shared by every "test"

    static void testAddOne() {
        sharedCart.add("apple");
        boolean pass = sharedCart.size() == 1;
        System.out.println("  testAddOne: " + (pass ? "PASS" : "FAIL"));
    }

    static void testStartsEmpty() {
        boolean pass = sharedCart.isEmpty();
        System.out.println("  testStartsEmpty: " + (pass ? "PASS" : "FAIL"));
    }

    public static void main(String[] args) {
        System.out.println("Order A:");
        testStartsEmpty();
        testAddOne();

        sharedCart = new ArrayList<>(); // start over
        System.out.println("Order B:");
        testAddOne();
        testStartsEmpty();
    }
}`,
          output: `Order A:
  testStartsEmpty: PASS
  testAddOne: PASS
Order B:
  testAddOne: PASS
  testStartsEmpty: FAIL`,
          tip: 'The cure is what `@BeforeEach` and the fresh test object give you: each test builds its own state. Avoid `static` fields in test classes.'
        },
        {
          title: 'Before: the same lines in every test',
          text: ['Without `@BeforeEach`, every test repeats the Arrange part. Imagine ten tests and then a change to how a cart is made.'],
          codeLanguage: 'java',
          fileName: 'fragment: repeated setup',
          noRun: true,
          code: `@Test
void addingOneMoreMakesTwo() {
    Cart cart = new Cart();      // repeated
    cart.add("apple", 50);       // repeated
    cart.add("pear", 70);
    assertEquals(2, cart.count());
}

@Test
void totalIsThePriceOfTheApple() {
    Cart cart = new Cart();      // repeated
    cart.add("apple", 50);       // repeated
    assertEquals(50, cart.totalCents());
}`
        },
        {
          title: 'The four lifecycle annotations',
          table: {
            head: ['Annotation', 'Runs', 'Method must be', 'Typical use'],
            rows: [
              ['`@BeforeEach`', 'before every test', 'normal (not static)', 'make a fresh fixture'],
              ['`@AfterEach`', 'after every test, also failed ones', 'normal', 'delete temp files, close things'],
              ['`@BeforeAll`', 'once, before the first test of the class', '`static`', 'start something slow, shared and read-only'],
              ['`@AfterAll`', 'once, after the last test', '`static`', 'stop what `@BeforeAll` started']
            ],
            note: '`@BeforeAll` must be `static` because it runs before any test object exists.'
          }
        },
        {
          title: 'Keep the setup honest',
          bullets: [
            'Put only what **every** test in the class needs into `@BeforeEach`. Special Arrange steps stay inside their own test.',
            'A reader must still understand a test without scrolling. If the setup is long, give it a clear name or split the class.',
            'Do not put assertions in `@BeforeEach`. It prepares; the tests judge.',
            'If two groups of tests need different setups, make two test classes.'
          ]
        }
      ],
      technical: [
        'For each test method JUnit Jupiter builds an "extension context", creates the test instance with the no-argument constructor, then calls the `@BeforeEach` methods, the test method and the `@AfterEach` methods, all through reflection. `@AfterEach` sits in a `finally`-like step, which is why it runs after a failure too.',
        'You can switch to one object per class with `@TestInstance(Lifecycle.PER_CLASS)`. Then fields keep their values between tests and `@BeforeAll` may be non-static. It is rarely worth it for beginners: per-method instances are the safe default.',
        'Surefire prints what your tests write to `System.out` into the console (that is where the `before:` lines came from) and also into the report files. In real tests, prefer assertions over printing.'
      ],
      tryIt: {
        steps: [
          'Add `CartLifecycleTest.java` and run `mvn test -Dtest=CartLifecycleTest`.',
          'Watch the order of `before:` and `after:` lines.',
          'Move `cart = new Cart();` out of `setUp` and write `private Cart cart = new Cart();` instead. Run again. Is it still fresh per test?',
          'Make the field `static` and initialise it once: `private static Cart cart = new Cart();`, with `cart = new Cart();` removed from `setUp`. Run again.'
        ],
        see: 'Step 3 is still green: JUnit makes a new object per test, so field initialisers run per test. Step 4 shares one cart between both tests: `after: cart had 3 items` and `totalIsThePriceOfTheApple:30 expected: <50> but was: <170>` (apple + pear + apple). Undo it.'
      },
      check: [
        { q: 'A class has 3 tests and one `@BeforeEach` method. How often does `@BeforeEach` run?', a: 'Three times, once before each test.' },
        { q: 'Why must a `@BeforeAll` method be `static`?', a: 'It runs once before any test object is created, so there is no object to call it on.' },
        { q: 'What is a flaky test?', a: 'A test that passes or fails depending on something other than the code, for example the order tests run in or the time of day.' }
      ],
      keyPoints: [
        '`@BeforeEach` runs before every test; `@AfterEach` after every test.',
        'The fixture is the starting state; keep it in fields.',
        'Every test gets a new test object and a fresh fixture.',
        '`@BeforeAll` / `@AfterAll` run once per class and are `static`.',
        'Never let one test depend on another.'
      ],
      commonMistakes: [
        'Writing `void setUp()` without `@BeforeEach`. It never runs and `cart` is `null`, so tests crash with `NullPointerException`. Fix: add the annotation.',
        'A `static` field for the fixture. Tests then share it and become flaky. Fix: a normal field set in `@BeforeEach`.',
        'Declaring `Cart cart = new Cart();` inside `setUp` (a local variable). The field stays `null`. Fix: write `cart = new Cart();` without the type.',
        'Hiding special setup for one test in `@BeforeEach`. Fix: keep it in that test.'
      ],
      related: ['first-junit-test', 'parameterized-tests', 'Classes and Objects']
    }
  ]);
})();
