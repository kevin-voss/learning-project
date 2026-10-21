// Recursion, part 2: factorial and the sum of a list (return values coming back up).
(function () {
  Java.addCoreLessons('recursion', [
    {
      id: 'factorial',
      title: 'Factorial: Answers Coming Back Up',
      category: 'practice',
      icon: 'n!',
      tagline: '4! = 4 × 3 × 2 × 1, computed one call at a time',
      realWorld: 'How many ways can 3 children stand in a line? 3 choices for the first spot, then 2 for the second, then 1 for the last: 3 × 2 × 1 = 6.',
      kid: [
        'You want to know 4 × 3 × 2 × 1. You are lazy, so you ask a friend: "What is 3 × 2 × 1?" When the friend answers, you multiply by 4.',
        'Your friend is lazy too and asks another friend: "What is 2 × 1?" That friend asks one more friend: "What is 1?"',
        'The last friend knows right away: "1!" Then the answers travel back: 1, then 2, then 6, then 24.',
        'Nobody did much work. Each friend did one multiplication.'
      ],
      definition: 'The **factorial** of `n`, written `n!`, is `n × (n - 1) × … × 1`. Recursively: `factorial(n) = n * factorial(n - 1)`, with the base case `factorial(1) = 1` (and `factorial(0) = 1`).',
      explain: [
        'This method **returns** a value. You know return values from [Methods](../methods/index.html). Now the return value of the smaller call becomes part of the bigger answer.',
        'In `return n * factorial(n - 1);` Java cannot multiply yet. It first needs the value of `factorial(n - 1)`. So the current call pauses and waits. Its frame stays on the stack with its own `n`.',
        'The calls go **down** until the base case: `factorial(1)` returns `1` right away. Then the waiting calls wake up one by one, **back up**: each one multiplies its own `n` with the value it got back and returns the result to its caller.',
        'The return type is `long`, not `int`. Factorials grow very fast. `13!` is already larger than the biggest `int`. You met these limits in [Types & Variables](../types-and-variables/index.html).'
      ],
      why: 'It is the classic first example of a recursive method that returns a value. Small, clear, and easy to check by hand.',
      whenUse: 'Counting arrangements (how many orders are possible), practising how return values travel back up.',
      syntax: '`static long factorial(int n) { if (n <= 1) { return 1; } return n * factorial(n - 1); }`',
      fileName: 'Factorial.java',
      code: `public class Factorial {
    static long factorial(int n, String indent) {
        System.out.println(indent + "factorial(" + n + ") starts");
        if (n <= 1) {
            System.out.println(indent + "factorial(" + n + ") returns 1");
            return 1;                                    // base case
        }
        long smaller = factorial(n - 1, indent + "  "); // wait for the smaller answer
        long result = n * smaller;
        System.out.println(indent + "factorial(" + n + ") returns " + n + " * " + smaller + " = " + result);
        return result;
    }

    public static void main(String[] args) {
        long answer = factorial(4, "");
        System.out.println("4! = " + answer);
    }
}`,
      output: `factorial(4) starts
  factorial(3) starts
    factorial(2) starts
      factorial(1) starts
      factorial(1) returns 1
    factorial(2) returns 2 * 1 = 2
  factorial(3) returns 3 * 2 = 6
factorial(4) returns 4 * 6 = 24
4! = 24`,
      codeSummary: 'The same factorial with print lines, so you can watch the calls go down and the answers come back up.',
      codeExplanation: [
        { label: 'Line 2', code: 'static long factorial(int n, String indent) {', text: 'Returns a `long`. `indent` grows by two spaces each level, only to make the trace readable.' },
        { label: 'Line 3', code: 'System.out.println(indent + "factorial(" + n + ") starts");', text: 'Runs on the way down, once per call.' },
        { label: 'Line 4', code: 'if (n <= 1) {', text: 'Base case. `<=` also covers `factorial(0)`, which is 1 too.' },
        { label: 'Line 6', code: 'return 1;', text: 'The smallest answer. This is where the trip back up starts.' },
        { label: 'Line 8', code: 'long smaller = factorial(n - 1, indent + "  ");', text: 'The recursive call. This frame pauses here until the smaller answer comes back, then stores it in `smaller`.' },
        { label: 'Line 9', code: 'long result = n * smaller;', text: 'The small work of this call: one multiplication, with this frame\'s own `n`.' },
        { label: 'Line 11', code: 'return result;', text: 'Hands the answer to the caller, one level up.' },
        { label: 'Line 15', code: 'long answer = factorial(4, "");', text: 'The first call, with no indent. When it returns, the whole chain is done.' }
      ],
      sections: [
        {
          title: 'The short version',
          text: ['Without the trace, factorial is three lines. This is the form you write in practice.'],
          code: `public class FactorialShort {
    static long factorial(int n) {
        if (n <= 1) {
            return 1;                      // base case
        }
        return n * factorial(n - 1);       // recursive case
    }

    public static void main(String[] args) {
        for (int n = 0; n <= 5; n++) {
            System.out.println(n + "! = " + factorial(n));
        }
    }
}`,
          fileName: 'FactorialShort.java',
          output: `0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120`
        },
        {
          title: 'Down, then back up',
          text: ['The arrows on the left are calls going down. The arrows on the right are return values coming back up.'],
          mermaid: 'flowchart TD\n  F4["factorial(4)<br>4 * ?"] -->|calls| F3["factorial(3)<br>3 * ?"]\n  F3 -->|calls| F2["factorial(2)<br>2 * ?"]\n  F2 -->|calls| F1["factorial(1)<br>base case"]\n  F1 -.->|returns 1| F2\n  F2 -.->|returns 2| F3\n  F3 -.->|returns 6| F4\n  F4 -.->|returns 24| M["main"]',
          diagramNote: 'The `?` is the value each call waits for. It gets filled in on the way back up.'
        },
        {
          title: 'The frames, one row each',
          text: ['Each frame keeps its own `n` while it waits. Read the last column from bottom to top: that is the order of the returns.'],
          table: {
            head: ['Frame', '`n`', 'Computes', 'Waits for', 'Returns'],
            rows: [
              ['`factorial(4)`', '4', '`4 * factorial(3)`', '`factorial(3)`', '`4 * 6 = 24`'],
              ['`factorial(3)`', '3', '`3 * factorial(2)`', '`factorial(2)`', '`3 * 2 = 6`'],
              ['`factorial(2)`', '2', '`2 * factorial(1)`', '`factorial(1)`', '`2 * 1 = 2`'],
              ['`factorial(1)`', '1', 'base case', 'nothing', '`1`']
            ]
          }
        },
        {
          title: 'int is too small, long has a limit too',
          text: [
            'An `int` holds at most 2,147,483,647. `13!` is 6,227,020,800. With `int`, the number **overflows**: it wraps around and you get a wrong answer without any error.',
            'A `long` holds up to about 9.2 × 10¹⁸. That is enough up to `20!`. `21!` overflows a `long` too.'
          ],
          code: `public class FactorialLimits {
    static int factorialInt(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorialInt(n - 1);
    }

    static long factorialLong(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorialLong(n - 1);
    }

    public static void main(String[] args) {
        System.out.println("int  12! = " + factorialInt(12));
        System.out.println("int  13! = " + factorialInt(13) + "   (wrong!)");
        System.out.println("long 13! = " + factorialLong(13));
        System.out.println("long 20! = " + factorialLong(20));
        System.out.println("long 21! = " + factorialLong(21) + "   (wrong!)");
    }
}`,
          fileName: 'FactorialLimits.java',
          output: `int  12! = 479001600
int  13! = 1932053504   (wrong!)
long 13! = 6227020800
long 20! = 2432902008176640000
long 21! = -4249290049419214848   (wrong!)`,
          warn: 'Overflow gives no error. The answer is wrong, quietly. For bigger factorials, use `java.math.BigInteger`.'
        }
      ],
      technical: [
        'For `return n * factorial(n - 1);` the compiled bytecode first loads `n`, then calls `factorial(n - 1)`, then multiplies the two values. While the call runs, the loaded `n` waits in the frame\'s **operand stack**, a small scratch area inside each frame.',
        'The return value is handed to the caller\'s frame when the callee\'s frame is removed. That is the "coming back up".',
        '`n * factorial(n - 1)` mixes an `int` and a `long`. Java widens `n` to `long` before multiplying, so the multiplication happens in 64 bits.'
      ],
      tryIt: {
        steps: [
          'Run `Factorial.java` and read the trace.',
          'Change `factorial(4, "")` to `factorial(6, "")` and predict the last line before you run it.',
          'In `FactorialShort`, change the loop to go up to `21`.'
        ],
        see: '`6! = 720`. In the loop, `20! = 2432902008176640000` and then a negative number for `21!`: the `long` overflowed.'
      },
      check: [
        { q: 'Why does `factorial(4)` have to wait?', a: 'It needs the value of `factorial(3)` before it can multiply. Its frame waits on the stack until that value comes back.' },
        { q: 'Which call returns first?', a: '`factorial(1)`, the base case. Then 2, then 3, then 4.' },
        { q: 'Why is the return type `long`?', a: 'Factorials grow fast. `13!` is too big for `int`. `long` works up to `20!`.' }
      ],
      keyPoints: [
        'The calls go down to the base case. The answers come back up.',
        'Each waiting call keeps its own `n` and uses it when the answer arrives.',
        'Base case `n <= 1` covers both 0 and 1.',
        'Use `long`. Even `long` overflows after `20!`.'
      ],
      commonMistakes: [
        'Base case `if (n == 1)` only: `factorial(0)` calls `factorial(-1)`, `factorial(-2)` … forever. Use `n <= 1`.',
        'Returning the call without the work: `return factorial(n - 1);` always gives 1. Write `return n * factorial(n - 1);`.',
        'Using `int`: `factorialInt(13)` gives `1932053504`. Use `long`.'
      ],
      related: ['call-stack', 'sum-list', 'Types & Variables']
    },
    {
      id: 'sum-list',
      title: 'Sum of a List: First Plus the Rest',
      category: 'practice',
      icon: 'Σ',
      tagline: 'The total is the first item plus the total of the rest',
      realWorld: 'A stack of coins. The total is the top coin plus the total of the coins under it. An empty stack is worth 0.',
      kid: [
        'You have a pile of coins: 4, 2 and 7. What is the total?',
        'You take the top coin, 4, and say: "The total is 4 plus whatever the rest is worth." Then you look at the rest: 2 and 7. Same question, smaller pile.',
        'At the end there are no coins left. An empty pile is worth 0. Now you add everything back up: 7 + 0 = 7, 2 + 7 = 9, 4 + 9 = 13.'
      ],
      definition: 'The sum of a list is its **first** item plus the sum of the **rest** of the list. The base case is the empty list, whose sum is 0.',
      explain: [
        'This is recursion on **data**, not only on a number. The input gets smaller because the list gets shorter by one item each call.',
        'You know `List`, `get` and `size` from [Collections](../collections/index.html). `numbers.subList(1, numbers.size())` gives a **view** of the list from index 1 to the end: the list without its first item. A view does not copy the items. It looks at the same list through a smaller window.',
        'The base case `numbers.isEmpty()` returns `0`. Zero is the right answer for "no numbers", and adding 0 changes nothing on the way back up.',
        'The same pattern, "handle the first, recurse on the rest", works for many list tasks: the biggest item, counting items that match, checking if an item is in the list.'
      ],
      why: 'It shows how recursion walks through data. The same idea later walks through folders and trees.',
      whenUse: 'To practise "first plus the rest". For a flat list in real code, a loop is usually simpler (see the lesson on loops).',
      syntax: '`if (list.isEmpty()) { return 0; } return list.get(0) + sum(list.subList(1, list.size()));`',
      fileName: 'SumList.java',
      code: `import java.util.List;

public class SumList {
    static int sum(List<Integer> numbers) {
        if (numbers.isEmpty()) {
            System.out.println("sum([]) = 0");
            return 0;                                           // base case
        }
        int first = numbers.get(0);
        List<Integer> rest = numbers.subList(1, numbers.size()); // one item shorter
        int restSum = sum(rest);
        System.out.println("sum(" + numbers + ") = " + first + " + " + restSum);
        return first + restSum;
    }

    public static void main(String[] args) {
        System.out.println("total: " + sum(List.of(4, 2, 7)));
        System.out.println("total: " + sum(List.of()));
    }
}`,
      output: `sum([]) = 0
sum([7]) = 7 + 0
sum([2, 7]) = 2 + 7
sum([4, 2, 7]) = 4 + 9
total: 13
sum([]) = 0
total: 0`,
      codeSummary: 'Each call takes the first number and asks a smaller call for the sum of the rest. The prints happen on the way back up.',
      codeExplanation: [
        { label: 'Line 4', code: 'static int sum(List<Integer> numbers) {', text: 'Takes a list of whole numbers and returns their sum.' },
        { label: 'Line 5', code: 'if (numbers.isEmpty()) {', text: 'Base case: an empty list. There is nothing left to add.' },
        { label: 'Line 7', code: 'return 0;', text: 'The sum of no numbers is 0.' },
        { label: 'Line 9', code: 'int first = numbers.get(0);', text: 'The small work of this call: look at one item.' },
        { label: 'Line 10', code: 'List<Integer> rest = numbers.subList(1, numbers.size());', text: 'Everything after the first item. Index 1 up to (not including) `size()`.' },
        { label: 'Line 11', code: 'int restSum = sum(rest);', text: 'The recursive call on a shorter list. This frame waits here.' },
        { label: 'Line 12', code: 'System.out.println("sum(" + numbers + ") = " + first + " + " + restSum);', text: 'Runs on the way back up, so the shortest list prints first.' },
        { label: 'Line 13', code: 'return first + restSum;', text: 'Combines this call\'s item with the answer for the rest.' }
      ],
      sections: [
        {
          title: 'The list gets shorter each call',
          text: ['Each box is one call with its own list. The numbers on the dashed arrows are the sums coming back.'],
          mermaid: 'flowchart TD\n  A["sum([4, 2, 7])<br>4 + ?"] --> B["sum([2, 7])<br>2 + ?"]\n  B --> C["sum([7])<br>7 + ?"]\n  C --> D["sum([])<br>base case"]\n  D -.->|0| C\n  C -.->|7| B\n  B -.->|9| A\n  A -.->|13| M["main"]',
          diagramNote: 'Down: the list loses its first item. Up: each call adds its first item to the answer.'
        },
        {
          title: 'With an array and an index',
          text: [
            'An [array](../arrays/index.html) has no `subList`. Instead, you pass an **index**: the position where the "rest" starts. The array itself never changes. Only the index grows.',
            'The base case is `index == numbers.length`: the index has walked past the last item.'
          ],
          code: `public class SumArray {
    static int sum(int[] numbers, int index) {
        if (index == numbers.length) {
            return 0;                                  // walked past the end
        }
        return numbers[index] + sum(numbers, index + 1);
    }

    public static void main(String[] args) {
        int[] coins = {4, 2, 7};
        System.out.println(sum(coins, 0));
        System.out.println(sum(coins, 1));           // only 2 and 7
        System.out.println(sum(new int[0], 0));
    }
}`,
          fileName: 'SumArray.java',
          output: `13
9
0`,
          tip: 'The index version does not create new list views. Each call only carries one extra `int`.'
        },
        {
          title: 'The same pattern for other questions',
          text: ['"Handle the first, recurse on the rest" answers many questions. Only the base case and the combining step change.'],
          table: {
            head: ['Question', 'Base case', 'Combine'],
            rows: [
              ['Sum', 'empty → `0`', '`first + sum(rest)`'],
              ['Count the even numbers', 'empty → `0`', '`(first % 2 == 0 ? 1 : 0) + count(rest)`'],
              ['Biggest number', 'one item → that item', '`Math.max(first, max(rest))`'],
              ['Contains `x`?', 'empty → `false`', '`first == x || contains(rest, x)`']
            ]
          },
          code: `import java.util.List;

public class ListQuestions {
    static int countEven(List<Integer> numbers) {
        if (numbers.isEmpty()) {
            return 0;
        }
        int here = numbers.get(0) % 2 == 0 ? 1 : 0;
        return here + countEven(numbers.subList(1, numbers.size()));
    }

    static int max(List<Integer> numbers) {
        if (numbers.size() == 1) {
            return numbers.get(0);                 // one item: it is the biggest
        }
        return Math.max(numbers.get(0), max(numbers.subList(1, numbers.size())));
    }

    public static void main(String[] args) {
        List<Integer> numbers = List.of(4, 9, 2, 7, 6);
        System.out.println("even: " + countEven(numbers));
        System.out.println("max: " + max(numbers));
    }
}`,
          fileName: 'ListQuestions.java',
          output: `even: 3
max: 9`,
          warn: '`max` of an empty list has no answer. Its base case is one item, so calling it with `List.of()` fails with an exception. Check for an empty list before you call it.'
        }
      ],
      technical: [
        '`subList` returns a view object that points into the original list with a start and an end. Creating it is fast and does not copy the items. Each call still makes one small view object on the heap.',
        '`List.of(4, 2, 7)` makes an **unmodifiable** list. That is fine here: the method only reads it.',
        'Each call adds one frame, so a list with 100,000 items needs 100,000 frames at once. That is likely too deep for the stack. For long flat lists, use a loop.'
      ],
      tryIt: {
        steps: [
          'Run `SumList.java`.',
          'Change the list to `List.of(1, 2, 3, 4, 5)` and predict the trace before you run it.',
          'Add `static boolean contains(List<Integer> numbers, int x)` with the row from the table and print `contains(List.of(4, 2, 7), 2)`.'
        ],
        see: 'Trace lines from `sum([5]) = 5 + 0` up to `sum([1, 2, 3, 4, 5]) = 1 + 14`, `total: 15`, and `true`.'
      },
      check: [
        { q: 'What is the base case of `sum`?', a: 'The empty list. Its sum is 0.' },
        { q: 'What does `numbers.subList(1, numbers.size())` give?', a: 'The list without its first item (a view, not a copy).' },
        { q: 'In the array version, how does the input get smaller?', a: 'The array stays the same. The index grows by 1 until it equals `numbers.length`.' }
      ],
      keyPoints: [
        'Pattern: first item plus the answer for the rest.',
        'Base case for sums and counts: the empty list → 0.',
        'Lists: `subList(1, size())`. Arrays: pass an index.',
        'Long flat lists are better with a loop.'
      ],
      commonMistakes: [
        'Passing the same list again: `sum(numbers)` instead of `sum(numbers.subList(1, numbers.size()))` never ends.',
        'Off by one: `subList(0, numbers.size())` is the whole list. Start at `1`.',
        'Array base case `index == numbers.length - 1` returns before the last item is added. Use `index == numbers.length` and return 0.'
      ],
      related: ['Collections', 'Arrays', 'factorial', 'recursion-vs-loops']
    }
  ]);
})();
