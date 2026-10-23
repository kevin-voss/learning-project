import java.util.Scanner;

// A vending machine that refuses impossible buys without crashing. Shows throw
// (you sound the alarm yourself), IllegalArgumentException as the alarm type,
// and main catching the alarm so the run goes on with the next customer.
public class VendingMachine {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        int sales = 0;
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            try {
                System.out.println(buy(parts[0], parts[1]));
                sales++;   // reached only when buy did not throw
            } catch (NumberFormatException e) {
                // The paid token is not a number: this special alarm must be caught above the general one.
                System.out.println("error: paid is not a number");
            } catch (IllegalArgumentException e) {
                // The buying method refused: report its message, serve the next line.
                System.out.println("error: " + e.getMessage());
            }
        }
        System.out.println("sales: " + sales);
    }

    // One buying attempt. Every impossible case throws; the caller decides what to print.
    static String buy(String slot, String paidToken) {
        int price = switch (slot) {
            case "A1" -> 150;
            case "A2" -> 200;
            case "A3" -> 250;
            // throw sounds the alarm yourself: an impossible buy has no answer to return.
            default -> throw new IllegalArgumentException("unknown slot " + slot);
        };
        int paid = Integer.parseInt(paidToken);
        if (paid < 0) {
            throw new IllegalArgumentException("paid cannot be negative");
        }
        if (paid < price) {
            throw new IllegalArgumentException("need " + (price - paid) + " more cents");
        }
        return "bought " + slot + ", change " + (paid - price);
    }
}
