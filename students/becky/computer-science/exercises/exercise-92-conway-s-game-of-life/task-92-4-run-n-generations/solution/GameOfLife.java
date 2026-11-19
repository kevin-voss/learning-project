// Task 92_4: run Conway's rules for N generations, print the final grid.
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
        int generations = in.nextInt();
        for (int step = 0; step < generations; step++) {
            grid = nextGeneration(grid);
        }
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

    static char[][] nextGeneration(char[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        char[][] next = new char[rows][cols];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                int neighbors = countLiveNeighbors(grid, row, col);
                if (grid[row][col] == ALIVE) {
                    next[row][col] = (neighbors == 2 || neighbors == 3) ? ALIVE : DEAD;
                } else {
                    next[row][col] = (neighbors == 3) ? ALIVE : DEAD;
                }
            }
        }
        return next;
    }
}