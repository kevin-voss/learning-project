// Lesson 8: designing small methods (one job, good names, return instead of print).
(function () {
  Java.addCoreLessons('methods', [{
    id: 'small-methods',
    title: 'Designing Small Methods',
    category: 'habits',
    icon: '1',
    tagline: 'One job, a good name',
    realWorld: 'A toolbox. A hammer does one thing, a screwdriver does one thing. A tool that tried to be a hammer, a saw and a spoon at the same time would be bad at all three.',
    kid: [
      'Tidying your whole room is a big job. It feels much easier as small jobs: put the books on the shelf, put the toys in the box, put the clothes in the basket.',
      'Each small job has a clear name. When you finish one, you know it is done right. Then you do the next.',
      'Good methods are like that. Each one does one small job, and its name tells you which job.'
    ],
    definition: 'A well-designed method does **one job**, has a name that says that job, gets what it needs through its parameters, and returns its result instead of printing it when the caller might need the value.',
    explain: [
      '**One job.** If you need the word "and" to describe a method (`readAndCheckAndPrint`), it does too much. Split it. A helpful size while you learn: a method fits on your screen, often 3 to 20 lines.',
      '**Good names.** A method name is usually a verb: `calculateTotal`, `printReceipt`, `countVowels`. A method that answers yes or no starts with `is`, `has` or `can`: `isEven`, `hasDiscount`. Names like `doStuff`, `process` or `method1` tell the reader nothing.',
      '**Inputs through parameters.** A method that gets everything through its parameters is easy to understand: you see in the header what it depends on. Same inputs, same result.',
      '**Return, then print.** A method that returns a value can be reused: you can print it, add to it, compare it. A method that only prints is a dead end. Keep the printing in a few places, often `main` or a small `print...` method.',
      '**main tells the story.** When each part is a named method, `main` reads like a list of steps. A reader understands the program from `main` alone and opens a method only to see its details.'
    ],
    why: 'Small named methods are easier to read, to test and to fix. A bug in `applyDiscount` can only be inside `applyDiscount`.',
    whenUse: 'Every time you write a method. Look again when a method grows past one screen, when a part of it needs a comment to explain it, or when its name contains "and".',
    syntax: '`static boolean isX(...)` for yes/no questions, `static Type calculateX(...)` or a noun like `subtotal(...)` for results, `static void printX(...)` for output.',
    fileName: 'Receipt.java',
    code: `public class Receipt {
    static int subtotal(int priceCents, int quantity) {
        return priceCents * quantity;
    }

    static boolean hasDiscount(int cents) {
        return cents >= 5000;               // 50 euros or more
    }

    static int applyDiscount(int cents) {
        if (hasDiscount(cents)) {
            return cents * 90 / 100;        // 10 percent off
        }
        return cents;
    }

    static String formatEuro(int cents) {
        int euros = cents / 100;
        int rest = cents % 100;
        if (rest < 10) {
            return euros + ".0" + rest + " EUR";
        }
        return euros + "." + rest + " EUR";
    }

    static void printLine(String label, int cents) {
        System.out.println(label + ": " + formatEuro(cents));
    }

    public static void main(String[] args) {
        int sum = subtotal(1299, 4);
        int toPay = applyDiscount(sum);
        printLine("Subtotal", sum);
        printLine("To pay", toPay);
        System.out.println("Discount? " + hasDiscount(sum));
    }
}`,
    output: `Subtotal: 51.96 EUR
To pay: 46.76 EUR
Discount? true`,
    codeSummary: 'Five small methods, each with one job: compute, check, change, format, print. `main` reads like a short story of what happens.',
    codeExplanation: [
      { label: 'Line 2', code: 'static int subtotal(int priceCents, int quantity) {', text: 'One job: price times quantity. Money is kept in whole cents, so no decimals can go wrong.' },
      { label: 'Line 6', code: 'static boolean hasDiscount(int cents) {', text: 'A yes/no question, so the name starts with `has` and the result is `boolean`.' },
      { label: 'Line 11', code: 'if (hasDiscount(cents)) {', text: 'Methods build on each other. `applyDiscount` does not repeat the rule; it asks `hasDiscount`.' },
      { label: 'Line 12', code: 'return cents * 90 / 100;', text: '5196 * 90 / 100 is 4676 cents (integer division drops the rest).' },
      { label: 'Line 17', code: 'static String formatEuro(int cents) {', text: 'Turns cents into text like `46.76 EUR`. It returns the text; it does not print.' },
      { label: 'Line 20', code: 'if (rest < 10) {', text: 'An edge case: 5 cents must show as `.05`, not `.5`. One method, one place to get it right.' },
      { label: 'Line 26', code: 'static void printLine(String label, int cents) {', text: 'The only method that prints a price line. If the layout changes, you change one place.' },
      { label: 'Line 31', code: 'int sum = subtotal(1299, 4);', text: '`main` only connects the steps. You can read the whole program from here.' },
      { label: 'Line 35', code: 'System.out.println("Discount? " + hasDiscount(sum));', text: 'Because `hasDiscount` returns a value, `main` can reuse it here.' }
    ],
    sections: [
      {
        title: 'Before: everything in main',
        text: [
          'Here is the same program in one long `main`. It works and prints the same. But you need comments to see where one part ends and the next begins, and nothing can be reused.'
        ],
        fileName: 'ReceiptLong.java',
        code: `public class ReceiptLong {
    public static void main(String[] args) {
        // subtotal
        int sum = 1299 * 4;
        // discount
        int toPay = sum;
        if (sum >= 5000) {
            toPay = sum * 90 / 100;
        }
        // print the subtotal
        int rest = sum % 100;
        if (rest < 10) {
            System.out.println("Subtotal: " + sum / 100 + ".0" + rest + " EUR");
        } else {
            System.out.println("Subtotal: " + sum / 100 + "." + rest + " EUR");
        }
        // print the amount to pay: the same lines again
        rest = toPay % 100;
        if (rest < 10) {
            System.out.println("To pay: " + toPay / 100 + ".0" + rest + " EUR");
        } else {
            System.out.println("To pay: " + toPay / 100 + "." + rest + " EUR");
        }
        System.out.println("Discount? " + (sum >= 5000));
    }
}`,
        output: `Subtotal: 51.96 EUR
To pay: 46.76 EUR
Discount? true`,
        tip: 'Every comment like `// discount` is a hint: this part wants to be a method called `applyDiscount`.'
      },
      {
        title: 'Split by job',
        text: [
          'Each box below is one method of `Receipt`. An arrow means "calls". Every box does one job you can say in a few words.'
        ],
        mermaid: `flowchart TD
    M["main: tells the story"] --> S["subtotal: price times quantity"]
    M --> A["applyDiscount: 10 percent off"]
    M --> P["printLine: one line of output"]
    A --> H["hasDiscount: 50 euros or more?"]
    P --> F["formatEuro: cents to text"]`,
        diagramNote: 'If the discount rule changes, you open only `hasDiscount`. If the money format changes, only `formatEuro`.'
      },
      {
        title: 'Name it by what it does',
        table: {
          head: ['Weak', 'Better', 'Why'],
          rows: [
            ['`doIt()`', '`calculateTotal()`', 'says what it computes'],
            ['`check(int n)`', '`isEven(int n)`', 'a yes/no question starts with `is`'],
            ['`data()`', '`readAge()`', 'a verb plus the thing'],
            ['`printAndSave()`', '`printReport()` + `saveReport()`', '"and" means two jobs'],
            ['`calc2(int s)`', '`areaOfSquare(int side)`', 'no numbers; name the job and the input']
          ]
        }
      },
      {
        title: 'Return instead of print',
        text: [
          '`printAverage` prints the average and gives nothing back. The caller cannot use the number. `average` returns it, so the caller can print it, compare it, or pass it on.'
        ],
        fileName: 'AverageDemo.java',
        code: `public class AverageDemo {
    static void printAverage(int a, int b) {    // a dead end
        System.out.println((a + b) / 2.0);
    }

    static double average(int a, int b) {       // reusable
        return (a + b) / 2.0;
    }

    public static void main(String[] args) {
        printAverage(7, 9);

        double avg = average(7, 9);
        System.out.println(avg);
        if (avg > 7.5) {
            System.out.println("above 7.5");
        }
        System.out.println(average(7, 9) + average(1, 2));
    }
}`,
        output: `8.0
8.0
above 7.5
9.5`
      },
      {
        title: 'Small methods are easy to check',
        text: [
          'A method that only uses its parameters and returns a value always gives the same result for the same inputs. Such a method is called **pure**. You can check it with a few calls and known answers.',
          'Below, a tiny `check` method compares results with what you expect. Later, [Testing](../testing/index.html) does the same with a real tool called JUnit.'
        ],
        fileName: 'CheckMethods.java',
        code: `public class CheckMethods {
    static boolean isEven(int n) {
        return n % 2 == 0;
    }

    static int applyDiscount(int cents) {
        if (cents >= 5000) {
            return cents * 90 / 100;
        }
        return cents;
    }

    static void check(String label, boolean ok) {
        System.out.println((ok ? "ok   " : "FAIL ") + label);
    }

    public static void main(String[] args) {
        check("4 is even", isEven(4));
        check("7 is not even", !isEven(7));
        check("no discount below 50 euros", applyDiscount(4999) == 4999);
        check("10 percent off at 50 euros", applyDiscount(5000) == 4500);
    }
}`,
        output: `ok   4 is even
ok   7 is not even
ok   no discount below 50 euros
ok   10 percent off at 50 euros`,
        tip: '`ok ? "ok   " : "FAIL "` is the conditional operator from [Operators](../operators/index.html): if `ok` is true it gives the first text, otherwise the second.'
      }
    ],
    technical: [
      'Small methods cost almost nothing at run time. The JVM\'s **JIT compiler** (just-in-time compiler: it turns often-used bytecode into machine code while the program runs) **inlines** small methods: it copies their body into the caller, so the call disappears.',
      'By default the HotSpot JVM inlines methods smaller than 35 bytes of bytecode (`-XX:MaxInlineSize`), and larger ones too when they are called very often. So never avoid small methods for speed.',
      'Small methods also make stack traces clearer. When something breaks in `formatEuro`, the top line of the trace already names the job that failed.'
    ],
    tryIt: {
      steps: [
        'Start with this method: `static void handle(int a, int b) { System.out.println(a * b); System.out.println(a * b > 100); }`.',
        'Split it into `static int product(int a, int b)` and `static boolean isBig(int value)`.',
        'In `main`, print `product(12, 10)` and `isBig(product(12, 10))`.',
        'Compile and run.'
      ],
      see: '`120` and `true`.'
    },
    check: [
      { q: 'A method is called `loadAndSortAndPrint`. What does the name tell you?', a: 'It does three jobs. Split it into `load`, `sort` and `print` methods.' },
      { q: 'Which name fits a method that returns `true` when a year is a leap year?', a: '`isLeapYear(int year)`. Yes/no methods start with `is`, `has` or `can`.' },
      { q: 'Why is `static double average(int a, int b)` better than `static void printAverage(int a, int b)`?', a: 'The caller gets the value and can print, compare or reuse it. A printing method gives nothing back.' }
    ],
    keyPoints: [
      'One method, one job. "And" in the name means split it.',
      'Verb names for actions; `is`/`has`/`can` for yes/no.',
      'Get inputs through parameters; give results back with `return`.',
      'Print in few places; compute everywhere else.',
      '`main` should read like a list of steps.'
    ],
    commonMistakes: [
      'One huge `main` with comments as headings. Fix: turn each commented part into a method with that name.',
      'Vague names like `doStuff()`. Fix: name the job: `printReceipt()`.',
      'Printing inside a calculating method: `static void total(...)` with `println`. Fix: `return` the value and print in `main`.',
      'Copying a rule into two methods, like `cents >= 5000` twice. Fix: put it in one method (`hasDiscount`) and call it.'
    ],
    related: ['void and static', 'Common Method Errors', 'Testing']
  }]);
})();
