/**
 * Solution 1: Using Set (Most Recommended)
 * Time Complexity: O(n + m)
 * Space Complexity: O(min(n, m))
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  // Convert nums1 to a set for O(1) lookup
  const set1 = new Set(nums1);

  // Use another set to store unique intersections
  const intersectionSet = new Set();

  // Iterate through nums2 and check against set1
  for (const num of nums2) {
    if (set1.has(num)) {
      intersectionSet.add(num);
    }
  }

  // Convert set back to array
  return Array.from(intersectionSet);
};

/**
 * Solution 2: Sorting and Two Pointers
 * Time Complexity: O(n log n + m log m)
 * Space Complexity: O(min(n, m)) for the result array
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersectionSorted = function (nums1, nums2) {
  // Sort both arrays
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  const result = [];
  let i = 0,
    j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      i++;
    } else if (nums1[i] > nums2[j]) {
      j++;
    } else {
      // Found intersection
      if (result.length === 0 || result[result.length - 1] !== nums1[i]) {
        result.push(nums1[i]);
      }
      i++;
      j++;
    }
  }

  return result;
};

/**
 * Solution 3: Brute Force (Not Recommended)
 * Time Complexity: O(n * m)
 * Space Complexity: O(min(n, m))
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersectionBruteForce = function (nums1, nums2) {
  const result = [];

  for (const num of nums1) {
    // Check if num exists in nums2 and not already in result
    if (nums2.includes(num) && !result.includes(num)) {
      result.push(num);
    }
  }

  return result;
};

// Test cases
console.log(intersection([1, 2, 2, 1], [2, 2])); // [2]
console.log(intersectionSorted([4, 9, 5], [9, 4, 9, 8, 4])); // [4,9]
console.log(intersectionBruteForce([1, 2, 2, 1], [2, 2])); // [2]

/**
 * Patterns and Insights:
 * 1. Constraint of unique elements suggests using Set
 * 2. Range of values (0-1000) makes Set approach very efficient
 * 3. Multiple approaches trade-off between time and space complexity
 *
 * Best Approach: Solution 1 (Set-based)
 * - O(n + m) time complexity
 * - O(min(n, m)) space complexity
 * - Handles unique elements requirement naturally
 */
