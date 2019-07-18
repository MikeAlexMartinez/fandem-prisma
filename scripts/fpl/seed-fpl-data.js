const { fetchMain } = require("./fetch-main-data");
const { seedSeason } = require("./seed-season");
const { seedTeamData } = require("./seed-team-data");
const { seedGameweeks } = require("./seed-gameweeks");

// Hardcoded data
const seasons = require("./seasons");

module.exports = seedFplData;

/**
 *
 * @param { Object } param
 * @param { Prisma } param.db
 * @returns { Promise<null> }
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

    const fixtures = await fetchFixtures({
      gameweeks: insertedGameweeks
    });

    //    - each gameweek - seed fixtures
    //    - fetch gameweek data
    //    - insert fixtures
    return {
      teams: insertedTeams,
      gameweeks: insertedGameweeks,
      season: createdSeason
    };
  } catch (e) {
    throw e;
  }
}
