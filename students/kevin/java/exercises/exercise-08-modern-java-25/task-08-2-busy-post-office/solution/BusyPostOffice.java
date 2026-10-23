import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

// Ideas: virtual threads, futures, printing once after all results are in.
// Picture: the post office hands out one paper-slip helper per parcel — cheap as paper —
// and the main clerk waits for every slip before announcing one total.

public class BusyPostOffice {

    public static void main(String[] args) throws Exception {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        long sum = 0;
        // A virtual thread is a paper-slip helper: light to start, so one per parcel is cheap.
        try (ExecutorService exec = Executors.newVirtualThreadPerTaskExecutor()) {
            List<Future<Long>> futures = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                int index = i;
                // Each helper returns i*i as long (so big n cannot overflow) and never prints:
                // helpers printing in any order would make the output race.
                futures.add(exec.submit(() -> (long) index * index));
            }
            for (Future<Long> future : futures) {
                // get() waits for that helper's slip: results are gathered on the main thread.
                sum += future.get();
            }
        } // leaving the try closes the executor: it waits until every helper finished

        System.out.println("workers: " + n);
        System.out.println("sum: " + sum);
    }
}
