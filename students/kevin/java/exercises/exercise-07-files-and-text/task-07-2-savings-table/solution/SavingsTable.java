import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;

// The savings table survives as a CSV file: today's run writes it, tomorrow's
// run reads what today wrote. Shows Path + Files.writeString for the one-call
// write, Files.readAllLines to read the rows back, and a HashMap for the sums.

public class SavingsTable {

    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        // Build the CSV text in memory: header first, then one row per input line.
        String csv = "name,cents\n";
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            csv = csv + parts[0] + "," + parts[1] + "\n";
        }

        Path table = Path.of("savings.csv");
        Files.writeString(table, csv);   // one call writes it; a new run replaces it

        // Sum from the file we read back, not from the input.
        // HashMap = the coat check from Exercise 04: each name holds the sum of its cents.
        HashMap<String, Integer> totals = new HashMap<>();
        int grand = 0;
        List<String> rows = Files.readAllLines(table);
        for (int i = 1; i < rows.size(); i++) {   // 1: skip the header row
            String[] row = rows.get(i).split(",");
            String name = row[0];
            int cents = Integer.parseInt(row[1]);
            grand = grand + cents;   // every row counts, so repeated names too
            if (totals.containsKey(name)) {
                totals.put(name, totals.get(name) + cents);
            } else {
                totals.put(name, cents);
            }
        }

        // A HashMap has no order: sort the names into a list, then print.
        ArrayList<String> names = new ArrayList<>(totals.keySet());
        Collections.sort(names);
        for (String name : names) {
            System.out.println(name + ": " + totals.get(name));
        }
        System.out.println("grand total: " + grand);
    }
}
