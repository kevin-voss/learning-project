window.AIP = window.AIP || {};

AIP.matchRoute = function (parts) {
  if (!parts.length) return null;
  if (parts[0] === "readiness") return { name: "readiness" };
  if (parts[0] === "pool") return { name: "pool" };
  if (parts[0] === "labs" && parts[1]) return { name: "lab", id: parts[1] };
  if (parts[0] === "labs") return { name: "labs" };
  if (parts[0] === "micro") return { name: "micro" };
  if (parts[0] === "fde") return { name: "fde" };
  if (parts[0] === "capstones") return { name: "capstones" };
  return null;
};

AIP.routeTitle = function (route) {
  if (route.name === "readiness") return "Readiness<small>Evidence, not a pass probability</small>";
  if (route.name === "pool") return "Fresh pools<small>Mocks, diagnostic, reserve</small>";
  if (route.name === "labs") return "Labs<small>Browser, local, then AWS</small>";
  if (route.name === "lab") return "Lab<small>" + route.id + "</small>";
  if (route.name === "micro") return "Microcredentials<small>Six, plus two extras</small>";
  if (route.name === "fde") return "FDE<small>Unverified partner details</small>";
  if (route.name === "capstones") return "Capstones<small>Ground, orchestrate, prove, operate</small>";
  return "";
};

AIP.renderRoute = function (route) {
  if (route.name === "readiness" && AIP.renderReadiness) return AIP.renderReadiness();
  if (route.name === "pool" && AIP.renderPool) return AIP.renderPool();
  if (route.name === "labs" && AIP.renderLabs) return AIP.renderLabs();
  if (route.name === "lab" && AIP.renderLab) return AIP.renderLab(route.id);
  if (route.name === "micro" && AIP.renderMicro) return AIP.renderMicro();
  if (route.name === "fde" && AIP.renderFde) return AIP.renderFde();
  if (route.name === "capstones" && AIP.renderCapstones) return AIP.renderCapstones();
  return "";
};
