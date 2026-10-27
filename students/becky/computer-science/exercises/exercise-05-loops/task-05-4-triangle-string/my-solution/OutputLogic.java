public class OutputLogic {
    public static void terminalOutput(String word) {
        for(int i = 0; i < word.length; i++) { 
            System.out.println(word);
            word = word.length --;

        }
    }
}
