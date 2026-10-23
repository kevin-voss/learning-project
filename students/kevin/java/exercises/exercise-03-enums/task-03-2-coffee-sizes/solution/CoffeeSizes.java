import java.util.Scanner;

// Ideas: enum with fields and a constructor, values().
// Picture: the café shelf — three cups, and each cup carries its own volume and its own price.

// Each constant runs the constructor once, so code, volume and price travel with the cup.
enum Size {
    S("S", 200, 150),
    M("M", 300, 200),
    L("L", 400, 250);

    final String code;
    final int ml;
    final int priceCents;

    Size(String code, int ml, int priceCents) {
        this.code = code;
        this.ml = ml;
        this.priceCents = priceCents;
    }
}

public class CoffeeSizes {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        int total = 0;
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            String code = parts[0];
            int count = Integer.parseInt(parts[1]);
            Size size = find(code);
            if (size == null) {
                // Unknown codes are normal café life: report and carry on.
                System.out.println("unknown size: " + code);
            } else {
                int amount = count * size.priceCents;
                total += amount;
                System.out.println("order: " + count + " x " + code + " = " + amount + " cents");
            }
        }
        System.out.println("total: " + total + " cents");
    }

    // values() gives every constant in menu order; a code nobody has is simply not found.
    static Size find(String code) {
        for (Size s : Size.values()) {
            if (s.code.equals(code)) {
                return s;
            }
        }
        return null;
    }
}
