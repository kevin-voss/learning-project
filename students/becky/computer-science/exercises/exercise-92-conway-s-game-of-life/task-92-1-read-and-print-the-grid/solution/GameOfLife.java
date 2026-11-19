// Task 92_1: read a Life grid and print it with spaces between cells.
import java.util.Scanner;

public class GameOfLife {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int rows = in.nextInt();
        int cols = in.nextInt();
        in.nextLine();
        char[][] grid = readGrid(in, rows, cols);
        printGrid(grid);
    }

    static char[][] readGrid(Scanner in, int rows, int cols) {
        char[][] grid = new char[rows][cols];
        for (int row = 0; row < rows; row++) {
            String line = in.nextLine();
            for (int col = 0; col < cols; col++) {
                grid[row][col] = line.charAt(col);
            }
        }
        return grid;
    }

    static void printGrid(char[][] grid) {
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                System.out.print(grid[row][col] + " ");
            }
            System.out.println();
        }
    }
}