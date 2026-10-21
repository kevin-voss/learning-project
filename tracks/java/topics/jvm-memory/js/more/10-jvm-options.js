// JVM & Memory, lesson 10 (Deeper): JVM options -Xms, -Xmx, -Xss, -Xlog:gc and measuring memory with Runtime.
(function () {
  Java.addCoreLessons('jvm-memory', [
    {
      id: 'jvm-options',
      title: 'JVM Options and Measuring Memory',
      category: 'deeper',
      icon: '⚙',
      tagline: 'Tell the JVM how much room it gets, and ask how much it uses',
      realWorld: 'Packing for a trip. Before you leave you choose the size of the suitcase (the heap) and the size of the backpack for each child (the stack). On the way you can open the suitcase and look how full it is.',
      kid: [
        'Before the JVM starts, you can tell it how big its rooms should be. "Your storeroom may grow up to this size." "Every pile of plates may be this high."',
        'You say it with little words after `java`, like `-Xmx64m`. They are like notes you hand to the JVM at the door.',
        'While the program runs, it can ask the JVM: "How full is the storeroom right now?" The JVM answers with numbers.',
        'But the numbers change all the time, because the cleaner (the garbage collector) comes whenever he wants. So you look at them, but you do not count on the exact number.'
      ],
      definition: '**JVM options** are flags you put between `java` and the class name. `-Xms` and `-Xmx` set the start and maximum size of the heap, `-Xss` sets the stack size of each thread, and `-Xlog:gc` prints a line for each garbage collection. `Runtime.getRuntime()` lets the program read its own memory numbers.',
      explain: [
        'The JVM picks good defaults by itself: on our test machine with 24 GB of memory, the heap may grow up to 6 GB (a quarter), and each thread stack is 2 MB. Most programs never need a flag. You use them to test with little memory, to give a big program more room, or to see what the GC does.',
        'Sizes are written as a number with a unit: `k` for kilobytes, `m` for megabytes, `g` for gigabytes. `-Xmx512m` means "at most 512 MB of heap". There is no space between the flag and the size.',
        'Options must come **before** the class name. Everything after the class name is handed to your program in `args`, as you saw in [Getting started](../getting-started/index.html).',
        '`Runtime.getRuntime()` returns the one `Runtime` object of the running JVM. Its methods `maxMemory()`, `totalMemory()` and `freeMemory()` return numbers of **bytes**. `maxMemory()` is the limit (`-Xmx`), `totalMemory()` is how much heap the JVM has reserved right now, and `freeMemory()` is the unused part of that. Used memory is `totalMemory() - freeMemory()`.',
        'These numbers change with every allocation and every collection, and differ from machine to machine. Use them to get a feeling ("about 40 MB more after this line"), not as exact values in a test.'
      ],
      why: 'Flags let you reproduce memory problems quickly (a 64 MB heap fills in milliseconds), give real programs the room they need, and turn on the GC log when something is slow.',
      whenUse: 'When a program needs more (or less) heap than the default, when deep recursion needs a bigger stack, when you want to see GC activity, or when you want a rough memory measurement in your own code.',
      syntax: '`java -Xms64m -Xmx256m -Xss4m -Xlog:gc Main arg1 arg2` · `Runtime runtime = Runtime.getRuntime(); long used = runtime.totalMemory() - runtime.freeMemory();`',
      fileName: 'MemoryFacts.java',
      code: `public class MemoryFacts {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();     // the one Runtime object of this JVM

        long max = runtime.maxMemory();             // the most the heap may ever grow to (-Xmx)
        long total = runtime.totalMemory();         // what the heap has reserved right now
        long free = runtime.freeMemory();           // the unused part of total
        long used = total - free;                   // what objects use right now

        // The numbers differ on every machine, but these facts are always true:
        System.out.println("used + free == total: " + (used + free == total));
        System.out.println("total <= max:         " + (total <= max));
        System.out.println("used > 0:             " + (used > 0));
        System.out.println("at least 1 processor: " + (runtime.availableProcessors() >= 1));
    }
}`,
      output: `used + free == total: true
total <= max:         true
used > 0:             true
at least 1 processor: true`,
      codeSummary: 'The program reads the heap numbers of its own JVM. Because the exact values differ everywhere, it prints only facts that are always true about them. The section "Measuring before and after" prints the real numbers.',
      codeExplanation: [
        { label: 'Line 3', code: 'Runtime runtime = Runtime.getRuntime();', text: 'There is exactly one `Runtime` object per JVM. You cannot make one with `new`; you ask for it.' },
        { label: 'Line 5', code: 'long max = runtime.maxMemory();', text: 'The heap limit in bytes: the `-Xmx` value, or the default (a quarter of the machine\'s memory). It is a `long`, because it can be larger than an `int` can hold.' },
        { label: 'Line 6', code: 'long total = runtime.totalMemory();', text: 'The heap the JVM has reserved from the operating system so far. It starts at `-Xms` and can grow up to `max`.' },
        { label: 'Line 7', code: 'long free = runtime.freeMemory();', text: 'The part of `total` that no object uses right now.' },
        { label: 'Line 8', code: 'long used = total - free;', text: 'What objects use right now, living ones and garbage that has not been collected yet.' },
        { label: 'Line 11', code: '(used + free == total)', text: 'Always true, because of how `used` is computed. A tiny sanity check.' },
        { label: 'Line 12', code: '(total <= max)', text: 'The heap can never be bigger than its limit.' },
        { label: 'Line 14', code: 'runtime.availableProcessors()', text: 'How many processor cores the JVM may use. The GC uses this to decide how many threads it starts.' }
      ],
      sections: [
        {
          title: 'The options you will meet',
          table: {
            head: ['Option', 'Sets', 'Example', 'Default'],
            rows: [
              ['`-Xmx`', 'the **maximum** heap size', '`-Xmx512m`', 'a quarter of the machine\'s memory'],
              ['`-Xms`', 'the **start** size of the heap', '`-Xms512m`', 'a sixty-fourth of the machine\'s memory'],
              ['`-Xss`', 'the stack size of **each thread**', '`-Xss4m`', '1 MB on Linux and Windows (64-bit), 2 MB on a Mac with Apple silicon'],
              ['`-Xlog:gc`', 'one log line per collection', '`-Xlog:gc:file=gc.log` writes to a file', 'off'],
              ['`-XX:+HeapDumpOnOutOfMemoryError`', 'write a heap dump when the heap runs out', 'with `-XX:HeapDumpPath=dump.hprof`', 'off'],
              ['`-XX:+UseZGC`, `-XX:+UseSerialGC`', 'pick another garbage collector', '`-XX:+UseZGC`', 'G1']
            ],
            note: 'Options with `-X` are standard HotSpot options. Options with `-XX:` are advanced; `+` turns one on and `-` turns it off.'
          },
          mermaid: 'flowchart LR\n  A["JVM starts: heap = -Xms"] --> B["Objects fill the heap"]\n  B --> C{"GC frees enough?"}\n  C -->|yes| B\n  C -->|no| D{"heap smaller than -Xmx?"}\n  D -->|yes| E["Heap grows"]\n  E --> B\n  D -->|no| F["OutOfMemoryError: Java heap space"]',
          diagramNote: '`-Xms` is where the heap starts, `-Xmx` is the ceiling. Between the two, the JVM grows the heap when the GC cannot free enough room.'
        },
        {
          title: 'Options go before the class name',
          text: ['The same flag, once before and once after the class name. `PrintArgs` prints its heap limit and its arguments. Real output:'],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `$ java -Xmx64m PrintArgs hello
max heap: 64 MB
arguments: hello

$ java PrintArgs -Xmx64m hello
max heap: 6144 MB
arguments: -Xmx64m, hello

$ java -Xmx64 PrintArgs
Error occurred during initialization of VM
Too small maximum heap`,
          warn: 'In the second run the JVM never saw the flag: it went into `args`. In the third run the unit is missing, so `-Xmx64` means 64 **bytes**, and the JVM refuses to start.'
        },
        {
          title: 'Measuring before and after',
          text: [
            'Here the program prints real numbers. It measures used memory, makes an array of 10 million `int`s (4 bytes each, so about 40 MB) and measures again. Because the numbers depend on the machine and the flags, this example is not run on this page. These two runs are real, from our machine.'
          ],
          code: `public class MemoryReport {
    static long mb(long bytes) {
        return bytes / (1024 * 1024);
    }

    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        System.out.println("max heap:   " + mb(runtime.maxMemory()) + " MB");
        System.out.println("total heap: " + mb(runtime.totalMemory()) + " MB");
        long before = runtime.totalMemory() - runtime.freeMemory();

        int[] big = new int[10_000_000];             // 10 million ints = about 40 MB
        long after = runtime.totalMemory() - runtime.freeMemory();

        System.out.println("used before: " + mb(before) + " MB");
        System.out.println("used after:  " + mb(after) + " MB");
        System.out.println("array length: " + big.length);
    }
}`,
          fileName: 'MemoryReport.java',
          noRun: true,
          output: `$ java MemoryReport
max heap:   6144 MB
total heap: 388 MB
used before: 3 MB
used after:  43 MB
array length: 10000000

$ java -Xms64m -Xmx256m MemoryReport
max heap:   256 MB
total heap: 66 MB
used before: 2 MB
used after:  40 MB
array length: 10000000`,
          tip: 'One MB is `1024 * 1024` bytes. Divide by it to get readable numbers. "Used" also counts garbage that the GC has not collected yet, so it can be higher than what your program really needs.'
        },
        {
          title: 'The stack size and how deep you can go',
          text: [
            'This probe counts how many frames fit before `StackOverflowError`. It is not run on this page because the number changes with the flag, the machine and even the JIT. Real output from three runs:'
          ],
          code: `public class DepthProbe {
    static int depth = 0;

    static void dive() {
        depth++;
        dive();
    }

    public static void main(String[] args) {
        try {
            dive();
        } catch (StackOverflowError e) {
            System.out.println("frames before the stack was full: " + depth);
        }
    }
}`,
          fileName: 'DepthProbe.java',
          noRun: true,
          output: `$ java -Xss256k DepthProbe
frames before the stack was full: 1479
$ java DepthProbe
frames before the stack was full: 44234
$ java -Xss4m DepthProbe
frames before the stack was full: 97626`,
          tip: 'The numbers do not grow exactly with the stack size: frames of interpreted code are bigger than frames of JIT-compiled code, and the JIT starts in the middle of the dive. A bigger `-Xss` is a quick help for deep recursion that is correct, never a fix for a missing base case.'
        },
        {
          title: 'More from the GC log',
          text: [
            '`-Xlog` takes a list of **tags** and a level. `gc` is the short summary you saw in "Generations and GC Pauses". `gc+init` prints how the GC was set up at start. `gc*` turns on every GC tag (a lot of output). Add `:file=gc.log` to write into a file instead of the terminal. Real output, shortened:'
          ],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `$ java -Xlog:gc+init -Xms64m -Xmx256m MemoryFacts
[0.005s][info][gc,init] Version: 25+36-3489 (release)
[0.005s][info][gc,init] CPUs: 14 total, 14 available
[0.005s][info][gc,init] Memory: 24576M
[0.005s][info][gc,init] Heap Region Size: 1M
[0.005s][info][gc,init] Heap Min Capacity: 64M
[0.005s][info][gc,init] Heap Initial Capacity: 64M
[0.005s][info][gc,init] Heap Max Capacity: 256M
used + free == total: true
...

$ java -Xlog:gc:file=gc.log ShortLived
objects made: 2000000
objects kept: 200
the rest became garbage while the loop ran
$ cat gc.log
[0.004s][info][gc] Using G1
[0.025s][info][gc] GC(0) Pause Young (Normal) (G1 Evacuation Pause) 49M->1M(388M) 0.558ms`
        }
      ],
      technical: [
        'Setting `-Xms` equal to `-Xmx` makes the heap start at its full size. Servers often do this: the JVM never has to grow or shrink the heap, and the memory use is predictable. For small programs it only wastes memory.',
        'The heap limit is not the whole memory of the JVM process. Metaspace, the code cache, every thread stack, GC bookkeeping and native libraries come on top. A JVM with `-Xmx256m` can use 350 MB or more in the operating system. In containers, the JVM reads the container\'s memory limit and takes a quarter of it as the default heap.',
        '`jcmd <pid> VM.flags` shows the flags of a running JVM, and `java -XX:+PrintFlagsFinal -version` prints every flag with its final value (for example `ThreadStackSize`, `MaxHeapSize`). The tool `jconsole` or `jvisualvm` shows heap use, GC activity and threads as live charts.'
      ],
      tryIt: {
        steps: [
          'Save `MemoryReport.java` from the section "Measuring before and after" and compile it.',
          'Run `java MemoryReport`, then `java -Xmx128m MemoryReport`.',
          'Run `java -Xmx30m MemoryReport`.',
          'Save `DepthProbe.java` and run it with `-Xss256k`, with no flag, and with `-Xss8m`.'
        ],
        see: 'The "max heap" line follows your flag (the JVM may round it up a little: `-Xmx30m` shows `32 MB`). With 30 MB the 40 MB array does not fit: `Exception in thread "main" java.lang.OutOfMemoryError: Java heap space`. The depth grows with the stack size.'
      },
      check: [
        { q: 'What is the difference between `-Xms` and `-Xmx`?', a: '`-Xms` is the size the heap starts with; `-Xmx` is the most it may ever grow to. `maxMemory()` returns the `-Xmx` value.' },
        { q: 'Why does `java Main -Xmx64m` not limit the heap?', a: 'Everything after the class name is an argument for your program (it ends up in `args`). JVM options must come before the class name.' },
        { q: 'Why should a test not compare the exact value of `freeMemory()`?', a: 'It changes with every allocation and every collection, and differs between machines and runs. Test stable facts instead, like `total <= max`.' }
      ],
      keyPoints: [
        'Options go between `java` and the class name.',
        '`-Xmx` limits the heap, `-Xms` sets its start size, `-Xss` sets each thread\'s stack size.',
        '`-Xlog:gc` prints one line per collection; `:file=gc.log` writes it to a file.',
        '`Runtime.getRuntime()` gives `maxMemory()`, `totalMemory()` and `freeMemory()` in bytes.',
        'Memory numbers vary: use them for a feeling, not for exact checks.'
      ],
      commonMistakes: [
        'Putting the flag after the class: `java Main -Xmx1g`. Write `java -Xmx1g Main`.',
        'Forgetting the unit: `-Xmx512` means 512 bytes. Write `-Xmx512m`.',
        'Reading `freeMemory()` as "memory the program still has": it is only the free part of the current `totalMemory()`. The heap can still grow up to `maxMemory()`.',
        'Fixing a missing base case with `-Xss1g`: the stack overflows a little later. Fix the base case.'
      ],
      related: ['generations', 'memory-errors', 'Getting Started']
    }
  ]);
})();
