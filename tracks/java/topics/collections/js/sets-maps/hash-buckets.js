// Lesson (deeper): how HashMap and HashSet find things: hashCode, buckets, equals.
(function () {
  Java.addCoreLessons('collections', [
    {
      id: 'hash-buckets',
      title: 'How HashMap Finds Things',
      category: 'deeper',
      icon: '#',
      tagline: 'hashCode picks the bucket, equals picks the entry',
      realWorld: 'A library with shelves numbered by the first letter of the author. To find a book by "Kim" you walk to shelf K, not through the whole library.',
      kid: [
        'Imagine 16 drawers in a big cupboard. You have a magic rule: count the letters of a name in a special way and you get a drawer number. "Ada" always gives drawer 7, every single time.',
        'To put away the toy of Ada, you use the rule and drop it in drawer 7. To find it again, you use the rule again, open drawer 7, and there it is. You never open the other 15 drawers.',
        'Sometimes two names give the same drawer. That is fine: there are two toys in drawer 7, and you look at both name tags to pick the right one. That is all a `HashMap` does.'
      ],
      definition: 'A `HashMap` keeps an array of **buckets**. A key `hashCode()` (a number) decides which bucket a pair goes into, and `equals` finds the right pair inside that bucket. That is why both methods must agree for every key you use.',
      explain: [
        '`hashCode()` is a method every Java object has. It returns an `int` computed from the object. For a String it is computed from its letters, so equal Strings always have equal hash codes.',
        'The map turns that number into a bucket index between 0 and the number of buckets minus 1. It starts with 16 buckets. `put` puts the pair into its bucket; `get` computes the same index and looks only there.',
        'Two different keys can land in the same bucket; this is a **collision**. The bucket then holds a small chain of pairs, and the map calls `equals` on each key in that chain to find the exact one.',
        'This gives a rule, the **hashCode contract**: if `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` must be true. If it is broken, equal keys land in different buckets, and the map cannot find what you stored.',
        '`String`, `Integer` and all the wrapper classes follow the rule already. For your own classes, a **record** (from [Classes & Objects](../classes-and-objects/index.html)) writes correct `equals` and `hashCode` for you. A plain class does not.'
      ],
      why: 'Knowing about buckets explains three things beginners trip over: why HashMap is so fast, why its order looks random, and why your own class as a key "loses" values.',
      whenUse: 'Whenever you use your own class as a key in a `HashMap` or as an element of a `HashSet`, check that it has `equals` and `hashCode`, or make it a record.',
      syntax: 'bucket = spread(key.hashCode()) & (buckets - 1);   then inside the bucket: key.equals(storedKey)',
      fileName: 'Buckets.java',
      code: `import java.util.HashMap;
import java.util.Map;

public class Buckets {
    public static void main(String[] args) {
        String[] keys = {"Ada", "Kai", "Zoe", "Finn", "Eva"};
        int buckets = 16;

        for (String key : keys) {
            int hash = key.hashCode();
            int spread = hash ^ (hash >>> 16);     // mix high bits into low bits
            int index = spread & (buckets - 1);    // keep the last 4 bits: 0..15
            System.out.println(key + " hashCode " + hash + " -> bucket " + index);
        }

        Map<String, Integer> ages = new HashMap<>();
        for (String key : keys) {
            ages.put(key, key.length());
        }
        System.out.println(ages);   // printed in bucket order
    }
}`,
      output: `Ada hashCode 65662 -> bucket 15
Kai hashCode 75187 -> bucket 2
Zoe hashCode 90032 -> bucket 1
Finn hashCode 2189795 -> bucket 2
Eva hashCode 70064 -> bucket 1
{Zoe=3, Eva=3, Kai=3, Finn=4, Ada=3}`,
      codeSummary: 'The program computes the bucket of five keys the same way HashMap does, then shows that the map prints in bucket order.',
      codeExplanation: [
        { label: 'Line 7', code: 'int buckets = 16;', text: 'A new HashMap starts with 16 buckets. The number is always a power of two.' },
        { label: 'Line 10', code: 'int hash = key.hashCode();', text: 'Every String computes the same number from the same letters, on every run.' },
        { label: 'Line 11', code: 'int spread = hash ^ (hash >>> 16);     // mix high bits into low bits', text: '`>>> 16` moves the upper 16 bits down, `^` (XOR) mixes them into the lower bits. HashMap does this so keys that differ only in high bits still spread out.' },
        { label: 'Line 12', code: 'int index = spread & (buckets - 1);    // keep the last 4 bits: 0..15', text: '`buckets - 1` is 15, binary `1111`. `&` keeps only the last 4 bits, which gives a number from 0 to 15. This is a fast way to compute "remainder of division by 16".' },
        { label: 'Line 13', code: 'System.out.println(key + " hashCode " + hash + " -> bucket " + index);', text: 'Kai and Finn share bucket 2, Zoe and Eva share bucket 1: two collisions.' },
        { label: 'Line 16', code: 'Map<String, Integer> ages = new HashMap<>();', text: 'Now a real HashMap with the same keys.' },
        { label: 'Line 20', code: 'System.out.println(ages);   // printed in bucket order', text: 'The map prints bucket 1 first (Zoe, then Eva), then bucket 2 (Kai, then Finn), then bucket 15 (Ada). That is the "random-looking" HashMap order.' }
      ],
      sections: [
        {
          title: 'The path of get("Finn")',
          text: [
            'Every lookup takes the same few steps, however big the map is. Only the last step, checking the few keys in one bucket, depends on luck.'
          ],
          mermaid: `flowchart TD
  A["get(Finn)"] --> B["Finn.hashCode() = 2189795"]
  B --> C["mix bits and keep last 4: bucket 2"]
  C --> D["bucket 2 holds: Kai, Finn"]
  D --> E{"Kai equals Finn?"}
  E -->|"no"| F{"Finn equals Finn?"}
  F -->|"yes"| G["return 4"]`,
          diagramNote: 'Two `equals` calls instead of checking all keys. With a good hash code most buckets hold zero or one pair.'
        },
        {
          title: 'The buckets as a picture',
          text: [
            'Here are the 16 buckets after the five `put` calls, with the empty ones left out. Each bucket holds a short chain of pairs.',
            'When the map gets 75 percent full (12 pairs for 16 buckets), it doubles to 32 buckets and moves every pair to its new bucket. This is called **rehashing**, and it is another reason the order can change.'
          ],
          mermaid: `flowchart LR
  T["bucket array (16)"] --> B1["bucket 1"]
  T --> B2["bucket 2"]
  T --> B15["bucket 15"]
  T --> BX["other 13 buckets: empty"]
  B1 --> P1["Zoe = 3"] --> P2["Eva = 3"]
  B2 --> P3["Kai = 3"] --> P4["Finn = 4"]
  B15 --> P5["Ada = 3"]`,
          diagramNote: 'The arrows from pair to pair are the `next` references of the hidden `Node` objects.'
        },
        {
          title: 'Wrong vs right: your own class as a key',
          text: [
            'A plain class without `equals` and `hashCode` uses the versions from `Object`: two objects are "equal" only when they are the very same object. So two points with the same numbers count as two different elements.',
            'A record writes both methods from its fields. Two records with the same values are equal and have the same hash code, so the set keeps one.'
          ],
          fileName: 'EqualsMatters.java',
          code: `import java.util.HashSet;
import java.util.Set;

class PointClass {
    int x;
    int y;

    PointClass(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

record PointRecord(int x, int y) { }

public class EqualsMatters {
    public static void main(String[] args) {
        Set<PointClass> a = new HashSet<>();
        a.add(new PointClass(1, 2));
        a.add(new PointClass(1, 2));
        System.out.println("Class set size: " + a.size());
        System.out.println("Class contains (1,2)? " + a.contains(new PointClass(1, 2)));

        Set<PointRecord> b = new HashSet<>();
        b.add(new PointRecord(1, 2));
        b.add(new PointRecord(1, 2));
        System.out.println("Record set size: " + b.size());
        System.out.println("Record contains (1,2)? " + b.contains(new PointRecord(1, 2)));
    }
}`,
          output: `Class set size: 2
Class contains (1,2)? false
Record set size: 1
Record contains (1,2)? true`,
          tip: 'Writing `equals` and `hashCode` by hand is possible (your editor can generate them), but a record is the easy, correct way for "a value made of some fields".'
        },
        {
          title: 'Never change a key after you put it in',
          text: [
            'The bucket is chosen once, from the hash code at the moment of `put`. If you change a field the hash code depends on, the key now "belongs" to another bucket, but it still sits in the old one. `get` and `contains` look in the new bucket and find nothing.',
            'Strings, wrappers and records cannot be changed after creation (they are **immutable**), so they are safe keys. Avoid keys from classes whose fields you change later.'
          ],
          table: {
            head: ['Key type', 'Safe as a key?', 'Why'],
            rows: [
              ['`String`, `Integer`, `Long` …', 'yes', 'immutable, correct `equals` and `hashCode`'],
              ['a record with String / number fields', 'yes', 'fields are final, methods generated'],
              ['a plain class without `equals` / `hashCode`', 'only by identity', 'two equal-looking objects count as different'],
              ['a class whose fields you change', 'no', 'the key gets lost in the wrong bucket'],
              ['a `List` you keep adding to', 'no', 'its hash code changes with its content']
            ]
          }
        }
      ],
      technical: [
        '`String.hashCode()` is computed as `s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]` with `int` overflow. For "Ada": 65*31*31 + 100*31 + 97 = 65662. The String caches the result in a field, so it is computed only once per String object.',
        'Since Java 8, a bucket that collects more than 8 pairs (in a table of at least 64 buckets) turns its chain into a small sorted tree, so even a very bad hash code cannot make a lookup walk a long chain. A shrunk bucket turns back into a chain.',
        'The **load factor** 0.75 is the fill level that triggers doubling. `new HashMap<>(1000)` reserves enough buckets up front when you know the size, which avoids several rounds of rehashing.',
        '`Object.hashCode()`, used by classes that do not override it, is based on the identity of the object, not its fields. That is why two `PointClass` objects with the same numbers almost always land in different buckets and are never `equals`.'
      ],
      tryIt: {
        steps: [
          'Copy `Buckets.java`, compile and run it.',
          'Add `"Mina"` and `"Leo"` to the `keys` array and run again. Find their buckets in the output and in the printed map.',
          'In `EqualsMatters.java`, print `new PointRecord(1, 2)` and `new PointClass(1, 2)` with `System.out.println`.'
        ],
        see: 'each new key with its bucket number, the map printed in bucket order, `PointRecord[x=1, y=2]` for the record and something like `PointClass@1b6d3586` for the plain class.'
      },
      check: [
        { q: 'Which method picks the bucket, and which one picks the entry inside it?', a: '`hashCode()` picks the bucket, `equals()` finds the exact key inside it.' },
        { q: 'Two keys are `equals` but have different hash codes. What goes wrong?', a: 'They land in different buckets, so the map can store both and cannot find one with the other.' },
        { q: 'Why does a HashMap print in a strange order?', a: 'It prints bucket by bucket, and the bucket comes from the hash code, not from the order of `put`.' }
      ],
      keyPoints: [
        '`hashCode` chooses the bucket, `equals` chooses the key inside it.',
        'Equal objects must have equal hash codes.',
        'A new HashMap has 16 buckets and doubles when 75 percent full.',
        'Records, Strings and wrappers make safe keys; changed keys get lost.'
      ],
      commonMistakes: [
        'Using a plain class like `PointClass` as a key and wondering why `contains` says `false`. Make it a `record`, or write `equals` and `hashCode`.',
        'Overriding `equals` but not `hashCode`. Always both, or neither.',
        'Changing a field of a key object after `map.put(key, ...)`. Remove it first, change it, then put it back, or use immutable keys.',
        'Relying on the printed order of a `HashMap`. Use `LinkedHashMap` or `TreeMap` when order matters.'
      ],
      related: ['maps', 'sets', 'Classes & Objects', 'JVM Memory']
    }
  ]);
})();
