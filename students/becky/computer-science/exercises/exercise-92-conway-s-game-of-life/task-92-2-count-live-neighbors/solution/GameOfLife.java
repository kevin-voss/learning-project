// Task 92_2: read a grid, then print live neighbour count for one cell.
import java.util.Scanner;

public class GameOfLife {
    static final char ALIVE = '#';
    static final char DEAD = '.';

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int rows = in.nextInt();
        int cols = in.nextInt();
        in.nextLine();
        char[][] grid = readGrid(in, rows, cols);
        int row = in.nextInt();
        int col = in.nextInt();
        int count = countLiveNeighbors(grid, row, col);
        System.out.println("live neighbors: " + count);
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

    static int countLiveNeighbors(char[][] grid, int row, int col) {
        int live = 0;
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                if (dr == 0 && dc == 0) {
                    continue;
                }
                int r = row + dr;
                int c = col + dc;
                if (r < 0 || c < 0 || r >= grid.length || c >= grid[r].length) {
                    continue;
                }
                if (grid[r][c] == ALIVE) {
                    live++;
                }
            }
        }
        return live;
    }
}