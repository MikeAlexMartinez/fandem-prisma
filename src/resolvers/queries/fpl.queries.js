const fplQueries = {
  async gameplayData(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      return null;
    }
    return ctx.db.query.seasons(null, info);
  }
};

module.exports = fplQueries;
