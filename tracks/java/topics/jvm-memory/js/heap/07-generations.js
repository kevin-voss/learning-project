// JVM & Memory, lesson 7: generations (young and old) and GC pauses.
(function () {
  Java.addCoreLessons('jvm-memory', [
    {
      id: 'generations',
      title: 'Generations and GC Pauses',
      category: 'concept',
      icon: '⏸',
      tagline: 'Most objects die young, so clean the young part often',
      realWorld: 'A kitchen. The cutting board fills with peels and scraps all the time, so you wipe it after every meal. The pantry holds food that stays for weeks, so you clean it only now and then.',
      kid: [
        'When you cook, the cutting board gets messy fast: onion skins, carrot ends, egg shells. Almost all of it is rubbish a minute later.',
        'So you wipe the board often. It is quick, because it is small, and almost everything on it goes in the bin.',
        'The few good things, like a cut carrot you still need, you put on a plate. If you keep them for a long time, they move to the pantry.',
        'The pantry is big and cleaned only sometimes. While you clean, you stop cooking for a moment. That moment is a **GC pause**.'
      ],
      definition: 'The heap is split into a **young generation**, where new objects are made, and an **old generation** for objects that survived several collections. A **GC pause** is a short moment in which the JVM stops your program\'s threads to do collection work.',
      explain: [
        'Measurements of real programs show the same thing again and again: **most objects die young**. A temporary string, an iterator in a loop, an array that lives for one method call. This fact is called the **generational hypothesis**.',
        'So the JVM makes every new object in a part of the young generation called **Eden**. When Eden is full, a **young collection** (also called a minor GC) runs. It copies the few living objects into a **survivor** space and treats all of Eden as free again. Garbage costs nothing here: it is not even looked at.',
        'Each object has an **age**: how many young collections it survived. When the age reaches a limit (at most 15), the object is **promoted**: copied into the **old generation**. Objects there are expected to live long, like a list in a static field or a cache.',
        'The old generation is collected less often, because it is big and its objects rarely die. G1 does this partly while your program runs (**concurrent** marking) and then cleans some old regions together with young ones (a **mixed** collection). If nothing else helps, a **full GC** cleans the whole heap.',
        'During some steps the GC must be sure that no object moves under its feet. Then it stops all your program threads: a **stop-the-world pause**. With G1 a young pause usually takes a few milliseconds. Your program does nothing during that time, which matters for games, trading or a server that must answer fast.'
      ],
      why: 'Splitting the heap by age makes most collections tiny and fast. Knowing about pauses explains why a program sometimes "hiccups" and what the lines in a GC log mean.',
      whenUse: 'When you read `-Xlog:gc` output, when a program is slow or stutters, and when you decide whether to keep objects around for a long time.',
      syntax: '`java -Xlog:gc Main` prints one line per collection: `GC(number) Pause Young (…) heapBefore->heapAfter(heapSize) time`.',
      fileName: 'ShortLived.java',
      code: `import java.util.ArrayList;
import java.util.List;

public class ShortLived {
    public static void main(String[] args) {
        List<int[]> keepers = new ArrayList<>();
        long made = 0;

        for (int i = 0; i < 2_000_000; i++) {
            int[] temp = new int[16];     // a small object that dies right away
            temp[0] = i;
            made++;
            if (i % 10_000 == 0) {
                keepers.add(temp);        // only a few survive: we keep them
            }
        }

        System.out.println("objects made: " + made);
        System.out.println("objects kept: " + keepers.size());
        System.out.println("the rest became garbage while the loop ran");
    }
}`,
      output: `objects made: 2000000
objects kept: 200
the rest became garbage while the loop ran`,
      codeSummary: 'Two million small arrays are made, and all but 200 die in the same loop round. This is the typical pattern the young generation is built for. The output is always the same; run it with `-Xlog:gc` to watch the collections.',
      codeExplanation: [
        { label: 'Line 6', code: 'List<int[]> keepers = new ArrayList<>();', text: 'The list lives the whole program. Everything in it stays reachable from the local variable `keepers`.' },
        { label: 'Line 9', code: 'for (int i = 0; i < 2_000_000; i++) {', text: 'Two million rounds. The `_` in the number is only for reading; Java ignores it.' },
        { label: 'Line 10', code: 'int[] temp = new int[16];', text: 'A new array in **Eden** every round: about 80 bytes each, so roughly 160 MB in total.' },
        { label: 'Line 11', code: 'temp[0] = i;', text: 'We use the array once. After this round `temp` points to a new array and the old one is unreachable.' },
        { label: 'Line 13', code: 'if (i % 10_000 == 0) {', text: 'True for 1 round in 10,000: 200 times in total.' },
        { label: 'Line 14', code: 'keepers.add(temp);', text: 'These few arrays stay reachable. They survive young collections and may be promoted to the old generation.' },
        { label: 'Line 18', code: 'System.out.println("objects made: " + made);', text: 'Only counts are printed: they are the same on every machine. GC timing is not, so it goes to the log instead.' }
      ],
      sections: [
        {
          title: 'The life of an object',
          text: ['Every object starts in Eden. Most die there. A few move on.'],
          mermaid: 'stateDiagram-v2\n  [*] --> Eden: new\n  Eden --> Freed: unreachable at a young GC\n  Eden --> Survivor: still reachable, age 1\n  Survivor --> Survivor: survives again, age + 1\n  Survivor --> Freed: unreachable at a young GC\n  Survivor --> Old: age limit reached, promoted\n  Old --> Freed: unreachable at a mixed or full GC\n  Freed --> [*]',
          diagramNote: 'The "Freed" state costs almost nothing in the young generation: the GC copies the living objects out and reuses all of Eden at once.'
        },
        {
          title: 'One young collection, step by step',
          mermaid: 'flowchart LR\n  A["Eden is full"] --> B["Stop the program threads"]\n  B --> C["Mark from roots, only young objects"]\n  C --> D["Copy survivors to a survivor space or to old"]\n  D --> E["All of Eden is free again"]\n  E --> F["Program threads go on"]',
          text: [
            'The work is proportional to the number of **living** objects, not to the garbage. In the example, Eden holds hundreds of thousands of dead arrays and a handful of living ones. Copying a handful is fast.',
            'That is why making many short-lived objects is cheap in Java. Keeping objects alive for a medium time is what costs: they get copied again and again before they die.'
          ]
        },
        {
          title: 'Watching the collections',
          text: ['`-Xlog:gc` prints one line per collection. These are real lines from our machine, first with the default heap, then with a small heap (`-Xmx64m`), where Eden fills up faster.'],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `$ java -Xlog:gc ShortLived
[0.004s][info][gc] Using G1
[0.023s][info][gc] GC(0) Pause Young (Normal) (G1 Evacuation Pause) 49M->1M(388M) 0.706ms
objects made: 2000000
objects kept: 200
the rest became garbage while the loop ran

$ java -Xlog:gc -Xmx64m ShortLived
[0.005s][info][gc] Using G1
[0.023s][info][gc] GC(0) Pause Young (Normal) (G1 Evacuation Pause) 35M->1M(64M) 0.343ms
[0.026s][info][gc] GC(1) Pause Young (Normal) (G1 Evacuation Pause) 30M->1M(64M) 0.171ms
[0.028s][info][gc] GC(2) Pause Young (Normal) (G1 Evacuation Pause) 37M->1M(64M) 0.258ms
[0.029s][info][gc] GC(3) Pause Young (Normal) (G1 Evacuation Pause) 38M->1M(64M) 0.277ms
...`
        },
        {
          title: 'Reading one log line',
          text: ['Take the line `GC(0) Pause Young (Normal) (G1 Evacuation Pause) 35M->1M(64M) 0.343ms` from the small heap and read it part by part.'],
          table: {
            head: ['Part', 'Meaning'],
            rows: [
              ['`[0.023s]`', 'time since the JVM started'],
              ['`GC(0)`', 'the number of this collection, counting from 0'],
              ['`Pause Young (Normal)`', 'a stop-the-world pause that collected the young generation'],
              ['`(G1 Evacuation Pause)`', 'why: Eden was full, so G1 moved ("evacuated") the survivors'],
              ['`35M->1M(64M)`', 'heap in use before → after the collection (heap size now)'],
              ['`0.343ms`', 'how long your program was stopped']
            ],
            note: 'From 35 MB to 1 MB: almost everything was garbage. Times and sizes differ on every run and every machine.'
          }
        },
        {
          title: 'When objects survive',
          text: [
            'Here every fourth block of 100 KB is kept in a list. Look at the number after the arrow in the log: it grows (4M, 6M, 9M), because the kept blocks survive and pile up. In `ShortLived` it stayed at 1M.'
          ],
          code: `import java.util.ArrayList;
import java.util.List;

public class Survivors {
    public static void main(String[] args) {
        List<byte[]> longLived = new ArrayList<>();
        for (int i = 0; i < 400; i++) {
            byte[] shortLived = new byte[100_000];   // dies at the end of this round
            shortLived[0] = 1;
            if (i % 4 == 0) {
                longLived.add(new byte[100_000]);    // survives: the list keeps it
            }
        }
        System.out.println("kept " + longLived.size() + " blocks of 100 KB");
    }
}`,
          fileName: 'Survivors.java',
          output: 'kept 100 blocks of 100 KB',
          tip: 'Real log from `java -Xmx32m -Xlog:gc Survivors`: `Pause Young (Normal) (G1 Evacuation Pause) 18M->4M(32M)`, then `15M->6M(32M)`, then `18M->9M(32M)`.'
        },
        {
          title: 'Kinds of pauses',
          table: {
            head: ['Log text', 'What is collected', 'How often', 'Typical length with G1'],
            rows: [
              ['`Pause Young (Normal)`', 'Eden and survivor spaces', 'often', 'about 1 to 10 ms'],
              ['`Pause Young (Concurrent Start)`', 'young, and it starts marking the old generation in the background', 'when the old generation fills', 'like a young pause'],
              ['`Pause Remark`, `Pause Cleanup`', 'short steps to finish the background marking', 'after concurrent marking', 'short'],
              ['`Pause Young (Mixed)`', 'young plus the old regions with the most garbage', 'after a marking cycle', 'a bit longer than young'],
              ['`Pause Full`', 'the whole heap, all at once', 'rare; a sign of trouble (or `System.gc()`)', 'can be long: seconds on big heaps']
            ],
            note: 'Many full GCs in a row followed by `OutOfMemoryError` is the classic picture of a heap that is too small or a memory leak.'
          }
        }
      ],
      technical: [
        'G1 does not have one fixed Eden block. It marks some of its equal-sized regions as Eden, some as survivor and some as old, and changes the mix while the program runs to meet a pause goal (by default 200 ms, set with `-XX:MaxGCPauseMillis`).',
        'Young collections need to know which old objects point into the young generation, without scanning the whole old generation. The JVM keeps track of that with a **write barrier**: a few extra machine instructions on every write of a reference field, which note "this old region now points to a young one" in a **remembered set**.',
        'The age limit is `-XX:MaxTenuringThreshold` (default 15, because the age has 4 bits in the object header). G1 may promote earlier if the survivor space gets too full. Very large arrays (at least half a region) skip Eden and go straight into old regions as **humongous** objects.'
      ],
      tryIt: {
        steps: [
          'Save the example as `ShortLived.java`. Compile it with `javac ShortLived.java`.',
          'Run `java -Xlog:gc ShortLived` and count the `Pause Young` lines.',
          'Run `java -Xlog:gc -Xmx32m ShortLived` and count again.',
          'Change `2_000_000` to `20_000_000`, compile, and run with `-Xmx32m` once more.'
        ],
        see: 'Few pauses with the default heap, more with 32 MB, many more with ten times the objects. The number after the arrow stays small every time: almost everything died young.'
      },
      check: [
        { q: 'What is the generational hypothesis?', a: 'Most objects die young. So the JVM collects the young part of the heap often and cheaply, and the old part rarely.' },
        { q: 'What happens to an object that survives many young collections?', a: 'Its age goes up with each one. When it reaches the limit, it is promoted (copied) into the old generation.' },
        { q: 'What is a stop-the-world pause?', a: 'A moment in which the JVM stops all program threads so the GC can do work safely. Your program does nothing during the pause.' }
      ],
      keyPoints: [
        'New objects start in Eden, in the young generation.',
        'Young collections are frequent and fast: they copy the few survivors.',
        'Objects that survive long enough are promoted to the old generation.',
        'A GC pause stops your threads; young pauses usually take milliseconds.',
        '`-Xlog:gc` shows every collection: kind, heap before → after, and the pause time.'
      ],
      commonMistakes: [
        'Reusing objects "to help the GC": short-lived objects are cheap. Write clear code and make new objects; optimise only after you measured.',
        'Treating every `Pause Young` line as a problem: many short young pauses are normal. Worry about long or frequent `Pause Full` lines.',
        'Printing GC numbers from inside the program and expecting the same output every time: GC timing changes with every run. Print stable facts; read the log for timing.'
      ],
      related: ['gc', 'memory-leaks', 'jvm-options']
    }
  ]);
})();
