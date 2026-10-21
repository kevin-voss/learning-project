// Recursion, part 5: walking a folder tree (a real use) and memoization (Deeper).
(function () {
  Java.addCoreLessons('recursion', [
    {
      id: 'folder-tree',
      title: 'A Real Use: Walking a Folder Tree',
      category: 'practice',
      icon: '📁',
      tagline: 'Folders inside folders: the shape recursion was made for',
      realWorld: 'A big toy box with smaller boxes inside. Some small boxes have even smaller boxes inside. To count all the toys, you count the toys in this box, then do the same for every box inside it.',
      kid: [
        'You want to count every toy in the big box. Some toys lie loose in it. And there are smaller boxes inside.',
        'You count the loose toys. Then you open each small box and do **exactly the same**: count its loose toys, open its boxes.',
        'A box with no boxes inside is easy: only count its loose toys. That is the base case.',
        'When every small box has told you its number, you add them all up. Done, however deep the boxes go.'
      ],
      definition: 'A folder can hold files and other folders. To walk it, a method handles one folder and then **calls itself for each folder inside**. A folder with no subfolders is the base case: the loop over its children runs zero times.',
      explain: [
        'Data that contains smaller data of the **same kind** is called **recursive data**. A folder contains folders. A menu contains submenus. In programming, this shape is called a **tree**: one **root** at the top, **children** below it, and **leaves** (items with no children) at the ends.',
        'A loop alone cannot walk a tree easily, because you do not know how deep it goes. Recursion fits: "walk this folder" means "print its name, then walk each child folder".',
        'Here the method makes **one call per child**, inside a `for` loop. That is tree recursion like Fibonacci, but without repeated work: each folder is visited exactly once.',
        'The base case is often hidden. A folder with no children makes the `for` loop run zero times, so there is no recursive call and the method returns. You do not need an extra `if`.',
        'The example builds a small tree in memory with a class `Folder` (you know classes from [Classes & Objects](../classes-and-objects/index.html)). Section 3 walks real folders on your disk.'
      ],
      why: 'This is where recursion is really used: file systems, website menus, organisation charts, JSON data, game trees.',
      whenUse: 'Any time data is nested and you do not know how deep it goes.',
      syntax: '`void walk(Node node) { work(node); for (Node child : node.children) { walk(child); } }`',
      fileName: 'FolderTree.java',
      code: `import java.util.ArrayList;
import java.util.List;

class Folder {
    String name;
    int fileCount;                               // files directly in this folder
    List<Folder> children = new ArrayList<>();

    Folder(String name, int fileCount) {
        this.name = name;
        this.fileCount = fileCount;
    }

    Folder add(Folder child) {
        children.add(child);
        return this;                             // lets you chain .add(...).add(...)
    }
}

public class FolderTree {
    static void print(Folder folder, int depth) {
        System.out.println("  ".repeat(depth) + folder.name + "/ (" + folder.fileCount + " files)");
        for (Folder child : folder.children) {
            print(child, depth + 1);             // the same job for each subfolder
        }
    }

    static int countFiles(Folder folder) {
        int total = folder.fileCount;
        for (Folder child : folder.children) {
            total += countFiles(child);          // add what each subfolder reports
        }
        return total;
    }

    public static void main(String[] args) {
        Folder music = new Folder("music", 0).add(new Folder("songs", 4)).add(new Folder("notes", 2));
        Folder school = new Folder("school", 2).add(new Folder("math", 3)).add(music);
        Folder home = new Folder("home", 2).add(school).add(new Folder("photos", 5));
        print(home, 0);
        System.out.println("files in total: " + countFiles(home));
    }
}`,
      output: `home/ (2 files)
  school/ (2 files)
    math/ (3 files)
    music/ (0 files)
      songs/ (4 files)
      notes/ (2 files)
  photos/ (5 files)
files in total: 18`,
      codeSummary: 'A small folder tree in memory. `print` shows it with indents. `countFiles` adds the files of every folder, at any depth.',
      codeExplanation: [
        { label: 'Line 4', code: 'class Folder {', text: 'A second, non-public class in the same file. Each `Folder` has a name, a number of files and a list of child folders.' },
        { label: 'Line 7', code: 'List<Folder> children = new ArrayList<>();', text: 'A `Folder` holds other `Folder` objects: this is recursive data.' },
        { label: 'Line 14', code: 'Folder add(Folder child) {', text: 'Adds a child and returns the same folder, so you can write `.add(a).add(b)`.' },
        { label: 'Line 22', code: 'System.out.println("  ".repeat(depth) + folder.name + "/ (" + folder.fileCount + " files)");', text: 'The work for one folder: print its name, indented by its depth.' },
        { label: 'Line 23', code: 'for (Folder child : folder.children) {', text: 'One recursive call per child. A folder with no children skips the loop: that is the hidden base case.' },
        { label: 'Line 24', code: 'print(child, depth + 1);', text: 'The same job, one level deeper.' },
        { label: 'Line 29', code: 'int total = folder.fileCount;', text: 'Start with the files that lie directly in this folder.' },
        { label: 'Line 31', code: 'total += countFiles(child);', text: 'Each subfolder returns its own total, including all of its subfolders.' },
        { label: 'Line 37', code: 'Folder music = new Folder("music", 0).add(new Folder("songs", 4)).add(new Folder("notes", 2));', text: 'Builds the tree from the bottom up: first the inner folders, then the ones that hold them.' }
      ],
      sections: [
        {
          title: 'The tree in a picture',
          text: ['`home` is the **root**. `math`, `songs`, `notes` and `photos` are **leaves**: they have no child folders.'],
          mermaid: 'flowchart TD\n  H["home/ (2)"] --> S["school/ (2)"]\n  H --> P["photos/ (5)"]\n  S --> MA["math/ (3)"]\n  S --> MU["music/ (0)"]\n  MU --> SO["songs/ (4)"]\n  MU --> N["notes/ (2)"]',
          diagramNote: 'Each arrow is one recursive call. The number is the files directly inside that folder.'
        },
        {
          title: 'countFiles, folder by folder',
          text: ['The leaves answer first. Each folder adds its own files to what its children report.'],
          table: {
            head: ['Folder', 'Own files', 'From children', 'Returns'],
            rows: [
              ['`songs`', '4', 'no children (base case)', '4'],
              ['`notes`', '2', 'no children (base case)', '2'],
              ['`music`', '0', '4 + 2', '6'],
              ['`math`', '3', 'no children (base case)', '3'],
              ['`school`', '2', '3 + 6', '11'],
              ['`photos`', '5', 'no children (base case)', '5'],
              ['`home`', '2', '11 + 5', '**18**']
            ],
            note: 'The rows are in the order the calls **return**: deepest first.'
          }
        },
        {
          title: 'Walking real folders on your disk',
          text: [
            'This program first creates a small folder `demo` next to itself (with `Files` from [IO Basics](../io-basics/index.html)). Then it walks it.',
            '`java.io.File` is the older class for a path on disk. `isFile()` says whether it is a file, `listFiles()` gives the items inside a folder as an array, `length()` gives a file\'s size in bytes.'
          ],
          code: `import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;

public class WalkFolders {
    static long walk(File item, int depth) {
        String indent = "  ".repeat(depth);
        if (item.isFile()) {                       // base case: a file has no children
            System.out.println(indent + item.getName() + " (" + item.length() + " bytes)");
            return item.length();
        }
        System.out.println(indent + item.getName() + "/");
        File[] children = item.listFiles();
        Arrays.sort(children);                     // the same order on every computer
        long total = 0;
        for (File child : children) {
            total += walk(child, depth + 1);       // the same job, one level deeper
        }
        return total;
    }

    public static void main(String[] args) throws IOException {
        Path root = Path.of("demo");               // resolve(...) adds a path inside root
        Files.createDirectories(root.resolve("school/math"));
        Files.createDirectories(root.resolve("photos"));
        Files.writeString(root.resolve("todo.txt"), "buy milk");
        Files.writeString(root.resolve("school/math/homework.txt"), "2 + 2 = 4");
        Files.writeString(root.resolve("photos/cat.txt"), "a picture of a cat");

        long bytes = walk(root.toFile(), 0);
        System.out.println("total: " + bytes + " bytes");
    }
}`,
          fileName: 'WalkFolders.java',
          output: `demo/
  photos/
    cat.txt (18 bytes)
  school/
    math/
      homework.txt (9 bytes)
  todo.txt (8 bytes)
total: 35 bytes`,
          tip: 'Point `walk` at a real folder of yours, for example `walk(new File("."), 0)` for the current folder. Start with a small one.'
        },
        {
          title: 'Things that go wrong on real disks',
          bullets: [
            '`listFiles()` returns `null` when the folder cannot be read (no permission). Check `if (children == null) { return 0; }` before the loop.',
            'A **symbolic link** (a shortcut) can point back to a parent folder. Then the walk goes round in a circle until `StackOverflowError`. Skip links with `Files.isSymbolicLink(item.toPath())`.',
            'Very deep folder trees are rare. Real ones are usually less than 30 levels deep, so the stack is not a problem here.'
          ],
          warn: 'Never write a recursive **delete** on a real folder while you are still testing. One wrong path and your files are gone. Test on a `demo` folder like the one above.'
        }
      ],
      technical: [
        'The call stack remembers where the walk still has to go. When `walk` returns from `school`, the frame of `demo` continues its `for` loop with the next child, `todo.txt`. A loop version would need its own list (a stack or queue) to remember the folders it has not visited yet.',
        'This order (a folder first, then everything inside it, then the next sibling) is called **depth-first, pre-order** traversal. Printing after the loop would give **post-order**: the children before their parent.',
        'The JDK has a ready-made walker: `Files.walk(path)` gives every path in a tree. It uses an explicit stack internally instead of recursion, so it cannot overflow on deep trees.'
      ],
      tryIt: {
        steps: [
          'Run `FolderTree.java`.',
          'Add `new Folder("games", 7)` to `photos` with `.add(...)`, and run again.',
          'Write `static int depth(Folder folder)`: a leaf returns 1, otherwise 1 + the biggest depth of its children (use `Math.max`). Print `depth(home)`.'
        ],
        see: 'A `games/ (7 files)` line under `photos`, `files in total: 25`, and depth `4` (`home` → `school` → `music` → `songs`).'
      },
      check: [
        { q: 'Where is the base case in `print`?', a: 'It is hidden: a folder with no children makes the `for` loop run zero times, so there is no recursive call.' },
        { q: 'Why is recursion a good fit for folders?', a: 'A folder contains folders of the same kind, and you do not know how deep they go. "Do the same for each subfolder" is exactly a recursive call.' },
        { q: 'In which order does `countFiles` return its answers?', a: 'The deepest folders (the leaves) return first, then their parents, and `home` returns last.' }
      ],
      keyPoints: [
        'Trees: one root, children, leaves. Folders are trees.',
        'Walk a tree: do the work for this node, then call yourself for each child.',
        'The base case can be "no children": the loop runs zero times.',
        'Each node is visited once, so there is no repeated work.',
        'On real disks, check for `null` and skip symbolic links.'
      ],
      commonMistakes: [
        'Recursing on the same folder: `print(folder, depth + 1)` inside the loop instead of `print(child, depth + 1)` never ends.',
        'Forgetting to add the children\'s totals: `countFiles(child);` without `total +=` throws the answer away.',
        'No `null` check: `item.listFiles()` on a folder you cannot read gives `null`, and the loop throws `NullPointerException`. Check it first.'
      ],
      related: ['Classes & Objects', 'IO Basics', 'recursion-vs-loops', 'fibonacci-tree']
    },
    {
      id: 'memoization',
      title: 'Memoization: Remember Answers With a HashMap',
      category: 'deeper',
      icon: '📝',
      tagline: 'Compute each value once, look it up after that',
      realWorld: 'A notebook of answers. The first time someone asks "what is 7 × 8?", you work it out and write it down. The next time, you read it from the notebook.',
      kid: [
        'Remember the tree of helpers for Fibonacci? Many helpers did the same job, again and again.',
        'Now every helper gets one shared notebook. Before working, a helper looks in the notebook: "Is number 3 already written here?" If yes, it reads the answer and is done.',
        'If not, it works it out and writes it in the notebook for everyone else.',
        'The tree gets very small, because almost every job is done only once.'
      ],
      definition: '**Memoization** means storing the result of a call the first time it is computed and reusing it for every later call with the same input. In Java, a `HashMap` from input to answer is the usual notebook.',
      explain: [
        'You know `HashMap` from [Collections](../collections/index.html): it maps a **key** to a **value**. Here the key is `n` and the value is `fib(n)`.',
        'The memoized method does three things in order: (1) the base case, (2) "is the answer already in the map?" and if so return it, (3) otherwise compute it with the recursive calls, **put** it into the map, and return it.',
        'Memoization only helps when the same inputs come back again and again, like in Fibonacci. Walking a folder tree visits each folder once, so a notebook would not save anything there.',
        'The map uses `Integer` and `Long`, not `int` and `long`, because collections hold objects. Java converts between them for you (**autoboxing**), see [Types & Variables](../types-and-variables/index.html).',
        'With memoization `fib(n)` makes only `2n - 1` calls instead of millions. `fib(90)` comes back at once.'
      ],
      why: 'It turns a correct but hopelessly slow recursion into a fast one, with only three extra lines.',
      whenUse: 'When a recursive method calls itself with the same input many times (overlapping subproblems).',
      syntax: '`if (memo.containsKey(n)) { return memo.get(n); } long result = …; memo.put(n, result); return result;`',
      fileName: 'Memo.java',
      code: `import java.util.HashMap;
import java.util.Map;

public class Memo {
    static Map<Integer, Long> memo = new HashMap<>();   // n -> fib(n)
    static long calls = 0;

    static long fib(int n) {
        calls++;
        if (n <= 1) {
            return n;                                   // base case
        }
        if (memo.containsKey(n)) {
            return memo.get(n);                         // already known: no more work
        }
        long result = fib(n - 1) + fib(n - 2);          // compute it once
        memo.put(n, result);                            // write it in the notebook
        return result;
    }

    public static void main(String[] args) {
        int[] sizes = {5, 10, 30, 40, 90};
        for (int n : sizes) {
            memo.clear();                               // empty notebook for a fair count
            calls = 0;
            long value = fib(n);
            System.out.println("fib(" + n + ") = " + value + " needs " + calls + " calls");
        }
    }
}`,
      output: `fib(5) = 5 needs 9 calls
fib(10) = 55 needs 19 calls
fib(30) = 832040 needs 59 calls
fib(40) = 102334155 needs 79 calls
fib(90) = 2880067194370816120 needs 179 calls`,
      codeSummary: 'The same Fibonacci with a `HashMap` that remembers every answer. The number of calls drops from millions to a few dozen.',
      codeExplanation: [
        { label: 'Line 5', code: 'static Map<Integer, Long> memo = new HashMap<>();', text: 'The notebook. Key: `n`. Value: `fib(n)`. `static` so that all calls share one map.' },
        { label: 'Line 10', code: 'if (n <= 1) {', text: 'The base case stays first, as always.' },
        { label: 'Line 13', code: 'if (memo.containsKey(n)) {', text: 'Before any work: is this answer already known?' },
        { label: 'Line 14', code: 'return memo.get(n);', text: 'Yes: return it. No recursive calls, so this branch of the tree ends here.' },
        { label: 'Line 16', code: 'long result = fib(n - 1) + fib(n - 2);', text: 'No: compute it the normal way. This happens only once per `n`.' },
        { label: 'Line 17', code: 'memo.put(n, result);', text: 'Store the answer, so every later call with this `n` finds it.' },
        { label: 'Line 24', code: 'memo.clear();', text: 'Empties the map so each line counts the calls for a fresh start.' },
        { label: 'Line 27', code: 'System.out.println("fib(" + n + ") = " + value + " needs " + calls + " calls");', text: '`fib(30)`: 59 calls instead of 2,692,537. `fib(90)` would take thousands of years without the map.' }
      ],
      sections: [
        {
          title: 'The three steps of every memoized method',
          mermaid: 'flowchart TD\n  S["fib(n) is called"] --> B{"n <= 1?"}\n  B -->|yes| R1["return n"]\n  B -->|no| K{"memo has n?"}\n  K -->|yes| R2["return memo.get(n)"]\n  K -->|no| C["result = fib(n-1) + fib(n-2)"]\n  C --> P["memo.put(n, result)"]\n  P --> R3["return result"]',
          diagramNote: 'Base case, then look up, then compute and store. Only the last path makes recursive calls.'
        },
        {
          title: 'The tree gets cut',
          text: ['Compare with the full tree in the Fibonacci lesson. `fib(n - 1)` runs first and fills the map. So when `fib(n - 2)` is called next, its answer is already stored.'],
          mermaid: 'flowchart TD\n  A["fib(5)"] --> B["fib(4)"]\n  A --> C["fib(3)<br>from memo"]\n  B --> D["fib(3)"]\n  B --> E["fib(2)<br>from memo"]\n  D --> F["fib(2)"]\n  D --> G["fib(1)"]\n  F --> H["fib(1)"]\n  F --> I["fib(0)"]',
          diagramNote: '9 calls instead of 15. Only the left edge is computed. Every right child is a lookup or a base case.'
        },
        {
          title: 'Watch the notebook work',
          code: `import java.util.HashMap;
import java.util.Map;

public class MemoTrace {
    static Map<Integer, Long> memo = new HashMap<>();

    static long fib(int n) {
        if (n <= 1) {
            return n;
        }
        if (memo.containsKey(n)) {
            System.out.println("fib(" + n + ") from memo: " + memo.get(n));
            return memo.get(n);
        }
        long result = fib(n - 1) + fib(n - 2);
        memo.put(n, result);
        System.out.println("fib(" + n + ") computed: " + result);
        return result;
    }

    public static void main(String[] args) {
        System.out.println("= " + fib(5));
        System.out.println("memo: " + memo);
    }
}`,
          fileName: 'MemoTrace.java',
          output: `fib(2) computed: 1
fib(3) computed: 2
fib(2) from memo: 1
fib(4) computed: 3
fib(3) from memo: 2
fib(5) computed: 5
= 5
memo: {2=1, 3=2, 4=3, 5=5}`,
          tip: 'A `HashMap` with small `Integer` keys happens to print in key order. Do not rely on that order in general.'
        },
        {
          title: 'Plain, memoized, or a loop?',
          text: ['A loop that builds the numbers from the bottom up needs no map and no deep stack. For Fibonacci it is the best choice. Memoization shines when the smaller problems are harder to list in order, for example in puzzles and games.'],
          code: `public class FibLoop {
    static long fib(int n) {
        long previous = 0;   // fib(0)
        long current = 1;    // fib(1)
        for (int i = 0; i < n; i++) {
            long next = previous + current;
            previous = current;
            current = next;
        }
        return previous;     // after n steps, previous is fib(n)
    }

    public static void main(String[] args) {
        System.out.println(fib(10));
        System.out.println(fib(90));
    }
}`,
          fileName: 'FibLoop.java',
          output: `55
2880067194370816120`,
          table: {
            head: ['Version', 'Calls / steps for `fib(40)`', 'Extra memory', 'Stack depth'],
            rows: [
              ['Plain recursion', '331,160,281 calls', 'none', 'about 40'],
              ['Memoized recursion', '79 calls', 'a map with 39 entries', 'about 40'],
              ['Loop', '40 rounds', 'two variables', '1 frame']
            ]
          }
        }
      ],
      technical: [
        '`memo.containsKey(n)` followed by `memo.get(n)` looks up the key twice. A shorter form is `Long known = memo.get(n); if (known != null) { return known; }`, because `get` returns `null` for a missing key.',
        'A `HashMap` lookup takes about the same time no matter how many entries it has, so each memoized call is cheap.',
        'Do not use `memo.computeIfAbsent(n, k -> fib(k - 1) + fib(k - 2))` here. It changes the map while it is computing a value, and since Java 9 `HashMap` throws `ConcurrentModificationException` for that.',
        'This technique is the heart of **dynamic programming**: split a problem into overlapping smaller problems and solve each one only once.'
      ],
      tryIt: {
        steps: [
          'Run `Memo.java`.',
          'Comment out the line `memo.put(n, result);` and run again.',
          'Put the line back and add `92` to `sizes`. Then try `93`.'
        ],
        see: 'Without `put`: the call counts are as big as in the plain version (for 90 it never finishes, stop it with Ctrl+C). With 92: `7540113804746346429`. With 93: a negative number, because `long` overflows.'
      },
      check: [
        { q: 'What does memoization store?', a: 'The answer for each input the first time it is computed, here `n → fib(n)` in a `HashMap`.' },
        { q: 'Why does the base case still come first?', a: 'The base cases are never stored in the map. They must be answered before the lookup, or the method would recurse below 0.' },
        { q: 'Would memoization speed up the folder walk?', a: 'No. Each folder is visited only once, so there are no repeated inputs to look up.' }
      ],
      keyPoints: [
        'Memoization = remember each answer, reuse it later.',
        'Order: base case, look up, compute, store, return.',
        'It only helps when the same inputs repeat.',
        '`fib(n)` drops from exponential to `2n - 1` calls.'
      ],
      commonMistakes: [
        'Forgetting `memo.put(n, result);`: nothing is ever stored and the method stays slow. Store before you return.',
        'Writing `return memo.get(n);` without checking `containsKey` first: for a missing key `get` returns `null`, and turning `null` into a `long` throws `NullPointerException`. Check with `containsKey` (or test for `null`) before you return.',
        'Using `Map<Integer, Integer>` for big values: `fib(47)` overflows `Integer`. Use `Long`.'
      ],
      related: ['fibonacci-tree', 'Collections', 'recursion-vs-loops']
    }
  ]);
})();
