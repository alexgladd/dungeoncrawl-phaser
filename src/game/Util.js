// game utilities

/**
 * Clamp the given number between the given min and max (inclusive)
 * @param {number} num the number to clamp
 * @param {number} min the minimum allowed value
 * @param {number} max the maximum allowed value
 * @returns {number} the clamped result
 */
const clamp = (num, min=0, max=1) => {
  if (num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
}

export default {
  clamp
}
