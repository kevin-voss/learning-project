# Deploy order

1. Run the read-only pre-check, including `simulate-principal-policy`. Confirm the Bedrock models you need are available.
2. Type the stack name. That approval covers creation and automatic deletion.
3. Create the lifetime schedule first. It calls `DeleteStack`, retries, and uses a dead-letter queue. Also create the check that runs 45 minutes later.
4. Create the stack with `--role-arn` and the `lp-lab` tag.
5. Confirm the schedules exist. If they do not, delete the stack at once.

Lifetimes: 4 hours for Level 3, 2 hours for MSK and Flink, 72 hours for each of the first three capstones, 7 days for v4.

A recovery drill fills a bucket on purpose, waits for the alert, lets the automatic retry empty it, and finishes at `NO-LAB-RESOURCES-FOUND`. The dead-letter drill does not create billable resources. Both wait for your approval.
