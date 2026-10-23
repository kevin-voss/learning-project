import java.util.LinkedHashSet;
import java.util.Scanner;
import java.util.Set;

// The twin-slip task again, but the record writes the three methods for us.
// A record is a class whose fields are its whole identity: declare the fields
// in the header and Java generates equals, hashCode and toString from them.
// A LinkedHashSet still drops the twins and keeps first-seen order.

// A record's identity is its components: equals, hashCode and toString come for free.
record Parcel(String id, int weight) {}

public class RecordShortcut {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        // The set refuses twins with the record's free equals and keeps first-seen order.
        Set<Parcel> parcels = new LinkedHashSet<>();
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            parcels.add(new Parcel(parts[0], Integer.parseInt(parts[1])));
        }

        // Build the line from the accessors: the record's own toString prints Parcel[id=..., weight=...].
        for (Parcel p : parcels) {
            System.out.println(p.id() + " " + p.weight() + "g");
        }
        System.out.println("unique: " + parcels.size());
        System.out.println("duplicates: " + (n - parcels.size()));
    }
}
