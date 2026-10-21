// Aufgabe 90_1: the empty 4-gewinnt board (6 rows, 7 columns).
public class ConnectFour {
    public static void main(String[] args) {
        final int ROWS = 6;
        final int COLUMNS = 7;

        // TODO 1: make the board: a 2D array of char with ROWS rows and COLUMNS columns.
        //         Right now it is only 1 x 1 big. Change the two numbers.
        char[][] board = new char[1][1];

        // TODO 2: put '.' into EVERY hole of the board.
        //         You need a loop for the rows and, inside it, a loop for the columns.

        // TODO 3: print the board row by row, a space after every sign:
        //         . . . . . . .
        //         Hint: print() stays on the line, println() starts a new line.
        System.out.println("(the board will be here)");

        // TODO 4: print the column numbers 1 2 3 4 5 6 7 under the board.
        //         Use a loop, not one long text. Java counts from 0, people from 1.
    }
}
