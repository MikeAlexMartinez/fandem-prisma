"use strict";
const path = require("path");

const fetchFromApi = require("./call-api");
const MAIN = "https://fantasy.premierleague.com/api/bootstrap-static";

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
 * @return {promise}
 */
async function getMainData() {
  let data;

  try {
    const rawData = await fetchFromApi({ uri: MAIN });
    data = transformMainData(rawData);
  } catch (e) {
    return e;
  }

  return data;
}

function transformMainData(d) {
  return {
    players: d.elements,
    teams: d.teams,
    gameweeks: d.events,
    currentGameweek: d["current-event"],
    nextFixtures: d["next_event_fixtures"],
    nextGameweek: d["next-event"]
  };
}
