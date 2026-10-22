public class MathFunctions {
    public static int[][] calculateValues(int min, int max) {
        int[][] values = new int[(max - min) + 1][2];
        int i = 0;

        for (int x = min; x <= max; x++) {
            int y = x * x + 3 * x - 1;
            values[i][0] = x;
            values[i][1] = y;
            i = i + 1;
        }

        return values;
    }

    public static void renderValuesAsTable(int[][] values) {
        for (int i = 0; i < values.length; i++) {
            int x = values[i][0];
            double y = values[i][1];
            System.out.println(x + "\t" + y);
        }
    }
}