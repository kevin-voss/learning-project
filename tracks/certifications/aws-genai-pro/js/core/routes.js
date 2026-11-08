window.AIP = window.AIP || {};

AIP.matchRoute = function (parts) {
  if (!parts.length) return null;
  if (parts[0] === "readiness") return { name: "readiness" };
  if (parts[0] === "pool") return { name: "pool" };
  if (parts[0] === "labs" && parts[1]) return { name: "lab", id: parts[1] };
  if (parts[0] === "labs") return { name: "labs" };
  if (parts[0] === "micro" && parts[1]) return { name: "project", id: parts[1] };
  if (parts[0] === "micro" || parts[0] === "fde" || parts[0] === "capstones") return { name: "micro" };
  return null;
};

AIP.routeTitle = function (route) {
  if (route.name === "readiness") return "Readiness<small>Evidence, not a pass probability</small>";
  if (route.name === "pool") return "Fresh questions<small>Study questions only</small>";
  if (route.name === "labs") return "Labs<small>Browser checks for the projects</small>";
  if (route.name === "lab") return "Lab<small>" + route.id + "</small>";
  if (route.name === "project") {
    var project = (AIP.MICRO || []).filter(function (item) { return item.id === route.id; })[0];
    return (project ? project.title : "Project") + "<small>What you build, learn, and show</small>";
  }
  if (route.name === "micro") return "Projects<small>Six labs, then you enroll</small>";
  return "";
};

AIP.renderRoute = function (route) {
  if (route.name === "readiness" && AIP.renderReadiness) return AIP.renderReadiness();
  if (route.name === "pool" && AIP.renderPool) return AIP.renderPool();
  if (route.name === "labs" && AIP.renderLabs) return AIP.renderLabs();
  if (route.name === "lab" && AIP.renderLab) return AIP.renderLab(route.id);
  if (route.name === "project" && AIP.renderProject) return AIP.renderProject(route.id);
  if (route.name === "micro" && AIP.renderMicro) return AIP.renderMicro();
  return "";
};
