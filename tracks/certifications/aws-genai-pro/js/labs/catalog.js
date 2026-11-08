window.AIP = window.AIP || {};

AIP.labById = function (id) {
  var labs = AIP.LABS || [];
  for (var i = 0; i < labs.length; i++) if (labs[i].id === id) return labs[i];
  return null;
};
