window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.databaseSql = function (container) {
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
      note: 'SELECT reads rows. WHERE filters rows. ORDER BY sorts the result.',
    },
    insert: {
      label: 'INSERT',
      title: 'Add a new user row',
      sql: `INSERT INTO users (id, email, plan)
VALUES (4, 'sam@example.com', 'free');`,
      result: () => [...users, { id: 4, email: 'sam@example.com', plan: 'free' }],
      note: 'INSERT creates a row. In real apps, validate input before writing.',
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
      note: 'GROUP BY combines rows into summary groups, often with COUNT, SUM, AVG, MIN, or MAX.',
    },
    index: {
      label: 'INDEX',
      title: 'Speed up a common lookup',
      sql: `CREATE INDEX idx_completions_user_id
ON completions(user_id);`,
      result: () => [
        { structure: 'idx_completions_user_id', helps: 'WHERE user_id = ?', tradeoff: 'Faster reads, slower writes' },
        { structure: 'table scan', helps: 'Tiny tables or rare queries', tradeoff: 'Can be slow on large tables' },
      ],
      note: 'An index is like a sorted lookup helper. It speeds reads but costs storage and write work.',
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
      note: 'Partitioning keeps large datasets manageable and can skip irrelevant partitions.',
    },
  };

  let selected = 'select';

  const renderTable = (rows) => {
    if (!rows.length) return UI.emptyStage('fa-database', 'No rows', 'This query returned no rows.');
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
        <div class="sql-result">${renderTable(example.result())}</div>
      </div>`;
  };

  const inspectorRows = () => {
    const example = examples[selected];
    return [
      ['Example', example.title, 'The selected SQL idea'],
      ['Rows returned', String(example.result().length), 'How many rows the example returns'],
      ['Lesson', example.note, 'What to notice in this query'],
    ];
  };

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'SQL example runner',
      hint: 'Choose a query idea. The demo shows the SQL text and a small pretend result table so beginners can connect syntax to output.',
      stage: renderStage(),
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
    selected = key;
    render();
  };

  render();
};
