/**
 * Find the shortest distance to target string in a circular array
 * @param {string[]} words - Array of strings
 * @param {string} target - Target string to find
 * @param {number} startIndex - Starting index
 * @return {number} Shortest distance to target or -1 if not found
 */
function closestTarget(words, target, startIndex) {
  // Edge case: if target doesn't exist in words
  if (!words.includes(target)) {
    return -1;
  }

  const n = words.length;
  let minDistance = Infinity;

  // Check each occurrence of target in the array
  for (let i = 0; i < n; i++) {
    if (words[i] === target) {
      // Calculate clockwise distance
      const clockwise = (i - startIndex + n) % n;
      // Calculate counter-clockwise distance
      const counterClockwise = (startIndex - i + n) % n;
      // Update minimum distance
      minDistance = Math.min(
        minDistance,
        Math.min(clockwise, counterClockwise)
      );
    }
  }

  return minDistance;
}

// Test cases
function runTests() {
  // Test case 1
  console.log(
    closestTarget(["hello", "i", "am", "leetcode", "hello"], "hello", 1)
  ); // Expected: 1

  // Test case 2
  console.log(closestTarget(["a", "b", "leetcode"], "leetcode", 0)); // Expected: 1

  // Test case 3
  console.log(closestTarget(["i", "eat", "leetcode"], "ate", 0)); // Expected: -1
}

runTests();
