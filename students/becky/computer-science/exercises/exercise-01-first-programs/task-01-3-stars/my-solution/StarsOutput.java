public class StarsOutput {

    public static void main(String[] args) {
        //Hardcoded:

        System.out.println("*");
        System.out.println("**");
        System.out.println("***");
        System.out.println("****");
        System.out.println("*****");
        System.out.println(" ****");
        System.out.println("  ***");
        System.out.println("   **");
        System.out.println("    *");

        /* Dynamic with an for-loop
        What the for-loop should do:
        - inclining the stars, declining the stars
        - adding inclining spaces in front of the declining stars */
        int maxStars = 5;

        for (int i = 1; i <= maxStars; i++) {    // inclining Stars to maxStars
            System.out.println("*".repeat(i));
        }

        for (int i = maxStars - 1; i > 0; i--) { // declining the stars to 1
            int spaceCount = maxStars - i;

            System.out.print(" ".repeat(spaceCount));
            System.out.print("*".repeat(i));
            System.out.println();
        } 
    }
}
