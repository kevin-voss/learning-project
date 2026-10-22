import java.util.Locale;
import java.util.Scanner;

// Task 05_1: print a value table for f(x) = x² + 3x − 1.
public class ValueTable {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);   // so 0.5 works with a dot

        System.out.print("Start x: ");
        double start = scanner.nextDouble();
        System.out.print("Stop x: ");
        double stop = scanner.nextDouble();
        System.out.print("Step x: ");
        double step = scanner.nextDouble();

        // Walk from start to stop. After each lap, grow x by step.
        for (double x = start; x <= stop; x = x + step) {
            double fx = x * x + 3 * x - 1;
            // Whole numbers without ".0" so the sheet's f(0) looks right (not f(0.0)).
            if (x == (long) x) {
                System.out.println("f(" + (long) x + ") = " + fx);
            } else {
                System.out.println("f(" + x + ") = " + fx);
            }
        }
    }
}
