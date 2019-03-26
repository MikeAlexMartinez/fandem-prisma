const roles = require("./roles");

module.exports = seedRoles;

async function seedRoles({ db }) {
  return roles.map(async role => {
    const inserted = await db.mutation.createUserRole(
      { data: role },
      "{ id, name }"
    );
    return inserted;
  });
}
