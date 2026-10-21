// Aufgabe 02_3: a sum of four very different numbers, written in e-notation.
public class FloatingSum {

    public static void main(String[] args) {
        // e6 = "times 10 to the 6": move the dot 6 places right.
        // e-6 = "times 10 to the -6": move the dot 6 places left.
        double big = 2.34e6;       // 2 340 000
        double middle = 3.45;      // 3.45
        double small = 4.56e-6;    // 0.000 004 56
        double tiny = 5.67e-12;    // 0.000 000 000 005 67

        double sum = big + middle + small + tiny;
        System.out.println("Summe:               " + sum);

        // Part b) Proof that the tiny term got lost:
        // the same sum WITHOUT it prints exactly the same number.
        double sumWithoutTiny = big + middle + small;
        System.out.println("Summe ohne 5.67e-12: " + sumWithoutTiny);

        // Bonus: the same four numbers, smallest first. In exact maths the order
        // does not matter. With double it does, because every + rounds once.
        double smallestFirst = tiny + small + middle + big;
        System.out.println("Kleinste zuerst:     " + smallestFirst);

        // The exact sum, worked out by hand (a double cannot hold this many digits).
        System.out.println("Exakt (von Hand):    2340003.45000456000567");
    }
}
