import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

// Ideas: removing from an ArrayList while looping, removeIf, and a lambda as the removal rule.
// Picture: pulling books off a shelf while you count it — you lose your place,
// so removeIf takes the removing out of your hands and the walk stays safe.
public class SafeRemoval {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        ArrayList<String> words = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            words.add(in.nextLine().trim());
        }
        String letter = in.nextLine().trim();

        // removeIf walks the list itself and throws out every word the rule is true for —
        // removing inside a for-each instead would crash with ConcurrentModificationException.
        // word -> word.contains(letter) is a tiny unnamed rule: for each word, is this true?
        words.removeIf(word -> word.contains(letter));

        String keptLine;
        if (words.isEmpty()) {
            keptLine = "(none)";
        } else {
            keptLine = String.join(" ", words);   // glue the survivors with one space between
        }
        System.out.println("kept: " + keptLine);
        // Every word is kept or removed, so n minus what stayed is how many left.
        System.out.println("removed: " + (n - words.size()));
    }

    // The older way, same result: an Iterator is the loop's own finger, and only it may remove.
    static void removeAllWithLetter(ArrayList<String> words, String letter) {
        Iterator<String> it = words.iterator();
        while (it.hasNext()) {
            if (it.next().contains(letter)) {
                it.remove();
            }
        }
    }
}
