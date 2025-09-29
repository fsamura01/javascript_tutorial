/**
 * @param {number[]} nums
 * @return {number[]}
 */
function applyOperations(nums) {
  const n = nums.length;

  // Step 1: Apply operations sequentially
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      // Multiply current element by 2
      nums[i] *= 2;
      // Set next element to 0
      nums[i + 1] = 0;
    }
  }

  // Step 2: Shift non-zero elements
  let writePointer = 0;

  // Move all non-zero elements to the front
  for (let readPointer = 0; readPointer < n; readPointer++) {
    if (nums[readPointer] !== 0) {
      nums[writePointer] = nums[readPointer];
      writePointer++;
    }
  }

  // Fill the remaining elements with 0
  while (writePointer < n) {
    nums[writePointer] = 0;
    writePointer++;
  }

  return nums;
}

/**
 * Applies operations to an array and shifts zeros to the end.
 * @param {number[]} nums - The input array of integers.
 * @return {number[]} The resulting array after applying operations.
 */
function applyOperations(nums) {
  // Step 1: Apply the operation for adjacent elements
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] *= 2; // Double the current element
      nums[i + 1] = 0; // Set the next element to 0
    }
  }

  // Step 2: Shift all zeros to the end
  let nonZeroIndex = 0; // Pointer for placing non-zero elements
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nonZeroIndex] = nums[i]; // Move non-zero element to the correct position
      nonZeroIndex++;
    }
  }

  // Fill the rest of the array with zeros
  for (let i = nonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
}

// Example usage:
console.log(applyOperations([1, 2, 2, 1, 1, 0])); // Output: [1, 4, 2, 0, 0, 0]
console.log(applyOperations([0, 1])); // Output: [1, 0]
