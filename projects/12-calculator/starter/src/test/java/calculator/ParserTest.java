package calculator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

// These tests are your checklist. Most fail at the start. Run them with: mvn test
class ParserTest {

    private final Parser parser = new Parser();

    // Checks that this line is a bad expression with exactly this message.
    private void assertError(String line, String message) {
        IllegalArgumentException error = assertThrows(IllegalArgumentException.class, () -> parser.evaluate(line));
        assertEquals(message, error.getMessage());
    }

    @Test
    void numbersAndSpaces() {
        assertEquals(7, parser.evaluate("7"));
        assertEquals(12, parser.evaluate("12"));
        assertEquals(9, parser.evaluate("  4+5 "));
    }

    @Test
    void timesBeforePlus() {
        assertEquals(14, parser.evaluate("2 + 3 * 4"));
        assertEquals(11, parser.evaluate("2 + 3 * (4 - 1)"));
        assertEquals(18, parser.evaluate("12 + 3 * (4 - 2)"));
    }

    @Test
    void sameStrengthGoesLeftToRight() {
        assertEquals(15, parser.evaluate("20 - 4 - 1"));
        assertEquals(2, parser.evaluate("8 / 2 / 2"));
        assertEquals(3, parser.evaluate("7 / 2"));
    }

    @Test
    void brackets() {
        assertEquals(9, parser.evaluate("(1 + 2) * 3"));
        assertEquals(15, parser.evaluate("((2 + 3) * (4 - 1))"));
    }

    @Test
    void minusInFront() {
        assertEquals(2, parser.evaluate("-3 + 5"));
        assertEquals(-8, parser.evaluate("4 * -2"));
        assertEquals(-3, parser.evaluate("-(1 + 2)"));
    }

    @Test
    void badExpressions() {
        assertError("", "Empty expression.");
        assertError("   ", "Empty expression.");
        assertError("3 + + 4", "I don't understand this expression.");
        assertError("3 4", "I don't understand this expression.");
        assertError("3..2", "I don't understand this expression.");
        assertError("(3 + 4", "Missing ')'.");
        assertError("4 / (2 - 2)", "Division by zero.");
    }
}
