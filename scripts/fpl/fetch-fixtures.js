const fetchEventData = require("./fetch-event-data");
const sleep = require("../utils/sleep");

/**
 *
 * @typedef { Object } GameweekFixtures
 * @property {number} gameweekId
 * @property {Array.<import('./fetch-event-data').SchemaFixture>} fixtures
 */

/**
 * manages scheduling of fetching fixtures that relate to all passed gameweeks
 * @param { Object } param
 * @param { Array.<import('./seed-gameweeks').InsertedGameweek> } param.gameweeks
 * @returns { Promise<Array.<GameweekFixtures>> }
 */
async function fetchFixtures({ gameweeks }) {
  /**
   * @type { Array.<GameweekFixtures> }
   */
  const fixtures = [];
  for (let gameweek of gameweeks) {
    try {
      // pause script execution for 500ms to help prevent being blacklisted
      // by fpl api
      await sleep(500);
      const gameweekFixtures = await fetchEventData(gameweek.fplEventId);
      fixtures.push({
        fixtures: gameweekFixtures,
        gameweekId: gameweek.fplEventId
      });
    } catch (e) {
      console.error(e);
    }
  }

  return fixtures;
}

module.exports = { fetchFixtures };
