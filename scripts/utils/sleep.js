module.exports = sleep;

/**
 * pause function execution for defined milliseconds
 * @param {number} milliseconds
 * @returns {Promise<null>}
 */
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
