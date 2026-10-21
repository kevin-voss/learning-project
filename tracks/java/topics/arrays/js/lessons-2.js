// Arrays, part 2 of 5: "When the Index Is Wrong" and "The Arrays Helper Class".
(function () {
  const terms = Java.arrayTerms;

  Java.addCoreLessons('arrays', [
    {
      id: 'out-of-bounds',
      title: 'When the Index Is Wrong',
      category: 'habits',
      icon: '!',
      tagline: 'ArrayIndexOutOfBoundsException and the off-by-one bug',
      realWorld: 'A row of three lockers numbered 0, 1 and 2. You walk to locker number 3, but the wall is there. There is no locker 3.',
      kid: [
        'You have three boxes: box 0, box 1 and box 2. Your friend says "open box 3!"',
        'You look, but there is no box 3. The row ends after box 2. Java does the same: it stops everything and shouts "there is no box 3, the row only has 3 boxes".',
        'Most of the time this happens because someone counted one step too far. So you learn to count to "one less than the number of boxes".'
      ],
      definition: 'Every index must be between `0` and `length - 1`. If you use any other index, Java stops the program with an `ArrayIndexOutOfBoundsException`.',
      explain: [
        'An **exception** is how Java reports an error while the program runs: it stops the current work and prints a report. You learn to catch and handle exceptions in [Exceptions](../exceptions/index.html). For now you learn to read the report and avoid the error.',
        '`ArrayIndexOutOfBoundsException` means "the index was outside the bounds of the array". The **bounds** are the smallest and the biggest valid index: `0` and `length - 1`. A negative index like `-1` is also out of bounds.',
        'The compiler cannot catch this mistake, because the index is often only known while the program runs. So the code compiles, starts, prints some lines, and then crashes when the bad index is used.',
        'The most common cause is the **off-by-one** bug: a loop that runs one round too many, usually `i <= a.length` instead of `i < a.length`, or code that reads `a[a.length]` to get the last element.',
        'The error message tells you the bad index, the length of the array and the exact line. That is enough to find the bug almost every time.'
      ],
      why: 'Java checks every index so a wrong one cannot read or overwrite memory that belongs to something else. A clear crash is much better than a wrong value that nobody notices.',
      whenUse: 'Every time you write `a[...]`, ask: can this index ever be `-1` or `a.length`? Especially at the start and end of loops.',
      syntax: 'Valid: `0 <= index && index < a.length`. A loop stays safe with `for (int i = 0; i < a.length; i++)`.',
      fileName: 'PrintNames.java',
      code: `public class PrintNames {
    public static void main(String[] args) {
        String[] names = {"Ada", "Mina", "Kai"};

        // Bug: <= runs one round too many
        for (int i = 0; i <= names.length; i++) {
            System.out.println(i + ": " + names[i]);
        }
        System.out.println("This line is never reached");
    }
}`,
      output: `0: Ada
1: Mina
2: Kai
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
\tat PrintNames.main(PrintNames.java:7)`,
      codeSummary: 'This program has a bug on purpose. It prints the three names, then tries index 3 and crashes. The last line is never printed.',
      codeExplanation: [
        { label: 'Line 3', code: 'String[] names = {"Ada", "Mina", "Kai"};', text: 'Three elements, so the valid indexes are 0, 1 and 2, and `names.length` is 3.' },
        { label: 'Line 6', code: 'for (int i = 0; i <= names.length; i++) {', text: 'The bug: `<=` lets `i` become 3, because `3 <= 3` is true. It should be `<`.' },
        { label: 'Line 7', code: 'System.out.println(i + ": " + names[i]);', text: 'Works for `i` = 0, 1 and 2. For `i` = 3 the JVM checks the index, finds it too big and throws the exception here.' },
        { label: 'Line 9', code: 'System.out.println("This line is never reached");', text: 'The exception stops `main` at once, so this line never runs.' },
        { label: 'Output 4', code: 'Index 3 out of bounds for length 3', text: 'The bad index (3) and the length (3). Index = length is the classic off-by-one.' },
        { label: 'Output 5', code: 'at PrintNames.main(PrintNames.java:7)', text: 'Where it happened: class `PrintNames`, method `main`, file `PrintNames.java`, line 7.' }
      ],
      sections: [
        {
          title: 'Inside and outside the row',
          text: [
            'Think of the array as a fenced row. Inside the fence are the indexes 0 to `length - 1`. Everything else, `-1`, `length`, `length + 1`, is outside the fence.',
            'Note that `length` itself is outside. It counts the boxes; it is not the number of a box.'
          ],
          mermaid: 'flowchart LR\n  M["-1: outside"] -.- B0\n  subgraph fence["names, length 3"]\n    B0["0: Ada"] --- B1["1: Mina"] --- B2["2: Kai"]\n  end\n  B2 -.- P["3: outside"]',
          diagramNote: 'Only the boxes inside the fence exist. Indexes -1 and 3 (= length) throw `ArrayIndexOutOfBoundsException`.'
        },
        {
          title: 'Read the error message',
          text: ['The message has the same parts every time. Read it from top to bottom.'],
          table: {
            head: ['Part', 'What it tells you'],
            rows: [
              ['`Exception in thread "main"`', 'The program stopped with an error while running `main`.'],
              ['`java.lang.ArrayIndexOutOfBoundsException`', 'The kind of error: an index outside the array.'],
              ['`Index 3 out of bounds for length 3`', 'The bad index and the length. If index equals length, look for `<=` or a missing `- 1`.'],
              ['`at PrintNames.main(PrintNames.java:7)`', 'The file and line number where the bad index was used. Start looking there.']
            ]
          }
        },
        {
          title: 'Fix the off-by-one bug',
          text: [
            'Here are the usual off-by-one patterns and their fixes. The last row is a sneaky one: when you compare each element with the next one (`a[i + 1]`), the loop must stop one box earlier.'
          ],
          table: {
            head: ['Wrong', 'Right', 'Why'],
            rows: [
              ['`i <= a.length`', '`i < a.length`', 'The last index is `length - 1`.'],
              ['`a[a.length]`', '`a[a.length - 1]`', 'The last element is one before length.'],
              ['`for (int i = a.length; i >= 0; i--)`', '`for (int i = a.length - 1; i >= 0; i--)`', 'Backwards loops start at the last index.'],
              ['`i < a.length` with `a[i + 1]`', '`i < a.length - 1` with `a[i + 1]`', '`i + 1` must also stay inside.']
            ]
          },
          fileName: 'Neighbours.java',
          code: `public class Neighbours {
    public static void main(String[] args) {
        int[] heights = {120, 125, 123, 130};

        // Compare each element with the next one.
        // The loop stops at length - 1, so i + 1 is always a valid index.
        for (int i = 0; i < heights.length - 1; i++) {
            int change = heights[i + 1] - heights[i];
            System.out.println(heights[i] + " -> " + heights[i + 1] + ": " + change);
        }
    }
}`,
          output: `120 -> 125: 5
125 -> 123: -2
123 -> 130: 7`
        },
        {
          title: 'Check an index before you use it',
          text: [
            'When an index comes from outside (a user types it, or another part of the program computes it), check it first. Both parts of the check matter: not below 0 and below the length.'
          ],
          fileName: 'SafeIndex.java',
          code: `public class SafeIndex {
    public static void main(String[] args) {
        String[] prizes = {"teddy", "ball", "kite"};
        int[] wanted = {1, 3, -1, 0};

        for (int index : wanted) {
            if (index >= 0 && index < prizes.length) {
                System.out.println("Prize " + index + " is a " + prizes[index]);
            } else {
                System.out.println("There is no prize " + index);
            }
        }
    }
}`,
          output: `Prize 1 is a ball
There is no prize 3
There is no prize -1
Prize 0 is a teddy`,
          tip: 'The `&&` stops early: if `index >= 0` is false, Java does not even look at the second part (see [Operators](../operators/index.html)).'
        },
        {
          title: 'Edge cases: empty, null and negative sizes',
          bullets: [
            '`new int[0]` is a valid **empty array**. Its length is 0. A loop over it runs zero times, and any index, even `0`, is out of bounds.',
            '`int[] a = null;` means "no array at all". Then `a.length` or `a[0]` stops the program with a `NullPointerException`, a different error.',
            '`new int[-1]` stops the program with `NegativeArraySizeException`. A size must be 0 or more.'
          ],
          fileName: 'EmptyArray.java',
          code: `public class EmptyArray {
    public static void main(String[] args) {
        int[] none = new int[0];
        System.out.println("Length: " + none.length);

        for (int value : none) {
            System.out.println("You never see this: " + value);
        }
        System.out.println("The loop ran zero times");

        if (none.length > 0) {
            System.out.println("First: " + none[0]);
        } else {
            System.out.println("No first element");
        }
    }
}`,
          output: `Length: 0
The loop ran zero times
No first element`,
          warn: 'Code like `int max = a[0];` crashes on an empty array. Check `a.length > 0` first when the array can be empty.'
        }
      ],
      technical: [
        'Every array access in the bytecode (`iaload` to read an int, `iastore` to write one, and the same for other types) makes the JVM compare the index with the length stored in the array header. If the check fails, the JVM creates an `ArrayIndexOutOfBoundsException` object with the message and throws it.',
        'The exception travels up the call stack. Nobody catches it here, so it reaches the top of the `main` thread. The JVM then prints the stack trace (the "at …" lines, one per method call) to the error output and ends the program.',
        'The check is so cheap that you never notice it. In hot loops like `for (int i = 0; i < a.length; i++)` the JIT compiler (the part of the JVM that turns bytecode into machine code while the program runs) can even prove the index is always valid and skip the check.'
      ],
      tryIt: {
        steps: [
          'Copy `PrintNames.java` from above and run it. Read the message: which index, which length, which line?',
          'Change `<=` to `<` and run it again.',
          'Now add a line `System.out.println(names[names.length]);` after the loop and run it.'
        ],
        see: 'First the crash at line 7, then three names and "This line is never reached", then a new crash with `Index 3 out of bounds for length 3` on your new line.'
      },
      check: [
        { q: 'An array has length 5. Which of these indexes are valid: -1, 0, 4, 5?', a: '`0` and `4`. `-1` and `5` are out of bounds.' },
        { q: 'What does `Index 10 out of bounds for length 10` tell you about the bug?', a: 'The code used the length as an index. Look for `<=` in a loop or a missing `- 1`.' },
        { q: 'Why does `for (int i = 0; i < a.length; i++)` never crash on an empty array?', a: 'The condition `0 < 0` is false before the first round, so the body never runs.' }
      ],
      keyPoints: [
        'Valid indexes are `0` to `length - 1`; everything else throws `ArrayIndexOutOfBoundsException`.',
        'The compiler does not find bad indexes. The program crashes when it runs.',
        'The message names the bad index, the length and the line.',
        'Index = length almost always means an off-by-one bug.',
        'Check `index >= 0 && index < a.length` when an index comes from outside.'
      ],
      commonMistakes: [
        '`for (int i = 0; i <= a.length; i++)`: one round too many. Use `<`.',
        '`int last = a[a.length];`: use `a[a.length - 1]`.',
        '`if (index < a.length)` alone lets `-1` through. Also check `index >= 0`.',
        '`int first = a[0];` on an array that can be empty. Check `a.length > 0` first.'
      ],
      related: ['Looping Arrays', 'Create and Index', 'Exceptions', 'Debugging'],
      glossary: terms
    },
    {
      id: 'arrays-class',
      title: 'The Arrays Helper Class',
      category: 'practice',
      icon: 'A',
      tagline: 'Print, sort and fill in one line',
      realWorld: 'A toolbox that comes with your shelf of boxes. One tool reads all the boxes out loud, one puts them in order from small to big, and one puts the same toy into every box.',
      kid: [
        'Some jobs with boxes happen all the time: saying what is in every box, putting the boxes in order, or putting the same thing into all of them.',
        'You could do each job by hand, box by box. But Java gives you a toolbox called `Arrays` with a ready tool for each job.',
        'You hand your row of boxes to the tool, and the tool does the whole job in one go.'
      ],
      definition: '`java.util.Arrays` is a class from the Java library with ready-made static methods for arrays. The three you use most are `Arrays.toString` (print), `Arrays.sort` (order) and `Arrays.fill` (same value everywhere).',
      explain: [
        'The **Java library** (also called the JDK class library) is the big set of classes that comes with Java. `Arrays` lives in the **package** `java.util`, a folder of related classes. To use it you write `import java.util.Arrays;` at the top of the file, above the class.',
        'All its methods are **static**: you call them on the class name, `Arrays.sort(scores)`, and pass the array as an argument, like the static methods you wrote in [Methods](../methods/index.html).',
        '`Arrays.toString(a)` returns a String like `[7, 9, 4]`: square brackets, the elements, commas between them. You need it because `System.out.println(a)` does not print the elements; it prints something like `[I@1b6d3586`, the type code `[I` ("array of int") and a number that changes from run to run.',
        '`Arrays.sort(a)` puts the elements in ascending order (small to big). It changes the array itself; it does not make a new one. Numbers sort by value, Strings by their character codes, which puts capital letters before small letters.',
        '`Arrays.fill(a, value)` writes the same value into every box. `Arrays.fill(a, from, to, value)` fills only the indexes from `from` up to, but not including, `to`.'
      ],
      why: 'Printing, sorting and filling are needed in almost every program. The library versions are tested, fast and one line long.',
      whenUse: 'Use `Arrays.toString` whenever you print an array to check it. Use `sort` and `fill` when you need the job done; write the loop yourself when you want to learn how it works or need something special.',
      syntax: '`import java.util.Arrays;` then `Arrays.toString(a)`, `Arrays.sort(a)`, `Arrays.fill(a, value)`.',
      fileName: 'ArraysHelpers.java',
      code: `import java.util.Arrays;

public class ArraysHelpers {
    public static void main(String[] args) {
        int[] scores = {7, 9, 4, 10, 4};

        // toString: all elements in one readable String
        System.out.println("Scores: " + Arrays.toString(scores));

        // sort: changes the array itself, small to big
        Arrays.sort(scores);
        System.out.println("Sorted: " + Arrays.toString(scores));
        System.out.println("Lowest: " + scores[0] + ", highest: " + scores[scores.length - 1]);

        // Strings sort by character codes: capitals come first
        String[] names = {"Mina", "ada", "Kai", "Ben"};
        Arrays.sort(names);
        System.out.println("Names: " + Arrays.toString(names));

        // fill: the same value in every box
        int[] lives = new int[4];
        Arrays.fill(lives, 3);
        System.out.println("Lives: " + Arrays.toString(lives));

        String[] board = new String[3];
        System.out.println("Board before: " + Arrays.toString(board));
        Arrays.fill(board, "empty");
        System.out.println("Board after: " + Arrays.toString(board));
    }
}`,
      output: `Scores: [7, 9, 4, 10, 4]
Sorted: [4, 4, 7, 9, 10]
Lowest: 4, highest: 10
Names: [Ben, Kai, Mina, ada]
Lives: [3, 3, 3, 3]
Board before: [null, null, null]
Board after: [empty, empty, empty]`,
      codeSummary: 'The program prints an int array, sorts it, sorts a String array (watch where "ada" ends up), and fills an int array and a String array.',
      codeExplanation: [
        { label: 'Line 1', code: 'import java.util.Arrays;', text: 'Makes the class `Arrays` from the package `java.util` available by its short name.' },
        { label: 'Line 8', code: 'Arrays.toString(scores)', text: 'Builds the text `[7, 9, 4, 10, 4]`. The `+` joins it to "Scores: ".' },
        { label: 'Line 11', code: 'Arrays.sort(scores);', text: 'Reorders the boxes of `scores` from small to big. It returns nothing; the array itself is now sorted.' },
        { label: 'Line 13', code: 'scores[0] + ", highest: " + scores[scores.length - 1]', text: 'After sorting, the smallest value sits at index 0 and the biggest at the last index.' },
        { label: 'Line 17', code: 'Arrays.sort(names);', text: 'Strings sort by character codes. All capital letters come before small letters, so `ada` ends up last.' },
        { label: 'Line 21', code: 'int[] lives = new int[4];', text: 'Four boxes, all 0 at first.' },
        { label: 'Line 22', code: 'Arrays.fill(lives, 3);', text: 'Writes 3 into every box. Same as a counted loop with `lives[i] = 3`.' },
        { label: 'Line 26', code: 'System.out.println("Board before: " + Arrays.toString(board));', text: 'A new String array holds `null` in each box, and `toString` shows that.' }
      ],
      sections: [
        {
          title: 'Why println(array) prints a strange code',
          text: [
            'Try `System.out.println(scores);` and you get something like `[I@1b6d3586`. An array does not know how to describe its elements, so Java prints its type (`[I` means "array of int", `[D` "array of double") and a hash code, an ID number that changes from run to run.',
            '`Arrays.toString(scores)` walks the array for you and builds `[7, 9, 4, 10, 4]`. Use it every time you want to look at an array while you learn or debug.'
          ],
          fileName: 'PrintArrays.java',
          code: `import java.util.Arrays;

public class PrintArrays {
    public static void main(String[] args) {
        double[] prices = {1.5, 2.25, 0.99};
        boolean[] lights = {true, false, true};
        char[] letters = {'J', 'a', 'v', 'a'};

        System.out.println(Arrays.toString(prices));
        System.out.println(Arrays.toString(lights));
        System.out.println(Arrays.toString(letters));
        System.out.println(Arrays.toString(new int[0]));
    }
}`,
          output: `[1.5, 2.25, 0.99]
[true, false, true]
[J, a, v, a]
[]`
        },
        {
          title: 'The helpers you will use',
          text: ['`Arrays` has many methods. These are the ones beginners need. Two of them come in later lessons.'],
          table: {
            head: ['Method', 'What it does', 'Changes the array?'],
            rows: [
              ['`Arrays.toString(a)`', 'returns a String like `[1, 2, 3]`', 'no'],
              ['`Arrays.sort(a)`', 'orders the elements small to big', 'yes'],
              ['`Arrays.fill(a, v)`', 'writes `v` into every box', 'yes'],
              ['`Arrays.copyOf(a, n)`', 'returns a new array with the first `n` values', 'no (lesson "Arrays Are References")'],
              ['`Arrays.equals(a, b)`', '`true` if both have the same values in the same order', 'no (lesson "Arrays Are References")'],
              ['`Arrays.deepToString(grid)`', 'like `toString`, for 2D arrays', 'no (lesson "Two-Dimensional Arrays")']
            ]
          }
        },
        {
          title: 'Sorting changes the array in place',
          text: [
            '`Arrays.sort` sorts **in place**: it moves the values around inside the same array. There is no second, sorted array, and the old order is gone. If you still need the old order, make a copy first (next lessons).',
            'For Strings the order is by character code: `"B"` < `"Z"` < `"a"` < `"z"`. So `"ada"` lands after `"Mina"`. Write all names with the same capital letter rule if you want a normal alphabetical order.'
          ],
          mermaid: 'flowchart LR\n  A["scores: [7, 9, 4, 10, 4]"] -->|"Arrays.sort(scores)"| B["scores: [4, 4, 7, 9, 10]"]',
          diagramNote: 'Same variable, same array, new order. `sort` returns nothing (`void`), so `int[] s = Arrays.sort(scores);` does not compile.'
        },
        {
          title: 'Fill all boxes or only a part',
          text: [
            '`Arrays.fill(a, from, to, value)` fills a range. Like most ranges in Java, `from` is included and `to` is not. So `fill(seats, 2, 5, "taken")` fills indexes 2, 3 and 4.'
          ],
          fileName: 'FillSeats.java',
          code: `import java.util.Arrays;

public class FillSeats {
    public static void main(String[] args) {
        String[] seats = new String[6];
        Arrays.fill(seats, "free");
        System.out.println(Arrays.toString(seats));

        // Indexes 2, 3 and 4 (5 is not included)
        Arrays.fill(seats, 2, 5, "taken");
        System.out.println(Arrays.toString(seats));

        // Reset everything for the next show
        Arrays.fill(seats, "free");
        System.out.println(Arrays.toString(seats));
    }
}`,
          output: `[free, free, free, free, free, free]
[free, free, taken, taken, taken, free]
[free, free, free, free, free, free]`
        },
        {
          title: 'Sort first, then the answer is easy',
          text: [
            'Many questions get easy on a sorted array. The smallest value is at index 0, the biggest at the end, and the top three are the last three boxes, read backwards.'
          ],
          fileName: 'TopThree.java',
          code: `import java.util.Arrays;

public class TopThree {
    public static void main(String[] args) {
        int[] points = {42, 17, 88, 63, 5, 71};
        Arrays.sort(points);
        System.out.println("Sorted: " + Arrays.toString(points));

        System.out.println("Top three:");
        for (int i = points.length - 1; i >= points.length - 3; i--) {
            System.out.println(points[i]);
        }
    }
}`,
          output: `Sorted: [5, 17, 42, 63, 71, 88]
Top three:
88
71
63`,
          warn: 'This version crashes when the array has fewer than 3 elements: `points.length - 3` would be negative and the loop would read index -1.'
        }
      ],
      technical: [
        'For arrays of numbers (`int[]`, `double[]` …), `Arrays.sort` uses a fast algorithm called Dual-Pivot Quicksort. For arrays of objects such as `String[]` it uses TimSort, which is **stable**: equal elements keep their old order. Both need about `n × log n` steps for `n` elements.',
        'Strings are compared with `compareTo`, which compares character codes (Unicode numbers) one by one. `A` is 65 and `a` is 97, so every capital letter sorts before every small letter.',
        '`Arrays.toString` builds the text with a `StringBuilder` (a fast way to glue text together, see [Strings](../strings/index.html)). For `null` it returns the word `"null"` instead of crashing.'
      ],
      tryIt: {
        steps: [
          'Make `Shopping.java` with `import java.util.Arrays;` and `String[] items = {"milk", "bread", "apples", "eggs"};`.',
          'Print the array with `Arrays.toString`, then sort it and print it again.',
          'Make `int[] amounts = new int[items.length];`, fill it with 1 and print it.'
        ],
        see: '`[milk, bread, apples, eggs]`, then `[apples, bread, eggs, milk]`, then `[1, 1, 1, 1]`.'
      },
      check: [
        { q: 'What does `System.out.println(scores)` print for an `int[]`?', a: 'Not the values. It prints a type code and a hash code like `[I@1b6d3586`. Use `Arrays.toString(scores)`.' },
        { q: 'After `Arrays.sort(a)`, where is the smallest value?', a: 'At index 0. `sort` orders the same array from small to big.' },
        { q: 'Which indexes does `Arrays.fill(a, 1, 3, 9)` change?', a: 'Indexes 1 and 2. The end index 3 is not included.' }
      ],
      keyPoints: [
        'Write `import java.util.Arrays;` above the class to use the helpers.',
        '`Arrays.toString(a)` is the way to print an array.',
        '`Arrays.sort(a)` sorts the same array in place and returns nothing.',
        'Capital letters sort before small letters.',
        '`Arrays.fill(a, v)` fills every box; a range version takes `from` (included) and `to` (excluded).'
      ],
      commonMistakes: [
        '`System.out.println(scores);` prints `[I@…`. Write `System.out.println(Arrays.toString(scores));`.',
        '`int[] sorted = Arrays.sort(scores);` does not compile because `sort` returns nothing. Call `Arrays.sort(scores);` and use `scores`.',
        'Forgetting `import java.util.Arrays;` gives "cannot find symbol: variable Arrays". Add the import line.',
        'Sorting an array whose old order you still need. Copy it first with `Arrays.copyOf`.'
      ],
      related: ['Everyday Array Algorithms', 'Arrays Are References', 'Methods', 'Strings'],
      glossary: terms
    }
  ]);
})();
