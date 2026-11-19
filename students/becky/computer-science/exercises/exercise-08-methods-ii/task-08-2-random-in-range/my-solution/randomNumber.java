public class randomNumber {
    public static void main(String[] args) {
        int min = 10;
        int max = 20;

        //random Number with max and min incusive
        int Num = (int) ( Math.random()) * ( max - min + 1 ) + min; //nochmal Anschauen!!!
        
        System.out.println(Num);
    }
}
