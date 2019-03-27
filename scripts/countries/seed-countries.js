const countryCodes = require("./countries");

module.exports = seedCountryData;

async function seedCountryData({ db }) {
  return await Promise.all(
    countryCodes.map(
      async country =>
        await db.mutation.createCountry({ data: country }, "{ id, name }")
    )
  );
}
