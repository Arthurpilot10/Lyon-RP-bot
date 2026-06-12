const config = require("../config");
function getSalary(member) {
  let best = config.civilSalary;
  let matchedRole = "Civil";
  for (const role of member.roles.cache.values()) {
    const amount = config.salariesByRoleName[role.name];
    if (amount && amount > best) { best = amount; matchedRole = role.name; }
  }
  return { amount: best, role: matchedRole };
}
module.exports = { getSalary };
