window.AIP = window.AIP || {};

/* Versioned export of every AIP localStorage key. Import replaces those keys only. */
(function () {
  AIP.backupPayload = function (read) {
    var keys = AIP.STORAGE_KEYS || {};
    var stored = {};
    Object.keys(keys).forEach(function (name) {
      stored[name] = read(keys[name]);
    });
    return { version: 4, savedAt: new Date().toISOString(), stored: stored };
  };

  AIP.restorePayload = function (payload, write) {
    if (!payload || payload.version !== 4 || !payload.stored) {
      throw new Error("This backup is not version 4.");
    }
    var keys = AIP.STORAGE_KEYS || {};
    Object.keys(payload.stored).forEach(function (name) {
      if (!keys[name]) return;
      if (payload.stored[name] == null) return;
      write(keys[name], payload.stored[name]);
    });
    return true;
  };
})();
