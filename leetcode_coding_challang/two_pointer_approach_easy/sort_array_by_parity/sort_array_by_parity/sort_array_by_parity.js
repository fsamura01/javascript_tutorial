/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArrayByParity(nums) {
  // Edge case: if array has 0 or 1 elements, return as is
  if (nums.length <= 1) return nums;

  // Initialize two pointers
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    // Find first odd number from left
    while (left < right && nums[left] % 2 === 0) {
      left++;
    }

    // Find first even number from right
    while (left < right && nums[right] % 2 === 1) {
      right--;
    }

    // If pointers haven't crossed, swap elements
    if (left < right) {
      // Swap using destructuring assignment
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
  }

  return nums;
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  let evenIntegers = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      [nums[evenIntegers], nums[i]] = [nums[i], nums[evenIntegers]];
      evenIntegers++;
    }
  }

  return nums;
};

function sortArrayByParity(nums) {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    // Move left forward if it's already even
    while (left < right && nums[left] % 2 === 0) {
      left++;
    }
    // Move right backward if it's already odd
    while (left < right && nums[right] % 2 === 1) {
      right--;
    }
    // Swap the misplaced odd and even numbers
    if (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
  }

  return nums;
}
