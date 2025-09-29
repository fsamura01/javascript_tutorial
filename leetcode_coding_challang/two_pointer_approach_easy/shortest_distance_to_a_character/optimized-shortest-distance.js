/**
 * Optimized solution for Shortest Distance to a Character
 * Time Complexity: O(n)
 * Space Complexity: O(1) extra space (not counting the output array)
 *
 * @param {string} s - The input string to search through
 * @param {string} c - The target character to find distances to
 * @return {number[]} - Array of shortest distances to the target character
 */
function shortestToChar(s, c) {
  const n = s.length;
  const result = new Array(n).fill(0);

  // First pass: Left to Right
  // Track the most recent occurrence of the target character
  let prev = -Infinity;
  for (let i = 0; i < n; i++) {
    // Update prev if current character is the target
    if (s[i] === c) {
      prev = i;
    }
    // Calculate distance to the previous occurrence
    result[i] = Math.abs(i - prev);
  }

  // Second pass: Right to Left
  // Track the next occurrence of the target character
  let next = Infinity;
  for (let i = n - 1; i >= 0; i--) {
    // Update next if current character is the target
    if (s[i] === c) {
      next = i;
    }
    // Compare and take the minimum of current distance
    // and distance to the next occurrence
    result[i] = Math.min(result[i], Math.abs(i - next));
  }

  return result;
}

// Test cases
console.log(shortestToChar("loveleetcode", "e"));
// Expected: [3,2,1,0,1,0,0,1,2,2,1,0]
console.log(shortestToChar("aaab", "b"));
// Expected: [3,2,1,0]

function shortestToChar(s, c) {
  let n = s.length;
  let answer = new Array(n).fill(Infinity);

  // Left to Right pass
  let prev = -Infinity; // A very small index to start with
  for (let i = 0; i < n; i++) {
    if (s[i] === c) prev = i;
    answer[i] = Math.abs(i - prev);
  }

  // Right to Left pass
  prev = Infinity; // A very large index to start with
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === c) prev = i;
    answer[i] = Math.min(answer[i], Math.abs(i - prev));
  }

  return answer;
}

// Example usage
console.log(shortestToChar("loveleetcode", "e")); // [3,2,1,0,1,0,0,1,2,2,1,0]
console.log(shortestToChar("aaab", "b")); // [3,2,1,0]
