const maxCountSecutiveOne = (arr) => {
  let maxCount = 0;
  let currentCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      currentCount++;
      maxCount = Math.max(maxCount, currentCount);
    } else {
      currentCount = 0;
    }
  }
  return maxCount;
};
const nums = [1, 0, 1, 1, 0, 1];
maxCountSecutiveOne(nums);
console.log("🚀 ~ maxCountSecutiveOne(nums):", maxCountSecutiveOne(nums));

Input: (target = 7), (nums = [2, 3, 1, 2, 4, 3]);
Output: 2;
