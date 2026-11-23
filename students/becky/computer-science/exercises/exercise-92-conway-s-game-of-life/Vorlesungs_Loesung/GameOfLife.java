public class GameOfLife {

    /*
     * Plan (Conway's Game of Life on a boolean grid):
     * 1. Build the field: 2D array, print it, fill with random alive/dead.
     * 2. Each turn: count live neighbours, then apply rules on a copy of the board.
     *
     * Rules:
     *   Cell is alive  -> stays alive only with 2 or 3 live neighbours; else dies.
     *   Cell is dead   -> becomes alive only with exactly 3 live neighbours; else stays dead.
     * 
     * Automated New Start:
     *   notices frozen structure -> initializes new Gamefield
     */

    public static void main(String[] args) {
        // Lecture demo: fixed size 12 rows x 36 columns (true = alive).
        boolean[][] cells = new boolean[12][36];
        init(cells);

        int turns = 0;
        while (true) {
            System.out.println("Turn: " + turns++);
            nextTurn(cells);
            print(cells);
            pause(); // Short delay so you can watch the pattern change.
        }
    }

    /** Waits 250 ms between generations. */
    public static void pause() {
        try {
            Thread.sleep(250);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    /**
     * One generation: every cell looks at neighbours on the OLD board (copy),
     * then writes its new state into cells.
     */
    public static int[][] nextTurn(boolean[][] cells) {
        boolean[][] copy = copyOfCells(cells);                      // [[y, n, y, ...], [n, n, y, ...], ...]
        int[] changes = new int[12 * 36][3];    // [[row, col, changedTimes],...]

        for (int row = 0; row < cells.length; row++) {
            for (int col = 0; col < cells[row].length; col++) {
                int neighbours = countNeighbours(copy, row, col);
                countChanges();

                if (copy[row][col]) {
                    // Live cell: survive only with 2 or 3 neighbours.
                    cells[row][col] = neighbours == 2 || neighbours == 3;
                } else {
                    // Dead cell: birth only with exactly 3 neighbours.
                    cells[row][col] = neighbours == 3;
                    changes[row] = ;
                }
            }
        }

        return changes;
    }

    public static void mergeToNewTurnsAndCountChanges(int[][] oldChanges, int[][] newChanges) {
        //soll das alte Array mit neuem vergleichen und nur gleiche Elemente behalten und count hochzählen
        //Beispiel: old = [1, 2, 3],[3, 2, 1]] -> new [[1, 2], [3, 1]] -> merge [[1, 2, 4], [3, 1, 1]]
    }

   

    /**
     * Counts live neighbours around (row, col): the eight surrounding cells, not the cell itself.
     */
    public static int countNeighbours(boolean[][] cells, int row, int col) {
        int count = 0;

        // dr, dc walk the 3x3 block around the cell (-1, 0, 1 in each direction).
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                if (dr == 0 && dc == 0) {
                    continue; // Do not count the cell itself.
                }

                int targetRow = row + dr;
                int targetCol = col + dc;

                // Inside the grid and neighbour is alive -> count it.
                if (targetRow >= 0 && targetRow < cells.length
                        && targetCol >= 0 && targetCol < cells[row].length
                        && cells[targetRow][targetCol]) {
                    count++;
                }
            }
        }
        return count;
    }

    /** Deep copy so updates in nextTurn do not change neighbour counts mid-turn. */
    public static boolean[][] copyOfCells(boolean[][] cells) {
        boolean[][] copy = new boolean[cells.length][cells[0].length];

        for (int i = 0; i < cells.length; i++) {
            for (int j = 0; j < cells[i].length; j++) {
                copy[i][j] = cells[i][j];
            }
        }
        return copy;
    }

    public static void noticeFreeze(boolean[][] cells, int turn) {
        
    }


    /** Prints the grid: filled circle = alive, empty circle = dead. */
    public static void print(boolean[][] array) {
        char dead = '\u25cb';
        char alive = '\u25cf';

        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                System.out.print(array[i][j] ? alive : dead);
            }
            System.out.println();
        }
    }

    /** Fills each cell randomly (50% alive), then shows the start grid. */
    public static void init(boolean[][] cells) {
        for (int i = 0; i < cells.length; i++) {
            for (int j = 0; j < cells[i].length; j++) {
                cells[i][j] = Math.random() >= 0.5;
            }
        }
        print(cells);
    }
}