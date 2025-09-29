# **2540. Minimum Common Value**

I'll guide you through solving the "2540. Minimum Common Value" LeetCode problem using a comprehensive, pedagogical approach.

## **Problem Understanding**

Let's break down the problem statement:

- You are given two integer arrays `nums1` and `nums2`
- The goal is to find the minimum common value that appears in both arrays
- If no common value exists, return -1
- The input arrays are sorted in non-decreasing order
- The arrays can have different lengths

## Constraints to Consider

- 1 <= nums1.length, nums2.length <= 10^5
- 1 <= nums1[i], nums2[i] <= 10^5
- Both arrays are sorted in non-decreasing order

## **Pattern Identification**

This problem is an excellent example of the **Two Pointers** algorithmic pattern. Given that the arrays are sorted, we can efficiently find the common element by strategically moving pointers.

## **Approach Discussion**

Let's develop a step-by-step solution:

1. Initialize two pointers, one for each array, starting at the beginning
2. Compare the values at the current pointers
3. Move the pointer of the array with the smaller value
4. If values match, we've found our minimum common value
5. If we reach the end of either array without finding a common value, return -1

### **Rationale**

- Sorting allows us to move pointers strategically
- By always moving the pointer with the smaller value, we ensure we don't miss potential common elements
- This approach gives us O(m+n) time complexity, where m and n are array lengths

## **Code Implementation**

```javascript
/**
 * Find the minimum common value between two sorted arrays
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} - Minimum common value or -1
 */
var getCommonValue = function(nums1, nums2) {
    // Initialize two pointers
    let i = 0, j = 0;
    
    // Traverse both arrays
    while (i < nums1.length && j < nums2.length) {
        // If current elements are equal, we found the minimum common value
        if (nums1[i] === nums2[j]) {
            return nums1[i];
        }
        
        // Move pointer of array with smaller value
        if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }
    
    // No common value found
    return -1;
};

// Example test cases
console.log(getCommonValue([1,2,3], [2,4])); // Output: 2
console.log(getCommonValue([1,2,3,6], [2,3,4,5])); // Output: 2
console.log(getCommonValue([1,2,3], [4,5,6])); // Output: -1
```

I'll create an artifact with the solution:

## **Complexity Analysis Two Pointer**

- **Time Complexity**: O(m + n), where m and n are lengths of nums1 and nums2
  - We traverse each array at most once
- **Space Complexity**: O(1)
  - We only use two pointers, regardless of input size

## **Alternative Solutions**

1. **Hash Set Approach**:
   - Create a hash set from one array
   - Iterate through the second array
   - Check for first common element
   - Less efficient: O(m + n) time, O(m) extra space

2. **Binary Search Approach**:
   - For each element in one array, binary search in the other
   - Time complexity: O(m * log(n))
   - Less efficient than two-pointer method

## **Flowchart Visualization**

I'll create a flowchart to illustrate the solution:

## **Practice Recommendations**

To further strengthen your two-pointer skills, try these LeetCode problems:

1. Two Sum II - Input Array Is Sorted (LeetCode 167)
2. 3Sum (LeetCode 15)
3. Container With Most Water (LeetCode 11)
4. Remove Duplicates from Sorted Array (LeetCode 26)
5. Squares of a Sorted Array (LeetCode 977)

## **Learning Insights**

🔑 Key Takeaways:

- Sorted arrays often hint at two-pointer solutions
- Strategic pointer movement can reduce time complexity
- Always consider array constraints and potential edge cases

### **Mental Model Exercise**

Try to visualize the pointers moving through the arrays. Imagine you're "walking" through both arrays simultaneously, always taking the smaller step. This helps internalize the two-pointer technique.

### **Interview Tip**

In interviews, always clarify:

- Array order (sorted/unsorted)
- Potential duplicates
- Required output format

Would you like me to elaborate on any part of the solution or discuss the two-pointer technique in more depth?

I'll provide a detailed explanation of the Hash Set approach for solving the "Minimum Common Value" problem.

## **Hash Set Approach: Deep Dive**

```javascript
/**
 * Find the minimum common value using Hash Set approach
 * @param {number[]} nums1 - First array
 * @param {number[]} nums2 - Second array
 * @return {number} - Minimum common value or -1
 */
var getCommonValue = function(nums1, nums2) {
    // Create a hash set from the first array for O(1) lookup
    const nums1Set = new Set(nums1);
    
    // Track the minimum common value
    let minCommon = Infinity;
    
    // Iterate through the second array
    for (const num of nums2) {
        // Check if the current number exists in the first array's set
        if (nums1Set.has(num)) {
            // Update minimum common value if found
            minCommon = Math.min(minCommon, num);
        }
    }
    
    // Return minimum common value or -1 if no common value found
    return minCommon === Infinity ? -1 : minCommon;
};

// Test cases
console.log(getCommonValue([1,2,3], [2,4])); // Output: 2
console.log(getCommonValue([1,2,3,6], [2,3,4,5])); // Output: 2
console.log(getCommonValue([1,2,3], [4,5,6])); // Output: -1
```

### **Conceptual Understanding**

The Hash Set solution takes a different approach compared to the two-pointer method. Instead of leveraging the sorted nature of the arrays, it uses the power of hash set's constant-time lookup to find common elements.

#### **How It Works**

1. **Set Creation**: Convert the first array into a hash set
   - This allows O(1) lookup time for each element
   - Trades some space complexity for faster retrieval

2. **Iteration and Comparison**:
   - Iterate through the second array
   - Check if each element exists in the first array's set
   - Keep track of the minimum common value

### **Comparative Analysis**

#### **Pros of Hash Set Approach**

- Works with both sorted and unsorted arrays
- Simple and intuitive implementation
- Flexible for various input scenarios

#### **Cons of Hash Set Approach**

- Higher space complexity O(m) compared to two-pointer O(1)
- Slightly less efficient for large inputs
- Loses the optimization potential of sorted arrays

## **Complexity Analysis**

- **Time Complexity**: O(m + n)
  - O(m) to create the set
  - O(n) to iterate through the second array
- **Space Complexity**: O(m)
  - Additional space to store the hash set of the first array

## Mental Model and Learning Exercise

🤔 **Thinking Challenge**:

- Imagine the hash set as a "quick lookup folder"
- Each time you check an element, you're flipping through this folder
- The goal is to find the smallest matching file (number)

### When to Prefer Hash Set Approach

- Unsorted input arrays
- When memory isn't a critical constraint
- Quick prototype or interview solution
- Need for more flexible element checking

## Interview Insights

Key points to discuss in an interview:

1. Trade-offs between two-pointer and hash set methods
2. Space vs. time complexity considerations
3. Handling edge cases (empty arrays, no common elements)

## Recommended Practice Problems

To further develop hash set skills:

1. Intersection of Two Arrays (LeetCode 349)
2. Intersection of Two Arrays II (LeetCode 350)
3. Two Sum (LeetCode 1)
4. Longest Substring Without Repeating Characters (LeetCode 3)

### Comparative Code Snippet

Let me create an artifact that demonstrates the difference in approaches:

💡 **Learning Tip**: The best solutions often emerge from understanding multiple approaches and their trade-offs.

Would you like me to elaborate on any aspect of the Hash Set solution? Perhaps you'd like to explore how different data structures impact problem-solving strategies?

I'll guide you through the Binary Search approach for solving the "Minimum Common Value" problem.

## **Binary Search Approach: Comprehensive Analysis**

```javascript
/**
 * Find the minimum common value using Binary Search approach
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} - Minimum common value or -1
 */
var getCommonValue = function(nums1, nums2) {
    // Ensure nums1 is the smaller array for optimization
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    // Binary search for each element of the smaller array in the larger array
    for (const num of nums1) {
        if (binarySearch(nums2, num)) {
            return num;
        }
    }
    
    // No common value found
    return -1;
};

/**
 * Perform binary search to find a target in a sorted array
 * @param {number[]} arr - Sorted array to search in
 * @param {number} target - Value to find
 * @return {boolean} - Whether target exists in array
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        // Calculate middle index
        const mid = Math.floor((left + right) / 2);
        
        // Check if target is found
        if (arr[mid] === target) {
            return true;
        }
        
        // Adjust search boundaries
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    // Target not found
    return false;
}

// Test cases
console.log(getCommonValue([1,2,3], [2,4])); // Output: 2
console.log(getCommonValue([1,2,3,6], [2,3,4,5])); // Output: 2
console.log(getCommonValue([1,2,3], [4,5,6])); // Output: -1
```

### **Conceptual Understanding Binary Search Approach**

The Binary Search approach leverages the sorted nature of the arrays to efficiently find common elements by dramatically reducing the search space with each comparison.

#### **Core Strategy**

1. **Array Optimization**:
   - Swap arrays to ensure we search in the smaller array
   - Reduces the number of binary search operations

2. **Binary Search Mechanics**:
   - For each element in the smaller array
   - Perform binary search in the larger array
   - Return the first common element found

### **Binary Search: A Deeper Dive**

Binary search is like finding a name in a phone book. Instead of scanning page by page, you:

- Open the book in the middle
- Determine if the name is before or after the current page
- Eliminate half the remaining pages with each step

#### **Key Binary Search Principles**

- Requires a sorted array
- Divides search space in half each iteration
- Logarithmic time complexity O(log n)

### **Complexity Analysis Binary Search Approach**

- **Time Complexity**: O(m * log(n))
  - m = length of smaller array
  - log(n) for each binary search operation
- **Space Complexity**: O(1)
  - Only using a few variables, no extra data structures

### **Comparative Code Snippet**

Let's create an artifact that highlights the differences between approaches:

### **Mental Model and Learning Exercise**

🧠 **Thinking Challenge**:
Imagine binary search like a guessing game where you:

- Start in the middle of a sorted list
- Ask, "Am I too high or too low?"
- Eliminate half the possibilities with each guess

### When to Prefer Binary Search Approach

- Large sorted input arrays
- When you want to minimize comparisons
- Need to reduce search space logarithmically
- Performance is critical

### **Interview Insights Binary Search Approach**

Key points to discuss:

1. Trade-offs between different search strategies
2. Understanding when binary search is most effective
3. Ability to implement binary search from scratch
4. Handling edge cases and array constraints

### **Recommended Practice Problems**

To master binary search:

1. Binary Search (LeetCode 704)
2. Find First and Last Position of Element in Sorted Array (LeetCode 34)
3. Search in Rotated Sorted Array (LeetCode 33)
4. Find Minimum in Rotated Sorted Array (LeetCode 153)
5. First Bad Version (LeetCode 278)

### Learning Pyramid 🏆

```javascript
Most Complex ▲
Binary Search
    │
    ├── Two-Pointer
    │
Least Complex ▼ Hash Set
```

💡 **Pro Tip**: The best algorithm depends on:

- Input size
- Array characteristics
- Memory constraints
- Performance requirements

Would you like me to elaborate on any aspect of the Binary Search solution? Perhaps you're curious about how we can further optimize search algorithms or want to explore more advanced searching techniques?
