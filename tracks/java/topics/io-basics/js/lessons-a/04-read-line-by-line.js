// I/O basics, lesson 4: big files line by line with BufferedReader, Files.lines and try-with-resources.
(function () {
  Java.addCoreLessons('io-basics', [
    {
      id: 'read-line-by-line',
      title: 'Read Big Files Line by Line',
      category: 'practice',
      icon: '↓',
      tagline: 'BufferedReader, Files.lines, try-with-resources',
      glossary: Java.ioBasicsGlossary,
      realWorld: 'Eating a pizza. You do not push the whole pizza into your mouth. You take one slice, eat it, then take the next one.',
      kid: [
        'A really big book does not fit on your little table. So you do not put the whole book there. You read one line, then the next line, then the next.',
        'A **BufferedReader** is a helper who sits next to the book and hands you one line each time you ask. When the book is finished, the helper says "nothing more" (in Java: `null`).',
        'When you are done, you close the book and put it back on the shelf. try-with-resources is a rule that closes the book for you, even if you spill your juice in the middle.'
      ],
      definition: 'A `BufferedReader` from `Files.newBufferedReader(path)` reads a file one line at a time with `readLine()`, which returns `null` at the end. You open it in a **try-with-resources** block, so Java closes the file for you. `Files.lines(path)` gives the same lines as a stream.',
      explain: [
        '`readString` and `readAllLines` load the whole file into memory. That is fine for a page of notes, but a log file can be 5 GB. Your program would run out of memory. Reading **line by line** keeps only one line in memory at a time, so the file can be as big as you like.',
        'A **reader** is an object that delivers characters from a source, here a file. A `BufferedReader` is a reader with a **buffer**: it fetches a big block (8192 characters) from the disk at once and hands it out line by line. This is much faster than asking the disk for every single character.',
        '`reader.readLine()` returns the next line as a `String`, without the line break. At the end of the file there is no next line, and it returns `null`. So the usual loop reads "while the line I got is not null".',
        'An open file is a **resource**: the operating system lends it to you and wants it back. If you never call `close()`, the file stays locked and your program can run out of open files. A **try-with-resources** block, `try (BufferedReader reader = ...) { ... }`, calls `reader.close()` at the end of the block in every case: normal end, `return`, or exception. You know `try` from [Exceptions](../exceptions/index.html); the brackets after `try` are the new part.',
        '`Files.lines(path)` returns a `Stream<String>`: a conveyor belt that brings the lines one by one. You attach steps like `filter` (keep only some lines) and `count` (count them). A stream from a file is also a resource, so it goes into try-with-resources too.'
      ],
      why: 'Real data is often big: logs, exports, measurement files. Line by line reading works for every size, and try-with-resources makes sure files are never left open.',
      whenUse: 'Whenever a file might be large, or when you only need to look at each line once (count, search, sum). Also whenever you open a reader or writer yourself: always with try-with-resources.',
      syntax: '`try (BufferedReader reader = Files.newBufferedReader(path)) { String line; while ((line = reader.readLine()) != null) { … } }`',
      fileName: 'ReadLineByLine.java',
      code: `import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class ReadLineByLine {
    public static void main(String[] args) throws IOException {
        Path log = Path.of("app.log");
        Files.write(log, List.of(          // make a small test file
            "INFO  app started",
            "INFO  user ada logged in",
            "ERROR disk almost full",
            "INFO  user kai logged in",
            "ERROR could not save photo.png",
            "INFO  app stopped"));

        int lineNumber = 0;
        int errors = 0;
        try (BufferedReader reader = Files.newBufferedReader(log)) {
            String line;
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                if (line.startsWith("ERROR")) {
                    errors++;
                    System.out.println("line " + lineNumber + ": " + line);
                }
            }
        } // reader.close() runs here, by itself
        System.out.println(errors + " errors in " + lineNumber + " lines");
    }
}`,
      output: `line 3: ERROR disk almost full
line 5: ERROR could not save photo.png
2 errors in 6 lines`,
      codeSummary: 'The program first makes a small log file. Then it reads it one line at a time, prints every line that starts with ERROR and counts all lines.',
      codeExplanation: [
        { label: 'Line 1', code: 'import java.io.BufferedReader;', text: '`BufferedReader` is in the package `java.io`.' },
        { label: 'Line 10', code: 'Files.write(log, List.of(', text: 'Makes the test file, so the example runs in any empty folder. In a real program the file already exists.' },
        { label: 'Line 20', code: 'try (BufferedReader reader = Files.newBufferedReader(log)) {', text: 'Opens the file for reading with UTF-8. Because it stands in the brackets of `try`, Java closes it at the end of the block.' },
        { label: 'Line 21', code: 'String line;', text: 'A variable for the current line. It is declared outside the loop because the loop condition fills it.' },
        { label: 'Line 22', code: 'while ((line = reader.readLine()) != null) {', text: 'Two things in one: read the next line into `line`, then check that it is not `null`. `null` means "end of file", and the loop stops.' },
        { label: 'Line 23', code: 'lineNumber++;', text: 'Counts every line. We never store the lines, so memory use stays tiny even for a huge file.' },
        { label: 'Line 24', code: 'if (line.startsWith("ERROR")) {', text: 'Normal `String` work on the current line. Here we look for lines that start with `ERROR`.' },
        { label: 'Line 29', code: '} // reader.close() runs here, by itself', text: 'The end of the try-with-resources block. The file is closed now, before the last `println`.' },
        { label: 'Line 30', code: 'System.out.println(errors + " errors in " + lineNumber + " lines");', text: 'The summary after the loop: 2 of the 6 lines were errors.' }
      ],
      sections: [
        {
          title: 'All at once or one line at a time',
          text: [
            'The difference is what sits in memory. With `readAllLines` the whole file is there. With a `BufferedReader` only one buffer and one line are there.'
          ],
          mermaid: 'flowchart LR\n  subgraph A["readAllLines"]\n    F1["file on disk (5 GB)"] --> M1["List with every line (5 GB in memory)"]\n  end\n  subgraph B["BufferedReader"]\n    F2["file on disk (5 GB)"] --> BUF["buffer (8192 chars)"] --> L["one line"]\n  end',
          diagramNote: 'Left: memory grows with the file. Right: memory stays the same size, however big the file is.',
          table: {
            head: ['', '`readAllLines` / `readString`', '`BufferedReader` / `Files.lines`'],
            rows: [
              ['Memory', 'the whole file', 'one buffer and one line'],
              ['File size', 'small (up to a few MB)', 'any size'],
              ['Go back to an earlier line?', 'yes, it is in the list', 'no, only forward'],
              ['You must close it?', 'no, the method closes', 'yes, with try-with-resources']
            ]
          }
        },
        {
          title: 'The read loop, slowly',
          text: [
            'The line `while ((line = reader.readLine()) != null)` looks strange the first time. In Java an assignment is also a value: `(line = reader.readLine())` stores the line and then is that line. So the condition compares the line you read with `null`.',
            'If you find it hard to read, write it in two steps. Both loops do exactly the same thing:'
          ],
          fileName: 'TwoLoops.java',
          code: `import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class TwoLoops {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("colors.txt");
        Files.write(path, List.of("red", "green", "blue"));

        // Short form
        try (BufferedReader reader = Files.newBufferedReader(path)) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("short: " + line);
            }
        }

        // Long form: read once before the loop, then at the end of each round
        try (BufferedReader reader = Files.newBufferedReader(path)) {
            String line = reader.readLine();
            while (line != null) {
                System.out.println("long:  " + line);
                line = reader.readLine();
            }
        }
    }
}`,
          output: `short: red
short: green
short: blue
long:  red
long:  green
long:  blue`,
          warn: 'Forgetting the inner brackets breaks the loop: `while (line = reader.readLine() != null)` compares first and then tries to store a `boolean` in a `String`. It does not compile.'
        },
        {
          title: 'try-with-resources: closing for you',
          text: [
            'Any object whose class says `implements AutoCloseable` (it promises to have a `close()` method) can stand in the brackets of `try`. Readers, writers, streams and `Scanner` all do.',
            'To see exactly when Java calls `close()`, here is a tiny pretend resource: a `Door` that prints when it opens and closes. The `try` block throws an exception on purpose.'
          ],
          fileName: 'CloseDemo.java',
          code: `public class CloseDemo {
    // A pretend resource. AutoCloseable means "I have a close() method".
    static class Door implements AutoCloseable {
        Door() {
            System.out.println("door opened");
        }

        public void close() {
            System.out.println("door closed");
        }
    }

    public static void main(String[] args) {
        try (Door door = new Door()) {
            System.out.println("walking through");
            throw new IllegalStateException("tripped over the cat");
        } catch (IllegalStateException e) {
            System.out.println("caught: " + e.getMessage());
        }
        System.out.println("done");
    }
}`,
          output: `door opened
walking through
door closed
caught: tripped over the cat
done`,
          tip: 'Look at the order: the door closes **before** the `catch` block runs. With several resources, `try (A a = ...; B b = ...)`, Java closes them in reverse order: `b` first, then `a`.'
        },
        {
          title: 'Files.lines: the same lines as a stream',
          text: [
            'A **stream** is a conveyor belt of values. `filter(line -> line.startsWith("ERROR"))` keeps only matching lines. The part `line -> ...` is a **lambda**: a tiny function without a name that says "for each line, check this". `count()` counts what is left, `forEach(...)` does something with each one.',
            'The stream reads the file lazily, line by line, like a `BufferedReader`. Each stream can run only once, so the program opens the file twice.'
          ],
          fileName: 'CountWithLines.java',
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public class CountWithLines {
    public static void main(String[] args) throws IOException {
        Path log = Path.of("app.log");
        Files.write(log, List.of("INFO  start", "ERROR no disk", "INFO  retry",
            "ERROR still no disk", "INFO  stop"));

        try (Stream<String> lines = Files.lines(log)) {
            long errors = lines.filter(line -> line.startsWith("ERROR")).count();
            System.out.println("errors: " + errors);
        }

        try (Stream<String> lines = Files.lines(log)) {
            lines.filter(line -> line.startsWith("ERROR"))
                 .map(line -> line.substring(6))          // cut off "ERROR "
                 .forEach(line -> System.out.println("- " + line));
        }
    }
}`,
          output: `errors: 2
- no disk
- still no disk`,
          tip: 'If streams feel new, use the `BufferedReader` loop. Both read the file line by line; pick the one you can read more easily.'
        },
        {
          title: 'A file with 100 000 lines',
          text: [
            'Here the program makes a test file with the numbers 1 to 100 000, one per line, and then adds them up while reading. Only one line is in memory at any time while it reads.'
          ],
          fileName: 'SumBigFile.java',
          code: `import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class SumBigFile {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("numbers.txt");
        List<String> testData = new ArrayList<>();      // only to make the test file
        for (int i = 1; i <= 100_000; i++) {
            testData.add(String.valueOf(i));
        }
        Files.write(path, testData);

        long sum = 0;
        int count = 0;
        try (BufferedReader reader = Files.newBufferedReader(path)) {
            String line;
            while ((line = reader.readLine()) != null) {
                sum += Long.parseLong(line);
                count++;
            }
        }
        System.out.println("lines: " + count);
        System.out.println("sum:   " + sum);
        System.out.println("file:  " + Files.size(path) + " bytes");
    }
}`,
          output: `lines: 100000
sum:   5000050000
file:  588895 bytes`,
          tip: 'The sum is bigger than an `int` can hold, so it is a `long`. See [Types and variables](../types-and-variables/index.html).'
        }
      ],
      technical: [
        '`Files.newBufferedReader(path)` builds a small chain for you: a byte stream that reads the file, an `InputStreamReader` that decodes UTF-8 bytes into characters, and a `BufferedReader` around it. The Deeper lesson "Bytes and Characters" draws this chain.',
        'The buffer holds 8192 characters by default. When it is empty, the reader asks the operating system for the next block in one call. A **system call** (a request from your program to the operating system) is slow compared to normal Java code, so a few big calls beat many small ones by far.',
        'try-with-resources is translated by the compiler into a `try`/`finally` that calls `close()`. If the block throws and `close()` throws too, the first exception wins and the second one is attached to it as a **suppressed** exception (`e.getSuppressed()`), so no error is lost.',
        'A stream from `Files.lines` that hits a read error in the middle cannot throw a checked `IOException` from inside `filter` or `forEach`. It wraps the error in an `UncheckedIOException` instead, which is a `RuntimeException`.'
      ],
      tryIt: {
        steps: [
          'Save `ReadLineByLine.java`, compile and run it.',
          'Change the `if` so it prints lines that contain `"user"` (use `line.contains("user")`).',
          'Move the last `println` inside the try block and run again. Then try to use `reader` after the closing `}` of the block and compile.'
        ],
        see: 'the two `user` lines; and a compile error `cannot find symbol ... reader` in the last step, because the reader only exists inside the try-with-resources block.'
      },
      check: [
        { q: 'What does `reader.readLine()` return when the file has no more lines?', a: '`null`. That is why the loop checks `!= null`.' },
        { q: 'Why do you open a `BufferedReader` inside `try (...)`?', a: 'So Java calls `close()` for you at the end of the block, even when an exception happens. The file is never left open.' },
        { q: 'A program uses `Files.readAllLines` on a 4 GB file and crashes with `OutOfMemoryError`. What is the fix?', a: 'Read it line by line with `Files.newBufferedReader` (or `Files.lines`) and handle each line in the loop instead of storing all of them.' }
      ],
      keyPoints: [
        'Line by line reading keeps memory small, so it works for files of any size.',
        '`Files.newBufferedReader(path)` opens a UTF-8 reader with a buffer.',
        '`readLine()` returns the next line without the line break, or `null` at the end.',
        'Open readers, writers and file streams in try-with-resources so they are always closed.',
        '`Files.lines(path)` gives the lines as a stream; it also belongs in try-with-resources.'
      ],
      commonMistakes: [
        'Opening a reader without try-with-resources and forgetting `close()`. Fix: `try (BufferedReader reader = Files.newBufferedReader(path)) { … }`.',
        'Calling `readLine()` twice in one round: `while (reader.readLine() != null) { System.out.println(reader.readLine()); }` skips every second line. Fix: store the line once in a variable.',
        'Using `readAllLines` for a file that can grow without limit, like a log. Fix: read it line by line.',
        'Writing `Files.lines(path).count()` without try-with-resources: the file stays open. Fix: put the stream in `try (Stream<String> lines = Files.lines(path))`.'
      ],
      related: ['Exceptions', 'write-lines', 'bytes-and-chars']
    }
  ]);
})();
