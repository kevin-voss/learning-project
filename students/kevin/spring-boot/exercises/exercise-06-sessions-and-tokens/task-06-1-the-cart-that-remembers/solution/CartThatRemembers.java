import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

// The cart that remembers: the server keeps one drawer per guest, the browser keeps only a number.
// Ideas: HttpSession and the JSESSIONID cookie — state on the server, an id in the browser.
// Map to the framework: the Map is the server's session store, Session is one HttpSession,
// the id is what the JSESSIONID cookie carries, and an unknown id is the 401 the filter answers.
public class CartThatRemembers {

    // One drawer on the server: who the guest is and what is in their cart.
    static class Session {
        String user;
        List<String> cart = new ArrayList<>();

        Session(String user) {
            this.user = user;
        }
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        // The session store: cookie number -> drawer. Nothing like it lives in the browser.
        Map<Integer, Session> sessions = new HashMap<>();
        int nextId = 1;   // the desk hands out 1, 2, 3 ... and never reuses a number

        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            switch (parts[0]) {
                case "LOGIN" -> {
                    int id = nextId++;
                    sessions.put(id, new Session(parts[1]));
                    // The set-cookie moment: the browser keeps the number, the server keeps the drawer.
                    System.out.println("set-cookie JSESSIONID=" + id + " for " + parts[1]);
                }
                case "LOGOUT" -> {
                    int id = Integer.parseInt(parts[1]);
                    if (sessions.remove(id) == null) {   // already gone, or never existed
                        System.out.println("401 no session " + id);
                    } else {
                        System.out.println("session " + id + " closed");
                    }
                }
                default -> {   // "<id> ADD <item>" and "<id> SHOW" both start with the id
                    int id = Integer.parseInt(parts[0]);
                    Session session = sessions.get(id);
                    if (session == null) {   // closed or unknown: no drawer, no guest
                        System.out.println("401 no session " + id);
                    } else if (parts[1].equals("ADD")) {
                        session.cart.add(parts[2]);   // the cart stays on the server
                    } else {   // SHOW
                        System.out.println("cart of " + session.user + ": " + session.cart);
                    }
                }
            }
        }
    }
}
