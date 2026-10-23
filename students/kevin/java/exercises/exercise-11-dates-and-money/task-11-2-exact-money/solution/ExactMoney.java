import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;

// Ideas: BigDecimal from text, exact add and multiply, setScale(2, HALF_UP).
// Picture: a cash register counting in real coins — the total is the exact
// sum of the coins, never "roughly 30 cents".

public class ExactMoney {

    // The vat rate as text too: 1.19 exactly, no double error copied in.
    static final BigDecimal VAT = new BigDecimal("1.19");
    static final int TWO_DECIMALS = 2;

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        // Start the till at exactly 0.00: an empty note still prints two decimals.
        BigDecimal total = new BigDecimal("0.00");
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            int qty = Integer.parseInt(parts[2]);
            // new BigDecimal(text) is exact; new BigDecimal(2.99) would copy the double's error.
            BigDecimal price = new BigDecimal(parts[1]);
            BigDecimal line = lineTotal(price, qty);
            // BigDecimal never changes: add hands back a new value.
            total = total.add(line);
            System.out.println(parts[0] + ": " + line.toPlainString());
        }
        // toPlainString prints plain digits — no scientific-notation surprise.
        System.out.println("total: " + total.toPlainString());
        System.out.println("with vat: " + withVat(total).toPlainString());
    }

    // multiply stays exact: 2.99 × 3 gives 8.97, never 8.969999….
    // setScale(2, HALF_UP) then rounds to cents the way school taught: 5 goes up.
    static BigDecimal lineTotal(BigDecimal price, int qty) {
        // BigDecimal.valueOf(qty) lifts the whole quantity into an exact BigDecimal.
        return price.multiply(BigDecimal.valueOf(qty))
                    .setScale(TWO_DECIMALS, RoundingMode.HALF_UP);
    }

    // Vat on top, then back to cents: 1.25 becomes 1.4875 and rounds to 1.49.
    static BigDecimal withVat(BigDecimal amount) {
        return amount.multiply(VAT).setScale(TWO_DECIMALS, RoundingMode.HALF_UP);
    }
}
