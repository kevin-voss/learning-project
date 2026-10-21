// Recursion, part 4: strings and arrays (reverse, palindrome, binary search) and the Fibonacci call tree.
(function () {
  Java.addCoreLessons('recursion', [
    {
      id: 'strings-and-arrays',
      title: 'Recursion on Strings and Arrays',
      category: 'practice',
      icon: '🔤',
      tagline: 'Reverse a word, test a palindrome, search a sorted array',
      realWorld: 'A train of letter wagons. To turn the train around, you unhook the first wagon, turn the rest of the train around, and hook the first wagon on at the back.',
      kid: [
        'You want to read the word "doll" backwards. That is hard all at once. So you take off the first letter, "d", and put it aside.',
        'Now you only need to turn "oll" around. Take off "o". Then turn "ll" around. Take off "l". Now only "l" is left. One letter backwards is the same letter!',
        'Then you put the letters you took off back on, at the end: "l" + "l" + "o" + "d" = "llod".',
        'Looking for a number in a sorted row of cards is a game too: look at the middle card. Too big? Throw away the right half. Too small? Throw away the left half. Do it again with the half that is left.'
      ],
      definition: 'A string or an array gets smaller when you look at a **part** of it: `text.substring(1)` drops the first letter, and a pair of indexes `low` and `high` marks the part of an array that is still left.',
      explain: [
        'You know `charAt`, `length` and `substring` from [Strings](../strings/index.html). `text.substring(1)` is the text without its first letter. `text.substring(1, text.length() - 1)` drops the first **and** the last letter.',
        'The base case for text is usually a text of length 0 or 1. The empty string `""` reversed is `""`. One letter reversed is the same letter. Both are palindromes.',
        'A **palindrome** reads the same forwards and backwards, like "level" or "racecar". The recursive test: the first and last letters must match, and the middle part must be a palindrome too.',
        '**Binary search** finds a value in a **sorted** array. It looks at the middle item. If that is the value, it is done. If the value is smaller, it searches only the left half; if bigger, only the right half. Each call throws away half of what is left.',
        'Binary search has two base cases: "found it" (`sorted[mid] == target`) and "nothing left" (`low > high`). It returns the index, or `-1` for "not found".'
      ],
      why: 'Text and arrays are everywhere. These three examples train you to find the smaller piece and the base case in real data.',
      whenUse: 'Reverse and palindrome: to practise. Binary search: to find a value in a big sorted array in very few steps.',
      syntax: 'Text: `if (text.length() <= 1) { return …; } … method(text.substring(1)) …` · Array: `method(array, low, high)` with `if (low > high) { return -1; }`',
      fileName: 'TextRecursion.java',
      code: `public class TextRecursion {
    static String reverse(String text) {
        if (text.length() <= 1) {
            return text;                     // "" or one letter: already reversed
        }
        char first = text.charAt(0);
        String rest = text.substring(1);     // the text without its first letter
        return reverse(rest) + first;        // turn the rest around, first goes last
    }

    static boolean isPalindrome(String text) {
        if (text.length() <= 1) {
            return true;                     // "" and one letter read the same both ways
        }
        if (text.charAt(0) != text.charAt(text.length() - 1)) {
            return false;                    // the two ends differ: stop early
        }
        return isPalindrome(text.substring(1, text.length() - 1));  // drop both ends
    }

    public static void main(String[] args) {
        System.out.println(reverse("doll"));
        System.out.println("[" + reverse("") + "]");
        System.out.println("level: " + isPalindrome("level"));
        System.out.println("abba: " + isPalindrome("abba"));
        System.out.println("doll: " + isPalindrome("doll"));
    }
}`,
      output: `llod
[]
level: true
abba: true
doll: false`,
      codeSummary: 'Two recursive methods on text: `reverse` drops the first letter and adds it at the end. `isPalindrome` compares the two ends and checks the middle.',
      codeExplanation: [
        { label: 'Line 3', code: 'if (text.length() <= 1) {', text: 'Base case for both empty text and one letter. Using `<= 1` instead of `== 0` saves one call and is safe for `""`.' },
        { label: 'Line 6', code: 'char first = text.charAt(0);', text: 'The small piece of work: take the first letter.' },
        { label: 'Line 7', code: 'String rest = text.substring(1);', text: 'The smaller problem: one letter shorter.' },
        { label: 'Line 8', code: 'return reverse(rest) + first;', text: 'Turn the rest around first, then add `first` at the end. `String + char` gives a new `String`.' },
        { label: 'Line 15', code: 'if (text.charAt(0) != text.charAt(text.length() - 1)) {', text: 'Compares the first letter with the last one. `!=` works for `char` values.' },
        { label: 'Line 16', code: 'return false;', text: 'A second base case: one mismatch is enough. No more calls are needed.' },
        { label: 'Line 18', code: 'return isPalindrome(text.substring(1, text.length() - 1));', text: 'Both ends matched, so check the middle. The text gets two letters shorter.' },
        { label: 'Line 23', code: 'System.out.println("[" + reverse("") + "]");', text: 'The brackets make the empty result visible: `[]`.' }
      ],
      sections: [
        {
          title: 'reverse("doll"), call by call',
          text: ['Each call keeps its `first` letter and waits. On the way back up, each one adds its letter at the end.'],
          table: {
            head: ['Call', '`first`', '`rest`', 'Returns'],
            rows: [
              ['`reverse("doll")`', `'d'`, '"oll"', '"llo" + \'d\' = **"llod"**'],
              ['`reverse("oll")`', `'o'`, '"ll"', '"ll" + \'o\' = "llo"'],
              ['`reverse("ll")`', `'l'`, '"l"', '"l" + \'l\' = "ll"'],
              ['`reverse("l")`', '-', '-', 'base case: "l"']
            ]
          },
          mermaid: 'flowchart TD\n  A["reverse(doll)"] -->|calls| B["reverse(oll)"]\n  B -->|calls| C["reverse(ll)"]\n  C -->|calls| D["reverse(l)<br>base case"]\n  D -.->|"l"| C\n  C -.->|"ll"| B\n  B -.->|"llo"| A\n  A -.->|"llod"| M["main"]',
          diagramNote: 'Going down, the text loses its first letter. Coming up, that letter is added at the end.'
        },
        {
          title: 'Palindromes: compare the two ends',
          text: [
            '"racecar" → ends `r` and `r` match → check "aceca" → `a` and `a` match → check "cec" → `c` and `c` match → check "e" → one letter: **true**.',
            'Real sentences have spaces and capital letters. Clean the text **once** before the recursion starts, then call the recursive method.'
          ],
          code: `public class Sentence {
    static boolean isPalindrome(String text) {
        if (text.length() <= 1) {
            return true;
        }
        if (text.charAt(0) != text.charAt(text.length() - 1)) {
            return false;
        }
        return isPalindrome(text.substring(1, text.length() - 1));
    }

    public static void main(String[] args) {
        String sentence = "Never odd or even";
        String clean = sentence.toLowerCase().replace(" ", "");   // "neveroddoreven"
        System.out.println(clean);
        System.out.println(isPalindrome(clean));
        System.out.println(isPalindrome("Level"));                // capital L differs from l
    }
}`,
          fileName: 'Sentence.java',
          output: `neveroddoreven
true
false`,
          tip: 'Clean the input in `main` (or a helper), not inside the recursive method. Otherwise you clean it again on every call.'
        },
        {
          title: 'Binary search: throw away half each time',
          text: ['The array must be **sorted**. `low` and `high` are the first and last index of the part that is still left. Each call prints what it looks at.'],
          code: `public class BinarySearch {
    static int find(int[] sorted, int target, int low, int high) {
        if (low > high) {
            System.out.println("  nothing left: not found");
            return -1;                                   // base case: empty part
        }
        int mid = (low + high) / 2;
        System.out.println("  look at index " + mid + " (value " + sorted[mid] + ") in " + low + ".." + high);
        if (sorted[mid] == target) {
            return mid;                                  // base case: found it
        }
        if (target < sorted[mid]) {
            return find(sorted, target, low, mid - 1);   // search the left half
        }
        return find(sorted, target, mid + 1, high);      // search the right half
    }

    public static void main(String[] args) {
        int[] numbers = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println("find 23:");
        System.out.println("index " + find(numbers, 23, 0, numbers.length - 1));
        System.out.println("find 7:");
        System.out.println("index " + find(numbers, 7, 0, numbers.length - 1));
    }
}`,
          fileName: 'BinarySearch.java',
          output: `find 23:
  look at index 4 (value 16) in 0..9
  look at index 7 (value 56) in 5..9
  look at index 5 (value 23) in 5..6
index 5
find 7:
  look at index 4 (value 16) in 0..9
  look at index 1 (value 5) in 0..3
  look at index 2 (value 8) in 2..3
  nothing left: not found
index -1`
        },
        {
          title: 'Why binary search is so fast',
          text: ['Every call halves the part that is left. Ten items need at most 4 looks. A million items need at most 20.'],
          mermaid: 'flowchart TD\n  A["0..9: look at 16<br>23 is bigger"] -->|right half| B["5..9: look at 56<br>23 is smaller"]\n  B -->|left half| C["5..6: look at 23<br>found at index 5"]',
          diagramNote: 'Finding 23: three calls instead of checking up to ten items one by one.',
          table: {
            head: ['Items in the array', 'Looks with a loop from the start (worst case)', 'Looks with binary search (worst case)'],
            rows: [['10', '10', '4'], ['1,000', '1,000', '10'], ['1,000,000', '1,000,000', '20']],
            note: 'Binary search needs about log₂(n) calls, so the call stack stays tiny too.'
          },
          warn: 'On an unsorted array, binary search throws away the wrong half and gives wrong answers. Sort first (`java.util.Arrays.sort(numbers)`), or search one by one.'
        }
      ],
      technical: [
        '`String` objects cannot change (they are **immutable**). Every `substring` and every `+` creates a new `String` on the heap. `reverse` of a long text creates many temporary strings. For real code, `new StringBuilder(text).reverse().toString()` is faster.',
        'A faster palindrome test passes two indexes instead of making substrings: `isPalindrome(text, left, right)` with base case `left >= right`. It is the same idea as `low` and `high` in binary search.',
        '`(low + high) / 2` can overflow for arrays with more than about a billion items. The JDK uses `(low + high) >>> 1`. The JDK\'s own `java.util.Arrays.binarySearch` uses a loop, not recursion.'
      ],
      tryIt: {
        steps: [
          'Run `TextRecursion.java`.',
          'Write `static int countChar(String text, char c)`: base case empty → 0; otherwise `(first == c ? 1 : 0) + countChar(rest, c)`.',
          'Print `countChar("banana", \'a\')`. Then run `BinarySearch` with `find(numbers, 91, 0, numbers.length - 1)`.'
        ],
        see: '`3` for "banana". For 91: looks at index 4, 7, 8, 9, then `index 9`.'
      },
      check: [
        { q: 'What is the base case of `reverse`?', a: 'A text of length 0 or 1. It is already reversed, so the method returns it as it is.' },
        { q: 'How does `isPalindrome` make the problem smaller?', a: 'It drops the first and the last letter with `substring(1, text.length() - 1)`.' },
        { q: 'What are the two base cases of binary search?', a: '"Found it": `sorted[mid] == target` returns `mid`. "Nothing left": `low > high` returns `-1`.' }
      ],
      keyPoints: [
        'Text gets smaller with `substring`. Arrays get smaller with `low` and `high` indexes.',
        'Base case for text: length 0 or 1.',
        'A method can have more than one base case.',
        'Binary search needs a sorted array and halves the search each call.'
      ],
      commonMistakes: [
        '`return first + reverse(rest);` puts the first letter in front again and gives back the same word. Write `reverse(rest) + first`.',
        'Base case `text.length() == 1` only: `reverse("")` calls `substring(1)` on an empty text and throws `StringIndexOutOfBoundsException`. Use `<= 1`.',
        'Binary search with `find(sorted, target, low, mid)` instead of `mid - 1`: the part does not get smaller when `low == high`, so it never ends.',
        'Binary search on an unsorted array: wrong results. Sort it first.'
      ],
      related: ['Strings', 'Arrays', 'sum-list', 'fibonacci-tree']
    },
    {
      id: 'fibonacci-tree',
      title: 'Tree-Shaped Recursion: Fibonacci',
      category: 'practice',
      icon: '🌳',
      tagline: 'One call starts two calls, and the work explodes',
      realWorld: 'A family of rabbits. Each month, every grown-up pair has a new pair of babies. Counting them month by month gives 1, 1, 2, 3, 5, 8, 13 …',
      kid: [
        'Each number in the row 0, 1, 1, 2, 3, 5, 8 is the two numbers before it added together. 3 + 5 = 8.',
        'To find number 5, you ask two helpers: one for number 4 and one for number 3. Each of them asks two more helpers. Those ask two more…',
        'Soon you have a whole tree of helpers. Many of them do the same job: lots of helpers all work out number 2, again and again, without telling each other.',
        'That is why this way is slow for big numbers. It is not wrong. It is wasteful.'
      ],
      definition: 'The **Fibonacci numbers** are `fib(0) = 0`, `fib(1) = 1`, and `fib(n) = fib(n - 1) + fib(n - 2)`. The method calls itself **twice**, so the calls form a **tree**, not a chain.',
      explain: [
        'Until now, each call made at most one recursive call. The calls formed a chain: 3 → 2 → 1 → 0. That is **linear recursion**.',
        '`fib` makes **two** calls: `fib(n - 1)` and `fib(n - 2)`. Each of those makes two more. A picture of all the calls looks like an upside-down tree. That is **tree recursion**.',
        'Java runs the tree **depth first**: it finishes `fib(n - 1)` completely, with all of its children, before it starts `fib(n - 2)`. So the stack is never deeper than `n`, but the **number** of calls is huge.',
        'The tree repeats work. `fib(5)` computes `fib(2)` three times and `fib(1)` five times. The number of calls grows by about 1.6 times for each step of `n`. `fib(30)` needs about 2.7 million calls, `fib(40)` more than 300 million.',
        'There are two base cases here: `n == 0` and `n == 1`. `if (n <= 1) { return n; }` covers both in one line.'
      ],
      why: 'Many real problems split into two or more smaller problems: trees, folders, games. You must know the shape and the cost of tree recursion.',
      whenUse: 'When a problem splits into several smaller copies. If the copies overlap, like in Fibonacci, store the answers (memoization, the Deeper lesson).',
      syntax: '`static long fib(int n) { if (n <= 1) { return n; } return fib(n - 1) + fib(n - 2); }`',
      fileName: 'Fibonacci.java',
      code: `public class Fibonacci {
    static long calls = 0;

    static long fib(int n) {
        calls++;
        if (n <= 1) {
            return n;                        // fib(0) = 0, fib(1) = 1
        }
        return fib(n - 1) + fib(n - 2);      // two calls: the tree grows
    }

    public static void main(String[] args) {
        for (int n = 0; n <= 10; n++) {
            System.out.print(fib(n) + " ");
        }
        System.out.println();

        int[] sizes = {5, 10, 20, 30};
        for (int n : sizes) {
            calls = 0;
            long value = fib(n);
            System.out.println("fib(" + n + ") = " + value + " needs " + calls + " calls");
        }
    }
}`,
      output: `0 1 1 2 3 5 8 13 21 34 55
fib(5) = 5 needs 15 calls
fib(10) = 55 needs 177 calls
fib(20) = 6765 needs 21891 calls
fib(30) = 832040 needs 2692537 calls`,
      codeSummary: 'The plain recursive Fibonacci, plus a counter that shows how fast the number of calls grows.',
      codeExplanation: [
        { label: 'Line 2', code: 'static long calls = 0;', text: 'One counter shared by all calls. `main` resets it before each measurement.' },
        { label: 'Line 5', code: 'calls++;', text: 'Counts every single call, also the base case calls.' },
        { label: 'Line 6', code: 'if (n <= 1) {', text: 'Two base cases in one: for 0 and 1 the answer is `n` itself.' },
        { label: 'Line 9', code: 'return fib(n - 1) + fib(n - 2);', text: 'Two recursive calls. Java finishes the left one completely, then starts the right one, then adds.' },
        { label: 'Line 14', code: 'System.out.print(fib(n) + " ");', text: 'Prints the first eleven Fibonacci numbers on one line.' },
        { label: 'Line 19', code: 'calls = 0;', text: 'Reset the counter so each line counts only the calls for that one `n`.' },
        { label: 'Line 21', code: 'System.out.println("fib(" + n + ") = " + value + " needs " + calls + " calls");', text: 'The value grows slowly. The number of calls grows much faster.' }
      ],
      sections: [
        {
          title: 'The call tree of fib(4)',
          text: ['Every box is one call. Every box that is not a base case has two children. Count the boxes: 9 calls for `fib(4)`.'],
          mermaid: 'flowchart TD\n  A["fib(4)"] --> B["fib(3)"]\n  A --> C["fib(2)"]\n  B --> D["fib(2)"]\n  B --> E["fib(1) = 1"]\n  D --> F["fib(1) = 1"]\n  D --> G["fib(0) = 0"]\n  C --> H["fib(1) = 1"]\n  C --> I["fib(0) = 0"]',
          diagramNote: '`fib(2)` appears twice. Both times Java computes it from scratch. For bigger `n` the repeats explode.'
        },
        {
          title: 'Watch the tree being walked',
          text: ['Indenting by depth prints the same tree as text. Read it top to bottom: Java goes all the way down the left side first.'],
          code: `public class FibTrace {
    static long fib(int n, int depth) {
        System.out.println("  ".repeat(depth) + "fib(" + n + ")");
        if (n <= 1) {
            return n;
        }
        return fib(n - 1, depth + 1) + fib(n - 2, depth + 1);
    }

    public static void main(String[] args) {
        System.out.println("= " + fib(4, 0));
    }
}`,
          fileName: 'FibTrace.java',
          output: `fib(4)
  fib(3)
    fib(2)
      fib(1)
      fib(0)
    fib(1)
  fib(2)
    fib(1)
    fib(0)
= 3`,
          tip: 'The deepest line has 3 levels of indent below `fib(4)`. The stack never holds more than `n` frames of `fib`, even though there are 9 calls in total.'
        },
        {
          title: 'How often is each value computed?',
          text: ['Count how many times each `fib(k)` runs inside one `fib(6)`. The small values are computed again and again.'],
          code: `public class FibRepeats {
    static int[] counts = new int[7];

    static long fib(int n) {
        counts[n]++;
        if (n <= 1) {
            return n;
        }
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        fib(6);
        for (int k = 6; k >= 0; k--) {
            System.out.println("fib(" + k + ") computed " + counts[k] + " times");
        }
    }
}`,
          fileName: 'FibRepeats.java',
          output: `fib(6) computed 1 times
fib(5) computed 1 times
fib(4) computed 2 times
fib(3) computed 3 times
fib(2) computed 5 times
fib(1) computed 8 times
fib(0) computed 5 times`,
          table: {
            head: ['`n`', '`fib(n)`', 'Calls of the plain recursion', 'Calls with memoization'],
            rows: [['5', '5', '15', '9'], ['10', '55', '177', '19'], ['20', '6,765', '21,891', '39'], ['30', '832,040', '2,692,537', '59'], ['40', '102,334,155', '331,160,281', '79']],
            note: 'The counts of repeats are Fibonacci numbers themselves. Memoization (Deeper lesson) computes each value once.'
          }
        },
        {
          title: 'Chain or tree?',
          table: {
            head: ['', 'Linear recursion', 'Tree recursion'],
            rows: [
              ['Recursive calls per call', 'one', 'two or more'],
              ['Examples', '`countdown`, `factorial`, `sum`, `reverse`', '`fib`, walking folders, games with choices'],
              ['Number of calls for input `n`', 'about `n`', 'can grow very fast (about 1.6ⁿ for `fib`)'],
              ['Deepest stack', 'about `n`', 'about `n` (the longest path)']
            ]
          },
          warn: 'Try `fib(45)` with the plain version: it takes several seconds. `fib(60)` would take hours. The answer is correct, the method is only too slow.'
        }
      ],
      technical: [
        'The calls of `fib(n)` follow a pattern: `calls(n) = calls(n - 1) + calls(n - 2) + 1`, which works out to `2 * fib(n + 1) - 1`. For `n = 30` that is `2 * 1,346,269 - 1 = 2,692,537`, exactly what the program prints.',
        'Growth by a constant factor per step is called **exponential** growth. The factor here is the golden ratio, about 1.618.',
        'In `fib(n - 1) + fib(n - 2)`, Java always evaluates the left operand first. That is a rule of the Java language, so the trace order is always the same.'
      ],
      tryIt: {
        steps: [
          'Run `Fibonacci.java`.',
          'Add `35` to the `sizes` array and run again. Notice how long it takes.',
          'Run `FibTrace` with `fib(5, 0)` and count the lines.'
        ],
        see: '`fib(35) = 9227465 needs 29860703 calls` after a short wait. The trace of `fib(5)` has 15 call lines.'
      },
      check: [
        { q: 'Why do the calls of `fib` form a tree?', a: 'Each call that is not a base case makes two calls: `fib(n - 1)` and `fib(n - 2)`.' },
        { q: 'Why is the plain `fib(40)` slow?', a: 'It computes the same small values again and again: more than 331 million calls for one answer.' },
        { q: 'How deep does the stack get for `fib(4)`?', a: 'At most 4 frames of `fib` (the path `fib(4)` → `fib(3)` → `fib(2)` → `fib(1)`), even though there are 9 calls.' }
      ],
      keyPoints: [
        'Two recursive calls per call make a call tree.',
        'Java walks the tree depth first: left branch completely, then right.',
        'Stack depth is about `n`, but the number of calls grows exponentially.',
        'Repeated subproblems are the reason for the slowness.'
      ],
      commonMistakes: [
        'Only one base case: `if (n == 1) return 1;` makes `fib(2)` call `fib(0)`, which calls `fib(-1)` … Use `if (n <= 1) return n;`.',
        'Using `int` for big `n`: `fib(47)` is already too big for `int`. Use `long`.',
        'Using the plain recursion for large `n` in real code: it is far too slow. Use memoization or a loop.'
      ],
      related: ['memoization', 'recursion-vs-loops', 'folder-tree']
    }
  ]);
})();
