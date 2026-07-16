Java.topics.gettingStarted = Java.topics.gettingStarted || {};

const ubuntuGlossary = [
  { term: 'Ubuntu', definition: 'A popular Linux distribution. These lessons assume the student is using Ubuntu.' },
  { term: 'terminal', definition: 'The text-based app where you run commands such as java --version or javac HelloJava.java.' },
  { term: 'apt', definition: 'Ubuntu’s package manager command for installing and updating software from Ubuntu repositories.' },
  { term: 'JDK', definition: 'Java Development Kit: compiler, runtime, standard library, and tools for writing Java.' },
  { term: 'JRE', definition: 'Java Runtime Environment: enough to run Java apps, but not the full compiler toolset beginners need.' },
  { term: 'PATH', definition: 'A Linux environment variable that tells the terminal where to find commands.' },
  { term: 'JAVA_HOME', definition: 'An environment variable some Java tools use to locate the installed JDK.' }
];

Java.topics.gettingStarted.lessons = [
  {
    id: 'jdk-21-install',
    num: '01',
    title: 'JDK 21 Install',
    category: 'setup',
    icon: '21',
    tagline: 'Use the long-term support JDK',
    definition: 'On Ubuntu, install the JDK with apt so the terminal can find java and javac. A JDK is the full Java Development Kit: compiler, runtime, standard library, and tools.',
    realWorld: 'The JDK is the full kitchen and toolbox: compiler, runtime, standard library, and tools. The JRE is closer to the appliance that can run finished Java programs.',
    why: 'Beginners install the JDK because writing Java requires both building with javac and running with java.',
    howThink: 'If you can run java but not javac, you can run some Java programs but you are missing the tool that compiles your own source files.',
    whenUse: 'Install and verify the JDK before every first Java project on Ubuntu.',
    syntax: 'Open the Ubuntu terminal, update package metadata, install OpenJDK 21, then verify both java and javac report version 21.',
    exampleLabel: 'Ubuntu Terminal',
    codeLanguage: 'bash',
    fileName: 'ubuntu-install.sh',
    code: `sudo apt update
sudo apt install openjdk-21-jdk

java --version
javac --version`,
    keyPoints: [
      'These lessons assume Ubuntu Linux.',
      'Install a JDK, not just a JRE: use sudo apt install openjdk-21-jdk.',
      'Confirm the install in the terminal with java --version and javac --version.',
      'Both commands should report version 21.x.'
    ],
    commonMistakes: [
      'Installing multiple JDKs and accidentally using an older one.',
      'Forgetting to open a new terminal after changing PATH or JAVA_HOME.',
      'Copying preview-feature examples that a normal JDK 21 compile will reject.'
    ],
    related: ['javac and java', 'First Program'],
    glossary: ubuntuGlossary
  },
  {
    id: 'javac-java',
    num: '02',
    title: 'javac and java',
    category: 'setup',
    icon: '⌁',
    tagline: 'Compiler first, launcher second',
    definition: 'javac turns .java source code into .class bytecode. java starts the JVM and runs a class that has a main method.',
    realWorld: 'Think of javac as the translator that turns your .java recipe into JVM bytecode, and java as the command that starts the kitchen engine to run it.',
    why: 'Java separates checking/building from running so compiler errors can be caught before the program starts.',
    howThink: 'First translate source code with javac. Then run the compiled class name with java.',
    whenUse: 'Use this two-command loop for single-file beginner programs before Maven or Gradle enter the picture.',
    syntax: 'On Ubuntu, run these commands from the folder containing the file: javac ToolCheck.java then java ToolCheck.',
    fileName: 'ToolCheck.java',
    code: `public class ToolCheck {
    public static void main(String[] args) {
        System.out.println("javac compiled me.");
        System.out.println("java is running me.");
    }
}`,
    keyPoints: [
      'Compile with javac ToolCheck.java.',
      'Run with java ToolCheck.',
      'Do not include .class when using the java launcher.',
      'The public class name must match the file name.'
    ],
    commonMistakes: [
      'Running java ToolCheck.java after compiling instead of java ToolCheck.',
      'Naming the file toolcheck.java while the public class is ToolCheck.',
      'Assuming Java runs directly like a shell script.'
    ],
    related: ['Compile and Run Flow', 'First Program'],
    glossary: ubuntuGlossary
  },
  {
    id: 'project-layout',
    num: '03',
    title: 'Project Layout',
    category: 'setup',
    icon: '▦',
    tagline: 'Keep source files predictable',
    definition: 'A project layout is the folder structure that tells humans and tools where source files, compiled output, and notes belong.',
    realWorld: 'It is like labeled drawers in a desk. You can work without them for one paper, but structure matters as soon as there are several files.',
    syntax: 'On Ubuntu, create folders with mkdir -p src out. Compile with javac -d out src/ProjectLayout.java and run with java -cp out ProjectLayout.',
    exampleLabel: 'Ubuntu Terminal + Java',
    codeLanguage: 'bash',
    fileName: 'project-layout.sh',
    code: `mkdir -p src out
nano src/ProjectLayout.java
javac -d out src/ProjectLayout.java
java -cp out ProjectLayout`,
    keyPoints: [
      'Small beginner projects can start with one .java file.',
      'A common simple layout is src/ for source and out/ for compiled classes.',
      'Packages later map to folders under src/.',
      'Build tools are useful later, but not required for the basics.'
    ],
    commonMistakes: [
      'Mixing generated .class files into source folders forever.',
      'Starting with a complex build setup before understanding javac.',
      'Moving files into package folders before declaring the package name.'
    ],
    related: ['Packages', 'Compile and Run Flow'],
    glossary: ubuntuGlossary
  },
  {
    id: 'main-method',
    num: '04',
    title: 'main',
    category: 'firstRun',
    icon: '▶',
    tagline: 'The program entry point',
    definition: 'main is the method the Java launcher looks for when it starts a command-line program.',
    realWorld: 'It is the front door of a building. There may be many rooms inside, but visitors need one official place to enter.',
    syntax: 'The command java MainExample asks the JVM to load MainExample.class and call public static void main(String[] args).',
    fileName: 'MainExample.java',
    code: `public class MainExample {
    public static void main(String[] args) {
        System.out.println("This line runs first.");
    }
}`,
    keyPoints: [
      'Use public static void main(String[] args).',
      'The JVM calls main without creating your class first.',
      'args holds command-line arguments.',
      'Every command-line app needs one reachable main method.'
    ],
    commonMistakes: [
      'Writing Main instead of main.',
      'Leaving out static and wondering why Java cannot launch the class.',
      'Changing String[] args before understanding method signatures.'
    ],
    related: ['First Program', 'Methods'],
    glossary: ubuntuGlossary
  },
  {
    id: 'first-program',
    num: '05',
    title: 'First Program',
    category: 'firstRun',
    icon: 'J',
    tagline: 'Print a result you can see',
    definition: 'A first Java program is a tiny class with main that performs one visible action, usually printing text.',
    realWorld: 'It is the first light switch test after wiring a room. You are proving the whole path works.',
    syntax: 'On Ubuntu, save the file, open the terminal in that folder, run javac HelloJava.java, then run java HelloJava.',
    fileName: 'HelloJava.java',
    code: `public class HelloJava {
    public static void main(String[] args) {
        System.out.println("Hello, Java 21!");
    }
}`,
    keyPoints: [
      'Save this as HelloJava.java.',
      'Compile with javac HelloJava.java.',
      'Run with java HelloJava.',
      'System.out.println prints a line to the terminal.'
    ],
    commonMistakes: [
      'Saving the file with a different name from the public class.',
      'Forgetting the closing brace at the end.',
      'Typing printIn with a capital I instead of println with a lowercase l.'
    ],
    related: ['Compile and Run Flow', 'Syntax Fundamentals'],
    glossary: ubuntuGlossary
  },
  {
    id: 'compile-run-flow',
    num: '06',
    title: 'Compile and Run Flow',
    category: 'firstRun',
    icon: '⇢',
    tagline: 'Source code becomes bytecode',
    definition: 'The compile/run flow is the two-step path from source code to executed program: javac creates bytecode, then java runs it on the JVM.',
    realWorld: 'It is like writing a recipe, compiling it into clear kitchen instructions, then letting the JVM engine perform those instructions.',
    why: 'The flow makes Java errors easier to place: compile-time problems happen during javac, runtime problems happen after java starts the program.',
    howThink: 'Source code becomes bytecode; bytecode becomes a running program inside the JVM.',
    whenUse: 'Use the flow every time you edit a beginner file: save, compile, run, read feedback, edit again.',
    syntax: 'Typical Ubuntu beginner loop: edit in nano or VS Code, compile in the terminal with javac, run with java, read errors, edit again.',
    fileName: 'Flow.java',
    code: `public class Flow {
    public static void main(String[] args) {
        String source = "Flow.java";
        String bytecode = "Flow.class";
        System.out.println(source + " -> javac -> " + bytecode);
        System.out.println(bytecode + " -> java -> running program");
    }
}`,
    keyPoints: [
      'The .java file is source code.',
      'The .class file is JVM bytecode.',
      'The java command runs a class by name.',
      'Compiler errors happen before the program runs.'
    ],
    commonMistakes: [
      'Trying to run code before compiling after a change.',
      'Deleting source files because .class files appeared.',
      'Confusing compile-time errors with runtime errors.'
    ],
    related: ['javac and java', 'Syntax Fundamentals'],
    glossary: ubuntuGlossary
  }
];
