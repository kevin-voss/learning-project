import java.util.Locale;
import java.util.Scanner;

// Task 04_2: which kind of triangle do three side lengths make?
public class Triangle {
    public static void main(String[] args) {
        // Doubles can be off by a tiny bit (0.1 + 0.2 is 0.30000000000000004).
        // So "equal" means "closer than this".
        final double TOLERANCE = 0.000001;

        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);   // so 3.5 works (a computer set to a comma language would want 3,5)
        System.out.print("Side a in cm: ");
        double a = scanner.nextDouble();
        System.out.print("Side b in cm: ");
        double b = scanner.nextDouble();
        System.out.print("Side c in cm: ");
        double c = scanner.nextDouble();

        // Any two sides together must be LONGER than the third one.
        // This also rejects 0 and negative sides.
        boolean valid = a + b > c && a + c > b && b + c > a;

        boolean equilateral = valid && a == b && b == c;
        boolean isosceles = valid && (a == b || a == c || b == c);

        // Find the longest side. The other two are the short ones.
        double longest = c;
        double short1 = a;
        double short2 = b;
        if (a >= b && a >= c) {
            longest = a;
            short1 = b;
            short2 = c;
        } else if (b >= a && b >= c) {
            longest = b;
            short1 = a;
            short2 = c;
        }

        // Pythagoras: longest² = short1² + short2²
        double difference = longest * longest - (short1 * short1 + short2 * short2);
        boolean rightAngled = valid && Math.abs(difference) < TOLERANCE;

        System.out.println("Valid:         " + valid);
        System.out.println("Equilateral:   " + equilateral);
        System.out.println("Isosceles:     " + isosceles);
        System.out.println("Right-angled:  " + rightAngled);
    }
}
