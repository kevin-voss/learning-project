// Registers a topic whose page is built by js/topic-shell.js.
// Each topic file calls Java.addCoreTopic(id, details, lessons).
// details: { badge, label, headline, accent, intro, overview, tryIt?, check?, categories? }
(function () {
  Java.topicDetails = Java.topicDetails || {};

  const colors = {
    concept: { name: 'Concept', color: 'var(--teal)', bg: 'var(--teal-bg)', glow: 'var(--teal-glow)', desc: 'Understand the idea' },
    practice: { name: 'Practice', color: 'var(--amber)', bg: 'var(--amber-bg)', glow: 'var(--amber-glow)', desc: 'Use it in code' },
    habits: { name: 'Habits', color: 'var(--coral)', bg: 'var(--coral-bg)', glow: 'var(--coral-glow)', desc: 'Avoid beginner traps' },
    deeper: { name: 'Deeper', color: 'var(--violet)', bg: 'var(--violet-bg)', glow: 'var(--violet-glow)', desc: 'Optional: come back later' }
  };

  Java.coreColors = colors;

  Java.addCoreTopic = function addCoreTopic(id, details, lessons) {
    Java.topicDetails[id] = details;
    const topic = Java.topics[id] = Java.topics[id] || {};
    topic.categories = details.categories || colors;
    topic.tryIt = details.tryIt;
    topic.check = details.check;
    topic.lessons = (topic.lessons || []).concat(lessons.map(lesson => ({
      glossary: Java.glossary,
      ...lesson
    })));
    topic.lessons.forEach((lesson, index) => { lesson.num = String(index + 1).padStart(2, '0'); });
  };

  // Adds more lessons to a topic (used when a topic's lessons are split over files).
  Java.addCoreLessons = function addCoreLessons(id, lessons) {
    const topic = Java.topics[id] = Java.topics[id] || {};
    topic.lessons = (topic.lessons || []).concat(lessons.map(lesson => ({ glossary: Java.glossary, ...lesson })));
    topic.lessons.forEach((lesson, index) => { lesson.num = String(index + 1).padStart(2, '0'); });
  };
})();
