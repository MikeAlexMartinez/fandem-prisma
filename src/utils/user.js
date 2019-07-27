function userIsRole(user, role) {
  return user.userRoles.some(userRole => userRole.name === role);
}

module.exports = {
  userIsRole
};
