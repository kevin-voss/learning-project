import java.util.Scanner;

// Task 03_3: what does a mobile phone tariff cost per year?
public class MobileTariff {
    public static void main(String[] args) {
        // The tariff from the sheet. All amounts are PER MONTH.
        final double MONTHLY_FEE = 9.95;         // EUR, the monthly base fee
        final int FREE_GB = 5;                   // GB included every month
        final int MB_PER_GB = 1000;              // 1 GB = 1000 MB
        final int DATA_STEP_MB = 500;            // extra data is sold in blocks of 500 MB ...
        final double PRICE_PER_DATA_STEP = 2.95; // ... and one block costs 2.95 EUR
        final int FREE_MINUTES = 100;            // minutes included every month
        final double PRICE_PER_MINUTE = 0.09;    // 9 cent = 0.09 EUR
        final int MONTHS_PER_YEAR = 12;

        Scanner scanner = new Scanner(System.in);
        System.out.print("Data volume per month in GB: ");
        int gigabytes = scanner.nextInt();
        System.out.print("Phone minutes per month: ");
        int minutes = scanner.nextInt();

        // Step 1: what is used ON TOP of the free amount, in one month?
        // The free amounts are per month, so subtract them BEFORE going to a year.
        int extraGb = gigabytes - FREE_GB;
        int extraMinutes = minutes - FREE_MINUTES;

        // Step 2: GB -> MB -> number of 500-MB blocks. Same unit on both sides!
        // 2 extra GB = 2000 MB = 4 blocks. (int / int is fine: whole GB always make whole blocks.)
        int extraDataSteps = extraGb * MB_PER_GB / DATA_STEP_MB;

        // Step 3: the bill for ONE month. Java does * before +, like in maths.
        double monthlyCost = MONTHLY_FEE
                + extraDataSteps * PRICE_PER_DATA_STEP
                + extraMinutes * PRICE_PER_MINUTE;

        // Step 4: twelve months.
        double yearlyCost = monthlyCost * MONTHS_PER_YEAR;

        // Step 5: "without decimal places": (int) cuts off everything after the dot.
        // 119.4 -> 119. The sheet's table gives the same numbers.
        int yearlyEuros = (int) yearlyCost;
        System.out.println("Yearly cost: " + yearlyEuros + " EUR");

        // Reflection (why < 5 GB or < 100 minutes goes wrong) is answered in README.md.
    }
}
