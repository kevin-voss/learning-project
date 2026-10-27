public class Indentation { 
    public static void main(String[] args) { 
        
        System.out.println(); 
        System.out.println("A"); 
        { 
            System.out.println("B"); 
            System.out.println("C"); 
            { 
                System.out.println("D"); 
                { 
                    System.out.println("E"); 
                    System.out.println("F"); 
                    System.out.println("G"); 
                } 
                System.out.println("H"); 
            } 
        } 
        System.out.println("I"); { { 
            System.out.println("L"); 
        } } 
    }
} 