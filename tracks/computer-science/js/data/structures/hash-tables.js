window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'hash-tables',
  category: 'Java 2: Data Structures',
  title: 'Hash Tables',
  icon: 'fa-hashtag',
  subtitle: 'How a HashMap finds things fast: numbered post boxes.',
  demoType: 'hashtable',
  keywords: ['hash table', 'hash function', 'bucket', 'key-value', 'collision'],
  relatedIds: ['arrays', 'linked-lists', 'big-o-notation'],
  subPages: [
    {
      id: 'picture',
      label: 'The picture',
      title: 'Letters in numbered post boxes',
      analogy: 'A post office has a wall of numbered boxes. The clerk has a rule that turns a name into a box number. "Maya" always gives box 7. To put a letter in, the clerk uses the rule and drops it in box 7. To find Maya\'s letter later, the clerk uses the same rule and looks only in box 7. No searching through every box.',
      whatIsIt: 'A hash table stores pairs: a key and a value, like "Maya" and her phone number. A hash function turns the key into a box number, called a bucket. Same key, same bucket, every time. That is how Java\'s HashMap finds a value without looking at all the others.',
      demoTitle: 'Sort keys into buckets',
      demoHint: 'Type a key and a value, then Set. Get finds it again. Watch which bucket the key lands in.',
      codeTitle: 'Tiny example: HashMap in Java',
      codeLanguage: 'Java',
      codeText: `import java.util.HashMap;

HashMap<String, String> phone = new HashMap<>();
phone.put("Maya", "0151 111");
phone.put("Leo", "0151 222");
System.out.println(phone.get("Maya"));        // 0151 111
System.out.println(phone.containsKey("Zoe")); // false
phone.put("Maya", "0151 999");                // same key: value is replaced
System.out.println(phone.get("Maya"));        // 0151 999`,
      tryIt: {
        steps: [
          'In the demo, Set the key "cat" with any value.',
          'Set two more keys.',
          'Type "cat" again and press Get.',
        ],
        result: 'Get goes straight to the same bucket where "cat" was stored.',
      },
      checklist: [
        'You can explain key, value and bucket with the post office picture.',
        'You can say why the same key always lands in the same bucket.',
        'You can use put, get and containsKey on a Java HashMap.',
      ],
      check: [
        { q: 'Why is get("Maya") fast even with a million entries?', a: 'The hash function gives the bucket number straight away, so only one bucket is checked.' },
        { q: 'What happens when you put a key that is already in the map?', a: 'The old value is replaced. Keys are unique.' },
        { q: 'Two different keys land in the same bucket. What is that called?', a: 'A collision. The bucket then holds both pairs, often in a small list.' },
      ],
    },
    {
      id: 'where-you-meet-it',
      label: 'Where you meet it',
      title: 'Where you meet hash tables',
      demoType: null,
      whatIsIt: 'Any time you ask "what belongs to this name?" or "have I seen this before?", a hash table is a good answer. In Java you use HashMap for pairs and HashSet for "have I seen it?".',
      whenToUse: [
        { icon: 'fa-address-book', title: 'Look up by name', desc: 'User by email, price by product id, phone number by name.' },
        { icon: 'fa-fingerprint', title: 'No duplicates', desc: 'A HashSet keeps every value only once.' },
        { icon: 'fa-chart-bar', title: 'Counting', desc: 'Count words: the word is the key, the count is the value.' },
        { icon: 'fa-database', title: 'Caches', desc: 'Remember answers you already worked out.' },
      ],
      check: [
        { q: 'You want to count how often each word appears in a text. What are the key and the value?', a: 'The word is the key. The count is the value.' },
      ],
    },
    {
      id: 'look-inside',
      label: 'Look inside',
      title: 'Look inside: build one yourself',
      demoType: null,
      whatIsIt: 'A hash table is an array of buckets. Every bucket is a small list of pairs. The hash function picks the bucket. Java gives every object a hashCode(). Math.abs(...) % buckets.length turns it into a box number.',
      codeTitle: 'A tiny hash table in Java',
      codeLanguage: 'Java',
      codeText: `import java.util.ArrayList;
import java.util.List;

class PostOffice {
    record Pair(String key, String value) {}
    private final List<List<Pair>> boxes = new ArrayList<>();

    PostOffice() { for (int i = 0; i < 8; i++) boxes.add(new ArrayList<>()); }

    private int boxFor(String key) {
        return Math.abs(key.hashCode()) % boxes.size();  // the rule
    }

    void put(String key, String value) {
        List<Pair> box = boxes.get(boxFor(key));
        box.removeIf(p -> p.key().equals(key));          // keys are unique
        box.add(new Pair(key, value));
    }

    String get(String key) {
        for (Pair p : boxes.get(boxFor(key))) {          // look in ONE box only
            if (p.key().equals(key)) return p.value();
        }
        return null;
    }
}`,
      check: [
        { q: 'In get(), why is only one box searched?', a: 'boxFor(key) gives the same box number that put() used, so the pair can only be there.' },
        { q: 'What happens if all keys land in box 3?', a: 'Box 3 becomes a long list and get() gets slow. A good hash function spreads keys out.' },
      ],
    },
  ],
});
