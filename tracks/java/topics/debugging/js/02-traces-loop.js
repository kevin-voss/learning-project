// Debugging, part 2: stack traces as a map, and the debugging loop.
(function () {
  Java.addCoreLessons('debugging', [
    {
      id: 'stack-traces',
      title: 'Stack Traces as a Map',
      category: 'concept',
      icon: 'at',
      tagline: 'Find the first line that is yours',
      realWorld: 'A stack of plates in the kitchen. Each new plate goes on top. When one breaks, you look at the top plate first, then go down the stack until you find the plate you put there yourself.',
      kid: [
        'When your program crashes, Java writes a little note. The first line says what broke, like "I could not read the number x".',
        'Below it is a list of places: "I was here, and before that I was there". The newest place is at the top, the oldest at the bottom.',
        'Some places are inside Java itself. You skip those and look for the first place with a name you wrote. That is where you start looking.'
      ],
      definition: 'A **stack trace** is the report the JVM prints when an exception is not caught. Line 1 is the exception type and its message. Each `at` line below is one method call that was running, newest first. Your job: find the **first `at` line in a file you wrote**.',
      explain: [
        'You learned the shape of a stack trace in [Exceptions](../exceptions/index.html). Here you use it as a debugging map, also for long traces that run through Java\'s own code.',
        'The **call stack** is the list of methods that are running right now. `main` calls `sumScores`, which calls `parseScore`, which calls `Integer.parseInt`. Each call puts a new **frame** (a box with that method\'s local variables and its current line) on top of the stack. When a method returns, its frame is removed.',
        'When an exception is thrown, the JVM writes down the whole stack at that moment. Every `at` line is one frame: `at ClassName.methodName(FileName.java:LINE)`. The top line is where the exception was **thrown**. The bottom line is where the program **started**, usually `main`.',
        'Lines that start with `java.base/` belong to the JDK (the Java Development Kit, the code that comes with Java). They are almost never wrong. Skip them. The first line below them that names your class is where your code handed Java something it could not use. Open that file at that line.',
        'Some traces have a second part that starts with `Caused by:`. That happens when code catches one exception and throws a new one that carries the old one inside. The `Caused by:` part is the original problem and is often the most useful one.'
      ],
      why: 'A crash tells you more than any wrong answer: the kind of problem and the exact line. Reading the trace well turns a scary wall of red text into a two-second jump to the right line.',
      whenUse: 'Every time the program ends with `Exception in thread "main"`, or a test or a server log shows a trace.',
      syntax: '`Exception in thread "main" TYPE: MESSAGE` then `at Class.method(File.java:LINE)` lines, newest first. Read line 1, skip `java.base/...` lines, open the first line with your file name.',
      fileName: 'ScoreReport.java',
      code: `public class ScoreReport {
    public static void main(String[] args) {
        String[] lines = {"Ava,12", "Ben,9", "Cara,x"};
        int total = sumScores(lines);
        System.out.println("Total: " + total);
    }

    static int sumScores(String[] lines) {
        int total = 0;
        for (String line : lines) {
            total += parseScore(line);
        }
        return total;
    }

    static int parseScore(String line) {
        String[] parts = line.split(",");
        return Integer.parseInt(parts[1]);
    }
}`,
      output: `Exception in thread "main" java.lang.NumberFormatException: For input string: "x"
	at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)
	at java.base/java.lang.Integer.parseInt(Integer.java:565)
	at java.base/java.lang.Integer.parseInt(Integer.java:662)
	at ScoreReport.parseScore(ScoreReport.java:18)
	at ScoreReport.sumScores(ScoreReport.java:11)
	at ScoreReport.main(ScoreReport.java:4)`,
      codeSummary: 'The third line of data has `x` instead of a number. `Integer.parseInt` cannot turn `"x"` into an `int` and throws. The trace below is real output from JDK 25. The JDK line numbers (67, 565, 662) can differ in your Java version; your own line numbers do not.',
      codeExplanation: [
        { label: 'Trace line 1', code: 'java.lang.NumberFormatException: For input string: "x"', text: 'What went wrong: a text could not be read as a number, and the text was `"x"`. Often this line alone tells you the bug.' },
        { label: 'Trace lines 2-4', code: 'at java.base/java.lang.Integer.parseInt(Integer.java:565)', text: 'Frames inside the JDK. `java.base/` tells you this is Java\'s own code. Skip them.' },
        { label: 'Trace line 5', code: 'at ScoreReport.parseScore(ScoreReport.java:18)', text: 'The first frame in your file. Line 18 is where your code called `parseInt` with the bad text. Start here.' },
        { label: 'Trace line 6', code: 'at ScoreReport.sumScores(ScoreReport.java:11)', text: 'Who called `parseScore`: the loop in `sumScores`, line 11.' },
        { label: 'Trace line 7', code: 'at ScoreReport.main(ScoreReport.java:4)', text: 'The bottom of the stack: `main`, line 4, where everything started.' },
        { label: 'Line 3', code: 'String[] lines = {"Ava,12", "Ben,9", "Cara,x"};', text: 'The real cause: bad data. The trace leads you to line 18, and from there you ask "where did this text come from?" and walk back to line 3.' },
        { label: 'Line 5', code: 'System.out.println("Total: " + total);', text: 'Never runs. The exception ended `main` before this line.' }
      ],
      sections: [
        {
          title: 'The stack at the moment of the crash',
          text: ['Each method call puts a frame on top. The trace prints the stack from top (newest) to bottom (oldest).'],
          mermaid: `flowchart TD
  A["NumberFormatException.forInputString (JDK)"] --> B["Integer.parseInt (JDK)"]
  B --> C["ScoreReport.parseScore line 18 (yours: start here)"]
  C --> D["ScoreReport.sumScores line 11 (yours)"]
  D --> E["ScoreReport.main line 4 (yours: the start)"]`,
          diagramNote: 'Top box = top of the trace = where the exception was created. Read downwards until you reach your first own frame.'
        },
        {
          title: 'Three questions for every trace',
          bullets: [
            '**What?** Read line 1: the type (`NumberFormatException`) and the message (`For input string: "x"`).',
            '**Where in my code?** Find the first `at` line with your class name: `ScoreReport.java:18`.',
            '**Why there?** Look at the values on that line. Where did they come from? Walk down the trace (to the callers) if the bad value was passed in.'
          ],
          table: {
            head: ['Exception type', 'Usual meaning', 'First thing to check'],
            rows: [
              ['`NullPointerException`', 'a method or field was used on `null`', 'which variable on that line is `null`; the message names it'],
              ['`ArrayIndexOutOfBoundsException`', 'index outside `0 .. length - 1`', 'the loop condition (`<` or `<=`) and the array length'],
              ['`StringIndexOutOfBoundsException`', 'same for `charAt` or `substring`', 'the index and `text.length()`'],
              ['`NumberFormatException`', 'text is not a number', 'the text in the message; spaces, letters, empty `""`'],
              ['`ArithmeticException: / by zero`', 'integer division by 0', 'the divisor; can it be 0 (an empty list)?'],
              ['`InputMismatchException`', '`Scanner.nextInt()` read a word', 'what the user typed']
            ]
          }
        },
        {
          title: 'Helpful NullPointerException messages',
          text: [
            'Since Java 14 the message of a `NullPointerException` says exactly what was `null`. Here a field never got a value, so it holds `null`, and calling `.length()` on it fails.',
            'For a local variable the message may say `"<local1>"` instead of the name. That happens when the class was compiled without debug information. VS Code and `javac -g` keep the real names.'
          ],
          fileName: 'NullName.java',
          code: `public class NullName {
    static String nickname;   // never set, so it is null

    public static void main(String[] args) {
        System.out.println("Start");
        System.out.println(nickname.length());
    }
}`,
          output: `Start
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "NullName.nickname" is null
	at NullName.main(NullName.java:6)`,
          tip: 'The message reads like a sentence: "Cannot invoke `String.length()` because `NullName.nickname` is null". Fix: give the field a value, or check `nickname != null` first.'
        },
        {
          title: 'A trace with "Caused by"',
          text: [
            'Here `parseAge` catches the `NumberFormatException` and throws a clearer `IllegalArgumentException` with the old one as its **cause** (the second argument of the constructor).',
            'The trace prints the new exception first, then `Caused by:` and the original. `... 1 more` means "one more frame, the same as in the part above" (here `main`), so Java does not print it twice.'
          ],
          fileName: 'WrapDemo.java',
          code: `public class WrapDemo {
    public static void main(String[] args) {
        System.out.println(parseAge("nine"));
    }

    static int parseAge(String text) {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Age must be a number, got: " + text, e);
        }
    }
}`,
          output: `Exception in thread "main" java.lang.IllegalArgumentException: Age must be a number, got: nine
	at WrapDemo.parseAge(WrapDemo.java:10)
	at WrapDemo.main(WrapDemo.java:3)
Caused by: java.lang.NumberFormatException: For input string: "nine"
	at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)
	at java.base/java.lang.Integer.parseInt(Integer.java:565)
	at java.base/java.lang.Integer.parseInt(Integer.java:662)
	at WrapDemo.parseAge(WrapDemo.java:8)
	... 1 more`,
          warn: 'In long traces (later, with frameworks) the most useful part is often the **last** `Caused by:`. Scroll down to it, then find your first own frame inside it.'
        }
      ],
      technical: [
        'Each thread in the JVM has its own **stack** of frames. A frame holds the method\'s parameters, local variables and the position of the instruction it is running. When you call a method, the JVM pushes a frame; when the method returns, it pops it.',
        'When `new SomeException(...)` runs, the constructor calls `fillInStackTrace()`, which copies the current frames into an array of `StackTraceElement` objects (class, method, file, line). If no `catch` handles the exception, the thread ends and the JVM\'s default handler prints that array with `printStackTrace()`: first `Exception in thread "main"`, then one `at` line per element.',
        'Line numbers come from the **LineNumberTable** that `javac` stores in every `.class` file by default. It maps bytecode positions back to source lines. That is how a crash in bytecode can name `ScoreReport.java:18`.'
      ],
      tryIt: {
        steps: [
          'Copy `ScoreReport.java`, compile and run it. Read line 1 of the trace out loud.',
          'Find the first `at` line with `ScoreReport`. Open that line in your editor.',
          'Change `"Cara,x"` to `"Cara,7"`. Run again.',
          'Now change it to `"Cara"` (no comma, no score). Run and read the new trace.'
        ],
        see: 'first a `NumberFormatException` pointing to line 18, then `Total: 28`, then an `ArrayIndexOutOfBoundsException: Index 1 out of bounds for length 1`, again at line 18.'
      },
      check: [
        { q: 'Which `at` line is the top of the stack, and what does it mean?', a: 'The first `at` line. It is the method that was running when the exception was thrown.' },
        { q: 'Why do you skip lines that start with `java.base/`?', a: 'They are inside the JDK. That code is tested by millions of users. The problem is almost always the value your code passed in.' },
        { q: 'A trace has `Caused by:`. What does that part show?', a: 'The original exception that was caught and wrapped in a new one. It often holds the real reason.' }
      ],
      keyPoints: [
        'Line 1: exception type and message. Read it first.',
        '`at` lines: newest call on top, `main` at the bottom.',
        'Skip `java.base/` frames; go to the first frame in your file.',
        'The bad value may come from a caller: walk down the trace.',
        '`Caused by:` holds the original exception.'
      ],
      commonMistakes: [
        'Reading only the last line (`at ScoreReport.main(...)`). Fix: start at the top and stop at your first own frame.',
        'Opening `Integer.java` to fix the JDK. Fix: the JDK is fine; check what your line passed to it.',
        'Wrapping exceptions without the cause: `throw new IllegalArgumentException("bad")`. Fix: pass the old one along, `new IllegalArgumentException("bad", e)`, so `Caused by:` appears.'
      ],
      related: ['Exceptions', 'debugging-loop', 'ide-debugger']
    },
    {
      id: 'debugging-loop',
      title: 'The Debugging Loop',
      category: 'habits',
      icon: '↻',
      tagline: 'Reproduce, isolate, guess, test, fix, verify',
      realWorld: 'A lamp does not turn on. You do not buy a new house. You try the switch again (does it really fail?), then try the bulb in another lamp (is it the bulb or the lamp?), guess "the bulb is broken", test with a new bulb, and check that the lamp now works every time.',
      kid: [
        'When something is broken, guessing wildly makes it worse. Detectives follow steps.',
        'First you make the problem happen again on purpose. Then you make the problem as small as you can. Then you make one guess, and you test only that guess.',
        'When you fix it, you check that it really works now, and that nothing else broke.'
      ],
      definition: 'The **debugging loop** is a fixed order of steps: **reproduce** the bug, **isolate** where it happens, form a **hypothesis** (a guess you can test), **test** it, **fix** the code, and **verify** the fix. If a test shows your guess was wrong, you go back and make a new guess.',
      explain: [
        '**Reproduce** means making the bug happen again on purpose, every time. Write down three things: the input, what you expected, and what you got. A bug you cannot reproduce cannot be checked as fixed.',
        '**Isolate** means narrowing down where the bug lives. Which method? Which input? Does `"banana"` work but `"Anna"` fail? What is different? Smaller is better: one method and one short input.',
        'A **hypothesis** is one clear guess that a test can prove wrong, such as "capital letters are not counted". "Something is wrong with the loop" is too vague to test.',
        '**Test** the hypothesis with an experiment: a print, a breakpoint, or a tiny program that calls the method with `"A"` and `"a"`. The result either supports the guess or kills it. If it kills it, that is progress too: go back with a new guess.',
        '**Fix** the cause, not the symptom. Changing the expected value to match the wrong output is not a fix. Then **verify**: run the failing case again, and also all cases that worked before. A fix that breaks an old case is called a **regression**.'
      ],
      why: 'Random changes ("let me try `<=`... no, `- 1`...") can hide a bug instead of fixing it. The loop makes every step a small, checkable experiment, so you always know what you learned.',
      whenUse: 'For every bug that is not fixed within a minute, especially logic errors that print no message.',
      syntax: 'Reproduce → Isolate → Hypothesize → Test → (wrong guess? back to Hypothesize) → Fix → Verify.',
      fileName: 'VowelCheck.java',
      code: `public class VowelCheck {
    static int countVowels(String word) {
        int count = 0;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            if ("aeiou".indexOf(c) >= 0) {
                count++;
            }
        }
        return count;
    }

    // Prints ok or FAIL, the input, the real and the expected value.
    static void check(String word, int expected) {
        int got = countVowels(word);
        String result = got == expected ? "ok  " : "FAIL";
        System.out.println(result + " countVowels(" + word + ") = " + got + ", expected " + expected);
    }

    public static void main(String[] args) {
        check("banana", 3);
        check("sky", 0);
        check("Anna", 2);
        check("OTTO", 2);
    }
}`,
      output: `ok   countVowels(banana) = 3, expected 3
ok   countVowels(sky) = 0, expected 0
FAIL countVowels(Anna) = 1, expected 2
FAIL countVowels(OTTO) = 0, expected 2`,
      codeSummary: 'Step 1, reproduce: this program writes down input, expected and real result for four words. Two cases fail. That is the bug, reproduced on purpose.',
      codeExplanation: [
        { label: 'Line 2', code: 'static int countVowels(String word) {', text: 'The method under suspicion. It should count a, e, i, o and u.' },
        { label: 'Line 5', code: 'char c = word.charAt(i);', text: 'Takes one character at a time.' },
        { label: 'Line 6', code: 'if ("aeiou".indexOf(c) >= 0) {', text: '`indexOf` returns the position of `c` in `"aeiou"`, or -1 if it is not there. So this asks "is `c` one of these five letters?".' },
        { label: 'Line 14', code: 'static void check(String word, int expected) {', text: 'A helper that compares real and expected values. This is the "write down the expected result" habit, as code.' },
        { label: 'Line 16', code: 'String result = got == expected ? "ok  " : "FAIL";', text: 'The `?:` operator picks `"ok  "` if the values match, else `"FAIL"`.' },
        { label: 'Lines 21-22', code: 'check("banana", 3);', text: 'Cases that pass. They tell you the loop itself works.' },
        { label: 'Lines 23-24', code: 'check("Anna", 2);', text: 'Cases that fail. What do they have that `banana` does not? Capital letters. That is the clue for isolating.' }
      ],
      sections: [
        {
          title: 'The loop as a picture',
          mermaid: `flowchart TD
  R["1 Reproduce: input, expected, got"] --> I["2 Isolate: smallest input, one method"]
  I --> H["3 Hypothesize: one testable guess"]
  H --> T["4 Test: print, breakpoint, tiny program"]
  T --> Q{"Guess confirmed?"}
  Q -->|"no"| H
  Q -->|"yes"| F["5 Fix the cause"]
  F --> V["6 Verify: old and new cases"]
  V --> D{"All ok?"}
  D -->|"no"| I
  D -->|"yes"| E["Done: remove debug code"]`,
          diagramNote: 'The arrow back from "Guess confirmed? no" is the most important one. A wrong guess is not failure: it removes one possibility.'
        },
        {
          title: 'The six steps on this bug',
          table: {
            head: ['Step', 'Question you ask', 'In VowelCheck'],
            rows: [
              ['1 Reproduce', 'Can I make it fail every time?', '`check("Anna", 2)` prints FAIL every run'],
              ['2 Isolate', 'What is the smallest failing input?', '`"Anna"` fails, `"banana"` works. Smallest: `"A"`'],
              ['3 Hypothesize', 'What exactly do I think is wrong?', '"Capital vowels are not counted"'],
              ['4 Test', 'What experiment proves it?', 'call `countVowels("a")` and `countVowels("A")`'],
              ['5 Fix', 'What is the cause?', '`"aeiou"` holds only small letters'],
              ['6 Verify', 'Do all old and new cases pass?', 'run all four `check` lines again']
            ]
          }
        },
        {
          title: 'Step 4: a tiny experiment',
          text: ['A test program for one guess. If the guess is right, `"a"` gives 1 and `"A"` gives 0. Three lines of `main` are enough.'],
          fileName: 'VowelExperiment.java',
          code: `public class VowelExperiment {
    static int countVowels(String word) {
        int count = 0;
        for (int i = 0; i < word.length(); i++) {
            if ("aeiou".indexOf(word.charAt(i)) >= 0) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        System.out.println("a -> " + countVowels("a"));
        System.out.println("A -> " + countVowels("A"));
    }
}`,
          output: `a -> 1
A -> 0`,
          tip: 'The guess is confirmed. Before you fix, say the cause in one sentence: "`indexOf` compares exact characters, and `\'A\'` is a different character from `\'a\'`."'
        },
        {
          title: 'Steps 5 and 6: fix the cause, verify everything',
          text: ['The fix turns each character into a small letter before the check. `Character.toLowerCase(c)` returns `\'a\'` for `\'A\'` and leaves other characters as they are. Then all four cases run again, not only the one that failed.'],
          fileName: 'VowelCheckFixed.java',
          code: `public class VowelCheckFixed {
    static int countVowels(String word) {
        int count = 0;
        for (int i = 0; i < word.length(); i++) {
            char c = Character.toLowerCase(word.charAt(i));   // the fix
            if ("aeiou".indexOf(c) >= 0) {
                count++;
            }
        }
        return count;
    }

    static void check(String word, int expected) {
        int got = countVowels(word);
        String result = got == expected ? "ok  " : "FAIL";
        System.out.println(result + " countVowels(" + word + ") = " + got + ", expected " + expected);
    }

    public static void main(String[] args) {
        check("banana", 3);
        check("sky", 0);
        check("Anna", 2);
        check("OTTO", 2);
        check("", 0);   // a new edge case: the empty word
    }
}`,
          output: `ok   countVowels(banana) = 3, expected 3
ok   countVowels(sky) = 0, expected 0
ok   countVowels(Anna) = 2, expected 2
ok   countVowels(OTTO) = 2, expected 2
ok   countVowels() = 0, expected 0`,
          warn: 'A wrong "fix" would be `check("Anna", 1)`: changing the expected value until the output says ok. That hides the bug. Fix the code, never the expectation (unless the expectation itself was wrong).'
        },
        {
          title: 'Habits that keep the loop short',
          bullets: [
            '**One change at a time.** Run after each change so you know which change did what.',
            '**Keep notes.** One line per guess: "guess: capitals; test: A -> 0; result: confirmed". After a break you know where you were.',
            '**Read the error again** before guessing. Many bugs are named in the first line of the message.',
            '**Take a break** after 20 minutes without progress. A fresh look finds what tired eyes skip.',
            '**Keep the failing case.** Leave the `check` line in the program (later: a test) so the bug cannot come back unnoticed.'
          ]
        }
      ],
      technical: [
        'The loop is the scientific method applied to code: observe, form a hypothesis that can be falsified, run an experiment, update. Programs are deterministic (the same input gives the same output) for most beginner code, which is why reproducing is possible at all.',
        'Isolating works because bugs are local: one wrong line, one wrong condition. Each experiment that cuts the search space in half (this method or that one? first half of the input or second?) is a **binary search**. Ten good experiments can narrow 1000 lines down to one.',
        'Some bugs are not deterministic: they depend on time, random numbers, input files or several threads. The first step is then to make them deterministic: fix the random seed, save the input file, or print the time. Only a bug you can reproduce can be verified as fixed.'
      ],
      tryIt: {
        steps: [
          'Copy `VowelCheck.java` and run it. Write the failing input, expected and got on paper.',
          'Write your hypothesis in one sentence. Run `VowelExperiment` to test it.',
          'Apply the fix from `VowelCheckFixed`. Run all cases.',
          'Add a new case: `check("YES", 1)`. Run.'
        ],
        see: 'two FAIL lines first, then `a -> 1` and `A -> 0`, then only ok lines. `YES` gives 1 (`E`); `Y` is not in `"aeiou"`.'
      },
      check: [
        { q: 'Why is "reproduce" the first step?', a: 'Without a case that fails every time, you cannot test a guess and cannot prove the fix works.' },
        { q: 'Which is a testable hypothesis: "the loop is broken" or "the loop skips the last character"?', a: 'The second. You can test it: print each `i`, or try a word whose only vowel is at the end.' },
        { q: 'After a fix you run only the case that failed. What can you miss?', a: 'A regression: the fix may break cases that worked before. Run all old cases too.' }
      ],
      keyPoints: [
        'Reproduce: input, expected, got.',
        'Isolate: smallest input, one method.',
        'One testable guess at a time.',
        'Fix the cause, then run old and new cases.',
        'A wrong guess still teaches you something.'
      ],
      commonMistakes: [
        'Changing random lines until the output looks right. Fix: one guess, one experiment, one change.',
        'Changing the expectation instead of the code: `check("Anna", 1)`. Fix: correct `countVowels`.',
        'Verifying only the case that failed. Fix: rerun every `check`, including edge cases such as `""`.',
        'Forgetting to remove debug code. Fix: the last step of the loop is cleaning up.'
      ],
      related: ['rubber-duck', 'print-debugging', 'bug-three-ways', 'Testing']
    }
  ]);
})();
