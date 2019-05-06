const teamQueries = {
  async teams(parent, args, ctx, info) {
    return ctx.db.query.teams({}, info);
  }
};

module.exports = teamQueries;
