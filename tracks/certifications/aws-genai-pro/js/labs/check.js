window.AIP = window.AIP || {};

/* One check language for browser sims and local labs. */
(function () {
  function readPath(obj, path) {
    var cur = obj;
    String(path || "").split(".").forEach(function (key) {
      if (!key || cur == null) return;
      cur = cur[key];
    });
    return cur;
  }

  function includes(hay, needle) {
    if (Array.isArray(hay)) return hay.map(String).indexOf(String(needle)) !== -1;
    return String(hay == null ? "" : hay).toLowerCase().indexOf(String(needle).toLowerCase()) !== -1;
  }

  AIP.runChecks = function (answer, checks) {
    var failures = [];
    (checks || []).forEach(function (check) {
      var got = readPath(answer, check.path);
      var ok = false;
      if (check.op === "equals") ok = String(got) === String(check.value);
      else if (check.op === "includes") ok = includes(got, check.value);
      else if (check.op === "absent") ok = got == null || got === "" || (Array.isArray(got) && !got.length);
      else if (check.op === "one-of") ok = (check.values || []).map(String).indexOf(String(got)) !== -1;
      else failures.push("Unknown check " + check.op);
      if (!ok && check.op !== "unknown") failures.push(check.id || check.path);
    });
    return { ok: failures.length === 0, failures: failures };
  };
})();
