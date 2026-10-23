import java.util.OptionalInt;
import java.util.Scanner;

// Ideas: OptionalInt for "maybe no answer", division guarded before it explodes.
// Picture: a gift box — divide hands back a box that either holds the quotient or
// sits empty when the divisor is zero, instead of pretending 0 was the answer.

public class SafeDivide {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split("\\s+");
            int a = Integer.parseInt(parts[0]);
            int b = Integer.parseInt(parts[1]);
            // The gift box: present means a real quotient, empty means undefined.
            OptionalInt result = divide(a, b);
            if (result.isPresent()) {
                System.out.println(result.getAsInt());
            } else {
                System.out.println("undefined");
            }
        }
    }

    /** Empty when dividing by zero. Never returns a magic number. */
    static OptionalInt divide(int a, int b) {
        // Ask first instead of catching ArithmeticException: an empty box is a normal answer.
        if (b == 0) {
            return OptionalInt.empty();
        }
        return OptionalInt.of(a / b);
    }
}
