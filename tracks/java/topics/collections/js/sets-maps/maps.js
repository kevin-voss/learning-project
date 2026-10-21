// Lesson: HashMap (key -> value).
(function () {
  Java.addCoreLessons('collections', [
    {
      id: 'maps',
      anim: 'postoffice',
      title: 'HashMap',
      category: 'practice',
      icon: 'Map',
      tagline: 'Look up values by key',
      realWorld: 'A wall of post boxes. Each box has a name on it. You go straight to the box called "Ada" and take out what is inside.',
      kid: [
        'In the post office there is a wall of little boxes. Every box has a name tag: Ada, Kai, Mina. When a letter for Kai comes, the postman puts it into the box with the tag "Kai".',
        'When Kai comes to pick up his post, nobody searches the whole wall. Kai goes straight to the box with his name. If a new letter for Kai comes, it replaces the old one in his box.',
        'If Leo asks for his box, there is none, and the postman says "nothing here". A `HashMap` is that wall of boxes: the name tag is the **key**, what is inside is the **value**.'
      ],
      definition: 'A **Map** stores pairs of **key** and **value**. Each key appears once and leads to exactly one value. `HashMap` is the most used Map: you `put` a pair in and `get` the value back by its key, very fast.',
      explain: [
        'You create it with two types: `Map<String, Integer> scores = new HashMap<>();`. The first type is for the keys (names), the second for the values (points). Read it as "Map from String to Integer".',
        '`put(key, value)` stores a pair. If the key is already there, the new value **replaces** the old one; the map never holds the same key twice. Values may repeat: Ada and Kai can both have 90 points.',
        '`get(key)` returns the value, or `null` when the key is missing. `null` means "no object here". `getOrDefault(key, fallback)` returns your fallback instead of `null`. `containsKey(key)` asks "is there a box with this name?".',
        '`remove(key)` takes a pair out, `size()` counts the pairs. To loop, you ask the map for its `entrySet()`: a set of **entries**, where each entry is one pair with `getKey()` and `getValue()`.',
        'Like `HashSet`, a `HashMap` promises no order. `LinkedHashMap` keeps the order you added the keys, `TreeMap` keeps the keys sorted.'
      ],
      why: 'Finding one thing among many by a name or id is everywhere: a user by email, a price by product, a word by its count. A Map finds it in one step instead of searching a whole list.',
      whenUse: 'Whenever you think "for each X, I know a Y": name to phone number, word to count, id to object.',
      syntax: 'Map<K, V> map = new HashMap<>();   map.put(key, value);   map.get(key);   map.getOrDefault(key, fallback);   map.containsKey(key);   map.remove(key);   for (Map.Entry<K, V> e : map.entrySet()) { e.getKey(); e.getValue(); }',
      fileName: 'MapDemo.java',
      code: `import java.util.HashMap;
import java.util.Map;

public class MapDemo {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Ada", 92);
        scores.put("Kai", 87);
        scores.put("Mina", 78);
        scores.put("Ada", 95);              // same key: replaces 92

        System.out.println(scores.get("Ada"));
        System.out.println(scores.get("Leo"));              // missing: null
        System.out.println(scores.getOrDefault("Leo", 0));
        System.out.println(scores.containsKey("Kai"));
        System.out.println("Size: " + scores.size());

        scores.remove("Mina");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}`,
      output: `95
null
0
true
Size: 3
Kai -> 87
Ada -> 95`,
      codeSummary: 'A score board: names are the keys, points are the values.',
      codeExplanation: [
        { label: 'Line 6', code: 'Map<String, Integer> scores = new HashMap<>();', text: 'Keys are Strings, values are Integers. The diamond takes both types from the left.' },
        { label: 'Line 7', code: 'scores.put("Ada", 92);', text: 'Stores the pair Ada -> 92. Autoboxing turns 92 into an `Integer`.' },
        { label: 'Line 10', code: 'scores.put("Ada", 95);              // same key: replaces 92', text: 'Ada is already a key, so 95 replaces 92. The map still has three pairs.' },
        { label: 'Line 12', code: 'System.out.println(scores.get("Ada"));', text: '`get` finds the value by its key in one step: 95.' },
        { label: 'Line 13', code: 'System.out.println(scores.get("Leo"));              // missing: null', text: 'There is no key Leo, so `get` returns `null`.' },
        { label: 'Line 14', code: 'System.out.println(scores.getOrDefault("Leo", 0));', text: 'Same question, but with a fallback: when the key is missing you get 0 instead of `null`.' },
        { label: 'Line 15', code: 'System.out.println(scores.containsKey("Kai"));', text: '`containsKey` only answers yes or no. There is also `containsValue`, but it is slow: it must look at every value.' },
        { label: 'Line 19', code: 'for (Map.Entry<String, Integer> entry : scores.entrySet()) {', text: '`entrySet()` gives all pairs. `Map.Entry<String, Integer>` is the type of one pair. The order comes from HashMap inside, not from `put`.' },
        { label: 'Line 20', code: 'System.out.println(entry.getKey() + " -> " + entry.getValue());', text: 'Each entry has `getKey()` and `getValue()`.' }
      ],
      sections: [
        {
          title: 'Keys lead to values',
          text: [
            'Every key has an arrow to exactly one value. Two keys can point to equal values. One key can never point to two values at once; the second `put` moves the arrow.',
            'You always travel from the key to the value. Going the other way ("who has 87 points?") means checking every pair.'
          ],
          mermaid: `flowchart LR
  K1["key: Ada"] --> V1["value: 95"]
  K2["key: Kai"] --> V2["value: 87"]
  K3["key: Mina"] --> V3["value: 87"]
  K4["key: Leo"] -.->|"no such key"| N["null"]`,
          diagramNote: 'Kai and Mina have the same value; that is fine. A missing key gives `null`.'
        },
        {
          title: 'Missing keys and the null trap',
          text: [
            '`get` returns an `Integer`, a box. For a missing key the box is `null`. Storing it in an `Integer` variable is fine. Storing it in an `int` makes Java unbox `null`, and that crashes with a `NullPointerException`.',
            'The output below is real. Java even says which call returned `null`.'
          ],
          fileName: 'MissingKey.java',
          code: `import java.util.HashMap;
import java.util.Map;

public class MissingKey {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Ada", 95);

        Integer maybe = scores.get("Leo");
        System.out.println("Leo as Integer: " + maybe);

        int leo = scores.get("Leo");   // unboxing null crashes
        System.out.println(leo);
    }
}`,
          output: `Leo as Integer: null
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "java.lang.Integer.intValue()" because the return value of "java.util.Map.get(Object)" is null
	at MissingKey.main(MissingKey.java:12)`,
          table: {
            head: ['You want', 'Write'],
            rows: [
              ['a value, or a safe fallback', '`map.getOrDefault(key, 0)`'],
              ['to know first whether the key exists', '`if (map.containsKey(key)) { ... }`'],
              ['to store only when the key is new', '`map.putIfAbsent(key, value)`']
            ]
          }
        },
        {
          title: 'Counting words with merge',
          text: [
            'The classic map job: count how often each word appears. The word is the key, the count is the value.',
            'Way 1 reads the old count with `getOrDefault(word, 0)` and puts back one more. Way 2 uses `merge(word, 1, Integer::sum)`: "if the word is new, store 1; otherwise add 1 to the old value". `Integer::sum` is a method reference to the method that adds two numbers.',
            'At the end the program copies the map into a `TreeMap`, which keeps keys sorted, so the print is in A to Z order.'
          ],
          fileName: 'WordCount.java',
          code: `import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class WordCount {
    public static void main(String[] args) {
        String text = "the cat and the dog and the bird";
        String[] words = text.split(" ");

        // Way 1: getOrDefault + put
        Map<String, Integer> counts = new HashMap<>();
        for (String word : words) {
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }
        System.out.println("Way 1: " + new TreeMap<>(counts));

        // Way 2: merge does the same in one call
        Map<String, Integer> counts2 = new HashMap<>();
        for (String word : words) {
            counts2.merge(word, 1, Integer::sum);
        }
        System.out.println("Way 2: " + new TreeMap<>(counts2));
        System.out.println("How often 'the': " + counts2.get("the"));
    }
}`,
          output: `Way 1: {and=2, bird=1, cat=1, dog=1, the=3}
Way 2: {and=2, bird=1, cat=1, dog=1, the=3}
How often 'the': 3`,
          tip: 'A map prints in curly braces as `{key=value, ...}`. A list prints in square brackets.'
        },
        {
          title: 'Three ways to loop over a map',
          text: [
            '`keySet()` gives only the keys, `values()` only the values, `entrySet()` both. When you need key and value, use `entrySet()` or `forEach`, not `keySet()` plus `get` (that looks up each key twice).',
            '`forEach((name, price) -> ...)` takes a lambda with **two** inputs, in parentheses. This example uses a `LinkedHashMap`, so the loop keeps the order of `put`.'
          ],
          fileName: 'MapLoops.java',
          code: `import java.util.LinkedHashMap;
import java.util.Map;

public class MapLoops {
    public static void main(String[] args) {
        Map<String, Double> prices = new LinkedHashMap<>();
        prices.put("apple", 0.5);
        prices.put("bread", 2.2);
        prices.put("milk", 1.1);

        for (String name : prices.keySet()) {
            System.out.println("Key: " + name);
        }
        for (double price : prices.values()) {
            System.out.println("Value: " + price);
        }
        for (Map.Entry<String, Double> e : prices.entrySet()) {
            System.out.println(e.getKey() + " costs " + e.getValue());
        }
        prices.forEach((name, price) -> System.out.println(name + "=" + price));
    }
}`,
          output: `Key: apple
Key: bread
Key: milk
Value: 0.5
Value: 2.2
Value: 1.1
apple costs 0.5
bread costs 2.2
milk costs 1.1
apple=0.5
bread=2.2
milk=1.1`
        },
        {
          title: 'One key, many values',
          text: [
            'A key holds one value, but that value can be a whole list. `Map<String, List<String>>` maps a class name to all its pupils.',
            '`computeIfAbsent(key, k -> new ArrayList<>())` returns the list for the key, and first creates an empty one if the key is new. Then you `add` to it.'
          ],
          fileName: 'GroupPupils.java',
          code: `import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class GroupPupils {
    public static void main(String[] args) {
        String[][] pupils = { {"Ada", "1a"}, {"Kai", "1b"}, {"Mina", "1a"}, {"Leo", "1b"}, {"Zoe", "1a"} };

        Map<String, List<String>> byClass = new TreeMap<>();
        for (String[] pupil : pupils) {
            String name = pupil[0];
            String schoolClass = pupil[1];
            byClass.computeIfAbsent(schoolClass, k -> new ArrayList<>()).add(name);
        }
        System.out.println(byClass);
        System.out.println("Class 1a: " + byClass.get("1a").size() + " pupils");
    }
}`,
          output: `{1a=[Ada, Mina, Zoe], 1b=[Kai, Leo]}
Class 1a: 3 pupils`
        },
        {
          title: 'HashMap, LinkedHashMap, TreeMap',
          text: ['All three are `Map`s with the same methods. Like the Sets, they differ in the loop order.'],
          table: {
            head: ['Class', 'Loop order', 'Speed', 'Use it for'],
            rows: [
              ['`HashMap`', 'no promise', 'fastest', 'the normal case'],
              ['`LinkedHashMap`', 'the order keys were first put', 'almost as fast', 'output in input order'],
              ['`TreeMap`', 'keys sorted', 'a bit slower', 'sorted reports, `firstKey()`, `lastKey()`']
            ],
            note: 'Pick the interface `Map` for the variable and choose the class on the right side.'
          }
        }
      ],
      technical: [
        'A `HashMap` keeps an array of **buckets**. To store a key, it computes the key `hashCode()`, a number, turns that number into a bucket index and puts the pair there. To find the key again it computes the same index and only looks into that one bucket. The Deeper lesson "How HashMap Finds Things" draws this step by step.',
        'Each pair lives in a small `Node` object with four fields: the hash, the key, the value and a `next` reference for other pairs in the same bucket. `entrySet()` hands you these nodes as `Map.Entry` objects, so looping over entries costs no extra lookups.',
        '`merge(key, 1, Integer::sum)` does one lookup: if the key is missing it stores 1, otherwise it calls `Integer.sum(oldValue, 1)` and stores the result. The `getOrDefault` + `put` version does two lookups, which is fine for small programs.',
        'A `HashMap` allows one `null` key and `null` values. That makes `get` returning `null` ambiguous: missing key, or a stored `null`? `containsKey` tells the two apart. Many teams never store `null` in maps.'
      ],
      tryIt: {
        steps: [
          'Copy `WordCount.java`, compile and run it.',
          'Change the text to a sentence of your own with some repeated words.',
          'After the loop, print the most common word: loop over `counts2.entrySet()` and keep the entry with the biggest value.'
        ],
        see: 'your words in `{a=1, ...}` form, sorted, and the word with the highest count printed last.'
      },
      check: [
        { q: 'What happens on `map.put("Ada", 1)` when Ada is already a key?', a: 'The old value is replaced by 1. The map still has Ada only once.' },
        { q: 'Why can `int x = map.get("Leo");` crash?', a: 'For a missing key `get` returns `null`, and unboxing `null` into an `int` throws a `NullPointerException`.' },
        { q: 'What does `counts.merge(word, 1, Integer::sum)` do?', a: 'Stores 1 for a new word, or adds 1 to the existing count.' }
      ],
      keyPoints: [
        'A Map stores key -> value pairs; each key appears once.',
        '`put` on an existing key replaces the value.',
        '`get` returns `null` for missing keys; use `getOrDefault` or `containsKey`.',
        'Loop with `entrySet()` or `forEach((k, v) -> ...)`.',
        '`merge(key, 1, Integer::sum)` counts things in one line.'
      ],
      commonMistakes: [
        'Expecting `put` to keep both values of a key. Use `Map<String, List<String>>` with `computeIfAbsent`.',
        '`int score = map.get(name);` crashes for a missing name. Use `map.getOrDefault(name, 0)`.',
        'Looping with `for (String k : map.keySet())` and calling `map.get(k)` inside. Loop over `entrySet()` instead.',
        'Searching values with `containsValue` in a big map. Turn it around and make the thing you search for the key.'
      ],
      related: ['sets', 'hash-buckets', 'list-loop-remove', 'REST & HTTP']
    }
  ]);
})();
