var intersect = function (nums1, nums2) {
  let hasMap = {};
  let result = [];

  for (let i = 0; i < nums1.length; i++) {
    if (hasMap.hasOwnProperty(nums1[i])) {
      hasMap[nums1[i]] += 1;
    } else {
      hasMap[nums1[i]] = 1;
    }
  }

  for (let i = 0; i < nums2.length; i++) {
    if (hasMap[nums2[i]] > 0) {
      result.push(nums2[i]);
      hasMap[nums2[i]] -= 1;
    }
  }

  return result;
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersect(nums1, nums2) {
  // Step 1: Create a hash map to store the count of numbers in nums1
  const countMap = {};
  for (const num of nums1) {
    countMap[num] = (countMap[num] || 0) + 1;
  }

  // Step 2: Create an array to store the intersection
  const result = [];

  // Step 3: Iterate through nums2 and check against the hash map
  for (const num of nums2) {
    if (countMap[num] > 0) {
      result.push(num);
      countMap[num]--;
    }
  }

  // Step 4: Return the intersection array
  return result;
}

// Test cases
console.log(intersect([1, 2, 2, 1], [2, 2])); // Output: [2,2]
console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4])); // Output: [4,9]
