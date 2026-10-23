import java.util.Optional;
import java.util.Scanner;

// The self-carrying token: user.role.signature, and the signature is user+role reversed.
// Ideas: a JWT — the token carries who you are, the server keeps NO map and only checks the stamp.
// Map to the framework: verify() is the security filter (parse, check the signature, else 401),
// Principal is what lands in SecurityContextHolder, and the two handlers below are controllers
// reading @AuthenticationPrincipal.
public class SelfCarryingToken {

    // Who is calling: read straight out of the token, nothing looked up on the server.
    record Principal(String user, String role) {}

    // The stamp: reverse(user + role). Changing user or role changes the stamp, too.
    static String signature(String user, String role) {
        return new StringBuilder(user + role).reverse().toString();
    }

    // The filter: split the token, recompute the stamp, compare. Empty = no entry.
    static Optional<Principal> verify(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            return Optional.empty();   // not even the right shape
        }
        if (!signature(parts[0], parts[1]).equals(parts[2])) {
            return Optional.empty();   // the content was changed after signing
        }
        return Optional.of(new Principal(parts[0], parts[1]));
    }

    // Why the filter said no. A real filter writes the 401 itself; here main prints for it.
    static String rejectReason(String token) {
        return token.split("\\.").length == 3 ? "bad signature" : "bad token";
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());

        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            if (parts[0].equals("LOGIN")) {
                // Stamp the badge once; every later request is checked against the stamp alone.
                System.out.println("token " + parts[1] + "." + parts[2] + "." + signature(parts[1], parts[2]));
            } else {   // "GET /me <token>" or "GET /admin <token>"
                Optional<Principal> who = verify(parts[2]);
                if (who.isEmpty()) {
                    // The filter stops the request here: no handler ever sees a broken token.
                    System.out.println("401 " + rejectReason(parts[2]));
                } else if (parts[1].equals("/me")) {
                    Principal me = who.get();   // what @AuthenticationPrincipal hands the controller
                    System.out.println("200 " + me.user() + " (" + me.role() + ")");
                } else {   // /admin: same identity check, then the role decides
                    if (who.get().role().equals("admin")) {
                        System.out.println("200 welcome " + who.get().user());
                    } else {
                        System.out.println("403 forbidden");   // known, but this door is not for them
                    }
                }
            }
        }
    }
}
