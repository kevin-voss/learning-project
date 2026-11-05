import java.util.Scanner;

public class FacultyLookup {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String[] faculties = { 
            "Fakultät 1 : Elektro und Informationstechnik", 
            "Fakultät 2 : Maschienenbau und Bioverfahren", 
            "Fakultät 3 : Medien, Information und Design", "Fakultät 4 : Wirtschaft und Informatik", 
            "Fakultät 5 : Diakonie, Gesundheit und Soziales"
        };
        
        System.out.println("Geben Sie bitte die Fakultätennummer ein: ");
        int facultyNumber = scanner.nextInt();
        
        if(facultyNumber < 1 || facultyNumber > 5){
            System.out.println("Die eingegebene Fakultät gibt es hier nicht!");
            scanner.close();
        } else {
            System.out.println(faculties[facultyNumber - 1]);
            scanner.close();
        }
    }
}
