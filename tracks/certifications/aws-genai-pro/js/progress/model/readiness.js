window.AIP = window.AIP || {};

/* Domain and overall ranges. Tasks with no evidence count as L = 0 and U = 1. */
(function () {
  function shareReport(parts) {
    var shareSum = 0;
    var evidenced = 0;
    var pNum = 0;
    var pDen = 0;
    var L = 0;
    var U = 0;
    parts.forEach(function (part) {
      var w = part.share;
      shareSum += w;
      if (!part.report || part.report.level === "no evidence") {
        U += w;
        return;
      }
      evidenced += w;
      pNum += w * part.report.phat;
      pDen += w;
      L += w * part.report.L;
      U += w * part.report.U;
    });
    return {
      phat: pDen > 0 ? pNum / pDen : 0,
      L: shareSum ? L / shareSum : 0,
      U: shareSum ? U / shareSum : 1,
      completeness: shareSum ? evidenced / shareSum : 0
    };
  }

  AIP.domainEvidence = function (taskReports) {
    var tasks = (AIP.TASKS || []).filter(function (t) { return true; });
    var byDomain = {};
    tasks.forEach(function (task) {
      if (!byDomain[task.domain]) byDomain[task.domain] = [];
      byDomain[task.domain].push({
        id: task.id,
        share: task.target,
        report: taskReports[task.id] || { level: "no evidence", phat: 0, L: 0, U: 1, n: 0 }
      });
    });
    var out = {};
    Object.keys(byDomain).forEach(function (domain) {
      out[domain] = shareReport(byDomain[domain]);
      out[domain].tasks = byDomain[domain].map(function (part) {
        return { id: part.id, level: part.report.level, n: part.report.n, L: part.report.L, U: part.report.U };
      });
    });
    return out;
  };

  AIP.overallEvidence = function (domainReports) {
    var weights = (AIP.FORM_QUOTA && AIP.FORM_QUOTA.index) || { 1: 31, 2: 26, 3: 20, 4: 12, 5: 11 };
    var parts = [1, 2, 3, 4, 5].map(function (d) {
      return { share: Number(weights[d] || weights[String(d)] || 0), report: domainReports[d] || domainReports[String(d)] };
    });
    var report = shareReport(parts);
    report.label = "Not an AWS score, not a pass probability.";
    return report;
  };

  AIP.majorTasks = function () {
    return (AIP.TASKS || []).filter(function (t) { return t.target >= 15; }).map(function (t) { return t.id; });
  };

  AIP.bookingGuideline = function (input) {
    var reasons = [];
    var mocks = (input.mocks || []).slice(-2);
    if (mocks.length < 2) reasons.push("Take two full mocks first.");
    mocks.forEach(function (mock, i) {
      if (!(mock.freshRatio >= 0.9)) reasons.push("Mock " + (i + 1) + " needs at least 90% fresh questions.");
      if (!(mock.freshScore >= 0.8)) reasons.push("Mock " + (i + 1) + " needs at least 80% on the fresh questions.");
    });
    var domains = input.domains || {};
    [1, 2, 3, 4, 5].forEach(function (d) {
      var row = domains[d] || domains[String(d)] || { L: 0, completeness: 0 };
      if (!(row.L >= 0.65)) reasons.push("Domain " + d + " lower bound is under 0.65.");
    });
    if (!(input.completeness >= 0.9)) reasons.push("Evidence completeness is under 90%.");
    var tasks = input.tasks || {};
    AIP.majorTasks().forEach(function (id) {
      var level = (tasks[id] && tasks[id].level) || "no evidence";
      if (level === "developing" || level === "too little" || level === "no evidence") {
        reasons.push("Task " + id + " is " + level + ".");
      }
    });
    return { ready: reasons.length === 0, reasons: reasons };
  };
})();
