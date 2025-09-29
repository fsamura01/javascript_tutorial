/**
 * Finds the duplicate number in an array using Floyd's Cycle Detection
 * @param {number[]} nums - Array of numbers containing one duplicate
 * @return {number} - The duplicate number without modifying the input array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findDuplicate(nums) {
  // Phase 1: Finding the intersection point of the two pointers
  let tortoise = nums[0];
  let hare = nums[0];

  do {
    tortoise = nums[tortoise];
    hare = nums[nums[hare]];
  } while (tortoise !== hare);

  // Phase 2: Finding the entrance to the cycle
  tortoise = nums[0];
  while (tortoise !== hare) {
    tortoise = nums[tortoise];
    hare = nums[hare];
  }

  return hare;
}

// Test cases
console.log(findDuplicate([1, 3, 4, 2, 2])); // Output: 2
console.log(findDuplicate([3, 1, 3, 4, 2])); // Output: 3
console.log(findDuplicate([3, 3, 3, 3, 3])); // Output: 3

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let slow = 0;
  let fast = 0;

  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];
    if (slow === fast) {
      break;
    }
  }

  let finder = 0;
  while (true) {
    slow = nums[slow];
    finder = nums[finder];
    if (slow === finder) {
      return slow;
    }
  }
};
