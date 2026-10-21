// Getting Started on Ubuntu: shared words, the empty lesson list and the topic practice.
// The lessons themselves live in js/lessons/01-…05-*.js and are pushed onto the list in order.
Java.topics.gettingStarted = Java.topics.gettingStarted || {};

Java.topics.gettingStarted.glossary = [
  { term: 'program', definition: 'A list of instructions that a computer follows, one after another.' },
  { term: 'source code', definition: 'The text of a program, written by a person. Java source code lives in .java files.' },
  { term: 'compiler', definition: 'A tool that checks source code and translates it into a form a machine can run.' },
  { term: 'javac', definition: 'The Java compiler. It turns a .java file into a .class file.' },
  { term: 'bytecode', definition: 'The compiled .class format that the JVM understands. It is the same on every computer.' },
  { term: 'JVM', definition: 'Java Virtual Machine: the program that reads bytecode and runs it on your computer.' },
  { term: 'JRE', definition: 'Java Runtime Environment: the JVM plus the class library. Enough to run Java, but it has no javac.' },
  { term: 'JDK', definition: 'Java Development Kit: everything you need to write and run Java, including javac and the JVM.' },
  { term: 'terminal', definition: 'The text app where you type commands, such as java --version.' },
  { term: 'command', definition: 'One line you type in the terminal. The first word names the tool, the other words tell it what to do.' },
  { term: 'folder', definition: 'A place on the disk that holds files and other folders. Also called a directory.' },
  { term: 'sudo', definition: 'Runs one command as administrator. Ubuntu asks for your password and does not show it.' },
  { term: 'apt', definition: 'The Ubuntu package tool. It downloads and installs software from Ubuntu servers.' },
  { term: 'package', definition: 'For apt: one installable piece of software, such as openjdk-21-jdk.' },
  { term: 'LTS', definition: 'Long-Term Support: a Java version that gets fixes for many years. Java 21 is one.' },
  { term: 'class', definition: 'A named box of code. In this topic every program is one class.' },
  { term: 'method', definition: 'A named block of instructions inside a class, such as main.' },
  { term: 'statement', definition: 'One complete instruction. In Java most statements end with a semicolon.' },
  { term: 'string', definition: 'A piece of text in double quotes, such as "Hello".' },
  { term: 'compile error', definition: 'A mistake that javac finds before the program runs. No .class file is made.' }
];

Java.topics.gettingStarted.lessons = [];

Java.topics.gettingStarted.tryIt = {
  steps: [
    'Open the terminal and go to your practice folder: `cd ~/java-practice`.',
    'Make a file `Me.java` with a public class `Me` and a `main` method.',
    'Print three lines: your name, your age, and your favourite food.',
    'Compile with `javac Me.java`, check with `ls` that `Me.class` exists, and run with `java Me`.',
    'Remove one `;`, compile again, and read the first line of the error. Put the `;` back.',
    'Run the same file a second way: `java Me.java`.'
  ],
  see: 'your three lines, in the same order you wrote them. With the `;` missing you see `Me.java:<line>: error: \';\' expected`.'
};

Java.topics.gettingStarted.check = [
  { q: 'Put these in order: `java`, `.class`, `.java`, `javac`, output.', a: '`.java` (your source code) → `javac` (the compiler) → `.class` (bytecode) → `java` (starts the JVM) → output.' },
  { q: 'Which command turns `Hello.java` into `Hello.class`, and which one runs it?', a: '`javac Hello.java` compiles. `java Hello` runs. You run with the class name, without `.java` or `.class`.' },
  { q: 'You changed your code, ran `java Hello`, and see the old text. Why?', a: 'You did not compile again. The JVM runs the old `Hello.class`. Run `javac Hello.java` first, or use `java Hello.java`.' },
  { q: 'Do you need the JDK or the JRE to write Java?', a: 'The JDK. Only the JDK has `javac`. The JRE can only run programs.' },
  { q: 'javac says `Hello.java:7: error: cannot find symbol`. What do you do first?', a: 'Look at line 7, at the spot under the `^`. Usually a name is misspelled or has the wrong capital letter, such as `printn` or `system`. Fix that one mistake and compile again.' }
];
