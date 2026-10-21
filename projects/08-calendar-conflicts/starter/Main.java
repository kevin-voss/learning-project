import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Scanner;

// The menu. Main reads the times. Schedule does the sorting and the reports.
public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        Schedule schedule = new Schedule();

        boolean running = true;
        while (running) {
            System.out.println("1) Add  2) List  3) Conflicts  4) Busy  5) Free  6) Quit");
            System.out.print("> ");
            String choice = input.nextLine().trim();

            switch (choice) {
                case "1" -> addAppointment(input, schedule);
                case "2" -> {
                    for (Appointment appointment : schedule.sorted()) {
                        System.out.println(appointment);
                    }
                }
                case "3" -> printLines(schedule.conflicts(), "No conflicts.");
                case "4" -> {
                    for (Appointment block : schedule.busyBlocks()) {
                        System.out.println(block.getStart() + "-" + block.getEnd());
                    }
                }
                case "5" -> printLines(schedule.freeWindows(), "No free time.");
                case "6" -> running = false;
                default -> System.out.println("Unknown choice.");
            }
        }
    }

    static void printLines(ArrayList<String> lines, String whenEmpty) {
        if (lines.isEmpty()) {
            System.out.println(whenEmpty);
        }
        for (String line : lines) {
            System.out.println(line);
        }
    }

    static void addAppointment(Scanner input, Schedule schedule) {
        System.out.print("Title: ");
        String title = input.nextLine().trim();
        System.out.print("Start (HH:MM): ");
        String startText = input.nextLine().trim();
        System.out.print("End (HH:MM): ");
        String endText = input.nextLine().trim();

        // TODO step 2: turn the two texts into LocalTime with LocalTime.parse(...).
        //   Catch DateTimeParseException and print "Not a valid time. Use HH:MM, like 09:30."
        // TODO step 3: catch IllegalArgumentException from new Appointment(...) and print e.getMessage().
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end = LocalTime.of(10, 0);
        schedule.add(new Appointment(title, start, end));
    }
}
