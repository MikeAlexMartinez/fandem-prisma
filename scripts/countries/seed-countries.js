const countryCodes = require("./countries");

module.exports = seedCountryData;

async function seedCountryData({ db }) {
  countryCodes.forEach(async country => {
    await db.mutation.createCountry({ data: country }, "{ id }");
  });
}
