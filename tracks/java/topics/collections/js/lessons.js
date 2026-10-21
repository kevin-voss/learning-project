(function () {
  Java.addCoreTopic('collections', {
    label: 'Collections',
    headline: 'Collections,',
    accent: 'flexible groups.',
    intro: 'Use Java collection types for groups that grow, remove duplicates, and map keys to values.',
    overview: 'Collections are essential for real Java programs and prepare you for REST data, tests, and projects.',
    tryIt: {
      steps: [
        'Make an `ArrayList<String>` with three foods.',
        'Make a `HashMap<String, Integer>` that maps each food to a price.',
        'Loop over the list and print each food with its price from the map.'
      ],
      see: 'three lines like `apple: 2`.'
    },
    check: [
      { q: 'You need "all names, no duplicates". List, Set or Map?', a: 'A Set, for example `HashSet<String>`.' },
      { q: 'Why `List<Integer>` and not `List<int>`?', a: 'Lists hold objects only. `Integer` is the object box for an `int`.' },
      { q: 'What does `map.get("pear")` give when there is no pear?', a: '`null`. Use `getOrDefault("pear", 0)` to get a safe value.' }
    ]
  }, [
    {
      id: 'lists',
      title: 'ArrayList',
      category: 'concept',
      icon: 'List',
      tagline: 'A growable ordered list',
      definition: 'ArrayList is a resizable ordered collection. It uses generics to say what type it stores.',
      realWorld: 'A shopping list can grow, shrink, and keep items in order.',
      syntax: 'ArrayList<String> names = new ArrayList<>(); stores String values only.',
      fileName: 'ListDemo.java',
      code: `import java.util.ArrayList;

public class ListDemo {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Ada");
        names.add("Mina");
        names.add("Kai");
        names.remove("Mina");

        for (String name : names) {
            System.out.println(name);
        }
    }
}`,
      keyPoints: [
        'ArrayList keeps insertion order.',
        'Use size(), not length.',
        'Generics catch wrong element types at compile time.'
      ],
      commonMistakes: [
        'Using length instead of size().',
        'Forgetting import java.util.ArrayList.',
        'Using raw ArrayList without a type.'
      ],
      related: ['Arrays', 'Classes & Objects']
    },
    {
      id: 'sets',
      title: 'HashSet',
      category: 'practice',
      icon: 'Set',
      tagline: 'Unique values',
      definition: 'HashSet stores unique values and does not promise insertion order.',
      realWorld: 'A guest list should contain each person once, even if their name is added twice.',
      syntax: 'Set<String> tags = new HashSet<>(); is the common interface-plus-implementation style.',
      fileName: 'SetDemo.java',
      code: `import java.util.HashSet;
import java.util.Set;

public class SetDemo {
    public static void main(String[] args) {
        Set<String> tags = new HashSet<>();
        tags.add("java");
        tags.add("ubuntu");
        tags.add("java");

        System.out.println(tags.size());
        System.out.println(tags.contains("ubuntu"));
    }
}`,
      keyPoints: [
        'Sets remove duplicates.',
        'contains is fast for HashSet.',
        'Use Set as the variable type when you only need set behavior.'
      ],
      commonMistakes: [
        'Expecting HashSet to print in insertion order.',
        'Using a List and manually checking duplicates when a Set fits.',
        'Mutating objects in ways that break hash-based lookup.'
      ],
      related: ['Strings & Text', 'Testing']
    },
    {
      id: 'maps',
      anim: 'postoffice',
      title: 'HashMap',
      category: 'habits',
      icon: 'Map',
      tagline: 'Look up values by key',
      definition: 'HashMap stores key/value pairs. Each key maps to one current value.',
      realWorld: 'A phone book maps a person name to a phone number.',
      syntax: 'Map<String, Integer> scores = new HashMap<>(); maps names to scores.',
      fileName: 'MapDemo.java',
      code: `import java.util.HashMap;
import java.util.Map;

public class MapDemo {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Ada", 92);
        scores.put("Kai", 87);
        scores.put("Ada", 95);

        System.out.println(scores.get("Ada"));
        System.out.println(scores.getOrDefault("Mina", 0));
    }
}`,
      keyPoints: [
        'put replaces the old value for the same key.',
        'get can return null when the key is missing.',
        'getOrDefault is friendly for beginner counters and lookups.'
      ],
      commonMistakes: [
        'Assuming one key can hold multiple values without using a list.',
        'Forgetting that missing keys return null.',
        'Using a map when a small class would describe the data better.'
      ],
      related: ['Exceptions', 'REST & HTTP']
    },
    {
      id: 'which-collection',
      title: 'Which Collection?',
      category: 'habits',
      icon: '?',
      tagline: 'List, Set or Map',
      realWorld: 'A shopping list keeps order and can say "milk" twice. A guest list has each name once. A phone book finds a number by name. That is List, Set and Map.',
      definition: 'Ask two questions. Do I look things up by a key? Then use a Map. Do I only care whether something is in the group, with no duplicates? Then use a Set. Everything else: start with a List.',
      table: {
        label: 'Decision table',
        head: ['Question', 'List', 'Set', 'Map'],
        rows: [
          ['Keeps the order you added?', 'yes', 'no (HashSet)', 'no (HashMap)'],
          ['Duplicates allowed?', 'yes', 'no', 'keys no, values yes'],
          ['Get by position, `get(0)`?', 'yes', 'no', 'no'],
          ['Find fast by key or id?', 'no, it searches', 'no', 'yes'],
          ['"Is X in here?" fast?', 'slow when big', 'yes', 'yes, by key']
        ],
        note: 'Write the interface on the left: `List<String> names = new ArrayList<>();`. Then you can swap the class later.'
      },
      keyPoints: ['A bunch of things: List.', 'Unique things: Set.', 'Find by key: Map.'],
      commonMistakes: ['Looping through a big list to find one id. Use a Map.'],
      related: ['Interfaces']
    },
    {
      id: 'generics-light',
      title: 'Generics: the <Type>',
      category: 'habits',
      icon: '<T>',
      tagline: 'A list of what?',
      realWorld: 'A box labelled "only socks". If you try to put a shoe in, someone stops you at the door, not later when you get dressed.',
      definition: 'The `<...>` after a collection says what goes in it: `List<String>` holds only Strings. Java checks this when it compiles. On the right side you can write the empty diamond `<>`. Java fills it in from the left.',
      why: 'Wrong items are caught by javac, not by a crash later.',
      whenUse: 'Every time you make a collection.',
      fileName: 'GenericsDemo.java',
      code: `import java.util.ArrayList;
import java.util.List;

public class GenericsDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Ava");
        // names.add(42);   <- does not compile: 42 is not a String

        String first = names.get(0);   // no cast needed
        System.out.println(first);
    }
}`,
      keyPoints: ['`List<Integer>`, not `List<int>`: use the wrapper types.', 'The diamond `<>` saves typing the type twice.'],
      commonMistakes: ['Writing `List names = new ArrayList();` without a type. Then anything can sneak in.'],
      related: ['Types & Variables']
    }
  ]);
})();
