const {
  scoringTypes: definedScoringTypes,
  defaultScoringSystem,
} = require('./scoring-systems');
const predefinedContestTypes = require('./contest-types');
const predefinedContestUserTypes = require('./contest-user-types');
const { contests: predefinedContests } = require('./contests');

/*
   Seed Contests
    - default scoring
      - Seed scoring types
      - seed default scoring header with default details
    - contest types
    - contest user types
    - contests
      - with:
         - ContestSlates
            - SlateEntries
         - ContestCreator
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

async function fetchGameweeksWithFixtures({ db }) {
  return db.query.gameweeks(
    null,
    '{ id deadlineTime fixtures { id } }',
  );
}

async function constructContestSlateEntries({ db }) {
  // fetch gameweeks with fixtures
  try {
    const gameweeks = await fetchGameweeksWithFixtures({ db });
    return {
      create: gameweeks.map(gameweek => ({
        startDate: gameweek.deadlineTime,
        gameweekId: {
          connect: {
            id: gameweek.id,
          },
        },
        entries: gameweek.fixtures.map(fixture => ({
          create: {
            fixture: {
              connect: {
                id: fixture.id,
              },
            },
          },
        })),
      })),
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function constructUserConnection(creator) {
  return {
    create: {
      user: {
        connect: {
          displayName: creator,
        },
      },
    },
  };
}

function constructContestType(isPublic) {
  return {
    connect: {
      name: isPublic ? 'Public' : 'Private',
    },
  };
}

async function fetchDefaultContestScoring({ db }) {
  return db.query.defaultScoringSystemHeaders(
    { where: { name: 'Classic' } },
    `{
      id
      systemDetail {
        id
        name
        description
        isActive
        isDefault
        startDate
        points
        range
        scoringType {
          id
        }
      }
    }`,
  );
}

function constructScoringDetail(detail, user) {
  const {
    id,
    name,
    description,
    isActive,
    isDefault,
    startDate,
    points,
    range,
    scoringType: {
      id: scoringTypeId,
    },
  } = detail;
  return {
    create: {
      name,
      description,
      isActive,
      isDefault,
      startDate,
      points,
      range,
      scoringType: {
        connect: {
          id: scoringTypeId,
        },
      },
      lastModifiedBy: {
        connect: {
          name: user,
        },
      },
      inheritedFrom: {
        connect: {
          id,
        },
      },
    },
  };
}

function constructContestScoring(defaultSystemHeader, user) {
  return {
    create: {
      isCustom: false,
      inheritedFrom: {
        connect: {
          id: defaultSystemHeader.id,
        },
      },
      detail: defaultSystemHeader.systemDetail
        .map(detail => constructScoringDetail(detail, user)),
    },
  };
}

async function constructContestScoringFromDefaults({ db, user }) {
  try {
    const defaultSystemHeader = await fetchDefaultContestScoring({ db });
    return constructContestScoring(defaultSystemHeader[0], user);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function seedContests({ db, contests }) {
  return Promise.all(
    contests.map(async (contest) => {
      const {
        contestName,
        isAll,
        isPublic,
        invitationCode,
        startDate,
        playerLimit,
        creator,
      } = contest;
      const userConnection = constructUserConnection(creator);
      const contestType = constructContestType(isPublic);
      const contestSlates = await constructContestSlateEntries({ db });
      const scoringSystem = await constructContestScoringFromDefaults({
        db, user: creator,
      });

      return {
        contestName,
        isAll,
        isPublic,
        invitationCode,
        startDate,
        playerLimit,
        contestType,
        createdBy: userConnection,
        currentOwner: userConnection,
        scoringSystem,
        users: [userConnection],
        contestSlates,
      };
    }),
  );
}

async function seedContestData({ db }) {
  try {
    const scoringTypes = await seedScoringTypes({
      db, scoringTypes: definedScoringTypes,
    });
    const defaultScoringSystemHeader = await createDefaultScoringSystem({
      db, systemHeader: defaultScoringSystem,
    });
    const contestTypes = await seedContestTypes({
      db, contestTypes: predefinedContestTypes,
    });
    const contestUserTypes = await seedContestUserTypes({
      db, userTypes: predefinedContestUserTypes,
    });
    const contests = await seedContests({ db, contests: predefinedContests });
    return {
      scoringTypes,
      defaultScoringSystemHeader,
      contestTypes,
      contestUserTypes,
      contests,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = seedContestData;
