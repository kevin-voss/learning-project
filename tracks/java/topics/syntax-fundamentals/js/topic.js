// Syntax fundamentals: the topic-level practice. The lessons live in grammar/, organization/
// and errors.js; each file pushes its lesson onto Java.topics.syntaxFundamentals.lessons.
Java.topics.syntaxFundamentals = Java.topics.syntaxFundamentals || {};
Java.topics.syntaxFundamentals.lessons = [];

Java.topics.syntaxFundamentals.tryIt = {
  steps: [
    'Make a folder `~/java-practice/grammar` and in it a file `Grammar.java` with a public class `Grammar` and a `main` method.',
    'Above the class, write a Javadoc comment `/** Prints a tiny weather report. */`. Inside `main`, write a `//` comment that says what the next line does.',
    'Add a constant `static final int MAX_TEMPERATURE = 30;` above `main` and print it with `System.out.println("Max: " + MAX_TEMPERATURE);`.',
    'Add `import java.time.LocalDate;` at the very top and print `LocalDate.of(2026, 7, 1)`.',
    'Compile with `javac Grammar.java` and run with `java Grammar`. Then delete one `;`, compile again and read the error: file, line, message, caret. Put the `;` back.'
  ],
  see: 'first `Max: 30` and `2026-07-01`; after you delete the semicolon, `Grammar.java:<line>: error: \';\' expected` with a `^` under the spot, and `1 error`. After the fix, the two lines print again.'
};

Java.topics.syntaxFundamentals.check = [
  { q: 'What ends almost every Java statement, and what ends a class or a method?', a: 'A statement ends with a semicolon `;`. A class, a method, an `if` or a loop ends with the closing brace `}` of its block, with no semicolon.' },
  { q: 'Which of these names are legal identifiers: `totalPrice`, `2ndPlace`, `first-name`, `_count`, `class`?', a: '`totalPrice` and `_count` are legal. `2ndPlace` starts with a digit, `first-name` contains the minus operator, and `class` is a keyword.' },
  { q: 'Which name follows Java style for a class, a variable and a constant: `ShoppingCart`, `shoppingCart`, `SHOPPING_CART`?', a: '`ShoppingCart` is a class (PascalCase), `shoppingCart` is a variable or method (camelCase), `SHOPPING_CART` is a constant (UPPER_SNAKE_CASE).' },
  { q: 'A file starts with `package com.example.shop;`. In which folder does it live, and how do you run its class `Main`?', a: 'In `com/example/shop/` below the source root (for example `src/com/example/shop/Main.java`). After `javac -d out ...` you run it with its full name from the project folder: `java -cp out com.example.shop.Main`.' },
  { q: 'javac prints `Receipt.java:4: error: \';\' expected`. What do you do first?', a: 'Open `Receipt.java` at line 4 and look at the caret `^`: the semicolon is missing at the end of that line (or the line before). Fix only the first error, then compile again, because later errors are often follow-on errors.' }
];
