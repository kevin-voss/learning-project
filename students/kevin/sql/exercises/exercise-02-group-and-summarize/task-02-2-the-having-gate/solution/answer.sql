-- Ideas: HAVING filters groups (after GROUP BY), WHERE filters rows (before it).
-- Picture: first you make the piles, then a gate lets only the big piles through.
-- WHERE is the gate at the door for single parcels; HAVING is the gate for whole piles.

-- 1. Piles with more than two parcels. COUNT(*) does not exist before the piles exist,
--    so this condition belongs in HAVING, not in WHERE.
SELECT city, COUNT(*) FROM parcels GROUP BY city HAVING COUNT(*) > 2 ORDER BY city;

-- 2. Piles heavier than 3000 g together.
SELECT city, SUM(weight_g) FROM parcels GROUP BY city HAVING SUM(weight_g) > 3000 ORDER BY city;

-- 3. Count and average per pile, only piles of three or more, heaviest average first.
--    You may ORDER BY an aggregate.
SELECT city, COUNT(*), AVG(weight_g)
FROM parcels
GROUP BY city
HAVING COUNT(*) >= 3
ORDER BY AVG(weight_g) DESC;
