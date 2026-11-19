import java.util.Arrays;

public class RandomArray {
    public static void main(String[] args) {
        Arrays.toString(arraySorting(createRandomizedIntArray()));
    }
                    
    public static int randomInt() {
        int min = 2;
        int max = 10;

        int num = (int) (Math.random() * (max - min + 1)) + min;

        System.out.println("random Number of Arraylength: " + num);
        
        return num; 
    }

    public static int[] createRandomizedIntArray() {
        int count = randomInt();
        int[] array = new int[count];

        for(int i = 0; i < count; i++) {
            int min = 0;
            int max = 100;

            int num = (int) (Math.random() * (max - min + 1) + min); //Korregieren!!
            array[i] = num;
        }

        System.out.println(Arrays.toString(array));
        
        return array;
    }

    public static int[] arraySorting(int[] array) {
        //Array Sortierung (Bubblesort)
        int[] sortedArray = array;

        //geht für jedes Element über die gesammte array
        for (int i = 0; i < sortedArray.length; i++) {
            for (int j = i; j < sortedArray.length; j++) {
                //check if following num is lower
                if(sortedArray[i] > sortedArray[j]) {
                    //Num exchange
                    int num = sortedArray[i];
                    sortedArray[i] = sortedArray[i + 1];
                    sortedArray[i + 1] = num;
                } 
            }
           
        }

        return sortedArray;
    }
}
