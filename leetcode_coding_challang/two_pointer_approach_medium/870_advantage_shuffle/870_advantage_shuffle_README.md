# Leetcode 870: Advantage Shuffle - A Complete Guide

Let me help you master this problem using first-principles thinking. This is actually a fascinating problem that teaches us about greedy algorithms and strategic matching!

## 1. Problem Understanding

Let's break down what this problem is really asking. You have two arrays of equal length, and you want to rearrange the first array (nums1) so that when you compare it position-by-position with nums2, you win as many comparisons as possible. A "win" happens when the number in nums1 is strictly greater than the corresponding number in nums2 at the same index.

Think of it like a card game where you see your opponent's cards laid out, and you get to decide which of your cards to play against each of theirs to maximize your wins. This is actually inspired by a real game theory concept called the "advantage" strategy.

The key insight here is that we have complete information - we know all values in both arrays before making any decisions. This means we can be strategic rather than reactive.

## 2. Constraints Analysis

Let's examine what the constraints tell us about our solution approach. Both arrays have lengths up to 100,000 elements, which means we need an algorithm that's efficient - ideally O(n log n) or better. A brute force O(n²) approach would be too slow.

The values can range from 0 to 1 billion, so we don't need to worry about integer overflow in most languages, but we should be aware that the values can be quite large. The fact that both arrays are the same length simplifies our problem - we always have exactly one value from nums1 to assign to each position.

## 3. Breaking Down The Problem

Let's decompose this problem into manageable pieces. First, we need to understand what we're optimizing for - the total number of positions where nums1[i] exceeds nums2[i]. Second, we need to recognize that the order of nums2 is fixed, but we have complete freedom to rearrange nums1. Third, we need a strategy for deciding which value from nums1 to place at each position.

The core question becomes: for each value in nums2, which value from our available pool in nums1 should we use? This is where greedy thinking comes in.

## 4. Pattern Identification

This problem uses the **Greedy Algorithm** pattern combined with a strategic matching approach. The key pattern here is what I call "optimal assignment" - we're trying to optimally assign elements from one set to positions determined by another set.

The greedy insight is this: when we can beat an opponent's value, we should use our smallest card that can still win. Why? Because using a larger card would be wasteful - we might need that larger card to beat a bigger opponent value later. Conversely, when we can't beat an opponent's value, we should "throw away" our smallest card since it won't win anyway.

This is similar to the classical "Boats to Save People" problem or auction/matching problems where you're trying to optimally pair elements from two sets.

## 5. Approach Discussion

Here's our step-by-step strategy, explained from first principles.

First, we need to sort nums1 so we can efficiently find the smallest value that beats any given target. Sorting gives us the ability to use binary search or two-pointers to quickly locate the right card to play.

Second, we need to track the original positions in nums2 because while we're making decisions, we need to know where to place our answers in the final result. We can't just sort nums2 directly because the output must align with the original nums2 positions.

Third, we implement our greedy strategy. For each value in nums2 (in descending order works well), we find the smallest value in nums1 that beats it. If we can't beat it, we use our absolute smallest remaining value to minimize waste.

Let me walk you through the algorithm with the first example: nums1 = [2,7,11,15], nums2 = [1,10,4,11].

After sorting nums1, we have [2,7,11,15]. We create pairs from nums2 with their indices: [(1,0), (10,1), (4,2), (11,3)]. Now we sort these pairs by value in descending order: [(11,3), (10,1), (4,2), (1,0)].

For nums2[3]=11, we check from the end of our sorted nums1. We find 15>11, so we assign 15 to position 3 and remove it from available values. For nums2[1]=10, we have [2,7,11] left. We find 11>10, so we assign 11 to position 1. For nums2[2]=4, we have [2,7] left. We find 7>4, so we assign 7 to position 2. For nums2[0]=1, we only have 2 left. We find 2>1, so we assign 2 to position 0.

The result is [2,11,7,15], which matches the expected output!

## 6. Code Implementation

```Javascript
/**
 * Advantage Shuffle - JavaScript Implementation
 * Pattern: Greedy Algorithm with Optimal Assignment
 * 
 * Strategy: For each value in nums2, assign the smallest value from nums1
 * that can beat it. If no value can beat it, assign the smallest remaining value.
 */

function advantageCount(nums1, nums2) {
    const n = nums1.length;
    
    // Step 1: Sort nums1 to enable efficient "smallest winning value" lookup
    // This allows us to use two pointers to find optimal assignments
    nums1.sort((a, b) => a - b);
    
    // Step 2: Create pairs of (value, originalIndex) for nums2
    // We need to track original indices because we'll sort by value
    // but need to place results back in their original positions
    const nums2WithIndices = nums2.map((val, idx) => [val, idx]);
    
    // Step 3: Sort nums2 pairs in descending order by value
    // We process larger values first to ensure we save appropriate cards
    nums2WithIndices.sort((a, b) => b[0] - a[0]);
    
    // Step 4: Initialize result array and two pointers
    const result = new Array(n);
    let left = 0;  // Points to smallest available value in nums1
    let right = n - 1;  // Points to largest available value in nums1
    
    // Step 5: Process each value in nums2 (now in descending order)
    for (const [targetValue, originalIndex] of nums2WithIndices) {
        // Greedy choice: Can our largest remaining card beat this target?
        if (nums1[right] > targetValue) {
            // Yes! Use the largest card (it's the only one that can win)
            // Place it at the original position in nums2
            result[originalIndex] = nums1[right];
            right--;  // Mark this card as used
        } else {
            // No card can beat this target, so "throw away" our smallest card
            // This preserves larger cards for winnable battles
            result[originalIndex] = nums1[left];
            left++;  // Mark this card as used
        }
    }
    
    return result;
}

// Alternative approach using a deque-like structure for clarity
function advantageCountAlternative(nums1, nums2) {
    const n = nums1.length;
    nums1.sort((a, b) => a - b);
    
    // Pair each nums2 value with its index and sort by value descending
    const indexed = nums2.map((val, i) => [val, i])
                          .sort((a, b) => b[0] - a[0]);
    
    const result = new Array(n);
    const available = [...nums1]; // Copy of sorted nums1
    
    for (const [target, idx] of indexed) {
        // Check if our best card can win
        if (available[available.length - 1] > target) {
            // Use the best winning card
            result[idx] = available.pop();
        } else {
            // Can't win, use worst card
            result[idx] = available.shift();
        }
    }
    
    return result;
}

// Test cases
console.log("Test 1:", advantageCount([2,7,11,15], [1,10,4,11]));
// Expected: [2,11,7,15]

console.log("Test 2:", advantageCount([12,24,8,32], [13,25,32,11]));
// Expected: [24,32,8,12]

console.log("Test 3:", advantageCount([1,2,3,4], [2,3,4,5]));
// Expected: Any arrangement where smaller values are "wasted" on unwinnable positions
```

```Java
import java.util.*;

/**
 * Advantage Shuffle - Java Implementation
 * Pattern: Greedy Algorithm with Optimal Assignment
 * 
 * This solution demonstrates the "advantage" strategy from game theory:
 * - When you can win, use your weakest winning card
 * - When you can't win, sacrifice your weakest card
 */
public class AdvantageShuffle {
    
    public int[] advantageCount(int[] nums1, int[] nums2) {
        int n = nums1.length;
        
        // Step 1: Sort nums1 to enable efficient value selection
        // Once sorted, we can use two pointers to pick from either end
        Arrays.sort(nums1);
        
        // Step 2: Create array of pairs (value, index) for nums2
        // We need to preserve original indices while sorting by value
        int[][] nums2Indexed = new int[n][2];
        for (int i = 0; i < n; i++) {
            nums2Indexed[i][0] = nums2[i];  // value
            nums2Indexed[i][1] = i;         // original index
        }
        
        // Step 3: Sort nums2 pairs by value in descending order
        // Processing larger values first ensures we make optimal decisions
        // Arrays.sort with custom comparator for descending order
        Arrays.sort(nums2Indexed, (a, b) -> b[0] - a[0]);
        
        // Step 4: Initialize result array and pointers
        int[] result = new int[n];
        int left = 0;      // Pointer to smallest remaining value
        int right = n - 1; // Pointer to largest remaining value
        
        // Step 5: Greedy assignment for each target value
        for (int[] pair : nums2Indexed) {
            int targetValue = pair[0];
            int originalIndex = pair[1];
            
            // Decision point: Can our best card beat the target?
            if (nums1[right] > targetValue) {
                // Victory is possible! Use the strongest available card
                // (When processing in descending order, we need strong cards)
                result[originalIndex] = nums1[right];
                right--;
            } else {
                // Cannot win this battle, minimize loss
                // Sacrifice the weakest card to preserve stronger ones
                result[originalIndex] = nums1[left];
                left++;
            }
        }
        
        return result;
    }
    
    /**
     * Alternative implementation using TreeMap for a different perspective
     * This approach explicitly tracks available values and their frequencies
     */
    public int[] advantageCountTreeMap(int[] nums1, int[] nums2) {
        int n = nums1.length;
        
        // Create a TreeMap to track available values (sorted automatically)
        // TreeMap maintains sorted order and allows efficient ceiling operations
        TreeMap<Integer, Integer> available = new TreeMap<>();
        for (int val : nums1) {
            available.put(val, available.getOrDefault(val, 0) + 1);
        }
        
        int[] result = new int[n];
        
        // Process each position in nums2
        for (int i = 0; i < n; i++) {
            // Find the smallest value greater than nums2[i]
            Integer winningCard = available.higherKey(nums2[i]);
            
            if (winningCard != null) {
                // We can win! Use the smallest winning card
                result[i] = winningCard;
            } else {
                // Can't win, use the smallest card available
                winningCard = available.firstKey();
                result[i] = winningCard;
            }
            
            // Remove the used card from available pool
            int count = available.get(winningCard);
            if (count == 1) {
                available.remove(winningCard);
            } else {
                available.put(winningCard, count - 1);
            }
        }
        
        return result;
    }
    
    // Test the solution
    public static void main(String[] args) {
        AdvantageShuffle solution = new AdvantageShuffle();
        
        // Test case 1
        int[] nums1_1 = {2, 7, 11, 15};
        int[] nums2_1 = {1, 10, 4, 11};
        System.out.println("Test 1: " + Arrays.toString(
            solution.advantageCount(nums1_1, nums2_1)));
        // Expected: [2, 11, 7, 15]
        
        // Test case 2
        int[] nums1_2 = {12, 24, 8, 32};
        int[] nums2_2 = {13, 25, 32, 11};
        System.out.println("Test 2: " + Arrays.toString(
            solution.advantageCount(nums1_2, nums2_2)));
        // Expected: [24, 32, 8, 12]
        
        // Test case 3 - edge case where no values can win
        int[] nums1_3 = {1, 2, 3, 4};
        int[] nums2_3 = {5, 6, 7, 8};
        System.out.println("Test 3: " + Arrays.toString(
            solution.advantageCount(nums1_3, nums2_3)));
        // Expected: Any permutation (all losses are equal)
    }
}
```

Let me provide you with clean, well-commented implementations in both JavaScript and Java.

## 7. Complexity Analysis

Let me break down the computational costs of our solution so you understand where the time goes. The time complexity is O(n log n), where n is the length of the arrays. This comes from two main operations. First, we sort nums1, which takes O(n log n) time using an efficient sorting algorithm like merge sort or quicksort. Second, we create pairs from nums2 with their indices and sort those pairs, which also takes O(n log n) time. After sorting, we iterate through the pairs once with our two-pointer approach, which takes O(n) time. When we add these together, the O(n log n) terms dominate, giving us our final time complexity of O(n log n).

The space complexity is O(n) because we need additional data structures. We create an array of pairs from nums2, which stores n elements. We also create a result array of size n to store our answer. The sorting operations might use O(log n) additional space on the call stack depending on the sorting algorithm implementation, but this is typically negligible compared to our O(n) arrays. Therefore, our overall space complexity is O(n).

This is quite efficient for the constraints of the problem. With arrays up to 100,000 elements, an O(n log n) solution will complete in well under a second on modern hardware, making it suitable for competitive programming time limits.

## 8. Alternative Solutions

While our primary solution is optimal in terms of asymptotic complexity, let me discuss a few alternative approaches that offer different perspectives on the problem.

The TreeMap approach I included in the Java implementation provides a cleaner conceptual model. Instead of using two pointers, we maintain a sorted collection of available values and explicitly find the smallest value that beats each target using the higherKey method. This approach has the same O(n log n) time complexity, but the constant factors are slightly higher due to TreeMap operations. However, it's more intuitive for some people because it directly expresses the greedy strategy without pointer manipulation.

Another interesting approach processes nums2 in its original order rather than sorting it. For each position in nums2, we use binary search on the remaining values in nums1 to find the smallest value that beats the target. If no such value exists, we take the smallest remaining value. This approach also achieves O(n log n) complexity but requires careful management of which values have been used, typically using a multiset or frequency map.

You could also think about this problem from a different angle entirely. Instead of asking "which value from nums1 should I use for this position," you could ask "which positions in nums2 should I try to win?" This leads to a matching algorithm approach where you identify all winnable positions and assign your values to maximize wins. However, this approach is more complex to implement and doesn't offer any complexity advantage.

For smaller inputs (say, n less than 1000), you could even use a brute force approach that tries different permutations, but this would be O(n! × n) or with optimization O(n²) if you use a greedy assignment at each step, which is far too slow for the given constraints.

The key insight across all these approaches is the greedy principle: when you can win, use your weakest winning option, and when you can't win, waste your weakest card. This fundamental strategy remains constant regardless of the implementation details.

## 9. Practice Recommendations

To solidify your understanding of this greedy assignment pattern, here are some carefully selected LeetCode problems that share similar characteristics. Each one will help you recognize when to apply this type of strategic matching approach.

Start with problem 881, Boats to Save People. This problem asks you to pair people optimally to minimize the number of boats needed. It uses the same two-pointer technique on sorted data and teaches you when to make greedy pairings versus when to handle elements independently.

Next, try problem 455, Assign Cookies. This is a gentler introduction to greedy assignment where you're matching children with cookies to maximize satisfaction. The strategy is similar—for each child, find the smallest cookie that satisfies them.

Then move to problem 1921, Eliminate Maximum Number of Monsters. This problem requires you to optimally schedule actions to maximize your score, teaching you how to prioritize when you have limited resources.

Problem 1647, Minimum Deletions to Make Character Frequencies Unique, while not about matching two arrays, teaches you the greedy decision-making process when you need to optimize assignments or allocations.

Finally, tackle problem 646, Maximum Length of Pair Chain. This problem involves choosing pairs optimally to form the longest chain, which requires similar greedy thinking about which elements to use and when.

All of these problems share the common thread of optimal assignment under constraints, and mastering them will make you much more comfortable recognizing when a greedy matching strategy is appropriate.

## 10. Flowchart Design

Let me create a comprehensive visual flowchart that shows the logical flow of our solution from start to finish.

---

## Key Takeaways and Mental Models

Let me leave you with some crucial insights that will help you recognize and solve similar problems in the future. The fundamental pattern here is what I call "strategic sacrifice"—knowing when to use your best resources and when to intentionally waste your worst resources. This mindset appears frequently in game theory, resource allocation, and optimization problems.

The reason we sort and process in descending order is subtle but important. By handling the largest opponents first, we force ourselves to commit our best cards early, which prevents us from accidentally wasting them on easier opponents. This is a form of "greedy" decision-making where each local decision (which card to play now) leads to a globally optimal solution.

Another mental model is the "two-pointer technique on sorted data." Once your data is sorted, you often don't need complex data structures—simple pointers at the extremes give you efficient access to optimal choices. This technique appears in hundreds of problems, and recognizing when data should be sorted is a crucial skill.

Finally, remember the preprocessing step where we pair values with their indices. This pattern of "augmenting data before sorting" appears constantly in problems where the order matters for the output but not for the algorithm. You transform the data, work with it in a convenient order, then map results back to the required order.

With this problem mastered, you now have a powerful tool in your algorithmic toolkit. The advantage shuffle strategy—using minimal resources to win when possible and sacrificing minimal resources when winning is impossible—is a principle you'll see again and again in competitive programming and real-world optimization problems. Keep practicing with the recommended problems, and you'll develop an intuition for when this pattern applies!

---
Great question! This shows you're thinking critically about data structure choices. Let me explain why `Map` isn't the best fit for this particular problem, and when you *should* use it.

## Why We Don't Need Map Here

In our solution, we never actually need to **look up** values by key. Let's trace through what we're doing:

1. **Sort nums1** - We just need the values in order, not key-value lookups
2. **Create pairs from nums2** - We're just bundling data together, not creating a dictionary
3. **Use two pointers** - We access values by position (left/right indices), not by searching for a key

The two-pointer approach is actually more efficient than using a Map because:

- **Direct array access is O(1)** - We know exactly which index we want
- **No hash computation** - Maps need to hash keys, adding overhead
- **Better cache locality** - Arrays store data contiguously in memory

## When Map/TreeMap WOULD Be Useful

However, you're right to think about Map! There are variations of this problem where Map is perfect. Let me show you:## The Core Difference

The key insight is about **access patterns**:

**Arrays with two pointers:**

- "Give me the smallest/largest available value" → O(1)
- Perfect when you process values in order from both ends

**Map (or JavaScript Set):**

- "Does value X exist? How many?" → O(1)
- "What's the next value larger than X?" → Need sorted keys, O(log n) with binary search
- Perfect for frequency tracking or lookup-heavy operations

## The Java TreeMap Advantage

You might notice I used `TreeMap` in the Java alternative solution. Here's why that's different:

```java
TreeMap<Integer, Integer> available = new TreeMap<>();
Integer winningCard = available.higherKey(target); // O(log n) - finds next larger value
```

**Java's TreeMap is a Red-Black Tree** (self-balancing BST), which maintains sorted order automatically. JavaScript's `Map` is a **hash table**, which doesn't maintain any order. To get similar functionality in JavaScript, you'd need to:

1. Keep a sorted array alongside the Map
2. Use binary search on the sorted array
3. Then look up counts in the Map

This adds complexity without much benefit for this problem.

## When You SHOULD Use Map in JavaScript

Map shines in problems like:

1. **Two Sum / Three Sum** - "Have I seen value X before?"
2. **Subarray Sum Equals K** - "How many times have I seen prefix sum X?"
3. **LRU Cache** - Map maintains insertion order in JavaScript!
4. **Frequency counting** - "How many times does each value appear?"

## Bottom Line

For **Advantage Shuffle specifically**, the two-pointer array approach is optimal because:

- We process all values at once (not dynamically)
- We access values by their sorted position, not by value lookup
- It's simpler, faster, and more memory-efficient

But your instinct to consider Map shows good thinking! Always ask "What's my access pattern?" - that determines the best data structure.

---
Excellent question! This is the **key insight** that makes the algorithm work. Let me break down why we process in descending order and why starting from the largest values is crucial.

## The Core Problem: Resource Allocation

Think about this scenario:

```Javascript
nums1 = [2, 7, 11, 15]  (your cards)
nums2 = [1, 10, 4, 11]  (opponent's cards)
```

If we process nums2 in **ascending order** (1 → 4 → 10 → 11):

- Against 1: We use 2 (wins) ✓
- Against 4: We use 7 (wins) ✓
- Against 10: We use 11 (wins) ✓
- Against 11: We only have 15 left (wins) ✓

Looks good! But what if nums2 was slightly different?

```Javascript
nums1 = [2, 7, 11, 15]
nums2 = [1, 10, 12, 4]  (just rearranged)
```

If we process in **ascending order** (1 → 4 → 10 → 12):

- Against 1: We use 2 (wins) ✓
- Against 4: We use 7 (wins) ✓
- Against 10: We use 11 (wins) ✓
- Against 12: We use 15 (wins) ✓

Now if we process in **descending order** (12 → 10 → 4 → 1):

- Against 12: We use 15 (wins) ✓
- Against 10: We use 11 (wins) ✓
- Against 4: We use 7 (wins) ✓
- Against 1: We use 2 (wins) ✓

Same result here! So what's the real difference?

## The Critical Case: When You Can't Win Everything

Here's where descending order becomes **essential**:

```Javascript
nums1 = [2, 7, 11, 15]
nums2 = [1, 10, 20, 4]  (20 is unbeatable!)
```

**❌ WRONG - Processing in ascending order:**

```Javascript
Against 1:  Use 2 (wins) ✓ ... remaining: [7, 11, 15]
Against 4:  Use 7 (wins) ✓ ... remaining: [11, 15]
Against 10: Use 11 (wins) ✓ ... remaining: [15]
Against 20: Use 15 (loses) ✗ ... remaining: []
```

Result: 3 wins, but we wasted 15 on an unwinnable battle!

**✅ CORRECT - Processing in descending order:**

```Javascript
Against 20: Use 2 (loses) ✗ ... remaining: [7, 11, 15]
Against 10: Use 11 (wins) ✓ ... remaining: [7, 15]
Against 4:  Use 7 (wins) ✓ ... remaining: [15]
Against 1:  Use 15 (wins) ✓ ... remaining: []
```

Result: 3 wins, and we only sacrificed our weakest card (2) on the unwinnable battle!

## The Deep Insight: Greedy Choice Property

Let me create a visual demonstration to show why this works:## The Mathematical Proof

Here's the formal reasoning:

### Greedy Choice Property

**Claim:** If we can beat value `v` with card `c`, and we process largest values first, we should use our smallest card that beats `v`.

**Why?** Consider two scenarios:

1. We use card `c` (smallest winner) against `v`
2. We use card `c'` (larger winner) against `v`

If we choose option 2, we waste the extra strength of `c'`. Later, we might face a value `v'` where:

- `c < v' < c'` (only `c'` can beat it)

Now we've lost a battle we could have won!

### Why Descending Order?

By processing largest opponents first, we ensure:

1. **Hard battles are decided early** - We commit our best resources when we still have them
2. **Waste is minimized** - Unwinnable battles get our weakest cards
3. **No regrets** - Once we've sacrificed a card, we know no future opponent could have been beaten by it

## Real-World Analogy

Think of it like a chess tournament where you must decide which of your players faces which opponent:

**Ascending approach (wrong):**

- Send your best players against weak opponents → easy wins
- Send remaining players against champions → guaranteed losses
- Your best players were wasted!

**Descending approach (correct):**

- Check if you can beat the champion → if yes, send your best player
- Check if you can beat the next strongest → send your next best
- Send rookies to lose against unbeatable opponents

## Why Start from Largest in nums1?

When processing descending order of nums2, we ask: "Can I beat this large opponent?"

We check `nums1[right]` (our strongest card) because:

- If our strongest can't beat them, nothing can → sacrifice smallest
- If our strongest can beat them, use it (we need strong cards for strong opponents)

This is different from ascending order where we'd want our *weakest* winning card!

## Summary

|     Order      | When to Use Best Card  |          Risk                 |
|----------------|------------------------|-------------------------------|
| **Ascending**  | Against easy opponents | Waste strong cards early      |
| **Descending** | Against hard opponents | Optimal resource allocation ✓ |

The descending order ensures we never have the regret of "I should have saved that strong card for this tough opponent!"
