import java.util.Scanner;

public class FacultyLookup {
    public static void main(String[] args) {
        String[] faculties = {
            "Electrical Engineering and Information Technology",
            "Mechanical Engineering and Bioprocess Engineering",
            "Media, Information and Design",
            "Business and Computer Science",
            "Diaconia, Health and Social Affairs"
        };

        Scanner scanner = new Scanner(System.in);

        System.out.print("Faculty number: ");
        int number = scanner.nextInt();

        if (number >= 1 && number <= faculties.length) {
            System.out.println("Faculty name: " + faculties[number - 1]);
        } else {
            System.out.println("Invalid faculty number.");
        }
    }
}
