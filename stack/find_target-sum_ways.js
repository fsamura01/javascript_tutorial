var findTargetSumWays = function (nums, target) {
  const memo = new Map();

  const dfs = (index, sum) => {
    if (memo.has(index + "," + sum)) {
      return memo.get(index + "," + sum);
    }

    if (index === nums.length) {
      return sum === target ? 1 : 0;
    }

    let add = dfs(index + 1, sum + nums[index]);
    let subtract = dfs(index + 1, sum - nums[index]);

    memo.set(index + "," + sum, add + subtract);

    return add + subtract;
  };

  return dfs(0, 0);
};
const input = [1, 1, 1, 1, 1];
const target = 3;

const numberOfWay = findTargetSumWays(input, target);
console.log("🚀 ~ numberOfWay:", numberOfWay);
