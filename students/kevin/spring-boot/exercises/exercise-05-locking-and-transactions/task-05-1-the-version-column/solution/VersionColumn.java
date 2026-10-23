import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

// The version column, played by hand: one stock card, two editors, a stamp on every commit.
// Ideas: the lost update (two clerks, one pencil each — the last one wins silently) and
// optimistic locking. Row stands for the table row, Editor's copy for the entity a
// transaction loaded, the version check at COMMIT for what @Version does, and the stale
// message for the OptimisticLockException your controller maps to 409.
public class VersionColumn {

    // One table row: the value everyone sees plus the stamp that counts every write.
    static class Row {
        int stock = 10;
        int version = 1;
    }

    // What one editor holds after READ: the value and the version they read it at.
    // readVersion == null means: they have read nothing, so there is nothing to commit.
    static class Editor {
        String name;
        Integer readVersion;
        int value;

        Editor(String name) {
            this.name = name;
        }
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        Row row = new Row();
        Map<String, Editor> editors = new HashMap<>(Map.of("A", new Editor("A"), "B", new Editor("B")));

        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            Editor editor = editors.get(parts[0]);
            switch (parts[1]) {
                case "READ" -> {
                    editor.readVersion = row.version;   // copy the stamp together with the value
                    editor.value = row.stock;
                    System.out.println(editor.name + " reads stock=" + row.stock + " version=" + row.version);
                }
                case "SET" -> {
                    if (editor.readVersion == null) {
                        System.out.println(editor.name + " fails: nothing read");
                    } else {
                        editor.value = Integer.parseInt(parts[2]);   // only the local copy changes
                    }
                }
                case "COMMIT" -> {
                    if (editor.readVersion == null) {
                        System.out.println(editor.name + " fails: nothing read");
                    } else if (editor.readVersion == row.version) {
                        // Equal stamps: nobody wrote in between, so the write is safe.
                        row.stock = editor.value;
                        row.version = row.version + 1;   // every write leaves a newer stamp behind
                        System.out.println(editor.name + " commits stock=" + row.stock + " version=" + row.version);
                        editor.readVersion = null;   // copy cleared: the next commit needs a fresh READ
                    } else {
                        // The OptimisticLockException: someone wrote between our READ and our COMMIT.
                        System.out.println(editor.name + " fails: version " + editor.readVersion
                                + " is stale, row is at " + row.version);
                    }
                }
            }
        }
    }
}
