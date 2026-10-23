import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// Stock counter with ConcurrentHashMap.merge: many clerks write on one shared tally board.
// Picture: every input line is its own clerk adding one stroke; merge makes each stroke one
// unbreakable move, so no update is lost even when all clerks run at the same time.
public class StockCounter {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        // ConcurrentHashMap: a map many threads may write at the same time without breaking it.
        Map<String, Integer> stock = new ConcurrentHashMap<>();

        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < n; i++) {
                String[] parts = in.nextLine().trim().split(" ");
                String sku = parts[0];
                int delta = Integer.parseInt(parts[1]);
                executor.submit(() -> {
                    // merge is ONE call: read+add+write cannot be interrupted by another thread,
                    // so no update is lost. It adds delta to the current value (or just delta
                    // when the sku is new).
                    stock.merge(sku, delta, Integer::sum);
                    // WRONG two-step version: another clerk slips between get and put and its
                    // stroke is lost. Run it often enough and the totals come out short:
                    // stock.put(sku, stock.getOrDefault(sku, 0) + delta);
                });
            }
        } // closing the executor waits until every clerk has finished writing

        // Copy into a TreeMap: the keys come out in alphabetical order.
        Map<String, Integer> sorted = new TreeMap<>(stock);
        for (Map.Entry<String, Integer> entry : sorted.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        System.out.println("skus: " + sorted.size());
    }
}
