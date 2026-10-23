import java.util.Scanner;

// Ideas: interface (a promise, not a family), implements, default method.
// Picture: a sign on the shop door — "We take cards". Any shop can hang it if it keeps the promise.

// interface = a promise, not a family: every payment must answer name(), nothing else is fixed.
interface Payment {
    String name();

    // default = a promise with a free sample: the receipt text written once, every payment reuses it.
    default String receipt(int cents) {
        return "paid " + cents + " cents by " + name();
    }
}

// implements = "keeps the promise": Card and Cash only say their name and reuse the default receipt.
class Card implements Payment {
    public String name() {
        return "card";
    }
}

class Cash implements Payment {
    public String name() {
        return "cash";
    }
}

class Coupon implements Payment {
    public String name() {
        return "coupon";
    }

    // A coupon reads differently on the receipt, so it overrides the default.
    @Override
    public String receipt(int cents) {
        return "coupon for " + cents + " cents";
    }
}

public class PaymentCounter {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        int total = 0;
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            // All three ride in one Payment variable: the same receipt() call prints the right sentence.
            Payment payment = create(parts[0]);
            int cents = Integer.parseInt(parts[1]);
            System.out.println(payment.receipt(cents));
            total += cents;
        }
        System.out.println("total: " + total + " cents");
    }

    // The only place that knows the method words: build the right payment.
    static Payment create(String method) {
        return switch (method) {
            case "card" -> new Card();
            case "cash" -> new Cash();
            case "coupon" -> new Coupon();
            default -> throw new IllegalArgumentException("unknown method: " + method);
        };
    }
}
