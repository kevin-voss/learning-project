export function auditResult(input) {
  if (!input || input.stackExists == null) return "AUDIT-INCOMPLETE";
  if (input.stackExists) return "LEFTOVERS-FOUND";
  if (input.tagsRemain || input.prefixHits) return "PENDING-AWS-CLEANUP";
  if (input.createsUnchecked) return "AUDIT-INCOMPLETE";
  return "NO-LAB-RESOURCES-FOUND";
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("Audit is read-only. It never claims zero charges. Pass a JSON fixture to the test.");
}
