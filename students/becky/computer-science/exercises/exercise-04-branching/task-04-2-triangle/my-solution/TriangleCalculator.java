import java.util.Scanner;

public class TriangleCalculator {
    /* Gültig = zwei Seitenlängen sind zusammen größer als die dritte Seitenlänge
   Gleichseitig = Gültig + alle Seiten gleichlang
   Gleichschenklig = Gültig + zwei Seiten gleichlang
   Rechtwinklig = Gültig + (c^2 = a^2 + b^2) ist erfüllt
    */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Please enter the first side of the triangle: ");
        double side1 = scanner.nextDouble();

        System.out.println("Please enter the second side of the triangle: ");
        double side2 = scanner.nextDouble();

        System.out.println("Please enter the third side of the triangle: ");
        double side3 = scanner.nextDouble();

        // Gültigkeitscheck:
        boolean valid = (side1 + side2 > side3)
                && (side1 + side3 > side2)
                && (side2 + side3 > side1);

        // Einordnung:
        boolean rechtwinklig = false;
        boolean gleichseitig = false;
        boolean gleichschenklig = false;

        if (valid && (
                ((side1 * side1) + (side2 * side2) == (side3 * side3))
                || ((side1 * side1) + (side3 * side3) == (side2 * side2))
                || ((side2 * side2) + (side3 * side3) == (side1 * side1))
        )) {
            rechtwinklig = true;
        }

        if (valid && (side1 == side2 && side2 == side3)) {
            gleichseitig = true;
        }

        if (valid && (side1 == side2 || side1 == side3 || side2 == side3)) {
            gleichschenklig = true;
        }

        System.out.println("Dreieck: " + valid
                + "\nRechtwinklig: " + rechtwinklig
                + "\nGleichseitig: " + gleichseitig
                + "\nGleichschenklig: " + gleichschenklig);
    }
}
