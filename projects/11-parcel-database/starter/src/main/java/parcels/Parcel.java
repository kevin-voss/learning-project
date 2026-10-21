package parcels;

// One row of the parcels table, as a Java object.
public class Parcel {

    private final int id;
    private final String trackingCode;
    private final String recipient;
    private final String status;

    public Parcel(int id, String trackingCode, String recipient, String status) {
        this.id = id;
        this.trackingCode = trackingCode;
        this.recipient = recipient;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public String getTrackingCode() {
        return trackingCode;
    }

    public String getRecipient() {
        return recipient;
    }

    public String getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return String.format("%3d  %-8s  %-12s %s", id, trackingCode, recipient, status);
    }
}
