
/**
 *
 * @param { Object } param
 * @param { import('prisma-binding').Prisma } param.db
 * @param { Array.<import('./transfer-change-types').TransferChangeType> } param.transferChangeTypes
 * @returns { Promise<InsertedSeason> }
 */

/**
 * @typedef InsertedTransferChangeType
 * @property {string} id
 * @property {string} name
 * @property {string} description
 */

async function seedTransferChangeTypes({ db, transferChangeTypes }) {
  return Promise.all(
    transferChangeTypes.map(t => db.mutation.createTransferChangeType(
      { data: t },
      '{ id, name, description }',
    )),
  );
}

module.exports = { seedTransferChangeTypes };
