package budget;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.TreeMap;

// All bookings, plus saving and loading them. Only this class knows the file.
public class BudgetBook {

    static final String HEADER = "date;kind;category;description;cents";

    private final Path file;
    private final ArrayList<Booking> bookings = new ArrayList<>();

    public BudgetBook(Path file) {
        this.file = file;
    }

    public void add(Booking booking) {
        bookings.add(booking);
    }

    public ArrayList<Booking> getBookings() {
        return bookings;
    }

    // Reads the file. A missing file is an empty book, not an error.
    // Broken lines are skipped. The list that comes back says which ones.
    public ArrayList<String> load() throws IOException {
        ArrayList<String> skipped = new ArrayList<>();
        // TODO step 5: if the file does not exist, return the empty list.
        // TODO step 5: open it with try (BufferedReader reader = Files.newBufferedReader(file)) { ... }
        //   Read line by line with reader.readLine() until it returns null. Count the lines.
        //   Skip line 1 (the header) and blank lines.
        //   Booking.parse each other line and add it.
        //   A broken line: catch the IllegalArgumentException and add
        //   "Skipping line " + lineNumber + ": " + line   to skipped.
        return skipped;
    }

    // Writes the whole book again: the header, then one line per booking.
    public void save() throws IOException {
        // TODO step 4: try (BufferedWriter writer = Files.newBufferedWriter(file)) { ... }
        //   Write HEADER, then writer.newLine().
        //   Then one toCsvLine() and one newLine() per booking.
    }

    // Income minus expenses, in cents.
    public static int balance(ArrayList<Booking> list) {
        // TODO step 6: add income, subtract expenses (booking.isExpense()).
        return 0;
    }

    // Only the bookings of one month, like 2026-10.
    public ArrayList<Booking> inMonth(YearMonth month) {
        ArrayList<Booking> result = new ArrayList<>();
        // TODO step 6: keep the bookings where YearMonth.from(booking.getDate()) equals month.
        return result;
    }

    // Category -> money spent, in cents. Income does not count here.
    // A TreeMap is a map that keeps its keys sorted (a, b, c ...).
    public TreeMap<String, Integer> expensesByCategory() {
        TreeMap<String, Integer> totals = new TreeMap<>();
        // TODO step 6: for every expense, add its cents to totals for its category.
        //   totals.getOrDefault(category, 0) gives 0 the first time.
        return totals;
    }
}
