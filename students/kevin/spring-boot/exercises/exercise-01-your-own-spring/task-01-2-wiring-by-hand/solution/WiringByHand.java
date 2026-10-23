import java.util.Scanner;

// Wiring by hand: constructor injection plus @Qualifier, exactly what Spring does at startup.
// Picture: the director does not let the service shop for its own greeter — the director
// picks one (the qualifier) and hands it through the constructor.
// Greeter stands for a bean interface; FormalGreeter and CasualGreeter are two beans of one
// type; GreetingService stands for the @Service; Container.createService is the ApplicationContext.

interface Greeter {
    String greet(String name);
}

// Bean one of type Greeter. In Spring: @Component("formal") on the class.
class FormalGreeter implements Greeter {
    public String greet(String name) {
        return "Good day, " + name + ".";
    }
}

// Bean two of the SAME type — the reason a qualifier is needed at all.
class CasualGreeter implements Greeter {
    public String greet(String name) {
        return "Hey " + name + "!";
    }
}

// The service never calls new on a greeter. In Spring: @Service.
class GreetingService {
    private final Greeter greeter;   // final: set once by the constructor, never half-missing

    // Constructor injection: the container fills this parameter (after the qualifier chose).
    GreetingService(Greeter greeter) {
        this.greeter = greeter;
    }

    String greet(String name) {
        return greeter.greet(name);   // delegate: the service only passes the work on
    }

    String wired() {
        return greeter.getClass().getSimpleName();   // shows which bean really got injected
    }
}

class Container {

    // createService stands for the context + @Qualifier: pick ONE bean out of two of a type.
    GreetingService createService(String qualifier) {
        Greeter greeter = switch (qualifier) {
            case "formal" -> new FormalGreeter();
            case "casual" -> new CasualGreeter();
            default -> throw new IllegalArgumentException("no bean for qualifier: " + qualifier);
        };
        // The wiring step: the dependency goes into the constructor, never a field assignment outside.
        return new GreetingService(greeter);
    }
}

public class WiringByHand {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String qualifier = in.nextLine().trim();
        int n = Integer.parseInt(in.nextLine().trim());
        GreetingService service = new Container().createService(qualifier);
        for (int i = 0; i < n; i++) {
            System.out.println(service.greet(in.nextLine().trim()));
        }
        System.out.println("wired: GreetingService(" + service.wired() + ")");
    }
}
