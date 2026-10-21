// Arrays, part 1 of 5: the topic itself, then "Create and Index" and "Looping Arrays".
(function () {
  Java.arrayTerms = [
    { term: 'element', definition: 'One value inside an array. An array of length 5 has 5 elements.' },
    { term: 'zero-based', definition: 'Counting starts at 0, so the first position is 0 and the last is length - 1.' },
    { term: 'off-by-one', definition: 'A bug where a loop or an index is one step too far or one step too short.' },
    { term: 'shallow copy', definition: 'A copy of the outer array only. Inner arrays or objects are shared, not copied.' },
    { term: 'nested loop', definition: 'A loop inside another loop. The inner loop runs fully for each step of the outer loop.' },
    { term: 'jagged array', definition: 'A two-dimensional array whose rows have different lengths.' }
  ];
  const terms = Java.arrayTerms;

  Java.addCoreTopic('arrays', {
    label: 'Arrays',
    headline: 'Arrays,',
    accent: 'fixed-size rows of boxes.',
    intro: 'Keep many values of one type under one name, reach each one by its number, loop over them, and learn the habits that keep your indexes safe.',
    overview: 'Arrays come before collections because they make indexes, length and loops concrete. You start with one row of boxes, learn the everyday algorithms, see why two variables can share one array, and end with grids.',
    tryIt: {
      steps: [
        'Make a file `Scores.java` with a class `Scores` and a `main` method.',
        'Write `int[] scores = {7, 9, 4, 10};` in `main`.',
        'Loop over the array with a counted `for` loop and add every score to a variable `total`.',
        'In the same loop, remember the biggest score in a variable `best` (start it with `scores[0]`).',
        'Print `total`, `best` and `scores.length`. Run it with `java Scores.java`.'
      ],
      see: 'Three lines: `30`, `10` and `4`.'
    },
    check: [
      { q: 'What is the index of the first element? And of the last element of an array `a`?', a: 'The first is `0`. The last is `a.length - 1`.' },
      { q: 'An array has 4 elements. What happens with `scores[4]`?', a: 'The program stops with `ArrayIndexOutOfBoundsException`. Index 4 does not exist; the indexes are 0 to 3.' },
      { q: 'What is inside `new double[3]` before you write anything?', a: 'Three times `0.0`. Java fills new arrays with default values: `0` for numbers, `false` for boolean, `null` for objects like String.' },
      { q: 'After `int[] b = a; b[0] = 5;` what is `a[0]`?', a: '`5`. `b = a` copies the reference, so both names point to the same array. Use `Arrays.copyOf` or `clone()` for a real copy.' },
      { q: 'Can an array grow after you made it?', a: 'No. Its length is fixed. You make a new, bigger array, or you use an `ArrayList` (see Collections).' }
    ]
  }, [
    {
      id: 'create-index',
      anim: 'shelf',
      title: 'Create and Index',
      category: 'concept',
      icon: '[]',
      tagline: 'A row of numbered boxes, starting at zero',
      realWorld: 'A shelf with a row of small boxes. Each box has a number painted on it: 0, 1, 2, 3 … Every box holds one toy of the same kind. You cannot glue a new box onto the shelf later.',
      kid: [
        'Imagine five little boxes in a row on a shelf. Each box can hold one number.',
        'The boxes have numbers painted on them. The first box is number 0, not number 1. So five boxes are numbered 0, 1, 2, 3 and 4.',
        'When you want something, you say the box number: "give me what is in box 2". When you want to put something away, you say "put 90 into box 0".',
        'The shelf has room for exactly five boxes. If you ask for box 5, there is no such box, and Java stops and complains.'
      ],
      definition: 'An **array** is a fixed number of boxes of one type, stored in a row under one name. You reach each box by its **index**, a number that starts at 0.',
      explain: [
        'Each box in an array is called an **element**. All elements have the same type: an `int[]` holds only ints, a `String[]` holds only Strings. The `[]` after the type means "array of".',
        'The **index** is the position of an element. Java arrays are **zero-based**: the first element has index 0, the second index 1, and the last index is `length - 1`.',
        'You create an array in one of two ways. `new int[5]` makes five boxes that all start with a default value (0 for int). An **array initializer** `{90, 82, 100}` makes the boxes and fills them at once; Java counts the values to find the length.',
        'You read an element with `name[index]`, for example `scores[0]`. You write one with `name[index] = value`, for example `scores[1] = 88`. The square brackets are the "box number" part.',
        'Every array knows its size. `scores.length` tells you how many elements it has. `length` is a **field** (a value stored with the array), not a method, so it has no `()`.',
        'The length is fixed when you create the array. You can change what is inside the boxes as often as you like, but you can never add or remove a box.'
      ],
      why: 'Without arrays you would need one variable per value: `score1`, `score2`, `score3` … An array keeps them all under one name, and a loop can visit every one.',
      whenUse: 'When you know how many values you have (7 days of the week, 10 test scores, 64 squares on a chessboard) and they all have the same type.',
      syntax: '`type[] name = new type[size];` makes `size` boxes with default values. `type[] name = {value1, value2, …};` makes and fills them. Read with `name[index]`, write with `name[index] = value;`, size with `name.length`.',
      fileName: 'ArrayBasics.java',
      code: `public class ArrayBasics {
    public static void main(String[] args) {
        // An array of 5 int boxes. Java fills each box with 0.
        int[] scores = new int[5];
        System.out.println("Box 0 at the start: " + scores[0]);

        // Write values into some boxes by their index
        scores[0] = 90;
        scores[1] = 82;
        scores[4] = 100;

        // Read values back by their index
        System.out.println("First score: " + scores[0]);
        System.out.println("Second score: " + scores[1]);
        System.out.println("Box 2 was never set: " + scores[2]);

        // length tells you how many boxes there are
        System.out.println("Number of boxes: " + scores.length);
        System.out.println("Last score: " + scores[scores.length - 1]);

        // An array that is created and filled in one step
        String[] pets = {"cat", "dog", "fish"};
        System.out.println(pets.length + " pets, the first is " + pets[0]);
    }
}`,
      output: `Box 0 at the start: 0
First score: 90
Second score: 82
Box 2 was never set: 0
Number of boxes: 5
Last score: 100
3 pets, the first is cat`,
      codeSummary: 'The program makes an array of five ints, writes three of them, reads them back, asks for the length, and then makes a String array with an initializer.',
      codeExplanation: [
        { label: 'Line 4', code: 'int[] scores = new int[5];', text: '`int[]` is the type "array of int". `new int[5]` creates 5 boxes. The variable `scores` now points to that array.' },
        { label: 'Line 5', code: 'System.out.println("Box 0 at the start: " + scores[0]);', text: 'Nobody wrote into box 0 yet, so it holds the default value for int, which is `0`.' },
        { label: 'Line 8', code: 'scores[0] = 90;', text: 'Writes 90 into the box with index 0, the first box. The old value 0 is replaced.' },
        { label: 'Line 10', code: 'scores[4] = 100;', text: 'Index 4 is the last box of a 5-box array. You can write the boxes in any order.' },
        { label: 'Line 15', code: 'System.out.println("Box 2 was never set: " + scores[2]);', text: 'Box 2 was skipped, so it still holds `0`.' },
        { label: 'Line 18', code: 'System.out.println("Number of boxes: " + scores.length);', text: '`length` is 5: the number of boxes, not the biggest index. It has no `()` because it is a field.' },
        { label: 'Line 19', code: 'scores[scores.length - 1]', text: '`length - 1` is always the index of the last element. Here it is `5 - 1 = 4`, which holds 100.' },
        { label: 'Line 22', code: 'String[] pets = {"cat", "dog", "fish"};', text: 'An array initializer. Java counts three values, so `pets.length` is 3 and the indexes are 0, 1 and 2.' }
      ],
      sections: [
        {
          title: 'A row of numbered boxes',
          text: [
            'Picture the array from the example after lines 8 to 10. The variable `scores` is a name. It points to one row of five boxes. Each box has its index above it and its value inside it.',
            'Notice two numbers that are easy to mix up: the **index** (where a box is) and the **value** (what is in the box). `scores[4]` means "the value at index 4", which is 100.'
          ],
          mermaid: 'flowchart LR\n  V["scores"] --> B0\n  subgraph row["int array, length 5"]\n    B0["index 0: 90"] --- B1["index 1: 82"] --- B2["index 2: 0"] --- B3["index 3: 0"] --- B4["index 4: 100"]\n  end',
          diagramNote: 'Five boxes, indexes 0 to 4. The length is 5, the last index is 4. Boxes 2 and 3 still hold the default value 0.',
          table: {
            head: ['You write', 'It means', 'Result'],
            rows: [
              ['`scores[0]`', 'value in the first box', '`90`'],
              ['`scores[4]`', 'value in the last box', '`100`'],
              ['`scores.length`', 'how many boxes', '`5`'],
              ['`scores[scores.length - 1]`', 'value in the last box, for any length', '`100`']
            ]
          }
        },
        {
          title: 'Two ways to create an array',
          text: [
            'Use `new type[size]` when you know how many boxes you need but not yet what goes in them, for example when the values come later from a loop or from the user.',
            'Use an initializer `{…}` when you already know the values. You can also split declaring and creating: `int[] days;` only makes the name, and `days = new int[7];` makes the boxes later. If you create an initialized array later, you need `new int[] {…}` in front of the braces.'
          ],
          fileName: 'CreateArrays.java',
          code: `public class CreateArrays {
    public static void main(String[] args) {
        // 1. Size first, values later
        double[] prices = new double[3];
        prices[0] = 1.5;
        prices[1] = 2.25;
        prices[2] = 0.99;
        System.out.println("prices has " + prices.length + " elements, the last is " + prices[2]);

        // 2. Values right away (an array initializer)
        char[] grades = {'A', 'B', 'C', 'D'};
        System.out.println("grades has " + grades.length + " elements, the first is " + grades[0]);

        // 3. Declare now, create later
        int[] days;
        days = new int[] {31, 28, 31};
        System.out.println("January has " + days[0] + " days");
    }
}`,
          output: `prices has 3 elements, the last is 0.99
grades has 4 elements, the first is A
January has 31 days`,
          tip: 'Write the brackets after the type: `int[] scores`. Java also accepts `int scores[]` (an old C style), but `int[]` reads as "array of int" and is what everyone uses.'
        },
        {
          title: 'Default values: what is in a new box',
          text: [
            'A box made with `new` is never empty or random. Java fills every element with the **default value** of its type. This is the same default a field gets (see [Types and Variables](../types-and-variables/index.html)).',
            '`null` means "no object here". A new `String[]` has no Strings yet, only `null` in each box. If you call a method on such an element, the program stops with a `NullPointerException`.'
          ],
          table: {
            head: ['Array type', 'Default in every box'],
            rows: [
              ['`int[]`, `long[]`, `short[]`, `byte[]`', '`0`'],
              ['`double[]`, `float[]`', '`0.0`'],
              ['`boolean[]`', '`false`'],
              ['`char[]`', 'the character with code 0 (`\'\\u0000\'`), which prints as nothing'],
              ['`String[]` and every other object type', '`null`']
            ]
          },
          fileName: 'DefaultValues.java',
          code: `public class DefaultValues {
    public static void main(String[] args) {
        int[] counts = new int[2];
        double[] heights = new double[2];
        boolean[] answers = new boolean[2];
        String[] names = new String[2];

        System.out.println("int:     " + counts[0]);
        System.out.println("double:  " + heights[0]);
        System.out.println("boolean: " + answers[0]);
        System.out.println("String:  " + names[0]);
    }
}`,
          output: `int:     0
double:  0.0
boolean: false
String:  null`
        },
        {
          title: 'length is a field, and it never changes',
          text: [
            '`scores.length` is a number stored with the array when it is created. Because it is a field and not a method, you write it without `()`. A String (next topic) has a method `length()` with brackets; arrays do not. Mixing them up is a compile error.',
            'The length is fixed forever. `scores[5] = 7;` on a 5-box array does not add a box; it stops the program. To get more room you create a new, bigger array and copy the values over (you see `Arrays.copyOf` in a later lesson).'
          ],
          code: `int[] scores = new int[5];
int a = scores.length;     // right: 5
int b = scores.length();   // wrong: compile error, "cannot find symbol"`,
          fileName: 'LengthFragment.java',
          noRun: true,
          tip: 'When you need a list that grows and shrinks while the program runs, prefer an `ArrayList`; you meet it in [Collections](../collections/index.html).'
        }
      ],
      technical: [
        '`new int[5]` asks the JVM (the Java Virtual Machine that runs your program) to reserve one block of memory on the **heap**, the memory area for objects. An array is an object. The block holds a small header (which includes the length) and then the five ints right next to each other, 4 bytes each.',
        'The JVM always clears a new block, so every element starts as 0, 0.0, false or null. That is why Java has default values for array elements, while a local variable has none and must be set before you read it.',
        'The variable `scores` lives on the stack (the memory for the method that runs now) and holds only a **reference**: the address of the array on the heap. The lesson [Stack, Heap, References](../types-and-variables/index.html) explains this picture.',
        'To find `scores[i]`, the JVM computes "start of the boxes + i × 4 bytes". That is why indexes start at 0: index 0 means "0 steps from the start". It also means reading `scores[0]` and `scores[999]` is equally fast. Before each access the JVM checks `0 <= i < length`; a failed check throws `ArrayIndexOutOfBoundsException`.'
      ],
      tryIt: {
        steps: [
          'Make `Week.java` with a class `Week` and a `main` method.',
          'Create `String[] days = new String[7];` and write `"Monday"` into index 0 and `"Sunday"` into the last index (use `days.length - 1`).',
          'Print `days[0]`, `days[6]`, `days[3]` and `days.length`.'
        ],
        see: '`Monday`, `Sunday`, `null` (box 3 was never set) and `7`.'
      },
      check: [
        { q: 'An array has length 8. What are its first and its last index?', a: '`0` and `7`. The last index is always `length - 1`.' },
        { q: 'What does `new boolean[3]` contain?', a: 'Three times `false`, the default value for boolean.' },
        { q: 'Why does `scores.length()` not compile?', a: 'On an array, `length` is a field, not a method. Write `scores.length` without brackets.' }
      ],
      keyPoints: [
        'An array holds a fixed number of elements of one type.',
        'Indexes start at 0; the last index is `length - 1`.',
        '`new type[size]` fills every box with a default value; `{…}` fills them with your values.',
        'Read with `a[i]`, write with `a[i] = value`.',
        '`length` is a field without `()`, and it never changes.'
      ],
      commonMistakes: [
        'Reading the last element with `scores[scores.length]`. That index does not exist. Use `scores[scores.length - 1]`.',
        'Writing `scores.length()` like on a String. Arrays use `scores.length`.',
        'Expecting a new `String[]` to hold empty texts `""`. It holds `null`; write the values first.',
        'Using `int[] days; days = {31, 28};`. A plain initializer only works on the declaring line. Write `days = new int[] {31, 28};`.'
      ],
      related: ['Looping Arrays', 'When the Index Is Wrong', 'Types and Variables', 'Collections'],
      glossary: terms
    },
    {
      id: 'loops',
      title: 'Looping Arrays',
      category: 'practice',
      icon: 'for',
      tagline: 'Visit every box, one after another',
      realWorld: 'A teacher walks along a row of desks and looks at each pupil, one after the other, from the first desk to the last.',
      kid: [
        'You have a row of boxes and you want to look into every one. You start at box 0, look inside, then go to box 1, then box 2, and so on.',
        'When you reach the end of the row, you stop. The row tells you how long it is, so you always know where the end is.',
        'There are two ways to walk. In the first way you count the box numbers out loud: "box 0, box 1, box 2". In the second way you only look at what is inside and do not care about the numbers.'
      ],
      definition: 'You visit every element with a loop. A **counted for loop** gives you the index `i` and the value `a[i]`. An **enhanced for loop** `for (int x : a)` gives you each value, without the index.',
      explain: [
        'You already know both loops from [Control Flow](../control-flow/index.html). With arrays they get a fixed partner: the length. The counted loop runs `i` from `0` while `i < a.length`, so it visits indexes 0 to `length - 1`, exactly every box.',
        'Inside the counted loop, `a[i]` is the element at the current position. You can read it, and you can also write it: `a[i] = a[i] * 2` changes the box.',
        'The **enhanced for loop** (also called for-each) reads as "for each `score` in `scores`". Java does the counting for you. The loop variable holds a copy of each value in turn.',
        'Because that variable is a copy, assigning to it does not change the array. Use the counted loop when you need the index or want to change boxes. Use the enhanced loop when you only read the values.',
        'A counted loop can also walk backwards (`i` from `length - 1` down to `0`) or skip boxes (`i += 2`). The enhanced loop always goes forward, one by one.'
      ],
      why: 'An array is only useful if you can reach all of its elements without writing one line per box. A loop does the same work for 4 boxes or 4 million.',
      whenUse: 'Every time you print, add up, search, change or check all elements of an array.',
      syntax: '`for (int i = 0; i < a.length; i++) { … a[i] … }` when you need the index. `for (type x : a) { … x … }` when you only read the values.',
      fileName: 'LoopScores.java',
      code: `public class LoopScores {
    public static void main(String[] args) {
        int[] scores = {7, 9, 4, 10};

        // Counted for loop: you get the index i and the value scores[i]
        for (int i = 0; i < scores.length; i++) {
            System.out.println("Game " + i + ": " + scores[i] + " points");
        }

        // Enhanced for loop: you get each value, no index
        int total = 0;
        for (int score : scores) {
            total = total + score;
        }
        System.out.println("Total: " + total);

        // Counted loop that changes every box: double each score
        for (int i = 0; i < scores.length; i++) {
            scores[i] = scores[i] * 2;
        }
        System.out.println("First score doubled: " + scores[0]);

        // Counted loop that walks backwards
        for (int i = scores.length - 1; i >= 0; i--) {
            System.out.print(scores[i] + " ");
        }
        System.out.println();
    }
}`,
      output: `Game 0: 7 points
Game 1: 9 points
Game 2: 4 points
Game 3: 10 points
Total: 30
First score doubled: 14
20 8 18 14`,
      codeSummary: 'Four loops over the same array: one prints every index and value, one adds up the values, one doubles every box, and one prints the boxes from the last to the first.',
      codeExplanation: [
        { label: 'Line 6', code: 'for (int i = 0; i < scores.length; i++) {', text: '`i` starts at 0 and stops before 4. So `i` is 0, 1, 2, 3: every valid index once.' },
        { label: 'Line 7', code: 'System.out.println("Game " + i + ": " + scores[i] + " points");', text: '`i` is the position, `scores[i]` is the value at that position. You print both.' },
        { label: 'Line 11', code: 'int total = 0;', text: 'The total starts at 0 before the loop. It must be outside the loop, or it would restart at 0 on every round.' },
        { label: 'Line 12', code: 'for (int score : scores) {', text: 'Read it as "for each score in scores". `score` is 7, then 9, then 4, then 10.' },
        { label: 'Line 13', code: 'total = total + score;', text: 'Adds the current value to the running total: 0+7=7, 7+9=16, 16+4=20, 20+10=30.' },
        { label: 'Line 19', code: 'scores[i] = scores[i] * 2;', text: 'Reads the box, doubles the value and writes it back into the same box. This needs the index, so it uses a counted loop.' },
        { label: 'Line 24', code: 'for (int i = scores.length - 1; i >= 0; i--) {', text: 'Starts at the last index 3 and counts down while `i >= 0`. So it visits 3, 2, 1, 0.' },
        { label: 'Line 25', code: 'System.out.print(scores[i] + " ");', text: '`print` (without ln) stays on the same line. The `println()` after the loop ends the line.' }
      ],
      sections: [
        {
          title: 'How the counted loop walks the array',
          text: [
            'The counted loop follows the same three steps on every round: check the condition, run the body, then add 1 to `i`. The condition `i < scores.length` is what keeps you inside the array.',
            'With 4 elements, the body runs for `i` = 0, 1, 2 and 3. When `i` becomes 4, the condition `4 < 4` is false and the loop ends, before `scores[4]` could be touched.'
          ],
          mermaid: 'flowchart TD\n  S["i = 0"] --> C{"i < scores.length ?"}\n  C -->|yes| B["use scores[i]"]\n  B --> U["i++"]\n  U --> C\n  C -->|no| E["loop ends"]',
          diagramNote: 'The check comes before every round. That is why an empty array (length 0) runs the body zero times and never crashes.'
        },
        {
          title: 'Which loop to choose',
          text: ['Both loops visit the same elements. The question is what you need inside the loop.'],
          table: {
            head: ['You need …', 'Use', 'Example'],
            rows: [
              ['only the values, front to back', 'enhanced for', '`for (int s : scores) total += s;`'],
              ['the position (to print it or compare neighbours)', 'counted for', '`System.out.println(i + ": " + scores[i]);`'],
              ['to change the boxes', 'counted for', '`scores[i] = 0;`'],
              ['backwards or every second box', 'counted for', '`for (int i = a.length - 1; i >= 0; i--)`']
            ],
            note: 'When in doubt, start with the enhanced for loop. Switch to the counted loop as soon as you need `i`.'
          }
        },
        {
          title: 'Wrong vs right: changing boxes in an enhanced for loop',
          text: [
            'The loop variable of an enhanced for loop is a copy of the value, like a photo of what is in the box. Painting on the photo does not change the box.',
            'The program below tries to reset all scores to 0 in both ways. Only the counted loop really changes the array.'
          ],
          fileName: 'ResetScores.java',
          code: `public class ResetScores {
    public static void main(String[] args) {
        int[] scores = {7, 9, 4};

        // Wrong: score is a copy, the array does not change
        for (int score : scores) {
            score = 0;
        }
        System.out.println("After enhanced for: " + scores[0] + " " + scores[1] + " " + scores[2]);

        // Right: write through the index
        for (int i = 0; i < scores.length; i++) {
            scores[i] = 0;
        }
        System.out.println("After counted for: " + scores[0] + " " + scores[1] + " " + scores[2]);
    }
}`,
          output: `After enhanced for: 7 9 4
After counted for: 0 0 0`,
          warn: 'The wrong version compiles without any warning. It silently does nothing to the array.'
        },
        {
          title: 'Print a list with commas',
          text: [
            'A common task: print `Ada, Mina, Kai` with a comma between the names but not after the last one. The index helps: print the comma before every name except the first (`i > 0`).'
          ],
          fileName: 'NameList.java',
          code: `public class NameList {
    public static void main(String[] args) {
        String[] names = {"Ada", "Mina", "Kai"};

        for (int i = 0; i < names.length; i++) {
            if (i > 0) {
                System.out.print(", ");
            }
            System.out.print(names[i]);
        }
        System.out.println();

        // Every second name: i goes 0, 2, 4 ...
        for (int i = 0; i < names.length; i += 2) {
            System.out.println("Team red: " + names[i]);
        }
    }
}`,
          output: `Ada, Mina, Kai
Team red: Ada
Team red: Kai`,
          tip: 'The next lessons show `Arrays.toString(names)`, which prints `[Ada, Mina, Kai]` in one call. The loop is still useful when you want your own format.'
        }
      ],
      technical: [
        'For an array, the compiler turns `for (int score : scores)` into a counted loop. It is roughly `for (int i = 0; i < scores.length; i++) { int score = scores[i]; … }` with a hidden index. So both loops are equally fast.',
        'Because the hidden code copies `scores[i]` into a new local variable `score`, assigning to `score` only changes that local variable. The array box is untouched.',
        'The JVM reads `scores.length` from the array header with one instruction (`arraylength` in the bytecode). Writing `i < scores.length` in the condition costs almost nothing, so you do not need to store the length in a variable first.'
      ],
      tryIt: {
        steps: [
          'Make `Temperatures.java` with `double[] temps = {12.5, 15.0, 9.5, 18.0};`.',
          'With a counted loop print `Day 1: 12.5` … `Day 4: 18.0` (print `i + 1` so the days start at 1).',
          'With an enhanced loop count how many days are warmer than 10.0 and print the count.'
        ],
        see: 'Four "Day" lines and then `3`.'
      },
      check: [
        { q: 'An array has 6 elements. Which values does `i` take in `for (int i = 0; i < a.length; i++)`?', a: '0, 1, 2, 3, 4 and 5. The loop stops when `i` is 6.' },
        { q: 'You want to set every element to 1. Which loop do you use and why?', a: 'The counted loop, because you need the index to write: `a[i] = 1;`. The enhanced loop variable is only a copy.' },
        { q: 'What does `for (int i = a.length - 1; i >= 0; i--)` do?', a: 'It visits the elements from the last one to the first one.' }
      ],
      keyPoints: [
        'The counted loop over an array is `for (int i = 0; i < a.length; i++)`.',
        'Use `<`, never `<=`, with `a.length`.',
        'The enhanced for loop reads each value without an index.',
        'Changing the loop variable of an enhanced for loop does not change the array.',
        'Counted loops can also go backwards or skip elements.'
      ],
      commonMistakes: [
        '`for (int i = 0; i <= a.length; i++)` runs one round too many and crashes on `a[a.length]`. Use `i < a.length`.',
        '`for (int x : a) { x = 0; }` to reset an array does nothing. Write `a[i] = 0` in a counted loop.',
        'Starting at `i = 1` and missing the first element. Indexes start at 0.',
        'Putting `int total = 0;` inside the loop, so the total restarts on every round. Declare it before the loop.'
      ],
      related: ['Create and Index', 'When the Index Is Wrong', 'Control Flow'],
      glossary: terms
    }
  ]);
})();
