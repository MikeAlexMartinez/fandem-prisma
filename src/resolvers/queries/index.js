const accountQueries = require("./account.queries");
const teamQueries = require("./team.queries");

const Queries = {
  ...accountQueries,
  ...teamQueries
};

module.exports = Queries;
