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
      maxAge: 1000 * 60 * 60 * 24 * 30 // One Month
    });

    // finally return user
    console.log(user);
    return user;
  },
  async signIn(parent, args, ctx, info) {
    const { email, password } = args;

    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      return new Error("Either the email or password was incorrect");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return new Error("Invalid Password!");
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30 // One Month
    });

    return user;
  },
  signOut(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return {
      message: "Logged Out successfully"
    };
  },
  async requestEmailValidation(parent, args, ctx, info) {
    // check real user
    const user = ctx.request.user;
    if (!user) {
      return new Error(`A valid user token wasn't provided`);
    }

    // set tokens and expiry on user
    const emailValidationToken = (await promisify(randomBytes)(10)).toString(
      "hex"
    );
    const emailValidationTokenExpiry = Date.now() + 1000 * 60 * 60; // one hour
    const res = await ctx.db.mutation.updateUser({
      where: { id: user.id },
      date: {
        emailValidationToken,
        emailValidationTokenExpiry,
        emailValidated: false
      }
    });

    // email validation token
    let mailResponse;
    let error;
    try {
      mailResponse = await transport.sendMail({
        from: "contact@fandem.io",
        to: user.email,
        subject: "Your Email Validation Token",
        html: makeANiceEmail(`
          Your Email Validation Token is here!
          \n\n
          <a href="${
            process.env.FRONTEND_URL
          }/validate?emailValidationToken=${emailValidationToken}">Click here to Validate Your Email</a>
        `)
      });
      console.log(mailResponse);
    } catch (e) {
      console.error(e);
      error = e;
    }

    if (error) {
      return new Error("Error Encountered Sending Email");
    }

    return {
      message: "Thanks! An email has been sent to you"
    };
  },
  async validateEmail(parent, args, ctx, info) {
    const { emailValidationToken } = args;

    if (!emailValidationToken) {
      return new Error("No validation token provided");
    }
    // check if legit token
    // and hasn't expired
    const [user] = await ctx.db.query.users({
      where: {
        emailValidationToken,
        emailValidationTokenExpiry_gte: Date.now() - 1000 * 60 * 60
      }
    });
    if (!user) {
      return new Error(`Invalid email token provided`);
    }

    // update user
    const updatedUser = await ctx.db.query.updateUser({
      where: { id: user.id },
      data: {
        emailValidationToken: null,
        emailValidationTokenExpiry: null,
        emailValidated: true,
        emailValidationDate: new Date().toUTCString()
      }
    });

    // return success
    return {
      message: "Thanks! Your email has been validated"
    };
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
        from: "contact@fandem.io",
        to: user.email,
        subject: "Your password reset token",
        html: makeANiceEmail(`Your Password Reset Token is here!
          \n\n
          <a href="${
            process.env.FRONTEND_URL
          }/reset?resetToken=${resetToken}">Click here to Reset</a>
        `)
      });
      console.log(mailResponse);
    } catch (e) {
      console.error(e);
      error = e;
    }

    if (error) {
      return new Error("Error Encountered Sending Email");
    }

    return {
      message: "Thanks! An email has been sent to you"
    };
  },
  async resetPassword(parent, args, ctx, info) {
    const { password, confirmPassword, resetToken } = args;

    // check passwords match
    if (password !== confirmPassword) {
      return new Error("Passwords didn't match");
    }

    // check if legit token
    // and hasn't expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken,
        resetTokenExpiry_gte: Date.now() - 1000 * 60 * 60 // one hour
      }
    });

    if (!user) {
      return new Error(`Invalid token provided`);
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new password
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    // create jwt
    const updatedUser = jwt.sign(
      { userId: updatedUser.id },
      process.env.APP_SECRET
    );

    // set jwt
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30 // one month
    });

    // return to user
    return updatedUser;
  }
};

module.exports = accountMutations;
