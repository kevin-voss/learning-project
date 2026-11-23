import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

public class RandomArraySort {

    static final int LENGTH_MIN = 1;
    static final int LENGTH_MAX = 10;
    static final int VALUE_MIN = 1;
    static final int VALUE_MAX = 100;

    static int randomInt(Random random, int min, int max) {
        return random.nextInt(max - min + 1) + min;
    }

    static void printLine(int[] values) {
        System.out.print("(");
        for (int i = 0; i < values.length; i++) {
            if (i > 0) {
                System.out.print(", ");
            }
            System.out.print(values[i]);
        }
        System.out.println(")");
    }

    static int[] copyOf(int[] values) {
        return Arrays.copyOf(values, values.length);
    }

    static void sortAscending(int[] values) {
        Arrays.sort(values);
    }

    static void sortDescending(int[] values) {
        Arrays.sort(values);
        for (int left = 0, right = values.length - 1; left < right; left++, right--) {
            int swap = values[left];
            values[left] = values[right];
            values[right] = swap;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int seed = scanner.nextInt();
        Random random = new Random(seed);

        int length = randomInt(random, LENGTH_MIN, LENGTH_MAX);
        int[] values = new int[length];
        for (int i = 0; i < length; i++) {
            values[i] = randomInt(random, VALUE_MIN, VALUE_MAX);
        }

        printLine(values);

        int[] ascending = copyOf(values);
        sortAscending(ascending);
        printLine(ascending);

        int[] descending = copyOf(values);
        sortDescending(descending);
        printLine(descending);
    }
}