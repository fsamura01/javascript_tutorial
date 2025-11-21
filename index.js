function numSubarrayBoundedMax(nums, left, right) {
  const n = nums.length;
  let lastValidIndex = -1;
  let lastBlockerIndex = -1;
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (nums[i] > right) {
      lastBlockerIndex = i;
    } else if (nums[i] >= left) {
      count += i - lastBlockerIndex;
      lastValidIndex = i;
    } else {
      if (lastValidIndex > lastBlockerIndex) {
        count += lastValidIndex - lastBlockerIndex;
      }
    }
  }
  return count;
}

const nums = [16, 69, 88, 85, 79, 87, 37, 33, 39, 34];
const left = 55;
const right = 57;

numSubarrayBoundedMax(nums, left, right);
