# Learner profile schema (v1)

`version` must be `1`. All timestamps are ISO-8601 UTC strings.

## Top-level object

```json
{
  "version": 1,
  "updatedAt": "2026-10-20T12:00:00.000Z",
  "preferences": {
    "explanationDepth": "brief | normal | deep",
    "pace": "slow | normal | fast",
    "preferredSurfaces": ["codestep", "drills", "tracks/java"]
  },
  "completions": {
    "codestep:variables:playground:task-1": "2026-10-20T11:00:00.000Z"
  },
  "struggles": [
    {
      "topicId": "loops",
      "surface": "codestep",
      "kind": "playground_fail",
      "count": 4,
      "lastAt": "2026-10-20T11:30:00.000Z",
      "note": "off-by-one on for-loop bound"
    }
  ],
  "questions": [
    {
      "id": "q-uuid-or-slug",
      "askedAt": "2026-10-20T11:05:00.000Z",
      "surface": "codestep",
      "topicId": "loops",
      "text": "Why does i++ run after the body?",
      "resolved": false
    }
  ],
  "feedback": [
    {
      "at": "2026-10-20T12:00:00.000Z",
      "surface": "codestep",
      "rating": 4,
      "text": "Playback too fast on step 3"
    }
  ],
  "behavior": {
    "topics": {
      "loops": {
        "surface": "codestep",
        "visitCount": 6,
        "timeMs": 420000,
        "playgroundAttempts": 8,
        "playgroundPasses": 2,
        "hintCount": 3,
        "lastVisitAt": "2026-10-20T11:30:00.000Z"
      }
    }
  },
  "events": []
}
```

## Limits (client-side)

- Keep at most **500** events in the profile; older events roll off after aggregation into `struggles` / `behavior`.
- `questions` keeps at most **100** rows; prefer resolving or archiving in export files.
- `feedback` keeps at most **50** rows.

## Topic IDs

Use stable slugs aligned with curriculum:

- CodeStep: curriculum topic id (e.g. `variables`, `loops`)
- Drills: `drills:variables`, `drills:arrays`
- Tracks: `tracks:java:syntax-fundamentals`, `tracks:cs:lesson-hash`
- Projects: `projects:01-weather-dashboard`

## Derived preferences

After events, the runtime may set:

- `explanationDepth: "deep"` if many `question.asked` on same `topicId` or high `hintCount`
- `pace: "slow"` if high `playground_fail` rate or feedback mentions speed

Agents should treat these as **hints**, not hard rules.
