import java.util.Scanner;

// Task 03_3: what does a mobile phone tariff cost per year?
public class MobileTariff {
    public static void main(String[] args) {
        // The tariff from the sheet. All amounts are PER MONTH.
        final double MONTHLY_FEE = 9.95;         // EUR, the monthly base fee
        final int FREE_GB = 5;                   // GB included every month
        // TODO 1: Add the other tariff values as constants, too:
        //         the size of one data block in MB, its price in EUR,
        //         the free minutes, the price of one minute in EUR (careful: 9 CENT),
        //         and how many MB are in one GB.

        Scanner scanner = new Scanner(System.in);
        System.out.print("Data volume per month in GB: ");
        int gigabytes = scanner.nextInt();
        System.out.print("Phone minutes per month: ");
        int minutes = scanner.nextInt();

        // TODO 2: How many GB and how many minutes are used ON TOP of the free amount in ONE month?
        int extraGb = 0;
        int extraMinutes = 0;

        // TODO 3: How many 500-MB blocks are the extra GB? Turn GB into MB first (same unit!).
        int extraDataSteps = 0;

        // TODO 4: The bill for ONE month: fee + data blocks + extra minutes.
        double monthlyCost = MONTHLY_FEE;

        // TODO 5: The bill for a whole year.
        double yearlyCost = 0.0;

        // TODO 6: Without the part after the dot. Which cast cuts it off?
        int yearlyEuros = 0;
        System.out.println("Yearly cost: " + yearlyEuros + " EUR");

        // TODO 7: Try 3 GB with 100 minutes, then 5 GB with 50 minutes. Then answer the "Reflection" question
        //         from the task README here as a comment, in your own words.
    }
}
