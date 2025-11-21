<<<<<<< HEAD
const crypto = require("crypto");
/**
 * @param {string} s
 * @return {number[]}
 */
var countSubstrings = function (s) {
  if (s.length === 1) return s.length;

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    result += expandAroundCenter(s, i, i);
    result += expandAroundCenter(s, i, i + 1);
=======
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
>>>>>>> bf6ca1a (Added 809. Expressive Words)
  }
  return count;
}

const nums = [16, 69, 88, 85, 79, 87, 37, 33, 39, 34];
const left = 55;
const right = 57;

<<<<<<< HEAD
function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }

  return right - left - 1;
}

countSubstrings("abc");
countSubstrings("aaa");
=======
numSubarrayBoundedMax(nums, left, right);
>>>>>>> bf6ca1a (Added 809. Expressive Words)
