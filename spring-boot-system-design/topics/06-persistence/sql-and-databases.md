# Databases and SQL basics

Before wiring ParcelPilot to PostgreSQL, understand what a relational database is and the handful of SQL commands you'll meet.

## The problem (real world)

A delivery company must never lose parcels when the app restarts, and must answer questions like "show all parcels for Ava that are still CREATED". A plain in-memory `Map` can't survive a restart and can't answer rich questions efficiently. A **database** is purpose-built for durable, queryable data.

## What is a relational database?

Data lives in **tables**: columns (fields) and rows (records). It's like a spreadsheet with strict rules (types, uniqueness) and a powerful query language.

```text
parcels table
+-------+-----------+-----------+---------+
| id    | recipient | status    | version |
+-------+-----------+-----------+---------+
| P-1   | Ava       | CREATED   | 0       |
| P-2   | Ben       | PICKED_UP | 3       |
+-------+-----------+-----------+---------+
```

## Key words

| Word | Meaning |
|---|---|
| **Table** | A named collection of rows with fixed columns. |
| **Row / record** | One entry (one parcel). |
| **Column** | One field of every row (e.g. `status`). |
| **Primary key** | The column that uniquely identifies a row (`id`). |
| **SQL** | Structured Query Language, how you talk to the database. |
| **Query** | A request for data (a `SELECT`). |
| **Index** | A lookup structure that makes some queries fast. |
| **Schema** | The definition of tables and columns. |

## The SQL you'll actually see

```sql
-- create the table (this is your migration V1)
CREATE TABLE parcels (
    id         VARCHAR(64) PRIMARY KEY,
    recipient  VARCHAR(255) NOT NULL,
    status     VARCHAR(32)  NOT NULL,
    version    BIGINT       NOT NULL DEFAULT 0
);

-- insert a row
INSERT INTO parcels (id, recipient, status) VALUES ('P-1', 'Ava', 'CREATED');

-- read rows (a query)
SELECT * FROM parcels WHERE status = 'CREATED';

-- change a row
UPDATE parcels SET status = 'PICKED_UP' WHERE id = 'P-1';

-- remove a row
DELETE FROM parcels WHERE id = 'P-1';
```

Good news: in ParcelPilot you mostly won't write SQL by hand, because **JPA** (next page) generates it from your Java. But you should recognize what it's doing.

## Why PostgreSQL (and the alternatives)

| Database | Type | Pros | Cons | Why/when |
|---|---|---|---|---|
| **PostgreSQL** (our choice) | Relational (SQL) | free, powerful, reliable, great features, ubiquitous | needs a running server | default choice for structured data with relationships |
| **MySQL / MariaDB** | Relational (SQL) | popular, fast, well-supported | fewer advanced features than Postgres | web apps, when a team already knows it |
| **SQLite** | Relational (file) | zero-setup, single file | not for concurrent server workloads | tiny apps, tests, mobile |
| **MongoDB** | Document (NoSQL) | flexible schema, JSON-like docs | weaker multi-record transactions, easy to model badly | rapidly-changing or document-shaped data |
| **Redis** | Key-value (in-memory) | extremely fast | not a durable source of truth by default | caching (that's step 11!), sessions |

**Why we pick PostgreSQL:** parcels have a clear, stable structure and relationships, we want reliable transactions (for locking), and Postgres is the industry-standard free relational database that runs trivially in Docker. It's the safe default you can grow with.

## Relational vs NoSQL in one line

Use **relational** (Postgres) when data is structured with clear relationships and you value consistency, like parcels. Use **NoSQL** when the shape varies a lot or you need a specific scaling model. Choosing NoSQL "because it's modern" is a common mistake.

## Back to the step

Return to [Step 06](README.md) and start Postgres in Docker.
