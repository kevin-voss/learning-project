// Arrays, part 3 of 5: "Everyday Array Algorithms".
(function () {
  const terms = Java.arrayTerms;

  Java.addCoreLessons('arrays', [
    {
      id: 'array-algorithms',
      title: 'Everyday Array Algorithms',
      category: 'practice',
      icon: 'Σ',
      tagline: 'Sum, average, min, max, count, search, reverse',
      realWorld: 'After a game you look at everybody\'s points on the score sheet: you add them up, you find the best and the worst, you count who got more than 5, and you look for one name.',
      kid: [
        'You have a row of boxes with numbers. You want to know: how much is it all together? Which number is the biggest?',
        'You walk along the row with a little notebook. At every box you look at the number and change the note in your notebook: "so far it is 16 together", "so far the biggest is 9".',
        'When you reach the end of the row, the note in your notebook is the answer. Almost every job with a row of boxes works like this.'
      ],
      definition: 'An **algorithm** is a fixed recipe of steps that solves a problem. Most array algorithms follow one pattern: set up a helper variable before the loop, update it for every element, and read the answer after the loop.',
      explain: [
        'The helper variable is often called an **accumulator**: it collects (accumulates) the result while the loop runs. For a sum it starts at 0; for a count it starts at 0; for a maximum it starts with the first element.',
        '**Sum**: add each element to the accumulator. **Average** (the mean): the sum divided by the number of elements. Divide as `double`, or Java drops the decimals.',
        '**Minimum and maximum**: remember the best value seen so far. Compare each element with it, and replace it when you find a smaller (min) or bigger (max) one.',
        '**Count**: add 1 to a counter each time an element passes a test, for example `score >= 5`.',
        '**Search** (linear search): look at the elements one by one until you find the one you want. Remember its index and stop with `break`. If you reach the end without a match, the answer is "not found", usually the index `-1`.',
        '**Reverse**: swap the first and the last element, then the second and the second-to-last, and so on, until the two positions meet in the middle.'
      ],
      why: 'These few recipes solve most everyday questions about a list of values: totals, averages, records, how many, where, and in which order.',
      whenUse: 'Grade books, high scores, temperatures, prices, step counts: any time you have numbers in an array and a question about all of them.',
      syntax: '`int result = start;` before the loop, `for (int x : a) { result = update(result, x); }`, then use `result` after the loop.',
      fileName: 'ScoreStats.java',
      code: `import java.util.Arrays;

public class ScoreStats {
    public static void main(String[] args) {
        int[] scores = {7, 3, 9, 4, 10, 6};

        // Sum: add every value to a running total
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }

        // Average: the sum divided by the count, as a double
        double average = (double) sum / scores.length;

        // Min and max: start with the first element, then compare
        int min = scores[0];
        int max = scores[0];
        for (int score : scores) {
            if (score < min) {
                min = score;
            }
            if (score > max) {
                max = score;
            }
        }

        // Count: how many values pass a test
        int passed = 0;
        for (int score : scores) {
            if (score >= 5) {
                passed++;
            }
        }

        System.out.println("Scores:  " + Arrays.toString(scores));
        System.out.println("Sum:     " + sum);
        System.out.println("Average: " + average);
        System.out.println("Min:     " + min);
        System.out.println("Max:     " + max);
        System.out.println("Passed:  " + passed + " of " + scores.length);
    }
}`,
      output: `Scores:  [7, 3, 9, 4, 10, 6]
Sum:     39
Average: 6.5
Min:     3
Max:     10
Passed:  4 of 6`,
      codeSummary: 'One array, four questions: the sum, the average, the smallest and biggest score, and how many scores are 5 or more.',
      codeExplanation: [
        { label: 'Line 8', code: 'int sum = 0;', text: 'The accumulator for the sum starts at 0, because adding nothing gives 0.' },
        { label: 'Line 10', code: 'sum += score;', text: '`+=` adds the value to `sum`. After all six rounds, `sum` is 39.' },
        { label: 'Line 14', code: 'double average = (double) sum / scores.length;', text: '`(double)` turns `sum` into 39.0 before dividing, so the result is 6.5. Without it, `39 / 6` is int division and gives 6.' },
        { label: 'Line 17', code: 'int min = scores[0];', text: 'Min and max start with a real element, not with 0. The first element is "the best so far" before you have looked at the others.' },
        { label: 'Line 20', code: 'if (score < min) {', text: 'Found a smaller value than the best so far? Then it becomes the new `min`.' },
        { label: 'Line 23', code: 'if (score > max) {', text: 'Same idea for the biggest value. Both checks run for every element.' },
        { label: 'Line 29', code: 'int passed = 0;', text: 'A counter starts at 0.' },
        { label: 'Line 31', code: 'if (score >= 5) {', text: 'The test. Only scores of 5 or more add 1 to the counter: 7, 9, 10 and 6, so 4.' },
        { label: 'Line 41', code: 'System.out.println("Passed:  " + passed + " of " + scores.length);', text: '`scores.length` gives the "of 6" part without counting by hand.' }
      ],
      sections: [
        {
          title: 'Sum and average, round by round',
          text: [
            'Follow the sum loop with a pencil. A table like this is called a **trace**: one row per round, with the values of the variables after that round.'
          ],
          table: {
            head: ['Round', '`score`', '`sum` after the round'],
            rows: [['start', '-', '0'], ['1', '7', '7'], ['2', '3', '10'], ['3', '9', '19'], ['4', '4', '23'], ['5', '10', '33'], ['6', '6', '39']],
            note: 'The average is `39 / 6`. As ints this is `6` (the .5 is cut off). With `(double) sum / scores.length` it is `6.5`.'
          },
          warn: 'An empty array has length 0, and `sum / 0` with ints crashes with `ArithmeticException`. With double it gives `NaN` ("not a number"). Check `scores.length > 0` first.'
        },
        {
          title: 'Min and max: start with a real element',
          text: [
            'The max loop asks one question per element: "is this bigger than the best so far?" If yes, the best so far changes.',
            'Starting with `max = 0` looks harmless but is a bug: if every value is negative, no value is bigger than 0, and the answer stays 0, a number that is not even in the array.'
          ],
          mermaid: 'flowchart TD\n  S["max = a[0]"] --> L["next element x"]\n  L --> Q{"x > max ?"}\n  Q -->|yes| N["max = x"]\n  Q -->|no| K["keep max"]\n  N --> M{"more elements?"}\n  K --> M\n  M -->|yes| L\n  M -->|no| E["max is the answer"]',
          diagramNote: 'One question per element. Swap `>` for `<` and you have the minimum.',
          fileName: 'ColdestNight.java',
          code: `public class ColdestNight {
    public static void main(String[] args) {
        int[] nights = {-5, -2, -9, -4};

        // Wrong: starts at 0, and no night is warmer than 0
        int wrongMax = 0;
        for (int t : nights) {
            if (t > wrongMax) {
                wrongMax = t;
            }
        }

        // Right: start with the first element
        int warmest = nights[0];
        int coldest = nights[0];
        for (int t : nights) {
            if (t > warmest) {
                warmest = t;
            }
            if (t < coldest) {
                coldest = t;
            }
        }
        System.out.println("Wrong warmest: " + wrongMax);
        System.out.println("Warmest: " + warmest + ", coldest: " + coldest);
    }
}`,
          output: `Wrong warmest: 0
Warmest: -2, coldest: -9`
        },
        {
          title: 'Search: where is it?',
          text: [
            'A **linear search** checks the elements from left to right. As soon as it finds a match, it saves the index and leaves the loop with `break`. The answer starts as `-1`, a value that can never be a real index, so `-1` after the loop means "not found".',
            'You need the index here, so this is a counted loop. To compare Strings, use `equals`, not `==` (the Strings topic explains why).'
          ],
          fileName: 'FindName.java',
          code: `public class FindName {
    public static void main(String[] args) {
        String[] names = {"Ada", "Mina", "Kai", "Ben"};
        String wanted = "Kai";

        int found = -1;   // -1 means "not found yet"
        for (int i = 0; i < names.length; i++) {
            if (names[i].equals(wanted)) {
                found = i;
                break;    // stop, we have it
            }
        }

        if (found >= 0) {
            System.out.println(wanted + " is at index " + found);
        } else {
            System.out.println(wanted + " is not in the list");
        }

        // A yes/no search: does any score equal 10?
        int[] scores = {7, 3, 9};
        boolean hasTen = false;
        for (int score : scores) {
            if (score == 10) {
                hasTen = true;
            }
        }
        System.out.println("Any 10? " + hasTen);
    }
}`,
          output: `Kai is at index 2
Any 10? false`
        },
        {
          title: 'Reverse: swap from both ends',
          text: [
            'To reverse an array in place, use two indexes: `left` starts at 0, `right` at the last index. Swap the two elements, move `left` one step right and `right` one step left. Stop when they meet.',
            'A **swap** needs a third variable. If you wrote `a[left] = a[right]` first, the old value of `a[left]` would be gone. So you save it in `temp` first.'
          ],
          table: {
            head: ['Step', '`left`', '`right`', 'Array after the swap'],
            rows: [['start', '0', '4', '`[1, 2, 3, 4, 5]`'], ['1', '0', '4', '`[5, 2, 3, 4, 1]`'], ['2', '1', '3', '`[5, 4, 3, 2, 1]`'], ['stop', '2', '2', 'the middle stays where it is']]
          },
          fileName: 'ReverseArray.java',
          code: `import java.util.Arrays;

public class ReverseArray {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};

        int left = 0;
        int right = numbers.length - 1;
        while (left < right) {
            int temp = numbers[left];       // save the left value
            numbers[left] = numbers[right]; // right value goes left
            numbers[right] = temp;          // saved value goes right
            left++;
            right--;
        }
        System.out.println(Arrays.toString(numbers));
    }
}`,
          output: '[5, 4, 3, 2, 1]',
          tip: 'Swapping all the way to the end (`left < numbers.length`) swaps every pair twice, and the array ends up in its old order again. Stop in the middle.'
        },
        {
          title: 'One pattern, many jobs',
          text: ['All these algorithms have the same three parts. Once you see the pattern, you can write new ones: the product of all values, the longest name, the number of even values …'],
          table: {
            head: ['Job', 'Before the loop', 'For each element', 'After the loop'],
            rows: [
              ['sum', '`sum = 0`', '`sum += x`', '`sum`'],
              ['average', 'the sum', '-', '`(double) sum / a.length`'],
              ['max', '`max = a[0]`', '`if (x > max) max = x`', '`max`'],
              ['count', '`count = 0`', '`if (test) count++`', '`count`'],
              ['search', '`found = -1`', '`if (match) { found = i; break; }`', '`found` (-1 = not found)'],
              ['reverse', '`left = 0, right = length - 1`', 'swap, `left++`, `right--`', 'the same array, reversed']
            ]
          }
        }
      ],
      technical: [
        'Each of these algorithms looks at every element at most once. Computer scientists say they run in **linear time**, written O(n): twice as many elements take about twice as long. That is as fast as possible when you must look at every value.',
        'Linear search has to look at every element in the worst case. On a sorted array, a cleverer recipe called binary search (`Arrays.binarySearch`) halves the search area in each step and needs only about 20 steps for a million elements.',
        'The reverse swap uses no second array, so it needs only a few extra bytes of memory, whatever the size of the array. Algorithms like this are called **in place**.'
      ],
      tryIt: {
        steps: [
          'Make `Steps.java` with `int[] steps = {4200, 8100, 6500, 12000, 3000};` (steps walked per day).',
          'Compute the sum, the average as a double, and the best day (the max).',
          'Count the days with at least 6000 steps.',
          'Print all four results.'
        ],
        see: '`33800`, `6760.0`, `12000` and `3`.'
      },
      check: [
        { q: 'Why does `max` start with `a[0]` and not with `0`?', a: 'If all values are negative, a start of 0 would never be beaten, and 0 is not even in the array. `a[0]` is always a real value.' },
        { q: 'What is `(double) 7 / 2`, and what is `7 / 2`?', a: '`3.5` and `3`. Two ints divide as ints and lose the decimals.' },
        { q: 'A search loop ends and `found` is still `-1`. What does that mean?', a: 'No element matched. `-1` is never a valid index, so it is a safe "not found" signal.' }
      ],
      keyPoints: [
        'Most array algorithms: helper variable before the loop, update in the loop, answer after the loop.',
        'Sums and counts start at 0; min and max start with `a[0]`.',
        'Divide as `double` for an average.',
        'A search returns the index, or `-1` for "not found", and stops with `break`.',
        'Reverse in place by swapping from both ends until the middle.'
      ],
      commonMistakes: [
        '`int max = 0;` fails for negative values. Write `int max = a[0];`.',
        '`double avg = sum / a.length;` still divides as int. Write `(double) sum / a.length`.',
        'Swapping with `a[i] = a[j]; a[j] = a[i];` loses a value. Save it first: `int temp = a[i];`.',
        'Searching Strings with `names[i] == wanted`. Use `names[i].equals(wanted)`.'
      ],
      related: ['Looping Arrays', 'The Arrays Helper Class', 'Arrays and Methods'],
      glossary: terms
    }
  ]);
})();
