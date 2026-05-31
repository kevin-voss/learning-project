-- Exercise 2: Find all Pokémon that have the type "fire"

SELECT p.id, p.name, pt.type_name
FROM pokemon p
INNER JOIN pokemon_type pt ON pt.pokemon_id = p.id
WHERE pt.type_name = 'fire'
ORDER BY p.id;
