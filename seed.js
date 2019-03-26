require("dotenv-safe").config();

const db = require("./scripts/seed-db");

const seedTeamData = require("./scripts/fpl/seed-team-data");
const seedCountries = require("./scripts/countries/seed-countries");
const seedRoles = require("./scripts/users/seed-roles");
const seedSubscriptions = require("./scripts/users/seed-subscriptions");
const seedUsers = require("./scripts/users/seed-users");

const setup = async () => {
  // add teams
  const teams = await seedTeamData({ db });
  // add countries
  const countries = await seedCountries({ db });
  // add subscription types
  const subs = await seedSubscriptions({ db });
  // add roles
  const roles = await seedRoles({ db });
  // add super user (ME)
  const users = await seedUsers({
    db,
    data: {
      teams,
      countries,
      subs,
      roles
    }
  });

  console.log(users);
  console.log(`created ${users.length} users`);
};

setup();
