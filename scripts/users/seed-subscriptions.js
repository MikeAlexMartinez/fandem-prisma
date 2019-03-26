const subscriptions = require("./subscriptions");

module.exports = seedSubscriptions;

async function seedSubscriptions({ db }) {
  return subscriptions.map(async subscription => {
    const inserted = await db.mutation.createSubscription(
      { data: subscription },
      "{ id, name }"
    );
    return inserted;
  });
}
