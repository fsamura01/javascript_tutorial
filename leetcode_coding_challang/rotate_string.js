/**
 * Multiple approaches to solve the string rotation problem
 */

/**
 * Approach 1: Concatenation Method
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {string} s - Source string
 * @param {string} goal - Target string
 * @return {boolean} - True if goal can be achieved by rotating s
 */
function rotateString1(s, goal) {
  // Early return if lengths don't match
  if (s.length !== goal.length) return false;

  // Concatenate s with itself and check if goal is a substring
  return (s + s).includes(goal);
}

/**
 * Approach 2: Manual Rotation Check
 * Time Complexity: O(n²)
 * Space Complexity: O(n)
 *
 * @param {string} s - Source string
 * @param {string} goal - Target string
 * @return {boolean} - True if goal can be achieved by rotating s
 */
function rotateString2(s, goal) {
  // Early return if lengths don't match
  if (s.length !== goal.length) return false;
  if (s.length === 0) return true;

  // Try all possible rotations
  for (let i = 0; i < s.length; i++) {
    // Rotate string by i positions
    const rotated = s.slice(i) + s.slice(0, i);
    if (rotated === goal) return true;
  }
  return false;
}

/**
 * Approach 3: KMP Pattern Matching (Most efficient for very large strings)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {string} s - Source string
 * @param {string} goal - Target string
 * @return {boolean} - True if goal can be achieved by rotating s
 */
function rotateString3(s, goal) {
  if (s.length !== goal.length) return false;
  if (s.length === 0) return true;

  // Build KMP failure function
  const pattern = goal + goal;
  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  // Search for s in pattern
  i = 0;
  let j = 0;
  while (i < s.length * 2 && j < pattern.length) {
    if (s[i % s.length] === pattern[j]) {
      i++;
      j++;
      if (j === goal.length) return true;
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return false;
}

// Test suite
function runTests() {
  const testCases = [
    { s: "abcde", goal: "cdeab", expected: true },
    { s: "abcde", goal: "abced", expected: false },
    { s: "", goal: "", expected: true },
    { s: "a", goal: "a", expected: true },
    { s: "aa", goal: "aa", expected: true },
    { s: "aaaa", goal: "aaaa", expected: true },
    { s: "hello", goal: "world", expected: false },
  ];

  for (const [index, test] of testCases.entries()) {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`Input: s = "${test.s}", goal = "${test.goal}"`);
    console.log(`Expected: ${test.expected}`);

    const results = [
      rotateString1(test.s, test.goal),
      rotateString2(test.s, test.goal),
      rotateString3(test.s, test.goal),
    ];

    results.forEach((result, i) => {
      console.log(`Approach ${i + 1} Result: ${result}`);
      console.log(`Approach ${i + 1} Correct: ${result === test.expected}`);
    });
  }
}

// Run the tests
runTests();
