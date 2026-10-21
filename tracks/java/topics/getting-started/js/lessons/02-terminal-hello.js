// Lessons 03–04: the few terminal commands you need, and the first program.
(function () {
  const topic = Java.topics.gettingStarted;
  const glossary = topic.glossary;

  topic.lessons.push(
    {
      id: 'terminal-commands',
      num: '03',
      title: 'The Terminal Commands You Need',
      category: 'firstRun',
      icon: '$',
      tagline: 'Eight commands to find, make and look at files',
      realWorld: 'A big house with many rooms. You always stand in one room. You can ask "where am I?", look around, build a new room, and walk into it.',
      kid: [
        'The terminal is like talking to the computer with a walkie-talkie. You say one short order, press the button (Enter), and the computer answers.',
        'The computer keeps its files in folders, like toys in rooms. You are always standing in one room. "pwd" asks: which room am I in? "ls" asks: what is in this room? "mkdir" builds a new room. "cd" walks into a room.',
        'For Java you need only a few of these orders. Once you know them, you can find your file, compile it and run it.'
      ],
      definition: 'A **command** is one line you type in the terminal. The first word is the tool, the other words tell it what to do. For Java you need `pwd`, `ls`, `mkdir`, `cd`, an editor (`nano` or `code`), `cat` and `clear`.',
      explain: [
        'Files live in **folders** (also called directories). Folders sit inside other folders, like a tree. Your **home folder** is `/home/<your-name>`; the terminal writes it as `~`.',
        'The terminal always works in one folder, the **current folder**. `javac Hello.java` looks for `Hello.java` in the current folder. That is why you must be in the right folder before you compile.',
        'A command has parts. In `mkdir -p ~/java-practice`, `mkdir` is the tool, `-p` is an **option** (it changes how the tool works) and `~/java-practice` is an **argument** (what the tool works on).',
        'Most commands print nothing when they succeed. Silence means "done". If something goes wrong, they print an error.'
      ],
      why: 'You compile and run Java from the terminal. The terminal needs to know which folder your file is in.',
      whenUse: 'Every time you start working: open the terminal, `cd` into your practice folder, then compile and run.',
      syntax: '`tool -option argument`, for example `mkdir -p ~/java-practice` or `cd ~/java-practice`.',
      exampleLabel: 'Ubuntu terminal',
      codeLanguage: 'bash',
      fileName: 'terminal.sh',
      code: `pwd                       # where am I?
mkdir -p ~/java-practice  # make a folder for your Java files
cd ~/java-practice        # walk into it
pwd                       # check: where am I now?
nano Hello.java           # create and edit a file (or: code Hello.java)
ls                        # what is in this folder?
cat Hello.java            # print the file to the screen
cd ..                     # go up one folder
clear                     # wipe the screen`,
      output: `/home/sam
/home/sam/java-practice
Hello.java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      codeSummary: 'The output panel shows what the commands print, in order: the two `pwd` answers, then `ls`, then `cat`. The other commands print nothing when they work. Your user name differs from `sam`.',
      codeExplanation: [
        { label: 'Line 1', code: 'pwd', text: '**p**rint **w**orking **d**irectory: shows the full path of the folder you are in. After you open the terminal you are in your home folder.' },
        { label: 'Line 2', code: 'mkdir -p ~/java-practice', text: '**m**a**k**e **dir**ectory. `-p` means "no error if it already exists". `~` is your home folder.' },
        { label: 'Line 3', code: 'cd ~/java-practice', text: '**c**hange **d**irectory: walk into the folder. Every later command runs there.' },
        { label: 'Line 4', code: 'pwd', text: 'Check yourself. Now it prints `/home/sam/java-practice`.' },
        { label: 'Line 5', code: 'nano Hello.java', text: 'Opens the small text editor `nano` with a new file. Type or paste the code, save with **Ctrl+O** then Enter, leave with **Ctrl+X**. With VS Code installed, `code Hello.java` opens it there instead.' },
        { label: 'Line 6', code: 'ls', text: '**l**i**s**t: shows the files in the current folder. Here: `Hello.java`.' },
        { label: 'Line 7', code: 'cat Hello.java', text: 'Prints the whole file into the terminal. Good to check that you saved what you think you saved.' },
        { label: 'Line 8', code: 'cd ..', text: '`..` means "the folder above this one". You are back in your home folder.' },
        { label: 'Line 9', code: 'clear', text: 'Empties the screen. Nothing is deleted; only the old text disappears.' }
      ],
      sections: [
        {
          title: 'Folders are a tree',
          text: [
            'Picture your files as a tree that grows downwards. At the top is `/`, the root of the whole disk. Your home folder is a branch, and your practice folder is a branch of that.',
            'A **path** is the way through the tree, with `/` between the names: `/home/sam/java-practice/Hello.java`.'
          ],
          mermaid: 'flowchart TD\n  R["/ (root)"] --> H["home"]\n  R --> U["usr"]\n  H --> S["sam (this is ~)"]\n  S --> P["java-practice"]\n  S --> D["Documents"]\n  P --> J["Hello.java"]\n  P --> C["Hello.class"]\n  U --> B["bin (java, javac)"]',
          diagramNote: 'You work in `java-practice`. The Java tools live in `/usr/bin`, but you do not need to go there: the terminal finds them for you.'
        },
        {
          title: 'Moving around: cd, cd .. and cd ~',
          text: [
            '`cd` takes you to a folder. A few short forms save typing.'
          ],
          table: {
            head: ['You type', 'You go to'],
            rows: [
              ['`cd java-practice`', 'the folder `java-practice` inside the current folder'],
              ['`cd ~/java-practice`', 'the folder `java-practice` in your home folder, from anywhere'],
              ['`cd ..`', 'one folder up'],
              ['`cd ~` or only `cd`', 'your home folder'],
              ['`cd -`', 'the folder you were in before']
            ]
          },
          tip: 'Lost? Type `pwd`. It always tells you where you are.'
        },
        {
          title: 'Making and editing a file',
          text: [
            'You need an editor to write Java. Any editor that saves plain text works.',
            '**nano** runs inside the terminal and is already on Ubuntu. The keys are listed at the bottom; `^O` means Ctrl+O.',
            '**VS Code** is a bigger editor with colours and help. If it is installed, `code .` opens the current folder and `code Hello.java` opens one file. The Ubuntu **Text Editor** app works too.'
          ],
          codeLanguage: 'bash',
          fileName: 'edit.sh',
          code: `cd ~/java-practice
nano Hello.java     # write, Ctrl+O + Enter saves, Ctrl+X quits
cat Hello.java      # check what you saved
ls -l               # list with details: size and date`,
          output: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
total 4
-rw-rw-r-- 1 sam sam 119 Oct 21 10:12 Hello.java`,
          warn: 'Save the file before you compile. If you forget, `javac` compiles the old version (or finds an empty file).'
        },
        {
          title: 'Four keys that save you time',
          text: [
            'These keys work in every terminal on Ubuntu.'
          ],
          table: {
            head: ['Key', 'What it does'],
            rows: [
              ['**Tab**', 'completes a file or folder name: type `cd java-pr` and press Tab'],
              ['**Up arrow**', 'brings back the last command, so you can run `javac Hello.java` again'],
              ['**Ctrl+C**', 'stops a program that is still running (for example one that never ends)'],
              ['**Ctrl+Shift+C / Ctrl+Shift+V**', 'copy and paste inside the terminal (Ctrl+C alone means "stop")']
            ]
          },
          tip: 'Want more terminal practice? The [terminal lesson](../../../computer-science/index.html#linux-terminal-os) in the Computer Science track goes further.'
        }
      ],
      technical: [
        'The program behind the terminal window is a **shell**, on Ubuntu usually `bash`. It reads your line, splits it at the spaces into words and treats the first word as the name of a program.',
        'Then it searches the folders listed in the variable `PATH` for a program with that name, starts it as a new **process** (a running program) and hands it the other words as **arguments**. `javac Hello.java` starts `/usr/bin/javac` with the one argument `Hello.java`.',
        'Some commands, such as `cd` and `pwd`, are built into the shell itself, because they change or report the shell\'s own current folder. Your Java program receives its arguments the same way: in `String[] args`, which the lesson "Hello World, Word by Word" explains.'
      ],
      tryIt: {
        steps: [
          'Open the terminal and type `pwd`.',
          'Type `mkdir -p ~/java-practice` and then `cd ~/java-practice`.',
          'Type `pwd` again.',
          'Type `nano notes.txt`, write one line, save with Ctrl+O and Enter, quit with Ctrl+X.',
          'Type `ls`, then `cat notes.txt`.'
        ],
        see: '`/home/<your-name>/java-practice` after the second `pwd`, `notes.txt` after `ls`, and your line after `cat`.'
      },
      check: [
        { q: 'What does `pwd` print?', a: 'The full path of the folder you are in, for example `/home/sam/java-practice`.' },
        { q: 'You type `javac Hello.java` and get "file not found". You saved the file in `~/java-practice`. What do you do?', a: 'Go to that folder first: `cd ~/java-practice`. Check with `ls` that `Hello.java` is there, then compile again.' },
        { q: 'What does `cd ..` do?', a: 'It moves you one folder up, to the folder that holds the current one.' }
      ],
      keyPoints: [
        'The terminal always works in one current folder. `pwd` shows it.',
        '`mkdir -p` makes a folder, `cd` walks into it, `cd ..` goes up.',
        '`ls` lists files, `cat` prints a file.',
        'Edit with `nano` (Ctrl+O saves, Ctrl+X quits) or with `code`.',
        'Tab completes names; the Up arrow repeats the last command.'
      ],
      commonMistakes: [
        'Compiling from the wrong folder. Run `pwd` and `ls` first; `cd ~/java-practice` if needed.',
        'Pressing Ctrl+C to copy in the terminal. That stops the running program. Use Ctrl+Shift+C.',
        'Typing `CD java-practice`. Commands are case-sensitive: `cd`, not `CD`.',
        'Putting spaces in folder names, such as `java practice`. Use `java-practice`, so you do not need quotes.'
      ],
      related: ['Install Java 21', 'Your First Program'],
      glossary
    },
    {
      id: 'first-program',
      num: '04',
      title: 'Your First Program',
      category: 'firstRun',
      icon: 'J',
      tagline: 'Make the computer say hello',
      realWorld: 'A first program is like the first light switch you flip in a new house. If the light goes on, all the wires work.',
      kid: [
        'Your first program has one job: say hello. That sounds small, but it is a big test.',
        'If the computer says "Hello, World!", it means: you wrote the file in the right place, the translator understood it, and the Java machine ran it. Every part works.',
        'Programmers all over the world start with this same program. Now you do too.'
      ],
      definition: 'A Java program is a **class** with a **main method**. Java starts at `main` and runs its lines from top to bottom. `System.out.println("…")` prints one line of text.',
      explain: [
        'You write the program in a file `Hello.java`. The file name must match the class name exactly, including capital letters: class `Hello` lives in `Hello.java`.',
        'The class is the outer box: `public class Hello { … }`. Inside it sits the **method** `main`: `public static void main(String[] args) { … }`. A method is a named block of instructions. `main` is the one Java runs first.',
        'Inside `main` is one **statement** (one complete instruction): `System.out.println("Hello, World!");`. It prints the text between the double quotes. Text in double quotes is called a **string**. The statement ends with a semicolon `;`.',
        'Then you compile with `javac Hello.java` and run with `java Hello`. The next lesson explains every word of the program; this lesson gets it running.'
      ],
      why: 'It proves that your tools work, end to end. Every later program has the same outer shape.',
      whenUse: 'Every new program starts with this shape: a class named like the file, and a `main` method inside it.',
      syntax: '`public class Name { public static void main(String[] args) { statements } }`, saved as `Name.java`.',
      fileName: 'Hello.java',
      code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      output: 'Hello, World!',
      codeSummary: 'Five lines: a class `Hello`, a `main` method inside it, and one statement that prints a line. Type it exactly like this. Capital letters matter.',
      codeExplanation: [
        { label: 'Line 1', code: 'public class Hello {', text: 'The class is the box that holds your code. Its name `Hello` matches the file name `Hello.java`. The `{` opens the box.' },
        { label: 'Line 2', code: 'public static void main(String[] args) {', text: 'The main method: the front door. Java always walks in here first. Copy this line exactly.' },
        { label: 'Line 3', code: 'System.out.println("Hello, World!");', text: 'Print the text between the quotes, then move to a new line. `println` means "print line".' },
        { label: 'Line 3', code: '"Hello, World!"', text: 'A string: text in double quotes. Java prints it exactly, with the comma and the `!`, but without the quotes.' },
        { label: 'Line 3', code: ';', text: 'The semicolon ends the statement, like a full stop ends a sentence.' },
        { label: 'Line 4', code: '}', text: 'Closes `main`.' },
        { label: 'Line 5', code: '}', text: 'Closes the class. Every `{` has a matching `}`.' }
      ],
      sections: [
        {
          title: 'Step 1: make a folder and the file',
          text: [
            'Keep your practice files in one folder. Then you always know where they are.'
          ],
          codeLanguage: 'bash',
          fileName: 'step1.sh',
          code: `mkdir -p ~/java-practice
cd ~/java-practice
nano Hello.java`,
          tip: 'With VS Code you can type `code Hello.java` instead of `nano Hello.java`.'
        },
        {
          title: 'Step 2: type the code and save',
          text: [
            'Type the five lines from the example, or paste them. Then save (in nano: Ctrl+O, Enter, Ctrl+X).',
            'The spaces at the start of the lines are **indentation**. Java does not need them, but they show you which part sits inside which. Use 4 spaces per level.'
          ],
          bullets: [
            '`System` starts with a capital S. `println` is "print" plus a small L and a small N: **p-r-i-n-t-l-n**.',
            'Use straight double quotes `"`, not curly quotes from a word processor.',
            'The file is called `Hello.java`, with a capital H, not `hello.java` or `Hello.java.txt`.'
          ]
        },
        {
          title: 'Step 3: compile, look, run',
          text: [
            '`javac` prints nothing when all is well. `ls` then shows a new file `Hello.class`. `java Hello` runs it.'
          ],
          codeLanguage: 'bash',
          fileName: 'step3.sh',
          code: `javac Hello.java
ls
java Hello`,
          output: `Hello.class  Hello.java
Hello, World!`,
          mermaid: 'sequenceDiagram\n  participant You\n  participant javac\n  participant JVM\n  You->>javac: javac Hello.java\n  javac-->>You: (silence) Hello.class is written\n  You->>JVM: java Hello\n  JVM-->>You: Hello, World!',
          diagramNote: 'Two commands, two helpers. The compiler answers with silence and a new file; the JVM answers with your output.'
        },
        {
          title: 'Make it yours: print and println',
          text: [
            'You can have many statements in `main`. They run one after another.',
            '`println` prints and then starts a new line. `print` (without `ln`) prints and stays on the same line. An empty `println()` prints an empty line.'
          ],
          fileName: 'AboutMe.java',
          code: `public class AboutMe {
    public static void main(String[] args) {
        System.out.println("Hi, I am Sam.");
        System.out.println("I am learning Java.");
        System.out.println();

        // print stays on the same line
        System.out.print("My favourite food: ");
        System.out.println("pancakes");

        System.out.print("One, ");
        System.out.print("two, ");
        System.out.println("three!");
    }
}`,
          output: `Hi, I am Sam.
I am learning Java.

My favourite food: pancakes
One, two, three!`
        },
        {
          title: 'Comments: notes for people',
          text: [
            'A **comment** is text that Java ignores. You write it for yourself and other readers.',
            '`//` starts a comment that runs to the end of the line. `/* … */` can span several lines.'
          ],
          fileName: 'Comments.java',
          code: `/*
 * This program shows the two kinds of comments.
 * Java skips everything between the slash-star and the star-slash.
 */
public class Comments {
    public static void main(String[] args) {
        // This whole line is a comment.
        System.out.println("Comments are not printed.");
        System.out.println("Only code runs."); // a comment after code
        // System.out.println("This line is switched off.");
    }
}`,
          output: `Comments are not printed.
Only code runs.`,
          tip: 'Putting `//` in front of a line "switches it off" without deleting it. Programmers call this commenting out.'
        }
      ],
      technical: [
        '`System.out` is the program\'s **standard output**, a stream of text that the terminal shows. `println` writes the text and then a line separator (on Ubuntu the single character "newline").',
        'Java strings are Unicode, so `"café"` or `"😀"` work. Since Java 18 javac reads source files as UTF-8 by default, the same encoding the Ubuntu terminal and editors use.',
        'When `main` reaches its last `}`, the JVM shuts down and returns the **exit code** 0 to the shell, which means "success". You can see it with `echo $?` right after `java Hello`.'
      ],
      tryIt: {
        steps: [
          '`cd ~/java-practice` and open `Hello.java` in your editor.',
          'Change the text to `"Hello, <your name>!"` and save.',
          'Compile with `javac Hello.java`.',
          'Run with `java Hello`.',
          'Add a second `println` line with your favourite animal. Save, compile and run again.'
        ],
        see: 'your greeting with your name, and after the last step a second line with your animal.'
      },
      check: [
        { q: 'Your class is `public class Greeter`. What must the file be called?', a: '`Greeter.java`, with the same capital letters.' },
        { q: 'What is the difference between `print` and `println`?', a: '`println` starts a new line after the text. `print` stays on the same line.' },
        { q: 'What does `javac` print when your code is correct?', a: 'Nothing. Silence means success, and a `.class` file appears.' }
      ],
      keyPoints: [
        'A program is a class with a `main` method; Java starts in `main`.',
        'The file name matches the class name: `Hello` → `Hello.java`.',
        '`System.out.println("…");` prints one line. Every statement ends with `;`.',
        'Compile with `javac Hello.java`, run with `java Hello`.',
        '`//` and `/* */` are comments: Java ignores them.'
      ],
      commonMistakes: [
        'Saving the file as `hello.java` while the class is `Hello`. Names must match exactly.',
        'Typing `System.out.printIn` (capital i). It is `println` with a small L.',
        'Writing `system.out.println`. `System` needs a capital S.',
        'Forgetting the `;` at the end of the println line. javac answers `\';\' expected`.'
      ],
      related: ['Hello World, Word by Word', 'Compile and Run', 'If Something Breaks'],
      glossary
    }
  );
})();
