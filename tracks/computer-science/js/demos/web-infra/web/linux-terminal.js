window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.linuxTerminal = function (container) {
  const UI = DS.demoUI;
  const lesson = DS.curriculum[DS.currentSection] || {};
  const subPage = lesson.subPages?.[DS.currentSubPage || 0] || { id: 'overview', label: 'Overview' };
  const topicId = subPage.id || 'overview';

  const initialState = {
    cwd: '/home/maya/project',
    previousCwd: '/home/maya',
    notesFile: false,
    backupFile: false,
    renamedFile: false,
    deployExecutable: false,
    nodeKilled: false,
    nodeEnv: 'development',
    lastExit: 0,
    history: [],
    current: null,
    guidedIndex: -1,
  };
  let state = { ...initialState };

  const flowNodes = [
    { id: 'terminal', label: 'Terminal', icon: 'fa-terminal' },
    { id: 'shell', label: 'Shell', icon: 'fa-code' },
    { id: 'kernel', label: 'Kernel', icon: 'fa-microchip' },
    { id: 'files', label: 'Filesystem', icon: 'fa-folder-tree' },
    { id: 'processes', label: 'Processes', icon: 'fa-gears' },
    { id: 'network', label: 'Network', icon: 'fa-network-wired' },
    { id: 'packages', label: 'Packages', icon: 'fa-box-open' },
    { id: 'output', label: 'Output', icon: 'fa-display' },
  ];

  const commandList = [
    {
      id: 'pwd',
      cmd: 'pwd',
      summary: 'Print the current working directory.',
      parse: ['pwd = print working directory'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: (s) => s.cwd,
      takeaway: 'pwd answers: where am I right now?',
    },
    {
      id: 'ls',
      cmd: 'ls',
      summary: 'List visible files in the current directory.',
      parse: ['ls = list directory entries'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: (s) => {
        if (s.cwd === '/') return 'bin  boot  dev  etc  home  proc  tmp  usr  var';
        if (s.cwd === '/home/maya/project/src') return 'api.js  components  index.js';
        if (s.cwd === '/home/maya') return 'project  downloads';
        return `README.md  logs  package.json  scripts  src${s.notesFile ? '  notes' : ''}`;
      },
      takeaway: 'ls asks the filesystem for names in the current folder.',
    },
    {
      id: 'ls-la',
      cmd: 'ls -la',
      summary: 'List all files with permissions, owner, size, and timestamp.',
      parse: ['ls = list files', '-l = long details', '-a = include hidden files'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: (s) => [
        'drwxr-xr-x  8 maya dev   256 Jun  8 .',
        'drwxr-xr-x  5 maya dev   160 Jun  8 ..',
        'drwxr-xr-x 12 maya dev   384 Jun  8 .git',
        '-rw-r--r--  1 maya dev   240 Jun  8 README.md',
        'drwxr-xr-x  3 maya dev    96 Jun  8 logs',
        '-rw-r--r--  1 maya dev   620 Jun  8 package.json',
        `${s.deployExecutable ? '-rwxr-xr-x' : '-rw-r--r--'}  1 maya dev   118 Jun  8 scripts/deploy.sh`,
        'drwxr-xr-x  4 maya dev   128 Jun  8 src',
        s.notesFile ? 'drwxr-xr-x  2 maya dev    64 Jun  8 notes' : '',
      ].filter(Boolean).join('\n'),
      takeaway: 'The first column is permissions: file type, then read/write/execute bits.',
    },
    {
      id: 'cd-src',
      cmd: 'cd src',
      summary: 'Change into the src directory.',
      parse: ['cd = change directory', 'src = relative path from the current folder'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.previousCwd = s.cwd. S.cwd = '/home/maya/project/src'; },
      takeaway: 'cd changes shell state. Successful cd often prints nothing.',
    },
    {
      id: 'cd-project',
      cmd: 'cd ~/project',
      summary: 'Jump to the project folder using the home shortcut.',
      parse: ['cd = change directory', '~ = home directory', 'project = folder inside home'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.previousCwd = s.cwd. S.cwd = '/home/maya/project'; },
      takeaway: '~ expands to your home directory before cd runs.',
    },
    {
      id: 'cd-root',
      cmd: 'cd /',
      summary: 'Go to the filesystem root.',
      parse: ['cd = change directory', '/ = top of the Linux filesystem tree'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.previousCwd = s.cwd. S.cwd = '/'; },
      takeaway: 'Linux paths all live under the single root directory: /.',
    },
    {
      id: 'cd-home',
      cmd: 'cd ~',
      summary: 'Go to your home directory.',
      parse: ['cd = change directory', '~ = shortcut for /home/maya in this demo'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.previousCwd = s.cwd. S.cwd = '/home/maya'; },
      takeaway: 'Your home folder is where your personal files usually live.',
    },
    {
      id: 'cd-up',
      cmd: 'cd ..',
      summary: 'Go up one directory.',
      parse: ['cd = change directory', '.. = parent directory'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => {
        s.previousCwd = s.cwd;
        if (s.cwd === '/home/maya/project/src') s.cwd = '/home/maya/project';
        else if (s.cwd === '/home/maya/project') s.cwd = '/home/maya';
        else if (s.cwd === '/home/maya') s.cwd = '/home';
        else s.cwd = '/';
      },
      takeaway: '.. means parent folder relative to where you are now.',
    },
    {
      id: 'cd-previous',
      cmd: 'cd -',
      summary: 'Jump back to the previous directory.',
      parse: ['cd = change directory', '- = previous working directory remembered by shell'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: (s) => s.previousCwd,
      effect: (s) => {
        const next = s.previousCwd;
        s.previousCwd = s.cwd;
        s.cwd = next;
      },
      takeaway: 'cd - is a quick toggle between two recently used folders.',
    },
    {
      id: 'tree',
      cmd: 'tree -L 2',
      summary: 'Show a two-level project tree.',
      parse: ['tree = draw directories as a tree', '-L 2 = show only two levels deep'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: (s) => [
        '.',
        '|-- README.md',
        '|-- logs',
        '|   `-- app.log',
        '|-- scripts',
        '|   `-- deploy.sh',
        '|-- src',
        '|   |-- api.js',
        '|   `-- index.js',
        s.notesFile ? '`-- notes\n    `-- today.txt' : '',
      ].filter(Boolean).join('\n'),
      takeaway: 'tree helps beginners see structure instead of one folder at a time.',
    },
    {
      id: 'cat-readme',
      cmd: 'cat README.md',
      summary: 'Print a small text file.',
      parse: ['cat = print file contents', 'README.md = file argument'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '# Learning Project\n\nRun npm install, then npm run dev.\nLogs are in logs/app.log.',
      takeaway: 'cat is useful for short files. For long files, less is easier to read.',
    },
    {
      id: 'less-readme',
      cmd: 'less README.md',
      summary: 'Open a file in a pager.',
      parse: ['less = page through text', 'README.md = file to read'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '# Learning Project\n\nRun npm install, then npm run dev.\n\n: press q to quit less',
      takeaway: 'less lets you scroll large files without flooding the terminal.',
    },
    {
      id: 'grep-errors',
      cmd: 'grep ERROR logs/app.log',
      summary: 'Search the app log for error lines.',
      parse: ['grep = search text', 'ERROR = pattern to find', 'logs/app.log = file to search'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '2026-06-08T16:03:12Z ERROR api failed to connect to db\n2026-06-08T16:04:51Z ERROR retry exhausted for /api/profile',
      takeaway: 'grep filters real text data so you can find important lines quickly.',
    },
    {
      id: 'mkdir-notes',
      cmd: 'mkdir notes',
      summary: 'Create a directory.',
      parse: ['mkdir = make directory', 'notes = new folder name'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.notesFile = true; },
      takeaway: 'mkdir changes the filesystem by creating a folder.',
    },
    {
      id: 'touch-note',
      cmd: 'touch notes/today.txt',
      summary: 'Create an empty file.',
      parse: ['touch = create file or update timestamp', 'notes/today.txt = target path'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.notesFile = true; },
      takeaway: 'touch is a fast way to create an empty file for practice.',
    },
    {
      id: 'mkdir-touch',
      cmd: 'mkdir notes && touch notes/today.txt',
      summary: 'Create a folder, then a file, only if the folder command succeeds.',
      parse: ['mkdir notes = create notes folder', '&& = run next only after success', 'touch notes/today.txt = create file'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.notesFile = true; },
      takeaway: '&& is safer than blindly running the second command after a failure.',
    },
    {
      id: 'echo-note',
      cmd: 'echo "Learn Linux" >> notes/today.txt',
      summary: 'Append text to a file.',
      parse: ['echo = print text', '>> = append output to a file', 'notes/today.txt = target file'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.notesFile = true; },
      takeaway: '>> appends. A single > replaces the file contents.',
    },
    {
      id: 'cp-note',
      cmd: 'cp notes/today.txt notes/backup.txt',
      summary: 'Copy a file.',
      parse: ['cp = copy', 'first path = source', 'second path = destination'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.notesFile = true. S.backupFile = true; },
      takeaway: 'cp leaves the original file in place and creates another copy.',
    },
    {
      id: 'mv-note',
      cmd: 'mv notes/backup.txt notes/yesterday.txt',
      summary: 'Rename or move a file.',
      parse: ['mv = move', 'backup.txt = old path', 'yesterday.txt = new path'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.backupFile = false. S.renamedFile = true; },
      takeaway: 'mv renames when source and destination are in the same folder.',
    },
    {
      id: 'rm-note',
      cmd: 'rm -i notes/yesterday.txt',
      summary: 'Delete a file with confirmation.',
      parse: ['rm = remove', '-i = ask first', 'notes/yesterday.txt = target file'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => 'remove notes/yesterday.txt? y',
      effect: (s) => { s.renamedFile = false; },
      takeaway: 'rm usually skips the trash. -i is a safer beginner habit.',
    },
    {
      id: 'ls-help',
      cmd: 'ls --help',
      summary: 'Show quick help for ls.',
      parse: ['ls = command', '--help = long option asking for usage text'],
      flow: ['terminal', 'shell', 'output'],
      output: () => 'Usage: ls [OPTION]... [FILE]...\n  -a, --all      do not ignore entries starting with .\n  -l             use a long listing format',
      takeaway: '--help teaches options without leaving the terminal.',
    },
    {
      id: 'man-ls',
      cmd: 'man ls',
      summary: 'Open the manual page for ls.',
      parse: ['man = manual reader', 'ls = topic to read'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => 'LS(1) User Commands\n\nNAME\n  ls - list directory contents\n\nPress q to quit the manual.',
      takeaway: 'Manual pages are detailed references. Press q to leave.',
    },
    {
      id: 'tldr-tar',
      cmd: 'tldr tar',
      summary: 'Show short examples for tar.',
      parse: ['tldr = community examples', 'tar = command topic'],
      flow: ['terminal', 'shell', 'network', 'output'],
      output: () => 'tar\n  Archive files.\n\n- Create archive:\n  tar -cvf archive.tar path/to/files',
      takeaway: 'tldr is not always installed, but it gives beginner-friendly examples.',
    },
    {
      id: 'which-node',
      cmd: 'which node',
      summary: 'Show which node executable the shell will run.',
      parse: ['which = search PATH', 'node = command name'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '/usr/local/bin/node',
      takeaway: 'which helps explain why one installed tool runs instead of another.',
    },
    {
      id: 'type-cd',
      cmd: 'type cd',
      summary: 'Ask the shell what kind of command cd is.',
      parse: ['type = shell command inspector', 'cd = command name'],
      flow: ['terminal', 'shell', 'output'],
      output: () => 'cd is a shell builtin',
      takeaway: 'cd must be built into the shell because it changes the shell’s own directory.',
    },
    {
      id: 'command-git',
      cmd: 'command -v git',
      summary: 'Check if git is available.',
      parse: ['command -v = portable command lookup', 'git = command name'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '/usr/bin/git',
      takeaway: 'command -v is useful in scripts before relying on a tool.',
    },
    {
      id: 'redirect-write',
      cmd: 'echo "hello" > message.txt',
      summary: 'Write output to a file, replacing old contents.',
      parse: ['echo = print text', '> = redirect stdout into a file', 'message.txt = target'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      takeaway: '> redirects output into a file and overwrites that file.',
    },
    {
      id: 'pipe-count',
      cmd: 'cat message.txt | wc -l',
      summary: 'Send file text into a line counter.',
      parse: ['cat message.txt = print file', '| = pipe stdout to next command', 'wc -l = count lines'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '1',
      takeaway: 'Pipes let small commands cooperate.',
    },
    {
      id: 'grep-redirect',
      cmd: 'grep "ERROR" app.log > errors.txt',
      summary: 'Filter log lines and save matches to a file.',
      parse: ['grep "ERROR" app.log = find matching lines', '> errors.txt = write matches to file'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      takeaway: 'Redirects are how command output becomes saved data.',
    },
    {
      id: 'grep-missing',
      cmd: 'grep "ERROR" missing.log 2> grep-errors.txt',
      summary: 'Send error output to a file.',
      parse: ['grep reads missing.log', '2> redirects stderr, not normal stdout'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      takeaway: 'stderr is separate so errors can be captured without mixing with normal data.',
      exitCode: 2,
    },
    {
      id: 'echo-exit',
      cmd: 'echo $?',
      summary: 'Print the previous command exit code.',
      parse: ['echo = print text', '$? = last exit code shell variable'],
      flow: ['terminal', 'shell', 'output'],
      output: (s) => String(s.lastExit),
      takeaway: 'Exit code 0 means success for most commands. Non-zero usually means failure.',
    },
    {
      id: 'ls-deploy',
      cmd: 'ls -l scripts/deploy.sh',
      summary: 'Inspect permissions on one script.',
      parse: ['ls -l = long listing', 'scripts/deploy.sh = target file'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: (s) => `${s.deployExecutable ? '-rwxr-xr-x' : '-rw-r--r--'}  1 maya dev 118 Jun  8 scripts/deploy.sh`,
      takeaway: 'Look for x permission before trying to run a script.',
    },
    {
      id: 'chmod',
      cmd: 'chmod +x scripts/deploy.sh',
      summary: 'Add execute permission to a script.',
      parse: ['chmod = change mode/permissions', '+x = add execute bit', 'scripts/deploy.sh = target file'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.deployExecutable = true; },
      takeaway: 'Execute permission lets a file run as a program.',
    },
    {
      id: 'run-deploy',
      cmd: './deploy.sh',
      summary: 'Run a script from the current directory.',
      parse: ['./ = current directory', 'deploy.sh = script file'],
      flow: ['terminal', 'shell', 'kernel', 'processes', 'output'],
      output: (s) => s.deployExecutable ? 'Deploy check passed: build artifacts ready.' : 'bash: ./deploy.sh: Permission denied',
      takeaway: 'Permission denied often means the execute bit is missing.',
      exitCode: (s) => s.deployExecutable ? 0 : 126,
    },
    {
      id: 'groups',
      cmd: 'groups',
      summary: 'Show groups for the current user.',
      parse: ['groups = print group memberships'],
      flow: ['terminal', 'shell', 'kernel', 'output'],
      output: () => 'maya dev docker',
      takeaway: 'Groups help Linux decide shared permissions.',
    },
    {
      id: 'sudo-v',
      cmd: 'sudo -v',
      summary: 'Validate sudo access without running another command.',
      parse: ['sudo = elevated privileges', '-v = validate cached credentials'],
      flow: ['terminal', 'shell', 'kernel', 'output'],
      output: () => '[sudo] password for maya: ******\nsudo credentials refreshed for this demo.',
      takeaway: 'sudo should be intentional because it runs with higher privileges.',
    },
    {
      id: 'ps-head',
      cmd: 'ps aux | head',
      summary: 'List processes and show the first few lines.',
      parse: ['ps aux = list processes', '| = pipe', 'head = keep first lines'],
      flow: ['terminal', 'shell', 'kernel', 'processes', 'output'],
      output: (s) => [
        'USER   PID  %CPU %MEM COMMAND',
        'root     1   0.0  0.1 systemd',
        s.nodeKilled ? '' : 'maya  4312   4.2  1.8 node server.js',
        'maya  4510   0.5  0.3 zsh',
      ].filter(Boolean).join('\n'),
      takeaway: 'ps gives a snapshot of running processes.',
    },
    {
      id: 'ps-grep',
      cmd: 'ps aux | grep node',
      summary: 'List processes, then filter for node.',
      parse: ['ps aux = list processes', '| = pipe output', 'grep node = keep lines containing node'],
      flow: ['terminal', 'shell', 'kernel', 'processes', 'output'],
      output: (s) => s.nodeKilled
        ? 'maya  4388  0.0  0.1 grep node'
        : 'maya  4312  4.2  1.8 node server.js\nmaya  4388  0.0  0.1 grep node',
      takeaway: 'Pipes are common when process lists are too large to read manually.',
    },
    {
      id: 'top',
      cmd: 'top',
      summary: 'Open a live process viewer.',
      parse: ['top = interactive process monitor'],
      flow: ['terminal', 'shell', 'kernel', 'processes', 'output'],
      output: () => 'top - 16:23:10 up 2 days\nPID  USER  %CPU COMMAND\n4312 maya   4.2 node\nPress q to quit top.',
      takeaway: 'top updates live, unlike ps which is one snapshot.',
    },
    {
      id: 'kill-node',
      cmd: 'kill 4312',
      summary: 'Ask a process to stop.',
      parse: ['kill = send signal', '4312 = process ID', 'default signal = TERM'],
      flow: ['terminal', 'shell', 'kernel', 'processes', 'output'],
      output: () => '',
      effect: (s) => { s.nodeKilled = true; },
      takeaway: 'Normal kill asks a process to shut down cleanly.',
    },
    {
      id: 'systemctl',
      cmd: 'systemctl status nginx',
      summary: 'Show service status.',
      parse: ['systemctl = service manager client', 'status = inspect service', 'nginx = service name'],
      flow: ['terminal', 'shell', 'kernel', 'processes', 'output'],
      output: () => 'nginx.service - A high performance web server\n   Loaded: loaded\n   Active: active (running)',
      takeaway: 'Services are background processes managed by the OS.',
    },
    {
      id: 'ping',
      cmd: 'ping example.com',
      summary: 'Send test packets to a host.',
      parse: ['ping = connectivity test', 'example.com = host'],
      flow: ['terminal', 'shell', 'kernel', 'network', 'output'],
      output: () => 'PING example.com (93.184.216.34)\n64 bytes from 93.184.216.34: icmp_seq=1 time=22.4 ms',
      takeaway: 'Some networks block ping, so failure does not always mean a site is down.',
    },
    {
      id: 'dig',
      cmd: 'dig example.com',
      summary: 'Look up DNS records.',
      parse: ['dig = DNS lookup tool', 'example.com = domain name'],
      flow: ['terminal', 'shell', 'kernel', 'network', 'output'],
      output: () => 'example.com.  3600  IN  A  93.184.216.34',
      takeaway: 'DNS turns names into addresses computers can route to.',
    },
    {
      id: 'curl-head',
      cmd: 'curl -I https://example.com',
      summary: 'Ask a website for response headers only.',
      parse: ['curl = make network request', '-I = headers only', 'https://example.com = URL'],
      flow: ['terminal', 'shell', 'kernel', 'network', 'output'],
      output: () => 'HTTP/2 200\ncontent-type: text/html. Charset=UTF-8\ncache-control: max-age=604800',
      takeaway: 'curl lets you inspect HTTP without opening a browser.',
    },
    {
      id: 'curl-verbose',
      cmd: 'curl -v https://example.com',
      summary: 'Show verbose connection details.',
      parse: ['curl = HTTP client', '-v = verbose connection log'],
      flow: ['terminal', 'shell', 'kernel', 'network', 'output'],
      output: () => '* Connected to example.com (93.184.216.34) port 443\n> GET / HTTP/2\n< HTTP/2 200',
      takeaway: '-v helps debug DNS, TCP, TLS, and HTTP steps.',
    },
    {
      id: 'ss',
      cmd: 'ss -ltnp',
      summary: 'Show listening TCP ports on Linux.',
      parse: ['ss = socket statistics', '-l = listening', '-t = TCP', '-n = numeric', '-p = process'],
      flow: ['terminal', 'shell', 'kernel', 'network', 'processes', 'output'],
      output: (s) => [
        'State  Local Address:Port  Process',
        s.nodeKilled ? '' : 'LISTEN 0.0.0.0:3000       users:(("node",pid=4312))',
        'LISTEN 0.0.0.0:22         users:(("sshd",pid=91))',
      ].filter(Boolean).join('\n'),
      takeaway: 'Ports are how network traffic reaches the right process.',
    },
    {
      id: 'lsof-port',
      cmd: 'lsof -i :3000',
      summary: 'Find which process is using local port 3000.',
      parse: ['lsof = list open files/connections', '-i :3000 = network port filter'],
      flow: ['terminal', 'shell', 'kernel', 'processes', 'network', 'output'],
      output: (s) => s.nodeKilled
        ? ''
        : 'COMMAND  PID  USER   FD   TYPE NODE NAME\nnode    4312  maya   22u  IPv4 TCP *:3000 (LISTEN)',
      takeaway: 'This helps when a dev server says address already in use.',
    },
    {
      id: 'ssh',
      cmd: 'ssh user@server.example.com',
      summary: 'Open a remote shell over SSH.',
      parse: ['ssh = secure shell client', 'user@server.example.com = remote login target'],
      flow: ['terminal', 'shell', 'kernel', 'network', 'output'],
      output: () => 'user@server.example.com: Permission denied (publickey).\nDemo note: real SSH needs keys or a password.',
      takeaway: 'SSH gives you a terminal on another machine when authentication succeeds.',
      exitCode: 255,
    },
    {
      id: 'echo-path',
      cmd: 'echo $PATH',
      summary: 'Print command search directories.',
      parse: ['echo = print text', '$PATH = environment variable expanded by shell'],
      flow: ['terminal', 'shell', 'output'],
      output: () => '/usr/local/bin:/usr/bin:/bin:/home/maya/.local/bin',
      takeaway: 'PATH controls where the shell searches for command names.',
    },
    {
      id: 'env-sort',
      cmd: 'env | sort',
      summary: 'Show environment variables sorted by name.',
      parse: ['env = print environment', '| sort = alphabetize lines'],
      flow: ['terminal', 'shell', 'kernel', 'output'],
      output: (s) => `HOME=/home/maya\nNODE_ENV=${s.nodeEnv}\nPATH=/usr/local/bin:/usr/bin:/bin\nSHELL=/bin/bash`,
      takeaway: 'Environment variables configure programs without changing their code.',
    },
    {
      id: 'export-node-env',
      cmd: 'export NODE_ENV=development',
      summary: 'Set an environment variable for this shell.',
      parse: ['export = store variable for child processes', 'NODE_ENV=development = key/value'],
      flow: ['terminal', 'shell', 'output'],
      output: () => '',
      effect: (s) => { s.nodeEnv = 'development'; },
      takeaway: 'export affects future commands started from the same shell.',
    },
    {
      id: 'node-env-test',
      cmd: 'NODE_ENV=test npm test',
      summary: 'Set an environment variable for one command.',
      parse: ['NODE_ENV=test = temporary variable', 'npm test = command receiving it'],
      flow: ['terminal', 'shell', 'kernel', 'processes', 'output'],
      output: () => 'npm test\nNODE_ENV=test\n3 tests passed',
      takeaway: 'Prefix assignment configures only that one command.',
    },
    {
      id: 'apt-update',
      cmd: 'sudo apt update',
      summary: 'Refresh package lists on Debian/Ubuntu.',
      parse: ['sudo = elevated privileges', 'apt = package manager', 'update = refresh package metadata'],
      flow: ['terminal', 'shell', 'kernel', 'network', 'packages', 'output'],
      output: () => 'Hit:1 https://archive.ubuntu.com/ubuntu noble InRelease\nReading package lists... Done',
      takeaway: 'apt update does not upgrade apps. It refreshes available package information.',
    },
    {
      id: 'apt-install',
      cmd: 'sudo apt install curl',
      summary: 'Install curl with apt.',
      parse: ['sudo = admin privileges', 'apt install = install package', 'curl = package name'],
      flow: ['terminal', 'shell', 'kernel', 'network', 'packages', 'files', 'output'],
      output: () => 'Reading package lists... Done\ncurl is already the newest version.',
      takeaway: 'Package managers install trusted software plus dependencies.',
    },
    {
      id: 'rm-preview',
      cmd: 'ls *.log',
      summary: 'Preview matching files before deleting.',
      parse: ['ls = list', '*.log = shell wildcard for names ending in .log'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => 'app.log\nold.log',
      takeaway: 'Preview wildcard matches before using rm.',
    },
    {
      id: 'rm-old',
      cmd: 'rm -i old.log',
      summary: 'Remove one file with confirmation.',
      parse: ['rm = remove', '-i = interactive confirmation', 'old.log = target'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => 'remove old.log? y',
      takeaway: '-i slows you down before a destructive action.',
    },
    {
      id: 'curl-script',
      cmd: 'curl -fsSL https://example.com/install.sh -o install.sh',
      summary: 'Download a script without running it.',
      parse: ['curl = download', '-o install.sh = save to file', 'no pipe to sh = not executed yet'],
      flow: ['terminal', 'shell', 'kernel', 'network', 'files', 'output'],
      output: () => '',
      takeaway: 'Downloading first lets you inspect a script before running it.',
    },
    {
      id: 'less-script',
      cmd: 'less install.sh',
      summary: 'Inspect a downloaded script.',
      parse: ['less = view text safely', 'install.sh = downloaded script'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '#!/bin/sh\nset -e\n# installer would run commands here\nPress q to quit less.',
      takeaway: 'Read unknown scripts before executing them.',
    },
    {
      id: 'echo-shell',
      cmd: 'echo $SHELL',
      summary: 'Show the default shell path.',
      parse: ['echo = print', '$SHELL = shell environment variable'],
      flow: ['terminal', 'shell', 'output'],
      output: () => '/bin/bash',
      takeaway: 'The terminal window and the shell program are different things.',
    },
    {
      id: 'echo-zero',
      cmd: 'echo $0',
      summary: 'Show the current shell process name.',
      parse: ['echo = print', '$0 = name of current shell or script'],
      flow: ['terminal', 'shell', 'output'],
      output: () => 'bash',
      takeaway: '$SHELL is your default; $0 is what is running now.',
    },
    {
      id: 'uname',
      cmd: 'uname -a',
      summary: 'Show kernel and system information.',
      parse: ['uname = system name', '-a = all details'],
      flow: ['terminal', 'shell', 'kernel', 'output'],
      output: () => 'Linux devbox 6.8.0-demo x86_64 GNU/Linux',
      takeaway: 'uname talks to the OS for kernel/system information.',
    },
    {
      id: 'whoami',
      cmd: 'whoami',
      summary: 'Show the current username.',
      parse: ['whoami = print effective user name'],
      flow: ['terminal', 'shell', 'kernel', 'output'],
      output: () => 'maya',
      takeaway: 'Many permission decisions start with which user you are.',
    },
    {
      id: 'hostname',
      cmd: 'hostname',
      summary: 'Show the machine name.',
      parse: ['hostname = print system host name'],
      flow: ['terminal', 'shell', 'kernel', 'output'],
      output: () => 'devbox',
      takeaway: 'Hostnames help identify local and remote machines.',
    },
    {
      id: 'date',
      cmd: 'date',
      summary: 'Show the current date and time.',
      parse: ['date = print system date/time'],
      flow: ['terminal', 'shell', 'kernel', 'output'],
      output: () => 'Mon Jun  8 18:23:00 CEST 2026',
      takeaway: 'date is a tiny command that asks the OS for time.',
    },
  ];

  const commands = Object.fromEntries(commandList.map((command) => [command.cmd, command]));
  const commandById = Object.fromEntries(commandList.map((command) => [command.id, command]));

  const topics = {
    overview: {
      label: 'Overview',
      intro: 'A quick journey from simple navigation to real debugging commands.',
      guided: ['pwd', 'ls-la', 'grep-errors', 'ps-grep', 'curl-head'],
      playground: ['pwd', 'ls', 'ls -la', 'cd src', 'cd ~/project', 'cat README.md', 'grep ERROR logs/app.log', 'ps aux | grep node', 'curl -I https://example.com', 'echo $?'],
    },
    'os-kernel-shell': {
      label: 'OS, Kernel, Shell',
      intro: 'Focus on commands that reveal shell, user, host, and kernel information.',
      guided: ['echo-shell', 'echo-zero', 'uname', 'whoami', 'date'],
      playground: ['echo $SHELL', 'echo $0', 'uname -a', 'whoami', 'hostname', 'date'],
    },
    'filesystem-navigation': {
      label: 'Filesystem',
      intro: 'Practice moving around the filesystem and seeing paths.',
      guided: ['pwd', 'ls', 'cd-src', 'pwd', 'cd-up', 'tree'],
      playground: ['pwd', 'ls', 'ls -la', 'cd src', 'cd ~/project', 'cd /', 'cd ~', 'cd ..', 'cd -', 'tree -L 2'],
    },
    'files-directories': {
      label: 'Files',
      intro: 'Practice creating, reading, copying, renaming, and safely removing files.',
      guided: ['mkdir-notes', 'touch-note', 'echo-note', 'cp-note', 'mv-note', 'rm-note'],
      playground: ['mkdir notes', 'touch notes/today.txt', 'mkdir notes && touch notes/today.txt', 'echo "Learn Linux" >> notes/today.txt', 'cat README.md', 'less README.md', 'cp notes/today.txt notes/backup.txt', 'mv notes/backup.txt notes/yesterday.txt', 'rm -i notes/yesterday.txt'],
    },
    'commands-options-help': {
      label: 'Commands',
      intro: 'Read command names, options, arguments, and help output.',
      guided: ['ls-help', 'man-ls', 'which-node', 'type-cd', 'command-git'],
      playground: ['ls --help', 'man ls', 'tldr tar', 'which node', 'type cd', 'command -v git'],
    },
    'pipes-redirects-exit-codes': {
      label: 'Pipes',
      intro: 'Connect commands with pipes and redirects, then inspect exit codes.',
      guided: ['redirect-write', 'pipe-count', 'grep-redirect', 'grep-missing', 'echo-exit'],
      playground: ['echo "hello" > message.txt', 'cat message.txt | wc -l', 'grep "ERROR" app.log > errors.txt', 'grep "ERROR" missing.log 2> grep-errors.txt', 'echo $?'],
    },
    'permissions-users-sudo': {
      label: 'Permissions',
      intro: 'Inspect permission bits, add execute permission, and see why sudo matters.',
      guided: ['ls-deploy', 'run-deploy', 'chmod', 'ls-deploy', 'groups', 'sudo-v'],
      playground: ['ls -l scripts/deploy.sh', './deploy.sh', 'chmod +x scripts/deploy.sh', 'groups', 'sudo -v'],
    },
    'processes-services': {
      label: 'Processes',
      intro: 'Find running programs, inspect ports, and stop a process safely.',
      guided: ['ps-head', 'ps-grep', 'lsof-port', 'kill-node', 'ps-grep', 'systemctl'],
      playground: ['ps aux | head', 'ps aux | grep node', 'top', 'lsof -i :3000', 'kill 4312', 'systemctl status nginx'],
    },
    'networking-terminal': {
      label: 'Networking',
      intro: 'Check DNS, HTTP, ports, connectivity, and SSH from the terminal.',
      guided: ['ping', 'dig', 'curl-head', 'curl-verbose', 'ss', 'ssh'],
      playground: ['ping example.com', 'dig example.com', 'curl -I https://example.com', 'curl -v https://example.com', 'ss -ltnp', 'lsof -i :3000', 'ssh user@server.example.com'],
    },
    'packages-environment': {
      label: 'Packages',
      intro: 'See where commands come from and how environment variables configure programs.',
      guided: ['echo-path', 'which-node', 'env-sort', 'node-env-test', 'apt-update', 'apt-install'],
      playground: ['echo $PATH', 'which node', 'env | sort', 'export NODE_ENV=development', 'NODE_ENV=test npm test', 'sudo apt update', 'sudo apt install curl'],
    },
    'safe-practice': {
      label: 'Safety',
      intro: 'Practice safer patterns before destructive or copied commands.',
      guided: ['pwd', 'rm-preview', 'rm-old', 'curl-script', 'less-script'],
      playground: ['pwd', 'ls', 'ls *.log', 'rm -i old.log', 'curl -fsSL https://example.com/install.sh -o install.sh', 'less install.sh'],
    },
  };
  const topic = topics[topicId] || topics.overview;

  const unknownCommand = (cmd) => ({
    id: 'unknown',
    cmd,
    summary: 'The simulated shell does not know this command for the current tab.',
    parse: ['The shell tried to find a matching command.', 'This playground is filtered to the current lesson tab.'],
    flow: ['terminal', 'shell', 'output'],
    output: () => `${cmd}: not available in the ${topic.label} playground\nTry: ${topic.playground.slice(0, 6).join(', ')}`,
    takeaway: 'Commands are intentionally filtered so the demo matches the active navigation tab.',
    exitCode: 127,
  });

  const run = (rawCmd, source = 'Playground') => {
    const cmd = String(rawCmd || '').trim();
    if (!cmd) return;
    const command = commands[cmd] || unknownCommand(cmd);
    const promptCwd = state.cwd;
    const exitCode = typeof command.exitCode === 'function' ? command.exitCode(state) : (command.exitCode ?? 0);
    const output = command.output ? command.output(state) : '';
    if (command.effect) command.effect(state);
    state.lastExit = exitCode;
    state.current = { ...command, source };
    state.history = [...state.history, { cmd, output, exitCode, cwd: promptCwd, source }].slice(-7);
    render();
  };

  const fileTree = () => `
    <div class="linux-tree">
      <div><i class="fas fa-folder-open"></i> /home/maya/project</div>
      <div class="indent"><i class="fas fa-file-lines"></i> README.md</div>
      <div class="indent"><i class="fas fa-folder"></i> logs</div>
      <div class="indent deeper"><i class="fas fa-file-lines"></i> app.log</div>
      <div class="indent"><i class="fas fa-file-code"></i> package.json</div>
      <div class="indent"><i class="fas fa-folder"></i> scripts</div>
      <div class="indent deeper ${state.deployExecutable ? 'is-hot' : ''}"><i class="fas fa-file-code"></i> deploy.sh ${state.deployExecutable ? '<span>+x</span>' : ''}</div>
      <div class="indent"><i class="fas fa-folder"></i> src</div>
      <div class="indent deeper"><i class="fas fa-file-code"></i> api.js</div>
      ${state.notesFile ? '<div class="indent is-hot"><i class="fas fa-folder"></i> notes</div><div class="indent deeper is-hot"><i class="fas fa-file-lines"></i> today.txt</div>' : ''}
      ${state.backupFile ? '<div class="indent deeper is-hot"><i class="fas fa-file-lines"></i> backup.txt</div>' : ''}
      ${state.renamedFile ? '<div class="indent deeper is-hot"><i class="fas fa-file-lines"></i> yesterday.txt</div>' : ''}
    </div>`;

  const processTable = () => `
    <div class="linux-processes">
      <div><span>PID</span><span>Program</span><span>Port</span></div>
      ${state.nodeKilled ? '' : '<div><span>4312</span><span>node server.js</span><span>3000</span></div>'}
      <div><span>2201</span><span>postgres</span><span>5432</span></div>
      <div><span>91</span><span>sshd</span><span>22</span></div>
    </div>`;

  const renderHistory = () => {
    if (!state.history.length) {
      return `<div class="linux-terminal-empty">Use Guided demo for predefined steps, or type a ${UI.esc(topic.label)} command in Playground.</div>`;
    }
    return state.history.map((entry) => `
      <div class="linux-terminal-entry">
        <div class="linux-entry-source">${UI.esc(entry.source)}</div>
        <div><span class="linux-prompt">maya@linux:${UI.esc(entry.cwd)}$</span> ${UI.esc(entry.cmd)}</div>
        ${entry.output ? `<pre>${UI.esc(entry.output)}</pre>` : '<pre class="linux-muted">(success, no output)</pre>'}
      </div>
    `).join('');
  };

  const guidedOutputFor = (command) => {
    if (!command) return '';
    const latestGuided = [...state.history]
      .reverse()
      .find((entry) => entry.source === 'Guided demo' && entry.cmd === command.cmd);
    if (latestGuided) return latestGuided.output;
    return command.output ? command.output(state) : '';
  };

  const renderGuidedTerminal = (command) => {
    if (!command) return '';
    const output = guidedOutputFor(command);
    return `
      <div class="linux-guided-terminal">
        <div class="linux-window-bar"><span></span><span></span><span></span><strong>guided demo output</strong></div>
        <div class="linux-guided-terminal-body">
          <div><span class="linux-prompt">maya@linux:${UI.esc(state.cwd)}$</span> ${UI.esc(command.cmd)}</div>
          ${output ? `<pre>${UI.esc(output)}</pre>` : '<pre class="linux-muted">(success, no output)</pre>'}
        </div>
      </div>`;
  };

  const renderGuidedExplanation = (command) => {
    if (!command) return '';
    return `
      <div class="linux-guided-explanation">
        <div>
          <strong>Command pieces</strong>
          <ul>${command.parse.map((part) => `<li>${UI.esc(part)}</li>`).join('')}</ul>
        </div>
        <div>
          <strong>What you should notice</strong>
          <p>${UI.esc(command.takeaway)}</p>
        </div>
      </div>`;
  };

  const renderGuidedDemo = () => {
    const steps = topic.guided.map((id) => commandById[id]).filter(Boolean);
    const currentStep = steps[Math.max(0, state.guidedIndex)] || steps[0];
    return `
      <section class="linux-panel linux-guided-panel">
        <div class="linux-panel-head">
          <span><i class="fas fa-route"></i> Guided demo: ${UI.esc(topic.label)}</span>
          <small>${UI.esc(topic.intro)}</small>
        </div>
        <div class="linux-guided-steps">
          ${steps.map((step, index) => `
            <button class="linux-guided-step ${index === state.guidedIndex ? 'is-active' : ''}" onclick="linuxTerminalRunGuided(${index})">
              <span>${index + 1}</span>
              <strong>${UI.esc(step.cmd)}</strong>
              <em>${UI.esc(step.summary)}</em>
            </button>
          `).join('')}
        </div>
        <div class="linux-guided-preview">
          ${renderGuidedTerminal(currentStep)}
          ${renderGuidedExplanation(currentStep)}
        </div>
        <div class="linux-guided-actions">
          <button class="demo-btn success" onclick="linuxTerminalNextGuided()"><i class="fas fa-forward-step"></i> Run next predefined command</button>
          <button class="demo-btn" onclick="linuxTerminalRunCurrentGuided()"><i class="fas fa-play"></i> Rerun current</button>
          <span>${currentStep ? UI.esc(currentStep.takeaway) : ''}</span>
        </div>
      </section>`;
  };

  const renderFlow = () => {
    const active = new Set(state.current?.flow || []);
    return `
      <div class="linux-flow">
        ${flowNodes.map((node, index) => `
          <div class="linux-flow-node ${active.has(node.id) ? 'is-active' : ''}">
            <i class="fas ${node.icon}"></i>
            <span>${UI.esc(node.label)}</span>
          </div>
          ${index < flowNodes.length - 1 ? '<div class="linux-flow-arrow"><i class="fas fa-arrow-right"></i></div>' : ''}
        `).join('')}
      </div>`;
  };

  const renderCommandBreakdown = () => {
    const current = state.current;
    if (!current) {
      return '<div class="linux-breakdown"><strong>No command yet</strong><p>Run a guided step or playground command to see how the shell reads each word.</p></div>';
    }
    return `
      <div class="linux-breakdown">
        <strong>${UI.esc(current.cmd)}</strong>
        <p>${UI.esc(current.summary)}</p>
        <ul>${current.parse.map((part) => `<li>${UI.esc(part)}</li>`).join('')}</ul>
      </div>`;
  };

  const renderPlayground = () => `
    <section class="linux-panel">
      <div class="linux-panel-head">
        <span><i class="fas fa-keyboard"></i> Playground: ${UI.esc(topic.label)} commands</span>
        <small>Manual input uses demo data only. It does not touch your real computer.</small>
      </div>
      <div class="linux-terminal-window">
        <div class="linux-window-bar"><span></span><span></span><span></span><strong>safe demo terminal</strong></div>
        <div class="linux-terminal-output">${renderHistory()}</div>
        <div class="linux-input-row">
          <span class="linux-prompt">maya@linux:${UI.esc(state.cwd)}$</span>
          <input id="linuxCommandInput" class="linux-command-input" value="" placeholder="try: ${UI.esc(topic.playground[0] || 'pwd')}" onkeydown="linuxTerminalInputKey(event)">
          <button class="demo-btn success" onclick="linuxTerminalRunInput()">Run</button>
        </div>
      </div>
      <div class="linux-command-bank">
        ${topic.playground.map((cmd) => `
          <button class="demo-btn ${state.current?.cmd === cmd ? 'success' : ''}" onclick="linuxTerminalRunCommand('${UI.esc(cmd)}')">${UI.esc(cmd)}</button>
        `).join('')}
      </div>
    </section>`;

  const renderStage = () => `
    <div class="linux-demo">
      <div class="linux-topic-banner">
        <strong>${UI.esc(topic.label)} tab demo</strong>
        <span>Commands, guided steps, and playground buttons are filtered to match the navigation tab you are reading.</span>
      </div>
      ${renderGuidedDemo()}
      ${renderPlayground()}
      ${renderFlow()}
      <div class="linux-data-grid">
        <section>
          <h4><i class="fas fa-folder-tree"></i> Demo filesystem</h4>
          ${fileTree()}
        </section>
        <section>
          <h4><i class="fas fa-gears"></i> Demo process and port data</h4>
          ${processTable()}
        </section>
      </div>
      ${renderCommandBreakdown()}
    </div>`;

  const inspectorRows = () => {
    const current = state.current;
    return [
      ['Active tab', topic.label, 'Current Linux lesson subpage'],
      ['Current directory', state.cwd, 'Where relative paths start'],
      ['Last command', current?.cmd || 'none yet', 'The command most recently run'],
      ['Source', current?.source || 'none yet', 'Guided demo or playground'],
      ['Exit code', String(state.lastExit), '0 means success for most commands'],
      ['Beginner takeaway', current?.takeaway || 'Run a guided step or enter a command.', 'Plain-language meaning'],
    ];
  };

  const render = () => {
    UI.mount(container, {
      title: `Linux terminal: ${topic.label}`,
      hint: 'Use Guided demo for predefined command steps, then try the same topic manually in Playground.',
      stage: renderStage(),
      inspector: UI.inspector('What happened?', inspectorRows()),
      stats: [
        UI.statChip('tab', topic.label),
        UI.statChip('cwd', state.cwd),
        UI.statChip('exit', String(state.lastExit)),
      ].join(''),
      controls: `<button class="demo-btn danger" onclick="linuxTerminalReset()"><i class="fas fa-rotate"></i> Reset this tab demo</button>`,
      msgId: 'linuxTerminalMsg',
    });

    DS.showMsg(
      'linuxTerminalMsg',
      state.current?.takeaway || `This demo is scoped to the ${topic.label} tab. Start with the guided steps, then use the playground.`,
      state.lastExit === 0 ? 'info' : 'error',
    );
  };

  window.linuxTerminalRunCommand = (cmd) => run(cmd, 'Playground');

  window.linuxTerminalRunGuided = (index) => {
    const command = commandById[topic.guided[index]];
    if (!command) return;
    state.guidedIndex = index;
    run(command.cmd, 'Guided demo');
  };

  window.linuxTerminalNextGuided = () => {
    const nextIndex = Math.min(state.guidedIndex + 1, topic.guided.length - 1);
    window.linuxTerminalRunGuided(nextIndex);
  };

  window.linuxTerminalRunCurrentGuided = () => {
    window.linuxTerminalRunGuided(Math.max(0, state.guidedIndex));
  };

  window.linuxTerminalRunInput = () => {
    const input = document.getElementById('linuxCommandInput');
    run(input?.value, 'Playground');
  };

  window.linuxTerminalInputKey = (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    window.linuxTerminalRunInput();
  };

  window.linuxTerminalReset = () => {
    state = { ...initialState, history: [] };
    render();
  };

  render();
};
