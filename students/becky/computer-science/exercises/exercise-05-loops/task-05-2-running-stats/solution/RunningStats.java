import java.util.Scanner;

// Task 05_2: keep reading numbers until a negative one; print running stats.
public class RunningStats {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int count = 0;   // piggy bank: how many numbers so far
        int sum = 0;     // piggy bank: all of them added up

        System.out.print("Next number: ");
        int number = scanner.nextInt();

        // Keep going while the number is zero or positive.
        // A negative number is the "stop" signal — do not count it.
        while (number >= 0) {
            count = count + 1;
            sum = sum + number;
            double average = (double) sum / count;   // cast so 350/3 is not 116

            System.out.println("Count: " + count);
            System.out.println("Sum: " + sum);
            System.out.println("Average: " + average);

            System.out.print("Next number: ");
            number = scanner.nextInt();   // must ask again, or the loop never ends
        }
    }
}
