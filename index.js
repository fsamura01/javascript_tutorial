/**
 * JavaScript Implementation using QuickSelect
 * Time: O(n) average, O(n²) worst, Space: O(1)
 */
var findKthLargest = function (nums, k) {
  // Convert to finding (n-k)th smallest (0-indexed)
  const targetIndex = nums.length - k;

  const quickSelect = (left, right) => {
    // Choose random pivot to avoid worst case
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const pivot = nums[pivotIndex];

    // Move pivot to end
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];

    // Partition: elements < pivot go to left
    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (nums[i] < pivot) {
        [nums[i], nums[storeIndex]] = [nums[storeIndex], nums[i]];
        storeIndex++;
      }
    }

    // Move pivot to its final position
    [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];

    // Check if we found the target
    if (storeIndex === targetIndex) {
      return nums[storeIndex];
    } else if (storeIndex < targetIndex) {
      // Target is in right partition
      return quickSelect(storeIndex + 1, right);
    } else {
      // Target is in left partition
      return quickSelect(left, storeIndex - 1);
    }
  };

  return quickSelect(0, nums.length - 1);
};

// Example usage:
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // Output: 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // Output: 4
