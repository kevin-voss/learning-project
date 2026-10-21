// Aufgabe 02_2: the smallest and the biggest number a long can hold, written as literals.
public class LongLimits {

    public static void main(String[] args) {
        // A long has 64 bits: from -2^63 to 2^63 - 1.
        // The L says "this literal is a long". Without it, Java reads an int
        // and stops with "Ganzzahl zu groß" (integer number too large).
        // The underscores are only for our eyes, Java ignores them.
        long smallest = -9_223_372_036_854_775_808L;
        long biggest = 9_223_372_036_854_775_807L;

        System.out.println("Minimum: " + smallest);
        System.out.println("Maximum: " + biggest);

        // Optional: Java knows the same numbers as ready-made constants.
        System.out.println("Long.MIN_VALUE: " + Long.MIN_VALUE);
        System.out.println("Long.MAX_VALUE: " + Long.MAX_VALUE);

        // Teaser: one more than the biggest does not fit. It "wraps around"
        // like a car's mileage counter and lands on the smallest number.
        // The brackets make Java calculate first and glue the text after.
        System.out.println("Maximum + 1: " + (biggest + 1));
    }
}
