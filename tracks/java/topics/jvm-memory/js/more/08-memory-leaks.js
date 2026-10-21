// JVM & Memory, lesson 8: memory leaks in Java (a static list that keeps growing).
(function () {
  Java.addCoreLessons('jvm-memory', [
    {
      id: 'memory-leaks',
      title: 'Memory Leaks in Java',
      category: 'habits',
      icon: '💧',
      tagline: 'Reachable but never used again',
      realWorld: 'A fridge where nobody ever throws anything out. Every day new food goes in, old jars stay at the back "in case we need them". One day the door does not close any more.',
      kid: [
        'Every day you put your drawing on the fridge with a magnet. You never take one down.',
        'After a week the fridge is full of drawings. After a month there is no room for anything, not even a shopping list.',
        'Nobody looks at the old drawings any more. But they are still held by magnets, so nobody is allowed to throw them away.',
        'In Java the garbage collector is not allowed to take anything that a magnet still holds. A list that never lets go is a fridge full of old drawings.'
      ],
      definition: 'A **memory leak** in Java is memory held by objects that the program will never use again but that are still **reachable**. The garbage collector cannot free them, so the heap fills up over time.',
      explain: [
        'The garbage collector frees **unreachable** objects. It cannot know what you still *need*. If a reference to an object still exists somewhere, the object stays, even if no line of your code will ever look at it again.',
        'The most common leak is a collection that only grows. A `static` field is a GC root and lives as long as the program, so everything in a static list or map stays reachable for the whole run.',
        'A leak does not crash a program at once. It grows slowly: a server that handles one request per second may run fine for days. Then the heap is full, the GC runs again and again without finding garbage, the program gets slower, and finally the JVM throws `OutOfMemoryError: Java heap space`.',
        'The fix is always the same idea: **let go of what you no longer need**. Remove entries when you are done with them, keep only a limited number, or do not keep them at all.'
      ],
      why: 'Leaks are the one kind of memory bug that garbage collection cannot prevent. They are behind many crashes of long-running programs like servers and apps.',
      whenUse: 'Every time you add to a collection that lives long (a static field, a field of an object that lives the whole run): ask "when is this entry removed again?"',
      syntax: 'For every `list.add(x)` or `map.put(key, x)` on a long-lived collection there must be a `remove`, a `clear()`, or a size limit.',
      fileName: 'LeakDemo.java',
      code: `import java.util.ArrayList;
import java.util.List;

public class LeakDemo {
    // static: lives as long as the class, which means as long as the program
    static List<String> history = new ArrayList<>();

    static String handleRequest(int id) {
        String answer = "answer " + id;
        history.add(answer);          // the leak: every answer stays forever
        return answer;
    }

    public static void main(String[] args) {
        for (int round = 1; round <= 3; round++) {
            for (int i = 0; i < 100_000; i++) {
                handleRequest(i);
            }
            System.out.println("after round " + round + ": history holds " + history.size() + " strings");
        }
        System.out.println("None of them can be collected: the static list still points to all of them.");
    }
}`,
      output: `after round 1: history holds 100000 strings
after round 2: history holds 200000 strings
after round 3: history holds 300000 strings
None of them can be collected: the static list still points to all of them.`,
      codeSummary: 'Each "request" makes a String and adds it to a static list "for later". Nothing ever reads the list or removes from it. The list, and all its strings, grow with every request.',
      codeExplanation: [
        { label: 'Line 6', code: 'static List<String> history = new ArrayList<>();', text: 'A static field is a **GC root**. The list stays reachable for the whole run, and so does every element in it.' },
        { label: 'Line 9', code: 'String answer = "answer " + id;', text: 'A new String object on the heap for every request. Normally it would be garbage after `return`.' },
        { label: 'Line 10', code: 'history.add(answer);', text: 'The leak. The list now holds a reference to the string, so the string is reachable forever.' },
        { label: 'Line 11', code: 'return answer;', text: 'The frame and the local `answer` are gone, but the string is not: the list still points to it.' },
        { label: 'Line 16', code: 'for (int i = 0; i < 100_000; i++) {', text: '100,000 requests per round, like a busy day on a server.' },
        { label: 'Line 19', code: 'history.size()', text: 'Grows by 100,000 every round and never goes down. In a real server the rounds never end.' }
      ],
      sections: [
        {
          title: 'Why the GC cannot help',
          text: ['Follow the arrows from the roots. Every string has a path from the static field, so every string is reachable. To the GC, they all look needed.'],
          mermaid: 'flowchart LR\n  R["GC root: static field history"] --> L["ArrayList"]\n  L --> S1["answer 0"]\n  L --> S2["answer 1"]\n  L --> S3["answer 2"]\n  L --> S4["… 300,000 more"]\n  M["handleRequest frame: gone"]',
          diagramNote: 'The frame that made each string is long gone. The list alone keeps all of them alive.'
        },
        {
          title: 'Fix 1: keep only what you need',
          text: [
            'If the program really needs the latest answers, keep a fixed number. When the list grows past the limit, remove the oldest entry. The removed string loses its last arrow and becomes garbage.'
          ],
          code: `import java.util.ArrayList;
import java.util.List;

public class LeakFixed {
    static final int LIMIT = 5;                  // keep only the newest five
    static List<String> recent = new ArrayList<>();

    static String handleRequest(int id) {
        String answer = "answer " + id;
        recent.add(answer);
        if (recent.size() > LIMIT) {
            recent.remove(0);                    // drop the oldest: now it can be collected
        }
        return answer;
    }

    public static void main(String[] args) {
        for (int round = 1; round <= 3; round++) {
            for (int i = 0; i < 100_000; i++) {
                handleRequest(i);
            }
            System.out.println("after round " + round + ": recent holds " + recent.size() + " strings");
        }
        System.out.println("newest: " + recent);
    }
}`,
          fileName: 'LeakFixed.java',
          output: `after round 1: recent holds 5 strings
after round 2: recent holds 5 strings
after round 3: recent holds 5 strings
newest: [answer 99995, answer 99996, answer 99997, answer 99998, answer 99999]`,
          tip: 'The best fix is often the simplest: do you need the history at all? If not, delete the line `history.add(answer);`.'
        },
        {
          title: 'Fix 2: remove when you are done',
          text: [
            'A map of "open" things (logged-in users, open orders, running jobs) must lose an entry when the thing ends. Both maps below get the same logins. Only `tidy` removes the entry at logout.'
          ],
          code: `import java.util.HashMap;
import java.util.Map;

public class Sessions {
    static Map<String, String> leaky = new HashMap<>();
    static Map<String, String> tidy = new HashMap<>();

    public static void main(String[] args) {
        for (int day = 1; day <= 3; day++) {
            for (int user = 0; user < 1000; user++) {
                String id = "day" + day + "-user" + user;

                leaky.put(id, "cart data");   // login
                // ... the user shops, then logs out, but we forget to remove

                tidy.put(id, "cart data");    // login
                tidy.remove(id);              // logout: remove what we no longer need
            }
            System.out.println("day " + day + ": leaky holds " + leaky.size() + ", tidy holds " + tidy.size());
        }
    }
}`,
          fileName: 'Sessions.java',
          output: `day 1: leaky holds 1000, tidy holds 0
day 2: leaky holds 2000, tidy holds 0
day 3: leaky holds 3000, tidy holds 0`
        },
        {
          title: 'What a leak looks like when it runs out',
          text: [
            'This version never stops, like a real server. With a small heap (`-Xmx64m`) it fails in a fraction of a second; with a big default heap it could take hours. It needs the flag, so it is not run on this page. The output below is real, from our machine.',
            'The catch block first clears the list so that there is room to print. You will see more about catching memory errors in the next lesson.'
          ],
          code: `import java.util.ArrayList;
import java.util.List;

public class LeakForever {
    static List<String> history = new ArrayList<>();

    public static void main(String[] args) {
        long requests = 0;
        try {
            while (true) {                                  // a server never stops
                history.add("answer " + requests);          // and never forgets
                requests++;
                if (requests % 250_000 == 0) {
                    System.out.println("requests so far: " + requests);
                }
            }
        } catch (OutOfMemoryError e) {
            history.clear();                                // let go, so there is room to print
            System.out.println("OutOfMemoryError after " + requests + " requests: " + e.getMessage());
        }
    }
}`,
          fileName: 'LeakForever.java',
          noRun: true,
          output: `$ java -Xmx64m LeakForever
requests so far: 250000
requests so far: 500000
requests so far: 750000
requests so far: 1000000
OutOfMemoryError after 1066179 requests: Java heap space`,
          warn: 'In the GC log of a leak (`-Xlog:gc`) the number after the arrow keeps rising and `Pause Full` lines appear, for example `Pause Full (G1 Compaction Pause) 63M->63M(64M)`: a full collection that found nothing to free.'
        },
        {
          title: 'Where leaks hide',
          table: {
            head: ['Place', 'How it leaks', 'Fix'],
            rows: [
              ['a `static` list or map', 'grows with every call, lives the whole run', 'remove entries, limit the size, or do not store'],
              ['a cache', 'stores every answer "to be faster" and never forgets', 'a size limit; drop the oldest entries'],
              ['a map of open things', 'entries added at the start, never removed at the end', '`remove` in the same place where the thing ends'],
              ['listeners or callbacks', 'an object registers itself and never unregisters', 'unregister when the object is done'],
              ['a long-lived object holding a big one', 'one field keeps a huge array or list alive', 'set the field to `null` when you no longer need it']
            ],
            note: 'Local variables almost never leak: their frame disappears at `return`. Leaks live in fields of objects or classes that stay around.'
          }
        }
      ],
      technical: [
        'To find a leak in a real program you take a **heap dump**: a file with every object on the heap and who points to it. `-XX:+HeapDumpOnOutOfMemoryError` writes one automatically when the heap runs out; `jcmd <pid> GC.heap_dump file.hprof` writes one from a running JVM. Tools like Eclipse MAT or VisualVM then show which objects use the most memory and the path from a GC root to them.',
        '`jcmd <pid> GC.class_histogram` prints how many objects of each class are on the heap right now. Run it twice a few minutes apart: a class whose count only grows is a leak suspect.',
        'An `ArrayList` keeps an internal array. `clear()` sets every slot to `null`, so the elements become unreachable, but the array itself keeps its size. Only replacing the list (or `trimToSize()`) gives that memory back too.'
      ],
      tryIt: {
        steps: [
          'Save the example as `LeakDemo.java` and run `java LeakDemo.java`.',
          'Change the outer loop to `round <= 10` and run again.',
          'Now fix the leak: delete the line `history.add(answer);` and run once more.'
        ],
        see: 'The count grows by 100,000 every round, up to `1000000` after round 10. After the fix it stays at `0`: the strings become garbage right after each request.'
      },
      check: [
        { q: 'How can a program with a garbage collector have a memory leak?', a: 'The GC frees only unreachable objects. If a long-lived collection still points to objects that are never used again, they stay reachable, so the GC must keep them.' },
        { q: 'Why is a `static` collection especially risky?', a: 'A static field is a GC root that lives as long as the program. Everything in it stays reachable for the whole run unless you remove it.' },
        { q: 'Name two ways to fix a growing list.', a: 'Remove entries when they are no longer needed (or `clear()` the list), or keep only a fixed number and drop the oldest. Or do not store the values at all.' }
      ],
      keyPoints: [
        'A Java leak is reachable memory that is never used again.',
        'Static fields are GC roots: what they hold lives the whole run.',
        'Leaks grow slowly and end in `OutOfMemoryError: Java heap space`.',
        'Every `add` or `put` on a long-lived collection needs a `remove`, a `clear` or a size limit.',
        'A rising "after" number and many `Pause Full` lines in the GC log point to a leak.'
      ],
      commonMistakes: [
        'Storing results "in case we need them": `static List<Result> all = new ArrayList<>();` that only grows. Keep only what you will read again.',
        'A `put` at login without a `remove` at logout: `sessions.put(id, data);`. Add `sessions.remove(id);` where the session ends.',
        'Calling `System.gc()` to "fix" a leak: the objects are reachable, so the GC must keep them. Remove the references instead.',
        'Raising `-Xmx` to fix a leak: it only delays the crash. Find and remove the reference that keeps the objects alive.'
      ],
      related: ['gc', 'memory-errors', 'Collections']
    }
  ]);
})();
