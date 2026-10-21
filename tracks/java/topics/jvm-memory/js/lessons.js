(function () {
  Java.addCoreTopic('jvm-memory', {
    badge: 'Topic 19 · Java runtime',
    label: 'Runtime',
    headline: 'JVM and memory,',
    accent: 'what runs Java.',
    intro: 'See what happens after javac: bytecode, the JVM and garbage collection. Stack and heap live in Types & Variables.',
    overview: 'Bytecode first, then how the JVM cleans up objects you no longer use.',
    tryIt: {
      steps: [
        'Compile any program, for example `javac HelloJava.java`.',
        'Run `javap -c HelloJava` to peek at the bytecode.',
        'Run `java -Xlog:gc HelloJava` to see garbage collection messages.'
      ],
      see: 'lines like `getstatic` and `invokevirtual` (bytecode), then a few `[gc]` log lines.'
    },
    check: [
      { q: 'What does the JVM run: the .java file or the .class file?', a: 'The .class file. javac turns .java into .class bytecode first.' },
      { q: 'When can the garbage collector remove an object?', a: 'When no variable, field or list points to it any more. It is unreachable.' },
      { q: 'Does garbage collection close open files for you?', a: 'No. Close files yourself, best with try-with-resources.' }
    ]
  }, [
    {
      id: 'jvm-bytecode',
      title: 'JVM and Bytecode',
      category: 'concept',
      icon: 'JVM',
      tagline: 'Compile once, run on the JVM',
      definition: 'javac compiles .java source files into .class bytecode. The JVM loads and runs that bytecode.',
      realWorld: 'The JDK is the full kitchen and toolbox. javac is the recipe compiler. The JVM is the kitchen engine that follows the compiled recipe.',
      why: 'This split lets Java check source code before running it and lets bytecode run on any machine that has a compatible JVM.',
      howThink: 'Write .java for humans, compile to .class for the JVM, then launch the class name in the Ubuntu terminal.',
      whenUse: 'Use this model any time you see a .class file appear, a compiler error, or the java command asking for a class name.',
      syntax: 'javac Tool.java creates Tool.class. java Tool starts the JVM and runs main.',
      codeLanguage: 'bash',
      fileName: 'jvm-flow.sh',
      code: `javac MemoryDemo.java
ls
java MemoryDemo`,
      commands: [
        {
          label: 'Compile source',
          note: 'javac translates source code into JVM bytecode.',
          command: 'javac MemoryDemo.java'
        },
        {
          label: 'Run bytecode',
          note: 'java starts the JVM and runs the class with main.',
          command: 'java MemoryDemo'
        }
      ],
      visualLabel: 'JDK, JRE, JVM, and Bytecode',
      visualHtml: `
          <div class="venn-runtime">
            <div class="runtime-card"><strong>JDK</strong><p>Full developer toolbox: javac, java, standard library, and tools.</p></div>
            <div class="runtime-card"><strong>JRE</strong><p>Runtime pieces needed to run Java programs.</p></div>
            <div class="runtime-card"><strong>JVM</strong><p>The engine that loads and executes bytecode.</p></div>
          </div>
          <div class="flow-diagram" style="margin-top:14px">
            <div class="flow-node"><strong>Source code</strong><span>MemoryDemo.java</span></div>
            <div class="flow-arrow">-> javac -></div>
            <div class="flow-node"><strong>Bytecode</strong><span>MemoryDemo.class</span></div>
            <div class="flow-arrow">-> java -></div>
            <div class="flow-node"><strong>JVM</strong><span>running program</span></div>
          </div>
          <div class="diagram-note">The browser shows this path; Ubuntu Terminal actually runs the commands.</div>`,
      keyPoints: [
        'The JVM runs bytecode, not raw .java source after compilation.',
        'The JDK includes javac and the runtime tools beginners need.',
        'The JRE is runtime-only; beginners should install the JDK on Ubuntu.',
        'Class loading finds the classes your program needs.',
        'Java 21 LTS keeps runtime behavior stable for learners.'
      ],
      commonMistakes: [
        'Running java with the .class suffix.',
        'Deleting .class files then expecting java ClassName to work.',
        'Confusing JDK, JRE, JVM, javac, and java.'
      ],
      related: ['Getting Started on Ubuntu', 'Debugging']
    },
    {
      id: 'gc',
      title: 'Garbage Collection',
      category: 'habits',
      icon: 'GC',
      tagline: 'Unused objects are cleaned later',
      definition: 'Garbage collection frees heap memory of objects that nothing points to any more. Stack, heap and references are explained in [Types & Variables](../types-and-variables/index.html).',
      realWorld: 'If no desk note, field, or collection still has the storage label, the JVM can eventually clear that storage space.',
      why: 'Automatic memory cleanup lets beginners focus on object relationships instead of manually freeing ordinary Java objects.',
      howThink: 'Reachable means there is still a path from running code to the object. Unreachable means the program has lost every path to it.',
      whenUse: 'Think about reachability when large lists, caches, or long-running programs keep more objects than expected.',
      syntax: 'Set references to null only when it actually shortens object lifetime; most beginner code should rely on scope.',
      fileName: 'GarbageCollectionDemo.java',
      code: `public class GarbageCollectionDemo {
    static String makeMessage() {
        String temporary = "practice";
        return temporary.toUpperCase();
    }

    public static void main(String[] args) {
        String message = makeMessage();
        System.out.println(message);
    }
}`,
      visualLabel: 'Garbage Collection Reachability',
      visualHtml: `
          <div class="gc-diagram">
            <div class="memory-box"><strong>main frame</strong><span>message reference</span></div>
            <div class="memory-arrow">-></div>
            <div class="memory-box"><strong>"PRACTICE"</strong><span>reachable, keep it</span></div>
            <div class="memory-box lost"><strong>temporary old object</strong><span>unreachable, collectible later</span></div>
          </div>
          <div class="diagram-note">Garbage collection is automatic, but files and sockets still need closing because they are operating-system resources.</div>`,
      keyPoints: [
        'Garbage collection is automatic.',
        'Reachability matters more than manual cleanup for normal objects.',
        'Files and sockets still need closing because they are operating-system resources.'
      ],
      commonMistakes: [
        'Calling System.gc() as a normal cleanup strategy.',
        'Confusing memory cleanup with closing files.',
        'Keeping unnecessary references in long-lived collections.'
      ],
      related: ['I/O Basics', 'Collections']
    }
  ]);
})();
