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
        try (Connection connection = connect();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet rows = statement.executeQuery()) {
            while (rows.next()) {
                parcels.add(toParcel(rows));
            }
        }
        return parcels;
    }

    // The parcel with this code, or null when there is none.
    public Parcel findByTrackingCode(String trackingCode) throws SQLException {
        String sql = "SELECT id, tracking_code, recipient, status FROM parcels WHERE tracking_code = ?";
        try (Connection connection = connect();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, trackingCode);   // fills the first ?
            try (ResultSet rows = statement.executeQuery()) {
                if (rows.next()) {
                    return toParcel(rows);
                }
                return null;
            }
        }
    }

    public void insert(String trackingCode, String recipient) throws SQLException {
        String sql = "INSERT INTO parcels (tracking_code, recipient, status) VALUES (?, ?, 'CREATED')";
        try (Connection connection = connect();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, trackingCode);
            statement.setString(2, recipient);
            statement.executeUpdate();
        }
    }

    // Returns how many rows changed: 1 if the parcel exists, 0 if not.
    public int updateStatus(String trackingCode, String status) throws SQLException {
        String sql = "UPDATE parcels SET status = ? WHERE tracking_code = ?";
        try (Connection connection = connect();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, status);
            statement.setString(2, trackingCode);
            return statement.executeUpdate();
        }
    }

    public int delete(String trackingCode) throws SQLException {
        String sql = "DELETE FROM parcels WHERE tracking_code = ?";
        try (Connection connection = connect();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, trackingCode);
            return statement.executeUpdate();
        }
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
