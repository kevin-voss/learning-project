window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

// The terminal. Sub-lessons 1-3 are the basics for step 3 of the path.
// Everything after them is "Deeper: ..." to come back to later.
// Sub-lesson ids are also keys in the playground demo (js/demos/web-infra/web/linux-terminal/terminal.js).
DS.curriculum.push({
  id: 'linux-terminal-os',
  category: 'Start Here',
  title: 'The Terminal',
  icon: 'fa-terminal',
  subtitle: 'Talk to your computer by typing short commands.',
  demoType: 'linux-terminal',
  demoTitle: 'Safe practice terminal',
  demoHint: 'Click a command or type one. This terminal is pretend: it cannot change your real computer.',
  keywords: ['terminal', 'shell', 'command', 'folder', 'path'],
  relatedIds: ['git-collaboration'],
  subPages: [
    {
      id: 'overview',
      label: 'What is a terminal?',
      title: 'What is a terminal?',
      analogy: 'Normally you click on pictures to tell the computer what to do. A terminal is like texting your computer instead. You type a short message, press Enter, and the computer writes back.',
      whatIsIt: 'The terminal is a window where you type commands. A command is one word, sometimes with extra words after it. Press Enter to run it. The text that comes back is called output. The program inside the window that reads your commands is called the shell.',
      realWorldExample: {
        title: 'Where to find it',
        desc: 'On a Mac: open the app "Terminal". On Linux: open "Terminal". On Windows: open "Git Bash" (comes with Git) or PowerShell. The commands in this lesson work in all of them.',
      },
      codeTitle: 'Your first commands',
      codeLanguage: 'Shell',
      codeText: `whoami     # who am I? prints your user name
date       # what time is it?
pwd        # where am I? prints the folder you are in`,
      tryIt: {
        steps: [
          'Click "whoami" in the practice terminal below.',
          'Click "date".',
          'Now open the real terminal on your computer and type whoami, then press Enter.',
        ],
        result: 'Your own user name, printed on the next line.',
      },
      checklist: [
        'You can open a terminal on your computer.',
        'You can type a command, press Enter and read the output.',
        'You can say in one sentence what a terminal is.',
      ],
      check: [
        { q: 'What do you press to run a command?', a: 'Enter.' },
        { q: 'What is the text that a command prints back called?', a: 'Output.' },
      ],
    },
    {
      id: 'filesystem-navigation',
      label: 'Where am I? pwd, ls, cd',
      title: 'Where am I? pwd, ls and cd',
      analogy: 'Your computer is a big house of folders. Folders sit inside folders, like rooms inside a house. The terminal always stands in one room. pwd tells you which room. ls shows what is in the room. cd walks you to another room.',
      whatIsIt: 'pwd prints the folder you are in. ls lists the files and folders in it. cd name walks into a folder. cd .. walks back out to the folder above. cd ~ takes you home, to your own user folder.',
      codeTitle: 'Walk around',
      codeLanguage: 'Shell',
      codeText: `pwd          # /home/maya/project
ls           # README.md  logs  src
cd src       # walk into the src folder
pwd          # /home/maya/project/src
cd ..        # walk back out
cd ~         # go home`,
      tryIt: {
        steps: [
          'In the practice terminal, click pwd.',
          'Click cd src, then pwd again.',
          'Click cd .. and pwd once more.',
        ],
        result: 'The folder name gets longer after cd src and shorter again after cd ..',
      },
      checklist: [
        'You can find out where you are with pwd.',
        'You can see what is in a folder with ls.',
        'You can move into a folder and back out with cd and cd ..',
      ],
      check: [
        { q: 'You are in /home/maya. You type cd project. Where are you now?', a: 'In /home/maya/project.' },
        { q: 'Which command shows the files in the current folder?', a: 'ls.' },
        { q: 'What does cd .. do?', a: 'It moves you one folder up, to the folder that holds the one you are in.' },
      ],
    },
    {
      id: 'files-directories',
      label: 'Make, copy, move, delete',
      title: 'Make, copy, move and delete files safely',
      analogy: 'Folders are boxes and files are sheets of paper. mkdir builds a new box. touch puts an empty sheet in. cp makes a photocopy. mv moves a sheet or writes a new name on it. rm shreds it: there is no bin to get it back.',
      whatIsIt: 'mkdir makes a folder. touch makes an empty file. cp copies a file. mv moves or renames it. rm deletes it for good. Safe habit: run pwd and ls first, so you know where you are and what is there. Use rm -i: it asks "are you sure?" before deleting.',
      codeTitle: 'Make a notes folder',
      codeLanguage: 'Shell',
      codeText: `mkdir notes                        # make a folder
touch notes/today.txt              # make an empty file
cp notes/today.txt notes/copy.txt  # photocopy it
mv notes/copy.txt notes/old.txt    # rename it
ls notes                           # today.txt  old.txt
rm -i notes/old.txt                # delete, but ask first`,
      tryIt: {
        steps: [
          'In the practice terminal, click mkdir notes, then touch notes/today.txt.',
          'Click cp, then mv, and look at the demo filesystem after each one.',
          'Click rm -i notes/yesterday.txt.',
        ],
        result: 'New files appear in the demo filesystem, then the renamed copy disappears again.',
      },
      checklist: [
        'You can make a folder and a file with mkdir and touch.',
        'You can copy, rename and move a file with cp and mv.',
        'You check with pwd and ls before you delete, and you know rm has no bin.',
      ],
      check: [
        { q: 'How do you rename a.txt to b.txt?', a: 'mv a.txt b.txt. Moving a file to a new name renames it.' },
        { q: 'Why is rm dangerous?', a: 'It deletes at once. There is no bin to get the file back.' },
        { q: 'What two commands should you run before deleting files?', a: 'pwd (where am I?) and ls (what is here?).' },
      ],
    },
    {
      id: 'commands-options-help',
      label: 'Deeper: options and help',
      title: 'Deeper: options, arguments and help',
      whatIsIt: 'A command line is made of words. The first word is the program. Options change how it works. They start with - or --. Arguments say what to work on. In ls -la /tmp, ls is the program, -la are options and /tmp is the argument. Use --help or man to read about a command before you guess.',
      conceptSections: [
        { icon: 'fa-terminal', title: 'Command name', desc: 'The program the shell should run.', example: 'ls, git, node, curl.' },
        { icon: 'fa-sliders', title: 'Options', desc: 'Flags that change behavior.', example: '-l for long output, -a for all files.' },
        { icon: 'fa-bullseye', title: 'Arguments', desc: 'What the program works on.', example: 'grep "error" app.log: a pattern and a file.' },
        { icon: 'fa-circle-question', title: 'Help', desc: 'Most commands explain themselves.', example: 'man ls opens the manual. Press q to quit.' },
      ],
      codeTitle: 'Read command help',
      codeLanguage: 'Shell',
      codeText: `ls --help             # quick help
man ls                # full manual, press q to exit
which node            # where the node program lives
type cd               # cd is built into the shell`,
      checklist: ['Name the command, options and argument in ls -la /tmp.', 'Use --help or man before guessing an option.'],
    },
    {
      id: 'pipes-redirects-exit-codes',
      label: 'Deeper: pipes and redirects',
      title: 'Deeper: pipes, redirects and exit codes',
      whatIsIt: 'A pipe | sends the output of one command into the next command. > writes output into a file (and replaces it). >> adds to the end of a file. Every command also ends with an exit code: 0 means it worked, any other number means something went wrong. echo $? prints the last exit code.',
      conceptSections: [
        { icon: 'fa-right-long', title: 'Pipe', desc: 'Output of one command becomes input of the next.', example: 'ps aux | grep node' },
        { icon: 'fa-file-arrow-down', title: 'Redirect', desc: '> replaces a file. >> appends.', example: 'echo hello > hello.txt' },
        { icon: 'fa-triangle-exclamation', title: 'Errors', desc: 'Errors go to a separate stream called stderr.', example: '2> errors.log saves only errors.' },
        { icon: 'fa-circle-check', title: 'Exit code', desc: '0 means success.', example: 'echo $?' },
      ],
      codeTitle: 'Pipes and redirects',
      codeLanguage: 'Shell',
      codeText: `echo "hello" > message.txt     # write (replace)
echo "again" >> message.txt    # append
cat message.txt | wc -l        # count lines: 2
grep "ERROR" app.log > errors.txt
echo $?                        # 0 means the last command worked`,
      checklist: ['Use a pipe to filter output.', 'Explain > vs >>.', 'Check an exit code with echo $?.'],
    },
    {
      id: 'permissions-users-sudo',
      label: 'Deeper: permissions and sudo',
      title: 'Deeper: users, permissions and sudo',
      whatIsIt: 'Every file has an owner and three kinds of permission: read (r), write (w) and execute (x, run it as a program). ls -l shows them, for example rwxr-xr-x: the owner may do everything, everyone else may read and run. chmod changes them. sudo runs one command as the admin. Use it rarely, and only when you know why.',
      conceptSections: [
        { icon: 'fa-eye', title: 'Read', desc: 'Look at the content.', example: 'r' },
        { icon: 'fa-pen', title: 'Write', desc: 'Change the content.', example: 'w' },
        { icon: 'fa-play', title: 'Execute', desc: 'Run a file, or enter a folder.', example: 'x' },
        { icon: 'fa-user-shield', title: 'sudo', desc: 'Run one command with admin rights.', example: 'sudo apt update' },
      ],
      codeTitle: 'Permission commands',
      codeLanguage: 'Shell',
      codeText: `ls -l deploy.sh       # -rw-r--r--  not runnable yet
chmod +x deploy.sh    # add execute permission
./deploy.sh           # now it runs
groups                # groups your user belongs to`,
      checklist: ['Read rwxr-xr-x as owner / group / others.', 'Explain why chmod 777 is a bad fix.', 'Explain why sudo should be rare.'],
    },
    {
      id: 'processes-services',
      label: 'Deeper: processes and signals',
      title: 'Deeper: processes, signals and services',
      whatIsIt: 'Every running program is a process with a number, the PID. ps lists processes. kill PID asks a process to stop (a signal called SIGTERM). kill -9 forces it (SIGKILL), only if the polite way fails. A service is a process the system keeps running in the background. On most Linux servers, systemctl starts, stops and checks services.',
      conceptSections: [
        { icon: 'fa-fingerprint', title: 'PID', desc: 'The number of a running process.', example: 'kill 4312' },
        { icon: 'fa-chart-line', title: 'Resource use', desc: 'See CPU and memory per process.', example: 'top, press q to quit' },
        { icon: 'fa-hand', title: 'Signals', desc: 'Messages that ask a process to stop or reload.', example: 'SIGTERM asks. SIGKILL forces.' },
        { icon: 'fa-rotate', title: 'Services', desc: 'Background programs managed by systemd.', example: 'systemctl status nginx' },
      ],
      codeTitle: 'Process commands',
      codeLanguage: 'Shell',
      codeText: `ps aux | grep node        # find node processes
lsof -i :3000             # who uses port 3000?
kill 4312                 # ask process 4312 to stop
systemctl status nginx    # is the web server running?`,
      checklist: ['Find a running process by name.', 'Explain kill vs kill -9.', 'Use systemctl status for a service.'],
    },
    {
      id: 'networking-terminal',
      label: 'Deeper: network commands',
      title: 'Deeper: network checks from the terminal',
      whatIsIt: 'A few commands answer network questions. ping: can I reach this computer? dig: which IP address belongs to this name (DNS)? curl -I: which HTTP status does this page return? ssh: open a terminal on another computer. The web stage of the path explains IPs, DNS and HTTP.',
      conceptSections: [
        { icon: 'fa-satellite-dish', title: 'ping', desc: 'Sends small test packets.', example: 'ping example.com' },
        { icon: 'fa-globe', title: 'dig', desc: 'Asks DNS for the address of a name.', example: 'dig example.com' },
        { icon: 'fa-arrows-left-right', title: 'curl', desc: 'Sends an HTTP request.', example: 'curl -I https://example.com' },
        { icon: 'fa-key', title: 'ssh', desc: 'Remote terminal on a server.', example: 'ssh user@server.example.com' },
      ],
      codeTitle: 'Network commands',
      codeLanguage: 'Shell',
      codeText: `ping example.com              # reachable?
dig example.com               # DNS lookup
curl -I https://example.com   # HTTP status and headers
ssh user@server.example.com   # remote shell`,
      checklist: ['Use curl -I to see an HTTP status.', 'Say what ssh gives you.'],
      relatedIds: ['networks-ips-requests', 'http-requests-responses'],
    },
    {
      id: 'packages-environment',
      label: 'Deeper: packages and PATH',
      title: 'Deeper: packages, PATH and environment variables',
      whatIsIt: 'A package manager installs programs for you: brew on macOS, apt on Ubuntu, winget on Windows. PATH is a list of folders. When you type node, the shell looks for a program called node in those folders. "command not found" often means the folder is missing from PATH. Environment variables like PATH are named settings that every program can read.',
      conceptSections: [
        { icon: 'fa-box-open', title: 'Package manager', desc: 'Installs and updates programs.', example: 'brew install git' },
        { icon: 'fa-map-location-dot', title: 'PATH', desc: 'Folders the shell searches for commands.', example: 'echo $PATH' },
        { icon: 'fa-sliders', title: 'Environment variable', desc: 'A named setting for programs.', example: 'NODE_ENV=test npm test' },
        { icon: 'fa-file-shield', title: 'Secrets', desc: 'Keep passwords and keys out of Git.', example: 'Use a secret manager.' },
      ],
      codeTitle: 'Package and environment commands',
      codeLanguage: 'Shell',
      codeText: `echo $PATH                 # folders searched for commands
which git                  # where git lives
export NODE_ENV=development
sudo apt install curl      # Ubuntu
brew install wget          # macOS`,
      checklist: ['Explain why "command not found" can be a PATH problem.', 'Name the package manager on your computer.'],
    },
    {
      id: 'os-kernel-shell',
      label: 'Deeper: OS, kernel, shell',
      title: 'Deeper: operating system, kernel and shell',
      whatIsIt: 'The operating system (Linux, macOS, Windows) runs the whole computer. Its core is the kernel: it hands out memory and CPU time and talks to the disk and network. The terminal is only the window. The shell (bash, zsh) is the program inside it that reads your command and starts it. Most servers and Docker containers run Linux.',
      conceptSections: [
        { icon: 'fa-desktop', title: 'Terminal', desc: 'The window for text in and out.', example: 'Terminal.app, Git Bash' },
        { icon: 'fa-code', title: 'Shell', desc: 'Reads your command and starts programs.', example: 'bash, zsh' },
        { icon: 'fa-microchip', title: 'Kernel', desc: 'Controls hardware, files and memory.', example: 'Opening a file goes through the kernel.' },
        { icon: 'fa-layer-group', title: 'Distribution', desc: 'Linux kernel plus tools.', example: 'Ubuntu, Debian, Fedora' },
      ],
      mermaidDiagram: `flowchart LR
  Terminal[Terminal window] --> Shell[Shell]
  Shell --> Program[Command program]
  Program --> Kernel[Kernel]
  Kernel --> Hardware[Disk, memory, network]`,
      codeTitle: 'Know your system',
      codeLanguage: 'Shell',
      codeText: `echo $SHELL     # your shell
uname -a        # kernel and system info
hostname        # computer name`,
      checklist: ['Point to terminal, shell, OS and kernel in one example.'],
    },
    {
      id: 'safe-practice',
      label: 'Deeper: copied commands',
      title: 'Deeper: be careful with copied commands',
      whatIsIt: 'The internet is full of commands to copy. Some of them are dangerous. Slow down before anything with sudo, rm -rf, chmod -R or curl ... | sh. The last one downloads a script and runs it at once. Download it first, read it, then decide.',
      conceptSections: [
        { icon: 'fa-location-crosshairs', title: 'Check location', desc: 'Run pwd before big changes.', example: 'Deleting in the wrong folder is a classic mistake.' },
        { icon: 'fa-magnifying-glass', title: 'Preview', desc: 'List matches before you delete.', example: 'ls *.log before rm *.log' },
        { icon: 'fa-triangle-exclamation', title: 'Read scripts', desc: 'Never run a script you have not read.', example: 'less install.sh' },
      ],
      codeTitle: 'Safer pattern',
      codeLanguage: 'Shell',
      codeText: `ls *.log                    # preview what *.log matches
rm -i old.log               # ask before deleting
curl -fsSL https://example.com/install.sh -o install.sh
less install.sh             # read it before you run it`,
      checklist: ['Pause before sudo, rm -rf, chmod -R and curl | sh.', 'Preview wildcard matches before deleting.'],
    },
  ],
});
