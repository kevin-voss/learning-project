import java.util.Scanner;

// Ideas: extends again, @Override again, and the new one: super.method() inside an override.
// Picture: a manager fills in the worker form first, then adds the manager extra.

class Worker {
    // The pay table lives here once: first 40 hours at 20, every hour above at 30.
    // Math.min and Math.max keep the border clean: at exactly 40 the overtime part is 0.
    int pay(int hours) {
        int normal = Math.min(hours, 40) * 20;
        int overtime = Math.max(hours - 40, 0) * 30;
        return normal + overtime;
    }
}

// A manager is paid like a worker, plus a flat bonus. The worker math is not repeated.
class Manager extends Worker {
    // super.pay(hours) is the parent's answer: manager pay starts from worker pay, then adds 100.
    @Override
    int pay(int hours) {
        return super.pay(hours) + 100;
    }
}

public class OvertimePay {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            String name = parts[0];
            // One Worker variable holds both roles, so one pay() call fits every line.
            Worker worker = parts[1].equals("manager") ? new Manager() : new Worker();
            System.out.println(name + " gets " + worker.pay(Integer.parseInt(parts[2])) + " credits");
        }
    }
}
