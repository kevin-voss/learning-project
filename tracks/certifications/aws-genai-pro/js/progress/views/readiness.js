window.AIP = window.AIP || {};

AIP.attemptsForTask = function (taskId, now) {
  var quiz = AIP.storage.quiz();
  var out = [];
  (AIP.questions || []).forEach(function (q) {
    if (q.task !== taskId || !AIP.isStudyQuestion || !AIP.isStudyQuestion(q)) return;
    var row = quiz.questions[q.id];
    if (!row || !Array.isArray(row.attempts)) return;
    row.attempts.forEach(function (attempt) {
      out.push({
        at: attempt.at,
        correct: attempt.correct,
        mode: attempt.mode,
        exp: attempt.exp,
        difficulty: q.difficulty || 2
      });
    });
  });
  return out;
};

AIP.readinessSnapshot = function (now) {
  var tasks = {};
  (AIP.TASKS || []).forEach(function (task) {
    tasks[task.id] = AIP.taskEvidence(AIP.attemptsForTask(task.id), now);
  });
  var domains = AIP.domainEvidence(tasks);
  var overall = AIP.overallEvidence(domains);
  var history = AIP.storage.scoreHistory ? AIP.storage.scoreHistory() : [];
  var mocks = history.filter(function (row) { return row.kind === "mock"; }).slice(-2).map(function (row) {
    return { freshRatio: row.freshRatio, freshScore: row.fresh };
  });
  var booking = AIP.bookingGuideline({
    mocks: mocks,
    domains: domains,
    completeness: overall.completeness,
    tasks: tasks
  });
  return { tasks: tasks, domains: domains, overall: overall, booking: booking };
};

AIP.renderReadiness = function () {
  var snap = AIP.readinessSnapshot(Date.now());
  var pct = Math.round(snap.overall.phat * 100);
  var html = '<div class="hero"><h1>Readiness</h1><p class="lede">' + AIP.escape(snap.overall.label) + ' The index uses the exam weights 31 / 26 / 20 / 12 / 11.</p></div>';
  html += '<div class="stats-grid"><div class="stat"><div class="n">' + pct + '</div><div class="l">Weighted estimate</div></div>';
  html += '<div class="stat"><div class="n">' + Math.round(snap.overall.L * 100) + '–' + Math.round(snap.overall.U * 100) + '</div><div class="l">80% range</div></div>';
  html += '<div class="stat"><div class="n">' + Math.round(snap.overall.completeness * 100) + '%</div><div class="l">Evidence completeness</div></div></div>';
  html += '<div class="card"><h3>' + (snap.booking.ready ? "Personal booking guideline is met" : "Personal booking guideline is not met") + '</h3>';
  if (!snap.booking.reasons.length) html += '<p>Your last two mocks were fresh and strong, and every major task has enough recent evidence.</p>';
  else html += '<ul>' + snap.booking.reasons.map(function (r) { return '<li>' + AIP.escape(r) + '</li>'; }).join('') + '</ul>';
  html += '</div>';
  (AIP.DOMAINS || []).forEach(function (domain) {
    var row = snap.domains[domain.id] || { phat: 0, L: 0, U: 1, completeness: 0, tasks: [] };
    html += '<div class="card"><h3>Domain ' + domain.id + ': ' + AIP.escape(domain.short) + '</h3>';
    html += '<p>Estimate ' + Math.round(row.phat * 100) + '%, range ' + Math.round(row.L * 100) + '–' + Math.round(row.U * 100) + '%. Evidence covers ' + Math.round(row.completeness * 100) + '% of this domain.</p><ul>';
    (row.tasks || []).forEach(function (task) {
      html += '<li>Task ' + AIP.escape(task.id) + ': ' + AIP.escape(task.level) + '</li>';
    });
    html += '</ul></div>';
  });
  html += '<div class="chapter-actions"><a class="btn" href="#/pool">Fresh-question pools</a><button type="button" class="btn" data-backup="export">Export progress</button><button type="button" class="btn ghost" data-backup="import">Import progress</button></div>';
  return html;
};
