/**
 *
 * @param {Object} param
 * @param { Prisma } param.db
 * @param { import(./seasons).Season } season
 */
async function seedSeason({ db, season }) {
  return db.mutation.createSeason(
    { data: season },
    "{ id, label, competition }"
  );
}

module.exports = { seedSeason };
