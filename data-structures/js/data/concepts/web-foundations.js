window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'web-big-picture',
    category: 'Web & Infrastructure Foundations',
    title: 'How the Web Fits Together',
    icon: 'fa-map',
    number: '20',
    subtitle: 'Before learning tools, build a map of how browser apps, servers, networks, and databases work together.',
    analogy: 'A web app is like a delivery system. The browser is the customer, the internet is the road, the server is the shop, and the database is the storage room.',
    realWorldExample: {
      title: 'Opening a learning app',
      desc: 'You type a URL. The browser finds the server, downloads the app, asks an API for lessons, and displays the result. If you mark a lesson complete, the browser sends another request so the server can save progress.',
    },
    whatIsIt: 'The web is a set of connected responsibilities. The browser shows the screen. The internet carries messages. A server handles requests. A database remembers information. Developer tools help teams build, ship, and protect all of it.',
    whyUse: 'Beginners often learn Git, Docker, HTTP, auth, and deployment as separate words. This lesson gives one mental model first, so every later tool has a place to live.',
    conceptSections: [
      { icon: 'fa-window-maximize', title: 'Browser', desc: 'The browser is the user-facing part. It renders pages and runs frontend JavaScript.', example: 'Clicking a button can make the browser send a request.' },
      { icon: 'fa-network-wired', title: 'Internet', desc: 'The internet moves small packets of data between computers.', example: 'A request may cross Wi-Fi, routers, and providers before reaching a server.' },
      { icon: 'fa-server', title: 'Server', desc: 'The server waits for requests, runs logic, and sends responses.', example: 'A server checks login and returns profile data.' },
      { icon: 'fa-database', title: 'Database', desc: 'The database remembers data when the server restarts.', example: 'Users, posts, orders, and lessons often live in a database.' },
    ],
    conceptFlow: ['User opens URL', 'Browser finds server', 'Server sends app files', 'Browser runs JavaScript', 'JavaScript calls API', 'Server reads database', 'Browser updates screen'],
    mermaidDiagram: `flowchart LR
  User[User] --> Browser[Browser]
  Browser --> Internet[Internet]
  Internet --> Server[Server]
  Server --> Database[Database]
  Server --> API[API response]
  API --> Browser
  Browser --> Screen[Updated screen]`,
    whenToUse: [
      { icon: 'fa-route', title: 'Learning roadmaps', desc: 'Use the big picture before diving into specific tools.' },
      { icon: 'fa-bug', title: 'Debugging', desc: 'Ask which part failed: browser, network, server, database, or deployment.' },
      { icon: 'fa-comments', title: 'Explaining apps', desc: 'Use this map to talk through any web feature.' },
      { icon: 'fa-layer-group', title: 'Connecting lessons', desc: 'Git, Docker, HTTP, auth, and CI/CD all fit into this system.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Follow the app path',
    demoHint: 'Step through the high-level journey from browser to server and back.',
    demoSteps: [
      { label: 'Open URL', detail: 'The browser starts from a web address.', result: 'The browser knows which site the user wants.' },
      { label: 'Ask server', detail: 'A request travels across the internet to a server.', result: 'The server receives a message to handle.' },
      { label: 'Read data', detail: 'The server may ask a database for saved information.', result: 'Long-term data is loaded on the backend.' },
      { label: 'Render UI', detail: 'The response returns and the browser updates the screen.', result: 'The user sees a page, list, profile, or error.' },
    ],
    pros: ['Gives every later tool a place in the system', 'Helps beginners debug by location', 'Connects frontend, backend, network, and data'],
    cons: ['Real systems have more layers', 'Some details are intentionally simplified', 'The map is a starting point, not the whole territory'],
    checklist: ['Explain the job of a browser, server, and database.', 'Describe a request and response in your own words.', 'Point to where deployment fits in the app journey.'],
  },
  {
    id: 'client-server',
    category: 'Web & Infrastructure Foundations',
    title: 'Client and Server',
    icon: 'fa-laptop-code',
    number: '21',
    subtitle: 'Most web apps are conversations between a user-facing client and a behind-the-scenes server.',
    analogy: 'A client and server are like a customer and a restaurant kitchen. The customer asks from the menu. The kitchen prepares the result and sends it back.',
    realWorldExample: {
      title: 'Loading your profile',
      desc: 'Your browser asks the server for profile data. The server checks who you are, reads saved information from a database, and sends JSON back. The browser turns that JSON into text, images, and buttons.',
    },
    whatIsIt: 'A client is the part of an app that makes a request. In web development, it is often the browser. A server receives requests, runs logic, talks to databases, and sends responses back.',
    whyUse: 'Client-server design separates responsibilities. The client focuses on the user interface. The server protects important logic, checks permissions, stores data, and gives many clients one shared source of truth.',
    conceptSections: [
      { icon: 'fa-display', title: 'Client', desc: 'The client displays the user interface and starts the conversation.', example: 'A browser sends a request when you click Load comments.' },
      { icon: 'fa-server', title: 'Server', desc: 'The server waits for requests, checks rules, and chooses a response.', example: 'A server checks whether you are logged in before returning private data.' },
      { icon: 'fa-database', title: 'Database', desc: 'The database stores information for later. The client usually should not talk to it directly.', example: 'Profiles, posts, scores, and orders often live in a database.' },
      { icon: 'fa-envelope', title: 'Request and response', desc: 'The client sends a request. The server sends a response.', example: 'GET /api/profile asks for profile data.' },
    ],
    conceptFlow: ['User clicks a button', 'Client sends HTTP request', 'Server receives request', 'Server may read or write database data', 'Server sends HTTP response', 'Client updates the screen'],
    mermaidDiagram: `sequenceDiagram
  participant User
  participant Client as Browser / Client
  participant Server
  participant DB as Database
  User->>Client: Click Load Profile
  Client->>Server: GET /api/profile
  Server->>DB: Read profile data
  DB-->>Server: Profile record
  Server-->>Client: 200 OK + JSON
  Client-->>User: Render profile`,
    whenToUse: [
      { icon: 'fa-window-maximize', title: 'Frontend apps', desc: 'Browsers and mobile apps usually act as clients.' },
      { icon: 'fa-server', title: 'Backend APIs', desc: 'Servers handle private logic and shared data.' },
      { icon: 'fa-user-lock', title: 'Private features', desc: 'Use the server to check who can access sensitive data.' },
      { icon: 'fa-plug', title: 'Integrations', desc: 'Clients and servers communicate through APIs.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Request animation',
    demoHint: 'Watch the client ask, the server decide, and the database remember.',
    demoSteps: [
      { label: 'Client asks', detail: 'The client sends GET /api/profile.', result: 'A request is moving toward the server.' },
      { label: 'Server checks', detail: 'The server decides if this client is allowed to see the data.', result: 'Private logic stays on the server.' },
      { label: 'Database reads', detail: 'The server fetches the saved profile from the database.', result: 'Stored data becomes part of the response.' },
      { label: 'Client renders', detail: 'The response returns as JSON and the client updates the page.', result: 'The user sees the profile.' },
    ],
    codeTitle: 'Client Code Example',
    codeLanguage: 'JavaScript',
    codeText: `async function loadProfile() {
  const response = await fetch('/api/profile');
  const profile = await response.json();

  console.log(profile.name);
}`,
    pros: ['Keeps user interface and private logic separate', 'Lets many clients share one backend', 'Makes databases easier to protect'],
    cons: ['Network failures must be handled', 'Frontend and backend must agree on API shape', 'More moving parts than a single local script'],
    checklist: ['Identify the client and server in a web app.', 'Explain why the browser should not connect directly to a private database.', 'Read a small fetch example and describe the request.'],
  },
  {
    id: 'networks-ips-requests',
    category: 'Web & Infrastructure Foundations',
    title: 'Networks, IPs, Ports, and Requests',
    icon: 'fa-network-wired',
    number: '22',
    subtitle: 'A request reaches a server by moving packets through networks toward an IP address and port.',
    analogy: 'A network request is like shipping a box. The IP address is the building address, the port is the department inside the building, packets are smaller boxes, and routers are delivery hubs along the route.',
    realWorldExample: {
      title: 'Calling a local development API',
      desc: 'When your browser calls http://localhost:3000/api/tasks, localhost points to your own computer, 3000 is the port where the server listens, and /api/tasks is the path the server handles.',
    },
    whatIsIt: 'A network is a group of computers that can send messages to each other. The internet is a network of networks. Data is split into packets, routed toward an IP address, delivered to a port, and then handled by a server process. IPv4 addresses are shorter four-part addresses. IPv6 addresses are longer hexadecimal addresses created because the internet needed far more unique addresses.',
    whyUse: 'Knowing networks, IPs, ports, IPv4, IPv6, and requests helps beginners debug connection refused, wrong port, server not running, timeout, cannot reach API, and works locally but not deployed errors.',
    conceptSections: [
      { icon: 'fa-location-dot', title: 'IP address', desc: 'An IP address identifies a device or server on a network. It is like the destination address for packets.', example: '127.0.0.1 points back to your own computer.' },
      { icon: 'fa-list-ol', title: 'IPv4', desc: 'IPv4 uses four octets. Each octet is a number from 0 to 255, which represents 8 bits.', example: '192.168.1.20 has four octets: 192, 168, 1, and 20.' },
      { icon: 'fa-hashtag', title: 'IPv6', desc: 'IPv6 uses eight hexadecimal groups and supports a much larger address space than IPv4.', example: '2001:0db8:0000:0000:0000:0000:0000:0001 can be shortened to 2001:db8::1.' },
      { icon: 'fa-sitemap', title: 'Subnet', desc: 'A subnet is a smaller range inside a network. CIDR notation says how many starting bits describe the network.', example: '192.168.1.0/24 usually covers 192.168.1.0 through 192.168.1.255.' },
      { icon: 'fa-door-open', title: 'Port', desc: 'A port is a numbered doorway where one server program listens.', example: 'A Vite app may use port 5173 while an API uses port 3000.' },
      { icon: 'fa-boxes-stacked', title: 'Packets', desc: 'Large messages are broken into packets so networks can move them in pieces.', example: 'A response body may arrive as many packets.' },
      { icon: 'fa-route', title: 'Routers', desc: 'Routers forward packets toward the destination network.', example: 'Home Wi-Fi sends traffic to your router, then your internet provider.' },
      { icon: 'fa-handshake', title: 'TCP and UDP', desc: 'TCP is reliable and connection-based. UDP is lighter and does not guarantee delivery.', example: 'Web pages usually use TCP; video calls and games may use UDP.' },
      { icon: 'fa-file-lines', title: 'Request shape', desc: 'A request has a method, path, headers, and sometimes a body.', example: 'POST /login sends credentials in a request body.' },
    ],
    conceptFlow: ['Client chooses host and port', 'DNS or config gives an IP address', 'Message becomes packets', 'Routers forward packets by network ranges', 'Server receives packets on a port', 'Server process handles request', 'Response packets travel back', 'Client rebuilds response'],
    mermaidDiagram: `flowchart LR
  A[Browser request] --> B{Address family}
  B --> C[IPv4 192.168.1.20]
  B --> D[IPv6 2001:db8::1]
  C --> E[Packets]
  D --> E
  E --> F[Home router]
  F --> G[Internet routers]
  G --> H[Server IP]
  H --> I[Port 443 or 3000]
  I --> J[Server process]
  J --> K[Response packets]
  K --> A`,
    whenToUse: [
      { icon: 'fa-bug', title: 'Connection errors', desc: 'Check whether the server is running and the client is using the right host and port.' },
      { icon: 'fa-laptop-code', title: 'Local development', desc: 'Use localhost and ports to run frontend and backend apps side by side.' },
      { icon: 'fa-server', title: 'Deploying servers', desc: 'Servers must listen on a port and be reachable through networking rules.' },
      { icon: 'fa-gauge-high', title: 'Performance debugging', desc: 'Packets, latency, and timeouts explain why requests may feel slow.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Packet route simulator',
    demoHint: 'Follow a request from browser to IP address, port, server process, and back.',
    demoSteps: [
      { label: 'Choose address', detail: 'The client chooses a host, IP address, and port.', result: 'The request has a destination.' },
      { label: 'Read IP version', detail: 'IPv4 uses four decimal octets. IPv6 uses eight hexadecimal groups that can be shortened with :: once.', result: 'The client and network know which address format they are using.' },
      { label: 'Split packets', detail: 'The message is split into packets for the network.', result: 'Small chunks can travel through routers.' },
      { label: 'Reach port', detail: 'Packets arrive at the server IP and target port.', result: 'The correct server process can receive the request.' },
      { label: 'Return response', detail: 'The server sends response packets back to the client.', result: 'The browser rebuilds the response and uses it.' },
    ],
    codeTitle: 'Address and Request Examples',
    codeLanguage: 'HTTP',
    codeText: `IPv4: 192.168.1.20
  192 = octet 1
  168 = octet 2
  1   = octet 3
  20  = octet 4

IPv6: 2001:db8::1
  8 groups of hexadecimal numbers
  :: compresses groups of zeros once

POST /api/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "email": "maya@example.com",
  "password": "demo-password"
}`,
    pros: ['Explains localhost, ports, and server listening', 'Helps debug failed API calls', 'Connects browser requests to real network movement'],
    cons: ['Actual routing is more complex', 'Firewalls and cloud networking add more layers', 'Beginners do not need every protocol detail at once'],
    checklist: ['Explain IP address vs port.', 'Describe IPv4 octets and IPv6 hexadecimal groups.', 'Describe what packets and routers do.', 'Read a simple HTTP request and identify method, path, headers, and body.'],
  },
  {
    id: 'networking-http',
    category: 'Web & Infrastructure Foundations',
    title: 'URLs, DNS, HTTP, and HTTPS',
    icon: 'fa-globe',
    number: '23',
    subtitle: 'The web works by finding servers, sending requests, receiving responses, and protecting data in transit.',
    analogy: 'Opening a website is like mailing a letter. The URL is the written address, DNS is the address book, HTTP is the message format, and HTTPS is the sealed envelope.',
    realWorldExample: {
      title: 'Typing a website URL',
      desc: 'When you type https://example.com, the browser parses the URL, asks DNS for an IP address, opens a connection, completes TLS, sends an HTTP request, and receives an HTTP response containing the page.',
    },
    whatIsIt: 'A URL tells the browser what you want. DNS finds the server address. HTTP is the request and response language. HTTPS uses TLS so other people on the network cannot easily read or change the conversation.',
    whyUse: 'Networking basics help beginners debug broken links, failed API calls, bad certificates, 404 pages, redirects, slow pages, and site cannot be reached errors.',
    conceptSections: [
      { icon: 'fa-link', title: 'URL', desc: 'A URL contains parts like protocol, domain, path, query string, and fragment.', example: 'https://shop.example.com/products?id=42#reviews' },
      { icon: 'fa-address-book', title: 'DNS', desc: 'DNS is the internet address book. It finds an IP for a domain.', example: 'example.com resolves to an IP address.' },
      { icon: 'fa-file-lines', title: 'HTTP', desc: 'HTTP messages have methods, headers, status codes, and sometimes a body.', example: 'GET /products asks for data. POST /login sends data.' },
      { icon: 'fa-lock', title: 'HTTPS', desc: 'HTTPS wraps HTTP in TLS encryption.', example: 'Passwords and tokens should travel over HTTPS.' },
    ],
    conceptFlow: ['User enters URL', 'Browser parses URL', 'DNS finds server IP', 'Browser opens connection', 'TLS secures HTTPS', 'Browser sends HTTP request', 'Server sends HTTP response', 'Browser renders page'],
    mermaidDiagram: `flowchart LR
  A[User enters URL] --> B[Browser parses URL]
  B --> C[DNS lookup]
  C --> D[Server IP]
  D --> E[Open connection]
  E --> F[TLS handshake]
  F --> G[HTTP request]
  G --> H[Web server]
  H --> I[HTTP response]
  I --> J[Browser displays page]`,
    whenToUse: [
      { icon: 'fa-bug', title: 'Debugging web errors', desc: 'Use URLs, DNS, and status codes to understand why a page or API call failed.' },
      { icon: 'fa-code', title: 'Calling APIs', desc: 'Use HTTP methods, headers, and bodies when frontend code talks to backend services.' },
      { icon: 'fa-lock', title: 'Protecting users', desc: 'Use HTTPS so passwords, tokens, and private data are encrypted in transit.' },
      { icon: 'fa-gauge-high', title: 'Improving performance', desc: 'Understand DNS, connections, caching, and redirects when pages load slowly.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Follow a website request',
    demoHint: 'Connect each network keyword to the browser journey.',
    demoSteps: [
      { label: 'URL', detail: 'The URL says use HTTPS, ask this domain, and request this path.', result: 'The browser knows what resource to ask for.' },
      { label: 'DNS', detail: 'DNS translates the domain into an IP address.', result: 'The browser knows where to connect.' },
      { label: 'TLS', detail: 'TLS creates an encrypted HTTPS channel.', result: 'The request is protected in transit.' },
      { label: 'HTTP', detail: 'The browser sends an HTTP request and reads the status, headers, and body.', result: 'The page or API data arrives.' },
    ],
    codeTitle: 'API Request Example',
    codeLanguage: 'JavaScript',
    codeText: `async function loadUser() {
  const response = await fetch('https://api.example.com/users/42');

  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }

  const user = await response.json();
  console.log(user.name);
}`,
    pros: ['Explains what happens when a website loads', 'Helps debug browser and API problems', 'Connects URLs, DNS, HTTP, and HTTPS into one flow'],
    cons: ['Real networking has more layers', 'Browser security adds more rules later', 'TLS details are simplified for beginners'],
    checklist: ['Break a URL into protocol, domain, path, query, and fragment.', 'Explain why DNS exists.', 'Describe why HTTPS matters for private data.'],
  },
  {
    id: 'database-sql',
    category: 'Web & Infrastructure Foundations',
    title: 'Databases and SQL',
    icon: 'fa-database',
    number: '24',
    subtitle: 'SQL databases store app data in tables so servers can query, change, and protect long-term information.',
    analogy: 'A SQL database is like a set of organized spreadsheets with rules. Each table stores one kind of thing, each row is one record, each column is one field, and relationships connect records together.',
    realWorldExample: {
      title: 'Saving lessons and progress',
      desc: 'A learning app might store users in one table, lessons in another, and completed lessons in a join table. When a user opens the dashboard, the server runs SQL queries to find the lessons and completion status.',
    },
    whatIsIt: 'A relational database stores structured data in tables. SQL is the language used to read and change that data. Tables contain rows and columns. Primary keys identify rows. Foreign keys connect rows across tables. Indexes speed up lookups. Partitioning, replication, and sharding help databases handle more data and traffic.',
    whyUse: 'Most real apps need durable data. SQL helps developers ask precise questions, enforce relationships, update records safely, and keep data consistent even when many users are active. As apps grow, indexes and scaling patterns keep common queries fast.',
    conceptSections: [
      { icon: 'fa-table', title: 'Table', desc: 'A table groups one kind of record.', example: 'A users table stores one row per user.' },
      { icon: 'fa-grip-lines', title: 'Row', desc: 'A row is one record in a table.', example: 'One user row may contain id, email, and created_at.' },
      { icon: 'fa-columns', title: 'Column', desc: 'A column is one named field on every row.', example: 'email is a column in the users table.' },
      { icon: 'fa-key', title: 'Primary key', desc: 'A primary key uniquely identifies one row.', example: 'users.id can identify a specific user.' },
      { icon: 'fa-link', title: 'Foreign key', desc: 'A foreign key points from one table to another.', example: 'orders.user_id points to users.id.' },
      { icon: 'fa-diagram-project', title: 'Relations', desc: 'Relations connect tables so data can stay organized instead of duplicated everywhere.', example: 'completions.user_id connects a completion row to one users.id row.' },
      { icon: 'fa-book-open-reader', title: 'Query examples', desc: 'SQL can read, insert, update, delete, join, group, and sort data.', example: 'SELECT title FROM lessons WHERE published = true ORDER BY title;' },
      { icon: 'fa-gauge-high', title: 'Indexes', desc: 'An index is a helper structure that speeds up common lookups, filters, and joins.', example: 'CREATE INDEX idx_lessons_published ON lessons(published);' },
      { icon: 'fa-lock', title: 'Transactions', desc: 'A transaction groups operations so they succeed or fail together.', example: 'Create an order and order items together, or roll back both.' },
      { icon: 'fa-chart-pie', title: 'Partitioning', desc: 'Partitioning splits one large table into smaller pieces, often by time, tenant, or region.', example: 'A logs table can be partitioned by month.' },
      { icon: 'fa-copy', title: 'Replication', desc: 'Replication copies data to other database servers for reads, backups, or failover.', example: 'A read replica can handle dashboard queries.' },
      { icon: 'fa-layer-group', title: 'Sharding', desc: 'Sharding splits data across multiple database servers when one server cannot hold or serve everything.', example: 'Users A-M go to shard 1 and N-Z go to shard 2.' },
    ],
    conceptFlow: ['Design tables and relations', 'Choose primary and foreign keys', 'Write SQL queries', 'Add indexes for common lookups', 'Use transactions for safe writes', 'Partition or replicate when data grows', 'Shard only when one database is no longer enough'],
    mermaidDiagram: `erDiagram
  USERS ||--o{ COMPLETIONS : has
  LESSONS ||--o{ COMPLETIONS : includes
  USERS {
    int id PK
    string email
  }
  LESSONS {
    int id PK
    string title
  }
  COMPLETIONS {
    int user_id FK
    int lesson_id FK
    datetime completed_at
  }`,
    whenToUse: [
      { icon: 'fa-user', title: 'User accounts', desc: 'Store profiles, settings, and account state.' },
      { icon: 'fa-cart-shopping', title: 'Orders and payments', desc: 'Store structured business records with relationships.' },
      { icon: 'fa-list-check', title: 'Progress tracking', desc: 'Connect users to lessons, tasks, or achievements.' },
      { icon: 'fa-lock', title: 'Consistent updates', desc: 'Use transactions when multiple writes must succeed together.' },
    ],
    demoType: 'database-sql',
    codeTitle: 'SQL Query Examples',
    codeLanguage: 'SQL',
    codeText: `SELECT
  users.email,
  lessons.title,
  completions.completed_at
FROM completions
JOIN users ON users.id = completions.user_id
JOIN lessons ON lessons.id = completions.lesson_id
WHERE users.id = 42
ORDER BY completions.completed_at DESC;`,
    complexity: [
      { op: 'Read by primary key', time: 'O(log n)', badge: 'mid' },
      { op: 'Scan table without index', time: 'O(n)', badge: 'slow' },
      { op: 'Insert one row', time: 'O(log n)', badge: 'mid' },
      { op: 'Join with useful indexes', time: 'O(n log n)', badge: 'mid' },
    ],
    pros: ['Great for structured data and relationships', 'SQL is widely used across real apps', 'Indexes and transactions help keep apps fast and consistent', 'Replication and partitioning provide growth paths'],
    cons: ['Schema design takes planning', 'Bad queries can be slow', 'Too many indexes slow down writes', 'Sharding adds serious operational complexity', 'Apps must avoid SQL injection by using parameters'],
    checklist: ['Explain table, row, and column.', 'Describe primary key vs foreign key.', 'Read SELECT, INSERT, UPDATE, JOIN, and GROUP BY examples.', 'Explain when an index helps.', 'Describe partitioning, replication, and sharding at a high level.'],
  },
  {
    id: 'git-collaboration',
    category: 'Web & Infrastructure Foundations',
    title: 'Git and Collaboration',
    icon: 'fa-code-branch',
    number: '25',
    subtitle: 'Git helps developers save changes, compare versions, and work together without overwriting each other.',
    analogy: 'Git is like a shared notebook with unlimited save points. Each commit is a labeled snapshot. A branch is a safe page for trying an idea.',
    realWorldExample: {
      title: 'Building a website with teammates',
      desc: 'One person edits the homepage, another fixes a button, and another updates styles. Git lets each person work on a branch, save commits, push changes, review work, and merge finished code back into the main project.',
    },
    whatIsIt: 'Git is version control for code. A commit is a saved snapshot. A branch is a separate line of work. A pull request is a review conversation before changes join the main project.',
    whyUse: 'Without Git, collaboration becomes copied folders, confusing file names, and overwritten work. With Git, teams can experiment safely, review changes, roll back mistakes, and keep clear history.',
    conceptSections: [
      { icon: 'fa-folder-tree', title: 'Repository', desc: 'A repository is the project Git watches.', example: 'A website folder with Git history is a repository.' },
      { icon: 'fa-camera', title: 'Commit', desc: 'A commit is a labeled snapshot of meaningful work.', example: 'Commit message: Add signup validation.' },
      { icon: 'fa-code-branch', title: 'Branch', desc: 'A branch lets you work separately from the main project.', example: 'feature/navbar can change navigation safely.' },
      { icon: 'fa-people-arrows', title: 'Pull request', desc: 'A pull request lets teammates review before merging.', example: 'A reviewer can approve or request changes.' },
    ],
    conceptFlow: ['Clone repository', 'Create branch', 'Edit files', 'Stage changes', 'Commit snapshot', 'Push branch', 'Open pull request', 'Review and merge'],
    mermaidDiagram: `flowchart LR
  A[Working directory] --> B[Stage changes]
  B --> C[Commit snapshot]
  C --> D[Push branch]
  D --> E[Open pull request]
  E --> F[Review changes]
  F --> G[Merge into main]
  G --> H[Teammates pull latest]`,
    whenToUse: [
      { icon: 'fa-clock-rotate-left', title: 'Track history', desc: 'Use Git whenever you want a clear record of how a project changed.' },
      { icon: 'fa-user-group', title: 'Work with teammates', desc: 'Use branches and pull requests so people can work in parallel.' },
      { icon: 'fa-flask', title: 'Experiment safely', desc: 'Try an idea on a branch without breaking the main version.' },
      { icon: 'fa-triangle-exclamation', title: 'Recover from mistakes', desc: 'Use history to inspect or undo changes when something goes wrong.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Branch and merge playground',
    demoHint: 'Move from local edits to reviewed work.',
    demoSteps: [
      { label: 'Branch', detail: 'Create a branch so unfinished work stays separate.', result: 'You have a safe workspace.' },
      { label: 'Commit', detail: 'Stage files and make a commit with a message.', result: 'Git has a snapshot you can inspect later.' },
      { label: 'Push', detail: 'Push sends your branch to the shared remote.', result: 'Teammates can see your work.' },
      { label: 'PR + merge', detail: 'A pull request collects review, then merge combines approved work.', result: 'The main branch receives the change.' },
    ],
    codeTitle: 'Git Command Example',
    codeLanguage: 'Shell',
    codeText: `git clone https://github.com/example/site.git
cd site
git switch -c feature/add-navbar
git status
git add index.html styles.css
git commit -m "Add navbar layout"
git push origin feature/add-navbar
git pull origin main`,
    pros: ['Protects project history', 'Makes teamwork safer', 'Supports experiments through branches', 'Helps review, debug, and undo changes'],
    cons: ['New terms can feel confusing at first', 'Merge conflicts require practice', 'Bad commit messages make history harder to understand'],
    checklist: ['Explain commit, branch, push, pull, and merge.', 'Describe why teams use pull requests.', 'Read git status and know whether work is staged.'],
  },
  {
    id: 'servers-deployment-devops',
    category: 'Web & Infrastructure Foundations',
    title: 'Servers, Deployment, and CI/CD',
    icon: 'fa-server',
    number: '26',
    subtitle: 'Learn how code moves from your computer to real users, and how teams keep it working.',
    analogy: 'Building an app is like opening a restaurant. Code is the recipe, a server is the kitchen, deployment opens the doors, CI/CD is the checklist, logs are kitchen notes, and monitoring is the smoke alarm.',
    realWorldExample: {
      title: 'Deploying a todo app',
      desc: 'You push code to GitHub. CI runs tests and builds the app. If checks pass, the hosting platform deploys it. Users visit the live URL. If a button breaks, logs show errors and monitoring can alert the team.',
    },
    whatIsIt: 'A server runs software for users. Deployment publishes code. CI checks changes automatically. CD prepares or releases code. Logs and monitoring help teams notice what happens after release.',
    whyUse: 'Real software is more than code on your laptop. It needs a repeatable path to production and a way to see whether users are getting errors, slow pages, or outages.',
    conceptSections: [
      { icon: 'fa-server', title: 'Server', desc: 'A server waits for requests and sends responses.', example: 'GET /health returns {"status":"ok"}.' },
      { icon: 'fa-rocket', title: 'Deployment', desc: 'Deployment copies, builds, or releases code where users can access it.', example: 'A static site may deploy to a CDN.' },
      { icon: 'fa-gears', title: 'CI/CD', desc: 'CI/CD automates checks and releases so humans make fewer repeat mistakes.', example: 'Run tests on every pull request.' },
      { icon: 'fa-chart-line', title: 'Logs and monitoring', desc: 'Logs show events. Monitoring shows health patterns over time.', example: 'An alert fires when error rate jumps.' },
    ],
    conceptFlow: ['Developer writes code', 'Push to Git repository', 'CI runs tests', 'Build app', 'Deploy to server', 'Users send requests', 'Logs and monitoring track health'],
    mermaidDiagram: `flowchart LR
  A[Developer code] --> B[Git push]
  B --> C[CI pipeline]
  C --> D{Tests pass?}
  D -- No --> E[Fix code]
  E --> B
  D -- Yes --> F[Build app]
  F --> G[Deploy]
  G --> H[Users]
  H --> I[Logs]
  H --> J[Monitoring]`,
    whenToUse: [
      { icon: 'fa-globe', title: 'Publishing apps', desc: 'Deploy when other people need to access your work.' },
      { icon: 'fa-vial', title: 'Automated checks', desc: 'Use CI so tests run consistently before changes ship.' },
      { icon: 'fa-chart-simple', title: 'Production health', desc: 'Use logs and monitoring to understand live behavior.' },
      { icon: 'fa-rotate', title: 'Repeatable releases', desc: 'Use CD to reduce manual release mistakes.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Deployment pipeline simulator',
    demoHint: 'Watch a change move through automated checks to a live app.',
    demoSteps: [
      { label: 'Push', detail: 'A developer pushes commits to the remote repository.', result: 'Automation has a new change to check.' },
      { label: 'Test', detail: 'CI runs tests, lint, and build steps.', result: 'Bad changes can stop before users see them.' },
      { label: 'Deploy', detail: 'A passing build is published to hosting or servers.', result: 'Users can reach the new version.' },
      { label: 'Observe', detail: 'Logs and monitoring show errors, latency, and traffic.', result: 'The team can detect and debug production issues.' },
    ],
    codeTitle: 'CI Workflow Example',
    codeLanguage: 'YAML',
    codeText: `name: Test and Build

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run build`,
    pros: ['Makes releases more repeatable', 'Catches mistakes before deployment', 'Gives teams visibility after launch'],
    cons: ['Pipelines need maintenance', 'Broken tests can block releases', 'Monitoring must be tuned to avoid noisy alerts'],
    checklist: ['Explain the path from Git push to deploy.', 'Describe what CI checks before release.', 'Explain why logs and monitoring matter after launch.'],
  },
  {
    id: 'docker-containers',
    category: 'Web & Infrastructure Foundations',
    title: 'Docker and Containers',
    icon: 'fa-box',
    number: '27',
    subtitle: 'Package an app with everything it needs so it runs the same way on any machine.',
    analogy: 'Docker is like packing a lunchbox for your app. Instead of hoping another kitchen has the same tools and ingredients, you pack the runtime, setup, and app together.',
    realWorldExample: {
      title: 'Web app plus database',
      desc: 'A Node app can run in one container and PostgreSQL in another. New developers do not manually install exact Node and database versions. They run one command and get the same setup as the team.',
    },
    whatIsIt: 'Docker builds images and runs containers. An image is a packaged template. A container is a running copy of that template. Containers help developers, CI systems, and servers run apps with consistent dependencies.',
    whyUse: 'Docker helps solve "it works on my machine." If every developer, test server, and production server runs the same container image, the app is more likely to behave consistently everywhere.',
    conceptSections: [
      { icon: 'fa-file-lines', title: 'Dockerfile', desc: 'A Dockerfile is the recipe for an image.', example: 'Start from node:20, copy files, install packages, run the app.' },
      { icon: 'fa-layer-group', title: 'Image', desc: 'An image is the packaged result of the Dockerfile.', example: 'hello-web:1.0 can be shared and run elsewhere.' },
      { icon: 'fa-play', title: 'Container', desc: 'A container is a live running instance of an image.', example: 'Run the image and expose port 3000.' },
      { icon: 'fa-database', title: 'Volume', desc: 'A volume helps important data survive container restarts.', example: 'Postgres data is stored in a volume.' },
    ],
    conceptFlow: ['Write app code', 'Write Dockerfile', 'Build image', 'Run container', 'Map host port to container port', 'Attach volume if data must persist', 'Use Compose for multiple services'],
    mermaidDiagram: `flowchart TD
  A[App code] --> B[Dockerfile]
  B --> C[Docker builds image]
  C --> D[Container runs]
  D --> E[App listens on container port]
  E --> F[Host port maps traffic]
  D --> G[Volume saves data]
  H[docker-compose.yml] --> D
  H --> I[Database container]`,
    whenToUse: [
      { icon: 'fa-user-plus', title: 'Onboarding developers', desc: 'New teammates can start without manually installing every dependency.' },
      { icon: 'fa-vial', title: 'Testing consistently', desc: 'Tests can run in the same environment on laptops and CI servers.' },
      { icon: 'fa-server', title: 'Deploying apps', desc: 'The same image can move from development to staging to production.' },
      { icon: 'fa-database', title: 'Running local services', desc: 'Databases, queues, and caches can run locally without permanent installs.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Build and run pipeline',
    demoHint: 'Move from Dockerfile to image to container and see where ports and volumes fit.',
    demoSteps: [
      { label: 'Dockerfile', detail: 'The Dockerfile lists setup instructions.', result: 'Docker has a recipe for the image.' },
      { label: 'Image', detail: 'Build turns the recipe into a reusable image.', result: 'The app environment is packaged.' },
      { label: 'Container', detail: 'Run starts a live container from the image.', result: 'The app is running in isolation.' },
      { label: 'Ports + volumes', detail: 'Port mapping exposes the app. Volumes preserve important data.', result: 'The container can be reached and data can survive restarts.' },
    ],
    codeTitle: 'Dockerfile Example',
    codeLanguage: 'Dockerfile',
    codeText: `FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]`,
    pros: ['Makes app environments repeatable', 'Simplifies setup with many dependencies', 'Works well for local development, CI, and deployment'],
    cons: ['Adds new concepts and commands', 'Images can become large', 'Ports, volumes, and networking can confuse beginners'],
    checklist: ['Explain image vs container.', 'Describe why Docker helps with "works on my machine".', 'Explain what a port mapping does.'],
  },
  {
    id: 'encryption-concepts',
    category: 'Web & Infrastructure Foundations',
    title: 'Encryption, Keys, and Certificates',
    icon: 'fa-key',
    number: '28',
    subtitle: 'Encryption turns readable data into unreadable ciphertext so private information can move and rest more safely.',
    analogy: 'Encryption is like putting a message into a locked box. Symmetric encryption uses one shared key for locking and unlocking. Asymmetric encryption uses a public key to lock and a private key to unlock.',
    realWorldExample: {
      title: 'Sending a password over HTTPS',
      desc: 'When you log in, HTTPS uses TLS to protect the request in transit. Someone on the same Wi-Fi may see packets moving, but encryption makes the password unreadable. The server can read the password only after the protected connection delivers it.',
    },
    whatIsIt: 'Encryption changes plaintext into ciphertext using a key. Symmetric encryption uses the same secret key to encrypt and decrypt. Asymmetric encryption uses a public key and private key pair. Certificates help browsers trust that a public key belongs to the domain they visited. Hashing and signing are related security tools, but they are not the same as encryption.',
    whyUse: 'Encryption protects private data in transit and at rest. It is the foundation behind HTTPS, secure cookies, password reset links, signed tokens, encrypted backups, database encryption, and many cloud secrets systems.',
    conceptSections: [
      { icon: 'fa-file-lines', title: 'Plaintext', desc: 'Plaintext is readable data before protection.', example: 'message=meet at 4 is plaintext.' },
      { icon: 'fa-lock', title: 'Ciphertext', desc: 'Ciphertext is encrypted data that should look unreadable without the key.', example: 'phvvdjh=phhw dw 4 could be toy ciphertext from shifting letters.' },
      { icon: 'fa-key', title: 'Symmetric encryption', desc: 'Symmetric encryption uses one shared secret key for encryption and decryption.', example: 'A backup file can be encrypted and decrypted with the same secret key.' },
      { icon: 'fa-keycdn', title: 'Public key', desc: 'A public key can be shared. Other people can use it to encrypt a message for the owner.', example: 'A browser can use public-key ideas while setting up HTTPS.' },
      { icon: 'fa-user-secret', title: 'Private key', desc: 'A private key must stay secret. It can unlock messages encrypted for its matching public key.', example: 'A server keeps its private key private.' },
      { icon: 'fa-certificate', title: 'Certificate', desc: 'A certificate helps prove a public key belongs to a real domain.', example: 'A browser checks a certificate before trusting https://example.com.' },
      { icon: 'fa-fingerprint', title: 'Hashing is different', desc: 'Hashing is one-way verification, not encryption you can decrypt.', example: 'Passwords should be stored as hashes, not encrypted passwords.' },
      { icon: 'fa-signature', title: 'Signing is different', desc: 'A digital signature proves a message came from someone with a private key and was not changed.', example: 'A package manager can verify a downloaded package signature.' },
    ],
    conceptFlow: ['Start with plaintext', 'Choose symmetric or asymmetric approach', 'Use key to encrypt', 'Send or store ciphertext', 'Use the correct key to decrypt', 'Return readable data only where allowed'],
    mermaidDiagram: `flowchart LR
  A[Plaintext] --> B[Encrypt with key]
  B --> C[Ciphertext]
  C --> D[Network or storage]
  D --> E[Decrypt with trusted key]
  E --> F[Plaintext for allowed reader]
  G[Certificate] --> H[Trust public key]
  H --> B`,
    whenToUse: [
      { icon: 'fa-lock', title: 'Data in transit', desc: 'Use HTTPS/TLS to protect data moving between client and server.' },
      { icon: 'fa-database', title: 'Data at rest', desc: 'Encrypt sensitive stored data, disks, backups, or secrets.' },
      { icon: 'fa-user-secret', title: 'Secrets', desc: 'Protect API keys, private keys, signing keys, and tokens.' },
      { icon: 'fa-fingerprint', title: 'Verification', desc: 'Use hashes and signatures to check integrity and identity.' },
    ],
    demoType: 'encryption',
    codeTitle: 'Encryption Shape Example',
    codeLanguage: 'Pseudocode',
    codeText: `// Symmetric idea: same secret key locks and unlocks
plaintext = "meet at 4"
secretKey = loadSecretKey()

ciphertext = encrypt(plaintext, secretKey)
store(ciphertext)

later = readFromStorage()
original = decrypt(later, secretKey)

// Public/private key idea:
// anyone can encrypt with the public key,
// only the private key owner can decrypt.
ciphertext = encryptForRecipient("hello", recipientPublicKey)
plaintext = decryptWithPrivateKey(ciphertext, recipientPrivateKey)`,
    pros: ['Protects private data from casual reading', 'Makes HTTPS and secure storage possible', 'Builds foundation for auth and secrets management'],
    cons: ['Key management is hard', 'Encryption does not fix bad authorization', 'Hashing, signing, and encryption are easy to confuse'],
    checklist: ['Explain plaintext vs ciphertext.', 'Describe symmetric vs asymmetric encryption.', 'Explain why certificates matter for HTTPS.'],
  },
  {
    id: 'auth-security',
    category: 'Web & Infrastructure Foundations',
    title: 'Auth and Web Security Basics',
    icon: 'fa-shield-halved',
    number: '29',
    subtitle: 'How apps know who you are, what you can access, and how they keep login data safe.',
    analogy: 'Think of an airport. Authentication is showing your passport. Authorization is your boarding pass. A session is a temporary wristband. Secrets are staff-only keys.',
    realWorldExample: {
      title: 'Logging into a learning app',
      desc: 'The app checks your password, creates a session or token, and remembers future requests are from you. A student can view lessons. An admin may also edit lessons. Same login, different permissions.',
    },
    whatIsIt: 'Authentication proves who a user is. Authorization checks what that user can do. Sessions and tokens remember login across requests. Security basics protect passwords, API keys, browser calls, and private data.',
    whyUse: 'Most real apps need accounts, permissions, private data, and API calls. Security bugs often happen when beginners mix up authentication and authorization, store passwords incorrectly, trust the browser too much, or expose secrets.',
    conceptSections: [
      { icon: 'fa-user-check', title: 'Authentication', desc: 'Authentication answers: who are you?', example: 'Login checks an email and password or an OAuth provider.' },
      { icon: 'fa-lock', title: 'Authorization', desc: 'Authorization answers: what are you allowed to do?', example: 'A student can view lessons, but only an admin can edit them.' },
      { icon: 'fa-cookie-bite', title: 'Sessions and JWTs', desc: 'Sessions and JWTs help apps remember login across requests.', example: 'A cookie can carry a session ID to the server.' },
      { icon: 'fa-key', title: 'Secrets and hashes', desc: 'Secrets stay private. Passwords should be stored as slow hashes, not plain text.', example: 'A Stripe secret key belongs on the server, not in frontend code.' },
    ],
    conceptFlow: ['User sends login', 'Server verifies password hash', 'Server creates session or token', 'Browser sends cookie or token', 'Server authenticates request', 'Server checks authorization', 'API returns allowed data'],
    mermaidDiagram: `sequenceDiagram
  participant Browser
  participant App as App Server
  participant DB as Database
  participant API as Protected API
  Browser->>App: POST /login
  App->>DB: Find user
  DB-->>App: Password hash + role
  App->>App: Verify password
  App-->>Browser: Set cookie or return JWT
  Browser->>API: Request protected data
  API->>API: Authenticate then authorize
  API-->>Browser: Allowed data or error`,
    whenToUse: [
      { icon: 'fa-user-lock', title: 'Login systems', desc: 'Use authentication when users need private accounts.' },
      { icon: 'fa-users-gear', title: 'Roles and permissions', desc: 'Use authorization when different users can do different actions.' },
      { icon: 'fa-plug', title: 'Third-party access', desc: 'Use OAuth when users grant access to another service.' },
      { icon: 'fa-server', title: 'Browser-to-API calls', desc: 'Configure CORS when frontend code calls a different origin.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Login request inspector',
    demoHint: 'Step through identity and permission checks that protect private data.',
    demoSteps: [
      { label: 'Login', detail: 'The browser sends credentials to the server over HTTPS.', result: 'The server begins authentication.' },
      { label: 'Hash check', detail: 'The server compares a password attempt with a stored hash.', result: 'The plain password is not stored.' },
      { label: 'Remember user', detail: 'The app creates a session cookie or a signed JWT.', result: 'Future requests can prove who they belong to.' },
      { label: 'Authorize', detail: 'The server checks the user role before returning protected data.', result: 'Logged in does not mean allowed to do everything.' },
    ],
    codeTitle: 'Auth Logic Example',
    codeLanguage: 'JavaScript',
    codeText: `function authenticate(email, password) {
  const user = findUserByEmail(email);
  if (!user) return null;

  const matches = verifyPasswordHash(password, user.passwordHash);
  return matches ? user : null;
}

function authorize(user, requiredRole) {
  return Boolean(user) && user.role === requiredRole;
}`,
    pros: ['Separates identity, permissions, browser rules, and secret storage', 'Connects login concepts to real request/response flows', 'Prevents common beginner security mistakes'],
    cons: ['Production auth has many edge cases', 'JWT, OAuth, cookies, and CORS are often confused', 'Real apps should use trusted security libraries'],
    checklist: ['Explain authentication vs authorization.', 'Describe why plain passwords should not be stored.', 'Explain why API secrets do not belong in frontend code.'],
  },
);
