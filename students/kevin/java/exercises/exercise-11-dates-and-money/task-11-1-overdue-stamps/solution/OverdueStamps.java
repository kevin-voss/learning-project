import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Scanner;

// Ideas: LocalDate.parse, isAfter, ChronoUnit.DAYS.between.
// Picture: the counter clerk holds a parcel's two calendar pages and measures
// with a ruler how far the return day lies past the due day.

public class OverdueStamps {

    // The counter's price list: every late day costs 20 cents.
    static final int FEE_CENTS_PER_DAY = 20;

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        long totalFee = 0;
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            String title = parts[0];
            // LocalDate.parse reads one wall-calendar page straight from yyyy-MM-dd text.
            LocalDate due = LocalDate.parse(parts[1]);
            LocalDate returned = LocalDate.parse(parts[2]);
            long lateDays = countLateDays(due, returned);
            if (lateDays == 0) {
                System.out.println(title + ": on time");
            } else {
                System.out.println(title + ": late " + lateDays + " days");
                totalFee += lateDays * FEE_CENTS_PER_DAY;
            }
        }
        System.out.println("total fee: " + totalFee + " cents");
    }

    // isAfter asks the direction safely: only a return after the due day is late.
    // ChronoUnit.DAYS.between is the ruler; it walks month ends and leap days for us.
    static long countLateDays(LocalDate due, LocalDate returned) {
        if (!returned.isAfter(due)) {
            return 0;   // same day or earlier counts as on time
        }
        return ChronoUnit.DAYS.between(due, returned);
    }
}
