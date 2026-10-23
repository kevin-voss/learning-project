import java.util.Scanner;

// Ideas: extends (the family recipe), abstract (a cookie cutter you cannot hold),
// @Override, polymorphism (one feeding line, many voices).
// Picture: every animal in the shelter speaks its own word.

abstract class Animal {
    final String name;

    Animal(String name) {
        this.name = name;
    }

    // Abstract = a half-written parent: no `new Animal(...)` allowed, every child must fill in speak().
    abstract String speak();
}

// extends = "is a, plus": Dog keeps the name and the promise from Animal, then adds its own word.
class Dog extends Animal {
    Dog(String name) {
        super(name);
    }

    // @Override = "I replace the parent method on purpose" — the compiler checks the spelling.
    @Override
    String speak() {
        return "woof";
    }
}

// A puppy is a dog: it inherits everything and only changes the sound.
class Puppy extends Dog {
    Puppy(String name) {
        super(name);
    }

    @Override
    String speak() {
        return "yip yip";
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }

    @Override
    String speak() {
        return "meow";
    }
}

public class AnimalShelter {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        Animal[] crowd = new Animal[n];
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            crowd[i] = create(parts[0], parts[1]);
        }
        // Polymorphism: one array of plain Animal, yet each animal answers in its own voice.
        for (Animal a : crowd) {
            System.out.println(a.name + " says " + a.speak());
        }
    }

    // The only place that knows the kinds: build the right child.
    static Animal create(String name, String kind) {
        return switch (kind) {
            case "dog" -> new Dog(name);
            case "puppy" -> new Puppy(name);
            case "cat" -> new Cat(name);
            default -> throw new IllegalArgumentException("unknown kind: " + kind);
        };
    }
}
