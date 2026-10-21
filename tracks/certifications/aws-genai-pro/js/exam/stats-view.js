window.AIP = window.AIP || {};

/* Question stats screen (#/stats): right vs wrong per question. */
AIP.renderQuizStats = function () {
  var allStats = AIP.storage.quiz().questions;
  var sorted = AIP.sortQuestions ? AIP.sortQuestions(AIP.questions || []) : (AIP.questions || []).slice();
  var summary = AIP.bankSummary ? AIP.bankSummary() : { total: sorted.length, certsafari: 0, practice: 0 };
  var performance = AIP.questionPerformance ? AIP.questionPerformance(sorted) : { correct: 0, wrong: 0, accuracy: 0, answers: 0 };
  var rows = sorted.map(function (q) {
    var s = allStats[q.id] || { correct: 0, wrong: 0 };
    return { q: q, s: s, fail: Number(s.wrong) || 0, domain: AIP.questionDomain ? AIP.questionDomain(q) : 0 };
  });
  var attempted = rows.filter(function (r) { return (Number(r.s.correct) || 0) + (Number(r.s.wrong) || 0) > 0; });
  var html = '<div class="hero"><h1>Question stats</h1><p class="lede">Every graded attempt is stored in localStorage. Grouped by exam domain; within each domain, most-missed items appear first.</p></div>';
  html += '<div class="stats-grid">';
  html += '<div class="stat"><div class="n">' + summary.total + '</div><div class="l">Questions in bank</div></div>';
  html += '<div class="stat"><div class="n stat-correct">' + performance.correct + '</div><div class="l">Correct answers</div></div>';
  html += '<div class="stat"><div class="n stat-wrong">' + performance.wrong + '</div><div class="l">Wrong answers</div></div>';
  html += '<div class="stat"><div class="n">' + attempted.length + '</div><div class="l">Attempted</div></div>';
  html += '</div>';
  if (AIP.renderPerformanceChart) html += AIP.renderPerformanceChart(performance);
  html += '<div class="chapter-actions"><button type="button" class="btn danger" data-act="reset-quiz">Reset all quiz stats</button><a class="btn" href="#/exam">Full mock exam</a><a class="btn" href="#/bank">Question bank</a></div>';
  if (AIP.groupByDomain) {
    var grouped = AIP.groupByDomain(rows.map(function (r) { return r.q; }));
    html += '<div style="margin-top:20px">';
    (AIP.DOMAINS || []).forEach(function (d) {
      var domainRows = rows.filter(function (r) { return r.domain === d.id; });
      domainRows.sort(function (a, b) {
        return b.fail - a.fail || ((Number(b.s.correct) || 0) + (Number(b.s.wrong) || 0)) - ((Number(a.s.correct) || 0) + (Number(a.s.wrong) || 0));
      });
      var domainAttempted = domainRows.filter(function (r) { return (Number(r.s.correct) || 0) + (Number(r.s.wrong) || 0) > 0; }).length;
      html += '<details class="card" style="margin-bottom:10px"><summary style="cursor:pointer;font-weight:600">Domain ' + d.id + ': ' + AIP.escape(d.short) + ' <span style="color:var(--muted);font-weight:400">(' + domainAttempted + '/' + domainRows.length + ' attempted)</span></summary>';
      html += '<div class="weak-list" style="margin-top:12px">';
      domainRows.forEach(function (r) {
        var stem = String(r.q.stem || "");
        var sub = r.q.subdomain ? '<span style="display:block;font-size:12px;color:var(--muted);margin-top:2px">' + AIP.escape(r.q.subdomain) + '</span>' : "";
        html += '<a class="weak-row" href="#/exam?id=' + encodeURIComponent(r.q.id || "") + '"><span>' + AIP.escape(r.q.id) + ' · ' + AIP.escape(stem.slice(0, 90)) + (stem.length > 90 ? "…" : "") + sub + '</span><span class="answer-count correct">' + (Number(r.s.correct) || 0) + ' right</span><span class="answer-count wrong">' + (Number(r.s.wrong) || 0) + ' wrong</span></a>';
      });
      html += '</div></details>';
    });
    html += '</div>';
  }
  return html;
};
