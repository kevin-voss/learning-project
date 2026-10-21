// Lessons 09–10: what sudo and apt really do, and the three names JDK, JRE, JVM.
(function () {
  const topic = Java.topics.gettingStarted;
  const glossary = topic.glossary;

  topic.lessons.push(
    {
      id: 'sudo-apt',
      num: '09',
      title: 'sudo and apt',
      category: 'help',
      icon: '#',
      tagline: 'What the install command really did',
      realWorld: '`apt` is an app store you talk to by typing. `sudo` is asking a grown-up for the key, because installing changes the whole house, not only your room.',
      kid: [
        'Your computer has rooms that belong to you, like your home folder. And it has rooms for the whole family, where the programs live.',
        'To put a new program in a family room, you need the grown-up key. Typing sudo is asking for that key. Ubuntu checks your password, then lets that one order through.',
        'apt is the helper that carries the new program in. It knows a big shop full of safe programs, fetches the one you ask for and sets it up.'
      ],
      definition: '`apt` installs **packages** from Ubuntu\'s trusted servers. `sudo` runs one command as administrator. In `sudo apt install openjdk-21-jdk`, sudo gives permission and apt does the work.',
      explain: [
        'A **package** is software packed into one file, with a name and a version. Ubuntu keeps tens of thousands of them on its servers, the **archive**. Java 21 is the package `openjdk-21-jdk`.',
        '`apt update` downloads the newest **list** of packages. It installs nothing. `apt install NAME` downloads a package, plus every package it needs (its **dependencies**), and installs them.',
        'Programs live in system folders such as `/usr`. Normal users may read them but not change them, so a broken command cannot damage the system. **sudo** ("superuser do") lifts that rule for one command, after you type your password.',
        'Reading commands, such as `apt search` and `apt show`, change nothing, so they work without sudo.'
      ],
      why: 'Ubuntu protects system folders so you cannot break them by accident. apt makes sure software comes from a trusted place and is set up the same way on every computer.',
      whenUse: 'Only for installing, updating or removing software. Never for your own practice files or for `javac` and `java`.',
      syntax: '`sudo apt install PACKAGE`, `sudo apt remove PACKAGE`, `sudo apt update`, `apt search WORD`, `apt show PACKAGE`.',
      exampleLabel: 'Ubuntu terminal',
      codeLanguage: 'bash',
      fileName: 'apt.sh',
      code: `sudo apt update                    # refresh the list of packages
apt search openjdk-21              # find packages by name
apt show openjdk-21-jdk            # read about one package
sudo apt install openjdk-21-jdk    # install it
apt list --installed 'openjdk*'    # which Java packages are installed?
sudo apt upgrade                   # install updates for everything
sudo apt remove openjdk-17-jdk     # remove a package you no longer need
sudo apt autoremove                # remove helpers nobody needs any more`,
      output: `Listing... Done
openjdk-21-jdk-headless/noble-updates,now 21.0.8+9~us1-0ubuntu1~24.04.1 amd64 [installed,automatic]
openjdk-21-jdk/noble-updates,now 21.0.8+9~us1-0ubuntu1~24.04.1 amd64 [installed]
openjdk-21-jre-headless/noble-updates,now 21.0.8+9~us1-0ubuntu1~24.04.1 amd64 [installed,automatic]
openjdk-21-jre/noble-updates,now 21.0.8+9~us1-0ubuntu1~24.04.1 amd64 [installed,automatic]`,
      codeSummary: 'Eight common apt commands. The output panel shows an example answer of `apt list --installed`: four Java packages. `[installed]` is the one you asked for; `automatic` ones came along as dependencies. Your versions and the Ubuntu name (`noble` is 24.04) can differ.',
      codeExplanation: [
        { label: 'Line 1', code: 'sudo apt update', text: 'Refreshes the package list from the servers. Run it before installing, so apt knows the newest versions.' },
        { label: 'Line 2', code: 'apt search openjdk-21', text: 'Searches names and descriptions. No sudo needed: it only reads.' },
        { label: 'Line 3', code: 'apt show openjdk-21-jdk', text: 'Shows the version, size, description and dependencies of one package.' },
        { label: 'Line 4', code: 'sudo apt install openjdk-21-jdk', text: 'Downloads and installs the package and its dependencies. Needs sudo, because it writes to system folders.' },
        { label: 'Line 5', code: "apt list --installed 'openjdk*'", text: 'Lists installed packages whose name starts with `openjdk`. The quotes keep the terminal from treating `*` itself.' },
        { label: 'Line 6', code: 'sudo apt upgrade', text: 'Installs newer versions of everything already installed, Java included. It asks before it starts.' },
        { label: 'Line 7', code: 'sudo apt remove openjdk-17-jdk', text: 'Removes a package. Your own files are not touched.' },
        { label: 'Line 8', code: 'sudo apt autoremove', text: 'Removes dependencies that were installed automatically and are no longer needed.' }
      ],
      sections: [
        {
          title: 'Where packages come from',
          text: [
            'apt never takes software from random websites. It only uses the servers listed in its settings, and it checks a digital signature on every download.'
          ],
          mermaid: 'flowchart LR\n  S["Ubuntu servers (the archive)"] -->|apt update| L["package list on your computer"]\n  L -->|apt install| D["download .deb files"]\n  D --> C["check the signature"]\n  C --> I["install into /usr"]',
          diagramNote: '`update` refreshes the list; `install` uses the list to fetch and set up the real files.'
        },
        {
          title: 'When to use sudo, and when not',
          text: [
            'sudo is a strong key. Use it only for the job that needs it.'
          ],
          table: {
            head: ['Command', 'sudo?', 'Why'],
            rows: [
              ['`apt install`, `apt remove`, `apt upgrade`, `apt update`', 'yes', 'changes system folders or the system list'],
              ['`apt search`, `apt show`, `apt list`', 'no', 'only reads'],
              ['`mkdir`, `nano`, `cd` in your home folder', 'no', 'your own files'],
              ['`javac`, `java`', 'never', 'your own programs in your own folder']
            ]
          },
          warn: 'Running `sudo javac Hello.java` makes `Hello.class` belong to the administrator ("root"). Later a normal `javac` cannot overwrite it and fails with "Permission denied". Fix it once with `sudo rm Hello.class`, then never use sudo for Java again.'
        },
        {
          title: 'update, upgrade, install, remove',
          text: [
            'Four words that sound alike but do different things.'
          ],
          table: {
            head: ['Command', 'Downloads', 'Changes installed software'],
            rows: [
              ['`apt update`', 'only the list', 'no'],
              ['`apt upgrade`', 'new versions of installed packages', 'yes, updates them'],
              ['`apt install NAME`', 'that package and its dependencies', 'yes, adds it'],
              ['`apt remove NAME`', 'nothing', 'yes, removes it']
            ]
          },
          tip: 'A good habit before every install: `sudo apt update`, then `sudo apt install …`.'
        },
        {
          title: 'The password prompt',
          text: [
            'The first sudo in a terminal asks for **your own** login password, not a special admin password. While you type, nothing appears. Press Enter at the end.',
            'For about 15 minutes after that, sudo in the same terminal does not ask again.'
          ],
          codeLanguage: 'bash',
          fileName: 'sudo.sh',
          code: 'sudo apt update',
          output: `[sudo] password for sam:
Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease
Get:2 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
...
Reading package lists... Done`,
          tip: 'If sudo says `sam is not in the sudoers file`, your user may not install software. Ask the person who set up the computer.'
        }
      ],
      technical: [
        'apt reads its server list from `/etc/apt/sources.list.d/` and stores the downloaded lists in `/var/lib/apt/lists/`. The packages themselves are `.deb` archives; apt hands them to the lower-level tool `dpkg`, which unpacks the files and runs the setup steps.',
        'Each list is signed with Ubuntu\'s key. apt refuses lists and packages whose signature does not match, so a fake server cannot sneak in software.',
        'sudo checks the file `/etc/sudoers`: members of the group `sudo` may run commands as the user `root`, the administrator. It logs every use, so you can see later who changed the system.'
      ],
      tryIt: {
        steps: [
          'Run `apt show openjdk-21-jdk` (no sudo).',
          'Find the lines `Version:` and `Depends:`.',
          'Run `apt list --installed \'openjdk*\'`.'
        ],
        see: 'a version that starts with 21, a list of dependencies, and your installed Java packages with `[installed]`.'
      },
      check: [
        { q: 'Does `sudo apt update` install Java updates?', a: 'No. It only refreshes the list. `sudo apt upgrade` installs the updates.' },
        { q: 'Why does `apt show` work without sudo?', a: 'It only reads information and changes nothing.' },
        { q: 'Should you type `sudo javac Hello.java`?', a: 'No. Your files would belong to root. Use plain `javac` in your own folder.' }
      ],
      keyPoints: [
        'A package is installable software with a name, such as `openjdk-21-jdk`.',
        '`apt update` refreshes the list; it installs nothing.',
        '`sudo` runs one command as administrator after your password.',
        'Use sudo only to install, update or remove software.',
        'Never use sudo for `javac`, `java` or your own files.'
      ],
      commonMistakes: [
        'Using `sudo` for every command out of habit. Use it only for apt changes.',
        'Typing `sudo apt install openjdk` without a version. Use the full name `openjdk-21-jdk`.',
        'Skipping `sudo apt update` and getting "Unable to locate package". Run update first, then install.'
      ],
      related: ['Install Java 21', 'The Terminal Commands You Need'],
      glossary
    },
    {
      id: 'jdk-jre-jvm',
      num: '10',
      title: 'JDK, JRE, JVM',
      category: 'help',
      icon: 'JVM',
      tagline: 'Three names, three jobs',
      realWorld: 'A kitchen: the JVM is the oven, the JRE is the oven plus the pots and pans, and the JDK is the whole kitchen, including the knives and the recipe book you need to cook something new.',
      kid: [
        'Three short names sound alike, but they are boxes inside boxes.',
        'The smallest box is the JVM. It is the machine that runs Java programs. Around it is the JRE: the machine plus a big box of ready-made parts. Around that is the JDK: everything before, plus the tools to build new programs.',
        'If you only want to play a Java game, the middle box is enough. If you want to make one, you need the big box: the JDK.'
      ],
      definition: 'The **JVM** runs bytecode. The **JRE** is the JVM plus the Java class library. The **JDK** is the JRE plus developer tools such as `javac`. To write Java you need the JDK.',
      explain: [
        'The **JVM** (Java Virtual Machine) is a program that behaves like a computer made for bytecode. It loads `.class` files, checks them and runs them on your real CPU.',
        'The **class library** is a huge set of ready-made classes that come with Java: `String` for text, `Math` for calculations, `LocalDate` for dates, and thousands more. The JVM plus this library is the **JRE** (Java Runtime Environment).',
        'The **JDK** (Java Development Kit) adds the tools for developers: the compiler `javac`, the interactive shell `jshell`, the bytecode viewer `javap`, the packer `jar` and more.',
        'Since Java 11 most vendors ship only the JDK; you rarely see a separate JRE download. Ubuntu still has `openjdk-21-jre` packages for computers that only run Java. When a guide asks which one to install, pick the JDK.'
      ],
      why: 'Knowing which box does what helps you read install guides and error messages such as `javac: command not found`.',
      whenUse: 'When an install guide asks which one to pick: the JDK. When an error talks about the JVM or a class version, this lesson tells you which part complains.',
      syntax: 'JDK = JRE + tools (`javac`, `jshell`, `javap`, `jar`); JRE = JVM + class library; JVM = runs bytecode.',
      mermaid: 'flowchart TB\n  subgraph JDK["JDK: write and run"]\n    T["tools: javac, jshell, javap, jar"]\n    subgraph JRE["JRE: run only"]\n      L["class library: String, Math, LocalDate"]\n      subgraph JVM["JVM: the engine"]\n        E["loads, checks and runs bytecode"]\n      end\n    end\n  end',
      visualLabel: 'Boxes inside boxes',
      visualNote: 'Each box contains the one inside it. Install the outer box, the JDK, and you have all three.',
      fileName: 'Toolbox.java',
      code: `import java.time.LocalDate;

public class Toolbox {
    public static void main(String[] args) {
        // Each line uses a class from the Java class library.
        System.out.println(Math.max(7, 12));
        System.out.println("shout".toUpperCase());
        System.out.println(LocalDate.of(2024, 1, 1).getDayOfWeek());
        System.out.println(Integer.toBinaryString(5));
        System.out.println(Math.sqrt(81));
    }
}`,
      output: `12
SHOUT
MONDAY
101
9.0`,
      codeSummary: 'You did not write `Math`, `String`, `LocalDate` or `Integer`. They come with the JRE, ready to use. The JVM runs your code and theirs together.',
      codeExplanation: [
        { label: 'Line 1', code: 'import java.time.LocalDate;', text: '`import` tells javac where to find a class from the library: `LocalDate` lives in the group (package) `java.time`. [Syntax Fundamentals](../syntax-fundamentals/index.html) explains imports.' },
        { label: 'Line 3', code: 'public class Toolbox {', text: 'Your own class. Everything else in this program is borrowed from the library.' },
        { label: 'Line 6', code: 'System.out.println(Math.max(7, 12));', text: '`Math.max` returns the bigger of two numbers: 12. `println` prints numbers too, without quotes.' },
        { label: 'Line 7', code: 'System.out.println("shout".toUpperCase());', text: 'Every string has methods. `toUpperCase` returns the text in capital letters.' },
        { label: 'Line 8', code: 'System.out.println(LocalDate.of(2024, 1, 1).getDayOfWeek());', text: 'Makes the date 1 January 2024 and asks for its weekday. The library knows the calendar: MONDAY.' },
        { label: 'Line 9', code: 'System.out.println(Integer.toBinaryString(5));', text: 'Writes 5 in binary (base 2): `101`. Computers store numbers this way.' },
        { label: 'Line 10', code: 'System.out.println(Math.sqrt(81));', text: 'The square root of 81 is 9. `sqrt` returns a decimal number, so it prints `9.0`.' }
      ],
      sections: [
        {
          title: 'Who does what',
          text: [
            'One table to keep. When something is missing, it tells you which box you lack.'
          ],
          table: {
            head: ['Name', 'Contains', 'Can you…', 'Ubuntu package'],
            rows: [
              ['JVM', 'the engine', 'run bytecode', 'part of the JRE'],
              ['JRE', 'JVM + class library', 'run Java programs', '`openjdk-21-jre`'],
              ['JDK', 'JRE + javac, jshell, javap, jar', 'write, compile and run', '`openjdk-21-jdk`']
            ],
            note: '`-headless` packages (`openjdk-21-jdk-headless`) leave out the parts for windows and graphics. Servers use them.'
          }
        },
        {
          title: 'The tools inside the JDK',
          text: [
            'You already used `javac` and `java`, and `javap` in "Compile and Run". The others are good to recognise.'
          ],
          table: {
            head: ['Tool', 'Job'],
            rows: [
              ['`javac`', 'compiles `.java` into `.class`'],
              ['`java`', 'starts the JVM and runs a class (or a single `.java` file)'],
              ['`jshell`', 'lets you type Java lines and see the result at once'],
              ['`javap`', 'shows what is inside a `.class` file'],
              ['`jar`', 'packs many `.class` files into one `.jar` file'],
              ['`javadoc`', 'makes web pages of documentation from comments']
            ]
          }
        },
        {
          title: 'Try Java line by line with jshell',
          text: [
            '`jshell` is a Java playground in the terminal. You type a line, press Enter and see the result. No class, no `main`, no compiling. Leave with `/exit`.'
          ],
          codeLanguage: 'bash',
          fileName: 'jshell-session',
          code: `jshell
System.out.println("Hi from jshell")
2 + 3
Math.max(7, 12)
/exit`,
          output: `|  Welcome to JShell -- Version 21.0.8
|  For an introduction type: /help intro

jshell> System.out.println("Hi from jshell")
Hi from jshell

jshell> 2 + 3
$2 ==> 5

jshell> Math.max(7, 12)
$3 ==> 12

jshell> /exit
|  Goodbye`,
          tip: '`$2 ==> 5` means: jshell stored the result 5 under the name `$2`. In jshell you may leave out the `;`.'
        },
        {
          title: 'Java versions and LTS',
          text: [
            'A new Java version comes out every six months, in March and September. Every two years one of them is an **LTS** version with long support. Java 21 (September 2023) is one; that is why this course uses it.',
            'Each version writes its own **class file version** into the `.class` file. A JVM runs its own version and older ones, never newer ones.'
          ],
          table: {
            head: ['Java', 'Year', 'LTS', 'Class file version'],
            rows: [
              ['8', '2014', 'yes', '52'],
              ['11', '2018', 'yes', '55'],
              ['17', '2021', 'yes', '61'],
              ['21', '2023', 'yes', '65'],
              ['25', '2025', 'yes', '69']
            ],
            note: 'The versions between them (such as 22, 23, 24) get fixes for six months only.'
          },
          warn: 'Compiled with a newer JDK, run on an older JVM: `UnsupportedClassVersionError ... class file version 69.0 ... only recognizes class file versions up to 65.0`. Use the same Java for both steps.'
        }
      ],
      technical: [
        'The JVM has four main parts. The **class loader** finds `.class` files and loads them into memory. The **verifier** checks that the bytecode follows the rules, so a broken or harmful file cannot crash the machine.',
        'The **execution engine** first interprets bytecode instruction by instruction. The JVM counts which methods run often; the **JIT compiler** (just-in-time) then turns those into real machine code, so long-running programs get fast. The usual JVM is called **HotSpot** after this trick.',
        'The **garbage collector** frees memory your program no longer uses, so you never free it by hand. How memory is organised (stack, heap) is the topic of [JVM & Memory](../jvm-memory/index.html).'
      ],
      tryIt: {
        steps: [
          'Type `jshell` and press Enter.',
          'Type `"shout".toUpperCase()` and press Enter.',
          'Type `Math.sqrt(81)` and press Enter.',
          'Type `/exit`.'
        ],
        see: '`$1 ==> "SHOUT"` and `$2 ==> 9.0` (the numbers after `$` count your inputs).'
      },
      check: [
        { q: 'Which box contains `javac`: JVM, JRE or JDK?', a: 'Only the JDK.' },
        { q: 'What does the JRE add to the JVM?', a: 'The class library: ready-made classes such as `String`, `Math` and `LocalDate`.' },
        { q: 'You compiled with Java 25 and run on Java 21. What happens?', a: 'The JVM refuses with `UnsupportedClassVersionError`, because class file version 69 is newer than 65. Compile with Java 21 (or `javac --release 21`).' }
      ],
      keyPoints: [
        'JDK = write and run. It contains the JRE and the tools.',
        'JRE = run only: the JVM plus the class library. No javac.',
        'JVM = the engine that loads, checks and runs bytecode.',
        '`jshell` lets you try single Java lines.',
        'Java 21 is an LTS version; its class files have version 65.'
      ],
      commonMistakes: [
        'Installing only a JRE (`openjdk-21-jre`) and then `javac` is missing. Install `openjdk-21-jdk`.',
        'Mixing versions: compiling with one Java and running with an older one. Check `java --version` and `javac --version` match.',
        'Typing Java into the terminal without jshell, such as `System.out.println("Hi")` at the `$` prompt. The shell does not know Java; start `jshell` first.'
      ],
      related: ['What a Program Is', 'Install Java 21', 'JVM & Memory'],
      glossary
    }
  );
})();
