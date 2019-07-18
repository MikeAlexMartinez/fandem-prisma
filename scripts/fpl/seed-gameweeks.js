const { Prisma } = require("prisma-binding");

/**
 *
 * @param { Object } param
 * @param { Prisma } param.db
 * @param { import(./fetch-main-data).FplGameweek[] } param.gameweeks
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
 * @param { import(./fetch-main-data).FplGameweek[] } teams
 * @returns { FandemGameweek }
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
 * @typedef {Object} FandemGameweek
 * @property {number} averageEntryScore
 * @property {boolean} dataChecked
 * @property {Date} deadlineYime
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
