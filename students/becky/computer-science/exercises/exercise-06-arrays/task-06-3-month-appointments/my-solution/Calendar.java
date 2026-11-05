import java.util.Scanner;

public class Calendar {
    public static  void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String[][] calendar = new String[31][24];

        for (int day = 0; day < 31; day++) {
            for (int hour = 0; hour <= 23; hour++) {
                calendar[day][hour] = "schlafen";
            }
        }

        boolean keepGoing = true;
        do {
            System.out.println("Geben Sie den Tag Ihres nächsten Termins ein: (z.B.: 12)");
            int appointmentDate = scanner.nextInt();
            
            System.out.println("Geben Sie die Uhrzeit Ihres nächsten Termins ein: (z.B.: 20)");
            int appointmentTime = scanner.nextInt();
            scanner.nextLine();

            System.out.println("Geben Sie den Terminnamen ein: ");
            String appointmentName = scanner.nextLine();

            calendar[appointmentDate][appointmentTime] = appointmentName;

            System.out.println("Möchtest du noch weitere Termine eintragen? y/n : ");
            String answer = scanner.nextLine();
            keepGoing = answer.equalsIgnoreCase("y");

        } while (keepGoing);

        scanner.close();

        System.out.println("Ihre Termine für diesen Monat: ");
        for (int day = 0; day < 31; day++){
            System.out.println();
            System.out.println("Tag: " + day);
            for (int hour = 0; hour <= 23; hour++) {
                System.out.print(hour + ":00 Uhr " + calendar[day][hour] + "  ");
            }
        }
    }
}
