package budget;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

// One line in the budget: on this date, money came in (income) or went out (expense).
// Money is in whole cents: 18.50 euros is 1850.
public class Booking {

    private final LocalDate date;
    private final String kind;
    private final String category;
    private final String description;
    private final int cents;

    public Booking(LocalDate date, String kind, String category, String description, int cents) {
        if (!kind.equals("income") && !kind.equals("expense")) {
            throw new IllegalArgumentException("Kind must be income or expense.");
        }
        if (category.isEmpty()) {
            throw new IllegalArgumentException("Category cannot be empty.");
        }
        if (category.contains(";") || description.contains(";")) {
            throw new IllegalArgumentException("Please do not use ';' in the text.");
        }
        if (cents <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0.");
        }
        this.date = date;
        this.kind = kind;
        this.category = category;
        this.description = description;
        this.cents = cents;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getKind() {
        return kind;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public int getCents() {
        return cents;
    }

    public boolean isExpense() {
        return kind.equals("expense");
    }

    // One line for the file: 2026-10-03;expense;food;pizza;1850
    public String toCsvLine() {
        return date + ";" + kind + ";" + category + ";" + description + ";" + cents;
    }

    // The way back: one line of the file becomes a Booking.
    // A broken line throws an IllegalArgumentException with a short reason.
    public static Booking parse(String line) {
        String[] fields = line.split(";", -1);   // -1 keeps empty fields, like an empty description
        if (fields.length != 5) {
            throw new IllegalArgumentException("Expected 5 fields, found " + fields.length + ".");
        }
        LocalDate date;
        try {
            date = LocalDate.parse(fields[0]);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Date must be YYYY-MM-DD.");
        }
        int cents;
        try {
            cents = Integer.parseInt(fields[4]);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Cents must be a whole number.");
        }
        return new Booking(date, fields[1], fields[2], fields[3], cents);
    }

    // 250000 cents -> "2500.00"
    public static String euros(int cents) {
        String sign = cents < 0 ? "-" : "";
        int positive = Math.abs(cents);
        return sign + (positive / 100) + "." + String.format("%02d", positive % 100);
    }

    @Override
    public String toString() {
        return String.format("%s  %-8s %-10s %-12s %10s", date, kind, category, description, euros(cents));
    }
}
