public class TriangleAngularCalc {
    public static void main(String[] args) {
        System.out.println("Please put in the length of a: ");
        double a = new java.util.Scanner(System.in).nextDouble();

        System.out.println("Please put in the length of b: ");
        double b = new java.util.Scanner(System.in).nextDouble();

        System.out.println("Please put in the length of c: ");
        double c = new java.util.Scanner(System.in).nextDouble();

        round(angularCalc(a, b, c));

    }

    public static double[] angularCalc(double a, double b, double c) {
         //calc of angularB:
         double angularA = (b * b + c * c - a * a) / (2 * b * c);

         //calc of angularB:
         double angularB = (a * a + c * c - b * b) / (2 * a * c);
 
         //calc of angularC:
         double angularC = (a * a + b * b - c * c) / (2 * a * b);

         double[] angulars = {angularA, angularB, angularC};
         
        return angulars;
    }

    public static double[] round(double[] angulars) {
        System.out.println("Please put in, on how many decimal places you want to round: ");
        int decimalPlaces = new java.util.Scanner(System.in).nextInt();

        for (int i = 0; i < angulars.length; i++) {
            double angular = angulars[i];

            angular = Math.pow(angular, decimalPlaces);
            angular = Math.round(angular);
            angular /= decimalPlaces;

            angulars[i] = angular;
        }

        return angulars;
    }
}
