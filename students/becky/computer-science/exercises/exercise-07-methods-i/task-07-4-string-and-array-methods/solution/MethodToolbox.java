// Task 07_4: string and array utility methods with demo main.
public class MethodToolbox {

    static String padNumber(int value, int minWidth) {
        String text = String.valueOf(value);
        while (text.length() < minWidth) {
            text = "0" + text;
        }
        return text;
    }

    static int sum(int[] values) {
        int total = 0;
        for (int i = 0; i < values.length; i++) {
            total = total + values[i];
        }
        return total;
    }

    static int frequency(int[] values, int target) {
        int count = 0;
        for (int i = 0; i < values.length; i++) {
            if (values[i] == target) {
                count = count + 1;
            }
        }
        return count;
    }

    static boolean arraysEqual(double[] a, double[] b) {
        if (a.length != b.length) {
            return false;
        }
        final double tolerance = 0.000001;
        for (int i = 0; i < a.length; i++) {
            if (Math.abs(a[i] - b[i]) >= tolerance) {
                return false;
            }
        }
        return true;
    }

    static int[] range(int from, int to) {
        int[] result = new int[to - from + 1];
        for (int i = 0; i < result.length; i++) {
            result[i] = from + i;
        }
        return result;
    }

    static String joinInts(int[] values) {
        if (values.length == 0) {
            return "";
        }
        StringBuilder builder = new StringBuilder();
        builder.append(values[0]);
        for (int i = 1; i < values.length; i++) {
            builder.append(' ');
            builder.append(values[i]);
        }
        return builder.toString();
    }

    public static void main(String[] args) {
        System.out.println(padNumber(7, 3));
        System.out.println(padNumber(42, 5));

        int[] small = {1, 2, 3};
        System.out.println("sum: " + sum(small));

        int[] many = {1, 2, 2, 3, 2};
        System.out.println("count 2: " + frequency(many, 2));

        double[] left = {1.0, 2.0};
        double[] same = {1.0, 2.0};
        double[] swapped = {2.0, 1.0};
        System.out.println("equal: " + arraysEqual(left, same));
        System.out.println("equal: " + arraysEqual(left, swapped));

        System.out.println("range: " + joinInts(range(2, 5)));
        System.out.println("range: " + joinInts(range(7, 7)));
    }
}
