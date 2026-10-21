# Project 11: Parcel database

> [!PICTURE]
> A post office keeps a big cupboard of index cards, one card per parcel: tracking code, recipient, status.
> The cupboard is the **database**. It sits in a shipping container of its own (**Docker**).
> Your Java program walks up to the cupboard with a form (**SQL**), and the clerk (**JDBC**) brings the cards back.

Until now your data lived in memory or in a CSV file. Now it lives in PostgreSQL, a real database. This is the first piece of **ParcelPilot**, the app you build in the Spring Boot course.

## What you build

First, by hand in the database:

```text
parcels=# SELECT * FROM parcels;
 id | tracking_code | recipient | status
----+---------------+-----------+---------
  1 | PP-1001       | Ava       | CREATED
  2 | PP-1002       | Ben       | CREATED
```

Then a Java program that does the same from a menu:

```text
1) List  2) Add  3) Change status  4) Delete  5) Quit
> 2
Recipient: Cara
Created PP-7870
> 3
Tracking code: PP-1001
New status (CREATED, PICKED_UP, DELIVERED): DELIVERED
Updated PP-1001
> 1
  1  PP-1001   Ava          DELIVERED
  2  PP-1002   Ben          CREATED
  3  PP-7870   Cara         CREATED
```

The program has three layers, like a real server:

| File | Layer | Job |
|---|---|---|
| `Main.java` | outside | The menu. Asks and prints. (ready) |
| `ParcelService.java` | service | The rules: recipient not empty, only known statuses, new tracking codes. |
| `ParcelRepository.java` | repository | The only class with SQL. Talks to Postgres with JDBC. |
| `Parcel.java` | model | One row as a Java object. (ready) |

## What you need to know

- [How a Java server is structured](../../sheets/java/server-layers.md): controller (here: the menu), service, repository.
- [Databases and SQL](../../tracks/computer-science/index.html#database-sql-fundamentals): tables, `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- [Docker and containers](../../tracks/computer-science/index.html#docker-containers): images, containers, ports.
- Maven and a dependency from [Project 10](../10-java-weather-cli/README.md).

New: run Postgres in Docker, use it with `psql`, and reach it from Java with JDBC: `PreparedStatement` and try-with-resources.

You need [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker on Linux) installed and running.

## Rules

- Every SQL with a value from the user uses `?` and `PreparedStatement`. Never glue user text into SQL with `+`.
- Every connection, statement and result is closed (try-with-resources).
- Only `ParcelRepository` contains SQL. `Main` never sees a `Connection`.
- An empty recipient, an unknown status (`lost`) or an unknown tracking code prints a short message. No stack trace.
- When the database is not running, the menu says so and keeps going.

## Done when

- [ ] `docker ps` shows your `parcels-db` container.
- [ ] In `psql` you created the table, inserted two parcels, changed one and deleted one by hand.
- [ ] The Java menu lists, adds, changes and deletes parcels.
- [ ] A change made in Java shows up in `psql`, and the other way round.
- [ ] Stop the container (`docker stop parcels-db`), choose List: a friendly "Database problem" message.

**Extra:** add "Find by recipient". The SQL needs `WHERE recipient = ?`.

## Files

- [step-by-step.md](step-by-step.md): from `docker run` to a working menu.
- [starter/pom.xml](starter/pom.xml): the Maven project with the Postgres driver. `TODO` comments in `ParcelRepository.java` and `ParcelService.java`.
- [solution/schema.sql](solution/schema.sql) and [solution/pom.xml](solution/pom.xml): one finished answer, see [ParcelRepository.java](solution/src/main/java/parcels/ParcelRepository.java).

> [!CHECK]
> 1. Why is `"... WHERE tracking_code = '" + code + "'"` dangerous?
>    <details><summary>Answer</summary>The user could type SQL into <code>code</code>, for example <code>' OR '1'='1</code>. That is SQL injection. With <code>?</code> the driver sends the value as plain data, never as SQL.</details>
> 2. Which class would change if you swapped Postgres for another database?
>    <details><summary>Answer</summary>Only ParcelRepository. The service rules and the menu stay the same. That is why the layers exist.</details>
> 3. What does `-p 5432:5432` in the docker command do?
>    <details><summary>Answer</summary>It connects port 5432 on your computer to port 5432 inside the container, so Java on your computer can reach the database.</details>

**Next:** the [Spring Boot course](../../tracks/spring-boot/README.md). In [Step 10](../../tracks/spring-boot/topics/10-persistence/README.md) the same `parcels` table comes back, and Spring writes the JDBC code for you.
