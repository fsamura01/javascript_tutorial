# **189. Rotate Array**

Let's solve the "Rotate Array" problem step by step, diving deep into the problem-solving approach and algorithmic thinking.

## **1. Problem Understanding**

The problem asks us to rotate an array to the right by a given number of steps. In the first example:

- Input array is [1,2,3,4,5,6,7]
- k = 3 (number of rotation steps)
- Output will be [5,6,7,1,2,3,4]

This means we're essentially moving the last k elements to the front of the array while maintaining their relative order.

## **2. Constraints Analysis**

Let's break down the key constraints:

- Array length: 1 ≤ nums.length ≤ 10^5
- Element range: -2^31 ≤ nums[i] ≤ 2^31 - 1
- Rotation steps: 0 ≤ k ≤ 10^5

Important considerations:

- k might be larger than the array length
- We need to handle k efficiently
- The solution should ideally use O(1) extra space

## **3. Problem Breakdown**

We can break this problem down into several key steps:

1. Handle edge cases (empty array, k = 0)
2. Normalize k (k = k % array.length)
3. Rotate the array efficiently

## **4. Pattern Identification**

This problem involves array manipulation and can be solved using several patterns:

- In-place reversal technique
- Cyclic replacement
- Extra array allocation (less optimal)

## **5. Approach Discussion**

Let's explore an optimal in-place solution using the reversal technique:

1. Normalize k by taking k % array.length
2. Reverse the entire array
3. Reverse the first k elements
4. Reverse the remaining (n-k) elements

## **6. Code Implementation**

Let's implement this approach in JavaScript:

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    // Normalize k to handle cases where k > nums.length
    k = k % nums.length;
    
    // If k is 0 or array has only one element, no rotation needed
    if (k === 0 || nums.length <= 1) return;
    
    // Helper function to reverse part of the array
    const reverse = (arr, start, end) => {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    };
    
    // Step 1: Reverse the entire array
    reverse(nums, 0, nums.length - 1);
    
    // Step 2: Reverse the first k elements
    reverse(nums, 0, k - 1);
    
    // Step 3: Reverse the remaining elements
    reverse(nums, k, nums.length - 1);
};

// Example usage
let nums1 = [1,2,3,4,5,6,7];
rotate(nums1, 3);
console.log(nums1); // Expected: [5,6,7,1,2,3,4]

let nums2 = [-1,-100,3,99];
rotate(nums2, 2);
console.log(nums2); // Expected: [3,99,-1,-100]
```

## **7. Complexity Analysis**

Time Complexity: O(n)

- We perform three reversals, each taking O(n/2) time
- Total time complexity is O(n)

Space Complexity: O(1)

- We modify the array in-place
- Only use a constant amount of extra space

## **8. Alternative Solutions**

Alternative approaches include:

```javascript
/**
 * Cyclic Replacement Approach
 * @param {number[]} nums
 * @param {number} k
 * @return {void}
 */
var rotateCyclic = function(nums, k) {
    const n = nums.length;
    k = k % n;
    
    let count = 0;
    for (let start = 0; count < n; start++) {
        let current = start;
        let prev = nums[start];
        
        do {
            let next = (current + k) % n;
            let temp = nums[next];
            nums[next] = prev;
            prev = temp;
            current = next;
            count++;
        } while (current !== start);
    }
};

// Example usage
let nums1 = [1,2,3,4,5,6,7];
rotateCyclic(nums1, 3);
console.log(nums1); // Expected: [5,6,7,1,2,3,4]
```

1. Cyclic Replacement Approach
2. Using Extra Array (O(n) space)
3. Juggling Algorithm

Let's briefly illustrate the Cyclic Replacement approach:

## **9. Practice Recommendations**

Similar LeetCode problems to practice:

1. "Reverse Words in a String" (LeetCode 151)
2. "Rotate Image" (LeetCode 48)
3. "Find Pivot Index" (LeetCode 724)

Let's create a flowchart to visualize the reversal approach:

### **Key Insights and Learning Points**

1. **In-place Manipulation**: The core challenge is modifying the array without using extra space.
2. **Reversal Technique**: A powerful approach for array rotations with O(1) space complexity.
3. **Handling Edge Cases**: Always consider array length, k value, and boundary conditions.
4. **Algorithmic Thinking**: Break complex problems into smaller, manageable steps.

### **Problem-Solving Mental Model**

When approaching array rotation problems:

- First, normalize the rotation steps
- Look for patterns that allow in-place modification
- Consider the relative order of elements
- Think about how you can transform the array with minimal extra space

### **Interview Tips**

1. Discuss multiple approaches during an interview
2. Analyze time and space complexity for each solution
3. Demonstrate ability to optimize and handle edge cases
4. Explain your thought process clearly

Would you like me to elaborate on any part of the solution or discuss the problem-solving strategy in more depth?
