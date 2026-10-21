# Parcel database: step by step

> [!PICTURE]
> First you set up the cupboard and fill a few cards by hand. Only when that works do you send the Java clerk.
> When something breaks later, you know the cupboard was fine.

Do one step, run the command, see the result. Then go on.

## Step 1: Start Postgres in Docker

```bash
docker run --name parcels-db -e POSTGRES_PASSWORD=learn -e POSTGRES_DB=parcels -p 5432:5432 -d postgres:16
docker ps
```

- `--name parcels-db` gives the container a name you can use later.
- `-e` sets settings inside it: the password and a first database called `parcels`.
- `-p 5432:5432` opens the door from your computer into the container.
- `-d` runs it in the background.

You should see: one line in `docker ps` with `postgres:16` and `parcels-db`.

> [!NOTE]
> `learn` is a practice password for a database on your own computer only. Real passwords never go into code or Git.

## Step 2: Talk to the database with psql

`psql` is the database's own terminal. It is already inside the container.

```bash
docker exec -it parcels-db psql -U postgres -d parcels
```

You should see: a prompt `parcels=#`. Type `\q` to leave later.

## Step 3: Create the table and add cards

Type this inside `psql`. Every SQL command ends with `;`.

```sql
CREATE TABLE parcels (
    id            SERIAL       PRIMARY KEY,
    tracking_code VARCHAR(20)  NOT NULL UNIQUE,
    recipient     VARCHAR(255) NOT NULL,
    status        VARCHAR(32)  NOT NULL DEFAULT 'CREATED'
);
INSERT INTO parcels (tracking_code, recipient) VALUES ('PP-1001', 'Ava');
INSERT INTO parcels (tracking_code, recipient) VALUES ('PP-1002', 'Ben');
SELECT * FROM parcels;
```

You should see: a table with two rows. `id` is 1 and 2 (Postgres counts for you), and `status` is `CREATED` (the default).

## Step 4: Change and delete by hand

```sql
UPDATE parcels SET status = 'PICKED_UP' WHERE tracking_code = 'PP-1002';
INSERT INTO parcels (tracking_code, recipient) VALUES ('PP-1003', 'Test');
DELETE FROM parcels WHERE tracking_code = 'PP-1003';
SELECT * FROM parcels;
```

You should see: `UPDATE 1`, `INSERT 0 1`, `DELETE 1`, and then Ava `CREATED` and Ben `PICKED_UP`.

> [!WARN]
> An `UPDATE` or `DELETE` without `WHERE` changes **every** row. Always write the `WHERE` first.

That is CRUD: **C**reate (`INSERT`), **R**ead (`SELECT`), **U**pdate, **D**elete. Leave `psql` with `\q`.

## Step 5: Read the table from Java

1. Copy the whole `starter/` folder to your own place, for example `my-parcels/`, and go into it.
2. Look at `pom.xml`: the `postgresql` dependency is the JDBC driver. It knows how to talk to Postgres.
3. Fill in `findAll()` in `ParcelRepository`:

```java
try (Connection connection = connect();
     PreparedStatement statement = connection.prepareStatement(sql);
     ResultSet rows = statement.executeQuery()) {
    while (rows.next()) {             // move to the next row, false at the end
        parcels.add(toParcel(rows));
    }
}
```

4. Run:

```bash
mvn -q compile exec:java
```

5. Choose `1`.

You should see: Ava and Ben, with the same statuses as in `psql`.

> [!NOTE]
> The three things in `try ( ... )` are all closed at the end, in reverse order. A database allows only so many open connections. Forgetting to close them is a classic bug.

## Step 6: Add a parcel

A `?` in SQL is a hole. `setString(1, ...)` fills the first hole, `setString(2, ...)` the second.

```java
statement.setString(1, trackingCode);
statement.setString(2, recipient);
statement.executeUpdate();            // for INSERT, UPDATE and DELETE
```

1. Fill in `insert(...)` in the repository.
2. In `ParcelService.create`, refuse a blank recipient.
3. Run the program. Add `Cara`. Then add an empty recipient. Then List.

You should see: `Created PP-....`, then `Recipient cannot be empty.`, then three parcels.

## Step 7: Find, change and delete

1. `findByTrackingCode`: like `findAll`, with `setString(1, trackingCode)`. Return the parcel or `null`.
2. `updateStatus` and `delete`: fill the holes and `return statement.executeUpdate();`. That number is how many rows changed.
3. In the service: `changeStatus` refuses statuses that are not in `STATUSES`. If the repository returns `0`, the code does not exist. `delete` works the same way. `create` picks a new code while the one it picked is taken.
4. Run the program. Set `PP-1001` to `DELIVERED`. Try status `lost`. Delete `PP-1002`. Delete `PP-1002` again.

You should see: `Updated PP-1001`, a "Status must be one of ..." message, `Deleted PP-1002`, then `No parcel with tracking code PP-1002.`

## Step 8: Check both sides

1. Open `psql` again (step 2) and run `SELECT * FROM parcels;`.
2. Insert a parcel for `Dan` in `psql`. Choose List in Java.
3. Stop the database with `docker stop parcels-db`. Choose List in Java.

You should see: the Java changes in `psql`, Dan in Java, and then `Database problem: ...` with the hint to run `docker ps`. Start it again with `docker start parcels-db`.

> [!TRY]
> Run `docker rm -f parcels-db`, then step 1 again. Choose List.
> You should see: `Database problem: ... relation "parcels" does not exist`. A new container is an empty cupboard. Create the table again (step 3).

> [!CHECK]
> 1. What does `executeUpdate()` return for `DELETE FROM parcels WHERE tracking_code = ?` with an unknown code?
>    <details><summary>Answer</summary>0, because no row changed. The service turns that 0 into a clear message.</details>
> 2. Why does the service check the status, and not the repository?
>    <details><summary>Answer</summary>"Only these three statuses" is a business rule. The repository only stores and loads. Each layer has one job.</details>

Stuck? Compare with the [solution's repository](solution/src/main/java/parcels/ParcelRepository.java) and [service](solution/src/main/java/parcels/ParcelService.java).

**Next:** back to the [project page](README.md) and tick the "Done when" list.
