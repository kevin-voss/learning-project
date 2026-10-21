// Arrays, part 4 of 5: "Arrays Are References" and "Arrays and Methods".
(function () {
  const terms = Java.arrayTerms;

  Java.addCoreLessons('arrays', [
    {
      id: 'references-copy',
      title: 'Arrays Are References',
      category: 'concept',
      icon: '->',
      tagline: 'Two names, one array, and how to make a real copy',
      realWorld: 'Two children share one toy box. If one child puts a car into the box, the other child finds the car there too. It is not two boxes, it is one box with two owners.',
      kid: [
        'Your friend asks where your box of crayons is. You write "the crayons are on the top shelf" on a note and give it to her.',
        'Now you both have a note, but there is still only one box. If she takes the red crayon out, the red crayon is gone for you too.',
        'If you want two boxes, you have to buy a second box and put a copy of every crayon into it. Then each of you has your own.'
      ],
      definition: 'An array variable does not hold the boxes. It holds a **reference**, the address of the array in memory. `int[] b = a;` copies only that address, so `a` and `b` name the same array. A real copy needs `Arrays.copyOf(a, a.length)` or `a.clone()`.',
      explain: [
        'Arrays are **objects**. Objects live on the **heap**, a memory area for things that can be big. A variable like `int[] scores` lives on the **stack** and holds only an arrow to the array. You met this picture in [Stack, Heap, References](../types-and-variables/index.html).',
        'When you assign one array variable to another, Java copies the arrow, not the boxes. After `int[] other = original;` there is still one array, with two names. A change through `other[0] = 99` is visible through `original[0]`. Two names for one thing are called **aliases**.',
        '`==` on arrays compares the arrows: it is `true` only if both names point to the very same array. Two different arrays with the same values are `==` false. To compare the values, use `Arrays.equals(a, b)`.',
        'To get a second, independent array, create one. `Arrays.copyOf(a, newLength)` makes a new array and copies the values over. `a.clone()` does the same with the same length. After that, changing the copy does not touch the original.',
        '`Arrays.copyOf` can also give a different length: a longer copy gets default values at the end (this is how you "grow" an array), a shorter one keeps only the first values.'
      ],
      why: 'Copying only the arrow is fast and saves memory, even for huge arrays. But you must know about it, or a change in one place shows up somewhere you did not expect.',
      whenUse: 'Think about it whenever you write `b = a` with arrays, pass an array to a method, or want to keep the old values before you sort or change an array.',
      syntax: '`int[] alias = a;` (same array) · `int[] copy = Arrays.copyOf(a, a.length);` or `int[] copy = a.clone();` (new array) · `Arrays.equals(a, b)` (same values?) · `a == b` (same array?).',
      fileName: 'SharedArray.java',
      code: `import java.util.Arrays;

public class SharedArray {
    public static void main(String[] args) {
        int[] original = {1, 2, 3};
        int[] other = original;          // copies the arrow, not the boxes

        other[0] = 99;
        System.out.println("original: " + Arrays.toString(original));
        System.out.println("other:    " + Arrays.toString(other));
        System.out.println("Same array? " + (original == other));

        int[] copy = Arrays.copyOf(original, original.length);  // a new array
        copy[1] = 50;
        System.out.println("original: " + Arrays.toString(original));
        System.out.println("copy:     " + Arrays.toString(copy));
        System.out.println("Same array? " + (original == copy));

        int[] twin = original.clone();   // another new array
        System.out.println("Same values? " + Arrays.equals(original, twin));
        System.out.println("Same array? " + (original == twin));
    }
}`,
      output: `original: [99, 2, 3]
other:    [99, 2, 3]
Same array? true
original: [99, 2, 3]
copy:     [99, 50, 3]
Same array? false
Same values? true
Same array? false`,
      codeSummary: 'First two names share one array, so a change through one name shows through the other. Then `copyOf` and `clone` make real copies that change on their own.',
      codeExplanation: [
        { label: 'Line 6', code: 'int[] other = original;', text: 'No new array. `other` gets the same arrow as `original`, so both point to `{1, 2, 3}`.' },
        { label: 'Line 8', code: 'other[0] = 99;', text: 'Writes into box 0 of the one shared array.' },
        { label: 'Line 9', code: 'System.out.println("original: " + Arrays.toString(original));', text: 'Shows `[99, 2, 3]`. The change made through `other` is visible through `original`.' },
        { label: 'Line 11', code: '(original == other)', text: '`==` asks "same array?". Yes, both arrows point to the same object: `true`.' },
        { label: 'Line 13', code: 'int[] copy = Arrays.copyOf(original, original.length);', text: 'Creates a new array of length 3 and copies 99, 2, 3 into it.' },
        { label: 'Line 14', code: 'copy[1] = 50;', text: 'Changes only the copy. `original` still has 2 at index 1.' },
        { label: 'Line 19', code: 'int[] twin = original.clone();', text: '`clone()` is a method every array has. It returns a new array with the same length and values.' },
        { label: 'Line 20', code: 'Arrays.equals(original, twin)', text: 'Compares the values box by box: same length, same values in the same order, so `true`.' },
        { label: 'Line 21', code: '(original == twin)', text: 'Same values, but two different arrays, so `==` is `false`.' }
      ],
      sections: [
        {
          title: 'Two variables, one array',
          text: [
            'This is the memory after the example has run. The names live on the stack in `main`. The arrays live on the heap. `original` and `other` hold the same arrow; `copy` points to its own array.'
          ],
          mermaid: 'flowchart LR\n  subgraph stack["Stack: main"]\n    O["original"]\n    T["other"]\n    C["copy"]\n  end\n  subgraph heap["Heap"]\n    A["int array: 99, 2, 3"]\n    B["int array: 99, 50, 3"]\n  end\n  O --> A\n  T --> A\n  C --> B',
          diagramNote: 'Two arrows into the first array: changes through `original` or `other` land in the same boxes. `copy` has its own boxes.'
        },
        {
          title: 'Three ways to make a real copy',
          table: {
            head: ['Code', 'Result'],
            rows: [
              ['`Arrays.copyOf(a, a.length)`', 'new array, same length, same values'],
              ['`a.clone()`', 'the same, written shorter'],
              ['`Arrays.copyOf(a, n)` with a bigger `n`', 'new, longer array; the extra boxes get default values'],
              ['`Arrays.copyOfRange(a, from, to)`', 'new array with the indexes `from` up to (not including) `to`'],
              ['a loop: `copy[i] = a[i]`', 'the same by hand, after `int[] copy = new int[a.length];`']
            ]
          },
          text: ['An array cannot grow, but `Arrays.copyOf` gives you a longer copy. Point the old variable to the new array, and it looks as if the array grew.'],
          fileName: 'GrowArray.java',
          code: `import java.util.Arrays;

public class GrowArray {
    public static void main(String[] args) {
        int[] scores = {7, 9, 4};

        // "Grow": a new, longer array with the old values
        scores = Arrays.copyOf(scores, scores.length + 1);
        System.out.println("Longer: " + Arrays.toString(scores));
        scores[scores.length - 1] = 10;
        System.out.println("Filled: " + Arrays.toString(scores));

        // A shorter copy keeps only the first values
        int[] firstTwo = Arrays.copyOf(scores, 2);
        System.out.println("First two: " + Arrays.toString(firstTwo));

        // A part from the middle: index 1 up to, not including, 3
        int[] middle = Arrays.copyOfRange(scores, 1, 3);
        System.out.println("Middle: " + Arrays.toString(middle));
    }
}`,
          output: `Longer: [7, 9, 4, 0]
Filled: [7, 9, 4, 10]
First two: [7, 9]
Middle: [9, 4]`,
          tip: 'Growing by copying is fine now and then. If you add values all the time, an `ArrayList` does this work for you (see [Collections](../collections/index.html)).'
        },
        {
          title: 'Change a box vs point to a new array',
          text: [
            'There are two very different things you can do with an array variable. `other[0] = 5` changes a box of the array it points to: every alias sees it. `other = new int[] {5, 5}` makes `other` point somewhere else: the old array and its other names are not touched.'
          ],
          fileName: 'Repoint.java',
          code: `import java.util.Arrays;

public class Repoint {
    public static void main(String[] args) {
        int[] first = {1, 2, 3};
        int[] second = first;

        second[0] = 5;                  // change a box: both see it
        System.out.println(Arrays.toString(first) + " " + Arrays.toString(second));

        second = new int[] {8, 8};      // new arrow: only second changes
        System.out.println(Arrays.toString(first) + " " + Arrays.toString(second));
    }
}`,
          output: `[5, 2, 3] [5, 2, 3]
[5, 2, 3] [8, 8]`
        },
        {
          title: 'Edge case: copies of object arrays are shallow',
          text: [
            '`copyOf` and `clone` copy what is in the boxes. For an `int[]` that is the numbers themselves. For an array of objects, the boxes hold arrows, so the copy gets the same arrows: a **shallow copy**. The two arrays are different, but they share the objects inside.',
            'For a `String[]` this is no problem, because a String can never be changed (you see why in [Strings](../strings/index.html)). It matters for arrays of arrays, which you meet in the lesson on two-dimensional arrays.'
          ]
        }
      ],
      technical: [
        '`int[] other = original;` copies one reference, usually 4 or 8 bytes, no matter how big the array is. No new object is created, so it costs almost nothing.',
        '`clone()` and `Arrays.copyOf` allocate a new array object on the heap and copy the elements with `System.arraycopy`, a very fast native method that copies the whole memory block at once.',
        'When no variable points to an array any more (for example the old, short array after `scores = Arrays.copyOf(...)`), the **garbage collector**, the part of the JVM that cleans up memory, frees it later. You never delete arrays yourself.',
        '`==` compares the two references as numbers (addresses). `Arrays.equals` first checks that both lengths match and then compares the elements one by one.'
      ],
      tryIt: {
        steps: [
          'Make `Backup.java` with `int[] points = {5, 8, 2};` and `int[] backup = points;`.',
          'Sort `points` with `Arrays.sort` and print both arrays with `Arrays.toString`.',
          'Change the second line to `int[] backup = points.clone();`, run again and compare.'
        ],
        see: 'First both print `[2, 5, 8]` (one array). With `clone()`, `backup` keeps `[5, 8, 2]`.'
      },
      check: [
        { q: 'After `int[] b = a;` how many arrays exist?', a: 'One. `a` and `b` are two names (two references) for the same array.' },
        { q: '`a` and `b` are two different arrays with the values `{1, 2}`. What are `a == b` and `Arrays.equals(a, b)`?', a: '`false` and `true`. `==` asks "same array?", `Arrays.equals` asks "same values?".' },
        { q: 'What does `Arrays.copyOf(new int[] {4, 5}, 4)` return?', a: 'A new array `[4, 5, 0, 0]`. The extra boxes get the default value 0.' }
      ],
      keyPoints: [
        'An array variable holds a reference (an arrow), not the boxes.',
        '`b = a` makes a second name for the same array.',
        '`Arrays.copyOf` and `clone()` make a new, independent array.',
        '`==` asks "same array?"; `Arrays.equals` asks "same values?".',
        'A longer `copyOf` is how you "grow" an array.'
      ],
      commonMistakes: [
        '`int[] backup = scores;` as a backup. It is the same array. Write `int[] backup = scores.clone();`.',
        '`if (a == b)` to compare values. Write `if (Arrays.equals(a, b))`.',
        'Calling `Arrays.copyOf(scores, scores.length + 1);` without using the result. The old array does not change; write `scores = Arrays.copyOf(...)`.',
        'Expecting `second = new int[3]` to change `first`. It only points `second` to a new array.'
      ],
      related: ['Arrays and Methods', 'The Arrays Helper Class', 'Types and Variables', 'Collections'],
      glossary: terms
    },
    {
      id: 'arrays-and-methods',
      title: 'Arrays and Methods',
      category: 'practice',
      icon: 'f()',
      tagline: 'Pass an array in, get an array back',
      realWorld: 'You give your friend the key to your toy box so she can tidy it. She does not get a second box; she opens yours. When she gives the key back, your box is tidy.',
      kid: [
        'Your class has a helper, Sam. You can ask Sam: "count all the marbles in my box".',
        'You do not carry the heavy box to Sam. You only tell Sam where the box is. Sam walks to it and counts.',
        'If you ask Sam "paint all my marbles red", Sam paints the marbles in your box. When you look later, they are red, because there was only ever one box.'
      ],
      definition: 'A method can take an array as a **parameter** (`int[] numbers`) and can **return** an array (`static int[] name(…)`). Java passes the reference, so a method that changes the boxes changes the caller\'s array.',
      explain: [
        'You know parameters and return values from [Methods](../methods/index.html). An array parameter looks like any other: the type is `int[]`, `String[]` and so on. Inside the method it is a normal array with `length` and indexes.',
        'Java always passes a copy of the value in the variable. For an array variable, that value is the **reference** (the arrow from the lesson "Arrays Are References"). So the method gets its own arrow to the same array.',
        'That has two results. First, if the method writes `numbers[i] = …`, it writes into the caller\'s array; the caller sees the change after the call. Second, if the method writes `numbers = new int[3]`, only its own arrow moves; the caller\'s variable still points to the old array.',
        'A method can also build a new array and return it. The return type is the array type, for example `static int[] countTo(int n)`. The new array lives on after the method ends, because the caller now holds an arrow to it.',
        'You can pass an array you create on the spot: `sum(new int[] {10, 20})`. The short form `sum({10, 20})` does not compile; braces alone work only on a declaring line.'
      ],
      why: 'Methods let you write an algorithm such as sum or max once and use it for every array. Knowing that the reference is passed tells you which methods may change your data.',
      whenUse: 'Whenever the same array job appears twice: put it in a method. Return a new array when the caller must keep the original unchanged.',
      syntax: '`static int sum(int[] numbers) { … }` takes an array. `static int[] countTo(int n) { … return result; }` returns one. Call with `sum(scores)` or `sum(new int[] {1, 2})`.',
      fileName: 'ArrayMethods.java',
      code: `import java.util.Arrays;

public class ArrayMethods {
    // Takes an array and gives back one number
    static int sum(int[] numbers) {
        int total = 0;
        for (int n : numbers) {
            total += n;
        }
        return total;
    }

    // Changes the boxes of the array it receives
    static void doubleAll(int[] numbers) {
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = numbers[i] * 2;
        }
    }

    // Makes and returns a brand-new array
    static int[] countTo(int n) {
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            result[i] = i + 1;
        }
        return result;
    }

    public static void main(String[] args) {
        int[] scores = {3, 5, 8};
        System.out.println("Sum: " + sum(scores));

        doubleAll(scores);
        System.out.println("After doubleAll: " + Arrays.toString(scores));

        int[] counting = countTo(4);
        System.out.println("countTo(4): " + Arrays.toString(counting));
        System.out.println("Sum of a new array: " + sum(new int[] {10, 20}));
    }
}`,
      output: `Sum: 16
After doubleAll: [6, 10, 16]
countTo(4): [1, 2, 3, 4]
Sum of a new array: 30`,
      codeSummary: 'Three methods: one reads an array and returns a number, one changes the boxes of the array it gets, and one builds and returns a new array.',
      codeExplanation: [
        { label: 'Line 5', code: 'static int sum(int[] numbers) {', text: 'The parameter `numbers` has the type `int[]`. Any int array can be passed in, whatever its length.' },
        { label: 'Line 10', code: 'return total;', text: 'The method only reads the array and returns one int. The array is not changed.' },
        { label: 'Line 14', code: 'static void doubleAll(int[] numbers) {', text: '`void`: it returns nothing. Its work is the change it makes to the boxes.' },
        { label: 'Line 16', code: 'numbers[i] = numbers[i] * 2;', text: '`numbers` points to the caller\'s array, so this writes into `scores` from `main`.' },
        { label: 'Line 21', code: 'static int[] countTo(int n) {', text: 'The return type `int[]` says: this method gives back an int array.' },
        { label: 'Line 22', code: 'int[] result = new int[n];', text: 'A new array of length `n`, created inside the method.' },
        { label: 'Line 26', code: 'return result;', text: 'Returns the arrow to the new array. The local variable `result` is gone after the method, but the array lives on, because `counting` in `main` points to it.' },
        { label: 'Line 33', code: 'doubleAll(scores);', text: 'Passes the arrow to `scores`. After the call, `scores` is `[6, 10, 16]`.' },
        { label: 'Line 38', code: 'sum(new int[] {10, 20})', text: 'An array created right in the call. `new int[]` in front of the braces is required here.' }
      ],
      sections: [
        {
          title: 'What really travels into the method',
          text: [
            'When `main` calls `doubleAll(scores)`, it does not send three numbers. It sends a copy of the arrow. Now two arrows point to the same array: `scores` in `main` and `numbers` in `doubleAll`.'
          ],
          mermaid: 'sequenceDiagram\n  participant M as main\n  participant D as doubleAll\n  participant H as array on the heap\n  M->>D: doubleAll(scores) sends a copy of the arrow\n  D->>H: numbers[0] = 6\n  D->>H: numbers[1] = 10\n  D->>H: numbers[2] = 16\n  D-->>M: returns, nothing to give back\n  M->>H: Arrays.toString(scores) reads 6, 10, 16',
          diagramNote: 'Read from top to bottom. `doubleAll` writes into the one array on the heap, and `main` reads the changed values afterwards.'
        },
        {
          title: 'Change the boxes vs replace the array',
          text: [
            'A method can change the boxes of the caller\'s array, but it cannot make the caller\'s variable point to a different array. In the program, `replace` only moves its own arrow, while `clear` writes into the shared boxes.'
          ],
          fileName: 'ReplaceInside.java',
          code: `import java.util.Arrays;

public class ReplaceInside {
    static void replace(int[] numbers) {
        numbers = new int[] {0, 0, 0};   // only the local arrow moves
    }

    static void clear(int[] numbers) {
        Arrays.fill(numbers, 0);         // writes into the caller's boxes
    }

    public static void main(String[] args) {
        int[] scores = {3, 5, 8};

        replace(scores);
        System.out.println("After replace: " + Arrays.toString(scores));

        clear(scores);
        System.out.println("After clear:   " + Arrays.toString(scores));
    }
}`,
          output: `After replace: [3, 5, 8]
After clear:   [0, 0, 0]`,
          tip: 'If a method must give the caller a different array, return it: `scores = makeNew(scores);`.'
        },
        {
          title: 'Return a copy to keep the original safe',
          text: [
            'Sometimes the caller wants a sorted version but must keep the old order. Then the method copies first and changes only the copy. The original is never touched.'
          ],
          fileName: 'SortedCopy.java',
          code: `import java.util.Arrays;

public class SortedCopy {
    static int[] sortedCopy(int[] numbers) {
        int[] copy = numbers.clone();
        Arrays.sort(copy);
        return copy;
    }

    public static void main(String[] args) {
        int[] arrival = {42, 7, 19};
        int[] ranking = sortedCopy(arrival);

        System.out.println("Arrival order: " + Arrays.toString(arrival));
        System.out.println("Ranking:       " + Arrays.toString(ranking));
    }
}`,
          output: `Arrival order: [42, 7, 19]
Ranking:       [7, 19, 42]`
        },
        {
          title: 'The array you used from day one: String[] args',
          text: [
            '`main(String[] args)` has an array parameter too. `args` holds the words you type after the program name in the terminal. They are called **command-line arguments**.',
            'Run the program below with `java ShowArgs.java` and it says 0 arguments, as in the output. Run it with `java ShowArgs.java Ada Kai` and it prints `You passed 2 arguments`, then `args[0] = Ada` and `args[1] = Kai`.'
          ],
          fileName: 'ShowArgs.java',
          code: `public class ShowArgs {
    public static void main(String[] args) {
        System.out.println("You passed " + args.length + " arguments");
        for (int i = 0; i < args.length; i++) {
            System.out.println("args[" + i + "] = " + args[i]);
        }
    }
}`,
          output: 'You passed 0 arguments',
          warn: 'Without arguments `args` is an empty array, not `null`. So `args[0]` crashes with `ArrayIndexOutOfBoundsException`. Check `args.length` first.'
        },
        {
          title: 'Deeper: any number of arguments with ...',
          text: [
            'A parameter written `int... values` (three dots, called **varargs**) accepts any number of ints: `max(3, 9, 4)`, `max(5)` or even an existing array `max(scores)`. Inside the method, `values` is a normal `int[]`.',
            'Only the last parameter of a method can be varargs. The method should handle zero arguments, because then `values.length` is 0.'
          ],
          fileName: 'VarargsMax.java',
          code: `public class VarargsMax {
    static int max(int... values) {
        if (values.length == 0) {
            return 0;   // nothing to compare
        }
        int best = values[0];
        for (int v : values) {
            if (v > best) {
                best = v;
            }
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(max(3, 9, 4));
        System.out.println(max(5));
        int[] scores = {12, 30, 7};
        System.out.println(max(scores));
        System.out.println(max());
    }
}`,
          output: `9
5
30
0`
        }
      ],
      technical: [
        'Java is always **pass-by-value**: the method gets a copy of what is in the variable. For `int x` that is the number. For `int[] a` it is the reference. The method\'s parameter is a new local variable in its own stack frame (the memory for one method call), holding a copy of that reference.',
        'Because the array itself is on the heap and not in a stack frame, it survives the end of the method. A returned array is safe to use for as long as some variable points to it; after that the garbage collector frees it.',
        'For varargs the compiler does the work: the call `max(3, 9, 4)` is compiled as `max(new int[] {3, 9, 4})`. That is why `values` is a plain array inside the method and why you can also pass an array yourself.'
      ],
      tryIt: {
        steps: [
          'In a new file `Stats.java`, write `static double average(int[] numbers)` that returns the sum divided by the length as a double.',
          'Write `static void addBonus(int[] numbers, int bonus)` that adds `bonus` to every element.',
          'In `main` make `int[] points = {4, 6, 8};`, print `average(points)`, call `addBonus(points, 2)`, and print `average(points)` and `Arrays.toString(points)`.'
        ],
        see: '`6.0`, then `8.0` and `[6, 8, 10]`: `addBonus` changed the caller\'s array.'
      },
      check: [
        { q: 'A method sets `numbers[0] = 99` on its parameter. Does the caller see it?', a: 'Yes. The parameter holds a copy of the reference, so it points to the caller\'s array.' },
        { q: 'A method sets `numbers = new int[5]`. Does the caller\'s variable change?', a: 'No. Only the method\'s own copy of the reference moves. Return the new array if the caller needs it.' },
        { q: 'Why does `sum({1, 2, 3})` not compile, and what is the fix?', a: 'Braces alone are only allowed on a declaring line. Write `sum(new int[] {1, 2, 3})`.' }
      ],
      keyPoints: [
        'Array parameters look like `int[] numbers`; array return types like `static int[] name()`.',
        'Java passes a copy of the reference, so the method works on the caller\'s array.',
        'Writing into the boxes is visible to the caller; pointing the parameter to a new array is not.',
        'Return a copy when the caller must keep the original.',
        '`main(String[] args)` receives the command-line arguments as an array.'
      ],
      commonMistakes: [
        'Expecting `numbers = new int[] {0, 0};` inside a method to reset the caller\'s array. Use `Arrays.fill(numbers, 0);` or return the new array.',
        'Sorting a parameter with `Arrays.sort(numbers);` when the caller needs the old order. Sort `numbers.clone()` instead.',
        'Writing `sum({1, 2})`. Write `sum(new int[] {1, 2})`.',
        'Reading `args[0]` without checking `args.length > 0`.'
      ],
      related: ['Arrays Are References', 'Everyday Array Algorithms', 'Methods'],
      glossary: terms
    }
  ]);
})();
