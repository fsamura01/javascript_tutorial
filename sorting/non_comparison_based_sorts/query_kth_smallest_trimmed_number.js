function queryKthSmallestTrimmedNumber(nums, queries) {
  let result = [];

  for (let [k, trim] of queries) {
    // Step 1: Trim the strings to the last `trim` digits
    let trimmed = nums.map((num, index) => ({
      trimmedNum: num.slice(-trim),
      index: index,
    }));

    // Step 2: Sort the trimmed numbers lexicographically
    trimmed.sort((a, b) => {
      if (a.trimmedNum === b.trimmedNum) {
        return a.index - b.index;
      } else {
        return a.trimmedNum.localeCompare(b.trimmedNum);
      }
    });

    // Step 3: Get the index of the k-th smallest trimmed number
    result.push(trimmed[k - 1].index);
  }

  return result;
}

// Example usage:
const nums = ["102", "473", "251", "814"];
const queries = [
  [1, 1],
  [2, 3],
  [4, 2],
  [1, 2],
];
console.log(queryKthSmallestTrimmedNumber(nums, queries)); // Output: [2, 2, 1, 0]

const nums2 = ["24", "37", "96", "04"];
const queries2 = [
  [2, 1],
  [2, 2],
];
console.log(queryKthSmallestTrimmedNumber(nums2, queries2)); // Output: [3, 0]
