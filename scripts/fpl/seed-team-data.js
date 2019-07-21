const { Prisma } = require("prisma-binding");

/**
 *
 * @typedef InsertedTeam
 * @property {string} id
 * @property {string} name
 * @property {number} fplTeamId
 */

/**
 *
 * @param { Object } param
 * @param { Prisma } param.db
 * @param { Array.<import('./fetch-main-data').FplTeam> } param.teams
 * @param { import('./seed-season').InsertedSeason } param.season
 * @returns { Promise<Array.<InsertedTeam>> }
 */
async function seedTeamData({ db, teams, season }) {
  const transformedTeams = transformTeamData(teams);

  return await Promise.all(
    transformedTeams.map(
      async team =>
        await db.mutation.createTeam(
          {
            data: {
              ...team,
              season: {
                connect: {
                  id: season.id
                }
              },
              homeFixtures: [],
              awayFixtures: []
            }
          },
          "{ id name fplTeamId }"
        )
    )
  );
}

/**
 *
 * @typedef SchemaTeam
 * @property {string} [id]
 * @property {number} code
 * @property {number} fplTeamId
 * @property {string} name
 * @property {string} shortName
 * @property {number} strength
 * @property {number} strengthAttackAway
 * @property {number} strengthAttackHome
 * @property {number} strengthDefenceAway
 * @property {number} strengthDefenceHome
 * @property {number} strengthOverallAway
 * @property {number} strengthOverallHome
 * @property {number} [teamDivision]
 */

/**
 *
 * @param {Array.<import('./fetch-main-data').FplTeam>} teams
 * @returns {Array.<SchemaTeam>}
 */
function transformTeamData(teams) {
  return teams.map(team => ({
    code: team.code,
    fplTeamId: team.id,
    name: team.name,
    shortName: team.short_name,
    strength: team.strength,
    strengthAttackAway: team.strength_attack_away,
    strengthAttackHome: team.strength_attack_home,
    strengthDefenceAway: team.strength_defence_away,
    strengthDefenceHome: team.strength_defence_home,
    strengthOverallAway: team.strength_overall_away,
    strengthOverallHome: team.strength_overall_home,
    teamDivision: team.team_division
  }));
}

module.exports = { seedTeamData, transformTeamData };
