window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.databaseSql = function (container, initialExample) {
  const UI = DS.demoUI;
  const users = [
    { id: 1, email: 'maya@example.com', plan: 'pro' },
    { id: 2, email: 'leo@example.com', plan: 'free' },
    { id: 3, email: 'nora@example.com', plan: 'pro' },
  ];
  const lessons = [
    { id: 10, title: 'Client and Server', published: true },
    { id: 11, title: 'SQL Basics', published: true },
    { id: 12, title: 'Draft Security Lesson', published: false },
  ];
  const completions = [
    { user_id: 1, lesson_id: 10, completed_at: '2026-06-08' },
    { user_id: 1, lesson_id: 11, completed_at: '2026-06-09' },
    { user_id: 3, lesson_id: 10, completed_at: '2026-06-10' },
  ];

  const examples = {
    select: {
      label: 'SELECT',
      title: 'Read published lessons',
      sql: `SELECT id, title
FROM lessons
WHERE published = true
ORDER BY title;`,
      result: () => lessons
        .filter(lesson => lesson.published)
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(({ id, title }) => ({ id, title })),
      dbAction: 'Read rows from lessons, kept only published = true, sorted by title.',
      note: 'SELECT reads data. WHERE filters rows. ORDER BY sorts the result.',
    },
    insert: {
      label: 'INSERT',
      title: 'Add a new user row',
      sql: `INSERT INTO users (id, email, plan)
VALUES (4, 'sam@example.com', 'free');`,
      result: () => [...users, { id: 4, email: 'sam@example.com', plan: 'free' }],
      dbAction: 'Inserted one new row into the users table with id 4.',
      note: 'INSERT creates a row. Real apps validate input before writing.',
    },
    update: {
      label: 'UPDATE',
      title: 'Upgrade a user plan',
      sql: `UPDATE users
SET plan = 'pro'
WHERE id = 2;`,
      result: () => users.map(user => (
        user.id === 2 ? { ...user, plan: 'pro' } : user
      )),
      dbAction: 'Found rows where id = 2 and changed plan to pro.',
      note: 'UPDATE changes existing rows. Always use WHERE unless you mean every row.',
    },
    delete: {
      label: 'DELETE',
      title: 'Remove unpublished lessons',
      sql: `DELETE FROM lessons
WHERE published = false;`,
      result: () => lessons.filter(lesson => lesson.published),
      dbAction: 'Removed rows from lessons where published = false.',
      note: 'DELETE removes rows. A missing WHERE deletes the whole table.',
    },
    join: {
      label: 'JOIN',
      title: 'Connect users to completed lessons',
      sql: `SELECT users.email, lessons.title, completions.completed_at
FROM completions
JOIN users ON users.id = completions.user_id
JOIN lessons ON lessons.id = completions.lesson_id
WHERE users.id = 1;`,
      result: () => completions
        .filter(row => row.user_id === 1)
        .map(row => ({
          email: users.find(user => user.id === row.user_id).email,
          title: lessons.find(lesson => lesson.id === row.lesson_id).title,
          completed_at: row.completed_at,
        })),
      dbAction: 'Matched completions to users and lessons using foreign keys, then filtered to user 1.',
      note: 'JOIN follows primary key and foreign key relationships across tables.',
    },
    group: {
      label: 'GROUP BY',
      title: 'Count completions per user',
      sql: `SELECT users.email, COUNT(*) AS completions
FROM completions
JOIN users ON users.id = completions.user_id
GROUP BY users.email;`,
      result: () => users
        .map(user => ({
          email: user.email,
          completions: completions.filter(row => row.user_id === user.id).length,
        }))
        .filter(row => row.completions > 0),
      dbAction: 'Joined completions to users, grouped by email, and counted rows in each group.',
      note: 'GROUP BY creates summary groups, often with COUNT, SUM, AVG, MIN, or MAX.',
    },
    orderLimit: {
      label: 'ORDER + LIMIT',
      title: 'First two users alphabetically',
      sql: `SELECT email, plan
FROM users
ORDER BY email ASC
LIMIT 2;`,
      result: () => [...users]
        .sort((a, b) => a.email.localeCompare(b.email))
        .slice(0, 2)
        .map(({ email, plan }) => ({ email, plan })),
      dbAction: 'Sorted users by email ascending and returned only the first two rows.',
      note: 'ORDER BY sorts results. LIMIT caps how many rows come back.',
    },
    indexScan: {
      label: 'Table scan',
      title: 'Lookup without an index',
      sql: `SELECT *
FROM completions
WHERE user_id = 1;`,
      result: () => [
        { step: '1', action: 'Seq Scan on completions', detail: 'Read every row in the table' },
        { step: '2', action: 'Filter user_id = 1', detail: 'Checked each row one by one' },
        { step: '3', action: 'Rows found', detail: '2 matching rows' },
      ],
      dbAction: 'No index on user_id, so the database scanned every completion row.',
      note: 'On small tables this is fine. On large tables, a full scan gets slow.',
    },
    indexLookup: {
      label: 'Index lookup',
      title: 'Same query with an index',
      sql: `CREATE INDEX idx_completions_user_id
ON completions(user_id);

SELECT *
FROM completions
WHERE user_id = 1;`,
      result: () => [
        { step: '1', action: 'Index Scan on idx_completions_user_id', detail: 'Jumped to matching user_id entries' },
        { step: '2', action: 'Rows found', detail: '2 matching rows' },
        { step: '3', action: 'Tradeoff', detail: 'Faster reads, slightly slower writes' },
      ],
      dbAction: 'Used the index on user_id to find matching rows without reading the whole table.',
      note: 'Indexes speed common lookups but cost storage and write work.',
    },
    explain: {
      label: 'EXPLAIN',
      title: 'See the query plan',
      sql: `EXPLAIN SELECT *
FROM completions
WHERE user_id = 1;`,
      result: () => [
        { plan_step: 'Index Scan', relation: 'completions', detail: 'Using idx_completions_user_id' },
        { plan_step: 'Filter', relation: 'completions', detail: 'user_id = 1' },
        { plan_step: 'Rows estimate', relation: 'completions', detail: '2 rows' },
      ],
      dbAction: 'Did not return user data. Instead it showed the planned steps the database would run.',
      note: 'EXPLAIN is a beginner-friendly way to see index lookup vs table scan.',
    },
    transaction: {
      label: 'TRANSACTION',
      title: 'All-or-nothing writes',
      sql: `BEGIN;

INSERT INTO orders (id, user_id) VALUES (100, 1);
INSERT INTO order_items (order_id, lesson_id) VALUES (100, 10);

COMMIT;`,
      result: () => [
        { step: 'BEGIN', status: 'started', detail: 'Transaction opened' },
        { step: 'INSERT orders', status: 'ok', detail: 'Order 100 created' },
        { step: 'INSERT order_items', status: 'ok', detail: 'Line item added' },
        { step: 'COMMIT', status: 'committed', detail: 'Both writes saved together' },
      ],
      dbAction: 'Grouped two inserts into one transaction. If the second insert failed, both would roll back.',
      note: 'Transactions keep related writes consistent.',
    },
    partition: {
      label: 'PARTITION',
      title: 'Split large tables by time',
      sql: `-- Example idea, syntax differs by database
PARTITION completions BY RANGE (completed_at)
  2026_06 -> June rows
  2026_07 -> July rows;`,
      result: () => [
        { partition: 'completions_2026_06', rows: 3, use: 'Current lesson completions' },
        { partition: 'completions_2026_07', rows: 0, use: 'Future lesson completions' },
      ],
      dbAction: 'Stored rows in separate partitions so June queries can skip July data.',
      note: 'Partitioning keeps large datasets manageable.',
    },
    injectionUnsafe: {
      label: 'Unsafe SQL',
      title: 'String concatenation is dangerous',
      sql: `const email = "' OR 1=1 --";
const query =
  "SELECT * FROM users WHERE email = '" + email + "'";

// Becomes:
SELECT * FROM users WHERE email = '' OR 1=1 --'`,
      result: () => users.map(({ id, email, plan }) => ({ id, email, plan })),
      dbAction: 'The injected OR 1=1 made the WHERE clause always true, so every user row was returned.',
      note: 'Never build SQL by gluing user input into strings.',
      isCode: true,
    },
    injectionSafe: {
      label: 'Parameterized',
      title: 'Safe parameterized query',
      sql: `const email = "' OR 1=1 --";

const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);

// Database treats input as data, not SQL commands.`,
      result: () => [],
      dbAction: 'The database compared the full email string literally. No rows matched, so nothing leaked.',
      note: 'Parameters send values separately from the SQL template.',
      isCode: true,
    },
  };

  const defaultKey = initialExample && examples[initialExample] ? initialExample : 'select';
  let selected = defaultKey;

  const renderTable = (rows, example) => {
    if (!rows.length) {
      const emptyMsg = example.isCode ? 'No rows returned: that is the safe outcome.' : 'This query returned no rows.';
      return UI.emptyStage('fa-database', 'No rows', emptyMsg);
    }
    const columns = Object.keys(rows[0]);
    return `
      <table class="sql-result-table">
        <thead>
          <tr>${columns.map(column => `<th>${UI.esc(column)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map(row => `
            <tr>${columns.map(column => `<td>${UI.esc(row[column])}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>`;
  };

  const renderStage = () => {
    const example = examples[selected];
    return `
      <div class="sql-demo">
        <pre class="sql-query">${UI.esc(example.sql)}</pre>
        <div class="sql-db-action">
          <strong>What the database did:</strong>
          <span>${UI.esc(example.dbAction)}</span>
        </div>
        <div class="sql-result">${renderTable(example.result(), example)}</div>
      </div>`;
  };

  const inspectorRows = () => {
    const example = examples[selected];
    return [
      ['Example', example.title, 'The selected SQL idea'],
      ['Rows returned', String(example.result().length), 'How many rows the pretend result has'],
      ['Database action', example.dbAction, 'Plain-language explanation'],
      ['Lesson', example.note, 'What to notice in this query'],
    ];
  };

  const runPlayground = (raw) => {
    const q = raw.trim().toLowerCase();
    if (q.startsWith('select * from users')) return users;
    if (q.startsWith('select * from lessons')) return lessons;
    if (q.startsWith('select * from completions')) return completions;
    if (q.startsWith('select name from users')) return users.map(u => ({ name: u.name }));
    return null;
  };

  const render = () => {
    UI.mount(container, {
      title: 'SQL example runner',
      hint: 'Choose a preset query or type a simple SELECT in the playground (users, lessons, completions tables).',
      stage: `${renderStage()}
        <div class="sql-playground">
          <label>Playground: <input type="text" class="demo-input wide" id="sqlPgIn" placeholder="SELECT * FROM users" aria-label="SQL playground query"
            onkeydown="if(event.key==='Enter')sqlPlaygroundRun()"></label>
          <button type="button" class="demo-btn success" onclick="sqlPlaygroundRun()">Run SELECT</button>
          <div id="sqlPgOut" class="playground-output" aria-live="polite"></div>
        </div>`,
      inspector: UI.inspector('SQL details', inspectorRows()),
      stats: [
        UI.statChip('Tables', 3),
        UI.statChip('Users', users.length),
        UI.statChip('Lessons', lessons.length),
        UI.statChip('Completions', completions.length),
      ].join(''),
      controls: Object.entries(examples).map(([key, example]) => `
        <button class="demo-btn ${key === selected ? 'success' : ''}" onclick="sqlExample('${key}')">
          ${example.label}
        </button>
      `).join(''),
      msgId: 'sqlMsg',
    });
    DS.showMsg('sqlMsg', examples[selected].note, 'info');
  };

  window.sqlExample = (key) => {
    if (!examples[key]) return;
    selected = key;
    render();
  };

  window.sqlPlaygroundRun = () => {
    const q = document.getElementById('sqlPgIn')?.value || '';
    const rows = runPlayground(q);
    const out = document.getElementById('sqlPgOut');
    if (!out) return;
    if (!rows) {
      out.textContent = 'Try: SELECT * FROM users | lessons | completions';
      return;
    }
    out.textContent = JSON.stringify(rows, null, 2);
  };

  render();
};
