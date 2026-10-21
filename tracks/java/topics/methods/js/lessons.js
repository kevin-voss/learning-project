(function () {
  Java.addCoreTopic('methods', {
    label: 'Methods',
    headline: 'Methods,',
    accent: 'reusable steps.',
    intro: 'Break beginner programs into named actions with inputs, outputs, and small responsibilities.',
    overview: 'Start with parameters and return values, then learn overloading and simple method boundaries.',
    tryIt: {
      steps: [
        'Make `Shop.java` with a method `static int total(int price, int count)` that returns price times count.',
        'In `main`, print `total(3, 4)` and `total(10, 0)`.',
        'Compile and run.'
      ],
      see: '`12` and then `0`.'
    },
    check: [
      { q: 'What does `void` mean in `static void hello()`?', a: 'The method gives nothing back. It only does something, like printing.' },
      { q: 'In `add(2, 3)`, what are 2 and 3?', a: 'Arguments: the values you pass in. Inside the method they arrive as parameters `a` and `b`.' },
      { q: 'What happens at `return`?', a: 'The method stops and hands the value back to the line that called it.' }
    ]
  }, [
    {
      id: 'parameters-return',
      anim: 'vending',
      title: 'Parameters and Return Values',
      category: 'concept',
      icon: 'fn',
      tagline: 'Inputs in, result out',
      definition: 'A method is a named block of code. Parameters receive inputs, and return sends one result back to the caller.',
      realWorld: 'A method is like a kitchen station: give it ingredients, it does one job, and it hands back the finished item.',
      syntax: 'static int add(int a, int b) declares a method named add that receives two int values and returns an int.',
      fileName: 'MethodBasics.java',
      code: `public class MethodBasics {
    static int add(int a, int b) {
        return a + b;
    }

    static String labelScore(String name, int score) {
        return name + ": " + score;
    }

    public static void main(String[] args) {
        int total = add(7, 5);
        System.out.println(labelScore("Ada", total));
    }
}`,
      keyPoints: [
        'A method name should describe one action.',
        'Parameters are local variables created for a method call.',
        'return ends the method and sends a value back.',
        'void means the method returns no value.'
      ],
      commonMistakes: [
        'Forgetting to return a value from a non-void method.',
        'Doing too many unrelated things in one method.',
        'Confusing parameters with arguments passed at the call site.'
      ],
      related: ['Control Flow', 'Types & Variables']
    },
    {
      id: 'void-and-static',
      title: 'void and static',
      category: 'practice',
      icon: '()',
      tagline: 'Use helper methods from main',
      definition: 'A void method performs an action without returning a value. A static method belongs to the class, which is why main can call it directly.',
      realWorld: 'A void method is like pressing a printer button: it does work, but it does not hand you a calculation result.',
      syntax: 'Use static helper methods while learning single-file programs. Instance methods make more sense once objects enter the path.',
      fileName: 'VoidHelpers.java',
      code: `public class VoidHelpers {
    static void printHeader(String title) {
        System.out.println("== " + title + " ==");
    }

    static void printLine(String label, int value) {
        System.out.println(label + ": " + value);
    }

    public static void main(String[] args) {
        printHeader("Cart");
        printLine("Items", 3);
        printLine("Total cents", 1299);
    }
}`,
      keyPoints: [
        'void methods are useful for printing, saving, or changing state.',
        'static helpers are fine for early command-line programs.',
        'Keep helpers near the code that uses them in beginner files.'
      ],
      commonMistakes: [
        'Trying to store the result of a void method.',
        'Marking everything static forever instead of learning objects next.',
        'Printing inside every method when returning a value would be easier to test.'
      ],
      related: ['Classes & Objects', 'Testing']
    },
    {
      id: 'overloading',
      title: 'Overloading',
      category: 'habits',
      icon: '+',
      tagline: 'Same name, different parameters',
      definition: 'Method overloading means multiple methods share a name but have different parameter lists.',
      realWorld: 'A search box can search by title, by title and year, or by title and author. The action name stays familiar.',
      syntax: 'Java chooses an overload at compile time based on argument count and types.',
      fileName: 'OverloadingDemo.java',
      code: `public class OverloadingDemo {
    static String badge(String name) {
        return badge(name, "beginner");
    }

    static String badge(String name, String level) {
        return name + " [" + level + "]";
    }

    static int area(int side) {
        return side * side;
    }

    static int area(int width, int height) {
        return width * height;
    }

    public static void main(String[] args) {
        System.out.println(badge("Mina"));
        System.out.println(badge("Kai", "practice"));
        System.out.println(area(4));
        System.out.println(area(4, 7));
    }
}`,
      keyPoints: [
        'Overloads must differ by parameter list.',
        'Return type alone is not enough to overload.',
        'Use overloading when the methods really mean the same action.'
      ],
      commonMistakes: [
        'Creating confusing overloads that do unrelated work.',
        'Expecting Java to overload only by return type.',
        'Making overloads ambiguous with null or similar numeric types.'
      ],
      related: ['Classes & Objects', 'Testing']
    }
  ]);
})();
