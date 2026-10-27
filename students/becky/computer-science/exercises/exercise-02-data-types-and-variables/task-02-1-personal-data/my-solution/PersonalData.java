public class PersonalData {

    public static void main(String[] args) {
        String forename = "Rebecca";
        String name = "Booth";
        int yearOfBirt = 2003;
        char gender = 'w';
        String courseOfStudy = "Verwaltungsiformatik Fachrichtung Polizei";
        int currentSemester = 1;
        boolean firstDegree = true;
        double prizeOfLatestCanteenMeal = 2.8;

        System.out.print("Vorname:" + forename + "\nNachname:" +
            name + "\nGeburtstag:" + yearOfBirt + "\nGeschlecht" +
            "\nStudiengang:" + courseOfStudy + "\naktuelles Semester:" +
            currentSemester + "\nErststudium" + firstDegree +
            "\nPreis des letzten Mensaessens:" + prizeOfLatestCanteenMeal);
    }
}
