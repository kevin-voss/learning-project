public class Main {
    static int number = 10;

    public static void main(String[] args) {
        System.out.println("Hello " + number);

        Cat charlie = new Cat();
        charlie.meow();
        
        Cat sunny = new Cat();
        sunny.meow();
    }
}
