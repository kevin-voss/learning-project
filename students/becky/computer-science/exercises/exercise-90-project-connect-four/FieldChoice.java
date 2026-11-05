import java.util.Scanner;

public class FieldChoice {
    public static int playerChoice() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Bitte wähle eine Spalte aus"); //Player 1/2 soll später vorgegeben werden
        int chosenColumn = scanner.nextInt();             //nur Spalte, da Spielstein automatisch runterfällt
        System.out.println(chosenColumn);
        return chosenColumn;
    }
}
