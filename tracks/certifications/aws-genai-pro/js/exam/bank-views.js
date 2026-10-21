window.AIP = window.AIP || {};

/* Question list and mock-exam setup screens. Data helpers live in question-bank.js. */
(function () {
  AIP.renderBank = function (filter) {
    filter = filter || {};
    var full = AIP.sortQuestions(AIP.questions || []);
    var hasFilter = Object.keys(filter).some(function (key) { return filter[key] != null && filter[key] !== "" && filter[key] !== "all"; });
    var all = hasFilter ? AIP.filterQuestions(filter) : full;
    var summary = { total: all.length, certsafari: 0, practice: 0, domainCounts: AIP.domainCounts(all) };
    all.forEach(function (q) {
      if (q.source === "certsafari") summary.certsafari += 1;
      if (q.source === "practice") summary.practice += 1;
    });
    var serviceCounts = AIP.serviceCounts(full);
    var statsAll = AIP.storage.quiz().questions;
    var attempted = all.filter(function (q) {
      var s = statsAll[q.id] || {};
      return (Number(s.correct) || 0) + (Number(s.wrong) || 0) > 0;
    }).length;
    var html = '<div class="hero"><h1>Question list</h1>';
    html += '<p class="lede">Browse every question without a fixed exam size. Filter by domain, AWS service, source, or answer history, then practice the matching list.</p></div>';
    html += '<div class="stats-grid">';
    html += '<div class="stat"><div class="n">' + summary.total + '</div><div class="l">Questions shown</div></div>';
    html += '<div class="stat"><div class="n">' + summary.certsafari + '</div><div class="l">CertSafari</div></div>';
    html += '<div class="stat"><div class="n">' + summary.practice + '</div><div class="l">Practice</div></div>';
    html += '<div class="stat"><div class="n">' + attempted + '</div><div class="l">Attempted</div></div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="card bank-filter-card" style="margin-top:16px"><h3>Filter this question list</h3><div class="bank-filter-grid">';
    html += '<label class="exam-control"><span>Domain</span><select data-bank-field="domain"><option value="all">All domains</option>';
    (AIP.DOMAINS || []).forEach(function (d) {
      html += '<option value="' + d.id + '"' + (String(filter.domain) === String(d.id) ? " selected" : "") + '>Domain ' + d.id + ' · ' + AIP.escape(d.short) + '</option>';
    });
    html += '</select></label><label class="exam-control"><span>AWS service</span><select data-bank-field="service"><option value="all">All AWS services</option>';
    AIP.SERVICE_CATALOG.forEach(function (service) {
      if (serviceCounts[service.id]) html += '<option value="' + service.id + '"' + (String(filter.service) === service.id ? " selected" : "") + '>' + AIP.escape(service.label) + ' · ' + serviceCounts[service.id] + '</option>';
    });
    html += '</select></label><label class="exam-control"><span>Answer history</span><select data-bank-field="status"><option value="all">Any status</option><option value="unseen"' + (filter.status === "unseen" ? " selected" : "") + '>Only new questions</option><option value="wrong"' + (filter.status === "wrong" ? " selected" : "") + '>Only failed / needs review</option><option value="correct"' + (filter.status === "correct" ? " selected" : "") + '>Currently correct</option></select></label>';
    html += '</div><div class="chapter-actions"><button type="button" class="btn primary" data-bank="apply">Apply filters</button><a class="btn" href="#/practice' + AIP.filterQuery(filter) + '">Practice this list</a><a class="btn ghost" href="#/exam' + AIP.filterQuery(filter) + '">Use for mock setup</a><a class="btn ghost" href="#/stats">Question stats</a></div></div>';
    html += '<div class="chapter-actions" style="margin-top:16px"><a class="btn" href="#/exam">Full mock exam</a><a class="btn ghost" href="#/bank">Clear filters</a></div>';
    var grouped = AIP.groupByDomain(all);
    html += '<div class="bank-groups" style="margin-top:24px">';
    (AIP.DOMAINS || []).forEach(function (d) {
      var items = grouped[d.id] || [];
      if (!items.length) return;
      var subs = AIP.groupBySubdomain(items);
      var subKeys = Object.keys(subs).sort(function (a, b) {
        var ak = AIP.subdomainSortKey(a);
        var bk = AIP.subdomainSortKey(b);
        if (ak[0] !== bk[0]) return ak[0] - bk[0];
        if (ak[1] !== bk[1]) return ak[1] - bk[1];
        return ak[2].localeCompare(bk[2]);
      });
      html += '<details class="card bank-domain" open style="margin-bottom:12px">';
      html += '<summary style="cursor:pointer;font-weight:700">Domain ' + d.id + ': ' + AIP.escape(d.short) + ' <span style="color:var(--muted);font-weight:500">(' + items.length + ')</span></summary>';
      subKeys.forEach(function (sub) {
        var rows = subs[sub] || [];
        html += '<div style="margin-top:16px"><div style="font-size:13px;color:var(--muted);margin-bottom:8px">' + AIP.escape(sub) + ' · ' + rows.length + '</div>';
        html += '<div class="weak-list">';
        rows.forEach(function (q) {
          var s = statsAll[q.id] || { correct: 0, wrong: 0 };
          var stem = String(q.stem || "");
          html += '<a class="weak-row" href="#/exam?id=' + encodeURIComponent(q.id || "") + '">';
          html += '<span>' + AIP.escape(q.id || "") + ' · ' + AIP.escape(stem.slice(0, 100)) + (stem.length > 100 ? "…" : "") + '</span>';
          html += '<span class="answer-count correct">' + (Number(s.correct) || 0) + ' right</span><span class="answer-count wrong">' + (Number(s.wrong) || 0) + ' wrong</span></a>';
        });
        html += '</div></div>';
      });
      html += '</details>';
    });
    html += '</div>';
    return html;
  };

  AIP.renderExamSetup = function (initial) {
    var all = AIP.questions || [];
    var prefs = AIP.storage.examPrefs();
    initial = initial || {};
    var selected = {
      count: prefs.count,
      strategy: prefs.strategy,
      status: initial.status || prefs.status,
      source: initial.source || prefs.source,
      domain: initial.domain != null ? initial.domain : prefs.domain,
      service: initial.service || prefs.service
    };
    var stats = AIP.storage.quiz().questions;
    var counts = { unseen: 0, wrong: 0, correct: 0 };
    all.forEach(function (q) { counts[AIP.questionState(q, stats[q.id])] += 1; });
    var selectedCount = String(selected.count || 20);
    var performance = AIP.questionPerformance(all);
    var runs = AIP.storage.examRuns();
    var html = '<div class="hero"><h1>Mock exam</h1><p class="lede">Start a new run whenever you want. Each run keeps its own answers, skips, and position; your all-time question history stays available across every run.</p></div>';
    html += '<div class="stats-grid"><div class="stat"><div class="n">' + counts.unseen + '</div><div class="l">Not answered</div></div>';
    html += '<div class="stat"><div class="n stat-wrong">' + performance.wrong + '</div><div class="l">Wrong answers</div></div>';
    html += '<div class="stat"><div class="n stat-correct">' + performance.correct + '</div><div class="l">Correct answers</div></div>';
    html += '<div class="stat"><div class="n">' + performance.accuracy + '%</div><div class="l">Answer accuracy</div></div></div>';
    html += AIP.renderPerformanceChart(performance);
    html += '<section class="saved-runs"><div class="saved-runs-head"><h2>Your mock-exam runs</h2><span>' + runs.length + ' / 2 stored on this browser</span></div>';
    if (!runs.length) {
      html += '<div class="card saved-run empty"><p>No runs yet. Build your first set below.</p></div>';
    } else {
      runs.forEach(function (run, index) {
        var answered = (run.results || []).filter(function (x) { return typeof x === "boolean"; }).length;
        var correct = (run.results || []).filter(Boolean).length;
        var wrong = answered - correct;
        var state = answered >= run.itemIds.length ? "Complete" : "In progress";
        html += '<article class="card saved-run"><div><span class="run-kicker">' + (index === 0 ? "Latest run" : "Earlier run") + ' · ' + state + '</span><h3>' + AIP.escape(run.examMode && run.examMode.strategy === "adaptive" ? "Smart practice" : "Exam mode") + ' · ' + run.itemIds.length + ' questions</h3><p>Question ' + ((Number(run.index) || 0) + 1) + ' of ' + run.itemIds.length + ' · <span class="answer-count correct">' + correct + ' right</span> · <span class="answer-count wrong">' + wrong + ' wrong</span></p></div><div class="chapter-actions"><a class="btn primary" href="#/exam?run=' + encodeURIComponent(run.id) + '">Resume</a><button type="button" class="btn ghost" data-exam="delete-run" data-run="' + AIP.escape(run.id) + '">Remove</button></div></article>';
      });
    }
    html += '</section>';
    html += '<section class="card exam-setup"><h2>Build a question set</h2><div class="exam-controls">';
    html += '<label class="exam-control"><span>Study mode</span><select data-exam-field="strategy"><option value="adaptive"' + (selected.strategy !== "exam" ? " selected" : "") + '>Smart practice (recommended)</option><option value="exam"' + (selected.strategy === "exam" ? " selected" : "") + '>Exam mode (random)</option></select><small>Smart practice uses new questions first, then missed questions.</small></label>';
    var standardCounts = ["10", "20", "50", "80"];
    var customCount = standardCounts.indexOf(selectedCount) === -1;
    html += '<label class="exam-control"><span>Question count</span><select data-exam-field="count"><option value="10"' + (selectedCount === "10" ? " selected" : "") + '>10</option><option value="20"' + (selectedCount === "20" ? " selected" : "") + '>20</option><option value="50"' + (selectedCount === "50" ? " selected" : "") + '>50</option><option value="80"' + (selectedCount === "80" ? " selected" : "") + '>80</option><option value="custom"' + (customCount ? " selected" : "") + '>Custom</option></select><input type="number" min="1" max="' + all.length + '" inputmode="numeric" data-exam-custom value="' + (customCount ? AIP.escape(selectedCount) : '') + '" placeholder="Custom count, 1–' + all.length + '"><small>Choose 10, 20, 50, 80, or enter your own count.</small></label>';
    html += '<label class="exam-control"><span>Question status</span><select data-exam-field="status"><option value="all">Any status</option><option value="unseen"' + (selected.status === "unseen" ? " selected" : "") + '>Only new questions</option><option value="wrong"' + (selected.status === "wrong" ? " selected" : "") + '>Only failed / needs review</option><option value="correct"' + (selected.status === "correct" ? " selected" : "") + '>Currently correct</option></select><small>Use this to focus a set before you start.</small></label>';
    html += '<label class="exam-control"><span>Source</span><select data-exam-field="source"><option value="all">All sources</option><option value="certsafari"' + (selected.source === "certsafari" ? " selected" : "") + '>CertSafari</option><option value="practice"' + (selected.source === "practice" ? " selected" : "") + '>Practice questions</option><option value="examtopics"' + (selected.source === "examtopics" ? " selected" : "") + '>ExamTopics</option></select></label>';
    html += '<label class="exam-control"><span>Domain</span><select data-exam-field="domain"><option value="all">All domains</option>';
    (AIP.DOMAINS || []).forEach(function (d) {
      html += '<option value="' + d.id + '"' + (String(selected.domain) === String(d.id) ? " selected" : "") + '>Domain ' + d.id + ' · ' + AIP.escape(d.short) + '</option>';
    });
    html += '</select></label>';
    var serviceCounts = AIP.serviceCounts(all);
    html += '<label class="exam-control"><span>AWS service</span><select data-exam-field="service"><option value="all">All AWS services</option>';
    AIP.SERVICE_CATALOG.forEach(function (service) {
      if (serviceCounts[service.id]) html += '<option value="' + service.id + '"' + (selected.service === service.id ? " selected" : "") + '>' + AIP.escape(service.label) + ' · ' + serviceCounts[service.id] + '</option>';
    });
    html += '</select></label></div><div class="exam-algorithm"><strong>How Smart practice chooses:</strong> unanswered questions are always selected before answered ones. Once the pool has been seen, recent wrong answers are shown first, then lower-accuracy and least-recently-seen questions. A question appears at most once in a set.</div><p class="run-limit-note">Up to two mock-exam runs are stored in this browser. Starting a third run replaces the oldest saved run; lifetime right/wrong history is never removed.</p><div class="chapter-actions"><button type="button" class="btn primary" data-exam="start">Start new run</button><a class="btn ghost" href="#/stats">Review question stats</a><a class="btn ghost" href="#/bank">Browse question list</a></div></section>';
    return html;
  };
})();
