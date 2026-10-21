(function () {
  Java.addCoreTopic('io-basics', {
    label: 'I/O',
    headline: 'I/O basics,',
    accent: 'terminal and files.',
    intro: 'Read from the Ubuntu terminal, write text files, and use standard JDK APIs without extra libraries.',
    overview: 'All commands stay Ubuntu-only and every Java example uses Java 21 standard library APIs.',
    tryIt: {
      steps: [
        'Make `Notes.java` that asks for one line with `Scanner`.',
        'Write that line to `notes.txt` with `Files.writeString(...)`.',
        'Read the file back with `Files.readString(...)` and print it. Then run `cat notes.txt`.'
      ],
      see: 'your line printed by Java, and the same line from `cat`.'
    },
    check: [
      { q: 'Which class reads what the user types in the terminal?', a: '`Scanner` with `System.in`.' },
      { q: 'Why does reading a file need `throws IOException` or a try/catch?', a: 'The file might be missing or locked. Java makes you plan for that.' },
      { q: 'What does try-with-resources do for you?', a: 'It closes the file or scanner by itself, even when an error happens.' }
    ]
  }, [
    {
      id: 'scanner',
      title: 'Terminal Input',
      category: 'concept',
      icon: 'in',
      tagline: 'Read from System.in',
      definition: 'Scanner can read beginner-friendly input from the terminal through System.in.',
      realWorld: 'Scanner is a small clerk asking the terminal for the next typed answer.',
      syntax: 'new Scanner(System.in) reads from standard input. Close it at the end of a small program.',
      fileName: 'ScannerDemo.java',
      code: `import java.util.Scanner;

public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Name: ");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name);
        scanner.close();
    }
}`,
      keyPoints: [
        'System.in is terminal input.',
        'System.out is terminal output.',
        'Scanner is fine for beginner command-line programs.'
      ],
      commonMistakes: [
        'Mixing nextInt and nextLine without handling the leftover newline.',
        'Expecting input examples to run inside this static browser hub.',
        'Forgetting imports.'
      ],
      related: ['Strings & Text']
    },
    {
      id: 'read-file',
      title: 'Read a Text File',
      category: 'practice',
      icon: 'read',
      tagline: 'Path and Files',
      definition: 'Path represents a filesystem path. Files provides convenient methods for reading and writing files.',
      realWorld: 'Path is the address on disk; Files is the postal worker that reads or writes there.',
      syntax: 'Files.readString(Path.of("notes.txt")) reads a whole small text file.',
      fileName: 'ReadFileDemo.java',
      code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class ReadFileDemo {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("notes.txt");
        Files.writeString(path, "first note\\nsecond note\\n");

        String text = Files.readString(path);
        System.out.println(text);
    }
}`,
      keyPoints: [
        'Use java.nio.file.Path and Files for modern file work.',
        'File operations can throw IOException.',
        'Relative paths start from the folder where you run java.'
      ],
      commonMistakes: [
        'Running java from a different folder than expected.',
        'Ignoring IOException.',
        'Using old File APIs before learning Path and Files.'
      ],
      related: ['Exceptions', 'Ubuntu terminal']
    },
    {
      id: 'write-lines',
      title: 'Write Lines',
      category: 'habits',
      icon: 'out',
      tagline: 'Save program output',
      definition: 'Files.write writes a collection of lines. It is useful for small reports and practice projects.',
      realWorld: 'Your program can keep a notebook file instead of only speaking to the terminal.',
      syntax: 'Files.write(path, lines) writes text lines using the platform default options for simple beginner use.',
      fileName: 'WriteLinesDemo.java',
      code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class WriteLinesDemo {
    public static void main(String[] args) throws IOException {
        List<String> lines = List.of("Ada,92", "Kai,87", "Mina,95");
        Path path = Path.of("scores.csv");
        Files.write(path, lines);

        for (String line : Files.readAllLines(path)) {
            System.out.println(line);
        }
    }
}`,
      keyPoints: [
        'Small files are fine with readString, readAllLines, writeString, and write.',
        'For large files, learn streams later.',
        'CSV is just text with a convention.'
      ],
      commonMistakes: [
        'Writing files into a folder without permission.',
        'Using absolute paths that only work on one machine.',
        'Forgetting that real projects need error messages for users.'
      ],
      related: ['Collections']
    }
  ]);
})();
