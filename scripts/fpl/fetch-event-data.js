const { EVENT_API } = require("./endpoints");
const callApi = require("./call-api");

/**
 * @param {number} gameweekId - which gameweek (event) to fetch data for
 * @returns {Promise<Array.<SchemaFixture>>} gameweekData
 */
async function fetchEventData(gameweekId) {
  const uri = EVENT_API;
  /**
   * @type { Object.<string, string>}
   */
  const qS = {
    event: `${gameweekId}`
  };
  /**
   * @type {Array.<SchemaFixture>}
   */
  let gameweekData;

  try {
    /**
     * @type {EventAPIResponse}
     */
    const apiData = await callApi({
      uri,
      qS
    });
    gameweekData = transformGameweekData(apiData);
  } catch (e) {
    console.error(e);
    const err = new Error(`Error fetching gameweek ${gameweekId}`);
    console.error(err);
    throw err;
  }

  return gameweekData;
}

/**
 * Takes array response of fixtures and shapes it according to graphql schema
 * @param {Array<FixtureData>} gameweekData
 * @returns {Array<SchemaFixture>}
 */
function transformGameweekData(gameweekData) {
  return gameweekData.map(g => ({
    fplCode: g.code,
    event: g.event,
    finished: g.finished,
    finishedProvisional: g.finished_provisional,
    fixtureId: g.id,
    kickoffTime: g.kickoff_time,
    minutes: g.minutes,
    provisionalStartTime: g.provisional_start_time,
    started: g.started,
    teamA: g.team_a,
    teamADifficulty: g.team_a_difficulty,
    teamAScore: g.team_a_score,
    teamH: g.team_h,
    teamHDifficulty: g.team_h_difficulty,
    teamHScore: g.team_h_score
  }));
}

/**
 * @typedef {Object} FixtureData
 * @property {number} code
 * @property {number} event
 * @property {boolean} finished
 * @property {boolean} finished_provisional
 * @property {number} id
 * @property {Date} kickoff_time
 * @property {number} minutes
 * @property {boolean} provisional_start_time
 * @property {boolean} started
 * @property {Array<*>} stats
 * @property {number} team_a
 * @property {number} team_a_difficulty
 * @property {number} team_a_score
 * @property {number} team_h
 * @property {number} team_h_difficulty
 * @property {number} team_h_score
 */

/**
 * @typedef {Object} SchemaFixture
 * @property {number} [id]
 * @property {number} fplCode
 * @property {number} event
 * @property {boolean} finished
 * @property {boolean} finishedProvisional
 * @property {number} fixtureId
 * @property {Date} kickoffTime
 * @property {number} minutes
 * @property {boolean} provisionalStartTime
 * @property {boolean} started
 * @property {number} teamA
 * @property {number} teamADifficulty
 * @property {number} teamAScore
 * @property {number} teamH
 * @property {number} teamHDifficulty
 * @property {number} teamHScore
 */

/**
 * expected response stucture of event data api
 * @typedef {Array<FixtureData>} EventAPIResponse
 */

module.exports = fetchEventData;
