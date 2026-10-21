package parcels;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

// The rules of the parcel business. No SQL here, no Scanner here.
public class ParcelService {

    static final List<String> STATUSES = List.of("CREATED", "PICKED_UP", "DELIVERED");

    private final ParcelRepository repository;
    private final Random random = new Random();

    public ParcelService(ParcelRepository repository) {
        this.repository = repository;
    }

    public ArrayList<Parcel> list() throws SQLException {
        return repository.findAll();
    }

    // Makes a new parcel with a fresh tracking code like PP-4821 and returns that code.
    public String create(String recipient) throws SQLException {
        if (recipient.isBlank()) {
            throw new IllegalArgumentException("Recipient cannot be empty.");
        }
        String code = "PP-" + (1000 + random.nextInt(9000));
        while (repository.findByTrackingCode(code) != null) {
            code = "PP-" + (1000 + random.nextInt(9000));   // taken, try another one
        }
        repository.insert(code, recipient.trim());
        return code;
    }

    public void changeStatus(String trackingCode, String status) throws SQLException {
        String upper = status.toUpperCase();
        if (!STATUSES.contains(upper)) {
            throw new IllegalArgumentException("Status must be one of " + STATUSES + ".");
        }
        if (repository.updateStatus(trackingCode, upper) == 0) {
            throw new IllegalArgumentException("No parcel with tracking code " + trackingCode + ".");
        }
    }

    public void delete(String trackingCode) throws SQLException {
        if (repository.delete(trackingCode) == 0) {
            throw new IllegalArgumentException("No parcel with tracking code " + trackingCode + ".");
        }
    }
}
