// Task 08_1: total gross price with VAT — three overloads.
public class TotalPriceWithVat {

    static double roundCommercial(double value, int decimalPlaces) {
        double factor = Math.pow(10, decimalPlaces);
        return Math.round(value * factor) / factor;
    }

    static double totalPrice(double unitPrice, int quantity, double vatPercent) {
        double gross = unitPrice * quantity * (1 + vatPercent / 100.0);
        return roundCommercial(gross, 2);
    }

    static double totalPrice(double unitPrice, int quantity) {
        return totalPrice(unitPrice, quantity, 19);
    }

    static double totalPrice(double unitPrice) {
        return totalPrice(unitPrice, 1, 19);
    }

    public static void main(String[] args) {
        System.out.println("3-arg: " + totalPrice(2.50, 4, 19));
        System.out.println("2-arg: " + totalPrice(10.00, 5));
        System.out.println("1-arg: " + totalPrice(8.00));
        System.out.println("round: " + totalPrice(1.11, 3, 7));
    }
}
