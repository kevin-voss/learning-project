import java.util.Scanner;

// Task 03_2: turn an amount in cents into euros, three different ways.
public class EuroCent {
    public static void main(String[] args) {
        final int CENTS_PER_EURO = 100;

        Scanner scanner = new Scanner(System.in);
        System.out.print("Cent: ");
        int cents = scanner.nextInt();

        // TODO 1 (part a): How many FULL euros are in the cents? And how many cents are left over?
        //         Hint: two different operators, both with CENTS_PER_EURO.
        int fullEuros = 0;
        int restCents = 0;
        System.out.println(fullEuros + " EUR " + restCents + " CENT");

        // TODO 2 (part b): The euros WITH the part after the dot (1495 -> 14.95).
        //         Careful: int / int throws the part after the dot away.
        double euros = 0.0;
        System.out.println(euros + " EUR");

        // TODO 3 (part c): Round commercially to full euros (up to .49 down, from .50 up).
        //         Not allowed: Math.round. Allowed: a cast like (int) (...).
        //         First find out what (int) does with 14.95. Then: what could you add before cutting?
        int roundedEuros = 0;
        System.out.println(roundedEuros + " EUR");
    }
}
