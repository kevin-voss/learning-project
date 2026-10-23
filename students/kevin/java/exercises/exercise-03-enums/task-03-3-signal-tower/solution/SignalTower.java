import java.util.Scanner;

// Ideas: an enum as the input menu, and a switch EXPRESSION — a switch that hands back a value.
// Picture: a vending machine. You press B4 and the machine hands you the item,
// while an ordinary switch only lights a lamp on the button.
enum Light {
    RED, YELLOW, GREEN
}

public class SignalTower {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            // valueOf turns the typed word into the enum constant: the menu guarantees it fits.
            Light light = Light.valueOf(parts[0]);
            int cars = Integer.parseInt(parts[1]);
            System.out.println(light + ": " + actionFor(light, cars));
        }
    }

    // A switch expression IS a value: the whole switch lands in the variable, like a method call.
    static String actionFor(Light light, int cars) {
        return switch (light) {
            // Arrow cases: one answer per constant, no break needed.
            case RED -> "stop";
            case GREEN -> "go";
            case YELLOW -> {
                // Several lines? Wrap them in { } and hand the answer back with yield.
                if (cars > 10) {
                    yield "clear";
                }
                yield "stop";
            }
            // No default: every constant of the menu has a case, so the switch is exhaustive.
        };
    }
}
