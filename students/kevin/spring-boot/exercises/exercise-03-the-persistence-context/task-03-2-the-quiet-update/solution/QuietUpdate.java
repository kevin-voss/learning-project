import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

// Ideas: dirty checking at flush (compare object vs snapshot, an UPDATE without save()),
// flush vs commit, and why a detached object's change is ignored.
// Picture: scribble in a cart book; at closing time the librarian copies it into the catalogue.
// managed stands for the persistence context; detached stands for entities after the transaction.
public class QuietUpdate {

    static final Map<Integer, String> DATABASE = Map.of(
            1, "Dune",
            2, "Emma",
            3, "Persuasion");

    // One entity Hibernate watches: the current title plus the snapshot taken at load time.
    // Dirty checking = flush compares title with snapshot; a difference becomes an UPDATE.
    static final class Book {
        final int id;
        String title;
        String snapshot;

        Book(int id, String title) {
            this.id = id;
            this.title = title;
            this.snapshot = title;
        }
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        // The cart: flush compares every book here. Detached books live in their own map:
        // the object survives, but flush never looks at it again.
        Map<Integer, Book> managed = new HashMap<>();
        Map<Integer, Book> detached = new HashMap<>();

        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ", 3);   // limit 3: titles may contain spaces
            switch (parts[0]) {
                case "LOAD" -> load(managed, Integer.parseInt(parts[1]));
                case "SET" -> set(managed, detached, Integer.parseInt(parts[1]), parts[2]);
                case "DETACH" -> detach(managed, detached, Integer.parseInt(parts[1]));
                case "FLUSH" -> flush(managed);
            }
        }
    }

    static void load(Map<Integer, Book> managed, int id) {
        if (managed.containsKey(id)) {
            return;   // already on the cart: a second LOAD is a no-op, the first snapshot stays
        }
        String row = DATABASE.get(id);
        if (row == null) {
            return;   // the task only loads ids 1 to 3
        }
        // One SELECT, and the snapshot is taken here: flush later compares against this state.
        managed.put(id, new Book(id, row));
    }

    static void set(Map<Integer, Book> managed, Map<Integer, Book> detached, int id, String newTitle) {
        Book book = managed.containsKey(id) ? managed.get(id) : detached.get(id);
        if (book == null) {
            System.out.println("no object for " + id);
            return;
        }
        // A plain field change — no save(), no update(). Real Hibernate works the same way:
        // the UPDATE is only written when somebody flushes.
        book.title = newTitle;
    }

    static void detach(Map<Integer, Book> managed, Map<Integer, Book> detached, int id) {
        Book book = managed.remove(id);
        if (book != null) {
            detached.put(id, book);
        }
    }

    static void flush(Map<Integer, Book> managed) {
        boolean changed = false;
        // Id order: Hibernate also writes its UPDATEs in a stable, repeatable order.
        for (int id : new TreeMap<>(managed).keySet()) {
            Book book = managed.get(id);
            if (!book.title.equals(book.snapshot)) {
                System.out.println("UPDATE books SET title='" + book.title
                        + "' WHERE id=" + id);
                book.snapshot = book.title;   // snapshot refreshed: a second flush finds nothing
                changed = true;
            }
        }
        if (!changed) {
            System.out.println("nothing to flush");
        }
    }
}
