public class TotalVet {
    public static void main(String[] args) {
        System.out.println("Please put in the prize per piece: ");
        double euro = new java.util.Scanner(System.in).nextDouble();

        totalPrice(euro);

        System.out.println("Please put in the quantity: ");
        int quantity = new java.util.Scanner(System.in).nextInt();

        totalPrice(euro, quantity);

        System.out.println("Please put in the vat in percent: ");
        int vat = new java.util.Scanner(System.in).nextInt();

        totalPrice(euro, quantity, vat);
    }

    public static double totalPrice(double euro, int quantity, int vat) {
        //calc of priceWithoutVat:
        double netto = euro * quantity;

        // calc of total vat:
        double totalVat = (netto / 100) * vat;

        //calc of totalPrice:
        double totalPrice = totalVat + netto;   //oder double brutto = (euro * quantity) * (1 + vat / 100.0);

        //calc of endPrice: (round commertionally)
        double endPrice = Math.round(totalPrice * 100) / 100.00;

        System.out.println("Endpreis: " + endPrice);

        return  endPrice;
    }

    public static double totalPrice(double euro, int quantity) {
        int vat = 19;

        return  totalPrice(euro, quantity, vat);
    }

    public static double totalPrice(double euro) {
        int vat = 19;
        int quantity = 1;

        return  totalPrice(euro, quantity, vat);
    }
}
