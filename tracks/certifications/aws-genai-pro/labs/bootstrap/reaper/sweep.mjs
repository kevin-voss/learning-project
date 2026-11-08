export function sweep(stacks, now) {
  const expired = [];
  const orphans = [];
  (stacks || []).forEach(function (stack) {
    if (!String(stack.name || "").startsWith("lp-lab-")) return;
    if (stack.orphan) orphans.push(stack.name);
    else if (Number(stack.expiresAt) <= now) expired.push(stack.name);
  });
  return { deleteStacks: expired, alertOrphans: orphans, forceDelete: false };
}
