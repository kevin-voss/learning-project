import java.util.Scanner;

// Main talks to the person: it asks the questions and prints the answer.
// It does not know how a password is built. PasswordGenerator does that.
public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        int length = askLength(input);
        // TODO step 3: ask three yes/no questions with askYesNo:
        //   "Uppercase (y/n): ", "Digits (y/n): ", "Special characters (y/n): "
        boolean uppercase = false;
        boolean digits = false;
        boolean specials = false;

        PasswordGenerator generator = new PasswordGenerator();
        String password = generator.generate(length, uppercase, digits, specials);
        System.out.println(password);
    }

    // Asks again and again until the answer is a whole number from 8 to 32.
    static int askLength(Scanner input) {
        System.out.print("Length (8-32): ");
        String line = input.nextLine().trim();
        // TODO step 2: put this in a while (true) loop.
        //   If isWholeNumber(line) and the number is from 8 to 32: return it.
        //   Otherwise print "Length must be from 8 to 32." and ask again.
        return Integer.parseInt(line);
    }

    // Asks again and again until the answer is exactly "y" or "n".
    static boolean askYesNo(Scanner input, String question) {
        // TODO step 3: print the question, read a line, trim it.
        //   "y" -> return true. "n" -> return false.
        //   Anything else: print "Please type y or n." and ask again.
        return false;
    }

    // True for "8" or "32". False for "", "abc", "-4" and very long numbers.
    static boolean isWholeNumber(String text) {
        // TODO step 2: return false for an empty text or one longer than 3 characters.
        //   Then loop over every character: Character.isDigit(text.charAt(i)).
        return true;
    }
}
