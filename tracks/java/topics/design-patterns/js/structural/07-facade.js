(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'facade',
    num: '07',
    title: 'Facade',
    category: 'structural',
    icon: '▤',
    tagline: 'A friendly front for a complex system',
    realWorld: 'A waiter in a restaurant. You say "one soup, please". You do not walk into the kitchen, light the stove, find the pot, call the cook and wash the bowl. The waiter talks to all of them for you. Behind the waiter is a busy kitchen; in front of you is one friendly person.',
    kid: [
      'Movie night at home needs many things: the TV must be on, the sound box must be on and loud enough, the lights must go dim, and the film must start. If you forget one thing, it does not work.',
      'So your dad makes one big button with a star on it. You press the star, and the button does all the steps for you, in the right order.',
      'A **Facade** is that star button. It is one simple door in front of many complicated parts.'
    ],
    definition: 'The **Facade** pattern gives one simple class with a few high-level methods in front of a group of classes that are complex to use together. The facade calls the parts in the right order, so the client does not have to.',
    explain: [
      'A **subsystem** is a group of classes that work together for one area, for example `Television`, `SoundSystem`, `Lights` and `Player` for a home cinema. Each class is fine on its own, but using them correctly needs many calls in a fixed order.',
      'The **facade** is a new class that holds the subsystem objects and offers methods named after what the client wants: `watchMovie(title)` and `endMovie()`. Inside, each method runs the right sequence of calls.',
      'The **client** now calls one method instead of six. It depends only on the facade, not on four classes, so the coupling between client and subsystem is much smaller.',
      'A facade does **not** lock the subsystem away. Code that needs a special setting can still use the parts directly. The facade is a convenience for the common cases.',
      'Facade and Adapter both wrap. An adapter makes **one** object fit an interface that already exists. A facade creates a **new, simpler** interface over **many** objects.'
    ],
    why: 'Complex libraries and modules are hard to use correctly. When every client repeats the same sequence of calls, mistakes and copies spread. A facade writes the sequence once and gives it a clear name.',
    whenUse: 'When many clients use a complex group of classes in the same few ways, or when you want a clean entry point into a module or library. Not when the facade would only forward one call to one class.',
    syntax: '`class Facade { private final PartA a; private final PartB b; void doTheCommonThing() { a.step1(); b.step2(); a.step3(); } }`.',
    pros: [
      'Clients call one clear method instead of many.',
      'The correct order of calls is written once.',
      'Clients depend on one class, not on the whole subsystem.',
      'The subsystem can change inside without breaking clients.'
    ],
    cons: [
      'A facade can grow into a "god object" that knows and does everything.',
      'It offers only the common cases; special needs still go to the parts.',
      'One more class to maintain.'
    ],
    fileName: 'MovieNight.java',
    code: `class Television {
    void on() { System.out.println("TV on"); }
    void off() { System.out.println("TV off"); }
}

class SoundSystem {
    void on() { System.out.println("Sound on"); }
    void volume(int level) { System.out.println("Volume " + level); }
    void off() { System.out.println("Sound off"); }
}

class Lights {
    void dim(int percent) { System.out.println("Lights at " + percent + "%"); }
}

class Player {
    void play(String title) { System.out.println("Playing " + title); }
    void stop() { System.out.println("Player stopped"); }
}

class HomeTheater { // the facade
    private final Television tv = new Television();
    private final SoundSystem sound = new SoundSystem();
    private final Lights lights = new Lights();
    private final Player player = new Player();

    void watchMovie(String title) {
        lights.dim(10);
        tv.on();
        sound.on();
        sound.volume(5);
        player.play(title);
    }

    void endMovie() {
        player.stop();
        sound.off();
        tv.off();
        lights.dim(100);
    }
}

public class MovieNight {
    public static void main(String[] args) {
        HomeTheater theater = new HomeTheater();
        theater.watchMovie("Space Cats");
        System.out.println("--- two hours later ---");
        theater.endMovie();
    }
}`,
    output: `Lights at 10%
TV on
Sound on
Volume 5
Playing Space Cats
--- two hours later ---
Player stopped
Sound off
TV off
Lights at 100%`,
    codeSummary: '`main` calls two methods. The facade turns each into the right sequence of calls on four subsystem classes.',
    codeExplanation: [
      { label: 'Line 1', code: 'class Television {', text: 'One of four subsystem classes. Each is simple, but they must be used together in a set order.' },
      { label: 'Line 21', code: 'class HomeTheater { // the facade', text: 'The facade. It is the only class that knows all four parts.' },
      { label: 'Line 22', code: 'private final Television tv = new Television();', text: 'The facade holds the parts in fields. Here it creates them; in bigger programs they are often passed into its constructor.' },
      { label: 'Line 27', code: 'void watchMovie(String title) {', text: 'A high-level method named after the user\'s goal, not after a technical step.' },
      { label: 'Line 28', code: 'lights.dim(10);', text: 'The first of five steps. The order is written once, here, instead of in every client.' },
      { label: 'Line 32', code: 'player.play(title);', text: 'The last step. The player starts only after picture and sound are ready.' },
      { label: 'Line 35', code: 'void endMovie() {', text: 'The second high-level method runs the steps in reverse: stop first, then switch off.' },
      { label: 'Line 45', code: 'HomeTheater theater = new HomeTheater();', text: 'The client creates only the facade. It never names `Television` or `Lights`.' },
      { label: 'Line 46', code: 'theater.watchMovie("Space Cats");', text: 'One call replaces five. The client cannot forget a step or mix up the order.' }
    ],
    sections: [
      {
        title: 'The problem: every client repeats the steps',
        text: [
          'Without a facade, every piece of code that starts a movie must know all four classes and all the steps. Here the second client forgets the sound and starts the player too early.'
        ],
        fileName: 'NoFacade.java',
        code: `class Television {
    private boolean on;
    void on() { on = true; System.out.println("TV on"); }
    boolean isOn() { return on; }
}

class Player {
    void play(String title, Television tv) {
        if (!tv.isOn()) {
            System.out.println("Error: TV is off, nothing to see");
            return;
        }
        System.out.println("Playing " + title);
    }
}

public class NoFacade {
    public static void main(String[] args) {
        // Client 1 does it right
        Television tv1 = new Television();
        tv1.on();
        new Player().play("Space Cats", tv1);

        // Client 2 gets the order wrong
        Television tv2 = new Television();
        Player p2 = new Player();
        p2.play("Space Cats", tv2);
        tv2.on();
    }
}`,
        output: `TV on
Playing Space Cats
Error: TV is off, nothing to see
TV on`,
        warn: 'The pain: the knowledge "TV first, then play" lives in every client. One client gets it wrong. With ten clients, someone always will.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class HomeTheater {
    +watchMovie(String) void
    +endMovie() void
  }
  MovieNight --> HomeTheater : uses
  HomeTheater --> Television
  HomeTheater --> SoundSystem
  HomeTheater --> Lights
  HomeTheater --> Player`,
        diagramNote: 'The client has one arrow, to the facade. The facade has the arrows to the subsystem. Without the facade, the client would have four arrows.',
        text: [
          'Only two roles: the **facade** and the **subsystem classes**. The subsystem classes do not know the facade exists.'
        ]
      },
      {
        title: 'The order of calls',
        mermaid: `sequenceDiagram
  participant C as main
  participant F as HomeTheater
  participant L as Lights
  participant T as Television
  participant S as SoundSystem
  participant P as Player
  C->>F: watchMovie("Space Cats")
  F->>L: dim(10)
  F->>T: on()
  F->>S: on()
  F->>S: volume(5)
  F->>P: play("Space Cats")
  F-->>C: done`,
        diagramNote: 'One arrow in from the client, five arrows out to the subsystem. The facade owns the order.',
        text: [
          'Here the order is everything: the facade is the one place that knows it.'
        ]
      },
      {
        title: 'Where Java itself uses it',
        text: [
          '`java.nio.file.Files` is a facade. Reading a text file by hand means opening a stream, wrapping it in a reader with the right character set, reading in a loop and closing everything. `Files.readString(path)` does all of that in one call. `Files.writeString` does the same for writing.'
        ],
        fileName: 'FilesFacade.java',
        code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class FilesFacade {
    public static void main(String[] args) throws IOException {
        Path file = Files.createTempFile("notes", ".txt");

        Files.writeString(file, "buy milk\\ncall grandma\\n"); // opens, writes, closes
        String all = Files.readString(file); // opens, reads, closes
        List<String> lines = Files.readAllLines(file);

        System.out.print(all);
        System.out.println(lines.size() + " lines");
        Files.delete(file);
    }
}`,
        output: `buy milk
call grandma
2 lines`,
        tip: 'You can still use the subsystem directly when you need more control, for example `Files.newBufferedReader` for a huge file read line by line. A facade adds a simple door; it does not remove the others.'
      },
      {
        title: 'Facade or not?',
        text: [
          'A facade earns its place when it hides a **sequence** or **several** classes. A class whose methods each forward one call to one other class adds one more class to read and nothing else.',
          'Watch the size, too. If the facade gets methods for every area of the program, split it into several small facades, one per area (for example `Orders`, `Payments`).'
        ],
        table: {
          head: ['Sign', 'Verdict'],
          rows: [
            ['Clients repeat the same 4 to 8 calls in the same order', 'Facade helps'],
            ['A library has a complex setup that most users do not care about', 'Facade helps'],
            ['Each facade method calls exactly one method of one class', 'Not worth it'],
            ['The facade has 40 methods for unrelated areas', 'Split it up']
          ]
        }
      }
    ],
    technical: [
      'A facade changes the **dependency graph** of a program: the picture of which class needs which. Clients get one outgoing dependency instead of many. When a subsystem class changes, only the facade must be recompiled and checked, not every client.',
      'Java packages and modules support facades well. You can make the subsystem classes package-private (no `public` keyword) and only the facade `public`. Then code in other packages can use nothing but the facade, and the compiler enforces it.',
      '`Files.readString` really does all the steps: it opens a channel to the file, reads the bytes, decodes them with UTF-8 by default and closes the file, also when an exception happens. Writing that correctly by hand needs a try-with-resources block and a loop.'
    ],
    tryIt: {
      steps: [
        'Copy `MovieNight.java` and run it with `java MovieNight.java`.',
        'Add a class `Popcorn` with a method `pop()` that prints `Popcorn ready`.',
        'Add a `Popcorn` field to `HomeTheater` and call `pop()` as the first step of `watchMovie`.',
        'Run again and check that `main` did not change.'
      ],
      see: '`Popcorn ready` as the first line, before `Lights at 10%`, while `main` stays the same.'
    },
    check: [
      { q: 'What problem does a facade solve?', a: 'Clients must otherwise know many subsystem classes and call them in the right order. The facade writes that sequence once behind a simple, well-named method.' },
      { q: 'Can a client still use the subsystem classes directly when there is a facade?', a: 'Yes. A facade is a convenience. It does not hide the parts unless you also restrict access, for example with package-private classes.' },
      { q: 'How is a facade different from an adapter?', a: 'An adapter makes one object fit an interface that already exists. A facade defines a new, simpler interface in front of many objects.' }
    ],
    keyPoints: [
      'A facade is one simple class in front of a complex group of classes.',
      'Its methods are named after goals (`watchMovie`) and run the right sequence of calls.',
      'Clients depend on the facade, not on every subsystem class.',
      'The subsystem stays usable directly for special cases.',
      '`Files.readString` and `Files.writeString` are facades in the JDK.'
    ],
    commonMistakes: [
      'Letting the facade grow without limit. A `SystemManager` with 50 methods is a god object. Make one facade per area.',
      'Putting business rules into the facade. It should coordinate calls, not compute prices. Keep the logic in the subsystem classes.',
      'A facade that only forwards: `void on() { tv.on(); }` for every method adds nothing. Wrap sequences, not single calls.',
      'Returning subsystem objects from the facade, such as `getTelevision()`. Then clients depend on the parts again.'
    ],
    related: ['Adapter', 'Decorator', 'MVC', 'IO Basics'],
    glossary: DP.glossary
  });
})();
