package budget;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

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

    @Test
    void balanceIsIncomeMinusExpenses() {
        BudgetBook book = bookWithThreeBookings(folder.resolve("household.csv"));

        assertEquals(246900, BudgetBook.balance(book.getBookings()));
        assertEquals(248150, BudgetBook.balance(book.inMonth(YearMonth.of(2026, 10))));
    }

    @Test
    void categoryTotalsCountExpensesOnly() {
        BudgetBook book = bookWithThreeBookings(folder.resolve("household.csv"));

        assertEquals(3100, book.expensesByCategory().get("food"));
        assertEquals(null, book.expensesByCategory().get("salary"));
    }

    @Test
    void missingFileIsAnEmptyBook() throws IOException {
        BudgetBook book = new BudgetBook(folder.resolve("not-there-yet.csv"));

        ArrayList<String> skipped = book.load();

        assertTrue(skipped.isEmpty());
        assertTrue(book.getBookings().isEmpty());
    }

    @Test
    void brokenLineIsSkippedAndGoodLinesStay() throws IOException {
        Path file = folder.resolve("household.csv");
        Files.writeString(file, """
                date;kind;category;description;cents
                2026-10-03;expense;food;pizza;1850
                this;is;broken
                2026-10-04;income;salary;october;250000
                """);

        BudgetBook book = new BudgetBook(file);
        ArrayList<String> skipped = book.load();

        assertEquals(2, book.getBookings().size());
        assertEquals(1, skipped.size());
        assertTrue(skipped.get(0).startsWith("Skipping line 3: this;is;broken"));
    }
}
