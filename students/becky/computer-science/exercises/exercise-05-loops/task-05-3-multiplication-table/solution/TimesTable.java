// Task 05_3: print the small times table; mark square numbers with *.
public class TimesTable {
    public static void main(String[] args) {
        // Outer loop = first factor. Inner loop = second factor.
        for (int a = 1; a <= 10; a++) {
            for (int b = 1; b <= 10; b++) {
                int product = a * b;

                // Is product a square? (1, 4, 9, 16, …)
                int root = (int) Math.sqrt(product);
                boolean square = root * root == product;

                System.out.print(a + " x " + b + " = " + product);
                if (square) {
                    System.out.print("*");
                }
                System.out.println();
            }
        }
    }
}
