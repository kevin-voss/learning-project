import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Scanner;

// The diary survives in a file so tomorrow's run can read it back. Shows Path
// as the file's house address, Files.writeString as one click that saves the
// whole page, and Files.readAllLines as the page cut into one strip per line.

public class DiaryFile {

    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        // Build the whole file in memory first: one entry per line.
        String text = "";
        for (int i = 0; i < n; i++) {
            text = text + in.nextLine() + "\n";   // nextLine keeps the spaces
        }

        Path diary = Path.of("diary.txt");   // the address of the file, in this folder
        Files.writeString(diary, text);      // one call writes it; a new run replaces it

        // Count and lines come from the file on disk, not from the input.
        List<String> lines = Files.readAllLines(diary);
        System.out.println("wrote " + lines.size() + " lines");
        for (String line : lines) {
            System.out.println(line);
        }
    }
}
