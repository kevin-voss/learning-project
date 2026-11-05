public class Main {
    public static void main(String[] args) {
        String[] playerColors = GameStart.characterChoice(); //String pos.1 = player 1; pos. 2 = player 2
        Gameboard.initialiseGameboard(); //output of Gameboard
        FieldChoice.playerChoice(); //Players choice of Field
        //drop a piece
        //winner logic
    }
}