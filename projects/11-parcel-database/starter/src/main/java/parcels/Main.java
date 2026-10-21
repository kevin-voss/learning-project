package parcels;

import java.sql.SQLException;
import java.util.Scanner;

// The menu: the outside of the program. It asks and prints, and calls the service.
public class Main {

    // Where the database lives. These match the docker run command in step-by-step.md.
    static final String URL = "jdbc:postgresql://localhost:5432/parcels";
    static final String USER = "postgres";

    public static void main(String[] args) {
        // A real app never writes its password in the code. We read it from the environment,
        // and fall back to the practice password of your local Docker container.
        String password = System.getenv().getOrDefault("PARCELS_DB_PASSWORD", "learn");
        ParcelService service = new ParcelService(new ParcelRepository(URL, USER, password));
        Scanner input = new Scanner(System.in);

        boolean running = true;
        while (running) {
            System.out.println("1) List  2) Add  3) Change status  4) Delete  5) Quit");
            System.out.print("> ");
            String choice = input.nextLine().trim();

            try {
                switch (choice) {
                    case "1" -> {
                        for (Parcel parcel : service.list()) {
                            System.out.println(parcel);
                        }
                    }
                    case "2" -> {
                        System.out.print("Recipient: ");
                        String code = service.create(input.nextLine());
                        System.out.println("Created " + code);
                    }
                    case "3" -> {
                        System.out.print("Tracking code: ");
                        String code = input.nextLine().trim();
                        System.out.print("New status (CREATED, PICKED_UP, DELIVERED): ");
                        service.changeStatus(code, input.nextLine().trim());
                        System.out.println("Updated " + code);
                    }
                    case "4" -> {
                        System.out.print("Tracking code: ");
                        String code = input.nextLine().trim();
                        service.delete(code);
                        System.out.println("Deleted " + code);
                    }
                    case "5" -> running = false;
                    default -> System.out.println("Unknown choice.");
                }
            } catch (IllegalArgumentException e) {
                System.out.println(e.getMessage());
            } catch (SQLException e) {
                System.out.println("Database problem: " + e.getMessage());
                System.out.println("Is the Docker container running? Try: docker ps");
            }
        }
    }
}
