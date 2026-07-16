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

function singleFilePracticeCommands(folder, fileName, className) {
  return [
    {
      label: 'Create and enter the practice folder',
      note: 'Start from the terminal. This keeps beginner files away from downloads, desktop clutter, and unrelated projects.',
      command: `mkdir -p ~/java-practice/${folder}
cd ~/java-practice/${folder}`
    },
    {
      label: 'Create the Java file and open it',
      note: 'The file name must match the public class name in the snippet.',
      command: `touch ${fileName}
code ${fileName}`
    },
    {
      label: 'Paste the lesson code and save',
      note: 'Paste the Java code from the example panel into VS Code, then save the file before compiling.',
      command: `# Paste the code into ${fileName}
# Save in VS Code with Ctrl+S`
    },
    {
      label: 'Compile from the same folder',
      note: 'javac reads the .java source file and creates a .class bytecode file next to it.',
      command: `javac ${fileName}`
    },
    {
      label: 'Run the class name',
      note: 'Use the class name only. Do not type .java or .class after it.',
      command: `java ${className}`
    }
  ];
}

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
    commands: [
      {
        label: 'Open the Ubuntu terminal and refresh apt',
        note: 'This updates Ubuntu package metadata before installation.',
        command: 'sudo apt update'
      },
      {
        label: 'Install the full JDK',
        note: 'Use the JDK package because beginners need both java and javac.',
        command: 'sudo apt install openjdk-21-jdk'
      },
      {
        label: 'Verify the Java runtime',
        note: 'The java command runs compiled Java programs. It should report version 21.x.',
        command: 'java --version'
      },
      {
        label: 'Verify the Java compiler',
        note: 'The javac command compiles your .java files. It should also report version 21.x.',
        command: 'javac --version'
      }
    ],
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
    syntax: 'On Ubuntu, create a practice folder, create ToolCheck.java, open it in VS Code, paste the Java code, save, compile with javac ToolCheck.java, then run with java ToolCheck.',
    fileName: 'ToolCheck.java',
    code: `public class ToolCheck {
    public static void main(String[] args) {
        System.out.println("javac compiled me.");
        System.out.println("java is running me.");
    }
}`,
    commands: singleFilePracticeCommands('getting-started', 'ToolCheck.java', 'ToolCheck'),
    keyPoints: [
      'Work from the folder that contains ToolCheck.java.',
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
    syntax: 'On Ubuntu, create one project folder with src/ for source files and out/ for compiled bytecode. Put ProjectLayout.java in src/, compile into out/, then run with java -cp out ProjectLayout.',
    fileName: 'src/ProjectLayout.java',
    code: `public class ProjectLayout {
    public static void main(String[] args) {
        System.out.println("Source file: src/ProjectLayout.java");
        System.out.println("Compiled output folder: out/");
    }
}`,
    commands: [
      {
        label: 'Create the project folders',
        note: 'Use one outer folder for this lesson, then keep source code and compiled output separate inside it.',
        command: `mkdir -p ~/java-practice/project-layout/src ~/java-practice/project-layout/out
cd ~/java-practice/project-layout`
      },
      {
        label: 'Create the source file and open it',
        note: 'The source file lives under src/ because it is code you write and keep.',
        command: `touch src/ProjectLayout.java
code src/ProjectLayout.java`
      },
      {
        label: 'Paste the lesson code and save',
        note: 'Paste the Java code from the example panel into src/ProjectLayout.java, then save before compiling.',
        command: `# Paste the code into src/ProjectLayout.java
# Save in VS Code with Ctrl+S`
      },
      {
        label: 'Compile into the output folder',
        note: '-d out tells javac to put generated .class files in out/ instead of mixing them into src/.',
        command: 'javac -d out src/ProjectLayout.java'
      },
      {
        label: 'Run from the compiled output',
        note: '-cp out tells java where to find ProjectLayout.class.',
        command: 'java -cp out ProjectLayout'
      }
    ],
    keyPoints: [
      'Small beginner projects can start with one .java file.',
      'A common simple layout is src/ for source and out/ for compiled classes.',
      'Run javac and java from the project folder, not from inside src/.',
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
    syntax: 'Create MainExample.java, paste the code, save, compile with javac MainExample.java, then run java MainExample. The java command asks the JVM to load MainExample.class and call public static void main(String[] args).',
    fileName: 'MainExample.java',
    code: `public class MainExample {
    public static void main(String[] args) {
        System.out.println("This line runs first.");
    }
}`,
    commands: singleFilePracticeCommands('getting-started', 'MainExample.java', 'MainExample'),
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
    syntax: 'On Ubuntu, make a practice folder, create HelloJava.java, open it with code HelloJava.java, paste the code, save, compile with javac HelloJava.java, then run java HelloJava.',
    fileName: 'HelloJava.java',
    code: `public class HelloJava {
    public static void main(String[] args) {
        System.out.println("Hello, Java 21!");
    }
}`,
    commands: singleFilePracticeCommands('getting-started', 'HelloJava.java', 'HelloJava'),
    keyPoints: [
      'Save this as HelloJava.java.',
      'Open the file with code HelloJava.java or use another editor if VS Code is not installed.',
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
    syntax: 'Typical Ubuntu beginner loop: create a folder, create the .java file, open it in VS Code, paste or edit code, save, compile in the terminal with javac, run with java, read errors, edit again.',
    fileName: 'Flow.java',
    code: `public class Flow {
    public static void main(String[] args) {
        String source = "Flow.java";
        String bytecode = "Flow.class";
        System.out.println(source + " -> javac -> " + bytecode);
        System.out.println(bytecode + " -> java -> running program");
    }
}`,
    commands: singleFilePracticeCommands('getting-started', 'Flow.java', 'Flow'),
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
