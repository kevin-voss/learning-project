# /reflect

Capture this learning session into **long-term learner memory**.

When invoked:

1. Read [`.cursor/skills/learner-memory/SKILL.md`](../skills/learner-memory/SKILL.md) and load `learner-profile.json` from the user's **personal store** (path in that skill).
2. Ask the user only if needed: what topic, what felt hard, any open questions (or infer from chat).
3. Merge events: `question.asked`, `feedback.submitted`, `completion.mark`, `agent.observation` as appropriate.
4. Save updated profile to the personal store.
5. Reply with **3 bullets**: what was recorded, suggested next practice, adapted teaching style (`depth` / `pace`).

Do not write cleaning-task solutions. Do not commit `.learner/` to git.
