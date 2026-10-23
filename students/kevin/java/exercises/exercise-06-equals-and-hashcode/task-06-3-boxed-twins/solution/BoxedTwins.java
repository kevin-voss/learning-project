import java.util.Scanner;

// Ideas: wrappers (Integer, the box around int), == vs equals on objects, the Integer cache.
// Picture: two lunchboxes with the same number inside — equals asks "same number?",
// == asks "same box?" — and Java owns one shelf of shared boxes for -128..127.
public class BoxedTwins {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] parts = in.nextLine().trim().split(" ");

        // Integer is the box around an int: an object you can ask .equals on.
        // valueOf boxes the number; from 128 up every call builds a fresh box.
        Integer a = Integer.valueOf(parts[0]);
        Integer b = Integer.valueOf(parts[1]);

        // equals compares the numbers inside the boxes — that is the rule for every object.
        System.out.println("equals: " + a.equals(b));
        // == compares the boxes themselves; the parentheses keep + from gluing too early.
        System.out.println("==: " + (a == b));

        // The Integer cache: -128..127 sit on one shared shelf, so == is true there.
        boolean cached = a >= -128 && a <= 127 && b >= -128 && b <= 127;
        String cachedLine;
        if (cached) {
            cachedLine = "yes";
        } else {
            cachedLine = "no";
        }
        System.out.println("cached: " + cachedLine);
    }
}
