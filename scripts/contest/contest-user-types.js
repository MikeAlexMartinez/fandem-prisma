const contestUserTypes = [
  {
    name: 'ADMIN',
    description: 'This user is able to manage users in this contest',
  },
  {
    name: 'PARTICIPANT',
    description: 'This user is simply a participant in the contest',
  },
  {
    name: 'OWNER',
    description: 'This user either created or has since been assigned ownership of this contest, has same rights and more as ADMIN users',
  },
];

module.exports = contestUserTypes;
