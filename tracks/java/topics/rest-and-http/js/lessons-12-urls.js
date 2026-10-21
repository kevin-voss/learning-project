// Lesson L: designing the URLs of a small REST API.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push({
    num: '12',
    id: 'designing-urls',
    title: 'Designing URLs',
    category: 'design',
    icon: '/',
    tagline: 'A small library API, step by step',
    realWorld: 'The addresses in a town. Town, street, house number, flat. You read them from big to small, and anyone who knows one address can guess how the next one works.',
    kid: [
      'Imagine you sort your toys into boxes. A box for books, a box for cars. Each book gets a number. Inside each book box there is a small bag for the stickers of that book.',
      'Then the address of a sticker bag is easy: "books, number 42, stickers". On the web you write it `/books/42/stickers`. Big things first, small things later.',
      'You never write what you **do** into the address. You do not write "take-out-book-42". The address only says **which thing**. What you do is the method.'
    ],
    definition: 'Designing URLs means choosing the paths of an API: one plural noun per collection, an id for each item, at most one level of sub-resources, and the query string for filters. Together with the methods they form the list of endpoints.',
    explain: [
      'Start with the **nouns** of your app. For a small library: books, authors, reviews, members. Each becomes a collection URL with a plural, lowercase noun: `/books`, `/authors`, `/members`.',
      'Each item gets its id after the collection: `/books/42`. The id is stable and says nothing else. The title can change, the id stays.',
      'Things that belong to one item become a **sub-resource**: the reviews of book 42 are `/books/42/reviews`. Stay at one level. `/authors/7/books/42/reviews/3` is too deep. Review 3 is better at `/reviews/3`.',
      'Filters, sorting and pages go in the query string, not in the path: `/books?author=7&sort=title&page=2`. The path still names the collection.',
      'Then pick methods for each URL. Collections usually support GET and POST. Items support GET, PUT or PATCH, and DELETE. Anything else gets 405.'
    ],
    why: 'Good URLs let a developer guess the API without reading all the documentation. They also keep the server code simple: one handler per collection.',
    whenUse: 'Before you write the first line of a server, and every time you add a new kind of data to an API.',
    syntax: '/collection   /collection/{id}   /collection/{id}/sub-collection   /collection?filter=value&sort=field&page=2',
    fileName: 'LibraryRouter.java',
    code: `public class LibraryRouter {
    public static void main(String[] args) {
        String[][] requests = {
            {"GET", "/books"}, {"POST", "/books"}, {"GET", "/books/42"}, {"PATCH", "/books/42"},
            {"DELETE", "/books/42"}, {"GET", "/books/42/reviews"}, {"POST", "/books/42/reviews"},
            {"GET", "/authors/7"}, {"PUT", "/books"}, {"GET", "/getBooks"}
        };
        for (String[] request : requests) {
            System.out.printf("%-6s %-17s -> %s%n", request[0], request[1], route(request[0], request[1]));
        }
    }

    // Decides what a request means, the way a REST server does.
    static String route(String method, String path) {
        String[] parts = path.substring(1).split("/"); // "/books/42" -> ["books", "42"]
        String collection = parts[0];
        if (!collection.equals("books") && !collection.equals("authors")) {
            return "404 no such resource";
        }
        if (parts.length == 1) {                        // /books
            return switch (method) {
                case "GET" -> "200 list all " + collection;
                case "POST" -> "201 create one in " + collection;
                default -> "405 not allowed on a collection";
            };
        }
        String item = collection + " " + parts[1];
        if (parts.length == 2) {                        // /books/42
            return switch (method) {
                case "GET" -> "200 read " + item;
                case "PUT" -> "200 replace " + item;
                case "PATCH" -> "200 change " + item;
                case "DELETE" -> "204 delete " + item;
                default -> "405 not allowed on an item";
            };
        }
        return switch (method) {                         // /books/42/reviews
            case "GET" -> "200 list " + parts[2] + " of " + item;
            case "POST" -> "201 add to " + parts[2] + " of " + item;
            default -> "405 not allowed here";
        };
    }
}`,
    output: `GET    /books            -> 200 list all books
POST   /books            -> 201 create one in books
GET    /books/42         -> 200 read books 42
PATCH  /books/42         -> 200 change books 42
DELETE /books/42         -> 204 delete books 42
GET    /books/42/reviews -> 200 list reviews of books 42
POST   /books/42/reviews -> 201 add to reviews of books 42
GET    /authors/7        -> 200 read authors 7
PUT    /books            -> 405 not allowed on a collection
GET    /getBooks         -> 404 no such resource`,
    codeSummary: 'A router without a network: it takes a method and a path and says what a REST server would do. The shape of the path (collection, item, sub-collection) and the method together decide the action.',
    codeExplanation: [
      { label: 'Line 3', code: 'String[][] requests = {', text: 'Ten test requests, each `{method, path}`. Running them without a server makes the design easy to check.' },
      { label: 'Line 9', code: 'System.out.printf("%-6s %-17s -> %s%n", request[0], request[1], route(request[0], request[1]));', text: '`%-6s` pads the text to 6 characters on the left, so the columns line up. `%n` is a line break.' },
      { label: 'Line 15', code: 'String[] parts = path.substring(1).split("/"); // "/books/42" -> ["books", "42"]', text: 'Drops the first `/` and cuts the path into its pieces. The number of pieces tells you the level.' },
      { label: 'Line 17', code: 'if (!collection.equals("books") && !collection.equals("authors")) {', text: 'Only known nouns are resources. `/getBooks` is not one, so it gets 404.' },
      { label: 'Line 20', code: 'if (parts.length == 1) {                        // /books', text: 'One piece: the collection. Only GET (list) and POST (create) make sense here.' },
      { label: 'Line 23', code: 'case "POST" -> "201 create one in " + collection;', text: 'POST goes to the collection, the server picks the new id.' },
      { label: 'Line 28', code: 'if (parts.length == 2) {                        // /books/42', text: 'Two pieces: one item. Read, replace, change or delete it.' },
      { label: 'Line 37', code: 'return switch (method) {                         // /books/42/reviews', text: 'Three pieces: a sub-collection that belongs to one item.' }
    ],
    sections: [
      {
        title: 'Step 1: find the nouns, draw the tree',
        text: [
          'Write down what your app keeps: books, authors, reviews, members, loans. Each is a collection. Then ask: does it only make sense inside another one? Reviews belong to a book, so they can also hang under it.'
        ],
        mermaid: 'flowchart TD\n  R["/"] --> B["/books"]\n  R --> A["/authors"]\n  R --> M["/members"]\n  B --> B1["/books/42"]\n  B1 --> BR["/books/42/reviews"]\n  A --> A1["/authors/7"]\n  A1 --> AB["/authors/7/books"]\n  M --> M1["/members/5"]\n  M1 --> ML["/members/5/loans"]',
        diagramNote: 'Big to small, like a street address. 42, 7 and 5 stand for any id. No path goes deeper than one sub-collection.'
      },
      {
        title: 'Step 2: pick the methods',
        text: ['Now give each URL its methods and the success code. This table is the whole design of the small library API.'],
        table: {
          head: ['Method', 'Path', 'Meaning', 'Success'],
          rows: [
            ['`GET`', '`/books?author=7&sort=title`', 'list books, filtered and sorted', '`200`'],
            ['`POST`', '`/books`', 'add a book', '`201` + `Location`'],
            ['`GET`', '`/books/{id}`', 'read one book', '`200`'],
            ['`PUT`', '`/books/{id}`', 'replace one book', '`200`'],
            ['`PATCH`', '`/books/{id}`', 'change some fields', '`200`'],
            ['`DELETE`', '`/books/{id}`', 'remove one book', '`204`'],
            ['`GET`', '`/books/{id}/reviews`', 'the reviews of one book', '`200`'],
            ['`POST`', '`/books/{id}/reviews`', 'write a review', '`201`'],
            ['`GET`', '`/authors/{id}/books`', 'the books of one author', '`200`'],
            ['`POST`', '`/members/{id}/loans`', 'lend a book to a member', '`201`']
          ],
          note: 'Lending is an action, but it creates a loan. Turning actions into nouns like this keeps the API in REST style.'
        }
      },
      {
        title: 'Naming rules',
        text: ['Short rules that most public APIs follow.'],
        bullets: [
          'Plural nouns for collections: `/books`, not `/book`.',
          'Lowercase, words joined with hyphens: `/book-loans`, not `/BookLoans` or `/book_loans`.',
          'No verbs: the method is the verb. `/books/42`, not `/books/42/delete`.',
          'No file endings: `/books/42`, not `/books/42.json`. Use the `Accept` header for the format.',
          'No trailing slash: `/books`, not `/books/`. Pick one and stay with it.',
          'Put a version at the front when the API is public: `/v1/books`. A new, incompatible shape gets `/v2`.'
        ],
        table: {
          head: ['Wrong', 'Right'],
          rows: [
            ['`GET /getBookById?id=42`', '`GET /books/42`'],
            ['`POST /books/42/update`', '`PATCH /books/42`'],
            ['`GET /books/byAuthor/7`', '`GET /books?author=7` or `GET /authors/7/books`'],
            ['`GET /Books/42/Reviews/3`', '`GET /reviews/3`']
          ]
        }
      },
      {
        title: 'Edge cases to decide early',
        text: ['Decide these once, write them down, and answer the same way on every endpoint.'],
        table: {
          head: ['Case', 'Good answer'],
          rows: [
            ['`GET /books/999`, the id does not exist', '`404 Not Found`'],
            ['`GET /books/abc`, the id is not a number', '`400 Bad Request` (or `404`, but always the same)'],
            ['`GET /books?author=999`, no book matches', '`200 OK` with `[]`: an empty list is a fine answer'],
            ['`PUT /books`, a method the URL does not support', '`405 Method Not Allowed` + `Allow: GET, POST`'],
            ['`GET /books?page=0`', '`400 Bad Request`, if pages start at 1']
          ]
        },
        tip: 'A filter that finds nothing is not a 404. The collection exists, it only has no matching items.'
      }
    ],
    technical: [
      'A URL is split by the client and server into parts with fixed rules (RFC 3986): scheme, host, port, path, query, fragment. The part after `#`, the fragment, never reaches the server at all.',
      'Paths are case-sensitive on most servers: `/Books` and `/books` are different paths. Hosts are not: `API.example.com` is `api.example.com`. Lowercase paths avoid the confusion.',
      'Frameworks turn a path pattern like `/books/{id}` into the same kind of `split` and `switch` as in the example. In Spring this looks like `@GetMapping("/books/{id}")` on a method, and the framework passes the `id` in as a parameter.'
    ],
    tryIt: {
      steps: [
        'Run `LibraryRouter.java`.',
        'Add `{"GET", "/members/3"}` to the requests.',
        'Add `"members"` to the known collections in `route` and run it again.'
      ],
      see: 'First a line for `/members/3` that ends in `404 no such resource`. After your change it ends in `200 read members 3`.'
    },
    check: [
      { q: 'Design the URL for "all loans of member 5".', a: '`GET /members/5/loans`.' },
      { q: 'Where do you put "sorted by year": `/books/sorted-by-year` or `/books?sort=year`?', a: '`/books?sort=year`. Sorting is a way to look at the collection, so it belongs in the query string.' },
      { q: '`GET /books?author=999` finds no book. 404 or 200?', a: '`200 OK` with an empty list `[]`. The collection exists, nothing matched the filter.' }
    ],
    keyPoints: [
      'One plural, lowercase noun per collection: `/books`.',
      'Items by id: `/books/42`. Sub-resources one level deep: `/books/42/reviews`.',
      'Filters, sorting and paging in the query string.',
      'No verbs, no file endings, no trailing slash.',
      'Write the design as a table of method, path, meaning and success code.'
    ],
    commonMistakes: [
      '`/books/42/delete`. Fix: `DELETE /books/42`.',
      'Deep nesting such as `/authors/7/books/42/reviews/3`. Fix: `/reviews/3`, and `/books/42/reviews` for the list.',
      'Using the title as the id: `/books/the-best-cake`. A changed title breaks every link. Fix: a stable id.',
      'Mixing `/book/42` and `/books`. Fix: plural everywhere.'
    ],
    related: ['What REST Means', 'GET', 'Status Codes'],
    glossary: G
  });
})();
