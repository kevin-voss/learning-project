-- The parcel office: five customers and their parcels.
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL
);
CREATE TABLE parcels (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  city TEXT NOT NULL,
  weight_g INTEGER NOT NULL,
  delivered INTEGER NOT NULL            -- 1 = arrived, 0 = on the way
);
INSERT INTO customers VALUES
  (1, 'ana', 'Berlin'), (2, 'ben', 'Oslo'), (3, 'cy', 'Berlin'), (4, 'dee', 'Rome'), (5, 'eli', 'Oslo');
INSERT INTO parcels VALUES
  (1, 1, 'Berlin', 1200, 1), (2, 1, 'Berlin', 800, 1), (3, 2, 'Oslo', 2000, 0), (4, 3, 'Berlin', 350, 1),
  (5, 5, 'Oslo', 1500, 0), (6, 5, 'Oslo', 90, 1), (7, 2, 'Oslo', 1200, 1);
