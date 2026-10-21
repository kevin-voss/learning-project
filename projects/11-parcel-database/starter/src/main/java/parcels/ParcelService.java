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
        // TODO step 6: a blank recipient throws new IllegalArgumentException("Recipient cannot be empty.")
        String code = "PP-" + (1000 + random.nextInt(9000));
        // TODO step 7: while repository.findByTrackingCode(code) is not null, pick a new code.
        repository.insert(code, recipient.trim());
        return code;
    }

    public void changeStatus(String trackingCode, String status) throws SQLException {
        // TODO step 7: refuse a status that is not in STATUSES (compare in upper case).
        //   Call repository.updateStatus. If it returns 0, the code does not exist: throw
        //   new IllegalArgumentException("No parcel with tracking code " + trackingCode + ".")
    }

    public void delete(String trackingCode) throws SQLException {
        // TODO step 7: call repository.delete. If it returns 0, throw like in changeStatus.
    }
}
