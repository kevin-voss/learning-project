// I/O basics, lesson 10 (Deeper): streams of bytes vs streams of characters.
(function () {
  Java.addCoreLessons('io-basics', [
    {
      id: 'bytes-and-chars',
      title: 'Bytes and Characters',
      category: 'deeper',
      icon: '01',
      tagline: 'InputStream, Reader and the bridge between them',
      glossary: Java.ioBasicsGlossary,
      realWorld: 'A bead necklace with a secret code. The beads are only colours. Someone who knows the code reads them as letters: red-blue means "a", green means "b". Without the code they stay beads.',
      kid: [
        'Inside the computer, everything is made of tiny numbers called bytes. A photo is bytes. A song is bytes. Your text is bytes too.',
        'For text, there is a secret code that says which bytes mean which letter. Java has two kinds of helpers: some carry the bytes as they are, others know the code and hand you letters.',
        'For a photo you want the byte carriers: there are no letters in a photo. For a story you want the letter helpers.'
      ],
      definition: 'Java has two families of streams. **Byte streams** (`InputStream`, `OutputStream`) move raw bytes and are right for any file, pictures included. **Character streams** (`Reader`, `Writer`) move characters and are right for text. `InputStreamReader` and `OutputStreamWriter` are the bridge: they decode bytes into characters and encode characters into bytes with a charset such as UTF-8.',
      explain: [
        'A **stream** here means a one-way flow of data that you read or write piece by piece, from the start to the end. (It is a different thing from the `Stream` of `Files.lines`, which is a flow of values in memory. The two share a name only.)',
        'An `InputStream` gives you bytes. Its basic method `read()` returns the next byte as an `int` from 0 to 255, or `-1` at the end. An `OutputStream` takes bytes with `write(...)`. `Files.newInputStream(path)` and `Files.newOutputStream(path)` open them for a file; `System.in` is an `InputStream` too.',
        'A `Reader` gives you characters: `read()` returns the next character as an `int` (its code number), or `-1` at the end. A `Writer` takes characters. `BufferedReader` and `BufferedWriter` from the earlier lessons are readers and writers.',
        'A file on disk only has bytes. So every reader of a file is built on a byte stream, with an `InputStreamReader` in the middle that **decodes**: it groups bytes and turns them into characters with a charset. `Files.newBufferedReader(path)` builds this whole chain for you in one call.',
        'Use byte streams for anything that is not text: images, music, zip files, or when you copy a file without looking inside. Use readers and writers for text. If you push a picture through a `Reader`, the decoder replaces every byte group that is not valid UTF-8 with a replacement character, and the picture is broken.'
      ],
      why: 'Knowing the two families explains what all the reader and writer classes are for, and why text needs a charset while pictures must never get one.',
      whenUse: 'Byte streams for binary files and exact copies. Character streams for text. In daily code you mostly use `Files.readString`, `Files.newBufferedReader` and friends, which hide this chain.',
      syntax: '`InputStream in = Files.newInputStream(path)` · `int b = in.read()` (0–255, -1 at end) · `Reader r = new InputStreamReader(in, StandardCharsets.UTF_8)` · `int c = r.read()` (a char code, -1 at end)',
      fileName: 'BytesAndChars.java',
      code: `import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class BytesAndChars {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("word.txt");
        Files.writeString(path, "café");

        // The bytes as they are in the file, in hex
        byte[] bytes = Files.readAllBytes(path);
        System.out.print(bytes.length + " bytes:");
        for (byte b : bytes) {
            System.out.printf(" %02X", b);
        }
        System.out.println();

        // InputStream: one byte at a time, as a number 0..255
        System.out.print("InputStream:");
        try (InputStream in = Files.newInputStream(path)) {
            int value;
            while ((value = in.read()) != -1) {
                System.out.print(" " + value);
            }
        }
        System.out.println();

        // Reader: one character at a time, decoded with UTF-8
        System.out.print("Reader:     ");
        try (Reader reader = new InputStreamReader(Files.newInputStream(path), StandardCharsets.UTF_8)) {
            int value;
            while ((value = reader.read()) != -1) {
                System.out.print(" " + value);
            }
        }
        System.out.println();
    }
}`,
      output: `5 bytes: 63 61 66 C3 A9
InputStream: 99 97 102 195 169
Reader:      99 97 102 233`,
      codeSummary: 'The program saves the word café and looks at the same file three ways: as raw bytes in hex, through a byte stream and through a character reader. The byte stream sees 5 values, the reader 4.',
      codeExplanation: [
        { label: 'Line 12', code: 'Files.writeString(path, "café");', text: 'Four characters, encoded with UTF-8. `c`, `a`, `f` take 1 byte each, `é` takes 2.' },
        { label: 'Line 15', code: 'byte[] bytes = Files.readAllBytes(path);', text: 'The whole file as raw bytes. No decoding happens.' },
        { label: 'Line 18', code: 'System.out.printf(" %02X", b);', text: '`%02X` prints a byte as two hex digits. `C3 A9` is the UTF-8 form of `é`.' },
        { label: 'Line 24', code: 'try (InputStream in = Files.newInputStream(path)) {', text: 'A byte stream on the file, in try-with-resources like every stream.' },
        { label: 'Line 26', code: 'while ((value = in.read()) != -1) {', text: 'The same loop shape as `readLine()`, but the end marker is `-1` instead of `null`. Each value is a byte from 0 to 255.' },
        { label: 'Line 27', code: 'System.out.print(" " + value);', text: 'Prints 99 97 102 (c, a, f) and then 195 169: the two bytes of `é` (hex C3 and A9).' },
        { label: 'Line 34', code: 'new InputStreamReader(Files.newInputStream(path), StandardCharsets.UTF_8)', text: 'The bridge: a byte stream goes in, characters come out, decoded with UTF-8.' },
        { label: 'Line 36', code: 'while ((value = reader.read()) != -1) {', text: 'Now each value is a character code. The reader joins 195 and 169 into one character: 233, the code of `é`.' }
      ],
      sections: [
        {
          title: 'Two families',
          text: ['Every class name tells you its family: names ending in `Stream` move bytes, names ending in `Reader` or `Writer` move characters.'],
          table: {
            head: ['', 'Bytes (binary)', 'Characters (text)'],
            rows: [
              ['Read', '`InputStream`', '`Reader`'],
              ['Write', '`OutputStream`', '`Writer`'],
              ['With a buffer', '`BufferedInputStream`, `BufferedOutputStream`', '`BufferedReader`, `BufferedWriter`'],
              ['Open a file', '`Files.newInputStream`, `Files.newOutputStream`', '`Files.newBufferedReader`, `Files.newBufferedWriter`'],
              ['Whole file at once', '`Files.readAllBytes`, `Files.write(path, bytes)`', '`Files.readString`, `Files.writeString`'],
              ['`read()` returns', 'a byte 0–255, or -1', 'a character code, or -1'],
              ['Examples', '`System.in`, image files', 'text files, `PrintWriter`']
            ]
          }
        },
        {
          title: 'The chain behind Files.newBufferedReader',
          text: [
            'Each object in the chain wraps the one before it and adds one job. You call methods only on the last one; it asks the one before it when it needs more data.'
          ],
          mermaid: 'flowchart LR\n  D["file on disk (bytes)"] --> I["InputStream: reads bytes"]\n  I --> R["InputStreamReader: decodes UTF-8"]\n  R --> B["BufferedReader: buffer + readLine()"]\n  B --> C["your code gets Strings"]',
          diagramNote: 'Writing runs the other way: your `String` → `BufferedWriter` → `OutputStreamWriter` (encodes UTF-8) → `OutputStream` → bytes on disk. Closing the outer object closes the whole chain.'
        },
        {
          title: 'Copy any file as bytes',
          text: [
            'To copy a file exactly, never decode it. `in.transferTo(out)` reads every byte from one stream and writes it to the other. `Files.mismatch(a, b)` returns `-1` when two files have the same bytes.',
            'The test file holds all 256 possible byte values, like a tiny picture would.'
          ],
          fileName: 'CopyBytes.java',
          code: `import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;

public class CopyBytes {
    public static void main(String[] args) throws IOException {
        Path original = Path.of("picture.bin");
        byte[] data = new byte[256];
        for (int i = 0; i < data.length; i++) {
            data[i] = (byte) i;                    // every value from 0 to 255
        }
        Files.write(original, data);

        Path copy = Path.of("copy.bin");
        try (InputStream in = Files.newInputStream(original);
             OutputStream out = Files.newOutputStream(copy)) {
            long moved = in.transferTo(out);
            System.out.println("moved " + moved + " bytes");
        }

        System.out.println("copy size: " + Files.size(copy));
        System.out.println("identical: " + (Files.mismatch(original, copy) == -1));
    }
}`,
          output: `moved 256 bytes
copy size: 256
identical: true`,
          tip: 'Two resources in one `try (...)`, separated by `;`. Java closes `out` first, then `in`. For a plain copy, `Files.copy(original, copy)` does the same in one line.'
        },
        {
          title: 'Wrong vs right: text tools on binary data',
          text: [
            'Now the same 256 bytes go through a `Reader` and a `Writer`, as if they were text. Bytes 0 to 127 are valid UTF-8 (they are the plain English characters), but byte 128 standing alone is not. The reader stops with an exception. A `BufferedReader` decodes a whole block before it hands out the first character, so it fails at once and the copy stays empty.'
          ],
          fileName: 'BrokenCopy.java',
          code: `import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Path;

public class BrokenCopy {
    public static void main(String[] args) throws IOException {
        Path original = Path.of("picture.bin");
        byte[] data = new byte[256];
        for (int i = 0; i < data.length; i++) {
            data[i] = (byte) i;
        }
        Files.write(original, data);

        // Wrong: a Reader decodes the bytes as if they were UTF-8 text
        Path copy = Path.of("broken.bin");
        try (Reader reader = Files.newBufferedReader(original);
             Writer writer = Files.newBufferedWriter(copy)) {
            int c;
            while ((c = reader.read()) != -1) {
                writer.write(c);
            }
        } catch (IOException e) {
            System.out.println("reader refused: " + e.getClass().getSimpleName());
        }

        System.out.println("original size: " + Files.size(original));
        System.out.println("copy size:     " + Files.size(copy));
        System.out.println("identical: " + (Files.mismatch(original, copy) == -1));
    }
}`,
          output: `reader refused: MalformedInputException
original size: 256
copy size:     0
identical: false`,
          warn: '`Files.newBufferedReader` is strict and throws `MalformedInputException` when it meets a bad byte. A plain `new InputStreamReader(in, UTF_8)` would silently put `�` in instead. Either way the copy is wrong. Right: copy binary files with byte streams or `Files.copy`.'
        },
        {
          title: 'The same bytes, another charset',
          text: [
            'Decoding needs the charset the file was written with. Here `café` is written in UTF-8 and read back once with UTF-8 and once with ISO-8859-1, an old charset where every byte is one character.'
          ],
          fileName: 'WrongCharset.java',
          code: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class WrongCharset {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("menu.txt");
        Files.writeString(path, "café", StandardCharsets.UTF_8);

        String right = Files.readString(path, StandardCharsets.UTF_8);
        String wrong = Files.readString(path, StandardCharsets.ISO_8859_1);

        System.out.println("UTF-8 read:      " + right.length() + " characters, equal: " + right.equals("café"));
        System.out.println("ISO-8859-1 read: " + wrong.length() + " characters, equal: " + wrong.equals("café"));
    }
}`,
          output: `UTF-8 read:      4 characters, equal: true
ISO-8859-1 read: 5 characters, equal: false`,
          tip: 'The wrong version shows as `cafÃ©` on screen: the two bytes of `é` became two separate characters. When you see `Ã` in text, someone decoded UTF-8 with the wrong charset.'
        }
      ],
      technical: [
        'Java `byte` is signed: it holds -128 to 127. The byte `C3` is stored as -61. `InputStream.read()` returns an `int` from 0 to 255 instead, so that `-1` is free to mean "end of stream". The same trick is used by `Reader.read()` for characters.',
        'The wrapping style, where each object adds one job to the one inside, is called the **decorator pattern**. You meet it again in Design patterns. It lets Java combine a few small classes (file, decoder, buffer) instead of having one class for every combination.',
        'A UTF-8 decoder knows from the first bits of a byte how many bytes belong to the character: `0xxxxxxx` is 1 byte, `110xxxxx` starts 2, `1110xxxx` starts 3, `11110xxx` starts 4, and the following bytes all look like `10xxxxxx`. `C3 A9` is `11000011 10101001`: the x bits joined give 233, the code of `é`.',
        'Java keeps a `String` in memory as Latin-1 bytes when all its characters fit (one byte each) and as UTF-16 otherwise. That memory form has nothing to do with the file: the charset only matters at the border, when bytes come in or go out.'
      ],
      tryIt: {
        steps: [
          'Save `BytesAndChars.java`, compile and run it.',
          'Change the word to `€5` and run again.',
          'Run `xxd word.txt` (or `od -A x -t x1 word.txt`) in the terminal to see the bytes of the file.'
        ],
        see: '`4 bytes: E2 82 AC 35`, the InputStream values `226 130 172 53`, the Reader values `8364 53`, and the same hex bytes from `xxd`.'
      },
      check: [
        { q: 'Which family do you use to copy a JPEG photo, and why?', a: 'Byte streams (`InputStream`/`OutputStream`, or `Files.copy`). A photo is not text, and a `Reader` would try to decode its bytes and break them.' },
        { q: 'What does `InputStreamReader` do?', a: 'It is the bridge from bytes to characters: it reads bytes from an `InputStream` and decodes them with a charset.' },
        { q: 'Why does `in.read()` return an `int` and not a `byte`?', a: 'So it can return every byte as 0–255 and still have `-1` free as the end marker.' }
      ],
      keyPoints: [
        'Byte streams (`InputStream`, `OutputStream`) move raw bytes.',
        'Character streams (`Reader`, `Writer`) move characters.',
        '`InputStreamReader` / `OutputStreamWriter` decode and encode with a charset.',
        'Text files need the right charset; binary files must never be decoded.',
        '`read()` returns -1 at the end of a stream.'
      ],
      commonMistakes: [
        'Copying an image with `Files.readString` and `Files.writeString`. Fix: `Files.copy(from, to)` or byte streams.',
        'Reading a file with a different charset than it was written with: `cafÃ©`. Fix: use the same charset for both, normally UTF-8.',
        'Storing `in.read()` in a `byte` and checking for `-1`: byte 255 also becomes -1 and the loop stops too early. Fix: keep the value in an `int`.',
        'Confusing `InputStream` with the `Stream` of `Files.lines`. Fix: remember, `InputStream` moves bytes from a source; `Stream<T>` is a flow of values in memory.'
      ],
      related: ['read-line-by-line', 'buffered-writer', 'files-and-paths']
    }
  ]);
})();
