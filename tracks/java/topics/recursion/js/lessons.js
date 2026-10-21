(function () {
  Java.addCoreTopic('recursion', {
    label: 'Recursion',
    headline: 'Recursion,',
    accent: 'dolls inside dolls.',
    intro: 'A recursive method calls itself with a smaller problem, until the problem is so small that the answer is obvious. That smallest case is the base case.',
    overview: 'Countdown and the base case → factorial → the sum of a list. How Java keeps track: the [call stack](../../../computer-science/index.html#recursion-call-stack).',
    tryIt: {
      steps: [
        'Write `static int countLetters(String text)`: if the text is empty, return 0.',
        'Otherwise return `1 + countLetters(text.substring(1))`.',
        'Print `countLetters("doll")` and `countLetters("")`.'
      ],
      see: '`4` and `0`.'
    },
    check: [
      { q: 'What is a base case?', a: 'The smallest problem, where the method answers without calling itself. It is the smallest doll.' },
      { q: 'What happens if the base case is missing?', a: 'The method calls itself forever until Java stops with `StackOverflowError`.' },
      { q: 'What is `factorial(3)`?', a: '`3 * factorial(2)` = `3 * 2 * factorial(1)` = `3 * 2 * 1` = 6.' }
    ]
  }, [
    {
      id: 'base-case',
      title: 'Countdown and the Base Case',
      category: 'concept',
      icon: '🪆',
      tagline: 'Open the doll, find a smaller one, stop at the smallest',
      realWorld: 'Russian nesting dolls. You open a doll and find a smaller doll inside. You do the same thing again. When you reach the smallest doll, which does not open, you stop.',
      definition: 'A recursive method does a little work, then calls itself with a smaller input. The base case is the input where it stops calling itself. Every call must get closer to the base case.',
      why: 'Some problems are made of smaller copies of themselves.',
      whenUse: 'When "the same job, but smaller" describes the problem.',
      fileName: 'Countdown.java',
      code: `public class Countdown {
    static void countdown(int n) {
        if (n == 0) {                 // base case: the smallest doll
            System.out.println("Liftoff!");
            return;
        }
        System.out.println(n);
        countdown(n - 1);             // the same job, one smaller
    }

    public static void main(String[] args) {
        countdown(3);
    }
}`,
      tryIt: {
        steps: ['Run the code.', 'Change `countdown(n - 1)` to `countdown(n)` and run again. Stop it with Ctrl+C if needed.'],
        see: '`3`, `2`, `1`, `Liftoff!`. With the change: many lines of 3, then `StackOverflowError`.'
      },
      keyPoints: ['Base case first.', 'Each call must be smaller than the last.'],
      commonMistakes: ['Forgetting the base case.', 'Calling with the same n again.'],
      related: ['Methods']
    },
    {
      id: 'factorial',
      title: 'Factorial',
      category: 'practice',
      icon: 'n!',
      tagline: '5! = 5 × 4 × 3 × 2 × 1',
      realWorld: 'How many ways can 3 children stand in a line? 3 choices for the first spot, then 2, then 1: 3 × 2 × 1 = 6.',
      definition: '`factorial(n)` is `n * factorial(n - 1)`. The base case is `factorial(1)`, which is 1 (and `factorial(0)` is 1 too). Each call waits for the smaller answer, then multiplies.',
      why: 'It is the classic first example: small, clear, easy to check.',
      whenUse: 'Counting arrangements; practising recursion.',
      fileName: 'Factorial.java',
      code: `public class Factorial {
    static long factorial(int n) {
        if (n <= 1) {
            return 1;                  // base case
        }
        return n * factorial(n - 1);   // smaller problem
    }

    public static void main(String[] args) {
        System.out.println(factorial(3));  // 6
        System.out.println(factorial(5));  // 120
    }
}`,
      visualLabel: 'How the calls stack up',
      visualHtml: `
          <div class="flow-diagram">
            <div class="flow-node">factorial(3)<br>= 3 × factorial(2)</div>
            <div class="flow-arrow">→</div>
            <div class="flow-node">factorial(2)<br>= 2 × factorial(1)</div>
            <div class="flow-arrow">→</div>
            <div class="flow-node">factorial(1)<br>= 1 (base case)</div>
          </div>
          <div class="diagram-note">Then the answers travel back: 1 → 2 × 1 = 2 → 3 × 2 = 6.</div>`,
      tryIt: {
        steps: ['Run the code.', 'Add a line `System.out.println("factorial(" + n + ")");` as the first line of the method. Run again.'],
        see: '`6` and `120`, and with the print you see each call: 3, 2, 1.'
      },
      keyPoints: ['Calls go down to the base case. Answers come back up.', 'Use `long`: factorials grow very fast.'],
      commonMistakes: ['Using int and getting overflow after factorial(12).'],
      related: ['Types & Variables']
    },
    {
      id: 'sum-list',
      title: 'Sum of a List',
      category: 'practice',
      icon: 'Σ',
      tagline: 'First item plus the sum of the rest',
      realWorld: 'A stack of coins. The total is the top coin plus the total of the coins under it. An empty stack is worth 0.',
      definition: 'The sum of a list is the first number plus the sum of the rest of the list. The base case is the empty list: its sum is 0. Each call looks at one item and passes on a shorter list.',
      why: 'It shows recursion on data, not only on numbers.',
      whenUse: 'Lists, folders inside folders, trees.',
      fileName: 'SumList.java',
      code: `import java.util.List;

public class SumList {
    static int sum(List<Integer> numbers) {
        if (numbers.isEmpty()) {
            return 0;                                    // base case
        }
        int first = numbers.get(0);
        List<Integer> rest = numbers.subList(1, numbers.size());
        return first + sum(rest);                        // smaller list
    }

    public static void main(String[] args) {
        System.out.println(sum(List.of(4, 2, 7)));       // 13
        System.out.println(sum(List.of()));              // 0
    }
}`,
      tryIt: {
        steps: ['Run the code.', 'Write `static int max(List<Integer> numbers)` the same way: the bigger of the first item and the max of the rest. Base case: a list with one item.'],
        see: '`13` and `0`. For `max(List.of(4, 2, 7))`: `7`.'
      },
      keyPoints: ['Base case: empty list.', 'Each call: one item plus a shorter list.', 'A loop does the same job. Recursion shines on trees and nested folders.'],
      commonMistakes: ['Passing the same list again instead of the rest.'],
      related: ['Collections']
    }
  ]);
})();
