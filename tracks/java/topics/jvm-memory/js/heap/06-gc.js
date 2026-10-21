// JVM & Memory, lesson 6: garbage collection and reachability from GC roots.
(function () {
  Java.addCoreLessons('jvm-memory', [
    {
      id: 'gc',
      title: 'Garbage Collection: Reachable or Garbage',
      category: 'concept',
      icon: 'GC',
      tagline: 'Unused objects are cleaned later',
      realWorld: 'Cleaning up a playroom. You start at the toys that children are holding right now, and every toy tied to those toys. Everything else on the floor goes back into the box.',
      kid: [
        'At the end of the day, the teacher cleans the playroom. She does not ask every toy "are you still needed?".',
        'She looks at the children. Every toy a child holds is needed. Every toy tied to a held toy with a string is needed too. She follows every string.',
        'All the other toys lie on the floor with no string to any child. Those go back into the box, even two toys that are tied only to each other.',
        'The **garbage collector** is that teacher. The children are the **GC roots**, the strings are references.'
      ],
      definition: '**Garbage collection** (GC) frees heap memory of objects that the program can no longer reach. An object is **reachable** if a chain of references leads to it from a **GC root**; every other object is garbage.',
      explain: [
        'In some languages you must free memory yourself. Forget it and memory runs out; do it too early and the program crashes. In Java you never free an object by hand. The **garbage collector**, a part of the JVM, does it for you.',
        'The GC does not count how many arrows point to an object. It starts from the **GC roots**: the local variables in every frame of every running thread, the static fields of every loaded class, and the running threads themselves. From there it follows every reference, and every reference inside those objects, and so on.',
        'Every object it reaches this way is **marked** as alive. Every object that is not marked is garbage, and its memory can be reused. This is called **mark and sweep**: mark the living, sweep away the rest.',
        'Because the GC starts from the roots, a **cycle** is no problem. Two objects that only point to each other are not reachable from any root, so both are collected.',
        'The GC runs when the JVM decides it is time, usually when a part of the heap is full. You cannot know the exact moment, and you do not need to. `System.gc()` is only a request; real programs never call it.'
      ],
      why: 'Automatic garbage collection removes a whole family of bugs: memory that is freed twice, used after it was freed, or never freed. You think about which objects you still need, not about freeing them.',
      whenUse: 'Think about reachability when a long-running program keeps growing, when you store objects in static fields or big collections, and when you wonder whether an object "is still there".',
      syntax: 'No code frees an object. You make it unreachable: let the method return, set a variable to `null`, remove the object from its list. The GC does the rest.',
      fileName: 'Reachability.java',
      code: `import java.lang.ref.WeakReference;

public class Reachability {
    public static void main(String[] args) {
        StringBuilder kept = new StringBuilder("kept");
        StringBuilder dropped = new StringBuilder("dropped");

        // A WeakReference watches an object without keeping it alive.
        WeakReference<StringBuilder> watchKept = new WeakReference<>(kept);
        WeakReference<StringBuilder> watchDropped = new WeakReference<>(dropped);

        dropped = null;              // the last strong arrow to "dropped" is gone
        System.out.println("before GC: " + watchKept.get() + ", " + watchDropped.get());

        System.gc();                 // ask the JVM to collect now (only for this demo)

        System.out.println("after GC:  " + watchKept.get() + ", " + watchDropped.get());
        System.out.println("kept is still usable: " + kept.length() + " letters");
    }
}`,
      output: `before GC: kept, dropped
after GC:  kept, null
kept is still usable: 4 letters`,
      codeSummary: 'Two objects, each watched by a `WeakReference`. One stays reachable through the local variable `kept`, the other loses its last normal reference. After a garbage collection the watcher of the dropped object finds nothing.',
      codeExplanation: [
        { label: 'Line 5', code: 'StringBuilder kept = new StringBuilder("kept");', text: 'An object on the heap, reachable from the GC root `kept` (a local variable in the running frame of `main`).' },
        { label: 'Line 6', code: 'StringBuilder dropped = new StringBuilder("dropped");', text: 'A second object, for now reachable from `dropped`.' },
        { label: 'Line 9', code: 'WeakReference<StringBuilder> watchKept = new WeakReference<>(kept);', text: 'A **weak reference** is a special arrow that the GC ignores when it looks for living objects. It lets us watch an object without keeping it alive. `get()` returns the object, or `null` once it is collected.' },
        { label: 'Line 12', code: 'dropped = null;', text: 'The only normal (strong) arrow to the second object is gone. It is unreachable now, but still in memory.' },
        { label: 'Line 13', code: 'System.out.println("before GC: " + ...);', text: 'Both watchers still find their object: no collection has run yet. Unreachable does not mean "gone at once".' },
        { label: 'Line 15', code: 'System.gc();', text: 'Asks the JVM to collect now. On a standard JDK this runs a full collection. We use it only to make the demo visible; normal programs leave the timing to the JVM.' },
        { label: 'Line 17', code: 'System.out.println("after GC:  " + ...);', text: '`watchDropped.get()` is `null`: the GC found no path from a root and freed the object. `kept` was reachable, so it survived.' },
        { label: 'Line 18', code: 'kept.length()', text: 'Using `kept` here also keeps it alive until this line: the variable is still in use.' }
      ],
      sections: [
        {
          title: 'GC roots and the paths from them',
          text: ['Picture a running program. The GC starts at the roots on the left and follows every arrow. The two objects on the bottom right point to each other, but no root leads to them.'],
          mermaid: 'flowchart LR\n  subgraph ROOTS["GC roots"]\n    L["local variable: order"]\n    S["static field: config"]\n  end\n  O["Order"] --> CU["Customer"]\n  CU --> AD["Address"]\n  O --> IT["List of items"]\n  CF["Config"]\n  L --> O\n  S --> CF\n  OC["old Cart: garbage"] --> OI["old Item: garbage"]\n  OI --> OC',
          diagramNote: 'Reachable: Order, Customer, Address, the list and Config. Garbage: the old cart and the old item, although they point to each other.'
        },
        {
          title: 'Mark and sweep in a few lines of Java',
          text: [
            'This program plays garbage collector on a pretend heap. Each object name maps to the names it points to. `mark` follows every arrow from the root and remembers what it saw. Whatever is left unmarked is garbage.',
            'The `if (!marked.add(name))` check stops at objects that are already marked. That is what makes the cycle between `oldCart` and `oldItem` harmless: the GC never loops forever.'
          ],
          code: `import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class MarkSweep {
    // Each object name maps to the names it points to (its fields).
    static Map<String, List<String>> heap = new LinkedHashMap<>();

    static void mark(String name, Set<String> marked) {
        if (!marked.add(name)) {
            return;                              // already marked: stop (handles cycles)
        }
        for (String target : heap.get(name)) {
            mark(target, marked);                // follow every arrow
        }
    }

    public static void main(String[] args) {
        heap.put("order", List.of("customer", "items"));
        heap.put("customer", List.of("address"));
        heap.put("items", List.of());
        heap.put("address", List.of());
        heap.put("oldCart", List.of("oldItem"));   // nothing points to oldCart
        heap.put("oldItem", List.of("oldCart"));   // a cycle: they point to each other

        List<String> roots = List.of("order");     // e.g. a local variable in main
        Set<String> marked = new LinkedHashSet<>();
        for (String root : roots) {
            mark(root, marked);
        }

        List<String> garbage = new ArrayList<>(heap.keySet());
        garbage.removeAll(marked);
        System.out.println("reachable (keep): " + marked);
        System.out.println("garbage (sweep):  " + garbage);
    }
}`,
          fileName: 'MarkSweep.java',
          output: `reachable (keep): [order, customer, address, items]
garbage (sweep):  [oldCart, oldItem]`,
          tip: '`mark` is a [recursive](../recursion/index.html) method: it marks one object and then calls itself for every object that one points to.'
        },
        {
          title: 'The three jobs of a collection',
          mermaid: 'flowchart LR\n  A["Heap is getting full"] --> B["Mark: follow arrows from the roots"]\n  B --> C["Sweep: unmarked memory is free again"]\n  C --> D["Compact: move living objects together"]\n  D --> E["Program goes on with free room"]',
          text: [
            'Real collectors add a third job: **compacting**. They move the living objects close together, so the free memory is one big block and `new` can hand out room quickly.',
            'Moving an object changes its address. The JVM updates every reference to it while it does that. Your program never notices: a reference is not a number you can see or keep.'
          ]
        },
        {
          title: 'Myths and facts',
          table: {
            head: ['Myth', 'Fact'],
            rows: [
              ['"`x = null` deletes the object."', 'It removes one arrow. The object is freed later, and only if no other arrow points to it.'],
              ['"`System.gc()` frees memory now."', 'It is a request. The JVM may ignore it (`-XX:+DisableExplicitGC`). Never call it in real programs.'],
              ['"Two objects that point to each other never die."', 'They die together when no root reaches them. Java does not count references.'],
              ['"Java has no memory leaks."', 'It has: objects that are still reachable but never used again. See the lesson "Memory Leaks in Java".'],
              ['"The GC closes my files."', 'No. It frees memory only. Close files and connections yourself (next section).']
            ]
          }
        },
        {
          title: 'Memory is collected, files are not',
          text: [
            'A file, a network connection or a database connection is a **resource** of the operating system, not only an object on the heap. The GC has no idea when you are done with it, and it may run much later or never.',
            'So you close resources yourself, at a clear moment. The safe way is **try-with-resources**: every object made in the parentheses of `try (…)` is closed when the block ends, even after an exception. Any class that implements `AutoCloseable` works.'
          ],
          code: `public class CloseTap {
    public static void main(String[] args) {
        try (Tap tap = new Tap("kitchen")) {
            tap.use();
        }                                   // close() runs here, at once
        System.out.println("after the try block");
    }
}

// Stands for a file or a network connection: something outside the JVM's memory.
class Tap implements AutoCloseable {
    String room;

    Tap(String room) {
        this.room = room;
        System.out.println(room + " tap: open");
    }

    void use() {
        System.out.println(room + " tap: water runs");
    }

    @Override
    public void close() {
        System.out.println(room + " tap: closed");
    }
}`,
          fileName: 'CloseTap.java',
          output: `kitchen tap: open
kitchen tap: water runs
kitchen tap: closed
after the try block`,
          warn: 'Old code sometimes overrides `finalize()` to clean up "when the GC removes the object". It is deprecated: it may run very late or never. Use try-with-resources.'
        }
      ],
      technical: [
        'HotSpot finds roots in the frames of every thread (using maps that `javac` and the JIT keep of which slots hold references), in static fields, in JNI references from native code, and in a few JVM-internal places. Marking is a walk over the object graph from those roots.',
        'The default collector since Java 9 is **G1** ("garbage first"). It splits the heap into many equal **regions** (on our 6 GB test heap each is 4 MB) and collects the regions with the most garbage first. Other collectors are **ZGC** (very short pauses, for big heaps), **Parallel** (high throughput) and **Serial** (small, one thread). You pick one with a flag like `-XX:+UseZGC`.',
        'Weak references are part of `java.lang.ref`. There are also **soft** references (cleared only when memory is low, useful for caches) and **phantom** references (used by `java.lang.ref.Cleaner` for clean-up actions). All of them tell the GC "this arrow does not keep the object alive".'
      ],
      tryIt: {
        steps: [
          'Save the example as `Reachability.java` and run `java Reachability.java`.',
          'Remove the line `dropped = null;` and run again.',
          'Put the line back. Run it with `java -Xlog:gc Reachability.java`.'
        ],
        see: 'First `after GC:  kept, null`. Without `dropped = null` it says `after GC:  kept, dropped`, because the object is still reachable. With `-Xlog:gc` you also see a line with `Pause Full (System.gc())`.'
      },
      check: [
        { q: 'Name three kinds of GC roots.', a: 'Local variables in the frames of running threads, static fields of loaded classes, and the running threads themselves.' },
        { q: 'Two objects point to each other, and nothing else points to them. Are they collected?', a: 'Yes. The GC starts from the roots. No path leads to them, so both are garbage. A cycle does not keep objects alive.' },
        { q: 'Why do you still close files when Java has a garbage collector?', a: 'The GC frees memory, not operating-system resources, and you do not know when it runs. Close files at a clear moment with try-with-resources.' }
      ],
      keyPoints: [
        'You never free objects by hand; the GC frees unreachable ones.',
        'Reachable means: a chain of references leads from a GC root to the object.',
        'GC roots: locals in running frames, static fields, running threads.',
        'Mark the living, sweep the rest, compact the survivors.',
        'Cycles are collected; files and connections are not closed by the GC.'
      ],
      commonMistakes: [
        'Calling `System.gc()` "to clean up": it is only a request and can make the program slower. Remove it and let the JVM decide.',
        'Setting every local to `null` at the end of a method: the frame disappears at `return` anyway. Only clear long-lived references (fields, lists).',
        'Relying on the GC to close files: `new FileReader("a.txt")` without `close()` keeps the file open. Use `try (FileReader in = new FileReader("a.txt")) { … }`.',
        'Overriding `finalize()` for clean-up: deprecated and unreliable. Implement `AutoCloseable` and use try-with-resources.'
      ],
      related: ['heap-objects', 'generations', 'memory-leaks', 'Reading and writing files']
    }
  ]);
})();
