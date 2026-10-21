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

        int cents;
        try {
            cents = toCents(amountText);
        } catch (NumberFormatException e) {
            System.out.println("Amount must be a number.");
            return;
        }

        try {
            ledger.addExpense(payer, cents, names(forWhomText, ledger));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    // "10.50" -> 1050. The double is used only for this one step.
    static int toCents(String euros) {
        return (int) Math.round(Double.parseDouble(euros) * 100);
    }

    // "all" -> everybody. "Anna, Ben" -> [Anna, Ben]. "" -> an empty list.
    static ArrayList<String> names(String text, Ledger ledger) {
        ArrayList<String> result = new ArrayList<>();
        if (text.equals("all")) {
            result.addAll(ledger.getPeople());
            return result;
        }
        for (String part : text.split(",")) {
            String name = part.trim();
            if (!name.isEmpty()) {
                result.add(name);
            }
        }
        return result;
    }

    static void printBalances(Ledger ledger) {
        HashMap<String, Integer> balance = ledger.balances();
        for (String name : ledger.getPeople()) {
            int cents = balance.get(name);
            String sign = cents > 0 ? "+" : "";
            System.out.println(String.format("%-8s %10s", name, sign + Ledger.euros(cents)));
        }
    }
}
