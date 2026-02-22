/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var numTriplets = function (nums1, nums2) {
  return countTriplets(nums1, nums2) + countTriplets(nums2, nums1);
};

/**
 * Counts triplets where A[i]^2 == B[j] * B[k], j < k
 */
function countTriplets(A, B) {
  // Step 1: Build frequency map for array B
  const freqMap = new Map();
  for (const num of B) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  let count = 0;

  // Step 2: For each element in A, find valid pairs in B
  for (const val of A) {
    const target = val * val; // Use BigInt if needed, but JS handles this fine here

    // Step 3: Check each unique value in B
    for (const [x, freqX] of freqMap) {
      // x must divide target evenly
      if (target % x !== 0) continue;

      const complement = target / x;

      // Only process x <= complement to avoid double-counting pairs
      if (x > complement) continue;

      if (!freqMap.has(complement)) continue;

      const freqC = freqMap.get(complement);

      if (x === complement) {
        // Pairs within the same value group: C(freqX, 2)
        count += (freqX * (freqX - 1)) / 2;
      } else {
        // x < complement: multiply their frequencies
        count += freqX * freqC;
      }
    }
  }

  return count;
}
