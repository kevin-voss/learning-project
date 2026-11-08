export function bucketsToEmpty(names) {
  return (names || []).filter(function (name) { return String(name).startsWith("lp-lab-"); });
}
