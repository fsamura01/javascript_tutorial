# **287. Find the Duplicate Number**

Let's solve the "Find the Duplicate Number" problem step by step, diving deep into the problem-solving approach and algorithmic thinking.

## **1. Problem Understanding**

Let's break down the problem carefully:

- We're given an array `nums` of length `n + 1`
- All numbers in the array are between 1 and n
- Exactly one number appears more than once
- We need to find and return this duplicate number
- Crucial constraints:
  - Cannot modify the input array
  - Must use only constant extra space
  - Need to solve in linear time complexity

## **2. Constraints Analysis**

The problem presents some interesting constraints:

- Array length: n + 1
- Number range: [1, n]
- Only one number is repeated
- Time complexity requirement: O(n)
- Space complexity requirement: O(1)

These constraints rule out simple approaches like:

- Sorting the array (would modify the array)
- Using a hash set (would require extra space)
- Nested loops with O(n²) time complexity

## **3. Problem Decomposition**

To solve this problem, we need to:

1. Find the duplicate number
2. Do so without modifying the array
3. Use only constant extra space
4. Achieve linear time complexity

## **4. Pattern Identification**

This problem calls for the **Floyd's Cycle Detection Algorithm** (also known as the "Tortoise and Hare" algorithm). This is a clever approach that treats the array as a linked list with a cycle.

Key insights:

- Each array value can be treated as a pointer to another index
- The duplicate number creates a cycle in this "linked list"
- We can detect this cycle using two pointers moving at different speeds

## **5. Approach Discussion**

Floyd's Cycle Detection Algorithm works in two phases:

1. **Detect Cycle Existence**
   - Use two pointers: slow (moves one step) and fast (moves two steps)
   - If they meet, a cycle exists

2. **Find Cycle Entrance (Duplicate Number)**
   - Reset one pointer to the start
   - Move both pointers one step at a time
   - Where they meet is the duplicate number

## **6. Code Implementation**

Here's a JavaScript implementation:

```javascript
/**
 * Find the Duplicate Number using Floyd's Cycle Detection
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    // Phase 1: Detect Cycle
    let slow = nums[0];
    let fast = nums[0];
    
    // Find meeting point inside the cycle
    do {
        slow = nums[slow];       // Move slow pointer one step
        fast = nums[nums[fast]]; // Move fast pointer two steps
    } while (slow !== fast);
    
    // Phase 2: Find Cycle Entrance (Duplicate Number)
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
};

// Test cases
console.log(findDuplicate([1,3,4,2,2])); // Should output 2
console.log(findDuplicate([3,1,3,4,2])); // Should output 3
```

## **7. Complexity Analysis**

- **Time Complexity**: O(n)
  - First phase (cycle detection): O(n)
  - Second phase (finding cycle entrance): O(n)
  - Total: O(n)

- **Space Complexity**: O(1)
  - Only two pointers used, regardless of input size

## **8. Alternative Solutions**

1. **Binary Search Approach**
   - Count numbers less than or equal to mid point
   - If count exceeds mid point, duplicate is in lower half
   - Time: O(n log n)
   - Space: O(1)

2. **Bit Manipulation**
   - XOR all numbers and indices
   - More complex, less intuitive

## **9. Practice Recommendations**

Similar LeetCode problems to practice:

1. Find All Duplicates in an Array
2. First Missing Positive
3. Find All Numbers Disappeared in an Array

Let's create a flowchart to visualize the algorithm:

## **Additional Insights**

### **Proof of Duplicate Existence**

The problem asks how we can prove a duplicate must exist. The proof is straightforward:

- We have n + 1 integers
- Integers range from 1 to n
- By the Pigeonhole Principle, at least one number must be repeated

### **Mental Model**

Think of the array as a linked list where:

- Array value = Next pointer
- Duplicate creates a cycle
- Algorithm finds the start of this cycle

### **Interview Tips**

1. Explain your thought process
2. Discuss trade-offs of different approaches
3. Demonstrate understanding of cycle detection
4. Highlight space and time complexity

### **Key Takeaways**

- Floyd's Cycle Detection is a powerful technique
- Works when:
  - Cannot modify input
  - Constant extra space needed
  - Linear time complexity required
- Requires treating array as an implicit linked list

Would you like me to elaborate on any part of the solution or discuss the underlying concepts in more depth?
