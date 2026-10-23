import java.util.Scanner;

// Turns bad tokens into skip lines instead of a crash. Shows try/catch as the
// fire drill: the risky parse sits in the try room, the catch door reports the
// bad token, and the counter keeps serving the next customer.
public class SafeNumbers {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        int sum = 0;
        int valid = 0;
        int invalid = 0;
        for (int i = 0; i < n; i++) {
            String token = in.nextLine().trim();
            try {
                // NumberFormatException is the alarm for text that is not a whole number.
                int value = Integer.parseInt(token);
                sum += value;                          // reached only when no alarm sounded
                valid++;
            } catch (NumberFormatException e) {
                // Refuse the bad piece out loud, keep serving: the loop goes on after the catch.
                System.out.println("skip: " + token);  // our own token, not the alarm's message
                invalid++;
            }
        }
        System.out.println("sum: " + sum);
        System.out.println("valid: " + valid);
        System.out.println("invalid: " + invalid);
    }
}
