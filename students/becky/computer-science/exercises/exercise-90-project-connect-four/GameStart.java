import java.util.Scanner;

public class GameStart {
    public static String[] characterChoice() {
        Scanner scanner = new Scanner(System.in);

        boolean correctUserInput = false;

        do {
            System.out.println("Player 1: \n please choose a colour, blue or red!");
            String player1Color = scanner.nextLine();
            String player2Color;
            correctUserInput = false;

            //check if playercolour equals red or blue 
            // and set colour for Player 2
            if (player1Color.equals("red")) {
                player2Color = "blue";
                String[] playerColors = { player1Color, player2Color };
                System.out.println("Player 1 = " + player1Color + "Player 2 = " + player2Color);
                
                scanner.close();
                
                return playerColors;
            } else if(player1Color.equals("blue")){
                player2Color = "red";
                String[] playerColors = { player1Color, player2Color };
                System.out.println("Player 1 = " + player1Color + "Player 2 = " + player2Color);
                
                scanner.close();
                
                return playerColors;
            } else {
                correctUserInput = true;
            }
        } while(correctUserInput); 

        scanner.close();
        String[] playerColors = {};
        return playerColors;
    }
}
