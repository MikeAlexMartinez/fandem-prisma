const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("./email");

async function requestEmailValidation({ user, ctx }) {
  if (!user) {
    return new Error(`A valid user token wasn't provided`);
  }

  // set tokens and expiry on user
  const emailValidationToken = (await promisify(randomBytes)(10)).toString(
    "hex"
  );
  const emailValidationTokenExpiry = Date.now() + 1000 * 60 * 60; // one hour
  await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: {
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
}

module.exports = requestEmailValidation;
