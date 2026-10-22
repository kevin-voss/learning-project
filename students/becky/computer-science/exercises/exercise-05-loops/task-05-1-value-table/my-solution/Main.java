public class Main {
    public static void main(String[] args) {
        int[] range = ValueInput.getRangeValues();

        int[][] values = MathFunctions.calculateValues(range[0], range[1]);
        MathFunctions.renderValuesAsTable(values);
    }
}