/**
 * Solution 1: Sliding Window with Map
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // Map to store the most recent index of each character
  const lastSeen = new Map();
  let maxLength = 0;
  let start = 0; // Start of current window

  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];

    // If we've seen this character before and it's in our current window
    if (lastSeen.has(currentChar) && lastSeen.get(currentChar) >= start) {
      // Move start to the position after the last occurrence
      start = lastSeen.get(currentChar) + 1;
    }

    // Update the last seen position of current character
    lastSeen.set(currentChar, end);

    // Update maxLength if current window is longer
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

/**
 * Solution 2: Sliding Window with Set
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstringSet(s) {
  const seen = new Set();
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    // While we have a repeating character
    while (seen.has(s[end])) {
      // Remove characters from start until we remove the duplicate
      seen.delete(s[start]);
      start++;
    }

    seen.add(s[end]);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

/**
 * Solution 3: Optimized for ASCII characters
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstringASCII(s) {
  // Array to store the last position of each ASCII character
  const lastIndex = new Array(128).fill(-1);
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    const charCode = s.charCodeAt(end);
    start = Math.max(start, lastIndex[charCode] + 1);
    maxLength = Math.max(maxLength, end - start + 1);
    lastIndex[charCode] = end;
  }

  return maxLength;
}

// Test cases
const testCases = ["abcabcbb", "bbbbb", "pwwkew", "", " ", "au", "dvdf"];

for (const test of testCases) {
  console.log(`\nInput: "${test}"`);
  console.log("Output (Map):", lengthOfLongestSubstring(test));
  console.log("Output (Set):", lengthOfLongestSubstringSet(test));
  console.log("Output (ASCII):", lengthOfLongestSubstringASCII(test));
}

/* 
 var lengthOfLongestSubstring = function (s) {
  const lastSeen = new Map();
  let start = 0;
  let maxLen = 0;

  for (let end = 0; end < s.length; end++) {
    const char = s[end];

    if (lastSeen.has(char)) {
        if(lastSeen.get(char) >= start){
            start = lastSeen.get(char) + 1;
        }
      
    }

    lastSeen.set(char, end);

    maxLen = Math.max(maxLen, end - start + 1);
  }

  return maxLen;
};

lengthOfLongestSubstring("abcabcbb");
lengthOfLongestSubstring("bbbbb");
lengthOfLongestSubstring("pwwkew");

 */
