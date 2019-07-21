const { Prisma } = require("prisma-binding");

module.exports = { seedSeason };

/**
 *
 * @param { Object } param
 * @param { Prisma } param.db
 * @param { import('./seasons').Season } param.season
 * @returns { Promise<InsertedSeason> }
 */
async function seedSeason({ db, season }) {
  return db.mutation.createSeason(
    { data: season },
    "{ id, label, competition }"
  );
}

/**
 * minimal representation of created season inserted into db
 * @typedef InsertedSeason
 * @property {string} id
 * @property {string} label
 * @property {string} competition
 */
