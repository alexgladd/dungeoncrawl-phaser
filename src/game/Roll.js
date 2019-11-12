// dice rolls

/**
 * Signifies a critical success roll
 */
const criticalSuccess = 999;

/**
 * Signifies a critical failure roll
 */
const criticalFailure = 0;

/**
 * The most generic of rolls: roll a M-sided die N times and sum the results
 * @param {number} n the number of times to roll
 * @param {number} m the number of sides on the die
 * @returns {number} the result of the rolls
 */
const NdM = (n, m) => {
  let result = 0;

  for (let i = 0; i < n; i++) {
    result += Math.floor(Math.random() * m) + 1;
  }

  // console.log(`Roll ${n}d${m}: ${result}`);

  return result;
}

/**
 * Roll one N-sided die
 * @param {number} n the number of sides on the die
 * @returns {number} the roll result
 */
const dN = n => {
  return NdM(1, n);
}

/**
 * Roll one d20
 * @returns {number} the roll result
 */
const d20 = () => {
  return NdM(1, 20);
}

export default {
  criticalSuccess,
  criticalFailure,
  NdM,
  dN,
  d20
}
