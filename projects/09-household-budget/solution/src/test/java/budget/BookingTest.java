package budget;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;

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

    @Test
    void brokenLinesAreRefused() {
        assertThrows(IllegalArgumentException.class, () -> Booking.parse("this;is;broken"));
        assertThrows(IllegalArgumentException.class, () -> Booking.parse("03-10-2026;expense;food;bread;200"));
        assertThrows(IllegalArgumentException.class, () -> Booking.parse("2026-10-05;gift;fun;flowers;800"));
        assertThrows(IllegalArgumentException.class, () -> Booking.parse("2026-10-05;expense;fun;flowers;-800"));
    }

    @Test
    void eurosShowsTwoDecimals() {
        assertEquals("18.50", Booking.euros(1850));
        assertEquals("0.05", Booking.euros(5));
        assertEquals("-12.50", Booking.euros(-1250));
    }
}
