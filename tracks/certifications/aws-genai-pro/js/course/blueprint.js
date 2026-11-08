window.AIP = window.AIP || {};

/* Integer weights: relevance 1–3 times difficulty units 4 / 5 / 6 (1.00 / 1.25 / 1.50). */
(function () {
  var FACTOR = { 1: 4, 2: 5, 3: 6 };

  function skillNumber(id) {
    var parts = String(id).split(".");
    return Number(parts[parts.length - 1]) || 0;
  }

  function better(a, b) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] > b[i]) return true;
      if (a[i] < b[i]) return false;
    }
    return false;
  }

  AIP.allocateDomain = function (domain) {
    var skills = (AIP.SKILLS || []).filter(function (s) { return Number(s.domain) === Number(domain); });
    var totals = AIP.DOMAIN_TOTALS || {};
    var total = Number(totals[domain] != null ? totals[domain] : totals[String(domain)]);
    var targets = {};
    (AIP.TASKS || []).forEach(function (t) {
      if (Number(t.domain) === Number(domain)) targets[t.id] = t.target;
    });
    var weights = skills.map(function (s) { return s.rel * FACTOR[s.diff]; });
    var sumW = weights.reduce(function (a, b) { return a + b; }, 0);
    var counts = weights.map(function (w) { return Math.floor((w * total) / sumW); });
    var fracs = weights.map(function (w) { return (w * total) % sumW; });
    counts = counts.map(function (c) { return c === 0 ? 1 : c; });
    var remaining = total - counts.reduce(function (a, b) { return a + b; }, 0);
    var eligible = skills.map(function (_, i) { return i; });

    function taskSum() {
      var out = {};
      skills.forEach(function (s, i) { out[s.task] = (out[s.task] || 0) + counts[i]; });
      return out;
    }

    while (remaining > 0) {
      if (!eligible.length) eligible = skills.map(function (_, i) { return i; });
      var sums = taskSum();
      var best = eligible[0];
      eligible.forEach(function (i) {
        var s = skills[i];
        var b = skills[best];
        var key = [fracs[i], s.rel, s.diff, (targets[s.task] || 0) - (sums[s.task] || 0), -skillNumber(s.id)];
        var keyB = [fracs[best], b.rel, b.diff, (targets[b.task] || 0) - (sums[b.task] || 0), -skillNumber(b.id)];
        if (better(key, keyB)) best = i;
      });
      counts[best] += 1;
      remaining -= 1;
      eligible = eligible.filter(function (i) { return i !== best; });
    }

    return skills.map(function (s, i) {
      return { id: s.id, task: s.task, domain: Number(domain), count: counts[i] };
    });
  };

  AIP.skillTargets = function () {
    var out = {};
    [1, 2, 3, 4, 5].forEach(function (d) {
      AIP.allocateDomain(d).forEach(function (row) { out[row.id] = row.count; });
    });
    return out;
  };

  AIP.taskTargets = function () {
    var out = {};
    (AIP.TASKS || []).forEach(function (t) { out[t.id] = t.target; });
    return out;
  };
})();
