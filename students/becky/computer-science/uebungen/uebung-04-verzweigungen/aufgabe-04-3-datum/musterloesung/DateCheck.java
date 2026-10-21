import java.util.Scanner;

// Aufgabe 04_3: is day.month.year a real date?
public class DateCheck {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Day: ");
        int day = scanner.nextInt();
        System.out.print("Month: ");
        int month = scanner.nextInt();
        System.out.print("Year: ");
        int year = scanner.nextInt();

        // Leap year: divisible by 4, but not by 100 — unless also by 400.
        // 2024 yes, 1900 no, 2000 yes.
        boolean leapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

        // How many days does this month have?
        int lastDay;
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                lastDay = 31;
                break;
            case 4: case 6: case 9: case 11:
                lastDay = 30;
                break;
            case 2:
                if (leapYear) {
                    lastDay = 29;
                } else {
                    lastDay = 28;
                }
                break;
            default:
                lastDay = 0;   // month 0, 13, -4 … does not exist
        }

        boolean valid = month >= 1 && month <= 12 && day >= 1 && day <= lastDay;

        if (valid) {
            System.out.println(day + "." + month + "." + year + " is a valid date.");
        } else {
            System.out.println(day + "." + month + "." + year + " is NOT a valid date.");
        }
    }
}
