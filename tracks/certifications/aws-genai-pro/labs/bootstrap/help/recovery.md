# Recover a lab stack

`make lab-recover` asks you to type the stack name. That confirmation is the approval. Retries wait 1, 2, and 4 minutes, and they stop after three.

1. Empty `lp-lab-*` buckets.
2. Retry once with an elevated role, then fix the role file.
3. Remove whatever blocks the delete.
4. Use `--retain-resources` only when the stack is `DELETE_FAILED`, then delete those resources directly.
5. `FORCE_DELETE_STACK` only after you have written down the physical IDs.
6. For a dead-letter message, show the error code and fix the input. Do not replay it unchanged.
7. Orphans are deleted per service, each one after its own typed confirmation.

The automatic reaper never calls `FORCE_DELETE_STACK`.

## Final audit

The audit is read-only. It can report `NO-LAB-RESOURCES-FOUND`, `PENDING-AWS-CLEANUP`, `LEFTOVERS-FOUND`, or `AUDIT-INCOMPLETE`. It does not say the account was free of charges. Check the bill the next day, grouped by the `lp-lab` tag.
