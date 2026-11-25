public class recusionTest {
    public static void main(String[] args) {
        String klausur = "Klausur";

        System.out.println(klausur.charAt(6));
        //System.out.println(klausur.charAt(7)); --> gibt ein Fehler, da Index out of bound!
        System.out.println(klausur.substring(6));
        System.out.println(klausur.substring(7)); //-> gibt keinen Fehler, da einfach weiter gezählt wird
        //System.out.println(klausur.substring(8)); --> gibt einen Fehler, da Länge out of bound!
    }
}
