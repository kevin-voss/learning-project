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
        double priceWithoutVat = euro * quantity;

        // calc of total vat:
        double totalVat = (priceWithoutVat / 100) * vat;

        //calc of totalPrice:
        double totalPrice = totalVat + priceWithoutVat;

        //calc of endPrice: (round commertionally)
        double endPrice = Math.round(totalPrice);

        System.out.println("Endpreis: " + endPrice);

        return  endPrice;
    }

    public static double totalPrice(double euro, int quantity) {
        int vat = 19;

        //calc of priceWithoutVat:
        double priceWithoutVat = euro * quantity;

        // calc of total vat:
        double totalVat = (priceWithoutVat / 100) * vat;

        //calc of totalPrice:
        double totalPrice = totalVat + priceWithoutVat;

        //calc of endPrice: (round commertionally)
        double endPrice = Math.round(totalPrice);

        System.out.println("Endpreis: " + endPrice);

        return  endPrice;
    }

    public static double totalPrice(double euro) {
        int vat = 19;
        int quantity = 1;

        //calc of priceWithoutVat:
        double priceWithoutVat = euro * quantity;

        // calc of total vat:
        double totalVat = (priceWithoutVat / 100) * vat;

        //calc of totalPrice:
        double totalPrice = totalVat + priceWithoutVat;

        //calc of endPrice: (round commertionally)
        double endPrice = Math.round(totalPrice);

        System.out.println("Endpreis: " + endPrice);


        return  endPrice;
    }
}
