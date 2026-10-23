-- Ideas: JOIN puts two tables side by side; ON says which rows belong together.
-- Picture: two lists on one desk — parcels on the left, customers on the right.
-- ON draws a line from parcels.customer_id to customers.id and glues matching rows.

-- 1. p and c are short names (aliases). The glued row has all columns of both lists,
--    so pick with the prefix: p.id is the parcel's, c.name the customer's.
SELECT p.id, c.name
FROM parcels p
JOIN customers c ON p.customer_id = c.id
ORDER BY p.id;

-- 2. A JOIN behaves like one big table: WHERE and ORDER BY work on it as usual.
--    c.city is the customer's home city, NOT the parcel's delivery city.
SELECT p.id, p.city, p.weight_g
FROM parcels p
JOIN customers c ON p.customer_id = c.id
WHERE c.city = 'Oslo'
ORDER BY p.id;

-- 3. GROUP BY after a JOIN groups the glued rows: one pile per customer,
--    the pile holds their parcels. Customers without parcels never appear here —
--    an INNER join keeps only rows with a partner on both sides (task 03_2).
SELECT c.name, SUM(p.weight_g)
FROM customers c
JOIN parcels p ON p.customer_id = c.id
GROUP BY c.name
ORDER BY SUM(p.weight_g) DESC;
