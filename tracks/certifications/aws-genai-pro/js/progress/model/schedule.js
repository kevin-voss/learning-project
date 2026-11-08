window.AIP = window.AIP || {};

/* Fresh capacity is the smallest floor(fresh / quota) across the five domains. */
(function () {
  var DOMAINS = [1, 2, 3, 4, 5];

  function quotaMap(name) {
    var raw = (AIP.FORM_QUOTA && AIP.FORM_QUOTA[name]) || {};
    var out = {};
    DOMAINS.forEach(function (d) { out[d] = Number(raw[d] != null ? raw[d] : raw[String(d)] || 0); });
    return out;
  }

  AIP.isStudyQuestion = function (q) {
    if (!q || q.quarantine) return false;
    var source = String(q.source || "");
    return source === "practice" || source === "original";
  };

  AIP.isApprovedQuestion = function (q) {
    if (!AIP.isStudyQuestion(q)) return false;
    if (q.review === "approved") return true;
    if (AIP.storage && AIP.storage.isApproved && AIP.storage.isApproved(q.id)) return true;
    return false;
  };

  AIP.studyPool = function (opts) {
    opts = opts || {};
    return (AIP.questions || []).filter(function (q) {
      if (!AIP.isStudyQuestion(q)) return false;
      if (opts.approvedOnly && !AIP.isApprovedQuestion(q)) return false;
      return true;
    });
  };

  AIP.freshCounts = function (pool, seen) {
    var counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    (pool || []).forEach(function (q) {
      var domain = Number(q.domain);
      if (!counts.hasOwnProperty(domain)) return;
      if (seen && seen[q.id]) return;
      counts[domain] += 1;
    });
    return counts;
  };

  AIP.formCapacity = function (fresh, quota) {
    var n = Infinity;
    DOMAINS.forEach(function (d) {
      var q = quota[d] || 0;
      if (q <= 0) {
        n = 0;
        return;
      }
      n = Math.min(n, Math.floor((fresh[d] || 0) / q));
    });
    return n === Infinity ? 0 : n;
  };

  AIP.formShortfall = function (fresh, quota) {
    var out = {};
    DOMAINS.forEach(function (d) { out[d] = Math.max(0, (quota[d] || 0) - (fresh[d] || 0)); });
    return out;
  };

  AIP.miniForm = function (fresh) {
    var quota = quotaMap("mock");
    var ratio = Infinity;
    DOMAINS.forEach(function (d) {
      if (!quota[d]) return;
      ratio = Math.min(ratio, (fresh[d] || 0) / quota[d]);
    });
    if (!isFinite(ratio) || ratio <= 0) return null;
    var parts = {};
    var sum = 0;
    DOMAINS.forEach(function (d) {
      parts[d] = Math.floor(quota[d] * ratio);
      sum += parts[d];
    });
    if (sum < 20) return null;
    var minutesEach = (AIP.FORM_QUOTA && AIP.FORM_QUOTA.minutesEach) || 2.4;
    return { quotas: parts, count: sum, minutes: Math.round(sum * minutesEach) };
  };

  AIP.poolOffer = function (pool, seen, opts) {
    opts = opts || {};
    var fresh = AIP.freshCounts(pool, seen || {});
    var mockQuota = quotaMap("mock");
    var diagQuota = quotaMap("diagnostic");
    var mockCap = AIP.formCapacity(fresh, mockQuota);
    var diagCap = AIP.formCapacity(fresh, diagQuota);
    var reserve = opts.reserve !== false;
    var offeredMocks = mockCap > 0 && reserve ? mockCap - 1 : mockCap;
    var approved = (pool || []).filter(AIP.isApprovedQuestion).length;
    return {
      fresh: fresh,
      mockCapacity: mockCap,
      offeredMocks: offeredMocks,
      diagnosticCapacity: diagCap,
      reserve: reserve,
      heldBack: reserve && mockCap > 0 ? 1 : 0,
      shortfall: offeredMocks > 0 ? null : AIP.formShortfall(fresh, mockQuota),
      mini: offeredMocks > 0 ? null : AIP.miniForm(fresh),
      approved: approved,
      notice: approved < 150,
      poolSize: (pool || []).length
    };
  };
})();
