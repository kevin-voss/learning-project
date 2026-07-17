(function () {
  const icons = {
    info: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    world: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    code: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    syntax: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 13h5M8 17h7"/></svg>',
    check: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    alert: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    link: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
  };

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeAttribute(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function renderText(str, lesson) {
    const glossary = (lesson.glossary || []).concat(Java.glossary || []);
    if (!glossary.length) return escapeHtml(str);

    const terms = glossary
      .slice()
      .sort((a, b) => b.term.length - a.term.length);
    let html = '';
    let index = 0;

    while (index < str.length) {
      const match = terms.find(item => {
        const candidate = str.slice(index, index + item.term.length);
        const before = str[index - 1] || '';
        const after = str[index + item.term.length] || '';
        return candidate.toLowerCase() === item.term.toLowerCase()
          && !/[\w-]/.test(before)
          && !/[\w-]/.test(after);
      });

      if (match) {
        const found = str.slice(index, index + match.term.length);
        html += `<span class="term" tabindex="0" data-tip="${escapeAttribute(match.definition)}">${escapeHtml(found)}</span>`;
        index += match.term.length;
      } else {
        html += escapeHtml(str[index]);
        index += 1;
      }
    }

    return html;
  }

  function renderList(items, lesson) {
    return items.map(item => `<li>${renderText(item, lesson)}</li>`).join('');
  }

  function indexToLetters(index) {
    let value = index + 1;
    let label = '';

    while (value > 0) {
      value -= 1;
      label = String.fromCharCode(65 + (value % 26)) + label;
      value = Math.floor(value / 26);
    }

    return label;
  }

  function renderSyntax(lesson) {
    if (!lesson.syntax) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.syntax}Syntax</div>
        <div class="syntax-note">${renderText(lesson.syntax, lesson)}</div>
      </div>
    `;
  }

  function renderProsCons(lesson) {
    if (!lesson.pros && !lesson.cons) return '';
    return `
      <div class="detail-section">
        <div class="pros-cons">
          <div class="pc-box pros">
            <div class="lbl">${icons.check}Pros</div>
            <ul>${renderList(lesson.pros || [], lesson)}</ul>
          </div>
          <div class="pc-box cons">
            <div class="lbl">${icons.alert}Cons</div>
            <ul>${renderList(lesson.cons || [], lesson)}</ul>
          </div>
        </div>
      </div>
    `;
  }

  function renderTextBlock(value, lesson) {
    if (!value) return '';
    if (Array.isArray(value)) return `<ul>${renderList(value, lesson)}</ul>`;
    return `<p>${renderText(value, lesson)}</p>`;
  }

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

  function lessonWhy(lesson) {
    if (lesson.why) return lesson.why;
    if (lesson.pros && lesson.pros.length) return lesson.pros[0];
    return 'It gives the program a clear rule, shape, or tool so the next person reading the code can predict what will happen.';
  }

  function lessonWhen(lesson) {
    if (lesson.whenUse) return lesson.whenUse;
    if (lesson.keyPoints && lesson.keyPoints.length) return lesson.keyPoints[0];
    return 'Use it when the problem matches the idea and the code becomes easier to explain, not just shorter.';
  }

  function renderBeginnerMap(lesson) {
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.info}Beginner Map</div>
        <div class="beginner-map">
          <div class="map-card">
            <div class="map-label">What it is</div>
            ${renderTextBlock(lesson.what || lesson.definition, lesson)}
          </div>
          <div class="map-card">
            <div class="map-label">Why it exists</div>
            ${renderTextBlock(lessonWhy(lesson), lesson)}
          </div>
          <div class="map-card">
            <div class="map-label">How to think about it</div>
            ${renderTextBlock(lesson.howThink || lesson.realWorld, lesson)}
          </div>
          <div class="map-card">
            <div class="map-label">When beginners use it</div>
            ${renderTextBlock(lessonWhen(lesson), lesson)}
          </div>
        </div>
      </div>
    `;
  }

  function renderCommands(lesson, config) {
    const commands = generatedJavaCommands(lesson, config);
    if (!commands.length) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.code}${lesson.commandsLabel || 'Do This In Order'}</div>
        <div class="command-steps">
          ${commands.map(command => `
            <div class="command-step">
              <div>
                <div class="command-name">${renderText(command.label, lesson)}</div>
                <p>${renderText(command.note, lesson)}</p>
              </div>
              <pre><code>${escapeHtml(command.command)}</code></pre>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderPrimitiveTypes(lesson) {
    if (!lesson.primitiveTypes || !lesson.primitiveTypes.length) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.syntax}Primitive Type Cards</div>
        <div class="primitive-grid">
          ${lesson.primitiveTypes.map(type => `
            <article class="primitive-card ${type.emphasis ? 'emphasis' : ''}">
              <div class="primitive-top">
                <h3>${escapeHtml(type.name)}</h3>
                ${type.emphasis ? '<span>beginner-practical</span>' : ''}
              </div>
              <dl>
                <div><dt>Size</dt><dd>${escapeHtml(type.size)}</dd></div>
                <div><dt>Range</dt><dd>${escapeHtml(type.range)}</dd></div>
                <div><dt>Default</dt><dd>${escapeHtml(type.defaultValue)}</dd></div>
              </dl>
              <div class="primitive-code">${escapeHtml(type.literalExamples)}</div>
              <p><strong>Use:</strong> ${renderText(type.whenUse, lesson)}</p>
              <p><strong>Watch:</strong> ${renderText(type.mistake, lesson)}</p>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderStatusCodes(lesson) {
    if (!lesson.statusCodes || !lesson.statusCodes.length) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.world}Common Practical Status Codes</div>
        <div class="status-grid">
          ${lesson.statusCodes.map(status => `
            <article class="status-card status-${String(status.code)[0]}xx">
              <div class="status-code">${status.code} <span>${escapeHtml(status.name)}</span></div>
              <p>${renderText(status.happened, lesson)}</p>
              <code>${escapeHtml(status.example)}</code>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderVisuals(lesson) {
    if (!lesson.visualHtml && !lesson.mermaid) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.world}${lesson.visualLabel || 'Visual Model'}</div>
        <div class="visual-panel">
          ${lesson.mermaid ? `<pre class="mermaid">${escapeHtml(lesson.mermaid)}</pre>` : lesson.visualHtml}
          ${lesson.visualNote ? `<div class="diagram-note">${renderText(lesson.visualNote, lesson)}</div>` : ''}
        </div>
      </div>
    `;
  }

  function renderPracticePrompts(lesson) {
    if (!lesson.practicePrompts || !lesson.practicePrompts.length) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.check}Practice Prompts</div>
        <div class="prompt-grid">
          ${lesson.practicePrompts.map(prompt => `
            <article class="prompt-card">
              <div class="prompt-level">${escapeHtml(prompt.level || 'Beginner')}</div>
              <h3>${renderText(prompt.title, lesson)}</h3>
              <p>${renderText(prompt.goal, lesson)}</p>
              ${prompt.checks && prompt.checks.length ? `
                <div class="prompt-subhead">Checks</div>
                <ul>${renderList(prompt.checks, lesson)}</ul>
              ` : ''}
              ${prompt.stretch ? `<div class="prompt-stretch">${renderText(prompt.stretch, lesson)}</div>` : ''}
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function normalizeLookup(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\bbasics\b/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
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
      if (/^(GET|POST|PUT|PATCH|DELETE|QUERY)\b/.test(trimmed)) return 'The request line names the HTTP method, the path being requested, and the HTTP version.';
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

  function renderCodeExample(lesson) {
    const items = codeExplanationItems(lesson);
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.code}${lesson.exampleLabel || 'Java 21 LTS Example'}</div>
        <div class="code-summary">${renderText(summarizeCode(lesson), lesson)}</div>
        <div class="code-wrap">
          <div class="code-head">
            <div class="file">
              <div class="dots"><span></span><span></span><span></span></div>
              <span>${lesson.fileName || `${lesson.title.replace(/\W+/g, '')}.java`}</span>
            </div>
            <button class="copy-btn" onclick="copyCode(this)">copy</button>
          </div>
          <pre><code class="language-${lesson.codeLanguage || 'java'}">${escapeHtml(lesson.code)}</code></pre>
        </div>
        <div class="code-explain">
          <div class="code-explain-title">Beginner walkthrough</div>
          <ol>
            ${items.map(item => `
              <li>
                <div class="walk-label">${escapeHtml(item.label || 'Step')}</div>
                ${item.code ? `<code>${escapeHtml(item.code)}</code>` : ''}
                <p>${renderText(item.text || '', lesson)}</p>
              </li>
            `).join('')}
          </ol>
        </div>
      </div>
    `;
  }

  function renderMermaidDiagrams(root) {
    if (!window.mermaid) return;

    if (!window._javaHubMermaidReady) {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'strict',
        themeVariables: {
          background: '#0a0d18',
          primaryColor: '#111827',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: '#475569',
          lineColor: '#2dd4bf',
          secondaryColor: '#1e293b',
          tertiaryColor: '#111827',
          fontFamily: 'Manrope, sans-serif'
        }
      });
      window._javaHubMermaidReady = true;
    }

    const nodes = root.querySelectorAll('.mermaid');
    if (!nodes.length) return;

    window.mermaid.run({ nodes }).catch(() => {
      nodes.forEach(node => {
        node.classList.add('mermaid-error');
      });
    });
  }

  function ensureTermPopover() {
    let popover = document.getElementById('termPopover');
    if (!popover) {
      popover = document.createElement('div');
      popover.id = 'termPopover';
      popover.className = 'term-popover';
      document.body.appendChild(popover);
    }
    return popover;
  }

  function placeTermPopover(term, popover) {
    const gap = 10;
    const rect = term.getBoundingClientRect();
    const popRect = popover.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - popRect.width / 2;
    let top = rect.top - popRect.height - gap;

    left = Math.max(12, Math.min(left, window.innerWidth - popRect.width - 12));
    if (top < 12) top = rect.bottom + gap;
    if (top + popRect.height > window.innerHeight - 12) {
      top = Math.max(12, window.innerHeight - popRect.height - 12);
    }

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }

  function attachTermTooltips(root) {
    const popover = ensureTermPopover();
    const show = event => {
      const term = event.currentTarget;
      popover.textContent = term.dataset.tip;
      popover.classList.add('show');
      placeTermPopover(term, popover);
    };
    const hide = () => popover.classList.remove('show');

    root.querySelectorAll('.term').forEach(term => {
      term.addEventListener('mouseenter', show);
      term.addEventListener('focus', show);
      term.addEventListener('click', show);
      term.addEventListener('mouseleave', hide);
      term.addEventListener('blur', hide);
    });
  }

  function renderLessonTopic(config) {
    const topic = Java.topics[config.namespace];
    const categories = topic.categories;
    const lessons = topic.lessons;
    let selectedId = lessons[0].id;

    function groupedLessons() {
      return lessons.reduce((groups, lesson) => {
        if (!groups[lesson.category]) groups[lesson.category] = [];
        groups[lesson.category].push(lesson);
        return groups;
      }, {});
    }

    function renderRoadmap() {
      const container = document.getElementById('roadmap');
      const byCategory = groupedLessons();
      let html = '';

      function lessonStep(lesson) {
        return indexToLetters(lessons.findIndex(item => item.id === lesson.id));
      }

      Object.keys(categories).forEach(catKey => {
        const cat = categories[catKey];
        const items = byCategory[catKey] || [];
        if (!items.length) return;

        html += `
          <div class="lane" style="--lane-color: ${cat.color}; --lane-bg: ${cat.bg}; --lane-glow: ${cat.glow};">
            <div class="lane-head">
              <span class="lane-tag">${cat.name}</span>
              <span class="lane-name">${cat.desc}</span>
              <span class="lane-desc">${items.length} lesson${items.length > 1 ? 's' : ''}</span>
            </div>
            <div class="lane-track">
              ${items.map(lesson => `
                <div class="pattern-card ${lesson.id === selectedId ? 'active' : ''}"
                     data-id="${lesson.id}"
                     tabindex="0"
                     role="button"
                     aria-label="View ${lesson.title}">
                  <div class="num">Step ${lessonStep(lesson)} · ${cat.name}</div>
                  <div class="name"><span class="icon">${lesson.icon || '•'}</span>${lesson.title}</div>
                  <div class="tag">${lesson.tagline}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
      container.querySelectorAll('.pattern-card').forEach(card => {
        const handler = () => selectLesson(card.dataset.id);
        card.addEventListener('click', handler);
        card.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handler();
          }
        });
      });
    }

    function renderSidebar() {
      const sidebar = document.getElementById('sidebar');
      let html = '';

      function lessonStep(lesson) {
        return indexToLetters(lessons.findIndex(item => item.id === lesson.id));
      }

      Object.keys(categories).forEach(catKey => {
        const cat = categories[catKey];
        const items = lessons.filter(lesson => lesson.category === catKey);
        if (!items.length) return;

        html += `
          <div class="sidebar-group">
            <div class="sidebar-group-head" style="color: ${cat.color};">
              <span style="width:8px; height:8px; border-radius:50%; background: ${cat.color}; display:inline-block;"></span>
              ${cat.name}
            </div>
            ${items.map(lesson => `
              <div class="sidebar-item ${lesson.id === selectedId ? 'active' : ''}"
                   data-id="${lesson.id}"
                   tabindex="0"
                   role="button">
                <span class="marker" style="background: ${cat.color};"></span>
                <span>${lesson.title}</span>
                <span class="num">Step ${lessonStep(lesson)}</span>
              </div>
            `).join('')}
          </div>
        `;
      });

      sidebar.innerHTML = html;
      sidebar.querySelectorAll('.sidebar-item').forEach(item => {
        const handler = () => selectLesson(item.dataset.id);
        item.addEventListener('click', handler);
        item.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handler();
          }
        });
      });
    }

    function renderDetail() {
      const lesson = lessons.find(item => item.id === selectedId);
      const cat = categories[lesson.category];
      const detail = document.getElementById('detail');
      const stepLabel = indexToLetters(lessons.findIndex(item => item.id === lesson.id));
      const finalStepLabel = indexToLetters(lessons.length - 1);

      detail.style.setProperty('--pattern-color', cat.color);
      detail.style.setProperty('--pattern-bg', cat.bg);

      detail.innerHTML = `
        <div class="detail-head">
          <div class="detail-cat">${cat.name} · Step ${stepLabel} of ${finalStepLabel}</div>
          <h1 class="detail-title">${lesson.title}</h1>
          <p class="detail-tagline">${lesson.tagline}</p>
        </div>
        <div class="detail-body">
          <div class="detail-section">
            <div class="detail-section-label">${icons.info}Definition</div>
            <p class="def-text">${renderText(lesson.definition, lesson)}</p>
          </div>

          ${renderBeginnerMap(lesson)}

          <div class="detail-section">
            <div class="detail-section-label">${icons.world}Real-World Analogy</div>
            <div class="real-world">
              <div class="emoji">${lesson.icon || 'J'}</div>
              <div class="content">
                <div class="label">Think of it like this</div>
                <div class="text">${renderText(lesson.realWorld, lesson)}</div>
              </div>
            </div>
          </div>

          ${renderSyntax(lesson)}

          ${renderPrimitiveTypes(lesson)}

          ${renderStatusCodes(lesson)}

          ${renderVisuals(lesson)}

          ${renderPracticePrompts(lesson)}

          ${renderCodeExample(lesson)}

          ${renderCommands(lesson, config)}

          <div class="detail-section">
            <div class="pros-cons">
              <div class="pc-box pros">
                <div class="lbl">${icons.check}Key Points</div>
                <ul>${renderList(lesson.keyPoints, lesson)}</ul>
              </div>
              <div class="pc-box cons">
                <div class="lbl">${icons.alert}Common Mistakes</div>
                <ul>${renderList(lesson.commonMistakes, lesson)}</ul>
              </div>
            </div>
          </div>

          ${renderProsCons(lesson)}

          <div class="detail-section">
            <div class="detail-section-label">${icons.link}Related Lessons</div>
            <div class="related">
              ${renderRelatedChips(lesson.related || [])}
            </div>
          </div>
        </div>
      `;

      detail.querySelectorAll('pre code').forEach(block => {
        if (window.hljs) hljs.highlightElement(block);
      });
      renderMermaidDiagrams(detail);
      attachTermTooltips(detail);
    }

    function topicHref(topic) {
      const currentPath = window.location.pathname;
      if (currentPath.includes('/topics/')) return `../${topic.id}/index.html`;
      return topic.path;
    }

    function relatedTarget(value) {
      const foundLesson = lessons.find(lesson => normalizeLookup(lesson.id) === normalizeLookup(value) || normalizeLookup(lesson.title) === normalizeLookup(value));
      if (foundLesson) return { type: 'lesson', id: foundLesson.id };

      const aliases = {
        'build tools': 'maven and gradle',
        'collections': 'collections',
        'collections basics': 'collections',
        'string': 'strings and text',
        'variables': 'types and variables',
        'ubuntu terminal': 'getting started on ubuntu',
        'packages': 'syntax fundamentals'
      };
      const lookup = aliases[normalizeLookup(value)] || normalizeLookup(value);
      const registry = Java.topics.registry || [];
      const foundTopic = registry.find(topic => {
        const title = normalizeLookup(topic.title);
        const id = normalizeLookup(topic.id);
        return title === lookup || id === lookup || title.includes(lookup) || lookup.includes(title);
      });
      if (foundTopic && foundTopic.status === 'available') return { type: 'topic', topic: foundTopic };

      return { type: 'missing' };
    }

    function renderRelatedChips(items) {
      return items.map(item => {
        const target = relatedTarget(item);
        if (target.type === 'lesson') {
          return `<button class="related-chip" type="button" onclick="jumpToLesson('${escapeAttribute(target.id)}')">${escapeHtml(item)}</button>`;
        }
        if (target.type === 'topic') {
          return `<a class="related-chip related-link" href="${escapeAttribute(topicHref(target.topic))}" title="Open ${escapeAttribute(target.topic.title)}">${escapeHtml(item)}</a>`;
        }
        return `<button class="related-chip" type="button" onclick="jumpToLesson('${escapeAttribute(item)}')">${escapeHtml(item)}</button>`;
      }).join('');
    }

    function selectLesson(id) {
      selectedId = id;
      renderRoadmap();
      renderSidebar();
      renderDetail();

      const detailSection = document.getElementById('detail-section');
      if (detailSection) {
        detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    window.jumpToLesson = function jumpToLesson(value) {
      const found = lessons.find(lesson => lesson.id === value || lesson.title === value);
      if (found) {
        selectLesson(found.id);
      } else {
        showToast(`${value} belongs to another topic in the basics path.`);
      }
    };

    renderRoadmap();
    renderSidebar();
    renderDetail();
  }

  window.copyCode = function copyCode(btn) {
    const code = btn.closest('.code-wrap').querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = 'copied!';
      btn.classList.add('copied');
      showToast('Code copied to clipboard');
      setTimeout(() => {
        btn.textContent = 'copy';
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      showToast('Copy failed — select manually');
    });
  };

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.querySelector('span').textContent = msg;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  Java.renderLessonTopic = renderLessonTopic;
})();
