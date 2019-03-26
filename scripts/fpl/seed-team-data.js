const { fetchMain } = require("./fetch-main-data");

module.exports = seedTeamData;

async function seedTeamData({ db }) {
  let mainData;

  // fetch team data
  try {
    mainData = await fetchMain();
  } catch (e) {
    throw e;
  }

  let teams = [];
  if (mainData && mainData.teams) {
    teams = transformTeamData(mainData.teams);
  }

  return teams.map(async team => {
    const t = await db.mutation.createTeam({ data: team }, "{ id name }");
    return t;
  });
}

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
