import java.util.Scanner;

public class Input {
    public static String askForWord() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Please enter your Word: ");
        String chosenWord = scanner.nextLine();
        return chosenWord;
    }
}
