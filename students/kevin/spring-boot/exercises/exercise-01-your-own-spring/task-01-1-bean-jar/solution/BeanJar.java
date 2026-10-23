import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

// A tiny Spring container: singleton vs prototype, watched through one counter.
// Picture: the theatre director. A singleton actor is hired once and kept backstage;
// a prototype actor is hired fresh for every call. The jar numbers every hire.
// Container stands for Spring's ApplicationContext; get() is getBean().

class Bean {
    final String name;
    final int number;   // the creation number: proof of when this bean was built

    Bean(String name, int number) {
        this.name = name;
        this.number = number;
    }
}

class Container {
    // Singletons live here: one bean per name, shared by every future ask.
    private final Map<String, Bean> singletons = new HashMap<>();

    // One counter for ALL beans: it records the creation order across both scopes.
    private int counter = 0;

    Bean get(String scope, String name) {
        if (scope.equals("singleton")) {
            Bean kept = singletons.get(name);
            if (kept != null) {
                return kept;   // found in the map: same bean, same number, nothing built
            }
            Bean bean = create(name);
            singletons.put(name, bean);   // remember it — this is what makes it a singleton
            return bean;
        }
        // Prototype: build, number, hand out, forget — the map never stores it.
        return create(name);
    }

    // The only place that touches the counter, so numbers are the true creation order.
    private Bean create(String name) {
        counter++;
        return new Bean(name, counter);
    }

    int created() {
        return counter;
    }

    int singletonCount() {
        return singletons.size();
    }
}

public class BeanJar {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        Container container = new Container();
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            String scope = parts[1];
            Bean bean = container.get(scope, parts[2]);
            System.out.println(bean.name + " -> #" + bean.number + " (" + scope + ")");
        }
        System.out.println("created: " + container.created());
        System.out.println("singletons: " + container.singletonCount());
    }
}
