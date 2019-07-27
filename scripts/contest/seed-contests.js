const {
  scoringTypes: definedScoringTypes,
  defaultScoringSystem,
} = require('./scoring-systems');
const predefinedContestTypes = require('./contest-types');
const predefinedContestUserTypes = require('./contest-user-types');

/*
// Seed Contests
//  - default scoring
//    - Seed scoring types
//    - seed default scoring header with default details
//  - contest types
//  - contest user types
//  - contests
//    - with:
//       - ContestCreator
         - ContestOwner
         - ContestType
         - ScoringSystemHeader (with scoring system details)
         - ContestUser (initially only the creator)
*/
async function seedScoringTypes({ db, scoringTypes }) {
  return Promise.all(
    scoringTypes.map(async scoringType => db.mutation.createScoringType(
      { data: scoringType },
      '{ id, name }',
    )),
  );
}

async function createDefaultScoringSystem({ db, systemHeader }) {
  return db.mutation.createDefaultScoringSystemHeader(
    { data: systemHeader },
    '{ id name systemDetail { name scoringType { name } } }',
  );
}

async function seedContestUserTypes({ db, userTypes }) {
  return Promise.all(
    userTypes.map(async contestUserType => db.mutation.createContestUserType(
      { data: contestUserType },
      '{ id name }',
    )),
  );
}

async function seedContestTypes({ db, contestTypes }) {
  return Promise.all(
    contestTypes.map(async contestType => db.mutation.createContestType(
      { data: contestType },
      '{ id name }',
    )),
  );
}

async function seedContests({ db }) {
  try {
    // const scoringTypes = await seedScoringTypes({
    //   db, scoringTypes: definedScoringTypes,
    // });
    // const defaultScoringSystemHeader = await createDefaultScoringSystem({
    //   db, systemHeader: defaultScoringSystem,
    // });
    const contestTypes = await seedContestTypes({
      db, contestTypes: predefinedContestTypes,
    });
    const contestUserTypes = await seedContestUserTypes({
      db, userTypes: predefinedContestUserTypes,
    });
    return {
      // scoringTypes,
      // defaultScoringSystemHeader,
      contestTypes,
      contestUserTypes,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = seedContests;
