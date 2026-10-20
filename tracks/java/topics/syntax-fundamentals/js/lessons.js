Java.topics.syntaxFundamentals = Java.topics.syntaxFundamentals || {};

function syntaxPracticeCommands(fileName, className) {
  return [
    {
      label: 'Create and enter the syntax folder',
      note: 'Use one folder for these small syntax examples so compile and run commands stay predictable.',
      command: `mkdir -p ~/java-practice/syntax-fundamentals
cd ~/java-practice/syntax-fundamentals`
    },
    {
      label: 'Create the Java file and open it',
      note: 'The file name must match the public class name shown in the code.',
      command: `touch ${fileName}
code ${fileName}`
    },
    {
      label: 'Paste the lesson code and save',
      note: 'Paste the Java code from the example panel into VS Code, then save before compiling.',
      command: `# Paste the code into ${fileName}
# Save in VS Code with Ctrl+S`
    },
    {
      label: 'Compile from this folder',
      note: 'Run javac from the same folder that contains the .java file.',
      command: `javac ${fileName}`
    },
    {
      label: 'Run the class',
      note: 'Run the class name only, without .java or .class.',
      command: `java ${className}`
    }
  ];
}

Java.topics.syntaxFundamentals.lessons = [
  {
    id: 'semicolons',
    num: '01',
    title: 'Semicolons',
    category: 'grammar',
    icon: ';',
    tagline: 'End most statements clearly',
    definition: 'A semicolon ends a Java statement, telling the compiler where one instruction stops before the next begins.',
    realWorld: 'It works like a period in a sentence. Without it, separate thoughts can blur together.',
    syntax: 'Create Semicolons.java, paste the example code, save, compile with javac Semicolons.java, then run java Semicolons.',
    fileName: 'Semicolons.java',
    code: `public class Semicolons {
    public static void main(String[] args) {
        int score = 10;
        score = score + 5;
        System.out.println(score);
    }
}`,
    commands: syntaxPracticeCommands('Semicolons.java', 'Semicolons'),
    keyPoints: [
      'Variable declarations, assignments, and method calls usually end with semicolons.',
      'Class and method declarations do not end with semicolons.',
      'A missing semicolon often reports an error on the next line.',
      'Use one statement per line while learning.'
    ],
    commonMistakes: [
      'Putting a semicolon after if (condition).',
      'Forgetting the semicolon after System.out.println(...).',
      'Assuming line breaks replace semicolons.'
    ],
    related: ['Blocks', 'First Program']
  },
  {
    id: 'blocks',
    num: '02',
    title: 'Blocks',
    category: 'grammar',
    icon: '{}',
    tagline: 'Group statements with braces',
    definition: 'A block is a group of statements surrounded by curly braces. Blocks define structure and often define scope.',
    realWorld: 'A block is like a room with walls. Things inside belong together, and some names only exist in that room.',
    syntax: 'Create Blocks.java in your syntax practice folder, paste the example, save, compile with javac Blocks.java, then run java Blocks.',
    fileName: 'Blocks.java',
    code: `public class Blocks {
    public static void main(String[] args) {
        int score = 82;

        if (score >= 70) {
            String message = "Passed";
            System.out.println(message);
        }
    }
}`,
    commands: syntaxPracticeCommands('Blocks.java', 'Blocks'),
    keyPoints: [
      'Classes, methods, if statements, and loops use blocks.',
      'Indent inside braces so the shape is visible.',
      'Variables declared inside a block are local to that block.',
      'Matching braces are more important than visual indentation.'
    ],
    commonMistakes: [
      'Leaving out a closing brace.',
      'Relying on indentation instead of braces.',
      'Trying to use a block-local variable outside the block.'
    ],
    related: ['Scope', 'Control Flow']
  },
  {
    id: 'comments',
    num: '03',
    title: 'Comments',
    category: 'grammar',
    icon: '//',
    tagline: 'Leave notes for humans',
    definition: 'Comments are text the compiler ignores. They explain intent, mark sections, or document public APIs.',
    realWorld: 'They are sticky notes on a machine: helpful for the operator, invisible to the machine itself.',
    syntax: 'Create Comments.java, paste the code, save, compile with javac Comments.java, then run java Comments. The comments stay in the source file but do not print.',
    fileName: 'Comments.java',
    code: `public class Comments {
    public static void main(String[] args) {
        // Single-line comment
        int attempts = 3;

        /*
         * Multi-line comments can explain a longer idea.
         */
        System.out.println("Attempts left: " + attempts);
    }
}`,
    commands: syntaxPracticeCommands('Comments.java', 'Comments'),
    keyPoints: [
      'Use // for short comments.',
      'Use /* ... */ for longer notes.',
      'Use comments to explain why, not obvious what.',
      'Javadoc comments start with /** for API documentation.'
    ],
    commonMistakes: [
      'Commenting every line instead of improving names.',
      'Leaving outdated comments after code changes.',
      'Nesting block comments, which Java does not support.'
    ],
    related: ['Identifiers', 'Naming Conventions']
  },
  {
    id: 'identifiers',
    num: '04',
    title: 'Identifiers',
    category: 'organization',
    icon: 'id',
    tagline: 'Name things legally',
    definition: 'An identifier is a name you give to a class, variable, method, or package.',
    realWorld: 'It is a label on a storage box. The label has rules so everyone can find the right box later.',
    syntax: 'Create Identifiers.java, paste the example, save, compile with javac Identifiers.java, then run java Identifiers.',
    fileName: 'Identifiers.java',
    code: `public class Identifiers {
    public static void main(String[] args) {
        int age = 30;
        String firstName = "Mina";
        boolean activeAccount = true;

        System.out.println(firstName + " is " + age);
        System.out.println("Active: " + activeAccount);
    }
}`,
    commands: syntaxPracticeCommands('Identifiers.java', 'Identifiers'),
    keyPoints: [
      'Identifiers can contain letters, digits, underscores, and dollar signs.',
      'They cannot start with a digit.',
      'Java identifiers are case-sensitive.',
      'Do not use reserved keywords as identifiers.'
    ],
    commonMistakes: [
      'Using spaces in names.',
      'Creating names that differ only by case.',
      'Using short names that hide meaning.'
    ],
    related: ['Naming Conventions', 'Keywords & Modifiers']
  },
  {
    id: 'naming-conventions',
    num: '05',
    title: 'Naming Conventions',
    category: 'organization',
    icon: 'Aa',
    tagline: 'Write names Java developers expect',
    definition: 'Naming conventions are shared style rules that make Java code easier to scan.',
    realWorld: 'They are like road signs using the same shapes and colors everywhere. You understand them faster because they are familiar.',
    syntax: 'Create NamingConventions.java, paste the example, save, compile with javac NamingConventions.java, then run java NamingConventions.',
    fileName: 'NamingConventions.java',
    code: `public class NamingConventions {
    private static final int MAX_ATTEMPTS = 3;

    public static void main(String[] args) {
        int loginAttempts = 1;
        boolean accountLocked = loginAttempts >= MAX_ATTEMPTS;
        System.out.println("Locked: " + accountLocked);
    }
}`,
    commands: syntaxPracticeCommands('NamingConventions.java', 'NamingConventions'),
    keyPoints: [
      'Classes use PascalCase.',
      'Variables and methods use camelCase.',
      'Constants use UPPER_SNAKE_CASE.',
      'Package names are lowercase.'
    ],
    commonMistakes: [
      'Naming classes like variables.',
      'Using abbreviations nobody recognizes.',
      'Changing style from file to file.'
    ],
    related: ['Identifiers', 'final']
  },
  {
    id: 'packages-imports',
    num: '06',
    title: 'Packages and Imports',
    category: 'organization',
    icon: 'pkg',
    tagline: 'Organize code and reuse classes',
    definition: 'A package groups related classes under a name. An import lets one file refer to a class from another package without typing its full name every time.',
    realWorld: 'A package is a street address for code. An import is adding a contact so you can use a short name.',
    syntax: 'Create ImportsExample.java, paste the example, save, compile with javac ImportsExample.java, then run java ImportsExample. This example uses imports but no custom package folder yet.',
    fileName: 'ImportsExample.java',
    code: `import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ImportsExample {
    public static void main(String[] args) {
        List<String> tasks = new ArrayList<>();
        tasks.add("Learn imports");
        System.out.println(LocalDate.now() + ": " + tasks);
    }
}`,
    commands: syntaxPracticeCommands('ImportsExample.java', 'ImportsExample'),
    keyPoints: [
      'Package declarations, when present, go at the top of the file.',
      'Imports come after the package declaration and before the class.',
      'java.lang is imported automatically.',
      'Avoid wildcard imports while learning.'
    ],
    commonMistakes: [
      'Putting imports inside a class.',
      'Declaring a package that does not match the folder path.',
      'Importing classes you never use.'
    ],
    related: ['Project Layout', 'Java Modules (JPMS)']
  }
];
