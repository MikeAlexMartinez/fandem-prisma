const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");

const accountMutations = {
  async createUser(parent, args, ctx, info) {
    const email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);

    // get USER role
    const [plainUserRole] = await ctx.db.query.userRoles({
      where: { name: "USER" }
    });

    // get FREE subscription
    const [freeSubscripton] = await ctx.db.query.subscriptions({
      where: { name: "FREE" }
    });

    // construct and return user
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          email,
          password,
          userRoles: {
            connect: {
              id: plainUserRole.id
            }
          },
          subscriptions: {
            connect: {
              id: freeSubscripton.id
            }
          }
        }
      },
      info
    );

    // create JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // set JWT as cookie on response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // one week
    });

    // finally return user
    return user;
  }
};

module.exports = accountMutations;
