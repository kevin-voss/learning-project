import java.util.Scanner;

// Main talks to the person: it asks the questions and prints the answer.
// It does not know how a password is built. PasswordGenerator does that.
public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        int length = askLength(input);
        boolean uppercase = askYesNo(input, "Uppercase (y/n): ");
        boolean digits = askYesNo(input, "Digits (y/n): ");
        boolean specials = askYesNo(input, "Special characters (y/n): ");

        PasswordGenerator generator = new PasswordGenerator();
        String password = generator.generate(length, uppercase, digits, specials);
        System.out.println(password);
        System.out.println("Strength: " + generator.strength(password));
    }

    // Asks again and again until the answer is a whole number from 8 to 32.
    static int askLength(Scanner input) {
        while (true) {
            System.out.print("Length (8-32): ");
            String line = input.nextLine().trim();
            if (isWholeNumber(line)) {
                int length = Integer.parseInt(line);
                if (length >= 8 && length <= 32) {
                    return length;
                }
            }
            System.out.println("Length must be from 8 to 32.");
        }
    }

    // Asks again and again until the answer is exactly "y" or "n".
    static boolean askYesNo(Scanner input, String question) {
        while (true) {
            System.out.print(question);
            String line = input.nextLine().trim();
            if (line.equals("y")) {
                return true;
            }
            if (line.equals("n")) {
                return false;
            }
            System.out.println("Please type y or n.");
        }
    }

    // True for "8" or "32". False for "", "abc", "-4" and very long numbers.
    static boolean isWholeNumber(String text) {
        if (text.isEmpty() || text.length() > 3) {
            return false;
        }
        for (int i = 0; i < text.length(); i++) {
            if (!Character.isDigit(text.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
