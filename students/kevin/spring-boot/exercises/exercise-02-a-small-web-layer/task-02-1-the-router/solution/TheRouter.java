import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.stream.Collectors;

// A tiny web layer: a router (Spring's DispatcherServlet) plus handler methods (the @RestController).
// Picture: a switchboard operator — a request is method + path, and the operator connects it
// to one handler. Request stands for the HTTP exchange; Response stands for the ResponseEntity.
// route() is the part Spring does for you; listBooks/getBook/deleteBook are the controller methods.

record Request(String method, String path) {}

record Response(int status, String body) {

    // 204 No Content: worked, nothing to say back — no body at all.
    static Response of(int status) {
        return new Response(status, "");
    }
}

public class TheRouter {

    // The shelf: LinkedHashMap keeps id order, so the list prints in order even after deletes.
    private final Map<Integer, String> books = new LinkedHashMap<>();

    TheRouter() {
        books.put(1, "Dune");          // preloaded in code, like data.sql in a real app
        books.put(2, "Emma");
        books.put(3, "Persuasion");
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine().trim());
        TheRouter app = new TheRouter();
        for (int i = 0; i < n; i++) {
            String[] parts = in.nextLine().trim().split(" ", 2);
            Request request = new Request(parts[0], parts[1]);
            System.out.println(request.method() + " " + request.path() + " -> " + app.route(request));
        }
    }

    // The switchboard: match method + path pattern, then call ONE handler method.
    String route(Request request) {
        if (request.method().equals("GET") && request.path().equals("/books")) {
            return render(listBooks());
        }
        Integer id = idFrom(request.path());
        if (id != null && request.method().equals("GET")) {
            return render(getBook(id));
        }
        if (id != null && request.method().equals("DELETE")) {
            return render(deleteBook(id));
        }
        // Nothing matched: the operator says so, with the method and path repeated.
        return render(new Response(404, "no route for " + request.method() + " " + request.path()));
    }

    // /books/2 -> 2; /books or /books/two -> null, so no route fits.
    private static Integer idFrom(String path) {
        String[] parts = path.split("/");
        if (parts.length != 3 || !parts[1].equals("books")) {
            return null;
        }
        try {
            return Integer.parseInt(parts[2]);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    Response listBooks() {
        String titles = books.values().stream().collect(Collectors.joining(", "));
        return new Response(200, "[" + titles + "]");
    }

    // A missing id is a 404 with a message, not a crash.
    Response getBook(int id) {
        String title = books.get(id);
        if (title == null) {
            return new Response(404, "book " + id + " not found");
        }
        return new Response(200, title);
    }

    // Deleting a missing id is also a 404; a real delete answers 204 with no body.
    Response deleteBook(int id) {
        String removed = books.remove(id);
        if (removed == null) {
            return new Response(404, "book " + id + " not found");
        }
        return Response.of(204);
    }

    // ResponseEntity: status first, body after; an empty body prints as just the status.
    static String render(Response response) {
        return response.body().isEmpty()
                ? String.valueOf(response.status())
                : response.status() + " " + response.body();
    }
}
