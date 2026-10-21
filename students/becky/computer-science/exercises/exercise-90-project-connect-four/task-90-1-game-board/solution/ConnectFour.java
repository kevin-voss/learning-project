// Task 90_1: the empty Connect Four board (6 rows, 7 columns).
public class ConnectFour {
    public static void main(String[] args) {
        // The classic board: 6 rows from top to bottom, 7 columns from left to right.
        // "final" because the board never changes its size.
        final int ROWS = 6;
        final int COLUMNS = 7;

        // An egg carton with 6 rows of 7 holes. Each hole holds one char.
        // First number = rows, second number = columns.
        char[][] board = new char[ROWS][COLUMNS];

        // Fill every hole with '.', the sign for "empty".
        // Outer loop: one row after the other. Inner loop: every hole in that row.
        for (int row = 0; row < ROWS; row++) {
            for (int column = 0; column < COLUMNS; column++) {
                board[row][column] = '.';
            }
        }

        // Print the board like a book: row by row, from top to bottom.
        for (int row = 0; row < ROWS; row++) {
            for (int column = 0; column < COLUMNS; column++) {
                System.out.print(board[row][column] + " ");
            }
            System.out.println();   // the row is done: start a new line
        }

        // Column numbers for the players. People count 1 to 7, Java counts 0 to 6,
        // so we print column + 1.
        for (int column = 0; column < COLUMNS; column++) {
            System.out.print((column + 1) + " ");
        }
        System.out.println();
    }
}
