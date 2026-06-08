window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.webFoundations = function (container) {
  const UI = DS.demoUI;
  const topic = DS.curriculum[DS.currentSection];
  const { view } = DS.resolveLessonView(topic);
  const steps = view.demoSteps || topic.demoSteps || [];
  let stepIndex = 0;

  const renderStage = () => `
    <div class="web-demo-flow">
      ${steps.map((step, index) => `
        <div class="web-demo-card ${index === stepIndex ? 'is-active' : ''}">
          <span>${index + 1}</span>
          <strong>${UI.esc(step.label)}</strong>
          <p>${UI.esc(step.detail)}</p>
        </div>
      `).join('')}
    </div>`;

  const inspectorRows = () => {
    const step = steps[stepIndex] || {};
    return [
      ['Current step', step.label || 'Start', 'The part of the flow currently highlighted'],
      ['Lesson', view.title || topic.title, 'The roadmap topic this demo belongs to'],
      ['Why it matters', step.result || view.subtitle || topic.subtitle, 'The beginner takeaway for this step'],
    ];
  };

  const render = () => {
    const step = steps[stepIndex] || {};
    container.innerHTML = UI.shell({
      title: view.demoTitle || topic.demoTitle || `${view.title || topic.title} flow`,
      hint: view.demoHint || topic.demoHint || 'Step through the real-world flow and connect each keyword to the system doing the work.',
      stage: renderStage(),
      inspector: UI.inspector('Flow details', inspectorRows()),
      stats: [
        UI.statChip('Step', `${stepIndex + 1}/${Math.max(steps.length, 1)}`),
        UI.statChip('Topic', topic.category || 'Web Foundations'),
      ].join(''),
      controls: `
        <button class="demo-btn success" onclick="webFoundationsNext()"><i class="fas fa-forward-step"></i> Next</button>
        <button class="demo-btn" onclick="webFoundationsPrev()"><i class="fas fa-backward-step"></i> Back</button>
        <button class="demo-btn danger" onclick="webFoundationsReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'webFoundationsMsg',
    });
    DS.showMsg('webFoundationsMsg', step.result || 'Choose Next to walk through the flow', 'info');
  };

  window.webFoundationsNext = () => {
    stepIndex = Math.min(stepIndex + 1, steps.length - 1);
    render();
  };

  window.webFoundationsPrev = () => {
    stepIndex = Math.max(stepIndex - 1, 0);
    render();
  };

  window.webFoundationsReset = () => {
    stepIndex = 0;
    render();
  };

  render();
};
