// I/O basics, lesson 2: write and read a whole text file with Files.writeString / Files.readString.
(function () {
  Java.addCoreLessons('io-basics', [
    {
      id: 'read-file',
      title: 'Write and Read a Whole File',
      category: 'practice',
      icon: 'txt',
      tagline: 'Files.writeString and Files.readString',
      glossary: Java.ioBasicsGlossary,
      realWorld: 'A notebook. You write a page, close the notebook and go to bed. Tomorrow you open it and the page is still there.',
      kid: [
        'When your program stops, it forgets everything, like a dream when you wake up. A file is a notebook that does not forget.',
        '`writeString` is "write this on a fresh page". If the page had old words, they are rubbed out first.',
        '`readString` is "read me the whole page out loud". You get all the words at once.'
      ],
      definition: '`Files.writeString(path, text)` saves a `String` into a file, and `Files.readString(path)` gives you the whole file back as one `String`. Both use UTF-8 and both can throw an `IOException`.',
      explain: [
        'The class `java.nio.file.Files` is a toolbox of **static methods** (you call them on the class, `Files.readString(...)`, without `new`). They take a `Path` that says where the file is.',
        '`Files.writeString(path, text)` opens the file, turns the characters into bytes with UTF-8, writes the bytes and closes the file. If the file does not exist, it is created. If it exists, its old content is thrown away first. This is called **truncating** the file.',
        '`Files.readString(path)` does the opposite: it opens the file, reads every byte, turns the bytes back into characters and closes the file. The line breaks are part of the `String` as `\\n` characters.',
        'Anything can go wrong with a disk: the file is missing, the folder is not there, you have no permission, the disk is full. Java reports these problems with an **IOException**, a **checked exception**. "Checked" means the compiler forces you to either catch it or write `throws IOException` on your method. You met this idea in [Exceptions](../exceptions/index.html).',
        'In small practice programs, `main(String[] args) throws IOException` is fine: if something fails, the program stops and prints the error. In real programs you catch it and show a friendly message (lesson "File Errors").'
      ],
      why: 'Saving and loading a small text, like settings, a note or a high score, is the most common thing programs do with files. These two methods do it in one line each.',
      whenUse: 'For small text files that fit easily into memory: up to a few megabytes. For big files, read line by line (lesson "Read Big Files Line by Line").',
      syntax: '`Files.writeString(Path path, CharSequence text, OpenOption... options)` · `String text = Files.readString(Path path)` · both `throws IOException`',
      fileName: 'ReadFileDemo.java',
      code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class ReadFileDemo {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("notes.txt");

        // 1. Write: creates the file, or replaces what was there
        Files.writeString(path, "buy milk\\nfeed the cat\\n");

        // 2. Read: the whole file comes back as one String
        String text = Files.readString(path);
        System.out.print(text);

        // 3. The String knows its length like any other String
        System.out.println("Characters: " + text.length());
        System.out.println("Bytes on disk: " + Files.size(path));

        // 4. Writing again replaces the old content
        Files.writeString(path, "call grandma\\n");
        System.out.print(Files.readString(path));
    }
}`,
      output: `buy milk
feed the cat
Characters: 22
Bytes on disk: 22
call grandma`,
      codeSummary: 'The program writes two lines into `notes.txt`, reads them back, measures them, then overwrites the file with one new line.',
      codeExplanation: [
        { label: 'Lines 1–3', code: 'import java.io.IOException;', text: '`IOException` lives in the old package `java.io`. `Files` and `Path` live in `java.nio.file`. You need all three imports.' },
        { label: 'Line 6', code: 'public static void main(String[] args) throws IOException {', text: '`throws IOException` tells the compiler: "if a file problem happens, let it fly out of main". Without it (or a try/catch) the program does not compile.' },
        { label: 'Line 7', code: 'Path path = Path.of("notes.txt");', text: 'A relative path: the file sits in the working directory.' },
        { label: 'Line 10', code: 'Files.writeString(path, "buy milk\\nfeed the cat\\n");', text: 'Creates `notes.txt` and writes two lines. `\\n` is the line break character. The method opens and closes the file for you.' },
        { label: 'Line 13', code: 'String text = Files.readString(path);', text: 'Reads every byte, decodes it with UTF-8 and returns one `String` with both lines and both `\\n`.' },
        { label: 'Line 14', code: 'System.out.print(text);', text: '`print`, not `println`: the text already ends with `\\n`, so `println` would add an empty line.' },
        { label: 'Line 17', code: 'text.length()', text: '9 characters for `buy milk\\n` plus 13 for `feed the cat\\n` make 22.' },
        { label: 'Line 18', code: 'Files.size(path)', text: 'The size of the file in bytes. Here it is also 22, because every character is plain English and takes 1 byte in UTF-8.' },
        { label: 'Line 21', code: 'Files.writeString(path, "call grandma\\n");', text: 'Same file again: the two old lines are gone. Only `call grandma` is left. To keep old content you append (next lesson).' }
      ],
      sections: [
        {
          title: 'What happens when you write and read',
          text: ['Both methods do the same three steps: open, move the bytes, close. You see only one line of code, but the file is opened and closed each time.'],
          mermaid: 'sequenceDiagram\n  participant P as Your program\n  participant F as Files\n  participant OS as Operating system\n  P->>F: writeString(path, "buy milk...")\n  F->>OS: open notes.txt (create or empty it)\n  F->>OS: write 22 bytes (UTF-8)\n  F->>OS: close\n  P->>F: readString(path)\n  F->>OS: open notes.txt\n  OS-->>F: 22 bytes\n  F-->>P: String with 22 characters\n  F->>OS: close',
          diagramNote: 'The operating system does the real disk work. `Files` turns characters into bytes on the way in and bytes into characters on the way out.'
        },
        {
          title: 'Why the compiler wants IOException',
          text: [
            'Remove `throws IOException` from `main` and compile. `javac` stops with an error, because `readString` and `writeString` declare that they can throw this checked exception.',
            'You have two choices, as in [Exceptions](../exceptions/index.html): pass it on with `throws`, or catch it. Catching lets you print a clear message instead of a stack trace.'
          ],
          fileName: 'CatchDemo.java',
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class CatchDemo {
    public static void main(String[] args) {
        Path path = Path.of("missing.txt");   // this file is not there
        try {
            String text = Files.readString(path);
            System.out.println(text);
        } catch (IOException e) {
            System.out.println("Could not read " + path);
            System.out.println("Reason: " + e.getClass().getSimpleName());
        }
        System.out.println("The program goes on.");
    }
}`,
          output: `Could not read missing.txt
Reason: NoSuchFileException
The program goes on.`,
          tip: '`NoSuchFileException` is a kind of `IOException`, so `catch (IOException e)` catches it. The lesson "File Errors" shows how to catch it on its own.'
        },
        {
          title: 'Say the encoding out loud',
          text: [
            '`readString` and `writeString` always use UTF-8, even on an older system that prefers another encoding. You can still pass the encoding as a **charset**. A charset is an object that names an encoding, and `StandardCharsets` holds the common ones.',
            'Writing the charset makes the code clear to the reader. It is also needed when you must read a file that someone else saved in another encoding.'
          ],
          fileName: 'CharsetDemo.java',
          code: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class CharsetDemo {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("menu.txt");
        String menu = "café au lait\\n";

        Files.writeString(path, menu, StandardCharsets.UTF_8);
        String back = Files.readString(path, StandardCharsets.UTF_8);

        System.out.println("characters: " + menu.length());
        System.out.println("bytes:      " + Files.size(path));
        System.out.println("same text:  " + back.equals(menu));
    }
}`,
          output: `characters: 13
bytes:      14
same text:  true`,
          tip: 'The file has one byte more than the text has characters: `é` takes 2 bytes in UTF-8.'
        },
        {
          title: 'Edge case: a file that is not UTF-8',
          text: [
            'Not every row of bytes is valid UTF-8. A picture, or a text saved in an old encoding, can contain bytes that UTF-8 does not allow. Then `readString` refuses with a `MalformedInputException` (also a kind of `IOException`) instead of guessing.',
            '`Files.write(path, bytes)` writes raw bytes, so we can make such a file on purpose. The byte `0xFF` never appears in UTF-8.'
          ],
          fileName: 'BadBytes.java',
          code: `import java.io.IOException;
import java.nio.charset.MalformedInputException;
import java.nio.file.Files;
import java.nio.file.Path;

public class BadBytes {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("strange.txt");
        byte[] bytes = {72, 105, (byte) 0xFF};   // "H", "i", then a bad byte
        Files.write(path, bytes);

        try {
            System.out.println(Files.readString(path));
        } catch (MalformedInputException e) {
            System.out.println("Not valid UTF-8: " + e.getMessage());
        }
    }
}`,
          output: 'Not valid UTF-8: Input length = 1',
          warn: '`Input length = 1` means "1 byte could not be decoded". If you see this, the file is either not text or not UTF-8. Ask how it was saved, then read it with the right charset.'
        }
      ],
      technical: [
        '`readString` first asks the operating system how big the file is, makes a `byte[]` of that size, reads all bytes into it, and then **decodes** them: a UTF-8 decoder walks the bytes and builds the `char` values of a new `String`. So the file is in memory twice for a moment, once as bytes and once as characters.',
        '`writeString` **encodes** the characters to bytes and asks the operating system to write them. With no options it uses `CREATE`, `TRUNCATE_EXISTING` and `WRITE`: create the file if needed, cut it to length 0, then write. The next lesson shows how to change these options.',
        'Java strings can hold at most about 2 billion characters, and `readString` refuses files over 2 GB with an `OutOfMemoryError`. Long before that limit, memory runs out. That is why big files are read in pieces.',
        'Since Java 18 the default charset of the whole JVM is UTF-8 on every system. `Files.readString` and `Files.writeString` used UTF-8 even before that.'
      ],
      tryIt: {
        steps: [
          'Write `Greeting.java`: it writes `Hello from Java\\n` into `greeting.txt` and reads it back.',
          'Compile and run it, then run `cat greeting.txt` in the terminal.',
          'Run `ls -l greeting.txt` and look at the size column.'
        ],
        see: '`Hello from Java` from Java and from `cat`, and a size of 16 bytes (15 characters plus the line break).'
      },
      check: [
        { q: 'The file `todo.txt` holds 10 lines. You call `Files.writeString(Path.of("todo.txt"), "wash car\\n")`. How many lines are in the file now?', a: 'One. Without extra options `writeString` empties the file first.' },
        { q: 'Why does `main` need `throws IOException` (or a try/catch) when it calls `Files.readString`?', a: '`readString` declares the checked exception `IOException`. The compiler forces you to handle it or pass it on.' },
        { q: 'A text has 10 characters, but the file has 12 bytes. How is that possible?', a: 'Some characters need more than 1 byte in UTF-8, for example `é` (2 bytes) or `€` (3 bytes).' }
      ],
      keyPoints: [
        '`Files.writeString(path, text)` creates or replaces a file. `Files.readString(path)` reads it all.',
        'Both open and close the file for you, and both use UTF-8.',
        'File methods throw the checked `IOException`: catch it or declare `throws IOException`.',
        'Line breaks are `\\n` characters inside the `String`.',
        'Use these methods for small files only.'
      ],
      commonMistakes: [
        'Expecting `writeString` to add to the file. Fix: pass `StandardOpenOption.CREATE, StandardOpenOption.APPEND` (next lesson).',
        'Forgetting the line break: `Files.writeString(path, "done")` leaves the last line without `\\n`. Fix: end text lines with `"\\n"`, so tools like `cat` show them well.',
        'Printing with `println(Files.readString(path))` and getting an extra empty line. Fix: use `print`, the text already ends with `\\n`.',
        'Leaving out `throws IOException` and getting `unreported exception java.io.IOException; must be caught or declared to be thrown`. Fix: add it to `main`, or use try/catch.'
      ],
      related: ['Exceptions', 'Strings & Text', 'files-and-paths']
    }
  ]);
})();
