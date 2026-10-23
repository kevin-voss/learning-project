import java.util.Scanner;

// Ideas: enum (a fixed menu of names), enum in a switch, enum method.
// Picture: a traffic light — red, yellow or green, never blue; a parcel status is one of exactly four.

// enum = a fixed menu of names: a Status is always one of the four, a wrong word cannot exist.
enum Status {
    CREATED, IN_TRANSIT, DELIVERED, LOST;

    // The journey rules live with the status itself: a switch on this, so main never repeats them.
    boolean canGoTo(Status next) {
        return switch (this) {
            case CREATED -> next == IN_TRANSIT;
            case IN_TRANSIT -> next == DELIVERED || next == LOST;
            // Delivered and lost parcels are done: no status may follow.
            case DELIVERED, LOST -> false;
        };
    }
}

public class ParcelStatus {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        Status current = null;                    // no event yet: null, not a made-up status
        for (int i = 0; i < n; i++) {
            Status next = Status.valueOf(in.nextLine().trim());
            // Before the first event there is no current status: only CREATED may start.
            boolean legal = current == null ? next == Status.CREATED : current.canGoTo(next);
            if (legal) {
                System.out.println("ok: " + next);
                current = next;
            } else {
                // A wrong jump is only reported; the parcel keeps its status.
                System.out.println("error: " + next);
            }
        }
    }
}
