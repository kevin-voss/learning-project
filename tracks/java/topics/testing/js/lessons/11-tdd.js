// Testing lesson 11: test-driven development (red → green → refactor).
(function () {
  Java.addCoreLessons('testing', [
    {
      id: 'tdd',
      title: 'Test First: Red, Green, Refactor',
      category: 'habits',
      icon: '↺',
      tagline: 'Write the test before the code',
      realWorld: 'Before you build a birdhouse, you hold up the bird and say: "the hole must be this big". You check the hole against the bird after every cut. The bird came first; the hole follows.',
      kid: [
        'You want to teach your dog a trick. First you decide what "done" looks like: the dog sits when you say "sit". That is your test.',
        'You say "sit". The dog does not sit yet. Red! Now you teach a tiny bit, and try again. The dog sits. Green! Then you make the trick nicer, for example quicker, and check the dog still sits.',
        'Test-driven development is that game: decide what "done" means, see it fail, make it work in the smallest way, then tidy up. Over and over, in tiny steps.'
      ],
      definition: '**Test-driven development** (TDD) is a way of working in short cycles: write one small failing test (**red**), write the least code that makes it pass (**green**), then clean up the code while all tests stay green (**refactor**). Then repeat with the next test.',
      explain: [
        'Normally you write code first and tests later, if there is time. TDD turns this around. Before you write a line of the method, you write a test that says what the method should do in one small situation. You run it and **see it fail**. Seeing red proves the test can catch a missing feature.',
        'Then you write the **simplest** code that turns the test green. Simplest really means simplest, even if it looks silly at first. The next test will force the code to become more general. This keeps every step small and safe.',
        '**Refactoring** means changing the shape of code without changing what it does: better names, less repetition, a clearer `if`. The tests are your safety net. If they stay green, the behavior is the same.',
        'A cycle takes a few minutes. Each cycle adds one test and a bit of behavior. After a few cycles you have working code **and** a full set of tests, and you never had a long stretch where nothing worked.',
        'In this lesson you follow four real cycles for a game called FizzBuzz: for multiples of 3 say "Fizz", for multiples of 5 say "Buzz", for multiples of both say "FizzBuzz", otherwise say the number. Every red and green output below is real.'
      ],
      why: 'You only write code that a test asked for, every line is tested from the start, and the tests describe exactly what you meant.',
      whenUse: 'Whenever the rule is clear before you start: calculations, validations, text formats, fixing a bug (first write a test that shows the bug).',
      syntax: '1 write one failing test → 2 run: red → 3 simplest code → 4 run: green → 5 refactor → 6 run: still green → back to 1',
      fileName: 'FizzBuzzDemo.java',
      code: `public class FizzBuzzDemo {
    // The final version, after three red-green-refactor cycles.
    static String say(int n) {
        String word = "";
        if (n % 3 == 0) {
            word += "Fizz";
        }
        if (n % 5 == 0) {
            word += "Buzz";
        }
        return word.isEmpty() ? String.valueOf(n) : word;
    }

    public static void main(String[] args) {
        for (int n = 1; n <= 15; n++) {
            System.out.print(say(n) + " ");
        }
        System.out.println();
    }
}`,
      output: '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz',
      codeSummary: 'Where the TDD cycles below end up: the final `say` method, plus a `main` that prints 1 to 15 so you can run it with `java`. In the Maven project, `say` lives in `src/main/java/FizzBuzz.java`.',
      codeExplanation: [
        { label: 'Line 3', code: 'static String say(int n) {', text: 'The method the tests drove into existence, one behavior at a time.' },
        { label: 'Line 4', code: 'String word = "";', text: 'The refactored idea: build the word piece by piece.' },
        { label: 'Line 5', code: 'if (n % 3 == 0) {', text: '`%` gives the remainder. Remainder 0 means "multiple of 3". This came from the second test.' },
        { label: 'Line 6', code: 'word += "Fizz";', text: 'Add "Fizz" to the word.' },
        { label: 'Line 8', code: 'if (n % 5 == 0) {', text: 'From the third test. Not `else if`: 15 must get both parts.' },
        { label: 'Line 11', code: 'return word.isEmpty() ? String.valueOf(n) : word;', text: 'No word means an ordinary number: say the number itself. This came from the first test.' },
        { label: 'Line 15', code: 'for (int n = 1; n <= 15; n++) {', text: 'Only for this demo. The tests do not need a `main`.' }
      ],
      sections: [
        {
          title: 'The cycle',
          mermaid: `stateDiagram-v2
  [*] --> Red: write one small test
  Red --> Green: write the simplest code
  Green --> Refactor: clean up
  Refactor --> Green: run tests again
  Refactor --> Red: next test
  Green --> Red: next test`,
          diagramNote: 'Red: the new test fails. Green: all tests pass. Refactor: better code, still green. You may skip Refactor when there is nothing to clean up.'
        },
        {
          title: 'Cycle 1: an ordinary number',
          text: [
            'Write the test first. `FizzBuzz` does not exist yet, so the first "red" is a compile error. That is fine: it is the test telling you what to create. This is the real message (the long folder path is shortened).',
            'Then create the class with a method that returns `""`. Now the test compiles and fails for the right reason. Then the simplest real code: `return String.valueOf(n);`. Green.'
          ],
          codeLanguage: 'plaintext',
          fileName: 'cycle 1: red, red, green (real output)',
          code: `test only, no class yet:
[ERROR] …/src/test/java/FizzBuzzTest.java:[9,27] cannot find symbol
  symbol:   variable FizzBuzz
  location: class FizzBuzzTest

with  return "";
[ERROR]   FizzBuzzTest.ordinaryNumberIsSaidAsItIs:9 expected: <1> but was: <>

with  return String.valueOf(n);
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS`,
          tip: '`expected: <1> but was: <>` shows an empty string between the brackets. Seeing the test fail first proves it really checks something.'
        },
        {
          title: 'Cycles 2 and 3: Fizz and Buzz',
          text: [
            'Add the test `multipleOfThreeIsFizz` and run: red. The simplest fix is `if (n % 3 == 0) return "Fizz";`. Green.',
            'Add two more tests, for 5 and 15. Run: two reds. Fix the 5 with `if (n % 5 == 0) return "Buzz";`. One red is left: 15 gives "Fizz", because the `% 3` check returns first.'
          ],
          codeLanguage: 'plaintext',
          fileName: 'cycles 2 and 3 (real output)',
          code: `after adding the Fizz test:
[ERROR]   FizzBuzzTest.multipleOfThreeIsFizz:14 expected: <Fizz> but was: <3>

after adding the Buzz and FizzBuzz tests:
[ERROR]   FizzBuzzTest.multipleOfFiveIsBuzz:19 expected: <Buzz> but was: <5>
[ERROR]   FizzBuzzTest.multipleOfThreeAndFiveIsFizzBuzz:24 expected: <FizzBuzz> but was: <Fizz>

after the Buzz fix:
[ERROR]   FizzBuzzTest.multipleOfThreeAndFiveIsFizzBuzz:24 expected: <FizzBuzz> but was: <Fizz>
[ERROR] Tests run: 4, Failures: 1, Errors: 0, Skipped: 0`
        },
        {
          title: 'Cycle 4: green, then refactor',
          text: [
            'The simplest green: put `if (n % 15 == 0) return "FizzBuzz";` at the top. All four tests pass. Now look at the code: four `if`s and the special 15 that only repeats "3 and 5". That is the moment to **refactor** into the version at the top of this lesson, which builds the word from its parts.',
            'Run the tests after the refactoring. Still green, so the behavior did not change. Here is the final test class and its real result.'
          ],
          fileName: 'src/test/java/FizzBuzzTest.java',
          code: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FizzBuzzTest {

    @Test
    void ordinaryNumberIsSaidAsItIs() {
        assertEquals("1", FizzBuzz.say(1));
    }

    @Test
    void multipleOfThreeIsFizz() {
        assertEquals("Fizz", FizzBuzz.say(3));
    }

    @Test
    void multipleOfFiveIsBuzz() {
        assertEquals("Buzz", FizzBuzz.say(5));
    }

    @Test
    void multipleOfThreeAndFiveIsFizzBuzz() {
        assertEquals("FizzBuzz", FizzBuzz.say(15));
    }
}`,
          output: `[INFO] Running FizzBuzzTest
[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.021 s -- in FizzBuzzTest
[INFO] BUILD SUCCESS`,
          warn: 'Refactor only while everything is green. If you refactor and add behavior at the same time, a red test no longer tells you which of the two broke it.'
        },
        {
          title: 'When TDD fits',
          table: {
            head: ['Fits well', 'Harder'],
            rows: [
              ['Rules and calculations (prices, dates, scores)', 'Code whose goal you do not know yet: try it out first, then write tests'],
              ['Fixing a bug: first a test that shows it', 'Layouts and screens that you judge with your eyes'],
              ['Parsing and formatting text', 'Code that is mostly calls to other systems (use fakes, next lesson)']
            ],
            note: 'Even when you do not work test-first, keep the habit "see it fail once": break the code on purpose and check the test turns red.'
          }
        }
      ],
      technical: [
        'Nothing in the JVM or JUnit knows about TDD; it is a working habit. What makes it practical is speed: the Maven run above takes well under a second for the tests, and editors can rerun tests on every save.',
        'A compile error counts as red because Java is statically typed: the compiler checks that `FizzBuzz.say(int)` exists and returns something `assertEquals` can compare before any test runs. The test is the first user of your method, so it decides the method\'s name, parameters and return type.',
        'Refactoring tools in editors (rename, extract method) change code in ways that are designed to keep behavior the same. Tests are how you **check** that promise for your own hand-made changes.'
      ],
      tryIt: {
        steps: [
          'In a Maven project, write only `FizzBuzzTest` with the first test. Run `mvn test` and read the compile error.',
          'Create `FizzBuzz` with `return "";`. Run: red. Then `return String.valueOf(n);`. Run: green.',
          'Add one test at a time and follow the cycles above.',
          'At the end, refactor to the word-building version and run again.'
        ],
        see: 'The same reds and greens as in the steps above, ending in `Tests run: 4, Failures: 0` after the refactoring.'
      },
      check: [
        { q: 'What are the three steps of the TDD cycle?', a: 'Red (write a failing test), green (simplest code that passes), refactor (clean up while staying green).' },
        { q: 'Why do you run the new test before writing the code?', a: 'To see it fail. A test that has never been red might not check anything.' },
        { q: 'What does refactoring mean?', a: 'Changing the structure of code without changing its behavior. The tests stay green the whole time.' }
      ],
      keyPoints: [
        'Red: one small failing test.',
        'Green: the simplest code that passes.',
        'Refactor: improve the code, tests stay green.',
        'Small cycles of a few minutes each.',
        'For a bug: first a test that shows it, then the fix.'
      ],
      commonMistakes: [
        'Writing five tests at once and then all the code. Fix: one test per cycle.',
        'Skipping the red step. Fix: always see the new test fail first.',
        'Writing clever, general code before a test asks for it. Fix: the simplest thing; let the next test force more.',
        'Never refactoring, so the code stays a pile of special `if`s. Fix: tidy up whenever you are green.'
      ],
      related: ['what-to-test', 'test-doubles', 'first-junit-test']
    }
  ]);
})();
