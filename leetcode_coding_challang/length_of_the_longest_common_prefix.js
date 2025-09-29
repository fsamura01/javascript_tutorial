/* 3043. Find the Length of the Longest Common Prefix
 */
function longestCommonPrefix(arr1, arr2) {
  const prefixSet = new Set();

  // Populate the prefix set for arr1
  for (const num of arr1) {
    let prefix = "";
    for (const digit of num.toString()) {
      prefix += digit;
      prefixSet.add(prefix);
    }
  }

  // Find the longest common prefix for each number in arr2
  let maxLength = 0;
  for (const num of arr2) {
    let prefix = "";
    for (const digit of num.toString()) {
      prefix += digit;
      if (prefixSet.has(prefix)) {
        maxLength = Math.max(maxLength, prefix.length);
      } else {
        break;
      }
    }
  }

  return maxLength;
}
longestCommonPrefix([1, 10, 100], [1000]);
longestCommonPrefix([1, 2, 3], [4, 4, 4]);
