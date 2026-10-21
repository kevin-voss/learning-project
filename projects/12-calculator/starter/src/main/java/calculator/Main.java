package calculator;

import java.util.Scanner;

// The prompt loop. Type a calculation, or "exit".
public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        Parser parser = new Parser();

        while (true) {
            System.out.print("> ");
            if (!input.hasNextLine()) {
                break;   // the input ended (Ctrl+D)
            }
            String line = input.nextLine();
            if (line.trim().equals("exit")) {
                break;
            }
            try {
                System.out.println(parser.evaluate(line));
            } catch (IllegalArgumentException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}
