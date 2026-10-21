// Testing (topic 17). Lessons 1–2 live here, the rest in js/lessons/*.js (loaded in order).
(function () {
  Java.addCoreTopic('testing', {
    label: 'Testing',
    headline: 'Testing,',
    accent: 'let the computer check your work.',
    intro: 'A test runs your code with a known input and checks the answer for you. You start with a tiny check in plain Java, then write real JUnit 5 tests, run them with `mvn test`, and learn what to test and how to test code that talks to the outside world.',
    overview: 'Why test → plain-Java checks → set up JUnit → @Test and assertions → exceptions → read a red report → @BeforeEach → many inputs → what to test → red-green-refactor → fakes.',
    tryIt: {
      steps: [
        'Make the Maven project from "Set Up JUnit": `pom.xml`, `src/main/java/` and `src/test/java/`.',
        'Save the code below as `src/main/java/Calculator.java`.',
        'Save `CalculatorTest.java` from "Your First JUnit Test" in `src/test/java/`.',
        'Run `mvn test` in the folder with `pom.xml`. Read the last lines.',
        'Change `return a + b;` to `return a - b;` and run `mvn test` again. Find the test name, the line number and the two values.',
        'Undo the change and run `mvn test` one last time.'
      ],
      code: `public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }

    public static int divide(int a, int b) {
        return a / b;
    }
}`,
      see: 'First `Tests run: 3, Failures: 0, Errors: 0, Skipped: 0` and `BUILD SUCCESS`. After the change: `CalculatorTest.addsTwoPositiveNumbers:18 expected: <5> but was: <-1>` and `BUILD FAILURE`. After the undo: green again.'
    },
    check: [
      { q: 'In `assertEquals(5, Calculator.add(2, 3))`, which value is the expected one?', a: 'The first one, `5`. The second argument is the actual result your code gives. If you swap them, the failure message tells the story backwards.' },
      { q: 'Your test class is called `CalculatorCheck`. `mvn test` prints `BUILD SUCCESS` but no `T E S T S` block. What happened?', a: 'Surefire only runs classes whose names end in `Test`, `Tests` or `TestCase`, or start with `Test`. It ran nothing. Rename the class (and the file) to `CalculatorTest`.' },
      { q: 'What is the difference between `Failures: 1` and `Errors: 1`?', a: 'A failure means an assertion said "wrong answer". An error means the test crashed with an exception nobody expected, for example `ArithmeticException: / by zero`.' },
      { q: 'Why does the JUnit dependency have `<scope>test</scope>`?', a: 'So JUnit is only on the classpath while tests compile and run. It never goes into your finished program or jar.' },
      { q: 'Your method decides "free entry under 6 years". Which ages do you test first?', a: 'The border: 5 and 6. Then one normal value on each side, and odd input such as 0 or a negative age.' }
    ]
  }, [
    {
      id: 'why-test',
      title: 'Why Automated Tests',
      category: 'concept',
      icon: '?',
      tagline: 'Checking by hand does not scale',
      realWorld: 'Before a school trip the teacher counts the children. With 5 children she counts by looking. With 500 children she uses a list and ticks every name. A test is that list for your code.',
      kid: [
        'You build a tower of blocks. After each new block you look: is it still standing? With 5 blocks that is easy.',
        'Now your tower has 500 blocks, and you change one at the bottom. You cannot look at every block every time. You would get tired and miss one.',
        'So you build a little robot. After every change the robot checks every block and shouts "all good" or "block 37 fell". A test is that robot. You write it once, and it checks for you forever.'
      ],
      definition: 'An **automated test** is a small piece of code that runs your code with a known input and checks the answer. If the answer is wrong, the test **fails** and tells you where.',
      explain: [
        'Until now you checked your programs by hand: you ran `main`, read the printed lines and decided "looks right". That is **manual testing**. It works for one small program. It does not work when the program grows, because you must re-check everything after every change, and people get tired and skip things.',
        'A **unit test** checks one small unit of code, usually one method or one class, all alone. "Unit" means the smallest piece that makes sense to check on its own. A program has many unit tests, and a tool runs them all in a second or two.',
        'Every unit test has the same three-part shape, called **Arrange-Act-Assert** (AAA). **Arrange**: prepare the input and the expected answer. **Act**: call the code once. **Assert**: compare the **actual** answer (what the code gave) with the **expected** answer (what it should give). To *assert* means to state firmly "this must be true".',
        'Tests also protect you from **regressions**. A regression is a bug in something that used to work, caused by a later change. When you change code tomorrow, yesterday\'s tests run again and catch it at once.',
        'In this lesson you write the AAA shape in plain Java, with an `if` and `println`. In the next lessons you replace that `if` with a real test library, **JUnit 5**.'
      ],
      why: 'Code changes all the time. Tests let you change it without fear, because the computer re-checks everything in seconds.',
      whenUse: 'For every method that computes something: prices, rules, text, counts. You write the test right next to the code, not "later".',
      syntax: 'Arrange: `int input = …; int expected = …;` · Act: `int actual = method(input);` · Assert: `if (actual != expected) → FAIL`',
      fileName: 'PriceCheck.java',
      code: `public class PriceCheck {
    // The code we want to check: 10% off for orders of 100.00 or more.
    static int priceAfterDiscount(int priceCents) {
        if (priceCents >= 10000) {
            return priceCents - priceCents / 10;
        }
        return priceCents;
    }

    public static void main(String[] args) {
        // Arrange: the input and the answer we expect.
        int price = 20000;
        int expected = 18000;

        // Act: call the code once.
        int actual = priceAfterDiscount(price);

        // Assert: compare and say the verdict.
        if (actual == expected) {
            System.out.println("PASS: 20000 cents cost " + actual + " after the discount");
        } else {
            System.out.println("FAIL: expected " + expected + " but got " + actual);
        }
    }
}`,
      output: 'PASS: 20000 cents cost 18000 after the discount',
      codeSummary: 'One check in the Arrange-Act-Assert shape, written in plain Java. The program decides PASS or FAIL by itself, so you do not have to think about the number.',
      codeExplanation: [
        { label: 'Line 3', code: 'static int priceAfterDiscount(int priceCents) {', text: 'The **code under test**: the method you want to check. Money is in cents (`int`), so there are no rounding surprises.' },
        { label: 'Line 4', code: 'if (priceCents >= 10000) {', text: 'The rule: 100.00 or more gets the discount. Exactly 10000 counts, because of `>=`.' },
        { label: 'Line 5', code: 'return priceCents - priceCents / 10;', text: 'Takes away one tenth. For 20000 that is 20000 − 2000 = 18000.' },
        { label: 'Line 12', code: 'int price = 20000;', text: '**Arrange**: the input you choose.' },
        { label: 'Line 13', code: 'int expected = 18000;', text: '**Arrange**: the answer you worked out yourself, before running the code. A test is only useful if you know the right answer.' },
        { label: 'Line 16', code: 'int actual = priceAfterDiscount(price);', text: '**Act**: one call to the code under test. The result is the *actual* value.' },
        { label: 'Line 19', code: 'if (actual == expected) {', text: '**Assert**: the program compares the two values. You no longer read and judge the number yourself.' },
        { label: 'Line 22', code: 'System.out.println("FAIL: expected " + expected + " but got " + actual);', text: 'A good failure message names both values. Then you know at once what went wrong.' }
      ],
      sections: [
        {
          title: 'Checking by hand',
          text: [
            'This is how you checked code so far. The program prints three numbers. Now **you** must know the rule and work out in your head whether each number is right.',
            'Do that once and it is fine. Do it after every change, for 200 methods, and you will miss a mistake. The program does not know what "right" is. Only you do, and you forget.'
          ],
          fileName: 'ManualCheck.java',
          code: `public class ManualCheck {
    static int priceAfterDiscount(int priceCents) {
        if (priceCents >= 10000) {
            return priceCents - priceCents / 10;
        }
        return priceCents;
    }

    public static void main(String[] args) {
        // You must read these and decide yourself if they are right.
        System.out.println(priceAfterDiscount(5000));
        System.out.println(priceAfterDiscount(10000));
        System.out.println(priceAfterDiscount(20000));
    }
}`,
          output: `5000
9000
18000`,
          tip: 'Is `9000` right for exactly 10000 cents? You have to stop and think about `>=`. A test writes that thinking down once, so nobody has to think it again.'
        },
        {
          title: 'Manual versus automated',
          table: {
            head: ['', 'Checking by hand', 'Automated test'],
            rows: [
              ['Who decides "right"?', 'You, every time', 'The test, written once'],
              ['Time for 200 checks', 'Many minutes', 'About one second'],
              ['After every change?', 'Nobody really does it', 'Yes, with one command'],
              ['Finds old bugs coming back (regressions)', 'Rarely', 'At once'],
              ['Documents how the code should behave', 'No', 'Yes: each test is an example']
            ],
            note: 'Manual checks still have a place: you look at a new screen with your own eyes. But rules and calculations belong in automated tests.'
          }
        },
        {
          title: 'The shape of every test: Arrange-Act-Assert',
          text: [
            'Every unit test you ever write has these three steps. Keep them in this order and separate them with an empty line. Then any reader sees the input, the action and the expected result at a glance.'
          ],
          mermaid: `flowchart LR
  A["Arrange: input and expected value"] --> B["Act: call the code once"]
  B --> C["Assert: compare expected and actual"]
  C -->|"same"| P["PASS"]
  C -->|"different"| F["FAIL with both values"]`,
          diagramNote: 'Arrange prepares, Act does one thing, Assert judges. If a test needs two Acts, it is really two tests.'
        },
        {
          title: 'Where tests fit in your day',
          text: [
            'Tests turn into a loop. You change code, you run all tests, and you only move on when everything is green. Green means all passed. Red means at least one failed.'
          ],
          mermaid: `flowchart TD
  A["Change the code"] --> B["Run all tests"]
  B --> C{"All green?"}
  C -->|"yes"| D["Move on to the next change"]
  C -->|"no"| E["Read which test failed and why"]
  E --> F["Fix the code"]
  F --> B`,
          diagramNote: 'The loop is short: seconds, not minutes. That is why tests must be automatic.'
        },
        {
          title: 'Unit tests and bigger tests',
          text: ['Unit tests are the small, fast base. Bigger tests check several parts together. You will mostly write unit tests in this topic.'],
          table: {
            head: ['Kind', 'What it checks', 'Speed', 'How many'],
            rows: [
              ['Unit test', 'One method or class, all alone', 'Milliseconds', 'Many (hundreds)'],
              ['Integration test', 'Several parts together, for example your code plus a real file or database', 'Seconds', 'Some'],
              ['End-to-end test', 'The whole program, like a user would use it', 'Slow', 'Few']
            ],
            note: 'People draw this as a **test pyramid**: a wide base of unit tests, fewer integration tests, very few end-to-end tests on top.'
          }
        }
      ],
      technical: [
        'A test is ordinary Java code. It is compiled by `javac` like any other class and runs in the same JVM (Java Virtual Machine, the program that runs your compiled code). There is no magic: a test calls your method and compares values with `==` or `equals`, exactly like the `if` above.',
        'What a test tool adds is the *runner*: a program that finds all your tests, runs each one, catches failures so one broken test does not stop the others, counts the results and prints a report. In the next lesson you build a tiny runner yourself, so you know what JUnit does for you later.',
        'Build tools use the result. Maven (from [Build Tools](../build-tools/index.html)) runs all tests in its `test` step and refuses to build the jar while one is red. That is how a team makes sure broken code never ships.'
      ],
      tryIt: {
        steps: [
          'Save `PriceCheck.java` and run it with `java PriceCheck.java`.',
          'Change the rule to `priceCents > 10000` (without `=`). Run it again: still PASS, because 20000 is far from the border.',
          'Change Arrange to `int price = 10000;` and `int expected = 9000;`. Run it.'
        ],
        see: '`FAIL: expected 9000 but got 10000`. The test found the bug, but only because you tested the border value. Put `>=` back.'
      },
      check: [
        { q: 'What are the three steps of a unit test, in order?', a: 'Arrange (input and expected value), Act (call the code once), Assert (compare expected and actual).' },
        { q: 'What is a regression?', a: 'A bug in something that used to work, caused by a later change. Old tests that run again catch it.' },
        { q: 'Why must you work out the expected value yourself, before you run the code?', a: 'If you copy whatever the code prints, the test checks nothing: it would also "pass" with the bug inside.' }
      ],
      keyPoints: [
        'An automated test runs your code and decides PASS or FAIL by itself.',
        'A unit test checks one small piece (a method or a class) alone.',
        'Every test has the shape Arrange-Act-Assert.',
        'Expected is what *should* come out. Actual is what *does* come out.',
        'Tests catch regressions: old bugs that come back after a change.'
      ],
      commonMistakes: [
        'Printing a value and calling it a test, like `System.out.println(priceAfterDiscount(10000));`. A human must still judge it. Fix: compare with an expected value in code.',
        'Copying the actual output into `expected` without thinking. Fix: work out the right answer on paper first.',
        'Testing only an easy middle value like 20000. Fix: also test the border (10000 and 9999).',
        'Putting several Acts in one test. Fix: one Act per test, so a failure points at one thing.'
      ],
      related: ['self-checks', 'Methods', 'Debugging']
    },
    {
      id: 'self-checks',
      title: 'A Tiny Self-Check',
      category: 'concept',
      icon: 'ok',
      tagline: 'PASS and FAIL in plain Java',
      realWorld: 'A teacher has the answer sheet. She compares each answer with the sheet, writes a tick or a cross, and at the end counts: 2 right, 1 wrong.',
      kid: [
        'You and a friend play "quiz". You ask: what is 2 plus 3? Your friend says 5. You look at your card. The card says 5 too. Tick!',
        'Next question. The friend says 17, the card says 18. Cross! You write down both numbers so you can talk about it later.',
        'At the end you count the ticks and the crosses. In this lesson you teach the computer to play that game with your own code.'
      ],
      definition: 'A **self-check** is a small `check` method that compares an expected value with an actual value and prints `PASS` or `FAIL`. A handful of them in `main` already makes a tiny test runner, with no library at all.',
      explain: [
        'You write one helper method, `check(name, expected, actual)`. It compares the two values. If they are equal, it prints `PASS` and the name of the check. If not, it prints `FAIL`, the name and **both** values. It also counts passes and failures.',
        'Each call of `check` is one **test case**: one situation you want to be sure about, with a name that says it in words, like "a person of exactly 18 is an adult". The name matters: when a check fails, the name tells you which rule is broken.',
        'The **code under test** in the example has a bug on purpose: `age > 18` instead of `age >= 18`. The easy cases (10 and 30) pass. Only the **border** case, 18, fails. Most bugs hide at borders like this.',
        'There is a second style: a check that **fails loudly** by throwing an `AssertionError` (an error type Java has for "something that must be true is false"). The program stops at the first wrong answer and shows a stack trace. You know exceptions and stack traces from [Exceptions](../exceptions/index.html). JUnit works this way inside.'
      ],
      why: 'You see the whole idea of testing with nothing new to install. Later JUnit gives you the same thing with less typing and a better report.',
      whenUse: 'For a quick check in a small single-file program, or to understand what a test tool really does. For real projects you use JUnit.',
      syntax: '`static void check(String name, boolean expected, boolean actual) { if (expected == actual) … PASS … else … FAIL … }`',
      fileName: 'MiniTestRunner.java',
      code: `public class MiniTestRunner {
    static int passed = 0;
    static int failed = 0;

    // The code under test. It has a bug at the border.
    static boolean isAdult(int age) {
        return age > 18;
    }

    static void check(String name, boolean expected, boolean actual) {
        if (expected == actual) {
            passed++;
            System.out.println("PASS " + name);
        } else {
            failed++;
            System.out.println("FAIL " + name + ": expected " + expected + " but was " + actual);
        }
    }

    public static void main(String[] args) {
        check("a child of 10 is not an adult", false, isAdult(10));
        check("a person of 30 is an adult", true, isAdult(30));
        check("a person of exactly 18 is an adult", true, isAdult(18));

        System.out.println(passed + " passed, " + failed + " failed");
    }
}`,
      output: `PASS a child of 10 is not an adult
PASS a person of 30 is an adult
FAIL a person of exactly 18 is an adult: expected true but was false
2 passed, 1 failed`,
      codeSummary: 'A home-made test runner: three named checks, PASS or FAIL for each, and a count at the end. The third check finds the border bug.',
      codeExplanation: [
        { label: 'Lines 2–3', code: 'static int passed = 0;', text: 'Two counters that live as long as the program. Every `check` call adds one to one of them.' },
        { label: 'Line 7', code: 'return age > 18;', text: 'The planted bug. An 18-year-old is an adult, so the rule should be `>=`.' },
        { label: 'Line 10', code: 'static void check(String name, boolean expected, boolean actual) {', text: 'The helper: a name in words, the value you expect and the value the code really gave.' },
        { label: 'Line 11', code: 'if (expected == actual) {', text: 'The assert step. For `boolean` and `int`, `==` compares the values. (For `String` you would use `equals`, see [Strings](../strings/index.html).)' },
        { label: 'Line 16', code: 'System.out.println("FAIL " + name + ": expected " + expected + " but was " + actual);', text: 'The failure message shows the name and both values. That is all you need to start looking for the bug.' },
        { label: 'Line 21', code: 'check("a child of 10 is not an adult", false, isAdult(10));', text: 'One test case. Arrange (10 and `false`), Act (`isAdult(10)`) and Assert (inside `check`) fit in one line.' },
        { label: 'Line 23', code: 'check("a person of exactly 18 is an adult", true, isAdult(18));', text: 'The border case. It is the only one that fails, and it shows exactly which rule is wrong.' },
        { label: 'Line 25', code: 'System.out.println(passed + " passed, " + failed + " failed");', text: 'The summary. A test tool prints the same kind of line: `Tests run: 3, Failures: 1`.' }
      ],
      sections: [
        {
          title: 'What one check does',
          mermaid: `flowchart TD
  A["check(name, expected, actual)"] --> B{"expected == actual?"}
  B -->|"yes"| C["passed++ and print PASS name"]
  B -->|"no"| D["failed++ and print FAIL name, both values"]
  C --> E["return to main, next check"]
  D --> E`,
          diagramNote: 'A failing check does not stop the program. All checks run, and you see every problem in one go.'
        },
        {
          title: 'Fix the code, not the test',
          text: [
            'The check said: expected `true`, but was `false`, for age 18. Ask: how can the code give `false` for 18? Read `age > 18`: 18 is not greater than 18. Change it to `>=`.',
            'Never "fix" a red check by changing the expected value until it is green. The expected value came from the rule ("18 is an adult"). The code is what is wrong.'
          ],
          fileName: 'MiniTestRunnerFixed.java',
          code: `public class MiniTestRunnerFixed {
    static int passed = 0;
    static int failed = 0;

    static boolean isAdult(int age) {
        return age >= 18; // fixed: 18 itself counts
    }

    static void check(String name, boolean expected, boolean actual) {
        if (expected == actual) {
            passed++;
            System.out.println("PASS " + name);
        } else {
            failed++;
            System.out.println("FAIL " + name + ": expected " + expected + " but was " + actual);
        }
    }

    public static void main(String[] args) {
        check("a child of 10 is not an adult", false, isAdult(10));
        check("a person of 30 is an adult", true, isAdult(30));
        check("a person of exactly 18 is an adult", true, isAdult(18));
        check("a person of 17 is not an adult", false, isAdult(17));

        System.out.println(passed + " passed, " + failed + " failed");
    }
}`,
          output: `PASS a child of 10 is not an adult
PASS a person of 30 is an adult
PASS a person of exactly 18 is an adult
PASS a person of 17 is not an adult
4 passed, 0 failed`,
          tip: 'A fourth check for 17 was added: the value right below the border. Now both sides of the border are covered.'
        },
        {
          title: 'Failing loudly with AssertionError',
          text: [
            'The second style throws an exception instead of printing FAIL. The program stops at the first wrong answer. Java prints the message and a stack trace, which names the line of the failing check.',
            'Here `add` has a planted bug (minus instead of plus). The first check (0 + 0) happens to pass, because 0 − 0 is also 0. The second one throws.'
          ],
          fileName: 'LoudCheck.java',
          code: `public class LoudCheck {
    static int add(int a, int b) {
        return a - b; // a planted bug: minus instead of plus
    }

    static void checkEquals(int expected, int actual) {
        if (expected != actual) {
            throw new AssertionError("expected " + expected + " but got " + actual);
        }
    }

    public static void main(String[] args) {
        checkEquals(0, add(0, 0));
        System.out.println("check 1 passed");
        checkEquals(5, add(2, 3));
        System.out.println("check 2 passed");
    }
}`,
          output: `check 1 passed
Exception in thread "main" java.lang.AssertionError: expected 5 but got -1
\tat LoudCheck.checkEquals(LoudCheck.java:8)
\tat LoudCheck.main(LoudCheck.java:15)`,
          warn: 'Check 1 passed although `add` is broken. One easy input proves very little. That is why you test several inputs, including ones where a wrong formula gives a different answer.'
        },
        {
          title: 'Telling other programs: the exit code',
          text: [
            'When a Java program ends with an uncaught exception, the JVM returns **exit code** 1 to the terminal. Exit code 0 means "all good". Type `echo $?` right after the run to see it.',
            'Tools like Maven read this number. In the home-made runner you could end `main` with `System.exit(failed > 0 ? 1 : 0);` to do the same. Test tools do exactly this, so a build stops when a test is red.'
          ],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `java LoudCheck.java
echo $?
# prints 1 after the stack trace: the run failed`
        },
        {
          title: 'Why you will not keep your home-made runner',
          table: {
            head: ['Your runner', 'JUnit 5'],
            rows: [
              ['You call every `check` by hand in `main`', 'It finds every method marked `@Test` by itself'],
              ['One crash in a check stops all later checks', 'Each test runs alone; a crash marks only that test'],
              ['One `check` method per type (`int`, `boolean`, `String` …)', 'Ready-made `assertEquals`, `assertTrue`, `assertThrows`, `assertAll` …'],
              ['Tests sit inside your program', 'Tests sit in their own folder and never ship'],
              ['A line of text at the end', 'A report Maven, your editor and build servers understand']
            ],
            note: 'The idea stays exactly the same: expected, actual, PASS or FAIL. JUnit only does the boring parts for you.'
          }
        }
      ],
      technical: [
        '`AssertionError` is a subclass of `Error`, not of `Exception`. That is on purpose: a normal `catch (Exception e)` in your code does not swallow it by accident. JUnit\'s own failures (`AssertionFailedError`) extend `AssertionError` too.',
        'Java also has an `assert` keyword (`assert age >= 0;`). It is switched **off** by default and only runs with `java -ea`. So never use it for tests: it would silently check nothing.',
        'When `main` throws, the JVM prints the exception with `printStackTrace` to the error stream (`System.err`), runs the shutdown steps and ends the process with exit code 1. The stack trace lines (`at LoudCheck.main(LoudCheck.java:15)`) come from the line-number table the compiler stores in the `.class` file.'
      ],
      tryIt: {
        steps: [
          'Save `MiniTestRunner.java` and run `java MiniTestRunner.java`.',
          'Read the FAIL line. Fix `isAdult` so all checks pass.',
          'Add a check of your own: `check("a baby of 0 is not an adult", false, isAdult(0));`.',
          'Break the code on purpose with `return age >= 0;` and run again.'
        ],
        see: 'With the bug back in: `FAIL a child of 10 is not an adult: expected false but was true` (and the baby check fails too). The summary counts the failures.'
      },
      check: [
        { q: 'Why does the FAIL line print both the expected and the actual value?', a: 'So you know at once what the code gave and what it should give. Without both values you would have to debug to find out.' },
        { q: 'A check fails. When is it right to change the expected value instead of the code?', a: 'Only when the expected value itself was wrong, meaning you misunderstood the rule. Never only to make the check green.' },
        { q: 'Why should you not use Java\'s `assert` keyword for tests?', a: 'Assertions are switched off unless you start Java with `-ea`, so the checks would not run at all.' }
      ],
      keyPoints: [
        'A check compares expected with actual and prints PASS or FAIL.',
        'Give each check a name that says the rule in words.',
        'Print both values on failure.',
        'Bugs hide at borders: test the value on the border and right next to it.',
        'JUnit does the same thing, plus finding, running and reporting all tests.'
      ],
      commonMistakes: [
        'Comparing `String`s with `==`, like `expected == actual` for text. Fix: use `expected.equals(actual)`.',
        'A FAIL message without values, like `println("FAIL")`. Fix: print the name, expected and actual.',
        'Changing `expected` until the check is green. Fix: change the code; the expected value comes from the rule.',
        'Using `assert x == 5;` as a test. Fix: it is off by default; use a check method or JUnit.'
      ],
      related: ['why-test', 'junit-setup', 'Exceptions']
    }
  ]);
})();
