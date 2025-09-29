function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Target not found
}

// Example usage:
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9)); // Output: 4
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 2)); // Output: -1
