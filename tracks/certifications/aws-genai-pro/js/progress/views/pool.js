window.AIP = window.AIP || {};

AIP.renderPool = function () {
  var seen = AIP.storage.seenMap();
  var reserve = AIP.storage.reserveOn();
  var pool = AIP.studyPool({});
  var offer = AIP.poolOffer(pool, seen, { reserve: reserve });
  var html = '<div class="hero"><h1>Fresh questions</h1><p class="lede">A question is seen once it is shown, even if you skip it. The reserve holds one full mock back so you do not spend the last fresh form by accident.</p></div>';
  if (offer.notice) {
    html += '<div class="card"><h3>Under 150 approved questions</h3><p>' + offer.approved + ' questions are approved. Drafts stay in the study pool so you can practise, and each one is labelled draft until you mark it approved.</p></div>';
  }
  html += '<div class="stats-grid">';
  [1, 2, 3, 4, 5].forEach(function (d) {
    html += '<div class="stat"><div class="n">' + offer.fresh[d] + '</div><div class="l">Fresh in domain ' + d + '</div></div>';
  });
  html += '</div>';
  html += '<div class="card"><p>Full fresh mocks in the pool: ' + offer.mockCapacity + '. Offered now: ' + offer.offeredMocks + '.</p>';
  if (offer.heldBack) html += '<p>One fresh mock is in reserve. Turn the reserve off to use it.</p>';
  html += '<p><label><input type="checkbox" data-reserve="toggle"' + (reserve ? ' checked' : '') + '> Keep a mock in reserve</label></p></div>';
  if (offer.shortfall) {
    html += '<div class="card"><h3>A full fresh mock does not fit</h3><ul>';
    [1, 2, 3, 4, 5].forEach(function (d) {
      if (offer.shortfall[d] > 0) html += '<li>Domain ' + d + ' is short by ' + offer.shortfall[d] + '.</li>';
    });
    html += '</ul>';
    if (offer.mini) html += '<p>A mini-mock of ' + offer.mini.count + ' questions would take about ' + offer.mini.minutes + ' minutes.</p>';
    html += '<div class="chapter-actions">';
    if (offer.mini) html += '<button type="button" class="btn primary" data-form="mini">Start mini-mock</button>';
    html += '<button type="button" class="btn" data-form="repeat">Full mock with labelled repeats</button>';
    html += '<a class="btn ghost" href="#/bank">Practice</a></div></div>';
  } else {
    html += '<div class="chapter-actions"><button type="button" class="btn primary" data-form="mock">Start a 75-question mock</button>';
    if (offer.diagnosticCapacity > 0) html += '<button type="button" class="btn" data-form="diagnostic">Start the 40-question diagnostic</button>';
    html += '</div>';
  }
  var history = AIP.storage.scoreHistory();
  if (history.length) {
    html += '<div class="card"><h3>Past forms</h3><ul>';
    history.slice().reverse().forEach(function (row) {
      var fresh = row.fresh == null ? "n/a" : Math.round(row.fresh * 100) + "%";
      html += '<li>' + AIP.escape(row.kind) + ': fresh-only ' + fresh + ' (' + Math.round((row.freshRatio || 0) * 100) + '% fresh)</li>';
    });
    html += '</ul></div>';
  }
  return html;
};

AIP.startStudyForm = function (kind) {
  var seen = AIP.storage.seenMap();
  var pool = AIP.studyPool({});
  var offer = AIP.poolOffer(pool, seen, { reserve: AIP.storage.reserveOn() });
  var quotas;
  var allowRepeats = false;
  if (kind === "diagnostic") quotas = AIP.FORM_QUOTA.diagnostic;
  else if (kind === "mini" && offer.mini) quotas = offer.mini.quotas;
  else if (kind === "repeat") {
    quotas = AIP.FORM_QUOTA.mock;
    allowRepeats = true;
  } else quotas = AIP.FORM_QUOTA.mock;
  var form = AIP.buildForm(pool, quotas, seen, { allowRepeats: allowRepeats, seed: Date.now() });
  if (!form.complete) return null;
  var questions = form.items.map(function (item) { return item.question; });
  AIP.quiz.start(questions, {
    formKind: kind === "repeat" ? "mock" : kind,
    items: questions,
    freshness: form.items.reduce(function (map, item) { map[item.id] = !item.repeat; return map; }, {}),
    persistExam: true
  });
  return AIP.quiz.current();
};
