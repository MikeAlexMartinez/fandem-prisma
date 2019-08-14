/**
 * @typedef {Object} TransferChangeType
 * @property {string} name
 * @property {string} description
 */

/**
 * @type {Array.<TransferChangeType>}
 */
const transferChangeTypes = [
  {
    name: 'TOTAL_POINTS',
    description: 'How many points has this player scored so far this season',
  },
  {
    name: 'NOW_COST',
    description: 'What\'s the current cost of this player',
  },
  {
    name: 'SELECTED_BY_PERCENT',
    description: 'what percentage of fpl users have selected this player to 1 decimal place',
  },
  {
    name: 'TRANSFERS_IN',
    description: 'how many time has this player been transferred in to a users team',
  },
  {
    name: 'TRANSFERS_IN_EVENT',
    description: 'how many time has this player been transferred in to a users team during this gameweek',
  },
  {
    name: 'TRANSFERS_OUT',
    description: 'how many time has this player been transferred out of a users team',
  },
  {
    name: 'TRANSFERS_OUT_EVENT',
    description: 'how many time has this player been transferred out of a users team this gameweek',
  },
];

module.exports = transferChangeTypes;
