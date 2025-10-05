# LeetCode 763: Partition Labels - Complete Learning Guide

Let me guide you through this problem using first-principles thinking, breaking down every concept into its fundamental components.

---

## 1. Problem Understanding

### Simple Terms Explanation

Imagine you have a string of characters, and you need to cut it into pieces. The rule is: **once a letter appears in a piece, ALL occurrences of that letter must be in that same piece** (it cannot appear in any other piece).

**Key Insight:** Each letter must be "contained" within one partition.

**Example Walkthrough:**

- String: `"ababcbacadefegdehijhklij"`
- Letter 'a' appears at positions: 0, 2, 4, 6, 7
- Since 'a' last appears at position 7, our first partition must extend **at least** to position 7
- But wait! Position 7 has 'a', and between 0-7 we also have 'b' and 'c'
- 'b' last appears at position 5
- 'c' last appears at position 8 (aha! this extends our partition further)
- We keep extending until we've included the last occurrence of every letter we've seen

### Edge Cases to Consider

1. **Single character string:** `"a"` → Output: `[1]`
2. **All same characters:** `"aaaa"` → Output: `[4]`
3. **No repeated characters:** `"abcdef"` → Output: `[1,1,1,1,1,1]`
4. **All characters repeat throughout:** `"abcabc"` → Output: `[6]` (all letters intertwined)

---

## 2. Constraints Analysis

Let's understand what these constraints tell us:

### `1 <= s.length <= 500`

- **Small input size** → We can afford O(n²) solutions if needed, but O(n) is ideal
- No need to worry about integer overflow
- Can use arrays of fixed size (26 for lowercase letters)

### `s consists of lowercase English letters`

- **Limited character set** → Only 26 possible characters
- Can use array indexing instead of hash maps (slight optimization)
- Character to index: `char - 'a'` gives us 0-25

### **What constraints DON'T tell us:**

- Letters can appear multiple times (non-contiguous)
- Must return partition **sizes**, not the actual substrings
- Order matters (can't rearrange the string)

---

## 3. Break Down Into Manageable Parts

### Sub-problem 1: **Find Last Occurrence**

Before we can partition, we need to know where each letter last appears.

**Why?** If we're at position `i` with character `c`, and `c` last appears at position `j`, our current partition must extend **at least** to position `j`.

### Sub-problem 2: **Extend Partition Boundaries**

As we scan through the string:

- Track the **furthest point** we need to reach (based on all characters seen so far)
- When we reach that furthest point, we can "cut" the partition

### Sub-problem 3: **Record Partition Sizes**

Calculate the size of each partition as we identify the cut points.

---

## 4. Pattern Identification

### Primary Pattern: **Greedy Algorithm**

**Why Greedy Works Here:**

1. **Greedy Choice:** At each position, we extend our partition to include the last occurrence of the current character
2. **Optimal Substructure:** Once we finalize a partition, it doesn't affect future partitions (no dependencies)
3. **No backtracking needed:** We make one pass and commit to each partition boundary

### Supporting Pattern: **Hash Map / Array for Preprocessing**

Store the last occurrence of each character for O(1) lookups.

### Similar to: **Merge Intervals Pattern**

Think of each character as an "interval" from its first to last occurrence. We're essentially merging overlapping intervals!

---

## 5. Step-by-Step Approach

### Phase 1: Preprocessing (Record Last Occurrences)

```javascript
For each character in string:
    Record its last position
```

**Example:** `"ababcbacadefegdehijhklij"`

```javascript
a → last at index 8
b → last at index 5
c → last at index 7
d → last at index 14
...
```

### Phase 2: Partition Formation (Greedy Scan)

```javascript
Initialize:
    start = 0 (partition start)
    end = 0 (current partition must extend at least to here)
    result = []

For each position i from 0 to length-1:
    current_char = s[i]
    end = max(end, lastOccurrence[current_char])
    
    If i == end:  // We've reached the end of current partition
        partition_size = i - start + 1
        Add partition_size to result
        start = i + 1  // Next partition starts here
```

### Why This Works

1. **Extending `end`**: As we see new characters, we might need to extend the partition further
2. **When `i == end`**: We've seen all necessary characters and reached the required boundary
3. **Greedy guarantee**: We can safely cut here because no future character needs anything from this partition

---

## 6. Code Implementation

### JavaScript Solution

```javascript
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    // Phase 1: Record last occurrence of each character
    const lastOccurrence = new Map();
    
    for (let i = 0; i < s.length; i++) {
        lastOccurrence.set(s[i], i);
    }
    
    // Phase 2: Build partitions greedily
    const result = [];
    let start = 0;      // Start of current partition
    let end = 0;        // Current partition must extend at least to 'end'
    
    for (let i = 0; i < s.length; i++) {
        // Extend partition boundary if needed
        end = Math.max(end, lastOccurrence.get(s[i]));
        
        // If we've reached the boundary, finalize this partition
        if (i === end) {
            result.push(i - start + 1);
            start = i + 1;  // Next partition starts here
        }
    }
    
    return result;
};

// Example usage
console.log(partitionLabels("ababcbacadefegdehijhklij")); // [9, 7, 8]
console.log(partitionLabels("eccbbbbdec")); // [10]
```

### Java Solution

```java
class Solution {
    /**
     * Partition string so each letter appears in at most one part
     * @param s input string
     * @return list of partition sizes
     */
    public List<Integer> partitionLabels(String s) {
        // Phase 1: Record last occurrence of each character
        int[] lastOccurrence = new int[26]; // For 'a' to 'z'
        
        for (int i = 0; i < s.length(); i++) {
            lastOccurrence[s.charAt(i) - 'a'] = i;
        }
        
        // Phase 2: Build partitions greedily
        List<Integer> result = new ArrayList<>();
        int start = 0;      // Start of current partition
        int end = 0;        // Current partition must extend at least to 'end'
        
        for (int i = 0; i < s.length(); i++) {
            // Extend partition boundary if needed
            end = Math.max(end, lastOccurrence[s.charAt(i) - 'a']);
            
            // If we've reached the boundary, finalize this partition
            if (i == end) {
                result.add(i - start + 1);
                start = i + 1;  // Next partition starts here
            }
        }
        
        return result;
    }
}
```

### Key Code Insights

1. **Array vs HashMap (Java):** Using `int[26]` is faster than `HashMap<Character, Integer>` for fixed character sets
2. **Character to Index:** `s.charAt(i) - 'a'` maps 'a'→0, 'b'→1, ..., 'z'→25
3. **Two-phase approach:** Separation of concerns makes code cleaner and easier to debug

---

## 7. Complexity Analysis

### Time Complexity: **O(n)**

- **First pass:** O(n) to record last occurrences
- **Second pass:** O(n) to build partitions
- **Total:** O(n) + O(n) = **O(n)** where n = length of string

### Space Complexity: **O(1)** or **O(26)** → **O(1)**

**JavaScript:**

- `Map` stores at most 26 entries → O(26) = O(1)
- `result` array: O(number of partitions) ≤ O(n) in worst case
- **Overall:** O(n) for result

**Java:**

- `lastOccurrence` array: O(26) = O(1)
- `result` ArrayList: O(number of partitions) ≤ O(n)
- **Overall:** O(n) for result

**Note:** If we only count auxiliary space (excluding output), it's O(1)

### Why This is Optimal

- **Must read entire string** → Can't do better than O(n)
- **Must return all partition sizes** → Output is O(k) where k is number of partitions
- No unnecessary work or redundant scans

---

## 8. Alternative Solutions

### Alternative 1: Interval Merging Approach

**Concept:** Treat each character as an interval [firstOccurrence, lastOccurrence] and merge overlapping intervals.

```javascript
var partitionLabels = function(s) {
    // Create intervals for each unique character
    const intervals = new Map();
    
    for (let i = 0; i < s.length; i++) {
        if (!intervals.has(s[i])) {
            intervals.set(s[i], [i, i]);
        } else {
            intervals.get(s[i])[1] = i;
        }
    }
    
    // Sort intervals and merge them
    const sortedIntervals = Array.from(intervals.values())
        .sort((a, b) => a[0] - b[0]);
    
    const merged = [];
    let current = sortedIntervals[0];
    
    for (let i = 1; i < sortedIntervals.length; i++) {
        if (sortedIntervals[i][0] <= current[1]) {
            current[1] = Math.max(current[1], sortedIntervals[i][1]);
        } else {
            merged.push(current);
            current = sortedIntervals[i];
        }
    }
    merged.push(current);
    
    return merged.map(interval => interval[1] - interval[0] + 1);
};
```

**Complexity:**

- Time: O(n + k log k) where k ≤ 26 → O(n)
- Space: O(k) = O(26) = O(1)

**Trade-off:** More complex code, same complexity. Original solution is cleaner!

### Alternative 2: Recursive Approach (Not Recommended)

Could recursively find partitions, but adds unnecessary complexity and stack space.

---

## 9. Practice Recommendations

### Similar Problems (Greedy + Intervals)

1. **LeetCode 56 - Merge Intervals** ⭐⭐⭐
   - Core pattern: Merging overlapping intervals
   - Difficulty: Medium

2. **LeetCode 435 - Non-overlapping Intervals** ⭐⭐
   - Greedy choice on intervals
   - Difficulty: Medium

3. **LeetCode 452 - Minimum Number of Arrows to Burst Balloons** ⭐⭐
   - Similar interval greedy logic
   - Difficulty: Medium

4. **LeetCode 1288 - Remove Covered Intervals**
   - Interval containment
   - Difficulty: Medium

### Similar Problems (Greedy + String)

- 5. **LeetCode 767 - Reorganize String** ⭐⭐
  - Greedy character placement
  - Difficulty: Medium

- 6. **LeetCode 621 - Task Scheduler** ⭐⭐⭐
  - Greedy scheduling with constraints
  - Difficulty: Medium

### Practice Strategy

1. Start with **LeetCode 56** to master interval merging
2. Then do **LeetCode 435** for greedy interval selection
3. Return to **763** and see how much clearer it is!
4. Challenge yourself with **621** for a harder greedy problem

---

## 🎯 Key Takeaways

### Core Insights

1. **Greedy works when local optimal = global optimal** - Each partition boundary we choose is guaranteed to be optimal

2. **Preprocessing can simplify main logic** - Recording last occurrences upfront makes the main algorithm clean and efficient

3. **Think in terms of "requirements"** - As we scan, we track "how far must we go?" based on what we've seen

### Pattern Recognition

When you see problems involving:

- ✅ Partitioning/grouping with constraints
- ✅ "Each element must satisfy some condition"
- ✅ Can make local decisions without backtracking

Think: **Greedy algorithm with preprocessing!**

### Common Mistakes to Avoid

1. ❌ Trying to find all partitions at once (too complex)
2. ❌ Not considering that characters can appear non-contiguously
3. ❌ Forgetting to update `end` for every character, not just new ones
4. ❌ Using `i == end` instead of `i === end` in JavaScript (type coercion issues)

---

Would you like me to:

1. Walk through a specific example step-by-step with a visualization?
2. Explain any particular part in more detail?
3. Discuss how to recognize when to use greedy vs. other patterns?
4. Practice solving one of the recommended problems together?

---

Great question! Let's break down **why `i - start + 1`** using first principles.

---

## Understanding `i - start + 1`

### The Fundamental Concept: Counting Elements in a Range

When you have a range from position `start` to position `end` (inclusive), how many elements are there?

**Example:** Positions 2 to 5

```java
Index:  0  1  [2  3  4  5]  6  7
             ^-----------^
             start      end
```

Let's count: positions 2, 3, 4, 5 → **4 elements**

**Formula:** `end - start + 1` = `5 - 2 + 1` = **4** ✓

---

## Why Do We Need the "+1"?

### Visualization with Simple Example

```java
String: "abc"
Index:   0 1 2
```

**Scenario:** First partition goes from `start = 0` to `i = 2`

Without the +1:

```java
i - start = 2 - 0 = 2  ❌ (We have 3 characters: a, b, c)
```

With the +1:

```java
i - start + 1 = 2 - 0 + 1 = 3  ✓ (Correct!)
```

### Why This Happens: **Zero-Based Indexing**

In programming, we start counting from **0**, not 1. This creates an "off-by-one" situation:

```java
Position in string:  1st  2nd  3rd  (human counting)
Index in array:       0    1    2   (computer counting)
                      ^---------^
                    start       i
```

The **difference** between indices gives you the "gaps" between positions:

- From index 0 to index 2: there are **2 gaps**
- But there are **3 positions** (0, 1, 2)

To convert from "number of gaps" to "number of positions", we add 1.

---

## Step-by-Step Proof

Let's trace through the algorithm with `s = "ababcbacadefegdehijhklij"`:

### First Partition Discovery

```java
Index:  0  1  2  3  4  5  6  7  8  9  ...
Char:   a  b  a  b  c  b  a  c  a  d  ...
        ^-----------------------^
      start=0                  i=8
```

When `i = 8`, we've reached the end of the first partition.

**Characters in this partition:** a, b, a, b, c, b, a, c, a
**Count them:** 9 characters

**Using the formula:**

```Java
size = i - start + 1
     = 8 - 0 + 1
     = 9  ✓ Correct!
```

**Without the +1:**

```Java
size = i - start
     = 8 - 0
     = 8  ❌ Wrong! We're missing one character
```

### Second Partition

After first partition, `start` is updated:

```Java
Index:  9  10  11  12  13  14  15  16  ...
Char:   d   e   f   e   g   d   e   h  ...
        ^-----------------------^
      start=9                 i=15
```

**Characters:** d, e, f, e, g, d, e (7 characters)

**Using the formula:**

```Java
size = i - start + 1
     = 15 - 9 + 1
     = 7  ✓ Correct!
```

---

## Mathematical Intuition

Think of it as measuring distance on a ruler:

```Java
Ruler:  |-------|-------|-------|-------|
        0       1       2       3       4
        ^-------------------------------^
      start                             end
```

**Distance from 0 to 4:**

- If we subtract: `4 - 0 = 4` (this measures the "span" or "width")
- But we need to count the **marks** (0, 1, 2, 3, 4), not the spaces between them
- Number of marks: `4 - 0 + 1 = 5`

---

## Another Way to Think About It

### Alternative Formula (Equivalent)

```javascript
size = (end - start) + 1
```

Breaking it down:

- `(end - start)`: gives you the number of positions **after** start
- `+ 1`: adds the start position itself

**Example:**

```Java
start = 0, end = 2
Positions after start: end - start = 2 - 0 = 2 positions (index 1 and 2)
Plus the start itself: +1 (index 0)
Total: 2 + 1 = 3 positions (indices 0, 1, 2)
```

---

## Common Mistake: Forgetting the +1

```javascript
// ❌ WRONG
if (i === end) {
    result.push(i - start);  // Off by one!
    start = i + 1;
}

// Test case: s = "a"
// i = 0, start = 0
// size = 0 - 0 = 0  ❌ Should be 1!
```

```javascript
// ✓ CORRECT
if (i === end) {
    result.push(i - start + 1);  // Correct count
    start = i + 1;
}

// Test case: s = "a"
// i = 0, start = 0
// size = 0 - 0 + 1 = 1  ✓ Correct!
```

---

## Visual Summary---

## Quick Memory Trick 🧠

**"Inclusive Range Formula"**

When counting elements from position A to position B (both included):

```Java
Count = B - A + 1
```

The `+1` ensures you count **both endpoints**.

**Without +1:** You're counting the distance/span
**With +1:** You're counting the elements/positions

---

Does this clarify why we need the `+1`? Would you like me to show more examples or explain any other part of the algorithm?
