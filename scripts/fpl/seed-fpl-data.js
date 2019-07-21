const { Prisma } = require("prisma-binding");

const { fetchMain } = require("./fetch-main-data");
const { fetchFixtures } = require("./fetch-fixtures");

const { seedSeason } = require("./seed-season");
const { seedTeamData } = require("./seed-team-data");
const { seedGameweeks } = require("./seed-gameweeks");
const { seedFixtures } = require("./seed-fixtures");

// Hardcoded data
const seasons = require("./seasons");

module.exports = seedFplData;

/**
 *
 * @typedef SeededFPLData
 * @property { Array.<import('./seed-team-data').InsertedTeam> } teams
 * @property { Array.<import('./seed-gameweeks').InsertedGameweek> } gameweeks
 * @property { import('./seed-season').InsertedSeason } season
 * @property { Array.<import('./seed-fixtures').InsertedFixture> } fixtures
 */

/**
 *
 * @param { Object } param
 * @param { Prisma } param.db
 * @returns { Promise<SeededFPLData> }
 */
async function seedFplData({ db }) {
  try {
    const mainApiData = await fetchMain();
    const { teams, gameweeks } = mainApiData;
    // - seed season data
    const createdSeason = await seedSeason({ db, season: seasons[201920] });
    // - seed team data
    const insertedTeams = await seedTeamData({
      db,
      teams,
      season: createdSeason
    });
    // - seed events (gameweek) data
    const insertedGameweeks = await seedGameweeks({
      db,
      gameweeks,
      season: createdSeason
    });

    const fixtures = await fetchFixtures({ gameweeks: insertedGameweeks });
    //    - each gameweek - seed fixtures
    const insertedFixtures = await seedFixtures({
      db,
      gameweekFixtures: fixtures,
      teams: insertedTeams
    });

    //    - fetch gameweek data
    //    - insert fixtures
    return {
      teams: insertedTeams,
      gameweeks: insertedGameweeks,
      season: createdSeason,
      fixtures: insertedFixtures
    };
  } catch (e) {
    throw e;
  }
}
