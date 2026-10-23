-- Ideas: CREATE TABLE draws the empty card itself — columns, types and the rules
-- (PRIMARY KEY, NOT NULL, UNIQUE, CHECK, REFERENCES). Picture: before filing any card,
-- you print the form: its fields, and which fields the office insists on.

-- 1. The form for senders. INTEGER PRIMARY KEY is the row's unique number;
--    UNIQUE means the database refuses a second hana.
CREATE TABLE senders (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL
);

-- 2. Fill it. The rules are checked here: a second 'hana' or a missing city would fail.
INSERT INTO senders VALUES (1, 'hana', 'Oslo'), (2, 'ivan', 'Berlin');

-- 3. The letters form: sender_id points at senders(id) (foreign key),
--    CHECK is a rule every row must keep — zero-word letters are impossible.
CREATE TABLE letters (
  id INTEGER PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES senders(id),
  words INTEGER NOT NULL CHECK (words > 0)
);

-- 4. Two letters that keep every rule.
INSERT INTO letters VALUES (10, 2, 90), (11, 1, 240);

-- 5. Proof: the two tables glued by the foreign key — the JOIN from exercise 03.
SELECT l.id, s.name, l.words
FROM letters l
JOIN senders s ON l.sender_id = s.id
ORDER BY l.id;
