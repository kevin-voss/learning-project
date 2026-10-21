import java.util.Scanner;

// Aufgabe 03_2: turn an amount in cents into euros, three different ways.
public class EuroCent {
    public static void main(String[] args) {
        final int CENTS_PER_EURO = 100;

        Scanner scanner = new Scanner(System.in);
        System.out.print("Cent: ");
        int cents = scanner.nextInt();

        // a) int / int = int: Java throws away everything after the dot.
        //    1495 / 100 = 14 (full euros), 1495 % 100 = 95 (the leftover cents).
        int fullEuros = cents / CENTS_PER_EURO;
        int restCents = cents % CENTS_PER_EURO;
        System.out.println(fullEuros + " EUR " + restCents + " CENT");

        // b) One side must be a double to keep the part after the dot.
        //    (double) turns the int into a double BEFORE the division happens.
        double euros = (double) cents / CENTS_PER_EURO;
        System.out.println(euros + " EUR");

        // c) Commercial rounding with a cast, no Math.round:
        //    (int) simply cuts off everything after the dot (14.99 -> 14).
        //    Adding 0.5 first pushes everything from .50 on over the next whole number:
        //    14.95 + 0.5 = 15.45 -> 15      14.49 + 0.5 = 14.99 -> 14
        int roundedEuros = (int) (euros + 0.5);
        System.out.println(roundedEuros + " EUR");
    }
}
