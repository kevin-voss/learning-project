// JVM & Memory, lesson 11 (Deeper): strings in memory, the string pool, interning and immutability.
(function () {
  Java.addCoreLessons('jvm-memory', [
    {
      id: 'strings-in-memory',
      title: 'Strings in Memory: Pool, Interning, Immutability',
      category: 'deeper',
      icon: '"',
      tagline: 'One shared copy, safe because nobody can change it',
      realWorld: 'The poster of the class rules on the classroom wall. There is one poster, and every child reads the same one. That only works because nobody is allowed to scribble on it. If you want different rules, you make a new poster.',
      kid: [
        'Imagine every child in the class wants to read the word "java". Should every child get their own paper with "java" on it? That wastes a lot of paper.',
        'So the teacher writes "java" once, on a poster on the wall, and everybody looks at the same poster.',
        'But what if one child crosses out a letter? Then everybody would read a wrong word! So there is a rule: nobody may ever change a poster. Want a different word? Make a new poster.',
        'Java strings work exactly like that. The wall of posters is the **string pool**, and the "never change" rule is called **immutable**.'
      ],
      definition: 'The **string pool** is a set of shared `String` objects on the heap. Every string **literal** in your code uses the pooled object for its text. Strings are **immutable**, so sharing one object is always safe. `intern()` returns the pooled object for any string.',
      explain: [
        '[Strings](../strings/index.html) showed you that a String cannot be changed after it is made, and that `==` compares references while `equals` compares the text. Here you see why Java is built that way and what it means for memory.',
        'A **literal** is text written directly in the code, like `"java"`. `javac` stores every literal in the class file\'s constant pool. When the program first uses it, the JVM looks into the **string pool**. If an equal string is already there, it uses that object; if not, it adds one. So every `"java"` literal in the whole program shares one object.',
        'Strings made while the program runs (with `new String(…)`, by joining with a variable, from user input or a file) are ordinary new objects. They are not in the pool, even if their text is the same.',
        '**Interning** means "give me the pooled object for this text". `s.intern()` looks up the pool: if an equal string is there, it returns that one; otherwise it adds `s` and returns it. After interning, `==` works between equal texts. You rarely need it: use `equals`.',
        'Sharing only works because a `String` is **immutable**: no method changes it. `toUpperCase()`, `replace()`, `+`: they all make a **new** String and leave the old one as it was. If strings could change, changing one pooled `"java"` would change the text everywhere in the program.'
      ],
      why: 'Programs use the same texts again and again: names, keys, messages. The pool saves memory, and immutability makes strings safe to share between methods, objects, map keys and threads.',
      whenUse: 'When you wonder why `==` on strings is sometimes `true` and sometimes `false`, why string methods return a new string, and why building text with `+` in a loop makes a lot of garbage.',
      syntax: '`"text"` → pooled object. `new String("text")` → new object, not pooled. `s.intern()` → the pooled object for `s`. Compare text with `a.equals(b)`, never with `==`.',
      fileName: 'StringPool.java',
      code: `public class StringPool {
    public static void main(String[] args) {
        String a = "java";                    // literal: taken from the string pool
        String b = "java";                    // same literal: the same pooled object
        String c = new String("java");        // new: always a fresh object on the heap
        String part = "ja";
        String d = part + "va";               // built while the program runs: a new object
        String e = "ja" + "va";               // two literals: javac joins them at compile time
        String f = d.intern();                // ask the pool for its "java" object

        System.out.println("a == b: " + (a == b));
        System.out.println("a == c: " + (a == c));
        System.out.println("a == d: " + (a == d));
        System.out.println("a == e: " + (a == e));
        System.out.println("a == f: " + (a == f));
        System.out.println("a.equals(c): " + a.equals(c));
    }
}`,
      output: `a == b: true
a == c: false
a == d: false
a == e: true
a == f: true
a.equals(c): true`,
      codeSummary: 'Six variables hold the text "java". Some point to the one pooled object, others to separate objects with the same letters. `==` tells you which is which; `equals` says "same text" for all of them.',
      codeExplanation: [
        { label: 'Line 3', code: 'String a = "java";', text: 'The literal. The JVM puts `"java"` into the pool (the first time) and `a` points to that pooled object.' },
        { label: 'Line 4', code: 'String b = "java";', text: 'The same literal again: no new object. `b` points to the same pooled object, so `a == b` is `true`.' },
        { label: 'Line 5', code: 'String c = new String("java");', text: '`new` always makes a new object on the heap, outside the pool. Same letters, different object: `a == c` is `false`.' },
        { label: 'Line 7', code: 'String d = part + "va";', text: '`part` is a variable, so the join happens while the program runs and makes a new object. `a == d` is `false`.' },
        { label: 'Line 8', code: 'String e = "ja" + "va";', text: 'Both parts are literals, so `javac` already joins them into the literal `"java"`. It is pooled: `a == e` is `true`.' },
        { label: 'Line 9', code: 'String f = d.intern();', text: 'Asks the pool for its `"java"`. The pool already has the object of `a`, so `f` points to it: `a == f` is `true`.' },
        { label: 'Line 16', code: 'a.equals(c)', text: '`equals` compares the letters. All six variables hold the same text, so `equals` is always `true`. This is the comparison you use in real code.' }
      ],
      sections: [
        {
          title: 'The memory picture',
          text: ['Six variables, but only three `String` objects with the text "java". The pool is a part of the heap.'],
          mermaid: 'flowchart LR\n  subgraph ST["Stack: frame of main"]\n    A["a"]\n    B["b"]\n    E["e"]\n    F["f"]\n    C["c"]\n    D["d"]\n  end\n  subgraph HP["Heap"]\n    subgraph POOL["String pool"]\n      J["String java"]\n    end\n    J2["String java, made by new"]\n    J3["String java, joined at run time"]\n  end\n  A --> J\n  B --> J\n  E --> J\n  F --> J\n  C --> J2\n  D --> J3',
          diagramNote: '`a`, `b`, `e` and `f` share the pooled object. `c` and `d` each have their own object with the same letters.'
        },
        {
          title: 'What javac joins, and what it does not',
          text: [
            'An expression made only of literals and `final` variables that hold literals is a **compile-time constant**: `javac` computes it and writes the result into the class file as a literal. Everything else is joined while the program runs.'
          ],
          code: `public class Constants {
    public static void main(String[] args) {
        final String fixed = "ja";            // final + literal: a compile-time constant
        String changing = "ja";               // a normal variable
        String literal = "java";

        String one = fixed + "va";            // javac joins this already
        String two = changing + "va";         // joined only while the program runs

        System.out.println("one == literal: " + (one == literal));
        System.out.println("two == literal: " + (two == literal));
        System.out.println("two.equals(literal): " + two.equals(literal));
    }
}`,
          fileName: 'Constants.java',
          output: `one == literal: true
two == literal: false
two.equals(literal): true`,
          tip: '`javap -c Constants` shows it: `one` is loaded with `ldc "java"` (a finished literal), while `two` is built by `invokedynamic … makeConcatWithConstants` at run time.'
        },
        {
          title: 'Immutable: a change makes a new object',
          text: [
            '`first.toUpperCase()` does not touch `"cat"`. It returns a new String `"CAT"`. `second` still points to the unchanged `"cat"`.',
            'A `StringBuilder` is the opposite: it is **mutable**. `append` changes the one object, and every variable that points to it sees the change.'
          ],
          code: `public class Immutable {
    public static void main(String[] args) {
        String first = "cat";
        String second = first;                 // two arrows to one String object
        String upper = first.toUpperCase();    // a NEW object; "cat" stays as it is

        System.out.println("first:  " + first);
        System.out.println("second: " + second);
        System.out.println("upper:  " + upper);
        System.out.println("first == second: " + (first == second));

        StringBuilder builder = new StringBuilder("cat");
        StringBuilder alias = builder;          // two arrows to one builder
        builder.append("s");                    // changes the one shared object
        System.out.println("alias sees: " + alias);
    }
}`,
          fileName: 'Immutable.java',
          output: `first:  cat
second: cat
upper:  CAT
first == second: true
alias sees: cats`
        },
        {
          title: 'Why Java made strings immutable',
          table: {
            head: ['Reason', 'What would go wrong if strings could change'],
            rows: [
              ['**The pool is safe**', 'changing one pooled `"java"` would change it for every literal in the program'],
              ['**Map keys stay findable**', 'a `HashMap` files a key by its hash code; a key whose text changes would be filed in the wrong place and never found again'],
              ['**The hash code is computed once**', 'a String remembers its hash code after the first call, because the text cannot change'],
              ['**Safe to share between threads**', 'no thread can change a String while another reads it'],
              ['**Safe to check once**', 'a method checks a file name, then opens it; nobody can change the name in between']
            ]
          }
        },
        {
          title: 'The memory cost of `+` in a loop',
          text: [
            'Because a String cannot change, `text = text + i` makes a **new** String every round and drops the old one. With 5 rounds that is harmless. With 100,000 rounds it makes 100,000 strings of growing length, and copies all the letters every time. A `StringBuilder` changes one object in place. [Strings](../strings/index.html) shows `StringBuilder` in detail.'
          ],
          code: `public class ConcatLoop {
    public static void main(String[] args) {
        String text = "";
        for (int i = 0; i < 5; i++) {
            text = text + i;                   // each round makes a new String object
        }
        System.out.println(text);

        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < 5; i++) {
            builder.append(i);                 // one builder, changed in place
        }
        System.out.println(builder.toString());
    }
}`,
          fileName: 'ConcatLoop.java',
          output: `01234
01234`,
          mermaid: 'flowchart LR\n  S0["empty string"] -->|"+ 0"| S1["0"]\n  S1 -->|"+ 1"| S2["01"]\n  S2 -->|"+ 2"| S3["012"]\n  S3 -->|"+ 3"| S4["0123"]\n  S4 -->|"+ 4"| S5["01234: the only one still used"]',
          diagramNote: 'With `+`, every box is a separate String object; the first five become garbage at once. With `StringBuilder` there is one object that grows.'
        }
      ],
      technical: [
        'Since Java 7 the string pool lives on the normal heap, so pooled strings that are no longer used anywhere can be collected like other objects. HotSpot keeps the pool as a hash table; `-XX:+PrintStringTableStatistics` prints its size when the JVM exits.',
        'Since Java 9 a String stores its letters in a `byte[]`. If all letters fit into Latin-1 (one byte each), it uses one byte per letter; otherwise two (UTF-16). This **compact strings** feature halves the memory for most English text. G1 can also find different String objects with equal letters and let them share one array (`-XX:+UseStringDeduplication`).',
        'Calling `intern()` on many strings made at run time can save memory when the same texts repeat a lot (for example, reading city names from a big file). But the lookup costs time and the pool grows. In normal code, `equals` is the right tool, and the JVM\'s own sharing is enough.'
      ],
      tryIt: {
        steps: [
          'Save the example as `StringPool.java` and run `java StringPool.java`.',
          'Change line 6 to `final String part = "ja";` and run again.',
          'Change line 5 to `String c = new String("java").intern();` and run once more.'
        ],
        see: 'First `a == d: false`. With `final`, `part + "va"` is a compile-time constant, so `a == d: true`. With `intern()` on line 5, `a == c: true` as well. `a.equals(c)` stays `true` the whole time.'
      },
      check: [
        { q: 'Why is `"java" == "java"` true, but `new String("java") == "java"` false?', a: 'Both literals point to the one pooled object. `new` always makes a separate object outside the pool, so the references differ.' },
        { q: 'What does `s.intern()` return?', a: 'The pooled String with the same text as `s`. If there is none yet, `s` is added to the pool and returned.' },
        { q: 'Why can Java share one String object between many variables without danger?', a: 'Strings are immutable. No method can change the letters, so nobody can change the text "under the feet" of another variable.' }
      ],
      keyPoints: [
        'Every string literal uses one shared object from the string pool.',
        '`new String(…)` and strings joined at run time are new objects outside the pool.',
        '`intern()` returns the pooled object; `equals` compares text and is what you use.',
        'Strings are immutable: every "change" returns a new String.',
        'Immutability makes the pool, map keys and sharing between threads safe.'
      ],
      commonMistakes: [
        'Comparing text with `==`: `input == "yes"` is often `false` for typed input. Write `"yes".equals(input)`.',
        'Expecting `name.toUpperCase();` to change `name`: the result is a new String. Write `name = name.toUpperCase();`.',
        'Building long text with `+` in a big loop: makes a new String each round. Use a `StringBuilder`.',
        'Calling `intern()` everywhere "to save memory": it costs time and rarely helps. Use `equals` and let the JVM share.'
      ],
      related: ['Strings', 'heap-objects', 'gc']
    }
  ]);
})();
