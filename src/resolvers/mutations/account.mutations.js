const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../../email/email");

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
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Month
    });

    // finally return user
    return user;
  },
  async signIn(parent, args, ctx, info) {
    const { email, password } = this.args;

    const user = await ctx.db.query({ where: { email } });
    if (!user) {
      throw new Error("Either the email or password was incorrect");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password!");
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30 // One Month
    });

    return user;
  },
  signOut(parent, args, ctx, info) {
    ctx.response.cleearCookie("token");
    return {
      message: "Logged Out successfully"
    };
  },
  async requestEmailValidation(parent, args, ctx, info) {
    // check real user
    // set tokens and expiry on user
    // email validation token
    // respond
  },
  async validateEmail(parent, args, ctx, info) {
    // check if legit token
    // and hasn't expired
    // update user
    // return success
  },
  async requestReset(parent, args, ctx, info) {
    const { email } = args;
    // check real user
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      return new Error(
        `If this email address has an account, a reset email has been sent`
      );
    }
    // Check resetToken and expiry on user
    const resetToken = (await promisify(randomBytes)(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour from now
    const res = await ctx.db.mutation.updateUser({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });
    // email the reset token
    let mailResponse;
    let error;
    try {
      mailResponse = await transport.sendMail({
        from: "contact@suboot.io",
        to: user.email,
        subject: "Your password reset token",
        html: makeANiceEmail(`Your Password Reset Token is here!
          \n\n
          <a href="${
            process.env.FRONTEND_URL
          }/reset?resetToken=${resetToken}">Click here to Reset</a>
        `)
      });
    } catch (e) {
      console.error(e);
      error = e;
    }

    if (error) {
      throw new Error("Error Encountered Sending Email");
    }

    return {
      message: "Thanks! An email has been sent to you"
    };
  },
  async resetPassword(parent, args, ctx, info) {
    const { password, confirm, resetToken } = args;

    // check passwords match

    // check if legit token
    // and hasn't expired

    // hash new password

    // save new password

    // create jwt

    // set jwt

    // return to user
  }
};

module.exports = accountMutations;
