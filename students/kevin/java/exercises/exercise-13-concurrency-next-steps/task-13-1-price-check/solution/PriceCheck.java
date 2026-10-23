import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// Price check with CompletableFuture: every shop lookup is a ticket you hand out now and read later.
// Picture: the post office asks all shops at once, attaches "voucher off" to each ticket,
// and reads the answers in input order — no matter which shop calls back first.
public class PriceCheck {

    static final int VOUCHER_CENTS = 100;

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        List<String> shops = new ArrayList<>();
        List<CompletableFuture<Integer>> tickets = new ArrayList<>();

        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < n; i++) {
                String[] parts = in.nextLine().trim().split(" ");
                String shop = parts[0];
                int cents = Integer.parseInt(parts[1]);
                shops.add(shop);
                // supplyAsync starts the lookup NOW on its own virtual thread and hands back a ticket.
                tickets.add(CompletableFuture.supplyAsync(() -> lookup(cents), executor)
                        // thenApply adds a next step: when the cents arrive, take the voucher off.
                        .thenApply(PriceCheck::afterVoucher));
            }

            // join waits for ONE ticket and unwraps its value; no checked exception, unlike get().
            // Joining in list order keeps input order: line i waits for ticket i only. Which
            // lookup finishes first does not matter, so every run prints the same lines.
            for (int i = 0; i < shops.size(); i++) {
                System.out.println(shops.get(i) + ": " + tickets.get(i).join());
            }
            printCheapest(shops, tickets);
        }
    }

    // The slow part: asking one shop for its price (the sleep stands for the network call).
    static int lookup(int cents) {
        try {
            Thread.sleep(10);   // a virtual thread parks while waiting; no heavy desk is blocked
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return cents;
    }

    // Math.max is the floor: the voucher can never push a price below 0.
    static int afterVoucher(int cents) {
        return Math.max(0, cents - VOUCHER_CENTS);
    }

    static void printCheapest(List<String> shops, List<CompletableFuture<Integer>> tickets) {
        if (shops.isEmpty()) {
            System.out.println("cheapest: (none)");
            return;
        }
        String cheapestShop = shops.get(0);
        int lowestPrice = tickets.get(0).join();
        for (int i = 1; i < shops.size(); i++) {
            int price = tickets.get(i).join();
            // Strict < keeps the FIRST shop when two prices tie.
            if (price < lowestPrice) {
                lowestPrice = price;
                cheapestShop = shops.get(i);
            }
        }
        System.out.println("cheapest: " + cheapestShop);
    }
}
