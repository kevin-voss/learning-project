// Methods (topic 6). This file registers the topic. The lessons follow in
// js/basics/ (01-05) and js/more/ (06-10), each file adds one lesson.
(function () {
  Java.addCoreTopic('methods', {
    label: 'Methods',
    headline: 'Methods,',
    accent: 'reusable steps.',
    intro: 'Give a job a name, write it once, and call it wherever you need it. Hand values in, get one result back.',
    overview: 'Start with why methods exist and how a header reads. Then parameters, return values, the call stack and what Java copies on a call. Finish with overloading, good method design and the errors javac shows you.',
    tryIt: {
      steps: [
        'Make `Shop.java` with `public class Shop` and a `main` method.',
        'Add `static int total(int price, int count)` that returns `price * count`.',
        'Add `static boolean isFree(int cents)` that returns `cents == 0`.',
        'Add `static void printTotal(String item, int cents)` that prints `item: cents cents`.',
        'In `main`, call `printTotal("Apples", total(30, 4))`, then print `isFree(total(10, 0))`.',
        'Compile with `javac Shop.java` and run with `java Shop`.'
      ],
      see: '`Apples: 120 cents` and then `true`.'
    },
    check: [
      { q: 'What does `void` mean in `static void hello()`?', a: 'The method gives no value back. It only does something, like printing.' },
      { q: 'In `add(2, 3)`, what are 2 and 3, and what are `a` and `b` in `static int add(int a, int b)`?', a: '2 and 3 are **arguments**: the values you pass in the call. `a` and `b` are **parameters**: the variables in the header that receive copies of them.' },
      { q: 'What happens at `return a + b;`?', a: 'Java works out `a + b`, ends the method at once and hands that value back to the line that called it.' },
      { q: '`static void reset(int n) { n = 0; }` and in main: `int x = 5; reset(x);`. What is `x` now?', a: '`5`. Java passed a copy of the value. The method changed only its copy.' },
      { q: 'Can a class have `static int area(int side)` and `static int area(int width, int height)` at the same time?', a: 'Yes. That is overloading: same name, different parameter lists. javac picks the one that fits the arguments.' }
    ]
  }, []);
})();
