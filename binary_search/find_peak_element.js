function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      right = mid; // Peak is on the left side (including mid)
    } else {
      left = mid + 1; // Peak is on the right side (excluding mid)
    }
  }

  return left; // or return right, since left == right
}

// Example usage:
console.log(findPeakElement([1, 2, 3, 1])); // Output: 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // Output: 5 or 1
