require("dotenv-safe").config();

const db = require("./scripts/seed-db");

const seedTeamData = require("./scripts/fpl/seed-team-data");
const seedCountries = require("./scripts/countries/seed-countries");

const setup = async () => {
  // add teams
  await seedTeamData({ db });
  // add countries
  await seedCountries({ db });
  // add subscription types

  // add user roles

  // add super user (ME)
};

setup();
