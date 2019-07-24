const accountQueries = require("./account.queries");
const teamQueries = require("./team.queries");
const fplQueries = require("./fpl.queries");

const Queries = {
  ...accountQueries,
  ...teamQueries,
  ...fplQueries
};

module.exports = Queries;
