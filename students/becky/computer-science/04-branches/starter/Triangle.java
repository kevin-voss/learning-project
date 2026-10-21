import java.util.Locale;
import java.util.Scanner;

// Aufgabe 04_2: which kind of triangle do three side lengths make?
public class Triangle {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);   // so 3.5 works (a German computer would want 3,5)
        System.out.print("Side a in cm: ");
        double a = scanner.nextDouble();
        System.out.print("Side b in cm: ");
        double b = scanner.nextDouble();
        System.out.print("Side c in cm: ");
        double c = scanner.nextDouble();

        // TODO 1: valid = any two sides together are LONGER than the third one.
        //         Three checks, glued together with &&.
        boolean valid = false;

        // TODO 2: equilateral = valid AND all three sides are the same.
        boolean equilateral = false;

        // TODO 3: isosceles = valid AND (a == b OR a == c OR b == c).
        boolean isosceles = false;

        // TODO 4: right-angled = valid AND longest² == short1² + short2²
        //         Step A: find out which side is the longest (if / else if).
        //         Step B: compare. Careful: doubles are sometimes off by a tiny bit,
        //                 see README "Doubles can tell tiny fibs".
        boolean rightAngled = false;

        System.out.println("Valid:         " + valid);
        System.out.println("Equilateral:   " + equilateral);
        System.out.println("Isosceles:     " + isosceles);
        System.out.println("Right-angled:  " + rightAngled);
    }
}
