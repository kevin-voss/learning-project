(function () {
  Java.addCoreLessons('exceptions', [
    {
      id: 'good-habits',
      title: 'Good Habits with Exceptions',
      category: 'habits',
      icon: 'ok',
      tagline: 'Loud, narrow, early and clear',
      realWorld: 'A good lifeguard at the pool. They do not look away when someone struggles (do not swallow). They help the swimmer who needs it, not everybody at once (catch narrow). And they put up a "no diving" sign at the shallow end before anyone gets hurt (validate early).',
      kid: [
        'When you break a cup, hiding the pieces under the sofa is the worst idea. Someone steps on them later and nobody knows why.',
        'Tell a grown-up right away, say exactly what broke, and only clean up what you know how to clean up.',
        'And do not break cups on purpose to find out whether the cupboard is empty. Look inside first!'
      ],
      definition: 'Good exception code follows a few habits: never swallow an exception silently, catch only the exact types you can handle, check inputs early and throw with clear messages, and use plain `if` checks instead of exceptions for things that happen in normal use.',
      explain: [
        '**Do not swallow.** An empty catch block, or one that only says "error", hides the problem. The program goes on with wrong data and fails later in a place that has nothing to do with the cause. At the very least, print the message; better, handle the problem or let it travel up.',
        '**Catch narrow.** `catch (Exception e)` catches everything, including bugs like a `NullPointerException` that you should fix instead. Catch the exact type the code can throw, for example `NumberFormatException`. A single wide catch belongs only at the very top, as a last safety net.',
        '**Validate early.** Check arguments at the start of a method and throw at once (lesson 7). The trace then points at the real cause, not at a crash ten methods later.',
        '**Write messages for humans.** Name the rule and the value: `"age must be 0 or more, but was -2"`. Include which item, line or id was involved. Keep secrets out of messages.',
        '**Do not use exceptions for normal flow.** If you can find out with a cheap `if` whether something works, do that. An index check, `isEmpty()`, `containsKey()` or `Scanner.hasNextInt()` is clearer and much faster than waiting for an exception. Exceptions are for the unexpected.'
      ],
      why: 'Bad exception habits create the worst bugs: ones that hide. A swallowed exception or a wide catch turns a clear crash with a trace into wrong numbers that nobody can explain. Good habits keep every failure visible and every message useful.',
      whenUse: 'Every time you write `try`, `catch` or `throw`. Ask: can I handle this here? Is my catch as narrow as possible? Would an `if` be clearer? Does my message name the value?',
      syntax: 'Narrow: `catch (NumberFormatException e)`. Visible: `System.out.println("skipped line " + n + ": " + e.getMessage())`. Early: `if (x < 0) throw new IllegalArgumentException("x must be ... but was " + x);`',
      fileName: 'ScoreBoard.java',
      code: `public class ScoreBoard {
    static int parseScore(String text) {
        int score = Integer.parseInt(text.trim()); // may throw NumberFormatException
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("score must be 0 to 100, but was " + score);
        }
        return score;
    }

    public static void main(String[] args) {
        String[] lines = {"80", "95", "abc", "120", " 70 "};
        int total = 0;
        int counted = 0;

        for (int i = 0; i < lines.length; i++) {
            try {
                total += parseScore(lines[i]);
                counted++;
            } catch (NumberFormatException e) {
                System.out.println("line " + (i + 1) + " skipped, not a number: " + e.getMessage());
            } catch (IllegalArgumentException e) {
                System.out.println("line " + (i + 1) + " skipped: " + e.getMessage());
            }
        }

        System.out.println(counted + " scores, average " + (total / counted));
    }
}`,
      output: `line 3 skipped, not a number: For input string: "abc"
line 4 skipped: score must be 0 to 100, but was 120
3 scores, average 81`,
      codeSummary: 'Every habit in one program. `parseScore` validates early and throws with a message that names the value. `main` catches only the two types it expects, child type first, says which line was skipped and why, and goes on. Nothing is swallowed.',
      codeExplanation: [
        { label: 'Line 3', code: 'int score = Integer.parseInt(text.trim());', text: '`trim()` first, so `" 70 "` is accepted. Accepting harmless differences avoids exceptions you do not need.' },
        { label: 'Line 4', code: 'if (score < 0 || score > 100) {', text: 'Validate early: the rule is checked in the method that owns it.' },
        { label: 'Line 5', code: 'throw new IllegalArgumentException("score must be 0 to 100, but was " + score);', text: 'A message with the rule and the real value. Anyone reading it knows what to fix.' },
        { label: 'Line 16', code: 'try {', text: 'A small try block around one line of input, so one bad line does not stop the rest.' },
        { label: 'Line 19', code: '} catch (NumberFormatException e) {', text: 'Narrow catch, and the child type comes before its parent `IllegalArgumentException`.' },
        { label: 'Line 20', code: 'System.out.println("line " + (i + 1) + " skipped, not a number: " + e.getMessage());', text: 'Not swallowed: the message says which line, what happened and what the input was.' },
        { label: 'Line 21', code: '} catch (IllegalArgumentException e) {', text: 'The second expected problem: a number outside the rule. Any other exception (a real bug) is not caught here and stays visible.' },
        { label: 'Line 26', code: 'System.out.println(counted + " scores, average " + (total / counted));', text: 'Only the three valid scores count: (80 + 95 + 70) / 3 = 81 in whole numbers.' }
      ],
      sections: [
        {
          title: 'Do not swallow: the silent bug',
          text: [
            'The program below has an empty catch. The text `"1O"` (with the letter O instead of zero) fails to parse, nobody is told, and the total is wrong. There is no trace and no message, only a wrong number.',
            'The fix: say what happened. Change the catch to `System.out.println("ignored bad price: " + price);`, or better, let the exception travel up so the bad data gets fixed.'
          ],
          fileName: 'SilentBug.java',
          code: `public class SilentBug {
    public static void main(String[] args) {
        String[] prices = {"5", "1O", "20"};
        int total = 0;

        for (String price : prices) {
            try {
                total += Integer.parseInt(price);
            } catch (NumberFormatException e) {
                // empty: the problem disappears here
            }
        }
        System.out.println("total: " + total); // should be 35, prints 25
    }
}`,
          output: 'total: 25',
          warn: 'An empty catch is almost always a bug. If you really mean to ignore something, write a comment that says why, and name the variable `ignored`.'
        },
        {
          title: 'Catch narrow: a wide catch hides a real bug',
          text: ['Here the method has a bug: it reads `names[3]` from an array of length 3. The wide `catch (Exception e)` meant for "bad input" also catches the bug and reports it as bad input. With a narrow `catch (NumberFormatException e)`, the bug would crash with a trace that points straight at line 4.'],
          fileName: 'WideCatch.java',
          code: `public class WideCatch {
    static int ageOfLast(String[] names, String[] ages) {
        int last = names.length; // bug: should be names.length - 1
        return Integer.parseInt(ages[last]);
    }

    public static void main(String[] args) {
        String[] names = {"Ann", "Ben", "Cleo"};
        String[] ages = {"31", "25", "40"};
        try {
            System.out.println("age: " + ageOfLast(names, ages));
        } catch (Exception e) {
            System.out.println("please check your input");
        }
    }
}`,
          output: 'please check your input',
          tip: 'The input was fine. The wide catch sends you looking in the wrong place.'
        },
        {
          title: 'Exceptions are not for normal flow',
          text: ['Some things happen all the time in normal use: the end of an array, an empty text, a word that is not in a map. Check them with `if`. Both programs below find the number of words that are numbers; the second one does not need any exception.'],
          table: {
            head: ['Situation', 'Do not', 'Do'],
            rows: [
              ['End of an array', 'Loop forever and catch `ArrayIndexOutOfBoundsException`', '`for (int i = 0; i < arr.length; i++)`'],
              ['Empty text', 'Call `text.charAt(0)` and catch', '`if (!text.isEmpty())`'],
              ['Key missing in a map', 'Use the `null` result and catch `NullPointerException`', '`map.containsKey(key)` or `map.getOrDefault(key, 0)`'],
              ['User types letters instead of a number', 'Call `nextInt()` and catch', '`if (scanner.hasNextInt())` first'],
              ['A file that may not exist', 'Read it and catch', '`Files.exists(path)` first, and still catch `IOException`, because it can vanish in between']
            ],
            note: 'Files are the exception to the rule: something outside your program can change between the check and the use, so you check and catch.'
          },
          fileName: 'CountNumbers.java',
          code: `public class CountNumbers {
    static boolean isWholeNumber(String text) {
        if (text.isEmpty()) {
            return false;
        }
        for (int i = 0; i < text.length(); i++) {
            if (!Character.isDigit(text.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        String[] words = {"12", "apple", "7", "", "3b", "450"};
        int count = 0;
        for (String word : words) {
            if (isWholeNumber(word)) {
                count++;
            }
        }
        System.out.println(count + " of " + words.length + " words are whole numbers");
    }
}`,
          output: '3 of 6 words are whole numbers'
        },
        {
          title: 'A safety net at the top',
          text: [
            'The one good place for a wide catch is the top of the program: `main`, or the loop that handles one request. There it catches whatever nobody else handled, prints a clear message and stops in a controlled way, instead of showing a user a wall of red text.',
            'It still reports the problem. Here it prints the type and message to standard error with `System.err`, and in a real program it would also log the full trace.'
          ],
          fileName: 'SafeMain.java',
          code: `public class SafeMain {
    public static void main(String[] args) {
        try {
            run();
        } catch (RuntimeException e) {
            System.err.println("Sorry, the program stopped: " + e);
        }
    }

    static void run() {
        System.out.println("loading settings ...");
        int volume = Integer.parseInt("loud");
        System.out.println("volume " + volume);
    }
}`,
          output: `loading settings ...
Sorry, the program stopped: java.lang.NumberFormatException: For input string: "loud"`
        },
        {
          title: 'The habits as a checklist',
          text: ['Before you write a catch, walk through this picture. Most of the time it leads you to a narrow catch near the top, or to no catch at all.'],
          mermaid: `flowchart TD
  A["this code can throw"] --> B{"can an if check avoid it?"}
  B -- "yes" --> C["use the if, no exception"]
  B -- "no" --> D{"can this method really handle it?"}
  D -- "no" --> E["let it travel up, or declare it with throws"]
  D -- "yes" --> F["catch the exact type"]
  F --> G["print or log what happened, then handle it"]`,
          diagramNote: 'There is no box "catch and do nothing". Every path ends with an if, a visible handler, or the exception going up.',
          bullets: [
            '**Visible:** no empty catch; every catch prints, handles or re-throws.',
            '**Narrow:** catch the exact type; child types before parents; a wide catch only at the top.',
            '**Early:** guard clauses at the start of methods and constructors.',
            '**Clear:** messages with the rule, the value and the item (line, id, name).',
            '**Normal flow with if:** check bounds, emptiness and keys before you act.',
            '**Clean:** try-with-resources for everything that has `close()`.',
            '**Cause kept:** when you wrap, pass the original exception as the cause.'
          ]
        }
      ],
      technical: [
        'Throwing is expensive compared with an `if`. Creating an exception fills in the stack trace, which walks every frame of the call stack and builds an array of `StackTraceElement` objects. A loop that throws a million exceptions is many times slower than the same loop with an `if`.',
        'The JVM\'s runtime compiler, the **JIT** (the part that turns often-used bytecode into fast machine code while the program runs), optimises the normal path of a try block. It does not optimise the throwing path much, because it expects exceptions to be rare. Using them for normal flow works against it.',
        'A swallowed exception is gone for good: once the catch block ends, nothing points to the object any more and the garbage collector removes it, trace and all. Only what you printed or logged survives.',
        'In bigger programs you write messages to a **logger** (a library that writes to files with time stamps) instead of `System.out`. The habit stays the same: log the message and the exception, so the trace is kept.'
      ],
      tryIt: {
        steps: [
          'Copy `SilentBug.java` and run it.',
          'Put `System.out.println("ignored bad price: " + price);` into the empty catch block and run it again.',
          'In `WideCatch.java`, change `catch (Exception e)` to `catch (NumberFormatException e)` and run it.'
        ],
        see: '`ignored bad price: 1O` and `total: 25`, so now you know why the total is wrong. In `WideCatch` the real bug appears: `ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3` at line 4.'
      },
      check: [
        { q: 'Why is `catch (Exception e) { }` doubly bad?', a: 'It is wide, so it also catches real bugs, and it is empty, so nobody ever hears about them.' },
        { q: 'Should you catch `ArrayIndexOutOfBoundsException` to find the end of an array?', a: 'No. The end of an array is normal. Use `i < arr.length` in the loop condition.' },
        { q: 'Where is a wide catch acceptable?', a: 'At the very top of the program, as a last safety net that reports the problem clearly and ends in a controlled way.' }
      ],
      keyPoints: [
        'Never swallow: every catch prints, handles or re-throws.',
        'Catch the narrowest type you can handle.',
        'Validate early and throw with a clear message.',
        'Use `if` for normal situations, exceptions for unexpected ones.',
        'A wide catch only at the top, and it still reports.'
      ],
      commonMistakes: [
        'An empty catch: `catch (NumberFormatException e) { }`. Print the message or let it travel up.',
        '`catch (Exception e)` deep inside the code. Catch the exact type, like `NumberFormatException`.',
        'Using exceptions as a loop end: `while (true) { arr[i++] ... }` with a catch for the index. Write `for (int i = 0; i < arr.length; i++)`.',
        'Only printing `"error"`. Print `e.getMessage()` and which item failed.',
        'Catching, printing, and then going on as if the value was fine. After a catch, make sure the program does not use the broken value.'
      ],
      related: ['try and catch', 'throw: Raise Your Own Exception', 'Many catch Blocks and Multi-catch', 'Debugging', 'Testing']
    }
  ]);
})();
