import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;

// Ideas: Optional as a return type, a frozen catalog, names that read like sentences.
// Picture: a gift box — the lookup hands back a box that either holds the city or
// is empty on purpose, so no hidden null can crash the caller.

public class CityLookup {

    // Map.of is a frozen catalog: nothing in it can be edited by mistake.
    private static final Map<String, String> CITIES = Map.of(
            "BER", "Berlin",
            "OSL", "Oslo",
            "ROM", "Rome",
            "PAR", "Paris"
    );

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        for (int i = 0; i < n; i++) {
            String code = in.nextLine().trim();
            // The gift box: open it on purpose — present means found, empty means missing.
            Optional<String> city = findCity(code);
            if (city.isPresent()) {
                System.out.println("found: " + city.get());
            } else {
                // The missing line repeats the code in uppercase, whatever arrived.
                System.out.println("missing: " + code.toUpperCase(Locale.ROOT));
            }
        }
    }

    /** Returns the city name, or empty when the code is unknown. Never null. */
    static Optional<String> findCity(String code) {
        // Uppercase first, so ber and BER land on the same catalog drawer.
        return Optional.ofNullable(CITIES.get(code.toUpperCase(Locale.ROOT)));
    }
}
