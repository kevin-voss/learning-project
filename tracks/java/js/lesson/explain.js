// Turns lesson code into beginner help: practice commands and a line-by-line walkthrough.
(function () {
  function namespaceToPracticeFolder(namespace) {
    return namespace
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }

  function classNameFromLesson(lesson) {
    const match = lesson.code && lesson.code.match(/\bpublic\s+class\s+([A-Za-z_$][\w$]*)/);
    if (match) return match[1];
    if (!lesson.fileName || !lesson.fileName.endsWith('.java')) return '';
    return lesson.fileName.split('/').pop().replace(/\.java$/, '');
  }

  function generatedJavaCommands(lesson, config) {
    if (lesson.commands) return lesson.commands;
    if (lesson.codeLanguage && lesson.codeLanguage !== 'java') return [];
    if (!lesson.fileName || !lesson.fileName.endsWith('.java')) return [];
    if (/\bpackage\s+[\w.]+\s*;/.test(lesson.code || '')) return [];

    const className = classNameFromLesson(lesson);
    if (!className) return [];

    const folder = namespaceToPracticeFolder(config.namespace);
    const filePath = lesson.fileName;
    const parentPath = filePath.includes('/') ? filePath.slice(0, filePath.lastIndexOf('/')) : '';
    const createFileCommand = parentPath
      ? `mkdir -p ${parentPath}
touch ${filePath}
code ${filePath}`
      : `touch ${filePath}
code ${filePath}`;

    return [
      {
        label: 'Create and enter the practice folder',
        note: 'Keep this lesson in its own predictable folder before creating the Java file.',
        command: `mkdir -p ~/java-practice/${folder}
cd ~/java-practice/${folder}`
      },
      {
        label: 'Create the Java file and open it',
        note: 'The file name must match the public class name in the snippet.',
        command: createFileCommand
      },
      {
        label: 'Paste the lesson code and save',
        note: 'Paste the Java code from the example panel into VS Code, then save before compiling.',
        command: `# Paste the code into ${filePath}
# Save in VS Code with Ctrl+S`
      },
      {
        label: 'Compile from this folder',
        note: 'javac reads the .java source file and creates JVM bytecode.',
        command: `javac ${filePath}`
      },
      {
        label: 'Run the class name',
        note: 'Run the class name only. Do not add .java or .class.',
        command: `java ${className}`
      }
    ];
  }

  function lessonCodeLanguage(lesson) {
    return (lesson.codeLanguage || 'java').toLowerCase();
  }

  function codeClassName(lesson) {
    return classNameFromLesson(lesson) || 'the class';
  }

  function summarizeCode(lesson) {
    if (lesson.codeSummary) return lesson.codeSummary;

    const language = lessonCodeLanguage(lesson);
    if (language === 'bash' || language === 'shell') {
      return `The terminal example runs the main commands for ${lesson.title}. Read each command from left to right: the first word is the tool, and the rest tells that tool what to do.`;
    }
    if (language === 'http') {
      return `The HTTP example shows the request or response shape for ${lesson.title}: the first line names the action, the headers add details, and the body carries data when needed.`;
    }
    if (language === 'json') {
      return `The JSON example shows structured data for ${lesson.title}. The names on the left describe each value, and the values on the right are the data being sent or stored.`;
    }
    if (language === 'plaintext') {
      return `The example sketches ${lesson.title} in a text format. It is meant to show the structure and relationships before you worry about every symbol.`;
    }

    const className = codeClassName(lesson);
    if (/\bpublic\s+static\s+void\s+main\s*\(/.test(lesson.code || '')) {
      return `The Java example defines ${className}, starts in main, demonstrates ${lesson.title.toLowerCase()}, and prints output so you can see what happened.`;
    }
    return `The Java example sketches the pieces used for ${lesson.title}. Focus first on the names, then on how the pieces call or refer to each other.`;
  }

  function lineExplanation(line, language, lesson) {
    const trimmed = line.trim();
    if (!trimmed) return '';

    if (language === 'bash' || language === 'shell') {
      if (trimmed.startsWith('#')) return 'A note for you, not a command the terminal runs.';
      if (trimmed.startsWith('sudo ')) return 'sudo asks Ubuntu to run this one command with administrator permission.';
      if (trimmed.startsWith('apt ')) return 'apt talks to Ubuntu package repositories to search, show, install, or update software.';
      if (trimmed.startsWith('mkdir ')) return 'mkdir creates a folder. The -p option also creates missing parent folders and avoids errors if the folder already exists.';
      if (trimmed.startsWith('cd ')) return 'cd moves the terminal into another folder, so later commands run from there.';
      if (trimmed.startsWith('javac ')) return 'javac compiles human-written .java source code into JVM-readable .class bytecode.';
      if (trimmed.startsWith('java ')) return 'java starts the JVM and runs the compiled class named after the command.';
      if (trimmed.startsWith('code ')) return 'code opens the file or folder in VS Code so you can edit it.';
      if (trimmed.startsWith('touch ')) return 'touch creates an empty file when it does not already exist.';
      return 'The command asks the terminal to do one small task. Run it only after you understand which folder you are in.';
    }

    if (language === 'http') {
      if (/^(GET|POST|PUT|PATCH|DELETE)\b/.test(trimmed)) return 'The request line names the HTTP method, the path being requested, and the HTTP version.';
      if (/^HTTP\/\d/.test(trimmed)) return 'The response line gives the HTTP version, status code, and short status message.';
      if (/^[A-Za-z-]+:\s/.test(trimmed)) return 'A header adds metadata that helps the client and server understand the message.';
      if (/^[{[]/.test(trimmed) || /^["\]}]/.test(trimmed)) return 'Body data usually carries the information being sent to or returned from the API.';
      return 'The line is part of the HTTP message shape.';
    }

    if (language === 'json') {
      if (/^[{[]/.test(trimmed)) return 'The line starts a JSON object or list.';
      if (/^["\w-]+["]?\s*:/.test(trimmed)) return 'A name/value pair uses the name to describe the data and the value to hold the data.';
      if (/^[}\]],?$/.test(trimmed)) return 'The line closes the JSON object or list started earlier.';
      return 'The line is one piece of structured JSON data.';
    }

    if (language === 'plaintext') {
      if (trimmed.startsWith('@start')) return 'The line starts the diagram description.';
      if (trimmed.startsWith('@end')) return 'The line ends the diagram description.';
      if (/-->|->|<--|<\|--|\*--|o--/.test(trimmed)) return 'The arrow shows a relationship or message between two named parts.';
      if (/^(class|interface|actor|component|state)\b/.test(trimmed)) return 'The line declares a named diagram element so the diagram can show it.';
      if (/^\w+\s*:/.test(trimmed)) return 'The line labels an action, message, or note in the diagram.';
      return 'The line adds one visible part or relationship to the sketch.';
    }

    if (trimmed.startsWith('//')) return 'A comment for humans. Java ignores it when compiling.';
    if (trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.endsWith('*/')) return 'Part of a multi-line comment that explains the code to humans.';
    if (/^import\s+/.test(trimmed)) return 'import lets this file use a class from another package without typing its full package name every time.';
    if (/^package\s+/.test(trimmed)) return 'package gives this file a named place in a larger project.';
    if (/\b(public\s+)?class\s+/.test(trimmed)) return 'The line starts a class. A class is the main container for Java code in this file.';
    if (/^interface\s+|^public\s+interface\s+/.test(trimmed)) return 'The line defines an interface: a promise about methods another class can implement.';
    if (/^record\s+|^public\s+record\s+/.test(trimmed)) return 'The line defines a record, a compact class for data with built-in constructor and accessor methods.';
    if (/\bpublic\s+static\s+void\s+main\s*\(/.test(trimmed)) return 'main is the entry point. When you run this class, the JVM starts here.';
    if (/^if\s*\(/.test(trimmed)) return 'if checks a true/false condition. The block runs only when the condition is true.';
    if (/^else\s+if\s*\(/.test(trimmed)) return 'else if gives Java another condition to try when the previous if was false.';
    if (/^else\b/.test(trimmed)) return 'else runs when the earlier if or else if conditions did not run.';
    if (/^for\s*\(/.test(trimmed)) return trimmed.includes(' : ')
      ? 'The enhanced for loop visits each value in a group one at a time.'
      : 'The for loop repeats code while its counter or condition says to continue.';
    if (/^while\s*\(/.test(trimmed)) return 'while repeats a block as long as its condition remains true.';
    if (/^do\b/.test(trimmed)) return 'do starts a loop that runs once before checking its condition.';
    if (/^switch\s*\(/.test(trimmed)) return 'switch chooses between multiple paths based on one value.';
    if (/^(case|default)\b/.test(trimmed)) return 'One branch inside a switch.';
    if (/^try\b/.test(trimmed)) return 'try marks code that might fail so Java can handle the failure nearby.';
    if (/^catch\s*\(/.test(trimmed)) return 'catch handles a specific kind of exception from the try block.';
    if (/^finally\b/.test(trimmed)) return 'finally runs cleanup code after try/catch work is done.';
    if (/^return\b/.test(trimmed)) return 'return sends a value back to the code that called this method, or exits the method.';
    if (/System\.out\.println/.test(trimmed)) return 'System.out.println prints text or a value to the terminal, then moves to a new line.';
    if (/\bnew\s+[A-Z]/.test(trimmed)) return 'new creates an object in memory and gives you a reference to use it.';
    if (/^[\w<>\[\], ?]+\s+\w+\s*=/.test(trimmed) || /^final\s+[\w<>\[\], ?]+\s+\w+\s*=/.test(trimmed)) {
      return 'A variable is being created: the type says what kind of value is allowed, the name lets you use it later, and = stores the starting value.';
    }
    if (/^\w+\s*[+\-*/%]?=/.test(trimmed)) return 'The line updates an existing variable so later lines see the new value.';
    if (/\)\s*\{?$/.test(trimmed) && !/^(if|for|while|switch|catch|synchronized)\b/.test(trimmed)) {
      return 'The line declares a method or constructor: a named block of code that can be called.';
    }
    if (/^[{}]+$/.test(trimmed)) return 'A brace opens or closes a block, which groups related lines together.';
    return 'One complete Java statement or structural line. Read the names first, then the punctuation.';
  }

  function generatedCodeExplanation(lesson) {
    const language = lessonCodeLanguage(lesson);
    const lines = (lesson.code || '').split('\n')
      .map((text, index) => ({ text, line: index + 1 }))
      .filter(item => item.text.trim());
    const important = [];

    lines.forEach(item => {
      const explanation = lineExplanation(item.text, language, lesson);
      if (!explanation) return;
      if (/^[{}]+$/.test(item.text.trim()) && important.length > 8) return;
      important.push({
        label: `Line ${item.line}`,
        code: item.text.trim(),
        text: explanation
      });
    });

    const maxItems = language === 'java' ? 14 : 10;
    const visible = important.slice(0, maxItems);
    if (important.length > visible.length) {
      visible.push({
        label: 'After that',
        code: '',
        text: 'The remaining lines continue the same pattern: small statements inside blocks that Java reads from top to bottom.'
      });
    }

    return visible;
  }

  function codeExplanationItems(lesson) {
    if (Array.isArray(lesson.codeExplanation)) {
      return lesson.codeExplanation.map((item, index) => (
        typeof item === 'string'
          ? { label: `Step ${index + 1}`, code: '', text: item }
          : item
      ));
    }
    if (lesson.codeExplanation) {
      return [{ label: 'Walkthrough', code: '', text: lesson.codeExplanation }];
    }
    return generatedCodeExplanation(lesson);
  }

  Java.lesson = Object.assign(Java.lesson || {}, {
    generatedJavaCommands,
    summarizeCode,
    codeExplanationItems
  });
})();
