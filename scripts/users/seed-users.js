const bcrypt = require("bcryptjs");

const users = require("./users");

module.exports = seedUsers;

async function seedUsers({ db, data }) {
  return await Promise.all(
    users.map(async user => {
      try {
        const userToInsert = await transformUser(user, data);
        const insertedUser = await db.mutation.createUser(
          {
            data: userToInsert
          },
          "{ id email }"
        );
        return insertedUser;
      } catch (e) {
        console.error(e);
      }
    })
  );
}

async function transformUser(user, { teams, countries, subs, roles }) {
  // generate password
  const password = await bcrypt.hash(user.password, 10);

  // fetch favourite team
  const favoriteTeamObj = teams.find(t => t.name === user.favoriteTeam);
  if (!favoriteTeamObj) {
    return new Error("favourite team not found!");
  }
  const favoriteTeam = {
    connect: {
      id: favoriteTeamObj.id
    }
  };

  // fetch country
  const countryObj = countries.find(c => (c.name = user.country));
  if (!countryObj) {
    return new Error("country not found!");
  }
  const country = {
    connect: {
      id: countryObj.id
    }
  };

  // fetch subscriptions
  const subscriptionsCreateMany = user.subscriptions.map(key => {
    const selectedSub = subs.find(s => s.name === key);
    if (!selectedSub) {
      return new Error("subscription not found!");
    }
    return {
      id: selectedSub.id
    };
  });
  const subscriptions = {
    connect: subscriptionsCreateMany
  };

  // fetch applicable roles
  const userRolesCreateMany = user.userRoles.map(key => {
    const role = roles.find(r => r.name === key);
    if (!role) {
      return new Error("subscription not found!");
    }
    return {
      id: role.id
    };
  });
  const userRoles = {
    connect: userRolesCreateMany
  };

  return {
    ...user,
    password,
    favoriteTeam,
    country,
    subscriptions,
    userRoles
  };
}
