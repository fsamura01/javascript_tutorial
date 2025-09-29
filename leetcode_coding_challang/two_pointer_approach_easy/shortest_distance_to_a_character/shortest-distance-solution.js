/**
 * @param {string} s - The input string to search through
 * @param {string} c - The target character to find distances to
 * @return {number[]} - Array of shortest distances to the target character
 */
function shortestToChar(s, c) {
  // Step 1: Find all indices of the target character
  const targetIndices = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      targetIndices.push(i);
    }
  }

  // Step 2: Initialize the result array with maximum possible distances
  const result = new Array(s.length).fill(Infinity);

  // Step 3: Calculate minimum distances for each index
  for (let i = 0; i < s.length; i++) {
    // Find the minimum distance to any occurrence of the target character
    for (const targetIndex of targetIndices) {
      // Calculate absolute distance and update if smaller
      result[i] = Math.min(result[i], Math.abs(i - targetIndex));
    }
  }

  return result;
}

// Test cases
console.log(shortestToChar("loveleetcode", "e"));
// Expected: [3,2,1,0,1,0,0,1,2,2,1,0]
console.log(shortestToChar("aaab", "b"));
// Expected: [3,2,1,0]
