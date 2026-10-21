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
  const commandList = DS.linuxTerminalCommands || [];
  const commands = Object.fromEntries(commandList.map((command) => [command.cmd, command]));
  const commandById = Object.fromEntries(commandList.map((command) => [command.id, command]));

  // One entry per sub-lesson id in js/data/tools/linux-terminal-os.js.
  const topics = {
    overview: {
      label: 'First commands',
      intro: 'Type a word, press Enter, read the answer.',
      guided: ['whoami', 'date', 'pwd'],
      playground: ['whoami', 'date', 'pwd', 'hostname'],
    },
    'filesystem-navigation': {
      label: 'Where am I?',
      intro: 'Find out where you are, look around and walk between folders.',
      guided: ['pwd', 'ls', 'cd-src', 'pwd', 'cd-up', 'pwd'],
      playground: ['pwd', 'ls', 'cd src', 'cd ..', 'cd ~', 'cd ~/project', 'cd /', 'ls -la'],
    },
    'files-directories': {
      label: 'Files',
      intro: 'Make a folder and a file, copy, rename and delete safely.',
      guided: ['pwd', 'mkdir-notes', 'touch-note', 'cp-note', 'mv-note', 'rm-note'],
      playground: ['pwd', 'ls', 'mkdir notes', 'touch notes/today.txt', 'echo "Learn Linux" >> notes/today.txt', 'cat README.md', 'cp notes/today.txt notes/backup.txt', 'mv notes/backup.txt notes/yesterday.txt', 'rm -i notes/yesterday.txt'],
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
    'os-kernel-shell': {
      label: 'OS, Kernel, Shell',
      intro: 'Focus on commands that reveal shell, user, host, and kernel information.',
      guided: ['echo-shell', 'echo-zero', 'uname', 'whoami', 'date'],
      playground: ['echo $SHELL', 'echo $0', 'uname -a', 'whoami', 'hostname', 'date'],
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
