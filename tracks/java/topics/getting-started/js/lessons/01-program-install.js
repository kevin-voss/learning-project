// Lessons 01–02: what a program is, and installing Java 21 on Ubuntu.
(function () {
  const topic = Java.topics.gettingStarted;
  const glossary = topic.glossary;

  topic.lessons.push(
    {
      id: 'what-is-a-program',
      num: '01',
      title: 'What a Program Is',
      category: 'firstRun',
      icon: '?',
      tagline: 'Instructions a computer follows, one by one',
      realWorld: 'A recipe card. It lists the steps in order: take bread, spread jam, close the sandwich. Anyone who follows the card gets the same sandwich.',
      kid: [
        'A computer is a very fast helper. But it cannot think for itself. It only does what a list tells it to do, step by step.',
        'That list is called a program. You write the list. The computer follows it, from the top to the bottom.',
        'The computer does not understand English or Java. So Java uses a translator. The translator turns your list into a language that a little Java machine inside the computer understands. Then that machine does the steps and shows you the result.'
      ],
      definition: 'A **program** is a list of instructions that a computer follows in order. You write it as **source code**, and Java tools turn it into something the computer can run.',
      explain: [
        '**Source code** is plain text that a person writes and reads. Java source code lives in files that end in `.java`, such as `Hello.java`. You can open such a file in any text editor.',
        'The computer chip (the **CPU**) cannot read that text. It only understands **machine code**: long rows of numbers. Every kind of chip has its own machine code.',
        'Java solves this in two steps. First, the **compiler** `javac` reads your `.java` file, checks it for mistakes and writes a `.class` file. The `.class` file holds **bytecode**: simple instructions that are the same on every computer.',
        'Second, the **JVM** (Java Virtual Machine) reads the bytecode and runs it on your computer. You start the JVM with the command `java`. What the program prints is its **output**.',
        'You get `javac`, `java` and the JVM together in one download: the **JDK** (Java Development Kit). The next lesson installs it.'
      ],
      why: 'Computers need exact steps. A program is the way you hand those steps over, so the computer does the same job every time, as often as you like.',
      whenUse: 'Every time you want the computer to do something new: print a message, add numbers, play a game. You write a program.',
      syntax: '`Hello.java` (you write) → `javac Hello.java` (compile) → `Hello.class` (bytecode) → `java Hello` (run) → output.',
      mermaid: 'flowchart LR\n  A["Hello.java (source code)"] --> B["javac (compiler)"]\n  B --> C["Hello.class (bytecode)"]\n  C --> D["java (starts the JVM)"]\n  D --> E["Output: Hello, World!"]',
      visualLabel: 'From your text to the output',
      visualNote: 'You write the first box. `javac` makes the third box. The JVM runs it and you see the last box in the terminal.',
      fileName: 'Recipe.java',
      code: `// A program is a list of steps. Java runs them from top to bottom.
public class Recipe {
    public static void main(String[] args) {
        // Each println line prints one line of text.
        System.out.println("Step 1: Take two slices of bread.");
        System.out.println("Step 2: Spread jam on one slice.");
        System.out.println("Step 3: Put the slices together.");
        System.out.println("Done: a jam sandwich!");
    }
}`,
      output: `Step 1: Take two slices of bread.
Step 2: Spread jam on one slice.
Step 3: Put the slices together.
Done: a jam sandwich!`,
      codeSummary: 'A tiny program that prints a recipe. Do not worry about every word yet: two lessons later, each word gets its own explanation. Watch the order: the output comes in exactly the order of the lines.',
      codeExplanation: [
        { label: 'Line 1', code: '// A program is a list of steps. Java runs them from top to bottom.', text: 'A **comment**. It starts with `//`. It is a note for people. Java ignores it.' },
        { label: 'Line 2', code: 'public class Recipe {', text: 'The program is a **class** named `Recipe`. A class is a named box for code. The file must be called `Recipe.java`.' },
        { label: 'Line 3', code: 'public static void main(String[] args) {', text: 'The **main method**. Java always starts here. Learn this line by heart for now; the lesson "Hello World, Word by Word" explains every word.' },
        { label: 'Line 5', code: 'System.out.println("Step 1: Take two slices of bread.");', text: 'The first instruction. It prints the text between the quotes and then moves to a new line.' },
        { label: 'Line 6', code: 'System.out.println("Step 2: Spread jam on one slice.");', text: 'The second instruction. It runs after line 5 is done.' },
        { label: 'Line 8', code: 'System.out.println("Done: a jam sandwich!");', text: 'The last step (line 7 before it works the same way). The JVM keeps going down the list until it reaches the end of `main`.' },
        { label: 'Line 9', code: '}', text: 'This brace closes `main`. When the JVM gets here, the program ends.' },
        { label: 'Line 10', code: '}', text: 'This brace closes the class `Recipe`. Every `{` needs a matching `}`.' }
      ],
      sections: [
        {
          title: 'Source code is text for people',
          text: [
            'A `.java` file is a plain text file, like a note. You can read it, print it and send it to a friend. Nothing in it is secret machine stuff.',
            'Java is picky about how you write it. Capital letters, quotes, braces and semicolons all matter. The compiler checks every one of them.'
          ],
          table: {
            head: ['Word', 'What it means', 'Example'],
            rows: [
              ['program', 'A list of instructions for the computer', 'the recipe above'],
              ['source code', 'The text you write', 'the content of `Recipe.java`'],
              ['compiler', 'The tool that checks and translates your text', '`javac`'],
              ['bytecode', 'The translated form, stored in a `.class` file', '`Recipe.class`'],
              ['JVM', 'The program that runs bytecode', 'started by `java`'],
              ['output', 'What the program prints', '`Step 1: Take two slices of bread.`']
            ],
            note: 'You meet each word again in the next lessons. Hover a word with a dotted line to see its meaning.'
          }
        },
        {
          title: 'Why the computer needs a translator',
          text: [
            'Your CPU understands only numbers, called machine code. An Intel chip in a laptop and an ARM chip in a phone speak different machine codes.',
            'If Java turned your program straight into Intel machine code, it would not run on an ARM chip. So Java translates into **bytecode** first. Bytecode is the same everywhere.',
            'Each computer then has its own JVM that knows the local chip. This idea has a slogan: **write once, run anywhere**.'
          ],
          mermaid: 'flowchart TD\n  C["Recipe.class (one file)"] --> U["JVM on Ubuntu"]\n  C --> M["JVM on macOS"]\n  C --> W["JVM on Windows"]\n  U --> O1["same output"]\n  M --> O2["same output"]\n  W --> O3["same output"]',
          diagramNote: 'You compile once. The same `.class` file runs on every computer that has a JVM.'
        },
        {
          title: 'Order matters: the computer follows the list exactly',
          text: [
            'The JVM runs the lines inside `main` one after another. It never skips a line and never changes the order on its own.',
            'Here the same steps are in a silly order. The computer does not notice that the result makes no sense. It prints the steps exactly as written.'
          ],
          fileName: 'SillyRecipe.java',
          code: `public class SillyRecipe {
    public static void main(String[] args) {
        System.out.println("Step 3: Put the slices together.");
        System.out.println("Step 1: Take two slices of bread.");
        System.out.println("Step 2: Spread jam on one slice.");
        System.out.println("Done: jam on the outside!");
    }
}`,
          output: `Step 3: Put the slices together.
Step 1: Take two slices of bread.
Step 2: Spread jam on one slice.
Done: jam on the outside!`,
          tip: 'If a program does something strange, read it top to bottom like the computer does. The computer always follows the lines you wrote, not the lines you meant.'
        },
        {
          title: 'JDK, JRE and JVM in one sentence each',
          text: [
            'You will read three short names all the time. Here they are in one line each. The lesson "JDK, JRE, JVM" goes deeper.'
          ],
          bullets: [
            '**JVM**: the engine that runs bytecode.',
            '**JRE**: the JVM plus ready-made Java code (the class library). It can run programs.',
            '**JDK**: the JRE plus the developer tools, above all `javac`. It can write and run programs. You install the JDK.'
          ]
        }
      ],
      technical: [
        '`javac` reads your text character by character and groups it into words (tokens) such as `public`, `class` and `"Step 1: ..."`. It then checks the grammar and the names. Only if everything is correct does it write a `.class` file.',
        'A `.class` file is binary. It starts with the four bytes `CA FE BA BE` (hex for "cafe babe"), then a version number, then a list of names and the bytecode instructions. For `println` the bytecode says, in short: get `System.out`, load the text, call `println`.',
        'When you type `java Recipe`, the JVM loads `Recipe.class`, checks that the bytecode is safe (the **verifier**) and runs it. First it reads the instructions one by one (it **interprets** them). Code that runs very often is translated into real machine code while the program runs; this is called **JIT** (just-in-time) compiling.'
      ],
      tryIt: {
        steps: [
          'Read the `Recipe` program above from top to bottom.',
          'Before you look at the output, write down on paper what you think it prints.',
          'Now compare your paper with the output panel.'
        ],
        see: 'the four lines on your paper in the same order as the output. You can run the program yourself after the lessons "Install Java 21" and "Your First Program".'
      },
      check: [
        { q: 'What is source code?', a: 'The text of a program, written by a person. In Java it lives in a `.java` file.' },
        { q: 'What does `javac` make from `Recipe.java`?', a: '`Recipe.class`, a file with bytecode.' },
        { q: 'Why does Java use bytecode instead of machine code?', a: 'Bytecode is the same on every computer. Each computer has its own JVM that runs it, so one `.class` file works everywhere.' }
      ],
      keyPoints: [
        'A program is a list of instructions. Java runs the lines in `main` from top to bottom.',
        'You write source code in a `.java` file.',
        '`javac` checks it and makes bytecode in a `.class` file.',
        'The JVM, started with `java`, runs the bytecode and shows the output.',
        'The JDK gives you all of these tools in one package.'
      ],
      commonMistakes: [
        'Thinking the computer "knows what you mean". It follows the exact lines, in the exact order.',
        'Opening a `.class` file in an editor and trying to change it. Change the `.java` file and compile again.',
        'Mixing up the two tools: `javac` compiles, `java` runs.'
      ],
      related: ['Install Java 21', 'Compile and Run', 'JDK, JRE, JVM'],
      glossary
    },
    {
      id: 'install-java',
      num: '02',
      title: 'Install Java 21',
      category: 'firstRun',
      icon: '21',
      tagline: 'Put the Java tools on your computer',
      realWorld: 'Before you bake, you need an oven. The JDK is your Java oven. You put it in the kitchen once, then you can bake as many programs as you like.',
      kid: [
        'Your computer does not come with Java. You have to bring it in, like a new toy box.',
        'Ubuntu has a helper called apt. You tell apt the name of the box you want, and apt fetches it from the internet and puts it in the right place.',
        'Because this changes the whole computer, Ubuntu asks for your password first. Then you ask Java: "Which version are you?" If it says 21, you are ready.'
      ],
      definition: 'To write Java you install the **JDK**. On Ubuntu one command does it: `sudo apt install openjdk-21-jdk`. Then `java --version` and `javac --version` both say 21.',
      explain: [
        'You type the commands into the **terminal**, a window where you talk to the computer with text. On Ubuntu you open it with **Ctrl+Alt+T**.',
        '`apt` is Ubuntu\'s package tool. A **package** is one piece of software with a name, such as `openjdk-21-jdk`. `apt` downloads it from Ubuntu\'s servers and installs it.',
        '`sudo` in front of a command means "run this one command as administrator". Installing software changes system folders, so Ubuntu asks for your password. While you type it, the terminal shows nothing at all. That is normal.',
        '**OpenJDK** is the free, open-source Java. `21` is the version. Java 21 is an **LTS** version (Long-Term Support): it gets fixes for many years, so courses and companies use it.',
        'After the install you check two tools: `java` (starts the JVM) and `javac` (the compiler). If both answer with a version that starts with 21, Java works.'
      ],
      why: 'Without the JDK your computer cannot compile or run Java code. The terminal answers `javac: command not found`.',
      whenUse: 'Once, before your first program. Check again with `javac --version` if a command says "not found".',
      syntax: '`sudo apt update` → `sudo apt install openjdk-21-jdk` → `java --version` → `javac --version`.',
      exampleLabel: 'Ubuntu terminal',
      codeLanguage: 'bash',
      fileName: 'install.sh',
      code: `# 1. Refresh the list of packages Ubuntu knows about
sudo apt update

# 2. Install the Java 21 JDK (answer Y and press Enter when asked)
sudo apt install openjdk-21-jdk

# 3. Ask the runtime for its version: it should say 21
java --version

# 4. Ask the compiler for its version: it should also say 21
javac --version`,
      output: `openjdk 21.0.8 2025-07-15
OpenJDK Runtime Environment (build 21.0.8+9-Ubuntu-0ubuntu124.04.1)
OpenJDK 64-Bit Server VM (build 21.0.8+9-Ubuntu-0ubuntu124.04.1, mixed mode, sharing)
javac 21.0.8`,
      codeSummary: 'Four commands, typed one at a time. Lines that start with `#` are notes for you; the terminal ignores them. The output shows the last two commands. Your numbers after `21.` and the dates can differ. That is fine.',
      codeExplanation: [
        { label: 'Line 1', code: '# 1. Refresh the list of packages Ubuntu knows about', text: 'A comment. In the terminal, `#` starts a note. You do not need to type it.' },
        { label: 'Line 2', code: 'sudo apt update', text: '`apt update` downloads the newest list of packages. It installs nothing. `sudo` gives it permission.' },
        { label: 'Password', code: '[sudo] password for sam:', text: 'Ubuntu asks for your login password. Type it and press Enter. You see no letters and no stars. That is a safety feature.' },
        { label: 'Line 5', code: 'sudo apt install openjdk-21-jdk', text: 'Installs the JDK for Java 21. apt also installs every package it needs, such as `openjdk-21-jre`.' },
        { label: 'Question', code: 'Do you want to continue? [Y/n]', text: 'apt shows how much it will download and asks first. Type `Y` (or press Enter, because Y is the default) to go on.' },
        { label: 'Line 8', code: 'java --version', text: 'Asks the `java` launcher for its version. The first output line must start with `openjdk 21`.' },
        { label: 'Line 11', code: 'javac --version', text: 'Asks the compiler for its version. It must say `javac 21`. If only this one fails, you installed a JRE, not the JDK.' },
        { label: 'Output', code: 'openjdk 21.0.8 2025-07-15', text: '`21` is the version you care about. `.0.8` is the update number. It grows when Ubuntu ships fixes.' }
      ],
      sections: [
        {
          title: 'Open the terminal and read the prompt',
          text: [
            'Press **Ctrl+Alt+T**, or open the app menu and search for "Terminal". A window with a blinking cursor appears.',
            'The text before the cursor is the **prompt**. It tells you who you are, which computer you use and which folder you are in. You type after the `$` and press Enter.'
          ],
          codeLanguage: 'bash',
          fileName: 'prompt',
          code: 'sam@laptop:~$ ',
          table: {
            head: ['Part', 'Meaning'],
            rows: [
              ['`sam`', 'your user name'],
              ['`laptop`', 'the name of the computer'],
              ['`~`', 'the folder you are in: `~` is your home folder, such as `/home/sam`'],
              ['`$`', 'the end of the prompt: type your command after it']
            ]
          },
          tip: 'In this course a line in a terminal box is always a command you type. You never type the prompt itself.'
        },
        {
          title: 'What every word of the install line means',
          text: [
            'Read a command from left to right. Each word has one job.'
          ],
          table: {
            head: ['Word', 'Job'],
            rows: [
              ['`sudo`', 'run the next command as administrator'],
              ['`apt`', 'the Ubuntu package tool'],
              ['`install`', 'what apt should do'],
              ['`openjdk-21-jdk`', 'which package: OpenJDK, version 21, the full JDK']
            ],
            note: 'There is also `openjdk-21-jre` (run only) and `openjdk-21-jdk-headless` (a JDK without window libraries, for servers). For learning, take `openjdk-21-jdk`.'
          },
          mermaid: 'flowchart LR\n  Y["You type: sudo apt install openjdk-21-jdk"] --> S["sudo asks for your password"]\n  S --> A["apt downloads the packages"]\n  A --> F["files land in /usr/lib/jvm"]\n  F --> R["java and javac work in every terminal"]',
          diagramNote: 'You type one line. Behind it, permission, download and install happen in order.'
        },
        {
          title: 'Check that Java works',
          text: [
            'Run the two version commands. Then ask where the tools live with `which`. `which` prints the full path of a command.',
            'Your exact numbers can differ. What matters is the `21` at the start.'
          ],
          codeLanguage: 'bash',
          fileName: 'check.sh',
          code: `java --version
javac --version
which javac`,
          output: `openjdk 21.0.8 2025-07-15
OpenJDK Runtime Environment (build 21.0.8+9-Ubuntu-0ubuntu124.04.1)
OpenJDK 64-Bit Server VM (build 21.0.8+9-Ubuntu-0ubuntu124.04.1, mixed mode, sharing)
javac 21.0.8
/usr/bin/javac`,
          tip: '`java -version` with one dash also works. It is the old spelling and prints the same facts.'
        },
        {
          title: 'A first Java check program',
          text: [
            'You can also ask from inside Java. This program reads the main version number of the JVM that runs it. It uses `int` (a whole number) and `if` (a choice). You learn both in [Types & Variables](../types-and-variables/index.html) and [Control Flow](../control-flow/index.html); for now, run it.',
            'Save it as `CheckJava.java`, then run `java CheckJava.java` (the lesson "Run One File" explains this short way).'
          ],
          fileName: 'CheckJava.java',
          code: `public class CheckJava {
    public static void main(String[] args) {
        // Ask the JVM for its main version number, for example 21
        int version = Runtime.version().feature();

        if (version >= 21) {
            System.out.println("Java is ready. Version 21 or newer is installed.");
        } else {
            System.out.println("This Java is too old. Install Java 21.");
        }
    }
}`,
          output: 'Java is ready. Version 21 or newer is installed.'
        },
        {
          title: 'More than one Java on the computer',
          text: [
            'Some computers already have another Java, for example 17. Then `java --version` may still say 17 after the install.',
            'Ubuntu keeps one "default" for each command. `update-alternatives` lets you pick it. It lists every installed Java with a number; type the number of the Java 21 line and press Enter. Do the same for `javac`.'
          ],
          codeLanguage: 'bash',
          fileName: 'choose-java.sh',
          code: `sudo update-alternatives --config java
sudo update-alternatives --config javac`,
          warn: 'If `java` says 21 but `javac` says 17 (or "not found"), the two defaults differ. Both must point to Java 21.'
        },
        {
          title: 'On macOS or Windows',
          text: [
            'This course uses Ubuntu. If you use another system, install the same Java 21 JDK, then use the same `java` and `javac` commands.'
          ],
          bullets: [
            '**macOS**: download the Eclipse Temurin 21 `.pkg` installer from adoptium.net and double-click it, or run `brew install --cask temurin@21` if you use Homebrew.',
            '**Windows**: run `winget install EclipseAdoptium.Temurin.21.JDK` in PowerShell, or use the `.msi` installer from adoptium.net. Then open a new terminal window so it finds `java`.'
          ]
        }
      ],
      technical: [
        'apt downloads `.deb` files (Ubuntu packages) from Ubuntu servers and checks their digital signatures, so nobody can slip in fake software. `openjdk-21-jdk` depends on other packages, such as `openjdk-21-jdk-headless` and `openjdk-21-jre`; apt installs them all.',
        'The JDK files land in `/usr/lib/jvm/java-21-openjdk-amd64/` (on ARM computers the folder ends in `arm64`). In `/usr/bin` Ubuntu creates short links named `java` and `javac`. They point through `/etc/alternatives/` to the real files. That is the chain `update-alternatives` changes.',
        'When you type `javac`, the terminal looks for a program with that name in a list of folders called **PATH**. `/usr/bin` is on that list. "command not found" means no folder on PATH has the program, which usually means the JDK is not installed.'
      ],
      tryIt: {
        steps: [
          'Open the terminal with Ctrl+Alt+T.',
          'Type `sudo apt update` and press Enter. Type your password (you see nothing) and press Enter.',
          'Type `sudo apt install openjdk-21-jdk` and press Enter. Answer `Y`.',
          'Type `java --version`, then `javac --version`.'
        ],
        see: 'a first line that starts with `openjdk 21` and a line `javac 21` followed by an update number.'
      },
      check: [
        { q: 'Why does the install command start with `sudo`?', a: 'Installing changes system folders. `sudo` runs that one command as administrator, after you type your password.' },
        { q: '`java --version` says 21, but `javac --version` says "command not found". What is wrong?', a: 'Only a runtime (JRE) is installed, not the JDK. Run `sudo apt install openjdk-21-jdk`.' },
        { q: 'What does `apt update` install?', a: 'Nothing. It only refreshes the list of packages. `apt install` installs.' }
      ],
      keyPoints: [
        'Open the terminal with Ctrl+Alt+T and type commands after the `$`.',
        'Install the JDK, not only the JRE: `sudo apt install openjdk-21-jdk`.',
        'The password is invisible while you type it.',
        'Both `java --version` and `javac --version` must say 21.',
        'With several Javas installed, pick 21 with `sudo update-alternatives --config java` (and `javac`).'
      ],
      commonMistakes: [
        'Typing the commands into a browser or a search box. Type them into the terminal.',
        'Thinking the keyboard is broken while you type the password. Ubuntu hides it; type it and press Enter.',
        'Installing `openjdk-21-jre`. Then `javac` is missing. Install `openjdk-21-jdk`.',
        'Typing `sudo apt install java`. There is no package with that name. Use the full name `openjdk-21-jdk`.'
      ],
      related: ['sudo and apt', 'The Terminal Commands You Need', 'Your First Program'],
      glossary
    }
  );
})();
