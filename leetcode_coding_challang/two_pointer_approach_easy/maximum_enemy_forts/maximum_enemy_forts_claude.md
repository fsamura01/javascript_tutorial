# Problem Understanding: Maximum Enemy Forts That Can Be Captured

Let me break down this problem in simple terms:

1. We have an array representing positions of forts:
   - `-1`: Empty position
   - `0`: Enemy fort
   - `1`: Our fort

2. We want to move our army from one of our forts (position with value `1`) to an empty position (value `-1`).

3. Important rule: We can only move through enemy forts (positions with value `0`).

4. When we move, we capture all enemy forts along the way.

5. We need to find the maximum number of enemy forts we can capture in a single move.

## **Pattern Identification**

This problem can be solved using a **two-pointer approach**. The hint already suggests this direction, but let's understand why:

- We need to find pairs of positions (one with our fort and one empty) that satisfy the condition.
- Between these positions, we need to count consecutive enemy forts.
- The problem is asking for the maximum count of such enemy forts.

## **Approach Discussion**

Let's develop a step-by-step approach:

1. We need to find pairs of positions: one with our fort (`1`) and one empty (`-1`).
2. Between these pairs, we need to check if there are only enemy forts (`0`).
3. If the condition is met, we count the number of enemy forts between them.
4. We track the maximum count of enemy forts we can capture.

To implement this efficiently:

1. Iterate through the array.
2. When we find our fort (`1`), we'll search for an empty position (`-1`) with only enemy forts in between.
3. Similarly, when we find an empty position (`-1`), we'll search for our fort (`1`) with only enemy forts in between.
4. We'll keep track of the maximum count of enemy forts that can be captured.

## **Code Implementation**

Let's implement this in JavaScript:

```javascript
/**
 * @param {number[]} forts
 * @return {number}
 */
function captureForts(forts) {
    const n = forts.length;
    let maxCapture = 0;
    
    for (let i = 0; i < n; i++) {
        // Case 1: Current position is our fort (1)
        if (forts[i] === 1) {
            // Look for an empty position (-1) with only enemy forts in between
            for (let j = i + 1; j < n; j++) {
                // If we find another fort (1) or non-consecutive enemy forts, break
                if (forts[j] === 1) break;
                
                // If we find an empty position (-1)
                if (forts[j] === -1) {
                    // Count enemy forts between positions i and j
                    const enemyForts = j - i - 1;
                    maxCapture = Math.max(maxCapture, enemyForts);
                    break;
                }
            }
        }
        
        // Case 2: Current position is an empty position (-1)
        if (forts[i] === -1) {
            // Look for our fort (1) with only enemy forts in between
            for (let j = i + 1; j < n; j++) {
                // If we find another empty position (-1) or non-consecutive enemy forts, break
                if (forts[j] === -1) break;
                
                // If we find our fort (1)
                if (forts[j] === 1) {
                    // Count enemy forts between positions i and j
                    const enemyForts = j - i - 1;
                    maxCapture = Math.max(maxCapture, enemyForts);
                    break;
                }
            }
        }
    }
    
    return maxCapture;
}
```

This solution has a time complexity of O(n²) in the worst case, where n is the length of the forts array. This is because for each position, we might need to scan the entire array ahead of it.

## **Optimized Solution**

We can optimize this further by using a more efficient implementation of the two-pointer approach:

```javascript
/**
 * @param {number[]} forts
 * @return {number}
 */
function captureForts(forts) {
    const n = forts.length;
    let maxCapture = 0;
    
    for (let i = 0; i < n; i++) {
        // Skip positions that are not our fort (1) or empty (-1)
        if (forts[i] === 0) continue;
        
        // Check positions ahead
        for (let j = i + 1; j < n; j++) {
            // Skip enemy forts
            if (forts[j] === 0) continue;
            
            // If we find a valid pair (our fort and empty position)
            if (forts[i] + forts[j] === 0) {
                // Count enemy forts between positions i and j
                const enemyForts = j - i - 1;
                maxCapture = Math.max(maxCapture, enemyForts);
            }
            
            // Break once we find any fort (1) or empty position (-1)
            break;
        }
    }
    
    return maxCapture;
}
```

This optimized solution has a time complexity of O(n), as we process each position at most once.

## **Complexity Analysis**

- **Time Complexity**: O(n), where n is the length of the forts array. We iterate through the array once, and for each position, we scan ahead until we find a non-enemy fort.
- **Space Complexity**: O(1), as we only use a constant amount of extra space.

## **Alternative Solutions**

Another approach could be to use a one-pass algorithm:

```javascript
/**
 * @param {number[]} forts
 * @return {number}
 */
function captureForts(forts) {
    const n = forts.length;
    let maxCapture = 0;
    let i = 0;
    
    while (i < n) {
        // Find a position with our fort (1) or empty (-1)
        if (forts[i] !== 0) {
            const start = i;
            let count = 0;
            
            // Move to the next position
            i++;
            
            // Count consecutive enemy forts
            while (i < n && forts[i] === 0) {
                count++;
                i++;
            }
            
            // Check if we found a valid pair
            if (i < n && forts[i] + forts[start] === 0) {
                maxCapture = Math.max(maxCapture, count);
            }
        } else {
            i++;
        }
    }
    
    return maxCapture;
}
```

This solution has a time complexity of O(n) and might be more intuitive for some people.

## **Practice Recommendations**

Here are similar LeetCode problems that use the two-pointer approach:

1. [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
2. [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
3. [3Sum](https://leetcode.com/problems/3sum/)
4. [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
5. [Move Zeroes](https://leetcode.com/problems/move-zeroes/)

Let me create a flowchart to visually represent the solution:

This flowchart illustrates the one-pass approach, showing how we:

1. Iterate through the array
2. Find positions with our fort (1) or empty (-1)
3. Count consecutive enemy forts
4. Check if we found a valid pair
5. Update the maximum capture

## **Key Insights**

1. **Complementary Values**: The problem hinges on finding pairs of positions where the values sum to 0 (1 + (-1) = 0).

2. **Consecutive Checking**: We need to ensure all positions between our fort and the empty position contain only enemy forts.

3. **Optimization**: By skipping positions with enemy forts (0) and breaking once we find a non-enemy fort, we can achieve a linear time complexity.

4. **Two-Pointer Variation**: This problem uses a variation of the two-pointer technique where we identify pairs that satisfy specific conditions.

Understanding these patterns will help you tackle similar problems that involve finding specific sequences or patterns in arrays.

## **Great question! The `-1` at the end of the calculation `const enemyForts = j - i - 1` is crucial because we're counting only the enemy forts between positions `i` and `j`, not including the positions `i` and `j` themselves.**

Let me explain with an example:

Suppose we have the array: `[1, 0, 0, 0, -1]`

- Position `i = 0` has our fort (value `1`)
- Position `j = 4` has an empty space (value `-1`)

The total distance between these positions is `j - i = 4 - 0 = 4`. However, this includes both the positions `i` and `j` themselves.

Since we only want to count the enemy forts (positions with value `0`) between them, we need to subtract 1 to exclude the two end positions:

- `j - i - 1 = 4 - 0 - 1 = 3`

This gives us the correct count of 3 enemy forts at positions 1, 2, and 3.

In general:

- If positions `i` and `j` are directly adjacent (no enemy forts between them), then `j - i = 1`, and `j - i - 1 = 0` correctly indicates zero enemy forts.
- If there are enemy forts between positions `i` and `j`, the formula gives us exactly the count of those enemy forts without counting the positions `i` and `j` themselves.

This is a common technique in array algorithms when we need to count elements between two positions without including the boundary positions.

## **I'll clarify the problem statement for LeetCode problem 2511 "Maximum Enemy Forts That Can Be Captured."**

The key rules for moving your army are:

1. You start at position `i` where you have a fort under your command (`forts[i] == 1`).

2. You move to an empty position `j` where there is no fort (`forts[j] == -1`).

3. The path between positions `i` and `j` must contain only enemy forts (`forts[k] == 0` for all positions `k` between `i` and `j`).

4. When you move from position `i` to position `j`, you capture all enemy forts that are in between.

5. The goal is to find the maximum number of enemy forts you can capture in a single move.

In other words:

- You can only move from a position with your fort (value 1) to an empty position (value -1)
- The path must contain only enemy forts (value 0)
- You want to capture as many enemy forts as possible in one move

For example, if `forts = [1,0,0,0,-1]`, you could move from position 0 (where you have a fort) to position 4 (which is empty), capturing 3 enemy forts along the way.

If there's no valid move possible (no path from your fort to an empty position that contains only enemy forts), or if you don't have any forts under your command, the answer is 0.
