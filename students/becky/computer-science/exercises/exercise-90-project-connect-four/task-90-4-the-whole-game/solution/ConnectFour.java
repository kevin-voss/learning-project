import java.util.Scanner;

// Task 90_4: the whole game. Red (R) and Blue (B) take turns until someone
// has four in a row or the board is full.
public class ConnectFour {
    static final int ROWS = 6;
    static final int COLUMNS = 7;
    static final char EMPTY = '.';

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        char[][] board = createBoard();
        char player = 'R';         // Red always starts
        int piecesOnBoard = 0;     // when this reaches 6 * 7 = 42, the board is full
        boolean gameOver = false;

        System.out.println("Connect Four! Red (R) against Blue (B).");
        printBoard(board);

        // One turn per lap. We do not know how many laps the game needs,
        // so this is a while loop, not a for loop.
        while (!gameOver) {
            System.out.print("Player " + player + ", choose a column (1-7): ");
            int column = readColumn(scanner);

            if (column < 1 || column > COLUMNS) {
                // Wrong number: same player again (we just do not switch).
                System.out.println("That is not a column. Choose 1 to 7.");
            } else {
                // Players count 1 to 7, Java counts 0 to 6.
                int row = dropPiece(board, column - 1, player);
                if (row == -1) {
                    System.out.println("Column " + column + " is full. Choose another one.");
                } else {
                    piecesOnBoard++;
                    System.out.println();
                    printBoard(board);

                    // Ask "winner?" BEFORE "full?": the very last piece can win too.
                    if (hasFour(board, player)) {
                        System.out.println("Player " + player + " wins!");
                        gameOver = true;
                    } else if (piecesOnBoard == ROWS * COLUMNS) {
                        System.out.println("The board is full. Nobody wins: it is a draw.");
                        gameOver = true;
                    } else if (player == 'R') {
                        player = 'B';
                    } else {
                        player = 'R';
                    }
                }
            }
        }
    }

    // Ready-made helper: reads the next column number.
    // Typed a word instead of a number? Throw it away and give back 0 (never a column).
    // No more input at all (only happens with printf ... | java)? Stop the program.
    static int readColumn(Scanner scanner) {
        if (!scanner.hasNext()) {
            System.out.println();
            System.out.println("No more input. Game stopped.");
            System.exit(0);   // ends the whole program right here
        }
        if (scanner.hasNextInt()) {
            return scanner.nextInt();
        }
        scanner.next();   // the word that was not a number
        return 0;
    }

    // From task 90_3: gives back true when piece has four in a row
    // anywhere on the board.
    static boolean hasFour(char[][] board, char piece) {
        // Across: a row of four starts in column 0, 1, 2 or 3.
        // (From column 4 on there is no room for four any more.)
        for (int row = 0; row < ROWS; row++) {
            for (int column = 0; column <= COLUMNS - 4; column++) {
                if (board[row][column] == piece
                        && board[row][column + 1] == piece
                        && board[row][column + 2] == piece
                        && board[row][column + 3] == piece) {
                    return true;
                }
            }
        }

        // Up and down: four going down start in row 0, 1 or 2.
        for (int row = 0; row <= ROWS - 4; row++) {
            for (int column = 0; column < COLUMNS; column++) {
                if (board[row][column] == piece
                        && board[row + 1][column] == piece
                        && board[row + 2][column] == piece
                        && board[row + 3][column] == piece) {
                    return true;
                }
            }
        }

        // Slanted \ : every step goes one row down AND one column right.
        for (int row = 0; row <= ROWS - 4; row++) {
            for (int column = 0; column <= COLUMNS - 4; column++) {
                if (board[row][column] == piece
                        && board[row + 1][column + 1] == piece
                        && board[row + 2][column + 2] == piece
                        && board[row + 3][column + 3] == piece) {
                    return true;
                }
            }
        }

        // Slanted / : every step goes one row UP and one column right.
        // So we must start low enough: in row 3, 4 or 5.
        for (int row = 3; row < ROWS; row++) {
            for (int column = 0; column <= COLUMNS - 4; column++) {
                if (board[row][column] == piece
                        && board[row - 1][column + 1] == piece
                        && board[row - 2][column + 2] == piece
                        && board[row - 3][column + 3] == piece) {
                    return true;
                }
            }
        }

        // We looked everywhere and found no four.
        return false;
    }

    // From task 90_2: puts piece into the lowest free hole of column (0 to 6).
    // Gives back the row, or -1 when the column is full.
    static int dropPiece(char[][] board, int column, char piece) {
        for (int row = ROWS - 1; row >= 0; row--) {
            if (board[row][column] == EMPTY) {
                board[row][column] = piece;
                return row;
            }
        }
        return -1;
    }

    // From task 90_1: a new board, every hole empty.
    static char[][] createBoard() {
        char[][] board = new char[ROWS][COLUMNS];
        for (int row = 0; row < ROWS; row++) {
            for (int column = 0; column < COLUMNS; column++) {
                board[row][column] = EMPTY;
            }
        }
        return board;
    }

    // From task 90_1: print the board and the column numbers 1 to 7 below it.
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
