// LeetCode 522: Longest Uncommon Subsequence II
// Time: O(n^2 * m), Space: O(1)

function findLUSlength(strs) {
  // Helper function to check if s1 is a subsequence of s2
  function isSubsequence(s1, s2) {
    if (s1.length > s2.length) return false;

    let i = 0; // pointer for s1
    let j = 0; // pointer for s2

    while (i < s1.length && j < s2.length) {
      if (s1[i] === s2[j]) {
        i++;
      }
      j++;
    }

    return i === s1.length;
  }

  // Sort strings by length in descending order
  // This ensures we check longer potential candidates first
  strs.sort((a, b) => b.length - a.length);

  // Check each string as a potential uncommon subsequence
  for (let i = 0; i < strs.length; i++) {
    let isUncommon = true;

    // Check if current string is a subsequence of any other string
    for (let j = 0; j < strs.length; j++) {
      if (i !== j && isSubsequence(strs[i], strs[j])) {
        isUncommon = false;
        break;
      }
    }

    // If it's not a subsequence of any other string, it's uncommon
    if (isUncommon) {
      return strs[i].length;
    }
  }

  return -1; // No uncommon subsequence found
}

// Test cases
console.log(findLUSlength(["aba", "cdc", "eae"])); // Output: 3
console.log(findLUSlength(["aaa", "aaa", "aa"])); // Output: -1
console.log(findLUSlength(["abc", "def"])); // Output: 3
