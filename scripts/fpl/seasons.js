/**
 * @typedef {Object} Season
 * @property {number} [id]
 * @property {string} label
 * @property {number} fplId
 * @property {string} competition
 * @property {number} startYear
 * @property {number} endYear
 * @property {boolean} isCurrent
 * @property {boolean} isPrevious
 * @property {boolean} isNext
 * @property {Array.<import('./seed-gameweeks').SchemaGameweek>} events
 */

/**
 * @type {{ [key: string]: Season }}
 */
const seasons = {
  201920: {
    label: '2019/20',
    fplId: 274,
    competition: 'Premier League',
    startYear: 2019,
    endYear: 2020,
    isCurrent: true,
    isPrevious: false,
    isNext: false,
    events: [],
  },
};

module.exports = seasons;
