// Testing lessons 9–10: parameterized tests with @CsvSource, and what to test (borders, edge cases).
(function () {
  Java.addCoreLessons('testing', [
    {
      id: 'parameterized-tests',
      title: 'Many Inputs, One Test',
      category: 'practice',
      icon: '#',
      tagline: '@ParameterizedTest with @CsvSource',
      realWorld: 'A cookie cutter makes many cookies of the same shape from different dough: chocolate, vanilla, lemon. A parameterized test is one cutter, and each row of data is a new dough.',
      kid: [
        'Your teacher writes one question on the board: "Is ___ an even number?" Then she points at a list: 4, 7, 10, 13.',
        'She does not write four questions. She writes one question with a gap, and fills the gap from the list, one number at a time.',
        'A parameterized test is that question with a gap. JUnit fills the gap from your list and runs the test once per row.'
      ],
      definition: 'A **parameterized test** is one test method that runs several times with different inputs. You mark it `@ParameterizedTest` instead of `@Test`, give it **parameters**, and add a **source** such as `@CsvSource` that lists one row of values per run.',
      explain: [
        'Many rules need the same check with different values: is 2024 a leap year, is 2023, is 1900, is 2000? Four copies of the same test differ only in two values. That is boring to write and hard to read.',
        'With `@ParameterizedTest` the method gets parameters, for example `(int year, boolean expected)`. A **source** annotation supplies the values. `@CsvSource` takes a list of strings; each string is one row, and commas separate the values in it. CSV means "comma-separated values", the same format a spreadsheet can save.',
        'JUnit converts each value to the parameter type: `"2024"` becomes the `int` 2024, `"true"` becomes the `boolean` true. Then it calls the method once per row. Each row counts as its own test in the report: four rows, four tests.',
        'If one row fails, the others still run, and the report names the failing row by its number: `knowsLeapYears(int, boolean)[3]` is the third row. With `@ParameterizedTest(name = "{0} is a leap year: {1}")` you also give each run a readable name: `{0}` is the first value of the row, `{1}` the second. Your editor shows those names.',
        'For a single value per run, `@ValueSource(ints = {2021, 2022, 2023})` is shorter. Parameterized tests are in the `junit-jupiter-params` part, which the `junit-jupiter` dependency from "Set Up JUnit" already includes.'
      ],
      why: 'One test, many cases. Adding a case is one new line of data, so you actually add the border cases instead of skipping them.',
      whenUse: 'When several tests would be the same code with different input and expected values: rules, conversions, validations.',
      syntax: '`@ParameterizedTest` `@CsvSource({ "input1, expected1", "input2, expected2" })` `void name(Type input, Type expected) { … }`',
      fileName: 'src/test/java/YearsTest.java',
      code: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

class YearsTest {

    @ParameterizedTest(name = "{0} is a leap year: {1}")
    @CsvSource({
        "2024, true",
        "2023, false",
        "1900, false",
        "2000, true"
    })
    void knowsLeapYears(int year, boolean expected) {
        assertEquals(expected, Years.isLeapYear(year));
    }

    @ParameterizedTest
    @ValueSource(ints = {2021, 2022, 2023})
    void ordinaryYearsAreNotLeapYears(int year) {
        assertFalse(Years.isLeapYear(year));
    }
}`,
      output: `[INFO] Running YearsTest
[INFO] Tests run: 7, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.029 s -- in YearsTest`,
      codeSummary: 'Two parameterized tests for `Years.isLeapYear` (the class is in step 1). Four CSV rows plus three single values give 7 tests in the real `mvn test` report.',
      commands: [
        { label: 'Run only this class', note: 'In the folder with `pom.xml`.', command: 'mvn test -Dtest=YearsTest' }
      ],
      codeExplanation: [
        { label: 'Line 1', code: 'import org.junit.jupiter.params.ParameterizedTest;', text: 'From the `params` package, not from `api` like `@Test`.' },
        { label: 'Line 10', code: '@ParameterizedTest(name = "{0} is a leap year: {1}")', text: 'Replaces `@Test`. The `name` pattern fills in the row values for a readable test name.' },
        { label: 'Line 11', code: '@CsvSource({', text: 'The source: an array of strings, one per row.' },
        { label: 'Line 14', code: '"1900, false",', text: 'The tricky row: divisible by 100 but not by 400, so **not** a leap year.' },
        { label: 'Line 17', code: 'void knowsLeapYears(int year, boolean expected) {', text: 'One parameter per column, in order. JUnit converts the text to `int` and `boolean`.' },
        { label: 'Line 18', code: 'assertEquals(expected, Years.isLeapYear(year));', text: 'The body is written once and runs four times.' },
        { label: 'Line 22', code: '@ValueSource(ints = {2021, 2022, 2023})', text: 'One value per run, no expected column needed: all three must be `false`.' }
      ],
      sections: [
        {
          title: 'The class under test',
          text: ['Goes in `src/main/java/Years.java`. The rule: every 4th year is a leap year, except every 100th, except every 400th.'],
          fileName: 'src/main/java/Years.java',
          code: `public class Years {
    public static boolean isLeapYear(int year) {
        if (year % 400 == 0) {
            return true;
        }
        if (year % 100 == 0) {
            return false;
        }
        return year % 4 == 0;
    }
}`
        },
        {
          title: 'The same idea in plain Java: a table and a loop',
          text: ['A parameterized test is a data table plus a loop. Here it is by hand, so you see what JUnit does for you.'],
          fileName: 'LeapYearTable.java',
          code: `public class LeapYearTable {
    static boolean isLeapYear(int year) {
        if (year % 400 == 0) {
            return true;
        }
        if (year % 100 == 0) {
            return false;
        }
        return year % 4 == 0;
    }

    public static void main(String[] args) {
        // One row per case: the input and the expected answer.
        int[] years = {2024, 2023, 1900, 2000};
        boolean[] expected = {true, false, false, true};

        for (int i = 0; i < years.length; i++) {
            boolean actual = isLeapYear(years[i]);
            String verdict = actual == expected[i] ? "PASS" : "FAIL";
            System.out.println("[" + (i + 1) + "] " + verdict + " " + years[i] + " is a leap year: " + actual);
        }
    }
}`,
          output: `[1] PASS 2024 is a leap year: true
[2] PASS 2023 is a leap year: false
[3] PASS 1900 is a leap year: false
[4] PASS 2000 is a leap year: true`
        },
        {
          title: 'From one CSV row to one test run',
          mermaid: `flowchart LR
  R["row: 1900, false"] --> S["split at the comma"]
  S --> A["1900 as int"]
  S --> B["false as boolean"]
  A --> C["knowsLeapYears(1900, false)"]
  B --> C
  C --> D["run number 3 in the report"]`,
          diagramNote: 'JUnit repeats this for every row. Spaces around the comma are removed, so `"1900, false"` and `"1900,false"` are the same.'
        },
        {
          title: 'When one row fails',
          text: [
            'The rule "every 100th year is not a leap year" was broken on purpose. This is the real output. Only row 3 (1900) fails; the other six runs pass.'
          ],
          codeLanguage: 'plaintext',
          fileName: 'mvn test (one bad row)',
          code: `[ERROR] Tests run: 7, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.047 s <<< FAILURE! -- in YearsTest
[ERROR] YearsTest.knowsLeapYears(int, boolean)[3] -- Time elapsed: 0.002 s <<< FAILURE!
org.opentest4j.AssertionFailedError: expected: <false> but was: <true>
\tat YearsTest.knowsLeapYears(YearsTest.java:18)`,
          tip: '`[3]` is the row number, counted from 1. Maven shows the number; your editor shows the `name` pattern, here `1900 is a leap year: false`.'
        },
        {
          title: 'CSV rules and other sources',
          table: {
            head: ['You write', 'The parameter gets', 'Note'],
            rows: [
              ['`"2024, true"`', '`2024` and `true`', 'Converted to the parameter types'],
              ["`\"'Hello, world', 12\"`", '`"Hello, world"` and `12`', 'Single quotes keep a comma inside text'],
              ["`\"'', 0\"`", '`""` (empty text) and `0`', 'Two single quotes mean empty text'],
              ['`", nothing"`', '`null` and `"nothing"`', 'A missing value is `null`'],
              ['`@ValueSource(strings = {"a", "b"})`', 'one value per run', 'Also `ints`, `longs`, `doubles` …'],
              ['`@EnumSource(Size.class)`', 'every constant of an enum', 'Enums are in [Enums](../enums/index.html)'],
              ['`@MethodSource("cases")`', 'rows from a `static` method', 'For objects that are hard to write as text']
            ],
            note: 'The four CSV rows at the top were checked with a real JUnit 5.12 run.'
          }
        }
      ],
      technical: [
        '`@ParameterizedTest` is a "test template": JUnit asks the source for its arguments, and for each set it creates a new invocation with its own new test object, `@BeforeEach` and `@AfterEach`. That is why each row is reported as its own test.',
        '`@CsvSource` parses every string with a small CSV parser. Each column is then converted by an **argument converter**: built-in ones handle primitives, `String`, enums, dates such as `2024-02-29` for `LocalDate`, and more. If the conversion fails (for example `"abc"` for an `int`), the run ends with an error that names the value.',
        'The default display name is `[{index}] {argumentsWithNames}`. Surefire prints the method signature plus the index (`knowsLeapYears(int, boolean)[3]`), which is why the row number is the thing to remember.'
      ],
      tryIt: {
        steps: [
          'Add `Years.java` and `YearsTest.java` and run `mvn test -Dtest=YearsTest`.',
          'Add a row `"2100, false"` and run again. Count the tests.',
          'Break the rule: change `year % 100 == 0` to `year % 100 == 1`. Run again and find the row number.',
          'Undo the change.'
        ],
        see: '`Tests run: 8` after the new row. With the bug: `knowsLeapYears(int, boolean)[3]` fails with `expected: <false> but was: <true>` (and row 5, 2100, too).'
      },
      check: [
        { q: 'A `@CsvSource` has 5 rows. How many tests does the report count?', a: 'Five. Each row is one run, reported as its own test.' },
        { q: 'How do you put the text `Hello, world` into one CSV value?', a: 'In single quotes: `"\'Hello, world\', 12"`. Without them the comma would split the text into two values.' },
        { q: 'Which annotation replaces `@Test` on a parameterized test?', a: '`@ParameterizedTest`. Using both, or only `@Test`, is wrong: with only `@Test`, JUnit cannot fill the parameters.' }
      ],
      keyPoints: [
        '`@ParameterizedTest` + a source runs one method many times.',
        '`@CsvSource`: one string per row, values split at commas.',
        'Each row is its own test; failures name the row number.',
        '`name = "{0} … {1}"` gives each run a readable name.',
        'Adding a case is one line, so add the border cases.'
      ],
      commonMistakes: [
        'Writing `@Test` instead of `@ParameterizedTest` on a method with parameters. JUnit reports `No ParameterResolver registered`. Fix: `@ParameterizedTest`.',
        'Columns in the wrong order, like `"true, 2024"` for `(int year, boolean expected)`. Conversion fails. Fix: same order as the parameters.',
        'Text with a comma without quotes: `"Hello, world, 12"` becomes three values. Fix: `"\'Hello, world\', 12"`.',
        'Putting `if` logic in the test body to compute the expected value. Fix: write the expected value in the row.'
      ],
      related: ['what-to-test', 'assertions', 'Enums']
    },
    {
      id: 'what-to-test',
      title: 'What to Test: Borders and Edge Cases',
      category: 'habits',
      icon: '|',
      tagline: 'Bugs live at the edges',
      realWorld: 'A playground slide has a sign: "from 6 years". The guard does not worry about 3-year-olds or 10-year-olds. The arguments are always about the child who turns 6 today.',
      kid: [
        'Your mum says: "You may watch TV until 7 o\'clock." Is 6:59 OK? Yes. Is 7:00 OK? Hmm. Is 7:01 OK? No.',
        'Nobody argues about 3 o\'clock. Everybody argues about 7:00 exactly. That is the **border**, and that is where mistakes happen.',
        'Good tests look exactly there: right before the border, on it, and right after it. And they try strange things too, like "what if the clock shows nothing at all?"'
      ],
      definition: 'Good tests pick inputs on purpose: one normal value from each group, the **border values** where the behavior changes (on the border and right next to it), and **edge cases**: unusual but possible inputs such as 0, empty text, an empty list or `null`.',
      explain: [
        'You cannot test every possible input; an `int` alone has about four billion values. So you split the inputs into **equivalence classes**: groups where the code should behave the same. For a ticket price: under 6 (free), 6 to 17 (5 euros), 18 and older (10 euros), and negative ages (refused). One value from the middle of each group is enough to show that group works.',
        'Most bugs are at the **borders** between groups: `<` instead of `<=`, an off-by-one in a loop. So for every border you test the value on each side: 5 and 6, 17 and 18. If the code says `age <= 6` by mistake, only the test for 6 catches it.',
        '**Edge cases** are the odd inputs at the very end of the range: 0, −1, the largest number, empty text `""`, text with only spaces, an empty list, a list with one element, `null`. Code often assumes "there is at least one", and edge cases check that assumption.',
        'Test **behavior**, not implementation. Ask "what should come out for this input?", not "which private method is called inside?". Then you can rewrite the inside of a method without rewriting its tests.',
        'Some things are not worth a test: Java\'s own classes (`ArrayList.add` works), getters and setters without logic, and code that only prints. Spend your tests where your own decisions are: `if`s, loops and calculations.'
      ],
      why: 'Fewer, smarter tests catch more bugs than many random ones.',
      whenUse: 'Every time you write a test. Before writing it, ask: where are the borders, and what is the strangest input someone could pass?',
      syntax: 'For a border at `n`: test `n - 1`, `n`, and one normal value on each side. Plus `0`, empty, `null` where they can happen.',
      fileName: 'TicketPriceChecks.java',
      code: `public class TicketPriceChecks {
    // Under 6: free. 6 to 17: 5 euros. 18 or older: 10 euros. Negative: refused.
    static int priceInEuros(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("age must not be negative: " + age);
        }
        if (age < 6) {
            return 0;
        }
        if (age < 18) {
            return 5;
        }
        return 10;
    }

    static void check(String name, int expected, int actual) {
        String verdict = expected == actual ? "PASS" : "FAIL";
        System.out.println(verdict + " " + name + " (expected " + expected + ", got " + actual + ")");
    }

    public static void main(String[] args) {
        check("age 0, the youngest", 0, priceInEuros(0));
        check("age 5, last free year", 0, priceInEuros(5));
        check("age 6, first paying year", 5, priceInEuros(6));
        check("age 17, last child year", 5, priceInEuros(17));
        check("age 18, first adult year", 10, priceInEuros(18));
        check("age 70, a normal adult", 10, priceInEuros(70));
        try {
            priceInEuros(-1);
            System.out.println("FAIL age -1 should be refused");
        } catch (IllegalArgumentException e) {
            System.out.println("PASS age -1 is refused: " + e.getMessage());
        }
    }
}`,
      output: `PASS age 0, the youngest (expected 0, got 0)
PASS age 5, last free year (expected 0, got 0)
PASS age 6, first paying year (expected 5, got 5)
PASS age 17, last child year (expected 5, got 5)
PASS age 18, first adult year (expected 10, got 10)
PASS age 70, a normal adult (expected 10, got 10)
PASS age -1 is refused: age must not be negative: -1`,
      codeSummary: 'Seven chosen checks for a ticket price rule: both sides of each border (5/6, 17/18), the edge cases 0 and −1, and one normal adult. In plain Java, so you can run it with `java`.',
      codeExplanation: [
        { label: 'Line 4', code: 'if (age < 0) {', text: 'The first border: negative ages are not real. The code refuses them.' },
        { label: 'Line 7', code: 'if (age < 6) {', text: 'The second border, between 5 and 6. `<` versus `<=` is the classic bug here.' },
        { label: 'Line 10', code: 'if (age < 18) {', text: 'The third border, between 17 and 18.' },
        { label: 'Line 22', code: 'check("age 0, the youngest", 0, priceInEuros(0));', text: 'An edge case: the smallest allowed value.' },
        { label: 'Lines 23–24', code: 'check("age 5, last free year", 0, priceInEuros(5));', text: 'Both sides of the border at 6. Together they pin the border exactly.' },
        { label: 'Lines 25–26', code: 'check("age 17, last child year", 5, priceInEuros(17));', text: 'Both sides of the border at 18.' },
        { label: 'Line 27', code: 'check("age 70, a normal adult", 10, priceInEuros(70));', text: 'One normal value from the middle of the last group.' },
        { label: 'Line 29', code: 'priceInEuros(-1);', text: 'The value right below the first border must be refused. In JUnit you would write `assertThrows`.' }
      ],
      sections: [
        {
          title: 'The borders on a number line',
          mermaid: `flowchart LR
  N["-1 and below: refused"] --- Z["0 to 5: free"]
  Z --- K["6 to 17: 5 euros"]
  K --- A["18 and up: 10 euros"]
  B1(["test -1 and 0"]) -.-> N
  B2(["test 5 and 6"]) -.-> Z
  B3(["test 17 and 18"]) -.-> K`,
          diagramNote: 'Four groups, three borders. Two tests per border plus one middle value per group gives a small, strong test set.'
        },
        {
          title: 'The same checks as a JUnit test',
          text: ['With a parameterized test from the last lesson, the border table becomes data. For the Maven project, put the method into `src/main/java/Tickets.java` as `public static int priceInEuros(int age)` inside `public class Tickets`. This test was run for real; after changing `age < 18` to `age <= 18` exactly one row failed: `TicketsTest.priceDependsOnAge:20 expected: <10> but was: <5>`.'],
          fileName: 'src/test/java/TicketsTest.java',
          code: `import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class TicketsTest {

    @ParameterizedTest(name = "age {0} pays {1} euros")
    @CsvSource({
        "0, 0",
        "5, 0",
        "6, 5",
        "17, 5",
        "18, 10",
        "70, 10"
    })
    void priceDependsOnAge(int age, int expectedEuros) {
        assertEquals(expectedEuros, Tickets.priceInEuros(age));
    }

    @Test
    void negativeAgeIsRefused() {
        assertThrows(IllegalArgumentException.class, () -> Tickets.priceInEuros(-1));
    }
}`,
          output: `[INFO] Running TicketsTest
[INFO] Tests run: 7, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.008 s -- in TicketsTest`
        },
        {
          title: 'Edge cases by kind of input',
          table: {
            head: ['Input type', 'Edge cases to try'],
            rows: [
              ['Whole numbers', '`0`, `1`, `-1`, each border and border ± 1, a very large value (`Integer.MAX_VALUE`)'],
              ['Decimal numbers', '`0.0`, negative values, values that are not exact in binary (`0.1 + 0.2`)'],
              ['Text (`String`)', 'empty `""`, only spaces `"  "`, one character, upper and lower case, `null`'],
              ['Arrays and lists', 'empty, exactly one element, many, duplicates, the wanted item first and last'],
              ['Maps', 'missing key (`get` returns `null`), key present twice in the input'],
              ['Dates', '29 February, the last day of a year, midnight'],
              ['Objects', '`null` where a method gets an object']
            ],
            note: 'Not every edge case applies to every method. Ask for each one: can this input really reach my code?'
          }
        },
        {
          title: 'What a good test is like',
          table: {
            head: ['Property', 'Means', 'Breaks when'],
            rows: [
              ['Fast', 'runs in milliseconds', 'it waits, sleeps or uses the network'],
              ['Independent', 'needs no other test before it', 'tests share `static` state'],
              ['Repeatable', 'same result every run, on every computer', 'it depends on the clock, random numbers or local files'],
              ['Self-checking', 'decides PASS/FAIL itself', 'a human must read printed output'],
              ['Clear', 'one behavior, a name that says it', 'it checks five unrelated things']
            ],
            note: 'For code that uses the clock or the network, see the lesson "Fakes: Test Doubles".'
          }
        },
        {
          title: 'Behavior versus implementation',
          text: ['Test what comes out, not how the method gets there. The left test breaks when you rename a private helper, although the price is still right.'],
          table: {
            head: ['Fragile (tests the inside)', 'Solid (tests the behavior)'],
            rows: [
              ['"the method calls `isChild()` once"', '"age 6 pays 5 euros"'],
              ['"the list inside has capacity 10"', '"after two `add` calls, `count()` is 2"'],
              ['testing a `private` method through tricks', 'testing the `public` method that uses it']
            ]
          },
          warn: 'If a private method feels like it needs its own tests, it may want to be its own small class with a public method.'
        }
      ],
      technical: [
        'Choosing one value per group is called **equivalence partitioning**; adding the values at each edge is **boundary value analysis**. Both are classic test design methods: the first keeps the number of tests small, the second puts them where bugs are likely.',
        'Tools can measure **code coverage**: which lines and branches your tests ran (JaCoCo is the common Maven plugin). 100 % coverage does not prove correctness: a test can run a line without checking its result. Use coverage to find code no test touches, not as a score.',
        'Another trick is **mutation testing** (PIT for Java): a tool changes your code on purpose, for example `<` to `<=`, and checks that some test turns red. If all tests stay green, your tests missed that border. You did that by hand in the "Try it" steps of this topic.'
      ],
      tryIt: {
        steps: [
          'Run `java TicketPriceChecks.java`.',
          'Plant a bug: change `age < 6` to `age <= 6`. Run again. Which check fails?',
          'Undo it. Now delete the two checks for 5 and 6, plant the same bug again and run.',
          'Put everything back.'
        ],
        see: 'With all checks: `FAIL age 6, first paying year (expected 5, got 0)`. Without the border checks: every line says PASS although the bug is in the code.'
      },
      check: [
        { q: 'A method allows passwords of 8 to 20 characters. Which lengths do you test?', a: '7 and 8 (lower border), 20 and 21 (upper border), one normal length like 12, and the edge cases 0 (empty) and maybe `null`.' },
        { q: 'Why is testing 3 and 30 not enough for "free under 6"?', a: 'Both are far from the border. A bug like `<= 6` gives the right answer for 3 and 30. Only 5 and 6 catch it.' },
        { q: 'Should you write a test that `ArrayList.add` adds an element?', a: 'No. That is Java\'s code, already tested. Test your own decisions.' }
      ],
      keyPoints: [
        'Split inputs into groups; test one normal value per group.',
        'Test both sides of every border.',
        'Try edge cases: 0, empty, one element, `null`, very large.',
        'Test behavior through the public methods, not the inside.',
        'Do not test Java itself or code without decisions.'
      ],
      commonMistakes: [
        'Only "happy path" tests like `priceInEuros(30)`. Fix: add the borders and edge cases.',
        'Testing only one side of a border (`priceInEuros(6)` but not `5`). Fix: both sides.',
        'Tests that depend on today\'s date or `Math.random()`. They are not repeatable. Fix: pass the value in, or use a fake.',
        'Chasing 100 % coverage with tests that assert nothing. Fix: every test checks a result.'
      ],
      related: ['parameterized-tests', 'tdd', 'Control Flow']
    }
  ]);
})();
