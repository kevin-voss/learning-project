-- Pokédex schema (runs once on first Docker Postgres start)

CREATE TABLE pokemon (
  id          INT PRIMARY KEY,
  name        VARCHAR(64) NOT NULL UNIQUE,
  height_dm   INT NOT NULL,
  weight_hg   INT NOT NULL,
  sprite_url  TEXT
);

CREATE TABLE pokemon_type (
  pokemon_id  INT NOT NULL REFERENCES pokemon(id) ON DELETE CASCADE,
  slot        INT NOT NULL,
  type_name   VARCHAR(32) NOT NULL,
  PRIMARY KEY (pokemon_id, slot)
);

CREATE INDEX idx_pokemon_name ON pokemon (name);
CREATE INDEX idx_pokemon_type_name ON pokemon_type (type_name);
