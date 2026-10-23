-- Ideas: GROUP BY makes one row per group; COUNT, SUM and AVG summarize each group.
-- Picture: sorting parcels into one pile per city, then writing one line per pile:
-- how many, how heavy together, how heavy on average.

-- 1. One row per city with the number of customers in it. Every column that is not
--    inside an aggregate (here: city) must be in GROUP BY.
SELECT city, COUNT(*) FROM customers GROUP BY city ORDER BY city;

-- 2. Two summaries of the same pile at once: count and total weight.
SELECT city, COUNT(*), SUM(weight_g) FROM parcels GROUP BY city ORDER BY city;

-- 3. No GROUP BY: the whole table is one pile, so AVG gives one number.
--    WHERE filters the rows BEFORE they are averaged. AVG returns a decimal.
SELECT AVG(weight_g) FROM parcels WHERE delivered = 1;
