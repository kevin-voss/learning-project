package calculator;

// Reads a line like "2 + 3 * (4 - 1)" and computes it: 11.
//
// The grammar, from weakest to strongest:
//   expression = term   { ("+" | "-") term }        plus and minus, left to right
//   term       = factor { ("*" | "/") factor }      times and divide, left to right
//   factor     = number | "-" factor | "(" expression ")"
//
// Each line is one method. factor calls expression again for brackets: that is the recursion.
public class Parser {

    private String text;
    private int pos;   // where we are in the text, like a finger on the line

    public int evaluate(String line) {
        text = line;
        pos = 0;
        skipSpaces();
        if (pos == text.length()) {
            fail("Empty expression.");
        }
        int value = expression();
        skipSpaces();
        if (pos < text.length()) {
            fail("I don't understand this expression.");   // something is left over, like "3 4"
        }
        return value;
    }

    private int expression() {
        // TODO step 3: start with term(). Then loop: skipSpaces();
        //   next('+') -> add another term(), next('-') -> subtract another term(),
        //   anything else -> return the value.
        return term();
    }

    private int term() {
        // TODO step 4: the same shape as expression, with factor(), '*' and '/'.
        // TODO step 6: before dividing, a divisor of 0 calls fail("Division by zero.").
        return factor();
    }

    private int factor() {
        skipSpaces();
        // TODO step 5: next('(') -> value = expression(), then skipSpaces() and expect next(')').
        //   No ')' -> fail("Missing ')'.")
        // TODO step 6: next('-') -> return -factor();
        if (pos < text.length() && Character.isDigit(text.charAt(pos))) {
            return number();
        }
        fail("I don't understand this expression.");
        return 0;   // never reached: fail always throws
    }

    // "12" -> 12, one digit at a time: 0 * 10 + 1 = 1, then 1 * 10 + 2 = 12.
    private int number() {
        int value = 0;
        while (pos < text.length() && Character.isDigit(text.charAt(pos))) {
            value = value * 10 + (text.charAt(pos) - '0');
            pos++;
        }
        return value;
    }

    // If the next character is c, step over it and say true.
    private boolean next(char c) {
        if (pos < text.length() && text.charAt(pos) == c) {
            pos++;
            return true;
        }
        return false;
    }

    private void skipSpaces() {
        while (pos < text.length() && text.charAt(pos) == ' ') {
            pos++;
        }
    }

    private void fail(String message) {
        throw new IllegalArgumentException(message);
    }
}
