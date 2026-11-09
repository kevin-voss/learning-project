public class CompoundInterest {
    public static void main(String[] args) {
        capital();
    }

    public static double capital() {
        //Input
        System.out.println("Pleas put in your starting Capital: ");
        double startCapital = new java.util.Scanner(System.in).nextDouble();

        System.out.println("Pleas put in your starting interest rate in percent: ");
        double interestRate = new java.util.Scanner(System.in).nextInt(); 

        System.out.println("Pleas put in the duration in years: ");
        double duration = new java.util.Scanner(System.in).nextInt();

        double endCapital = 0.0;

        //calculation of end capital: 
        for(int c = 0; c <= duration; c++) {
            System.out.println("interest Rate: " + interestRate + "%");

            double interest = (startCapital / 100) * interestRate;
            System.out.println("interest Rate in Year " + c + ": " + interest + "EUR");

            endCapital = startCapital + interest;
            interestRate = interestRate + 0.01;
        }

        System.out.println("end Capital: " + endCapital + "EUR");
        return endCapital;

    }
}
