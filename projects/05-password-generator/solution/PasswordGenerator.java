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

        // 1. One character of every chosen kind, so each kind is there for sure.
        password.append(pick(LOWERCASE));
        if (uppercase) {
            password.append(pick(UPPERCASE));
            pool = pool + UPPERCASE;
        }
        if (digits) {
            password.append(pick(DIGITS));
            pool = pool + DIGITS;
        }
        if (specials) {
            password.append(pick(SPECIALS));
            pool = pool + SPECIALS;
        }

        // 2. Fill the rest from the big pool of all chosen kinds.
        while (password.length() < length) {
            password.append(pick(pool));
        }

        // 3. Mix, so the first characters are not always "a lowercase, then an uppercase ...".
        shuffle(password);
        return password.toString();
    }

    // One random character from the pool. nextInt(26) gives 0 to 25, a legal index.
    char pick(String pool) {
        int index = random.nextInt(pool.length());
        return pool.charAt(index);
    }

    // Walk from the last position down to 1 and swap each one with a random earlier (or same) position.
    void shuffle(StringBuilder text) {
        for (int i = text.length() - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            char temp = text.charAt(i);
            text.setCharAt(i, text.charAt(j));
            text.setCharAt(j, temp);
        }
    }

    // Extra: weak, medium or strong.
    public String strength(String password) {
        int kinds = 0;
        if (containsAny(password, LOWERCASE)) kinds++;
        if (containsAny(password, UPPERCASE)) kinds++;
        if (containsAny(password, DIGITS)) kinds++;
        if (containsAny(password, SPECIALS)) kinds++;

        if (password.length() >= 16 && kinds == 4) {
            return "strong";
        }
        if (password.length() >= 12 && kinds >= 3) {
            return "medium";
        }
        return "weak";
    }

    // True when at least one character of text is also in pool.
    boolean containsAny(String text, String pool) {
        for (int i = 0; i < text.length(); i++) {
            if (pool.indexOf(text.charAt(i)) >= 0) {
                return true;
            }
        }
        return false;
    }
}
