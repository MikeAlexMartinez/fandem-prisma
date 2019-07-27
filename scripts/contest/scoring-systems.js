const defaultScoringDetail = [
  {
    name: 'Correct Result',
    scoringType: {
      connect: {
        name: 'CORRECT_RESULT',
      },
    },
    description: 'Did the outcome of the event, match your prediction',
  },
  {
    name: 'Home Score',
    scoringType: {
      connect: {
        name: 'HOME_SCORE_EXACT',
      },
    },
    description: 'Did the home teams score match your prediction',
  },
  {
    name: 'Away Score',
    scoringType: {
      connect: {
        name: 'AWAY_SCORE_EXACT',
      },
    },
    description: 'Did the away teams score match your prediction',
  },
];

const defaultScoringSystem = {
  name: 'Classic',
  description: 'The standard fandem scoring system',
  systemDetail: {
    create: defaultScoringDetail,
  },
};

const scoringTypes = [
  {
    name: 'CORRECT_RESULT',
    description: 'Did the outcome of the event, match your prediction',
  },
  {
    name: 'HOME_SCORE_EXACT',
    description: 'Did the home teams score match the prediction exactly',
  },
  {
    name: 'AWAY_SCORE_EXACT',
    description: 'Did the home teams score match the prediction exactly',
  },
  {
    name: 'HOME_SCORE_RANGE',
    description: 'Was the score predicted for the home team within the defined range',
  },
  {
    name: 'AWAY_SCORE_RANGE',
    description: 'Was the score predicted for the away team within the defined range',
  },
];

module.exports = {
  defaultScoringSystem,
  defaultScoringDetail,
  scoringTypes,
};
