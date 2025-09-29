/**
 * @param {string} s
 * @return {number[]}
 */
function diStringMatch(s) {
  // Initialize our result array
  const result = [];

  // Initialize our range of available numbers
  let low = 0;
  let high = s.length;

  // Iterate through each character in the string
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "I") {
      // For 'I', use the smallest available number
      result.push(low++);
    } else {
      // For 'D', use the largest available number
      result.push(high--);
    }
  }

  // Don't forget to add the last number
  // At this point, low and high will be equal
  result.push(low);

  return result;
}

var diStringMatch = function (s) {
  let low = 0,
    high = s.length;
  let result = new Array(high + 1);

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "I") {
      result[i] = low++;
    } else {
      result[i] = high--;
    }
  }
  result[s.length] = low; // The last remaining number

  return result;
};
