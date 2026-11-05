import java.util.Scanner;

public class statistic {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Dieses Programm Ermittelt die Umsatzkennzahlen.");
        System.out.println("Bitte gebe die Anzahl der Monate ein, die für die Ermittlung berücksichtigt werden sollen.");

        int relevantMonth = scanner.nextInt();

        double[] monthlyTurnovers = new double[relevantMonth];
        double sumOfAllTurnovers = 0.0;
        double min = 0.0;
        double max = 0.0;

        for(int i = 0; i < relevantMonth; i++) {
            System.out.println("Wie viel Umsatz haben Sie im " + i + 1 + ". Monat an Umsatz gemcht?");
            double turnover = scanner.nextDouble();

            monthlyTurnovers[i] = turnover;
            sumOfAllTurnovers = sumOfAllTurnovers + turnover; 

            if (turnover < min) {
                min = turnover;
            } else if (min == 0) {
                min = turnover;
            }
            if  (turnover > max) {
                max = turnover;
            }
        }

        scanner.close();

        double avarage = sumOfAllTurnovers / relevantMonth;
        
        System.out.println();
        System.out.println("Größe des Betrachtungszeitraumes: " + relevantMonth);
        System.out.println("Der Gesammtumsatz: " + sumOfAllTurnovers);
        System.out.println("Der kleinste Monatsumsatz: " + min);
        System.out.println("Der größte Monatsumsatz: " + max);
        System.out.println("Der durchschnittliche Umsatz pro Monat: " + avarage);
    }
}
