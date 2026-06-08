window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.gitPlayground = function (container) {
  const PG = DS.playground;
  let staged = [];
  let committed = [];
  let branch = 'main';
  let step = 0;
  let lastOut = 'Type a git command or use quick buttons.';

  const GUIDED = [
    { title: 'Check status', detail: 'git status shows tracked files and what changed.', preview: '$ git status' },
    { title: 'Stage changes', detail: 'git add puts files into the staging area before commit.', preview: '$ git add readme.txt' },
    { title: 'Commit snapshot', detail: 'git commit saves a labeled snapshot on the current branch.', preview: '$ git commit -m "Add readme"' },
    { title: 'Branch', detail: 'git branch creates a parallel line of work.', preview: '$ git branch feature-login' },
  ];

  const run = (cmd) => {
    const c = cmd.trim();
    if (!c) return;
    if (c === 'git status') {
      lastOut = `On branch ${branch}\nStaged: ${staged.join(', ') || '(none)'}\nCommitted: ${committed.length} snapshot(s)`;
    } else if (c.startsWith('git add ')) {
      const f = c.slice(8).trim();
      if (!staged.includes(f)) staged.push(f);
      lastOut = `Staged ${f}`;
    } else if (c.startsWith('git commit')) {
      const snap = [...staged];
      committed.push({ branch, files: snap, msg: c.includes('-m') ? c.split('-m')[1].trim().replace(/['"]/g, '') : 'snapshot' });
      staged = [];
      lastOut = `Committed on ${branch}: ${snap.join(', ') || 'empty'}`;
    } else if (c.startsWith('git branch ')) {
      branch = c.slice(11).trim() || branch;
      lastOut = `Switched to branch ${branch} (demo simplification)`;
    } else if (c === 'git log --oneline') {
      lastOut = committed.map((c, i) => `${i + 1} ${c.msg} (${c.branch})`).join('\n') || '(no commits yet)';
    } else {
      lastOut = `Unknown command. Try: git status, git add file.txt, git commit -m "msg", git branch name, git log --oneline`;
    }
    render();
  };

  const render = () => {
    const outEl = document.getElementById('gitPgOut');
    container.innerHTML = PG.shell({
      title: 'Git command playground',
      hint: 'Safe sandbox — no real repo. Practice status, add, commit, and branch.',
      guidedHtml: PG.guidedSteps(GUIDED.map((g, i) => ({
        ...g,
        onPrev: 'gitPgPrev()',
        onNext: 'gitPgNext()',
      })), step),
      playgroundHtml: PG.inputBar({
        inputId: 'gitPgIn',
        runHandler: 'gitPgRun',
        placeholder: 'git status',
        quickButtons: ['git status', 'git add readme.txt', 'git commit -m "init"', 'git log --oneline'],
      }),
      inspectorRows: [
        ['Branch', branch, 'Current branch'],
        ['Staged', staged.join(', ') || 'none', 'Index before commit'],
        ['Commits', String(committed.length), 'Snapshots saved'],
      ],
    });
    const out = document.getElementById('gitPgOut');
    if (out) out.textContent = lastOut;
  };

  window.gitPgRun = () => {
    const v = document.getElementById('gitPgIn')?.value || '';
    run(v);
  };
  window.gitPgPrev = () => { if (step > 0) { step--; render(); } };
  window.gitPgNext = () => { if (step < GUIDED.length - 1) { step++; render(); } };

  render();
};
