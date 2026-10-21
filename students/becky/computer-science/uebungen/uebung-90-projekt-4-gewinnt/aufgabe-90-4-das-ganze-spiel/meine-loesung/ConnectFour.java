import java.util.Scanner;

// Aufgabe 90_4: the whole game. Red (R) and Blue (B) take turns until someone
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

        System.out.println("4 gewinnt! Red (R) against Blue (B).");
        printBoard(board);

        // TODO 1: everything below is ONE turn. Put it in a loop that repeats
        //         while the game is not over. (for or while? How many turns are there?)

        System.out.print("Player " + player + ", choose a column (1-7): ");
        int column = readColumn(scanner);   // ready-made, see below

        // TODO 2: column smaller than 1 or bigger than 7? Say "That is not a column.
        //         Choose 1 to 7." and let the SAME player choose again.

        // TODO 3: drop the piece with dropPiece. Careful: players say 1 to 7,
        //         Java counts 0 to 6. Got -1 back? Say the column is full,
        //         the same player chooses again.

        // TODO 4: the piece landed: count it, print an empty line and the board.
        //         Then: does the player have four (hasFour)? Say who wins, game over.
        //         Otherwise: is the board full (42 pieces)? Say it is a draw, game over.

        // TODO 5: nobody won and the board is not full: the other player's turn
        //         (R becomes B, B becomes R).

        System.out.println("(you chose " + column + ", the game is not built yet)");
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

    // From Aufgabe 90_3 (finished): gives back true when piece has
    // four in a row anywhere on the board.
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

    // From Aufgabe 90_2 (finished): puts piece into the lowest free hole of column (0 to 6).
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
