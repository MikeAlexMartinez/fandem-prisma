const subscriptions = require("./subscriptions");

module.exports = seedSubscriptions;

async function seedSubscriptions({ db }) {
  return await Promise.all(
    subscriptions.map(
      async subscription =>
        await db.mutation.createFandemSubscription(
          { data: subscription },
          "{ id, name }"
        )
    )
  );
}
