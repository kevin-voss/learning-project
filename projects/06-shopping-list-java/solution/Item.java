// One line on the shopping list: a name, how many, and the price of one.
public class Item {

    private final String name;
    private final int quantity;
    private final double unitPrice;

    public Item(String name, int quantity, double unitPrice) {
        this.name = name;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    // 2 milk at 1.50 each cost 3.00.
    public double lineTotal() {
        return quantity * unitPrice;
    }
}
