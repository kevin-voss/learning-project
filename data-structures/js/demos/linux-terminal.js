window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.linuxTerminal = function (container) {
  const UI = DS.demoUI;
  const initialState = {
    cwd: '/home/maya/project',
    notesFile: false,
    deployExecutable: false,
    lastExit: 0,
    history: [],
    current: null,
  };
  let state = { ...initialState };

  const flowNodes = [
    { id: 'terminal', label: 'Terminal', icon: 'fa-terminal' },
    { id: 'shell', label: 'Shell', icon: 'fa-code' },
    { id: 'kernel', label: 'Kernel', icon: 'fa-microchip' },
    { id: 'files', label: 'Filesystem', icon: 'fa-folder-tree' },
    { id: 'processes', label: 'Processes', icon: 'fa-gears' },
    { id: 'network', label: 'Network', icon: 'fa-network-wired' },
    { id: 'output', label: 'Output', icon: 'fa-display' },
  ];

  const baseCommands = [
    {
      id: 'pwd',
      cmd: 'pwd',
      group: 'Navigate',
      summary: 'Print the current working directory.',
      parse: ['pwd = print working directory'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: (s) => s.cwd,
      effect: () => {},
      takeaway: 'pwd answers: where am I right now?',
    },
    {
      id: 'ls',
      cmd: 'ls',
      group: 'Navigate',
      summary: 'List visible files in the current directory.',
      parse: ['ls = list directory entries'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: (s) => {
        if (s.cwd.endsWith('/src')) return 'api.js  components  index.js';
        return `README.md  logs  package.json  scripts  src${s.notesFile ? '  notes' : ''}`;
      },
      effect: () => {},
      takeaway: 'ls asks the filesystem for names in the current folder.',
    },
    {
      id: 'ls-la',
      cmd: 'ls -la',
      group: 'Navigate',
      summary: 'List all files with permissions, owner, size, and timestamp.',
      parse: ['ls = list files', '-l = long details', '-a = include hidden files'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: (s) => {
        if (s.cwd.endsWith('/src')) {
          return [
            'drwxr-xr-x  4 maya dev   128 Jun  8 .',
            'drwxr-xr-x  8 maya dev   256 Jun  8 ..',
            '-rw-r--r--  1 maya dev   820 Jun  8 api.js',
            'drwxr-xr-x  3 maya dev    96 Jun  8 components',
            '-rw-r--r--  1 maya dev   410 Jun  8 index.js',
          ].join('\n');
        }
        return [
          'drwxr-xr-x  8 maya dev   256 Jun  8 .',
          'drwxr-xr-x  5 maya dev   160 Jun  8 ..',
          'drwxr-xr-x 12 maya dev   384 Jun  8 .git',
          '-rw-r--r--  1 maya dev   240 Jun  8 README.md',
          'drwxr-xr-x  3 maya dev    96 Jun  8 logs',
          '-rw-r--r--  1 maya dev   620 Jun  8 package.json',
          `-rw-r--r--  1 maya dev   118 Jun  8 scripts/deploy.sh${s.deployExecutable ? '  (now executable)' : ''}`,
          'drwxr-xr-x  4 maya dev   128 Jun  8 src',
          s.notesFile ? 'drwxr-xr-x  2 maya dev    64 Jun  8 notes' : '',
        ].filter(Boolean).join('\n');
      },
      effect: () => {},
      takeaway: 'The first column is permissions: directory/file, then read/write/execute bits.',
    },
    {
      id: 'cd-src',
      cmd: 'cd src',
      group: 'Navigate',
      summary: 'Change into the src directory.',
      parse: ['cd = change directory', 'src = relative path from the current folder'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.cwd = '/home/maya/project/src'; },
      takeaway: 'cd changes shell state. It does not print output when it succeeds.',
    },
    {
      id: 'cd-project',
      cmd: 'cd ~/project',
      group: 'Navigate',
      summary: 'Jump back to the project folder using the home shortcut.',
      parse: ['cd = change directory', '~ = home directory', 'project = folder inside home'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.cwd = '/home/maya/project'; },
      takeaway: '~ expands to your home directory before cd runs.',
    },
    {
      id: 'cat-readme',
      cmd: 'cat README.md',
      group: 'Read files',
      summary: 'Print a small text file.',
      parse: ['cat = concatenate/print file contents', 'README.md = file argument'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '# Learning Project\n\nRun npm install, then npm run dev.\nLogs are in logs/app.log.',
      effect: () => {},
      takeaway: 'cat is useful for short files. For long files, less is easier to read.',
    },
    {
      id: 'mkdir-touch',
      cmd: 'mkdir notes && touch notes/today.txt',
      group: 'Change files',
      summary: 'Create a directory, then create an empty file inside it.',
      parse: ['mkdir notes = create notes folder', '&& = run next command only if first succeeds', 'touch notes/today.txt = create empty file'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.notesFile = true; },
      takeaway: '&& chains commands safely: the second command runs only after the first succeeds.',
    },
    {
      id: 'grep-errors',
      cmd: 'grep ERROR logs/app.log',
      group: 'Search',
      summary: 'Search a log file for lines containing ERROR.',
      parse: ['grep = search text', 'ERROR = pattern', 'logs/app.log = file to search'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => [
        '2026-06-08T16:03:12Z ERROR api failed to connect to db',
        '2026-06-08T16:04:51Z ERROR retry exhausted for /api/profile',
      ].join('\n'),
      effect: () => {},
      takeaway: 'grep filters real text data so you can find important lines quickly.',
    },
    {
      id: 'ps-grep',
      cmd: 'ps aux | grep node',
      group: 'Processes',
      summary: 'List processes, then filter for node.',
      parse: ['ps aux = list processes', '| = pipe output into next command', 'grep node = keep lines containing node'],
      flow: ['terminal', 'shell', 'kernel', 'processes', 'output'],
      output: () => [
        'maya  4312  4.2  1.8  node server.js',
        'maya  4388  0.0  0.1  grep node',
      ].join('\n'),
      effect: () => {},
      takeaway: 'A pipe connects small tools: ps produces data, grep filters it.',
    },
    {
      id: 'lsof-port',
      cmd: 'lsof -i :3000',
      group: 'Processes',
      summary: 'Find which process is using local port 3000.',
      parse: ['lsof = list open files/connections', '-i :3000 = network port filter'],
      flow: ['terminal', 'shell', 'kernel', 'processes', 'network', 'output'],
      output: () => [
        'COMMAND  PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME',
        'node    4312  maya   22u  IPv4  80210      0t0  TCP *:3000 (LISTEN)',
      ].join('\n'),
      effect: () => {},
      takeaway: 'Ports belong to processes. This helps when a dev server says address already in use.',
    },
    {
      id: 'chmod',
      cmd: 'chmod +x scripts/deploy.sh',
      group: 'Permissions',
      summary: 'Add execute permission to a script.',
      parse: ['chmod = change mode/permissions', '+x = add execute bit', 'scripts/deploy.sh = target file'],
      flow: ['terminal', 'shell', 'kernel', 'files', 'output'],
      output: () => '',
      effect: (s) => { s.deployExecutable = true; },
      takeaway: 'Execute permission lets a file run as a program when its contents are valid.',
    },
    {
      id: 'curl-head',
      cmd: 'curl -I https://example.com',
      group: 'Network',
      summary: 'Ask a website for response headers only.',
      parse: ['curl = make network request', '-I = headers only', 'https://example.com = URL'],
      flow: ['terminal', 'shell', 'kernel', 'network', 'output'],
      output: () => [
        'HTTP/2 200',
        'content-type: text/html; charset=UTF-8',
        'cache-control: max-age=604800',
        'server: ECS',
      ].join('\n'),
      effect: () => {},
      takeaway: 'curl lets you inspect HTTP from the terminal without opening a browser.',
    },
    {
      id: 'exit-code',
      cmd: 'echo $?',
      group: 'Debug',
      summary: 'Print the previous command exit code.',
      parse: ['echo = print text', '$? = shell variable for last exit code'],
      flow: ['terminal', 'shell', 'output'],
      output: (s) => String(s.lastExit),
      effect: () => {},
      takeaway: 'Exit code 0 means success for most commands. Non-zero usually means failure.',
    },
  ];

  const commands = Object.fromEntries(baseCommands.map((command) => [command.cmd, command]));

  const unknownCommand = (cmd) => ({
    id: 'unknown',
    cmd,
    group: 'Error',
    summary: 'The simulated shell does not know this command yet.',
    parse: ['The shell tried to find a matching command name.', 'No matching program or demo command was available.'],
    flow: ['terminal', 'shell', 'output'],
    output: () => `${cmd}: command not found in this beginner playground\nTry: pwd, ls, ls -la, cd src, cat README.md, grep ERROR logs/app.log`,
    effect: () => {},
    takeaway: 'Real shells search PATH for commands. If nothing matches, you get command not found.',
    exitCode: 127,
  });

  const run = (rawCmd) => {
    const cmd = String(rawCmd || '').trim();
    if (!cmd) return;
    const command = commands[cmd] || unknownCommand(cmd);
    const promptCwd = state.cwd;
    command.effect(state);
    const exitCode = command.exitCode ?? 0;
    const output = command.output(state);
    state.lastExit = exitCode;
    state.current = command;
    state.history = [...state.history, { cmd, output, exitCode, cwd: promptCwd }].slice(-5);
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
    </div>`;

  const processTable = () => `
    <div class="linux-processes">
      <div><span>PID</span><span>Program</span><span>Port</span></div>
      <div><span>4312</span><span>node server.js</span><span>3000</span></div>
      <div><span>2201</span><span>postgres</span><span>5432</span></div>
      <div><span>91</span><span>sshd</span><span>22</span></div>
    </div>`;

  const renderHistory = () => {
    if (!state.history.length) {
      return '<div class="linux-terminal-empty">Choose a command below or type one into the playground.</div>';
    }
    return state.history.map((entry) => `
      <div class="linux-terminal-entry">
        <div><span class="linux-prompt">maya@linux:${UI.esc(entry.cwd)}$</span> ${UI.esc(entry.cmd)}</div>
        ${entry.output ? `<pre>${UI.esc(entry.output)}</pre>` : '<pre class="linux-muted">(success, no output)</pre>'}
      </div>
    `).join('');
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
      return '<div class="linux-breakdown"><strong>No command yet</strong><p>Pick a demo command to see how the shell reads each word.</p></div>';
    }
    return `
      <div class="linux-breakdown">
        <strong>${UI.esc(current.cmd)}</strong>
        <p>${UI.esc(current.summary)}</p>
        <ul>${current.parse.map((part) => `<li>${UI.esc(part)}</li>`).join('')}</ul>
      </div>`;
  };

  const renderStage = () => `
    <div class="linux-demo">
      <div class="linux-terminal-window">
        <div class="linux-window-bar"><span></span><span></span><span></span><strong>safe demo terminal</strong></div>
        <div class="linux-terminal-output">${renderHistory()}</div>
        <div class="linux-input-row">
          <span class="linux-prompt">maya@linux:${UI.esc(state.cwd)}$</span>
          <input id="linuxCommandInput" class="linux-command-input" value="" placeholder="try: ls -la" onkeydown="linuxTerminalInputKey(event)">
          <button class="demo-btn success" onclick="linuxTerminalRunInput()">Run</button>
        </div>
      </div>
      ${renderFlow()}
      <div class="linux-data-grid">
        <section>
          <h4><i class="fas fa-folder-tree"></i> Sample filesystem</h4>
          ${fileTree()}
        </section>
        <section>
          <h4><i class="fas fa-gears"></i> Sample process data</h4>
          ${processTable()}
        </section>
      </div>
      ${renderCommandBreakdown()}
    </div>`;

  const inspectorRows = () => {
    const current = state.current;
    return [
      ['Current directory', state.cwd, 'Where relative paths start'],
      ['Last command', current?.cmd || 'none yet', 'The command most recently run'],
      ['Exit code', String(state.lastExit), '0 means success for most commands'],
      ['Touched system', current?.flow?.filter((id) => !['terminal', 'shell', 'output'].includes(id)).join(', ') || 'none yet', 'Which computer layer the command interacted with'],
      ['Beginner takeaway', current?.takeaway || 'Pick a command to see what happens.', 'Plain-language meaning'],
    ];
  };

  const groupedControls = () => {
    const groups = ['Navigate', 'Read files', 'Change files', 'Search', 'Processes', 'Permissions', 'Network', 'Debug'];
    return `
      ${groups.map((group) => `
      <div class="linux-control-group">
        <span>${UI.esc(group)}</span>
        ${baseCommands.filter((command) => command.group === group).map((command) => `
          <button class="demo-btn ${state.current?.cmd === command.cmd ? 'success' : ''}" onclick="linuxTerminalRun('${command.id}')">${UI.esc(command.cmd)}</button>
        `).join('')}
      </div>
      `).join('')}
      <button class="demo-btn danger" onclick="linuxTerminalReset()"><i class="fas fa-rotate"></i> Reset playground</button>`;
  };

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'Linux command playground',
      hint: 'Run safe sample commands and watch the terminal output, command parsing, filesystem/process data, and OS flow update together.',
      stage: renderStage(),
      inspector: UI.inspector('What happened?', inspectorRows()),
      stats: [
        UI.statChip('cwd', state.cwd),
        UI.statChip('exit', String(state.lastExit)),
        UI.statChip('commands', String(state.history.length)),
      ].join(''),
      controls: groupedControls(),
      msgId: 'linuxTerminalMsg',
    });

    DS.showMsg('linuxTerminalMsg', state.current?.takeaway || 'Start with pwd, ls, or ls -la. This playground uses sample data and does not touch your real files.', state.lastExit === 0 ? 'info' : 'error');
  };

  window.linuxTerminalRun = (commandId) => {
    const command = baseCommands.find((item) => item.id === commandId);
    if (command) run(command.cmd);
  };

  window.linuxTerminalRunInput = () => {
    const input = document.getElementById('linuxCommandInput');
    run(input?.value);
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
