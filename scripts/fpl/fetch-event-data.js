const { EVENT_API } = require("./endpoints");
const callApi = require("./call-api");

/**
 * @param {number} gameweek - which gameweek (event) to fetch data for
 * @returns {EventAPIResponse} gameweekData
 */
async function fetchEventData(gameweek) {
  const uri = EVENT_API;
  const qs = {
    event: gameweek
  };
  /**
   * @type {SchemaFixture}
   */
  let gameweekData;

  try {
    /**
     * @type {EventApiResponse}
     */
    const apiData = await callApi({
      uri,
      qs
    });
    gameweekData = transformGameweekData(apiData);
  } catch (e) {
    console.error(e);
    const err = new Error(`Error fetching gameweek ${gameweek}`);
    console.error(err);
    throw e;
  }

  return gameweekData;
}

/**
 * Takes array response of fixtures and shapes it according to graphql schema
 * @param {Array<FixtureData>} gameweekData
 * @returns {Array<SchemaFixture>}
 */
function transformGameweekData(gameweekData) {
  return {
    fplCode: code,
    event: event,
    finished: finished,
    finishedProvisional: finished_provisional,
    fixtureId: id,
    kickoffTime: kickoff_time,
    minutes: minutes,
    provisionalStartTime: provisional_start_time,
    started: started,
    teamA: team_a,
    teamADifficulty: team_a_difficulty,
    teamAScore: team_a_score,
    teamH: team_h,
    teamHDifficulty: team_h_difficulty,
    teamHScore: team_h_score
  };
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

module.export = fetchEventData;
