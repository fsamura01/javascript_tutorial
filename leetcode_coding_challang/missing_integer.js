/* 2996. Smallest Missing Integer Greater Than Sequential Prefix Sum */
function smallestMissingInteger(nums) {
  // Step 1: Find the longest sequential prefix
  let prefixSum = nums[0];
  let i = 1;

  while (i < nums.length && nums[i] === nums[i - 1] + 1) {
    prefixSum += nums[i];
    i++;
  }

  // Step 2: Prepare for checking the smallest missing integer
  // We use a set for constant time lookup to check if a number exists in nums
  const numSet = new Set(nums);

  // Step 3: Find the smallest missing integer greater than or equal to the prefix sum
  let missingInteger = prefixSum;
  while (numSet.has(missingInteger)) {
    missingInteger++;
  }

  return missingInteger;
}

smallestMissingInteger([1, 2, 3, 2, 5]);
smallestMissingInteger([3, 4, 5, 1, 12, 14, 13]);
smallestMissingInteger([3, 4, 5, 1, 12, 14, 13]);
