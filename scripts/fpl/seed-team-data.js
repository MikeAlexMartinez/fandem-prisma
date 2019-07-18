async function seedTeamData({ db, teams, season }) {
  const transformedTeams = transformTeamData(teams, season);

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
          "{ id name }"
        )
    )
  );
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

module.exports = { seedTeamData, transformTeamData };
