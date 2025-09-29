function binarySearch(nums, target) {
  if (nums === null || nums.length === 0) {
    return -1;
  }

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    // Prevent (left + right) overflow
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // Post-processing: Check if the remaining element is the target
  if (nums[left] === target) {
    return left;
  }

  return -1;
}

// Example usage:
console.log(binarySearch([4, 5, 6, 7, 8], 7)); // Output: 3
console.log(binarySearch([4, 5, 6, 7, 8], 3)); // Output: -1
