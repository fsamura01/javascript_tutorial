const removeElement = (nums, val) => {
  /*  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      result.push(nums[i]);
    }
  }
  return result; */

  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
};

const nums = [3, 2, 2, 3];
const val = 3;

removeElement(nums, val);
console.log("🚀 ~ removeElement(nums, val):", removeElement(nums, val));
