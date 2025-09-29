/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  // Step 1: Create a Set from nums1 for efficient lookup
  const set1 = new Set(nums1);

  // Step 2: Create a Set to store the intersection
  const intersectionSet = new Set();

  // Step 3: Iterate through nums2
  for (let num of nums2) {
    // If the number is in set1, add it to the intersection
    if (set1.has(num)) {
      intersectionSet.add(num);
    }
  }

  // Step 4: Convert the intersection Set to an array and return
  return Array.from(intersectionSet);
};

// Test cases
console.log(intersection([1, 2, 2, 1], [2, 2])); // [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [4,9] or [9,4]

/**
 * @param {number[]} nums
 * @return {number}
 */
var intersection = function (nums1, nums2) {
  let result = [];
  const set_1 = new Set(nums1);
  const set_2 = new Set(nums2);
  for (let num of set_1) {
    if (set_2.has(num)) {
      result.push(num);
    }
  }

  return result;
};
// Test cases
intersection([1, 2, 2, 1], [2, 2]);
intersection([4, 9, 5], [9, 4, 9, 8, 4]);
