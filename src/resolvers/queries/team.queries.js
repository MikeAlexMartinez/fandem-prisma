const teamQueries = {
  async fetchAllTeams(parent, args, ctx, info) {
    return ctx.db.query.teams({}, info);
  }
};

module.exports = teamQueries;
