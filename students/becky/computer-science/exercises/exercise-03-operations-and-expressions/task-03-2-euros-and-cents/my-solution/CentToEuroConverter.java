import java.util.Scanner;

public class CentToEuroConverter {
    //umrechnung von eur in ct: 1€ = 100ct also 1€ = 1*e² ct
    public static void main(String[] args) {
        System.out.println("Please enter the numbers of Cent.");
        int numbersOfCent = new Scanner(System.in).nextInt();

        //a) volle Eur und verbleibende ct Bsp: 15€; 99 Cent
        int fullEuro = numbersOfCent / 100;
        int restOfCents = numbersOfCent % 100;
        System.out.println("Euro: " + fullEuro + "Cent: " + restOfCents);

        //b) Eur mit Nachkommastellen Bsp: 15,99€
        double euroWithDecimalPlaces = numbersOfCent / 100.00;
        System.out.println("Euros with Decimal Places: " + euroWithDecimalPlaces + "€");

        //c) Eur Kaufmännisch gerundet Bsp: 16€
        int buisnessRound = (int) (euroWithDecimalPlaces + 0.5);
        System.out.println("Kaufmännisch gerundet: " + buisnessRound);
    }
}
