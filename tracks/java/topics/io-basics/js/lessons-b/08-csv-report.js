// I/O basics, lesson 8: a small CSV file: read, parse, compute, write.
(function () {
  Java.addCoreLessons('io-basics', [
    {
      id: 'csv-report',
      title: 'A Small CSV Report',
      category: 'practice',
      icon: ',',
      tagline: 'Read, split, compute, write',
      glossary: Java.ioBasicsGlossary,
      realWorld: 'A class list on paper: each line is one child, and a comma separates the name from the score. The teacher reads each line, writes "pass" or "retry" behind it and copies the list onto a new sheet.',
      kid: [
        'Imagine a list: "Ada, 92". "Kai, 87". The comma is a little fence. On the left of the fence is the name, on the right is the number.',
        'Your program reads one line, cuts it at the fence, and now it has two pieces: a name and a number. With the number it can do maths.',
        'At the end it writes a new list with one more piece on each line: "pass" or "retry".'
      ],
      definition: 'A **CSV** file ("comma-separated values") is a text file where each line is a row and commas split the columns. Your program reads the lines, splits each with `line.split(",")`, turns text into numbers with `Integer.parseInt`, computes something and writes the result as a new CSV file.',
      explain: [
        'CSV is the simplest table format there is. Spreadsheet programs like LibreOffice Calc open and save it, and many websites let you export data as CSV. The first line is often a **header**: the names of the columns, like `name,score`.',
        'Working with CSV is always the same four steps. **Read** the lines with `Files.readAllLines` (or line by line for big files). **Parse** each line: split it into fields and turn number fields into numbers. **Compute** what you need. **Write** the result with `Files.write`.',
        '`line.split(",")` returns a `String[]` with the pieces between the commas (see [Strings](../strings/index.html)). `"Ada,92".split(",")` gives `["Ada", "92"]`. The pieces are still text: `Integer.parseInt("92")` makes the `int` 92 from them. `strip()` removes spaces around a piece, so `" 92 "` works too.',
        'Real files are messy. A line can be empty, have too few fields or contain `abc` where a number belongs. `Integer.parseInt("abc")` throws a `NumberFormatException`. A good program checks the number of fields, catches that exception, reports the line number and goes on with the next line.',
        'CSV has one big trap: a field can itself contain a comma, written in quotes, like `"Smith, Ada",92`. A plain `split(",")` cuts it in the wrong place. For files from other programs, use a CSV library (you learn to add libraries in Build tools). For files your own program writes, keep commas out of the fields.'
      ],
      why: 'Lots of real data arrives as CSV: grades, bank exports, sensor values, shop orders. Read-parse-compute-write is the pattern behind most small data tools.',
      whenUse: 'When you exchange tables with spreadsheets or other programs, and when you want a simple file format that a human can read and edit.',
      syntax: '`String[] fields = line.split(",");` · `int n = Integer.parseInt(fields[1].strip());` · `lines.subList(1, lines.size())` skips the header',
      fileName: 'ScoreReport.java',
      code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class ScoreReport {
    public static void main(String[] args) throws IOException {
        Path input = Path.of("scores.csv");
        Files.write(input, List.of("name,score", "Ada,92", "Kai,87", "Mina,95", "Leo,70"));

        // 1. Read
        List<String> lines = Files.readAllLines(input);

        List<String> report = new ArrayList<>();
        report.add("name,score,result");
        int total = 0;

        for (String line : lines.subList(1, lines.size())) {   // skip the header
            // 2. Parse
            String[] fields = line.split(",");
            String name = fields[0].strip();
            int score = Integer.parseInt(fields[1].strip());

            // 3. Compute
            total += score;
            String result;
            if (score >= 80) {
                result = "pass";
            } else {
                result = "retry";
            }
            report.add(name + "," + score + "," + result);
        }

        // 4. Write
        Path output = Path.of("report.csv");
        Files.write(output, report);

        System.out.print(Files.readString(output));
        System.out.println("average: " + (double) total / (lines.size() - 1));
    }
}`,
      output: `name,score,result
Ada,92,pass
Kai,87,pass
Mina,95,pass
Leo,70,retry
average: 86.0`,
      codeSummary: 'The program makes a CSV file with four scores, reads it, decides pass or retry for each child, writes `report.csv` and prints it with the average.',
      codeExplanation: [
        { label: 'Line 10', code: 'Files.write(input, List.of("name,score", "Ada,92", "Kai,87", "Mina,95", "Leo,70"));', text: 'Makes the input file: a header line and four rows. In real life this file comes from a spreadsheet.' },
        { label: 'Line 13', code: 'List<String> lines = Files.readAllLines(input);', text: 'Step 1, read: five lines, the header included.' },
        { label: 'Line 15', code: 'List<String> report = new ArrayList<>();', text: 'The output lines are collected in a list first and written in one go at the end.' },
        { label: 'Line 19', code: 'for (String line : lines.subList(1, lines.size())) {', text: '`subList(1, size)` is a view of the list without element 0, so the header is skipped.' },
        { label: 'Line 21', code: 'String[] fields = line.split(",");', text: 'Step 2, parse: `"Ada,92"` becomes `["Ada", "92"]`.' },
        { label: 'Line 23', code: 'int score = Integer.parseInt(fields[1].strip());', text: 'The second field is text. `parseInt` turns `"92"` into the number 92, so you can add and compare.' },
        { label: 'Line 26', code: 'total += score;', text: 'Step 3, compute: the running total for the average.' },
        { label: 'Line 33', code: 'report.add(name + "," + score + "," + result);', text: 'Builds an output row with three fields, joined by commas again.' },
        { label: 'Line 38', code: 'Files.write(output, report);', text: 'Step 4, write: one line per list element, so a valid CSV file.' },
        { label: 'Line 41', code: '(double) total / (lines.size() - 1)', text: '`(double)` makes the division exact instead of a whole-number division. `size() - 1` is the number of rows without the header: 344 / 4 = 86.0.' }
      ],
      sections: [
        {
          title: 'What a CSV file looks like',
          text: ['The same data twice: once as the text in the file, once as the table a spreadsheet shows.'],
          codeLanguage: 'plaintext',
          fileName: 'scores.csv',
          code: `name,score
Ada,92
Kai,87
Mina,95
Leo,70`,
          table: {
            head: ['name', 'score'],
            rows: [['Ada', '92'], ['Kai', '87'], ['Mina', '95'], ['Leo', '70']],
            note: 'Each line is a row, each comma starts a new column. The first line holds the column names.'
          }
        },
        {
          title: 'The four steps as a picture',
          text: ['Every CSV tool you write follows this path. Only the "compute" box changes.'],
          mermaid: 'flowchart LR\n  A["scores.csv"] -->|"readAllLines"| B["List of lines"]\n  B -->|"split and parseInt"| C["name + score"]\n  C -->|"pass or retry, total"| D["report lines"]\n  D -->|"Files.write"| E["report.csv"]',
          diagramNote: 'Read and write are the file part. Parse and compute are normal Java with strings, numbers and lists.'
        },
        {
          title: 'Messy lines: check, skip and report',
          text: [
            'This input has an empty line, a line without a score, and a score that is not a number. The program skips each bad line, says which line and why, and keeps the good rows.',
            'The line number is the index in the file plus 1, so the message matches what the user sees in an editor.'
          ],
          fileName: 'MessyCsv.java',
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class MessyCsv {
    public static void main(String[] args) throws IOException {
        Path input = Path.of("messy.csv");
        Files.write(input, List.of("name,score", "Ada,92", "", "Kai", "Mina,abc", " Leo , 70 "));

        List<String> lines = Files.readAllLines(input);
        int good = 0;
        for (int i = 1; i < lines.size(); i++) {
            String line = lines.get(i);
            int lineNumber = i + 1;
            if (line.isBlank()) {
                System.out.println("line " + lineNumber + ": empty, skipped");
                continue;
            }
            String[] fields = line.split(",");
            if (fields.length != 2) {
                System.out.println("line " + lineNumber + ": needs 2 fields, has " + fields.length);
                continue;
            }
            try {
                int score = Integer.parseInt(fields[1].strip());
                System.out.println("line " + lineNumber + ": " + fields[0].strip() + " has " + score);
                good++;
            } catch (NumberFormatException e) {
                System.out.println("line " + lineNumber + ": score is not a number: " + fields[1]);
            }
        }
        System.out.println(good + " good rows");
    }
}`,
          output: `line 2: Ada has 92
line 3: empty, skipped
line 4: needs 2 fields, has 1
line 5: score is not a number: abc
line 6: Leo has 70
2 good rows`,
          tip: '`continue` jumps to the next round of the loop. Here it means "this line is done, take the next one".'
        },
        {
          title: 'Edge cases of split',
          text: [
            '`split` has two surprises. Empty fields **in the middle** are kept, but empty fields **at the end** are dropped. Pass `-1` as a second argument to keep all of them. And a comma inside quotes is still a comma for `split`.'
          ],
          fileName: 'SplitEdges.java',
          code: `import java.util.Arrays;

public class SplitEdges {
    public static void main(String[] args) {
        System.out.println(Arrays.toString("a,,b".split(",")));
        System.out.println(Arrays.toString("a,b,,".split(",")));
        System.out.println(Arrays.toString("a,b,,".split(",", -1)));
        System.out.println("a,b,,".split(",", -1).length + " fields");

        String quoted = "\\"Smith, Ada\\",92";
        String[] parts = quoted.split(",");
        System.out.println(quoted + " -> " + parts.length + " fields:");
        for (String part : parts) {
            System.out.println("  [" + part + "]");
        }
    }
}`,
          output: `[a, , b]
[a, b]
[a, b, , ]
4 fields
"Smith, Ada",92 -> 3 fields:
  ["Smith]
  [ Ada"]
  [92]`,
          warn: 'The last lines show the quote trap: `split` cut the name in two, so one row has 3 fields instead of 2. If your data can contain commas, use another separator such as `;` or a CSV library.'
        }
      ],
      technical: [
        '`split(",")` treats its argument as a **regular expression**, a small pattern language. A comma means only a comma, so it is safe. But `split(".")` or `split("|")` do not work as you expect, because `.` and `|` are special characters there; write `split("\\\\.")` or `split("\\\\|")`.',
        '`subList(1, size)` does not copy anything. It is a window onto the original list from index 1 up to (not including) `size`.',
        '`Integer.parseInt` reads optional `+` or `-` and digits only. Spaces, commas and dots make it throw `NumberFormatException`, which is an unchecked exception (a `RuntimeException`), so the compiler does not force you to catch it. You catch it because you expect bad data.',
        'There is no official CSV rule book for all programs. Some use `;` as separator (spreadsheets in many European countries do, because they write decimals with a comma), some quote every field. Look at the first lines of a file before you write the parser.'
      ],
      tryIt: {
        steps: [
          'Save `ScoreReport.java`, compile and run it, then open `report.csv` in a spreadsheet program or with `cat`.',
          'Add a row `"Zoe,79"` to the input list and run again.',
          'Add a fourth column to the report: `score - 80` ("points to pass").'
        ],
        see: 'Zoe with `retry` and an average of `84.6`, and a new column such as `12` for Ada and `-1` for Zoe.'
      },
      check: [
        { q: 'What does `"Kai,87".split(",")` return?', a: 'A `String[]` with two elements: `"Kai"` and `"87"`.' },
        { q: 'Why do you need `Integer.parseInt(fields[1])` before adding scores?', a: 'The fields are text. `"87" + "92"` joins text to `"8792"`. `parseInt` makes numbers you can add.' },
        { q: 'A field is `"Smith, Ada"` in quotes. What goes wrong with `split(",")`?', a: 'It splits inside the quotes too, so the name falls apart into two fields. Use another separator or a CSV library.' }
      ],
      keyPoints: [
        'CSV: one line per row, commas between columns, often a header line first.',
        'The pattern is read → parse → compute → write.',
        '`split(",")` gives text fields; `Integer.parseInt` turns them into numbers.',
        'Check the field count and catch `NumberFormatException` for messy input.',
        'Commas inside quoted fields break a plain `split`.'
      ],
      commonMistakes: [
        'Forgetting the header: `Integer.parseInt("score")` throws `NumberFormatException`. Fix: start at index 1 or use `subList(1, lines.size())`.',
        'Using `fields[1]` without checking `fields.length`: `ArrayIndexOutOfBoundsException` on a short line. Fix: check `fields.length` first.',
        'Integer division for the average: `total / count` gives `86`, not `86.5`. Fix: `(double) total / count`.',
        'Forgetting `strip()`: `Integer.parseInt(" 70")` fails on the space. Fix: `Integer.parseInt(field.strip())`.'
      ],
      related: ['Strings & Text', 'Collections', 'write-lines']
    }
  ]);
})();
