import java.util.Scanner;

// Aufgabe 04_1: price for an order of file folders (Aktenordner).
public class FolderOrder {
    public static void main(String[] args) {
        // Numbers from the task. "final" = they never change.
        final double LIST_PRICE = 9.99;           // one folder, in EUR
        final double VAT = 0.19;                  // 19 % MwSt.
        final double SHIPPING = 99.99;            // Frachtkosten
        final double FREE_SHIPPING_ABOVE = 1000.0;

        Scanner scanner = new Scanner(System.in);
        System.out.print("How many folders? ");
        int quantity = scanner.nextInt();

        // TODO 1: Find the discount with if / else if / else.
        //         200 or more -> 0.05, 100 or more -> 0.03, 50 or more -> 0.01, else 0.0
        //         Think: which check must come FIRST?
        double discount = 0.0;

        // TODO 2: Price of all folders, minus the discount.
        double net = 0.0;

        // TODO 3: Add 19 % VAT on top of net.
        double gross = 0.0;

        // TODO 4: Add SHIPPING, but only if gross is NOT more than FREE_SHIPPING_ABOVE.
        double total = gross;

        // TODO 5: Round total to 2 places (cents). Hint: Math.round(...) and 100.
        double rounded = total;

        System.out.printf("Price: %.2f EUR%n", rounded);
    }
}
