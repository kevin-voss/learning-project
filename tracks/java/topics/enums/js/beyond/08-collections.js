// Enums, lesson 8: EnumMap and EnumSet, the collections made for enum keys.
(function () {
  Java.addCoreLessons('enums', [
    {
      id: 'enum-collections',
      title: 'EnumMap and EnumSet',
      category: 'practice',
      icon: '▦',
      tagline: 'Collections that know the whole list',
      realWorld: 'A weekly pill box with seven little lids, one per day, always in the order Monday to Sunday. You never search for Wednesday: it is always the third lid. You can open some lids and leave the others closed.',
      kid: [
        'A pill box has one little box for every day of the week. They are always in the same order, Monday first.',
        'An `EnumMap` is like that pill box: one place for every card of the enum, in the order of the list. You put something into the place for MONDAY, and you find it there again.',
        'An `EnumSet` is like a row of light switches, one per card. A switch is on or off. “Which days is the shop open?” Turn on the switches for those days.'
      ],
      definition: '`EnumMap<K, V>` is a `Map` whose keys are the constants of one enum. `EnumSet<E>` is a `Set` of constants of one enum. Both keep the constants in declaration order and are faster and smaller than `HashMap` and `HashSet`.',
      explain: [
        'You know `Map` and `Set` from [Collections](../collections/index.html). They work with any type of key. When the keys are enum constants, Java has two special versions that use what it knows about enums: there is a fixed number of constants, and each one has a position number, the ordinal.',
        'An **EnumMap** stores its values in a plain array with one slot per constant. The slot for `LARGE` is the slot at `LARGE.ordinal()`. Looking up a value is one array access, no hashing. You create one with the enum’s class: `new EnumMap<>(Size.class)`. `Size.class` is a value that stands for the type `Size`; the map needs it to know how many slots to make.',
        'An **EnumSet** stores, for each constant, one bit: 1 if the constant is in the set, 0 if not. For up to 64 constants, the whole set is a single `long` number. Adding, removing and `contains` are single bit operations. You do not call `new`; you use static factory methods like `EnumSet.of(...)`, `EnumSet.noneOf(Day.class)` or `EnumSet.range(MONDAY, FRIDAY)`.',
        'Both print and loop in **declaration order**, no matter in which order you added the constants. A `HashMap` with enum keys gives no promise about the order.',
        'Both are normal `Map` and `Set` objects. You can store them in a variable of type `Map<Size, Integer>` or `Set<Day>` and use every method you already know: `put`, `get`, `add`, `contains`, `remove`, `size`.'
      ],
      why: 'When the keys are enum constants, these two are faster, use less memory and keep a predictable order.',
      whenUse: 'Counting or storing something per constant (`EnumMap`), or a group of constants like opening days or user rights (`EnumSet`).',
      syntax: '`Map<Size, Integer> m = new EnumMap<>(Size.class);` and `Set<Day> s = EnumSet.of(Day.MONDAY, Day.FRIDAY);`',
      fileName: 'OrderCount.java',
      code: `import java.util.EnumMap;
import java.util.Map;

enum Size { SMALL, MEDIUM, LARGE }

public class OrderCount {
    public static void main(String[] args) {
        Size[] orders = { Size.LARGE, Size.SMALL, Size.LARGE, Size.MEDIUM, Size.LARGE };

        Map<Size, Integer> count = new EnumMap<>(Size.class);
        for (Size s : Size.values()) {
            count.put(s, 0);
        }

        for (Size order : orders) {
            count.put(order, count.get(order) + 1);
        }

        System.out.println(count);
        for (Size s : count.keySet()) {
            System.out.println(s + ": " + "#".repeat(count.get(s)));
        }
    }
}`,
      output: `{SMALL=1, MEDIUM=1, LARGE=3}
SMALL: #
MEDIUM: #
LARGE: ###`,
      codeSummary: 'Counts pizza orders per size in an `EnumMap` and draws a small bar chart in declaration order.',
      codeExplanation: [
        { label: 'Line 1', code: 'import java.util.EnumMap;', text: '`EnumMap` lives in `java.util`, next to `HashMap`.' },
        { label: 'Line 10', code: 'Map<Size, Integer> count = new EnumMap<>(Size.class);', text: 'A map with `Size` keys. `Size.class` tells it which enum, so it can make exactly three slots.' },
        { label: 'Line 11', code: 'for (Size s : Size.values()) {', text: 'Puts a 0 in for every size first, so `get` never returns `null` later.' },
        { label: 'Line 16', code: 'count.put(order, count.get(order) + 1);', text: 'Reads the old count, adds one and stores it back. The same pattern you use with a `HashMap`.' },
        { label: 'Line 19', code: 'System.out.println(count);', text: 'Prints `{SMALL=1, MEDIUM=1, LARGE=3}`, always in declaration order, though LARGE was counted first.' },
        { label: 'Line 20', code: 'for (Size s : count.keySet()) {', text: 'The keys come out in declaration order too.' },
        { label: 'Line 21', code: 'System.out.println(s + ": " + "#".repeat(count.get(s)));', text: '`repeat` builds a String of that many `#` signs: a tiny bar chart.' }
      ],
      sections: [
        {
          title: 'EnumSet: a group of constants',
          text: [
            'An `EnumSet` answers yes-or-no questions per constant: “Is the shop open on Tuesday?” The factory methods make the common sets in one line.'
          ],
          fileName: 'OpeningDays.java',
          code: `import java.util.EnumSet;
import java.util.Set;

enum Day { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }

public class OpeningDays {
    public static void main(String[] args) {
        Set<Day> weekdays = EnumSet.range(Day.MONDAY, Day.FRIDAY);
        Set<Day> weekend = EnumSet.complementOf(EnumSet.range(Day.MONDAY, Day.FRIDAY));
        Set<Day> market = EnumSet.of(Day.SATURDAY, Day.WEDNESDAY);
        Set<Day> open = EnumSet.noneOf(Day.class);

        open.addAll(weekdays);
        open.remove(Day.WEDNESDAY);
        open.add(Day.SATURDAY);

        System.out.println("weekdays: " + weekdays);
        System.out.println("weekend:  " + weekend);
        System.out.println("market:   " + market);
        System.out.println("open:     " + open);
        System.out.println("open on Wednesday? " + open.contains(Day.WEDNESDAY));
        System.out.println("all days: " + EnumSet.allOf(Day.class).size());
    }
}`,
          output: `weekdays: [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY]
weekend:  [SATURDAY, SUNDAY]
market:   [WEDNESDAY, SATURDAY]
open:     [MONDAY, TUESDAY, THURSDAY, FRIDAY, SATURDAY]
open on Wednesday? false
all days: 7`,
          bullets: [
            '`EnumSet.of(a, b, …)`: exactly these constants. The order you pass them in does not matter: `market` prints WEDNESDAY first.',
            '`EnumSet.noneOf(Day.class)`: an empty set, ready for `add`.',
            '`EnumSet.allOf(Day.class)`: every constant.',
            '`EnumSet.range(from, to)`: from one constant to another, both included, in declaration order.',
            '`EnumSet.complementOf(set)`: every constant that is **not** in `set`.'
          ]
        },
        {
          title: 'How an EnumSet looks inside',
          text: [
            'Each constant owns one bit, at the position of its ordinal. The set `{MONDAY, TUESDAY, THURSDAY, FRIDAY, SATURDAY}` is the number with the bits 0, 1, 3, 4 and 5 turned on. `contains(WEDNESDAY)` only checks bit 2.'
          ],
          mermaid: `flowchart LR
  subgraph bits["one long number, bit by bit"]
    direction LR
    b0["MON 1"] --- b1["TUE 1"] --- b2["WED 0"] --- b3["THU 1"] --- b4["FRI 1"] --- b5["SAT 1"] --- b6["SUN 0"]
  end
  Q["open.contains(WEDNESDAY)"] --> b2`,
          diagramNote: 'Bit 2 belongs to WEDNESDAY, because `WEDNESDAY.ordinal()` is 2. It is 0, so `contains` returns `false`.'
        },
        {
          title: 'EnumMap or HashMap?',
          table: {
            head: ['', '`HashMap<Size, V>`', '`EnumMap<Size, V>`'],
            rows: [
              ['Order when printing or looping', 'no promise', 'declaration order'],
              ['How it finds a key', 'hash code, then a bucket', '`key.ordinal()` as array index'],
              ['Memory', 'one entry object per key', 'one array slot per constant'],
              ['`null` as a key', 'allowed', 'not allowed (`NullPointerException`)'],
              ['How to create it', '`new HashMap<>()`', '`new EnumMap<>(Size.class)`']
            ],
            note: 'The same holds for `HashSet` versus `EnumSet`. Whenever the key or element type is an enum, pick the Enum version.'
          }
        },
        {
          title: 'One map per shop: changing data done right',
          text: [
            'The lesson on enums with data warned against a changing field like `stock` inside the enum. Here is the fix: each shop keeps its own `EnumMap`. The enum stays fixed, the counts live in the shops.'
          ],
          fileName: 'ShopStock.java',
          code: `import java.util.EnumMap;
import java.util.Map;

enum Drink { COFFEE, TEA }

public class ShopStock {
    static Map<Drink, Integer> newStock() {
        Map<Drink, Integer> stock = new EnumMap<>(Drink.class);
        for (Drink d : Drink.values()) {
            stock.put(d, 10);
        }
        return stock;
    }

    static void sellOne(String shop, Map<Drink, Integer> stock, Drink drink) {
        stock.put(drink, stock.get(drink) - 1);
        System.out.println(shop + " sold one " + drink + ", stock now " + stock.get(drink));
    }

    public static void main(String[] args) {
        Map<Drink, Integer> north = newStock();
        Map<Drink, Integer> south = newStock();
        sellOne("Shop North", north, Drink.COFFEE);
        sellOne("Shop North", north, Drink.COFFEE);
        sellOne("Shop South", south, Drink.COFFEE);
        System.out.println("North " + north + ", South " + south);
    }
}`,
          output: `Shop North sold one COFFEE, stock now 9
Shop North sold one COFFEE, stock now 8
Shop South sold one COFFEE, stock now 9
North {COFFEE=8, TEA=10}, South {COFFEE=9, TEA=10}`
        }
      ],
      technical: [
        '`EnumMap` keeps an array `vals` with one slot per constant. `put(LARGE, 3)` does `vals[LARGE.ordinal()] = 3`. `get` reads the same slot. No `hashCode`, no `equals`, no collision handling: the ordinal is a perfect index, because every constant has its own number from 0 to n − 1.',
        '`EnumSet` is abstract. For enums with up to 64 constants, `EnumSet.of(...)` returns a `RegularEnumSet`, which keeps a single `long` field. `add(x)` is `bits |= 1L << x.ordinal()`, `contains(x)` is `(bits & (1L << x.ordinal())) != 0`. For bigger enums Java uses a `JumboEnumSet` with an array of `long`s.',
        'Both classes need the enum’s `Class` object, which is why you pass `Size.class`. From it they get the list of constants (the same array `values()` copies) and its length. That is also why `null` keys are not allowed: `null` has no ordinal.',
        'Like `HashMap`, neither class is thread-safe. If several threads (parallel parts of a program) change the same map, you need extra care; that topic comes much later.'
      ],
      tryIt: {
        steps: [
          'Copy `OpeningDays.java` and run it.',
          'Make a set `cleaning` with `EnumSet.of(Day.SUNDAY, Day.MONDAY)` and print it.',
          'Print whether `open` and `cleaning` share a day: copy `open` with `EnumSet.copyOf(open)`, call `retainAll(cleaning)` on the copy and print it.'
        ],
        see: '`[MONDAY, SUNDAY]` (declaration order, not the order you typed) and `[MONDAY]` as the shared day.'
      },
      check: [
        { q: 'Why does `new EnumMap<>(Size.class)` need `Size.class`?', a: 'The map must know which enum it is for, so it can make one array slot per constant.' },
        { q: 'In what order does an `EnumSet` print its elements?', a: 'In declaration order, no matter in which order you added them.' },
        { q: 'What does `EnumSet.complementOf(EnumSet.of(Day.SUNDAY))` contain?', a: 'All days except SUNDAY: MONDAY to SATURDAY.' }
      ],
      keyPoints: [
        '`EnumMap` and `EnumSet` are `Map` and `Set` made for enum keys.',
        'Both keep declaration order.',
        '`EnumMap` uses the ordinal as an array index; `EnumSet` uses one bit per constant.',
        'Create an `EnumSet` with `of`, `noneOf`, `allOf`, `range` or `complementOf`.',
        'Keep changing data per constant in an `EnumMap`, not in an enum field.'
      ],
      commonMistakes: [
        '`new EnumSet<>()`: does not compile, `EnumSet` is abstract. Use `EnumSet.noneOf(Day.class)`.',
        '`new EnumMap<>()` without the class: does not compile. Write `new EnumMap<>(Size.class)`.',
        '`count.get(order) + 1` before the key was put in: `get` returns `null`, and `null + 1` throws a `NullPointerException`. Fill the map with 0 for every constant first.',
        '`map.put(null, 1)` on an `EnumMap`: throws `NullPointerException`. Enum maps and sets do not take `null`.'
      ],
      related: ['Collections', 'Arrays']
    }
  ]);
})();
