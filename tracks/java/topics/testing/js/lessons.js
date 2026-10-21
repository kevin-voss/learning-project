(function () {
  Java.addCoreTopic('testing', {
    label: 'Testing',
    headline: 'Testing,',
    accent: 'let the computer check your work.',
    intro: 'A test runs your code with a known input and checks the answer. Start with a tiny self-check, then write a real JUnit 5 test and run it with mvn test.',
    overview: 'Self-check → set up JUnit → your first @Test → read a red test.',
    tryIt: {
      steps: [
        'Make the Maven project from "Set Up JUnit".',
        'Save the code below as `src/main/java/Calculator.java`.',
        'Save `CalculatorTest.java` from "Your First JUnit Test" in `src/test/java/`.',
        'Run `mvn test`.',
        'Change `return a + b;` to `return a - b;` and run `mvn test` again. Then undo it.'
      ],
      code: `public class Calculator {
    static int add(int a, int b) {
        return a + b;
    }

    static int divide(int a, int b) {
        return a / b;
    }
}`,
      see: '`Tests run: 2, Failures: 0` and `BUILD SUCCESS`. After the change: `expected: <5> but was: <-1>` and `BUILD FAILURE`.'
    },
    check: [
      { q: 'In `assertEquals(5, add(2, 3))`, which number is the expected one?', a: 'The first one, 5. The second argument is the actual result.' },
      { q: 'Your test class is called `CalculatorCheck`. `mvn test` says `Tests run: 0`. Why?', a: 'Maven only runs classes whose names end in `Test` (or start with `Test`). Rename it to `CalculatorTest`.' },
      { q: 'Why does JUnit have `<scope>test</scope>` in the pom?', a: 'So JUnit is only used for tests. It never goes into your finished program.' }
    ]
  }, [
    {
      id: 'self-checks',
      title: 'A Tiny Self-Check',
      category: 'concept',
      icon: 'ok',
      tagline: 'Expected versus actual',
      realWorld: 'A teacher has the answer sheet. She compares each answer with the sheet. A test is the answer sheet for your code.',
      definition: 'A test calls your code with a known input. It compares the actual answer with the expected answer. If they differ, it fails loudly. You can do this with plain Java before you learn a tool.',
      why: 'You find mistakes in seconds, every time you change the code.',
      whenUse: 'For any method that returns a value.',
      fileName: 'SelfCheckDemo.java',
      code: `public class SelfCheckDemo {
    static int add(int a, int b) {
        return a + b;
    }

    static void checkEquals(int expected, int actual) {
        if (expected != actual) {
            throw new AssertionError("expected " + expected + " but got " + actual);
        }
    }

    public static void main(String[] args) {
        checkEquals(5, add(2, 3));
        checkEquals(0, add(-2, 2));
        System.out.println("All checks passed");
    }
}`,
      keyPoints: ['A test needs an expected value and an actual value.', 'Test the easy case and an edge case (0, negative, empty).'],
      commonMistakes: ['Checking printed text when the method could return a value.'],
      related: ['Methods']
    },
    {
      id: 'junit-setup',
      title: 'Set Up JUnit',
      category: 'practice',
      icon: 'pom',
      tagline: 'Add JUnit 5 to the pom',
      realWorld: 'You add "test kit" to the shopping list on your recipe card. Maven goes shopping for you.',
      definition: 'JUnit is the standard test tool for Java. You add it to `pom.xml` as a dependency. Maven downloads it. `<scope>test</scope>` means it is only for tests. The surefire plugin is the part of Maven that runs the tests.',
      why: 'One command runs every test, on every computer.',
      whenUse: 'Once per project.',
      codeLanguage: 'xml',
      fileName: 'pom.xml',
      code: `<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>calculator</artifactId>
  <version>1.0</version>
  <properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.10.2</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
    <plugins>
      <plugin>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.2.5</version>
      </plugin>
    </plugins>
  </build>
</project>`,
      codeSummary: 'The pom from Build Tools, plus JUnit 5 as a test-only dependency and a current surefire plugin that knows JUnit 5.',
      codeExplanation: [
        'The top part is the same as in Build Tools.',
        'dependencies: the libraries Maven should download. Here only JUnit 5.',
        'scope test: JUnit is visible to test code only and never packaged.',
        'surefire 3.2.5 runs JUnit 5 tests. Older default versions find no tests.'
      ],
      keyPoints: ['Tests live in `src/test/java`.', 'Your code lives in `src/main/java`.'],
      commonMistakes: ['Forgetting the surefire version. Then `mvn test` says `Tests run: 0`.'],
      related: ['Maven & Gradle Basics']
    },
    {
      id: 'first-junit-test',
      title: 'Your First JUnit Test',
      category: 'practice',
      icon: '@T',
      tagline: '@Test and assertEquals',
      realWorld: 'Each @Test is one question on the answer sheet. JUnit asks them all and marks each one right or wrong.',
      definition: 'A test class sits in `src/test/java` and its name ends in `Test`. Each method marked `@Test` is one test. `assertEquals(expected, actual)` fails the test if the two differ. `assertThrows` checks that bad input is refused.',
      why: 'JUnit runs every test, counts them and shows exactly which one failed.',
      whenUse: 'For every class with real logic.',
      syntax: 'Code: `src/main/java/Calculator.java` with `static int add(int a, int b)` and `static int divide(int a, int b)`. Test: `src/test/java/CalculatorTest.java` below.',
      fileName: 'src/test/java/CalculatorTest.java',
      code: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CalculatorTest {

    @Test
    void addsTwoNumbers() {
        assertEquals(5, Calculator.add(2, 3));
    }

    @Test
    void refusesToDivideByZero() {
        assertThrows(ArithmeticException.class, () -> Calculator.divide(1, 0));
    }
}`,
      commands: [
        { label: 'Run all tests', note: 'Run it in the folder with pom.xml.', command: 'mvn test' },
        { label: 'Run one test class', note: 'Handy when you have many tests.', command: 'mvn test -Dtest=CalculatorTest' }
      ],
      keyPoints: ['Expected first, actual second.', 'One idea per test. Give it a name that says what it checks.'],
      commonMistakes: ['Naming the class CalculatorTests2 or CalculatorCheck: Maven skips it.', 'Swapping expected and actual. The error message then lies.'],
      related: ['Exceptions']
    },
    {
      id: 'red-test',
      title: 'Read a Red Test',
      category: 'habits',
      icon: '✗',
      tagline: 'Which test, which line, which values',
      realWorld: 'A red mark on your homework says which question and what the right answer was. The test report says the same.',
      definition: 'When a test fails, Maven prints three clues: the test name, the line number, and "expected X but was Y". Go to that line. Ask how the code could give Y. Fix the code, not the test, unless the test was wrong.',
      why: 'The report tells you where to look. No guessing.',
      whenUse: 'Every time you see BUILD FAILURE.',
      codeLanguage: 'plaintext',
      fileName: 'mvn test output',
      code: `[ERROR] Tests run: 2, Failures: 1, Errors: 0, Skipped: 0
[ERROR] CalculatorTest.addsTwoNumbers:10
        expected: <5> but was: <-1>
[INFO] BUILD FAILURE`,
      codeExplanation: [
        '2 tests ran, 1 failed.',
        'Which test (addsTwoNumbers) and which line (10).',
        'What it wanted (5) and what it got (-1). Now read add().',
        'No jar is built while a test is red.'
      ],
      keyPoints: ['Read: test name → line → expected vs actual.', 'Full reports are in `target/surefire-reports/`.'],
      commonMistakes: ['Changing the expected value until the test turns green.'],
      related: ['Debugging']
    }
  ]);
})();
