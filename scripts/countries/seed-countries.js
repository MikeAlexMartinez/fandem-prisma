const countryCodes = require('./countries');

async function seedCountryData({ db }) {
  return Promise.all(
    countryCodes.map(
      async country => db.mutation.createCountry(
        { data: country },
        '{ id, name }',
      ),
    ),
  );
}

module.exports = seedCountryData;
