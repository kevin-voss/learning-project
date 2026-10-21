// Control Flow: shared glossary, the empty lesson list and the topic-level practice.
// Every lesson file in branches/, loops/ and loop-control/ pushes one lesson onto
// Java.topics.controlFlow.lessons, in page order.
Java.topics.controlFlow = Java.topics.controlFlow || {};

Java.topics.controlFlow.glossary = [
  { term: 'control flow', definition: 'The order in which the lines of a program run. Branches and loops change that order.' },
  { term: 'condition', definition: 'A question with a true or false answer, such as `score >= 50`. It decides whether a branch or a loop runs.' },
  { term: 'boolean', definition: 'A value that is either true or false.' },
  { term: 'branch', definition: 'One of the paths the program can take after a decision.' },
  { term: 'nested', definition: 'Placed inside another one of the same kind, like an if inside an if or a loop inside a loop.' },
  { term: 'switch', definition: 'A structure that jumps to the case that matches a value.' },
  { term: 'fall-through', definition: 'In a classic switch: without break, Java keeps running the next case too.' },
  { term: 'switch expression', definition: 'A switch that gives back one value, written with `->` arrows.' },
  { term: 'yield', definition: 'Hands the value of a switch expression back from inside a block.' },
  { term: 'loop', definition: 'Code that repeats a block while a condition stays true.' },
  { term: 'iteration', definition: 'One run through the body of a loop.' },
  { term: 'loop body', definition: 'The block inside the braces of a loop: the part that repeats.' },
  { term: 'loop variable', definition: 'The counter a loop changes on each round, often called `i`.' },
  { term: 'trace table', definition: 'A table that writes down the value of each variable after each step, so you can follow a program by hand.' },
  { term: 'flowchart', definition: 'A picture of a program: boxes for actions, diamonds for questions, arrows for the order.' },
  { term: 'enhanced for', definition: 'A loop that visits every item of an array or list, one after another, without an index.' },
  { term: 'break', definition: 'Leaves the nearest loop or switch at once.' },
  { term: 'continue', definition: 'Skips the rest of this round of the loop and starts the next round.' },
  { term: 'label', definition: 'A name with a colon in front of a loop, such as `outer:`. `break outer;` leaves that loop.' },
  { term: 'infinite loop', definition: 'A loop whose condition never becomes false, so it never stops by itself.' },
  { term: 'off-by-one error', definition: 'A loop that runs one time too many or one time too few.' },
  { term: 'bytecode', definition: 'The instructions javac writes into a .class file. The JVM runs them.' }
];

Java.topics.controlFlow.lessons = [];

Java.topics.controlFlow.tryIt = {
  steps: [
    'Make a file `FizzCount.java` with a `public class FizzCount` and a `main` method.',
    'Write a `for` loop that counts `i` from 1 to 15.',
    'Inside the loop, print `FizzBuzz` when `i % 15 == 0`, `Fizz` when `i % 3 == 0`, `Buzz` when `i % 5 == 0`, and the number itself otherwise. Use one `if / else if / else` chain and put the `% 15` test first.',
    'After the loop, add a `while` loop that halves `int n = 100;` (`n = n / 2;`) and prints `n` until `n` is 0.',
    'Run `java FizzCount.java` and compare the numbers with a trace table you write on paper first.'
  ],
  see: '`1`, `2`, `Fizz`, `4`, `Buzz`, `Fizz` … `14`, `FizzBuzz`, and then `50`, `25`, `12`, `6`, `3`, `1`, `0`.'
};

Java.topics.controlFlow.check = [
  { q: 'An `if / else if / else` chain tests `score >= 50` before `score >= 90`. What does it print for 95, and how do you fix it?', a: 'It prints the result of the `>= 50` branch, because the first true test wins and Java skips the rest. Put the strictest test (`>= 90`) first.' },
  { q: 'What happens in a classic `switch` when a `case` has no `break`?', a: 'Fall-through: Java keeps running the code of the next cases until it meets a `break` or the end of the switch. Arrow cases (`->`) never fall through.' },
  { q: 'How many times does `for (int i = 0; i < 3; i++)` run, and how many times does `for (int i = 1; i <= 3; i++)` run?', a: 'Both run three times. The first has i = 0, 1, 2. The second has i = 1, 2, 3.' },
  { q: 'When is `do-while` better than `while`?', a: 'When the body must run at least once before the first check, for example asking a question before you can test the answer.' },
  { q: 'Inside two nested loops, what does a plain `break;` leave?', a: 'Only the inner loop, the nearest one. The outer loop goes on with its next round. To leave both, use a labelled break such as `break outer;`.' }
];
