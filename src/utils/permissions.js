const config = require("../config");
function hasRoleName(member, names) {
  return member.roles.cache.some(r => names.map(n => n.toLowerCase()).includes(r.name.toLowerCase()));
}
function isMoneyAdmin(member) {
  return config.adminUserIds.includes(member.id) || hasRoleName(member, config.adminRoleNames);
}
function isPolice(member) {
  return member.roles.cache.some(r => ["gendarmerie","police national","police nationale","gestion agents"].includes(r.name.toLowerCase()));
}
function canUseService(member) {
  return hasRoleName(member, config.serviceRoleNames) || isPolice(member);
}
module.exports = { isMoneyAdmin, isPolice, canUseService };
