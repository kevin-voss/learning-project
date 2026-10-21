window.SD = window.SD || {};
/* Each zone has one theme token. color / bg are CSS values for HTML styles;
   use SD.token(zone.token) when you need the real colour (SVG, canvas). */
SD.ZONES = {};
[
  ['foundations', 'Foundations', '--lp-read'],
  ['data', 'Data Layer', '--lp-do'],
  ['comms', 'Communication', '--lp-check'],
  ['arch', 'Architecture', '--lp-code-keyword'],
  ['theory', 'Theory', '--lp-code-title'],
].forEach(([id, label, token]) => {
  const v = `var(${token}, ${SD.FALLBACK[token]})`;
  SD.ZONES[id] = {
    label,
    token,
    color: v,
    bg: `color-mix(in srgb, ${v} 12%, transparent)`,
    line: `color-mix(in srgb, ${v} 35%, transparent)`,
  };
});
