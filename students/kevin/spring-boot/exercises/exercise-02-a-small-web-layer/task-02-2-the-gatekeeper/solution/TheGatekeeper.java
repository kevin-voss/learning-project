import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// A tiny validation boundary: @Valid with its constraints, and ONE @RestControllerAdvice
// turning every failure into one error shape (the ProblemDetail idea).
// Picture: one complaint desk. The bouncer (create) only refuses; the desk clerk (handle)
// writes every complaint in the same words.
// validate() stands for the constraint checks; ValidationException stands for what Spring
// throws when a rule breaks; handle() stands for the @ExceptionHandler.

record BookRequest(String title, String pages) {}

// Unchecked, so it travels from create() up to main without a `throws` on every method.
class ValidationException extends RuntimeException {

    final List<String> problems;   // every broken rule, in checking order

    ValidationException(List<String> problems) {
        super(String.join("; ", problems));
        this.problems = problems;
    }
}

public class TheGatekeeper {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ");
            BookRequest request = new BookRequest(parts[1], parts[2]);
            // The try/catch stands for Spring calling the advice when a controller throws.
            try {
                System.out.println(create(request));
            } catch (ValidationException e) {
                System.out.println(handle(e));
            }
        }
    }

    // The controller method: happy path only. It never formats errors — it throws.
    static String create(BookRequest request) {
        List<String> problems = validate(request);
        if (!problems.isEmpty()) {
            throw new ValidationException(problems);
        }
        return "201 created " + request.title();
    }

    // validate stands for @Valid + @NotBlank + @Min/@Max, run top to bottom.
    static List<String> validate(BookRequest request) {
        List<String> problems = new ArrayList<>();
        if (request.title().equals("-")) {
            problems.add("title must not be blank");   // @NotBlank
        }
        try {
            int pages = Integer.parseInt(request.pages());
            if (pages < 1 || pages > 2000) {
                problems.add("pages must be between 1 and 2000");   // @Min(1) @Max(2000)
            }
        } catch (NumberFormatException e) {
            problems.add("pages must be a number");   // a word where a number belongs
        }
        return problems;
    }

    // The ONE complaint desk: every 400 is written here, in the same shape.
    // In Spring this method sits in a @RestControllerAdvice and returns a ProblemDetail.
    static String handle(ValidationException exception) {
        return "400 " + exception.getMessage();
    }
}
