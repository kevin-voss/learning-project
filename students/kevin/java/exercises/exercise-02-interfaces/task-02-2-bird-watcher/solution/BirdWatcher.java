import java.util.Arrays;
import java.util.Scanner;

// Ideas: Comparable<T> (the race line-up promise), compareTo, Arrays.sort on objects.
// Picture: a race — Java knows how to line things up, but you must say who is "smaller".

// Comparable<Bird> = the built-in promise "I can say who comes first between me and another bird".
class Bird implements Comparable<Bird> {
    final String name;
    final int wingspan;

    Bird(String name, int wingspan) {
        this.name = name;
        this.wingspan = wingspan;
    }

    // compareTo answers: negative = this bird first, 0 = tie, positive = this bird after.
    // The whole ordering rule lives here: wingspan decides, the name breaks ties.
    @Override
    public int compareTo(Bird other) {
        int bySize = Integer.compare(this.wingspan, other.wingspan);
        if (bySize != 0) {
            return bySize;
        }
        return this.name.compareTo(other.name);
    }
}

public class BirdWatcher {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        Bird[] birds = new Bird[n];
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            birds[i] = new Bird(parts[0], Integer.parseInt(parts[1]));
        }

        Arrays.sort(birds);   // asks bird.compareTo over and over — no hand-written sorting loop

        for (Bird b : birds) {
            System.out.println(b.name + ": " + b.wingspan + " cm");
        }
        // After sorting, the ends of the array are the extremes.
        System.out.println("smallest: " + birds[0].name);
        System.out.println("largest: " + birds[birds.length - 1].name);
    }
}
