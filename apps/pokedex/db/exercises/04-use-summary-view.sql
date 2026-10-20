-- Exercise 4: Use the pokemon_summary view (types already combined)

SELECT id, name, types, height_dm, weight_hg
FROM pokemon_summary
WHERE types LIKE '%electric%'
ORDER BY name;
