# Understanding Leetcode 986: Interval List Intersections

Let me guide you through this problem using first-principles thinking, building your understanding from the ground up.

## 1. Problem Understanding

At its heart, this problem is asking you to find where two sets of time periods overlap. Imagine you have two calendars, each showing busy time slots. You want to find all the times when both calendars show you're busy simultaneously.

Let's think about what an intersection really means. If one interval spans from 1 to 5, and another spans from 3 to 7, they overlap from 3 to 5. That's their intersection. The key insight is that an intersection only exists when the intervals actually touch or overlap.

Consider the edge cases that could trip us up. What if one list is empty? Then there can be no intersections at all. What if intervals just touch at a single point, like [1,3] and [3,5]? They intersect at the single point [3,3]. What if intervals don't overlap at all? Then we simply skip them and move on.

## 2. Constraints of the Problem

Let's examine what the constraints tell us about the problem structure. Each list can have up to 1000 intervals, which means we need an efficient solution but don't need anything extraordinarily optimized. The fact that intervals within each list are pairwise disjoint and sorted is crucial information that we'll leverage heavily.

"Pairwise disjoint" means no two intervals in the same list overlap with each other. This is powerful because it means once we've processed an interval, we never need to look back at it. The sorted order reinforces this property, creating a natural left-to-right progression through the data.

The constraint that at least one element exists across both lists combined prevents us from worrying about both lists being empty simultaneously, though one list could still be empty.

You're absolutely right! I glossed over those specific constraints. Let me break down exactly what each constraint tells us and how they help us solve the problem more confidently.

### Deep Dive into the Constraints

#### Constraint 1: `0 <= starti < endi <= 10^9`

**What it means:** Every interval's start is strictly less than its end, and all values are non-negative up to 1 billion.

**How it helps us:**

- **Guarantees valid intervals** - We never have to handle edge cases like `[5, 3]` (where start > end) or `[5, 5]` (a point masquerading as an interval)
- **All intervals have actual length** - Every interval spans at least from position X to position X+1, meaning there's real coverage
- **No negative numbers** - We don't need special logic for negative coordinates
- **Large value range** - We can't use an array-based approach (like creating a boolean array of size 10^9), forcing us toward a more algorithmic solution like two pointers

**Confidence boost:** When we calculate `max(start1, start2)` and `min(end1, end2)`, we know we're working with well-formed intervals, so our intersection logic is sound.

---

#### Constraint 2: `endi < starti+1` (for firstList)

**What it means:** Each interval's end point is strictly less than the next interval's start point.

This is the **"pairwise disjoint"** constraint in mathematical form. Let me illustrate:

```javascript
Interval i:   [3, 7]     endi = 7
Interval i+1: [10, 15]   starti+1 = 10

Check: 7 < 10 ✓ (They don't overlap or touch)
```

**How it helps us:**

- **Guarantees no overlap within the same list** - We'll never find `[3, 7]` and `[5, 10]` in the same list
- **Enables single-pass processing** - Once we move past an interval, we never need to reconsider it because no future interval can overlap with it
- **Justifies advancing our pointer** - When we advance pointer `i`, we know we're done with `firstList[i]` forever. It cannot intersect with any remaining intervals in the second list beyond what we've already checked
- **Proves correctness** - This constraint is why our greedy approach works. We can make local decisions (which pointer to advance) without worrying about missing intersections later

**What would break without this?**
Imagine if firstList was `[[1,5], [3,8], [10,15]]` (violating this constraint):

- Our algorithm would compare `[1,5]` with secondList intervals, advance when it ends
- We'd miss that `[3,8]` might intersect with intervals we already passed!
- We'd need backtracking or a more complex approach

---

#### Constraint 3: `0 <= startj < endj <= 10^9` (for secondList)

**What it means:** Same as Constraint 1, but for the second list.

**How it helps us:** Identical reasoning - all intervals in secondList are valid and well-formed.

---

#### Constraint 4: `endj < startj+1` (for secondList)

**What it means:** Same as Constraint 2, but for the second list - intervals are pairwise disjoint.

**How it helps us:**

- **Symmetrical reasoning** - Just as we can advance pointer `i` confidently, we can advance pointer `j` confidently
- **Both lists behave predictably** - The algorithm treats both lists uniformly because they both have the same structural guarantees
- **No complex merging needed** - If intervals within secondList could overlap, we'd need to merge them first before comparing with firstList

---

### The Combined Power of These Constraints

When we put all four constraints together, here's what we gain:

#### 1. **The Two-Pointer Approach is Provably Correct**

Without these constraints, we couldn't guarantee that advancing a pointer wouldn't cause us to miss intersections. Let me show you why:

```javascript
// Our decision logic:
if (end1 < end2) {
    i++;  // Move to next interval in firstList
} else {
    j++;  // Move to next interval in secondList
}
```

**Why this works:**

- If `end1 < end2`, then `firstList[i]` ends before `secondList[j]`
- By Constraint 2, all future intervals in firstList start AFTER `end1`
- Therefore, `firstList[i]` cannot possibly intersect with any `secondList[k]` where `k > j`
- We're safe to move on from `firstList[i]` permanently

The constraints **mathematically prove** we won't miss any intersections!

#### 2. **Optimal O(n + m) Time Complexity is Guaranteed**

Each pointer moves forward exactly once per interval:

- Pointer `i` visits each of the `n` intervals in firstList exactly once
- Pointer `j` visits each of the `m` intervals in secondList exactly once
- Total operations: `n + m`

Without the "pairwise disjoint" constraints, we might need nested loops or backtracking, giving us O(n × m) time.

#### 3. **No Edge Cases to Handle**

We don't need to check for:

- Invalid intervals (start > end)
- Overlapping intervals within the same list
- Negative coordinates
- Integer overflow (10^9 fits comfortably in 32-bit integers)

Our code can be clean and simple!

#### 4. **The Intersection Check is Simple**

```javascript
const intersectionStart = Math.max(start1, start2);
const intersectionEnd = Math.min(end1, end2);

if (intersectionStart <= intersectionEnd) {
    // Valid intersection exists
}
```

Because of Constraint 1 and 3 (`start < end` for all intervals), we know:

- If our calculated intersection has `start <= end`, it's valid
- If `start > end`, there's no overlap - and that's the ONLY case we need to check

---

### Practical Example: Why These Constraints Matter

Let's see what happens if we violate these constraints:

#### Scenario 1: Violating "pairwise disjoint" (Constraint 2)

```javascript
// Without the constraint:
firstList = [[1,5], [3,8], [10,15]]  // [1,5] and [3,8] overlap!
secondList = [[4,6]]

// Our algorithm would do:
// Step 1: Compare [1,5] and [4,6] → intersection [4,5] ✓
// Step 2: Advance i (because end1=5 < end2=6)
// Step 3: Compare [3,8] and [4,6] → intersection [4,6] ✓
// But we MISSED the [3,5] overlap between [3,8] and secondList!
```

**The constraint prevents this chaos!**

#### Scenario 2: Violating "start < end" (Constraint 1)

```javascript
// Without the constraint:
firstList = [[5,5]]  // A point, not an interval
secondList = [[3,7]]

// What's the intersection?
intersectionStart = max(5,3) = 5
intersectionEnd = min(5,7) = 5
// Is 5 <= 5? Yes! So we'd say [5,5] is the intersection.

// But is a single point really an interval? 
// The constraint says NO - intervals must have start < end
// This prevents philosophical debates in our code!
```

---

## How to Use These Constraints When Problem Solving

When you see similar constraints in other problems, ask yourself:

1. **"Are elements sorted?"** → Consider two-pointers or binary search
2. **"Are elements disjoint/non-overlapping?"** → You can process once and move on (no backtracking needed)
3. **"Are values in a bounded range?"** → Helps you choose data structures and avoid overflow
4. **"Are all elements valid?"** → Reduces edge cases you need to handle

These constraints are **gifts from the problem setter** - they're telling you: "You can safely use this efficient approach because I've guaranteed these properties!"

---

## Summary Table

| Constraint             | What It Guarantees        | How It Helps Our Solution        |
|------------------------|---------------------------|----------------------------------|
| `starti < endi`        | All intervals are valid   | Simple intersection logic works  |
| `endi < starti+1`      | No overlaps in firstList  | Can advance pointer i safely     |
| `startj < endj`        | All intervals are valid   | Simple intersection logic works  |
| `endj < startj+1`      | No overlaps in secondList | Can advance pointer j safely     |
| Sorted order (implied) | Lists are ordered         | Two-pointer approach is possible |

**The bottom line:** These constraints transform what could be a complex O(n × m) nested loop problem with lots of edge cases into an elegant O(n + m) two-pointer solution with clean, simple code. They're not just boring fine print - they're the **architectural foundation** that makes the optimal solution possible!

## 3. Highlight Keywords

The keywords that should jump out at you are "sorted order," "pairwise disjoint," and "intersection." When you see sorted data in an interview problem, you should immediately think about traversal-based solutions. The word "intersection" in the context of intervals should trigger your mental model of overlap conditions.

Another subtle but important keyword is "closed interval," which means the endpoints are included. This matters when intervals touch at exactly one point—they still have an intersection.

## 4. Break Down the Problem Into Manageable Parts

Let's decompose this problem into bite-sized pieces. First, we need to understand when two individual intervals intersect. Second, we need to figure out how to systematically compare intervals from two lists. Third, we need to determine when to advance our position in each list.

The intersection detection problem reduces to a simple mathematical question: Given intervals [a, b] and [c, d], when do they overlap? They overlap when the maximum of their starting points is less than or equal to the minimum of their ending points. If we call the maximum start "maxStart" and the minimum end "minEnd," then an intersection exists when maxStart ≤ minEnd, and the intersection is exactly [maxStart, minEnd].

For systematically comparing intervals, we can't just compare all pairs—that would be inefficient. Instead, we should use the sorted property. We can maintain pointers to our current position in each list and advance them intelligently.

The question of when to advance which pointer is the trickiest part. The key realization is that whichever interval ends first cannot possibly intersect with any future intervals from the other list. Therefore, we should advance the pointer whose current interval ends earlier.

## 5. Pattern Identification

This problem exemplifies the **Two Pointers** pattern, specifically applied to merging or comparing sorted sequences. The pattern works beautifully here because both lists are sorted, allowing us to process them in a single pass without backtracking.

You'll recognize this pattern in problems involving sorted arrays or lists where you need to find relationships between elements. The telltale signs are sorted input and the need to process elements from multiple sources simultaneously.

## 6. Approach Discussion

Let me walk you through the solution strategy step by step, explaining the reasoning behind each decision.

We start by initializing two pointers, one for each list, both starting at index 0. These pointers represent the intervals we're currently examining.

At each step, we check whether the current intervals from both lists intersect. To determine this, we find the maximum of the two starting points and the minimum of the two ending points. If maxStart ≤ minEnd, we have an intersection that spans from maxStart to minEnd, and we add this to our result.

After checking for an intersection (whether one exists or not), we need to decide which pointer to advance. Here's the key insight: the interval that ends first has no chance of intersecting with future intervals from the other list, because all future intervals start after the current one ends (remember, the lists are sorted and disjoint). So we advance the pointer whose current interval ends earlier.

We continue this process until we've exhausted at least one of the lists. Once either pointer reaches the end of its list, we're done—there can be no more intersections.

## 7. Code Implementation

### **Javascript**

```Javascript
/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
function intervalIntersection(firstList, secondList) {
    // Result array to store all intersections
    const result = [];
    
    // Two pointers, one for each list
    let i = 0; // pointer for firstList
    let j = 0; // pointer for secondList
    
    // Continue while both pointers are within their respective lists
    while (i < firstList.length && j < secondList.length) {
        // Get current intervals from both lists
        const [start1, end1] = firstList[i];
        const [start2, end2] = secondList[j];
        
        // Find the intersection boundaries
        // The intersection starts at the later of the two starts
        const intersectionStart = Math.max(start1, start2);
        // The intersection ends at the earlier of the two ends
        const intersectionEnd = Math.min(end1, end2);
        
        // Check if there's an actual intersection
        // If the start is <= end, the intervals overlap
        if (intersectionStart <= intersectionEnd) {
            result.push([intersectionStart, intersectionEnd]);
        }
        
        // Move the pointer whose interval ends first
        // This interval cannot intersect with any future intervals from the other list
        if (end1 < end2) {
            i++; // firstList's current interval ends first, move to next
        } else {
            j++; // secondList's current interval ends first (or they end together)
        }
    }
    
    return result;
}

// Test cases
console.log("Example 1:");
const firstList1 = [[0,2],[5,10],[13,23],[24,25]];
const secondList1 = [[1,5],[8,12],[15,24],[25,26]];
console.log(intervalIntersection(firstList1, secondList1));
// Expected: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

console.log("\nExample 2:");
const firstList2 = [[1,3],[5,9]];
const secondList2 = [];
console.log(intervalIntersection(firstList2, secondList2));
// Expected: []

console.log("\nEdge case - touching intervals:");
const firstList3 = [[1,3],[5,7]];
const secondList3 = [[3,5]];
console.log(intervalIntersection(firstList3, secondList3));
// Expected: [[3,3],[5,5]]
```

### **Java**

```Java
import java.util.*;

class Solution {
    /**
     * Finds all intersections between two lists of intervals
     * @param firstList - first sorted list of disjoint intervals
     * @param secondList - second sorted list of disjoint intervals
     * @return list of all intersections between the two lists
     */
    public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {
        // Use a list to dynamically collect intersections
        List<int[]> result = new ArrayList<>();
        
        // Two pointers, one for each list
        int i = 0; // pointer for firstList
        int j = 0; // pointer for secondList
        
        // Continue while both pointers are within their respective lists
        while (i < firstList.length && j < secondList.length) {
            // Extract current intervals for clarity
            int start1 = firstList[i][0];
            int end1 = firstList[i][1];
            int start2 = secondList[j][0];
            int end2 = secondList[j][1];
            
            // Calculate the potential intersection boundaries
            // The intersection starts at the later of the two starts
            int intersectionStart = Math.max(start1, start2);
            // The intersection ends at the earlier of the two ends
            int intersectionEnd = Math.min(end1, end2);
            
            // Check if there's a valid intersection
            // If the start is <= end, the intervals overlap
            if (intersectionStart <= intersectionEnd) {
                result.add(new int[]{intersectionStart, intersectionEnd});
            }
            
            // Advance the pointer whose interval ends first
            // This interval has no chance of intersecting with future intervals
            // from the other list since both lists are sorted
            if (end1 < end2) {
                i++; // firstList's current interval ends first
            } else {
                j++; // secondList's current interval ends first or they end together
            }
        }
        
        // Convert the ArrayList to a 2D array for return
        return result.toArray(new int[result.size()][]);
    }
    
    // Helper method for testing
    private static void printIntervals(int[][] intervals) {
        System.out.print("[");
        for (int i = 0; i < intervals.length; i++) {
            System.out.print("[" + intervals[i][0] + "," + intervals[i][1] + "]");
            if (i < intervals.length - 1) System.out.print(",");
        }
        System.out.println("]");
    }
    
    // Test cases
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        System.out.println("Example 1:");
        int[][] firstList1 = {{0,2},{5,10},{13,23},{24,25}};
        int[][] secondList1 = {{1,5},{8,12},{15,24},{25,26}};
        printIntervals(solution.intervalIntersection(firstList1, secondList1));
        // Expected: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
        
        System.out.println("\nExample 2:");
        int[][] firstList2 = {{1,3},{5,9}};
        int[][] secondList2 = {};
        printIntervals(solution.intervalIntersection(firstList2, secondList2));
        // Expected: []
        
        System.out.println("\nEdge case - touching intervals:");
        int[][] firstList3 = {{1,3},{5,7}};
        int[][] secondList3 = {{3,5}};
        printIntervals(solution.intervalIntersection(firstList3, secondList3));
        // Expected: [[3,3],[5,5]]
    }
}
```

Let me show you how this translates to code in both JavaScript and Java.

## 8. Complexity Analysis

Let me break down the computational costs of this solution so you can understand its efficiency.

For time complexity, we traverse each list exactly once. Each interval in both lists is examined at most once because our pointers only move forward and never backtrack. If the first list has n intervals and the second has m intervals, we perform at most n + m iterations. Each iteration does constant time work: comparing starts and ends, possibly adding to the result array. Therefore, the time complexity is O(n + m), which is optimal because we must at least look at every interval once to determine all intersections.

The space complexity requires more careful consideration. We need to store the result array, which in the worst case could contain n + m intersections (imagine if every interval from the first list intersects with every interval from the second list in some overlapping fashion). However, if we don't count the output array as part of the space complexity (a common convention in algorithm analysis), then we only use O(1) extra space for our two pointer variables and temporary variables for storing starts and ends.

This linear time complexity is what makes the two-pointer approach so elegant. A naive approach of comparing every interval from the first list with every interval from the second would give us O(n × m) time complexity, which would be much slower for large inputs.

## 9. Alternative Solutions

While the two-pointer approach is the most elegant and efficient solution for this problem, let me discuss what other approaches you might consider and why they fall short.

The brute force approach would involve nested loops, checking every interval from the first list against every interval from the second list. This would work correctly but would have O(n × m) time complexity. You'd iterate through all pairs, compute intersections where they exist, and collect them. The problem with this approach is that it completely ignores the sorted property of the input, throwing away valuable information that could make our solution more efficient.

Another approach might involve binary search. Since the lists are sorted, you could theoretically use binary search to find potential intersecting intervals. However, this becomes complicated quickly because intervals have both a start and end point, and you'd need to carefully handle the cases where intervals partially overlap. The implementation would be more complex than the two-pointer approach and wouldn't actually be faster—you'd still end up with O(n + m) in the average case because you need to examine each interval.

You might also think about using a sweep line algorithm, which is powerful for many interval problems. In a sweep line approach, you'd create events for the start and end of each interval, sort all events together, and process them in order while tracking which intervals are currently active. However, this approach would require O((n + m) log(n + m)) time for sorting and would be overkill for this problem since our input is already sorted.

The two-pointer solution wins because it's simple to implement, easy to understand, optimal in time complexity, and uses minimal extra space. It directly leverages the sorted and disjoint properties of the input.

## 10. Practice Recommendations

To solidify your understanding of this pattern, I recommend working through these related problems that use similar concepts.

Start with Merge Two Sorted Lists (LeetCode 21). This is simpler than interval intersections but uses the same two-pointer pattern on sorted data. It'll help you internalize the core concept of maintaining two pointers and advancing them based on comparison conditions.

Next, try Merge Intervals (LeetCode 56), which asks you to merge overlapping intervals in a single list. This will deepen your understanding of how intervals relate to each other and how to detect and handle overlaps.

Then tackle Insert Interval (LeetCode 57), where you insert a new interval into a sorted list of non-overlapping intervals and merge if necessary. This combines interval manipulation with the challenge of maintaining sorted order.

For a more challenging problem, try Employee Free Time (LeetCode 759), which involves finding common free time slots across multiple employees' schedules. This is essentially finding gaps between merged intervals across multiple lists.

Another excellent practice problem is Meeting Rooms II (LeetCode 253), which asks you to find the minimum number of meeting rooms required. This uses a sweep line approach but reinforces your understanding of interval relationships.

Finally, try Non-overlapping Intervals (LeetCode 435), which asks you to remove the minimum number of intervals to make the rest non-overlapping. This problem requires deeper thinking about interval properties and greedy algorithms.

## 11. Flowchart Design

---

## Key Takeaways

Now that we've worked through this problem together, let me highlight the most important insights you should carry forward to other problems.

The fundamental realization is that when you have sorted data, you should immediately consider whether a traversal-based approach like two pointers could work. Sorted data is a gift from the problem setter because it allows you to process information in a single pass without backtracking, leading to optimal linear time solutions.

For interval problems specifically, understanding when two intervals intersect is crucial. The mathematical condition that the maximum of the starts must be less than or equal to the minimum of the ends is elegant and universally applicable. This same logic appears in countless interval problems, so internalize it deeply.

The decision of which pointer to advance is often the trickiest part of two-pointer problems. The key is to ask yourself which element has been "exhausted" or can no longer contribute to future comparisons. In this problem, whichever interval ends first cannot possibly intersect with any remaining intervals from the other list, making the decision clear and unambiguous.

Understanding why we don't need to backtrack is essential. Because both lists are sorted and disjoint, once an interval ends, it's completely finished—we'll never need to revisit it. This property is what makes the linear time complexity possible.

As you practice more problems, you'll start to recognize these patterns more quickly. The sorted input, the need to compare elements from two sources, and the requirement to find relationships between elements are all signals that point toward the two-pointer pattern. With practice, identifying the right pattern becomes almost automatic, and then you can focus your mental energy on the specific details of implementation rather than figuring out the overall approach.

Keep practicing with the recommended problems, and you'll find that interval problems become one of your strengths in competitive programming!

---

**Data Extraction
(Array Destructuring)**

The first two lines use destructuring to pull the individual numbers out of the nested arrays:

const `[start1, end1] = firstList[i]`; takes an interval like [5, 10] and assigns start1 = 5 and end1 = 10.

const `[start2, end2] = secondList[j]`; does the same for the second list's current interval.

**The Overlap Rule**
For any two intervals to intersect, the start of their overlap is the latest starting point, and the end of their overlap is the earliest ending point.
`Math.max(start1, start2)`: An intersection cannot begin until both intervals have started. Therefore, you must take the larger (later) of the two starting values.

`Math.min(end1, end2)`: An intersection must end as soon as either interval ends. Therefore, you must take
the smaller (earlier) of the two ending values.

**Example
Scenario**

Imagine these two time ranges:

`Range A: [10, 20] (Starts at 10, ends at 20)`

`Range B: [15, 25] (Starts at 15, ends at 25)`

**Applying the code:**

`intersectionStart = Math.max(10, 15) → 15`

`intersectionEnd = Math.min(20, 25) → 20`

`The intersection is [15, 20].`

**How to Tell
if They Actually Intersect**

This code calculates the potential boundaries, but it does not check if an intersection actually exists.

Overlap exists if intersectionStart <= intersectionEnd.

No overlap if intersectionStart > intersectionEnd (e.g., if the calculated start is 15 but the calculated end is 10)
