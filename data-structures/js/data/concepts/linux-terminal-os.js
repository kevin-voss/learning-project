window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'linux-terminal-os',
  category: 'Linux & Terminal',
  title: 'Linux, Terminal, OS, and Kernel Basics',
  icon: 'fa-terminal',
  number: '19',
  subtitle: 'Learn how Linux fits together, what the terminal is, and how common commands let you inspect and control a computer.',
  analogy: 'Linux is like a workshop. The kernel is the locked machine room, the shell is the front desk where you give instructions, commands are tools, files are labeled drawers, and permissions decide who can touch what.',
  realWorldExample: {
    title: 'Debugging a local web app',
    desc: 'A beginner starts a project, opens a terminal, moves into the project folder with cd, lists files with ls, reads logs, checks which process is using a port, edits permissions, and installs missing packages.',
  },
  whatIsIt: 'Linux is an operating system family used on servers, containers, developer machines, phones, routers, and cloud platforms. The operating system manages files, memory, hardware, users, permissions, processes, and networking. The kernel is the protected core that talks to hardware and manages running programs. The terminal is a text window where you type commands. The shell, such as bash or zsh, reads those commands and starts programs for you.',
  whyUse: 'Most backend, cloud, DevOps, security, and production debugging work eventually touches Linux. Learning terminal basics helps you understand project folders, run tools, inspect logs, install software, manage processes, connect to servers, and avoid dangerous copy-paste commands.',
  conceptSections: [
    { icon: 'fa-microchip', title: 'Kernel', desc: 'The kernel is the core of the OS. It controls CPU time, memory, devices, filesystems, and network traffic.', example: 'When a program reads a file, it asks the kernel for controlled access.' },
    { icon: 'fa-layer-group', title: 'Operating system', desc: 'The OS includes the kernel plus user tools, services, libraries, permissions, and file layout.', example: 'Ubuntu, Debian, Fedora, and Arch are Linux distributions with different package choices.' },
    { icon: 'fa-terminal', title: 'Terminal and shell', desc: 'The terminal is the window. The shell is the program inside it that interprets commands.', example: 'On macOS you may use zsh. On many Linux servers you may use bash.' },
    { icon: 'fa-folder-tree', title: 'Filesystem', desc: 'Linux stores everything in one directory tree starting at /. Disks, config, logs, apps, and users all appear somewhere in that tree.', example: '/home/maya stores user files. /etc stores many system configuration files.' },
    { icon: 'fa-user-lock', title: 'Users and permissions', desc: 'Linux decides whether a user can read, write, or execute each file.', example: 'chmod changes permission bits. sudo runs one command with elevated privileges when allowed.' },
    { icon: 'fa-gears', title: 'Processes and services', desc: 'A process is a running program. A service is usually a background process managed by the system.', example: 'ps shows processes. systemctl manages many services on modern Linux systems.' },
  ],
  conceptFlow: ['You type a command', 'Shell parses words and options', 'Shell starts a program', 'Program asks kernel for files, memory, or network', 'Kernel checks permissions', 'Output returns to terminal'],
  mermaidDiagram: `flowchart TB
  User[Beginner at keyboard] --> Terminal[Terminal window]
  Terminal --> Shell[Shell: bash or zsh]
  Shell --> Command[Command program]
  Command --> Kernel[Linux kernel]
  Kernel --> Files[Filesystem]
  Kernel --> CPU[CPU and memory]
  Kernel --> Network[Network devices]
  Kernel --> Terminal`,
  demoType: 'linux-terminal',
  demoTitle: 'Command playground',
  demoHint: 'Run safe demo commands against sample files, processes, logs, and network data while the OS flow explains what happened.',
  demoSteps: [
    { label: 'Type command', detail: 'You enter ls -la in a terminal.', result: 'The shell receives text and prepares to run a program.' },
    { label: 'Parse command', detail: 'The shell separates the command name, options, and arguments.', result: 'ls is the program, -la are options, and the current folder is the target.' },
    { label: 'Ask kernel', detail: 'The ls program asks the kernel to read directory entries.', result: 'The kernel checks permissions and reads filesystem data.' },
    { label: 'Print output', detail: 'ls writes names, sizes, owners, and permission bits to standard output.', result: 'The terminal displays the command result as text.' },
  ],
  whenToUse: [
    { icon: 'fa-folder-open', title: 'Project navigation', desc: 'Move around folders, inspect files, and understand where tools run.' },
    { icon: 'fa-bug', title: 'Debugging', desc: 'Read logs, check processes, inspect ports, and verify environment variables.' },
    { icon: 'fa-cloud', title: 'Servers and containers', desc: 'Most production servers and Docker images are Linux-based.' },
    { icon: 'fa-shield-halved', title: 'Security awareness', desc: 'Permissions, ownership, sudo, and PATH affect what code can do.' },
  ],
  codeTitle: 'First Terminal Commands',
  codeLanguage: 'Shell',
  codeText: `pwd                  # print the folder you are currently in
ls                   # list files in the current folder
ls -la               # list all files with details, including hidden files
cd ~/Projects        # move into the Projects folder inside your home directory
mkdir practice       # create a folder
touch notes.txt      # create an empty file, or update its timestamp
echo "hello" > notes.txt
cat notes.txt        # print a small file to the terminal`,
  pros: [
    'Gives direct control over files, processes, tools, and servers',
    'Works over remote connections where no graphical interface exists',
    'Makes automation possible because commands can be saved in scripts',
  ],
  cons: [
    'Commands can be destructive when used carelessly',
    'Error messages are often terse until you learn the vocabulary',
    'Different Linux distributions and shells can have small differences',
  ],
  keywords: ['linux', 'terminal', 'shell', 'kernel', 'command', 'permissions', 'process', 'pipe', 'sudo', 'ssh', 'grep', 'chmod', 'signal'],
  checklist: [
    'Explain the difference between terminal, shell, OS, and kernel.',
    'Navigate folders with pwd, ls, and cd.',
    'Describe what options, arguments, pipes, redirects, and exit codes mean.',
    'Read basic permissions like rwxr-xr-x.',
    'Use safe habits before running rm, sudo, curl-piped scripts, or chmod recursively.',
  ],
  subPages: [
    { id: 'overview', label: 'Overview' },
    {
      id: 'os-kernel-shell',
      label: 'OS, Kernel, Shell',
      title: 'OS, Kernel, Terminal, and Shell',
      subtitle: 'Separate the layers before memorizing commands.',
      body: 'Beginners often mix these words together. The operating system is the whole environment that manages the computer. The kernel is the protected core of that system. The terminal is the text window. The shell is the command interpreter running inside the terminal. A command is usually a separate program the shell starts.',
      realWorldExample: {
        title: 'Running node --version',
        desc: 'The terminal shows your text. The shell finds the node program. The OS starts a process. The kernel gives it CPU time and returns the version text to the terminal.',
      },
      conceptSections: [
        { icon: 'fa-desktop', title: 'Terminal', desc: 'A terminal displays text input and output.', example: 'Terminal.app, iTerm2, GNOME Terminal, and VS Code terminals are terminal apps.' },
        { icon: 'fa-code', title: 'Shell', desc: 'A shell reads your command line, expands variables, handles pipes and redirects, then starts programs.', example: 'bash, zsh, fish, and sh are shells.' },
        { icon: 'fa-box', title: 'Command', desc: 'A command is usually an executable program plus options and arguments.', example: 'ls -la /tmp runs ls with option -la and target /tmp.' },
        { icon: 'fa-microchip', title: 'Kernel', desc: 'The kernel handles low-level requests that normal programs cannot do directly.', example: 'Opening files, allocating memory, and sending packets go through the kernel.' },
      ],
      mermaidDiagram: `flowchart LR
  Terminal[Terminal app] --> Shell[Shell]
  Shell --> Program[Command program]
  Program --> Kernel[Kernel system calls]
  Kernel --> Hardware[Hardware and files]`,
      codeTitle: 'Know Your Shell',
      codeLanguage: 'Shell',
      codeText: `echo $SHELL          # path to your default shell
echo $0              # shell currently running this session
uname -a             # kernel and system information
whoami               # current username
hostname             # computer or server name
date                 # current date and time`,
      checklist: ['Point to the terminal, shell, command, OS, and kernel in one example.', 'Run uname, whoami, hostname, and date and explain the output.'],
    },
    {
      id: 'filesystem-navigation',
      label: 'Filesystem',
      title: 'Filesystem Navigation',
      subtitle: 'Learn where you are, where files live, and how paths work.',
      body: 'Linux has one filesystem tree that starts at /. Your current working directory is the folder commands use when you give a relative path. Absolute paths start at /. Relative paths start from where you are now. The home shortcut ~ points to your user folder.',
      realWorldExample: {
        title: 'Finding a project',
        desc: 'A developer opens a terminal, uses pwd to see the current directory, cd to move into a project, ls to inspect files, and code . to open the folder in the editor.',
      },
      conceptSections: [
        { icon: 'fa-location-dot', title: 'Current working directory', desc: 'The folder your shell is currently inside.', example: 'pwd prints it.' },
        { icon: 'fa-route', title: 'Absolute path', desc: 'A full path from the root directory.', example: '/Users/maya/Projects/app or /home/maya/app.' },
        { icon: 'fa-shoe-prints', title: 'Relative path', desc: 'A path from your current folder.', example: './src means src inside the current folder. ../ means the parent folder.' },
        { icon: 'fa-eye-slash', title: 'Hidden files', desc: 'Files starting with a dot are hidden by default.', example: '.git, .env, and .config are common hidden names.' },
      ],
      codeTitle: 'Navigation Commands',
      codeLanguage: 'Shell',
      codeText: `pwd                  # show current working directory
ls                   # list visible files
ls -la               # list visible and hidden files with details
cd /                 # go to filesystem root
cd ~                 # go to your home directory
cd ..                # go up one folder
cd -                 # jump back to previous folder
tree -L 2            # show folder tree two levels deep, if tree is installed`,
      checklist: ['Explain /, ~, ., and ../.', 'Use cd with absolute and relative paths.', 'Find hidden files with ls -la.'],
    },
    {
      id: 'files-directories',
      label: 'Files',
      title: 'Files and Directories',
      subtitle: 'Create, copy, move, inspect, and remove files carefully.',
      body: 'Many terminal tasks are file tasks. Commands normally follow a pattern: command, options, then arguments. Some commands read files. Some create files. Some move or delete them. Deleting with rm usually does not use a trash bin, so beginners should slow down before pressing Enter.',
      realWorldExample: {
        title: 'Creating a notes folder',
        desc: 'You create a folder, add a note, copy it as a backup, rename it, inspect the contents, then remove the backup when you are sure it is not needed.',
      },
      conceptSections: [
        { icon: 'fa-plus', title: 'Create', desc: 'mkdir creates directories. touch creates empty files or updates timestamps.', example: 'mkdir logs creates a logs directory.' },
        { icon: 'fa-copy', title: 'Copy', desc: 'cp copies files. cp -r copies directories recursively.', example: 'cp app.log app.log.bak creates a backup copy.' },
        { icon: 'fa-arrow-right', title: 'Move or rename', desc: 'mv moves files and also renames them.', example: 'mv old.txt new.txt renames a file.' },
        { icon: 'fa-trash', title: 'Remove', desc: 'rm deletes files. rm -r deletes directories and their contents.', example: 'rm -i asks before deleting each file.' },
      ],
      codeTitle: 'File Commands',
      codeLanguage: 'Shell',
      codeText: `mkdir notes                  # create a directory
touch notes/today.txt        # create an empty file
echo "Learn Linux" >> notes/today.txt
cat notes/today.txt          # print a small file
less notes/today.txt         # page through a larger file, press q to quit
cp notes/today.txt notes/backup.txt
mv notes/backup.txt notes/yesterday.txt
rm -i notes/yesterday.txt    # safer delete: ask before removing
rm -r old-folder             # recursive delete. Double-check path first`,
      checklist: ['Create and inspect a folder safely.', 'Explain why rm -r deserves caution.', 'Use less for larger files instead of dumping everything at once.'],
    },
    {
      id: 'commands-options-help',
      label: 'Commands',
      title: 'Commands, Options, Arguments, and Help',
      subtitle: 'Read commands instead of memorizing them blindly.',
      body: 'A command line is made of words. The first word is the program name. Options modify behavior. Arguments tell the command what to act on. Short options often start with one dash. Long options often start with two dashes. Help pages explain what a command accepts.',
      conceptSections: [
        { icon: 'fa-terminal', title: 'Command name', desc: 'The program the shell should run.', example: 'grep, git, node, python, ls, and curl are command names.' },
        { icon: 'fa-sliders', title: 'Options', desc: 'Flags that change behavior.', example: 'ls -la uses -l for long output and -a for all files.' },
        { icon: 'fa-bullseye', title: 'Arguments', desc: 'Targets or values passed to the program.', example: 'grep "error" app.log passes a pattern and a file.' },
        { icon: 'fa-circle-question', title: 'Help', desc: 'Most commands provide --help or manual pages.', example: 'man ls opens the manual. Press q to quit.' },
      ],
      codeTitle: 'Read Command Help',
      codeLanguage: 'Shell',
      codeText: `ls --help             # quick help, common on Linux
man ls                # full manual page, press q to exit
tldr tar              # simpler examples, if tldr is installed
which node            # show which executable will run
type cd               # tell whether a command is built into the shell
command -v git        # portable way to check if a command exists`,
      checklist: ['Identify command, options, and arguments in ls -la /tmp.', 'Use --help or man before guessing dangerous options.', 'Explain why cd is a shell builtin.'],
    },
    {
      id: 'pipes-redirects-exit-codes',
      label: 'Pipes',
      title: 'Pipes, Redirects, and Exit Codes',
      subtitle: 'Connect small tools together and understand success or failure.',
      body: 'Linux commands usually read from standard input, write normal output to standard output, and write errors to standard error. A pipe sends the output of one command into another command. Redirects write output to files or read input from files. An exit code is a number returned when a command finishes: 0 usually means success, non-zero means something failed or produced a special condition.',
      conceptSections: [
        { icon: 'fa-right-long', title: 'Pipe', desc: 'Send stdout from one command into stdin of another command.', example: 'ps aux | grep node searches process output for node.' },
        { icon: 'fa-file-arrow-down', title: 'Redirect output', desc: '> writes output to a file. >> appends to a file.', example: 'echo hello > hello.txt creates or replaces the file.' },
        { icon: 'fa-triangle-exclamation', title: 'stderr', desc: 'Errors are separate from normal output so scripts can handle them differently.', example: '2> errors.log saves error output.' },
        { icon: 'fa-circle-check', title: 'Exit code', desc: 'The shell stores the last command result in $?.', example: '0 means success in most Unix-style tools.' },
      ],
      codeTitle: 'Pipes and Redirects',
      codeLanguage: 'Shell',
      codeText: `echo "hello" > message.txt       # write, replacing file contents
echo "again" >> message.txt      # append
cat message.txt | wc -l          # count lines from command output
grep "ERROR" app.log > errors.txt
grep "ERROR" missing.log 2> grep-errors.txt
echo $?                          # exit code from the previous command
curl -I https://example.com | head`,
      checklist: ['Explain stdin, stdout, and stderr.', 'Use a pipe to filter command output.', 'Check an exit code with echo $?.'],
    },
    {
      id: 'permissions-users-sudo',
      label: 'Permissions',
      title: 'Users, Permissions, and sudo',
      subtitle: 'Understand who can read, write, and execute files.',
      body: 'Linux permissions protect files and programs. Each file has an owner, a group, and permission bits for user, group, and others. Read means view content. Write means change content. Execute means run a file as a program or enter a directory. sudo runs a command with elevated privileges if your user is allowed.',
      realWorldExample: {
        title: 'Script will not run',
        desc: 'You downloaded a script but ./deploy.sh says Permission denied. ls -l shows it is not executable. chmod +x deploy.sh adds execute permission for appropriate users.',
      },
      conceptSections: [
        { icon: 'fa-eye', title: 'Read', desc: 'Allows viewing file contents or listing a directory.', example: 'r in rw-r--r-- means read is allowed.' },
        { icon: 'fa-pen', title: 'Write', desc: 'Allows changing a file or creating/removing entries in a directory.', example: 'w in rw-r--r-- means the owner can edit.' },
        { icon: 'fa-play', title: 'Execute', desc: 'Allows running a file or entering a directory.', example: 'x in rwxr-xr-x means executable or searchable.' },
        { icon: 'fa-user-shield', title: 'sudo', desc: 'Runs one command with admin-level privileges after authentication.', example: 'sudo apt update updates package lists on Debian/Ubuntu.' },
      ],
      codeTitle: 'Permission Commands',
      codeLanguage: 'Shell',
      codeText: `ls -l deploy.sh       # inspect permissions, owner, and group
chmod +x deploy.sh    # add executable permission
./deploy.sh           # run script in current directory
chown maya app.log    # change owner, usually needs sudo
groups                # show groups for current user
sudo -v               # refresh sudo authentication without running another command
sudo !!               # rerun previous command with sudo. Inspect it first`,
      checklist: ['Read rwxr-xr-x as user/group/other permissions.', 'Explain why sudo should be used sparingly.', 'Know that chmod 777 is usually a bad fix.'],
    },
    {
      id: 'processes-services',
      label: 'Processes',
      title: 'Processes, Jobs, and Services',
      subtitle: 'See what is running and stop the right thing.',
      body: 'Every running program is a process with a PID. Shells can also manage foreground and background jobs. Servers often run as services supervised by the operating system. When debugging, you often need to find a process, inspect resource usage, or stop a process cleanly.',
      conceptSections: [
        { icon: 'fa-fingerprint', title: 'PID', desc: 'A process ID uniquely identifies a running process at that moment.', example: 'kill 12345 sends a signal to PID 12345.' },
        { icon: 'fa-chart-line', title: 'Resource usage', desc: 'Commands can show CPU and memory use.', example: 'top or htop shows active processes.' },
        { icon: 'fa-hand', title: 'Signals', desc: 'Signals ask processes to stop, reload, or terminate.', example: 'SIGTERM asks nicely. SIGKILL forces termination.' },
        { icon: 'fa-rotate', title: 'Service manager', desc: 'systemd manages many Linux services through systemctl.', example: 'systemctl status nginx shows web server status.' },
      ],
      codeTitle: 'Process Commands',
      codeLanguage: 'Shell',
      codeText: `ps aux | head                  # list processes
ps aux | grep node             # search for node processes
top                            # live process viewer, press q to quit
kill 12345                     # ask process to terminate
kill -9 12345                  # force kill. Use only when normal kill fails
jobs                           # jobs started from current shell
fg                             # bring background job to foreground
systemctl status nginx         # service status on systemd Linux`,
      checklist: ['Find a running process by name.', 'Explain the difference between normal kill and kill -9.', 'Use systemctl status when a service is managed by systemd.'],
    },
    {
      id: 'networking-terminal',
      label: 'Networking',
      title: 'Networking from the Terminal',
      subtitle: 'Check connectivity, DNS, ports, and HTTP responses.',
      body: 'Terminal networking commands help you answer practical questions: can I reach this host, what IP does the name resolve to, which port is open, what HTTP status is returned, and which local process is listening?',
      conceptSections: [
        { icon: 'fa-globe', title: 'DNS lookup', desc: 'Resolve a domain name to addresses.', example: 'dig example.com shows DNS answers.' },
        { icon: 'fa-plug', title: 'Ports', desc: 'A port is a numbered doorway for network traffic.', example: 'Web servers often listen on 80, 443, 3000, or 8080.' },
        { icon: 'fa-arrows-left-right', title: 'HTTP check', desc: 'curl can show headers, bodies, and status details.', example: 'curl -I shows response headers only.' },
        { icon: 'fa-satellite-dish', title: 'Connectivity', desc: 'ping and traceroute help inspect network reachability, though some networks block them.', example: 'ping example.com sends test packets.' },
      ],
      codeTitle: 'Networking Commands',
      codeLanguage: 'Shell',
      codeText: `ping example.com              # basic reachability test
dig example.com               # DNS lookup, if dig is installed
curl -I https://example.com   # show HTTP response headers
curl -v https://example.com   # verbose connection details
ss -ltnp                      # listening TCP ports on Linux
lsof -i :3000                 # process using port 3000, common on macOS too
ssh user@server.example.com   # open a remote shell over SSH`,
      checklist: ['Use curl -I to inspect HTTP headers.', 'Find what is using a local port.', 'Explain why SSH gives you a shell on another machine.'],
    },
    {
      id: 'packages-environment',
      label: 'Packages',
      title: 'Packages, PATH, and Environment Variables',
      subtitle: 'Know where commands come from and how programs get configuration.',
      body: 'A package manager installs, updates, and removes software. Different systems use different managers: apt on Debian/Ubuntu, dnf on Fedora, pacman on Arch, brew on macOS. PATH is an environment variable listing directories where the shell searches for commands. Environment variables are key-value settings inherited by programs.',
      conceptSections: [
        { icon: 'fa-box-open', title: 'Package manager', desc: 'Installs and updates software from trusted repositories.', example: 'apt install curl installs curl on Debian/Ubuntu.' },
        { icon: 'fa-map-location-dot', title: 'PATH', desc: 'A colon-separated list of directories searched for executable commands.', example: 'If node is in /usr/local/bin and that folder is in PATH, node can run by name.' },
        { icon: 'fa-sliders', title: 'Environment variable', desc: 'A named value passed to commands and child processes.', example: 'NODE_ENV=production changes app behavior.' },
        { icon: 'fa-file-shield', title: 'Secrets', desc: 'Sensitive values should not be committed into Git.', example: 'API keys belong in secure local files or secret managers.' },
      ],
      codeTitle: 'Package and Environment Commands',
      codeLanguage: 'Shell',
      codeText: `echo $PATH                    # directories searched for commands
which git                     # path to git executable
env | sort                    # show environment variables
export NODE_ENV=development   # set variable for this shell session
NODE_ENV=test npm test        # set variable for one command
sudo apt update               # Debian/Ubuntu: refresh package lists
sudo apt install curl         # Debian/Ubuntu: install curl
brew install wget             # macOS Homebrew example`,
      checklist: ['Explain why command not found can be a PATH issue.', 'Set an environment variable for one command.', 'Know which package manager your system uses.'],
    },
    {
      id: 'safe-practice',
      label: 'Safety',
      title: 'Safe Terminal Habits',
      subtitle: 'Move fast only after you know what a command will touch.',
      body: 'The terminal is powerful because commands can change many files quickly. That also means mistakes can be expensive. Beginners should build a habit of reading commands, checking the current folder, previewing matches, and using safer flags before destructive actions.',
      conceptSections: [
        { icon: 'fa-location-crosshairs', title: 'Check location', desc: 'Run pwd before commands that create, move, or delete lots of files.', example: 'Deleting from the wrong folder is a common beginner mistake.' },
        { icon: 'fa-magnifying-glass', title: 'Preview first', desc: 'List files before deleting or changing them.', example: 'ls *.log before rm *.log.' },
        { icon: 'fa-hand-paper', title: 'Interactive mode', desc: 'Some commands support -i to ask before each change.', example: 'rm -i file.txt asks before deleting.' },
        { icon: 'fa-triangle-exclamation', title: 'Beware copied commands', desc: 'Understand commands involving sudo, rm -rf, chmod -R, curl | sh, or unknown scripts.', example: 'curl URL | sh downloads code and runs it immediately.' },
      ],
      codeTitle: 'Safer Patterns',
      codeLanguage: 'Shell',
      codeText: `pwd                         # confirm where you are
ls                           # inspect current folder
ls *.log                     # preview matches before deleting
rm -i old.log                # ask before delete
mv important.txt backup.txt  # rename instead of deleting when unsure
chmod -R u+rw project        # recursive permission change. Verify target first
curl -fsSL https://example.com/install.sh -o install.sh
less install.sh              # inspect downloaded script before running it`,
      checklist: ['Pause before sudo, rm -rf, chmod -R, and curl | sh.', 'Preview wildcard matches before changing files.', 'Inspect downloaded scripts before running them.'],
    },
  ],
});
