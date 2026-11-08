# Lab safety stack

This stack alerts you. It does not cap spending. AWS updates budgets a few times a day, and the numbers can lag.

It creates an email topic, a $50 budget that alerts at 40%, 80%, and 100% actual and at 100% forecast, an anomaly alert at $5, the `lp-lab` tag, a scheduler that may delete only `lp-lab-*` stacks, a reaper, a read-only verifier, and a permission boundary.

Create the lifetime schedule before the lab stack. If the schedule is missing after the stack exists, delete the stack at once.

Do not deploy it until you mean to. The safety stack itself is about $4 across this project, under about $1 in a quiet month.
