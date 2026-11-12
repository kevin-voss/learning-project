import java.util.Locale;
import java.util.Scanner;

// Task 08_3: triangle angles via law of cosines.
public class TriangleAngles {

    static double roundCommercial(double value, int decimalPlaces) {
        double factor = Math.pow(10, decimalPlaces);
        return Math.round(value * factor) / factor;
    }

    static double angleOpposite(double side, double side1, double side2) {
        double cos = (side1 * side1 + side2 * side2 - side * side) / (2 * side1 * side2);
        return Math.toDegrees(Math.acos(cos));
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);

        System.out.print("Side a: ");
        double a = scanner.nextDouble();
        System.out.print("Side b: ");
        double b = scanner.nextDouble();
        System.out.print("Side c: ");
        double c = scanner.nextDouble();

        double alpha = roundCommercial(angleOpposite(a, b, c), 3);
        double beta = roundCommercial(angleOpposite(b, a, c), 3);
        double gamma = roundCommercial(angleOpposite(c, a, b), 3);

        System.out.println(String.format(Locale.US, "alpha: %.3f", alpha));
        System.out.println(String.format(Locale.US, "beta: %.3f", beta));
        System.out.println(String.format(Locale.US, "gamma: %.3f", gamma));
    }
}
