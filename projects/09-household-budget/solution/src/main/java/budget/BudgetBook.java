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
        if (!Files.exists(file)) {
            return skipped;
        }
        try (BufferedReader reader = Files.newBufferedReader(file)) {
            String line;
            int lineNumber = 0;
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                if (lineNumber == 1 || line.isBlank()) {
                    continue;   // the header, or an empty line
                }
                try {
                    bookings.add(Booking.parse(line));
                } catch (IllegalArgumentException e) {
                    skipped.add("Skipping line " + lineNumber + ": " + line + " (" + e.getMessage() + ")");
                }
            }
        }
        return skipped;
    }

    // Writes the whole book again: the header, then one line per booking.
    public void save() throws IOException {
        try (BufferedWriter writer = Files.newBufferedWriter(file)) {
            writer.write(HEADER);
            writer.newLine();
            for (Booking booking : bookings) {
                writer.write(booking.toCsvLine());
                writer.newLine();
            }
        }
    }

    // Income minus expenses, in cents.
    public static int balance(ArrayList<Booking> list) {
        int sum = 0;
        for (Booking booking : list) {
            if (booking.isExpense()) {
                sum = sum - booking.getCents();
            } else {
                sum = sum + booking.getCents();
            }
        }
        return sum;
    }

    // Only the bookings of one month, like 2026-10.
    public ArrayList<Booking> inMonth(YearMonth month) {
        ArrayList<Booking> result = new ArrayList<>();
        for (Booking booking : bookings) {
            if (YearMonth.from(booking.getDate()).equals(month)) {
                result.add(booking);
            }
        }
        return result;
    }

    // Category -> money spent, in cents. Income does not count here.
    // A TreeMap is a map that keeps its keys sorted (a, b, c ...).
    public TreeMap<String, Integer> expensesByCategory() {
        TreeMap<String, Integer> totals = new TreeMap<>();
        for (Booking booking : bookings) {
            if (booking.isExpense()) {
                int before = totals.getOrDefault(booking.getCategory(), 0);
                totals.put(booking.getCategory(), before + booking.getCents());
            }
        }
        return totals;
    }
}
