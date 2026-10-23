import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// Ideas: sequenced collections — getFirst, getLast, reversed.
// Picture: a queue at a bakery — the line has a front and a back, you greet both
// by name, and you can walk the queue backwards without counting places.

public class FirstAndLast {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        List<String> stops = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            stops.add(in.nextLine().trim());
        }

        // Java 21+: every List is a SequencedCollection. No index math needed.
        System.out.println("first: " + stops.getFirst());
        System.out.println("last: " + stops.getLast());
        // reversed() is a view: the original list keeps its order.
        System.out.println("reversed: " + String.join(" ", stops.reversed()));
    }
}
