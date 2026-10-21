// Aufgabe 90_2: drop a piece into a column. It falls down to the lowest free hole.
public class ConnectFour {
    // These live OUTSIDE main, so every method of the class can use them.
    static final int ROWS = 6;
    static final int COLUMNS = 7;
    static final char EMPTY = '.';

    public static void main(String[] args) {
        char[][] board = createBoard();

        // A fixed list of drops, written as the players say them (column 1 to 7).
        // Column 4 gets 7 pieces: the 7th one does not fit any more.
        int[] drops = {4, 4, 4, 4, 4, 4, 4, 1, 7, 1};

        for (int i = 0; i < drops.length; i++) {
            // Red and Blue take turns: drop 0, 2, 4 ... is R, drop 1, 3, 5 ... is B.
            char piece = 'R';
            if (i % 2 == 1) {
                piece = 'B';
            }
            int column = drops[i];
            // People count columns 1 to 7, Java counts 0 to 6: so column - 1.
            int row = dropPiece(board, column - 1, piece);
            if (row == -1) {
                System.out.println(piece + " into column " + column + ": full, -1");
            } else {
                System.out.println(piece + " into column " + column + ": lands in row " + row);
            }
        }

        System.out.println();
        printBoard(board);
    }

    // Puts piece into the lowest free hole of column (0 to 6).
    // Gives back the row it landed in, or -1 when the column is already full.
    static int dropPiece(char[][] board, int column, char piece) {
        // Start at the bottom (row 5) and walk up to the top (row 0).
        // The first empty hole we meet is the lowest free one.
        for (int row = ROWS - 1; row >= 0; row--) {
            if (board[row][column] == EMPTY) {
                board[row][column] = piece;
                return row;   // done: leave the method right here
            }
        }
        // We walked all the way up and found no empty hole.
        return -1;
    }

    // From Aufgabe 90_1: a new board, every hole empty.
    static char[][] createBoard() {
        char[][] board = new char[ROWS][COLUMNS];
        for (int row = 0; row < ROWS; row++) {
            for (int column = 0; column < COLUMNS; column++) {
                board[row][column] = EMPTY;
            }
        }
        return board;
    }

    // From Aufgabe 90_1: print the board and the column numbers 1 to 7 below it.
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
