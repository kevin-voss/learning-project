import java.util.Arrays;

// Task 08_4: mirror copy vs mirror in place.
public class MirrorArray {

    static int[] mirrorCopy(int[] source) {
        int[] result = new int[source.length];
        for (int i = 0; i < source.length; i++) {
            result[i] = source[source.length - 1 - i];
        }
        return result;
    }

    static void mirrorInPlace(int[] values) {
        for (int i = 0; i < values.length / 2; i++) {
            int j = values.length - 1 - i;
            int tmp = values[i];
            values[i] = values[j];
            values[j] = tmp;
        }
    }

    public static void main(String[] args) {
        int[] original = {1, 13, 3, 42, 5};
        int[] copySource = {1, 13, 3, 42, 5};
        int[] mirrored = mirrorCopy(copySource);
        System.out.println("original: " + Arrays.toString(original));
        System.out.println("after copy source: " + Arrays.toString(copySource));
        System.out.println("mirrored copy: " + Arrays.toString(mirrored));

        int[] inPlace = {1, 13, 3, 42, 5};
        mirrorInPlace(inPlace);
        System.out.println("in place: " + Arrays.toString(inPlace));
    }
}
