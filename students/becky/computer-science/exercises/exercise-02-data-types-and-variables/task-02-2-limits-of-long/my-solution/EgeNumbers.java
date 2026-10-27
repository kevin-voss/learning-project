public class EgeNumbers {
    // als Literal angezeigte höchste und niedrigster long möglich
    // höchster long: 9_223_372_036_854_775_807
    // niedrigster long: -9_223_372_036_854_775_808
    public static void main(String[] args) {
    Long minValue = -9_223_372_036_854_775_808L;
    Long maxValue = 9_223_372_036_854_775_807L;
    System.out.println("niedrigster long-wert:" + minValue + "höchster long-wert:" + maxValue);
    }
}