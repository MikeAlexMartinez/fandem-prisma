const teamQueries = {
  async teams(parent, args, ctx, info) {
    return ctx.db.query.teams(null, info);
  }
};

module.exports = teamQueries;
