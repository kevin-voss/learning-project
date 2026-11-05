public class Gameboard {
    public static void initialiseGameboard() {
        int rows = 7;
        int columns = 4;
        String[][] gameboard = new String[rows][columns];

        //the Gameboard
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                gameboard[row][column] = "*";
            }
        }

        // The Gamboard output:
        //Column numbers on top (players count from 1, not from 0)
        System.out.print("   "); 
        for (int column = 0; column < columns; column++) {
            System.out.print((column) + " ");
        }
        System.out.println();

        // Each row: row number, then the cells in that row
        for (int row = 0; row < rows; row++) {
            System.out.print((row) + "  ");
            for (int column = 0; column < columns; column++) {
                System.out.print(gameboard[row][column] + " ");
            }
            System.out.println();
        }
    }
}
