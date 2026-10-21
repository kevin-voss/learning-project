import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;

// All appointments of one day, plus the three reports: conflicts, busy blocks, free time.
public class Schedule {

    static final LocalTime DAY_START = LocalTime.of(8, 0);
    static final LocalTime DAY_END = LocalTime.of(20, 0);

    // TODO step 4: a Comparator that puts the appointment that starts first first.
    //   (a, b) -> a.getStart().compareTo(b.getStart())
    static final Comparator<Appointment> BY_START = (a, b) -> 0;

    private final ArrayList<Appointment> appointments = new ArrayList<>();

    public void add(Appointment appointment) {
        appointments.add(appointment);
    }

    // A sorted copy. The original list keeps the order you typed.
    public ArrayList<Appointment> sorted() {
        ArrayList<Appointment> copy = new ArrayList<>(appointments);
        // TODO step 4: copy.sort(BY_START);
        return copy;
    }

    // Every pair that overlaps, once.
    public ArrayList<String> conflicts() {
        ArrayList<Appointment> list = sorted();
        ArrayList<String> result = new ArrayList<>();
        // TODO step 5: two loops. The outer one uses i, the inner one starts at j = i + 1.
        //   When list.get(i).overlaps(list.get(j)), add a line like
        //   list.get(i) + "  overlaps  " + list.get(j)
        return result;
    }

    // Glue overlapping or touching meetings into one busy block.
    public ArrayList<Appointment> busyBlocks() {
        ArrayList<Appointment> blocks = new ArrayList<>();
        // TODO step 6: go through sorted().
        //   The first one starts the first block.
        //   If the next one starts after the last block ends: it starts a new block.
        //   Otherwise: make the last block end at the later of the two ends.
        return blocks;
    }

    // The gaps between the busy blocks, inside 08:00-20:00.
    public ArrayList<String> freeWindows() {
        ArrayList<String> result = new ArrayList<>();
        LocalTime cursor = DAY_START;
        // TODO step 7: for every busy block:
        //   if it starts after cursor, cursor up to the block start is free;
        //   then move cursor to the block end (if that is later).
        //   At the end: if cursor is before DAY_END, cursor up to DAY_END is free.
        return result;
    }
}
