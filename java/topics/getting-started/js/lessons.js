Java.topics.gettingStarted = Java.topics.gettingStarted || {};

const ubuntuGlossary = [
  { term: 'Ubuntu', definition: 'A popular Linux distribution. These lessons assume the student is using Ubuntu.' },
  { term: 'terminal', definition: 'The text-based app where you run commands such as java --version or javac HelloJava.java.' },
  { term: 'command', definition: 'An instruction you type into the terminal and run by pressing Enter.' },
  { term: 'sudo', definition: 'Runs one command with administrator privileges after asking for your password.' },
  { term: 'apt', definition: 'Ubuntu’s package manager command for installing and updating software from Ubuntu repositories.' },
  { term: 'OpenJDK', definition: 'The open-source Java Development Kit used by Ubuntu packages.' },
  { term: 'JDK', definition: 'Java Development Kit: compiler, runtime, standard library, and tools for writing Java.' },
  { term: 'JRE', definition: 'Java Runtime Environment: enough to run Java apps, but not the full compiler toolset beginners need.' },
  { term: 'javac', definition: 'The Java compiler command. It turns .java source files into .class bytecode files.' },
  { term: 'java', definition: 'The Java launcher command. It starts the JVM and runs a compiled class.' },
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
    id: 'terminal-commands',
    num: '01',
    title: 'Terminal Commands',
    category: 'setup',
    icon: '$',
    tagline: 'Tell Ubuntu exactly what to do',
    definition: 'A terminal command is a text instruction you type into Ubuntu Terminal, then run by pressing Enter.',
    what: [
      'The terminal is the app.',
      'A command is the instruction.',
      'The output is Ubuntu answering back.',
      'The prompt is the line waiting for your next command.'
    ],
    realWorld: 'Think of it like this: the terminal is a walk-up help desk. You write one clear request, such as "show me this folder", and Ubuntu either does it or explains why it could not.',
    why: 'Java lessons use commands because installing tools, creating files, compiling, and running programs all happen outside the browser in the operating system.',
    howThink: 'Read commands from left to right: the first word names the tool, and the words after it are details for that tool.',
    whenUse: 'Use terminal commands whenever a lesson says to create a folder, open a file, install software, compile with javac, or run with java.',
    syntax: 'A simple command looks like tool extra-details. For example, pwd has no extra details, while cd ~/java-practice tells cd which folder to enter.',
    exampleLabel: 'Ubuntu Terminal',
    codeLanguage: 'bash',
    fileName: 'terminal-basics.sh',
    code: `pwd
mkdir -p ~/java-practice
cd ~/java-practice
ls`,
    commands: [
      {
        label: 'See where you are',
        note: 'pwd prints the current folder. It is a safe orientation command.',
        command: 'pwd'
      },
      {
        label: 'Create a practice folder',
        note: 'mkdir makes folders. -p means "also create parent folders if needed, and do not complain if the folder already exists."',
        command: 'mkdir -p ~/java-practice'
      },
      {
        label: 'Move into the folder',
        note: 'cd changes the terminal location so later commands run from this folder.',
        command: 'cd ~/java-practice'
      },
      {
        label: 'List what is inside',
        note: 'ls shows files and folders in the current location.',
        command: 'ls'
      }
    ],
    keyPoints: [
      'Press Enter to run a command.',
      'The first word is usually the tool name.',
      'Spaces separate the tool from its options and inputs.',
      'If a command prints an error, read the first clear line before trying random fixes.',
      'These Java lessons assume commands are typed in Ubuntu Terminal.'
    ],
    commonMistakes: [
      'Typing commands into the browser page instead of Ubuntu Terminal.',
      'Running compile commands from the wrong folder.',
      'Ignoring the output after a command fails.'
    ],
    related: ['sudo', 'apt'],
    glossary: ubuntuGlossary
  },
  {
    id: 'sudo',
    num: '02',
    title: 'sudo',
    category: 'setup',
    icon: '#',
    tagline: 'Borrow administrator permission',
    definition: 'sudo runs one command with administrator privileges. Ubuntu asks for your password because the command may change system software or protected files.',
    what: [
      'sudo is not the installer.',
      'sudo is not Java.',
      'sudo is a permission wrapper placed before a command that needs administrator access.'
    ],
    realWorld: 'Think of it like this: your normal user account is a student locker key. sudo is asking the teacher to unlock the supply cabinet for one specific job, like installing Java.',
    why: 'Ubuntu protects system folders so ordinary commands cannot accidentally replace important software. Installing OpenJDK changes system-managed software, so apt install usually needs sudo.',
    howThink: 'Use sudo only for the one command that needs elevated permission. In sudo apt install openjdk-21-jdk, sudo gives permission and apt does the installing.',
    whenUse: 'Use sudo when Ubuntu says permission is denied for a system task, or when the lesson explicitly shows sudo apt update or sudo apt install.',
    syntax: 'Put sudo before the command that needs administrator permission: sudo apt update.',
    exampleLabel: 'Ubuntu Terminal',
    codeLanguage: 'bash',
    fileName: 'sudo-basics.sh',
    code: `whoami
sudo apt update`,
    commands: [
      {
        label: 'Check your normal user',
        note: 'whoami shows which account is running ordinary commands.',
        command: 'whoami'
      },
      {
        label: 'Run one administrator command',
        note: 'sudo asks for your password, then runs only this apt update command with administrator permission.',
        command: 'sudo apt update'
      }
    ],
    keyPoints: [
      'sudo gives temporary administrator permission to one command.',
      'You normally do not see password characters while typing a sudo password.',
      'Use sudo for installing packages, not for everyday file editing in your practice folder.',
      'sudo apt install openjdk-21-jdk means "as administrator, ask apt to install OpenJDK 21 JDK."'
    ],
    commonMistakes: [
      'Thinking sudo is the command that installs Java. apt installs; sudo only grants permission.',
      'Using sudo for every command out of habit.',
      'Assuming the password did not type because Ubuntu hides the characters.'
    ],
    related: ['apt', 'OpenJDK 21 Install'],
    glossary: ubuntuGlossary
  },
  {
    id: 'apt',
    num: '03',
    title: 'apt',
    category: 'setup',
    icon: 'pkg',
    tagline: 'Install trusted Ubuntu packages',
    definition: 'apt is Ubuntu\'s package manager command. It downloads, installs, updates, and removes software packages from Ubuntu repositories.',
    what: [
      'A package is a prepared bundle of software.',
      'A repository is a trusted software source Ubuntu knows how to use.',
      'apt is the command that talks to those repositories for you.'
    ],
    realWorld: 'Think of it like this: apt is a grocery delivery app for software. You ask for openjdk-21-jdk, Ubuntu checks its trusted shelves, downloads the right boxes, and puts the files where system tools expect them.',
    why: 'Beginners use apt so they do not manually download random Java archives, guess install folders, or wire PATH by hand before they understand the tools.',
    howThink: 'Run sudo apt update to refresh Ubuntu\'s package list, then sudo apt install package-name to install a package from that list.',
    whenUse: 'Use apt when installing Java tools on Ubuntu, such as openjdk-21-jdk, maven, or gradle.',
    syntax: 'The beginner pattern is sudo apt update first, then sudo apt install openjdk-21-jdk.',
    exampleLabel: 'Ubuntu Terminal',
    codeLanguage: 'bash',
    fileName: 'apt-basics.sh',
    code: `sudo apt update
apt search openjdk-21
sudo apt install openjdk-21-jdk
apt show openjdk-21-jdk`,
    commands: [
      {
        label: 'Refresh package information',
        note: 'apt update does not install Java. It refreshes Ubuntu\'s local list of available packages.',
        command: 'sudo apt update'
      },
      {
        label: 'Search for Java packages',
        note: 'apt search is useful when you want to see package names before installing.',
        command: 'apt search openjdk-21'
      },
      {
        label: 'Install the JDK package',
        note: 'apt install downloads OpenJDK 21 and puts java, javac, and related files into system locations.',
        command: 'sudo apt install openjdk-21-jdk'
      },
      {
        label: 'Inspect the installed package',
        note: 'apt show displays package details such as version and description.',
        command: 'apt show openjdk-21-jdk'
      }
    ],
    keyPoints: [
      'apt update refreshes package information.',
      'apt install installs a named package.',
      'openjdk-21-jdk is the package name for the Java 21 developer kit on Ubuntu.',
      'Most apt install commands need sudo because they change system software.'
    ],
    commonMistakes: [
      'Expecting sudo apt update to install Java.',
      'Installing openjdk-21-jre when the lesson needs javac from the JDK.',
      'Copying package commands meant for macOS, Windows, or another Linux distribution.'
    ],
    related: ['sudo', 'OpenJDK 21 Install'],
    glossary: ubuntuGlossary
  },
  {
    id: 'jdk-21-install',
    num: '04',
    title: 'OpenJDK 21 Install',
    category: 'setup',
    icon: '21',
    tagline: 'Use the long-term support JDK',
    definition: 'OpenJDK is the open-source Java Development Kit. On Ubuntu, install openjdk-21-jdk with apt so the terminal can find both java and javac.',
    what: [
      'OpenJDK is the Java implementation Ubuntu packages for you.',
      'JDK means Java Development Kit: compiler, runtime, standard library, and tools.',
      'Java 21 LTS is the long-term support version these lessons target.'
    ],
    realWorld: 'Think of it like this: OpenJDK is the complete beginner tool case. javac is the tool that builds your program, java is the tool that runs it, and the standard library is the useful set of parts included in the case.',
    why: 'Beginners install the JDK because writing Java requires both building with javac and running with java. A runtime-only install is not enough for compiling your own files.',
    howThink: 'If java works but javac does not, you can run some existing Java programs, but you are missing the tool that turns your own .java files into runnable bytecode.',
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
        note: 'This refreshes Ubuntu package metadata before installation. It does not install Java yet.',
        command: 'sudo apt update'
      },
      {
        label: 'Install OpenJDK 21 JDK',
        note: 'Use the JDK package because beginners need both java and javac. apt downloads and places the tools for you.',
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
      'OpenJDK is the open-source Java package Ubuntu installs.',
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
    num: '05',
    title: 'javac and java',
    category: 'setup',
    icon: '⌁',
    tagline: 'Compiler first, launcher second',
    definition: 'javac turns .java source code into .class bytecode. java starts the JVM and runs a compiled class that has a main method.',
    what: [
      'A .java file is source code humans write.',
      'javac is the compiler that checks that source code.',
      'A .class file is bytecode the JVM can load.',
      'java is the launcher that starts the JVM and runs the class.'
    ],
    realWorld: 'Think of it like this: javac is a translator that turns your rough recipe into exact kitchen instructions. java is the cook that follows those instructions and produces the visible result.',
    why: 'Java separates checking/building from running so compiler errors can be caught before the program starts.',
    howThink: 'First translate source code with javac. Then run the compiled class name with java. The file name is used when compiling; the class name is used when running.',
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
      'javac ToolCheck.java creates ToolCheck.class when compilation succeeds.',
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
    num: '06',
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
    num: '07',
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
    num: '08',
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
    num: '09',
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
