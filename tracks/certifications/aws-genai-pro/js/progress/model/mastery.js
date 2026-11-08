window.AIP = window.AIP || {};

/* Evidence model. n is the sum of answer weights. The range is an 80% Wilson interval. */
(function () {
  var Z80 = 1.2815515655446004;

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  AIP.wilson = function (phat, n) {
    if (!(n > 0)) return { L: 0, U: 1 };
    var z2 = Z80 * Z80;
    var denom = 1 + z2 / n;
    var centre = (phat + z2 / (2 * n)) / denom;
    var margin = Z80 * Math.sqrt((phat * (1 - phat)) / n + z2 / (4 * n * n)) / denom;
    return { L: Math.max(0, centre - margin), U: Math.min(1, centre + margin) };
  };

  AIP.answerWeight = function (attempt, now) {
    var at = Number(attempt.at) || now || Date.now();
    var ageDays = ((now || Date.now()) - at) / 86400000;
    if (ageDays < 0) ageDays = 0;
    var exp = attempt.exp == null ? 1 : Number(attempt.exp);
    var mode = attempt.mode === "mock" ? 1 : 0.6;
    var level = Number(attempt.difficulty) || 2;
    var diff = level <= 1 ? 0.8 : level >= 3 ? 1.2 : 1;
    return Math.pow(0.5, ageDays / 30) * exp * mode * diff;
  };

  AIP.exposureForIndex = function (index) {
    if (index <= 0) return 1;
    if (index === 1) return 0.4;
    return 0.15;
  };

  function freshHits(attempts, now) {
    var n = 0;
    attempts.forEach(function (a) {
      var ageDays = ((now || Date.now()) - Number(a.at)) / 86400000;
      if (a.correct && Number(a.exp) === 1 && Number(a.difficulty) >= 2 && ageDays <= 60) n += 1;
    });
    return n;
  }

  AIP.evidenceLevel = function (n, lower, attempts, now) {
    if (!(n >= 1)) return "no evidence";
    if (n < 5) return "too little";
    if (n >= 8 && lower >= 0.75 && freshHits(attempts || [], now) >= 3) return "strong";
    if (lower >= 0.6) return "proficient";
    return "developing";
  };

  AIP.taskEvidence = function (attempts, now) {
    now = now || Date.now();
    var list = attempts || [];
    var n = 0;
    var correctW = 0;
    list.forEach(function (a) {
      var w = AIP.answerWeight(a, now);
      n += w;
      if (a.correct) correctW += w;
    });
    var phat = n > 0 ? correctW / n : 0;
    var range = n > 0 ? AIP.wilson(phat, n) : { L: 0, U: 1 };
    return {
      n: n,
      nLabel: round2(n),
      phat: phat,
      L: range.L,
      U: range.U,
      level: AIP.evidenceLevel(n, range.L, list, now)
    };
  };
})();
