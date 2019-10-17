// position utilities

/**
 * @typedef Position
 * @type {object}
 * @property {number} x the x value of the position
 * @property {number} y the y value of the position
 */

/**
 * Determine if two Positions are equal
 * @param {Position} pos1 the first position to compare
 * @param {Position} pos2 the second position to compare
 * @returns {boolean} true if the positions are equal (x and y values are identical)
 */
const equals = (pos1={ x: 0, y: 0 }, pos2={ x: 0, y: 0 }) => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

export default {
  equals
}
