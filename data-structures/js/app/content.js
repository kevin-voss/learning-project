window.DS = window.DS || {};

DS.glossaryTerms = {
  'adjacency list': 'A graph storage style where each node keeps a list of the nodes directly connected to it.',
  'algorithm': 'A step-by-step method for solving a problem.',
  'algorithms': 'Step-by-step methods for solving problems.',
  'array': 'A list-like structure where items live in numbered positions called indexes.',
  'arrays': 'List-like structures where items live in numbered positions called indexes.',
  'balanced tree': 'A tree where left and right sides stay roughly even, so search does not become a long chain.',
  'backtracking': 'Trying one path, then going back when it does not work so another path can be tried.',
  'big-o': 'A way to describe how an algorithm slows down as the input gets bigger.',
  'binary search tree': 'A tree where smaller values go left and larger values go right, making search faster when balanced.',
  'boolean': 'A true or false value.',
  'booleans': 'True or false values.',
  'bucket': 'One storage slot in a hash table where entries can be placed.',
  'buckets': 'Storage slots in a hash table where entries can be placed.',
  'breadth-first search': 'A graph search that visits nearby nodes first before moving farther away.',
  'cache-friendly': 'Data is stored close together, so the CPU can read nearby items quickly.',
  'call stack': 'The stack of active function calls waiting to finish.',
  'children': 'Nodes directly below another node in a tree.',
  'closure': 'A function bundled with variables from the place where it was created.',
  'closures': 'Functions bundled with variables from the places where they were created.',
  'collision': 'When two different keys land in the same hash table bucket.',
  'collisions': 'Cases where different keys land in the same hash table bucket.',
  'constant-time': 'The operation takes about the same time even if the collection gets bigger.',
  'constant time': 'The operation takes about the same time even if the collection gets bigger.',
  'condition': 'A yes/no check used to decide what code should do next.',
  'conditions': 'Yes/no checks used to decide what code should do next.',
  'contiguous memory': 'Items are stored next to each other in memory, like lockers side by side.',
  'cpu': 'The processor that runs instructions in a program.',
  'cpu cache': 'Tiny, very fast memory near the CPU.',
  'compiler': 'A tool that translates source code into lower-level code the machine or runtime can run.',
  'compilation': 'The process of translating source code into lower-level code.',
  'cycle': 'A loop in a graph where following edges can bring you back to a node you already visited.',
  'cycles': 'Loops in a graph where following edges can bring you back to nodes you already visited.',
  'data structure': 'A way to organize data so a program can use it efficiently.',
  'divide and conquer': 'Split a problem into smaller problems, solve them, then combine the answers.',
  'depth-first search': 'A graph search that follows one path deeply, then backs up to try another path.',
  'directed': 'A one-way connection, like following someone who does not follow you back.',
  'duplicate': 'A repeated value that already exists in the collection.',
  'duplicates': 'Repeated values that already exist in the collection.',
  'dynamic': 'Able to grow or shrink while the program runs.',
  'edge': 'A connection between two graph nodes.',
  'edges': 'Connections between graph nodes.',
  'element': 'One item inside a collection, such as one value in an array.',
  'elements': 'Items inside a collection, such as values in an array.',
  'enqueue': 'Add an item to the back of a queue.',
  'dequeue': 'Remove the item from the front of a queue.',
  'fifo': 'First In, First Out: the oldest item leaves first.',
  'frames': 'Individual visualization steps, or call-stack records depending on context.',
  'heap': 'A tree-like structure often stored in an array, useful for priority queues.',
  'heap memory': 'Memory area used for objects that can live beyond one function call.',
  'hash function': 'A function that turns a key into a bucket number.',
  'hash table': 'A key-value structure that uses hashing for fast lookup.',
  'index': 'A numbered position in an array. JavaScript arrays start at index 0.',
  'indices': 'Numbered positions in an array.',
  'iteration': 'Repeating over items one by one.',
  'iterate': 'Go through items one by one.',
  'key-value': 'A pair where a key points to a value, like "userId" -> a user profile.',
  'kernel': 'The core of the operating system that manages hardware and programs.',
  'machine code': 'Low-level instructions the CPU can execute.',
  'leaf': 'A tree node with no children.',
  'leaves': 'Tree nodes with no children.',
  'lifo': 'Last In, First Out: the newest item leaves first.',
  'lookup': 'Finding a value by using a key or position.',
  'linear time': 'The work grows at the same pace as the number of items.',
  'logical operator': 'A tool for combining true/false values, such as AND, OR, NOT, or XOR.',
  'logical operators': 'Tools for combining true/false values, such as AND, OR, NOT, or XOR.',
  'logarithmic time': 'The work grows slowly because each step removes a large chunk of remaining work.',
  'operating system': 'Software that manages hardware, memory, files, and running programs.',
  'page table': 'An OS data structure that maps virtual addresses to real memory locations.',
  'page tables': 'OS data structures that map virtual addresses to real memory locations.',
  'parse': 'Read source code and understand its structure.',
  'parsing': 'Turning source code text into a structured representation.',
  'membership': 'A yes/no question: is this value in the collection?',
  'n': 'The number of items in the input. If an array has 100 items, n is 100.',
  'node': 'One item in a linked list, tree, or graph.',
  'nodes': 'Items in a linked list, tree, or graph.',
  'null': 'A value meaning "nothing here" or "no next node".',
  'o(1)': 'Constant time: usually one quick step, no matter how large the collection is.',
  'o(1) avg': 'Average constant time: usually one quick step, but rare collisions or resizing can make it slower.',
  'o(log n)': 'Logarithmic time: the work grows slowly because each step cuts the remaining search space.',
  'o(n)': 'Linear time: the work grows with the number of items.',
  'o(n log n)': 'Common efficient sorting time: process all items across several split levels.',
  'o(n squared)': 'Quadratic time: nested work where doubling input can cause much more than double work.',
  'o(e)': 'Edge time: the work grows with the number of graph edges.',
  'o(v + e)': 'Graph traversal time: visit every vertex (V) and every edge (E) once.',
  'o-notation': 'Another name for Big-O: a shorthand for how work grows as input grows.',
  'parent': 'The node directly above another node in a tree.',
  'pid': 'Process ID: a number the operating system uses to identify a running program.',
  'pivot': 'A chosen value used by quick sort to partition smaller and larger values.',
  'pointer': 'A reference that tells the program where another node lives.',
  'pointers': 'References that tell the program where other nodes live.',
  'priority queue': 'A queue where the most important item is served first.',
  'process': 'A running program managed by the operating system.',
  'processes': 'Running programs managed by the operating system.',
  'pop': 'Remove the top item from a stack or the last item from an array.',
  'push': 'Add an item to the top of a stack or the end of an array.',
  'queue': 'A first-in, first-out structure, like a waiting line.',
  'ram': 'Main working memory used by running programs.',
  'random access': 'Jumping directly to an item by position instead of scanning from the start.',
  'root': 'The top starting node of a tree.',
  'scheduler': 'The operating system part that chooses which task runs next.',
  'source code': 'Human-readable code written by programmers.',
  'set': 'A collection that keeps unique values only.',
  'shift': 'Move items one position left or right to make room or close a gap.',
  'shifting': 'Moving items one position left or right to make room or close a gap.',
  'stack': 'A last-in, first-out structure, like plates stacked on top of each other.',
  'stack frame': 'One function call record on the call stack.',
  'stability': 'A sorting property where equal items keep their original relative order.',
  'stable': 'Equal items keep their original relative order after sorting.',
  'thread': 'A path of execution inside a process.',
  'threads': 'Paths of execution inside a process.',
  'traversal': 'Visiting each item or node in a structure in some order.',
  'time complexity': 'A way to describe how much work an operation does as the input gets bigger.',
  'truth table': 'A table that shows every input combination and the resulting true/false answer.',
  'undirected': 'A two-way connection, like a friendship.',
  'vertex': 'A graph node.',
  'vertices': 'Graph nodes.',
  'virtual memory': 'A memory system where each process gets its own address view mapped by the OS.',
  'weighted': 'A connection has a number attached, like distance, time, or cost.',
  'worst case': 'The slowest situation an operation might run into.',
  'write': 'Assigning a value into a memory slot or array index.',
  'writes': 'Assignments into memory slots or array indexes.',
  'xor': 'Exclusive OR: true when exactly one side is true, but not both.',
  'bfs': 'Breadth-First Search: visit closest neighbors first using a queue.',
  'dfs': 'Depth-First Search: go deep along one path, then backtrack.',
  'map': 'A key-value collection, often implemented with a hash table.',
};

DS.escHtml = function (value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

DS.explainTerms = function (text) {
  const terms = Object.keys(DS.glossaryTerms).sort((a, b) => b.length - a.length);
  const pattern = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const boundary = '(^|[^A-Za-z0-9])';
  const matcher = new RegExp(`${boundary}(${pattern})(?=$|[^A-Za-z0-9])`, 'gi');

  return DS.escHtml(text).replace(matcher, (full, prefix, term) => {
    const explanation = DS.glossaryTerms[term.toLowerCase()];
    if (!explanation) return full;
    return `${prefix}<span class="glossary-term" tabindex="0" data-tooltip="${DS.escHtml(explanation)}">${term}</span>`;
  });
};

DS.complexityGuide = function () {
  const intro = 'Big-O is not exact stopwatch time. It is a simple way to ask: if the input gets bigger, how much more work does this operation do? In Big-O, n means the number of items. For graphs, V means vertices and E means edges.';
  const cards = [
    { label: 'O(1)', name: 'constant', desc: 'One quick step. Reading array[3] is still one lookup whether the array has 5 items or 5,000.' },
    { label: 'O(log n)', name: 'divide and conquer', desc: 'Each step cuts the problem down a lot. A balanced tree search goes left or right and ignores the other side.' },
    { label: 'O(n)', name: 'linear', desc: 'Check items one by one. If the list doubles, the work can roughly double too.' },
    { label: 'O(V + E)', name: 'graph walk', desc: 'For BFS or DFS, visit every vertex and every edge once.' },
  ];

  return `
    <div class="complexity-guide">
      <p>${DS.explainTerms(intro)}</p>
      <div class="complexity-guide-grid">
        ${cards.map(card => `
          <div class="complexity-guide-card">
            <strong>${DS.explainTerms(card.label)}</strong>
            <span>${DS.escHtml(card.name)}</span>
            <p>${DS.explainTerms(card.desc)}</p>
          </div>
        `).join('')}
      </div>
    </div>`;
};

DS.complexityMeaning = function (time) {
  const normalized = time.toLowerCase().replace(/\s+/g, ' ');
  if (normalized.includes('o(v + e)')) {
    return 'For graphs, this may touch every node and every connection once.';
  }
  if (normalized.includes('o(n squared)') || normalized.includes('o(n²)')) {
    return 'Nested work: as input grows, the work can grow much faster.';
  }
  if (normalized.includes('o(n log n)')) {
    return 'Common efficient sorting time: split work plus process every item.';
  }
  if (normalized.includes('o(log n)')) {
    return 'Each step removes a big chunk of work, so it grows slowly.';
  }
  if (normalized.includes('o(1)')) {
    return normalized.includes('avg')
      ? 'Usually one quick step, assuming hashing stays well spread out.'
      : 'About one quick step, even when the collection gets bigger.';
  }
  if (normalized.includes('o(e)')) {
    return 'May scan through the graph connections.';
  }
  if (normalized.includes('o(n)')) {
    return 'May check every item once, so bigger input means more work.';
  }
  return 'The work grows based on how much data the operation must inspect.';
};

DS.renderConceptSections = function (sections = []) {
  if (!sections.length) return '';
  return `
    <div class="block">
      <h3 class="block-title"><i class="fas fa-map"></i> Beginner Breakdown</h3>
      <div class="concept-section-grid">
        ${sections.map((section, i) => `
          <article class="concept-section-card">
            <div class="concept-section-kicker">Step ${i + 1}</div>
            <h4><i class="fas ${section.icon || 'fa-circle-dot'}"></i> ${DS.explainTerms(section.title)}</h4>
            <p>${DS.explainTerms(section.desc)}</p>
            ${section.example ? `<div class="concept-mini-example">${DS.explainTerms(section.example)}</div>` : ''}
          </article>
        `).join('')}
      </div>
    </div>`;
};

DS.updateSectionCode = function (sectionId, key) {
  const ds = DS.curriculum.find(item => item.id === sectionId);
  const html = ds?.codeExamples?.[key] ?? ds?.codeExample;
  if (!html) return;
  const body = document.querySelector(`#code-${sectionId} .code-body`);
  if (body) body.innerHTML = html;
};

DS.renderConceptFlow = function (flow = []) {
  if (!flow.length) return '';
  return `
    <div class="block">
      <h3 class="block-title"><i class="fas fa-diagram-project"></i> Flow Diagram</h3>
      <div class="concept-flow" aria-label="Concept flow diagram">
        ${flow.map((item, i) => `
          <div class="concept-flow-item">
            <span>${DS.explainTerms(item)}</span>
          </div>
          ${i < flow.length - 1 ? '<div class="concept-flow-arrow"><i class="fas fa-arrow-right"></i></div>' : ''}
        `).join('')}
      </div>
    </div>`;
};

DS.renderContent = function () {
  const ds = DS.curriculum[DS.currentSection];
  const area = document.getElementById('contentArea');
  const hasDemo = Boolean(ds.demoType);
  const hasCode = Boolean(ds.codeExample);
  const hasComplexity = Array.isArray(ds.complexity) && ds.complexity.length > 0;
  const hasProsCons = Array.isArray(ds.pros) && Array.isArray(ds.cons);

  area.innerHTML = `
    <section class="ds-section active">
      <!-- Header -->
      <div class="ds-header">
        <div class="ds-number">${DS.escHtml(ds.category || 'Data Structures')} · Lesson ${String(DS.currentSection + 1).padStart(2, '0')} of ${DS.curriculum.length}</div>
        <h1 class="ds-title">${ds.title}</h1>
        <p class="ds-subtitle">${ds.subtitle}</p>
      </div>

      <!-- Real World Analogy -->
      <div class="analogy-card">
        <div class="analogy-label"><i class="fas fa-lightbulb"></i> Real-World Analogy</div>
        <p class="analogy-text">${DS.explainTerms(ds.analogy)}</p>
      </div>

      <!-- Real World Example -->
      ${ds.realWorldExample ? `
      <div class="example-card">
        <div class="example-label"><i class="fas fa-location-dot"></i> Real-World Example</div>
        <h3>${DS.explainTerms(ds.realWorldExample.title)}</h3>
        <p>${DS.explainTerms(ds.realWorldExample.desc)}</p>
      </div>` : ''}

      ${ds.resourceLinks ? `
      <div class="resource-card">
        <div class="resource-label"><i class="fas fa-link"></i> Related Resource</div>
        ${ds.resourceLinks.map(link => `
          <a href="${DS.escHtml(link.href)}" target="_blank" rel="noopener noreferrer">
            <i class="fas ${link.icon || 'fa-arrow-up-right-from-square'}"></i>
            <span>${DS.explainTerms(link.label)}</span>
          </a>
        `).join('')}
      </div>` : ''}

      <!-- What Is It -->
      <div class="block">
        <h3 class="block-title"><i class="fas fa-circle-info"></i> What Is It?</h3>
        <p class="block-text">${DS.explainTerms(ds.whatIsIt)}</p>
      </div>

      <!-- Why Use It -->
      <div class="block">
        <h3 class="block-title"><i class="fas fa-arrow-up-right-dots"></i> Why Use It?</h3>
        <p class="block-text">${DS.explainTerms(ds.whyUse)}</p>
      </div>

      ${DS.renderConceptSections(ds.conceptSections)}

      ${DS.renderConceptFlow(ds.conceptFlow)}

      <!-- When To Use -->
      <div class="block">
        <h3 class="block-title"><i class="fas fa-clock"></i> When To Use?</h3>
        <div class="info-grid">
          ${ds.whenToUse.map((w, i) => `
            <div class="info-card">
              <div class="info-card-icon ${['ic-accent','ic-green','ic-blue','ic-red'][i % 4]}"><i class="fas ${w.icon}"></i></div>
              <h4>${DS.explainTerms(w.title)}</h4>
              <p>${DS.explainTerms(w.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Interactive Visualization -->
      ${hasDemo ? `
      <div class="block">
        <h3 class="block-title"><i class="fas fa-play-circle"></i> Interactive Demo</h3>
        <div class="visual-demo" id="demo-${ds.id}">
          <!-- Populated by demo rendering logic -->
        </div>
      </div>` : ''}

      <!-- Code Example -->
      ${hasCode ? `
      <div class="block">
        <h3 class="block-title"><i class="fas fa-code"></i> JavaScript Implementation</h3>
        <div class="code-block" id="code-${ds.id}">
          <div class="code-header">
            <span class="code-lang">JavaScript</span>
            <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> Copy</button>
          </div>
          <div class="code-body">${ds.codeExample}</div>
        </div>
      </div>` : ''}

      <!-- Time Complexity -->
      ${hasComplexity ? `
      <div class="block">
        <h3 class="block-title"><i class="fas fa-gauge-high"></i> Time Complexity</h3>
        ${DS.complexityGuide()}
        <table class="complexity-table">
          <thead><tr><th>Operation</th><th>Time</th><th>What it means</th><th>Speed</th></tr></thead>
          <tbody>
            ${ds.complexity.map(c => `
              <tr>
                <td class="op-name">${DS.explainTerms(c.op)}</td>
                <td>${DS.explainTerms(c.time)}</td>
                <td class="complexity-meaning">${DS.explainTerms(DS.complexityMeaning(c.time))}</td>
                <td><span class="badge-${c.badge}">${c.badge === 'fast' ? 'Fast' : c.badge === 'slow' ? 'Slow' : 'Medium'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>` : ''}

      <!-- Pros & Cons -->
      ${hasProsCons ? `
      <div class="block">
        <h3 class="block-title"><i class="fas fa-scale-balanced"></i> Pros and Cons</h3>
        <div class="pros-cons">
          <div class="pc-card pc-pros">
            <div class="pc-title"><i class="fas fa-thumbs-up"></i> Advantages</div>
            <ul class="pc-list">
              ${ds.pros.map(p => `<li>${DS.explainTerms(p)}</li>`).join('')}
            </ul>
          </div>
          <div class="pc-card pc-cons">
            <div class="pc-title"><i class="fas fa-thumbs-down"></i> Disadvantages</div>
            <ul class="pc-list">
              ${ds.cons.map(c => `<li>${DS.explainTerms(c)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>` : ''}

      <!-- Mark Complete -->
      <div class="complete-section">
        <span class="complete-text">${DS.completed.has(ds.id) ? 'You\'ve completed this section. Nice work!' : 'Finished reading? Mark this section as complete.'}</span>
        <button class="complete-btn ${DS.completed.has(ds.id) ? 'done' : ''}" onclick="markComplete('${ds.id}')">
          ${DS.completed.has(ds.id) ? '<i class="fas fa-check"></i> Completed' : '<i class="fas fa-check"></i> Mark Complete'}
        </button>
      </div>

      <!-- Navigation -->
      <div class="nav-buttons">
        ${DS.currentSection > 0 ? `<button class="nav-btn" onclick="goTo(${DS.currentSection - 1})"><i class="fas fa-arrow-left"></i> ${DS.curriculum[DS.currentSection-1].title}</button>` : '<div></div>'}
        ${DS.currentSection < DS.curriculum.length - 1 ? `<button class="nav-btn" onclick="goTo(${DS.currentSection + 1})">${DS.curriculum[DS.currentSection+1].title} <i class="fas fa-arrow-right"></i></button>` : '<div></div>'}
      </div>
    </section>
  `;

  // Initialize interactive demo
  if (hasDemo) DS.initDemo(ds.id);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
