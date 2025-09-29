/**
 * 14. Longest Common Prefix
 * Multiple approaches to solve the Longest Common Prefix problem
 */

/**
 * Approach 1: Vertical Scanning
 * Time Complexity: O(S) where S is sum of all characters in all strings
 * Space Complexity: O(1)
 *
 * @param {string[]} strs - Array of strings
 * @return {string} - Longest common prefix
 */
function longestCommonPrefix1(strs) {
  // Handle edge cases
  if (strs.length === 0) return "";
  if (strs.length === 1) return strs[0];

  // Take first string as reference
  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i];

    // Compare this character with same position in other strings
    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== char) {
        return strs[0].slice(0, i);
      }
    }
  }

  return strs[0];
}

/**
 * Approach 2: Horizontal Scanning (Using reduce)
 * Time Complexity: O(S) where S is sum of all characters in all strings
 * Space Complexity: O(1)
 *
 * @param {string[]} strs - Array of strings
 * @return {string} - Longest common prefix
 */
function longestCommonPrefix2(strs) {
  if (strs.length === 0) return "";

  return strs.reduce((prefix, current) => {
    let i = 0;
    while (
      i < prefix.length &&
      i < current.length &&
      prefix[i] === current[i]
    ) {
      i++;
    }
    return prefix.slice(0, i);
  });
}

/**
 * Approach 3: Divide and Conquer
 * Time Complexity: O(S) where S is sum of all characters in all strings
 * Space Complexity: O(m*log n) where m is max string length and n is number of strings
 *
 * @param {string[]} strs - Array of strings
 * @return {string} - Longest common prefix
 */
function longestCommonPrefix3(strs) {
  if (strs.length === 0) return "";

  function commonPrefix(str1, str2) {
    let i = 0;
    while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
      i++;
    }
    return str1.slice(0, i);
  }

  function divideAndConquer(strs, start, end) {
    if (start === end) return strs[start];

    const mid = Math.floor((start + end) / 2);
    const leftPrefix = divideAndConquer(strs, start, mid);
    const rightPrefix = divideAndConquer(strs, mid + 1, end);

    return commonPrefix(leftPrefix, rightPrefix);
  }

  return divideAndConquer(strs, 0, strs.length - 1);
}

/**
 * Approach 4: Binary Search
 * Time Complexity: O(S * log m) where S is sum of chars and m is min string length
 * Space Complexity: O(1)
 *
 * @param {string[]} strs - Array of strings
 * @return {string} - Longest common prefix
 */
function longestCommonPrefix4(strs) {
  if (strs.length === 0) return "";

  // Find minimum length string
  let minLen = Math.min(...strs.map((str) => str.length));

  function isCommonPrefix(len) {
    const prefix = strs[0].slice(0, len);
    return strs.every((str) => str.startsWith(prefix));
  }

  let low = 0;
  let high = minLen;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (isCommonPrefix(mid)) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return strs[0].slice(0, high);
}

// Test suite
function runTests() {
  const testCases = [
    {
      input: ["flower", "flow", "flight"],
      expected: "fl",
    },
    {
      input: ["dog", "racecar", "car"],
      expected: "",
    },
    {
      input: ["interspecies", "interstellar", "interstate"],
      expected: "inters",
    },
    {
      input: ["throne", "throne"],
      expected: "throne",
    },
    {
      input: [""],
      expected: "",
    },
    {
      input: ["a"],
      expected: "a",
    },
    {
      input: ["", "b"],
      expected: "",
    },
  ];

  for (const [index, test] of testCases.entries()) {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`Input: ${JSON.stringify(test.input)}`);
    console.log(`Expected: "${test.expected}"`);

    const approaches = [
      longestCommonPrefix1,
      longestCommonPrefix2,
      longestCommonPrefix3,
      longestCommonPrefix4,
    ];

    approaches.forEach((approach, i) => {
      const result = approach(test.input);
      console.log(`Approach ${i + 1} Result: "${result}"`);
      console.log(`Approach ${i + 1} Correct: ${result === test.expected}`);
    });
  }
}

// Run the tests
runTests();

function longestCommonPrefix(strs) {
  // Handle edge cases
  // If the array is empty, return an empty string
  if (strs.length === 0) return "";

  // If there's only one string, return it as the prefix
  if (strs.length === 1) return strs[0];

  // Sort the array
  // This puts similar strings next to each other
  // and moves shortest/longest strings to ends
  strs.sort();

  // We only need to compare first and last strings
  // because if they share a prefix, all strings between
  // them must also share that prefix
  // The smallest and largest strings in sorted order determine the prefix
  const firstStr = strs[0];
  const lastStr = strs[strs.length - 1];

  // Find common prefix between first and last strings
  let prefix = "";
  for (let i = 0; i < firstStr.length; i++) {
    // Stop if we reach the end of lastStr
    // or if characters don't match
    // Break if characters don't match or if the index exceeds the length of the last string
    if (i >= lastStr.length || firstStr[i] !== lastStr[i]) {
      break;
    }
    // Add matching character to the prefix
    prefix += firstStr[i];
  }

  return prefix;
}

/**
 * Finds the longest common prefix among an array of strings.
 * @param {string[]} strs - Array of strings.
 * @return {string} - The longest common prefix.
 */
function longestCommonPrefix(strs) {
  // Edge case: if the array is empty, return an empty string
  if (strs.length === 0) return "";

  // Step 1: Sort the strings array
  strs.sort();

  // Step 2: Compare the first and last strings in the sorted array
  const first = strs[0]; // Lexicographically smallest string
  const last = strs[strs.length - 1]; // Lexicographically largest string
  let i = 0;

  // Step 3: Find the common prefix between the first and last strings
  while (i < first.length && i < last.length && first[i] === last[i]) {
    i++;
  }

  // Step 4: Return the substring from the beginning to the matched length
  return first.substring(0, i);
}

// Example usage:
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // Output: ""
console.log(longestCommonPrefix([])); // Output: ""
console.log(longestCommonPrefix(["apple"])); // Output: "apple"
