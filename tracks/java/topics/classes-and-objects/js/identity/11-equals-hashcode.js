(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'equals-hashcode',
    title: 'equals and hashCode',
    category: 'habits',
    icon: '=',
    tagline: 'Same object, or same value?',
    glossary: terms,
    realWorld: 'Two 1-euro coins in your hand. They are two different coins: you can give one away and keep the other. But they are worth exactly the same. "Is it the same coin?" and "Are they worth the same?" are two different questions.',
    kid: [
      'You and your friend each have a red ball, the same size, the same colour. Is it the same ball? No, there are two balls. One is yours and one is your friend’s.',
      'But are the balls **equal**? Yes! If you swapped them, nobody would notice.',
      'Java can ask both questions. `==` asks "is it the very same ball?". `equals` asks "are they equal?". But Java does not know by itself what "equal" means for your class. You have to teach it, with a method called `equals`, and its helper `hashCode`.'
    ],
    definition: '`a == b` asks "do both variables point to the **same object**?". `a.equals(b)` asks "do these objects have the **same value**?", but only after your class overrides `equals`. Whenever you override `equals`, you must also override `hashCode`, so that equal objects give the same hash code.',
    explain: [
      'You know from "Creating Objects with new" that `==` compares references. Two separate `Point` objects that both hold `(3, 4)` are not `==`. For `String` you already use `equals` instead of `==` ([Strings](../strings/index.html)); the `String` class overrides `equals` to compare the characters.',
      'Your own classes get `equals` from `Object`, and that version does the same as `==`. So `new Point(3, 4).equals(new Point(3, 4))` is `false` until you override it to compare the fields.',
      'The header must be exactly `public boolean equals(Object other)`. The parameter type is `Object`, so `equals` must first check that `other` really is a `Point`. The check `other instanceof Point that` does two things: it answers "is `other` a `Point`?", and if yes, it gives you the same object as a `Point` variable named `that` (Java 16+).',
      '`hashCode()` returns an `int` that sums up the object, like a short fingerprint. Fast lookup collections such as `HashSet` and `HashMap` (topic [Collections](../collections/index.html)) use it to decide in which "drawer" to put or look for an object. Only inside that drawer do they call `equals`.',
      'This gives the one rule you must never break: **if `a.equals(b)` is true, then `a.hashCode() == b.hashCode()`**. If equal objects had different hash codes, a `HashSet` would look in the wrong drawer and never find them. The easiest correct `hashCode` is `Objects.hash(field1, field2, …)` from `java.util.Objects`.'
    ],
    why: 'Programs constantly ask "have I seen this before?" and "is this already in the list?". Without `equals` and `hashCode`, two objects with the same values count as different, and duplicates and failed searches appear.',
    whenUse: 'Override both when objects stand for values: a point, a money amount, a date, a product code. Leave them alone when each object is a unique thing whose identity matters (a bank account, a running game).',
    syntax: '`@Override public boolean equals(Object other) { … }` and `@Override public int hashCode() { return Objects.hash(fields…); }`, always as a pair.',
    fileName: 'EqualsDemo.java',
    code: `import java.util.Objects;

public class EqualsDemo {
    public static void main(String[] args) {
        PlainPoint p1 = new PlainPoint(3, 4);
        PlainPoint p2 = new PlainPoint(3, 4);
        System.out.println("broken: p1 == p2       " + (p1 == p2));
        System.out.println("broken: p1.equals(p2)  " + p1.equals(p2));

        Point q1 = new Point(3, 4);
        Point q2 = new Point(3, 4);
        System.out.println("fixed:  q1 == q2       " + (q1 == q2));
        System.out.println("fixed:  q1.equals(q2)  " + q1.equals(q2));
        System.out.println("fixed:  same hashCode? " + (q1.hashCode() == q2.hashCode()));
    }
}

class PlainPoint {                  // no equals, no hashCode
    final int x;
    final int y;
    PlainPoint(int x, int y) { this.x = x; this.y = y; }
}

class Point {
    final int x;
    final int y;
    Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    public boolean equals(Object other) {
        if (this == other) {
            return true;                        // the very same object
        }
        if (other instanceof Point that) {      // a Point? call it "that"
            return x == that.x && y == that.y;  // compare the fields
        }
        return false;                           // null or another class
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);              // equal points, equal hash
    }
}`,
    output: `broken: p1 == p2       false
broken: p1.equals(p2)  false
fixed:  q1 == q2       false
fixed:  q1.equals(q2)  true
fixed:  same hashCode? true`,
    codeSummary: '`PlainPoint` keeps the versions from `Object`, so even `equals` only compares references. `Point` overrides `equals` to compare `x` and `y`, and `hashCode` so that equal points get equal hash codes. `==` stays `false` in both cases: there are always two objects.',
    codeExplanation: [
      { label: 'Line 1', code: 'import java.util.Objects;', text: '`Objects` is a helper class with static methods like `Objects.hash(…)`. It lives in the package `java.util`, so it needs an import.' },
      { label: 'Line 8', code: 'System.out.println("broken: p1.equals(p2)  " + p1.equals(p2));', text: '`PlainPoint` has no own `equals`. The one from `Object` compares references, so the answer is `false`.' },
      { label: 'Line 12', code: 'System.out.println("fixed:  q1 == q2       " + (q1 == q2));', text: 'Still `false`: `==` always asks "same object?", and there are two objects.' },
      { label: 'Line 13', code: 'System.out.println("fixed:  q1.equals(q2)  " + q1.equals(q2));', text: '`true`: the overridden `equals` compares the field values.' },
      { label: 'Line 30', code: 'public boolean equals(Object other) {', text: 'The exact header from `Object`. The parameter type is `Object`, not `Point`.' },
      { label: 'Line 31', code: 'if (this == other) {', text: 'A quick shortcut: an object is always equal to itself.' },
      { label: 'Line 34', code: 'if (other instanceof Point that) {      // a Point? call it "that"', text: 'Checks the type. `null` and objects of other classes fail this test. If it passes, `that` is `other` seen as a `Point`, so `that.x` works.' },
      { label: 'Line 35', code: 'return x == that.x && y == that.y;  // compare the fields', text: 'The real definition of "equal" for points: same `x` and same `y`.' },
      { label: 'Line 42', code: 'return Objects.hash(x, y);              // equal points, equal hash', text: 'Builds one `int` from the same fields that `equals` compares. Same fields in, same number out.' }
    ],
    sections: [
      {
        title: 'Same object or same value?',
        text: [
          'Keep the two questions apart. They have different answers for two objects that look alike.'
        ],
        table: {
          head: ['', '`a == b`', '`a.equals(b)` (overridden)'],
          rows: [
            ['Question', 'Same object?', 'Same value?'],
            ['Compares', 'The references (arrows)', 'Whatever the class decides, usually the fields'],
            ['`new Point(3,4)` vs `new Point(3,4)`', '`false`', '`true`'],
            ['`a` vs `a`', '`true`', '`true`'],
            ['Works on `int`, `double` …', 'Yes, compares the numbers', 'No: primitives have no methods'],
            ['Without an override in your class', 'Same object?', 'Also only "same object?"']
          ]
        }
      },
      {
        title: 'Broken: duplicates in a HashSet',
        text: [
          'A `HashSet` is a collection that keeps each value only once: `add` puts a value in (if it is not there yet), `size()` counts the values, `contains` asks "is it in there?". `HashSet<PlainPoint>` means a set that holds `PlainPoint` objects. With `PlainPoint`, the set cannot see that two points are equal.'
        ],
        fileName: 'BrokenSet.java',
        code: `import java.util.HashSet;

public class BrokenSet {
    public static void main(String[] args) {
        HashSet<PlainPoint> visited = new HashSet<>();
        visited.add(new PlainPoint(3, 4));
        visited.add(new PlainPoint(3, 4));   // the same place again

        System.out.println("places: " + visited.size());
        System.out.println("been to (3,4)? " + visited.contains(new PlainPoint(3, 4)));
    }
}

class PlainPoint {
    final int x;
    final int y;
    PlainPoint(int x, int y) { this.x = x; this.y = y; }
}`,
        output: `places: 2
been to (3,4)? false`,
        warn: 'Two entries for one place, and "no, you were never there". With the fixed `Point` from the main example, the same program prints `places: 1` and `true`.'
      },
      {
        title: 'Writing equals, step by step',
        text: [
          'Almost every `equals` has the same three steps. Follow them in order and your method is correct for `null`, for other classes and for the object itself.'
        ],
        mermaid: `flowchart TD
  A["equals(other) is called"] --> B{"this == other?"}
  B -->|yes| T["return true"]
  B -->|no| C{"other instanceof Point that?"}
  C -->|"no (null or other class)"| F["return false"]
  C -->|yes| D["compare every important field"]
  D --> R["return x == that.x and y == that.y"]`,
        diagramNote: 'Compare `int`, `double`, `boolean` fields with `==`. Compare object fields like `String` with `equals`, or with `Objects.equals(a, b)`, which also handles `null`.',
        tip: '`instanceof` is `false` for `null`, so the check for `null` is built in. You never call a method on `other` before you know it is a `Point`.'
      },
      {
        title: 'How a HashSet uses hashCode, then equals',
        text: [
          'A `HashSet` has many drawers (called **buckets**). To add or find an object, it first asks for `hashCode()` and uses that number to pick a drawer. Only the few objects in that one drawer are compared with `equals`. That is why a `HashSet` stays fast even with a million objects.'
        ],
        mermaid: `flowchart TD
  A["visited.add(q2)"] --> B["q2.hashCode()"]
  B --> C["pick the drawer for that number"]
  C --> D{"any object in the drawer with equals(q2) true?"}
  D -->|yes| E["already there: do not add"]
  D -->|no| F["put q2 into the drawer"]`,
        diagramNote: 'If two equal points had different hash codes, they would land in different drawers, `equals` would never even be called, and the set would keep both.'
      },
      {
        title: 'Broken again: equals without hashCode',
        text: [
          'This class has a correct `equals` but forgot `hashCode`. `equals` says `true`, and the `HashSet` still keeps both: the free `hashCode` from `Object` gives every object its own number, so the two points go into different drawers.'
        ],
        fileName: 'HalfFixed.java',
        code: `import java.util.HashSet;

public class HalfFixed {
    public static void main(String[] args) {
        HalfPoint a = new HalfPoint(3, 4);
        HalfPoint b = new HalfPoint(3, 4);
        System.out.println("equals: " + a.equals(b));

        HashSet<HalfPoint> set = new HashSet<>();
        set.add(a);
        set.add(b);
        System.out.println("size:   " + set.size());
    }
}

class HalfPoint {
    final int x;
    final int y;
    HalfPoint(int x, int y) { this.x = x; this.y = y; }

    @Override
    public boolean equals(Object other) {
        if (other instanceof HalfPoint that) {
            return x == that.x && y == that.y;
        }
        return false;
    }
    // hashCode() is missing!
}`,
        output: `equals: true
size:   2`,
        warn: 'Add `@Override public int hashCode() { return Objects.hash(x, y); }` (and `import java.util.Objects;`) and the size becomes `1`. Rule: override **both or neither**.'
      },
      {
        title: 'The rules equals and hashCode must keep',
        text: [
          'Java’s collections trust these rules. The three steps above plus `Objects.hash` over the same fields keep all of them for you.'
        ],
        table: {
          head: ['Rule', 'Means', 'Example'],
          rows: [
            ['Reflexive', 'Everything equals itself', '`a.equals(a)` is `true`'],
            ['Symmetric', 'Both directions agree', '`a.equals(b)` ⇔ `b.equals(a)`'],
            ['Transitive', 'Equal to equal is equal', 'a = b and b = c, so a = c'],
            ['Consistent', 'Same answer each time, while the fields do not change', 'Ask twice, get the same'],
            ['Not equal to null', '`a.equals(null)` is `false`', 'never a crash'],
            ['Hash rule', 'Equal objects have equal hash codes', '`a.equals(b)` → `a.hashCode() == b.hashCode()`'],
            ['Not the other way', 'Equal hash codes do not mean equal', 'Two different points may share a hash code']
          ]
        }
      }
    ],
    technical: [
      'In `Object`, `equals` is literally `return this == obj;`, and `hashCode()` returns the **identity hash code**: a number the JVM picks for each object the first time it is asked, and stores in the object’s header. That number is also what the default `toString()` shows after the `@`.',
      'A `HashSet` is built on a `HashMap`. It mixes the bits of `hashCode()` and keeps only the lowest few as the drawer index. Inside a drawer it first compares the full hash codes and calls `equals` only when they match. So a missing `hashCode` usually means `equals` is never reached.',
      '`Objects.hash(x, y)` computes `31 * (31 * 1 + x) + y`. Multiplying by the odd number 31 spreads different field combinations over different numbers. Records (next lesson) generate an `equals` and a `hashCode` like these for you.',
      'Do not let `hashCode` depend on fields that change while the object sits in a `HashSet`. If the hash changes after `add`, the set looks in the wrong drawer and cannot find or remove the object any more. `final` fields avoid this trap.'
    ],
    tryIt: {
      steps: [
        'Copy `BrokenSet.java` and run it.',
        'Copy the `equals` and `hashCode` methods of `Point` from the main example into `PlainPoint`, and rename `Point that` to `PlainPoint that`.',
        'Add `import java.util.Objects;` at the top and run again.'
      ],
      see: '`places: 2` and `false` before; `places: 1` and `been to (3,4)? true` after.'
    },
    check: [
      { q: '`String a = new String("hi"); String b = new String("hi");` What do `a == b` and `a.equals(b)` give?', a: '`a == b` is `false`: two objects. `a.equals(b)` is `true`: `String` overrides `equals` to compare the characters.' },
      { q: 'Why is the parameter of `equals` of type `Object` and not `Point`?', a: 'Because you override `equals(Object)` from `Object`. `equals(Point p)` would be a new, overloaded method that collections never call. `@Override` would catch this mistake.' },
      { q: 'Your class overrides `equals` but not `hashCode`. What goes wrong?', a: 'Equal objects get different hash codes, so `HashSet` and `HashMap` put them in different buckets: duplicates appear and `contains` fails.' }
    ],
    keyPoints: [
      '`==` asks "same object?"; `equals` asks "same value?".',
      'The `equals` from `Object` is `==`; override it to compare fields.',
      'Header: `public boolean equals(Object other)`, with `@Override`.',
      'Override `hashCode` together with `equals`; use `Objects.hash` on the same fields.',
      'Equal objects must have equal hash codes; the reverse is not needed.'
    ],
    commonMistakes: [
      '`if (p1 == p2)` to compare values. Write `p1.equals(p2)` and override `equals` in the class.',
      '`public boolean equals(Point other)`: this overloads instead of overriding. Use `Object` as the parameter type and add `@Override`.',
      'Overriding `equals` without `hashCode`. Always add `@Override public int hashCode() { return Objects.hash(…); }` with the same fields.',
      'Comparing `String` fields with `==` inside `equals`: `name == that.name`. Write `Objects.equals(name, that.name)`.',
      'Using a field in `hashCode` that changes later while the object is in a `HashSet`. Use `final` fields for `equals` and `hashCode`.'
    ],
    related: ['Creating Objects with new', 'toString: Print an Object', 'Records (Java 16+)', 'Collections', 'Strings']
  }]);
})();
