import java.util.Scanner;

public class RevenueStatistics {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("How many months? ");
        int count = scanner.nextInt();

        if (count < 1) {
            System.out.println("Invalid month count.");
            return;
        }

        double[] revenue = new double[count];

        for (int month = 1; month <= count; month = month + 1) {
            System.out.print("Revenue for month " + month + ": ");
            revenue[month - 1] = scanner.nextDouble();
        }

        double sum = 0.0;
        double min = revenue[0];
        double max = revenue[0];

        for (int i = 0; i < count; i = i + 1) {
            sum = sum + revenue[i];
            if (revenue[i] < min) {
                min = revenue[i];
            }
            if (revenue[i] > max) {
                max = revenue[i];
            }
        }

        double average = sum / count;

        System.out.println("Period size: " + count);
        System.out.println("Total revenue: " + sum);
        System.out.println("Minimum monthly revenue: " + min);
        System.out.println("Maximum monthly revenue: " + max);
        System.out.println("Average monthly revenue: " + average);
    }
}
