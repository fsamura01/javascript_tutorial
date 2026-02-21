// Check all possible subarrays - O(n³)
// Only for understanding, not recommended
var findLengthOfShortestSubarray_BruteForce = function (arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
    }
    console.log("🚀 ~ i:", "false");
  }

  console.log("🚀 ~ i:", "true");
};

const result = findLengthOfShortestSubarray_BruteForce([5, 4, 3, 2, 1]);
console.log("🚀 ~ result:", result);
