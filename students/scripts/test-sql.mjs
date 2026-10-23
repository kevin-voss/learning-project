// Runs the tests of one student SQL task against the student's own answer.
//
//   make test-sql TASK=01_1              run my-solution/answer.sql
//   make test-sql TASK=01_1 SOLUTION=1   run solution/answer.sql
//   node students/scripts/test-sql.mjs 01_1 [--student kevin] [--subject sql] [--solution]
//
// The task folder holds `setup.sql` (creates and fills the tables, same schema for
// every task of the exercise) and `tests.json`:
//
// {
//   "task": "01_1",
//   "setup": "setup.sql",
//   "expect": ["1|ana|Berlin", "2|ben|Oslo"]
// }
//
// The runner pipes setup + answer into `sqlite3 -batch :memory:` and compares the
// printed lines with `expect`, exactly (trailing spaces and a trailing empty line
// are ignored). SQL answers are black-box by nature: the result IS the output, so
// a task has ONE expected output block, not one test per idea — the numbered
// questions in the task README say which query prints which block.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

function parseArgs(argv) {
  const opts = { task: '', student: '', subject: '', solution: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--solution') opts.solution = true;
    else if (['--student', '--subject'].includes(arg)) opts[arg.slice(2)] = argv[++i] || '';
    else if (!opts.task) opts.task = arg;
  }
  return opts;
}

function fail(message, code = 2) {
  console.error(message);
  process.exit(code);
}

function allTasks() {
  const found = [];
  const studentsDir = join(repo, 'students');
  for (const student of readdirSync(studentsDir)) {
    const subjects = join(studentsDir, student);
    if (student.startsWith('_') || !statSync(subjects).isDirectory()) continue;
    for (const subject of readdirSync(subjects)) {
      const exercises = join(subjects, subject, 'exercises');
      if (!existsSync(exercises)) continue;
      for (const exercise of readdirSync(exercises)) {
        const exerciseDir = join(exercises, exercise);
        if (!statSync(exerciseDir).isDirectory()) continue;
        for (const task of readdirSync(exerciseDir)) {
          if (task.startsWith('task-')) found.push({ student, subject, dir: join(exerciseDir, task) });
        }
      }
    }
  }
  return found;
}

const opts = parseArgs(process.argv.slice(2));
if (!opts.task) fail('Which task? Example: make test-sql TASK=01_1 STUDENT=kevin SUBJECT=sql');

const id = opts.task.replace(/[_.]/g, '-');
let matches = allTasks().filter((t) => t.dir.split('/').pop().startsWith(`task-${id}-`));
if (opts.student) matches = matches.filter((t) => t.student === opts.student);
if (opts.subject) matches = matches.filter((t) => t.subject === opts.subject);
if (matches.length === 0) fail(`No SQL task ${opts.task} found (is it a SQL task? Java tasks: make test-task).`);
if (matches.length > 1) {
  fail(`Task ${opts.task} exists for ${matches.map((t) => `${t.student}/${t.subject}`).join(', ')}. Add STUDENT=<name> and SUBJECT=<subject>.`);
}
const taskDir = matches[0].dir;

const testsFile = join(taskDir, 'tests.json');
if (!existsSync(testsFile)) fail(`No tests.json in ${taskDir}`);
const spec = JSON.parse(readFileSync(testsFile, 'utf8'));
if (spec.kind !== 'sql' || !spec.setup || !Array.isArray(spec.expect)) {
  fail(`${testsFile} is not a SQL task spec (needs "kind": "sql", "setup", "expect")`);
}

const which = opts.solution ? 'solution' : 'my-solution';
const answerFile = join(taskDir, which, 'answer.sql');
if (!existsSync(answerFile)) {
  fail(opts.solution
    ? `No solution/answer.sql in ${taskDir}`
    : `No answer.sql in ${taskDir}/${which}. Create it there: ${join(which, 'answer.sql')}`);
}

const setup = readFileSync(join(taskDir, spec.setup), 'utf8');
const answer = readFileSync(answerFile, 'utf8');
const run = spawnSync('sqlite3', ['-batch', ':memory:'], { input: `${setup}\n${answer}\n`, encoding: 'utf8', timeout: 10000 });
if (run.error) fail(`Could not run sqlite3: ${run.error.message}`);

const norm = (s) => s.replace(/[ \t]+$/gm, '').replace(/\n+$/, '');
const got = norm(run.stdout).split('\n').filter((l) => l !== '');
const want = spec.expect.map((l) => String(l).replace(/[ \t]+$/, ''));

const wrong = [];
const len = Math.max(got.length, want.length);
for (let i = 0; i < len; i += 1) {
  if (got[i] !== want[i]) wrong.push({ line: i + 1, want: want[i] ?? '(nothing)', got: got[i] ?? '(nothing)' });
}

if (run.status !== 0 && run.stderr.trim()) {
  console.error(`sqlite3 said:\n${run.stderr.trim().split('\n').map((l) => '  ' + l).join('\n')}`);
}
if (wrong.length === 0 && run.stderr.trim() === '') {
  console.log(`${want.length} lines match. All green.`);
} else {
  console.error(`✗ ${wrong.length} wrong line${wrong.length === 1 ? '' : 's'} (of ${want.length} expected):`);
  for (const w of wrong.slice(0, 12)) {
    console.error(`  line ${w.line}`);
    console.error(`    want: ${w.want}`);
    console.error(`    got:  ${w.got}`);
  }
  if (wrong.length > 12) console.error(`  … and ${wrong.length - 12} more`);
  process.exit(1);
}
