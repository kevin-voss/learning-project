// Task 08_2: random int in inclusive range using Math.random().
public class RandomInRange {

    static int randomInRange(int a, int b) {
        return (int) (Math.random() * (b - a + 1)) + a;
    }

    public static void main(String[] args) {
        System.out.println("low only: " + randomInRange(5, 5));
        System.out.println("high only: " + randomInRange(10, 10));

        int ok = 0;
        for (int i = 0; i < 100; i++) {
            int value = randomInRange(5, 10);
            System.out.println(value);
            if (value >= 5 && value <= 10) {
                ok++;
            }
        }
        System.out.println("all in range: " + (ok == 100));
    }
}
