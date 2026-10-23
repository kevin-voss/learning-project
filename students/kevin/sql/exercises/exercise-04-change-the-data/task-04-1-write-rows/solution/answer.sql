-- Ideas: INSERT adds rows, UPDATE changes them (always with WHERE!), DELETE removes them.
-- Picture: filing a new card, correcting a card, shredding cards. The shredder does not ask twice —
-- run the WHERE in your head first, or a SELECT, before you DELETE.

-- 1. A new card. Values in the order the columns were declared.
INSERT INTO customers VALUES (6, 'fay', 'Berlin');

-- 2. A parcel for fay: customer_id 6 connects it to her row (that link is the foreign key).
INSERT INTO parcels VALUES (8, 6, 'Berlin', 500, 0);

-- 3. UPDATE without WHERE would change EVERY row. This WHERE keeps it to the Oslo piles.
UPDATE parcels SET delivered = 1 WHERE city = 'Oslo';

-- 4. DELETE without WHERE would empty the whole table. Under 100 g: only parcel 6.
DELETE FROM parcels WHERE weight_g < 100;

-- 5. Proof 1: six customers now, fay included.
SELECT id, name, city FROM customers ORDER BY id;

-- 6. Proof 2: parcel 6 is gone, every Oslo parcel (3, 5, 7) is delivered, 8 is not.
SELECT id, customer_id, delivered FROM parcels ORDER BY id;
