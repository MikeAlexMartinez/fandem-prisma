const countryCodes = require("./countries");

module.exports = seedCountryData;

async function seedCountryData({ db }) {
  return countryCodes.map(async country => {
    const inserted = await db.mutation.createCountry(
      { data: country },
      "{ id, name }"
    );
    return inserted;
  });
}
