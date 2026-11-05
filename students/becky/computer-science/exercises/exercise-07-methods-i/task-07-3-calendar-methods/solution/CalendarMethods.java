import java.util.Scanner;

// Task 07_3: calendar helpers and next-day main program.
public class CalendarMethods {

    static boolean isLeapYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    static int daysInMonth(int month, int year) {
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                return 31;
            case 4: case 6: case 9: case 11:
                return 30;
            case 2:
                return isLeapYear(year) ? 29 : 28;
            default:
                return 0;
        }
    }

    static boolean isValidDate(int day, int month, int year) {
        if (month < 1 || month > 12) {
            return false;
        }
        int last = daysInMonth(month, year);
        return day >= 1 && day <= last;
    }

    static String nextDay(int day, int month, int year) {
        int d = day + 1;
        int m = month;
        int y = year;
        if (d > daysInMonth(m, y)) {
            d = 1;
            m = m + 1;
            if (m > 12) {
                m = 1;
                y = y + 1;
            }
        }
        return d + "." + m + "." + y;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int day = scanner.nextInt();
        int month = scanner.nextInt();
        int year = scanner.nextInt();

        if (!isValidDate(day, month, year)) {
            System.out.println("Invalid date.");
        } else {
            System.out.println(nextDay(day, month, year));
        }
    }
}
