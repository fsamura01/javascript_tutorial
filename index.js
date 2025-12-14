/**
 * Advantage Shuffle - JavaScript Implementation
 * Pattern: Greedy Algorithm with Optimal Assignment
 *
 * Strategy: For each value in nums2, assign the smallest value from nums1
 * that can beat it. If no value can beat it, assign the smallest remaining value.
 */

function advantageCount(nums1, nums2) {
  const n = nums1.length;

  // Step 1: Sort nums1 to enable efficient "smallest winning value" lookup
  // This allows us to use two pointers to find optimal assignments
  nums1.sort((a, b) => a - b);

  // Step 2: Create pairs of (value, originalIndex) for nums2
  // We need to track original indices because we'll sort by value
  // but need to place results back in their original positions
  const nums2WithIndices = nums2.map((val, idx) => [val, idx]);

  // Step 3: Sort nums2 pairs in descending order by value
  // We process larger values first to ensure we save appropriate cards
  nums2WithIndices.sort((a, b) => b[0] - a[0]);

  // Step 4: Initialize result array and two pointers
  const result = new Array(n);
  let left = 0; // Points to smallest available value in nums1
  let right = n - 1; // Points to largest available value in nums1

  // Step 5: Process each value in nums2 (now in descending order)
  for (const [targetValue, originalIndex] of nums2WithIndices) {
    // Greedy choice: Can our largest remaining card beat this target?
    if (nums1[right] > targetValue) {
      // Yes! Use the largest card (it's the only one that can win)
      // Place it at the original position in nums2
      result[originalIndex] = nums1[right];
      right--; // Mark this card as used
    } else {
      // No card can beat this target, so "throw away" our smallest card
      // This preserves larger cards for winnable battles
      result[originalIndex] = nums1[left];
      left++; // Mark this card as used
    }
  }

  return result;
}

// Alternative approach using a deque-like structure for clarity
function advantageCountAlternative(nums1, nums2) {
  const n = nums1.length;
  nums1.sort((a, b) => a - b);

  // Pair each nums2 value with its index and sort by value descending
  const indexed = nums2.map((val, i) => [val, i]).sort((a, b) => b[0] - a[0]);

  const result = new Array(n);
  const available = [...nums1]; // Copy of sorted nums1

  for (const [target, idx] of indexed) {
    // Check if our best card can win
    if (available[available.length - 1] > target) {
      // Use the best winning card
      result[idx] = available.pop();
    } else {
      // Can't win, use worst card
      result[idx] = available.shift();
    }
  }

  return result;
}

// Test cases
console.log("Test 1:", advantageCount([2, 7, 11, 15], [1, 10, 4, 11]));
// Expected: [2,11,7,15]

console.log("Test 2:", advantageCount([12, 24, 8, 32], [13, 25, 32, 11]));
// Expected: [24,32,8,12]

console.log("Test 3:", advantageCount([1, 2, 3, 4], [2, 3, 4, 5]));
// Expected: Any arrangement where smaller values are "wasted" on unwinnable positions
