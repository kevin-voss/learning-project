import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;
import java.util.stream.Collectors;

// Ideas: groupingBy with a summary collector, a Comparator chain for the league order,
// max(Comparator) returning an Optional. Picture: the library's league wall —
// one row per author with their average score, and a trophy line for the best book.

public class AuthorLeague {

    // A record glues one book's three facts into a small frozen box: the belt carries whole books.
    record Book(String title, String author, double rating) {}

    // One league row: name, average and count together, so the sort reads like the wall.
    record AuthorRow(String author, double average, long books) {}

    public static void main(String[] args) {
        List<Book> shelf = readShelf(new Scanner(System.in));
        printLeague(shelf);
        printBest(shelf);
    }

    static void printLeague(List<Book> shelf) {
        // groupingBy sorts every book into the box of its author;
        // averagingDouble boils each box down to one number: the average rating.
        Map<String, Double> averagePerAuthor = shelf.stream()
                .collect(Collectors.groupingBy(Book::author, Collectors.averagingDouble(Book::rating)));
        // counting() fills the second summary: how many books each box holds.
        Map<String, Long> booksPerAuthor = shelf.stream()
                .collect(Collectors.groupingBy(Book::author, Collectors.counting()));

        List<AuthorRow> league = new ArrayList<>();
        averagePerAuthor.forEach((author, average) ->
                league.add(new AuthorRow(author, average, booksPerAuthor.get(author))));

        // comparing(average).reversed(): best average first;
        // thenComparing(name): equal averages sit in name order, A to Z.
        Comparator<AuthorRow> bestFirst = Comparator.comparing(AuthorRow::average).reversed();
        league.stream()
                .sorted(bestFirst.thenComparing(AuthorRow::author))
                .forEach(row -> System.out.println(row.author() + ": "
                        + String.format("%.1f", row.average()) + " (" + row.books() + " books)"));
    }

    static void printBest(List<Book> shelf) {
        // max keeps one winner: the biggest rating.
        // On a tie, reverseOrder compares titles backwards, so the alphabetically FIRST one wins.
        Optional<Book> best = shelf.stream()
                .max(Comparator.comparing(Book::rating)
                        .thenComparing(Book::title, Comparator.reverseOrder()));
        // max hands back an Optional: a "maybe" box. orElse says what to print when it is empty.
        System.out.println("best: " + best.map(Book::title).orElse("(none)"));
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
