import java.util.Locale;
import java.util.Scanner;

// Task 04_1: price for an order of file folders.
public class FolderOrder {
    public static void main(String[] args) {
        // Numbers from the task. "final" = they never change.
        final double LIST_PRICE = 9.99;           // one folder, in EUR
        final double VAT = 0.19;                  // 19 % VAT
        final double SHIPPING = 99.99;            // shipping costs
        final double FREE_SHIPPING_ABOVE = 1000.0;

        Scanner scanner = new Scanner(System.in);
        System.out.print("How many folders? ");
        int quantity = scanner.nextInt();

        // Nobody can order 0 or -5 folders.
        if (quantity < 1) {
            System.out.println("Please order at least 1 folder.");
            return;
        }

        // Biggest discount first! Otherwise 250 folders would stop at ">= 50".
        double discount;
        if (quantity >= 200) {
            discount = 0.05;
        } else if (quantity >= 100) {
            discount = 0.03;
        } else if (quantity >= 50) {
            discount = 0.01;
        } else {
            discount = 0.0;
        }

        double net = quantity * LIST_PRICE * (1 - discount);   // after discount
        double gross = net * (1 + VAT);                         // plus 19 % VAT

        // Shipping is free only when the order is worth MORE than 1000 EUR.
        double total = gross;
        if (gross <= FREE_SHIPPING_ABOVE) {
            total = gross + SHIPPING;
        }

        // Round to cents: 1041.52752 -> 104152.752 -> 104153 -> 1041.53
        double rounded = Math.round(total * 100) / 100.0;

        System.out.printf(Locale.US, "Price: %.2f EUR%n", rounded);   // Locale.US: always a dot, never a comma
    }
}
