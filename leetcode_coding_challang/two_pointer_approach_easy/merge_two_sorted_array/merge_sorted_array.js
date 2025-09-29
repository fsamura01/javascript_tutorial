/* # Merge Sorted Array - Two - Pointer Solution

## Solution Approaches

### 1. Reverse Two-Pointer Approach */

function merge(nums1, m, nums2, n) {
  // Start from the end of the array
  let p1 = m - 1; // Last element in nums1
  let p2 = n - 1; // Last element in nums2
  let p = m + n - 1; // Last position in merged array

  // Merge from the end
  while (p2 >= 0) {
    // Compare and place larger element at the end
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }
}

// Test cases
const nums1 = [1, 2, 3, 0, 0, 0];
merge(nums1, 3, [2, 5, 6], 3);
console.log(nums1); // [1,2,2,3,5,6]

/* ### 2. Detailed Implementation with Logging */

function mergeWithLogging(nums1, m, nums2, n) {
  // Pointers for tracking
  let p1 = m - 1; // Last index of nums1 original elements
  let p2 = n - 1; // Last index of nums2
  let p = m + n - 1; // Last index of merged array

  console.log("Initial State:");
  console.log("nums1:", nums1);
  console.log("nums2:", nums2);
  console.log(`m: ${m}, n: ${n}`);

  // Merge from the end
  while (p2 >= 0) {
    console.log(`\nCurrent Iteration:`);
    console.log(`p1: ${p1}, p2: ${p2}, p: ${p}`);

    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      console.log(`Placing nums1[${p1}]: ${nums1[p1]}`);
      nums1[p] = nums1[p1];
      p1--;
    } else {
      console.log(`Placing nums2[${p2}]: ${nums2[p2]}`);
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;

    console.log("Current nums1:", nums1);
  }
}

/* 
## Complexity Analysis

### Time Complexity: O(m + n)
- Single pass through both arrays
- Merging happens in-place from the end
- Each element processed once

### Space Complexity: O(1)
- No additional array created
- In-place modification of nums1
- Constant extra space used

## Two-Pointer Technique Breakdown

### Pointer Mechanics
1. `p1`: Tracks original nums1 elements
2. `p2`: Tracks nums2 elements
3. `p`: Final merged array position

### Key Algorithm Steps
1. Start from the end of the arrays
2. Compare elements from both arrays
3. Place larger element at the end of nums1
4. Move pointers accordingly

## Visual Representation
```
Initial: 
nums1 = [1, 2, 3, 0, 0, 0]
nums2 = [2, 5, 6]
m = 3, n = 3

Merge Process:
1. Compare last elements
2. Place largest at the end
3. Move pointers

Final: 
[1, 2, 2, 3, 5, 6]
```
*/

/* ## Edge Case Handling */
function mergeSafe(nums1, m, nums2, n) {
  // Handle empty arrays
  if (n === 0) return;
  if (m === 0) {
    // Copy entire nums2 to nums1
    for (let i = 0; i < n; i++) {
      nums1[i] = nums2[i];
    }
    return;
  }

  // Standard merge logic
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }
}

/* 
## Follow-up Optimization Techniques
### 1. Early Termination 
*/

function mergeOptimized(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  // Early termination conditions
  while (p2 >= 0) {
    nums1[p--] = p1 >= 0 && nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--];
  }
}

/* 
## Follow-up Questions
### 1. What if nums1 is sorted in descending order?
### 2. What if nums2 is sorted in descending order?

## Best Practices
1. In-place modification
2. Merge from the end
3. Handle edge cases
4. Minimize extra space
5. Single-pass solution

## Interview Tips
- Explain reverse two-pointer approach
- Discuss time and space complexity
- Show understanding of in-place modifications
- Demonstrate edge case handling

The solution leverages the two-pointer technique by:
- Using multiple pointers to track array positions
- Moving pointers strategically
- Merging in-place from the end of the array
*/
