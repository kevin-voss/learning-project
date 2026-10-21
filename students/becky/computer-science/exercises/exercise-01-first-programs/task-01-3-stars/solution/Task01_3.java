// Task 01_3: the star picture from the sheet, one println per line.
// Spaces inside the quotes are printed too, so they push the stars to the right.
public class Task01_3 {

    public static void main(String[] args) {
        // Going up: the stars grow, no spaces in front.
        System.out.println("*");
        System.out.println("**");
        System.out.println("***");
        System.out.println("****");
        System.out.println("*****");
        // Going down: one star less AND one space more each line,
        // so the right edge stays in the same column.
        System.out.println(" ****");
        System.out.println("  ***");
        System.out.println("   **");
        System.out.println("    *");
    }
}
