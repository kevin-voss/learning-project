public class MethodToolbox {
    public static void main(String[] args) {
        numToText();
        sum();
        numApperance();
    }

    public static String numToText() {
        System.out.println("Please put in your chosen Number: ");
        int num = new java.util.Scanner(System.in).nextInt();

        System.out.println("Please put in how many digits the number should have: ");
        int digits = new java.util.Scanner(System.in).nextInt();

        // Typumwandlung: 
        // String.valueOf(<Wert>) 
        // Integer.toString(<Wert>) 
        // "" + <Wert>
        String numString = String.valueOf(num);

        if(numString.length.equals(digits)) { // length of num & wigtis fit perfectly
             System.out.println(numString);
             return numString;   
        } else {
            //0 vorne dran
            }
        }
    }

    public static int sum(int[] nums) {
        int[] nums = int[5];

        for (int i = 0; i < 5; i++) { //create Array
            System.out.println("Please put in your Number" + (i +1) + ": ");
            int num = new java.util.Scanner(System.in).nextInt();

            nums[i] = num; 
        }

        int sum = 0;

        //calculate sum
        for (int i = 0; i < num.length; i++) { //num.length = 5, Arraylänge = 4
           sum += num[i];
        }

        return sum;

    }

    public static int numApperance(int num, int[] nums) {
        int[] nums = int[5];

        for (int i = 0; i < 5; i++){
            System.out.println("Please put your number" + (i + 1)": ");
            int num = new java.util.Scanner(System.in).nextInt();
        }
        
    }

    public static boolean comparisson(double[] nums1, double[] nums2) {

    }
}
