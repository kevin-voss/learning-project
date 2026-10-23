import java.util.List;
import java.util.Map;
import java.util.Scanner;

// Ideas: LAZY collections (the locker opens on first touch), the N+1 problem, JOIN FETCH as the fix.
// Picture: a class list with lockers — one trip per locker, or one trip for everything.
// Author stands for an entity with a LAZY books collection; sql() stands for the SQL log
// and Hibernate's statistics in one.
public class CountTheQueries {

    static int queries = 0;

    // Every fake SELECT goes through here: printed like a log line and counted once.
    // No query can escape the counter — that is what generate_statistics does for real.
    static void sql(String query) {
        queries++;
        System.out.println("-- " + query);
    }

    // The books table in code: author id -> the titles on its shelf.
    static final Map<Integer, List<String>> BOOKS_TABLE = Map.of(
            1, List.of("Dune", "Emma"),
            2, List.of("Persuasion"));

    static final class Author {
        final int id;
        final String name;
        private List<String> books;   // null = the lazy collection was never touched

        Author(int id, String name) {
            this.id = id;
            this.name = name;
        }

        // LAZY: the first touch pays. Every author whose books you open runs its own
        // SELECT — even cy, whose shelf is empty: an empty collection is loaded with a query too.
        List<String> books() {
            if (books == null) {
                sql("SELECT * FROM books WHERE author_id = " + id);
                books = BOOKS_TABLE.getOrDefault(id, List.of());
            }
            return books;
        }

        // Fetch mode: the books came with the JOIN, so the collection starts filled —
        // books() will never need the extra query.
        void fillFromJoin() {
            books = BOOKS_TABLE.getOrDefault(id, List.of());
        }
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String mode = in.nextLine().trim().split(" ")[1];   // "lazy" or "fetch"

        List<Author> authors = List.of(
                new Author(1, "ana"), new Author(2, "ben"), new Author(3, "cy"));

        if (mode.equals("fetch")) {
            // JOIN FETCH: authors AND their books in one trip — the join query
            // replaces the plain authors SELECT, so nothing is left to load later.
            sql("SELECT * FROM authors JOIN books");
            authors.forEach(Author::fillFromJoin);
        } else {
            // LAZY: the "1" in N+1 — one query for the list of authors.
            sql("SELECT * FROM authors");
        }

        // Pass 1: touch every author's books(), in id order. In lazy mode this loop is
        // where the locker queries fire — that IS the N+1. Pass 2 prints the lines,
        // so the SQL log stays one block: every SQL first, then the author lines.
        for (Author author : authors) {
            author.books();
        }
        for (Author author : authors) {
            System.out.println(author.name + ": " + author.books().size() + " books");
        }
        System.out.println("queries: " + queries);
    }
}
