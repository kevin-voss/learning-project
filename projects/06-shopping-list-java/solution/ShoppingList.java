import java.util.ArrayList;

// Keeps all items. Main never touches the ArrayList directly.
public class ShoppingList {

    private final ArrayList<Item> items = new ArrayList<>();

    // Checks the values first. A bad item is never stored.
    public void add(String name, int quantity, double unitPrice) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }
        if (quantity < 1) {
            throw new IllegalArgumentException("Quantity must be at least 1.");
        }
        if (unitPrice < 0) {
            throw new IllegalArgumentException("Price cannot be negative.");
        }
        items.add(new Item(name, quantity, unitPrice));
    }

    // Position 1 on screen is index 0 in the list.
    public void remove(int position) {
        if (position < 1 || position > items.size()) {
            throw new IllegalArgumentException("No item at that position.");
        }
        items.remove(position - 1);
    }

    public double total() {
        double sum = 0;
        for (Item item : items) {
            sum = sum + item.lineTotal();
        }
        return sum;
    }

    // One numbered line per item, then the total.
    public void print() {
        for (int i = 0; i < items.size(); i++) {
            Item item = items.get(i);
            System.out.println(String.format("%d  %-10s %3d  %6.2f  %6.2f",
                    i + 1, item.getName(), item.getQuantity(), item.getUnitPrice(), item.lineTotal()));
        }
        System.out.println(String.format("Total: %.2f", total()));
    }
}
