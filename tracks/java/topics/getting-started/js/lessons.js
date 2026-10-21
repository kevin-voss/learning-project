Java.topics.gettingStarted = Java.topics.gettingStarted || {};

const startGlossary = [
  { term: 'terminal', definition: 'The text app where you type commands, such as java --version.' },
  { term: 'JDK', definition: 'Java Development Kit: everything you need to write and run Java, including javac.' },
  { term: 'JRE', definition: 'Java Runtime Environment: enough to run Java, but it has no javac compiler.' },
  { term: 'JVM', definition: 'Java Virtual Machine: the engine that runs compiled Java (.class files).' },
  { term: 'javac', definition: 'The Java compiler. It turns a .java file into a .class file.' },
  { term: 'bytecode', definition: 'The compiled .class format that the JVM understands.' },
  { term: 'sudo', definition: 'Runs one command as administrator. Ubuntu asks for your password.' },
  { term: 'apt', definition: 'Ubuntu’s app store for the terminal. It installs packages.' }
];


Java.topics.gettingStarted.lessons = [
  {
    id: 'install-java',
    title: 'Install Java 21',
    category: 'firstRun',
    icon: '21',
    tagline: 'Put the Java tools on your computer',
    realWorld: 'Before you bake, you need an oven. The JDK is your Java oven. You install it once, then you can bake as many programs as you like.',
    definition: 'Java programs need the JDK. It brings two tools: `javac` builds your program and `java` runs it. On Ubuntu you install it with one command.',
    why: 'Without the JDK, your computer cannot read Java code.',
    whenUse: 'Once, before your first program. Check it again if a command says "not found".',
    syntax: 'Install with `sudo apt install openjdk-21-jdk`. Check with `java --version` and `javac --version`. On macOS or Windows, follow the [setup sheet](../../../../sheets/setup/).',
    exampleLabel: 'Ubuntu terminal',
    codeLanguage: 'bash',
    fileName: 'install.sh',
    code: `sudo apt update
sudo apt install openjdk-21-jdk
java --version
javac --version`,
    codeExplanation: [
      'Refresh the list of apps Ubuntu knows about.',
      'Install the Java 21 JDK. Type your password when asked. You will not see the letters.',
      'Ask the runtime for its version. It should say 21.',
      'Ask the compiler for its version. It should also say 21.'
    ],
    tryIt: {
      steps: ['Open the terminal.', 'Type the four lines above, one at a time. Press Enter after each.'],
      see: 'two lines that start with `openjdk 21` and `javac 21`.'
    },
    keyPoints: ['Install the JDK, not only the JRE.', 'Both version commands must say 21.'],
    commonMistakes: ['Typing the commands into the browser instead of the terminal.', 'Thinking nothing happens while you type the password. Ubuntu hides it.'],
    related: ['Your First Program'],
    glossary: startGlossary
  },
  {
    id: 'first-program',
    title: 'Your First Program',
    category: 'firstRun',
    icon: 'J',
    tagline: 'Make the computer say hello',
    realWorld: 'A first program is like the first light switch you flip in a new house. If the light goes on, all the wires work.',
    definition: 'A Java program is a class with a `main` method. Java starts at `main` and runs its lines from top to bottom. `System.out.println` prints one line of text.',
    why: 'It proves that your tools work, end to end.',
    whenUse: 'Every new program starts with this shape.',
    syntax: 'The file name must match the class name: class `HelloJava` lives in `HelloJava.java`.',
    fileName: 'HelloJava.java',
    code: `public class HelloJava {
    public static void main(String[] args) {
        System.out.println("Hello, Java 21!");
    }
}`,
    codeExplanation: [
      { label: 'Line 1', code: 'public class HelloJava {', text: 'A class is the box that holds your code. Its name matches the file name.' },
      { label: 'Line 2', code: 'public static void main(String[] args) {', text: 'main is the front door. Java always walks in here first.' },
      { label: 'Line 3', code: 'System.out.println("Hello, Java 21!");', text: 'Print the text between the quotes. The line ends with a semicolon.' },
      { label: 'Lines 4–5', code: '}', text: 'Each { needs a matching }. They close main and the class.' }
    ],
    tryIt: {
      steps: [
        'Make a folder: `mkdir -p ~/java-practice && cd ~/java-practice`.',
        'Create the file: `code HelloJava.java` (or use any editor).',
        'Paste the code and save.',
        'Compile: `javac HelloJava.java`.',
        'Run: `java HelloJava`.'
      ],
      see: '`Hello, Java 21!` in the terminal.'
    },
    keyPoints: ['Java starts in main.', 'Every statement ends with ;.', 'println means "print line".'],
    commonMistakes: ['Saving the file as hello.java while the class is HelloJava.', 'Typing printIn (capital i) instead of println (small L).'],
    related: ['Compile and Run', 'Syntax Fundamentals'],
    glossary: startGlossary
  },
  {
    id: 'compile-run-flow',
    title: 'Compile and Run',
    category: 'firstRun',
    icon: '⇢',
    tagline: 'javac builds, java runs',
    realWorld: 'You write a letter in your language. A translator turns it into a language the machine reads. Then the machine reads it out loud. `javac` is the translator. `java` reads it out loud.',
    definition: 'Java has two steps. `javac Name.java` checks your code and makes `Name.class`. `java Name` runs that class. You repeat both steps after every change.',
    why: 'javac finds many mistakes before the program even starts.',
    whenUse: 'Every time you change a file: save, compile, run, read, fix.',
    syntax: 'Compile with the file name (with .java). Run with the class name (no .java, no .class).',
    fileName: 'Flow.java',
    code: `public class Flow {
    public static void main(String[] args) {
        System.out.println("Flow.java -> javac -> Flow.class");
        System.out.println("Flow.class -> java -> running program");
    }
}`,
    tryIt: {
      steps: ['Save the code as `Flow.java`.', 'Run `javac Flow.java`, then `ls`.', 'Run `java Flow`.', 'Change a word in the text. Run `java Flow` again without compiling.'],
      see: 'a new `Flow.class` file after javac. The old text after step 4, because you did not compile again.'
    },
    keyPoints: ['.java is the code you write.', '.class is the bytecode the JVM runs.', 'Compile again after every change.'],
    commonMistakes: ['Running java Flow.class instead of java Flow.', 'Forgetting to save before javac.'],
    related: ['If Something Breaks'],
    glossary: startGlossary
  },
  {
    id: 'if-something-breaks',
    title: 'If Something Breaks',
    category: 'help',
    icon: '!',
    tagline: 'Read the first line of the error',
    realWorld: 'When a car shows a warning light, you read which light it is before you open the hood. An error message is that warning light.',
    definition: 'Most first errors are one of four. Read the first line of the message, find it in the table, and do the fix. New to the terminal? Read the [terminal lesson](../../../computer-science/index.html#linux-terminal-os) first.',
    table: {
      label: 'Common first errors',
      head: ['You see', 'It means', 'Fix'],
      rows: [
        ['`javac: command not found`', 'The JDK is not installed.', '`sudo apt install openjdk-21-jdk`'],
        ['`class HelloJava is public, should be declared in a file named HelloJava.java`', 'File name and class name differ.', 'Rename the file to match the class.'],
        ['`error: ; expected`', 'A line is missing its semicolon.', 'Add `;` at the end of the line it points to.'],
        ['`Could not find or load main class`', 'You ran it from the wrong folder, or typed .class.', '`cd` to the folder with the file, then `java HelloJava`.']
      ]
    },
    tryIt: {
      steps: ['Open `HelloJava.java`.', 'Delete the `;` at the end of the println line.', 'Run `javac HelloJava.java`.', 'Put the `;` back and compile again.'],
      see: '`error: \';\' expected` with a line number. After the fix, no message at all.'
    },
    keyPoints: ['Read the first error line only. Fix it. Compile again.', 'No output from javac means success.'],
    commonMistakes: ['Changing many things at once. Change one thing, then compile.'],
    related: ['Debugging'],
    glossary: startGlossary
  },
  {
    id: 'sudo-apt',
    title: 'sudo and apt',
    category: 'help',
    icon: '#',
    tagline: 'What the install command really did',
    realWorld: '`apt` is an app store you talk to by typing. `sudo` is asking a grown-up for the key, because installing changes the whole computer.',
    definition: '`apt` installs packages from Ubuntu’s trusted list. `sudo` runs one command as administrator. In `sudo apt install openjdk-21-jdk`, sudo gives permission and apt does the work.',
    why: 'Ubuntu protects system folders so you cannot break them by accident.',
    whenUse: 'Only for installing or updating software. Never for your own practice files.',
    exampleLabel: 'Ubuntu terminal',
    codeLanguage: 'bash',
    fileName: 'apt.sh',
    code: `sudo apt update            # refresh the list
apt show openjdk-21-jdk    # read about a package
sudo apt install maven     # install another tool`,
    keyPoints: ['apt update refreshes the list. It installs nothing.', 'sudo is for one command at a time.'],
    commonMistakes: ['Using sudo for every command out of habit.'],
    related: ['Install Java 21'],
    glossary: startGlossary
  },
  {
    id: 'jdk-jre-jvm',
    title: 'JDK, JRE, JVM',
    category: 'help',
    icon: 'JVM',
    tagline: 'Three names, three jobs',
    realWorld: 'A kitchen: the JVM is the oven, the JRE is the oven plus the pans, and the JDK is the whole kitchen with the recipe tools too.',
    definition: 'The JVM runs bytecode. The JRE is the JVM plus the libraries it needs. The JDK is the JRE plus tools like javac. You need the JDK to write Java.',
    whenUse: 'When an install guide asks which one to pick: pick the JDK.',
    keyPoints: ['JDK = write and run.', 'JRE = run only (no javac).', 'JVM = the engine inside both.'],
    commonMistakes: ['Installing only a JRE and then javac is missing.'],
    related: ['JVM & Memory'],
    glossary: startGlossary
  }
];

Java.topics.gettingStarted.tryIt = {
  steps: [
    'Make a file `Me.java` with a class `Me` and a `main` method.',
    'Print three lines: your name, your age, and your favourite food.',
    'Compile with `javac Me.java` and run with `java Me`.'
  ],
  see: 'your three lines, in the same order you wrote them.'
};

Java.topics.gettingStarted.check = [
  { q: 'Which command turns `Hello.java` into `Hello.class`?', a: '`javac Hello.java`. javac is the compiler.' },
  { q: 'You changed your code, ran `java Hello`, and see the old text. Why?', a: 'You did not compile again. Run `javac Hello.java` first, then `java Hello`.' },
  { q: 'Do you need the JDK or the JRE to write Java?', a: 'The JDK. Only the JDK has javac.' }
];
