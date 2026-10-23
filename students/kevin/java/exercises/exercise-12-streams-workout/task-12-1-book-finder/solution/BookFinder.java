import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

// Ideas: a record as the element on the belt, filter + map + toList,
// distinct + sorted + joining. Picture: a library shelf of rated books —
// the belt picks the good books, then lists every writer once, A to Z.

public class BookFinder {

    // A record glues one book's three facts into a small frozen box: the belt carries whole books.
    record Book(String title, String author, double rating) {}

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        List<Book> shelf = readShelf(in);
        double minRating = Double.parseDouble(in.nextLine().trim());

        // filter keeps the books that reach the bar (>= counts: a 4.1 book passes a 4.1 bar),
        // map builds each printed line, toList freezes the result: count and lines from one pass.
        List<String> foundLines = shelf.stream()
                .filter(book -> book.rating() >= minRating)
                .map(book -> book.title() + " (" + book.rating() + ")")
                .toList();
        System.out.println("found: " + foundLines.size());
        foundLines.forEach(System.out::println);

        // The authors line asks ALL books: distinct drops repeated writers, sorted orders A to Z,
        // joining glues the names into one line, so the whole answer stays a single println.
        String authors = shelf.stream()
                .map(Book::author)
                .distinct()
                .sorted()
                .collect(Collectors.joining(", "));
        // An empty shelf joins to ""; "(none)" says that in words.
        System.out.println("authors: " + (authors.isEmpty() ? "(none)" : authors));
    }

    // Read the shelf: one line per book, three facts separated by spaces.
    static List<Book> readShelf(Scanner in) {
        int n = Integer.parseInt(in.nextLine().trim());
        List<Book> shelf = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            shelf.add(new Book(parts[0], parts[1], Double.parseDouble(parts[2])));
        }
        return shelf;
    }
}
