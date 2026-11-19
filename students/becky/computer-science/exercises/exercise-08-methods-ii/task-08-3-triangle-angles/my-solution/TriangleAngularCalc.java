public class TriangleAngularCalc {
    public static void main(String[] args) {
        System.out.println("Please put in the length of a: ");
        double a = new java.util.Scanner(System.in).nextDouble();

        System.out.println("Please put in the length of b: ");
        double b = new java.util.Scanner(System.in).nextDouble();

        System.out.println("Please put in the length of c: ");
        double c = new java.util.Scanner(System.in).nextDouble();

        double[] angulars = angularCalc(a, b, c);
        round(angulars);

    }

    public static double[] angularCalc(double a, double b, double c) {
        double cosA = (b * b + c * c - a * a) / (2 * b * c);
        double cosB = (a * a + c * c - b * b) / (2 * a * c);
        double cosC = (a * a + b * b - c * c) / (2 * a * b);

        if (cosA + cosB + cosC > 180) {
            System.out.println("Dies ist kein Dreieck!");
        }

        double[] angulars = {cosA, cosB, cosC};

        for (int i = 0; i <= angulars.length; i++) {
            System.out.prinln(angulars[i]);
        }
         
        return angulars;
    }

    public static void round(double[] angulars) {
        System.out.println("Please put in, on how many decimal places you want to round: ");
        int decimalPlaces = new java.util.Scanner(System.in).nextInt();

        for (int i = 0; i < angulars.length; i++) {
            double angular = angulars[i];

            angular = Math.pow(angular, decimalPlaces);
            angular = Math.round(angular);
            angular /= decimalPlaces;

            angulars[i] = angular;
        }
        //System.out.println(angulars);
    }
}