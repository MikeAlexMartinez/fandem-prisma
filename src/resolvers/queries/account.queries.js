const accountQueries = {
  async checkEmail(parent, args, ctx, info) {
    console.log(ctx.db);
    return ctx.db.exists.User({
      email: args.email
    });
  }
};

module.exports = accountQueries;
