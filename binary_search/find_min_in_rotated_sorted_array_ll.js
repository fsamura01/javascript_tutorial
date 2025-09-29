function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      // Minimum is in the right half
      left = mid + 1;
    } else if (nums[mid] < nums[right]) {
      // Minimum is in the left half, including mid
      right = mid;
    } else {
      // nums[mid] == nums[right], can't determine the side, reduce the search space
      right--;
    }
  }

  return nums[left];
}

// Example usage:
console.log(findMin([1, 3, 5])); // Output: 1
console.log(findMin([2, 2, 2, 0, 1])); // Output: 0

var findMin = function (nums) {
  let set = new Set(nums);
  const nums1 = Array.from(set);

  let left = 0;
  let right = nums1.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums1[mid] > nums1[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums1[left];
};

// Example usage:
const nums = [1, 3, 5];
findMin(nums);
