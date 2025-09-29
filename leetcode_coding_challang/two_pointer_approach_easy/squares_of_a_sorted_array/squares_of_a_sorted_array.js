function sortedSquares(nums) {
  // Create result array of same length as input
  const result = new Array(nums.length);

  // Initialize two pointers
  let left = 0;
  let right = nums.length - 1;

  // Fill result array from right to left (largest to smallest)
  for (let i = nums.length - 1; i >= 0; i--) {
    // Square numbers at both pointers
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    // Compare squares and place larger one in result
    if (leftSquare > rightSquare) {
      result[i] = leftSquare;
      left++;
    } else {
      result[i] = rightSquare;
      right--;
    }
  }

  return result;
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  let index = nums.length - 1;
  const squares = [];

  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];
    if (leftSquare > rightSquare) {
      squares[index] = leftSquare;
      left++;
    } else {
      squares[index] = rightSquare;
      right--;
    }

    index--;
  }

  return squares;
};
