public class Info {
    public static void main(String[] args) {
        info(1);
        info(3);
        info(10);
    }

    public static void info(int x) {
        //print the Number
        System.out.println("Number: " + x);

        //print the Square
        System.out.println("Square: " + x * x);

        //print the cube
        System.out.println("Cube: " + x * x * x);

        System.out.println();
    }
}
