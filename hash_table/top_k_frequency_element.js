/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  // Step 1: Create a frequency map
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Step 2: Create a bucket array where index represents frequency
  const bucket = Array(nums.length + 1)
    .fill()
    .map(() => []);
  for (const [num, freq] of freqMap) {
    bucket[freq].push(num);
  }

  // Step 3: Collect k most frequent elements
  const result = [];
  for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
    if (bucket[i].length > 0) {
      result.push(...bucket[i]);
    }

    return result.slice(0, k);
  }
}

// Test cases
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1,2]
console.log(topKFrequent([1], 1)); // [1]

/* 
var topKFrequent = function (nums, k) {
  const frequentMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    frequentMap.set(nums[i], (frequentMap.get(nums[i]) || 0) + 1);
  }

  const bucket = new Array(nums.length + 1).fill().map(() => []);
  for (const [num, frequent] of frequentMap) {
    bucket[frequent].push(num);
  }

  const result = [];
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (result.length < k) {
      if (bucket[i].length > 0) {
        result.push(...bucket[i]);
      }
    }
  }

  return result.slice(0, k);
}; */

/* var topKFrequent = function (nums, k) {
  const frequentMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    frequentMap.set(nums[i], (frequentMap.get(nums[i]) || 0) + 1);
  }

  const bucket = new Array(nums.length + 1).fill().map(() => []);
  for (const [num, frequent] of frequentMap) {
    bucket[frequent].push(num);
  }

  const result = [];
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (result.length < k && bucket[i].length > 0) {
      result.push(...bucket[i]);
    }
  }

  return result.slice(0, k);
}; */
