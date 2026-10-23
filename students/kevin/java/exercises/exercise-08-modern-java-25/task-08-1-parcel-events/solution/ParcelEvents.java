import java.util.Scanner;

// Ideas: a sealed interface, records, and a pattern-matching switch.
// Picture: a post office stamp menu — only four stamps exist, and the machine
// reads the stamp and picks the right sentence for the parcel.

// Sealed: only these four records can ever be an Event — no mystery fifth stamp.
sealed interface Event permits Created, Shipped, Delivered, Returned {}

// A record is a library card: fixed fields, equals/hashCode/toString written for you.
record Created(String id) implements Event {}
record Shipped(String id, String vehicle) implements Event {}
record Delivered(String id) implements Event {}
record Returned(String id, String reason) implements Event {}

public class ParcelEvents {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        for (int i = 0; i < n; i++) {
            Event event = parse(in.nextLine().trim());
            System.out.println(label(event));
        }
    }

    // Each line builds the record that matches its stamp kind.
    static Event parse(String line) {
        String[] parts = line.split(" ");
        return switch (parts[0]) {
            case "CREATED" -> new Created(parts[1]);
            case "SHIPPED" -> new Shipped(parts[1], parts[2]);
            case "DELIVERED" -> new Delivered(parts[1]);
            case "RETURNED" -> new Returned(parts[1], parts[2]);
            default -> throw new IllegalArgumentException("unknown: " + parts[0]);
        };
    }

    // Pattern matching unpacks each sealed shape into a clear sentence.
    // No default here: sealed guarantees the four cases are all of them.
    static String label(Event event) {
        return switch (event) {
            case Created(String id) -> "new parcel " + id;
            case Shipped(String id, String vehicle) -> id + " left on " + vehicle;
            case Delivered(String id) -> id + " arrived";
            case Returned(String id, String reason) -> id + " came back: " + reason;
        };
    }
}
