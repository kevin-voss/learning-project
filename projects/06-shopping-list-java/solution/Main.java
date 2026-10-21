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
                case "3" -> removeItem(input, list);
                case "4" -> System.out.println(String.format("Total: %.2f", list.total()));
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

        int quantity;
        try {
            quantity = Integer.parseInt(quantityText);
        } catch (NumberFormatException e) {
            System.out.println("Quantity must be a whole number.");
            return;
        }

        double price;
        try {
            price = Double.parseDouble(priceText);
        } catch (NumberFormatException e) {
            System.out.println("Price must be a number like 1.50.");
            return;
        }

        try {
            list.add(name, quantity, price);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    static void removeItem(Scanner input, ShoppingList list) {
        System.out.print("Position: ");
        String text = input.nextLine().trim();
        try {
            list.remove(Integer.parseInt(text));
        } catch (NumberFormatException e) {
            System.out.println("Position must be a whole number.");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}
