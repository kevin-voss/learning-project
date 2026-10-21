# EXPLAIN and the N+1 problem

> [!PICTURE]
> In a small warehouse the worker walks along every shelf to find all `CREATED` parcels. In a huge warehouse that takes all day, so you hang up a **signpost list**: "CREATED parcels: aisle 3". `EXPLAIN` is asking the worker, before he walks: "how will you find them?". He answers "I will walk every shelf" or "I will use the signpost".

What an index is, and when it helps or hurts, is taught in [Database design and scaling](../../../computer-science/index.html#database-design-scaling). This page shows the two things you do in ParcelPilot: read a query plan, and spot the N+1 trap.

## Ask PostgreSQL for its plan

Open `psql` in the database container from step 10:

```bash
docker exec -it parcelpilot-db psql -U parcelpilot -d parcelpilot
```

```sql
EXPLAIN SELECT * FROM parcels WHERE status = 'CREATED';
```

```text
 Seq Scan on parcels  (cost=0.00..25.88 rows=6 width=98)
   Filter: ((status)::text = 'CREATED'::text)
```

**Seq Scan** means "read every row". Fine for 50 parcels, slow for 5 million.

> [!TRY]
> 1. Fill the table with 100,000 throwaway parcels, add an index, and ask again:
>    ```sql
>    INSERT INTO parcels (id, recipient, status, version)
>    SELECT 'GEN-' || n, 'Recipient ' || n,
>           (ARRAY['CREATED','PICKED_UP','DELIVERED'])[1 + n % 3], 0
>    FROM generate_series(1, 100000) AS n;
>    CREATE INDEX idx_parcels_status ON parcels (status);
>    EXPLAIN ANALYZE SELECT * FROM parcels WHERE status = 'CREATED';
>    ```
> 2. Clean up: `DELETE FROM parcels WHERE id LIKE 'GEN-%';`
>
> You should see: `Bitmap Index Scan on idx_parcels_status` and an `Execution Time`. `EXPLAIN ANALYZE` really runs the query, so you can compare before and after.

> [!NOTE]
> A tiny table may still say **Seq Scan** after you add an index. For a few rows, reading everything is cheaper, and the planner knows it. The primary key `id` always has an index already, so `findById` was fast from the start.

To keep an index, add it as your next Flyway migration, for example `V2__add_status_index.sql` ([naming rules](flyway-migrations-explained.md)).

## The N+1 problem

An index makes **one** query fast. N+1 makes you run **too many** queries. You load 100 parcels (1 query), then touch a lazily loaded relation on each one, and JPA quietly fires 100 more queries: **1 + N**. No index can save you from a hundred round trips.

ParcelPilot has no entity relations yet, so you cannot hit it today. When relations arrive, catch it by watching the SQL:

```properties
# application.properties, local only
spring.jpa.show-sql=true
```

One user action that prints a waterfall of near-identical `SELECT`s is the sign. The fix (a fetch join or a dedicated query) can wait until you really have the problem.

> [!CHECK]
> 1. What does `Seq Scan` in a plan mean?
>    <details><summary>Answer</summary>PostgreSQL reads every row of the table to answer the query. No index is used.</details>
> 2. What is the difference between `EXPLAIN` and `EXPLAIN ANALYZE`?
>    <details><summary>Answer</summary><code>EXPLAIN</code> only shows the plan. <code>EXPLAIN ANALYZE</code> runs the query and adds real timings.</details>
> 3. Loading 100 parcels prints 101 `SELECT`s. What is happening?
>    <details><summary>Answer</summary>The N+1 problem: one query for the list, then one extra query per parcel for a lazily loaded relation.</details>

**Next:** back to [Step 10](README.md).
