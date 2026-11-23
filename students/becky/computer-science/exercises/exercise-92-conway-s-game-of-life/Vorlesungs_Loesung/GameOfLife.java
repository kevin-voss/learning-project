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
        print(init());
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
    public static void nextTurn(int[][][] cells) {
        int[][][] copy = copyOfCells(cells);                      
        
        for (int row = 0; row < cells.length; row++) {
            for (int col = 0; col < cells[row].length; col++) {
                int neighbours = countNeighbours(copy, row, col);

                if (copy[row][col][0] == 1) {
                    // Live cell: survive only with 2 or 3 neighbours.
                    cells[row][col][0] = (neighbours == 2 || neighbours == 3) ? 1 : 0;

                    boolean newState = neighbours == 2 || neighbours == 3;
                    checkChanges(copy, newState, row, col);
                } else {
                    // Dead cell: birth only with exactly 3 neighbours.
                    cells[row][col][0] = (neighbours == 3) ? 1 : 0;

                    boolean newState =  neighbours != 3;
                    checkChanges(copy, newState, row, col);
                }
            }
        }
    }

    public static void checkChanges(int[][][] cells, boolean newState, int row, int col) {                        
        boolean oldState = true;
        
        //if Element changed increment count
        if (oldState != newState) {        
            cells[row][col][1]++;
        }
        //restart logic
        if (cells[row][col][1] >= 6) {        
            init();
        }
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
    public static int[][][] init() {
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

        int turns = 0;
        while (true) {
            System.out.println("Turn: " + turns++);
            print(cells);
            nextTurn(cells);
            pause();                // Short delay so you can watch the pattern change.
        }

        return cells;
    }
}