(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'nested-loops',
    num: '10',
    title: 'Nested Loops',
    category: 'loops',
    icon: '⊞',
    tagline: 'A loop inside a loop: rows and columns',
    realWorld: 'A clock. The minute hand goes all the way round, 60 steps, and only then the hour hand moves one step. Then the minute hand goes all the way round again.',
    kid: [
      'You plant flowers in a garden bed. The bed has 3 rows, and every row gets 4 flowers.',
      'You start in row 1 and plant flower, flower, flower, flower. Then you step to row 2 and plant four flowers again. Then row 3.',
      'Planting the four flowers is the inner loop. Walking from row to row is the outer loop. In the end you planted 3 × 4 = 12 flowers.'
    ],
    definition: 'A **nested loop** is a loop inside the body of another loop. For **each** round of the outer loop, the inner loop runs **all** its rounds, from the start. Outer loops often count rows, inner loops count columns.',
    explain: [
      'The outer loop body contains a whole inner loop. When the outer loop starts a round, the inner loop begins fresh: its init runs again, so its counter starts at the beginning again.',
      'If the outer loop runs 5 times and the inner loop runs 5 times per outer round, the inner body runs 5 × 5 = 25 times. The number of runs multiplies.',
      'Use different names for the two counters, for example `row` and `col` (column), or `i` and `j`. Reusing the same name in both headers does not compile, and similar names are easy to mix up.',
      'Printing a grid follows one pattern: the inner loop prints the items of one row with `System.out.print` (no line break), and after the inner loop the outer body calls `System.out.println()` to end the row.',
      'The inner loop can depend on the outer counter. With `col <= row`, row 1 gets 1 item, row 2 gets 2 items and so on: a triangle.'
    ],
    why: 'Many things have two dimensions: tables, game boards, pixels on a screen, seats in a cinema. And many tasks compare every item with every other item. Both need a loop in a loop.',
    whenUse: 'For grids and tables (rows and columns), for patterns, and for checking all pairs of two choices.',
    syntax: '`for (int row = 1; row <= rows; row++) { for (int col = 1; col <= cols; col++) { … } System.out.println(); }`',
    mermaid: `flowchart TD
  OI["row = 1"] --> OC{"row <= size?"}
  OC -- false --> E["print the summary"]
  OC -- true --> II["col = 1"]
  II --> IC{"col <= size?"}
  IC -- true --> B["print row * col, col++"]
  B --> IC
  IC -- false --> NL["println, row++"]
  NL --> OC`,
    visualLabel: 'Two loops, one inside the other',
    visualNote: 'The lower diamond is the inner loop. It goes round completely, col = 1 to 5, every time the upper diamond (the outer loop) goes round once. Each new row sets `col` back to 1.',
    fileName: 'TimesTable.java',
    code: `public class TimesTable {
    public static void main(String[] args) {
        int size = 5;
        int innerRuns = 0;

        for (int row = 1; row <= size; row++) {
            for (int col = 1; col <= size; col++) {
                System.out.printf("%4d", row * col);
                innerRuns++;
            }
            System.out.println(); // end of one row
        }

        System.out.println("Rows: " + size + ", inner body ran " + innerRuns + " times.");
    }
}`,
    output: `   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25
Rows: 5, inner body ran 25 times.`,
    codeSummary: 'A 5 × 5 multiplication table. The outer loop makes the rows, the inner loop fills each row with five products.',
    codeExplanation: [
      { label: 'Line 6', code: 'for (int row = 1; row <= size; row++) {', text: 'The outer loop: one round per row, 5 rounds.' },
      { label: 'Line 7', code: 'for (int col = 1; col <= size; col++) {', text: 'The inner loop: one round per column. Its init `col = 1` runs again at the start of every row.' },
      { label: 'Line 8', code: 'System.out.printf("%4d", row * col);', text: '`printf` prints with a format: `%4d` means "an int, right-aligned in 4 characters", so the columns line up. Formatting is covered with Strings.' },
      { label: 'Line 9', code: 'innerRuns++;', text: 'Counts how often the inner body runs in total.' },
      { label: 'Line 10', code: '}', text: 'End of the inner loop. When `col` reaches 6, Java leaves it and continues in the outer body.' },
      { label: 'Line 11', code: 'System.out.println(); // end of one row', text: 'Still inside the outer loop, after the inner loop: ends the line, so the next row starts on a new line.' },
      { label: 'Line 14', code: 'System.out.println("Rows: " + size + ", inner body ran " + innerRuns + " times.");', text: '5 outer rounds × 5 inner rounds = 25.' }
    ],
    sections: [
      {
        title: 'Trace: the inner loop starts over',
        text: [
          'A smaller table, size 3, traced by hand. Look at the `col` column: it goes 1, 2, 3, and then back to 1 for the next row.'
        ],
        table: {
          head: ['Step', 'row', 'col', 'prints', 'note'],
          rows: [
            ['1', '1', '1', '1', ''],
            ['2', '1', '2', '2', ''],
            ['3', '1', '3', '3', 'col becomes 4: inner loop ends, new line'],
            ['4', '2', '1', '2', 'col starts at 1 again'],
            ['5', '2', '2', '4', ''],
            ['6', '2', '3', '6', 'new line'],
            ['7', '3', '1', '3', ''],
            ['8', '3', '2', '6', ''],
            ['9', '3', '3', '9', 'row becomes 4: outer loop ends']
          ],
          note: '3 rows × 3 columns = 9 runs of the inner body.'
        }
      },
      {
        title: 'A rectangle of stars',
        text: [
          'The simplest pattern: every row has the same number of stars. Change `rows` and `cols` and the rectangle changes shape.'
        ],
        fileName: 'Rectangle.java',
        code: `public class Rectangle {
    public static void main(String[] args) {
        int rows = 3;
        int cols = 6;

        for (int row = 1; row <= rows; row++) {
            for (int col = 1; col <= cols; col++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
        output: `******
******
******`
      },
      {
        title: 'A triangle: the inner loop depends on the outer one',
        text: [
          'Replace the fixed end `cols` with `row`. Now row 1 prints 1 star, row 2 prints 2 stars, and so on.',
          'The second triangle counts down: row 1 prints `height` stars, and each row prints one less.'
        ],
        fileName: 'Triangles.java',
        code: `public class Triangles {
    public static void main(String[] args) {
        int height = 4;

        for (int row = 1; row <= height; row++) {
            for (int star = 1; star <= row; star++) {
                System.out.print("*");
            }
            System.out.println();
        }

        System.out.println("---");

        for (int row = height; row >= 1; row--) {
            for (int star = 1; star <= row; star++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
        output: `*
**
***
****
---
****
***
**
*`,
        table: {
          head: ['row', 'inner condition', 'stars in this row'],
          rows: [['1', '`star <= 1`', '1'], ['2', '`star <= 2`', '2'], ['3', '`star <= 3`', '3'], ['4', '`star <= 4`', '4']],
          note: 'In total 1 + 2 + 3 + 4 = 10 stars, not 4 × 4 = 16, because the inner loop gets longer each row.'
        }
      },
      {
        title: 'A pyramid: two inner loops per row',
        text: [
          'A centred pyramid needs spaces before the stars. So each row has two inner loops one after the other: first the spaces, then the stars. For a height of 4, row r gets `4 - r` spaces and `2 * r - 1` stars.'
        ],
        fileName: 'Pyramid.java',
        code: `public class Pyramid {
    public static void main(String[] args) {
        int height = 4;

        for (int row = 1; row <= height; row++) {
            for (int s = 1; s <= height - row; s++) {
                System.out.print(" ");
            }
            for (int star = 1; star <= 2 * row - 1; star++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
        output: `   *
  ***
 *****
*******`,
        table: {
          head: ['row', 'spaces `height - row`', 'stars `2 * row - 1`', 'line'],
          rows: [
            ['1', '3', '1', '`   *`'],
            ['2', '2', '3', '`  ***`'],
            ['3', '1', '5', '` *****`'],
            ['4', '0', '7', '`*******`']
          ]
        },
        tip: 'For any pattern, first fill a table like this one: row number, how many of each character. Then turn each column into one inner loop.'
      },
      {
        title: 'All pairs, and how fast the work grows',
        text: [
          'Nested loops also try every combination. Which pairs of two dice add up to 7? The outer loop picks the first die, the inner loop the second die, and an `if` checks the sum.',
          'The inner body runs 6 × 6 = 36 times. With 1000 × 1000 it would run a million times. Nested loops are powerful, but the work grows fast.'
        ],
        fileName: 'DicePairs.java',
        code: `public class DicePairs {
    public static void main(String[] args) {
        int checked = 0;
        int found = 0;

        for (int first = 1; first <= 6; first++) {
            for (int second = 1; second <= 6; second++) {
                checked++;
                if (first + second == 7) {
                    found++;
                    System.out.println(first + " + " + second + " = 7");
                }
            }
        }

        System.out.println(found + " of " + checked + " pairs add up to 7.");
    }
}`,
        output: `1 + 6 = 7
2 + 5 = 7
3 + 4 = 7
4 + 3 = 7
5 + 2 = 7
6 + 1 = 7
6 of 36 pairs add up to 7.`,
        table: {
          head: ['outer rounds', 'inner rounds each', 'inner body runs'],
          rows: [['3', '3', '9'], ['6', '6', '36'], ['100', '100', '10 000'], ['1 000', '1 000', '1 000 000']]
        }
      }
    ],
    technical: [
      'Each loop has its own counter variable and its own jumps in the bytecode. The inner loop is a normal loop that happens to sit inside the body of the outer one; the JVM does nothing special for nesting.',
      'The inner counter is declared in the inner header, so it is a fresh local variable in every outer round. Its scope ends with the inner loop. The outer counter is visible inside the inner loop, which is why `star <= row` works.',
      'The number of steps of nested loops grows with the product of their counts. Computer scientists write this as O(n²), "order n squared": double the size, four times the work. It is a first hint why some programs get slow with big data.'
    ],
    tryIt: {
      steps: [
        'Copy `Triangles.java` and run it.',
        'Change `height` to 6.',
        'Change the first triangle so it prints numbers instead of stars: `System.out.print(star);`.',
        'Write the table for a pyramid of height 3 on paper first, then change `Pyramid.java` and compare.'
      ],
      see: 'Rows `1`, `12`, `123` up to `123456`, and a pyramid with 1, 3 and 5 stars.'
    },
    check: [
      { q: 'The outer loop runs 4 times, the inner loop 3 times per outer round. How often does the inner body run?', a: '4 × 3 = 12 times.' },
      { q: 'Why does the inner counter start at its first value again in every row?', a: 'The inner loop header, including its init, runs again at the start of every outer round.' },
      { q: 'Where does `System.out.println()` go to end each row of a grid?', a: 'In the outer body, after the inner loop, not inside the inner loop.' }
    ],
    keyPoints: [
      'For each outer round, the inner loop runs all its rounds from the start.',
      'Total inner runs = outer rounds × inner rounds.',
      'Use clear, different names: `row` and `col`.',
      '`print` inside the inner loop, `println` after it.',
      'Let the inner end depend on the outer counter for triangles.',
      'Plan patterns with a table: row, spaces, stars.'
    ],
    commonMistakes: [
      '`System.out.println("*")` inside the inner loop puts every star on its own line. Use `print`, and `println()` after the inner loop.',
      'Updating the wrong counter: `for (int col = 1; col <= 5; row++)` never ends. Check that each header updates its own counter.',
      'Declaring the inner counter before the outer loop (`int col = 1;` once). It does not start over for the next row. Declare it in the inner header.',
      'Using the same name in both headers: `for (int i …) { for (int i …) }` does not compile. Use `i` and `j`, or `row` and `col`.'
    ],
    related: ['for Loop', 'Labelled break and continue', 'break and continue'],
    glossary: CF.glossary
  });
})();
