window.AIP = window.AIP || {};

/* Builds a scored form. Repeats are labelled. History keeps the fresh-only score. */
(function () {
  function rngFrom(seed) {
    var a = (Number(seed) || 1) >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(list, rng) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  AIP.buildForm = function (pool, quotas, seen, opts) {
    opts = opts || {};
    var rng = rngFrom(opts.seed == null ? Date.now() : opts.seed);
    var allowRepeats = !!opts.allowRepeats;
    var items = [];
    var missing = {};
    [1, 2, 3, 4, 5].forEach(function (domain) {
      var need = Number(quotas[domain] || quotas[String(domain)] || 0);
      var inDomain = (pool || []).filter(function (q) { return Number(q.domain) === domain; });
      var fresh = shuffle(inDomain.filter(function (q) { return !(seen && seen[q.id]); }), rng);
      var repeats = shuffle(inDomain.filter(function (q) { return seen && seen[q.id]; }), rng);
      var chosen = fresh.slice(0, need);
      if (chosen.length < need && allowRepeats) {
        chosen = chosen.concat(repeats.slice(0, need - chosen.length));
      }
      if (chosen.length < need) missing[domain] = need - chosen.length;
      chosen.forEach(function (q) {
        items.push({ id: q.id, domain: domain, repeat: !!(seen && seen[q.id]), question: q });
      });
    });
    return {
      items: items,
      missing: missing,
      complete: Object.keys(missing).length === 0,
      freshCount: items.filter(function (item) { return !item.repeat; }).length,
      repeatCount: items.filter(function (item) { return item.repeat; }).length
    };
  };

  AIP.scoreForm = function (items, results) {
    function rate(list) {
      if (!list.length) return null;
      var correct = list.filter(function (item) { return item.correct; }).length;
      return correct / list.length;
    }
    var rows = (items || []).map(function (item, i) {
      return { repeat: !!item.repeat, correct: !!(results && results[i]) };
    });
    var fresh = rows.filter(function (row) { return !row.repeat; });
    var repeats = rows.filter(function (row) { return row.repeat; });
    return {
      total: rate(rows),
      fresh: rate(fresh),
      repeat: rate(repeats),
      freshRatio: rows.length ? fresh.length / rows.length : 0,
      count: rows.length
    };
  };
})();
