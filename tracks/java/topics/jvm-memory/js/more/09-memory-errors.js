// JVM & Memory, lesson 9: OutOfMemoryError and StackOverflowError, caught safely.
(function () {
  Java.addCoreLessons('jvm-memory', [
    {
      id: 'memory-errors',
      title: 'OutOfMemoryError and StackOverflowError',
      category: 'habits',
      icon: '⚠',
      tagline: 'The heap is full, or the stack is full',
      realWorld: 'Two ways to run out of room at home. The storeroom is so full that the new bike does not fit (the heap). Or the pile of plates on the table gets so high that it touches the ceiling (the stack).',
      kid: [
        'Your family has one big storeroom. Everybody puts things in it. If nobody ever takes things out, one day the new bike does not fit. That is **OutOfMemoryError**: the heap is full.',
        'You also have your own small pile of plates. Every time you start a job, you put a plate on top. If you start jobs inside jobs inside jobs and never finish one, the pile reaches the ceiling. That is **StackOverflowError**: your stack is full.',
        'Both are not little mistakes like a typo. They mean: something is really wrong, stop and look.',
        'You can catch them to say "oops" calmly, but the real fix is to find out why the room filled up.'
      ],
      definition: '`OutOfMemoryError` is thrown when the JVM cannot find room for a new object (or a class, or a thread). `StackOverflowError` is thrown when a thread\'s stack has no room for one more frame. Both are **Errors**, not Exceptions.',
      explain: [
        'In [Exceptions](../exceptions/index.html) you learned that every throwable thing extends `Throwable`, and that there are two big branches: `Exception` for problems a program can expect and handle, and `Error` for serious problems in the JVM itself. Both memory errors extend `VirtualMachineError`, a kind of `Error`.',
        '`OutOfMemoryError` comes with a message that tells you **which** memory ran out. `Java heap space` means the heap is full of reachable objects, usually because of a leak or a heap that is too small. `Requested array size exceeds VM limit` means one array is bigger than the JVM allows at all. `Metaspace` means too many classes were loaded.',
        '`StackOverflowError` almost always comes from [recursion](../recursion/index.html) without a working base case: frames pile up until the stack of the thread is full. Sometimes the recursion is correct but the input is too deep, and a loop is the better tool.',
        'You **can** catch both with `try`/`catch`, like any `Throwable`. Usually you should not: after an `OutOfMemoryError` the program may be in a broken state, because the error can hit in the middle of any `new`. Catching makes sense only in narrow cases: to give up one task cleanly, to print a clear message, or, like on this page, to make a demo print a stable output.',
        'If nobody catches them, the JVM prints the error with its stack trace and ends the thread. When the `main` thread ends this way, the program exits with exit code 1.'
      ],
      why: 'Every Java programmer meets these two errors. If you can read their message, you know in seconds whether to look for a missing base case, a leak or a heap that is too small.',
      whenUse: 'When a program dies with `java.lang.OutOfMemoryError` or `java.lang.StackOverflowError`, and when you write a demo or a test that must provoke them safely.',
      syntax: '`try { … } catch (OutOfMemoryError e) { … }` and `try { … } catch (StackOverflowError e) { … }`. Catch the exact error, as close to the cause as you can, and let go of big objects before you print.',
      fileName: 'MemoryErrors.java',
      code: `public class MemoryErrors {
    static int depth = 0;

    static void goDeeper() {
        depth++;
        goDeeper();                         // no base case: the stack fills up
    }

    public static void main(String[] args) {
        try {
            int[] huge = new int[Integer.MAX_VALUE];   // about 8 GB in one array
            System.out.println("got " + huge.length);
        } catch (OutOfMemoryError e) {
            System.out.println("1. caught OutOfMemoryError: " + e.getMessage());
        }

        try {
            goDeeper();
        } catch (StackOverflowError e) {
            System.out.println("2. caught StackOverflowError after many calls: " + (depth > 1000));
        }

        System.out.println("3. the program goes on: both errors were caught");
    }
}`,
      output: `1. caught OutOfMemoryError: Requested array size exceeds VM limit
2. caught StackOverflowError after many calls: true
3. the program goes on: both errors were caught`,
      codeSummary: 'Both errors are provoked on purpose and caught right away. The program prints only stable facts (the error message and "more than 1000 calls"), so the output is the same on every machine.',
      codeExplanation: [
        { label: 'Line 2', code: 'static int depth = 0;', text: 'Counts the calls. It is a static field, so it survives when the frames are thrown away.' },
        { label: 'Line 6', code: 'goDeeper();', text: 'The method calls itself with no way to stop. Each call adds one frame until the thread\'s stack is full.' },
        { label: 'Line 11', code: 'int[] huge = new int[Integer.MAX_VALUE];', text: 'Asks for about 2.1 billion ints. That is larger than the biggest array the JVM allows, so it refuses at once, without filling any memory.' },
        { label: 'Line 13', code: '} catch (OutOfMemoryError e) {', text: 'Catches exactly this error. The `try` contains only the one risky line, so we know what failed.' },
        { label: 'Line 14', code: 'e.getMessage()', text: 'The message says which limit was hit: `Requested array size exceeds VM limit`.' },
        { label: 'Line 19', code: '} catch (StackOverflowError e) {', text: 'When this runs, all the `goDeeper` frames are already gone: the stack is unwound up to `main`, so there is room again.' },
        { label: 'Line 20', code: '(depth > 1000)', text: 'The exact depth differs per machine and per run (it depends on the stack size and the JIT). `depth > 1000` is always true, so the output is stable.' },
        { label: 'Line 23', code: 'System.out.println("3. the program goes on: both errors were caught");', text: 'Proof that a caught error does not end the program.' }
      ],
      sections: [
        {
          title: 'Where the two errors sit in the family',
          mermaid: 'classDiagram\n  Throwable <|-- Exception\n  Throwable <|-- Error\n  Exception <|-- RuntimeException\n  Error <|-- VirtualMachineError\n  VirtualMachineError <|-- OutOfMemoryError\n  VirtualMachineError <|-- StackOverflowError',
          diagramNote: 'An arrow points to the parent class. `catch (Exception e)` does **not** catch these two errors: they are not Exceptions.',
          warn: 'Never write `catch (Throwable t)` or `catch (Error e)` around big parts of a program "to be safe". It hides real failures. Catch the one error you expect, around the one line that can cause it.'
        },
        {
          title: 'Read the message',
          table: {
            head: ['Message', 'What ran out', 'Usual cause', 'What to do'],
            rows: [
              ['`Java heap space`', 'the heap', 'a leak, or really too much data', 'find the leak; if the data is real, raise `-Xmx`'],
              ['`Requested array size exceeds VM limit`', 'nothing yet: the array is too big for any heap', 'a wrong size, often a bug in a calculation', 'check the size you pass to `new`'],
              ['`Metaspace`', 'metaspace (class descriptions)', 'loading classes again and again', 'rare for beginners; look for code that makes classes'],
              ['`unable to create native thread`', 'operating-system threads', 'starting thousands of threads', 'use fewer threads'],
              ['`StackOverflowError` (no message)', 'the stack of one thread', 'recursion without a working base case', 'fix the base case, or use a loop']
            ]
          }
        },
        {
          title: 'Filling the heap for real',
          text: [
            'This program keeps 1 MB blocks in a list until the heap is full. With the default heap (a quarter of your memory) that would take gigabytes, so you run it with a small heap: `java -Xmx64m FillHeap`. Because it needs that flag, it is not run on this page. The output is real, from our machine; your number of blocks may differ.',
            'In the `catch` block the program first sets `blocks = null`. Now the blocks are unreachable, and there is room again for the strings it prints.'
          ],
          code: `import java.util.ArrayList;
import java.util.List;

public class FillHeap {
    public static void main(String[] args) {
        List<byte[]> blocks = new ArrayList<>();
        try {
            while (true) {
                blocks.add(new byte[1024 * 1024]);   // 1 MB per block, kept forever
            }
        } catch (OutOfMemoryError e) {
            int filled = blocks.size();
            blocks = null;                           // let go, so we have room to print
            System.out.println("caught: " + e.getMessage());
            System.out.println("blocks kept before the heap was full: " + filled);
        }
    }
}`,
          fileName: 'FillHeap.java',
          noRun: true,
          output: `$ java -Xmx64m FillHeap
caught: Java heap space
blocks kept before the heap was full: 31`,
          tip: 'Why only 31 blocks in a 64 MB heap? On a 64 MB heap, G1 cuts the heap into regions of 1 MB. A `byte[]` of 1 MB plus its small header is a bit bigger than one region, so it is a "humongous" object that takes up two whole regions. Memory has overhead.'
        },
        {
          title: 'When nobody catches it',
          text: ['Without `try`/`catch` the error travels up through every frame. The JVM prints it with the stack trace and ends the program. This is real output; `echo $?` prints the exit code of the last command.'],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `$ java Uncaught
before
Exception in thread "main" java.lang.OutOfMemoryError: Requested array size exceeds VM limit
	at Uncaught.main(Uncaught.java:4)
$ echo $?
1`,
          tip: '`Uncaught.java` prints `"before"` and then does `int[] huge = new int[Integer.MAX_VALUE];` on line 4, with no `try`.'
        },
        {
          title: 'A safe place to catch: one task at a time',
          text: [
            'One sensible use: a program runs many independent tasks, and one buggy task must not stop the others. The `catch` sits around one task only. When it runs, the frames of the failed task are already gone, so the stack is healthy again.'
          ],
          code: `public class Tasks {
    static int countDown(int n) {
        if (n == 0) {
            return 0;
        }
        return 1 + countDown(n - 1);
    }

    static void runTask(String name, int n) {
        try {
            System.out.println(name + ": counted " + countDown(n));
        } catch (StackOverflowError e) {
            // One task failed. Its frames are already gone, so the stack is empty again.
            System.out.println(name + ": failed with StackOverflowError, skipping it");
        }
    }

    public static void main(String[] args) {
        runTask("task 1", 100);
        runTask("task 2", -1);         // a bug: -1 never reaches the base case 0
        runTask("task 3", 2_000);
        System.out.println("all tasks handled");
    }
}`,
          fileName: 'Tasks.java',
          output: `task 1: counted 100
task 2: failed with StackOverflowError, skipping it
task 3: counted 2000
all tasks handled`,
          warn: 'The real fix for task 2 is still in the code: `if (n <= 0)` instead of `if (n == 0)`. Catching only keeps the other tasks alive.'
        }
      ],
      technical: [
        'The largest array HotSpot allows is a little below `Integer.MAX_VALUE` elements. A request at or above that limit fails with "Requested array size exceeds VM limit" before the GC is even asked. Any smaller request first triggers collections; only if a full GC cannot free enough room does the JVM throw "Java heap space".',
        'For `StackOverflowError` the JVM keeps a few protected **guard pages** at the end of every thread stack. When a frame would touch them, the JVM throws the error instead of crashing, and leaves enough room for the `catch` block and the stack trace to run.',
        'An `OutOfMemoryError` can be thrown in any thread, at any `new`, even inside library code. That is why the state of the program afterwards is uncertain, and why servers often start with `-XX:+ExitOnOutOfMemoryError` (stop at once, let a supervisor restart them) and `-XX:+HeapDumpOnOutOfMemoryError` (write a heap dump to find the cause).'
      ],
      tryIt: {
        steps: [
          'Save the example as `MemoryErrors.java` and run `java MemoryErrors.java`.',
          'Change `Integer.MAX_VALUE` to `100` and run again.',
          'Remove the `try`, the `catch` line and its body around `goDeeper();` (keep the call), and run again.'
        ],
        see: 'First the three numbered lines. With `100`: `got 100` instead of line 1. Without the second `catch`: `Exception in thread "main" java.lang.StackOverflowError` and a very long stack trace with the same `goDeeper` line again and again. Line 3 is never printed.'
      },
      check: [
        { q: 'Does `catch (Exception e)` catch an `OutOfMemoryError`?', a: 'No. `OutOfMemoryError` extends `Error` (through `VirtualMachineError`), not `Exception`.' },
        { q: 'What does `OutOfMemoryError: Java heap space` tell you?', a: 'The heap is full of reachable objects and a full GC could not free enough room. Look for a leak first; if the data is really that big, give the JVM more heap with `-Xmx`.' },
        { q: 'Why does the example print `depth > 1000` instead of `depth` itself?', a: 'The exact depth depends on the stack size, the machine and the JIT, so it changes from run to run. "More than 1000" is always true, so the output stays the same.' }
      ],
      keyPoints: [
        '`OutOfMemoryError`: no room on the heap (or in metaspace). `StackOverflowError`: no room on a thread\'s stack.',
        'Both are `Error`s, not `Exception`s.',
        'The message of an `OutOfMemoryError` tells you which memory ran out.',
        'Catch them only in narrow places, around one risky line or one task.',
        'Let go of big objects in the `catch` block before you do more work.'
      ],
      commonMistakes: [
        '`catch (Exception e)` and hoping it catches memory errors: it does not. Catch `OutOfMemoryError` or `StackOverflowError` by name.',
        'Wrapping the whole `main` in `catch (Throwable t) {}`: hides every real failure. Catch one error around one line, and print it.',
        'Printing `depth` or memory numbers in a test and expecting the same output: they differ per machine. Print stable facts.',
        'Fixing `Java heap space` by raising `-Xmx` again and again: a leak fills any heap. Find the reference that keeps the objects alive.'
      ],
      related: ['memory-leaks', 'Recursion', 'Exceptions', 'jvm-options']
    }
  ]);
})();
