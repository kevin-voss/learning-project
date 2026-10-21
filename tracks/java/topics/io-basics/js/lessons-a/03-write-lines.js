// I/O basics, lesson 3: lists of lines (Files.write / Files.readAllLines) and appending.
(function () {
  Java.addCoreLessons('io-basics', [
    {
      id: 'write-lines',
      title: 'Lines, Lists and Appending',
      category: 'practice',
      icon: '≡',
      tagline: 'One list element, one line',
      glossary: Java.ioBasicsGlossary,
      realWorld: 'A shopping list on the fridge. Each thing has its own line. When you remember cheese, you write it at the bottom. You do not throw the list away and start a new one.',
      kid: [
        'Imagine a paper list with one thing on each line: apples, bread, milk.',
        'Java can read that paper and give you a row of boxes, one box for each line. That row is a `List`.',
        'Java can also take your row of boxes and write each box on its own line. And when you only want to add one more thing, you tell Java: "write at the bottom, keep the rest". That is **append**.'
      ],
      definition: '`Files.write(path, lines)` writes each element of a list as one line. `Files.readAllLines(path)` reads a file back into a `List<String>`, one element per line. With `StandardOpenOption.APPEND`, writing adds to the end of the file instead of replacing it.',
      explain: [
        'Most text files are made of **lines**. Each line ends with a line break character, `\\n` on Ubuntu and macOS. A list of strings fits this perfectly: one element, one line.',
        '`Files.write(path, lines)` takes any list (or other collection) of strings. It writes every element and puts a line break after each one, also after the last. `Files.readAllLines(path)` splits the file at the line breaks and removes them, so the elements contain only the text.',
        'Both methods open and close the file for you and use UTF-8, like `readString` and `writeString`. Both throw `IOException`. You know `List`, `List.of` and `ArrayList` from [Collections](../collections/index.html).',
        'Writing has **open options**. They are values of the enum `StandardOpenOption` (an enum is a fixed set of named values; you meet enums properly later). `APPEND` means "write at the end". `CREATE` means "make the file if it is missing". You pass them after the text: `Files.write(path, lines, StandardOpenOption.CREATE, StandardOpenOption.APPEND)`.',
        'The same options work for `Files.writeString`. Appending is how log files, diaries and high-score lists grow one entry at a time.'
      ],
      why: 'Lists are the natural shape of most text data: names, scores, tasks, log entries. These methods turn a file into a list and a list into a file with no loops over characters.',
      whenUse: 'Small files that you want to handle line by line in your code. Append when the file is a growing record and old lines must stay.',
      syntax: '`Files.write(path, List<String> lines, OpenOption... options)` · `List<String> lines = Files.readAllLines(path)` · `StandardOpenOption.CREATE, StandardOpenOption.APPEND`',
      fileName: 'WriteLinesDemo.java',
      code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

public class WriteLinesDemo {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("shopping.txt");

        List<String> items = List.of("apples", "bread", "milk");
        Files.write(path, items);                 // one element, one line

        // Add one more line at the end, keep the old ones
        Files.write(path, List.of("cheese"), StandardOpenOption.APPEND);

        List<String> lines = Files.readAllLines(path);
        System.out.println("The list has " + lines.size() + " lines:");
        for (int i = 0; i < lines.size(); i++) {
            System.out.println((i + 1) + ". " + lines.get(i));
        }
    }
}`,
      output: `The list has 4 lines:
1. apples
2. bread
3. milk
4. cheese`,
      codeSummary: 'The program writes a list of three items, appends a fourth and reads everything back with line numbers.',
      codeExplanation: [
        { label: 'Line 4', code: 'import java.nio.file.StandardOpenOption;', text: 'The open options (`APPEND`, `CREATE` …) live in this enum.' },
        { label: 'Line 11', code: 'List<String> items = List.of("apples", "bread", "milk");', text: 'A fixed list of three strings. Any list works, also an `ArrayList` you filled in a loop.' },
        { label: 'Line 12', code: 'Files.write(path, items);', text: 'Creates (or replaces) `shopping.txt` with three lines: `apples\\nbread\\nmilk\\n`.' },
        { label: 'Line 15', code: 'Files.write(path, List.of("cheese"), StandardOpenOption.APPEND);', text: '`APPEND` keeps the three lines and adds `cheese\\n` after them. The file exists already, so `CREATE` is not needed here.' },
        { label: 'Line 17', code: 'List<String> lines = Files.readAllLines(path);', text: 'Reads the whole file and splits it into lines. The `\\n` characters are removed.' },
        { label: 'Line 18', code: 'lines.size()', text: 'Four lines: three from the first write and one from the append.' },
        { label: 'Line 19', code: 'for (int i = 0; i < lines.size(); i++) {', text: 'A normal index loop over the list, so you can print a line number.' },
        { label: 'Line 20', code: 'System.out.println((i + 1) + ". " + lines.get(i));', text: '`i` starts at 0, people count from 1, so the program prints `i + 1`.' }
      ],
      sections: [
        {
          title: 'One String or a list of lines?',
          text: ['You now know two pairs of methods. They store the same bytes; they differ in the shape you get in Java.'],
          table: {
            head: ['You have', 'Write with', 'Read with', 'You get back'],
            rows: [
              ['one `String`', '`Files.writeString(path, text)`', '`Files.readString(path)`', 'one `String`, line breaks inside'],
              ['a `List<String>`', '`Files.write(path, lines)`', '`Files.readAllLines(path)`', 'a `List<String>`, no line breaks'],
              ['a `byte[]`', '`Files.write(path, bytes)`', '`Files.readAllBytes(path)`', 'a `byte[]` (raw bytes, lesson "Bytes and Characters")']
            ],
            note: 'All six methods read or write the whole file at once. They are made for small files.'
          }
        },
        {
          title: 'What the file really contains',
          text: [
            'The list has no line breaks, but the file does. `Files.write` adds one after every element. This program makes the hidden `\\n` visible by replacing it with the two characters `\\` and `n`.'
          ],
          fileName: 'ShowLineBreaks.java',
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class ShowLineBreaks {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("pets.txt");
        Files.write(path, List.of("cat", "dog", "fish"));

        String raw = Files.readString(path);
        System.out.println("raw text: " + raw.replace("\\n", "\\\\n"));
        System.out.println("bytes:    " + Files.size(path));

        List<String> lines = Files.readAllLines(path);
        System.out.println("lines:    " + lines);
        System.out.println("first:    [" + lines.get(0) + "]");
    }
}`,
          output: `raw text: cat\\ndog\\nfish\\n
bytes:    13
lines:    [cat, dog, fish]
first:    [cat]`,
          tip: '13 bytes: `cat` 3 + `dog` 3 + `fish` 4 make 10 letters, plus 3 line breaks. The brackets around `[cat]` show that the element has no line break at its end.'
        },
        {
          title: 'Append, create and the other open options',
          text: [
            'Each option changes one thing about how the file is opened. Without any option, writing behaves like `CREATE` + `TRUNCATE_EXISTING` + `WRITE`.',
            'Watch out: `APPEND` alone does **not** create a missing file. The first run of a diary program fails with `NoSuchFileException`. Pass `CREATE` and `APPEND` together.'
          ],
          table: {
            head: ['Option', 'Meaning'],
            rows: [
              ['`CREATE`', 'make the file if it is missing; use it if it exists'],
              ['`CREATE_NEW`', 'make the file; fail with `FileAlreadyExistsException` if it exists'],
              ['`APPEND`', 'write at the end, keep the old content'],
              ['`TRUNCATE_EXISTING`', 'cut an existing file to 0 bytes before writing'],
              ['`WRITE`', 'open the file for writing']
            ]
          },
          mermaid: 'flowchart TD\n  A["Files.write(path, lines, options)"] --> B{"Does the file exist?"}\n  B -- "no" --> C{"CREATE given?"}\n  C -- "yes" --> D["make an empty file"]\n  C -- "no" --> E["NoSuchFileException"]\n  B -- "yes" --> F{"APPEND given?"}\n  D --> F\n  F -- "yes" --> G["write at the end"]\n  F -- "no" --> H["empty the file, write from the start"]',
          diagramNote: 'With no options at all, Java acts as if you gave `CREATE` and `TRUNCATE_EXISTING`, so you always end on the bottom right box.'
        },
        {
          title: 'A log that grows on every run',
          text: [
            'This program appends three entries in a loop. Each call opens the file, writes at the end and closes it again. The file does not exist at the start, so `CREATE` is needed.'
          ],
          fileName: 'GrowingLog.java',
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class GrowingLog {
    public static void main(String[] args) throws IOException {
        Path log = Path.of("visits.log");

        String[] visitors = {"Ada", "Kai", "Mina"};
        for (String name : visitors) {
            Files.writeString(log, name + " came in\\n",
                StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        }

        System.out.print(Files.readString(log));
        System.out.println("Lines: " + Files.readAllLines(log).size());
    }
}`,
          output: `Ada came in
Kai came in
Mina came in
Lines: 3`,
          tip: 'Run the program from the terminal twice. The second run prints six lines: the file remembers the first run. Delete it with `rm visits.log` to start again.'
        },
        {
          title: 'Wrong vs right: the missing line break',
          text: [
            '`Files.write` adds line breaks for you, `Files.writeString` does not. When you append with `writeString`, add `\\n` yourself, or all entries end up on one line.'
          ],
          fileName: 'MissingBreak.java',
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class MissingBreak {
    public static void main(String[] args) throws IOException {
        Path wrong = Path.of("wrong.txt");
        Path right = Path.of("right.txt");

        for (int i = 1; i <= 3; i++) {
            // Wrong: no line break, the numbers stick together
            Files.writeString(wrong, "round " + i,
                StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            // Right: every entry ends with \\n
            Files.writeString(right, "round " + i + "\\n",
                StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        }

        System.out.println("wrong: " + Files.readAllLines(wrong));
        System.out.println("right: " + Files.readAllLines(right));
    }
}`,
          output: `wrong: [round 1round 2round 3]
right: [round 1, round 2, round 3]`
        }
      ],
      technical: [
        '`Files.write(path, lines)` opens one writer, then for each element writes the characters and then `System.lineSeparator()`. That is `\\n` on Ubuntu and macOS and `\\r\\n` on Windows. `readAllLines` accepts `\\n`, `\\r\\n` and `\\r`, so files from any system read correctly.',
        '`readAllLines` returns a list with every line in memory. The Javadoc does not promise you can change that list, so copy it first if you want to add or remove lines: `new ArrayList<>(Files.readAllLines(path))`.',
        '`APPEND` asks the operating system to move to the end of the file before **every** write. Two programs appending to the same log at the same time therefore do not overwrite each other, though their lines can mix.',
        'If the last line of a file has no line break, `readAllLines` still returns it as the last element. An empty file gives an empty list, not a list with one empty string.'
      ],
      tryIt: {
        steps: [
          'Write `Todo.java`: it appends `args[0]` as one line to `todo.txt` (with `CREATE` and `APPEND`) and then prints all lines with numbers.',
          'Compile it, then run `java Todo "water plants"`, `java Todo "call Ada"` and `java Todo "read book"`.',
          'Run `cat todo.txt`.'
        ],
        see: 'a numbered list that grows by one line on each run, and three lines from `cat`.'
      },
      check: [
        { q: 'You call `Files.write(path, List.of("a", "b"))`. How many bytes does the file have?', a: '4: `a`, `\\n`, `b`, `\\n`. `Files.write` adds a line break after every element.' },
        { q: 'The file `log.txt` does not exist. What happens with `Files.writeString(log, "x\\n", StandardOpenOption.APPEND)`?', a: 'It throws `NoSuchFileException`. `APPEND` alone does not create files. Add `StandardOpenOption.CREATE`.' },
        { q: 'Does `Files.readAllLines` keep the `\\n` at the end of each element?', a: 'No. It removes the line breaks, so `"apples"` comes back, not `"apples\\n"`.' }
      ],
      keyPoints: [
        '`Files.write(path, list)` writes one line per element and adds the line breaks.',
        '`Files.readAllLines(path)` gives a `List<String>` without line breaks.',
        'Without options, writing replaces the file.',
        '`CREATE` + `APPEND` adds to the end and makes the file on the first run.',
        '`Files.writeString` with `APPEND` needs your own `\\n` at the end of each entry.'
      ],
      commonMistakes: [
        '`Files.write(path, List.of(newLine))` when you meant to add a line: the old lines are gone. Fix: add `StandardOpenOption.CREATE, StandardOpenOption.APPEND`.',
        '`StandardOpenOption.APPEND` alone on the first run: `NoSuchFileException`. Fix: pass `CREATE` too.',
        'Changing the list from `readAllLines` and expecting the file to change. Fix: the list is a copy in memory; write it back with `Files.write`.',
        'Appending with `writeString(log, entry, ...APPEND)` and no `\\n`: everything ends up on one line. Fix: `entry + "\\n"`.'
      ],
      related: ['Collections', 'read-file']
    }
  ]);
})();
