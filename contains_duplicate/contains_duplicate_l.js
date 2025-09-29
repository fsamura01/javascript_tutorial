/*217. Contains Duplicate*/
var containsDuplicate = function (nums) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true;
    } else {
      set.add(nums[i]);
    }
  }

  return false;
};

/*
  function containsDuplicate(nums) {
    const seen = new Set();  // Step 1: Create an empty set
    
    for (let num of nums) {  // Step 2: Iterate through each element in nums
        if (seen.has(num)) {  // Step 2a: Check if the element is already in the set
            return true;  // Return true if a duplicate is found
        }
        seen.add(num);  // Step 2b: Add the element to the set if it's not a duplicate
    }
    
    return false;  // Step 3: If no duplicates are found, return false
}
*/

/*var containsDuplicate = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
};*/

/*var containsDuplicate = function (nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
};*/
