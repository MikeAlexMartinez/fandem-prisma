require("dotenv-safe").config();

const db = require("./scripts/seed-db");

const seedTeamData = require("./scripts/fpl/seed-team-data");

const setup = async () => {
  // add teams
  await seedTeamData({ db });
  // add countries
  // add subscription types
  // add user roles
  // add super user (ME)
};

setup();
