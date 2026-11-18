import java.util.Arrays;

public class mirror {
    public static void main(String[] args) {
        int[] array = {1, 2, 3, 4, 5};
        
        System.out.println(Arrays.toString(mirrorCopy(array)));
        System.out.println(Arrays.toString(mirrorOriginal(array)));
    }

    public static int[] mirrorCopy(int[] array) {
        int[] arrayCopy = new int[array.length];

        for(int i = 0; i < array.length; i++) {
            arrayCopy[array.length - 1 - i] = array[i];
            }
        return arrayCopy;
    }

    public static int[] mirrorOriginal(int[] array) {
        for(int i = 0; i < array.length; i++) {
                array[array.length - 1 - i] = array[i];
        }

        return array;
    }    
}
