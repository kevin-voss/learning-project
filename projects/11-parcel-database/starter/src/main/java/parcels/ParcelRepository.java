package parcels;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

// The repository is the only class that speaks SQL.
// Every method opens a connection, runs one statement, and closes everything again
// (try-with-resources closes them in reverse order, also when something fails).
public class ParcelRepository {

    private final String url;
    private final String user;
    private final String password;

    public ParcelRepository(String url, String user, String password) {
        this.url = url;
        this.user = user;
        this.password = password;
    }

    private Connection connect() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    public ArrayList<Parcel> findAll() throws SQLException {
        String sql = "SELECT id, tracking_code, recipient, status FROM parcels ORDER BY id";
        ArrayList<Parcel> parcels = new ArrayList<>();
        // TODO step 5: in one try (...) open the connection, prepare the statement, executeQuery().
        //   while (rows.next()) add toParcel(rows) to the list.
        return parcels;
    }

    // The parcel with this code, or null when there is none.
    public Parcel findByTrackingCode(String trackingCode) throws SQLException {
        String sql = "SELECT id, tracking_code, recipient, status FROM parcels WHERE tracking_code = ?";
        // TODO step 7: like findAll, but call statement.setString(1, trackingCode) before executeQuery().
        //   One row: return toParcel(rows). No row: return null.
        return null;
    }

    public void insert(String trackingCode, String recipient) throws SQLException {
        String sql = "INSERT INTO parcels (tracking_code, recipient, status) VALUES (?, ?, 'CREATED')";
        // TODO step 6: fill both ? with setString(1, ...) and setString(2, ...), then executeUpdate().
    }

    // Returns how many rows changed: 1 if the parcel exists, 0 if not.
    public int updateStatus(String trackingCode, String status) throws SQLException {
        String sql = "UPDATE parcels SET status = ? WHERE tracking_code = ?";
        // TODO step 7: fill the two ? and return statement.executeUpdate() (the number of changed rows).
        return 0;
    }

    public int delete(String trackingCode) throws SQLException {
        String sql = "DELETE FROM parcels WHERE tracking_code = ?";
        // TODO step 7: same shape as updateStatus.
        return 0;
    }

    // One row of the result -> one Parcel object.
    private Parcel toParcel(ResultSet rows) throws SQLException {
        return new Parcel(
                rows.getInt("id"),
                rows.getString("tracking_code"),
                rows.getString("recipient"),
                rows.getString("status"));
    }
}
