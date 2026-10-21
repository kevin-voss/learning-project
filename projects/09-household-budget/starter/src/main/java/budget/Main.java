package budget;

import java.io.IOException;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeMap;

// The menu. Main asks and prints. It never splits a CSV line and never opens the file.
public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        BudgetBook book = new BudgetBook(Path.of("household.csv"));

        try {
            for (String message : book.load()) {
                System.out.println(message);
            }
        } catch (IOException e) {
            System.out.println("Could not read household.csv: " + e.getMessage());
        }

        boolean running = true;
        while (running) {
            System.out.println("1) Add  2) List  3) Balance  4) Month  5) By category  6) Quit");
            System.out.print("> ");
            String choice = input.nextLine().trim();

            switch (choice) {
                case "1" -> addBooking(input, book);
                case "2" -> printAll(book.getBookings());
                case "3" -> System.out.println("Balance: " + Booking.euros(BudgetBook.balance(book.getBookings())));
                case "4" -> printMonth(input, book);
                case "5" -> printCategories(book);
                case "6" -> running = false;
                default -> System.out.println("Unknown choice.");
            }
        }

        try {
            book.save();
            System.out.println("Saved to household.csv");
        } catch (IOException e) {
            System.out.println("Could not save household.csv: " + e.getMessage());
        }
    }

    static void addBooking(Scanner input, BudgetBook book) {
        System.out.print("Date (YYYY-MM-DD): ");
        String dateText = input.nextLine().trim();
        System.out.print("Kind (income/expense): ");
        String kind = input.nextLine().trim();
        System.out.print("Category: ");
        String category = input.nextLine().trim();
        System.out.print("Description: ");
        String description = input.nextLine().trim();
        System.out.print("Amount in euros: ");
        String amountText = input.nextLine().trim();

        try {
            LocalDate date = LocalDate.parse(dateText);
            int cents = (int) Math.round(Double.parseDouble(amountText) * 100);
            book.add(new Booking(date, kind, category, description, cents));
        } catch (DateTimeParseException e) {
            System.out.println("Date must be YYYY-MM-DD.");
        } catch (NumberFormatException e) {
            System.out.println("Amount must be a number.");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    static void printMonth(Scanner input, BudgetBook book) {
        System.out.print("Month (YYYY-MM): ");
        String text = input.nextLine().trim();
        try {
            ArrayList<Booking> month = book.inMonth(YearMonth.parse(text));
            printAll(month);
            System.out.println("Balance: " + Booking.euros(BudgetBook.balance(month)));
        } catch (DateTimeParseException e) {
            System.out.println("Month must be YYYY-MM.");
        }
    }

    static void printCategories(BudgetBook book) {
        TreeMap<String, Integer> totals = book.expensesByCategory();
        for (String category : totals.keySet()) {
            System.out.println(String.format("%-10s %10s", category, Booking.euros(totals.get(category))));
        }
    }

    static void printAll(ArrayList<Booking> list) {
        for (Booking booking : list) {
            System.out.println(booking);
        }
    }
}
