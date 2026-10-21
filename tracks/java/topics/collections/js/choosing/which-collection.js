// Lesson: choosing the right collection.
(function () {
  Java.addCoreLessons('collections', [
    {
      id: 'which-collection',
      title: 'Which Collection?',
      category: 'habits',
      icon: '?',
      tagline: 'List, Set or Map',
      realWorld: 'A shopping list keeps order and can say "milk" twice. A guest list has each name once. A phone book finds a number by name. That is List, Set and Map.',
      kid: [
        'You are tidying your room and have three containers. A long tube where balls roll in one after the other and stay in that order. A box with one hole per toy, so each toy fits only once. And a cupboard with name tags on the drawers.',
        'Marbles you want to keep in order? The tube. Your collection of different stickers? The box with one hole each. The toys of your friends, so you can give each one back to the right friend? The cupboard with the name tags.',
        'Picking a Java collection is the same game. Ask what you will do with the things, then pick the container that makes that job easy.'
      ],
      definition: 'Ask two questions. Do I look things up by a key? Then use a **Map**. Do I only care whether something is in the group, with no duplicates? Then use a **Set**. Everything else: start with a **List**.',
      explain: [
        'The questions come from what you **do** with the data, not from what the data is. The same names can live in a List (arrival order), a Set (who was here) and a Map (name to number of visits) in the same program.',
        'After choosing the interface, choose the class. The default classes are `ArrayList`, `HashSet` and `HashMap`. Swap in `LinkedHashSet` / `LinkedHashMap` for insertion order, `TreeSet` / `TreeMap` for sorted order, and `ArrayDeque` for a queue or stack.',
        'Write the interface on the left and the class on the right: `List<String> names = new ArrayList<>();`. Methods take and return the interface too: `static int count(List<String> words)`. Then any kind of list fits, and you can change the class in one place.',
        'A smell to watch for: a loop that walks a whole list to find one element by its id or name. That is a Map job. Another one: `if (!list.contains(x)) list.add(x);`. That is a Set job.'
      ],
      why: 'The right collection makes code short and fast. The wrong one leads to loops that search, duplicates that sneak in, and orders that change by surprise.',
      whenUse: 'Every time you create a collection, and again when a program gets slow or full of search loops.',
      syntax: 'List<T> list = new ArrayList<>();   Set<T> set = new HashSet<>();   Map<K, V> map = new HashMap<>();   Deque<T> queue = new ArrayDeque<>();',
      fileName: 'ClassRegister.java',
      code: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

public class ClassRegister {
    public static void main(String[] args) {
        // List: the order pupils arrived, duplicates possible
        List<String> arrivals = new ArrayList<>();
        arrivals.add("Kai");
        arrivals.add("Ada");
        arrivals.add("Kai");     // Kai left and came back
        arrivals.add("Mina");

        // Set: who was here at all, each name once, sorted
        Set<String> present = new TreeSet<>(arrivals);

        // Map: name -> how many times they arrived
        Map<String, Integer> visits = new HashMap<>();
        for (String name : arrivals) {
            visits.merge(name, 1, Integer::sum);
        }

        System.out.println("Arrival order: " + arrivals);
        System.out.println("First to arrive: " + arrivals.get(0));
        System.out.println("Present: " + present);
        System.out.println("Was Leo here? " + present.contains("Leo"));
        System.out.println("Kai arrived " + visits.get("Kai") + " times");
    }
}`,
      output: `Arrival order: [Kai, Ada, Kai, Mina]
First to arrive: Kai
Present: [Ada, Kai, Mina]
Was Leo here? false
Kai arrived 2 times`,
      codeSummary: 'The same four arrivals answer three different questions in three different collections.',
      codeExplanation: [
        { label: 'Line 11', code: 'List<String> arrivals = new ArrayList<>();', text: 'The question "in which order did they come?" needs order and allows Kai twice: a List.' },
        { label: 'Line 18', code: 'Set<String> present = new TreeSet<>(arrivals);', text: '"Who was here?" needs each name once. A TreeSet also sorts the names.' },
        { label: 'Line 21', code: 'Map<String, Integer> visits = new HashMap<>();', text: '"How often did X come?" is a lookup by name: a Map from name to count.' },
        { label: 'Line 23', code: 'visits.merge(name, 1, Integer::sum);', text: 'Counts each arrival, as in the HashMap lesson.' },
        { label: 'Line 27', code: 'System.out.println("First to arrive: " + arrivals.get(0));', text: 'Only the List knows positions.' },
        { label: 'Line 29', code: 'System.out.println("Was Leo here? " + present.contains("Leo"));', text: 'The Set answers "is X in here?" fast.' },
        { label: 'Line 30', code: 'System.out.println("Kai arrived " + visits.get("Kai") + " times");', text: 'The Map answers "what belongs to X?" in one step.' }
      ],
      sections: [
        {
          title: 'The decision in a picture',
          text: ['Start at the top and answer the questions. Most of the time you end at one of the three default classes.'],
          mermaid: `flowchart TD
  Q1{"Look things up by a key or id?"} -->|"yes"| M["Map: HashMap"]
  Q1 -->|"no"| Q2{"Duplicates wrong, or mostly asking contains?"}
  Q2 -->|"yes"| S["Set: HashSet"]
  Q2 -->|"no"| Q3{"Mostly add and take at the ends?"}
  Q3 -->|"yes"| D["Deque: ArrayDeque"]
  Q3 -->|"no"| L["List: ArrayList"]
  M -.->|"need order?"| M2["LinkedHashMap or TreeMap"]
  S -.->|"need order?"| S2["LinkedHashSet or TreeSet"]`,
          diagramNote: 'The dotted arrows: same interface, a class that adds order (insertion order or sorted).'
        },
        {
          title: 'The full comparison',
          text: ['"Fast" means the time does not grow with the size of the collection. "Slow" means it grows with the number of elements.'],
          table: {
            head: ['Question', 'ArrayList', 'HashSet', 'HashMap'],
            rows: [
              ['Keeps the order you added?', 'yes', 'no (LinkedHashSet: yes)', 'no (LinkedHashMap: yes)'],
              ['Sorted?', 'only after `sort`', 'no (TreeSet: yes)', 'no (TreeMap: yes)'],
              ['Duplicates allowed?', 'yes', 'no', 'keys no, values yes'],
              ['Get by position, `get(0)`?', 'yes, fast', 'no', 'no'],
              ['"Is X in here?"', 'slow: `contains` searches', 'fast', 'fast for keys: `containsKey`'],
              ['Find by key or id?', 'slow: loop', 'no', 'fast: `get(key)`'],
              ['Prints as', '`[a, b]`', '`[a, b]`', '`{a=1, b=2}`']
            ],
            note: 'Write the interface on the left: `List<String> names = new ArrayList<>();`. Then you can swap the class later.'
          }
        },
        {
          title: 'Interface on the left',
          text: [
            'A method that asks for a `List<String>` accepts every kind of list: an `ArrayList`, a `LinkedList`, a `List.of`. If it asked for `ArrayList<String>`, the other two would not compile.',
            'The method here uses a for-each loop, which every collection supports. It could even take a `Collection<String>`, and then a Set would fit too.'
          ],
          fileName: 'InterfaceLeft.java',
          code: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class InterfaceLeft {
    static int countLong(List<String> words) {
        int count = 0;
        for (String w : words) {
            if (w.length() > 4) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        List<String> a = new ArrayList<>(List.of("tiger", "cat", "giraffe"));
        List<String> b = new LinkedList<>(List.of("horse", "dog"));
        List<String> c = List.of("ant", "bee");

        System.out.println(countLong(a));
        System.out.println(countLong(b));
        System.out.println(countLong(c));
    }
}`,
          output: `2
1
0`
        },
        {
          title: 'Wrong vs right: finding a book by its id',
          text: [
            'The wrong way keeps all books in a List and searches it with a loop every time. With 3 books you do not notice. With a million books and many searches, the program crawls.',
            'The right way builds a Map once, from id to book. After that, every search is one `get`.'
          ],
          fileName: 'FindBook.java',
          code: `import java.util.HashMap;
import java.util.List;
import java.util.Map;

record Book(String id, String title) { }

public class FindBook {
    public static void main(String[] args) {
        List<Book> books = List.of(
            new Book("b1", "The Gruffalo"),
            new Book("b2", "Matilda"),
            new Book("b3", "The Hobbit"));

        // Wrong: search the whole list every time
        for (Book book : books) {
            if (book.id().equals("b3")) {
                System.out.println("Loop found: " + book.title());
            }
        }

        // Right: build a map once, then look up in one step
        Map<String, Book> byId = new HashMap<>();
        for (Book book : books) {
            byId.put(book.id(), book);
        }
        System.out.println("Map found: " + byId.get("b3").title());
        System.out.println("Unknown id: " + byId.get("b9"));
    }
}`,
          output: `Loop found: The Hobbit
Map found: The Hobbit
Unknown id: null`
        },
        {
          title: 'The rest of the toolbox',
          text: ['You now know the big three and their ordered cousins. A few more classes come up in real code.'],
          table: {
            head: ['Class', 'What it is', 'Picture'],
            rows: [
              ['`ArrayDeque`', 'queue and stack, fast at both ends', 'a bakery line, a pile of plates'],
              ['`PriorityQueue`', 'always hands out the smallest element first', 'an emergency room: most urgent first'],
              ['`TreeMap`', 'map with sorted keys, plus `firstKey()`, `floorKey(x)`', 'a dictionary'],
              ['`LinkedHashMap`', 'map that remembers insertion order', 'a guest book'],
              ['`List.of` / `Map.of`', 'fixed data that never changes', 'the menu on the wall']
            ],
            note: 'All of them live in `java.util` and follow the same interfaces, so everything you learned here carries over.'
          }
        }
      ],
      technical: [
        'Each interface describes **what** you can do; each class decides **how**, and so how fast. ArrayList: an array. LinkedList: a chain of nodes. HashSet and HashMap: an array of buckets chosen by `hashCode`. TreeSet and TreeMap: a sorted, self-balancing tree.',
        'Rough speeds for the main operations, as programmers write them: ArrayList `get(i)` is O(1), `contains` O(n). HashSet `contains` and HashMap `get` are O(1) on average. TreeSet and TreeMap operations are O(log n): for a million elements about 20 steps.',
        'Memory matters too. An ArrayList needs one reference per element. A HashMap needs a node object per pair (about 32 bytes) plus the bucket array. For millions of small numbers, a plain `int[]` beats any collection, because it has no boxes and no nodes.'
      ],
      tryIt: {
        steps: [
          'Copy `ClassRegister.java`, compile and run it.',
          'Add two more arrivals, one of them "Ada" again.',
          'Print `visits` and `present.size()`, and answer for yourself: why is `arrivals.size()` bigger than `present.size()`?'
        ],
        see: '6 arrivals but only 4 or fewer present names, because the Set keeps each name once while the List keeps every arrival.'
      },
      check: [
        { q: 'You store the high scores of a game and show the top 10 in order. List, Set or Map?', a: 'A List, sorted with a Comparator. Scores can repeat and order matters.' },
        { q: 'You need to know fast whether a user name is already taken. Which collection?', a: 'A `Set<String>` (HashSet), and ask `contains`.' },
        { q: 'You look up a product by its barcode many times a second. Which collection?', a: 'A `Map<String, Product>` (HashMap) from barcode to product.' }
      ],
      keyPoints: [
        'A bunch of things in order: List.',
        'Unique things, or fast "is it in here?": Set.',
        'Find by key: Map.',
        'Defaults: ArrayList, HashSet, HashMap. Ordered cousins: Linked… and Tree….',
        'Interface on the left, class on the right.'
      ],
      commonMistakes: [
        'Looping through a big list to find one id. Build a `Map` from id to element.',
        '`if (!list.contains(x)) list.add(x);` to avoid duplicates. Use a `Set`.',
        'Declaring `ArrayList<String> names` everywhere. Write `List<String> names` so any list fits.',
        'Picking `HashMap` and then expecting sorted output. Use `TreeMap`, or sort the keys.'
      ],
      related: ['why-collections', 'lists', 'sets', 'maps', 'Interfaces']
    }
  ]);
})();
