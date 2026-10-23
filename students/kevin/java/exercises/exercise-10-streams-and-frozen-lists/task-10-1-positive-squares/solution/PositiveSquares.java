import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// Ideas: a stream pipeline — filter, mapToInt, sum.
// Picture: a post office sorting belt — parcels roll by, we keep the heavy ones,
// stamp each with its square, and one counter totals them at the belt's end.

public class PositiveSquares {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        List<Integer> numbers = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            numbers.add(Integer.parseInt(in.nextLine().trim()));
        }

        // A stream is a sorting belt: parcels roll by, the pile itself is never touched.
        int sum = numbers.stream()
                // filter keeps only what passes the test: strictly greater than 0.
                .filter(value -> value > 0)
                // mapToInt squares each kept number as a plain int, no boxing.
                .mapToInt(value -> value * value)
                // sum is the one answer at the belt's end — after it, the stream is spent.
                .sum();

        System.out.println("sum: " + sum);
    }
}
