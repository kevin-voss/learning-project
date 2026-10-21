// Task 01_2: the same program as on the sheet, now cleanly indented.
// Rule: one { opens a box, the matching } closes it, and everything inside
// the box moves 4 spaces to the right. Java does not care, but your eyes do.
public class Task01_2 {

    public static void main(String[] args) {

        System.out.println("A");
        // This { is NOT part of println("A"). It opens a new, empty-handed box.
        {
            System.out.println("B");
            System.out.println("C");
            {
                System.out.println("D");
                {
                    System.out.println("E");
                    System.out.println("F");
                    System.out.println("G");
                }
                System.out.println("H");
            }
        }
        System.out.println("I");
        // "{ {" on the sheet = two boxes, one inside the other. Each gets its own line.
        {
            {
                System.out.println("L");
            }
        }
    }
}
