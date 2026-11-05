// Task 07_2: end capital with rising interest rate per year.
public class CompoundInterest {

    static double endCapital(double capital, double startRatePercent, int years) {
        double rate = startRatePercent;
        for (int year = 0; year < years; year++) {
            capital = capital * (1 + rate / 100.0);
            rate = rate + 0.01;
        }
        return capital;
    }

    public static void main(String[] args) {
        System.out.println(endCapital(1000, 5, 1));
        System.out.println(endCapital(1000, 5, 2));
        System.out.println(String.format("%.3f", endCapital(500, 2.5, 3)));
        System.out.println("End capital: " + endCapital(200, 4, 0));
    }
}
