// I/O basics, lesson 5: write piece by piece with BufferedWriter and PrintWriter.
(function () {
  Java.addCoreLessons('io-basics', [
    {
      id: 'buffered-writer',
      title: 'Write Piece by Piece',
      category: 'practice',
      icon: '✎',
      tagline: 'BufferedWriter and PrintWriter',
      glossary: Java.ioBasicsGlossary,
      realWorld: 'Carrying sand to a sandcastle. You do not walk to the sea for every single grain. You fill a bucket, and when it is full you carry it over and pour it out.',
      kid: [
        'Writing to the disk is a long walk. If Java walked to the disk for every letter, it would be very slow.',
        'So Java has a bucket. Each letter you write goes into the bucket first. When the bucket is full, Java carries it to the disk and pours it all out at once. The bucket is the **buffer**.',
        'When you are finished, you must pour out the last half-full bucket. That is `close()`. If you forget, the last letters never reach the disk.'
      ],
      definition: 'A `BufferedWriter` from `Files.newBufferedWriter(path)` collects text in a buffer and writes it to the file in big blocks. A `PrintWriter` wrapped around it gives you `println` and `printf`, like `System.out`. Text reaches the file on `flush()` or `close()`, so you open writers in try-with-resources.',
      explain: [
        '`Files.write` and `Files.writeString` need all the text ready at once. Often you produce text step by step: one line per loop round, one row per customer. A **writer** lets you send text in many small pieces while the file stays open.',
        '`Files.newBufferedWriter(path)` opens the file (create or replace, like `writeString`) and returns a `BufferedWriter`. `write(text)` adds text, `newLine()` adds a line break. The text first goes into a **buffer** in memory, 8192 characters big.',
        '**Flushing** means "send what is in the buffer to the file now". The writer flushes by itself when the buffer is full, and `close()` flushes one last time and then releases the file. Until then, the newest text is only in memory. This is why a writer belongs in try-with-resources, as you saw for readers.',
        'A `PrintWriter` adds the comfortable methods you know from `System.out`: `print`, `println` and `printf` (formatted text, `%d` for a whole number, `%s` for a string, `%n` for a line break). You build it around a buffered writer: `new PrintWriter(Files.newBufferedWriter(path))`.',
        'The same open options as before work here: `Files.newBufferedWriter(path, StandardOpenOption.CREATE, StandardOpenOption.APPEND)` adds to the end of the file.'
      ],
      why: 'When a program creates a long file step by step, one open file and one buffer are much faster than opening and closing the file for every line.',
      whenUse: 'Reports, exports and logs that you build in a loop. Use `PrintWriter` when you want `println` or `printf`, `BufferedWriter` when `write` and `newLine` are enough.',
      syntax: '`try (BufferedWriter w = Files.newBufferedWriter(path)) { w.write("text"); w.newLine(); }` · `try (PrintWriter out = new PrintWriter(Files.newBufferedWriter(path))) { out.println("text"); }`',
      fileName: 'WriterDemo.java',
      code: `import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class WriterDemo {
    public static void main(String[] args) throws IOException {
        Path table = Path.of("times-table.txt");

        try (BufferedWriter writer = Files.newBufferedWriter(table)) {
            writer.write("The 7 times table");
            writer.newLine();
            for (int i = 1; i <= 5; i++) {
                writer.write(i + " x 7 = " + (i * 7));
                writer.newLine();
            }
        } // close() flushes the buffer and releases the file

        System.out.print(Files.readString(table));
        System.out.println("(" + Files.readAllLines(table).size() + " lines written)");
    }
}`,
      output: `The 7 times table
1 x 7 = 7
2 x 7 = 14
3 x 7 = 21
4 x 7 = 28
5 x 7 = 35
(6 lines written)`,
      codeSummary: 'The program opens one writer, writes a title and five lines in a loop, closes the writer and then reads the file back to show it.',
      codeExplanation: [
        { label: 'Line 1', code: 'import java.io.BufferedWriter;', text: 'Like `BufferedReader`, the writer lives in `java.io`.' },
        { label: 'Line 10', code: 'try (BufferedWriter writer = Files.newBufferedWriter(table)) {', text: 'Opens `times-table.txt` for writing (UTF-8, create or replace) and puts the writer in try-with-resources.' },
        { label: 'Line 11', code: 'writer.write("The 7 times table");', text: '`write` adds text to the buffer. It does **not** add a line break.' },
        { label: 'Line 12', code: 'writer.newLine();', text: 'Adds the line break of your system (`\\n` on Ubuntu).' },
        { label: 'Line 13', code: 'for (int i = 1; i <= 5; i++) {', text: 'The file stays open for the whole loop. Each round adds one line to the buffer.' },
        { label: 'Line 14', code: 'writer.write(i + " x 7 = " + (i * 7));', text: 'Builds the line as a `String` first. The brackets around `i * 7` make Java multiply before it joins strings.' },
        { label: 'Line 17', code: '} // close() flushes the buffer and releases the file', text: 'End of the block: Java calls `writer.close()`. Now all six lines are on the disk.' },
        { label: 'Line 19', code: 'System.out.print(Files.readString(table));', text: 'Reads the finished file back. This works only because the writer is closed already.' },
        { label: 'Line 20', code: 'Files.readAllLines(table).size()', text: 'Counts the lines in the file: one title plus five rows.' }
      ],
      sections: [
        {
          title: 'The bucket: how a buffer works',
          text: ['Every `write` lands in the buffer. The disk is only touched when the buffer is full, or when you flush or close.'],
          mermaid: 'flowchart LR\n  P["your code: write(...)"] --> B["buffer in memory (8192 chars)"]\n  B -- "full, flush() or close()" --> E["UTF-8 encoder"]\n  E --> D["file on disk"]',
          diagramNote: 'Many small `write` calls, few slow trips to the disk. The encoder turns characters into bytes on the way.'
        },
        {
          title: 'Wrong vs right: the forgotten close',
          text: [
            'This program writes `hello` and looks at the file size before and after closing. Before `close()`, the word is still in the buffer, so the file is empty.'
          ],
          fileName: 'ForgotClose.java',
          code: `import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class ForgotClose {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("hello.txt");

        // Wrong: no try-with-resources, no close yet
        BufferedWriter writer = Files.newBufferedWriter(path);
        writer.write("hello");
        System.out.println("before close: " + Files.size(path) + " bytes");

        writer.close();
        System.out.println("after close:  " + Files.size(path) + " bytes");

        // Right: try-with-resources closes for you
        try (BufferedWriter safe = Files.newBufferedWriter(path)) {
            safe.write("hello again");
        }
        System.out.println("safe version: " + Files.size(path) + " bytes");
    }
}`,
          output: `before close: 0 bytes
after close:  5 bytes
safe version: 11 bytes`,
          warn: 'If a program crashes before `close()`, the text in the buffer is lost. try-with-resources closes the writer even when an exception flies through the block.'
        },
        {
          title: 'PrintWriter: println and printf into a file',
          text: [
            'Wrap the buffered writer in a `PrintWriter` and you can write to the file exactly like you print to the screen. `printf` lines up columns: `%-6s` is a string, left-aligned, 6 wide; `%3d` is a whole number, right-aligned, 3 wide; `%n` is a line break.'
          ],
          fileName: 'PrintWriterDemo.java',
          code: `import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;

public class PrintWriterDemo {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("scores.txt");
        String[] names = {"Ada", "Kai", "Mina"};
        int[] points = {92, 7, 105};

        try (PrintWriter out = new PrintWriter(Files.newBufferedWriter(path))) {
            out.println("Name   Points");
            out.println("-------------");
            for (int i = 0; i < names.length; i++) {
                out.printf("%-6s %3d%n", names[i], points[i]);
            }
        }

        System.out.print(Files.readString(path));
    }
}`,
          output: `Name   Points
-------------
Ada     92
Kai      7
Mina   105`,
          tip: 'Closing the `PrintWriter` also closes the writer inside it. You need only one name in the try brackets.'
        },
        {
          title: 'Append with a writer',
          text: [
            'Pass the open options to `newBufferedWriter`. Here the program opens the same file twice. The second time it appends.'
          ],
          fileName: 'AppendWriter.java',
          code: `import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class AppendWriter {
    static void addEntry(Path diary, String text) throws IOException {
        try (PrintWriter out = new PrintWriter(Files.newBufferedWriter(diary,
                StandardOpenOption.CREATE, StandardOpenOption.APPEND))) {
            out.println(text);
        }
    }

    public static void main(String[] args) throws IOException {
        Path diary = Path.of("diary.txt");
        addEntry(diary, "Monday: rain");
        addEntry(diary, "Tuesday: sun");
        System.out.print(Files.readString(diary));
    }
}`,
          output: `Monday: rain
Tuesday: sun`
        },
        {
          title: 'Which writing tool when?',
          table: {
            head: ['You want to …', 'Use'],
            rows: [
              ['save one small `String`', '`Files.writeString(path, text)`'],
              ['save a list you already have', '`Files.write(path, lines)`'],
              ['write many lines in a loop', '`Files.newBufferedWriter(path)` + `write` / `newLine`'],
              ['use `println` / `printf` into a file', '`new PrintWriter(Files.newBufferedWriter(path))`'],
              ['add to the end', 'any of these plus `CREATE, APPEND`']
            ]
          },
          text: ['All of them use UTF-8 and all of them throw `IOException` when the file cannot be opened.']
        }
      ],
      technical: [
        '`Files.newBufferedWriter` builds a chain: a byte stream to the file, an `OutputStreamWriter` that encodes characters to UTF-8 bytes, and a `BufferedWriter` in front. `close()` on the outer writer flushes and closes the whole chain from the outside in.',
        '`newLine()` writes `System.lineSeparator()`. `PrintWriter.println` does the same, and `%n` in `printf` too. Prefer them over a hard `\\n` when the file is meant for the system it is written on.',
        '`PrintWriter` never throws `IOException` from `print` or `println`. It swallows write errors and only remembers them; you can ask with `out.checkError()`. Opening the file can still throw, which is why `main` keeps `throws IOException`. For important data, `BufferedWriter` is the safer choice, because its errors always reach you.',
        '`printf` follows your computer language settings (the **locale**) for some formats. With `%d` and `%s` that does not matter. With `%.2f` a German system writes `3,50` instead of `3.50`; pass `Locale.ROOT` as the first argument when the file must always use a dot.'
      ],
      tryIt: {
        steps: [
          'Save `WriterDemo.java`, compile and run it.',
          'Change it to write the 9 times table from 1 to 10.',
          'Remove the try brackets: open the writer with `BufferedWriter writer = Files.newBufferedWriter(table);` and do not call `close()`. Run it.'
        ],
        see: 'ten lines in the file first; then, without `close()`, `Files.readString` prints nothing, because the text never left the buffer.'
      },
      check: [
        { q: 'What is the difference between `write("x")` and `newLine()` on a `BufferedWriter`?', a: '`write` adds text without a line break. `newLine` adds the line break.' },
        { q: 'You wrote 3 lines with a `BufferedWriter`, but the file is empty. What did you forget?', a: 'To close (or flush) the writer. The lines are still in the buffer. Use try-with-resources.' },
        { q: 'Which writer gives you `printf` for a file?', a: '`PrintWriter`, for example `new PrintWriter(Files.newBufferedWriter(path))`.' }
      ],
      keyPoints: [
        'A writer keeps the file open, so you can write in many small steps.',
        'The buffer collects text in memory and writes it in big blocks.',
        'Text reaches the disk on `flush()` or `close()`. Always use try-with-resources.',
        '`PrintWriter` gives you `print`, `println` and `printf` for files.',
        'Open options like `CREATE, APPEND` work for writers too.'
      ],
      commonMistakes: [
        'Forgetting `close()`: the file stays empty or misses its last lines. Fix: `try (BufferedWriter w = Files.newBufferedWriter(path)) { … }`.',
        'Expecting `write` to add a line break: `w.write("a"); w.write("b");` gives `ab`. Fix: call `w.newLine()` after each line.',
        'Opening a new writer for every line in a loop without `APPEND`: each one replaces the file, only the last line is left. Fix: open one writer before the loop.',
        'Reading the file inside the try block before the writer is closed and seeing old or no content. Fix: read after the block ends.'
      ],
      related: ['read-line-by-line', 'write-lines', 'Strings & Text']
    }
  ]);
})();
