// I/O basics, lesson 9: reading from the keyboard with Scanner and BufferedReader.
(function () {
  Java.addCoreLessons('io-basics', [
    {
      id: 'scanner',
      title: 'Read from the Keyboard',
      category: 'concept',
      icon: '⌨',
      tagline: 'System.in with Scanner and BufferedReader',
      glossary: Java.ioBasicsGlossary,
      realWorld: 'A waiter in a restaurant. He asks "What would you like?", then waits with his notepad until you answer. Only then does he go on.',
      kid: [
        'So far your programs only talked. Now they can listen.',
        'The program asks a question on the screen and then waits, very patiently, until you type something and press Enter.',
        'A **Scanner** is the program ear. It hears what you typed and hands it over as text, or as a number if you ask for one.'
      ],
      definition: '`System.in` is the **standard input** of your program: normally the keyboard. `new Scanner(System.in)` reads it: `nextLine()` gives the next typed line as a `String`, `nextInt()` the next whole number. `new BufferedReader(new InputStreamReader(System.in))` reads it line by line with `readLine()`.',
      explain: [
        'Every program gets three **standard streams** from the terminal. **Standard input** (`System.in`) brings what you type. **Standard output** (`System.out`) shows normal results. **Standard error** (`System.err`) shows error messages. You have used `System.out` since your first program.',
        'The keyboard does not send a line until you press Enter. While you type, the terminal keeps the letters; Enter sends them, plus a line break, to `System.in`. A call like `scanner.nextLine()` **blocks**: the program stops and waits until a full line has arrived.',
        'A `Scanner` (from `java.util`) cuts the input into pieces. `nextLine()` returns everything up to the line break and removes the break. `next()` returns the next word, `nextInt()` the next whole number. `hasNextLine()` and `hasNextInt()` ask, without reading, whether such a piece is there.',
        '`System.in` is an input stream like a file. You can feed it from a file instead of the keyboard: `java SumNumbers < numbers.txt`. The `<` is the terminal **redirect**: the program reads the file as if you typed it. When the input is over (end of the file, or Ctrl+D on the keyboard) `hasNextLine()` returns `false`.',
        '`BufferedReader` is the reader you know from files, built around `System.in`. It only reads whole lines, and `readLine()` returns `null` when the input is over. It is faster than `Scanner` for lots of input and needs `IOException` handling; `Scanner` is easier for a few typed answers.'
      ],
      why: 'Interactive programs need answers from the user: a name, a number, a menu choice. Reading standard input is also how command-line tools receive data from files and other programs.',
      whenUse: 'Small interactive programs and quizzes (`Scanner`), and tools that read many lines from the keyboard or a redirected file (`BufferedReader`).',
      syntax: '`Scanner in = new Scanner(System.in);` · `String line = in.nextLine();` · `int n = Integer.parseInt(in.nextLine().strip());` · `BufferedReader r = new BufferedReader(new InputStreamReader(System.in));`',
      fileName: 'ScannerDemo.java',
      input: 'Ada\n9\n',
      code: `import java.util.Scanner;

public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("What is your name?");
        String name = scanner.nextLine();

        System.out.println("How old are you?");
        int age = Integer.parseInt(scanner.nextLine().strip());

        System.out.println("Hello, " + name + "!");
        System.out.println("Next year you are " + (age + 1) + ".");
    }
}`,
      output: `What is your name?
How old are you?
Hello, Ada!
Next year you are 10.`,
      codeSummary: 'The program asks two questions, reads one typed line for each, turns the age into a number and answers. The output box shows only what the program prints: the answers you type (here `Ada` and `9`) appear in your terminal, not in the output.',
      codeExplanation: [
        { label: 'Line 1', code: 'import java.util.Scanner;', text: '`Scanner` lives in `java.util`, not in `java.io`.' },
        { label: 'Line 5', code: 'Scanner scanner = new Scanner(System.in);', text: 'One scanner for the whole program, connected to standard input. Make it once, not once per question.' },
        { label: 'Line 7', code: 'System.out.println("What is your name?");', text: 'The question comes first. Without it the program waits silently and the user does not know what to type.' },
        { label: 'Line 8', code: 'String name = scanner.nextLine();', text: 'The program waits here until the user presses Enter. `name` gets the line without the line break: `Ada`.' },
        { label: 'Line 11', code: 'int age = Integer.parseInt(scanner.nextLine().strip());', text: 'Reads the whole line as text, removes spaces and turns it into an `int`. Reading whole lines avoids the `nextInt` trap shown below.' },
        { label: 'Line 13', code: 'System.out.println("Hello, " + name + "!");', text: 'Uses the typed text like any other `String`.' },
        { label: 'Line 14', code: '(age + 1)', text: '`age` is a real number now, so `+ 1` adds: 9 + 1 = 10. The brackets make Java add before it joins text.' }
      ],
      sections: [
        {
          title: 'What the terminal shows',
          text: [
            'When you run the program yourself, your typing and the program output mix on the screen. This is a real session; `Ada` and `9` are typed by you, each followed by Enter:'
          ],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `$ java ScannerDemo
What is your name?
Ada
How old are you?
9
Hello, Ada!
Next year you are 10.`,
          tip: 'You can also give the answers from a file: put `Ada` and `9` on two lines of `answers.txt` and run `java ScannerDemo < answers.txt`. The program cannot tell the difference.'
        },
        {
          title: 'Three standard streams',
          text: ['Your program sits between the terminal and itself, connected by three streams.'],
          mermaid: 'flowchart LR\n  K["keyboard (or a file with <)"] -->|"System.in"| P["your program"]\n  P -->|"System.out"| S["screen"]\n  P -->|"System.err"| S',
          diagramNote: '`System.in` is an `InputStream`, `System.out` and `System.err` are `PrintStream`s. All three are open from the start and are closed by the JVM at the end.',
          table: {
            head: ['Scanner method', 'Reads', 'Leaves the line break?'],
            rows: [
              ['`nextLine()`', 'the rest of the line, as `String`', 'no, it removes it'],
              ['`next()`', 'the next word (up to a space or line break)', 'yes'],
              ['`nextInt()`', 'the next whole number', 'yes'],
              ['`hasNextLine()`', 'nothing; `true` if a line is there', '—'],
              ['`hasNextInt()`', 'nothing; `true` if the next word is a whole number', '—']
            ]
          }
        },
        {
          title: 'Wrong vs right: nextInt and the left-over line break',
          text: [
            'The user types `9` Enter `Ada` Enter. `nextInt()` reads the `9` but leaves the line break behind. The following `nextLine()` finds that line break at once and returns an empty line. The name is lost.'
          ],
          fileName: 'NextIntTrap.java',
          input: '9\nAda\n',
          code: `import java.util.Scanner;

public class NextIntTrap {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Age?");
        int age = scanner.nextInt();          // reads 9, leaves the line break
        System.out.println("Name?");
        String name = scanner.nextLine();     // reads the rest of the age line: ""

        System.out.println("age=" + age + ", name=[" + name + "]");
    }
}`,
          output: `Age?
Name?
age=9, name=[]`,
          tip: 'Right: read every answer with `nextLine()` and convert numbers with `Integer.parseInt(...)`, as in `ScannerDemo`. Or call one extra `scanner.nextLine();` after `nextInt()` to eat the line break.'
        },
        {
          title: 'Read until the input ends',
          text: [
            '`hasNextLine()` is `true` as long as more input comes. With a redirected file it becomes `false` at the end of the file. On the keyboard you end the input with **Ctrl+D** on Ubuntu and macOS (Ctrl+Z then Enter on Windows).'
          ],
          fileName: 'SumNumbers.java',
          input: '4\n8\n\n15\n',
          code: `import java.util.Scanner;

public class SumNumbers {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int sum = 0;
        int count = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            if (line.isEmpty()) {
                continue;                     // ignore empty lines
            }
            sum += Integer.parseInt(line);
            count++;
        }
        System.out.println(count + " numbers, sum " + sum);
    }
}`,
          output: '3 numbers, sum 27',
          tip: 'Try `java SumNumbers < numbers.txt` with a file of numbers, or `seq 1 100 | java SumNumbers`. The `|` (pipe) sends the output of `seq` into your program.'
        },
        {
          title: 'The same with BufferedReader',
          text: [
            'You build the reader around `System.in`. `InputStreamReader` turns the bytes from the keyboard into characters, `BufferedReader` adds `readLine()`. At the end of the input, `readLine()` returns `null`, as with files.',
            '`readLine()` can throw `IOException`, so `main` declares it. Do not put `System.in` in try-with-resources: closing it closes standard input for the rest of the program.'
          ],
          fileName: 'ReadKeyboardLines.java',
          input: 'red\ngreen\nblue\n',
          code: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ReadKeyboardLines {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

        System.out.println("Type colors, end with Ctrl+D:");
        String line;
        int number = 0;
        while ((line = reader.readLine()) != null) {
            number++;
            System.out.println(number + ": " + line.toUpperCase());
        }
        System.out.println("bye after " + number + " lines");
    }
}`,
          output: `Type colors, end with Ctrl+D:
1: RED
2: GREEN
3: BLUE
bye after 3 lines`,
          table: {
            head: ['', '`Scanner`', '`BufferedReader`'],
            rows: [
              ['Package', '`java.util`', '`java.io`'],
              ['Reads', 'lines, words, numbers', 'whole lines only'],
              ['End of input', '`hasNextLine()` is `false`', '`readLine()` returns `null`'],
              ['Checked exception?', 'no', 'yes, `IOException`'],
              ['Speed', 'fine for typed answers', 'faster for many lines']
            ]
          }
        }
      ],
      technical: [
        'The terminal works in **line mode**: it collects your keys, lets you fix typos with Backspace, and only sends the line to the program on Enter. That is why `nextLine()` never sees half a line, and why Backspace works without any code from you.',
        '`System.in` delivers bytes. `Scanner` and `InputStreamReader` decode them into characters with the encoding of the console (`stdin.encoding`, UTF-8 on Ubuntu). Then `Scanner` looks for **delimiters**: by default any whitespace for `next()` and `nextInt()`, and line breaks for `nextLine()`.',
        '`nextInt()` and `nextDouble()` follow your computer language settings, the **locale**. On a system set to German, `nextDouble()` expects `3,5` and throws `InputMismatchException` for `3.5`. `Integer.parseInt` and `Double.parseDouble` always use the dot, which is one more reason to read lines and parse them yourself.',
        'Closing a `Scanner` also closes the stream inside it. For a `Scanner` on a file that is right; for `System.in` it means no later code can read the keyboard again. In small programs, leave the keyboard scanner open; the JVM cleans up at exit.'
      ],
      tryIt: {
        steps: [
          'Save `ScannerDemo.java`, compile and run it, and answer both questions.',
          'Run it again and type `nine` as your age.',
          'Write the answers `Kai` and `12` into `answers.txt` (one per line) and run `java ScannerDemo < answers.txt`.'
        ],
        see: 'a `NumberFormatException: For input string: "nine"` in step 2, and in step 3 `Hello, Kai!` and `Next year you are 13.` without typing anything.'
      },
      check: [
        { q: 'What is `System.in`, and what is it connected to normally?', a: 'The standard input stream of the program. Normally it is connected to the keyboard through the terminal.' },
        { q: 'The user types `5`, Enter, `Mina`, Enter. The program calls `nextInt()` and then `nextLine()`. What does `nextLine()` return?', a: 'An empty string. `nextInt()` left the line break after `5`, and `nextLine()` reads up to it.' },
        { q: 'How does a `BufferedReader` on `System.in` tell you that the input is over?', a: '`readLine()` returns `null` (after Ctrl+D, or at the end of a redirected file).' }
      ],
      keyPoints: [
        '`System.in` is standard input: the keyboard, or a file with `<`.',
        'The program blocks on `nextLine()` until the user presses Enter.',
        'Print a question before you read, so the user knows what to type.',
        'Read lines with `nextLine()` and convert with `Integer.parseInt` to avoid the `nextInt` trap.',
        '`hasNextLine()` (Scanner) or `readLine() != null` (BufferedReader) reads until the input ends.'
      ],
      commonMistakes: [
        'Mixing `nextInt()` and `nextLine()`: the name comes back empty. Fix: read every answer with `nextLine()` and parse numbers.',
        'Making a `new Scanner(System.in)` inside a method that you call many times. Fix: make one scanner and pass it around.',
        'Closing the keyboard scanner and reading again later: `NoSuchElementException`. Fix: do not close a scanner on `System.in` until the program ends.',
        'Using `nextDouble()` on a computer with German settings and typing `3.5`: `InputMismatchException`. Fix: `Double.parseDouble(scanner.nextLine().strip())`.'
      ],
      related: ['Strings & Text', 'read-line-by-line', 'bytes-and-chars']
    }
  ]);
})();
