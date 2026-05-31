-- Exercise 3: Count how many Pokémon have each type

SELECT pt.type_name, COUNT(*) AS pokemon_count
FROM pokemon_type pt
GROUP BY pt.type_name
ORDER BY pokemon_count DESC, pt.type_name;
