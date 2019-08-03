const publicContest = {
  contestName: 'All Dem Fans',
  isPublic: true,
  isAll: true,
  invitationCode: 'all-fandem',
  startDate: new Date(2019, 7, 9, 20, 0, 0).toISOString(),
  creator: 'hurriKANE',
  userType: 'OWNER'
};

const privateContestWork = {
  contestName: 'Precision Decision',
  isPublic: false,
  invitationCode: 'durrants4lyf',
  startDate: new Date(2019, 7, 9, 20, 0, 0).toISOString(),
  playerLimit: 200,
  creator: 'A Sterling Performance',
  userType: 'OWNER'
};

const extraContest = {
  contestName: 'fan demo contest',
  isPublic: true,
  invitationCode: 'extra-contest',
  startDate: new Date(2019, 7, 9, 20, 0, 0).toISOString(),
  creator: 'A Sterling Performance',
  userType: 'OWNER'
};

module.exports = {
  publicContest,
  privateContestWork,
  extraContest,
  contests: [
    publicContest,
    privateContestWork,
    extraContest,
  ],
};
