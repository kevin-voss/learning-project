public class randomNumber {
    public static void main(String[] args) {
        int min = 10;
        int max = 20;

        //random Number with max and min incusive
        int Num = Math.random() * (max + 1 - min) + min; 
        
        System.out.println(Num);
    }
}
