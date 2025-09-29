function moveZeroes(nums) {
  let lastNonZeroIndex = 0;

  // Iterate over the array
  for (let i = 0; i < nums.length; i++) {
    // If the current element is non-zero, swap it with the element at lastNonZeroIndex
    if (nums[i] !== 0) {
      // Swap only if i and lastNonZeroIndex are different
      if (i !== lastNonZeroIndex) {
        [nums[lastNonZeroIndex], nums[i]] = [nums[i], nums[lastNonZeroIndex]];
      }
      lastNonZeroIndex++; // Move the index forward
    }
  }
}
