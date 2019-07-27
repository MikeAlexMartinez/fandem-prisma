const { userIsRole } = require("../../utils/user");

const fplMutations = {
  async updateFixture(parent, args, ctx, info) {
    const { user } = ctx.request;

    if (!user) {
      throw new Error("A User Is Required");
    }

    if (!userIsRole(user, "ADMIN")) {
      throw new Error("Insufficient Priviledges to perform this action");
    }

    return ctx.db.mutation.updateFixture(args, info);
  }
};

module.exports = fplMutations;
