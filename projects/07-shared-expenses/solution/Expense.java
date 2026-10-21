import java.util.ArrayList;

// One payment: who paid, how much (in cents), and for whom.
public class Expense {

    private final String payer;
    private final int cents;
    private final ArrayList<String> forWhom;

    public Expense(String payer, int cents, ArrayList<String> forWhom) {
        this.payer = payer;
        this.cents = cents;
        this.forWhom = forWhom;
    }

    public String getPayer() {
        return payer;
    }

    public int getCents() {
        return cents;
    }

    public ArrayList<String> getForWhom() {
        return forWhom;
    }
}
