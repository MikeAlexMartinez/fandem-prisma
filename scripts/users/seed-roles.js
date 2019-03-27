const roles = require("./roles");

module.exports = seedRoles;

async function seedRoles({ db }) {
  return Promise.all(
    roles.map(
      async role =>
        await db.mutation.createUserRole({ data: role }, "{ id, name }")
    )
  );
}
