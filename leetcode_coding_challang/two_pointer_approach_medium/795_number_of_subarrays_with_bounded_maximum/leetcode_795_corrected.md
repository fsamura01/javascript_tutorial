# Learning LeetCode 795: Number of Subarrays with Bounded Maximum

I'm excited to help you master this problem! Let's build your understanding from the ground up using first-principles thinking.

## 1. Problem Understanding

Let me explain what we're being asked to do in simple terms.

Imagine you have a row of numbers, and you're given a valid range defined by two boundaries: `left` and `right`. Your task is to count how many continuous sections of this row have their maximum value falling within this range.

The key insight here is that we're looking at the **maximum element** in each subarray. For a subarray to be valid, the largest number in that section must be at least `left` and at most `right`.

Let's walk through Example 1 to solidify this understanding. We have `nums = [2,1,4,3]` with `left = 2` and `right = 3`.

Consider all possible subarrays and their maximums. The subarray `[2]` has max = 2, which is in our range. The subarray `[2,1]` has max = 2, still valid. But `[2,1,4]` has max = 4, which exceeds our right boundary of 3, so it doesn't count. The subarray `[3]` has max = 3, which is valid. However, `[4]` has max = 4, which is too large. Notice that any subarray containing the 4 will have a maximum of at least 4, making it invalid.

## 2. Constraints of the Problem

Understanding the constraints helps us choose the right approach and avoid pitfalls.

The array can be quite large, up to 100,000 elements. This means we need an efficient solution because a brute force approach that checks every possible subarray would involve nested loops resulting in O(n²) time complexity, which might be too slow.

The values in the array can range from 0 to 1 billion, but our `left` and `right` boundaries can also be anywhere in this range. This tells us we need to handle various scenarios: what if all numbers are below `left`? What if all are above `right`? What if our boundaries are at the extremes?

The problem guarantees the answer fits in a 32-bit integer, so we don't need to worry about overflow issues in most programming languages.

## 3. Breaking Down the Problem

Let me help you see the structure within this problem by categorizing elements.

Think about dividing the array elements into three categories based on their relationship to our boundaries. An element can be **below** the range (less than `left`), **within** the range (between `left` and `right` inclusive), or **above** the range (greater than `right`).

Here's the crucial observation: any element above `right` acts as a **blocker**. If you have a subarray that includes an element greater than `right`, that subarray's maximum will definitely exceed `right`, making it invalid. These blockers essentially divide our array into independent sections that we can analyze separately.

Within sections that don't contain blockers, we want to count subarrays where at least one element is in the valid range. Elements below `left` are interesting because they can be part of valid subarrays, but only if they're combined with at least one element in the valid range.

## 4. Pattern Identification

This problem fits beautifully into the **single-pass linear scan** pattern with **state tracking**.

The key pattern here is recognizing that we can solve this problem by maintaining state as we traverse the array once. We need to track important positions and use them to calculate contributions efficiently.

This isn't quite a sliding window in the traditional sense, nor is it dynamic programming. Instead, it's about understanding how each position contributes to the count based on what came before it. We track the last position where we saw an element in the valid range and the last position where we saw a blocker.

## 5. Step-by-Step Approach

Let me walk you through the intuition behind an elegant solution.

As we scan through the array from left to right, we maintain two key pieces of information: the index of the most recent element that's in our valid range, and the index of the most recent element that's above our range (a blocker).

For each position, we ask: how many valid subarrays end at this position? The answer depends on what elements we've seen recently.

If the current element is above `right`, it's a blocker. No valid subarray can end here, so we update our blocker position and move on.

If the current element is in the valid range, we can form valid subarrays by extending back to any position after the most recent blocker. The number of such subarrays is the distance from the current position to the blocker position. We also update our "last valid element" position.

If the current element is below `left`, it's more subtle. This element alone doesn't satisfy our requirement, but it can be part of a valid subarray if we previously saw an element in the valid range. We can extend any valid subarray that ended at or after the last valid position up to include this current element. The count is again the distance from the last valid position to the last blocker position.

The beauty of this approach is that we process each element exactly once, making accumulative decisions based on our maintained state.

## 6. Code Implementation

Let me provide you with well-commented implementations in both JavaScript and Java.

**JavaScript Implementation:**

```javascript
// JavaScript - Corrected Solution
function numSubarrayBoundedMax(nums, left, right) {
    let count = 0;
    let lastValidIndex = -1;  // Last index where element was in [left, right]
    let lastBlockerIndex = -1; // Last index where element was > right
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > right) {
            // Element is a blocker - no valid subarrays can end here
            lastBlockerIndex = i;
        } 
        else if (nums[i] >= left) {
            // Element is in valid range
            // Count all subarrays ending at i that start after the last blocker
            count += i - lastBlockerIndex;
            lastValidIndex = i;
        } 
        else {
            // Element is below range
            // Only add contribution if we've seen at least one valid element
            // after the last blocker
            if (lastValidIndex > lastBlockerIndex) {
                count += lastValidIndex - lastBlockerIndex;
            }
        }
    }
    
    return count;
}
```

**Java Implementation:**

```java
// Java - Corrected Solution
class Solution {
    public int numSubarrayBoundedMax(int[] nums, int left, int right) {
        int count = 0;
        int lastValidIndex = -1;  // Last index where element was in [left, right]
        int lastBlockerIndex = -1; // Last index where element was > right
        
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > right) {
                // Element is a blocker - no valid subarrays can end here
                lastBlockerIndex = i;
            } 
            else if (nums[i] >= left) {
                // Element is in valid range
                // Count all subarrays ending at i that start after the last blocker
                count += i - lastBlockerIndex;
                lastValidIndex = i;
            } 
            else {
                // Element is below range
                // Only add contribution if we've seen at least one valid element
                // after the last blocker
                if (lastValidIndex > lastBlockerIndex) {
                    count += lastValidIndex - lastBlockerIndex;
                }
            }
        }
        
        return count;
    }
}
```

Let me trace through Example 1 to show you how this works. With `nums = [2,1,4,3]`, `left = 2`, `right = 3`:

At index 0, element is 2 (in range). We add `0 - (-1) = 1` subarray: `[2]`.

At index 1, element is 1 (below range). We add `0 - (-1) = 1` subarray: `[2,1]`.

At index 2, element is 4 (blocker). We update the blocker position to 2.

At index 3, element is 3 (in range). We add `3 - 2 = 1` subarray: `[3]`.

Total: 3 subarrays, which matches our expected output!

## 7. Complexity Analysis

The time complexity of this solution is **O(n)** where n is the length of the input array. We make a single pass through the array, performing constant-time operations at each position. This is optimal because we must at least look at every element once to solve the problem.

The space complexity is **O(1)** because we only use a fixed number of variables regardless of the input size. We don't need any additional data structures that grow with the input.

This efficiency is what makes the solution elegant. Despite the problem seeming to require checking many subarrays, we cleverly count them without explicitly generating them.

## 8. Alternative Solutions

There's another way to think about this problem that's worth exploring for deeper understanding.

You could approach this using the principle of **inclusion-exclusion**. Count all subarrays where the maximum is at most `right`, then subtract all subarrays where the maximum is less than `left`. The difference gives you subarrays where the maximum is in the range.

To count subarrays with maximum at most `k`, you'd track the last position where an element exceeded `k`, and for each position, add the distance to that last exceeding position. This is similar to our main approach but formulated differently.

While this alternative requires implementing the counting function twice (once for `right` and once for `left - 1`), it demonstrates an important problem-solving technique: sometimes it's easier to count what you want by counting related things and combining them mathematically.

However, the direct approach we implemented is more intuitive and equally efficient, so it's generally preferred.

## 9. Practice Recommendations

To strengthen your understanding of this pattern, I recommend practicing these similar problems:

**LeetCode 907: Sum of Subarray Minimums** uses a very similar technique of tracking positions and counting contributions. It asks you to sum the minimums of all subarrays rather than count subarrays with bounded maximums.

**LeetCode 1438: Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit** involves tracking maximum and minimum values within a range constraint, combining ideas from this problem with sliding window techniques.

**LeetCode 2334: Subarray With Elements Greater Than Varying Threshold** requires you to think about how elements contribute to valid subarrays based on threshold conditions.

**LeetCode 2107: Number of Unique Flavors After Sharing K Candies** involves counting valid subarrays with constraints, helping you practice the state-tracking pattern.

**LeetCode 1358: Number of Substrings Containing All Three Characters** is great for practicing how to count subarrays efficiently based on certain conditions being met.

These problems will help you internalize the pattern of maintaining state during a linear scan to count subarrays efficiently.

## 10. Flowchart Design

Let me create a visual representation of our solution's logic:

---

## Wrapping Up Your Learning

You've now explored this problem from multiple angles. The core insight is recognizing that elements above your right boundary act as natural dividers, and you can efficiently count valid subarrays by tracking key positions as you scan through the array once.

The power of this approach lies in its ability to count many subarrays implicitly without generating them explicitly. Each position contributes a calculable number of subarrays based on the maintained state, which is a pattern you'll see in many competitive programming problems.

As you practice the recommended problems, focus on recognizing when you can solve a counting problem through a single pass with state tracking rather than nested loops. This shift in thinking is what separates linear-time solutions from quadratic ones.

Do you have any questions about the solution, or would you like me to walk through another example to solidify your understanding?

## Why Initialize to -1? A Deep Dive

Excellent question! This is a subtle but crucial detail that shows you're thinking deeply about the solution. Let me explain the reasoning from first principles.

## The Core Problem We're Solving

When we're at any position `i` in the array, we need to answer: "How many valid subarrays **end** at this position?" To answer this, we need to know where we can **start** these subarrays from.

The key constraint is: we can only start a subarray from positions that come **after** the most recent blocker (element > right). Any position at or before the blocker would include that blocker element in our subarray, making the maximum too large.

## Why -1 Specifically?

Let me walk you through the reasoning with concrete examples.

### Scenario 1: Valid Element at Index 0

Imagine our array starts with a valid element:

```javascript
nums = [2, 1, 3]  where left = 2, right = 3
         ↑
      index 0
```

When we're at index 0 with element 2 (which is in range), we want to count subarrays ending here. How many are there? Just one: `[2]` itself.

Using our formula: `count += i - lastBlockerIndex`

- `i = 0`
- `lastBlockerIndex = -1`
- So we add: `0 - (-1) = 1` ✓

This correctly counts 1 subarray. If we had initialized `lastBlockerIndex` to 0 instead, we'd get `0 - 0 = 0`, which would be wrong!

### Scenario 2: Element Below Range at Index 0

Now consider:

```javascript
nums = [1, 2, 3]  where left = 2, right = 3
         ↑
      index 0
```

At index 0, element 1 is below our range. Since we haven't seen any valid elements yet, we can't form any valid subarrays ending here. The count should be 0.

Using our formula: `count += lastValidIndex - lastBlockerIndex`

- `lastValidIndex = -1` (no valid element seen yet)
- `lastBlockerIndex = -1`
- So we add: `-1 - (-1) = 0` ✓

Perfect! If we had initialized these to 0, we'd incorrectly add `0 - 0 = 0`, which happens to work, but for the wrong reason. More importantly, once we see a valid element, the logic breaks.

### Scenario 3: The Real Test - After Seeing a Valid Element

Let's trace through a complete example to see why -1 is essential:

```javascript
nums = [2, 1]  where left = 2, right = 3
```

**At index 0:** Element is 2 (in range)

- `count += 0 - (-1) = 1`  → We've counted `[2]`
- Update: `lastValidIndex = 0`

**At index 1:** Element is 1 (below range)

- `count += lastValidIndex - lastBlockerIndex`
- `count += 0 - (-1) = 1`  → We've counted `[2, 1]`

Total: 2 subarrays ✓

If we had initialized to 0, at index 1 we'd calculate `0 - 0 = 0`, missing the valid subarray `[2, 1]`.

## The Mathematical Intuition

Think of -1 as representing "before the array begins" or "position of a conceptual boundary that doesn't exist."

When we calculate `i - lastBlockerIndex`, we're really asking: "How many positions can we start from?" These are all positions from `lastBlockerIndex + 1` up to `i` (inclusive).

The number of positions in this range is: `i - (lastBlockerIndex + 1) + 1 = i - lastBlockerIndex`

By setting `lastBlockerIndex = -1`, we're saying the "blocker" is at position -1 (before the array), so we can start from position 0 onwards.

## Visual Representation

Let me show you visually what -1 represents:

```javascript
Conceptual view:
                lastBlockerIndex = -1
                ↓
    [-1] [0] [1] [2] [3] [4]  ← indices
         [2] [1] [4] [3] ...  ← elements
         
The -1 position is a "virtual blocker" before the array starts.
This means initially, there's no real blocker, so all positions
from index 0 onwards are potentially valid starting points.
```

## What If We Used 0 Instead?

Let's see what breaks if we initialize to 0:

```javascript
// WRONG initialization
let lastValidIndex = 0;
let lastBlockerIndex = 0;

nums = [2, 1, 4, 3], left = 2, right = 3

At i=0 (element 2, in range):
  count += 0 - 0 = 0  ❌ WRONG! Should be 1

At i=1 (element 1, below range):
  count += 0 - 0 = 0  ❌ WRONG! Should be 1
```

The problem is that initializing to 0 means we're treating index 0 as if there's already a blocker or valid element there, which isn't true—we haven't processed anything yet!

## What About Using null or undefined?

In some languages, you might think about using `null` or `undefined`, but -1 is better because:

1. **It works seamlessly with arithmetic**: We can directly use it in our subtraction formula without special checks
2. **It's a common convention**: In many algorithms, -1 represents "not found" or "before the start"
3. **It's unambiguous**: -1 can never be confused with a valid array index (which start at 0)

## Alternative Perspective: Counting Contribution

Another way to understand -1 is through the lens of "contribution counting."

When we're at position `i` with a valid element, we ask: "How far back can I extend subarrays?" The answer is: back to position `lastBlockerIndex + 1` (the position right after the last blocker).

The number of subarrays is:

- Start from position `lastBlockerIndex + 1`, end at `i` → 1 subarray
- Start from position `lastBlockerIndex + 2`, end at `i` → 1 subarray
- ...
- Start from position `i`, end at `i` → 1 subarray

Total = `i - (lastBlockerIndex + 1) + 1 = i - lastBlockerIndex`

When `lastBlockerIndex = -1`, this becomes `i - (-1) = i + 1`, which correctly counts from position 0 to position `i`, giving us `i + 1` possible starting positions.

## Try It Yourself

To really solidify this, try running through this example with both initializations:

```javascript
nums = [3], left = 2, right = 3

With lastBlockerIndex = -1:
  At i=0: count += 0 - (-1) = 1 ✓ Correct!

With lastBlockerIndex = 0:
  At i=0: count += 0 - 0 = 0 ❌ Wrong!
```

The single valid subarray `[3]` is only counted correctly when we use -1.

## Key Takeaway

**Initializing to -1 represents "no blocker/valid element has been seen yet" or "there's a conceptual boundary before the array starts."** This allows our mathematical formulas to work correctly from the very first element without needing special case handling.

It's a elegant trick that simplifies the code: instead of checking "if this is the first element, handle it differently," we can use the same formula throughout because -1 naturally encodes the "nothing seen yet" state.

Does this explanation help clarify why -1 is the right choice? Would you like me to trace through another example to reinforce this concept?

## Debugging the Failed Test Case

Excellent catch! Let me trace through this failing test case step by step to identify the bug.

```javascript
nums = [16,69,88,85,79,87,37,33,39,34]
left = 55
right = 57
```

Let me trace through what our algorithm does:

```javascript
Index 0: nums[0] = 16 (below range, < 55)
  - lastValidIndex = -1, lastBlockerIndex = -1
  - count += -1 - (-1) = 0 ✓

Index 1: nums[1] = 69 (blocker, > 57)
  - lastBlockerIndex = 1
  - count += 0 (no addition for blockers) ✓

Index 2: nums[2] = 88 (blocker, > 57)
  - lastBlockerIndex = 2
  - count += 0 ✓

... and so on
```

Wait, I see the issue! Let me check the actual expected output for this test case. Since all elements are either below 55 or above 57, there should be **0 valid subarrays** because no element falls in the range [55, 57].

Let me verify our logic more carefully...

## The Bug Found

Actually, I need to reconsider. Looking at the code I provided earlier, let me trace through a simpler example where I suspect the issue might be:

```javascript
nums = [1, 2, 1], left = 2, right = 3
```

**Expected:** The valid subarrays are `[2]`, so answer = 1

**What our algorithm does:**

- Index 0: nums[0] = 1 (below), count += -1 - (-1) = 0 ✓
- Index 1: nums[1] = 2 (in range), count += 1 - (-1) = 2, lastValidIndex = 1 ✓
  - This counts: `[1,2]` and `[2]` = 2 subarrays
- Index 2: nums[2] = 1 (below), count += 1 - (-1) = 2
  - This counts: `[1,2,1]` and `[2,1]` = 2 subarrays
  
-**Total: 4 subarrays**

But wait! Let's check which subarrays are actually valid:

- `[1]`: max = 1 ❌ (below range)
- `[2]`: max = 2 ✓ (in range)
- `[1,2]`: max = 2 ✓ (in range)
- `[1]`: max = 1 ❌ (below range)
- `[2,1]`: max = 2 ✓ (in range)
- `[1,2,1]`: max = 2 ✓ (in range)

**Actual answer: 4 subarrays** ✓

Hmm, that works correctly. Let me trace the failing test case more carefully...

Actually, **I found the bug!** Let me trace through your specific test case:

```javascript
nums = [16,69,88,85,79,87,37,33,39,34]
left = 55, right = 57
```

Every element is either < 55 or > 57. There are NO elements in [55, 57]. So the answer should be **0**.

Let's trace our algorithm:

- Index 0: 16 (below), count += -1 - (-1) = 0, lastValidIndex = -1
- Index 1: 69 (blocker), lastBlockerIndex = 1
- Index 2: 88 (blocker), lastBlockerIndex = 2
- ...all remaining are either blockers or below range...

When we encounter elements below range, we do:

```javascript
count += lastValidIndex - lastBlockerIndex;
```

Since `lastValidIndex` stays at -1 (we never see a valid element), and blockers keep updating, we should get negative numbers or zero... Let me recalculate:

- Index 6: 37 (below), count += -1 - 5 = -6 ❌

**Ah! Here's the bug!** When we have never seen a valid element (`lastValidIndex = -1`), but we've seen blockers, we're adding negative numbers to our count!

## The Fix

We need to add a check: **only count contributions when we've actually seen a valid element**. If `lastValidIndex` is still -1, we can't form any valid subarrays.

Here's the corrected code:## Why This Fix Works

The key insight is: **we can only form valid subarrays that include elements below the range if there's at least one element in the valid range to "anchor" them.**

The condition `lastValidIndex > lastBlockerIndex` ensures:

1. We've seen at least one valid element (`lastValidIndex != -1`)
2. That valid element comes after the most recent blocker (`lastValidIndex > lastBlockerIndex`)

Let's verify with the failing test case:

```javascript
nums = [16,69,88,85,79,87,37,33,39,34]
left = 55, right = 57

Index 0: 16 (below), lastValidIndex=-1, lastBlockerIndex=-1
  - Check: -1 > -1? NO → count += 0 ✓

Index 1: 69 (blocker), lastBlockerIndex=1

Index 6: 37 (below), lastValidIndex=-1, lastBlockerIndex=5
  - Check: -1 > 5? NO → count += 0 ✓

...all remaining elements follow the same pattern...

Final count: 0 ✓
```

## Let's Verify With a Valid Example

```javascript
nums = [2,1,4,3], left = 2, right = 3

Index 0: 2 (in range), count += 0-(-1) = 1, lastValidIndex=0
Index 1: 1 (below), check: 0 > -1? YES → count += 0-(-1) = 1
Index 2: 4 (blocker), lastBlockerIndex=2
Index 3: 3 (in range), count += 3-2 = 1

Total: 3 ✓
```

Perfect! The fix correctly handles both cases.

## The Lesson

This is a great example of why **boundary conditions** and **edge cases** are so important. The original logic assumed we'd always eventually see a valid element, but that's not guaranteed. When `lastValidIndex` remains -1, we need special handling.

Try running the corrected code on your test cases. It should now pass all 46 tests! Let me know if you have any questions about the fix.
