require("dotenv-safe").config();

const db = require("./scripts/seed-db");

const seedFplData = require("./scripts/fpl/seed-fpl-data");
const seedCountries = require("./scripts/countries/seed-countries");
const seedRoles = require("./scripts/users/seed-roles");
const seedSubscriptions = require("./scripts/users/seed-subscriptions");
const seedUsers = require("./scripts/users/seed-users");

const setup = async () => {
  // add teams - (Change to All relevant FPL data)
  const { teams, gameweeks, season } = await seedFplData({ db });
  console.log(`Inserted ${teams.length} teams`);
  console.log(`Inserted ${gameweeks.length} gameweeks`);
  console.log(`Inserted ${season.competition} ${season.label} season`);
  // add countries
  const countries = await seedCountries({ db });
  console.log(`Inserted ${countries.length} countries`);
  // add subscription types
  const subs = await seedSubscriptions({ db });
  console.log(`Inserted ${subs.length} subscriptions`);
  // add roles
  const roles = await seedRoles({ db });
  console.log(`Inserted ${roles.length} roles`);
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
  console.log(`created ${users.length} users`);
};

setup();
