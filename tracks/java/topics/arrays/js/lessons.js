(function () {
  Java.addCoreTopic('arrays', {
    label: 'Arrays',
    headline: 'Arrays,',
    accent: 'fixed-size lists.',
    intro: 'Store multiple values of one type, loop over them safely, and learn the index habits that collections build on.',
    overview: 'Arrays come before collections because they make indexes, length, and enhanced for loops concrete.',
    tryIt: {
      steps: [
        'Make `Scores.java` with `int[] scores = {7, 9, 4, 10};`.',
        'Loop over the array and add up all scores.',
        'Print the total and `scores.length`.'
      ],
      see: '`30` and `4`.'
    },
    check: [
      { q: 'What is the index of the first item in an array?', a: '0. The last index is `length - 1`.' },
      { q: 'An array has 4 items. What happens with `scores[4]`?', a: 'The program crashes with `ArrayIndexOutOfBoundsException`. Index 4 does not exist.' },
      { q: 'Can an array grow after you made it?', a: 'No. Its size is fixed. Use an `ArrayList` when you need to grow.' }
    ]
  }, [
    {
      id: 'create-index',
      anim: 'shelf',
      title: 'Create and Index',
      category: 'concept',
      icon: '[]',
      tagline: 'Positions start at zero',
      definition: 'An array stores a fixed number of values of one type. Each value is accessed by a zero-based index.',
      realWorld: 'An array is like numbered lockers, except the first locker is number 0.',
      syntax: 'int[] scores = {90, 82, 100}; creates an int array with three elements.',
      fileName: 'ArrayBasics.java',
      code: `public class ArrayBasics {
    public static void main(String[] args) {
        int[] scores = {90, 82, 100};
        scores[1] = 88;

        System.out.println(scores[0]);
        System.out.println(scores[1]);
        System.out.println(scores.length);
    }
}`,
      keyPoints: [
        'Array indexes start at 0.',
        'length is a field, not a method.',
        'Array size does not change after creation.'
      ],
      commonMistakes: [
        'Accessing scores[3] in a three-element array.',
        'Writing scores.length() like a String method.',
        'Choosing arrays when the size needs to grow often.'
      ],
      related: ['Control Flow', 'Collections']
    },
    {
      id: 'loops',
      title: 'Looping Arrays',
      category: 'practice',
      icon: 'for',
      tagline: 'Visit each element',
      definition: 'Use a counted for loop when you need indexes. Use enhanced for when you only need values.',
      realWorld: 'A counted loop checks locker numbers; enhanced for simply visits every locker in order.',
      syntax: 'for (int score : scores) reads each score without exposing the index.',
      fileName: 'ArrayLoops.java',
      code: `public class ArrayLoops {
    public static void main(String[] args) {
        String[] names = {"Ada", "Mina", "Kai"};

        for (int i = 0; i < names.length; i++) {
            System.out.println(i + ": " + names[i]);
        }

        for (String name : names) {
            System.out.println("Hello, " + name);
        }
    }
}`,
      keyPoints: [
        'Use i < array.length, not i <= array.length.',
        'Enhanced for is cleaner when no index is needed.',
        'Arrays work with primitive and reference types.'
      ],
      commonMistakes: [
        'Off-by-one loop conditions.',
        'Changing array size inside the loop; arrays cannot resize.',
        'Losing the index when you actually need it.'
      ],
      related: ['Control Flow', 'Strings & Text']
    },
    {
      id: 'two-dimensional',
      title: 'Two-Dimensional Arrays',
      category: 'habits',
      icon: 'grid',
      tagline: 'Rows and columns',
      definition: 'A two-dimensional array is an array of arrays, commonly used for grids.',
      realWorld: 'Think of a spreadsheet: row first, then column.',
      syntax: 'grid[row][col] reads one cell from a two-dimensional array.',
      fileName: 'GridDemo.java',
      code: `public class GridDemo {
    public static void main(String[] args) {
        int[][] grid = {
            {1, 2, 3},
            {4, 5, 6}
        };

        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                System.out.print(grid[row][col] + " ");
            }
            System.out.println();
        }
    }
}`,
      keyPoints: [
        'grid.length is the number of rows.',
        'grid[row].length is the number of columns in that row.',
        'Nested loops are normal for grids.'
      ],
      commonMistakes: [
        'Swapping row and column order.',
        'Assuming every row always has the same length.',
        'Using a grid when a list of objects would model the problem better.'
      ],
      related: ['Collections']
    }
  ]);
})();
