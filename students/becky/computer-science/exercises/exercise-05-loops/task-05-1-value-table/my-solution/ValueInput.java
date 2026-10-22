import java.util.Scanner;

public class ValueInput {
    public static int[] getRangeValues() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Please enter start and stop value for \"x\" for the function f(x) = x² + 3x - 1.");
        
        // get min value from user input!
        System.out.print("start = ");
        int minValue = scanner.nextInt();

        // get max value from user input!
        System.out.print("stop = ");
        int maxValue = scanner.nextInt();

        // first position = min, second position = max!
        int[] minMaxValues = { minValue, maxValue };
        
        return minMaxValues;
    }
}