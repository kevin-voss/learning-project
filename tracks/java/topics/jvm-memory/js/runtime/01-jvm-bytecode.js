// JVM & Memory, lesson 1: what the JVM is and what happens from `java Main` to the first output.
(function () {
  Java.addCoreTopic('jvm-memory', {
    badge: 'Topic 20 · Java runtime',
    label: 'Runtime',
    headline: 'JVM and memory,',
    accent: 'what runs Java.',
    intro: 'See what happens after `javac`: bytecode, the JVM, the stack, the heap and the garbage collector that cleans up after you. The first picture of stack and heap lives in [Types & Variables](../types-and-variables/index.html); this topic goes all the way down.',
    overview: 'From `java Main` to the first line of output → reading bytecode with `javap -c` → the memory areas → stack frames → objects on the heap, step by step → garbage collection and GC roots → generations and GC pauses → memory leaks → `OutOfMemoryError` and `StackOverflowError`. Deeper: JVM options and measuring memory, strings in memory.',
    tryIt: {
      steps: [
        'Save the `Add` program from the lesson "Reading Bytecode with javap" as `Add.java`. Compile it with `javac Add.java`.',
        'Run `javap -c Add` and find the `iadd` line inside `add`.',
        'Save `ShortLived.java` from the lesson "Generations and GC Pauses". Run it with `java -Xlog:gc ShortLived`.',
        'Run it again with a tiny heap: `java -Xlog:gc -Xmx64m ShortLived`.',
        'Run `java -Xmx64m FillHeap` with the `FillHeap` program from "OutOfMemoryError and StackOverflowError".'
      ],
      see: 'Bytecode lines like `iload_0`, `iload_1`, `iadd`, `ireturn`. Then one `Pause Young` line, then several with the small heap. Last: `caught: Java heap space`.'
    },
    check: [
      { q: 'What does the JVM run: the `.java` file or the `.class` file?', a: 'The `.class` file. `javac` turns the `.java` source into bytecode first. The JVM loads, verifies and runs that bytecode.' },
      { q: 'Where do local variables live, and where do objects live?', a: 'Local variables (and parameters) live in the **stack frame** of their method, on the stack of the thread that runs it. Every object made with `new` lives on the **heap**. A local variable of a class type holds only a reference (an arrow) to the object.' },
      { q: 'When may the garbage collector remove an object?', a: 'When it is **unreachable**: no chain of references leads to it from a GC root (a local variable in a running method, a static field, a running thread). Two objects that only point to each other are unreachable too.' },
      { q: 'Your program keeps adding to a `static List` and never removes anything. What happens over time?', a: 'A **memory leak**. The static field is a GC root, so every element stays reachable forever. The heap fills up until the JVM throws `OutOfMemoryError: Java heap space`.' },
      { q: 'Does garbage collection close open files for you?', a: 'No. The garbage collector only frees memory. Files and network connections are operating-system resources: close them yourself, best with try-with-resources from [Reading and writing files](../io-basics/index.html).' }
    ]
  }, [
    {
      id: 'jvm-bytecode',
      title: 'The JVM: From java Main to the First Line',
      category: 'concept',
      icon: 'JVM',
      tagline: 'Compile once, run on the JVM',
      realWorld: 'A music box with a paper roll. Someone punches holes into the roll (that is `javac`). The music box reads the holes and plays the song (that is the JVM). The same roll plays in every music box of that kind.',
      kid: [
        'You write your program in words that people can read. The computer cannot play those words directly.',
        'So a helper called `javac` turns your words into a paper roll with holes. That roll is the `.class` file.',
        'Then you start the music box: `java`. It takes your roll, checks that nobody punched wrong holes, and plays it from the beginning.',
        'If one part of the song repeats again and again, the music box learns it by heart. Then it plays that part much faster.'
      ],
      definition: 'The **JVM** (Java Virtual Machine) is the program that runs Java bytecode. `javac` compiles `.java` source into `.class` bytecode; `java Main` starts a JVM that loads, checks and runs that bytecode.',
      explain: [
        '**Bytecode** is a list of small instructions for an imaginary computer, the "virtual machine". It is not the machine code of your real processor. That is why the same `.class` file runs on Linux, Windows and a Mac: each has its own JVM that understands the same bytecode.',
        'When you type `java HelloJvm`, the operating system starts the JVM as a normal program. The JVM finds `HelloJvm.class` and **loads** it: it reads the file and builds a description of the class in memory. This work is done by a **class loader**.',
        'Next comes **verification**. The JVM checks the bytecode before it runs a single instruction: no jumps into the middle of nowhere, no `int` used as a reference, no stack that grows wrong. A broken or tampered `.class` file is refused with a `VerifyError`.',
        'Then the class is **initialized**: its `static` fields get their start values and its `static { … }` blocks run. Only now does `main` start.',
        'At first the **interpreter** runs the bytecode one instruction at a time. It is quick to start but slow per instruction. The JVM counts how often each method runs. A method that runs very often is "hot", and the **JIT compiler** (just-in-time compiler) translates it into real machine code. From then on that method runs at full speed.',
        'Classes are loaded **lazily**: only when the program uses them the first time. A class you never touch is never loaded.'
      ],
      why: 'The split into bytecode and JVM gives Java two things: one compiled program runs on every system with a JVM, and the JVM can check the code for safety before it runs.',
      whenUse: 'Use this picture whenever you see a `.class` file appear, a `ClassNotFoundException`, a slow first run that gets faster, or the `java` command asking for a class name.',
      syntax: '`javac Name.java` → creates `Name.class` (bytecode). `java Name` → starts the JVM, loads `Name`, runs `main`. Write the class name without `.class`.',
      fileName: 'HelloJvm.java',
      code: `public class HelloJvm {
    // A static block runs once, when the class is initialized.
    static {
        System.out.println("1. HelloJvm is loaded and initialized");
    }

    public static void main(String[] args) {
        System.out.println("2. main starts");
        Helper.greet();                 // the first use of Helper
        System.out.println("4. main ends");
    }
}

class Helper {
    static {
        System.out.println("3a. Helper is loaded on first use");
    }

    static void greet() {
        System.out.println("3b. Hello from Helper");
    }
}`,
      output: `1. HelloJvm is loaded and initialized
2. main starts
3a. Helper is loaded on first use
3b. Hello from Helper
4. main ends`,
      codeSummary: 'Each class prints a line when the JVM initializes it. The order of the output shows that `HelloJvm` is ready before `main` runs, and that `Helper` is loaded only when `main` uses it.',
      codeExplanation: [
        { label: 'Line 3', code: 'static {', text: 'A **static initializer block**. The JVM runs it exactly once, when it initializes the class. We use it here as a little spy that tells us *when* that happens.' },
        { label: 'Line 4', code: 'System.out.println("1. HelloJvm is loaded and initialized");', text: 'This is the very first line of output, before `main`. The JVM must load and initialize the class before it can call its `main` method.' },
        { label: 'Line 7', code: 'public static void main(String[] args) {', text: 'The entry point. `java HelloJvm` looks for exactly this method in the class you name.' },
        { label: 'Line 8', code: 'System.out.println("2. main starts");', text: 'Runs after initialization. Line 1 of the output is already printed.' },
        { label: 'Line 9', code: 'Helper.greet();', text: 'The first time the program touches `Helper`. Only now the class loader reads `Helper.class` and the JVM initializes it.' },
        { label: 'Line 14', code: 'class Helper {', text: 'A second class in the same file. It is not `public`, so it may live in `HelloJvm.java`. `javac` still writes it to its own file, `Helper.class`.' },
        { label: 'Line 16', code: 'System.out.println("3a. Helper is loaded on first use");', text: 'Printed *between* "2" and "3b": proof that classes are loaded lazily, at their first use.' },
        { label: 'Line 20', code: 'System.out.println("3b. Hello from Helper");', text: 'The method body runs only after `Helper` is fully initialized.' }
      ],
      sections: [
        {
          title: 'JDK, JRE, JVM: three words, one toolbox',
          text: ['You installed the **JDK** in [Getting started](../getting-started/index.html). Here is what is inside it and what each part does.'],
          table: {
            head: ['Name', 'What it is', 'Contains'],
            rows: [
              ['**JDK** (Java Development Kit)', 'Everything a developer needs', '`javac`, `java`, `javap`, the standard library, the JVM'],
              ['**JRE** (Java Runtime Environment)', 'Everything needed to *run* Java, nothing to compile', 'the JVM and the standard library'],
              ['**JVM** (Java Virtual Machine)', 'The engine that runs bytecode', 'class loader, verifier, interpreter, JIT compiler, garbage collector'],
              ['`javac`', 'The compiler', 'turns `.java` into `.class`'],
              ['`java`', 'The launcher', 'starts a JVM and runs a class']
            ],
            note: 'Since Java 11, Oracle no longer offers a separate JRE. You install the JDK and get all of it.'
          }
        },
        {
          title: 'From `java HelloJvm` to the first line of output',
          text: ['These are the steps, in order. The output of the example shows the "initialize" step (line 1) happening before `main` (line 2).'],
          mermaid: 'flowchart TD\n  A["You type: java HelloJvm"] --> B["OS starts the JVM process"]\n  B --> C["Class loader reads HelloJvm.class"]\n  C --> D["Verifier checks the bytecode"]\n  D --> E["Initialize: static fields and static blocks"]\n  E --> F["main starts"]\n  F --> G["Interpreter runs bytecode"]\n  G --> H{"Method runs very often?"}\n  H -->|yes| I["JIT compiles it to machine code"]\n  H -->|no| G\n  I --> J["Hot code runs at full speed"]',
          diagramNote: 'Loading, verifying and initializing happen once per class. The loop at the bottom runs the whole time your program runs.'
        },
        {
          title: 'Who loads which class',
          text: [
            'The JVM has several class loaders. The **bootstrap** loader loads the core of Java, like `String` and `ArrayList`. The **platform** loader loads some extra JDK modules. The **application** loader, named `app`, loads your own classes from the folder or JAR you run.',
            'Every class remembers its loader. For classes from the bootstrap loader you get `null`, because that loader is built into the JVM and has no Java object.'
          ],
          code: `import java.util.ArrayList;

public class Loaders {
    public static void main(String[] args) {
        ClassLoader mine = Loaders.class.getClassLoader();
        System.out.println("Loaders   -> " + mine.getName());
        System.out.println("parent    -> " + mine.getParent().getName());
        System.out.println("String    -> " + String.class.getClassLoader());
        System.out.println("ArrayList -> " + ArrayList.class.getClassLoader());
    }
}`,
          fileName: 'Loaders.java',
          output: `Loaders   -> app
parent    -> platform
String    -> null
ArrayList -> null`,
          tip: '`Loaders.class` (with `.class` after a class name) is the `Class` object that describes the class. You can ask it questions, like "who loaded you?".'
        },
        {
          title: 'Interpreter and JIT: why a program gets faster',
          text: [
            'The program below calls `square` 100 million times. The JVM soon sees that `square` and the loop are hot and compiles them to machine code.',
            'The flag `-Xint` switches the JIT off, so only the interpreter runs. Same result, but on our test machine it is about 20 times slower: 0.08 seconds with the JIT, 1.66 seconds without. Your times will differ.'
          ],
          code: `public class HotLoop {
    static long square(long x) {
        return x * x;
    }

    public static void main(String[] args) {
        long sum = 0;
        for (long i = 0; i < 100_000_000L; i++) {
            sum += square(i % 1000);       // called 100 million times: it gets "hot"
        }
        System.out.println("sum = " + sum);
    }
}`,
          fileName: 'HotLoop.java',
          output: 'sum = 33283350000000',
          warn: 'Never measure speed with a program that runs only a few milliseconds. In that time the JIT has not started yet, so you measure the slow interpreter.'
        },
        {
          title: 'Watching the JIT at work',
          text: ['The flag `-XX:+PrintCompilation` prints a line every time the JIT compiles a method. These lines are real output from our machine (shortened). The columns are: time in milliseconds, a compile number, `%` for a loop that is compiled while it runs, the tier (3 = quick compiler C1, 4 = optimizing compiler C2), and the method.'],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `$ java -XX:+PrintCompilation HotLoop | grep HotLoop
17    8       3       HotLoop::square (4 bytes)
17    9       4       HotLoop::square (4 bytes)
18   10 %     3       HotLoop::main @ 4 (43 bytes)
18   12 %     4       HotLoop::main @ 4 (43 bytes)`,
          tip: 'Tiered compilation: the JVM first compiles a hot method quickly with C1 (tier 3). If it stays hot, C2 compiles it again, slower but much better (tier 4).'
        }
      ],
      technical: [
        'A `.class` file starts with the magic number `0xCAFEBABE`, then a version number (65 for Java 21), the **constant pool** (a table of all names, strings and numbers the class uses) and then the fields and methods with their bytecode. `java` refuses a class file whose version is newer than itself with `UnsupportedClassVersionError`.',
        'Loading has three parts: **loading** (read the bytes, create the class description), **linking** (verify the bytecode, prepare static fields with default values like `0` and `null`, resolve names to real classes and methods) and **initialization** (run the static field assignments and `static` blocks, in source order). Initialization happens on the first real use: a `new`, a static method call, or reading a static field.',
        'HotSpot, the JVM in OpenJDK, uses **tiered compilation**. Every method starts in the interpreter. After a few thousand calls or loop rounds the C1 compiler makes fast machine code that still counts calls. Very hot code then goes to C2, which inlines small methods (copies their body into the caller) and removes work it can prove is useless. If an assumption turns out wrong, the JVM throws the compiled code away and goes back to the interpreter ("made not entrant").'
      ],
      tryIt: {
        steps: [
          'Save the example as `HelloJvm.java`. Compile it with `javac HelloJvm.java`.',
          'Run `ls`. Notice that there are two new files: `HelloJvm.class` and `Helper.class`.',
          'Run `java HelloJvm`.',
          'Delete the line `Helper.greet();`, compile and run again.'
        ],
        see: 'First the five numbered lines. After the change only `1.`, `2.` and `4.`: `Helper` is never used, so it is never loaded and its static block never runs.'
      },
      check: [
        { q: 'Why does "1. HelloJvm is loaded and initialized" come before "2. main starts"?', a: 'The JVM must load, verify and initialize a class before it can call any method of it. The static block runs during initialization.' },
        { q: 'What does the JIT compiler do?', a: 'It watches which methods run often ("hot") and translates their bytecode into machine code for the real processor, so they run much faster.' },
        { q: 'Why can the same `.class` file run on Windows and on a Mac?', a: 'It contains bytecode, not machine code. Each system has its own JVM that understands the same bytecode.' }
      ],
      keyPoints: [
        '`javac` makes bytecode (`.class`). The JVM runs bytecode.',
        'Before `main`: load the class, verify the bytecode, initialize static fields and blocks.',
        'Classes are loaded lazily, at their first use.',
        'The interpreter starts fast; the JIT makes hot code fast.',
        'Every class has a class loader: `app` for yours, the bootstrap loader for `String`.'
      ],
      commonMistakes: [
        'Running `java HelloJvm.class`: the JVM looks for a class named `HelloJvm.class` and fails. Write `java HelloJvm`.',
        'Editing `HelloJvm.java` and running `java HelloJvm` without compiling again: the JVM runs the old `.class`. Run `javac` first, or start with `java HelloJvm.java`, which compiles in memory.',
        'Compiling with a newer JDK than the one that runs the program: `UnsupportedClassVersionError`. Use `javac --release 21` for a Java 21 JVM.',
        'Judging speed after a few milliseconds: the JIT has not compiled anything yet. Let the program run long enough.'
      ],
      related: ['Getting Started', 'javap-bytecode', 'memory-areas']
    }
  ]);
})();
