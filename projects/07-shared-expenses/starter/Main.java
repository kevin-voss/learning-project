import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

// The menu. Main asks and prints. All the money math is in Ledger.
public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        Ledger ledger = new Ledger();

        boolean running = true;
        while (running) {
            System.out.println("1) Add person  2) Add expense  3) Balances  4) Transfers  5) Quit");
            System.out.print("> ");
            String choice = input.nextLine().trim();

            switch (choice) {
                case "1" -> addPerson(input, ledger);
                case "2" -> addExpense(input, ledger);
                case "3" -> printBalances(ledger);
                case "4" -> {
                    for (String line : ledger.transfers()) {
                        System.out.println(line);
                    }
                }
                case "5" -> running = false;
                default -> System.out.println("Unknown choice.");
            }
        }
    }

    static void addPerson(Scanner input, Ledger ledger) {
        System.out.print("Name: ");
        String name = input.nextLine().trim();
        try {
            ledger.addPerson(name);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    static void addExpense(Scanner input, Ledger ledger) {
        System.out.print("Who paid: ");
        String payer = input.nextLine().trim();
        System.out.print("Amount in euros: ");
        String amountText = input.nextLine().trim();
        System.out.print("For whom (names separated by commas, or 'all'): ");
        String forWhomText = input.nextLine().trim();

        // TODO step 6: catch NumberFormatException here and print "Amount must be a number."
        int cents = toCents(amountText);

        // TODO step 6: catch IllegalArgumentException here and print e.getMessage().
        ledger.addExpense(payer, cents, names(forWhomText, ledger));
    }

    // "10.50" -> 1050.
    static int toCents(String euros) {
        // TODO step 2: Double.parseDouble, times 100, then Math.round and (int).
        return 0;
    }

    // "all" -> everybody. "Anna, Ben" -> [Anna, Ben]. "" -> an empty list.
    static ArrayList<String> names(String text, Ledger ledger) {
        ArrayList<String> result = new ArrayList<>();
        // TODO step 4: "all" -> add all ledger.getPeople().
        //   Otherwise split(","), trim() every part, and add the parts that are not empty.
        return result;
    }

    static void printBalances(Ledger ledger) {
        HashMap<String, Integer> balance = ledger.balances();
        for (String name : ledger.getPeople()) {
            // TODO step 3: print the name and Ledger.euros(balance.get(name)).
            //   Put a "+" in front of positive numbers.
            System.out.println(name);
        }
    }
}
