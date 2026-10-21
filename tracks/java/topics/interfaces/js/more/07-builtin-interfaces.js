// Interfaces, lesson 7: interfaces from the JDK a beginner meets (Comparable, Comparator, Runnable, Iterable).
(function () {
  Java.addCoreLessons('interfaces', [
    {
      id: 'builtin-interfaces',
      title: 'Interfaces Java Already Has',
      category: 'practice',
      icon: '⚙',
      tagline: 'Comparable, Comparator, Runnable, Iterable',
      realWorld: 'A sports day has ready-made rules: "line up by height", "start when the whistle blows", "walk through the line one by one". Any child who follows the rule can take part.',
      kid: [
        'The teacher says: "Line up from smallest to tallest." Two children stand back to back and compare: "I am smaller, I go first." That is **Comparable**: each child knows how to compare itself with another.',
        'Then the teacher says: "Now line up by birthday." The children cannot know this rule by themselves, so the teacher is the judge. That is a **Comparator**: a separate judge with its own rule.',
        'A **Runnable** is a job card: "do this when it is your turn". An **Iterable** is a line of children you can walk along, one after the other.'
      ],
      definition: 'The JDK (the Java library you get with Java) contains many interfaces. If your class implements one, JDK methods work with it: `Comparable` makes objects sortable, `Comparator` is a separate sorting rule, `Runnable` is a job to run, and `Iterable` makes a for-each loop possible.',
      explain: [
        'These interfaces are **generic**: they have a type in angle brackets, like `List<String>` from [Collections](../collections/index.html). `Comparable<Player>` means "a Player can be compared with another Player".',
        '`Comparable<T>` has one method: `int compareTo(T other)`. It answers "who comes first, me or other?" with a number: **negative** if `this` comes first, **zero** if both are equal, **positive** if `other` comes first. This order is called the **natural order**. `Collections.sort(list)`, `list.sort(null)`, `Collections.max(list)` and `TreeSet` all use it.',
        '`Comparator<T>` has the method `int compare(T a, T b)`. It is a separate object, so one class can have many orders: by name, by score, by age. You pass it to `list.sort(comparator)`. `String` and `Integer` already implement `Comparable`; that is why a `List<String>` sorts alphabetically without help.',
        '`Runnable` has one method, `void run()`: a piece of work without inputs or a result. You can call `run()` yourself, or give it to a `Thread`, which runs the job next to your main program (threads are a big topic of their own; here you only see the shape).',
        '`Iterable<T>` has the method `Iterator<T> iterator()`. An **iterator** walks through the elements: `hasNext()` asks "is there another one?", `next()` hands it over. Every class that implements `Iterable` can stand after the colon in a for-each loop, exactly like a `List`.'
      ],
      why: 'You plug your own classes into sorting, threads and loops that the JDK already wrote and tested.',
      whenUse: 'Comparable: your class has one obvious order. Comparator: you need another or several orders. Runnable: you hand a job to someone else. Iterable: your class holds a sequence people want to loop over.',
      syntax: '`class X implements Comparable<X> { public int compareTo(X other) { … } }` · `class ByY implements Comparator<X> { public int compare(X a, X b) { … } }`',
      fileName: 'Ranking.java',
      code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

record Player(String name, int score) implements Comparable<Player> {
    @Override
    public int compareTo(Player other) {
        // lower score first: negative, zero or positive
        return Integer.compare(this.score, other.score);
    }
}

public class Ranking {
    public static void main(String[] args) {
        List<Player> players = new ArrayList<>(List.of(
            new Player("Mia", 42),
            new Player("Leo", 17),
            new Player("Ava", 99)
        ));

        Collections.sort(players);           // uses compareTo
        System.out.println(players);

        Player first = players.get(0);
        Player second = players.get(1);
        System.out.println(first.name() + " vs " + second.name() + ": " + first.compareTo(second));
        System.out.println(Collections.max(players).name() + " has the top score");
    }
}`,
      output: `[Player[name=Leo, score=17], Player[name=Mia, score=42], Player[name=Ava, score=99]]
Leo vs Mia: -1
Ava has the top score`,
      codeSummary: 'A record implements `Comparable<Player>`, so `Collections.sort` and `Collections.max` know how to order players.',
      codeExplanation: [
        { label: 'Line 5', code: 'record Player(String name, int score) implements Comparable<Player> {', text: 'The record promises: "a Player can be compared with another Player". The type in `<>` says what it is compared with.' },
        { label: 'Line 7', code: 'public int compareTo(Player other) {', text: 'The only method of `Comparable`. `this` is one player, `other` the second one.' },
        { label: 'Line 9', code: 'return Integer.compare(this.score, other.score);', text: '`Integer.compare` returns a negative number, 0 or a positive number. Exactly what `compareTo` must return.' },
        { label: 'Line 15', code: 'List<Player> players = new ArrayList<>(List.of(', text: 'A changeable list. `List.of(…)` alone cannot be sorted, because it is read-only.' },
        { label: 'Line 21', code: 'Collections.sort(players);           // uses compareTo', text: 'The JDK sort calls `compareTo` many times to put the players in order. It does not know anything about scores.' },
        { label: 'Line 22', code: 'System.out.println(players);', text: 'Records print as `Player[name=…, score=…]`. Lowest score first.' },
        { label: 'Line 26', code: 'System.out.println(first.name() + " vs " + second.name() + ": " + first.compareTo(second));', text: 'Calls `compareTo` by hand: 17 vs 42 gives `-1`, meaning Leo comes first.' },
        { label: 'Line 27', code: 'System.out.println(Collections.max(players).name() + " has the top score");', text: '`Collections.max` also uses the natural order and finds the biggest player.' }
      ],
      sections: [
        {
          title: 'Reading the number of compareTo',
          table: {
            head: ['`a.compareTo(b)` returns', 'Meaning', 'Example'],
            rows: [
              ['negative (like `-1`)', '`a` comes before `b`', '`"apple".compareTo("banana")` → `-1`'],
              ['`0`', 'equal for sorting', '`Integer.compare(5, 5)` → `0`'],
              ['positive (like `1`)', '`a` comes after `b`', '`Integer.compare(9, 2)` → `1`']
            ],
            note: 'Only the sign matters. `"apple".compareTo("cherry")` returns `-2`; it still only means "before".'
          },
          warn: 'Do not write `return this.score - other.score;`. With very large or very negative numbers the subtraction overflows and gives the wrong sign. `Integer.compare` is always right.'
        },
        {
          title: 'Comparator: a separate judge',
          text: [
            'Players have one natural order (by score). To sort by name, write a second class that implements `Comparator<Player>`. Its `compare(a, b)` follows the same sign rule.',
            '`Comparator` also has ready **default methods**: `reversed()` turns any comparator around. Writing a whole class for a rule is long; the next lesson shows the short form with a lambda.'
          ],
          fileName: 'Judges.java',
          code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

record Player(String name, int score) {}

class ByName implements Comparator<Player> {
    @Override
    public int compare(Player a, Player b) {
        return a.name().compareTo(b.name());   // Strings are Comparable
    }
}

class ByScore implements Comparator<Player> {
    @Override
    public int compare(Player a, Player b) {
        return Integer.compare(a.score(), b.score());
    }
}

public class Judges {
    public static void main(String[] args) {
        List<Player> players = new ArrayList<>(List.of(
            new Player("Mia", 42), new Player("Leo", 17), new Player("Ava", 99)));

        players.sort(new ByName());
        System.out.println("by name:   " + players);
        players.sort(new ByScore().reversed());   // a default method
        System.out.println("top first: " + players);
    }
}`,
          output: `by name:   [Player[name=Ava, score=99], Player[name=Leo, score=17], Player[name=Mia, score=42]]
top first: [Player[name=Ava, score=99], Player[name=Mia, score=42], Player[name=Leo, score=17]]`
        },
        {
          title: 'Runnable: a job to run later',
          text: [
            '`Runnable` is the smallest useful interface: `void run()`. A class that implements it is a job. The code that **receives** the job decides when it runs.',
            'Here the job runs twice: once when `main` calls `run()` itself, once inside a `Thread`. `start()` begins the thread, and `join()` makes `main` wait until the thread is finished. `join()` may throw `InterruptedException`, a checked exception (see [Exceptions](../exceptions/index.html)), so `main` declares `throws InterruptedException`.'
          ],
          fileName: 'Jobs.java',
          code: `class Countdown implements Runnable {
    private final String who;
    Countdown(String who) { this.who = who; }

    @Override
    public void run() {
        for (int i = 3; i >= 1; i--) {
            System.out.println(who + ": " + i);
        }
    }
}

public class Jobs {
    public static void main(String[] args) throws InterruptedException {
        Runnable job = new Countdown("main");
        job.run();                          // run it now, ourselves

        Thread worker = new Thread(new Countdown("worker"));
        worker.start();                     // the thread calls run()
        worker.join();                      // wait until it is done
        System.out.println("all jobs done");
    }
}`,
          output: `main: 3
main: 2
main: 1
worker: 3
worker: 2
worker: 1
all jobs done`
        },
        {
          title: 'Iterable: make your class work in for-each',
          text: [
            'A for-each loop over any object needs only one thing: the object must implement `Iterable`. The compiler turns the loop into calls of `iterator()`, `hasNext()` and `next()`.'
          ],
          mermaid: `flowchart TD
  A["for (int n : countdown)"] --> B["it = countdown.iterator()"]
  B --> C{"it.hasNext()?"}
  C -- yes --> D["n = it.next()"]
  D --> E["run the loop body"]
  E --> C
  C -- no --> F["loop ends"]`,
          diagramNote: 'This is what the compiler writes for you. Your class supplies the iterator; the loop drives it.',
          fileName: 'Rocket.java',
          code: `import java.util.Iterator;

class CountdownIterator implements Iterator<Integer> {
    private int current;
    CountdownIterator(int start) { this.current = start; }

    @Override public boolean hasNext() { return current >= 1; }
    @Override public Integer next() { return current--; }
}

class Countdown implements Iterable<Integer> {
    private final int start;
    Countdown(int start) { this.start = start; }

    @Override
    public Iterator<Integer> iterator() {
        return new CountdownIterator(start);   // a fresh walker each time
    }
}

public class Rocket {
    public static void main(String[] args) {
        Countdown countdown = new Countdown(5);
        for (int n : countdown) {
            System.out.print(n + " ");
        }
        System.out.println("lift-off!");
    }
}`,
          output: '5 4 3 2 1 lift-off!'
        },
        {
          title: 'Interfaces you will meet everywhere',
          table: {
            head: ['Interface', 'Its method(s)', 'What it lets you do'],
            rows: [
              ['`Comparable<T>`', '`int compareTo(T other)`', 'natural order: `Collections.sort`, `TreeSet`, `Collections.max`'],
              ['`Comparator<T>`', '`int compare(T a, T b)`', 'any extra order: `list.sort(cmp)`, `cmp.reversed()`'],
              ['`Runnable`', '`void run()`', 'a job for a `Thread` or a timer'],
              ['`Iterable<T>` / `Iterator<T>`', '`iterator()` / `hasNext()`, `next()`', 'for-each loops over your own class'],
              ['`List<E>`, `Set<E>`, `Map<K, V>`', 'many', 'the collection types you already use'],
              ['`CharSequence`', '`length()`, `charAt(i)`', 'methods that accept `String` and `StringBuilder`'],
              ['`AutoCloseable`', '`void close()`', 'try-with-resources from [I/O Basics](../io-basics/index.html)']
            ],
            note: '`Comparable`, `Comparator` and `Runnable` have one abstract method each. That makes them functional interfaces, the topic of the next lesson.'
          }
        }
      ],
      technical: [
        'Generic interfaces like `Comparable<Player>` are checked by the compiler and then **erased**: in the bytecode the method is `compareTo(Object)`. The compiler adds a small hidden **bridge method** that casts the `Object` to `Player` and calls your `compareTo(Player)`.',
        '`Collections.sort` and `List.sort` use an algorithm called TimSort. It is **stable**: elements that compare as equal keep their old order. It calls `compareTo` or `compare` about n·log(n) times for n elements.',
        'A for-each over an `Iterable` compiles to a `while` loop with `iterator()`, `hasNext()` and `next()` (for arrays the compiler uses an index instead). The `Integer` from `next()` is **unboxed** to `int n` automatically.',
        '`new Thread(job).start()` asks the operating system for a new thread. The JVM then calls `job.run()` on that thread. Calling `run()` yourself does **not** make a thread; it is a normal method call.'
      ],
      tryIt: {
        steps: [
          'Run `Ranking.java`.',
          'Change `compareTo` so the **highest** score comes first: `return Integer.compare(other.score, this.score);`.',
          'Run again and look at the list and at the line with `compareTo`.',
          'Now add a `ByName` comparator (from the section) and call `players.sort(new ByName());` before printing.'
        ],
        see: 'first `Ava` (99), then `Mia`, then `Leo`, the comparison `Ava vs Mia: -1`, and with `ByName` the order Ava, Leo, Mia. Note that `Collections.max` now finds Leo, because "max" means "last in the order".'
      },
      check: [
        { q: 'What does it mean when `a.compareTo(b)` returns `5`?', a: '`a` comes after `b`. Only the sign matters; any positive number means "after".' },
        { q: 'When do you use a `Comparator` instead of `Comparable`?', a: 'When you need another order than the natural one, several orders, or an order for a class you cannot change.' },
        { q: 'What must a class implement so you can write `for (int n : countdown)`?', a: '`Iterable<Integer>`, with an `iterator()` method that returns an `Iterator<Integer>`.' }
      ],
      keyPoints: [
        '`Comparable` = "I know how to compare myself": `compareTo` returns negative, 0 or positive.',
        '`Comparator` = a separate judge; many judges for one class, and `reversed()` for free.',
        'Use `Integer.compare` and `String.compareTo` instead of subtraction.',
        '`Runnable` is a job with `run()`; a `Thread` calls it for you.',
        '`Iterable` makes your class work in a for-each loop.'
      ],
      commonMistakes: [
        'Raw types: `class Player implements Comparable` without `<Player>`. Then `compareTo` takes an `Object`. Fix: `implements Comparable<Player>` and `compareTo(Player other)`.',
        'Sorting a read-only list: `List.of(…).sort(…)` throws `UnsupportedOperationException`. Fix: `new ArrayList<>(List.of(…))`.',
        'Calling `worker.run()` and expecting a new thread. Fix: `worker.start()`.',
        'Returning `boolean` thinking: `return a.score() > b.score();` does not compile. Fix: return an `int` with `Integer.compare(…)`.'
      ],
      related: ['default-static-methods', 'lambdas', 'Collections', 'Exceptions']
    }
  ]);
})();
