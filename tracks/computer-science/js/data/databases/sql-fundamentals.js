window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

// Databases and SQL. Sub-lessons 1-6 are the basics (table, SELECT, WHERE, INSERT, UPDATE, DELETE).
// "Deeper: ..." sub-lessons (keys, JOIN, GROUP BY, constraints) come at the end.
DS.curriculum.push({
  id: 'database-sql-fundamentals',
  category: 'Data and Servers',
  title: 'Databases and SQL',
  icon: 'fa-database',
  subtitle: 'Tables that remember, and a short language to ask them questions.',
  demoType: 'database-sql',
  keywords: ['table', 'row', 'column', 'sql', 'primary key', 'foreign key'],
  relatedIds: ['database-design-scaling', 'docker-containers', 'nosql-basics'],
  subPages: [
    {
      id: 'tables',
      label: 'The picture',
      title: 'A cupboard of tables',
      analogy: 'Think of a class list on paper. Every row is one child. Every column is one fact: name, age, class. A database is a cupboard full of such lists, one list for each kind of thing: one for users, one for lessons. And it does not forget when the computer restarts.',
      whatIsIt: 'A database keeps data safe for a long time. A relational database keeps it in tables. A table holds one kind of thing. A row is one record. A column is one fact that every row has. SQL is the language you use to ask the database for rows and to change them.',
      demoScenario: 'select',
      demoTitle: 'A small database',
      demoHint: 'Look at the tables: users and lessons. Run the example queries and watch the result.',
      codeTitle: 'The users table',
      codeLanguage: 'Text',
      codeText: `users
+----+------------------+------+
| id | email            | plan |   <- columns
+----+------------------+------+
|  1 | maya@example.com | pro  |   <- one row
|  2 | leo@example.com  | free |
|  3 | nora@example.com | pro  |
+----+------------------+------+`,
      checklist: [
        'You can explain table, row and column with the class list picture.',
        'You can read and write SELECT, INSERT, UPDATE and DELETE with WHERE.',
        'You always use WHERE with UPDATE and DELETE, and you know why.',
      ],
      check: [
        { q: 'In the users table, what is one row?', a: 'One user, for example id 1 with maya@example.com and plan pro.' },
        { q: 'Why not keep data in Java variables only?', a: 'Variables are gone when the program stops. A database keeps the data.' },
      ],
    },
    {
      id: 'select',
      label: 'SELECT',
      title: 'SELECT: ask for rows',
      whatIsIt: 'SELECT reads data. You say which columns you want and FROM which table. * means all columns. SELECT never changes anything. It only asks.',
      demoScenario: 'select',
      codeTitle: 'Read from a table',
      codeLanguage: 'SQL',
      codeText: `SELECT email, plan
FROM users;

SELECT * FROM lessons;   -- every column`,
      check: [
        { q: 'Which word picks the table in a SELECT?', a: 'FROM.' },
        { q: 'Can SELECT delete rows?', a: 'No. SELECT only reads.' },
      ],
    },
    {
      id: 'where',
      label: 'WHERE',
      title: 'WHERE: only the rows you mean',
      whatIsIt: 'WHERE keeps only the rows that match a rule. Text goes in single quotes. You can join rules with AND and OR, like in Java with && and ||.',
      demoScenario: 'select',
      codeTitle: 'Filter rows',
      codeLanguage: 'SQL',
      codeText: `SELECT email FROM users
WHERE plan = 'pro';                 -- maya, nora

SELECT title FROM lessons
WHERE published = true AND id > 10;`,
      tryIt: {
        steps: [
          'Look at the users table at the top of this lesson.',
          'Write down which emails the first query returns.',
        ],
        result: 'maya@example.com and nora@example.com.',
      },
      check: [
        { q: 'Write a query for the user with id 2.', a: 'SELECT * FROM users WHERE id = 2;' },
      ],
    },
    {
      id: 'insert',
      label: 'INSERT',
      title: 'INSERT: add a row',
      whatIsIt: 'INSERT INTO adds a new row. You name the columns, then give the VALUES in the same order.',
      demoScenario: 'insert',
      codeTitle: 'Add a user',
      codeLanguage: 'SQL',
      codeText: `INSERT INTO users (id, email, plan)
VALUES (4, 'sam@example.com', 'free');`,
      check: [
        { q: 'How many rows does users have after this INSERT?', a: 'Four. There were three, and one was added.' },
      ],
    },
    {
      id: 'update',
      label: 'UPDATE',
      title: 'UPDATE: change rows',
      whatIsIt: 'UPDATE changes rows that already exist. SET says the new value. WHERE says which rows. Forget WHERE, and every row changes.',
      demoScenario: 'update',
      codeTitle: 'Upgrade one user',
      codeLanguage: 'SQL',
      codeText: `UPDATE users
SET plan = 'pro'
WHERE id = 2;`,
      check: [
        { q: 'What happens with UPDATE users SET plan = \'pro\'; (no WHERE)?', a: 'Every user becomes pro.' },
      ],
    },
    {
      id: 'delete',
      label: 'DELETE',
      title: 'DELETE: remove rows',
      whatIsIt: 'DELETE FROM removes rows. Like UPDATE, always add WHERE. Safe habit: first run a SELECT with the same WHERE and look at what would be deleted.',
      demoScenario: 'delete',
      codeTitle: 'Remove drafts',
      codeLanguage: 'SQL',
      codeText: `SELECT * FROM lessons WHERE published = false;  -- look first
DELETE FROM lessons WHERE published = false;    -- then delete`,
      check: [
        { q: 'Why run a SELECT before a DELETE?', a: 'To see exactly which rows the WHERE matches, before they are gone.' },
      ],
    },
    {
      id: 'deeper-keys',
      label: 'Deeper: keys',
      title: 'Deeper: primary keys and foreign keys',
      demoType: null,
      whatIsIt: 'A primary key is a column whose value is unique for every row, like id. It is the row\'s address. A foreign key is a column that holds the primary key of a row in another table. completions.user_id points to users.id. The database can refuse a user_id that does not exist.',
      conceptSections: [
        { icon: 'fa-key', title: 'Primary key', desc: 'Unique id of a row.', example: 'users.id' },
        { icon: 'fa-link', title: 'Foreign key', desc: 'Points to a row in another table.', example: 'completions.user_id -> users.id' },
      ],
      codeTitle: 'Keys in CREATE TABLE',
      codeLanguage: 'SQL',
      codeText: `CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE completions (
  user_id   INTEGER NOT NULL REFERENCES users(id),
  lesson_id INTEGER NOT NULL REFERENCES lessons(id)
);`,
      checklist: ['Describe primary key vs foreign key.'],
    },
    {
      id: 'deeper-join',
      label: 'Deeper: JOIN',
      title: 'Deeper: JOIN tables together',
      whatIsIt: 'JOIN puts rows from two tables side by side when their keys match. This is how you answer "which lessons did Maya finish?": completions holds the ids, users and lessons hold the names.',
      demoScenario: 'join',
      codeTitle: 'Which lessons did user 1 finish?',
      codeLanguage: 'SQL',
      codeText: `SELECT users.email, lessons.title
FROM completions
JOIN users   ON users.id   = completions.user_id
JOIN lessons ON lessons.id = completions.lesson_id
WHERE users.id = 1;`,
      checklist: ['Read a JOIN and say which keys connect the tables.'],
    },
    {
      id: 'deeper-group-by',
      label: 'Deeper: GROUP BY',
      title: 'Deeper: GROUP BY, ORDER BY and LIMIT',
      whatIsIt: 'GROUP BY puts rows into groups and gives one result row per group, often with COUNT, SUM or AVG. ORDER BY sorts the result. LIMIT keeps only the first few rows.',
      demoScenario: 'group',
      codeTitle: 'Count and sort',
      codeLanguage: 'SQL',
      codeText: `SELECT user_id, COUNT(*) AS finished
FROM completions
GROUP BY user_id;

SELECT email FROM users
ORDER BY email ASC
LIMIT 2;`,
      checklist: ['Read a GROUP BY with COUNT.', 'Sort and limit a result.'],
    },
    {
      id: 'deeper-constraints',
      label: 'Deeper: constraints',
      title: 'Deeper: types and constraints',
      demoType: null,
      whatIsIt: 'Every column has a type: INTEGER, VARCHAR (text), BOOLEAN, TIMESTAMP. Constraints are rules the database checks for you. NOT NULL: a value is required. UNIQUE: no two rows may have the same value. CHECK: a custom rule.',
      conceptSections: [
        { icon: 'fa-circle-exclamation', title: 'NOT NULL', desc: 'The column may not be empty.', example: 'email NOT NULL' },
        { icon: 'fa-clone', title: 'UNIQUE', desc: 'No duplicates.', example: 'email UNIQUE' },
        { icon: 'fa-filter', title: 'CHECK', desc: 'A rule that must be true.', example: "CHECK (plan IN ('free', 'pro'))" },
      ],
      codeTitle: 'A table with rules',
      codeLanguage: 'SQL',
      codeText: `CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  plan  VARCHAR(20)  NOT NULL CHECK (plan IN ('free', 'pro'))
);`,
      checklist: ['Explain NOT NULL and UNIQUE.'],
    },
  ],
});
