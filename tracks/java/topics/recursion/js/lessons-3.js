// Recursion, part 3: StackOverflowError (missing base case) and recursion vs loops.
(function () {
  Java.addCoreLessons('recursion', [
    {
      id: 'stack-overflow',
      title: 'StackOverflowError: No Way to Stop',
      category: 'habits',
      icon: '💥',
      tagline: 'Without a base case the pile of plates falls over',
      realWorld: 'Two mirrors facing each other. You see a mirror in a mirror in a mirror, smaller and smaller, and it never ends. A real pile of plates cannot do that: at some point it hits the ceiling.',
      kid: [
        'Remember the pile of plates? Every call puts one more plate on top.',
        'Now imagine a method that never reaches the smallest doll. It keeps calling itself, and the pile keeps growing.',
        'The room has a ceiling. When the pile touches it, Java shouts "Stop! The stack is full!" That shout is called `StackOverflowError`.',
        'The fix is always the same: make sure there is a smallest doll, and make sure every call gets closer to it.'
      ],
      definition: '`StackOverflowError` is thrown when the call stack is full. With recursion this almost always means the base case is missing, or the calls never reach it.',
      explain: [
        'The call stack has a fixed size. Each call adds a frame. If a recursive method never stops, the frames pile up until there is no room left. Then the JVM throws `StackOverflowError`.',
        'It is an **Error**, not an Exception. You met exceptions and `try`/`catch` in [Exceptions](../exceptions/index.html). An `Error` means something went badly wrong in the JVM itself. You normally do not catch it. You fix the code. In this lesson we catch it only to look at it calmly.',
        'There are three typical causes: there is **no base case**, the call uses the **same input** again, or the input **jumps over** the base case (for example `n - 2` from an odd number never hits `0`).',
        'A fourth cause is not a bug in the logic: the input is so large that even a correct method needs too many frames, for example a recursive sum over a million numbers. Then a loop is the better tool (next lesson).'
      ],
      why: 'Every beginner meets this error. If you know what it means, you find the bug in seconds.',
      whenUse: 'When you see `java.lang.StackOverflowError` and a stack trace with the same line again and again.',
      syntax: 'Guard every recursive method with a base case that **every** input reaches: `if (n <= 0) { return; }` is safer than `if (n == 0) { return; }`.',
      fileName: 'StackOverflowDemo.java',
      code: `public class StackOverflowDemo {
    static int calls = 0;
    static String firstCalls = "";

    static void countdown(int n) {
        calls++;
        if (calls <= 6) {
            firstCalls = firstCalls + n + " ";   // remember the first six values
        }
        countdown(n - 1);                          // no base case!
    }

    public static void main(String[] args) {
        try {
            countdown(3);
        } catch (StackOverflowError e) {
            System.out.println("Caught: " + e.getClass().getName());
            System.out.println("First calls: " + firstCalls);
            System.out.println("More than 1000 calls: " + (calls > 1000));
        }
        System.out.println("The program goes on.");
    }
}`,
      output: `Caught: java.lang.StackOverflowError
First calls: 3 2 1 0 -1 -2
More than 1000 calls: true
The program goes on.`,
      codeSummary: 'A countdown without a base case. It passes 0 and keeps going into negative numbers until the stack is full. We catch the error to print a short report.',
      codeExplanation: [
        { label: 'Line 2', code: 'static int calls = 0;', text: 'A `static` counter shared by all calls. It counts how many calls happened before the crash.' },
        { label: 'Line 6', code: 'calls++;', text: 'Every call adds one. The exact final number depends on your machine, so we only print whether it is above 1000.' },
        { label: 'Line 8', code: 'firstCalls = firstCalls + n + " ";', text: 'Keeps the first six values of `n` so you can see what happened without printing thousands of lines.' },
        { label: 'Line 10', code: 'countdown(n - 1);', text: 'The input gets smaller, but there is nothing that stops at 0. After 0 comes -1, -2 …' },
        { label: 'Line 16', code: '} catch (StackOverflowError e) {', text: 'Catches the error when the stack is full. By now all the frames of `countdown` are gone again.' },
        { label: 'Line 17', code: 'System.out.println("Caught: " + e.getClass().getName());', text: 'Prints the full name of the error class: `java.lang.StackOverflowError`.' },
        { label: 'Line 21', code: 'System.out.println("The program goes on.");', text: 'After the catch, `main` continues. Without the `try`, the program would end with a long stack trace.' }
      ],
      sections: [
        {
          title: 'What you really see without try/catch',
          text: [
            'Here is a countdown with no base case and no `try`. It crashes with a stack trace of about a thousand lines, one line per frame, so this page shows only its first lines in the next step (Java 25 on macOS; the line numbers depend on your file).',
            'Read it from the top: the same line `Forever.java:3` repeats. That repeating line is the recursive call that never stops. Java prints at most 1024 lines of the trace, so you do not even see `main` at the bottom.'
          ],
          code: `public class Forever {
    static int countdown(int n) {
        return countdown(n - 1);   // no base case: never stops
    }

    public static void main(String[] args) {
        countdown(3);
    }
}`,
          fileName: 'Forever.java',
          noRun: true
        },
        {
          title: 'The first lines of the error',
          text: ['Running `java Forever.java` prints this (shortened):'],
          code: `Exception in thread "main" java.lang.StackOverflowError
	at Forever.countdown(Forever.java:3)
	at Forever.countdown(Forever.java:3)
	at Forever.countdown(Forever.java:3)
	at Forever.countdown(Forever.java:3)
	...  (about 1,000 more identical lines)`,
          fileName: 'terminal',
          codeLanguage: 'text',
          tip: 'A stack trace where one line repeats hundreds of times means recursion without a working base case. Go to that line and check the base case.'
        },
        {
          title: 'Three ways to miss the base case',
          text: ['Wrong on the left, right on the right. Each wrong version compiles fine and crashes only when it runs.'],
          table: {
            head: ['Problem', 'Wrong', 'Right'],
            rows: [
              ['No base case', '`void f(int n) { print(n); f(n - 1); }`', '`if (n == 0) { return; }` first'],
              ['Same input again', '`f(n);`', '`f(n - 1);`'],
              ['Post-decrement', '`f(n--);` passes the old `n`', '`f(n - 1);`'],
              ['Jumps over the base case', '`if (n == 0) return;` … `f(n - 2);` with odd `n`', '`if (n <= 0) return;`'],
              ['Negative input', '`countdown(-1)` with `n == 0`', '`n <= 0` stops every input']
            ]
          },
          code: `public class SkipOver {
    static void everyOther(int n) {
        if (n <= 0) {                 // <= catches 0 and every negative number
            System.out.println("done");
            return;
        }
        System.out.print(n + " ");
        everyOther(n - 2);            // jumps by two
    }

    public static void main(String[] args) {
        everyOther(6);   // 6 4 2 0: hits 0
        everyOther(5);   // 5 3 1 -1: jumps over 0, still stops
    }
}`,
          fileName: 'SkipOver.java',
          output: `6 4 2 done
5 3 1 done`,
          warn: 'With `if (n == 0)`, `everyOther(5)` goes 5, 3, 1, -1, -3 … and crashes. Test your method with an odd number, 0 and a negative number.'
        },
        {
          title: 'How deep can you go?',
          text: [
            'The default stack is about 512 KB to 1 MB per thread, depending on the system. A small frame fits many thousands of times. A typical simple recursion can go 10,000 deep without problems, but not millions.',
            'You can give the main thread a bigger stack with `java -Xss8m MyProgram.java` (8 MB). This is a workaround, not a fix. If the input can be very large, write a loop.'
          ],
          mermaid: 'flowchart TD\n  A["countdown(3)"] --> B["countdown(2)"]\n  B --> C["countdown(1)"]\n  C --> D["countdown(0)<br>no base case, goes on"]\n  D --> E["countdown(-1)"]\n  E --> F["… thousands more frames …"]\n  F --> G["stack full:<br>StackOverflowError"]',
          diagramNote: 'Without a base case nothing stops the chain at 0. Every call adds a frame until the stack has no room left.',
          code: `java -Xss8m Forever.java      # bigger stack, still crashes: no base case
java -Xss8m DeepSum.java      # a correct but deep recursion may now fit`,
          fileName: 'terminal',
          codeLanguage: 'bash'
        }
      ],
      technical: [
        '`StackOverflowError` is a subclass of `VirtualMachineError`, which is a subclass of `Error`. `catch (Exception e)` does **not** catch it, because `Error` is not an `Exception`.',
        'The JVM keeps a small reserved area at the end of each thread\'s stack. When a new frame would go past the limit, the JVM uses that area to create and throw the error, so the program does not crash outright.',
        'When the error is thrown, the frames are removed one by one (the stack **unwinds**) until a matching `catch` is found. In the example that is in `main`, so all `countdown` frames are gone when the `catch` block runs.',
        'The stack trace is cut at 1024 frames by default. That is why the `main` line is missing at the bottom.'
      ],
      tryIt: {
        steps: [
          'Run `StackOverflowDemo.java`.',
          'Add a base case `if (n == 0) { return; }` as the first line of `countdown`, after `calls++;`. Run again.',
          'Now call `countdown(-3)` in `main` instead of `countdown(3)`. Run again, then change `==` to `<=`.'
        ],
        see: 'First the "Caught" report. With the base case: only `The program goes on.` With `-3` and `==`: the error is back. With `<=`: it is gone again.'
      },
      check: [
        { q: 'What does `StackOverflowError` mean?', a: 'The call stack is full. Too many calls are open at the same time, usually because a recursive method never reaches its base case.' },
        { q: 'Why is `n <= 0` safer than `n == 0`?', a: 'It also stops negative numbers and inputs that jump over 0, like `n - 2` from an odd number.' },
        { q: 'Does `catch (Exception e)` catch `StackOverflowError`?', a: 'No. It is an `Error`, not an `Exception`. And you should fix the base case instead of catching it.' }
      ],
      keyPoints: [
        'A full call stack throws `StackOverflowError`.',
        'Causes: no base case, same input again, jumping over the base case, or a huge input.',
        'A repeating line in the stack trace points to the recursive call.',
        'Fix the base case. Do not hide the error with `catch`.',
        'Use `<=` or `>=` in base cases so every input stops.'
      ],
      commonMistakes: [
        '`if (n == 0) return;` with `f(n - 2)`: odd numbers never hit 0. Use `if (n <= 0) return;`.',
        'Wrapping the call in `catch (StackOverflowError e) {}` to make the error go away: the bug stays. Fix the base case.',
        'Raising `-Xss` again and again for a method without a base case: no stack is big enough. Add the base case.',
        '`f(n--)` instead of `f(n - 1)`: passes the same value. Write `n - 1`.'
      ],
      related: ['base-case', 'call-stack', 'Exceptions', 'recursion-vs-loops']
    },
    {
      id: 'recursion-vs-loops',
      title: 'Recursion or a Loop?',
      category: 'concept',
      icon: '🔁',
      tagline: 'The same job, written two ways',
      realWorld: 'Climbing stairs. You can count each step as you go up (a loop). Or you can say "to reach step 10, reach step 9 and take one more" (recursion). Both get you to the top.',
      kid: [
        'You want to add up 1 + 2 + 3 + 4 + 5.',
        'The loop way: you hold a bag. You put in 1, then 2, then 3, then 4, then 5. Then you look in the bag: 15.',
        'The recursion way: "1 to 5 is 5 plus 1 to 4. 1 to 4 is 4 plus 1 to 3 …" until "1 to 0 is nothing". Then you add everything back up.',
        'Both give 15. The loop needs one bag. Recursion needs a plate for every number.'
      ],
      definition: 'Every recursive method can also be written with a loop, and the other way round. Recursion is clearer for nested, tree-shaped data. A loop is simpler and safer for counting and for flat lists.',
      explain: [
        'A loop (see [Control Flow](../control-flow/index.html)) repeats code in **one** frame. It changes a variable, like `total`, again and again.',
        'Recursion repeats by making **new** frames. It does not change a shared variable. Each call combines its own piece with the answer from the smaller call.',
        'For a flat job like "add 1 to n", the loop is shorter, faster and cannot overflow the stack. The recursive version is still a good exercise, because the next problems are not flat.',
        'For tree-shaped jobs, like a folder that contains folders that contain folders, a loop needs an extra list to remember where it still has to go. Recursion gets that list for free: it is the call stack. There, recursion is often the clearer choice.',
        'To turn recursion into a loop: the base case becomes the starting value, and the recursive case becomes the loop body.'
      ],
      why: 'You need to choose. Knowing both forms helps you pick the clearer and safer one.',
      whenUse: 'Loop: counting, flat lists, very large inputs. Recursion: trees, nested folders, problems that split into smaller copies (like binary search).',
      syntax: 'Loop: `long total = 0; for (int i = 1; i <= n; i++) { total += i; }` · Recursion: `if (n == 0) { return 0; } return n + sumTo(n - 1);`',
      fileName: 'TwoWays.java',
      code: `public class TwoWays {
    // sum 1 + 2 + ... + n, with a loop
    static long sumLoop(int n) {
        long total = 0;
        for (int i = 1; i <= n; i++) {
            total += i;
        }
        return total;
    }

    // the same sum, with recursion
    static long sumRecursive(int n) {
        if (n == 0) {
            return 0;                       // base case: nothing to add
        }
        return n + sumRecursive(n - 1);     // n plus the sum of the rest
    }

    public static void main(String[] args) {
        System.out.println("loop:      " + sumLoop(5));
        System.out.println("recursive: " + sumRecursive(5));
        System.out.println("loop:      " + sumLoop(1000));
        System.out.println("recursive: " + sumRecursive(1000));
    }
}`,
      output: `loop:      15
recursive: 15
loop:      500500
recursive: 500500`,
      codeSummary: 'The same sum 1 + … + n written once with a `for` loop and once with recursion. Both give the same answers.',
      codeExplanation: [
        { label: 'Line 4', code: 'long total = 0;', text: 'The loop needs a variable to collect the answer. It starts at 0, the same value as the recursive base case.' },
        { label: 'Line 5', code: 'for (int i = 1; i <= n; i++) {', text: 'One frame, many rounds. `i` walks from 1 to `n`.' },
        { label: 'Line 6', code: 'total += i;', text: 'Changes the same variable each round.' },
        { label: 'Line 13', code: 'if (n == 0) {', text: 'The recursive base case. In the loop it became `long total = 0;`.' },
        { label: 'Line 16', code: 'return n + sumRecursive(n - 1);', text: 'No shared variable. Each frame adds its own `n` to the answer coming back up.' },
        { label: 'Line 23', code: 'System.out.println("recursive: " + sumRecursive(1000));', text: '1000 calls deep: fine for the stack. A million would not be (see section 3).' }
      ],
      sections: [
        {
          title: 'Side by side',
          table: {
            head: ['', 'Loop', 'Recursion'],
            rows: [
              ['How it repeats', 'The same code runs again in one frame', 'The method calls itself, one new frame per call'],
              ['Where the answer grows', 'In a variable (`total += i`)', 'In the return values coming back up'],
              ['Stops when', 'The loop condition is false', 'The base case is reached'],
              ['Memory', 'One frame', 'One frame per call'],
              ['Risk', 'Endless loop (hangs)', '`StackOverflowError` (crashes)'],
              ['Best for', 'Counting, flat lists, huge inputs', 'Trees, nested folders, split-in-half problems']
            ]
          }
        },
        {
          title: 'Factorial both ways',
          text: ['The same translation works for factorial. Base case `1` becomes the starting value. `n * factorial(n - 1)` becomes `result *= i`.'],
          code: `public class FactorialTwoWays {
    static long factorialLoop(int n) {
        long result = 1;                    // base case value
        for (int i = 2; i <= n; i++) {
            result *= i;                    // recursive step, as a loop body
        }
        return result;
    }

    static long factorialRecursive(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorialRecursive(n - 1);
    }

    public static void main(String[] args) {
        for (int n = 1; n <= 5; n++) {
            System.out.println(n + "! = " + factorialLoop(n) + " = " + factorialRecursive(n));
        }
    }
}`,
          fileName: 'FactorialTwoWays.java',
          output: `1! = 1 = 1
2! = 2 = 2
3! = 6 = 6
4! = 24 = 24
5! = 120 = 120`
        },
        {
          title: 'A very large input',
          text: ['With a million numbers, the loop has no problem. The recursion needs a million frames at once and the stack is full long before that.'],
          code: `public class DeepSum {
    static long sumLoop(int n) {
        long total = 0;
        for (int i = 1; i <= n; i++) {
            total += i;
        }
        return total;
    }

    static long sumRecursive(int n) {
        if (n == 0) {
            return 0;
        }
        return n + sumRecursive(n - 1);
    }

    public static void main(String[] args) {
        System.out.println("loop: " + sumLoop(1_000_000));
        try {
            System.out.println("recursive: " + sumRecursive(1_000_000));
        } catch (StackOverflowError e) {
            System.out.println("recursive: StackOverflowError");
        }
    }
}`,
          fileName: 'DeepSum.java',
          output: `loop: 500000500000
recursive: StackOverflowError`,
          tip: 'Some languages turn a call at the very end of a method into a jump (tail-call optimization). Java does not, so a deep recursion always needs a deep stack.'
        },
        {
          title: 'How to choose',
          mermaid: 'flowchart TD\n  Q1{"Is the data nested,<br>like a tree or folders?"} -->|yes| R["Recursion"]\n  Q1 -->|no| Q2{"Does the problem split<br>into smaller copies?"}\n  Q2 -->|yes| Q3{"Can it be very deep?<br>more than 10,000 calls"}\n  Q3 -->|no| R\n  Q3 -->|yes| L["Loop"]\n  Q2 -->|no| L',
          diagramNote: 'When both work, pick the one that is easier to read. For flat data that is usually the loop.'
        }
      ],
      technical: [
        'A method call costs a little: the JVM creates a frame, copies the arguments and later removes the frame. A loop round only jumps back to the top. For small inputs you will not notice. For millions of steps the loop is clearly faster.',
        'The JIT compiler (the part of the JVM that turns hot bytecode into machine code while the program runs) can inline some calls, but it does not remove the frames of a deep recursion.',
        'Java has no tail-call optimization. Even `return sumTail(n - 1, total + n);`, where the call is the very last thing, still adds a new frame.'
      ],
      tryIt: {
        steps: [
          'Run `TwoWays.java`.',
          'Write `static long powerLoop(int base, int exp)` and `static long powerRecursive(int base, int exp)` (base case: `exp == 0` → 1).',
          'Print both for `power(2, 10)`.'
        ],
        see: 'Both print `1024`.'
      },
      check: [
        { q: 'In the loop version of `sumTo`, what became of the base case?', a: 'The starting value `long total = 0;`.' },
        { q: 'Why does the recursive sum of a million numbers crash?', a: 'It needs a million frames at once. The stack is full long before that. The loop needs one frame.' },
        { q: 'When is recursion the better choice?', a: 'For nested or tree-shaped data (folders, menus, trees) and for problems that split into smaller copies, as long as the depth stays small.' }
      ],
      keyPoints: [
        'Every recursion can be a loop, and every loop can be a recursion.',
        'Base case → starting value. Recursive step → loop body.',
        'Loops use one frame. Recursion uses one frame per call.',
        'Flat and huge: loop. Nested or splitting: recursion.'
      ],
      commonMistakes: [
        'Using recursion for a long flat list: `sum(list)` with 500,000 items overflows. Use a `for` loop.',
        'Starting the loop with the wrong value: `long result = 0;` for factorial gives 0 forever. Start with the base case value `1`.',
        'Thinking recursion is always slower and worse: for trees it is often the clearest code.'
      ],
      related: ['Control Flow', 'sum-list', 'stack-overflow', 'folder-tree']
    }
  ]);
})();
