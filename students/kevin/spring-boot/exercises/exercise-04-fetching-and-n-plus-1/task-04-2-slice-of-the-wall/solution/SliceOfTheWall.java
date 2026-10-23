import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

// Ideas: pagination with PageRequest (a slice of the wall) and Sort.by("title") before slicing.
// Picture: a wall of postcards — page 2 shows the NEXT cards, never a repeat of page 1.
// PageRequest stands for Spring Data's PageRequest.of(page, size); page() stands for what the
// database does with LIMIT/OFFSET after ORDER BY.
public class SliceOfTheWall {

    // Which slice, how big. Pages are 0-based, like PageRequest.of in Spring Data.
    record PageRequest(int page, int size) {}

    // The wall in insertion order — the order the rows happen to sit in the table.
    static final List<String> WALL = List.of(
            "Dune", "Emma", "Persuasion", "Beloved", "Ulysses", "Dracula", "Carrie");

    // One page, always from the sorted list: that is Sort.by("title"). Without the sort
    // the slice would still work — but page 2 could repeat rows of page 1.
    static List<String> page(List<String> sorted, PageRequest req) {
        int from = req.page() * req.size();
        if (from >= sorted.size()) {
            return List.of();   // a page past the end is empty, not an error
        }
        int to = Math.min(from + req.size(), sorted.size());   // clamp: the last page may be short
        return sorted.subList(from, to);
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        List<String> sorted = new ArrayList<>(WALL);
        Collections.sort(sorted);   // ORDER BY title: the same titles on the same pages, every run

        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            PageRequest req = new PageRequest(
                    Integer.parseInt(parts[1]), Integer.parseInt(parts[2]));
            // Ceiling division with whole numbers: (7 + 3 - 1) / 3 = 3 pages for size 3.
            int totalPages = (sorted.size() + req.size() - 1) / req.size();
            System.out.println("page " + req.page() + " of " + totalPages
                    + ": " + page(sorted, req));   // a List prints itself as [a, b, c]
        }
    }
}
