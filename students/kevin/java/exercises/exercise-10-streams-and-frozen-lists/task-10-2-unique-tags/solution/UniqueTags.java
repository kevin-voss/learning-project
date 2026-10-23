import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

// Ideas: a stream pipeline — lowercase, distinct, sorted, toList — and a frozen result.
// Picture: tags arrive as a messy pile, ride the sorting belt into one tidy order,
// and come back sealed like a museum exhibit — look, but do not touch.

public class UniqueTags {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        List<String> raw = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            raw.add(in.nextLine().trim());
        }

        // Lowercase first: Berlin and berlin must be the same tag before distinct sees them.
        List<String> tags = raw.stream()
                .map(tag -> tag.toLowerCase(Locale.ROOT))
                // distinct drops twins; it only works because the twins are now spelled alike.
                .distinct()
                // sorted() is natural String order: a before b before x.
                .sorted()
                // toList() freezes the belt's output like a museum exhibit: no add, no set.
                .toList();

        for (String tag : tags) {
            System.out.println(tag);
        }
    }
}
