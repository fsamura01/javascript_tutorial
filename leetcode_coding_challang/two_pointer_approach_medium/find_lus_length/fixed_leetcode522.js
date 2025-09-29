/**
 * @param {string[]} strs
 * @return {number}
 */
const findLUSlength = function (strs) {
  // Helper function to check if string b is a subsequence of string a
  const isSubsequence = (a, b) => {
    let i = 0; // Pointer for string a
    let j = 0; // Pointer for string b

    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) {
        j++;
      }
      i++;
    }

    return j === b.length;
  };

  // Use a Map to count frequencies
  const freqMap = new Map();
  for (const str of strs) {
    freqMap.set(str, (freqMap.get(str) || 0) + 1);
  }

  // Sort strings by length in descending order
  strs.sort((a, b) => b.length - a.length);

  for (let i = 0; i < strs.length; i++) {
    const str1 = strs[i];

    // Skip if string is a duplicate
    if (freqMap.get(str1) > 1) {
      continue;
    }

    let isUnique = true;
    for (let j = 0; j < strs.length; j++) {
      if (i === j) {
        continue;
      }
      const str2 = strs[j];
      // FIX: Check if str1 is a subsequence of str2
      if (isSubsequence(str2, str1)) {
        isUnique = false;
        break;
      }
    }

    if (isUnique) {
      return str1.length;
    }
  }

  return -1;
};

// Test cases
console.log("Test 1:", findLUSlength(["aba", "cdc", "eae"])); // Expected: 3
console.log("Test 2:", findLUSlength(["aaa", "aaa", "aa"])); // Expected: -1
console.log("Test 3:", findLUSlength(["abc", "def", "abc"])); // Expected: 3