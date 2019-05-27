const { forwardTo } = require("prisma-binding");

const accountQueries = {
  async checkDisplayName(parent, args, ctx) {
    return ctx.db.exists.User({
      displayName: args.displayName
    });
  },
  async checkEmail(parent, args, ctx) {
    return ctx.db.exists.User({
      email: args.email
    });
  },
  async userByDisplayName(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { displayName: args.displayName }
      },
      info
    );
  },
  async currentUser(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: userId }
      },
      info
    );
  },
  countries: forwardTo("db")
};

module.exports = accountQueries;
