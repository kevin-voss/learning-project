window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'database-sql-fundamentals',
    category: 'Databases',
    title: 'Databases and SQL Fundamentals',
    icon: 'fa-database',
    number: '24',
    subtitle: 'Learn why databases exist, how tables store data, and the core SQL commands every backend developer uses.',
    analogy: 'A SQL database is like a set of organized spreadsheets with rules. Each table stores one kind of thing, each row is one record, each column is one field, and relationships connect records together.',
    realWorldExample: {
      title: 'Saving lessons and progress',
      desc: 'A learning app might store users in one table, lessons in another, and completed lessons in a join table. When a user opens the dashboard, the server runs SQL queries to find lessons and completion status.',
    },
    whatIsIt: 'A relational database stores structured data in tables. SQL is the language used to read and change that data. This lesson covers the building blocks: tables, keys, relationships, and the everyday commands SELECT, INSERT, UPDATE, and DELETE.',
    whyUse: 'Most real apps need durable data that survives server restarts. SQL helps developers ask precise questions, enforce relationships, and update records safely.',
    checklist: [
      'Explain table, row, and column.',
      'Describe primary key vs foreign key.',
      'Read SELECT, INSERT, UPDATE, DELETE, JOIN, and GROUP BY examples.',
      'Explain common constraints like NOT NULL and UNIQUE.',
    ],
    subPages: [
      {
        label: 'Why Databases Exist',
        title: 'Why Databases Exist',
        whatIsIt: 'Apps need memory that lasts. Variables in a running program disappear when the server restarts. Files can work for tiny projects, but they get messy when many users need the same data at once. A database is a dedicated system for storing, finding, and protecting structured data reliably.',
        whyUse: 'Databases give you one shared source of truth. Many requests can read and write safely, relationships stay organized, and queries can filter millions of rows without loading everything into app memory.',
        conceptSections: [
          { icon: 'fa-server', title: 'Durability', desc: 'Data survives restarts and crashes.', example: 'User accounts still exist after you redeploy the server.' },
          { icon: 'fa-users', title: 'Shared access', desc: 'Many app instances can use the same data.', example: 'Two API servers can both read the same lessons table.' },
          { icon: 'fa-shield-halved', title: 'Rules', desc: 'The database can enforce structure and constraints.', example: 'An email column can be required and unique.' },
        ],
      },
      {
        label: 'Tables, Rows, Columns',
        title: 'Tables, Rows, and Columns',
        whatIsIt: 'A table is like a spreadsheet for one kind of record. A row is one record. A column is one named field that every row shares. If you have a users table, each row might be one person and columns might include id, email, and created_at.',
        conceptSections: [
          { icon: 'fa-table', title: 'Table', desc: 'Groups one type of record.', example: 'lessons, users, orders' },
          { icon: 'fa-grip-lines', title: 'Row', desc: 'One record in the table.', example: 'One user: id 1, email maya@example.com' },
          { icon: 'fa-columns', title: 'Column', desc: 'One field on every row.', example: 'email appears on every user row' },
        ],
        mermaidDiagram: `flowchart LR
  T[users table]
  T --> R1["Row 1: id=1, email=maya@example.com"]
  T --> R2["Row 2: id=2, email=leo@example.com"]
  R1 --> C1[id]
  R1 --> C2[email]
  R1 --> C3[plan]`,
      },
      {
        label: 'Data Types',
        title: 'Data Types',
        whatIsIt: 'Each column has a type that tells the database what kind of value to store. Common types include integers for whole numbers, text/varchar for strings, boolean for true/false, and timestamp for dates. Picking the right type prevents bugs and saves space.',
        conceptSections: [
          { icon: 'fa-hashtag', title: 'INTEGER', desc: 'Whole numbers like ids and counts.', example: 'user id = 42' },
          { icon: 'fa-font', title: 'TEXT / VARCHAR', desc: 'Short or long strings.', example: 'email, title, slug' },
          { icon: 'fa-toggle-on', title: 'BOOLEAN', desc: 'True or false flags.', example: 'published = true' },
          { icon: 'fa-calendar', title: 'TIMESTAMP', desc: 'Date and time values.', example: 'completed_at = 2026-06-08' },
        ],
        codeText: `CREATE TABLE lessons (
  id          INTEGER PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  published   BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT NOW()
);`,
        codeTitle: 'Column Types Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'Primary Keys',
        title: 'Primary Keys',
        whatIsIt: 'A primary key uniquely identifies one row in a table. No two rows can share the same primary key value. Most tables use an id column that auto-increments when you insert a new row.',
        whyUse: 'Primary keys give every record a stable address. Other tables can point to a specific row, and updates or deletes target exactly one record.',
        conceptSections: [
          { icon: 'fa-key', title: 'Unique', desc: 'Each value appears once in the table.', example: 'users.id = 1 can only belong to one row' },
          { icon: 'fa-fingerprint', title: 'Stable identity', desc: 'The key should not change when other fields change.', example: 'Email can change. Id usually stays the same' },
        ],
        codeText: `CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- Find one exact user
SELECT * FROM users WHERE id = 42;`,
        codeTitle: 'Primary Key Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'Foreign Keys',
        title: 'Foreign Keys',
        whatIsIt: 'A foreign key is a column that points to a primary key in another table. It says this row belongs to or references another row. For example, completions.user_id points to users.id.',
        whyUse: 'Foreign keys keep relationships honest. The database can reject a completion row if the user_id does not exist, which prevents orphan records.',
        conceptSections: [
          { icon: 'fa-link', title: 'Reference', desc: 'Stores the id of a related row.', example: 'orders.user_id → users.id' },
          { icon: 'fa-ban', title: 'Referential integrity', desc: 'Invalid references can be blocked.', example: 'Cannot insert user_id = 999 if no user 999 exists' },
        ],
        codeText: `CREATE TABLE completions (
  user_id    INTEGER NOT NULL,
  lesson_id  INTEGER NOT NULL,
  completed_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);`,
        codeTitle: 'Foreign Key Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'Relations',
        title: 'Relations',
        whatIsIt: 'Relations describe how tables connect. One user can have many completions. One lesson can appear in many completions. This many-to-many pattern often needs a join table like completions that holds pairs of foreign keys.',
        whyUse: 'Relations let you avoid copying the same data into every table. Store each user once, each lesson once, and connect them with a small join table.',
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
          { icon: 'fa-user', title: 'One-to-many', desc: 'One user has many orders.', example: 'users → orders' },
          { icon: 'fa-book', title: 'Many-to-many', desc: 'Users complete many lessons. Lessons are completed by many users.', example: 'users ↔ lessons through completions' },
        ],
      },
      {
        label: 'SELECT',
        title: 'SELECT',
        whatIsIt: 'SELECT reads data from tables. You choose columns, optionally filter with WHERE, sort with ORDER BY, and limit how many rows return. SELECT does not change data: it only asks questions.',
        demoType: 'database-sql',
        demoScenario: 'select',
        codeText: `SELECT id, title
FROM lessons
WHERE published = true
ORDER BY title;`,
        codeTitle: 'SELECT Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'INSERT',
        title: 'INSERT',
        whatIsIt: 'INSERT adds new rows. You name the columns and provide values. In real apps, validate input on the server before writing to the database.',
        demoType: 'database-sql',
        demoScenario: 'insert',
        codeText: `INSERT INTO users (id, email, plan)
VALUES (4, 'sam@example.com', 'free');`,
        codeTitle: 'INSERT Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'UPDATE',
        title: 'UPDATE',
        whatIsIt: 'UPDATE changes existing rows. Always include a WHERE clause unless you truly mean to change every row. A missing WHERE can accidentally update the whole table.',
        demoType: 'database-sql',
        demoScenario: 'update',
        codeText: `UPDATE users
SET plan = 'pro'
WHERE id = 2;`,
        codeTitle: 'UPDATE Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'DELETE',
        title: 'DELETE',
        whatIsIt: 'DELETE removes rows. Like UPDATE, use WHERE carefully. Deleting without a filter removes all rows in the table.',
        demoType: 'database-sql',
        demoScenario: 'delete',
        codeText: `DELETE FROM lessons
WHERE published = false;`,
        codeTitle: 'DELETE Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'JOIN',
        title: 'JOIN',
        whatIsIt: 'JOIN combines rows from multiple tables using key relationships. An INNER JOIN returns rows where both sides match. This is how you connect users to the lessons they completed.',
        demoType: 'database-sql',
        demoScenario: 'join',
        codeText: `SELECT users.email, lessons.title, completions.completed_at
FROM completions
JOIN users ON users.id = completions.user_id
JOIN lessons ON lessons.id = completions.lesson_id
WHERE users.id = 1;`,
        codeTitle: 'JOIN Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'GROUP BY',
        title: 'GROUP BY',
        whatIsIt: 'GROUP BY collapses many rows into summary groups. It is often paired with COUNT, SUM, AVG, MIN, or MAX. For example, count how many lessons each user completed.',
        demoType: 'database-sql',
        demoScenario: 'group',
        codeText: `SELECT users.email, COUNT(*) AS completions
FROM completions
JOIN users ON users.id = completions.user_id
GROUP BY users.email;`,
        codeTitle: 'GROUP BY Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'ORDER BY and LIMIT',
        title: 'ORDER BY and LIMIT',
        whatIsIt: 'ORDER BY sorts results, often ASC for ascending or DESC for descending. LIMIT caps how many rows come back. Together they power feeds, leaderboards, and paginated lists.',
        demoType: 'database-sql',
        demoScenario: 'orderLimit',
        codeText: `SELECT email, plan
FROM users
ORDER BY email ASC
LIMIT 2;`,
        codeTitle: 'ORDER BY and LIMIT Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'Constraints',
        title: 'Constraints: NOT NULL, UNIQUE, CHECK',
        whatIsIt: 'Constraints are rules the database enforces. NOT NULL means a value is required. UNIQUE means duplicates are not allowed. CHECK adds a custom rule, such as plan must be free or pro.',
        conceptSections: [
          { icon: 'fa-circle-exclamation', title: 'NOT NULL', desc: 'The column cannot be empty.', example: 'email NOT NULL' },
          { icon: 'fa-clone', title: 'UNIQUE', desc: 'No two rows can share this value.', example: 'UNIQUE(email)' },
          { icon: 'fa-filter', title: 'CHECK', desc: 'A boolean rule must be true.', example: "CHECK (plan IN ('free', 'pro'))" },
        ],
        codeText: `CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  plan  VARCHAR(20) NOT NULL CHECK (plan IN ('free', 'pro'))
);`,
        codeTitle: 'Constraint Example',
        codeLanguage: 'SQL',
      },
    ],
  },
  {
    id: 'database-design-scaling',
    category: 'Databases',
    title: 'Database Design and Scaling',
    icon: 'fa-database',
    number: '25',
    subtitle: 'Go beyond basic queries: indexes, transactions, schema design, and patterns that help databases stay fast as apps grow.',
    analogy: 'A growing database is like a busy library. Indexes are the card catalog, transactions are checkout rules that must finish together, and scaling patterns add more branches when one building cannot hold every book.',
    realWorldExample: {
      title: 'A learning app at scale',
      desc: 'At first one database handles everything. As traffic grows, you add indexes for slow queries, read replicas for dashboards, connection pools so servers do not open too many connections, and maybe partition old completion data by month.',
    },
    whatIsIt: 'Design and scaling topics help databases stay correct and fast under real load. Indexes speed lookups. Transactions group writes safely. Normalization reduces duplication. Replication, partitioning, and sharding spread work as data grows.',
    whyUse: 'Beginners can write SQL early, but production apps also need predictable performance, safe migrations, backups, and protection against attacks like SQL injection.',
    checklist: [
      'Explain when an index helps and what it costs.',
      'Describe what a transaction does.',
      'Compare normalization and denormalization.',
      'Name scaling tools: indexes, replicas, partitioning, sharding.',
      'Explain why parameterized queries prevent SQL injection.',
    ],
    subPages: [
      {
        label: 'Indexes',
        title: 'Indexes',
        whatIsIt: 'An index is a helper structure that speeds up lookups, filters, and joins on specific columns. Without an index, the database may scan every row. With an index, it can jump closer to matching rows.',
        whyUse: 'Indexes make common queries faster, but they cost extra storage and slow down writes because the index must be updated too.',
        demoType: 'database-sql',
        demoScenario: 'indexScan',
        codeText: `CREATE INDEX idx_completions_user_id
ON completions(user_id);

SELECT * FROM completions WHERE user_id = 1;`,
        codeTitle: 'Index Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'EXPLAIN',
        title: 'Query Plans and EXPLAIN',
        whatIsIt: 'EXPLAIN shows how the database plans to run a query. It reveals whether the database will use an index lookup or scan the whole table. This is a beginner-friendly way to debug slow SQL.',
        demoType: 'database-sql',
        demoScenario: 'explain',
        codeText: `EXPLAIN SELECT *
FROM completions
WHERE user_id = 1;`,
        codeTitle: 'EXPLAIN Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'Transactions',
        title: 'Transactions',
        whatIsIt: 'A transaction groups multiple operations into one all-or-nothing unit. If any step fails, the database rolls back the whole transaction so you do not end up with half-finished work.',
        whyUse: 'Use transactions when several writes must succeed together, such as creating an order and its line items.',
        demoType: 'database-sql',
        demoScenario: 'transaction',
        codeText: `BEGIN;

INSERT INTO orders (id, user_id) VALUES (100, 1);
INSERT INTO order_items (order_id, lesson_id) VALUES (100, 10);

COMMIT;`,
        codeTitle: 'Transaction Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'Isolation',
        title: 'Isolation Basics',
        whatIsIt: 'Isolation controls how much one transaction sees of another transaction’s unfinished work. Higher isolation is safer but can reduce concurrency. Beginners should know the idea: concurrent requests can step on each other without rules.',
        conceptSections: [
          { icon: 'fa-eye-slash', title: 'Dirty read', desc: 'Reading data another transaction has not committed yet.', example: 'You see a balance that gets rolled back' },
          { icon: 'fa-repeat', title: 'Non-repeatable read', desc: 'Same query returns different rows after another transaction commits.', example: 'Report total changes mid-read' },
          { icon: 'fa-ghost', title: 'Phantom read', desc: 'New rows appear that match a prior filter.', example: 'COUNT(*) changes during a transaction' },
          { icon: 'fa-lock', title: 'Locks', desc: 'Databases use locks to reduce conflicts.', example: 'One write waits while another finishes' },
          { icon: 'fa-layer-group', title: 'Isolation levels', desc: 'READ COMMITTED, REPEATABLE READ, SERIALIZABLE trade safety for speed.', example: 'Postgres default is READ COMMITTED' },
        ],
        checklist: ['Name dirty read in plain language.', 'Explain why higher isolation can slow writes.', 'Match one anomaly to a real bug scenario.'],
      },
      {
        label: 'Deadlocks',
        title: 'Deadlocks',
        whatIsIt: 'A deadlock happens when two transactions each wait for a lock the other holds. The database detects this cycle and aborts one transaction so the system can move forward.',
        whyUse: 'Deadlocks are normal in busy systems. Apps should retry failed transactions instead of assuming every write succeeds on the first try.',
        conceptSections: [
          { icon: 'fa-arrows-spin', title: 'Cycle', desc: 'A waits for B, B waits for A: nobody progresses.', example: 'Transfer between two accounts in opposite order' },
          { icon: 'fa-rotate', title: 'Retry', desc: 'Apps catch deadlock errors and retry with backoff.', example: 'Exponential backoff on deadlock error codes' },
          { icon: 'fa-list-ol', title: 'Lock ordering', desc: 'Always lock rows in the same order to prevent cycles.', example: 'Lock smaller account ID first' },
        ],
        conceptFlow: ['Transaction A locks row 1', 'Transaction B locks row 2', 'A waits for row 2', 'B waits for row 1', 'Database aborts one transaction', 'App retries safely'],
        checklist: ['Draw a two-transaction deadlock.', 'Explain why retry is safe after abort.', 'Describe consistent lock ordering.'],
      },
      {
        label: 'Migrations',
        title: 'Migrations',
        whatIsIt: 'A migration is a versioned change to database schema or data. Instead of editing tables by hand in production, teams store changes in files and run them in order.',
        whyUse: 'Migrations make schema changes repeatable across local, staging, and production environments.',
        codeText: `-- migration 003_add_plan_to_users.sql
ALTER TABLE users
ADD COLUMN plan VARCHAR(20) NOT NULL DEFAULT 'free';`,
        codeTitle: 'Migration Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'Normalization',
        title: 'Normalization',
        whatIsIt: 'Normalization organizes tables to reduce duplicated data. Instead of copying a user’s email onto every order row, store the email once in users and reference users.id from orders.',
        whyUse: 'Normalized schemas are easier to update correctly. Change an email in one place instead of many.',
        whenToUse: [
          { icon: 'fa-table', title: 'OLTP apps', desc: 'Apps with lots of small reads and writes often start normalized.', example: 'Accounts, orders, lessons' },
        ],
      },
      {
        label: 'Denormalization',
        title: 'Denormalization',
        whatIsIt: 'Denormalization intentionally duplicates data to make reads faster or simpler. For example, store a lesson_count on a user profile so the dashboard does not need a COUNT query every time.',
        whyUse: 'Use denormalization when measured read pain is worth the extra update work and risk of stale copied data.',
        pros: ['Faster reads for hot paths', 'Simpler query shapes for dashboards'],
        cons: ['Copied data can become stale', 'Writes must update multiple places'],
      },
      {
        label: 'Connection Pools',
        title: 'Connection Pools',
        whatIsIt: 'Opening a database connection is expensive. A connection pool keeps a set of ready connections that app workers borrow and return. This prevents every request from creating a brand-new connection.',
        whyUse: 'Pools protect the database from too many simultaneous connections and make API response times more stable.',
        conceptFlow: ['App starts pool', 'Request borrows connection', 'Request runs SQL', 'Connection returns to pool', 'Next request reuses it'],
      },
      {
        label: 'Backups',
        title: 'Backups and Restore',
        whatIsIt: 'Backups copy database data so you can recover from mistakes, bad migrations, or hardware failure. Restoring means bringing a backup back into service, often to a specific point in time.',
        whyUse: 'If production data matters, backups are not optional. Test restores too: an untested backup is only hope, not a plan.',
        whenToUse: [
          { icon: 'fa-clock-rotate-left', title: 'Daily backups', desc: 'Automated snapshots for disaster recovery.' },
          { icon: 'fa-vial', title: 'Before migrations', desc: 'Extra safety before risky schema changes.' },
        ],
      },
      {
        label: 'Partitioning',
        title: 'Partitioning',
        whatIsIt: 'Partitioning splits one large table into smaller pieces, often by date, tenant, or region. Queries that filter on the partition key can skip irrelevant pieces.',
        demoType: 'database-sql',
        demoScenario: 'partition',
        codeText: `-- Idea only; syntax varies by database
PARTITION completions BY RANGE (completed_at)
  2026_06 -> June rows
  2026_07 -> July rows;`,
        codeTitle: 'Partitioning Example',
        codeLanguage: 'SQL',
      },
      {
        label: 'Replication',
        title: 'Replication and Read Replicas',
        whatIsIt: 'Replication copies data from a primary database to one or more replicas. A read replica can serve dashboard or report queries so heavy reads do not overload the primary writer.',
        whyUse: 'Replication improves read capacity and can help with failover, though failover behavior depends on your setup.',
        conceptFlow: ['Primary accepts writes', 'Changes stream to replicas', 'Replicas serve read queries', 'Primary stays focused on writes'],
      },
      {
        label: 'Sharding',
        title: 'Sharding',
        whatIsIt: 'Sharding splits data across multiple database servers. Each shard holds a slice of the data, often by user id range or hash. It is a big step taken when one database cannot store or serve everything.',
        whyUse: 'Sharding adds capacity, but it also adds routing complexity, cross-shard query pain, and operational overhead.',
        pros: ['Horizontal scale beyond one machine', 'Can isolate very large tenants'],
        cons: ['Harder queries across shards', 'More operations work', 'Should not be the first scaling lever'],
      },
      {
        label: 'SQL Injection',
        title: 'SQL Injection and Parameterized Queries',
        whatIsIt: 'SQL injection happens when user input is stitched directly into SQL strings. Attackers can change the query shape. Parameterized queries send values separately from the SQL template so input cannot become commands.',
        whyUse: 'Never build SQL by concatenating raw user input. Use parameters provided by your database driver or ORM.',
        demoType: 'database-sql',
        demoScenario: 'injectionUnsafe',
        codeText: `// Safe pattern
const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);`,
        codeTitle: 'Parameterized Query Example',
        codeLanguage: 'JavaScript',
      },
    ],
  },
);
