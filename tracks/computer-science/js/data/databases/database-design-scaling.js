window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'database-design-scaling',
    category: 'More: Databases',
    title: 'Database Design and Scaling',
    icon: 'fa-database',
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
