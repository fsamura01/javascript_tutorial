# Learning Leetcode 845: Longest Mountain in Array

Let me guide you through this problem using first-principles thinking, building your understanding from the ground up.

## 1. Problem Understanding

Think of this problem like identifying mountain ranges in a landscape. A valid mountain has two essential characteristics: it must go uphill for a while, reach a peak, and then go downhill. Just like you can't have a mountain that only goes up or only goes down, our array mountain needs both an ascending section and a descending section.

The key insight is that we're looking for a contiguous subarray where values strictly increase to some peak, then strictly decrease from that peak. The word "strictly" is crucial here—if we have flat sections (equal consecutive values), that breaks the mountain pattern.

Let's look at the first example: `[2,1,4,7,3,2,5]`. The subarray `[1,4,7,3,2]` forms a valid mountain because it goes up (1→4→7), peaks at 7, then goes down (7→3→2). This has length 5, which is our answer.

In the second example `[2,2,2]`, there's no mountain at all because the values don't change—there's no uphill or downhill section.

## 2. Constraints of the Problem

Understanding constraints helps us eliminate invalid solutions and optimize our approach. Let's think through what the constraints tell us:

The array length can be up to 10,000 elements, which means an O(n²) solution would perform about 100 million operations. While this might still pass, it's on the edge of acceptability. This suggests we should aim for a linear O(n) solution if possible.

Each element can be between 0 and 10,000, but notice that the actual values don't matter much—only their relative ordering matters. This is important because we're not doing mathematical operations on the values, just comparisons.

The minimum mountain length is 3 (one up, one peak, one down), which means any array shorter than 3 elements automatically returns 0.

## 3. Breaking Down the Problem

Let's decompose this problem into fundamental components. A mountain in our array has three distinct phases:

First, there's an ascending phase where each element is strictly greater than the previous one. Then there's a peak element that's greater than both its neighbors. Finally, there's a descending phase where each element is strictly less than the previous one.

The key realization is that we need to identify these phases for every potential peak in the array. A peak is any element where the value increases before it and decreases after it. Once we find a peak, we can expand outward in both directions to find the full extent of the mountain.

Think of it this way: if you're standing at a mountain peak and looking around, you can trace how far the upward slope extends behind you and how far the downward slope extends in front of you. The total mountain length is the sum of these distances plus the peak itself.

## 4. Pattern Identification

This problem belongs to the **two-pointer expansion** pattern, which is closely related to the center expansion technique used in problems like finding palindromes. However, there's also a subtle **greedy** aspect to it.

The pattern works like this: once we identify a potential peak (a local maximum), we expand outward from that peak to measure the mountain's full extent. We keep expanding as long as the mountain conditions hold—strictly increasing on the left and strictly decreasing on the right.

An alternative pattern that works here is the **state machine** approach, where we track what phase we're currently in (ascending, peak found, or descending). This naturally leads to a single-pass solution.

## 5. Approach Discussion

Let me walk you through the two-pointer expansion approach first, as it's the most intuitive.

We iterate through the array looking for peaks. A position i is a peak if `arr[i-1] < arr[i]` and `arr[i] > arr[i+1]`. Notice that indices 0 and n-1 can never be peaks because they don't have neighbors on both sides.

Once we find a peak, we expand leftward and rightward simultaneously. We move the left pointer backward while values are strictly decreasing (going backward means they were strictly increasing when going forward). We move the right pointer forward while values are strictly decreasing. After expansion, the mountain length is `right - left + 1`.

The beautiful thing about this approach is that it naturally handles overlapping mountains. After we finish processing one mountain, we continue searching from where we left off, potentially finding another mountain that shares some elements with the previous one.

For the single-pass optimization (which addresses the follow-up questions), we can use a state machine. As we scan left to right, we track whether we're currently in an "up" phase, "down" phase, or neither. When we transition from up to down, we've found a peak and start measuring the mountain. When the mountain ends (either the array ends or we start going up again), we record the mountain length.

## 6. Code Implementation

Let me provide both approaches so you can see the different ways of thinking about the same problem.

**Two-Pointer Expansion Approach:**

```javascript
function longestMountain(arr) {
    const n = arr.length;
    let maxLength = 0;
    
    // Iterate through potential peaks (indices 1 to n-2)
    for (let i = 1; i < n - 1; i++) {
        // Check if i is a peak: strictly greater than both neighbors
        if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
            let left = i - 1;
            let right = i + 1;
            
            // Expand left while strictly increasing (going backward)
            while (left > 0 && arr[left] > arr[left - 1]) {
                left--;
            }
            
            // Expand right while strictly decreasing
            while (right < n - 1 && arr[right] > arr[right + 1]) {
                right++;
            }
            
            // Calculate mountain length and update max
            const currentLength = right - left + 1;
            maxLength = Math.max(maxLength, currentLength);
        }
    }
    
    return maxLength;
}
```

```java
class Solution {
    public int longestMountain(int[] arr) {
        int n = arr.length;
        int maxLength = 0;
        
        // Iterate through potential peaks (indices 1 to n-2)
        for (int i = 1; i < n - 1; i++) {
            // Check if i is a peak: strictly greater than both neighbors
            if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
                int left = i - 1;
                int right = i + 1;
                
                // Expand left while strictly increasing (going backward)
                while (left > 0 && arr[left] > arr[left - 1]) {
                    left--;
                }
                
                // Expand right while strictly decreasing
                while (right < n - 1 && arr[right] > arr[right + 1]) {
                    right++;
                }
                
                // Calculate mountain length and update max
                int currentLength = right - left + 1;
                maxLength = Math.max(maxLength, currentLength);
            }
        }
        
        return maxLength;
    }
}
```

**Single-Pass Approach (Optimal):**

```javascript
function longestMountain(arr) {
    const n = arr.length;
    let maxLength = 0;
    let i = 0;
    
    while (i < n) {
        let base = i;
        
        // Find the end of the ascending phase
        // Skip if current position is not start of ascent
        if (i + 1 < n && arr[i] < arr[i + 1]) {
            while (i + 1 < n && arr[i] < arr[i + 1]) {
                i++;
            }
            
            // Now i is at the peak, check if there's a descending phase
            if (i + 1 < n && arr[i] > arr[i + 1]) {
                while (i + 1 < n && arr[i] > arr[i + 1]) {
                    i++;
                }
                
                // We found a complete mountain
                maxLength = Math.max(maxLength, i - base + 1);
            }
        }
        
        // Move to next potential mountain start
        // If we didn't move, advance by 1 to avoid infinite loop
        if (i === base) {
            i++;
        }
    }
    
    return maxLength;
}
```

```java
class Solution {
    public int longestMountain(int[] arr) {
        int n = arr.length;
        int maxLength = 0;
        int i = 0;
        
        while (i < n) {
            int base = i;
            
            // Find the end of the ascending phase
            if (i + 1 < n && arr[i] < arr[i + 1]) {
                while (i + 1 < n && arr[i] < arr[i + 1]) {
                    i++;
                }
                
                // Now i is at the peak, check for descending phase
                if (i + 1 < n && arr[i] > arr[i + 1]) {
                    while (i + 1 < n && arr[i] > arr[i + 1]) {
                        i++;
                    }
                    
                    // We found a complete mountain
                    maxLength = Math.max(maxLength, i - base + 1);
                }
            }
            
            // Move to next potential mountain start
            if (i == base) {
                i++;
            }
        }
        
        return maxLength;
    }
}
```

## 7. Complexity Analysis

For the two-pointer expansion approach, the time complexity might initially appear to be O(n²) because we have a loop inside a loop. However, it's actually O(n) because each element is visited at most twice—once when we're scanning for peaks and once when we're expanding from a peak. Think of it this way: the expansion from each peak processes elements that haven't been fully processed yet, so we're not repeatedly visiting the same elements.

The space complexity is O(1) because we only use a constant number of variables regardless of input size. We don't create any arrays or data structures that grow with the input.

The single-pass approach is clearly O(n) time because each element is examined exactly once as we scan left to right. The space complexity remains O(1) for the same reasons.

Both approaches achieve the follow-up requirements: single pass (the optimized version) and O(1) space (both versions).

## 8. Alternative Solutions

Another interesting approach uses preprocessing. We could create two auxiliary arrays: one tracking the length of the ascending sequence ending at each position, and another tracking the length of the descending sequence starting at each position. Then we iterate through and find the maximum sum where both arrays have non-zero values.

This would look like:

```javascript
function longestMountain(arr) {
    const n = arr.length;
    if (n < 3) return 0;
    
    // up[i] = length of increasing sequence ending at i
    const up = new Array(n).fill(0);
    // down[i] = length of decreasing sequence starting at i
    const down = new Array(n).fill(0);
    
    // Fill up array
    for (let i = 1; i < n; i++) {
        if (arr[i] > arr[i - 1]) {
            up[i] = up[i - 1] + 1;
        }
    }
    
    // Fill down array (right to left)
    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] > arr[i + 1]) {
            down[i] = down[i + 1] + 1;
        }
    }
    
    let maxLength = 0;
    for (let i = 0; i < n; i++) {
        if (up[i] > 0 && down[i] > 0) {
            maxLength = Math.max(maxLength, up[i] + down[i] + 1);
        }
    }
    
    return maxLength;
}
```

While this solution is elegant and easy to understand, it uses O(n) extra space, so it doesn't meet the O(1) space follow-up requirement. However, it's still a valuable approach to know because the preprocessing pattern appears in many other problems.

## 9. Practice Recommendations

To reinforce the patterns you've learned here, I recommend practicing these similar problems:

**Leetcode 852: Peak Index in a Mountain Array** helps you understand the concept of finding peaks, which is fundamental to this problem. It's simpler because there's only one mountain.

**Leetcode 941: Valid Mountain Array** asks you to verify if an entire array forms a single mountain. This tests your understanding of the mountain definition.

**Leetcode 1671: Minimum Number of Removals to Make Mountain Array** is a harder variation that asks you to find the minimum elements to remove to create a mountain. This builds on the same concepts but adds a dynamic programming layer.

**Leetcode 5: Longest Palindromic Substring** uses a similar center-expansion pattern, helping you recognize when this technique applies to different problems.

**Leetcode 42: Trapping Rain Water** involves thinking about peaks and valleys in a related way, though the solution strategy differs.

## 10. Flowchart Design

Let me create a visual representation of the single-pass solution's logic:

---

The key insight that makes this problem approachable is recognizing that every mountain has a peak, and once you find a peak, you can measure the mountain by expanding outward. The single-pass optimization comes from realizing that you don't need to find all peaks first—you can process mountains as you encounter them while scanning left to right.

---

## Understanding the "+1" in Length Calculation

When we calculate the mountain length as `right - left + 1`, we're converting from **index positions** to **count of elements**. Let me show you why this is necessary with a concrete example.

Imagine we have the simple mountain `[1, 3, 2]`. After our algorithm runs, let's say `left = 0` (pointing to element 1) and `right = 2` (pointing to element 2). Now, if we just calculated `right - left`, we'd get `2 - 0 = 2`. But count the elements yourself—there are actually three elements in this mountain: the 1, the 3, and the 2. That's where the "+1" comes in to correct this discrepancy.

## The Core Principle: Index Distance vs Element Count

Think about it this way: when you measure distance between two positions using indices, you're counting the gaps between elements, not the elements themselves. If I stand at position 0 and you stand at position 2, there are 2 steps between us, but there are 3 positions total when we include both where I'm standing and where you're standing.

Here's another way to visualize this. Consider the array `[5, 10, 15, 20]` with indices `[0, 1, 2, 3]`. If we want to know how many elements are between index 1 and index 3 inclusive, we calculate `3 - 1 = 2`, which gives us the number of gaps. But the actual elements at positions 1, 2, and 3 are three elements: 10, 15, and 20. We need to add 1 to account for the fact that we're counting elements, not gaps.

## A Mathematical Perspective

There's also a mathematical way to think about this. When you have a range from position `a` to position `b` inclusive, the number of integers in that range is always `b - a + 1`. For example, how many integers are there from 5 to 10 inclusive? It's `10 - 5 + 1 = 6`, which are the numbers 5, 6, 7, 8, 9, and 10. The same principle applies to array indices.

## Tracing Through the Code

Let me trace through our example `[2, 1, 4, 7, 3, 2, 5]` to show you exactly when and why we add that 1. When we find the mountain `[1, 4, 7, 3, 2]`:

Starting at index 1 where the value is 1, the algorithm identifies index 3 (value 7) as a peak. Then it expands leftward and discovers the ascending section starts at index 1, so `left = 1`. It expands rightward and discovers the descending section ends at index 5, so `right = 5`.

Now when we calculate: `5 - 1 = 4`, but we can count the elements ourselves—positions 1, 2, 3, 4, and 5 contain five elements. Adding the 1 gives us `5 - 1 + 1 = 5`, which correctly represents all five elements in our mountain.

## What Happens If You Forget the "+1"?

If you omit the "+1", your algorithm will systematically undercount every mountain by exactly one element. For a mountain of actual length 5, you'd report 4. For a mountain of length 3 (the minimum valid mountain), you'd report 2, which would be incorrect since we need at least 3 elements to form a mountain. This bug would cause your solution to fail test cases because it would never find the correct maximum length.

The "+1" is essentially the bridge between thinking in terms of index arithmetic (which counts spaces between positions) and thinking in terms of element counting (which includes the positions themselves). It's a small detail, but it's crucial for correctness, and understanding why it's there will help you avoid similar off-by-one errors in many other array problems

---

Excellent observation! You're absolutely right to question this. Let me explain why the check `if (n < 3) return 0;` is technically unnecessary in this implementation, though adding it would actually be a **best practice** for code clarity and performance.

## Why the Code Works Without the Check if(n<3)

The key is in how the for loop is structured. Look at this line:

```javascript
for (let i = 1; i < n - 1; i++)
```

This loop iterates from index 1 to index `n - 2` (inclusive). Let's trace through what happens with small arrays:

***Case 1: Array length is 0 or 1***

- If `n = 0`, then `n - 1 = -1`, so the condition `i < n - 1` becomes `1 < -1`, which is false. The loop never executes.
- If `n = 1`, then `n - 1 = 0`, so the condition `1 < 0` is false. The loop never executes.

***Case 2: Array length is 2***

- If `n = 2`, then `n - 1 = 1`, so the condition `1 < 1` is false. The loop never executes.

In all these cases, `maxLength` remains 0, and we return 0—which is the correct answer! So the loop condition itself acts as an implicit guard against arrays that are too small.

## Why You SHOULD Still Add the Check

Even though it's not technically necessary, adding the explicit check is good engineering practice for several reasons:

### 1. **Code Clarity and Intent**

When someone reads your code, the check immediately communicates: "Hey, a mountain needs at least 3 elements, so we handle that edge case upfront." Without it, a reader has to mentally trace through the loop logic to realize small arrays are handled correctly.

### 2. **Performance (Minor Optimization)**

For very small arrays, checking the length upfront and returning immediately is slightly faster than setting up the loop, checking the condition, and then exiting. While this is microseconds of difference, in a tight loop or with millions of function calls, it can add up.

### 3. **Defensive Programming**

What if you later modify the loop condition? The explicit check protects you against accidentally breaking the edge case handling. It makes your code more robust to future changes.

### 4. **Interview Context**

During a coding interview, explicitly handling edge cases shows the interviewer you're thinking comprehensively about the problem. It's better to be explicit than to rely on subtle logic that might not be immediately obvious.

## The Improved Version

Here's how I would write it in production code:

```javascript
function longestMountain(arr) {
    const n = arr.length;
    
    // Early return: a mountain requires at least 3 elements
    if (n < 3) return 0;
    
    let maxLength = 0;
    
    // Iterate through potential peaks (indices 1 to n-2)
    for (let i = 1; i < n - 1; i++) {
        // Check if i is a peak: strictly greater than both neighbors
        if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
            let left = i - 1;
            let right = i + 1;
            
            // Expand left while strictly increasing (going backward)
            while (left > 0 && arr[left] > arr[left - 1]) {
                left--;
            }
            
            // Expand right while strictly decreasing
            while (right < n - 1 && arr[right] > arr[right + 1]) {
                right++;
            }
            
            // Calculate mountain length and update max
            const currentLength = right - left + 1;
            maxLength = Math.max(maxLength, currentLength);
        }
    }
    
    return maxLength;
}
```

## Comparison: When the Check IS Necessary

Notice that in my single-pass implementation, I also didn't include the check. However, if you were using the preprocessing approach with auxiliary arrays, you'd be allocating memory:

```javascript
const up = new Array(n).fill(0);
const down = new Array(n).fill(0);
```

In that case, checking `if (n < 3) return 0;` first would save you from unnecessarily allocating arrays for inputs that can never have a mountain.

## The Bottom Line

Your instinct to question this is spot-on. While the code is **functionally correct** without the check, including it makes the code **better** by being more explicit, readable, and maintainable. In an interview or production code, I'd always add it with a comment explaining why a mountain needs at least 3 elements.

This is a great example of the difference between "code that works" and "code that's well-engineered." Does this answer your question about the edge case handling?
