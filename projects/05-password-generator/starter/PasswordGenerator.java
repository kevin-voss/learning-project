import java.util.Random;

// Builds one password. It never reads the keyboard: Main gives it the answers.
public class PasswordGenerator {

    static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static final String DIGITS = "0123456789";
    static final String SPECIALS = "!@#$%&*?";

    // One Random for the whole object. Make it once, use it many times.
    private final Random random = new Random();

    public String generate(int length, boolean uppercase, boolean digits, boolean specials) {
        StringBuilder password = new StringBuilder();
        String pool = LOWERCASE;

        // TODO step 5: append one character of every chosen kind
        //   (lowercase always, the others only when their boolean is true)
        //   and add that kind to the pool.

        // TODO step 4: while the password is shorter than length, append pick(pool).

        // TODO step 6: call shuffle(password).
        return password.toString();
    }

    // One random character from the pool.
    char pick(String pool) {
        // TODO step 4: random.nextInt(pool.length()) gives a legal index. Return the char there.
        return 'a';
    }

    // Mix the characters so the kinds are not grouped at the start.
    void shuffle(StringBuilder text) {
        // TODO step 6: for i from the last index down to 1:
        //   pick j = random.nextInt(i + 1), then swap the chars at i and j
        //   with charAt and setCharAt.
    }
}
