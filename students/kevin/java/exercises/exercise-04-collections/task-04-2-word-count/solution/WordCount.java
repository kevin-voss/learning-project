import java.util.HashMap;
import java.util.Scanner;
import java.util.TreeSet;

// Counts the words in the post office mail. Shows a HashMap used as the theatre
// coat check (word = ticket name, count = coat), the <String,Integer> label, and
// a TreeSet that prints every distinct word A to Z.
public class WordCount {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // HashMap = the coat check: the word is the ticket name, the count the coat behind it.
        HashMap<String, Integer> counts = new HashMap<>();
        int total = 0;
        while (in.hasNextLine()) {
            String line = in.nextLine().trim();
            if (line.equals("END")) {
                break;                                  // the stop line is not a word
            }
            if (line.isEmpty()) {
                continue;
            }
            for (String word : line.split(" ")) {
                if (word.isEmpty()) {
                    continue;                           // two spaces in a row leave an empty piece: not a word
                }
                total++;
                if (counts.containsKey(word)) {
                    counts.put(word, counts.get(word) + 1);   // known ticket: its coat count grows by one
                } else {
                    counts.put(word, 1);                       // new ticket: the first coat goes in
                }
            }
        }
        System.out.println("words: " + total);
        System.out.println("unique: " + counts.size());
        // A HashMap has no order; a TreeSet of its keys walks the words A to Z.
        for (String word : new TreeSet<String>(counts.keySet())) {
            System.out.println(word + ": " + counts.get(word));
        }
    }
}
