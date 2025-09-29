/* 
  The main idea behind "Remove Duplicates from Sorted Array" 
  is to iterate through a sorted array, keeping track of the 
  unique elements by only placing them in the beginning of 
  the array and moving a pointer forward whenever a duplicate 
  is encountered, effectively removing duplicates in-place 
  while maintaining the relative order of unique elements; 
  the function then returns the count of unique elements 
  present in the modified array
 */

function removeDuplicates(nums) {
  if (nums.length <= 1) {
    return nums.length;
  }

  let uniqueIndex = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[uniqueIndex - 1]) {
      nums[uniqueIndex] = nums[i];
      uniqueIndex++;
    }
  }

  return uniqueIndex;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
  // Edge case: if array is empty or has only one element
  if (nums.length <= 1) {
    return nums.length;
  }

  // Initialize the pointer for the position where we'll place the next unique element
  let insertPosition = 1;

  // Iterate through the array starting from the second element
  for (let i = 1; i < nums.length; i++) {
    // If current element is different from the previous element
    if (nums[i] !== nums[i - 1]) {
      // Place the current element at the insert position
      nums[insertPosition] = nums[i];
      // Move the insert position forward
      insertPosition++;
    }
  }

  // Return the number of unique elements
  return insertPosition;
}

// Test cases with detailed validation
function testRemoveDuplicates() {
  const testCases = [
    {
      input: [1, 1, 2],
      expectedK: 2,
      expectedNums: [1, 2],
    },
    {
      input: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
      expectedK: 5,
      expectedNums: [0, 1, 2, 3, 4],
    },
    {
      input: [1],
      expectedK: 1,
      expectedNums: [1],
    },
    {
      input: [1, 2, 3],
      expectedK: 3,
      expectedNums: [1, 2, 3],
    },
  ];

  for (let i = 0; i < testCases.length; i++) {
    const { input, expectedK, expectedNums } = testCases[i];
    console.log(`\nTest Case ${i + 1}:`);
    console.log("Input:", input);

    // Create a copy of input for testing
    const nums = [...input];
    const k = removeDuplicates(nums);

    console.log("Output:", k);
    console.log("Modified array (first k elements):", nums.slice(0, k));

    // Verify the result
    if (
      k === expectedK &&
      nums.slice(0, k).every((num, index) => num === expectedNums[index])
    ) {
      console.log("✓ Test passed");
    } else {
      console.log("✗ Test failed");
      console.log("Expected k:", expectedK);
      console.log("Expected first k elements:", expectedNums);
    }
  }
}

// Run the tests
testRemoveDuplicates();

function removeDuplicates(nums) {
  // Edge case: if the array is empty, return 0
  if (nums.length === 0) return 0;

  // k is the index where the next unique element should go
  let k = 1;

  // Traverse the array starting from the second element
  for (let i = 1; i < nums.length; i++) {
    // If the current element is different from the last unique element
    if (nums[i] !== nums[k - 1]) {
      // Place it at the k-th position
      nums[k] = nums[i];
      // Move the k pointer to the next position
      k++;
    }
  }

  // The array now has the unique elements in the first k positions
  return k;
}

var removeDuplicates = function (nums, val) {
  if (nums.length <= 1) {
    return nums.length;
  }

  let k = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    nums[k] = nums[i];
    k++;
  }

  return k;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[slow] !== nums[fast]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1;
};
