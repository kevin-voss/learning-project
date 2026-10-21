// Lesson: immutable collections with List.of, Set.of, Map.of.
(function () {
  Java.addCoreLessons('collections', [
    {
      id: 'immutable',
      title: 'Immutable Lists and Maps',
      category: 'habits',
      icon: 'lock',
      tagline: 'List.of and Map.of cannot change',
      realWorld: 'The menu painted on the wall of a cafe. Everybody can read it, nobody can scribble a new dish on it. To change it, you paint a new wall.',
      kid: [
        'At school there is a poster with the days of the week. You can read it whenever you want: Monday, Tuesday, Wednesday. But you cannot add an eighth day. The poster is laminated.',
        'If you want your own list to draw on, you copy the poster onto a sheet of paper. Now you can write on your sheet, and the poster stays the same for everybody else.',
        'Java has laminated lists too. `List.of(...)` makes one. You can read it, but if you try to add something, Java stops your program right away.'
      ],
      definition: '`List.of(...)`, `Set.of(...)` and `Map.of(...)` create **immutable** collections: they can never change after they are made. Reading works as usual; `add`, `remove`, `set`, `put` and `sort` throw an `UnsupportedOperationException`.',
      explain: [
        '**Immutable** means "cannot be changed". The opposite is **mutable**. An `ArrayList` is mutable; a `List.of` list is immutable.',
        'They are the shortest way to write a fixed group: `List.of("Mon", "Tue", "Wed")` instead of an empty list and three `add` calls. `Map.of("cat", 4, "bird", 2)` takes key, value, key, value … (up to 10 pairs).',
        'If you need a changeable list with those first elements, copy it: `new ArrayList<>(List.of(...))`. You have seen this pattern in earlier lessons; now you know why.',
        'Immutable collections are stricter in two more ways: they do not allow `null` elements, keys or values, and `Set.of` and `Map.of` refuse duplicates with an `IllegalArgumentException`.',
        'Their loop order is deliberately mixed: `Set.of` and `Map.of` can print in a different order on every run of the program. That keeps people from relying on an order that was never promised. `List.of` keeps its order, like every list.'
      ],
      why: 'Data that should not change (days of the week, a config, the result a method hands out) is safer when nobody can change it by accident. The bug shows up at the first wrong `add`, not much later somewhere else.',
      whenUse: 'For constants and fixed test data, for values a method returns that callers must not change, and whenever you only need to read.',
      syntax: 'List<T> list = List.of(a, b, c);   Set<T> set = Set.of(a, b);   Map<K, V> map = Map.of(k1, v1, k2, v2);   List.copyOf(otherList);   new ArrayList<>(List.of(...));',
      fileName: 'FixedData.java',
      code: `import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class FixedData {
    public static void main(String[] args) {
        List<String> days = List.of("Mon", "Tue", "Wed");
        System.out.println(days + " size " + days.size());
        System.out.println("Second day: " + days.get(1));

        Map<String, Integer> legs = Map.of("cat", 4, "bird", 2, "spider", 8);
        System.out.println("Spider legs: " + legs.get("spider"));
        System.out.println("Knows fish? " + legs.containsKey("fish"));

        // Need to change it? Make a mutable copy.
        List<String> myDays = new ArrayList<>(days);
        myDays.add("Thu");
        System.out.println("Copy:     " + myDays);
        System.out.println("Original: " + days);
    }
}`,
      output: `[Mon, Tue, Wed] size 3
Second day: Tue
Spider legs: 8
Knows fish? false
Copy:     [Mon, Tue, Wed, Thu]
Original: [Mon, Tue, Wed]`,
      codeSummary: 'Fixed data with List.of and Map.of, and a mutable copy when you need to change it.',
      codeExplanation: [
        { label: 'Line 7', code: 'List<String> days = List.of("Mon", "Tue", "Wed");', text: 'An immutable list with three elements in one line. No import of `ArrayList` needed for it.' },
        { label: 'Line 9', code: 'System.out.println("Second day: " + days.get(1));', text: 'All reading methods work as usual: `get`, `size`, `contains`, `indexOf`, the for-each loop.' },
        { label: 'Line 11', code: 'Map<String, Integer> legs = Map.of("cat", 4, "bird", 2, "spider", 8);', text: 'Key, value, key, value. The program never prints the whole map, because the order of a `Map.of` can change between runs.' },
        { label: 'Line 12', code: 'System.out.println("Spider legs: " + legs.get("spider"));', text: '`get` works like on a HashMap.' },
        { label: 'Line 16', code: 'List<String> myDays = new ArrayList<>(days);', text: 'Copies the elements into a new, mutable `ArrayList`.' },
        { label: 'Line 17', code: 'myDays.add("Thu");', text: 'Changing the copy is fine.' },
        { label: 'Line 19', code: 'System.out.println("Original: " + days);', text: 'The original immutable list is untouched.' }
      ],
      sections: [
        {
          title: 'What happens when you try to change it',
          text: [
            'Reading works. The first change crashes the program with an `UnsupportedOperationException`: "this collection does not support that operation". The last `println` never runs.',
            'The output is real. The `at java.base/...` lines with their numbers can look different on another Java version; the last line points at line 7 of your file.'
          ],
          fileName: 'FixedCrash.java',
          code: `import java.util.List;

public class FixedCrash {
    public static void main(String[] args) {
        List<String> days = List.of("Mon", "Tue", "Wed");
        System.out.println("Reading works: " + days.get(0));
        days.add("Thu");
        System.out.println("never printed");
    }
}`,
          output: `Reading works: Mon
Exception in thread "main" java.lang.UnsupportedOperationException
	at java.base/java.util.ImmutableCollections.uoe(ImmutableCollections.java:159)
	at java.base/java.util.ImmutableCollections$AbstractImmutableCollection.add(ImmutableCollections.java:164)
	at FixedCrash.main(FixedCrash.java:7)`
        },
        {
          title: 'Mutable, read-only view, immutable copy',
          text: [
            'There are three different things here. `Collections.unmodifiableList(original)` is a **view**: a read-only window onto the original list. You cannot change it through the window, but when the original changes, the view shows it.',
            '`List.copyOf(original)` makes a real immutable **copy**. Later changes to the original do not reach it.'
          ],
          mermaid: `flowchart LR
  O["original: ArrayList (mutable)"]
  V["view: unmodifiableList"] -->|"looks through to"| O
  C["copy: List.copyOf"] -->|"copied once, then separate"| S["its own elements"]
  O -.->|"add c"| O`,
          diagramNote: 'The view has no elements of its own. The copy does.',
          fileName: 'ViewVsCopy.java',
          code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ViewVsCopy {
    public static void main(String[] args) {
        List<String> original = new ArrayList<>(List.of("a", "b"));
        List<String> view = Collections.unmodifiableList(original);
        List<String> copy = List.copyOf(original);

        original.add("c");

        System.out.println("original: " + original);
        System.out.println("view:     " + view);
        System.out.println("copy:     " + copy);
    }
}`,
          output: `original: [a, b, c]
view:     [a, b, c]
copy:     [a, b]`
        },
        {
          title: 'The half-fixed list: Arrays.asList',
          text: [
            'Older code often uses `Arrays.asList(...)`. It is a list **backed by an array**: you may `set` elements, because an array slot can change, but you may not `add` or `remove`, because an array cannot grow.',
            'This mix surprises people. In new code prefer `List.of` (nothing changes) or `new ArrayList<>(...)` (everything changes).'
          ],
          fileName: 'AsList.java',
          code: `import java.util.Arrays;
import java.util.List;

public class AsList {
    public static void main(String[] args) {
        List<String> colors = Arrays.asList("red", "green", "blue");
        colors.set(0, "pink");          // allowed
        System.out.println(colors);
        colors.add("black");            // not allowed: crashes
    }
}`,
          output: `[pink, green, blue]
Exception in thread "main" java.lang.UnsupportedOperationException
	at java.base/java.util.AbstractList.add(AbstractList.java:155)
	at java.base/java.util.AbstractList.add(AbstractList.java:113)
	at AsList.main(AsList.java:9)`
        },
        {
          title: 'Rules at a glance',
          text: ['The factory methods have a few rules that a plain `ArrayList` or `HashMap` does not have.'],
          table: {
            head: ['Rule', '`List.of`', '`Set.of`', '`Map.of`'],
            rows: [
              ['add / remove / put', 'crash', 'crash', 'crash'],
              ['`null` inside', '`NullPointerException`', '`NullPointerException`', '`NullPointerException`'],
              ['duplicates', 'allowed', '`IllegalArgumentException`', 'duplicate key: `IllegalArgumentException`'],
              ['loop order', 'as written', 'can change every run', 'can change every run'],
              ['how many', 'any number', 'any number', 'up to 10 pairs; more with `Map.ofEntries(Map.entry(k, v), ...)`']
            ],
            note: 'Print a `Set.of` or `Map.of` sorted when order matters: `new TreeSet<>(set)` or `new TreeMap<>(map)`.'
          }
        }
      ],
      technical: [
        '`List.of` returns objects of hidden classes inside `java.util.ImmutableCollections`, such as `List12` (for one or two elements) and `ListN` (for more). They store the elements in final fields or a final array and have no code to grow. Every changing method calls `uoe()`, which throws the exception you saw.',
        'Because they never change, these collections are small and safe to share between parts of a program, and between threads (several things running at the same time) without any locking.',
        '`Set.of` and `Map.of` use a random number, chosen once when the JVM starts (a **salt**), to decide the loop order. So the order is the same within one run but can differ on the next run. `HashSet` order is not random, but it is not promised either.',
        '"Immutable" is only one level deep. `List.of(new ArrayList<>())` cannot get new elements, but the `ArrayList` inside it can still be changed. Records and Strings inside are safe, because they cannot change either.'
      ],
      tryIt: {
        steps: [
          'Copy `FixedData.java`, compile and run it.',
          'Add `days.set(0, "Sun");` at the end of `main` and run.',
          'Replace that line by `System.out.println(Map.of("a", 1, "b", 2, "c", 3, "d", 4));` and run the program three times.'
        ],
        see: 'an `UnsupportedOperationException` in step 2, and in step 3 the same four pairs, possibly in a different order from run to run.'
      },
      check: [
        { q: 'What happens on `List.of(1, 2).add(3)`?', a: 'It throws an `UnsupportedOperationException`. `List.of` lists cannot change.' },
        { q: 'How do you get a changeable list that starts with "a" and "b"?', a: '`new ArrayList<>(List.of("a", "b"))`.' },
        { q: 'You call `Collections.unmodifiableList(list)` and then `list.add(x)`. Does the view show `x`?', a: 'Yes. A view looks through to the original. Use `List.copyOf(list)` for a separate copy.' }
      ],
      keyPoints: [
        '`List.of`, `Set.of`, `Map.of` make collections that never change.',
        'Every changing method throws `UnsupportedOperationException`.',
        'Copy into `new ArrayList<>(...)` or `new HashMap<>(...)` to change it.',
        'No `null`, and no duplicates in `Set.of` and `Map.of`.',
        'Never rely on the printed order of `Set.of` or `Map.of`.'
      ],
      commonMistakes: [
        '`List<String> names = List.of(); names.add("Ada");` crashes. Start with `new ArrayList<>()` when you plan to add.',
        'Printing `Map.of(...)` in a test and comparing the text. The order can change; compare with `get` or print a `TreeMap` copy.',
        '`Arrays.asList(...).add(x)` crashes although `set` works. Use `new ArrayList<>(Arrays.asList(...))`.',
        'Thinking `Collections.unmodifiableList(list)` freezes the data. It is only a read-only window; use `List.copyOf(list)`.'
      ],
      related: ['list-loop-remove', 'sorting', 'which-collection', 'Testing']
    }
  ]);
})();
