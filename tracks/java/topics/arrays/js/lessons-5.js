// Arrays, part 5 of 5: "Two-Dimensional Arrays".
(function () {
  const terms = Java.arrayTerms;

  Java.addCoreLessons('arrays', [
    {
      id: 'two-dimensional',
      title: 'Two-Dimensional Arrays',
      category: 'deeper',
      icon: 'grid',
      tagline: 'Rows and columns: a grid of boxes',
      realWorld: 'An egg box with two rows of three cups, or the seats in a cinema: you find a seat by its row and then its seat number.',
      kid: [
        'Imagine a chocolate bar with little squares: 2 rows, and 3 squares in each row.',
        'To point at one square you need two numbers: first "which row?", then "which square in that row?". Row 1, square 2 is the bottom right one (we start counting at 0 again).',
        'In Java this is a shelf of shelves: a big row, and every place in it holds a whole small row of boxes.'
      ],
      definition: 'A **two-dimensional array** (2D array) is an array whose elements are arrays. `int[][] grid` is an array of rows; `grid[row][col]` reads one cell: first the row, then the column.',
      explain: [
        'The type `int[][]` reads "array of int arrays". The outer array holds the **rows**. Each row is an ordinary `int[]` whose boxes are the **columns** of that row. A single box is often called a **cell**.',
        '`grid[1][2]` works in two steps: `grid[1]` gets row 1 (an `int[]`), and `[2]` gets the box at index 2 in that row. Both indexes start at 0.',
        '`grid.length` is the number of rows. `grid[row].length` is the number of columns in that row. In a normal rectangle every row has the same length, so `grid[0].length` is the number of columns.',
        'You create a rectangle with `new int[rows][cols]`, for example `new int[3][4]` (3 rows, 4 columns, all 0). Or you write the rows with nested braces: `{{1, 2, 3}, {4, 5, 6}}`.',
        'To visit every cell you use a **nested loop**: an outer loop over the rows and, inside it, an inner loop over the columns of the current row. `Arrays.deepToString(grid)` prints a whole grid in one line.'
      ],
      why: 'Many things are tables: game boards, seating plans, pixels in a picture, a timetable of days and lessons. A 2D array stores them in the same shape.',
      whenUse: 'When your data has rows and columns and a fixed size, like a 3 × 3 tic-tac-toe board or a 7 × 24 table of hours in a week.',
      syntax: '`type[][] name = new type[rows][cols];` or `type[][] name = {{…}, {…}};`. Read and write with `name[row][col]`. Rows: `name.length`, columns: `name[row].length`.',
      fileName: 'GridDemo.java',
      code: `import java.util.Arrays;

public class GridDemo {
    public static void main(String[] args) {
        // 2 rows and 3 columns, written row by row
        int[][] grid = {
            {1, 2, 3},
            {4, 5, 6}
        };

        System.out.println("Rows: " + grid.length);
        System.out.println("Columns in row 0: " + grid[0].length);
        System.out.println("Row 1, column 2: " + grid[1][2]);

        grid[0][1] = 20;   // change one cell

        // Nested loops: the outer loop picks a row, the inner loop walks its columns
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                System.out.print(grid[row][col] + " ");
            }
            System.out.println();
        }

        // An empty board: 3 rows, 4 columns, every cell 0
        int[][] board = new int[3][4];
        board[2][3] = 7;
        System.out.println(Arrays.deepToString(board));
    }
}`,
      output: `Rows: 2
Columns in row 0: 3
Row 1, column 2: 6
1 20 3
4 5 6
[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 7]]`,
      codeSummary: 'The program builds a 2 × 3 grid, reads its size and one cell, changes a cell, prints the grid with nested loops, and prints a new 3 × 4 board with `Arrays.deepToString`.',
      codeExplanation: [
        { label: 'Line 6', code: 'int[][] grid = {', text: 'Two pairs of brackets: an array of int arrays. Each inner `{…}` is one row.' },
        { label: 'Line 11', code: 'System.out.println("Rows: " + grid.length);', text: 'The outer array has 2 elements, the 2 rows.' },
        { label: 'Line 12', code: 'grid[0].length', text: '`grid[0]` is the first row, `{1, 2, 3}`, and its length is 3: the number of columns.' },
        { label: 'Line 13', code: 'grid[1][2]', text: 'Row 1 is `{4, 5, 6}`; index 2 in it is 6. Row first, column second.' },
        { label: 'Line 15', code: 'grid[0][1] = 20;', text: 'Writes into row 0, column 1. The 2 becomes 20.' },
        { label: 'Line 18', code: 'for (int row = 0; row < grid.length; row++) {', text: 'The outer loop runs once per row: `row` is 0, then 1.' },
        { label: 'Line 19', code: 'for (int col = 0; col < grid[row].length; col++) {', text: 'The inner loop runs fully for each row and walks the columns 0, 1, 2 of that row.' },
        { label: 'Line 22', code: 'System.out.println();', text: 'After each row the line ends, so every row of the grid is one line of output.' },
        { label: 'Line 26', code: 'int[][] board = new int[3][4];', text: '3 rows with 4 columns each. All 12 cells start at 0.' },
        { label: 'Line 28', code: 'Arrays.deepToString(board)', text: '`deepToString` prints the inner arrays too. `Arrays.toString(board)` would show only codes like `[I@…` for each row.' }
      ],
      sections: [
        {
          title: 'An array of arrays',
          text: [
            'The variable `grid` points to the outer array. That outer array has two boxes, and each box holds an arrow to one row. Each row is its own `int[]`.',
            'In a table it looks like a rectangle. The index pair `[row][col]` names each cell.'
          ],
          mermaid: 'flowchart LR\n  G["grid"] --> O\n  subgraph O["outer array, length 2"]\n    R0["index 0"]\n    R1["index 1"]\n  end\n  R0 --> A["row 0: 1, 20, 3"]\n  R1 --> B["row 1: 4, 5, 6"]',
          diagramNote: '`grid[1]` follows the arrow in box 1 to row 1. `grid[1][2]` then takes index 2 in that row: 6.',
          table: {
            head: ['', 'column 0', 'column 1', 'column 2'],
            rows: [
              ['**row 0**', '`grid[0][0]` = 1', '`grid[0][1]` = 20', '`grid[0][2]` = 3'],
              ['**row 1**', '`grid[1][0]` = 4', '`grid[1][1]` = 5', '`grid[1][2]` = 6']
            ]
          }
        },
        {
          title: 'Nested loops, step by step',
          text: [
            'In a **nested loop** the inner loop starts again from 0 for every round of the outer loop. For a grid with 2 rows and 3 columns the body runs 2 × 3 = 6 times, in this order: (0,0), (0,1), (0,2), then (1,0), (1,1), (1,2).',
            'The program below uses this to print a times table. Each cell is `row × col`, so the grid does not even need to be written by hand. `"\\t"` is a **tab**, a jump to the next column on the screen.'
          ],
          mermaid: 'flowchart TD\n  A["row = 0"] --> B{"row < rows ?"}\n  B -->|yes| C["col = 0"]\n  C --> D{"col < cols ?"}\n  D -->|yes| E["use grid[row][col]"]\n  E --> F["col++"]\n  F --> D\n  D -->|no| G["new line, row++"]\n  G --> B\n  B -->|no| H["done"]',
          diagramNote: 'The inner circle (col) runs completely before the outer circle (row) takes one step.',
          fileName: 'TimesTable.java',
          code: `public class TimesTable {
    public static void main(String[] args) {
        int[][] table = new int[4][4];

        // Fill: cell [row][col] holds (row + 1) * (col + 1)
        for (int row = 0; row < table.length; row++) {
            for (int col = 0; col < table[row].length; col++) {
                table[row][col] = (row + 1) * (col + 1);
            }
        }

        // Print row by row
        for (int[] line : table) {
            for (int value : line) {
                System.out.print(value + "\\t");
            }
            System.out.println();
        }
    }
}`,
          output: `1\t2\t3\t4
2\t4\t6\t8
3\t6\t9\t12
4\t8\t12\t16`,
          tip: 'Enhanced for works on grids too: the outer loop gives you each row as an `int[]`, the inner loop each value of that row.'
        },
        {
          title: 'Row sums and column sums',
          text: [
            'A row sum keeps `row` fixed and walks the columns. A column sum keeps `col` fixed and walks the rows: the loops swap places. The program shows points of 3 players (rows) in 4 rounds (columns).'
          ],
          fileName: 'PointsTable.java',
          code: `public class PointsTable {
    public static void main(String[] args) {
        String[] players = {"Ada", "Kai", "Mina"};
        int[][] points = {
            {3, 5, 2, 4},   // Ada
            {1, 6, 6, 2},   // Kai
            {4, 4, 3, 5}    // Mina
        };

        // Row sums: one total per player
        for (int row = 0; row < points.length; row++) {
            int total = 0;
            for (int col = 0; col < points[row].length; col++) {
                total += points[row][col];
            }
            System.out.println(players[row] + ": " + total);
        }

        // Column sums: one total per round (outer loop over columns)
        for (int col = 0; col < points[0].length; col++) {
            int total = 0;
            for (int row = 0; row < points.length; row++) {
                total += points[row][col];
            }
            System.out.println("Round " + (col + 1) + ": " + total);
        }
    }
}`,
          output: `Ada: 14
Kai: 15
Mina: 16
Round 1: 8
Round 2: 15
Round 3: 11
Round 4: 11`,
          warn: '`int total = 0;` sits inside the outer loop on purpose: every row (or column) starts its own total at 0.'
        },
        {
          title: 'Edge cases: jagged rows and shallow copies',
          text: [
            'Because each row is its own array, rows can have different lengths. Such a grid is a **jagged array**. You create the outer array first, `new int[3][]`, and each row later. Always use `grid[row].length` for the inner loop, never a fixed number.',
            'Copying a 2D array with `clone()` is a **shallow copy**: you get a new outer array, but its boxes hold the same arrows to the same rows. Change a cell in the "copy" and the original changes too. For a real copy, clone every row.'
          ],
          fileName: 'JaggedAndCopy.java',
          code: `import java.util.Arrays;

public class JaggedAndCopy {
    public static void main(String[] args) {
        // Jagged: row i has i + 1 boxes
        int[][] triangle = new int[3][];
        for (int i = 0; i < triangle.length; i++) {
            triangle[i] = new int[i + 1];
            Arrays.fill(triangle[i], i + 1);
        }
        System.out.println(Arrays.deepToString(triangle));

        // Shallow copy: the rows are shared
        int[][] grid = {{1, 2}, {3, 4}};
        int[][] shallow = grid.clone();
        shallow[0][0] = 99;
        System.out.println("grid after shallow change: " + Arrays.deepToString(grid));

        // Deep copy: clone every row
        int[][] deep = new int[grid.length][];
        for (int i = 0; i < grid.length; i++) {
            deep[i] = grid[i].clone();
        }
        deep[1][1] = 0;
        System.out.println("grid after deep change:    " + Arrays.deepToString(grid));
        System.out.println("deep:                      " + Arrays.deepToString(deep));
    }
}`,
          output: `[[1], [2, 2], [3, 3, 3]]
grid after shallow change: [[99, 2], [3, 4]]
grid after deep change:    [[99, 2], [3, 4]]
deep:                      [[99, 2], [3, 0]]`
        }
      ],
      technical: [
        'Java has no real "rectangle" type. `int[][]` is an array of references to `int[]` objects. `new int[3][4]` creates 4 objects on the heap: one outer array with 3 references and 3 row arrays with 4 ints each.',
        '`grid[r][c]` is two array accesses in a row, each with its own bounds check: first `r` against `grid.length`, then `c` against `grid[r].length`. Either one can throw `ArrayIndexOutOfBoundsException`.',
        'The ints of one row sit next to each other in memory, but different rows can be anywhere on the heap. Looping row by row (outer loop over rows, inner over columns) reads memory in order, which the processor cache likes; it is usually faster than looping column by column over a big grid.',
        '`Arrays.deepToString` looks at each element: if it is an array itself, it goes one level deeper. That is why it works for 2D, 3D and jagged arrays.'
      ],
      tryIt: {
        steps: [
          'Make `TicTacToe.java` with `char[][] board = new char[3][3];` and fill every cell with `\'.\'` using a nested loop.',
          'Set `board[0][0] = \'X\';`, `board[1][1] = \'O\';` and `board[2][2] = \'X\';`.',
          'Print the board with a nested loop, one row per line, without spaces.'
        ],
        see: 'Three lines: `X..`, `.O.` and `..X`.'
      },
      check: [
        { q: 'For `int[][] g = new int[4][6];` what are `g.length` and `g[0].length`?', a: '`4` rows and `6` columns.' },
        { q: 'In `g[2][5]`, which number is the row?', a: 'The first one, `2`. Row first, then column.' },
        { q: 'Why does changing a cell of `grid.clone()` change `grid` too?', a: '`clone()` copies only the outer array. Both outer arrays point to the same row arrays (a shallow copy). Clone each row for a deep copy.' }
      ],
      keyPoints: [
        'A 2D array is an array of rows; each row is a normal array.',
        '`grid[row][col]`: row first, column second, both from 0.',
        '`grid.length` = rows, `grid[row].length` = columns of that row.',
        'Nested loops visit every cell; the inner loop restarts for each row.',
        'Print grids with `Arrays.deepToString`; `clone()` on a grid is shallow.'
      ],
      commonMistakes: [
        'Writing `grid[col][row]`. The row index always comes first: `grid[row][col]`.',
        'Using `grid.length` as the inner limit: `col < grid.length` only works for squares. Write `col < grid[row].length`.',
        '`Arrays.toString(grid)` prints `[[I@…, [I@…]`. Use `Arrays.deepToString(grid)`.',
        '`int[][] copy = grid.clone();` as a full copy. Clone each row: `copy[i] = grid[i].clone();`.'
      ],
      related: ['Looping Arrays', 'Arrays Are References', 'Collections'],
      glossary: terms
    }
  ]);
})();
