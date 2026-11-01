import java.util.Scanner;

public class MonthAppointments {
    public static void main(String[] args) {
        String[][] calendar = new String[32][24];

        for (int day = 1; day <= 31; day = day + 1) {
            for (int hour = 0; hour <= 23; hour = hour + 1) {
                if (hour >= 7 && hour <= 22) {
                    calendar[day][hour] = " ";
                } else {
                    calendar[day][hour] = "Sleeping";
                }
            }
        }

        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.print("Action (E=enter, A=show day, Q=quit): ");
            String action = scanner.next();

            if (action.equals("Q") || action.equals("q")) {
                break;
            }

            if (action.equals("E") || action.equals("e")) {
                System.out.print("Day: ");
                int day = scanner.nextInt();
                System.out.print("Hour: ");
                int hour = scanner.nextInt();
                scanner.nextLine();
                System.out.print("Appointment: ");
                String text = scanner.nextLine();

                if (day >= 1 && day <= 31 && hour >= 0 && hour <= 23) {
                    calendar[day][hour] = text;
                } else {
                    System.out.println("Invalid day or hour.");
                }
                continue;
            }

            if (action.equals("A") || action.equals("a")) {
                System.out.print("Day: ");
                int day = scanner.nextInt();

                if (day >= 1 && day <= 31) {
                    for (int hour = 0; hour <= 23; hour = hour + 1) {
                        System.out.println("Hour " + hour + ": " + calendar[day][hour]);
                    }
                } else {
                    System.out.println("Invalid day.");
                }
                continue;
            }

            System.out.println("Unknown action.");
        }
    }
}
