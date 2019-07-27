const accountMutations = require("./account.mutations");
const fplMutations = require("./fpl.mutations");

const Mutations = {
  ...accountMutations,
  ...fplMutations
};

module.exports = Mutations;
