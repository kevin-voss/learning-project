import java.util.ArrayDeque;
import java.util.Queue;
import java.util.Scanner;

// The waiting line, played by hand: one stock card, one lock, and clerks queuing for it.
// Ideas: pessimistic locking (take the card off the shelf, the others wait) and the
// transaction boundary (pending changes become visible only at commit).
// Map to the framework: holder is the transaction that ran the SELECT ... FOR UPDATE,
// the FIFO line is the database's lock queue, and LOCK -> SET -> COMMIT is one
// @Transactional service method.
public class WaitingLine {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        int stock = 10;          // the committed value everyone sees
        int pending = stock;     // the holder's not-yet-published value
        String holder = null;    // who took the card off the shelf (nobody at the start)
        Queue<String> line = new ArrayDeque<>();   // FIFO: the first waiter is the next holder

        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            String editor = parts[0];
            switch (parts[1]) {
                case "LOCK" -> {
                    if (holder == null) {
                        holder = editor;            // the locking SELECT: the row is yours
                        pending = stock;
                        System.out.println(editor + " locks the row (SELECT ... FOR UPDATE)");
                    } else if (!holder.equals(editor) && !line.contains(editor)) {
                        line.add(editor);           // a clerk queues once, in arrival order
                        System.out.println(editor + " waits");
                    }
                    // holder again, or already in line: nothing to print
                }
                case "SET" -> {
                    if (editor.equals(holder)) {
                        pending = Integer.parseInt(parts[2]);   // write on your own copy first
                    } else {
                        System.out.println(editor + " fails: no lock");
                    }
                }
                case "COMMIT" -> {
                    if (!editor.equals(holder)) {
                        System.out.println(editor + " fails: no lock");
                        continue;
                    }
                    stock = pending;   // the UPDATE becomes visible to everyone, all at once
                    System.out.println(editor + " commits stock=" + stock);
                    holder = null;
                    if (!line.isEmpty()) {
                        holder = line.remove();     // the freed lock goes to the first waiter
                        pending = stock;
                        System.out.println(holder + " locks the row (after waiting)");
                    }
                }
            }
        }
    }
}
