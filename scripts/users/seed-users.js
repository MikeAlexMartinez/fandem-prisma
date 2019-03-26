const bcrypt = require("bcryptjs");

const users = require("./users");

module.exports = seedUsers;

async function seedUsers({ db, data }) {
  const insertedUsers = users.map(user => {
    const userToInsert = transformUser(user, data);
  });
  return insertedUsers;
}

async function transformUser(user, { teams, countries, subs, roles }) {
  // generate password
  const password = await bcrypt.hash(user.password, 10);

  // fetch favourite team
  const favoriteTeamObj = teams.find(t => t.name === user.favoriteTeam);
  if (!favoriteTeamObj) {
    throw new Error("favourite team not found!");
  }
  const favoriteTeam = {
    id: favoriteTeamObj.id
  };

  // fetch country
  const countryObj = countries.find(c => (c.name = user.country));
  if (!countryObj) {
    throw new Error("country not found!");
  }
  const country = {
    id: countryObj.id
  };

  // fetch subscriptions
  const subscriptions = user.subscriptions.map(key => {
    const selectedSub = subs.find(s => s.name === key);
    if (!selectedSub) {
      throw new Error("subscription not found!");
    }
    return {
      id: selectedSub.id
    };
  });

  // fetch applicable roles
  const userRoles = user.userRoles.map(key => {
    const role = roles.find(r => r.name === key);
    if (!role) {
      throw new Error("subscription not found!");
    }
    return {
      id: role.id
    };
  });

  return {
    ...user,
    password,
    favoriteTeam,
    country,
    subscriptions,
    userRoles
  };
}
