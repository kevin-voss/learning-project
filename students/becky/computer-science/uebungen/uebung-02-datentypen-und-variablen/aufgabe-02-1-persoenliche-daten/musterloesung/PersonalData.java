// Aufgabe 02_1: personal data in variables, then printed with a label.
// The values are made up (the sheet's own Donald Duck example).
public class PersonalData {

    public static void main(String[] args) {
        // Text -> String (double quotes).
        String firstName = "Donald";
        String lastName = "Duck";
        // Whole numbers -> int. 1934 and 1 easily fit into an int.
        int birthYear = 1934;
        // Exactly one character -> char (single quotes!).
        char gender = 'm';
        String studyProgramme = "Enteninformatik";
        int semester = 1;
        // Only yes or no -> boolean (true / false, no quotes).
        boolean firstDegree = true;
        // Money with cents -> double. A dot, never a comma.
        double lastMealPrice = 3.8;

        // "Label: " + box  glues the text and the value into one line.
        System.out.println("Vorname: " + firstName);
        System.out.println("Nachname: " + lastName);
        System.out.println("Geburtsjahr: " + birthYear);
        System.out.println("Geschlecht: " + gender);
        System.out.println("Studiengang: " + studyProgramme);
        System.out.println("Semester: " + semester);
        System.out.println("Erststudium: " + firstDegree);
        System.out.println("Mensa-Essen: " + lastMealPrice);
    }
}
