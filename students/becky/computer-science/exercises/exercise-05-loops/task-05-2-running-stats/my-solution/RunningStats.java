import java.util.Scanner;

public class RunningStats {
    public static void main(String[] args) {
        int number;
        int count = 0;
        int sum = 0;
        double average;

        Scanner scanner = new Scanner(System.in);

        //keine Vorgeschriebene Anzahl an durchläufen also while-Schleife
        do {
            System.out.println("Please enter your next Number: ");
            number = scanner.nextInt();

            count ++;
            sum = number + sum;
            average = sum / count;

            System.out.println("Count: " + count);
            System.out.println("Sum: " + sum);
            System.out.println("Average: " + average);
        } while(number >= 0);
    }
}
