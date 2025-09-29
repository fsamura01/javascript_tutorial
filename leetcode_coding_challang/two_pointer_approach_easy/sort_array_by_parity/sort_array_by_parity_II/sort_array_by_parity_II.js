/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArrayByParityII(nums) {
  // Initialize two pointers
  let evenPtr = 0; // Points to even indices (0, 2, 4...)
  let oddPtr = 1; // Points to odd indices (1, 3, 5...)
  const n = nums.length;

  // Continue until we reach the end with either pointer
  while (evenPtr < n && oddPtr < n) {
    // If even number is at even index, move to next even index
    if (nums[evenPtr] % 2 === 0) {
      evenPtr += 2;
      continue;
    }

    // If odd number is at odd index, move to next odd index
    if (nums[oddPtr] % 2 === 1) {
      oddPtr += 2;
      continue;
    }

    // At this point, we have:
    // - An odd number at an even index (evenPtr)
    // - An even number at an odd index (oddPtr)
    // So we swap them
    [nums[evenPtr], nums[oddPtr]] = [nums[oddPtr], nums[evenPtr]];

    // Move both pointers to next positions
    evenPtr += 2;
    oddPtr += 2;
  }

  return nums;
}

var sortArrayByParityII = function (nums) {
  let i = 0; // Even index pointer
  let j = 1; // Odd index pointer
  let n = nums.length;

  while (i < n && j < n) {
    // Find misplaced numbers
    while (i < n && nums[i] % 2 === 0) i += 2; // Find an odd number at even index
    while (j < n && nums[j] % 2 === 1) j += 2; // Find an even number at odd index

    // Swap to correct positions
    if (i < n && j < n) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }

  return nums;
};

var sortArrayByParityII = function (nums) {
  let evens = [];
  let odds = [];
  let res = [];

  for (let num of nums) {
    if (num % 2 === 0) evens.push(num);
    else odds.push(num);
  }

  for (let i = 0; i < nums.length / 2; i++) {
    res.push(evens[i]);
    res.push(odds[i]);
  }

  return res;
};
