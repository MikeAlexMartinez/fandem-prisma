const fplQueries = {
  async gameplayData(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      return [];
    }
    return ctx.db.query.seasons(null, info);
  },
  async gameweeks(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      return [];
    }
    return ctx.db.query.gameweeks(args, info);
  }
};

module.exports = fplQueries;
