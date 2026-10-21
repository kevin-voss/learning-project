// The learning path: every step in order, from zero to pro.
// The landing page shows exactly this list (rendered by hub/scripts/catalog.mjs)
// and the browser saves which steps are ticked (hub/progress.js).
//
// Step ids are saved in students' browsers: never rename one, never reuse one.
// A step that leaves the path goes into RETIRED (checked by hub/scripts/check-path.mjs).
// type: read = read on the web · do = build or practise on your computer · check = can you do this?
// href: repo path. Computer-science lessons use '#<lesson-id>' on the track page.

const CS = 'tracks/computer-science/index.html#'
const JAVA = (topic) => `tracks/java/topics/${topic}/index.html`
const SPRING = (topic) => `tracks/spring-boot/topics/${topic}/README.md`
const DRILL = (topic) => `drills/javascript/${topic}/README.md`
const PROJECT = (folder, file = 'README.md') => `projects/${folder}/${file}`

export const LEVELS = [
  { id: 'beginner', title: 'Beginner', goal: 'Your first code and how the web works.' },
  { id: 'java', title: 'Java', goal: 'The main language, from a first program to tested projects.' },
  { id: 'backend', title: 'Backend', goal: 'Databases, servers and a real Spring Boot product.' },
  { id: 'pro', title: 'Pro', goal: 'Queues, services, login, and the ideas behind big systems.' },
]

export const STAGES = [
  {
    id: 'welcome',
    level: 'beginner',
    title: 'Welcome',
    goal: 'No knowledge needed. Find out what a program is and write your first one.',
    steps: [
      { id: 'why-code', type: 'read', title: 'What is a program? A recipe for a computer', href: 'sheets/start/README.md', time: '10 min' },
      { id: 'first-program', type: 'do', title: 'Your first program: say hello in the browser', href: 'sheets/start/first-program.md', time: '15 min' },
    ],
  },
  {
    id: 'start',
    level: 'beginner',
    title: 'Your computer',
    goal: 'Learn the terminal and get this repository onto your computer.',
    steps: [
      { id: 'terminal', type: 'do', title: 'The terminal: try the first commands in the playground', href: `${CS}linux-terminal-os`, time: '1 h' },
      { id: 'setup-tools', type: 'do', title: 'Get set up: GitHub, Git, an editor, this repo, your own branch', href: 'sheets/setup/README.md', time: '1 h' },
      { id: 'git-sheet', type: 'do', title: 'Git sheet: commit and push your first change', href: 'sheets/git/README.md', time: '30 min' },
      { id: 'git-intro', type: 'read', title: 'What Git really does: snapshots and branches', href: `${CS}git-collaboration`, time: '30 min' },
      { id: 'gate-start', type: 'check', title: 'I can move around with cd and ls, this repo is on my computer, and my branch is on GitHub.' },
    ],
  },
  {
    id: 'html-css',
    level: 'beginner',
    title: 'Your first web page',
    goal: 'Build a page that looks good on a phone and on a laptop.',
    steps: [
      { id: 'html-sheet', type: 'read', title: 'HTML sheet', href: 'sheets/html/README.md', time: '10 min' },
      { id: 'css-sheet', type: 'read', title: 'CSS sheet', href: 'sheets/css/README.md', time: '15 min' },
      { id: 'p00-intro', type: 'read', title: 'Project 1: what you will build', href: PROJECT('01-about-me'), time: '5 min' },
      { id: 'p00-build', type: 'do', title: 'Project 1: build your About-me page, step by step', href: PROJECT('01-about-me', 'step-by-step.md'), time: '2–4 h' },
      { id: 'gate-html', type: 'check', title: 'My page has headings, a link, a flex layout and one media query.' },
    ],
  },
  {
    id: 'javascript',
    level: 'beginner',
    title: 'First code: JavaScript',
    goal: 'Variables, ifs, loops and functions, practised with small tests.',
    steps: [
      { id: 'drills-intro', type: 'read', title: 'How the drills work', href: 'drills/javascript/README.md', time: '15 min' },
      { id: 'drill-variables', type: 'do', title: 'Drill: variables', href: DRILL('variables'), time: '1 h' },
      { id: 'drill-math', type: 'do', title: 'Drill: math', href: DRILL('math'), time: '1 h' },
      { id: 'drill-strings', type: 'do', title: 'Drill: strings', href: DRILL('strings'), time: '1 h' },
      { id: 'cs-logic', type: 'read', title: 'True or false: and, or, not', href: `${CS}logical-operators`, time: '15 min' },
      { id: 'drill-conditionals', type: 'do', title: 'Drill: if / else', href: DRILL('conditionals'), time: '1 h' },
      { id: 'drill-loops', type: 'do', title: 'Drill: loops', href: DRILL('loops'), time: '1 h' },
      { id: 'drill-arrays', type: 'do', title: 'Drill: arrays', href: DRILL('arrays'), time: '1 h' },
      { id: 'cs-arrays', type: 'read', title: 'Arrays: a shelf with numbered boxes', href: `${CS}arrays`, time: '20 min' },
      { id: 'drill-functions', type: 'do', title: 'Drill: functions', href: DRILL('functions'), time: '1 h' },
      { id: 'drill-objects', type: 'do', title: 'Drill: objects', href: DRILL('objects'), time: '1 h' },
      { id: 'gate-js-basics', type: 'check', title: 'I can write a function with an if and a loop inside, and its tests turn green.' },
    ],
  },
  {
    id: 'dom',
    level: 'beginner',
    title: 'Make pages come alive',
    goal: 'Your JavaScript changes the page: clicks, lists that grow, a game.',
    steps: [
      { id: 'js-dom', type: 'read', title: 'The page tree: clicks and changes', href: 'sheets/javascript/dom.md', time: '20 min' },
      { id: 'json', type: 'read', title: 'JSON: data in a parcel', href: 'sheets/javascript/json.md', time: '10 min' },
      { id: 'p-shop-web', type: 'do', title: 'Project 2: shopping list in the browser', href: PROJECT('02-shopping-list-web'), time: '2–3 h' },
      { id: 'p-tictactoe', type: 'do', title: 'Project 3: tic-tac-toe', href: PROJECT('03-tic-tac-toe'), time: '2–4 h' },
      { id: 'gate-dom', type: 'check', title: 'A click on my page changes the page, and my list is still there after a reload.' },
    ],
  },
  {
    id: 'web',
    level: 'beginner',
    title: 'How the web works',
    goal: 'What happens between typing a URL and seeing a page. Then an app that talks to the internet.',
    steps: [
      { id: 'web-big', type: 'read', title: 'How the web fits together', href: `${CS}web-big-picture`, time: '15 min' },
      { id: 'web-client-server', type: 'read', title: 'Client and server', href: `${CS}client-server`, time: '15 min' },
      { id: 'web-network', type: 'read', title: 'Networks, IPs, ports and requests', href: `${CS}networks-ips-requests`, time: '20 min' },
      { id: 'web-http', type: 'read', title: 'HTTP requests and responses', href: `${CS}http-requests-responses`, time: '30 min' },
      { id: 'js-sheet', type: 'read', title: 'fetch and await: asking the internet', href: 'sheets/javascript/README.md', time: '15 min' },
      { id: 'p01-intro', type: 'read', title: 'Project 4: what you will build', href: PROJECT('04-weather-dashboard'), time: '5 min' },
      { id: 'p01-build', type: 'do', title: 'Project 4: build the weather dashboard', href: PROJECT('04-weather-dashboard', 'step-by-step.md'), time: '6–10 h' },
      { id: 'gate-web', type: 'check', title: 'I can say what a port is and what is inside an HTTP request.' },
      { id: 'gate-js', type: 'check', title: 'I search a city and see live weather, and I can say what await waits for.' },
    ],
  },
  {
    id: 'java-a',
    level: 'java',
    title: 'Java 1 · The language',
    goal: 'Install Java, write a first program, then types, ifs, loops, methods and classes.',
    steps: [
      { id: 'java-start', type: 'do', title: 'Getting started: install Java, run your first program', href: JAVA('getting-started'), time: '1 h' },
      { id: 'java-syntax', type: 'read', title: 'Syntax fundamentals', href: JAVA('syntax-fundamentals'), time: '30 min' },
      { id: 'java-types', type: 'read', title: 'Types and variables', href: JAVA('types-and-variables'), time: '30 min' },
      { id: 'java-operators', type: 'read', title: 'Operators', href: JAVA('operators'), time: '30 min' },
      { id: 'java-control', type: 'read', title: 'Control flow: if, switch, loops', href: JAVA('control-flow'), time: '45 min' },
      { id: 'java-methods', type: 'read', title: 'Methods', href: JAVA('methods'), time: '30 min' },
      { id: 'java-arrays', type: 'read', title: 'Arrays', href: JAVA('arrays'), time: '30 min' },
      { id: 'java-strings', type: 'read', title: 'Strings and text', href: JAVA('strings'), time: '30 min' },
      { id: 'java-classes', type: 'read', title: 'Classes and objects', href: JAVA('classes-and-objects'), time: '45 min' },
      { id: 'cs-memory', type: 'read', title: 'Where do my variables live? Memory and RAM', href: `${CS}memory-model`, time: '20 min' },
      { id: 'cs-stack-heap', type: 'read', title: 'Stack, heap and garbage collection', href: `${CS}stack-heap-gc`, time: '20 min' },
      { id: 'p-password', type: 'do', title: 'Project 5: build a password generator', href: PROJECT('05-password-generator'), time: '2–3 h' },
      { id: 'gate-java-a', type: 'check', title: 'I put classes in a package, compile from the terminal, and explain class vs object.' },
    ],
  },
  {
    id: 'java-b',
    level: 'java',
    title: 'Java 2 · Everyday tools',
    goal: 'Lists, maps, errors and files: what real programs use every day.',
    steps: [
      { id: 'java-collections', type: 'read', title: 'Collections: ArrayList, HashMap, HashSet', href: JAVA('collections'), time: '1 h' },
      { id: 'cs-lists', type: 'read', title: 'Linked lists', href: `${CS}linked-lists`, time: '20 min' },
      { id: 'cs-stacks', type: 'read', title: 'Stacks', href: `${CS}stacks`, time: '15 min' },
      { id: 'cs-queues', type: 'read', title: 'Queues', href: `${CS}queues`, time: '15 min' },
      { id: 'cs-hash', type: 'read', title: 'Hash tables: how a HashMap finds things fast', href: `${CS}hash-tables`, time: '20 min' },
      { id: 'java-exceptions', type: 'read', title: 'Exceptions', href: JAVA('exceptions'), time: '30 min' },
      { id: 'java-io', type: 'read', title: 'Reading and writing files', href: JAVA('io-basics'), time: '30 min' },
      { id: 'java-debugging', type: 'read', title: 'Debugging', href: JAVA('debugging'), time: '30 min' },
      { id: 'p-shop-java', type: 'do', title: 'Project 6: the shopping list in Java', href: PROJECT('06-shopping-list-java'), time: '2–4 h' },
      { id: 'p-expenses', type: 'do', title: 'Project 7: shared expenses', href: PROJECT('07-shared-expenses'), time: '3–5 h' },
      { id: 'gate-java-b', type: 'check', title: 'I use ArrayList and HashMap without copying code from somewhere.' },
    ],
  },
  {
    id: 'java-smart',
    level: 'java',
    title: 'Java 3 · Smart code',
    goal: 'How fast is my code? Searching, sorting, and shapes for your classes.',
    steps: [
      { id: 'cs-what', type: 'read', title: 'The big map of computer science', href: `${CS}cs-foundations`, time: '15 min' },
      { id: 'cs-bigo', type: 'read', title: 'Big-O: how fast is my code?', href: `${CS}big-o-notation`, time: '20 min' },
      { id: 'cs-search', type: 'read', title: 'Searching algorithms', href: `${CS}searching-algorithms`, time: '20 min' },
      { id: 'cs-sort', type: 'read', title: 'Sorting algorithms', href: `${CS}sorting-algorithms`, time: '30 min' },
      { id: 'java-interfaces', type: 'read', title: 'Interfaces: a promise a class keeps', href: JAVA('interfaces'), time: '30 min' },
      { id: 'java-enums', type: 'read', title: 'Enums: a fixed list of choices', href: JAVA('enums'), time: '30 min' },
      { id: 'cs-binary', type: 'read', title: 'Binary, hex and text encoding', href: `${CS}binary-encoding`, time: '20 min' },
      { id: 'p-calendar', type: 'do', title: 'Project 8: calendar conflicts', href: PROJECT('08-calendar-conflicts'), time: '3–5 h' },
      { id: 'gate-computers', type: 'check', title: 'I can explain array vs linked list, and why a hash table finds things fast.' },
    ],
  },
  {
    id: 'java-c',
    level: 'java',
    title: 'Java 4 · Real projects',
    goal: 'Maven, tests and HTTP. Then a Java program that fetches live weather.',
    steps: [
      { id: 'java-build', type: 'read', title: 'Build tools: Maven', href: JAVA('build-tools'), time: '45 min' },
      { id: 'java-testing', type: 'read', title: 'Testing with JUnit', href: JAVA('testing'), time: '45 min' },
      { id: 'p-budget', type: 'do', title: 'Project 9: household budget with files and tests', href: PROJECT('09-household-budget'), time: '4–6 h' },
      { id: 'java-rest', type: 'read', title: 'REST and HTTP methods', href: JAVA('rest-and-http'), time: '45 min' },
      { id: 'p05-intro', type: 'read', title: 'Project 10: what you will build', href: PROJECT('10-java-weather-cli'), time: '5 min' },
      { id: 'p05-build', type: 'do', title: 'Project 10: build the Java weather CLI', href: PROJECT('10-java-weather-cli', 'step-by-step.md'), time: '3–5 h' },
      { id: 'gate-java-c', type: 'check', title: 'My weather CLI works, and I know GET vs POST.' },
    ],
  },
  {
    id: 'java-d',
    level: 'backend',
    title: 'Data and servers',
    goal: 'How a backend is built: layers, SQL, and a database in a container.',
    steps: [
      { id: 'server-layers', type: 'read', title: 'How a Java server is structured', href: 'sheets/java/server-layers.md', time: '20 min' },
      { id: 'cs-sql', type: 'read', title: 'Databases and SQL', href: `${CS}database-sql-fundamentals`, time: '1 h' },
      { id: 'cs-docker', type: 'read', title: 'Docker and containers', href: `${CS}docker-containers`, time: '30 min' },
      { id: 'p-parcel-db', type: 'do', title: 'Project 11: parcel database (Postgres, Docker, JDBC)', href: PROJECT('11-parcel-database'), time: '3–4 h' },
      { id: 'gate-java-d', type: 'check', title: 'I can point at controller, service and repository, and I ran Postgres in Docker.' },
    ],
  },
  {
    id: 'spring',
    level: 'backend',
    title: 'Spring Boot · ParcelPilot',
    goal: 'One product, built step by step: a web API with validation, tests, Docker and a database.',
    steps: [
      { id: 'spring-intro', type: 'read', title: 'Course intro: what is ParcelPilot?', href: 'tracks/spring-boot/README.md', time: '10 min' },
      { id: 'spring-00', type: 'do', title: 'Step 00: your tools', href: SPRING('00-start-here'), time: '1 h' },
      { id: 'spring-01', type: 'do', title: 'Step 01: describe one parcel in Java', href: SPRING('01-java-basics'), time: '1–2 h' },
      { id: 'spring-02', type: 'do', title: 'Step 02: OOP, composition, first patterns', href: SPRING('02-oop-and-composition'), time: '2–4 h' },
      { id: 'spring-03', type: 'do', title: 'Step 03: Maven, a repeatable build', href: SPRING('03-maven'), time: '2 h' },
      { id: 'spring-04', type: 'do', title: 'Step 04: the first web API', href: SPRING('04-first-spring-api'), time: '3–5 h' },
      { id: 'spring-05', type: 'do', title: 'Step 05: validation', href: SPRING('05-validation-and-inputs'), time: '2 h' },
      { id: 'spring-06', type: 'do', title: 'Step 06: error handling', href: SPRING('06-error-handling'), time: '2 h' },
      { id: 'spring-07', type: 'do', title: 'Step 07: logging', href: SPRING('07-logging-and-observability-basics'), time: '2 h' },
      { id: 'spring-08', type: 'do', title: 'Step 08: testing', href: SPRING('08-testing'), time: '3 h' },
      { id: 'spring-09', type: 'do', title: 'Step 09: Docker', href: SPRING('09-docker'), time: '2 h' },
      { id: 'spring-10', type: 'do', title: 'Step 10: persistence with PostgreSQL', href: SPRING('10-persistence'), time: '4–6 h' },
      { id: 'gate-spring-core', type: 'check', title: 'ParcelPilot saves parcels in Postgres, answers with clear errors, and its tests pass.' },
    ],
  },
  {
    id: 'spring-pro',
    level: 'pro',
    title: 'ParcelPilot at scale',
    goal: 'The same product grows up: modules, queues, a second service, caching and login.',
    steps: [
      { id: 'spring-11', type: 'do', title: 'Step 11: the modular monolith', href: SPRING('11-monolith'), time: '3 h' },
      { id: 'spring-12', type: 'do', title: 'Step 12: queues', href: SPRING('12-queues'), time: '3–5 h' },
      { id: 'spring-13', type: 'do', title: 'Step 13: split out a microservice', href: SPRING('13-split-services'), time: '4 h' },
      { id: 'spring-14', type: 'do', title: 'Step 14: Docker Compose and observing', href: SPRING('14-compose-and-observe'), time: '3 h' },
      { id: 'spring-15', type: 'do', title: 'Step 15: caching, locking, rate limiting', href: SPRING('15-performance-and-safety'), time: '3–5 h' },
      { id: 'spring-16', type: 'do', title: 'Step 16: login and JWT', href: SPRING('16-jwt-authentication'), time: '4 h' },
      { id: 'gate-spring', type: 'check', title: 'ParcelPilot runs in Docker Compose with a database, a queue and login.' },
    ],
  },
  {
    id: 'deeper',
    level: 'pro',
    title: 'Go deeper',
    goal: 'Now the advanced topics make sense: JVM, patterns, threads, system design.',
    steps: [
      { id: 'java-recursion', type: 'read', title: 'Recursion: a method that calls itself', href: JAVA('recursion'), time: '30 min' },
      { id: 'p-calculator', type: 'do', title: 'Project 12: calculator with a recursive parser', href: PROJECT('12-calculator'), time: '4–8 h' },
      { id: 'java-jvm', type: 'read', title: 'JVM and memory', href: JAVA('jvm-memory'), time: '45 min' },
      { id: 'java-patterns', type: 'read', title: 'Design patterns: the full catalog', href: JAVA('design-patterns'), time: '1–2 h' },
      { id: 'java-uml', type: 'read', title: 'UML diagrams', href: JAVA('uml-diagrams'), time: '30 min' },
      { id: 'cs-concurrency', type: 'read', title: 'Concurrency, threads and async', href: `${CS}concurrency-async`, time: '30 min' },
      { id: 'architecture', type: 'read', title: 'Architecture and system design', href: 'tracks/architecture/index.html', time: '2–4 h' },
    ],
  },
  {
    id: 'extras',
    title: 'Extras (any time, optional)',
    optional: true,
    goal: 'Not needed for the path. Pick one when you want more practice or a new topic.',
    steps: [
      { id: 'cleaning', type: 'do', title: 'Code for Cleaning: real-life Java tasks', href: 'programs/code-for-cleaning/README.md', time: '1–15 h each' },
      { id: 'p02', type: 'do', title: 'Ship your About-me page in Docker', href: PROJECT('extras/docker-portfolio'), time: '4–6 h' },
      { id: 'p04', type: 'do', title: 'React todo app', href: PROJECT('extras/react-todo'), time: '6–10 h' },
      { id: 'ai-guide', type: 'read', title: 'AI engineering field guide', href: 'tracks/ai/index.html', time: '31 chapters' },
      { id: 'aws-genai', type: 'read', title: 'AWS GenAI Pro exam prep', href: 'tracks/certifications/aws-genai-pro/index.html', time: 'weeks' },
    ],
  },
]

// Ids that were on the path once. Browsers may still have them saved, so they
// must never come back with a different meaning.
export const RETIRED = [
  'java-sheet', // folded into java-start
  'java-git', // Git lives in git-sheet + git-intro
  'java-practice', // replaced by the project ladder
  'docker-sheet', // Docker lives in cs-docker + the parcel database project
  'p02-intro', 'p02-build', // Docker portfolio is the optional p02
  'p03', // Node weather CLI removed (weather was built three times)
]
