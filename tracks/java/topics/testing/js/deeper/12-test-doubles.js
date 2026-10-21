// Testing lesson 12 (Deeper): fakes via interfaces, and Mockito as an outlook.
(function () {
  Java.addCoreLessons('testing', [
    {
      id: 'test-doubles',
      title: 'Fakes: Test Doubles',
      category: 'deeper',
      icon: '⧉',
      tagline: 'Swap the real clock for a pretend one',
      realWorld: 'In a film, a stunt double jumps off the roof instead of the star. In a fire drill, the alarm rings but there is no fire. A test double stands in for the real thing so you can practise safely.',
      kid: [
        'You want to practise saying "good morning" and "good evening". But you cannot wait until evening every time you practise.',
        'So you take a toy clock and turn its hands yourself. Now it is 9 o\'clock. Now it is 6 in the evening. You can practise as often as you like.',
        'In tests, code that asks the real clock (or the internet, or a printer) is hard to check. So you give it a toy clock instead. That toy is called a **fake**.'
      ],
      definition: 'A **test double** is an object that stands in for a real dependency during a test. You make one by letting your code depend on an **interface**, and passing in a small test version (a **fake**) instead of the real implementation.',
      explain: [
        'Some code depends on things you cannot control in a test: the current time, random numbers, the network, a database, sending e-mail. A test that uses the real thing is slow, or gives a different result each run, or has side effects (a real mail goes out). Such a test is not repeatable.',
        'The fix starts in the code, not in the test. Instead of calling `LocalTime.now()` inside the method, the class asks an **interface** `Clock` for the hour. The class gets its `Clock` through the constructor. Handing a class the objects it needs from outside is called **dependency injection**: the class does not build its dependencies itself.',
        'The real program passes a `SystemClock`, which asks the real time. The test passes a `FakeClock`, a tiny class that returns whatever hour you gave it. The `Greeter` cannot tell the difference: both implement `Clock`. You know this idea from [Interfaces](../interfaces/index.html): code against the interface, swap the implementation.',
        'A second kind of fake **records** what happened. A `FakeMailer` does not send mail; it adds each message to a list. The test then checks the list: "exactly one mail, to Sam, with this text". That lets you test actions that have no return value.',
        'Libraries such as **Mockito** can create test doubles for you at runtime, without writing a fake class. They are handy in big projects; the idea underneath is exactly the one in this lesson.'
      ],
      why: 'Tests stay fast and repeatable even for code that touches time, randomness, files or the network.',
      whenUse: 'When the code under test talks to something outside your program, or to something that changes by itself (time, random).',
      syntax: '`interface Clock { int hour(); }` · `class FakeClock implements Clock { … }` · `new Greeter(new FakeClock(9))`',
      fileName: 'GreeterDemo.java',
      code: `import java.time.LocalTime;

public class GreeterDemo {
    interface Clock {
        int hour();
    }

    // The real clock, used by the finished program.
    static class SystemClock implements Clock {
        public int hour() {
            return LocalTime.now().getHour();
        }
    }

    // A fake: always says the hour it was given.
    static class FakeClock implements Clock {
        private final int hour;

        FakeClock(int hour) {
            this.hour = hour;
        }

        public int hour() {
            return hour;
        }
    }

    static class Greeter {
        private final Clock clock;

        Greeter(Clock clock) {
            this.clock = clock;
        }

        String greet(String name) {
            int hour = clock.hour();
            if (hour < 12) {
                return "Good morning, " + name;
            }
            if (hour < 18) {
                return "Good afternoon, " + name;
            }
            return "Good evening, " + name;
        }
    }

    public static void main(String[] args) {
        System.out.println(new Greeter(new FakeClock(9)).greet("Sam"));
        System.out.println(new Greeter(new FakeClock(12)).greet("Sam"));
        System.out.println(new Greeter(new FakeClock(18)).greet("Sam"));
    }
}`,
      output: `Good morning, Sam
Good afternoon, Sam
Good evening, Sam`,
      codeSummary: 'Everything in one file so it runs with `java`: an interface, the real clock, a fake clock and a `Greeter` that only knows the interface. With the fake, the output is the same at any time of day.',
      codeExplanation: [
        { label: 'Line 4', code: 'interface Clock {', text: 'The seam: the one thing `Greeter` needs from the outside world, as an interface.' },
        { label: 'Line 11', code: 'return LocalTime.now().getHour();', text: 'The real time. A test using this would pass in the morning and fail in the evening.' },
        { label: 'Line 16', code: 'static class FakeClock implements Clock {', text: 'The fake. A few lines, no logic: it returns the hour you gave it.' },
        { label: 'Line 31', code: 'Greeter(Clock clock) {', text: 'Dependency injection: whoever creates the `Greeter` decides which clock it gets.' },
        { label: 'Line 36', code: 'int hour = clock.hour();', text: '`Greeter` asks the interface. It cannot tell a real clock from a fake.' },
        { label: 'Line 40', code: 'if (hour < 18) {', text: 'The borders 12 and 18 are now easy to test: pass exactly 12 or 18.' },
        { label: 'Line 48', code: 'System.out.println(new Greeter(new FakeClock(9)).greet("Sam"));', text: 'The test-like use: a fixed hour, a fixed answer. The real program would write `new Greeter(new SystemClock())`.' }
      ],
      sections: [
        {
          title: 'The problem: a hidden dependency',
          text: ['This version looks simpler, but you cannot test the evening greeting in the morning. The time is hidden inside the method.'],
          codeLanguage: 'java',
          fileName: 'fragment: hard to test',
          noRun: true,
          code: `String greet(String name) {
    int hour = LocalTime.now().getHour();   // hidden: depends on when the test runs
    if (hour < 12) {
        return "Good morning, " + name;
    }
    ...
}`
        },
        {
          title: 'Who depends on whom',
          mermaid: `classDiagram
  class Clock {
    <<interface>>
    +hour() int
  }
  class SystemClock {
    +hour() int
  }
  class FakeClock {
    -hour int
    +hour() int
  }
  class Greeter {
    -clock Clock
    +greet(name) String
  }
  Clock <|.. SystemClock
  Clock <|.. FakeClock
  Greeter --> Clock`,
          diagramNote: '`Greeter` points only at the interface. The program plugs in `SystemClock`; the test plugs in `FakeClock`. (UML diagrams come in a later topic; dashed arrows mean "implements".)'
        },
        {
          title: 'The same thing as a JUnit test',
          text: ['In the Maven project, `Clock`, `SystemClock` and `Greeter` are public classes in `src/main/java`. The fake lives only in the test, as a small nested class. It never ships.'],
          fileName: 'src/test/java/GreeterTest.java',
          code: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GreeterTest {

    // A fake: a tiny Clock that always says the hour you give it.
    static class FakeClock implements Clock {
        private final int hour;

        FakeClock(int hour) {
            this.hour = hour;
        }

        public int hour() {
            return hour;
        }
    }

    @Test
    void saysGoodMorningAtNine() {
        Greeter greeter = new Greeter(new FakeClock(9));
        assertEquals("Good morning, Sam", greeter.greet("Sam"));
    }

    @Test
    void saysGoodAfternoonExactlyAtTwelve() {
        Greeter greeter = new Greeter(new FakeClock(12));
        assertEquals("Good afternoon, Sam", greeter.greet("Sam"));
    }

    @Test
    void saysGoodEveningAtEighteen() {
        Greeter greeter = new Greeter(new FakeClock(18));
        assertEquals("Good evening, Sam", greeter.greet("Sam"));
    }
}`,
          output: `[INFO] Running GreeterTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.001 s -- in GreeterTest`
        },
        {
          title: 'A fake that records what happened',
          text: ['`placeOrder` returns nothing; its job is to send a mail. A recording fake lets you check that job without sending anything.'],
          fileName: 'RecordingFakeDemo.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class RecordingFakeDemo {
    interface Mailer {
        void send(String to, String text);
    }

    // A recording fake: it sends nothing, it only writes down what it was asked to send.
    static class FakeMailer implements Mailer {
        final List<String> sent = new ArrayList<>();

        public void send(String to, String text) {
            sent.add(to + ": " + text);
        }
    }

    static class OrderService {
        private final Mailer mailer;

        OrderService(Mailer mailer) {
            this.mailer = mailer;
        }

        void placeOrder(String customer, int items) {
            if (items <= 0) {
                return; // nothing ordered, nothing to confirm
            }
            mailer.send(customer, "Thanks for ordering " + items + " items");
        }
    }

    public static void main(String[] args) {
        FakeMailer mailer = new FakeMailer();
        OrderService service = new OrderService(mailer);

        service.placeOrder("sam@example.com", 3);
        service.placeOrder("kim@example.com", 0);

        System.out.println("mails sent: " + mailer.sent.size());
        System.out.println(mailer.sent.get(0));
    }
}`,
          output: `mails sent: 1
sam@example.com: Thanks for ordering 3 items`,
          tip: 'In a JUnit test you would write `assertEquals(1, mailer.sent.size());` and `assertEquals("sam@example.com: Thanks for ordering 3 items", mailer.sent.get(0));`.'
        },
        {
          title: 'The family of test doubles',
          table: {
            head: ['Name', 'What it does', 'Example'],
            rows: [
              ['Dummy', 'is passed in but never used', '`null` or an empty object for a parameter the test does not care about'],
              ['Stub', 'returns fixed answers', '`FakeClock` that always says 9'],
              ['Fake', 'a working but simple version', 'a `Map` instead of a real database'],
              ['Spy / recording fake', 'remembers how it was called', '`FakeMailer` with its `sent` list'],
              ['Mock', 'made by a library; you set answers and check calls', 'Mockito: `when(…)` and `verify(…)`']
            ],
            note: 'People often say "mock" or "fake" for all of them. The idea is the same: replace a real dependency with a controllable one.'
          }
        },
        {
          title: 'Deeper: the same test with Mockito',
          text: [
            'Mockito builds the double for you. `mock(Clock.class)` creates an object that implements `Clock`; `when(clock.hour()).thenReturn(18)` sets its answer; `verify(clock).hour()` checks it was called. Add `org.mockito:mockito-core` (here 5.17.0) with `<scope>test</scope>` to the pom.',
            'This test was run for real: `Tests run: 1, Failures: 0`. On new JDKs (here JDK 25) Mockito also prints a warning that it is "self-attaching to enable the inline-mock-maker"; the test still works. Learn hand-written fakes first; reach for Mockito when writing fakes becomes repetitive.'
          ],
          fileName: 'src/test/java/GreeterMockTest.java',
          noRun: true,
          code: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class GreeterMockTest {

    @Test
    void saysGoodEveningAtEighteen() {
        Clock clock = mock(Clock.class);
        when(clock.hour()).thenReturn(18);

        Greeter greeter = new Greeter(clock);

        assertEquals("Good evening, Sam", greeter.greet("Sam"));
        verify(clock).hour();
    }
}`,
          output: `[INFO] Running GreeterMockTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.430 s -- in GreeterMockTest`
        }
      ],
      technical: [
        'The fake works because of **dynamic dispatch**: `clock.hour()` is decided at runtime by the real class of the object behind the `Clock` reference. The JVM looks up `hour()` in `FakeClock` or `SystemClock`; the compiled `Greeter` code is the same in both cases.',
        'Mockito creates a new class at runtime (with the byte-code library Byte Buddy) that implements `Clock`, and loads it into the JVM. Every call is caught and either answered with what you set in `when(…)` or with a default (`0`, `false`, `null`). It also records each call so `verify` can check it. That is why mock tests start slower (0.43 s here versus about 0.001 s for the hand-written fake).',
        'The JDK has a ready-made clock interface too: `java.time.Clock`, with `Clock.fixed(…)` for tests. Code that takes a `java.time.Clock` and calls `LocalTime.now(clock)` is testable in the same way, without writing your own interface.'
      ],
      tryIt: {
        steps: [
          'Run `java GreeterDemo.java`.',
          'Add a line that uses the real clock: `System.out.println(new Greeter(new SystemClock()).greet("Sam"));`. Run it now and think about when the output would change.',
          'Add a check for the border 11: which greeting do you expect? Add it and run.',
          'In `RecordingFakeDemo`, add `service.placeOrder("lee@example.com", 1);` before the prints and run again.'
        ],
        see: 'The fake lines never change. The real-clock line depends on the time you run it. Hour 11 gives `Good morning, Sam`. With the extra order: `mails sent: 2`.'
      },
      check: [
        { q: 'Why is a test that calls `LocalTime.now()` inside the code under test a problem?', a: 'The result depends on when the test runs. It is not repeatable: it may pass in the morning and fail in the evening.' },
        { q: 'What has to change in the code so a fake can be used?', a: 'The code must depend on an interface and receive the implementation from outside (dependency injection), for example through the constructor.' },
        { q: 'How do you test a method that returns nothing but sends a mail?', a: 'Pass in a recording fake `Mailer` and check its list of sent messages after the call.' }
      ],
      keyPoints: [
        'A test double replaces a real dependency in a test.',
        'Depend on an interface; pass the implementation in.',
        'Stubs give fixed answers; recording fakes remember calls.',
        'Fakes live in test code and never ship.',
        'Mockito makes doubles for you; the idea stays the same.'
      ],
      commonMistakes: [
        'Calling `LocalTime.now()` or `new Random()` deep inside a method. Fix: inject a `Clock` or a number source.',
        'Creating the dependency inside the constructor: `this.clock = new SystemClock();`. Fix: take it as a constructor parameter.',
        'Putting logic into the fake, so the fake itself needs tests. Fix: keep fakes tiny.',
        'Mocking everything, even simple value classes like `String` or `Cart`. Fix: use real objects where they are fast and predictable.'
      ],
      related: ['tdd', 'what-to-test', 'Interfaces']
    }
  ]);
})();
