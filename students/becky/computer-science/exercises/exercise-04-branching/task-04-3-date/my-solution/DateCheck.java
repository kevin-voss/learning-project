import java.util.Scanner;

// Task 04_3: is day.month.year a real date?
public class DateCheck {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Day: ");
        int day = scanner.nextInt();
        System.out.print("Month: ");
        int month = scanner.nextInt();
        System.out.print("Year: ");
        int year = scanner.nextInt();

        // TODO 1: leapYear = divisible by 4 but not by 100, OR divisible by 400.
        //         "divisible by 4" in Java: year % 4 == 0
        boolean leapYear = false;

        // TODO 2: How many days does this month have? Use a switch on month.
        //         31: 1 3 5 7 8 10 12   30: 4 6 9 11   2: 28 or 29 (leapYear!)
        //         Any other month number does not exist.
        int lastDay = 0;

        // TODO 3: valid = month is 1..12 AND day is 1..lastDay
        boolean valid = false;

        // TODO 4: Print "<day>.<month>.<year> is a valid date." or "... is NOT a valid date."
        System.out.println("valid = " + valid);
    }
}
