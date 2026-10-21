window.DS = window.DS || {};

DS.renderContent = function () {
  const lesson = DS.curriculum[DS.currentSection];
  const { subPages, activeIndex, hasSubPages, view } = DS.resolveLessonView(lesson);
  const area = document.getElementById('contentArea');
  const hasDemo = Boolean(view.demoType);
  const hasCode = Boolean(view.codeExample || view.codeText || view.codeHttp || view.codeFetch);
  const hasComplexity = Array.isArray(view.complexity) && view.complexity.length > 0;
  const hasProsCons = Array.isArray(view.pros) && Array.isArray(view.cons);
  const anchors = DS.buildSectionAnchors(view);

  area.innerHTML = `
    <section class="ds-section active">
      <!-- Header -->
      <div class="ds-header">
        <div class="ds-number">${DS.escHtml(view.category || 'Data Structures')} · Lesson ${String(DS.currentSection + 1).padStart(2, '0')} of ${DS.curriculum.length}${hasSubPages ? ` · Topic ${String(activeIndex + 1).padStart(2, '0')} of ${String(subPages.length).padStart(2, '0')}` : ''}</div>
        <h1 class="ds-title">${view.title}</h1>
        ${view.subPageTitle ? `<h2 class="ds-subpage-title">${DS.explainTerms(view.subPageTitle)}</h2>` : ''}
        <p class="ds-subtitle">${DS.explainTerms(view.subtitle)}</p>
        ${DS.renderKeywordChips(view.keywords)}
        <p class="glossary-hint"><i class="fas fa-circle-question" aria-hidden="true"></i> New word? Hover or focus any <span class="glossary-term glossary-hint-demo" tabindex="0" data-tooltip="Terms with a dotted underline have a short plain-English definition.">dotted underline</span> for a quick definition.</p>
      </div>

      ${DS.renderLessonSubnav(lesson, subPages, activeIndex)}
      ${DS.renderSectionSubnav(lesson, anchors)}

      <!-- Real World Analogy -->
      ${view.analogy ? `
      <div class="analogy-card" id="analogy">
        <div class="analogy-label"><i class="fas fa-lightbulb"></i> The Picture</div>
        <p class="analogy-text">${DS.explainTerms(view.analogy)}</p>
      </div>` : ''}

      <!-- Animation from the site theme player (hub/theme/anim): it starts when the div appears -->
      ${view.anim ? `<div class="block anim-block" id="animation"><div data-anim="${DS.escHtml(view.anim)}"></div></div>` : ''}

      <!-- Real World Example -->
      ${view.realWorldExample ? `
      <div class="example-card" id="real-world">
        <div class="example-label"><i class="fas fa-location-dot"></i> Real-World Example</div>
        <h3>${DS.explainTerms(view.realWorldExample.title)}</h3>
        <p>${DS.explainTerms(view.realWorldExample.desc)}</p>
      </div>` : ''}

      ${view.resourceLinks ? `
      <div class="resource-card">
        <div class="resource-label"><i class="fas fa-link"></i> Related Resource</div>
        ${view.resourceLinks.map(link => `
          <a href="${DS.escHtml(link.href)}" target="_blank" rel="noopener noreferrer">
            <i class="fas ${link.icon || 'fa-arrow-up-right-from-square'}"></i>
            <span>${DS.explainTerms(link.label)}</span>
          </a>
        `).join('')}
      </div>` : ''}

      <!-- What Is It -->
      ${view.whatIsIt ? `
      <div class="block" id="what-is-it">
        <h3 class="block-title"><i class="fas fa-circle-info"></i> What Is It?</h3>
        <p class="block-text">${DS.explainTerms(view.whatIsIt)}</p>
      </div>` : ''}

      <!-- Why Use It -->
      ${view.whyUse ? `
      <div class="block" id="why-use-it">
        <h3 class="block-title"><i class="fas fa-arrow-up-right-dots"></i> Why Use It?</h3>
        <p class="block-text">${DS.explainTerms(view.whyUse)}</p>
      </div>` : ''}

      <div id="breakdown">${DS.renderConceptSections(view.conceptSections || [])}</div>

      <div id="flow">${DS.renderConceptFlow(view.conceptFlow || [])}</div>

      ${DS.renderMermaidDiagram(view.mermaidDiagram)}

      <!-- When To Use -->
      ${Array.isArray(view.whenToUse) && view.whenToUse.length ? `
      <div class="block" id="when-to-use">
        <h3 class="block-title"><i class="fas fa-clock"></i> When To Use?</h3>
        <div class="info-grid">
          ${view.whenToUse.map((w, i) => `
            <div class="info-card">
              <div class="info-card-icon ${['ic-accent','ic-green','ic-blue','ic-red'][i % 4]}"><i class="fas ${w.icon}"></i></div>
              <h4>${DS.explainTerms(w.title)}</h4>
              <p>${DS.explainTerms(w.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- Interactive Visualization -->
      ${hasDemo ? `
      <div class="block" id="demo-block">
        <h3 class="block-title"><i class="fas fa-play-circle"></i> Interactive Demo</h3>
        <div class="visual-demo" id="demo-${view.id}">
          <!-- Populated by demo rendering logic -->
        </div>
      </div>` : ''}

      <!-- Code Example -->
      ${hasCode ? `
      <div class="block" id="code">
        <h3 class="block-title"><i class="fas fa-code"></i> ${DS.escHtml(view.codeTitle || 'Code Examples')}</h3>
        ${view.codeHttp || view.codeFetch ? DS.renderDualCodeExamples(view) : `
        <div class="code-block" id="code-${view.id}">
          <div class="code-header">
            <span class="code-lang">${DS.escHtml(view.codeLanguage || 'JavaScript')}</span>
            <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> Copy</button>
          </div>
          <div class="code-body">${view.codeExample || DS.escHtml(view.codeText)}</div>
        </div>`}
      </div>` : ''}

      ${DS.renderTryIt(view.tryIt)}

      <!-- Time Complexity -->
      ${hasComplexity ? `
      <div class="block" id="complexity">
        <h3 class="block-title"><i class="fas fa-gauge-high"></i> Time Complexity</h3>
        ${DS.complexityGuide()}
        <table class="complexity-table">
          <thead><tr><th>Operation</th><th>Time</th><th>What it means</th><th>Speed</th></tr></thead>
          <tbody>
            ${view.complexity.map(c => `
              <tr>
                <td class="op-name">${DS.explainTerms(c.op)}</td>
                <td>${DS.explainTerms(c.time)}</td>
                <td class="complexity-meaning">${DS.explainTerms(DS.complexityMeaning(c.time))}</td>
                <td><span class="badge-${c.badge}">${c.badge === 'fast' ? 'Fast' : c.badge === 'slow' ? 'Slow' : 'Medium'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>` : ''}

      <!-- Pros & Cons -->
      ${hasProsCons ? `
      <div class="block" id="pros-cons">
        <h3 class="block-title"><i class="fas fa-scale-balanced"></i> Pros and Cons</h3>
        <div class="pros-cons">
          <div class="pc-card pc-pros">
            <div class="pc-title"><i class="fas fa-thumbs-up"></i> Advantages</div>
            <ul class="pc-list">
              ${view.pros.map(p => `<li>${DS.explainTerms(p)}</li>`).join('')}
            </ul>
          </div>
          <div class="pc-card pc-cons">
            <div class="pc-title"><i class="fas fa-thumbs-down"></i> Disadvantages</div>
            <ul class="pc-list">
              ${view.cons.map(c => `<li>${DS.explainTerms(c)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>` : ''}

      ${DS.renderChecklist(view.checklist || [])}

      ${DS.renderCheck(view.check || [])}

      ${DS.renderRelatedLessons(view.relatedIds)}

      <!-- Mark Complete -->
      <div class="complete-section">
        <span class="complete-text">${DS.completed.has(lesson.id) ? 'You\'ve completed this section. Nice work!' : 'Finished reading? Mark this section as complete.'}</span>
        <button class="complete-btn ${DS.completed.has(lesson.id) ? 'done' : ''}" onclick="markComplete('${lesson.id}')">
          ${DS.completed.has(lesson.id) ? '<i class="fas fa-check"></i> Completed' : '<i class="fas fa-check"></i> Mark Complete'}
        </button>
      </div>

      <!-- Navigation -->
      <div class="nav-buttons">
        ${hasSubPages && activeIndex > 0
          ? `<button class="nav-btn" onclick="goToSubPage(${activeIndex - 1})"><i class="fas fa-arrow-left"></i> ${DS.escHtml(subPages[activeIndex - 1].label)}</button>`
          : DS.currentSection > 0
            ? `<button class="nav-btn" onclick="goTo(${DS.currentSection - 1})"><i class="fas fa-arrow-left"></i> ${DS.curriculum[DS.currentSection - 1].title}</button>`
            : '<div></div>'}
        ${hasSubPages && activeIndex < subPages.length - 1
          ? `<button class="nav-btn" onclick="goToSubPage(${activeIndex + 1})">${DS.escHtml(subPages[activeIndex + 1].label)} <i class="fas fa-arrow-right"></i></button>`
          : DS.currentSection < DS.curriculum.length - 1
            ? `<button class="nav-btn" onclick="goTo(${DS.currentSection + 1})">${DS.curriculum[DS.currentSection + 1].title} <i class="fas fa-arrow-right"></i></button>`
            : '<div></div>'}
      </div>
    </section>
  `;

  // Initialize interactive demo
  if (hasDemo) DS.initDemo(view.id, view.demoScenario);

  DS.renderMermaid();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
