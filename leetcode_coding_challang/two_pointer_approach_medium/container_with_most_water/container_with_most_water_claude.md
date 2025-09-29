# **11-Container With Most Water - Solution Guide**

## **1. Problem Understanding**

This problem asks us to find the maximum amount of water that can be contained between any two vertical lines in an array. Each value in the array represents the height of a line at position i. The width of the container is the distance between the two lines (their indices), and the height is limited by the shorter of the two lines.

The goal is to maximize the area formula: **area = width × height = (j - i) × min(height[i], height[j])** where i and j are the indices of the two lines.

## **2. Constraints of the Problem**

The constraints tell us important information:

- We have an array of length n where 2 ≤ n ≤ 10^5 (so the array could be quite large)
- The heights are non-negative integers: 0 ≤ height[i] ≤ 10^4
- We can't slant the container (water must form a rectangle)
- We need to return a single integer representing the maximum area possible

The size constraints suggest we need an efficient algorithm, ideally O(n) time complexity.

## **3. Breaking Down the Problem**

Let's break this down into simpler components:

1. We need to find two indices i and j (where i < j) in the array
2. The area between these indices is calculated as: (j - i) × min(height[i], height[j])
3. We want to maximize this area
4. We can't slant the container, so the height is limited by the shorter of the two lines

## **4. Pattern Identification**

This problem can be efficiently solved using the **two-pointer technique**. This pattern works well here because:

- We need to consider pairs of elements from the array
- We can make intelligent decisions about which pointers to move based on the current state

## **5. Approach Discussion**

Here's a step-by-step approach:

1. Initialize two pointers, left at the start of the array (index 0) and right at the end (index n-1)
2. Calculate the current area: (right - left) × min(height[left], height[right])
3. Keep track of the maximum area seen so far
4. Move the pointer that points to the shorter line inward (if both are equal, you can move either)
5. Repeat steps 2-4 until the pointers meet
6. Return the maximum area

### **Why does this work?**

The key insight is that the width of the container decreases with each step. To maximize area, we always move the pointer with the smaller height because:

- Moving the pointer with the larger height will definitely decrease the area (width decreases and height stays the same or decreases)
- Moving the pointer with the smaller height might increase the area if we find a taller line (width decreases but height might increase)

## **6. Code Implementation**

Here's the JavaScript implementation with detailed comments:

```javascript
/**
 * @param {number[]} height - Array of heights
 * @return {number} - Maximum water area
 */
function maxArea(height) {
    // Initialize pointers at the beginning and end of array
    let left = 0;
    let right = height.length - 1;
    
    // Variable to track maximum area
    let maxWaterArea = 0;
    
    // Continue until pointers meet
    while (left < right) {
        // Calculate width between the two lines
        const width = right - left;
        
        // Calculate height (limited by the shorter line)
        const containerHeight = Math.min(height[left], height[right]);
        
        // Calculate current area
        const currentArea = width * containerHeight;
        
        // Update maximum area if current area is larger
        maxWaterArea = Math.max(maxWaterArea, currentArea);
        
        // Move the pointer that points to the shorter line
        // This is the key insight: we always move the limiting factor
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWaterArea;
}
```

Let's trace through this algorithm with the example array `[1,8,6,2,5,4,8,3,7]`:

- Initialize: left = 0, right = 8, maxWaterArea = 0
- First iteration: width = 8, height = min(1, 7) = 1, area = 8, maxWaterArea = 8, move left pointer
- Second iteration: width = 7, height = min(8, 7) = 7, area = 49, maxWaterArea = 49, move right pointer
- ...and so on

## **7. Complexity Analysis**

- **Time Complexity**: O(n) where n is the length of the height array. We process each element at most once.
- **Space Complexity**: O(1) as we only use a constant amount of extra space regardless of input size.

## **8. Alternative Solutions**

**Brute Force Approach**:
We could check every possible pair of lines and calculate the area:

```javascript
function maxAreaBruteForce(height) {
    let maxWaterArea = 0;
    
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const width = j - i;
            const containerHeight = Math.min(height[i], height[j]);
            const area = width * containerHeight;
            maxWaterArea = Math.max(maxWaterArea, area);
        }
    }
    
    return maxWaterArea;
}
```

However, this has O(n²) time complexity, which would be too slow for large inputs.

## **9. Practice Recommendations**

Here are similar problems that use the two-pointer technique:

1. **Trapping Rain Water** (LeetCode #42) - More complex version of this problem
2. **3Sum** (LeetCode #15) - Finding triplets that sum to zero
3. **Container With Most Water** (this problem)
4. **Two Sum II - Input Array Is Sorted** (LeetCode #167)
5. **Valid Palindrome** (LeetCode #125)

## **10. Flowchart Design**

## **Key Takeaways for Problem-Solving Patterns**

This problem illustrates some important algorithmic patterns:

1. **Two-pointer technique**: Moving from the outsides inward is often effective for array problems involving pairs or ranges.

2. **Greedy approach**: We make locally optimal choices (moving the pointer with smaller height) that lead to a globally optimal solution.

3. **Understanding trade-offs**: Width decreases with each step, so we must maximize height to compensate.

4. **Optimization insight**: By recognizing that moving the pointer with larger height will never increase our area, we avoid unnecessary calculations.

The elegant solution demonstrates how recognizing the right pattern can transform what seems like an O(n²) problem into an O(n) solution. Instead of checking all possible pairs, we make intelligent decisions about which pointer to move, eliminating many combinations that cannot possibly be optimal.

When you encounter similar problems, look for ways to eliminate unnecessary calculations by leveraging the constraints of the problem and making greedy choices when appropriate.

This statement is describing how to visualize the problem. Let me break it down:

For each position `i` in the array (where `i` ranges from 0 to n-1), we're drawing a vertical line with:

- One endpoint at the x-axis at position (`i, 0`) - this means at x-coordinate `i` and y-coordinate 0
- Another endpoint at (`i, height[i]`) - this means at x-coordinate `i` and y-coordinate equal to the value at `height[i]`

In simpler terms, imagine a coordinate system where:

- The x-axis represents the position in the array (0, 1, 2, ..., n-1)
- The y-axis represents the height values
- At each position `i`, you draw a vertical line from the x-axis up to the height specified by `height[i]`

For example, if `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`:

- At position 0, you draw a vertical line from (0,0) to (0,1)
- At position 1, you draw a vertical line from (1,0) to (1,8)
- At position 2, you draw a vertical line from (2,0) to (2,6)
- And so on...

The problem is asking you to find two of these vertical lines that, together with the x-axis, would form a container that can hold the maximum amount of water. The amount of water is determined by the area of this container, which is calculated as:

- Width = the distance between the two lines (difference in x-coordinates)
- Height = the minimum height of the two lines (since water will spill over the shorter line)
- Area = width × height

The challenge is to find the pair of lines that gives you the maximum possible area.

The statement "There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`" is describing the way we should visualize this problem.

Let me break this down:

1. We have an array called `height` that contains `n` integers.
2. Each integer in this array represents the height of a vertical line.
3. These vertical lines are positioned along the x-axis at positions 0, 1, 2, ..., n-1.
4. For each position `i`, there's a vertical line that:
   - Starts at the point `(i, 0)` (on the x-axis)
   - Ends at the point `(i, height[i])` (reaching up to the height value)

Imagine a coordinate system where:

- The x-axis represents the position index (0, 1, 2, ...)
- The y-axis represents the height

For example, with `height = [1,8,6,2,5,4,8,3,7]`:

- At position 0, we have a vertical line from (0,0) to (0,1)
- At position 1, we have a vertical line from (1,0) to (1,8)
- At position 2, we have a vertical line from (2,0) to (2,6)
- And so on...

The problem asks us to find two of these vertical lines that, together with the x-axis, can form a container that holds the maximum amount of water. The amount of water is determined by:

- The width (distance between the two lines on the x-axis)
- The height (the minimum height of the two lines, since water can't go higher than the shorter line)

So the area (amount of water) would be: width × minimum height of the two lines.

Does that help clarify the visualization of the problem?
