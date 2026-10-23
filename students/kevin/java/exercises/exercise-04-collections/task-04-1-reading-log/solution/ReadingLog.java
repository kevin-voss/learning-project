import java.util.ArrayList;
import java.util.Scanner;

// Ideas: ArrayList (a list that grows and shrinks), reading <String>.
// Picture: a shopping list in a notebook — write at the bottom, cross out, the order stays.

public class ReadingLog {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // ArrayList<String> = a box labelled "Strings only". It grows with ADD, shrinks with DROP
        // and keeps the add order — an array could not, its size is fixed.
        ArrayList<String> books = new ArrayList<>();
        // No count line this time: hasNextLine() reads until the input ends, then ends the loop.
        while (in.hasNextLine()) {
            String[] parts = in.nextLine().trim().split(" ");
            String command = parts[0];
            if (command.equals("ADD")) {
                String title = parts[1];
                if (books.contains(title)) {
                    System.out.println("already read: " + title);   // never twice
                } else {
                    books.add(title);                               // a plain add prints nothing
                }
            } else if (command.equals("DROP")) {
                String title = parts[1];
                if (books.contains(title)) {
                    books.remove(title);
                } else {
                    System.out.println("not on the list: " + title);
                }
            } else if (command.equals("HAS")) {
                String title = parts[1];
                System.out.println("has " + title + ": " + (books.contains(title) ? "yes" : "no"));
            } else if (command.equals("SHOW")) {
                if (books.isEmpty()) {
                    System.out.println("books: (none)");
                } else {
                    // Glue the titles: ", " between two titles, never before the first.
                    String text = "";
                    for (int i = 0; i < books.size(); i++) {
                        if (i > 0) {
                            text += ", ";
                        }
                        text += books.get(i);
                    }
                    System.out.println("books: " + text);
                }
            } else if (command.equals("COUNT")) {
                System.out.println("count: " + books.size());
            }
        }
    }
}
