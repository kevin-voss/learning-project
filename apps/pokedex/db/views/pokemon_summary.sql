-- Readable view for SQL learning (joined types as a comma-separated list)

CREATE OR REPLACE VIEW pokemon_summary AS
SELECT
  p.id,
  p.name,
  p.height_dm,
  p.weight_hg,
  p.sprite_url,
  STRING_AGG(pt.type_name, ', ' ORDER BY pt.slot) AS types
FROM pokemon p
LEFT JOIN pokemon_type pt ON pt.pokemon_id = p.id
GROUP BY p.id, p.name, p.height_dm, p.weight_hg, p.sprite_url;
