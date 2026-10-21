package budget;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.nio.file.Path;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

// This test fails until load() and save() work. Add your own tests below it.
class BudgetBookTest {

    // JUnit gives every test a fresh, empty folder. Your real household.csv is never touched.
    @TempDir
    Path folder;

    private BudgetBook bookWithThreeBookings(Path file) {
        BudgetBook book = new BudgetBook(file);
        book.add(new Booking(LocalDate.of(2026, 9, 2), "expense", "food", "groceries", 1250));
        book.add(new Booking(LocalDate.of(2026, 10, 3), "expense", "food", "pizza", 1850));
        book.add(new Booking(LocalDate.of(2026, 10, 4), "income", "salary", "october", 250000));
        return book;
    }

    @Test
    void saveThenLoadGivesTheSameBookings() throws IOException {
        Path file = folder.resolve("household.csv");
        bookWithThreeBookings(file).save();

        BudgetBook again = new BudgetBook(file);
        again.load();

        assertEquals(3, again.getBookings().size());
        assertEquals("2026-10-03;expense;food;pizza;1850", again.getBookings().get(1).toCsvLine());
    }
}
