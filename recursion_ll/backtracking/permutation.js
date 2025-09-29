var permute = function (nums) {
  const results = [];

  const backtrack = (nums, permutation) => {
    if (permutation.length === nums.length) {
      results.push([...permutation]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (permutation.includes(nums[i])) {
        continue;
      }
      permutation.push(nums[i]);
      backtrack(permutation);
      permutation.pop();
    }

    return;
  };

  backtrack(nums, []);
  return results;
};
const nums = [1, 2, 3];

permute(nums);
console.log("🚀 ~ permute(nums):", permute(nums));
