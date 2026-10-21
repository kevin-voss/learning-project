import java.util.ArrayList;

// Keeps all items. Main never touches the ArrayList directly.
public class ShoppingList {

    private final ArrayList<Item> items = new ArrayList<>();

    // Checks the values first. A bad item is never stored.
    public void add(String name, int quantity, double unitPrice) {
        // TODO step 5: throw new IllegalArgumentException("Name cannot be empty.") for an empty name.
        //   Same idea for quantity < 1 and unitPrice < 0 (messages in the README).
        // TODO step 3: add a new Item to the list.
    }

    // Position 1 on screen is index 0 in the list.
    public void remove(int position) {
        // TODO step 6: refuse positions below 1 or above items.size().
        //   Then items.remove(position - 1).
    }

    public double total() {
        // TODO step 4: add up lineTotal() of every item.
        return 0;
    }

    // One numbered line per item, then the total.
    public void print() {
        // TODO step 3: loop with an index i. Print i + 1, name, quantity, price, line total.
        //   String.format("%.2f", 3.0) gives "3.00".
        System.out.println(String.format("Total: %.2f", total()));
    }
}
