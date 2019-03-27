const subscriptions = require("./subscriptions");

module.exports = seedSubscriptions;

async function seedSubscriptions({ db }) {
  return await Promise.all(
    subscriptions.map(
      async subscription =>
        await db.mutation.createSubscription(
          { data: subscription },
          "{ id, name }"
        )
    )
  );
}
