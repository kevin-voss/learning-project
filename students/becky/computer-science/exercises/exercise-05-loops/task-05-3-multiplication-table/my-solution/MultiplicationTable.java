public class MultiplicationTable {
    public static void main(String[] args) {
        for(int i = 1; i <= 10; i++) {
            System.out.println("---------- " + i + "----------");
            System.out.println();
            for(int y = 1; y <= 10; y++) {
                int result = i * y;

                if(i == y) {
                    char star = '*';
                    System.out.println(i + "x" + y + "=" + result + star);
                }

                System.out.println(i + "x" + y + "=" + result);
            }
            System.out.println();
        }
        
    }
}
