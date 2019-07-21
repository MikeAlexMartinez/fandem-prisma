const { Prisma } = require("prisma-binding");

/**
 *
 * @typedef InsertedGameweek
 * @property {string} id
 * @property {string} name
 * @property {number} fplEventId
 */

/**
 *
 * @param { Object } param
 * @param { Prisma } param.db
 * @param { import('./seed-season').InsertedSeason } param.season
 * @param { Array.<import('./fetch-main-data').FplGameweek> } param.gameweeks
 * @return { Promise<Array.<InsertedGameweek>> }
 */
async function seedGameweeks({ db, gameweeks, season }) {
  const transformedGameweeks = transformGameweekData(gameweeks);

  return await Promise.all(
    transformedGameweeks.map(
      async team =>
        await db.mutation.createGameweek(
          {
            data: {
              ...team,
              fixtures: [],
              season: {
                connect: {
                  id: season.id
                }
              }
            }
          },
          "{ id name fplEventId }"
        )
    )
  );
}
/**
 *
 * @param { Array.<import('./fetch-main-data').FplGameweek> } gameweeks
 * @returns { Array.<SchemaGameweek> }
 */
function transformGameweekData(gameweeks) {
  return gameweeks.map(gameweek => ({
    averageEntryScore: gameweek.average_entry_score,
    dataChecked: gameweek.data_checked,
    deadlineTime: gameweek.deadline_time,
    deadlineTimeEpoch: gameweek.deadline_time_epoch,
    deadlineTimeGameOffset: gameweek.deadline_time_game_offset,
    finished: gameweek.finished,
    highestScore: gameweek.highest_score,
    highestScoringEntry: gameweek.highest_scoring_entry,
    fplEventId: gameweek.id,
    isCurrent: gameweek.is_current,
    isNext: gameweek.is_next,
    isPrevious: gameweek.is_previous,
    name: gameweek.name
  }));
}

module.exports = { seedGameweeks, transformGameweekData };

/**
 * @typedef {Object} SchemaGameweek
 * @property {number} averageEntryScore
 * @property {boolean} dataChecked
 * @property {Date} deadlineTime
 * @property {number} deadlineTimeEpoch
 * @property {number} deadlineTimeGameOffset
 * @property {boolean} finished
 * @property {number} highestScore
 * @property {number} highestScoringEntry
 * @property {number} fplEventId
 * @property {boolean} isCurrent
 * @property {boolean} isNext
 * @property {boolean} isPrevious
 * @property {string} name
 */
