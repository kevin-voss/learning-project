// Aufgabe 02_2: the smallest and the biggest number a long can hold, written as literals.
public class LongLimits {

    public static void main(String[] args) {
        // TODO 1: Find the smallest long (JDK docs, jshell: Long.MIN_VALUE, or the lecture).
        //         Write it here as a LITERAL: the digits themselves.
        //         Tip: underscores make long numbers readable: 1_000_000
        long smallest = 0L;

        // TODO 2: The same for the biggest long.
        //         Without the L at the end, Java thinks it is an int and complains. Try it!
        long biggest = 0L;

        System.out.println("Minimum: " + smallest);
        System.out.println("Maximum: " + biggest);

        // TODO 3 (optional): Print Long.MIN_VALUE and Long.MAX_VALUE too
        //         and compare them with your literals, digit by digit.
    }
}
