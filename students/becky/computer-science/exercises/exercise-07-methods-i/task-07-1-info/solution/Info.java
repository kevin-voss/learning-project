// Task 07_1: method info prints number, square and cube.
public class Info {
    static void info(int x) {
        System.out.println("Number = " + x);
        System.out.println("Square = " + (x * x));
        System.out.println("Cube = " + (x * x * x));
    }

    public static void main(String[] args) {
        info(1);
        info(2);
        info(3);
        info(0);
        info(-2);
    }
}
