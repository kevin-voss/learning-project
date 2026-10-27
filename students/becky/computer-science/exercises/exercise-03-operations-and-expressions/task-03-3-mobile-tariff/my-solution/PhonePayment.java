import java.util.Scanner;

public class PhonePayment {
    public static void main(String[] args) {
        double monthlyPayment = 9.95;

        int freeGb = 5;
        double costsPerGb = 2 * 2.95; //in €

        int freeMinutes = 100;
        double costPerMinute = 0.09; //in €

        Scanner scanner = new Scanner(System.in);


        System.out.println("Bitte monatliche Telefonminuten eigeben: ");
        int phonecallMinutes = 12 * scanner.nextInt();

        System.out.println("Bitte monatlich genutztes Datenvolumen eingeben: ");
        int usedDatavolume = 12 * scanner.nextInt();

        
        int extraMinutes = phonecallMinutes - freeMinutes;
        int extraDataVolume = usedDatavolume - freeGb;

        double additionalCosts = (extraMinutes * costPerMinute) + (extraDataVolume * costsPerGb);  
        double finCosts = 12 * monthlyPayment + additionalCosts;
        
        System.out.println("Gesamtkosten: " + additionalCosts);

        //lösung ist Falsch!!

        /* ohne if nicht fehlerlos machbar*/
    }
}
