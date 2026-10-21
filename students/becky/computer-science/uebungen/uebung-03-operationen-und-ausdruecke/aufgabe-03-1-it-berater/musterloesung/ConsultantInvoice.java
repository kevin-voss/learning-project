import java.util.Scanner;

// Aufgabe 03_1: the bill of an IT consultant (work + travel).
public class ConsultantInvoice {
    public static void main(String[] args) {
        // The two prices from the sheet. "final" = they never change.
        // Written in CAPITALS by habit, so everyone sees: this is a constant.
        final double HOURLY_RATE = 120.0;   // EUR per full hour of work
        final double PRICE_PER_KM = 0.75;   // EUR per full kilometre

        // ONE Scanner for the whole program. It is the program's ear.
        Scanner scanner = new Scanner(System.in);

        // Only full hours and whole kilometres count, so int is the right box.
        System.out.print("Stunden: ");
        int hours = scanner.nextInt();
        System.out.print("Kilometer: ");
        int kilometres = scanner.nextInt();

        // int * double -> Java turns the int into a double first, the result is a double.
        double workCost = hours * HOURLY_RATE;
        double travelCost = kilometres * PRICE_PER_KM;
        double totalCost = workCost + travelCost;

        // One line per step, so the customer can check every number.
        System.out.println("Arbeitskosten: " + hours + " Stunden zu je " + HOURLY_RATE + " EUR = " + workCost);
        System.out.println("Fahrtkosten: " + kilometres + " km zu je " + PRICE_PER_KM + " EUR = " + travelCost);
        System.out.println("Gesamtkosten: " + totalCost + " EUR");
    }
}
