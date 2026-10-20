/**
 * Portable learner memory (v1) for static mini-sites.
 * Spec: docs/learner-memory/schema-v1.md
 */
(function (global) {
  var STORAGE_KEY = "learning-project:learner-memory:v1";
  var MAX_EVENTS = 500;

  function nowIso() {
    return new Date().toISOString();
  }

  function emptyProfile() {
    return {
      version: 1,
      updatedAt: nowIso(),
      preferences: { explanationDepth: "normal", pace: "normal", preferredSurfaces: [] },
      completions: {},
      struggles: [],
      questions: [],
      feedback: [],
      behavior: { topics: {} },
      events: [],
    };
  }

  function loadProfile() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyProfile();
      var p = JSON.parse(raw);
      if (!p || p.version !== 1) return emptyProfile();
      return p;
    } catch (e) {
      return emptyProfile();
    }
  }

  function saveProfile(p) {
    p.updatedAt = nowIso();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch (e) {}
  }

  function track(event) {
    var p = loadProfile();
    var full = {
      type: event.type,
      at: event.at || nowIso(),
      surface: event.surface,
      topicId: event.topicId,
      payload: event.payload || {},
    };
    p.events.push(full);
    if (p.events.length > MAX_EVENTS) p.events = p.events.slice(-MAX_EVENTS);
    if (full.type === "topic.visit" && full.topicId) {
      p.behavior.topics[full.topicId] = p.behavior.topics[full.topicId] || {
        surface: full.surface,
        visitCount: 0,
        timeMs: 0,
        playgroundAttempts: 0,
        playgroundPasses: 0,
        hintCount: 0,
        lastVisitAt: full.at,
      };
      p.behavior.topics[full.topicId].visitCount += 1;
      p.behavior.topics[full.topicId].lastVisitAt = full.at;
    }
    if (full.type === "completion.mark" && full.payload.completionKey) {
      p.completions[full.payload.completionKey] = full.at;
    }
    saveProfile(p);
    return p;
  }

  global.LearnerMemory = { STORAGE_KEY: STORAGE_KEY, loadProfile: loadProfile, saveProfile: saveProfile, track: track };
})(typeof window !== "undefined" ? window : globalThis);
