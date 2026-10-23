-- Ideas: LEFT JOIN keeps the left table complete; IS NULL finds the rows with no partner.
-- Picture: read out the customer list and look for each name in the parcel list.
-- INNER join would stop reading at dee; LEFT JOIN reads everyone and leaves dee's line empty.

-- 1. LEFT JOIN: every customer appears, with or without parcels. COUNT(p.id) counts
--    only REAL parcel rows — dee's missing side counts 0, which is the point.
--    (COUNT(*) would wrongly say 1: the row exists, its parcel half is empty.)
SELECT c.name, COUNT(p.id)
FROM customers c
LEFT JOIN parcels p ON p.customer_id = c.id
GROUP BY c.name
ORDER BY c.name;

-- 2. The same two joins with COUNT(*): the inner join has 7 rows, one per parcel.
SELECT COUNT(*) FROM customers c JOIN parcels p ON p.customer_id = c.id;

-- 3. The left join has 8: the 7 parcels PLUS dee's empty line.
SELECT COUNT(*) FROM customers c LEFT JOIN parcels p ON p.customer_id = c.id;

-- 4. The empty lines ARE the answer: a left side with no partner has NULL
--    on every right column. "equals NULL" never works — NULL is compared with IS.
SELECT c.name
FROM customers c
LEFT JOIN parcels p ON p.customer_id = c.id
WHERE p.id IS NULL;
