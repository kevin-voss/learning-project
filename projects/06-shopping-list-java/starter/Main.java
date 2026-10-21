import java.util.Scanner;

// The menu. Main asks and prints. ShoppingList keeps the items.
public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        ShoppingList list = new ShoppingList();

        boolean running = true;
        while (running) {
            System.out.println("1) Add  2) Show  3) Remove  4) Total  5) Quit");
            System.out.print("> ");
            String choice = input.nextLine().trim();

            switch (choice) {
                case "1" -> addItem(input, list);
                case "2" -> list.print();
                // TODO step 6: case "3" calls removeItem.
                // TODO step 4: case "4" prints the total with two decimals.
                case "5" -> running = false;
                default -> System.out.println("Unknown choice.");
            }
        }
    }

    static void addItem(Scanner input, ShoppingList list) {
        System.out.print("Name: ");
        String name = input.nextLine().trim();
        System.out.print("Quantity: ");
        String quantityText = input.nextLine().trim();
        System.out.print("Price: ");
        String priceText = input.nextLine().trim();

        // TODO step 5: wrap each parse in try / catch (NumberFormatException e)
        //   and print "Quantity must be a whole number." (or the price message), then return.
        int quantity = Integer.parseInt(quantityText);
        double price = Double.parseDouble(priceText);

        // TODO step 5: catch IllegalArgumentException from add and print e.getMessage().
        list.add(name, quantity, price);
    }

    static void removeItem(Scanner input, ShoppingList list) {
        System.out.print("Position: ");
        String text = input.nextLine().trim();
        // TODO step 6: turn text into a number and call list.remove(...).
        //   Catch bad numbers and bad positions like in addItem.
    }
}
