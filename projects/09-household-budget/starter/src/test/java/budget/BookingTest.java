package budget;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;

// These tests fail until you finish the TODOs in Booking.java. That is the plan.
// Run them with: mvn test
class BookingTest {

    @Test
    void parseReadsAllFiveFields() {
        Booking booking = Booking.parse("2026-10-03;expense;food;pizza;1850");

        assertEquals(LocalDate.of(2026, 10, 3), booking.getDate());
        assertEquals("expense", booking.getKind());
        assertEquals("food", booking.getCategory());
        assertEquals("pizza", booking.getDescription());
        assertEquals(1850, booking.getCents());
    }

    @Test
    void toCsvLineIsTheWayBack() {
        String line = "2026-10-04;income;salary;october;250000";

        assertEquals(line, Booking.parse(line).toCsvLine());
    }
}
