import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;

// All appointments of one day, plus the three reports: conflicts, busy blocks, free time.
public class Schedule {

    static final LocalTime DAY_START = LocalTime.of(8, 0);
    static final LocalTime DAY_END = LocalTime.of(20, 0);

    // How to put two appointments in order: the one that starts first comes first.
    static final Comparator<Appointment> BY_START = (a, b) -> a.getStart().compareTo(b.getStart());

    private final ArrayList<Appointment> appointments = new ArrayList<>();

    public void add(Appointment appointment) {
        appointments.add(appointment);
    }

    // A sorted copy. The original list keeps the order you typed.
    public ArrayList<Appointment> sorted() {
        ArrayList<Appointment> copy = new ArrayList<>(appointments);
        copy.sort(BY_START);
        return copy;
    }

    // Every pair that overlaps, once. j starts at i + 1, so no meeting meets itself.
    public ArrayList<String> conflicts() {
        ArrayList<Appointment> list = sorted();
        ArrayList<String> result = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            for (int j = i + 1; j < list.size(); j++) {
                if (list.get(i).overlaps(list.get(j))) {
                    result.add(list.get(i) + "  overlaps  " + list.get(j));
                }
            }
        }
        return result;
    }

    // Glue overlapping or touching meetings into one busy block.
    // 09:00-10:30 and 10:00-11:00 and 11:00-12:00 become 09:00-12:00.
    public ArrayList<Appointment> busyBlocks() {
        ArrayList<Appointment> blocks = new ArrayList<>();
        for (Appointment next : sorted()) {
            if (blocks.isEmpty()) {
                blocks.add(new Appointment("busy", next.getStart(), next.getEnd()));
                continue;
            }
            Appointment last = blocks.get(blocks.size() - 1);
            if (next.getStart().isAfter(last.getEnd())) {
                // A gap: the old block is finished, a new one starts.
                blocks.add(new Appointment("busy", next.getStart(), next.getEnd()));
            } else if (next.getEnd().isAfter(last.getEnd())) {
                // It touches or overlaps: make the last block longer.
                blocks.set(blocks.size() - 1, new Appointment("busy", last.getStart(), next.getEnd()));
            }
        }
        return blocks;
    }

    // The gaps between the busy blocks, inside 08:00-20:00.
    public ArrayList<String> freeWindows() {
        ArrayList<String> result = new ArrayList<>();
        LocalTime cursor = DAY_START;   // the first moment that is not known to be busy
        for (Appointment block : busyBlocks()) {
            if (block.getStart().isAfter(cursor) && cursor.isBefore(DAY_END)) {
                LocalTime freeEnd = block.getStart().isBefore(DAY_END) ? block.getStart() : DAY_END;
                result.add(cursor + "-" + freeEnd);
            }
            if (block.getEnd().isAfter(cursor)) {
                cursor = block.getEnd();
            }
        }
        if (cursor.isBefore(DAY_END)) {
            result.add(cursor + "-" + DAY_END);
        }
        return result;
    }
}
