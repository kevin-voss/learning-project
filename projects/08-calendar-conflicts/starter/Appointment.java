import java.time.LocalTime;

// One meeting: a title, a start time and an end time.
// The end is not part of the meeting: 10:00-11:00 and 11:00-12:00 do not overlap.
public class Appointment {

    private final String title;
    private final LocalTime start;
    private final LocalTime end;

    public Appointment(String title, LocalTime start, LocalTime end) {
        // TODO step 3: if end is not after start, throw
        //   new IllegalArgumentException("End must be after start.")
        this.title = title;
        this.start = start;
        this.end = end;
    }

    public String getTitle() {
        return title;
    }

    public LocalTime getStart() {
        return start;
    }

    public LocalTime getEnd() {
        return end;
    }

    // Two meetings overlap when each one starts before the other one ends.
    public boolean overlaps(Appointment other) {
        // TODO step 5: use isBefore twice, joined with &&.
        return false;
    }

    @Override
    public String toString() {
        return start + "-" + end + " " + title;
    }
}
