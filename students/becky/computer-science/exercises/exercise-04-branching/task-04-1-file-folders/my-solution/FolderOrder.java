import java.util.Locale;
import java.util.Scanner;

// Task 04_1: price for an order of file folders.
public class FolderOrder {
    public static void main(String[] args) {
        // Numbers from the task. "final" = they never change.
        final double LIST_PRICE = 9.99;           // one folder, in EUR                 // 19 % VAT
        final double SHIPPING = 99.99;            // shipping costs
        final double FREE_SHIPPING_ABOVE = 1000.0;

        Scanner scanner = new Scanner(System.in);

        System.out.println("How many folders? ");
        int quantity = scanner.nextInt();
        double priceWithoutDiscount = quantity * LIST_PRICE;

        double priceWithVAT;
       
        if(quantity >= 200) { //5% discount
            double discount = (priceWithoutDiscount * 5) / 100;
            System.out.println("Your discount: " + discount + "EUR");

            double priceWithDiscount = priceWithoutDiscount - discount;
            System.out.println("Price without VAT:" + priceWithDiscount + "EUR");

            double VAT = (priceWithDiscount * 19) / 100;
            priceWithVAT = priceWithDiscount + VAT;  
            System.out.println("Your Prize with VET: " + priceWithVAT + "EUR");
        } else if(quantity >= 100) { //3% discount
            double discount = (priceWithoutDiscount * 3) / 100;
            System.out.println("Your discount: " + discount + "EUR");

            double priceWithDiscount = priceWithoutDiscount - discount;
            System.out.println("Price without VAT: " + priceWithoutDiscount + "EUR");

            double VAT = (priceWithDiscount * 19) / 100;
            priceWithVAT = priceWithDiscount + VAT;  
            System.out.println("Your Prize with VET: " + priceWithVAT + "EUR");
        } else if(quantity >= 50) { //1% discount
            double discount = priceWithoutDiscount / 100;
            System.out.println("Your discount: " + discount + "EUR");

            double priceWithDiscount = priceWithoutDiscount - discount;
            System.out.println("Price without VAT: " + priceWithoutDiscount + "EUR");

            double VAT = (priceWithDiscount * 19) / 100;
            priceWithVAT = priceWithDiscount + VAT;  
            System.out.println("Your Prize with VET: " + priceWithVAT + "EUR");
        } else {
            int quantityTillDiscount = 50 - quantity;
            System.out.println(quantityTillDiscount + "Folders are missing untill you get a discount!");
            System.out.println("Price without VAT: " + priceWithoutDiscount + "EUR");

            double VAT = (priceWithoutDiscount * 19) / 100;
            priceWithVAT = priceWithoutDiscount + VAT;  
            System.out.println("Your Prize with VET: " + priceWithVAT + "EUR");
        }

        if(priceWithVAT >= 1000) {
            double priceWithShippingcosts = priceWithVAT;
            System.out.println("Your price with shippingcosts" + priceWithShippingcosts + "EUR");
        } else {
            double priceWithShippingcosts = priceWithVAT + SHIPPING;
            System.out.println("Your price with shippingcosts" + priceWithShippingcosts + "EUR");
        }
        
        // TODO 5: Round total to 2 places (cents). Hint: Math.round(...) and 100.
        
    }
}
