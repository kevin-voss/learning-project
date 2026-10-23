import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Scanner;
import java.util.Set;

// Twin parcel slips collapse into one. Shows equals as "do the two slips say the
// same thing?" (two printed copies of one library card), hashCode as the sorting
// shelf number, toString for printing, and a LinkedHashSet that drops the twins.
class Parcel {
    final String id;
    final int weight;

    Parcel(String id, int weight) {
        this.id = id;
        this.weight = weight;
    }

    // Same parcel = same id and same weight. The parameter is Object: anything may be compared.
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Parcel other)) return false;
        return weight == other.weight && id.equals(other.id);
    }

    // Equal parcels must share a hash, so hash exactly the fields equals compares.
    @Override
    public int hashCode() {
        return Objects.hash(id, weight);
    }

    // toString decides what println prints: here the slip line, like "p1 500g".
    @Override
    public String toString() {
        return id + " " + weight + "g";
    }
}

public class TwinParcels {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        // LinkedHashSet drops twins (via equals/hashCode) and keeps first-seen order.
        Set<Parcel> parcels = new LinkedHashSet<>();
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            parcels.add(new Parcel(parts[0], Integer.parseInt(parts[1])));
        }

        for (Parcel p : parcels) {
            System.out.println(p);
        }
        System.out.println("unique: " + parcels.size());
        System.out.println("duplicates: " + (n - parcels.size()));
    }
}
