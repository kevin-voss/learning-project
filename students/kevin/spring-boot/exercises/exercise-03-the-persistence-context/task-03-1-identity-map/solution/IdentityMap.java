import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

// Ideas: the identity map (one row is one object per session), managed vs detached.
// Picture: the librarian's cart — ask for the same book twice and she points at the cart.
// Session stands for the persistence context (the cart); the object counter stands for
// Java object identity, == in real code.
public class IdentityMap {

    // One Book stands for a managed entity. objectNumber is its identity: same number, same object.
    record Book(int id, int objectNumber, String title) {}

    static class Session {
        // The identity map: the cart. This map IS the persistence context of this session.
        private final Map<Integer, Book> cart = new HashMap<>();
        private int loads;   // how many real SELECTs the session had to run

        Book find(int id) {
            // Cart first: a row that was loaded before comes back as the SAME object,
            // and the database is never asked again. That is why findById(1) twice loads once.
            Book book = cart.get(id);
            if (book != null) {
                return book;
            }
            String title = readFromDatabase(id);
            if (title == null) {
                return null;   // not found: nothing was loaded, so nothing is cached either
            }
            loads++;   // here — and only here — one SELECT happened
            book = new Book(id, nextObjectNumber++, title);
            cart.put(id, book);
            return book;
        }

        // The transaction ends: the cart is emptied. The Book objects still exist in memory,
        // but the session never hands them out again — they are detached now.
        void clear() {
            cart.clear();
        }

        int loads() {
            return loads;
        }
    }

    // Counts every Book ever built, across CLEARs: a new visit builds a new object.
    static int nextObjectNumber = 1;

    static final Map<Integer, String> DATABASE = Map.of(
            1, "Dune",
            2, "Emma",
            3, "Persuasion");

    static String readFromDatabase(int id) {
        return DATABASE.get(id);   // the one stand-in SELECT: reading this map costs one load
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        Session session = new Session();
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            if (parts[0].equals("CLEAR")) {
                session.clear();
                continue;
            }
            int id = Integer.parseInt(parts[1]);
            Book book = session.find(id);
            if (book == null) {
                System.out.println("book " + id + " -> not found");
            } else {
                System.out.println("book " + id + " -> #" + book.objectNumber()
                        + " (" + book.title() + ")");
            }
        }
        System.out.println("loads: " + session.loads());
    }
}
