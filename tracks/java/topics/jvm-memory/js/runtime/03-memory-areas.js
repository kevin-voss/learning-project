// JVM & Memory, lesson 3: the memory areas (a stack per thread, the heap, metaspace).
(function () {
  Java.addCoreLessons('jvm-memory', [
    {
      id: 'memory-areas',
      title: 'The Memory Areas: Stack, Heap, Metaspace',
      category: 'concept',
      icon: '▦',
      tagline: 'Every value has a room where it lives',
      realWorld: 'A school. Every pupil has a small desk with a notepad (the stack). There is one big storeroom that everybody shares (the heap). And there is the office with the folder that describes every class (metaspace).',
      kid: [
        'Imagine a classroom. Every child has a little desk. On the desk lies a notepad for quick notes. When the child is done with a task, the notes are torn off and thrown away.',
        'Big things, like a painting or a model house, do not fit on a desk. They go into the big storeroom at the back. On your notepad you write only "my house is on shelf 12".',
        'In the office there is a folder for every kind of thing in the school: what a painting is, what a model house is. Everybody looks into the same folder.',
        'The JVM is like that school. Desks are the **stack**, the storeroom is the **heap**, the office folder is **metaspace**.'
      ],
      definition: 'The JVM splits its memory into areas. Each **thread** has its own **stack** for method calls and local variables. All threads share one **heap** for objects. **Metaspace** holds the description of every loaded class.',
      explain: [
        'You met the stack and the heap in [Types & Variables](../types-and-variables/index.html): primitive locals sit on the stack, objects sit on the heap, and a variable of a class type holds a **reference** (an arrow) to its object. This lesson adds the full map.',
        'A **thread** is one path of the program that runs instructions one after the other. Your program starts with one thread, called `main`. You can start more threads; they run at the same time. Each thread gets its **own stack**. Its local variables are private to it.',
        'The **stack** is a pile of **stack frames**, one per running method call. A frame holds the parameters and local variables of that call. When the method returns, its frame is removed and its locals are gone. The next lesson looks at frames closely.',
        'The **heap** is one big area shared by all threads. Every object and every array made with `new` lives there, and so do strings. Objects stay on the heap as long as something can still reach them; the **garbage collector** frees the rest.',
        '**Metaspace** holds the class descriptions: the class name, its fields, its methods and their bytecode, the constant pool. There is one description per loaded class, no matter how many objects you make. Metaspace lives outside the heap, in normal memory of the operating system.',
        'There is one more area you rarely think about: the **code cache**. It holds the machine code that the JIT compiler makes from hot methods.'
      ],
      why: 'Knowing which area holds a value explains a lot: why a local variable disappears after a method, why two variables can change the same object, why deep recursion fails and why a full heap stops a program.',
      whenUse: 'Every time you ask "where does this value live, and how long?" Also when you read an error message that names an area: `StackOverflowError`, `OutOfMemoryError: Java heap space`, `OutOfMemoryError: Metaspace`.',
      syntax: 'Local variable → stack frame of its method. `new Something()` → heap. `static` field → one copy per class. Class description and bytecode → metaspace.',
      fileName: 'MemoryAreas.java',
      code: `public class MemoryAreas {
    static int boxesMade = 0;              // static field: one copy for the whole class

    static int[] makeBox(int size) {
        int[] box = new int[size];         // the array object goes on the heap
        boxesMade++;
        return box;                        // the reference travels back to the caller
    }

    public static void main(String[] args) throws InterruptedException {
        int steps = 3;                     // local variable: in main's stack frame
        int[] first = makeBox(steps);      // reference on the stack, array on the heap

        Thread helper = new Thread(() -> {
            int size = 10;                 // lives on the helper thread's own stack
            int[] second = makeBox(size);
            System.out.println("helper: my box has " + second.length + " slots");
        });
        helper.start();                    // the helper runs at the same time as main
        helper.join();                     // main waits here until the helper is done

        System.out.println("main: my box has " + first.length + " slots");
        System.out.println("boxes made (shared static field): " + boxesMade);
        System.out.println("this thread is called: " + Thread.currentThread().getName());
    }
}`,
      output: `helper: my box has 10 slots
main: my box has 3 slots
boxes made (shared static field): 2
this thread is called: main`,
      codeSummary: 'Two threads each make one array. Each thread keeps its own local variables on its own stack. Both arrays live on the shared heap, and both threads count in the same static field.',
      codeExplanation: [
        { label: 'Line 2', code: 'static int boxesMade = 0;', text: 'A **static field** belongs to the class, not to an object. There is exactly one `boxesMade`, shared by every thread.' },
        { label: 'Line 5', code: 'int[] box = new int[size];', text: '`new` makes the array on the **heap**. The local variable `box` in the frame of `makeBox` holds only a reference to it.' },
        { label: 'Line 7', code: 'return box;', text: 'The frame of `makeBox` is removed now, and `box` with it. The array survives: the caller gets the reference and stores it.' },
        { label: 'Line 11', code: 'int steps = 3;', text: 'A primitive local variable. The value `3` itself sits in the stack frame of `main`.' },
        { label: 'Line 14', code: 'Thread helper = new Thread(() -> {', text: 'Makes a second thread. The [lambda](../interfaces/index.html) is the code that the new thread will run. The `Thread` object itself is on the heap.' },
        { label: 'Line 15', code: 'int size = 10;', text: 'This local lives on the **helper\'s own stack**. The `main` thread can never see it.' },
        { label: 'Line 19', code: 'helper.start();', text: 'The JVM creates a new stack for the helper and starts it. From now on two threads run.' },
        { label: 'Line 20', code: 'helper.join();', text: '`main` waits until the helper is done. That is why the helper\'s line always comes first in the output.' },
        { label: 'Line 23', code: 'System.out.println("boxes made (shared static field): " + boxesMade);', text: 'Prints `2`: both threads changed the same static field.' }
      ],
      sections: [
        {
          title: 'The map of JVM memory',
          text: ['Here is the whole picture for the example while the helper thread runs. Arrows are references.'],
          mermaid: 'flowchart LR\n  subgraph S1["Stack of thread main"]\n    M["main frame: steps = 3, first"]\n  end\n  subgraph S2["Stack of thread helper"]\n    H["lambda frame: size = 10, second"]\n  end\n  subgraph HEAP["Heap, shared"]\n    A1["int array, length 3"]\n    A2["int array, length 10"]\n    T["Thread object helper"]\n  end\n  subgraph META["Metaspace, shared"]\n    C["class MemoryAreas: fields, methods, bytecode"]\n  end\n  M --> A1\n  M --> T\n  H --> A2',
          diagramNote: 'Two stacks, one per thread. One heap for all objects. One class description in metaspace, no matter how many objects or threads there are.'
        },
        {
          title: 'The areas side by side',
          table: {
            head: ['Area', 'What lives there', 'How many', 'Lives how long', 'When it is full'],
            rows: [
              ['**Stack**', 'stack frames: parameters, local variables, return address', 'one per thread', 'a frame lives until its method returns', '`StackOverflowError`'],
              ['**Heap**', 'all objects and arrays, strings, the string pool', 'one per JVM', 'until the object is unreachable and the GC frees it', '`OutOfMemoryError: Java heap space`'],
              ['**Metaspace**', 'class descriptions: fields, methods, bytecode, constant pool', 'one per JVM', 'as long as the class is loaded (usually the whole run)', '`OutOfMemoryError: Metaspace`'],
              ['**Code cache**', 'machine code made by the JIT', 'one per JVM', 'as long as the compiled code is used', 'the JIT stops compiling (a warning)']
            ],
            note: 'The stack is small (usually 1 MB per thread on Linux and Windows, 2 MB on a Mac with Apple silicon). The heap is large: by default up to a quarter of your computer\'s memory.'
          }
        },
        {
          title: 'One copy per class, one copy per object',
          text: [
            'A **static** field exists once for the class. A normal field (an **instance field**) exists once in every object. Both robots below have their own `name`, but they share one `built` counter.',
            'Every object also knows its class. `getClass()` returns the `Class` object for that description, and both robots return the same one.'
          ],
          code: `public class Robots {
    public static void main(String[] args) {
        Robot first = new Robot("Bolt");
        Robot second = new Robot("Nut");

        System.out.println(first.name + " and " + second.name);
        System.out.println("robots built: " + Robot.built);
        System.out.println("same class description: " + (first.getClass() == second.getClass()));
    }
}

class Robot {
    static int built = 0;      // one copy, shared by all robots
    String name;               // one copy per robot object, on the heap

    Robot(String name) {
        this.name = name;
        built++;
    }
}`,
          fileName: 'Robots.java',
          output: `Bolt and Nut
robots built: 2
same class description: true`
        },
        {
          title: 'Where does each value of the example live?',
          table: {
            head: ['Value', 'Area', 'Why'],
            rows: [
              ['`steps` (the `3`)', 'stack of `main`', 'a primitive local variable'],
              ['`first` (the arrow)', 'stack of `main`', 'a local variable of a reference type holds only the reference'],
              ['the `int` array with 3 slots', 'heap', 'made with `new`'],
              ['`size` and `second`', 'stack of `helper`', 'locals of the code that the helper thread runs'],
              ['`boxesMade`', 'with the class, one copy', '`static`: belongs to the class, not to an object'],
              ['the bytecode of `makeBox`', 'metaspace', 'part of the class description']
            ]
          },
          tip: 'Rule of thumb: if you wrote `new`, the thing is on the heap. If you declared it inside a method, the variable is on the stack.'
        },
        {
          title: 'Why threads cannot see each other\'s locals',
          text: [
            'Each thread has its own stack, so each method call on each thread has its own frame with its own locals. Two threads can run the same method at the same time without touching each other\'s local variables.',
            'The heap and static fields are shared. If two threads change the same object at the same time, they can get in each other\'s way. In the example, `join()` makes `main` wait, so the two threads never change `boxesMade` at the same moment.'
          ],
          warn: 'Shared data on the heap plus several threads needs care (the topic of "concurrency"). For now: one thread is the safe default, and `join()` waits for a thread to finish.'
        }
      ],
      technical: [
        'In HotSpot each Java thread gets a native operating-system thread with its own stack. The size is set by `-Xss` (see the Deeper lesson on JVM options). The stack holds only frames; it never holds objects.',
        'Metaspace replaced the older "permanent generation" in Java 8. It grows as more classes are loaded and has no limit by default; `-XX:MaxMetaspaceSize` sets one. The values of static fields are stored in HotSpot together with the class\'s `Class` object, which is on the heap; the class description itself is in metaspace.',
        'The heap is split further for the garbage collector into a **young** and an **old** generation. The lesson "Generations and GC Pauses" shows why.'
      ],
      tryIt: {
        steps: [
          'Save the example as `MemoryAreas.java` and run `java MemoryAreas.java`.',
          'Remove the line `helper.join();` and run it a few times.',
          'Put `helper.join();` back. Add a third thread that also calls `makeBox(5)`, start it, join it, and run again.'
        ],
        see: 'With `join` the output is always the same. Without `join`, the helper line may come later and the count may be `1`, because `main` does not wait. With a third thread: `boxes made (shared static field): 3`.'
      },
      check: [
        { q: 'Two threads run the same method at the same time. Do they share its local variables?', a: 'No. Each thread has its own stack, so each call has its own frame with its own locals.' },
        { q: 'You make 1000 `Robot` objects. How many `built` fields exist, and how many `name` fields?', a: 'One `built` (it is `static`, one per class) and 1000 `name` fields (one per object, on the heap).' },
        { q: 'What does metaspace hold?', a: 'The descriptions of the loaded classes: names, fields, methods, their bytecode and the constant pool. Not the objects.' }
      ],
      keyPoints: [
        'Every thread has its own stack; all threads share one heap.',
        'Local variables and parameters live in stack frames; objects and arrays live on the heap.',
        'A reference variable holds an arrow; the object it points to is on the heap.',
        'Static fields exist once per class; instance fields once per object.',
        'Metaspace holds class descriptions and bytecode, outside the heap.'
      ],
      commonMistakes: [
        'Thinking `int[] box = new int[3];` puts the array on the stack: only the reference `box` is on the stack. The array is on the heap.',
        'Thinking a local variable keeps its value between calls: every call gets a fresh frame. Use a field if a value must survive the call.',
        'Expecting `static int count` to count per object: there is one copy for the class. Remove `static` for one copy per object.',
        'Starting a thread and printing its result without `join()`: the result may not be there yet. Call `thread.join()` first.'
      ],
      related: ['Types and Variables', 'stack-frames', 'heap-objects']
    }
  ]);
})();
