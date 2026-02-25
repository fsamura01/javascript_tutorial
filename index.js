/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var numTriplets = function (nums1, nums2) {
  /* Type 1
  step1: for each value in nuns1, compute it square (target)
  step2: count how many paire in nums2 whose product = target */
  /* Type 2
  step1: for each value in nums2, compute it square (target)
  step2: count how many paire in nums1 whose product = target */

  return countTriplets(nums1, nums2) + countTriplets(nums2, nums1);
};

function countTriplets(A, B) {
  // Create a freqmap for B
  const freqMap = new Map();

  for (const val of B) {
    freqMap.set(val, (freqMap.get(val) || 0) + 1);
  }

  let count = 0;
  for (const val of A) {
    const target = val * val;

    for (const [x, freqX] of freqMap) {
      if (target % x !== 0) continue;

      let complement = target / x;

      if (!freqMap.get(complement)) continue;

      if (x > complement) continue;

      if (x === complement) {
        count += (freqX * (freqX - 1)) / 2;
      } else {
        count += freqX * freqMap.get(complement);
      }
    }
  }
  return count;
}

numTriplets([7, 4], [5, 2, 8, 9, 7]);
