import java.util.Scanner;

// Aufgabe 03_1: the bill of an IT consultant (work + travel).
public class ConsultantInvoice {
    public static void main(String[] args) {
        // TODO 1: Make two constants (final, NAME IN CAPITALS) for the prices on the sheet:
        //         120 EUR per hour and 0.75 EUR per kilometre.
        //         Which type do they need: int or double?

        // ONE Scanner for the whole program (not a new one for every number).
        Scanner scanner = new Scanner(System.in);

        System.out.print("Stunden: ");
        int hours = scanner.nextInt();
        System.out.print("Kilometer: ");
        int kilometres = scanner.nextInt();

        // TODO 2: Cost of the work = hours times your hourly constant.
        double workCost = 0.0;

        // TODO 3: Cost of the travel = kilometres times your kilometre constant.
        double travelCost = 0.0;

        // TODO 4: Add both together.
        double totalCost = 0.0;

        // TODO 5: Print the three lines from the sheet's example, with the numbers glued in:
        //         Arbeitskosten: 70 Stunden zu je 120.0 EUR = 8400.0
        //         Fahrtkosten: 490 km zu je 0.75 EUR = 367.5
        //         Gesamtkosten: 8767.5 EUR
        //         Use your constants in the text too, not the typed numbers 120.0 and 0.75.
        System.out.println("Arbeitskosten: ...");
        System.out.println("Fahrtkosten: ...");
        System.out.println("Gesamtkosten: " + totalCost + " EUR");
    }
}
