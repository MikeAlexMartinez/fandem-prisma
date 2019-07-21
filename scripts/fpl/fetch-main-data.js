"use strict";
const path = require("path");

const fetchFromApi = require("./call-api");
const { MAIN_API } = require("./endpoints");

// Globals
const args = process.argv;

// if file called specifically run from within
if (path.parse(args[1]).name === "fetchMain") {
  fetchMain()
    .then(() => {
      console.log("exiting...");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

// else functionality is exported to be used in the
// application scheduler
module.exports = {
  fetchMain: fetchMain
};

/**
 * @return {Promise<MainApiData>}
 */
async function fetchMain() {
  const TIMEOFUPDATE = new Date();
  console.log(`Update starting: ${TIMEOFUPDATE.toISOString()} `);
  let fplData;

  try {
    fplData = await getMainData();
  } catch (e) {
    return e;
  }

  return fplData;
}

/**
 * This function hits the main API point and stores data in module variable
 * @return {Promise<MainApiData>}
 */
async function getMainData() {
  /**
   * @type {MainApiData}
   */
  let data;

  try {
    /**
     * @type {MainApiResponse}
     */
    const rawData = await fetchFromApi({ uri: MAIN_API });
    data = transformMainData(rawData);
  } catch (e) {
    return e;
  }

  return data;
}

/**
 *
 * @param {MainApiResponse} mainApiResponse
 * @returns {MainApiData} mainApi
 */
function transformMainData(mainApiResponse) {
  return {
    players: mainApiResponse.elements,
    teams: mainApiResponse.teams,
    gameweeks: mainApiResponse.events
  };
}

/**
 * @typedef {Object} MainApiData
 * @property {FplGameweek[]} gameweeks
 * @property {FplTeam[]} teams
 * @property {FplPlayer[]} players
 */

/**
 * @typedef {Object} MainApiResponse
 * @property {FplGameweek[]} events
 * @property {FplTeam[]} teams
 * @property {FplPlayer[]} elements
 */

/**
 * @typedef {Object} FplPlayer
 * @property {number} assists: 0
 * @property {number} bonus: 5
 * @property {number} bps: 475
 * @property {number} chance_of_playing_next_round: null
 * @property {number} chance_of_playing_this_round: null
 * @property {number} clean_sheets: 6
 * @property {number} code: 69140
 * @property {number} cost_change_event: 0
 * @property {number} cost_change_event_fall: 0
 * @property {number} cost_change_start: 0
 * @property {number} cost_change_start_fall: 0
 * @property {string} creativity: "106.0"
 * @property {number} dreamteam_count: 0
 * @property {number} element_type: 2
 * @property {number} ep_next: null
 * @property {number} ep_this: null
 * @property {number} event_points: 0
 * @property {string} first_name: "Shkodran"
 * @property {string} form: "0.0"
 * @property {number} goals_conceded: 40
 * @property {number} goals_scored: 2
 * @property {string} ict_index: "107.8"
 * @property {number} id: 1
 * @property {boolean} in_dreamteam: false
 * @property {string} influence: "718.6"
 * @property {number} minutes: 2611
 * @property {string} news: ""
 * @property {boolean} news_added: null
 * @property {number} now_cost: 55
 * @property {number} own_goals: 0
 * @property {number} penalties_missed: 0
 * @property {number} penalties_saved: 0
 * @property {string} photo: "69140.jpg"
 * @property {string} points_per_game: "2.6"
 * @property {number} red_cards: 0
 * @property {number} saves: 0
 * @property {string} second_name: "Mustafi"
 * @property {string} selected_by_percent: "0.4"
 * @property {boolean} special: false
 * @property {number} squad_number: null
 * @property {string} status: "a"
 * @property {number} team: 1
 * @property {number} team_code: 3
 * @property {string} threat: "252.0"
 * @property {number} total_points: 80
 * @property {number} transfers_in: 0
 * @property {number} transfers_in_event: 0
 * @property {number} transfers_out: 0
 * @property {number} transfers_out_event: 0
 * @property {string} value_form: "0.0"
 * @property {string} value_season: "0.0"
 * @property {string} web_name: "Mustafi"
 * @property {number} yellow_cards: 9
 */

/**
 * @typedef {Object} FplGameweek
 * @property {number} average_entry_score: 0
 * @property {boolean} data_checked: false
 * @property {Date} deadline_time: "2019-08-17T10:30:00Z"
 * @property {number} deadline_time_epoch: 1566037800
 * @property {number} deadline_time_game_offset: 0
 * @property {boolean} finished: false
 * @property {number} highest_score: null
 * @property {number} highest_scoring_entry: null
 * @property {Array.<import('./fetch-event-data').SchemaFixture>} fixtures
 * @property {number} id: 2
 * @property {boolean} is_current: false
 * @property {boolean} is_next: false
 * @property {boolean} is_previous: false
 * @property {string} name: "Gameweek 2"
 */

/**
 * @typedef {Object} FplTeam
 * @property {number} code: 3
 * @property {number} draw: 0
 * @property {number} form: null
 * @property {number} id: 1
 * @property {number} loss: 0
 * @property {string} name: "Arsenal"
 * @property {number} played: 0
 * @property {number} points: 0
 * @property {number} position: 0
 * @property {string} short_name: "ARS"
 * @property {number} strength: 4
 * @property {number} strength_attack_away: 1270
 * @property {number} strength_attack_home: 1240
 * @property {number} strength_defence_away: 1330
 * @property {number} strength_defence_home: 1290
 * @property {number} strength_overall_away: 1330
 * @property {number} strength_overall_home: 1250
 * @property {number} team_division: null
 * @property {boolean} unavailable: false
 * @property {number} win: 0
 */
