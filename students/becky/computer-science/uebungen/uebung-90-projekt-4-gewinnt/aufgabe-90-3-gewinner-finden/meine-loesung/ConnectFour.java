// Aufgabe 90_3: does a player have four in a row? Across, up and down, or slanted.
public class ConnectFour {
    static final int ROWS = 6;
    static final int COLUMNS = 7;
    static final char EMPTY = '.';

    public static void main(String[] args) {
        // Every test gets a fresh, empty board. We put the pieces in by hand,
        // like setting up a puzzle. Row 0 is the top, row 5 the bottom.

        // Test 1: across, in the bottom row, columns 4 to 7 (the right edge).
        char[][] board = createBoard();
        board[5][3] = 'R';
        board[5][4] = 'R';
        board[5][5] = 'R';
        board[5][6] = 'R';
        board[4][3] = 'B';
        board[4][4] = 'B';
        board[4][5] = 'B';
        showTest("Test 1: across (bottom row, columns 4-7)", board);

        // Test 2: up and down, in column 7 (the right edge), from the bottom up.
        board = createBoard();
        board[5][6] = 'B';
        board[4][6] = 'B';
        board[3][6] = 'B';
        board[2][6] = 'B';
        board[5][5] = 'R';
        board[4][5] = 'R';
        board[3][5] = 'R';
        showTest("Test 2: up and down (column 7, bottom four)", board);

        // Test 3: slanted like /, from the bottom left corner up to the right.
        board = createBoard();
        board[5][0] = 'R';
        board[4][1] = 'R';
        board[3][2] = 'R';
        board[2][3] = 'R';
        showTest("Test 3: slanted / (from the bottom left corner)", board);

        // Test 4: slanted like \, ending in the right column.
        board = createBoard();
        board[0][3] = 'B';
        board[1][4] = 'B';
        board[2][5] = 'B';
        board[3][6] = 'B';
        showTest("Test 4: slanted \\ (from the top, column 4, down to column 7)", board);

        // Test 5: no four anywhere. Three across, three up, and four with a gap.
        // The lonely B in the top left corner catches searches that look above the board.
        board = createBoard();
        board[0][0] = 'B';
        board[5][0] = 'R';
        board[5][1] = 'R';
        board[5][2] = 'R';
        board[5][4] = 'R';
        board[5][6] = 'B';
        board[4][6] = 'B';
        board[3][6] = 'B';
        board[2][6] = 'R';
        showTest("Test 5: no four (three across, three up, a gap, a lonely B)", board);

        // Test 6: the empty board.
        board = createBoard();
        showTest("Test 6: empty board", board);
    }

    // Gives back true when piece has four in a row anywhere on the board.
    static boolean hasFour(char[][] board, char piece) {
        // TODO 1: across. Go through every row, and in each row through every column
        //         where four could START (0, 1, 2, 3: from 4 on there is no room).
        //         Are board[row][column], [column + 1], [column + 2], [column + 3]
        //         all == piece? Then return true.

        // TODO 2: up and down. Same idea, but now the four go DOWN:
        //         [row][column], [row + 1][column], [row + 2][column], [row + 3][column].
        //         In which rows can they start without falling off the board?

        // TODO 3: slanted \ . Each step goes one row down AND one column right.

        // TODO 4: slanted / . Each step goes one row UP and one column right.
        //         Careful: row - 3 must not be smaller than 0.

        // TODO 5: you looked everywhere and found nothing. What do you give back?
        return false;
    }

    // Prints one test: its name, the board, and the answer for both players.
    static void showTest(String name, char[][] board) {
        System.out.println(name);
        printBoard(board);
        System.out.println("R has four: " + hasFour(board, 'R'));
        System.out.println("B has four: " + hasFour(board, 'B'));
        System.out.println();
    }

    // From Aufgabe 90_2 (finished, not used by the tests, the game needs it in 90_4).
    static int dropPiece(char[][] board, int column, char piece) {
        for (int row = ROWS - 1; row >= 0; row--) {
            if (board[row][column] == EMPTY) {
                board[row][column] = piece;
                return row;
            }
        }
        return -1;
    }

    // From Aufgabe 90_1 (finished): a new board, every hole empty.
    static char[][] createBoard() {
        char[][] board = new char[ROWS][COLUMNS];
        for (int row = 0; row < ROWS; row++) {
            for (int column = 0; column < COLUMNS; column++) {
                board[row][column] = EMPTY;
            }
        }
        return board;
    }

    // From Aufgabe 90_1 (finished): print the board and the column numbers 1 to 7 below it.
    static void printBoard(char[][] board) {
        for (int row = 0; row < ROWS; row++) {
            for (int column = 0; column < COLUMNS; column++) {
                System.out.print(board[row][column] + " ");
            }
            System.out.println();
        }
        for (int column = 0; column < COLUMNS; column++) {
            System.out.print((column + 1) + " ");
        }
        System.out.println();
    }
}
