// Testing lessons 3–4: set up JUnit 5 in Maven, write the first @Test.
(function () {
  Java.addCoreLessons('testing', [
    {
      id: 'junit-setup',
      title: 'Set Up JUnit',
      category: 'practice',
      icon: 'pom',
      tagline: 'One dependency, two folders',
      realWorld: 'You add "test kit" to the shopping list on your recipe card. Maven goes shopping for you, and the test kit stays in the kitchen. It never goes into the lunch box.',
      kid: [
        'Your house has two rooms. In the workshop you build toys. In the test room you try the toys out: does the car roll, does the doll stand?',
        'The test room has special tools, like a little ramp for the cars. Those tools stay in the test room. When you give a toy to a friend, you give only the toy, not the ramp.',
        'In a Java project the workshop is `src/main/java`, the test room is `src/test/java`, and JUnit is the ramp.'
      ],
      definition: '**JUnit 5** is the standard test library for Java. You add it to `pom.xml` as a **dependency** with `<scope>test</scope>`, put your tests in `src/test/java`, and Maven\'s **Surefire** plugin runs them during `mvn test`.',
      explain: [
        'You met Maven, `pom.xml` and the standard folders in [Build Tools](../build-tools/index.html). A **dependency** is a library your project needs; Maven downloads it from the internet into a local folder (`~/.m2/repository`) and puts it on the **classpath**, the list of places where Java looks for classes.',
        'JUnit 5 comes as one dependency called `junit-jupiter`. "Jupiter" is the name of the JUnit 5 programming model: the annotations like `@Test` and the assertions like `assertEquals`. That one dependency pulls in three parts: the API you write tests with, the support for parameterized tests, and the **engine** that runs them.',
        'The **scope** says where a dependency is visible. `test` scope means: only test code can use it, and it is never packed into your jar. Your real program has no idea JUnit exists.',
        'A **plugin** is a part of Maven that does one job. The **Surefire** plugin does the `test` step: it finds test classes, runs them and writes a report. You set its version yourself, so you know it understands JUnit 5.',
        'The folders matter. Code that ships goes into `src/main/java`. Test code goes into `src/test/java`. Test classes can use everything in `main`, but `main` can never see tests. A test class usually has the same name as the class it tests, plus `Test`: `Calculator` → `CalculatorTest`.'
      ],
      why: 'One command, `mvn test`, then runs every test the same way on your laptop, your friend\'s laptop and a build server.',
      whenUse: 'Once per project, when you create it. After that you only add test classes.',
      syntax: '`<dependency>` `<groupId>org.junit.jupiter</groupId>` `<artifactId>junit-jupiter</artifactId>` `<version>5.12.2</version>` `<scope>test</scope>` `</dependency>`',
      codeLanguage: 'xml',
      fileName: 'pom.xml',
      code: `<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>calculator</artifactId>
  <version>1.0</version>

  <properties>
    <maven.compiler.release>21</maven.compiler.release>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.12.2</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.5.3</version>
      </plugin>
    </plugins>
  </build>
</project>`,
      codeSummary: 'The pom from Build Tools, plus JUnit 5 as a test-only dependency and a Surefire version that knows JUnit 5. This exact file was used to run every JUnit example in this topic.',
      codeExplanation: [
        { label: 'Lines 3–5', code: '<groupId>com.example</groupId>', text: 'The project\'s name tag (group, artifact, version), as in [Build Tools](../build-tools/index.html).' },
        { label: 'Line 8', code: '<maven.compiler.release>21</maven.compiler.release>', text: 'Compile main and test code for Java 21.' },
        { label: 'Line 12', code: '<dependencies>', text: 'The list of libraries Maven must download. Here there is only one.' },
        { label: 'Line 14', code: '<groupId>org.junit.jupiter</groupId>', text: 'Who publishes the library: the JUnit team, JUnit 5 ("Jupiter") part.' },
        { label: 'Line 15', code: '<artifactId>junit-jupiter</artifactId>', text: 'The "everything you need" package: API, parameterized tests and the engine.' },
        { label: 'Line 16', code: '<version>5.12.2</version>', text: 'An exact version. Everyone on the team gets the same JUnit.' },
        { label: 'Line 17', code: '<scope>test</scope>', text: 'Only for tests. JUnit is not in your jar and your `main` code cannot import it.' },
        { label: 'Line 25', code: '<artifactId>maven-surefire-plugin</artifactId>', text: 'The plugin that runs tests in the `test` step. Very old default versions found no JUnit 5 tests, so you name a current version.' }
      ],
      sections: [
        {
          title: 'The folder layout',
          text: ['Maven expects exactly these folders. Your test class goes in the same package as the class it tests (here: no package), but under `src/test/java`.'],
          codeLanguage: 'plaintext',
          fileName: 'project folder',
          code: `calculator/
├── pom.xml
├── src/
│   ├── main/java/
│   │   └── Calculator.java        the code that ships
│   └── test/java/
│       └── CalculatorTest.java    the test, never shipped
└── target/                        made by Maven
    ├── classes/                   compiled main code
    ├── test-classes/              compiled tests
    └── surefire-reports/          test reports`
        },
        {
          title: 'Who can see whom',
          mermaid: `flowchart LR
  T["src/test/java: CalculatorTest"] -->|"uses"| M["src/main/java: Calculator"]
  T -->|"uses"| J["JUnit 5 (scope test)"]
  M -.->|"cannot see"| J
  M -.->|"cannot see"| T
  M --> JAR["calculator-1.0.jar"]`,
          diagramNote: 'Arrows show what a part may use. Only `main` code goes into the jar. Tests and JUnit stay behind.'
        },
        {
          title: 'Dependency scopes you will meet',
          table: {
            head: ['Scope', 'Main code can use it', 'Tests can use it', 'In the jar'],
            rows: [
              ['`compile` (the default)', 'yes', 'yes', 'yes'],
              ['`test`', 'no', 'yes', 'no'],
              ['`provided`', 'yes', 'yes', 'no (the server brings it)']
            ],
            note: 'Test libraries (JUnit, and later Mockito) are always `test` scope.'
          }
        },
        {
          title: 'Which classes Surefire runs',
          text: [
            'Surefire does not run every class in `src/test/java`. It only picks classes whose **name** matches one of four patterns. Other classes are helpers and are left alone.',
            'This is a real trap. Below is the real output of `mvn test` when the only test class is called `CalculatorCheck`. It says BUILD SUCCESS, but no test ran: there is no `T E S T S` block at all.'
          ],
          table: {
            head: ['Pattern', 'Runs?', 'Example'],
            rows: [
              ['`*Test`', 'yes', '`CalculatorTest`'],
              ['`*Tests`', 'yes', '`CalculatorTests`'],
              ['`Test*`', 'yes', '`TestCalculator`'],
              ['`*TestCase`', 'yes', '`CalculatorTestCase`'],
              ['anything else', 'no', '`CalculatorCheck`, `CalculatorTest2`']
            ]
          },
          codeLanguage: 'plaintext',
          fileName: 'mvn test (class named CalculatorCheck)',
          code: `[INFO] --- surefire:3.5.3:test (default-test) @ calculator ---
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------`,
          warn: 'Green with zero tests is not green. Always look for the line `Tests run: N` with N bigger than 0.'
        },
        {
          title: 'The class under test',
          text: ['This is the class the next lesson tests. It goes in `src/main/java/Calculator.java`. It has no `main`: tests call its methods directly.'],
          fileName: 'src/main/java/Calculator.java',
          code: `public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }

    public static int divide(int a, int b) {
        return a / b;
    }
}`,
          tip: 'The first `mvn test` downloads JUnit and plugins, so it needs the internet and takes a while. Later runs use `~/.m2/repository` and take about a second.'
        }
      ],
      technical: [
        'When you run `mvn test`, Maven walks its lifecycle steps in order: compile `src/main/java` into `target/classes`, compile `src/test/java` into `target/test-classes`, then run Surefire. Test compilation gets a classpath with your classes **and** all `test`-scope jars; main compilation gets neither the tests nor JUnit.',
        'Surefire starts a separate JVM (a "fork") for the tests, so a crashing test cannot take Maven down with it. It prints `Using auto detected provider org.apache.maven.surefire.junitplatform.JUnitPlatformProvider`: it saw JUnit 5 on the classpath and chose the matching **provider**, the adapter between Surefire and the JUnit Platform.',
        'JUnit 5 is split into the **JUnit Platform** (the launcher that tools like Maven and your editor talk to) and **JUnit Jupiter** (the engine that understands `@Test`). That split is why editors, Maven and Gradle can all run the same tests the same way.'
      ],
      tryIt: {
        steps: [
          'Make a folder `calculator` with the `pom.xml` above.',
          'Create `src/main/java/Calculator.java` and an empty folder `src/test/java`.',
          'Run `mvn test` once (it downloads things).',
          'Look into `target/`: which folders did Maven make?'
        ],
        see: '`BUILD SUCCESS` and no `T E S T S` block, because there is no test yet. `target/classes/Calculator.class` exists.'
      },
      check: [
        { q: 'Where does `CalculatorTest.java` go?', a: '`src/test/java/CalculatorTest.java`, in the same package as `Calculator`.' },
        { q: 'Can `Calculator.java` in `src/main/java` import `org.junit.jupiter.api.Test`?', a: 'No. JUnit has `test` scope, so it is only on the classpath of test code. Compiling main code would fail.' },
        { q: 'Your class `PriceRules` in `src/test/java` has tests, but none run. Why?', a: 'The name matches none of the patterns (`*Test`, `*Tests`, `Test*`, `*TestCase`). Rename it to `PriceRulesTest`.' }
      ],
      keyPoints: [
        'JUnit 5 is one dependency: `org.junit.jupiter:junit-jupiter`.',
        '`<scope>test</scope>` keeps JUnit out of your program.',
        'Code in `src/main/java`, tests in `src/test/java`.',
        'Surefire runs classes named `*Test`, `*Tests`, `Test*` or `*TestCase`.',
        'Check that `Tests run:` is more than 0.'
      ],
      commonMistakes: [
        'Putting the test in `src/main/java`. It then fails to compile, because JUnit is test-only. Fix: move it to `src/test/java`.',
        'Forgetting `<scope>test</scope>`. JUnit then ends up in your jar. Fix: add the scope.',
        'Naming the class `CalculatorCheck`. Maven skips it and says BUILD SUCCESS. Fix: end the name in `Test`.',
        'Running `mvn test` in the wrong folder: `there is no POM in this directory`. Fix: `cd` to the folder with `pom.xml`.'
      ],
      related: ['first-junit-test', 'Build Tools']
    },
    {
      id: 'first-junit-test',
      title: 'Your First JUnit Test',
      category: 'practice',
      icon: '@T',
      tagline: '@Test, assertEquals and a good name',
      realWorld: 'Each @Test is one question on the answer sheet. JUnit asks every question, marks each one right or wrong, and gives you the score.',
      kid: [
        'Remember your quiz game with the answer card? Now you write the questions on little cards and put a sticker on each card. The sticker says "this is a question".',
        'A helper comes in, collects every card with a sticker, asks each question and writes a tick or a cross. Cards without a sticker are left on the table.',
        'In JUnit the sticker is `@Test` and the helper is JUnit itself.'
      ],
      definition: 'A JUnit test is a method marked with the **annotation** `@Test`. Inside it you call your code and use `assertEquals(expected, actual)`. If the values differ, the test fails. JUnit finds and runs every `@Test` method by itself.',
      explain: [
        'An **annotation** is a label that starts with `@` and sits in front of a method, class or field. It does not run any code by itself. It is information for tools. `@Test` tells JUnit: "this method is a test, run it".',
        'A test method returns `void`, takes no parameters and usually is not `public` (JUnit 5 does not need it). The test class itself also does not need to be `public`. JUnit makes a **new object** of your test class for every single test method, so tests cannot disturb each other.',
        '`assertEquals(expected, actual)` is an **assertion**: a method that checks one thing and throws an `AssertionFailedError` when it is false. The order matters: expected first, actual second. When the test passes, nothing is printed for it; when it fails, JUnit catches the error and reports it.',
        'You get `assertEquals` through a **static import**: `import static org.junit.jupiter.api.Assertions.assertEquals;`. A static import lets you write `assertEquals(…)` instead of `Assertions.assertEquals(…)`. It is the same method, only a shorter name.',
        'The test name is part of the report. A good name says what the code should do in that situation, for example `addsTwoPositiveNumbers` or `divideRoundsTowardZero`. With `@DisplayName("…")` you can add a full sentence with spaces that your editor shows.'
      ],
      why: 'You no longer write a runner, a counter or PASS/FAIL printing. You write only the questions.',
      whenUse: 'For every class with real logic: one test class per class, one test method per behavior.',
      syntax: '`@Test void whatItDoes() { /* arrange */ /* act */ assertEquals(expected, actual); }`',
      fileName: 'src/test/java/CalculatorTest.java',
      code: `import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {

    @Test
    void addsTwoPositiveNumbers() {
        // Arrange
        int a = 2;
        int b = 3;

        // Act
        int result = Calculator.add(a, b);

        // Assert
        assertEquals(5, result);
    }

    @Test
    @DisplayName("adding a negative number makes the result smaller")
    void addsNegativeNumber() {
        assertEquals(-1, Calculator.add(2, -3));
    }

    @Test
    void divideRoundsTowardZero() {
        assertEquals(2, Calculator.divide(7, 3));
    }
}`,
      output: `[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running CalculatorTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.013 s -- in CalculatorTest
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] BUILD SUCCESS`,
      codeSummary: 'Three tests for `Calculator`. The first shows Arrange-Act-Assert in full; the other two fit in one line. The output is the real end of `mvn test` (needs JUnit, so it runs with Maven, not with `java`).',
      commands: [
        { label: 'Run all tests', note: 'In the folder with `pom.xml`.', command: 'mvn test' },
        { label: 'Run one test class', note: 'Handy when you have many test classes.', command: 'mvn test -Dtest=CalculatorTest' },
        { label: 'Run one test method', note: 'Class name, `#`, method name. The quotes protect the `#` in the shell.', command: "mvn test -Dtest='CalculatorTest#addsTwoPositiveNumbers'" }
      ],
      codeExplanation: [
        { label: 'Line 2', code: 'import org.junit.jupiter.api.Test;', text: 'Imports the `@Test` annotation from JUnit 5 (package `org.junit.jupiter.api`).' },
        { label: 'Line 4', code: 'import static org.junit.jupiter.api.Assertions.assertEquals;', text: 'A static import: now you can write `assertEquals(…)` without the class name `Assertions`.' },
        { label: 'Line 6', code: 'class CalculatorTest {', text: 'The name ends in `Test`, so Surefire runs it. No `public` needed.' },
        { label: 'Line 8', code: '@Test', text: 'The sticker. Without it, JUnit ignores the method below.' },
        { label: 'Line 9', code: 'void addsTwoPositiveNumbers() {', text: '`void`, no parameters, a name that says the behavior.' },
        { label: 'Line 15', code: 'int result = Calculator.add(a, b);', text: 'Act: one call to the code under test.' },
        { label: 'Line 18', code: 'assertEquals(5, result);', text: 'Assert: expected `5` first, actual `result` second. Passes silently when equal.' },
        { label: 'Line 22', code: '@DisplayName("adding a negative number makes the result smaller")', text: 'A sentence for humans. Your editor shows it in its test window. The Maven console still prints the method name.' },
        { label: 'Line 28', code: 'void divideRoundsTowardZero() {', text: 'A test can also document a surprise: `7 / 3` with `int` is `2`, not `2.33`.' }
      ],
      sections: [
        {
          title: 'The parts of a test class',
          table: {
            head: ['Part', 'Rule', 'Why'],
            rows: [
              ['File', '`src/test/java/CalculatorTest.java`', 'Test folder, name ends in `Test`'],
              ['Class', '`class CalculatorTest`, no `public` needed', 'JUnit 5 can reach package-private classes'],
              ['Method', '`@Test void name()`', 'JUnit runs every method with `@Test`'],
              ['Return type', 'always `void`', 'A test passes or fails; it returns nothing'],
              ['Assertions', '`assertEquals(expected, actual)`', 'Throws `AssertionFailedError` when different'],
              ['Fresh object', 'one new `CalculatorTest` per test', 'Fields from one test never leak into another']
            ]
          }
        },
        {
          title: 'What JUnit does when it runs your class',
          text: [
            'JUnit is not magic. It uses **reflection**: Java code that looks at a class while the program runs and asks "which methods do you have, and which annotations sit on them?". Then it calls each marked method on a fresh object and catches any error.',
            'Here is a working miniature of that, with our own annotation `@MyTest`. `@interface` declares an annotation. `@Retention(RUNTIME)` keeps the label in the `.class` file so it can be read while the program runs. `Comparator.comparing(Method::getName)` sorts the methods by name, because Java returns them in no fixed order.'
          ],
          fileName: 'TinyJUnit.java',
          code: `import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Comparator;

public class TinyJUnit {
    // Our own marker, like JUnit's @Test. RUNTIME keeps it in the .class file.
    @Retention(RetentionPolicy.RUNTIME)
    @interface MyTest {}

    static class CalculatorChecks {
        @MyTest
        void addsTwoNumbers() {
            if (2 + 3 != 5) throw new AssertionError("expected 5");
        }

        @MyTest
        void failsOnPurpose() {
            throw new AssertionError("expected 4 but was 5");
        }

        void helperWithoutMarker() {
            System.out.println("never called by the runner");
        }
    }

    public static void main(String[] args) throws Exception {
        Method[] methods = CalculatorChecks.class.getDeclaredMethods();
        Arrays.sort(methods, Comparator.comparing(Method::getName));
        for (Method method : methods) {
            if (!method.isAnnotationPresent(MyTest.class)) continue;
            Object freshObject = new CalculatorChecks(); // a new object for every test
            try {
                method.invoke(freshObject);
                System.out.println("PASS " + method.getName());
            } catch (java.lang.reflect.InvocationTargetException e) {
                System.out.println("FAIL " + method.getName() + ": " + e.getCause().getMessage());
            }
        }
    }
}`,
          output: `PASS addsTwoNumbers
FAIL failsOnPurpose: expected 4 but was 5`,
          tip: 'The helper method without the marker is never called. That is exactly why a test without `@Test` silently does not run.'
        },
        {
          title: 'One run, step by step',
          mermaid: `sequenceDiagram
  participant M as mvn test
  participant S as Surefire
  participant J as JUnit
  participant T as CalculatorTest
  M->>S: run the test step
  S->>J: run all classes named *Test
  J->>T: new CalculatorTest()
  J->>T: addsTwoPositiveNumbers()
  T-->>J: returned normally = PASS
  J->>T: new CalculatorTest()
  J->>T: addsNegativeNumber()
  T-->>J: returned normally = PASS
  J-->>S: 3 run, 0 failed
  S-->>M: BUILD SUCCESS`,
          diagramNote: 'A test **passes** when the method ends normally. It **fails** when an assertion throws. A new object is made before every test.'
        },
        {
          title: 'Good test names',
          text: ['The name is the first thing you read when a test is red. It should say the behavior, not repeat the method name.'],
          table: {
            head: ['Weak name', 'Better name', 'Why better'],
            rows: [
              ['`test1()`', '`addsTwoPositiveNumbers()`', 'Says what is checked'],
              ['`testAdd()`', '`addsNegativeNumber()`', 'Says which situation'],
              ['`divide()`', '`divideRoundsTowardZero()`', 'Says the expected behavior'],
              ['`checkAge()`', '`personOfExactly18IsAdult()`', 'Names the border case']
            ],
            note: 'A common pattern is *what* + *when*: `refusesNegativePrice`, `returnsEmptyListWhenNothingMatches`. Use `@DisplayName` when a sentence with spaces reads better.'
          }
        },
        {
          title: 'Wrong versus right: the order of the arguments',
          text: ['Both lines compile. Only one tells the truth when it fails. Below is the real message for the wrong order after a bug made `add(2, 3)` return `-1`.'],
          codeLanguage: 'plaintext',
          fileName: 'expected first, actual second',
          code: `assertEquals(result, 5);   // wrong order
  → expected: <-1> but was: <5>     "5 is the bug?" No!

assertEquals(5, result);   // right order
  → expected: <5> but was: <-1>     the code gave -1`,
          warn: 'JUnit cannot know which value is which. It trusts the order. Always: expected first, actual second.'
        }
      ],
      technical: [
        '`@Test` is declared in JUnit with `@Retention(RUNTIME)`, so the compiler keeps it in `CalculatorTest.class`. The JUnit Jupiter engine scans the compiled test classes, uses reflection to find methods with `@Test`, and builds a list of tests before running any of them.',
        'For each test, JUnit creates a new instance of the test class (the default "per-method lifecycle"), calls the method and watches for exceptions. No exception means PASS. An `AssertionFailedError` (a subclass of `AssertionError`) means FAILURE. Any other exception means ERROR. Results go to listeners; Surefire is one listener and turns them into console lines and report files.',
        'The order of test methods is fixed but deliberately not obvious (it is based on a hash of the method name). Never write a test that only works if another test ran before it.'
      ],
      tryIt: {
        steps: [
          'Save `CalculatorTest.java` in `src/test/java/` of your project from "Set Up JUnit".',
          'Run `mvn test`.',
          'Delete the `@Test` line above `divideRoundsTowardZero` and run again. Count the tests.',
          'Put `@Test` back. Run only one method: `mvn test -Dtest=\'CalculatorTest#addsTwoPositiveNumbers\'`.'
        ],
        see: '`Tests run: 3` first, then `Tests run: 2` without the annotation, then `Tests run: 1` for the single method.'
      },
      check: [
        { q: 'What does the `@Test` annotation do by itself?', a: 'Nothing runs because of it directly. It is a label; JUnit reads it and runs the method as a test.' },
        { q: 'Why can a field set in one test not be seen in the next test?', a: 'JUnit makes a new object of the test class for every test method. Each test gets fresh fields.' },
        { q: 'What does `import static …Assertions.assertEquals;` give you?', a: 'You can call `assertEquals(…)` without writing the class name `Assertions` in front.' }
      ],
      keyPoints: [
        '`@Test` marks a method as a test; JUnit finds it by itself.',
        'Test methods are `void` and take no parameters.',
        '`assertEquals(expected, actual)`: expected first.',
        'JUnit makes a new test object for every test.',
        'Name tests after the behavior they check.'
      ],
      commonMistakes: [
        'Forgetting `@Test`, so the method never runs and nobody notices. Fix: check `Tests run:` after adding a test.',
        'Copying `import org.junit.Test;` from an old JUnit 4 example. Maven says `package org.junit does not exist`. Fix: `import org.junit.jupiter.api.Test;`.',
        'Writing `assertEquals(result, 5)`. The failure message then says the bug is the 5. Fix: `assertEquals(5, result)`.',
        'Giving a test a parameter, like `@Test void adds(int a)`. JUnit reports an error: `No ParameterResolver registered for parameter [int arg0]`. Fix: use `@ParameterizedTest` (lesson "Many Inputs, One Test").'
      ],
      related: ['assertions', 'red-test', 'junit-setup']
    }
  ]);
})();
