const { Prisma } = require("prisma-binding");

/**
 *
 * @typedef InsertedFixture
 * @property { string } id
 * @property { number } fixtureId
 */

/**
 *
 * @param { Object } param
 * @param { Prisma } param.db
 * @param { Array.<import('./fetch-fixtures').GameweekFixtures> } param.gameweekFixtures
 * @param { Array.<import('./seed-team-data').InsertedTeam> } param.teams
 * @returns { Promise<Array.<InsertedFixture>> }
 */
async function seedFixtures({ db, gameweekFixtures, teams }) {
  const flatFixtures = flattenFixtures(gameweekFixtures, teams);
  return await Promise.all(
    flatFixtures.map(
      async fixture =>
        await db.mutation.createFixture(
          {
            data: fixture
          },
          "{ id fixtureId }"
        )
    )
  );
}

/**
 *
 * @param { Array.<import('./fetch-fixtures').GameweekFixtures> } gameweekFixtures
 * @param { Array.<import('./seed-team-data').InsertedTeam> } teams
 * @returns { Array.<FixtureToInsert>}
 */
function flattenFixtures(gameweekFixtures, teams) {
  return gameweekFixtures.reduce((acc, cur) => {
    return acc.concat(
      cur.fixtures.map(fixture => {
        const teamA = createFixture(fixture, teams, "A");
        const teamH = createFixture(fixture, teams, "H");
        return {
          ...fixture,
          event: {
            connect: {
              fplEventId: cur.gameweekId
            }
          },
          teamA,
          teamH
        };
      })
    );
  }, []);
}

/**
 *
 * @param { import('./fetch-event-data').SchemaFixture } fixture
 * @param { Array.<import('./seed-team-data').InsertedTeam> } teams
 * @param { string } venue
 * @returns { FixtureCreation }
 */
function createFixture(fixture, teams, venue) {
  const selectedTeam = teams.find(
    team => team.fplTeamId === fixture[`team${venue}`]
  );
  const createTeamVenue = venue === "H" ? "home" : "away";
  return {
    create: {
      [`${createTeamVenue}Team`]: {
        connect: {
          id: selectedTeam.id
        }
      }
    }
  };
}

module.exports = { seedFixtures, createFixture, flattenFixtures };

/**
 * @typedef ConnectFplEventId
 * @property { number } fplEventId
 */

/**
 * @typedef ConnectEvent
 * @property { ConnectFplEventId } connect
 */

/**
 * @typedef ConnectId
 * @property { string } id
 */

/**
 * @typedef ConnectInput
 * @property { ConnectId } connect
 */

/**
 * @typedef {Object.<string, ConnectInput>} FixtureCreateInput
 */

/**
 * @typedef FixtureCreation
 * @property { FixtureCreateInput } create
 */

/**
 * @typedef { Object } FixtureToInsert
 * @property { number } [id]
 * @property { number } fplCode
 * @property { boolean } finished
 * @property { boolean } finishedProvisional
 * @property { number } fixtureId
 * @property { Date } kickoffTime
 * @property { number } minutes
 * @property { boolean } provisionalStartTime
 * @property { boolean } started
 * @property { number } teamADifficulty
 * @property { number } teamAScore
 * @property { number } teamHDifficulty
 * @property { number } teamHScore
 * @property { ConnectEvent } event
 * @property { FixtureCreation } teamA
 * @property { FixtureCreation } teamH
 */
