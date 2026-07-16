Java.topics.gitBasics = Java.topics.gitBasics || {};

const gitGlossary = [
  { term: 'repository', definition: 'A folder Git tracks, including its project files and hidden .git history.' },
  { term: 'working tree', definition: 'The files as they currently exist on disk.' },
  { term: 'staging area', definition: 'The preparation area where you choose exactly what will go into the next commit.' },
  { term: 'commit', definition: 'A saved snapshot in Git history with an ID, author, date, and message.' },
  { term: 'branch', definition: 'A movable name pointing to a line of commits.' },
  { term: 'merge', definition: 'Combining work from one branch into another.' },
  { term: 'remote', definition: 'A shared copy of a repository, often hosted on GitHub or GitLab.' },
  { term: 'pull request', definition: 'A review workflow for proposing branch changes before merging them.' }
];

Java.topics.gitBasics.lessons = [
  {
    id: 'repository-status',
    num: '01',
    title: 'Repository and Status',
    category: 'local',
    icon: 'git',
    tagline: 'Know what Git sees',
    definition: 'A repository is a project folder with Git history. git status shows what changed in the working tree and staging area.',
    realWorld: 'It is like checking your desk before turning in homework: what is drafted, what is ready, and what is still untracked?',
    syntax: 'Run git status constantly. It is safe, read-only, and tells you your next useful command.',
    exampleLabel: 'Git Command Example',
    codeLanguage: 'bash',
    fileName: 'status.sh',
    code: `git status
git status --short`,
    keyPoints: [
      'A repository stores project history.',
      'The working tree is your current files.',
      'git status is your safest orientation command.',
      'Untracked files exist on disk but are not yet tracked by Git.'
    ],
    commonMistakes: [
      'Running commands without checking status first.',
      'Assuming every file in the folder is tracked.',
      'Ignoring generated files that should be in .gitignore.'
    ],
    pros: [
      'Status is safe and gives immediate clarity.',
      'Short status is useful for quick scans.',
      'Beginners can avoid many mistakes by checking status often.'
    ],
    cons: [
      'Status does not show detailed line changes.',
      'Large repos can produce noisy output.',
      'It tells you state, not whether the code is correct.'
    ],
    related: ['Staging and Commit', 'Diff'],
    glossary: gitGlossary
  },
  {
    id: 'diff',
    num: '02',
    title: 'Diff',
    category: 'local',
    icon: '±',
    tagline: 'Inspect line changes before saving',
    definition: 'A diff shows exactly which lines were added, removed, or changed.',
    realWorld: 'It is like reviewing the red marks on a document before handing it to a teacher.',
    syntax: 'Use git diff for unstaged changes and git diff --staged for changes already prepared for the next commit.',
    exampleLabel: 'Git Command Example',
    codeLanguage: 'bash',
    fileName: 'diff.sh',
    code: `git diff
git diff --staged
git diff -- java/topics/git-basics/js/lessons.js`,
    keyPoints: [
      'Diffs help catch accidental edits.',
      'Unstaged and staged diffs are separate views.',
      'File-scoped diffs reduce noise.',
      'Review before committing.'
    ],
    commonMistakes: [
      'Committing without reading the diff.',
      'Forgetting staged changes can differ from working tree changes.',
      'Reviewing only filenames, not changed lines.'
    ],
    pros: [
      'Excellent quality gate before commits.',
      'Makes accidental whitespace or debug edits visible.',
      'Helps write better commit messages.'
    ],
    cons: [
      'Large diffs are hard to review well.',
      'Generated files can create noise.',
      'Binary files do not show useful text diffs.'
    ],
    related: ['Repository and Status', 'Staging and Commit'],
    glossary: gitGlossary
  },
  {
    id: 'staging-commit',
    num: '03',
    title: 'Staging and Commit',
    category: 'local',
    icon: '✓',
    tagline: 'Choose and save one logical change',
    definition: 'The staging area lets you choose what belongs in the next commit. A commit saves that staged snapshot in history.',
    realWorld: 'It is like placing only the finished pages into an envelope, then sealing and labeling the envelope.',
    syntax: 'Use git add to stage files, then git commit -m "message" to save them. Keep each commit focused on one idea.',
    exampleLabel: 'Git Command Example',
    codeLanguage: 'bash',
    fileName: 'commit.sh',
    code: `git add java/index.html java/js/hub.js
git diff --staged
git commit -m "Redesign Java hub path"`,
    keyPoints: [
      'Staging is intentional selection.',
      'A commit should explain why the change exists.',
      'Small commits are easier to review and revert.',
      'git diff --staged shows what will be committed.'
    ],
    commonMistakes: [
      'Using git add . without checking what it stages.',
      'Mixing unrelated changes in one commit.',
      'Writing vague messages like update or fixes.'
    ],
    pros: [
      'Creates clean project history.',
      'Focused commits make review easier.',
      'The staging area lets you split work carefully.'
    ],
    cons: [
      'Beginners may find staging like an extra step at first.',
      'Overly tiny commits can be noisy.',
      'Bad messages reduce the value of history.'
    ],
    related: ['Diff', 'Branch'],
    glossary: gitGlossary
  },
  {
    id: 'branch',
    num: '04',
    title: 'Branch',
    category: 'branching',
    icon: '⑂',
    tagline: 'Work without disturbing main',
    definition: 'A branch is a movable name for a line of commits. It lets you work on a feature without changing the main line immediately.',
    realWorld: 'It is like drafting a new chapter in a copy of the manuscript while the published version stays stable.',
    syntax: 'Use git switch -c new-branch to create and move to a branch. Use git switch existing-branch to move between branches.',
    exampleLabel: 'Git Command Example',
    codeLanguage: 'bash',
    fileName: 'branch.sh',
    code: `git branch
git switch -c codex/java-rest-topic
git switch main`,
    keyPoints: [
      'Branches let multiple ideas progress independently.',
      'The current branch receives new commits.',
      'Use descriptive branch names.',
      'Commit or stash work before switching when Git asks.'
    ],
    commonMistakes: [
      'Starting work on the wrong branch.',
      'Creating many stale branches and never deleting them.',
      'Assuming a branch is a full copy instead of a pointer into history.'
    ],
    pros: [
      'Keeps experiments away from stable code.',
      'Enables feature work and pull requests.',
      'Cheap and fast to create.'
    ],
    cons: [
      'Long-lived branches drift from main.',
      'Too many branches can confuse beginners.',
      'Uncommitted work can complicate switching.'
    ],
    related: ['Merge', 'Remote and Push'],
    glossary: gitGlossary
  },
  {
    id: 'merge',
    num: '05',
    title: 'Merge',
    category: 'branching',
    icon: '⤨',
    tagline: 'Combine branch work',
    definition: 'A merge combines commits from one branch into another branch.',
    realWorld: 'It is like adding your edited chapter back into the main manuscript, resolving any overlapping edits.',
    syntax: 'Switch to the branch that should receive changes, then run git merge other-branch.',
    exampleLabel: 'Git Command Example',
    codeLanguage: 'bash',
    fileName: 'merge.sh',
    code: `git switch main
git merge codex/java-rest-topic
git status`,
    keyPoints: [
      'Merge direction matters.',
      'Conflicts happen when both branches edit the same lines differently.',
      'After resolving conflicts, stage the files and commit if Git asks.',
      'Pull requests often merge through the hosting platform.'
    ],
    commonMistakes: [
      'Merging into the wrong branch.',
      'Editing conflict markers incorrectly.',
      'Panicking during conflicts instead of checking status.'
    ],
    pros: [
      'Preserves combined work from separate branches.',
      'Supports team collaboration.',
      'Conflict resolution is explicit.'
    ],
    cons: [
      'Conflicts can be intimidating.',
      'Messy branch histories can be hard to read.',
      'Large merges are riskier than small frequent ones.'
    ],
    related: ['Branch', 'Pull Request'],
    glossary: gitGlossary
  },
  {
    id: 'remote-push-pull',
    num: '06',
    title: 'Remote, Push, Pull',
    category: 'collaboration',
    icon: '⇅',
    tagline: 'Share changes with a server',
    definition: 'A remote is another copy of the repository. push uploads your commits; pull downloads and integrates commits from the remote.',
    realWorld: 'It is like syncing your local notebook with a shared team binder.',
    syntax: 'Use git push to publish local commits and git pull to bring remote changes into your current branch.',
    exampleLabel: 'Git Command Example',
    codeLanguage: 'bash',
    fileName: 'remote.sh',
    code: `git remote -v
git push origin codex/java-rest-topic
git pull origin main`,
    keyPoints: [
      'origin is the default remote name in many repos.',
      'Push shares your commits with others.',
      'Pull fetches remote work and integrates it.',
      'Check your current branch before pushing or pulling.'
    ],
    commonMistakes: [
      'Pushing the wrong branch.',
      'Pulling with uncommitted work and creating confusion.',
      'Assuming remote changes appear locally without fetch or pull.'
    ],
    pros: [
      'Enables backups and collaboration.',
      'Remote branches support review workflows.',
      'Teams can share history across machines.'
    ],
    cons: [
      'Network and permission issues can block commands.',
      'Remote branch names add another layer to learn.',
      'Pull can create conflicts that need local resolution.'
    ],
    related: ['Branch', 'Pull Request'],
    glossary: gitGlossary
  },
  {
    id: 'pull-request',
    num: '07',
    title: 'Pull Request',
    category: 'collaboration',
    icon: 'PR',
    tagline: 'Review before merging',
    definition: 'A pull request proposes branch changes for review before they are merged into another branch.',
    realWorld: 'It is like submitting a draft for editorial review before it becomes the official version.',
    syntax: 'Push a branch, open a pull request on the hosting platform, discuss changes, update the branch, then merge when ready.',
    exampleLabel: 'Workflow Example',
    codeLanguage: 'bash',
    fileName: 'pull-request.sh',
    code: `git switch -c codex/add-uml-topic
git add java/topics/uml-diagrams
git commit -m "Add UML diagrams topic"
git push origin codex/add-uml-topic
# Open a pull request in GitHub/GitLab/Bitbucket`,
    keyPoints: [
      'Pull requests are a collaboration workflow, not a Git object.',
      'They collect diffs, comments, checks, and approvals.',
      'Small pull requests are easier to review.',
      'Update the same branch to revise the pull request.'
    ],
    commonMistakes: [
      'Opening huge pull requests with unrelated changes.',
      'Forgetting to read CI or test failures.',
      'Treating review feedback as personal criticism.'
    ],
    pros: [
      'Improves code review and knowledge sharing.',
      'Runs automated checks before merge.',
      'Creates a discussion trail for decisions.'
    ],
    cons: [
      'Can slow down tiny changes if the process is heavy.',
      'Large PRs become hard to review well.',
      'Requires a hosting platform and team convention.'
    ],
    related: ['Remote, Push, Pull', 'Merge'],
    glossary: gitGlossary
  },
  {
    id: 'safe-undo',
    num: '08',
    title: 'Safe Undo',
    category: 'collaboration',
    icon: '↶',
    tagline: 'Recover without destroying history',
    definition: 'Safe undo means inspecting state first, then choosing a reversible command such as restore, revert, or a new corrective commit.',
    realWorld: 'It is like using an eraser on your own draft, but filing an amendment when a document is already published.',
    syntax: 'Use git restore for local file changes, git restore --staged to unstage, and git revert for commits that were already shared.',
    exampleLabel: 'Git Command Example',
    codeLanguage: 'bash',
    fileName: 'safe-undo.sh',
    code: `git status
git restore --staged java/index.html
git restore java/index.html
git revert abc1234`,
    keyPoints: [
      'Check status before undo commands.',
      'restore can discard local uncommitted changes.',
      'revert creates a new commit that undoes an old commit.',
      'Avoid destructive history rewrites while learning.'
    ],
    commonMistakes: [
      'Using reset --hard without understanding it deletes local work.',
      'Rewriting shared history and surprising teammates.',
      'Undoing the wrong file because status was not checked first.'
    ],
    pros: [
      'Gives beginners a calm recovery path.',
      'Revert preserves shared history.',
      'Restore can clean up accidental local edits quickly.'
    ],
    cons: [
      'Restore can permanently discard uncommitted changes.',
      'Revert may conflict if code changed later.',
      'There are many undo commands, so naming can feel confusing.'
    ],
    related: ['Repository and Status', 'Diff'],
    glossary: gitGlossary
  }
];
