/**
 * Pancake Sorting Solution
 * @param {number[]} arr - Array to sort
 * @return {number[]} - Array of k values for pancake flips
 */
var pancakeSort = function (arr) {
  const result = [];
  const n = arr.length;

  // Work backwards from the end of array
  for (let currentSize = n; currentSize > 1; currentSize--) {
    // Find the index of maximum element in arr[0...currentSize-1]
    let maxIndex = findMaxIndex(arr, currentSize);

    // If max is already at the end of current range, skip
    if (maxIndex === currentSize - 1) {
      continue;
    }

    // Step 1: If max is not at position 0, flip it to position 0
    if (maxIndex !== 0) {
      flip(arr, maxIndex + 1); // k = maxIndex + 1 (1-indexed)
      result.push(maxIndex + 1);
    }

    // Step 2: Flip to move max from position 0 to end of current range
    flip(arr, currentSize); // k = currentSize (1-indexed)
    result.push(currentSize);
  }

  return result;
};

/**
 * Find index of maximum element in arr[0...size-1]
 * @param {number[]} arr - The array
 * @param {number} size - Search range size
 * @return {number} - Index of maximum element
 */
function findMaxIndex(arr, size) {
  let maxIndex = 0;
  for (let i = 1; i < size; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}

/**
 * Reverse arr[0...k-1] (pancake flip operation)
 * @param {number[]} arr - The array to flip
 * @param {number} k - Flip size (1-indexed, as per problem)
 */
function flip(arr, k) {
  let left = 0;
  let right = k - 1; // Convert to 0-indexed

  while (left < right) {
    // Swap elements
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

// Test cases
console.log(pancakeSort([3, 2, 4, 1])); // Possible output: [3, 4, 2, 3, 2]
console.log(pancakeSort([1, 2, 3])); // Output: []
