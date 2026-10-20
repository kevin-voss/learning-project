/**
 * Long-term learner profile (v1). Spec: docs/learner-memory/
 */

export const STORAGE_KEY = "learning-project:learner-memory:v1";

export type ExplanationDepth = "brief" | "normal" | "deep";
export type Pace = "slow" | "normal" | "fast";

export type LearnerEvent = {
  type: string;
  at: string;
  surface: string;
  topicId?: string;
  payload?: Record<string, unknown>;
};

export type Struggle = {
  topicId: string;
  surface: string;
  kind: string;
  count: number;
  lastAt: string;
  note?: string;
};

export type LearnerQuestion = {
  id: string;
  askedAt: string;
  surface: string;
  topicId?: string;
  text: string;
  resolved: boolean;
};

export type LearnerFeedback = {
  at: string;
  surface: string;
  rating?: number;
  text?: string;
};

export type TopicBehavior = {
  surface: string;
  visitCount: number;
  timeMs: number;
  playgroundAttempts: number;
  playgroundPasses: number;
  hintCount: number;
  lastVisitAt: string;
};

export type LearnerProfile = {
  version: 1;
  updatedAt: string;
  preferences: {
    explanationDepth: ExplanationDepth;
    pace: Pace;
    preferredSurfaces: string[];
  };
  completions: Record<string, string>;
  struggles: Struggle[];
  questions: LearnerQuestion[];
  feedback: LearnerFeedback[];
  behavior: { topics: Record<string, TopicBehavior> };
  events: LearnerEvent[];
};

const MAX_EVENTS = 500;
const MAX_QUESTIONS = 100;
const MAX_FEEDBACK = 50;

function nowIso(): string {
  return new Date().toISOString();
}

function emptyProfile(): LearnerProfile {
  return {
    version: 1,
    updatedAt: nowIso(),
    preferences: {
      explanationDepth: "normal",
      pace: "normal",
      preferredSurfaces: [],
    },
    completions: {},
    struggles: [],
    questions: [],
    feedback: [],
    behavior: { topics: {} },
    events: [],
  };
}

function isProfile(value: unknown): value is LearnerProfile {
  if (!value || typeof value !== "object") return false;
  const v = value as LearnerProfile;
  return v.version === 1 && typeof v.updatedAt === "string";
}

export function loadProfile(): LearnerProfile {
  if (typeof localStorage === "undefined") return emptyProfile();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProfile();
    const parsed = JSON.parse(raw) as unknown;
    if (!isProfile(parsed)) return emptyProfile();
    return {
      ...emptyProfile(),
      ...parsed,
      preferences: { ...emptyProfile().preferences, ...parsed.preferences },
      behavior: {
        topics: parsed.behavior?.topics ?? {},
      },
    };
  } catch {
    return emptyProfile();
  }
}

export function saveProfile(profile: LearnerProfile): void {
  if (typeof localStorage === "undefined") return;
  profile.updatedAt = nowIso();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    /* quota / private mode */
  }
}

function trimEvents(profile: LearnerProfile): void {
  if (profile.events.length > MAX_EVENTS) {
    profile.events = profile.events.slice(-MAX_EVENTS);
  }
}

function upsertStruggle(
  profile: LearnerProfile,
  topicId: string,
  surface: string,
  kind: string,
  note?: string,
): void {
  const at = nowIso();
  const existing = profile.struggles.find(
    (s) => s.topicId === topicId && s.surface === surface && s.kind === kind,
  );
  if (existing) {
    existing.count += 1;
    existing.lastAt = at;
    if (note) existing.note = note;
  } else {
    profile.struggles.push({ topicId, surface, kind, count: 1, lastAt: at, note });
  }
}

function topicBehavior(profile: LearnerProfile, topicId: string, surface: string): TopicBehavior {
  const existing = profile.behavior.topics[topicId];
  if (existing) return existing;
  const row: TopicBehavior = {
    surface,
    visitCount: 0,
    timeMs: 0,
    playgroundAttempts: 0,
    playgroundPasses: 0,
    hintCount: 0,
    lastVisitAt: nowIso(),
  };
  profile.behavior.topics[topicId] = row;
  return row;
}

function derivePreferences(profile: LearnerProfile): void {
  const recentFails = profile.struggles.filter((s) => s.kind === "playground_fail" && s.count >= 3);
  if (recentFails.length > 0) {
    profile.preferences.explanationDepth = "deep";
  }
  const lowFeedback = profile.feedback.filter((f) => (f.rating ?? 5) <= 2);
  if (lowFeedback.length >= 2) {
    profile.preferences.pace = "slow";
  }
}

/** Pure update — does not touch localStorage. */
export function applyEvent(
  profile: LearnerProfile,
  event: Omit<LearnerEvent, "at"> & { at?: string },
): LearnerProfile {
  const next: LearnerProfile = {
    ...profile,
    preferences: { ...profile.preferences },
    completions: { ...profile.completions },
    struggles: [...profile.struggles],
    questions: [...profile.questions],
    feedback: [...profile.feedback],
    behavior: {
      topics: Object.fromEntries(
        Object.entries(profile.behavior.topics).map(([k, v]) => [k, { ...v }]),
      ),
    },
    events: [...profile.events],
  };

  const full: LearnerEvent = { ...event, at: event.at ?? nowIso() };
  next.events.push(full);
  trimEvents(next);

  const surface = full.surface;
  const topicId = full.topicId;
  const payload = full.payload ?? {};

  switch (full.type) {
    case "topic.visit": {
      if (!topicId) break;
      const row = topicBehavior(next, topicId, surface);
      row.visitCount += 1;
      row.lastVisitAt = full.at;
      break;
    }
    case "playground.attempt": {
      if (!topicId) break;
      const row = topicBehavior(next, topicId, surface);
      row.playgroundAttempts += 1;
      if (payload.passed === true) row.playgroundPasses += 1;
      else upsertStruggle(next, topicId, surface, "playground_fail");
      break;
    }
    case "hint.used": {
      if (!topicId) break;
      topicBehavior(next, topicId, surface).hintCount += 1;
      break;
    }
    case "completion.mark": {
      const key = String(payload.completionKey ?? "");
      if (key) next.completions[key] = full.at;
      break;
    }
    case "question.asked": {
      const text = String(payload.text ?? "");
      if (!text) break;
      next.questions.push({
        id: String(payload.questionId ?? `q-${full.at}`),
        askedAt: full.at,
        surface,
        topicId,
        text,
        resolved: false,
      });
      if (next.questions.length > MAX_QUESTIONS) {
        next.questions = next.questions.slice(-MAX_QUESTIONS);
      }
      if (topicId) upsertStruggle(next, topicId, surface, "frequent_questions");
      break;
    }
    case "question.resolved": {
      const qid = String(payload.questionId ?? "");
      const q = next.questions.find((x) => x.id === qid);
      if (q) q.resolved = true;
      break;
    }
    case "feedback.submitted": {
      next.feedback.push({
        at: full.at,
        surface,
        rating: typeof payload.rating === "number" ? payload.rating : undefined,
        text: typeof payload.text === "string" ? payload.text : undefined,
      });
      if (next.feedback.length > MAX_FEEDBACK) {
        next.feedback = next.feedback.slice(-MAX_FEEDBACK);
      }
      break;
    }
    case "session.end": {
      if (!topicId) break;
      const ms = typeof payload.durationMs === "number" ? payload.durationMs : 0;
      topicBehavior(next, topicId, surface).timeMs += ms;
      break;
    }
    default:
      break;
  }

  derivePreferences(next);
  next.updatedAt = nowIso();
  return next;
}

export function recordEvent(
  profile: LearnerProfile,
  event: Omit<LearnerEvent, "at"> & { at?: string },
): LearnerProfile {
  const next = applyEvent(profile, event);
  saveProfile(next);
  return next;
}

export type AdaptationHints = {
  explanationDepth: ExplanationDepth;
  pace: Pace;
  weakTopics: string[];
  openQuestions: string[];
  summary: string;
};

export function adaptationHints(profile: LearnerProfile): AdaptationHints {
  const weak = profile.struggles
    .filter((s) => s.count >= 2)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((s) => s.topicId);

  const openQuestions = profile.questions
    .filter((q) => !q.resolved)
    .slice(-5)
    .map((q) => q.text);

  const depth = profile.preferences.explanationDepth;
  const pace = profile.preferences.pace;

  let summary = `Explain at ${depth} depth, ${pace} pace.`;
  if (weak.length) summary += ` Revisit: ${weak.join(", ")}.`;
  if (openQuestions.length) summary += ` Open questions: ${openQuestions[0]}`;

  return {
    explanationDepth: depth,
    pace,
    weakTopics: weak,
    openQuestions,
    summary,
  };
}

/** Persist one event (load → record → return hints). */
export function track(
  event: Omit<LearnerEvent, "at"> & { at?: string },
): AdaptationHints {
  const next = recordEvent(loadProfile(), event);
  return adaptationHints(next);
}

export function createEmptyProfile(): LearnerProfile {
  return emptyProfile();
}

export function exportProfileJson(profile?: LearnerProfile): string {
  return JSON.stringify(profile ?? loadProfile(), null, 2);
}
