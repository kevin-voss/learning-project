window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'git-collaboration',
    category: 'Start Here',
    title: 'Git and Collaboration',
    icon: 'fa-code-branch',
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
    demoType: 'git-playground',
    demoTitle: 'Git command playground',
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
);
