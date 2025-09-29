function searchRange(nums, target) {
  function findLeft(nums, target) {
    let left = 0,
      right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return left;
  }

  function findRight(nums, target) {
    let left = 0,
      right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] <= target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return right;
  }

  const leftIndex = findLeft(nums, target);
  const rightIndex = findRight(nums, target);

  // Ensure the target exists within the found range
  if (
    leftIndex <= rightIndex &&
    rightIndex < nums.length &&
    nums[leftIndex] == target &&
    nums[rightIndex] == target
  ) {
    return [leftIndex, rightIndex];
  }

  return [-1, -1];
}

// Example usage:
console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // Output: [3, 4]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)); // Output: [-1, -1]
console.log(searchRange([], 0)); // Output: [-1, -1]
