# Final plan v4: AIP-C01, six microcredentials, FDE preparation

## Context
- **Public repo:** `kevin-voss/learning-project` is public with 1 fork. It tracks 71 third-party files (ExamTopics and CertSafari) that are published on Vercel.
- **Practice questions:** 51 of 56 are original. 5 are derived from ExamTopics and quarantined: p-03-2, p-05-1, p-05-2, p-18-2, p-20-1.
- **Decisions (unchanged):**
  - Microcredentials: Agentic AI, Databases for Agentic AI, Securing Agent Identities, Serverless, Data Lakehouse, Data Streaming. MLOps is optional; Incident Response is a link only.
  - At least 300 original questions.
  - Three lab levels; real AWS only with approval.
  - Extend the existing app.
  - No APN access, so official FDE tracking is optional and separate.
  - Phases 1–6 in your order.
- **Architecture (unchanged):**
  - classic scripts on `AIP`, a route registry;
  - labs defined as data with one check language;
  - versioned storage with backup and export;
  - the `sw.js` navigation fix;
  - no new app dependencies;
  - CloudFormation templates in JSON.

## Corrections in v4
1. **Question counts:** M1 = 51 kept + 5 newly written replacements = 56. Every milestone has exact per-domain totals.
2. **Fresh-question pools:** a capacity rule, a notice below 150 questions, labelled repeats, fresh-only scores, a mini-mock and a reserve. **M3 is 190, not 186; M7 adds 110, not 114.** At 300 questions only **3** fully fresh mocks fit, not 4.
3. **Cleanup:** a recovery workflow with retries, alerts, written recovery steps and a final audit. The plan never claims zero charges.
4. **Readiness:** an evidence model with recency, exposure, mode, difficulty, sample size and an 80% Wilson range. Coverage is kept separate.
5. **Arithmetic:**
   - the per-skill table is re-derived for all five domains;
   - the effort tables are merged into one (51 / 78.75 / 119 days);
   - the diagnostic is 96 minutes (was 60);
   - the "Node ≥ 22" requirement is removed (`run.mjs` lists the test files explicitly);
   - costs are about $30–110 (was $40–120);
   - prerequisites are re-checked.

## Prerequisites
- **AIP-C01:** no formal prerequisite; experience and prior certifications are recommended only.
- **Microcredentials:** no formal prerequisite; more than 6 months' experience is suggested. The prerequisite page for each one needs a sign-in.
- **FDE Validated:** APN membership, an active Associate or Professional certification (the English page adds Specialty), 600 points, and every required activity in one pathway. The certification must be valid at enrollment (stated only on the Chinese page).
- **FDE Advanced:** APN membership, an active AIP-C01, 1,000 points, and every required activity in all three pathways.
- **You:** your Developer Associate covers the Validated certification requirement if it's active at enrollment. APN access is still missing.
- **Labs:** an AWS CLI profile (SSO or role), Python 3.9+ for Level 2, 3.11+ for Level 3, Docker for 2 labs only, and a pre-check that the Bedrock models are available.
- **Partner-only FDE details are UNVERIFIED.**

## Question bank
**Totals per milestone (domains D1 / D2 / D3 / D4 / D5 = total):**

| | D1 | D2 | D3 | D4 | D5 | Total |
|---|---|---|---|---|---|---|
| Kept | 25 | 12 | 6 | 5 | 3 | 51 |
| M1 | 26 | 14 | 6 | 6 | 4 | 56 |
| M2 | 38 | 33 | 25 | 16 | 14 | 126 |
| M3 | 58 | 50 | 38 | 23 | 21 | 190 |
| M7 | 93 | 78 | 60 | 36 | 33 | 300 |

- New questions per step:
  - M1: 1 / 2 / 0 / 1 / 1 (5)
  - M2: 12 / 19 / 19 / 10 / 10 (70)
  - M3: 20 / 17 / 13 / 7 / 7 (64)
  - M7: 35 / 28 / 22 / 13 / 12 (110)
  - Total: 249 new.
- **Replacements:** written from scratch for the same chapters (03, 05, 05, 20, 18) and domains, but with different scenarios. They must pass the fingerprint and near-duplicate checks against the third-party items and the quarantined 5. Their ids are new and the old ids are retired.
- **If k kept items fail validation:** M1 writes k more replacements, so M1 still has 56. Likely k ≈ 3 (p-00-1, p-25-2, p-26-2).
- **If an item moves domain during validation:** the M2 additions make up the difference, so the M2, M3 and M7 rows stay exact.
- **Counting:** each question counts once, for its primary skill.
- **Kept items above a skill's target:** the excess comes off other skills in the same task. Task and domain totals stay exact, and every skill keeps at least 1.
- **Distribution per domain:**
  1. Weight = relevance (1–3) × difficulty factor (1.0 / 1.25 / 1.5).
  2. Each skill gets the floor of weight × domain total ÷ sum of weights.
  3. Any skill still at 0 gets 1.
  4. The rest go by largest remainder. Ties go to higher relevance, then higher difficulty, then the task with the largest shortfall, then the lower skill number.
  - This reproduces the v3 per-skill table exactly. Task totals:
    - 1.1–1.6: 9 / 16 / 10 / 18 / 22 / 18
    - 2.1–2.5: 26 / 9 / 15 / 15 / 13
    - 3.1–3.4: 28 / 13 / 11 / 8
    - 4.1–4.3: 11 / 12 / 13
    - 5.1–5.2: 20 / 13
- **Validation of every question (unchanged):**
  - blind validator, documentary evidence, a reason for every wrong option;
  - checks for ambiguity, relevance, mapping and difficulty;
  - an adjudicator, then you, for disagreements.
- **Batches:** M1, M2, M3, and M7 in two halves. You review 20 per batch, 100 in total (about 5–6 h). More than one real error means the batch is validated again.

## Simulator and fresh pools
- **Mock:** 23/20/15/9/8 (75), 180 minutes, everything scored, no scaled score. **Diagnostic:** 12/10/8/5/5 (40) in 96 minutes.
- **Seen** = shown in any mode, even if skipped.
- **Fresh capacity** = the smallest ⌊fresh_d ÷ quota_d⌋ across domains.
- **Two separate mocks** need 46/40/30/18/16 fresh per domain, 150 in total.
- **Pool capacity, nothing practised:**
  - M1: practice only.
  - M2: diagnostic + 1 fresh mock.
  - M3: diagnostic + 2 fresh mocks, exactly.
  - M7: diagnostic + 3 fresh mocks (D2 78 < 80 blocks a fourth).
- **Typical path** (M1 practised, diagnostic at M2):
  - M2: diagnostic **or** a 37-question mini-mock.
  - M3: a 63-question mini-mock.
  - M7: 2 full fresh mocks (1 if the M3 mini-mock was taken).
- **The app:**
  - always shows fresh capacity per domain;
  - shows a notice below 150 approved questions;
  - when a fresh form isn't possible, shows the shortfall and offers a mini-mock (domains scaled by the scarcest, at least 20 questions, 2.4 minutes each), a full mock with labelled repeats, or practice;
  - shows total, fresh-only and repeat-only scores, with history using the fresh-only score;
  - keeps a mock reserve, on by default from M2, that holds back the next fresh form;
  - drops v3's 30-day diagnostic rule.

## Readiness
- **Answer weight** = recency 0.5^(age in days ÷ 30) × exposure (1.0 / 0.4 / 0.15) × mode (mock 1.0 / practice 0.6) × difficulty (0.8 / 1.0 / 1.2).
- **Per task:** n = sum of weights, p̂ = weighted correct ÷ n, and an 80% Wilson range [L, U].
- **Levels:**
  - no evidence: n < 1
  - too little: n < 5
  - developing: L < 0.6
  - proficient: L ≥ 0.6
  - strong: n ≥ 8, L ≥ 0.75, and 3 correct fresh level-2+ answers in 60 days
- **Coverage is kept separate:** bank completeness, questions seen, skills reached.
- **Domain:** share-weighted estimate with a range; tasks with no evidence count as L = 0, U = 1. Evidence completeness is shown.
- **Overall index:** 31/26/20/12/11, labelled "not an AWS score, not a pass probability".
- **Booking guideline (personal):** your last 2 mocks with ≥ 90% fresh questions at ≥ 80% on the fresh questions; every domain L ≥ 0.65; completeness ≥ 90%; no major task developing or under-evidenced.
- **Test cases:**
  - 3 easy answers → too little evidence (n = 1.44)
  - 20 answers on 2 repeated questions → too little evidence (n ≈ 3.1)
  - 10 fresh level-2 mock answers → strong (L = 0.86)
  - the same 120 days later → no recent evidence (n = 0.63)
  - 8 of 10 fresh level-3 → proficient (L = 0.62)

## AWS cost safety and recovery
- **Budgets can't cap spending** (AWS updates them up to 3 times a day, with delays).
- **Safety stack 🔒 (under about $1 a month):**
  - SNS alert email; a $50 budget alerting at 40/80/100% actual and 100% forecast, with an optional deny-deploy action; anomaly alerts at $5.
  - The `lp-lab` cost tag.
  - Roles: deployer; CloudFormation execution, kept outside the lab stacks; scheduler (DeleteStack on `lp-lab-*` only); reaper; read-only verifier; a permission boundary.
  - The `lp-ttl` schedule group and a standard-queue DLQ with an alarm.
  - An EventBridge rule for DELETE_FAILED / ROLLBACK_FAILED / UPDATE_ROLLBACK_FAILED on `lp-lab-*`.
  - `check` and `sweep` functions with an error alarm.
- **Template rules:**
  - buckets have a lifecycle rule (1 day) and an empty-on-delete custom resource;
  - no Lambda functions inside a VPC; RDS Data API;
  - KB data sources use RETAIN with `DependsOn`;
  - no customer-managed KMS keys;
  - Aurora with no snapshot and no deletion protection;
  - delete permissions checked statically and live.
- **Deploy order:**
  1. Read-only pre-check, including `simulate-principal-policy`.
  2. 🔒 Typed approval, which also approves automatic deletion.
  3. Lifetime schedule (DeleteStack with retries and DLQ) and the +45-minute check, created **first**.
  4. Stack created with `--role-arn` and tags.
  5. Schedules confirmed; if missing, the stack is deleted at once.
- **Lifetimes:** 4 h for Level 3 labs; 2 h for MSK/Flink; 72 h per capstone; 7 days for v4.
- **Automatic recovery:**
  1. Scheduler retries, then the DLQ alert.
  2. The check: re-check every 30 minutes up to 4 times. On DELETE_FAILED, empty `lp-lab-*` buckets and retry twice, after 30 and 60 minutes. Otherwise send an alert with the resources, reasons and command.
  3. A daily sweep deletes expired `lp-lab-*` stacks and alerts on orphans, without deleting them.
  4. `make lab-status`.
  5. Billing alerts.
  - The reaper never uses FORCE_DELETE_STACK.
- **Manual recovery** (`make lab-recover`, with confirmation; retries after 1, 2 and 4 minutes, at most 3):
  - empty buckets;
  - retry once with an elevated role, then fix the role file;
  - remove whatever blocks the delete;
  - `--retain-resources` (only in DELETE_FAILED), then delete directly;
  - FORCE_DELETE_STACK only after recording the physical IDs;
  - DLQ: show the error code and fix the input;
  - orphans: delete per service after typed confirmation.
- **Final audit** (read-only):
  1. The stack is gone.
  2. 5 minutes later, no `lp-lab` tags remain.
  3. A name-prefix scan.
  4. CloudTrail is searched for Create* calls during the lab window.
  5. The next day, the Billing console view by tag.
  - Results: NO-LAB-RESOURCES-FOUND, PENDING-AWS-CLEANUP, LEFTOVERS-FOUND, AUDIT-INCOMPLETE.
  - It never claims zero charges.
- **Costs:** Level 3 labs $4–27 (2 runs), capstones v1–v3 $15–45, v4 $10–25, safety stack about $4, drill under $0.50. Total about $30–110, plus $3–8 optional.

## Milestones (O / R / C developer days)
- **M0** cleanup: 1.25 / 2 / 3
- **M1** 56 approved, exposure tracking, coverage: 6.75 / 10.5 / 15.75
- **M2** simulator, diagnostic, 126 questions, fresh pools, readiness: 7.5 / 11.25 / 16.75
- **M3** 190 questions: 3.75 / 5.5 / 8.5
- **M4** browser simulations: 6.5 / 10 / 14.5
- **M5** local labs: 3.25 / 5.5 / 8.25
- **M6** AWS labs, safety stack, recovery + 🔒 drill: 6.5 / 10.75 / 16.5
- **M7** 300 questions: 6.5 / 9.25 / 14
- **M8** v1 Ground: 2.5 / 4 / 6.25
- **M9** v2 Orchestrate: 2.5 / 3.75 / 5.75
- **M10** v3 Prove: 2 / 3.25 / 5
- **M11** v4 + readiness: 2 / 3 / 4.75
- **Total 51 / 78.75 / 119.** Categories (O/R/C):

  | Category | O | R | C |
  |---|---|---|---|
  | App code | 11 | 17.5 | 25.5 |
  | Writing questions | 8.5 | 12 | 18 |
  | Validating questions | 7.5 | 11 | 17 |
  | Browser labs | 3 | 4.5 | 6.5 |
  | Local labs | 3 | 5 | 7.5 |
  | AWS labs + recovery | 5.75 | 9.5 | 14.5 |
  | FDE | 8 | 12.5 | 19.5 |
  | Integration testing | 2.5 | 3.5 | 5.5 |
  | Documentation | 1.75 | 3.25 | 5 |

- **Order:** M0 → M1 → M2 → M3 → M7, and M1 → M4 → M5 → M6 → M8 → M9 → M10 → M11, with M11 also needing M7.
- **Simulator + 126 questions:** 23.75 days (15.5–35.5), or about 18.25 with a parallel question stream. Calendar about 59 days with that stream.
- **Your preparation:** 120–160 h planning target, plus about 5–6 h of question review.

## File changes (v4 additions to v3)
- **M0:** quarantine the 5 in `practice.js` and add their fingerprints; `scripts/tests/run.mjs`; `vercel.json` runs it with no Node pin.
- **M1:** 5 files in `js/questions/original/t*/`; `js/progress/store/{migrate, backup}.js` (attempts stored as `{at, correct, mode, exp}`); `js/progress/model/mastery.js`; `scripts/tests/app/progress.test.mjs`.
- **M2:** `js/exam/form.js`; `js/exam/mock/*`; `js/progress/model/{mastery, readiness, schedule}.js`; `js/progress/views/*`; `scripts/tests/exam/{form, mastery}.test.mjs`; `scripts/tests/fixtures/mastery-cases.json`.
- **M6:**
  - `labs/bootstrap/{README.md, step-by-step.md, template.base.json, reaper/{check, sweep, empty-bucket}.mjs, help/recovery.md}`
  - `scripts/tools/aws/{lab-deploy, lab-verify, lab-cleanup}.mjs`, `scripts/tools/aws/recovery/{lab-recover, lab-audit, lab-status}.mjs`, `scripts/tools/aws/lib/{aws-cli, template, cost}.mjs`
  - `scripts/tests/tools/{verify-allowlist, deploy-guard, recover}.test.mjs`, `scripts/tests/fixtures/aws/*`
  - `Makefile`: `lab-recover`
- **Folders split to keep each at 5 files or fewer.** Everything else stays as in v3.

## Verification
- `make aip-test` runs every suite. `coverage-report` checks all §4.1 totals. `make site` and the Vercel build run the tests first.
- **M6 drills:** a 🔒 recovery drill (bucket deliberately full → alert → automatic retry → audit NO-LAB-RESOURCES-FOUND) and a free DLQ drill.
- **Checked by hand:** `file://`, offline mode, the service-worker update path, a 75-question mock, and one lab at each level.

## Approvals and blockers
- **🔒 Each needs your approval:** deletion, the git-history option and force-push, Vercel cleanup, the safety stack, every billable deploy, extension or drill, and every manual deletion during recovery.
- **Your decision:** reporting under §1.4(e).
- **Needs APN (UNVERIFIED):** FDE enrollment, activities and points, which microcredentials count, renewal, and membership checks.

Planning completed. No files or infrastructure were modified. Awaiting approval before implementation.