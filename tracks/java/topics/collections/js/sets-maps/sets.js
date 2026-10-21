// Lesson: HashSet, LinkedHashSet, TreeSet.
(function () {
  Java.addCoreLessons('collections', [
    {
      id: 'sets',
      title: 'HashSet',
      category: 'practice',
      icon: 'Set',
      tagline: 'Each value once, no duplicates',
      realWorld: 'A sticker album with one spot per sticker. If you get a sticker you already have, there is no second spot for it.',
      kid: [
        'You collect stickers in an album. Every sticker has exactly one spot. When you get a new star sticker, you glue it in. When you get a second star sticker, the star spot is already full, so it does not go in.',
        'Your friend asks: "Do you have the moon sticker?" You do not read the album page by page. You flip straight to the moon spot and look.',
        'A `HashSet` is that album. It keeps every value only once, and it answers "do you have this?" very fast. But it does not care in which order you got your stickers.'
      ],
      definition: 'A **Set** is a collection without duplicates. `HashSet` is the most used Set: `add` ignores a value that is already there, `contains` is very fast, and the order of the elements is not promised.',
      explain: [
        'You create it with `Set<String> stickers = new HashSet<>();`. `Set` is the interface, `HashSet` the class, like `List` and `ArrayList`.',
        '`add(x)` returns a `boolean`: `true` when `x` was new and is now in the set, `false` when it was already there. The set does not change in the second case. This makes `add` a free "have I seen this before?" check.',
        '"The same" means `equals` says so. Two different String objects with the same letters count as one value. (For your own classes, the lesson "How HashMap Finds Things" shows what you must add.)',
        'A Set has **no index**. There is no `get(0)`, because there is no "first" element. You use `contains`, `remove`, `size` and the for-each loop.',
        '`HashSet` keeps no order at all; the loop can visit the elements in any order. If you need the order you added things in, use **`LinkedHashSet`**. If you need them sorted (A to Z, small to big), use **`TreeSet`**.'
      ],
      why: 'Many questions are "is X in the group?" or "which different values are there?". A list answers them slowly and lets duplicates in. A set answers fast and keeps each value once.',
      whenUse: 'Unique things: user names, tags, visited pages, letters already guessed in a game. Also to remove duplicates from a list in one line.',
      syntax: 'Set<T> set = new HashSet<>();   boolean isNew = set.add(x);   set.contains(x);   set.remove(x);   set.size();   new LinkedHashSet<>(list);   new TreeSet<>(list);',
      fileName: 'SetDemo.java',
      code: `import java.util.HashSet;
import java.util.Set;

public class SetDemo {
    public static void main(String[] args) {
        Set<String> stickers = new HashSet<>();
        System.out.println(stickers.add("star"));     // true: new
        System.out.println(stickers.add("moon"));     // true: new
        System.out.println(stickers.add("star"));     // false: already there
        stickers.add("sun");

        System.out.println("Size: " + stickers.size());
        System.out.println("Has moon? " + stickers.contains("moon"));
        stickers.remove("moon");
        System.out.println("Has moon? " + stickers.contains("moon"));

        for (String s : stickers) {
            System.out.println("- " + s);
        }
    }
}`,
      output: `true
true
false
Size: 3
Has moon? true
Has moon? false
- star
- sun`,
      codeSummary: 'A sticker album as a HashSet: duplicates are ignored, lookups are fast.',
      codeExplanation: [
        { label: 'Line 6', code: 'Set<String> stickers = new HashSet<>();', text: 'An empty set of Strings. `Set` is the variable type, `HashSet` does the work.' },
        { label: 'Line 7', code: 'System.out.println(stickers.add("star"));     // true: new', text: '`add` returns `true`: star was not there, now it is.' },
        { label: 'Line 9', code: 'System.out.println(stickers.add("star"));     // false: already there', text: 'The second star is refused. `add` returns `false` and the set stays the same.' },
        { label: 'Line 12', code: 'System.out.println("Size: " + stickers.size());', text: 'Four calls to `add`, but only three different values: the size is 3.' },
        { label: 'Line 13', code: 'System.out.println("Has moon? " + stickers.contains("moon"));', text: '`contains` is the main question you ask a set. A HashSet answers it without looking at every element.' },
        { label: 'Line 14', code: 'stickers.remove("moon");', text: 'Removes by value. A set has no index, so there is only this one `remove`.' },
        { label: 'Line 17', code: 'for (String s : stickers) {', text: 'The for-each loop visits every element once. The order comes from how HashSet stores things inside, not from the order of `add`.' }
      ],
      sections: [
        {
          title: 'What add really does',
          text: ['Every `add` asks one question first. The answer decides whether the set changes.'],
          mermaid: `flowchart TD
  A["set.add(x)"] --> B{"is an equal value already in the set?"}
  B -->|"yes"| C["do nothing, return false"]
  B -->|"no"| D["store x, return true"]`,
          diagramNote: '"Equal" means `equals` returns true. For Strings that is "same letters", not "same object".'
        },
        {
          title: 'Removing duplicates from a list',
          text: [
            'Every collection class can be built from another collection. `new HashSet<>(list)` keeps each value once. Use `LinkedHashSet` when the first-seen order matters, and turn it back into a list with `new ArrayList<>(set)`.',
            'The same trick counts the different values: `new HashSet<>(list).size()`.'
          ],
          fileName: 'NoDuplicates.java',
          code: `import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class NoDuplicates {
    public static void main(String[] args) {
        List<String> votes = List.of("pizza", "pasta", "pizza", "salad", "pasta", "pizza");
        System.out.println("Votes: " + votes);

        Set<String> choices = new LinkedHashSet<>(votes);   // first-seen order
        System.out.println("Different choices: " + choices);
        System.out.println("How many different: " + choices.size());

        List<String> backToList = new ArrayList<>(choices);
        System.out.println("First choice named: " + backToList.get(0));
    }
}`,
          output: `Votes: [pizza, pasta, pizza, salad, pasta, pizza]
Different choices: [pizza, pasta, salad]
How many different: 3
First choice named: pizza`
        },
        {
          title: 'Three sets, three orders',
          text: [
            'The three Set classes all refuse duplicates. They differ only in the order of the loop. The program adds the same animals to each one.',
            'The HashSet order depends on the hash codes of the Strings (next lessons). It is stable for one Java version and the same values, but you must never rely on it.'
          ],
          fileName: 'SetOrders.java',
          code: `import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class SetOrders {
    public static void main(String[] args) {
        List<String> animals = List.of("zebra", "cat", "lion", "ant", "cat");

        Set<String> hash = new HashSet<>(animals);
        Set<String> linked = new LinkedHashSet<>(animals);
        Set<String> tree = new TreeSet<>(animals);

        System.out.println("HashSet:       " + hash);
        System.out.println("LinkedHashSet: " + linked);
        System.out.println("TreeSet:       " + tree);
    }
}`,
          output: `HashSet:       [zebra, ant, cat, lion]
LinkedHashSet: [zebra, cat, lion, ant]
TreeSet:       [ant, cat, lion, zebra]`,
          table: {
            head: ['Class', 'Loop order', 'Speed of add / contains', 'Use it for'],
            rows: [
              ['`HashSet`', 'no promise', 'fastest', 'the normal case'],
              ['`LinkedHashSet`', 'the order you added', 'almost as fast', 'unique values, order matters'],
              ['`TreeSet`', 'sorted', 'a bit slower (grows slowly with size)', 'sorted unique values, `first()`, `last()`']
            ],
            note: 'A `TreeSet` sorts Strings by their character codes: capital letters come before small letters, so `"Zoe"` comes before `"ada"`.'
          }
        },
        {
          title: 'Set maths: together, both, only one',
          text: [
            'Sets can answer school-style questions. `addAll` puts two groups **together** (union). `retainAll` keeps only what is in **both** (intersection). `removeAll` keeps what is **only** in the first (difference).',
            'These methods change the set you call them on. So make a copy first, or you lose the original.'
          ],
          fileName: 'SetMaths.java',
          code: `import java.util.Set;
import java.util.TreeSet;

public class SetMaths {
    public static void main(String[] args) {
        Set<String> ada = Set.of("chess", "football", "piano");
        Set<String> kai = Set.of("piano", "swimming", "chess");

        Set<String> together = new TreeSet<>(ada);
        together.addAll(kai);
        System.out.println("Hobbies of both kids: " + together);

        Set<String> both = new TreeSet<>(ada);
        both.retainAll(kai);
        System.out.println("Shared hobbies: " + both);

        Set<String> onlyAda = new TreeSet<>(ada);
        onlyAda.removeAll(kai);
        System.out.println("Only Ada: " + onlyAda);
    }
}`,
          output: `Hobbies of both kids: [chess, football, piano, swimming]
Shared hobbies: [chess, piano]
Only Ada: [football]`,
          tip: 'The copies are `TreeSet`s so the printed order is sorted and the same on every computer. `Set.of` makes a fixed set; never print it directly, its order can change from run to run.'
        },
        {
          title: 'Using add as a "seen before?" check',
          text: [
            'Because `add` returns `false` for a value that is already there, a set finds the first repeated word in one pass, without a second loop.',
            'The `break` stops the loop as soon as the answer is known.'
          ],
          fileName: 'FirstRepeat.java',
          code: `import java.util.HashSet;
import java.util.Set;

public class FirstRepeat {
    public static void main(String[] args) {
        String[] words = "the cat saw the dog and the bird".split(" ");
        Set<String> seen = new HashSet<>();

        for (String word : words) {
            if (!seen.add(word)) {
                System.out.println("First repeated word: " + word);
                break;
            }
        }
        System.out.println("Different words seen so far: " + seen.size());
    }
}`,
          output: `First repeated word: the
Different words seen so far: 3`
        }
      ],
      technical: [
        'A `HashSet` is a `HashMap` in disguise. Every element you add is stored as a **key** of a hidden map, with the same dummy object as the value. All the speed and all the ordering quirks come from the map; the lesson "How HashMap Finds Things" shows how it works.',
        'Because of that design, `contains` does not compare `x` with every element. It computes `x.hashCode()`, a number, and uses it to jump straight to a small group of candidates. Only those few are checked with `equals`. That is why `contains` stays fast for a million elements, while `List.contains` gets slower.',
        '`LinkedHashSet` adds a linked list through all entries, which remembers the insertion order. `TreeSet` is a different design, a **red-black tree**: a sorted tree that keeps itself balanced. It compares elements with `compareTo` instead of `hashCode`, so its elements must be comparable (Strings and numbers are).'
      ],
      tryIt: {
        steps: [
          'Copy `SetDemo.java`, compile and run it.',
          'At the end of `main`, add `stickers.add("Star");` with a capital S and print `stickers.size()`.',
          'Change `new HashSet<>()` to `new TreeSet<>()` and change the import to `java.util.TreeSet`. Run again.'
        ],
        see: 'size `3` after step 2 (Star is different from star), and in step 3 the loop prints `- Star`, `- star`, `- sun` in sorted order.'
      },
      check: [
        { q: 'What does `set.add("x")` return when `"x"` is already in the set?', a: '`false`, and the set does not change.' },
        { q: 'You need unique names in the order people signed up. Which class?', a: '`LinkedHashSet`.' },
        { q: 'Why is there no `set.get(0)`?', a: 'A set has no positions. Use `contains`, or loop with for-each.' }
      ],
      keyPoints: [
        'A Set never holds two equal values.',
        '`add` returns `true` when the value was new, `false` when it was already there.',
        '`contains` on a HashSet is fast, even for huge sets.',
        'HashSet: no order. LinkedHashSet: added order. TreeSet: sorted.',
        '`new HashSet<>(list)` removes duplicates in one line.'
      ],
      commonMistakes: [
        'Expecting `HashSet` to print in the order you added. Use `LinkedHashSet`, or `TreeSet` for sorted order.',
        'Checking a list with `if (!list.contains(x)) list.add(x);` for uniqueness. A `Set` does that for you and faster.',
        'Writing `set.get(0)`. It does not compile. Loop with for-each, or copy into a list first.',
        'Calling `retainAll` on the original set and losing it. Copy first: `new HashSet<>(a)`.'
      ],
      related: ['lists', 'maps', 'hash-buckets', 'Strings']
    }
  ]);
})();
