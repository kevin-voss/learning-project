(function () {
  Java.addCoreTopic('strings', {
    label: 'Text',
    headline: 'Strings,',
    accent: 'text with rules.',
    intro: 'Compare text correctly, call common methods, and build larger text without fighting immutability.',
    overview: 'String is a reference type, but it is so common that beginners should learn its special habits early.',
    tryIt: {
      steps: [
        'Make `Shout.java`. Store your name in a String.',
        'Print the name in capitals with `toUpperCase()`, and its `length()`.',
        'Compare it with `"mia"` using `.equals(...)` and `.equalsIgnoreCase(...)`.'
      ],
      see: 'your name in capitals, a number, then `false` and (if your name is Mia) `true`.'
    },
    check: [
      { q: 'Why use `a.equals(b)` instead of `a == b` for texts?', a: '`==` asks "same object?". `.equals` asks "same letters?". You almost always want the letters.' },
      { q: 'After `name.toUpperCase();` is `name` in capitals?', a: 'No. Strings never change. Keep the result: `name = name.toUpperCase();`.' },
      { q: 'Which tool builds a long text in a loop?', a: '`StringBuilder`, with `append(...)`.' }
    ]
  }, [
    {
      id: 'equality',
      title: 'String Equality',
      category: 'concept',
      icon: '==',
      tagline: 'Use equals for text',
      definition: 'String values are objects. Use equals to compare text contents instead of ==.',
      realWorld: 'Two printed tickets can contain the same name even if they are two separate pieces of paper.',
      syntax: 'name.equals("Ada") checks text content. "Ada".equals(name) avoids a null crash.',
      fileName: 'StringEquality.java',
      code: `public class StringEquality {
    public static void main(String[] args) {
        String first = "Ada";
        String second = new String("Ada");

        System.out.println(first == second);
        System.out.println(first.equals(second));
        System.out.println("Ada".equals(first));
    }
}`,
      keyPoints: [
        'equals checks text content.',
        '== checks whether two references point to the same object.',
        'String literals may be pooled, which makes == especially misleading.'
      ],
      commonMistakes: [
        'Using == for user input text.',
        'Calling name.equals("Ada") when name might be null.',
        'Forgetting strings are immutable.'
      ],
      related: ['Types & Variables', 'Classes & Objects']
    },
    {
      id: 'common-methods',
      title: 'Common String Methods',
      category: 'practice',
      icon: 'abc',
      tagline: 'Ask useful text questions',
      definition: 'String methods return information or new strings. They do not change the original string.',
      realWorld: 'A photocopier can make a marked-up copy, but the original document stays the same.',
      syntax: 'trim, toLowerCase, contains, startsWith, substring, and split are common beginner tools.',
      fileName: 'StringMethods.java',
      code: `public class StringMethods {
    public static void main(String[] args) {
        String raw = "  Java Basics  ";
        String cleaned = raw.trim().toLowerCase();

        System.out.println(cleaned);
        System.out.println(cleaned.contains("java"));
        System.out.println(cleaned.substring(0, 4));
        System.out.println(raw);
    }
}`,
      keyPoints: [
        'Most String methods return a new value.',
        'Store the result if you want to use the changed text.',
        'Indexes in substring are zero-based.'
      ],
      commonMistakes: [
        'Calling raw.trim() without saving or using the result.',
        'Using substring indexes outside the string length.',
        'Ignoring case differences in comparisons.'
      ],
      related: ['Arrays', 'I/O Basics']
    },
    {
      id: 'builder-format',
      title: 'StringBuilder and Formatting',
      category: 'habits',
      icon: 'fmt',
      tagline: 'Build readable output',
      definition: 'StringBuilder is useful when building text in steps. formatted and printf help place values into templates.',
      realWorld: 'StringBuilder is a notepad you keep editing before reading the final text.',
      syntax: 'Use builder.append(value) repeatedly, then builder.toString() when finished.',
      fileName: 'StringBuilderDemo.java',
      code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder builder = new StringBuilder();
        builder.append("Items");
        builder.append(": ");
        builder.append(3);

        String message = "%s costs $%.2f".formatted("Notebook", 4.5);
        System.out.println(builder.toString());
        System.out.println(message);
    }
}`,
      keyPoints: [
        'StringBuilder avoids creating many intermediate strings in loops.',
        'formatted returns a string.',
        'printf prints formatted output directly.'
      ],
      commonMistakes: [
        'Using StringBuilder for tiny one-line concatenation where + is clearer.',
        'Forgetting to call toString when a String is required.',
        'Using the wrong format specifier.'
      ],
      related: ['I/O Basics']
    }
  ]);
})();
