// Task 01_2: this is the program from the sheet, exactly as messy as it is there.
// It already runs. Your job is to make it EASY TO READ, without changing what it prints.
//
// TODO 1: Put every { at the end of a line or on its own line, but never in the
//         middle of a line after other code (look at the line with "A").
// TODO 2: Put every } on its own line, straight below the start of its block.
// TODO 3: Indent: every time you go one box deeper, move 4 spaces to the right.
// TODO 4: Run it again. It must still print the same letters as before.
public class Task01_2 { 

    public static void main(String[] args) { 
        
        System.out.println("A"); { 
            System.out.println("B"); 
            System.out.println("C"); { 
                System.out.println("D"); { 
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
