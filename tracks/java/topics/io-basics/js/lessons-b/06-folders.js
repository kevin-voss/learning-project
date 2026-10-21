// I/O basics, lesson 6: check, create and list folders.
(function () {
  Java.addCoreLessons('io-basics', [
    {
      id: 'folders-and-checks',
      title: 'Check, Create and List Folders',
      category: 'practice',
      icon: '▤',
      tagline: 'Files.exists, createDirectories, Files.list',
      glossary: Java.ioBasicsGlossary,
      realWorld: 'A toy cupboard with drawers. Before you put cars in the "cars" drawer, you check that the drawer is there. If not, you build it. Later you open the drawer and look at everything inside.',
      kid: [
        'Before you put a toy into a box, you look: is the box there? That is `Files.exists`.',
        'If there is no box, you make one. Sometimes you need a box inside a box inside a box. `createDirectories` makes all of them in one go.',
        'And when you want to know what is in a box, you tip it out and look at each thing. That is `Files.list`.'
      ],
      definition: '`Files.exists(path)`, `Files.isDirectory(path)` and `Files.isRegularFile(path)` ask what is at a path. `Files.createDirectories(path)` makes a folder and all missing parent folders. `Files.list(folder)` gives the entries of one folder as a stream that you close with try-with-resources.',
      explain: [
        'A path can point at three kinds of things: nothing, a **regular file** (a normal file with bytes), or a **directory** (a folder). `Files.exists`, `Files.isRegularFile` and `Files.isDirectory` answer with `true` or `false`. They never throw: if Java cannot tell, the answer is `false`.',
        '`Files.createDirectory(path)` makes exactly one folder. It fails if the parent folder is missing (`NoSuchFileException`) or if the folder exists already (`FileAlreadyExistsException`). `Files.createDirectories(path)` makes every missing folder on the way and is happy when they exist already. That is usually the one you want.',
        'Writing a file does not create its folder. `Files.writeString(Path.of("out/report.txt"), …)` fails when `out` is missing. Call `Files.createDirectories(path.getParent())` first.',
        '`Files.list(folder)` returns a `Stream<Path>` with one entry per file or folder **directly** inside it, not deeper. Each entry is a full path like `photos/beach.txt`; `getFileName()` gives only `beach.txt`. The operating system gives no promised order, so sort the entries when order matters.',
        'The stream keeps the folder open while you use it, so it goes into try-with-resources. `Files.walk(folder)` works the same way but goes into every subfolder too.'
      ],
      why: 'Programs keep their data in folders: an `out` folder for reports, a `data` folder for input. They must check what is there, make missing folders and find the files to work on.',
      whenUse: 'Before writing into a folder that might not exist; when a program works on "every file in this folder"; when the user gives you a path and you want to say clearly what is wrong with it.',
      syntax: '`Files.exists(p)` · `Files.isDirectory(p)` · `Files.isRegularFile(p)` · `Files.createDirectories(p)` · `try (Stream<Path> s = Files.list(folder)) { … }`',
      fileName: 'FoldersDemo.java',
      code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public class FoldersDemo {
    public static void main(String[] args) throws IOException {
        Path folder = Path.of("photos", "2024", "summer");
        System.out.println("exists before? " + Files.exists(folder));

        Files.createDirectories(folder);      // makes photos, 2024 and summer
        System.out.println("exists after?  " + Files.exists(folder));
        System.out.println("is a folder?   " + Files.isDirectory(folder));

        Files.writeString(folder.resolve("beach.txt"), "sand and sea\\n");
        Files.writeString(folder.resolve("ice-cream.txt"), "three scoops\\n");
        Files.createDirectory(folder.resolve("videos"));

        try (Stream<Path> entries = Files.list(folder)) {
            List<Path> sorted = entries.sorted().toList();
            for (Path entry : sorted) {
                String kind = Files.isDirectory(entry) ? "[folder]" : "[file]  ";
                System.out.println(kind + " " + entry.getFileName());
            }
        }
    }
}`,
      output: `exists before? false
exists after?  true
is a folder?   true
[file]   beach.txt
[file]   ice-cream.txt
[folder] videos`,
      codeSummary: 'The program checks for a folder, makes it with all its parents, puts two files and one subfolder into it and then lists what is inside.',
      codeExplanation: [
        { label: 'Line 9', code: 'Path folder = Path.of("photos", "2024", "summer");', text: 'Three folders deep: `photos/2024/summer`. None of them exists yet.' },
        { label: 'Line 10', code: 'Files.exists(folder)', text: 'Asks the operating system. The answer is `false`: nothing is at that path.' },
        { label: 'Line 12', code: 'Files.createDirectories(folder);', text: 'Makes `photos`, then `photos/2024`, then `photos/2024/summer`. If some exist already, it makes only the missing ones.' },
        { label: 'Line 14', code: 'Files.isDirectory(folder)', text: '`true`: there is a folder at this path now, not a file.' },
        { label: 'Line 16', code: 'Files.writeString(folder.resolve("beach.txt"), "sand and sea\\n");', text: '`resolve` builds `photos/2024/summer/beach.txt`. The folder exists, so writing works.' },
        { label: 'Line 18', code: 'Files.createDirectory(folder.resolve("videos"));', text: '`createDirectory` (no s) makes one folder. Its parent exists, so this is safe.' },
        { label: 'Line 20', code: 'try (Stream<Path> entries = Files.list(folder)) {', text: 'One entry for each thing directly inside `summer`. The stream is closed at the end of the block.' },
        { label: 'Line 21', code: 'List<Path> sorted = entries.sorted().toList();', text: '`sorted()` puts the paths in alphabetical order, `toList()` collects them into a list. Without sorting the order can change from computer to computer.' },
        { label: 'Line 23', code: 'String kind = Files.isDirectory(entry) ? "[folder]" : "[file]  ";', text: 'The `? :` operator picks one of two texts: `[folder]` for folders, `[file]` for everything else.' },
        { label: 'Line 24', code: 'entry.getFileName()', text: 'The entry is the full path `photos/2024/summer/beach.txt`. `getFileName()` keeps only the last part.' }
      ],
      sections: [
        {
          title: 'Ask before you act',
          text: ['These methods only look. They never change the disk and never throw an exception.'],
          table: {
            head: ['Method', 'true when …'],
            rows: [
              ['`Files.exists(p)`', 'something (file or folder) is at `p`'],
              ['`Files.notExists(p)`', 'Java is sure that nothing is at `p`'],
              ['`Files.isRegularFile(p)`', '`p` is a normal file'],
              ['`Files.isDirectory(p)`', '`p` is a folder'],
              ['`Files.isReadable(p)`', 'your program may read `p`'],
              ['`Files.isWritable(p)`', 'your program may write `p`']
            ],
            note: '`exists` and `notExists` can both be `false` when Java is not allowed to look (no permission). That is why there are two methods.'
          },
          warn: 'Between your check and your action, another program can delete or create the file. So a check is good for a clear message, but the action can still fail. Keep handling `IOException` (lesson "File Errors").'
        },
        {
          title: 'createDirectory or createDirectories?',
          text: [
            'The short name makes one folder and is strict. The long name makes the whole way and is relaxed. This program shows both behaviours.'
          ],
          fileName: 'MakeFolders.java',
          code: `import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;

public class MakeFolders {
    public static void main(String[] args) throws IOException {
        Path deep = Path.of("a", "b", "c");

        try {
            Files.createDirectory(deep);              // a and a/b are missing
        } catch (NoSuchFileException e) {
            System.out.println("createDirectory failed: parent is missing");
        }

        Files.createDirectories(deep);                // makes a, a/b and a/b/c
        System.out.println("createDirectories made: " + deep);

        Files.createDirectories(deep);                // already there: no error
        System.out.println("second createDirectories: fine");

        try {
            Files.createDirectory(deep);              // already there: error
        } catch (FileAlreadyExistsException e) {
            System.out.println("createDirectory failed: " + e.getFile() + " exists");
        }
    }
}`,
          output: `createDirectory failed: parent is missing
createDirectories made: a/b/c
second createDirectories: fine
createDirectory failed: a/b/c exists`,
          tip: 'Before you write `out/report.txt`, call `Files.createDirectories(path.getParent())`. It does nothing when `out` exists, and makes it when it does not.'
        },
        {
          title: 'One level or every level',
          text: [
            '`Files.list` shows only what is directly inside a folder. `Files.walk` visits the folder, then everything inside, and everything inside that, like a tree walk. Both give a stream you close with try-with-resources.'
          ],
          mermaid: 'flowchart TD\n  P["project"] --> R["README.txt"]\n  P --> S["src"]\n  P --> D["docs"]\n  S --> M["Main.java"]\n  D --> G["guide.txt"]',
          diagramNote: '`Files.list(project)` gives 3 entries: `README.txt`, `docs`, `src`. `Files.walk(project)` gives all 6, the folder itself included.',
          fileName: 'ListAndWalk.java',
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

public class ListAndWalk {
    public static void main(String[] args) throws IOException {
        Path project = Path.of("project");
        Files.createDirectories(project.resolve("src"));
        Files.createDirectories(project.resolve("docs"));
        Files.writeString(project.resolve("README.txt"), "hello\\n");
        Files.writeString(project.resolve("src/Main.java"), "class Main {}\\n");
        Files.writeString(project.resolve("docs/guide.txt"), "read me\\n");

        System.out.println("list (one level):");
        try (Stream<Path> entries = Files.list(project)) {
            entries.sorted().forEach(p -> System.out.println("  " + p));
        }

        System.out.println("walk (every level):");
        try (Stream<Path> entries = Files.walk(project)) {
            entries.sorted().forEach(p -> System.out.println("  " + p));
        }
    }
}`,
          output: `list (one level):
  project/README.txt
  project/docs
  project/src
walk (every level):
  project
  project/README.txt
  project/docs
  project/docs/guide.txt
  project/src
  project/src/Main.java`,
          tip: '`p -> System.out.println(...)` is a lambda, as in the lesson "Read Big Files Line by Line": "for each path p, print it". Sorting puts capital letters before small ones, so `README.txt` comes first.'
        },
        {
          title: 'A few more Files tools',
          text: ['You will need these soon. Each one throws `IOException` when it cannot do its job.'],
          table: {
            head: ['Method', 'What it does'],
            rows: [
              ['`Files.size(p)`', 'size of a file in bytes'],
              ['`Files.copy(from, to)`', 'copies a file; fails if `to` exists, unless you add `StandardCopyOption.REPLACE_EXISTING`'],
              ['`Files.move(from, to)`', 'moves or renames a file or folder'],
              ['`Files.delete(p)`', 'deletes a file or an empty folder; `NoSuchFileException` if missing'],
              ['`Files.deleteIfExists(p)`', 'deletes if there; returns `false` instead of failing'],
              ['`Files.createFile(p)`', 'makes an empty file; fails if it exists']
            ],
            note: '`Files.delete` does not move anything to a trash folder. The file is gone.'
          }
        }
      ],
      technical: [
        'Each of these methods becomes a request to the operating system: `exists` asks for the **metadata** of a path (size, type, dates). If that request fails for any reason, `exists` answers `false` instead of throwing, which is why it is safe to call but cannot tell "missing" from "not allowed".',
        '`createDirectories` walks the path from the top. For each part it tries to create the folder and moves on when it exists already. If a part exists but is a regular file, it throws `FileAlreadyExistsException`, because a file cannot hold folders.',
        '`Files.list` opens a **directory stream** at the operating system level, an open handle on the folder, like an open file. That is why the stream must be closed. Its order is whatever order the file system stores the entries in, which differs between ext4 on Ubuntu, APFS on macOS and NTFS on Windows.',
        '`Path` sorts by comparing the path strings character by character (by their code numbers), so capital letters (65–90) come before small ones (97–122).'
      ],
      tryIt: {
        steps: [
          'Save `FoldersDemo.java`, compile and run it.',
          'Run it a second time without deleting anything.',
          'Run `ls -R photos` in the terminal, then `rm -r photos` and run the program once more.'
        ],
        see: 'the second run fails with `FileAlreadyExistsException` for `videos` (`createDirectory` is strict), `ls -R` shows the tree, and after `rm -r photos` the program works again. Changing line 18 to `createDirectories` fixes the second run.'
      },
      check: [
        { q: 'The folder `out` does not exist. What happens with `Files.writeString(Path.of("out/report.txt"), "x")`?', a: 'It throws `NoSuchFileException`. Writing does not create folders. Call `Files.createDirectories(Path.of("out"))` first.' },
        { q: 'What is the difference between `Files.list` and `Files.walk`?', a: '`list` gives only the entries directly inside the folder. `walk` also goes into every subfolder.' },
        { q: 'Why do you sort the entries of `Files.list`?', a: 'The operating system gives no fixed order. Sorting makes the output the same on every computer.' }
      ],
      keyPoints: [
        '`exists`, `isDirectory` and `isRegularFile` only look and never throw.',
        '`createDirectories` makes all missing folders and is fine when they exist.',
        'Writing a file does not create its folder.',
        '`Files.list` and `Files.walk` return streams: use try-with-resources.',
        'Sort listed entries when order matters.'
      ],
      commonMistakes: [
        '`Files.createDirectory(Path.of("a/b/c"))` when `a` is missing: `NoSuchFileException`. Fix: `Files.createDirectories(...)`.',
        'Checking `if (Files.exists(p))` and then skipping the try/catch. Fix: the file can change between check and action, so keep handling `IOException`.',
        'Expecting `Files.list` to show files in subfolders. Fix: use `Files.walk` for every level.',
        '`Files.list(folder).forEach(...)` without try-with-resources: the folder handle stays open. Fix: `try (Stream<Path> s = Files.list(folder)) { … }`.'
      ],
      related: ['files-and-paths', 'io-errors']
    }
  ]);
})();
