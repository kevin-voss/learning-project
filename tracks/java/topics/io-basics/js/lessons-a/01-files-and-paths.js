// I/O basics, lesson 1: files, folders, paths and the working directory.
// This file registers the topic. The other files add lessons with Java.addCoreLessons.
(function () {
  // Words this topic uses a lot. Shown as hover tips on every lesson of the topic.
  Java.ioBasicsGlossary = [
    { term: 'working directory', definition: 'The folder your program runs in. Every relative path starts there. In the terminal, `pwd` prints it.' },
    { term: 'relative path', definition: 'A path that starts from the working directory, like data/notes.txt.' },
    { term: 'absolute path', definition: 'A path that starts at the root of the disk, like /home/ada/notes.txt. It means the same place from everywhere.' },
    { term: 'encoding', definition: 'The rule that turns characters into bytes and back. Java uses UTF-8.' },
    { term: 'UTF-8', definition: 'The most common text encoding. A, b, 7 take 1 byte; é takes 2; € takes 3; an emoji takes 4.' },
    { term: 'buffer', definition: 'A small box of memory that collects data, so the program talks to the disk in a few big steps instead of many tiny ones.' },
    { term: 'try-with-resources', definition: 'A try (...) block that closes the file, reader or scanner in the brackets for you, even when an exception happens.' },
    { term: 'CSV', definition: 'Comma-separated values: a text file where each line is a row and commas split the columns.' },
    { term: 'standard input', definition: 'The stream your program reads from. Normally it is the keyboard. In Java it is System.in.' }
  ];

  Java.addCoreTopic('io-basics', {
    label: 'I/O',
    headline: 'Files and input,',
    accent: 'read, write, keep.',
    intro: 'Your programs forget everything when they stop. Files let them remember. Here you learn paths, reading and writing text files, folders, errors, a small CSV report and reading from the keyboard.',
    overview: 'Every example uses only the Java 21 standard library (`java.nio.file.Path`, `java.nio.file.Files`, `java.io`) and creates the files it reads, so it runs in any empty folder.',
    tryIt: {
      steps: [
        'Make a folder `~/java-practice/io-basics` and `cd` into it.',
        'Write `Diary.java`: it asks for one line with `Scanner`, then appends that line to `diary.txt` with `Files.writeString(path, line + "\\n", StandardOpenOption.CREATE, StandardOpenOption.APPEND)`.',
        'After writing, it reads all lines with `Files.readAllLines` and prints them with line numbers.',
        'Compile with `javac Diary.java`. Run `java Diary` three times and type a different line each time.',
        'Run `cat diary.txt` in the terminal.'
      ],
      see: 'the list grows by one line on each run, and `cat` shows the same lines as your program.'
    },
    check: [
      { q: 'You run `java Report` from `/home/ada/work`. The program opens `Path.of("data/scores.csv")`. Which file does it open?', a: '`/home/ada/work/data/scores.csv`. A relative path starts at the working directory, the folder you ran `java` in.' },
      { q: 'What is the difference between `Files.writeString(path, text)` and `Files.writeString(path, text, StandardOpenOption.CREATE, StandardOpenOption.APPEND)`?', a: 'The first replaces the whole file. The second keeps the old content and adds the text at the end (and creates the file if it is missing).' },
      { q: 'Your file has 3 GB of log lines. Why is `Files.readAllLines` a bad idea, and what do you use instead?', a: '`readAllLines` puts every line into memory at once. Use `Files.newBufferedReader` (or `Files.lines`) in try-with-resources and handle one line at a time.' },
      { q: 'Why does a file you wrote with a `BufferedWriter` sometimes stay empty?', a: 'The text waits in the buffer. It reaches the disk only on `flush()` or `close()`. Use try-with-resources so `close()` always runs.' },
      { q: 'Which exception tells you that a file does not exist, and which class is its parent?', a: '`NoSuchFileException`. It is a `FileSystemException`, which is an `IOException`.' }
    ]
  }, [
    {
      id: 'files-and-paths',
      title: 'Files, Folders and Paths',
      category: 'concept',
      icon: '/',
      tagline: 'Every file has an address',
      glossary: Java.ioBasicsGlossary,
      realWorld: 'A house address: country, city, street, house number. A full address finds the house from anywhere. "Two doors down" only works if you know where you stand.',
      kid: [
        'Your computer has a big cupboard. Inside are boxes, and boxes can hold smaller boxes. A box is a **folder**. A sheet of paper inside a box is a **file**.',
        'To find a sheet, you say the way to it: "open the big box, then the red box, then take the sheet called notes". That way is a **path**.',
        'You can give the way from the front door of the house. That always works. Or you can give it from where you stand right now: "the box next to you". That only works if everybody knows where you stand.'
      ],
      definition: 'A **file** is a named row of bytes on a disk. A **folder** (also called a directory) holds files and other folders. A **path** is the address of a file or folder, and in Java you hold it in a `java.nio.file.Path`, made with `Path.of(...)`.',
      explain: [
        'The disk does not know words like "notes". It stores **bytes**: numbers from 0 to 255. A file is a long row of bytes with a name. A text file is a file whose bytes stand for characters.',
        'Folders nest inside each other like a family tree. The top is the **root**. On Ubuntu and macOS the root is written `/`. Each step down adds a name and a `/`: `/home/ada/notes.txt` means "from the root, into `home`, into `ada`, the file `notes.txt`".',
        'An **absolute path** starts at the root, so it begins with `/`. It means the same file from everywhere. A **relative path** like `notes.txt` or `data/notes.txt` has no `/` at the start. Java starts it from the **working directory**: the folder you were in when you typed `java ...`.',
        'Java keeps a path in an object of type `Path`. `Path.of("data", "notes.txt")` joins the parts with the right separator for your system. Making a `Path` does not touch the disk: the file does not need to exist yet. Only the methods of the class `Files` (next lessons) read and write.',
        'A `Path` can answer questions about itself: `getFileName()` is the last part, `getParent()` is everything before it, `isAbsolute()` tells you which kind it is, `resolve("x")` adds a part, and `normalize()` removes `.` (this folder) and `..` (one folder up).'
      ],
      why: 'Every file operation needs to know where the file is. A clear path is the difference between "file not found" and a working program.',
      whenUse: 'Every time you read or write a file or folder. Use relative paths for files that live next to your program, absolute paths for fixed places on one machine.',
      syntax: '`Path p = Path.of("part", "more", "file.txt");` · `p.getFileName()` · `p.getParent()` · `p.isAbsolute()` · `p.resolve("child")` · `p.normalize()`',
      fileName: 'PathsDemo.java',
      code: `import java.nio.file.Path;

public class PathsDemo {
    public static void main(String[] args) {
        // A relative path: it starts from the folder you run java in
        Path notes = Path.of("notes.txt");
        // Several parts are joined with the right separator
        Path report = Path.of("data", "2024", "report.txt");
        // An absolute path: it starts at the root "/"
        Path home = Path.of("/home/ada/notes.txt");

        System.out.println("notes:  " + notes);
        System.out.println("report: " + report);
        System.out.println("home:   " + home);

        System.out.println("notes absolute? " + notes.isAbsolute());
        System.out.println("home absolute?  " + home.isAbsolute());

        System.out.println("file name: " + report.getFileName());
        System.out.println("parent:    " + report.getParent());
        System.out.println("root:      " + home.getRoot());

        // resolve adds a part at the end
        Path data = Path.of("data");
        System.out.println("resolved:  " + data.resolve("scores.csv"));

        // normalize removes "." and ".." steps
        Path messy = Path.of("data/./old/../scores.csv");
        System.out.println("clean:     " + messy.normalize());
    }
}`,
      output: `notes:  notes.txt
report: data/2024/report.txt
home:   /home/ada/notes.txt
notes absolute? false
home absolute?  true
file name: report.txt
parent:    data/2024
root:      /
resolved:  data/scores.csv
clean:     data/scores.csv`,
      codeSummary: 'The program builds four paths and asks them questions. It never touches the disk: none of these files has to exist.',
      codeExplanation: [
        { label: 'Line 1', code: 'import java.nio.file.Path;', text: '`Path` lives in the package `java.nio.file` ("nio" means "new input/output"). Without the import, the compiler does not know the name.' },
        { label: 'Line 6', code: 'Path notes = Path.of("notes.txt");', text: 'A relative path with one part. It means "the file notes.txt in the working directory".' },
        { label: 'Line 8', code: 'Path report = Path.of("data", "2024", "report.txt");', text: '`Path.of` takes several parts and joins them with `/` (on Windows with `\\`). You never glue folder names with `+` yourself.' },
        { label: 'Line 10', code: 'Path home = Path.of("/home/ada/notes.txt");', text: 'The leading `/` makes this an absolute path. It points to the same file whatever folder you are in.' },
        { label: 'Line 16', code: 'notes.isAbsolute()', text: 'Answers `false` for `notes.txt` and `true` for `/home/ada/notes.txt`.' },
        { label: 'Line 19', code: 'report.getFileName()', text: 'The last part of the path: `report.txt`. It is again a `Path`, and `println` shows it as text.' },
        { label: 'Line 20', code: 'report.getParent()', text: 'Everything before the last part: `data/2024`. For a path with one part it returns `null`.' },
        { label: 'Line 21', code: 'home.getRoot()', text: 'The root of an absolute path, `/`. A relative path has no root, so this would return `null`.' },
        { label: 'Line 25', code: 'data.resolve("scores.csv")', text: '`resolve` builds a new path one step deeper. The old `data` path does not change: paths are immutable, like strings.' },
        { label: 'Line 29', code: 'messy.normalize()', text: '`.` means "this folder" and `..` means "one folder up". `normalize` removes those steps: `data/./old/../scores.csv` becomes `data/scores.csv`.' }
      ],
      sections: [
        {
          title: 'Files and folders form a tree',
          text: [
            'Picture the disk as a tree upside down. The root `/` is at the top. Folders are branches, files are leaves. A path is the way from one point of the tree to another.',
            'A file name often ends with an **extension** like `.txt` or `.csv`. The extension is only part of the name. It tells people and programs what is inside, but the disk does not care.'
          ],
          mermaid: 'flowchart TD\n  R["/ (root)"] --> H["home"]\n  H --> A["ada"]\n  A --> N["notes.txt"]\n  A --> P["java-practice"]\n  P --> D["data"]\n  P --> J["PathsDemo.java"]\n  D --> S["scores.csv"]',
          diagramNote: 'The absolute path of `scores.csv` is `/home/ada/java-practice/data/scores.csv`. If your working directory is `/home/ada/java-practice`, the relative path `data/scores.csv` reaches the same file.'
        },
        {
          title: 'Absolute or relative?',
          text: ['Both kinds point at a file. They differ in where the walk starts.'],
          table: {
            head: ['', 'Absolute path', 'Relative path'],
            rows: [
              ['Starts with', '`/` (the root)', 'a name, `.` or `..`'],
              ['Starts the walk at', 'the root of the disk', 'the working directory'],
              ['Example', '`/home/ada/data/scores.csv`', '`data/scores.csv`'],
              ['Same file from every folder?', 'yes', 'no, it depends on where you run `java`'],
              ['Works on a friend computer?', 'only if they have the same folders', 'yes, if the files sit next to the program']
            ],
            note: 'For practice programs, prefer relative paths. Then the program works in any folder that holds its files.'
          }
        },
        {
          title: 'The working directory',
          text: [
            'The **working directory** is the folder your terminal is in when you start the program. `pwd` ("print working directory") shows it, and `cd` changes it. The JVM remembers it in the system property `user.dir`.',
            'The same program can open different files depending on where you start it. Try it in the terminal:'
          ],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `cd ~/java-practice/io-basics
pwd                      # /home/ada/java-practice/io-basics
java PathsDemo           # notes.txt means ~/java-practice/io-basics/notes.txt

cd ~
java -cp ~/java-practice/io-basics PathsDemo
                         # now notes.txt means /home/ada/notes.txt`,
          tip: '`Path.of("").toAbsolutePath()` gives you the working directory inside Java. Print it when a file "is not found" but you are sure it is there.'
        },
        {
          title: 'From relative to absolute in Java',
          text: [
            '`toAbsolutePath()` puts the working directory in front of a relative path. The result depends on your folder, so this program prints only facts that are true everywhere.'
          ],
          fileName: 'WhereAmI.java',
          code: `import java.nio.file.Path;

public class WhereAmI {
    public static void main(String[] args) {
        Path here = Path.of("").toAbsolutePath();      // the working directory
        Path notes = Path.of("notes.txt").toAbsolutePath();

        System.out.println("here is absolute:  " + here.isAbsolute());
        System.out.println("notes file name:   " + notes.getFileName());
        System.out.println("notes sits here:   " + notes.getParent().equals(here));
        System.out.println("same as user.dir:  " + here.toString().equals(System.getProperty("user.dir")));
    }
}`,
          output: `here is absolute:  true
notes file name:   notes.txt
notes sits here:   true
same as user.dir:  true`,
          tip: 'Add `System.out.println(here);` and run the program from two different folders. You see two different absolute paths.'
        },
        {
          title: 'What is inside a text file: bytes and UTF-8',
          text: [
            'A text file stores bytes, not letters. An **encoding** is the rule that turns each character into bytes when you write, and bytes back into characters when you read. Java uses **UTF-8**, the encoding of almost the whole web.',
            'In UTF-8, plain English letters, digits and punctuation take 1 byte each. Letters with accents take 2 bytes, many other symbols 3, emoji 4. So the number of characters and the number of bytes can differ.'
          ],
          table: {
            head: ['Character', 'UTF-8 bytes (hex)', 'Bytes'],
            rows: [['`A`', '`41`', '1'], ['`7`', '`37`', '1'], ['`é`', '`C3 A9`', '2'], ['`€`', '`E2 82 AC`', '3'], ['an emoji', '`F0 9F 98 80`', '4']]
          },
          fileName: 'CountBytes.java',
          code: `import java.nio.charset.StandardCharsets;

public class CountBytes {
    public static void main(String[] args) {
        String[] words = {"cat", "café", "5 €"};
        for (int i = 0; i < words.length; i++) {
            byte[] bytes = words[i].getBytes(StandardCharsets.UTF_8);
            System.out.println("word " + (i + 1) + ": " + words[i].length()
                + " characters, " + bytes.length + " bytes");
        }
    }
}`,
          output: `word 1: 3 characters, 3 bytes
word 2: 4 characters, 5 bytes
word 3: 3 characters, 5 bytes`,
          warn: 'If a program writes with one encoding and another reads with a different one, you see broken letters like `cafÃ©`. Write and read with UTF-8 and the problem never appears.'
        }
      ],
      technical: [
        'The operating system keeps a table for each folder: names and where the bytes of each entry live on the disk. Java does not talk to the disk itself. It asks the operating system, through a **file system provider**. `Path.of` asks the default provider to parse the string into a `Path` for your system.',
        'A `Path` is only a value, like a `String`. It is immutable: `resolve` and `normalize` return new `Path` objects. Nothing checks whether the file exists until you call a method of `Files`.',
        'The working directory belongs to the process. The JVM reads it once at start into `System.getProperty("user.dir")`, and `toAbsolutePath()` puts it in front of relative paths. You cannot change it from inside a running Java program, so start the program in the right folder.',
        'On Windows the separator is `\\` and absolute paths start with a drive like `C:\\`. `Path.of("data", "a.txt")` builds the right form on every system, which is why you pass parts instead of writing separators yourself.'
      ],
      tryIt: {
        steps: [
          'Save `PathsDemo.java` in `~/java-practice/io-basics`, compile it and run it.',
          'Add the line `System.out.println(Path.of("../shared/x.txt").normalize());` and run it again.',
          'Add `System.out.println(Path.of("").toAbsolutePath());` and run it, then run `pwd` in the terminal.'
        ],
        see: '`../shared/x.txt` (normalize keeps a `..` at the start, because there is nothing before it to remove), and the same folder from Java and from `pwd`.'
      },
      check: [
        { q: 'Is `data/scores.csv` absolute or relative? And `/tmp/scores.csv`?', a: '`data/scores.csv` is relative (no `/` at the start). `/tmp/scores.csv` is absolute.' },
        { q: 'Does `Path.of("missing.txt")` throw an error when the file does not exist?', a: 'No. A `Path` is only an address. Errors come later, when `Files` tries to read or write.' },
        { q: 'What does `Path.of("a/b/../c.txt").normalize()` give?', a: '`a/c.txt`. The `..` removes the folder `b` before it.' }
      ],
      keyPoints: [
        'A file is a named row of bytes. A folder holds files and folders.',
        'An absolute path starts at the root `/`. A relative path starts at the working directory.',
        'The working directory is the folder you start `java` in. `pwd` shows it.',
        '`Path.of(...)` builds a path. It does not check the disk.',
        'Text is stored as bytes. UTF-8 is the rule Java uses to turn characters into bytes.'
      ],
      commonMistakes: [
        'Running `java` from another folder and then wondering why `notes.txt` is "not found". Fix: `cd` into the folder that holds the file, or print `Path.of("").toAbsolutePath()`.',
        'Gluing paths by hand: `"data" + "/" + name`. Fix: `Path.of("data", name)` or `dataFolder.resolve(name)`.',
        'Writing an absolute path like `Path.of("/home/ada/notes.txt")` into a program you share. Fix: use a relative path, so the program works on other computers.',
        'Thinking characters and bytes are the same count. Fix: remember `"café".length()` is 4, but the file has 5 bytes in UTF-8.'
      ],
      related: ['Strings & Text', 'Getting started on Ubuntu']
    }
  ]);
})();
