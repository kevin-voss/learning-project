(function () {
  const topicId = document.body.dataset.topicId;
  const registry = Java.topics.registry || [];
  const topic = registry.find(item => item.id === topicId);
  const details = Java.topicDetails && Java.topicDetails[topicId];
  const root = document.getElementById('topicShell');

  if (!topic || !details || !root) return;

  document.title = `${topic.title} · Java Learning Hub`;

  const headerTitle = document.getElementById('topicHeaderTitle');
  if (headerTitle) headerTitle.textContent = `${details.label} · Java Learning Hub`;

  root.innerHTML = `
    <section class="hero">
      <div class="container">
        <a class="hub-back" href="../../index.html">← All Java topics</a>
        <div class="hero-badge">Topic ${String(topic.order).padStart(2, '0')} · Java 21 LTS</div>
        <h1>${details.headline}<br><span class="accent">${details.accent}</span></h1>
        <p>${Java.lesson.renderInline(details.intro)}</p>
        <div class="hero-stats">
          <div class="hero-stat"><div class="num">${(Java.topics[topicId].lessons || []).length}</div><div class="lbl">Lessons</div></div>
          <div class="hero-stat"><div class="num">21</div><div class="lbl">Java LTS</div></div>
          <div class="hero-stat"><div class="num">${topic.order}</div><div class="lbl">Topic</div></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div><div class="num-tag">A / OVERVIEW</div><h2>The Roadmap</h2></div>
          <p>${Java.lesson.renderInline(details.overview)}</p>
        </div>
        <div class="roadmap-lanes" id="roadmap"></div>
      </div>
    </section>

    <section class="section" id="detail-section">
      <div class="container">
        <div class="section-head">
          <div><div class="num-tag">B / LESSON</div><h2>The Details</h2></div>
          <p>Picture · idea · example · step by step · try it · check</p>
        </div>
        <div class="detail-grid">
          <aside class="sidebar" id="sidebar"></aside>
          <article class="detail" id="detail"></article>
        </div>
      </div>
    </section>
  `;

  Java.renderLessonTopic({ namespace: topicId });
})();
