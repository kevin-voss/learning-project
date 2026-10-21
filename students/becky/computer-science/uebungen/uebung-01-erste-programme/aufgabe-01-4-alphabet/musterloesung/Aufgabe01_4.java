// Aufgabe 01_4: letters, new lines (\n) and tabs (\t).
// A backslash \ inside quotes means: "the next letter is a secret command, not text".
public class Aufgabe01_4 {

    public static void main(String[] args) {
        // a) Just the letters. No spaces, because spaces in quotes are printed too.
        System.out.println("ABCDEFGHIJKL");

        System.out.println();   // empty line between the parts

        // b) \n = jump to a new line. \t = jump to the next tab stop (a wide gap).
        System.out.println("ABC\nDEF\tGHI");

        System.out.println();

        // c) One println, three rows: \t before every letter, \n at the end of a row.
        //    The last row needs no \n, because println already ends the line.
        System.out.println("\tA\tB\tC\tD\n\tE\tF\tG\tH\n\tI\tJ\tK\tL");
    }
}
