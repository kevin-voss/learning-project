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
        // TODO step 6: throw an IllegalArgumentException when
        //   the payer is unknown, cents <= 0, forWhom is empty, or a name in forWhom is unknown.
        expenses.add(new Expense(payer, cents, forWhom));
    }

    // Name -> balance in cents. Plus means "gets money back". Minus means "owes money".
    public HashMap<String, Integer> balances() {
        HashMap<String, Integer> balance = new HashMap<>();
        // TODO step 3: put every person in the map with 0.

        // TODO step 5: for every expense:
        //   share = cents / number of people in forWhom
        //   the payer gets + share * count
        //   every name in forWhom gets - share
        return balance;
    }

    // A list of sentences like "Clara pays Anna 35.00 euros".
    public ArrayList<String> transfers() {
        HashMap<String, Integer> balance = balances();
        ArrayList<String> result = new ArrayList<>();
        // TODO step 7: repeat until everyone is at 0:
        //   find the biggest plus and the biggest minus,
        //   move the smaller of the two amounts from one to the other,
        //   add a sentence to result.
        return result;
    }

    // 4000 cents -> "40.00". 5 cents -> "0.05". -500 cents -> "-5.00".
    public static String euros(int cents) {
        // TODO step 2: cents / 100 is the euros, cents % 100 the cents.
        //   String.format("%02d", 5) gives "05".
        return "" + cents;
    }
}
