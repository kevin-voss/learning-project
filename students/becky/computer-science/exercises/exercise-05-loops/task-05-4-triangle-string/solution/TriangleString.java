import java.util.Scanner;

// Task 05_4: print a string as a shrinking triangle.
public class TriangleString {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Input: ");
        String text = scanner.next();

        // Start with the full length, then drop one letter each lap, down to 1.
        for (int n = text.length(); n >= 1; n--) {
            System.out.println(text.substring(0, n));
        }
    }
}
