(function () {
  Java.addCoreTopic('enums', {
    label: 'Enums',
    headline: 'Enums,',
    accent: 'a fixed list of choices.',
    intro: 'Some things have only a few possible values: traffic light colours, days of the week, parcel status. An enum writes that list down once, and the compiler guards it.',
    overview: 'Why not Strings → switch over an enum → enums that carry data.',
    tryIt: {
      steps: [
        'Make `enum Light { RED, YELLOW, GREEN }`.',
        'Write `static Light next(Light now)` with a `switch` that returns the next colour.',
        'In `main`, start at RED and print the next colour four times.'
      ],
      see: '`GREEN`, `YELLOW`, `RED`, `GREEN` (or your own order).'
    },
    check: [
      { q: 'Why is `Status.DELIVRED` better than the String `"DELIVRED"`?', a: 'The enum typo does not compile. The String typo compiles and becomes a bug later.' },
      { q: 'Can you compare enums with `==`?', a: 'Yes. Each constant exists exactly once, so `==` is right and safe.' },
      { q: 'What does `Status.valueOf("SHIPPED")` do if there is no SHIPPED?', a: 'It throws `IllegalArgumentException`. Check text from users before you convert it.' }
    ]
  }, [
    {
      id: 'enum-basics',
      title: 'A Fixed List of Choices',
      category: 'concept',
      icon: 'E',
      tagline: 'Typos stop compiling',
      realWorld: 'A traffic light has three colours. Nobody can switch it to purple. An enum is a type with a fixed guest list.',
      definition: 'An `enum` lists every allowed value once: `enum Status { CREATED, PICKED_UP, DELIVERED }`. A variable of type `Status` can only hold one of them. With a String, any text would be allowed, typos too.',
      why: 'Wrong values are caught by javac, not by your users.',
      whenUse: 'Status, colour, size, direction, role: anything with a short, fixed list.',
      fileName: 'Parcel.java',
      code: `enum Status { CREATED, PICKED_UP, DELIVERED }

public class Parcel {
    public static void main(String[] args) {
        Status status = Status.CREATED;
        // status = Status.DELIVRED;   <- does not compile
        // status = "DELIVERED";       <- does not compile

        status = Status.PICKED_UP;
        System.out.println(status);
        System.out.println(status == Status.PICKED_UP);

        for (Status s : Status.values()) {
            System.out.println(s);
        }
    }
}`,
      tryIt: {
        steps: ['Run the code.', 'Remove the `//` in front of the DELIVRED line and compile.'],
        see: '`PICKED_UP`, `true`, then all three statuses. With the typo: `cannot find symbol`.'
      },
      keyPoints: ['Constants are written in CAPITALS.', '`values()` gives all of them, in order.', 'Compare with `==`.'],
      commonMistakes: ['Using int codes like 0, 1, 2. Nothing stops `status = 7`.'],
      related: ['Control Flow']
    },
    {
      id: 'enum-switch',
      title: 'switch Over an Enum',
      category: 'practice',
      icon: '⑂',
      tagline: 'The compiler counts your cases',
      realWorld: 'A checklist with one box per colour. If someone adds a fourth colour, the checklist shows an empty box.',
      definition: 'A `switch` expression over an enum must cover every constant. If you add a new constant later, every such switch stops compiling until you handle it. Leave out `default` so the compiler can help you.',
      why: 'You cannot forget a case.',
      whenUse: 'Whenever the answer depends on which constant you have.',
      fileName: 'Labels.java',
      code: `enum Status { CREATED, PICKED_UP, DELIVERED }

public class Labels {
    static String label(Status status) {
        return switch (status) {
            case CREATED -> "waiting for pickup";
            case PICKED_UP -> "on the way";
            case DELIVERED -> "done";
        };
    }

    public static void main(String[] args) {
        System.out.println(label(Status.PICKED_UP));
    }
}`,
      tryIt: {
        steps: ['Run the code.', 'Add `RETURNED` to the enum and compile again.'],
        see: '`on the way`. After adding RETURNED: an error that the switch does not cover all values.'
      },
      keyPoints: ['Cover every constant.', 'No default needed, and better without.'],
      commonMistakes: ['Adding `default ->` and losing the compiler’s help.'],
      related: ['Control Flow']
    },
    {
      id: 'enum-data',
      title: 'Enums That Carry Data',
      category: 'habits',
      icon: '+',
      tagline: 'Each constant is a small object',
      realWorld: 'Each coin has a name and a value printed on it. An enum constant can carry its own values too.',
      definition: 'An enum is a class with a fixed set of objects. So it can have fields, a constructor and methods. Each constant passes its own values in brackets.',
      why: 'The data lives next to the choice. No separate lookup table.',
      whenUse: 'When each choice has a label, a price, a size or a rule.',
      fileName: 'Coins.java',
      code: `enum Coin {
    PENNY(1), NICKEL(5), DIME(10), QUARTER(25);

    private final int cents;

    Coin(int cents) { this.cents = cents; }

    int cents() { return cents; }
}

public class Coins {
    public static void main(String[] args) {
        int total = Coin.DIME.cents() + Coin.QUARTER.cents();
        System.out.println(total + " cents");
    }
}`,
      tryIt: {
        steps: ['Run the code.', 'Add a loop over `Coin.values()` that prints each coin and its cents.'],
        see: '`35 cents`, then four lines like `PENNY 1`.'
      },
      keyPoints: ['Constants call the constructor with their values.', 'Store the name, not `ordinal()`, when you save an enum.'],
      commonMistakes: ['Saving `ordinal()` numbers. Reorder the constants and every saved number means something else.'],
      related: ['Classes & Objects']
    }
  ]);
})();
