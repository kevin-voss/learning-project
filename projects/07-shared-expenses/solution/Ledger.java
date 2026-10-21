import java.util.ArrayList;
import java.util.HashMap;

// The money book: people, expenses, balances and who pays whom.
// All money is in whole cents (int). 10.50 euros is 1050.
public class Ledger {

    private final ArrayList<String> people = new ArrayList<>();
    private final ArrayList<Expense> expenses = new ArrayList<>();

    public void addPerson(String name) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }
        if (people.contains(name)) {
            throw new IllegalArgumentException(name + " is already in the group.");
        }
        people.add(name);
    }

    public ArrayList<String> getPeople() {
        return people;
    }

    // forWhom is the list of names who share this expense.
    public void addExpense(String payer, int cents, ArrayList<String> forWhom) {
        if (!people.contains(payer)) {
            throw new IllegalArgumentException("Unknown person: " + payer);
        }
        if (cents <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0.");
        }
        if (forWhom.isEmpty()) {
            throw new IllegalArgumentException("Name at least one person, or 'all'.");
        }
        for (String name : forWhom) {
            if (!people.contains(name)) {
                throw new IllegalArgumentException("Unknown person: " + name);
            }
        }
        expenses.add(new Expense(payer, cents, forWhom));
    }

    // Name -> balance in cents. Plus means "gets money back". Minus means "owes money".
    public HashMap<String, Integer> balances() {
        HashMap<String, Integer> balance = new HashMap<>();
        for (String name : people) {
            balance.put(name, 0);
        }

        for (Expense expense : expenses) {
            int count = expense.getForWhom().size();
            int share = expense.getCents() / count;   // 1000 / 3 = 333, the 1 cent left over stays with the payer

            String payer = expense.getPayer();
            balance.put(payer, balance.get(payer) + share * count);
            for (String name : expense.getForWhom()) {
                balance.put(name, balance.get(name) - share);
            }
        }
        return balance;
    }

    // A list of sentences like "Clara pays Anna 35.00 euros".
    public ArrayList<String> transfers() {
        HashMap<String, Integer> balance = balances();
        ArrayList<String> result = new ArrayList<>();

        while (true) {
            String richest = null;   // the biggest plus
            String poorest = null;   // the biggest minus
            for (String name : people) {
                if (richest == null || balance.get(name) > balance.get(richest)) {
                    richest = name;
                }
                if (poorest == null || balance.get(name) < balance.get(poorest)) {
                    poorest = name;
                }
            }
            if (richest == null || balance.get(richest) == 0) {
                break;   // everyone is at zero
            }

            int amount = Math.min(balance.get(richest), -balance.get(poorest));
            balance.put(richest, balance.get(richest) - amount);
            balance.put(poorest, balance.get(poorest) + amount);
            result.add(poorest + " pays " + richest + " " + euros(amount) + " euros");
        }
        return result;
    }

    // 4000 cents -> "40.00". Only whole numbers, so no rounding surprises.
    public static String euros(int cents) {
        String sign = cents < 0 ? "-" : "";
        int positive = Math.abs(cents);
        return sign + (positive / 100) + "." + String.format("%02d", positive % 100);
    }
}
