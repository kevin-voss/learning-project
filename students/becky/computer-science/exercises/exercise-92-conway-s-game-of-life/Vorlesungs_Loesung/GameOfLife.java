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
        init();
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
    public static boolean nextTurn(int[][][] cells) {
        // int[][][] copy = copyOfCells(cells);                   
        
        for (int row = 0; row < cells.length; row++) {
            for (int col = 0; col < cells[row].length; col++) {
                int neighbours = countNeighbours(cells, row, col);

                //System.out.println("Alive value: " + cells[row][col][0]);

                if (cells[row][col][0] == 1) {
                    if (neighbours != 2 && neighbours != 3) {
                        System.out.println("SET CELL DEAD. ROW: " + row + ", COL: " + col);
                        cells[row][col][0] = 0;
                        return isRestartConditionMatched(cells, row, col);
                    }
                } else {
                    if (neighbours == 3) {
                        System.out.println("SET CELL ALIVE. ROW: " + row + ", COL: " + col);
                        cells[row][col][0] = 1;
                        return isRestartConditionMatched(cells, row, col);
                    }
                }
            }
        }

        return false;
    }

    public static boolean isRestartConditionMatched(int[][][] cells, int row, int col) {   
        // return true when a cell changed 6 times or more.
        // so we can reset the game.
        if (cells[row][col][1] >= 6) {
            System.out.println("RESTART CONDITION MATCHED!");
        }
        return cells[row][col][1] >= 6;                     
    }



    /**
     * Counts live neighbours around (row, col): the eight surrounding cells, not the cell itself.
     */
    public static int countNeighbours(int[][][] cells, int row, int col) {
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
                    && cells[targetRow][targetCol][0] == 1) {
                    count++;
                }
            }
        }
        return count;
    }

    /** Deep copy so updates in nextTurn do not change neighbour counts mid-turn. */
    public static int[][][] copyOfCells(int[][][] cells) {
        int[][][] copy = new int[cells.length][cells[0].length][2];

        for (int i = 0; i < cells.length; i++) {
            for (int j = 0; j < cells[i].length; j++) {
                copy[i][j][0] = cells[i][j][0];
            }
        }
        return copy;
    }

    /** Prints the grid: filled circle = alive, empty circle = dead. */
    public static void print(int[][][] array) {
        char dead = '\u25cb';
        char alive = '\u25cf';

        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                if (array[i][j][0] == 1) {
                    System.out.print(alive);
                } else {      
                    System.out.print(dead);
                }
            }
            System.out.println();
        }
    }

    /** Fills each cell randomly (50% alive), then shows the start grid. */
    public static void init() {
        // Lecture demo: fixed size 12 rows x 36 columns (1 = alive).
        int[][][] cells = new int[12][36][2];

        for (int i = 0; i < cells.length; i++) {
            for (int j = 0; j < cells[i].length; j++) {
                double random = Math.random();
                
                if (random >= 0.5) {
                    cells[i][j][0] = 1;
                } else {
                    cells[i][j][0] = 0;
                }
            }
        }

        print(cells);

        boolean isRunning = false;
        int turns = 0;
        while (!isRunning) {
            System.out.println("Turn: " + turns++);
            isRunning = nextTurn(cells);
            print(cells);
            pause();                // Short delay so you can watch the pattern change.
        }
    }
}