-- Ideas: ORDER BY (ASC is the default, DESC turns it around), LIMIT, DISTINCT, a first COUNT.
-- Picture: the same filing cabinet, but now you sort the stack, take only the top cards,
-- and cross out duplicates.

-- 1. A to Z. Text sorts alphabetically; ASC is what you get when you write nothing.
SELECT name FROM customers ORDER BY name;

-- 2. Heaviest first (DESC), then keep only the top two. LIMIT runs AFTER the sort.
SELECT id, weight_g FROM parcels ORDER BY weight_g DESC LIMIT 2;

-- 3. DISTINCT drops repeated values: each city once. Still sorted, so the answer is stable.
SELECT DISTINCT city FROM customers ORDER BY city;

-- 4. COUNT(*) counts rows and gives ONE number, not a list. More of this in exercise 02.
SELECT COUNT(*) FROM parcels;
