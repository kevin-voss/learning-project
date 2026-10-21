// I/O basics, lesson 7: IOException, NoSuchFileException and friendly error handling.
(function () {
  Java.addCoreLessons('io-basics', [
    {
      id: 'io-errors',
      title: 'File Errors',
      category: 'habits',
      icon: '!',
      tagline: 'IOException, NoSuchFileException and good messages',
      glossary: Java.ioBasicsGlossary,
      realWorld: 'You go to the fridge for juice. Maybe there is no juice. Maybe the fridge is locked. You do not cry and give up: you drink water instead, or you ask for the key.',
      kid: [
        'When you ask the computer for a file, many things can go wrong. The file is not there. The door is locked. The box is full.',
        'Java tells you what went wrong with a note. The big note says "something with files went wrong": `IOException`. Smaller notes say exactly what: "this file is not there" is `NoSuchFileException`.',
        'A good program reads the note and does something sensible: use a default, or tell you in plain words what to do.'
      ],
      definition: 'Every file problem is an `IOException` (a checked exception). Its subclasses say what exactly happened, for example `NoSuchFileException` (missing), `FileAlreadyExistsException`, `AccessDeniedException` (no permission) and `DirectoryNotEmptyException`. Catch the specific ones first, then `IOException` for the rest.',
      explain: [
        'You know `try`, `catch`, checked exceptions and the catch order from [Exceptions](../exceptions/index.html). This lesson shows which exceptions file code throws and how to react to each one.',
        'Most file exceptions from `java.nio.file` are a `FileSystemException`, which is an `IOException`. A `FileSystemException` knows the file it is about: `e.getFile()` returns the path as text. `e.getMessage()` gives the path and, when the operating system gives one, a reason.',
        'The most common one by far is `NoSuchFileException`: the path points at nothing. The cause is almost always a typing mistake in the name, or a wrong working directory (lesson "Files, Folders and Paths").',
        'Java picks the **first** `catch` block that fits. So the specific exception must come before the general one. If `catch (IOException e)` comes first, it catches everything, and the compiler rejects a later `catch (NoSuchFileException e)` as unreachable.',
        'A good error message says three things: **what** failed (reading `settings.txt`), **why** (the file is missing), and **how to fix** it (create it, or start the program in the right folder). A missing settings file is often not even an error: you use default values.'
      ],
      why: 'Files live outside your program, so things go wrong that your code cannot prevent. Handling the errors well turns a scary stack trace into a clear sentence or a sensible default.',
      whenUse: 'Around every file operation in a program other people use. In tiny practice programs, `main(...) throws IOException` is still fine.',
      syntax: '`try { … } catch (NoSuchFileException e) { … } catch (IOException e) { … }` · `e.getFile()` · `e.getMessage()`',
      fileName: 'SafeRead.java',
      code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;

public class SafeRead {
    static String loadSettings(Path path) {
        try {
            return Files.readString(path).strip();
        } catch (NoSuchFileException e) {
            System.out.println("No file " + e.getFile() + " yet, using the default.");
            return "theme=light";
        } catch (IOException e) {
            System.out.println("Could not read " + path + ": " + e.getMessage());
            return "theme=light";
        }
    }

    public static void main(String[] args) {
        Path settings = Path.of("settings.txt");
        System.out.println("1st start: " + loadSettings(settings));

        try {
            Files.writeString(settings, "theme=dark\\n");
        } catch (IOException e) {
            System.out.println("Could not save the settings: " + e.getMessage());
        }
        System.out.println("2nd start: " + loadSettings(settings));
    }
}`,
      output: `No file settings.txt yet, using the default.
1st start: theme=light
2nd start: theme=dark`,
      codeSummary: 'The program loads settings from a file. The first time the file is missing, so it uses a default. Then it saves settings and loads them again.',
      codeExplanation: [
        { label: 'Line 7', code: 'static String loadSettings(Path path) {', text: 'No `throws IOException` here: the method handles every file problem itself and always returns a value.' },
        { label: 'Line 9', code: 'return Files.readString(path).strip();', text: 'Reads the file and removes the line break at the end with `strip()`.' },
        { label: 'Line 10', code: '} catch (NoSuchFileException e) {', text: 'The specific case comes first: the file is not there. For settings that is normal on the first start.' },
        { label: 'Line 11', code: 'e.getFile()', text: 'The path the exception is about, as text: `settings.txt`.' },
        { label: 'Line 12', code: 'return "theme=light";', text: 'A sensible default instead of a crash.' },
        { label: 'Line 13', code: '} catch (IOException e) {', text: 'Every other file problem: no permission, a folder instead of a file, a broken disk. The message includes the reason from the operating system.' },
        { label: 'Line 19', code: 'public static void main(String[] args) {', text: 'No `throws` on `main` either. Every file call is inside a try/catch.' },
        { label: 'Line 24', code: 'Files.writeString(settings, "theme=dark\\n");', text: 'Saving can fail too (full disk, no permission), so it has its own try/catch.' },
        { label: 'Line 28', code: 'System.out.println("2nd start: " + loadSettings(settings));', text: 'Now the file exists, so the first `catch` does not run and the saved value comes back.' }
      ],
      sections: [
        {
          title: 'The family of file exceptions',
          text: ['Each arrow points to the parent. A `catch` for a parent also catches all its children.'],
          mermaid: 'classDiagram\n  IOException <|-- FileSystemException\n  IOException <|-- CharacterCodingException\n  CharacterCodingException <|-- MalformedInputException\n  FileSystemException <|-- NoSuchFileException\n  FileSystemException <|-- FileAlreadyExistsException\n  FileSystemException <|-- AccessDeniedException\n  FileSystemException <|-- DirectoryNotEmptyException\n  class FileSystemException {\n    +getFile() String\n    +getReason() String\n  }',
          diagramNote: '`IOException` is checked. `UncheckedIOException` (from streams like `Files.lines`) is a `RuntimeException` that carries an `IOException` inside.',
          table: {
            head: ['Exception', 'Typical cause', 'Typical fix'],
            rows: [
              ['`NoSuchFileException`', 'wrong name, wrong folder, missing parent folder', 'check the path, `pwd`, `createDirectories`'],
              ['`FileAlreadyExistsException`', '`createFile`, `createDirectory`, `CREATE_NEW` or `copy` onto an existing path', 'use `createDirectories`, or a `REPLACE_EXISTING` option'],
              ['`AccessDeniedException`', 'no permission to read or write', 'check with `ls -l`, pick a folder you own'],
              ['`DirectoryNotEmptyException`', '`Files.delete` on a folder with things inside', 'delete the contents first'],
              ['`MalformedInputException`', 'the bytes are not valid UTF-8', 'read with the charset the file was saved in'],
              ['plain `IOException`', 'reading a folder as a file, disk errors', 'read the message, it names the reason']
            ]
          }
        },
        {
          title: 'A tour of real errors',
          text: ['This program causes four different errors on purpose and prints the name of each exception.'],
          fileName: 'ErrorTour.java',
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.FileSystemException;
import java.nio.file.Path;

public class ErrorTour {
    public static void main(String[] args) throws IOException {
        Path box = Path.of("box");
        Files.createDirectories(box);
        Files.writeString(box.resolve("toy.txt"), "car\\n");

        try {
            Files.readString(Path.of("nothing.txt"));
        } catch (FileSystemException e) {
            System.out.println("1. " + e.getClass().getSimpleName() + " for " + e.getFile());
        }

        try {
            Files.createFile(box.resolve("toy.txt"));
        } catch (FileSystemException e) {
            System.out.println("2. " + e.getClass().getSimpleName() + " for " + e.getFile());
        }

        try {
            Files.delete(box);
        } catch (FileSystemException e) {
            System.out.println("3. " + e.getClass().getSimpleName() + " for " + e.getFile());
        }

        try {
            Files.readString(box);                        // a folder, not a file
        } catch (IOException e) {
            System.out.println("4. " + e.getClass().getSimpleName() + ": " + e.getMessage());
        }
    }
}`,
          output: `1. NoSuchFileException for nothing.txt
2. FileAlreadyExistsException for box/toy.txt
3. DirectoryNotEmptyException for box
4. IOException: Is a directory`,
          tip: '`getClass().getSimpleName()` prints the name of the exception class. It is a quick way to learn which exception a call throws.'
        },
        {
          title: 'Wrong vs right: the catch order',
          text: [
            'Here the general `IOException` comes first. It already catches every `NoSuchFileException`, so the second block could never run. The compiler refuses the program. This example is meant **not** to compile, so it is not run.'
          ],
          fileName: 'WrongOrder.java',
          noRun: true,
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;

public class WrongOrder {
    public static void main(String[] args) {
        try {
            System.out.println(Files.readString(Path.of("settings.txt")));
        } catch (IOException e) {
            System.out.println("Could not read the file.");
        } catch (NoSuchFileException e) {
            System.out.println("The file is missing.");
        }
    }
}`,
          output: `WrongOrder.java:12: error: exception NoSuchFileException has already been caught
        } catch (NoSuchFileException e) {
          ^
1 error`,
          tip: 'Right: swap the two blocks. Child first, parent last, exactly like in `SafeRead.java` above.'
        },
        {
          title: 'Messages that help the user',
          text: [
            'A stack trace helps you, the programmer. A user needs a sentence: what failed, why, and what to do. This program reads files by name, like names a user typed (here they are written in `main`), and turns each problem into such a sentence.',
            'Never write an empty `catch (IOException e) { }`. The error disappears, the program goes on with missing data, and nobody knows why.'
          ],
          fileName: 'FriendlyErrors.java',
          code: `import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;

public class FriendlyErrors {
    static void show(String name) {
        Path path = Path.of(name);
        try {
            int lines = Files.readAllLines(path).size();
            System.out.println(name + ": " + lines + " lines");
        } catch (NoSuchFileException e) {
            System.out.println("Cannot read " + name + ": the file does not exist."
                + " Check the name, or run the program in the folder that holds it.");
        } catch (AccessDeniedException e) {
            System.out.println("Cannot read " + name + ": you have no permission."
                + " Check it with ls -l " + name + ".");
        } catch (IOException e) {
            System.out.println("Cannot read " + name + ": " + e.getMessage());
        }
    }

    public static void main(String[] args) throws IOException {
        Files.writeString(Path.of("songs.txt"), "one\\ntwo\\nthree\\n");
        show("songs.txt");
        show("sogns.txt");                       // a typing mistake
    }
}`,
          output: `songs.txt: 3 lines
Cannot read sogns.txt: the file does not exist. Check the name, or run the program in the folder that holds it.`
        }
      ],
      technical: [
        'Java asks the operating system to open a file. When that fails, the operating system answers with an error number, for example `ENOENT` ("no such entry") or `EACCES` ("access denied"). The JVM turns these numbers into the matching Java class: `ENOENT` becomes `NoSuchFileException`, `EACCES` becomes `AccessDeniedException`, `EEXIST` becomes `FileAlreadyExistsException`.',
        'Errors that have no special class become a plain `FileSystemException` or `IOException` with the operating system text as its message, like `Is a directory`. That text can differ a little between Ubuntu, macOS and Windows.',
        'The old class `java.io.FileReader` reports a missing file as `java.io.FileNotFoundException` instead. Both are an `IOException`, so `catch (IOException e)` covers old and new code.',
        'An exception inside try-with-resources still closes the file before your `catch` runs, as you saw with the door in lesson "Read Big Files Line by Line". So handling an error never leaves a file open.'
      ],
      tryIt: {
        steps: [
          'Save `SafeRead.java`, compile and run it twice.',
          'Run `chmod 000 settings.txt` (nobody may read it now) and run the program again.',
          'Run `chmod 644 settings.txt` to give the permission back.'
        ],
        see: 'the default only on the very first run. After `chmod 000`, reading and saving both fail with an `AccessDeniedException`, so the second `catch` prints `Could not read settings.txt: settings.txt` and both starts use `theme=light`. The message is only the file name: a good reason to write your own sentence. (As root, the permission is ignored and everything works.)'
      },
      check: [
        { q: 'Is `NoSuchFileException` checked or unchecked, and why can `catch (IOException e)` catch it?', a: 'Checked. It is a subclass of `FileSystemException`, which is a subclass of `IOException`.' },
        { q: 'Why does `catch (IOException e)` before `catch (NoSuchFileException e)` not compile?', a: 'The first block already catches every `NoSuchFileException`, so the second can never run. Java reports it as already caught.' },
        { q: 'Name the three parts of a helpful error message.', a: 'What failed, why it failed, and how to fix it.' }
      ],
      keyPoints: [
        'Every file problem is an `IOException`, and it is checked.',
        '`NoSuchFileException` (missing file) is the most common one.',
        'Catch specific exceptions first, `IOException` last.',
        '`e.getFile()` names the file; `e.getMessage()` adds the reason.',
        'Give the user what, why and how to fix. Never swallow the exception.'
      ],
      commonMistakes: [
        'An empty `catch (IOException e) { }`. Fix: at least print a clear message, or let the exception go on with `throws`.',
        '`catch (IOException e)` before `catch (NoSuchFileException e)`: compile error. Fix: specific first.',
        'Printing only `e.getMessage()` for a missing file: the user sees `notes.txt` and nothing else. Fix: write a full sentence, for example "the file notes.txt does not exist".',
        'Catching `Exception` around everything. Fix: catch `IOException` (and its children), so real bugs like `NullPointerException` are not hidden.'
      ],
      related: ['Exceptions', 'read-file', 'folders-and-checks']
    }
  ]);
})();
