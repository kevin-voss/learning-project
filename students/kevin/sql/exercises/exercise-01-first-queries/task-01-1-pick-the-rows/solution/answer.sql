-- Ideas: SELECT picks columns, WHERE picks rows, ORDER BY fixes the order.
-- Picture: a filing cabinet. SELECT says which fields of the card you copy out,
-- WHERE says which cards you pull, ORDER BY says how you stack them.

-- 1. Every column (*) of every customer. ORDER BY: a table has no promised order;
--    without it the database may hand rows back in any sequence.
SELECT * FROM customers ORDER BY id;

-- 2. Only two columns, only the Berlin cards. Text sits in single quotes.
SELECT name, city FROM customers WHERE city = 'Berlin';

-- 3. A number comparison: > works like in Java. Column order in SELECT is the output order.
SELECT id, weight_g FROM parcels WHERE weight_g > 1000;
