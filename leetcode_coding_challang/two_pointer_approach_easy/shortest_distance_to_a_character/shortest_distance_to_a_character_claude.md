# **821. Shortest Distance to a Character**

I'll help you solve this problem with a beginner-friendly JavaScript solution and break down the approach step by step.

Let's first discuss the problem's core challenge:

- for each character in the string, we need to find the shortest distance to the target character.
- This requires an efficient way to track the positions of the target character and calculate minimum distances.

Here's a solution with a detailed explanation:

Now, let me break down the solution and explain the approach in detail:

## Problem Analysis

The problem asks us to create an array where each element represents the shortest distance to a specific character in the string. This requires us to:

1. Identify all positions of the target character
2. For each index in the string, find the minimum distance to the target character

### Solution Strategy

Our solution uses a two-step approach:

1. **Target Index Tracking**: First, we find and store all the indices where the target character appears.
2. **Distance Calculation**: For each index in the string, we calculate the minimum distance to any of the target character's positions.

### Detailed Code Walkthrough

#### Step 1: Find Target Character Indices

```javascript
const targetIndices = [];
for (let i = 0; i < s.length; i++) {
  if (s[i] === c) {
    targetIndices.push(i);
  }
}
```

- We create an empty array `targetIndices`
- We loop through the entire string
- Whenever we find the target character, we store its index
- This gives us a list of all positions where the character appears

#### Step 2: Initialize Result Array

```javascript
const result = new Array(s.length).fill(Infinity);
```

- We create an array of the same length as the input string
- Initially fill it with `Infinity` to ensure we can find minimum distances
- `Infinity` acts as a placeholder that will be replaced by actual distances

#### Step 3: Calculate Minimum Distances

```javascript
for (let i = 0; i < s.length; i++) {
  for (const targetIndex of targetIndices) {
    result[i] = Math.min(result[i], Math.abs(i - targetIndex));
  }
}
```

- We loop through each index of the string
- For each index, we check its distance to every target character index
- `Math.abs(i - targetIndex)` calculates the absolute distance
- `Math.min()` ensures we keep the smallest distance found

### Initial Solution Complexity Analysis

- **Time Complexity**: O(n \* m), where
  - n is the length of the string
  - m is the number of target character occurrences
- **Space Complexity**: O(m), where m is the number of target character occurrences

### Important Takeaways

1. Sometimes solving a problem involves breaking it into smaller, manageable steps
2. Tracking indices can be crucial in string and array problems
3. Using `Infinity` as an initial value helps in finding minimum values
4. `Math.abs()` is great for calculating distances

### Optimization Challenge

While this solution is straightforward and easy to understand, there's room for optimization.
Can you think of a way to solve this in O(n) time complexity?

Here's a hint: You could make two passes through the string - one from left to right and another from right to left - to calculate distances more efficiently.

Would you like me to elaborate on the optimization approach or explain any part of the solution in more depth?

I'll explain an optimized approach that reduces the time complexity to O(n) and show you how we can solve this problem more efficiently.

Let me break down this optimized approach in detail, explaining the key insights and strategy.

### The Two-Pass Strategy

The core optimization comes from using two passes through the string, which allows us to calculate the shortest distances in linear time O(n). Let's dive into the mental model and step-by-step reasoning:

#### First Pass: Left to Right

```javascript
let prev = -Infinity;
for (let i = 0; i < n; i++) {
  if (s[i] === c) {
    prev = i;
  }
  result[i] = Math.abs(i - prev);
}
```

**Mental Model**: Imagine you're walking through the string from left to right with a "memory" of the most recent target character you've seen.

- Start with `prev` as negative infinity to handle the case before seeing the first target character
- Whenever you find the target character, update `prev`
- For each position, calculate its distance to the most recent target character seen

**Example Walkthrough**:
Let's take the string "loveleetcode" with target 'e'

- First 'l': No 'e' seen yet, so distance calculations will be very large
- When you hit first 'e' at index 3: Now you can calculate meaningful distances
- Subsequent positions will have distances based on this first 'e'

#### Second Pass: Right to Left

```javascript
let next = Infinity;
for (let i = n - 1; i >= 0; i--) {
  if (s[i] === c) {
    next = i;
  }
  result[i] = Math.min(result[i], Math.abs(i - next));
}
```

**Mental Model**: Now walk backwards, tracking the next occurrence of the target character.

- Start with `next` as infinity to handle the case after the last target character
- Whenever you find the target character, update `next`
- Compare the current distance with the distance to the next target character
- Take the minimum of these two distances

**Why Two Passes Work**:

- First pass captures distances to previous occurrences
- Second pass captures distances to future occurrences
- By taking the minimum, we get the truly shortest distance

### Complexity Analysis

- **Time Complexity**: O(n)
  - First pass: O(n)
  - Second pass: O(n)
  - Total: O(n)
- **Space Complexity**: O(1) extra space
  - We only use a constant amount of extra space (`prev`, `next`)
  - The result array doesn't count towards extra space as it's the required output

### Key Learning Points

1. Two-pass algorithms can solve problems more efficiently than single-pass solutions
2. Tracking positions from different directions can reveal insights
3. Linear time complexity often involves clever traversal strategies

### Comparative Analysis

**Original Solution**:

- Time Complexity: O(n \* m)
- Intuitive, easier to understand
- Works by checking all target character positions for each index

**Optimized Solution**:

- Time Complexity: O(n)
- More efficient
- Requires more nuanced thinking
- Uses directional tracking to minimize comparisons

### Mental Exercise

Try to solve this problem in your mind by walking through the two-pass approach with the string "loveleetcode" and target 'e'.

- What happens in the first pass?
- How do the distances change in the second pass?
- Can you trace the minimum distance calculations?

Would you like me to elaborate on any part of this explanation or walk you through a detailed example step by step?

Absolutely! I'll walk you through a detailed, step-by-step breakdown of the optimized solution using the example string "loveleetcode" with the target character 'e'. I'll break this down visually and conceptually to help you understand exactly what's happening in each pass.

### Problem Setup

- **String**: "loveleetcode"
- **Target Character**: 'e'
- **String Length**: 12 characters (0-indexed)

### First Pass: Left to Right (Initial Pass)

Let's go through this pass meticulously, tracking our variables and calculations.

#### Initial State (First Pass)

- `result` array: `[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`
- `prev`: `-Infinity`

#### Step-by-Step Walkthrough

1. **Index 0 ('l')**:

   - No 'e' seen yet
   - `prev` is still `-Infinity`
   - `result[0] = Math.abs(0 - (-Infinity))` → Very large number

2. **Index 1 ('o')**:

   - Still no 'e' seen
   - `prev` remains `-Infinity`
   - `result[1] = Math.abs(1 - (-Infinity))` → Very large number

3. **Index 2 ('v')**:

   - No change in `prev`
   - Continues with large distance calculations

4. **Index 3 ('e')**:

   - First 'e' found!
   - `prev` becomes `3`
   - `result[3] = Math.abs(3 - 3)` → `0`
   - This is our first concrete distance

5. **Index 4 ('l')**:

   - `prev` is still `3`
   - `result[4] = Math.abs(4 - 3)` → `1`

6. **Continuing the Pass**:
   As we move through the string, distances will be calculated relative to the most recent 'e' at index 3.

#### First Pass Result (Before Second Pass)

Conceptually, our `result` array now represents distances to the previous 'e'.

### Second Pass: Right to Left (Optimized Approach)

Now we'll go backwards, tracking the next occurrence of 'e' and minimizing distances.

#### Initial State

- `result` array: from previous pass
- `next`: `Infinity`

#### Detailed Walkthrough

1. **Index 11 ('e')**:

   - Last 'e' in the string
   - `next` becomes `11`
   - `result[11] = Math.min(result[11], Math.abs(11 - 11))` → `0`

2. **Index 10 ('d')**:

   - `next` is `11`
   - `result[10] = Math.min(result[10], Math.abs(10 - 11))` → `1`

3. **Index 9 ('o')**:

   - Continues with similar calculations
   - Comparing current result with distance to next 'e'

4. **Special Interesting Points**:
   - At index 5 and 6, we have another 'e'
   - These will update `next`
   - Allows capturing the closest 'e' in both directions

### Final Result

After both passes, we get:
`[3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]`

Let's verify a few points:

- Index 3: `0` (it's an 'e')
- Index 0: `3` (distance to first 'e')
- Index 4: `1` (closest to 'e')
- Index 11: `0` (it's the last 'e')

### Visualization of the Algorithm's Thought Process

Imagine two "waves" moving through the string:

1. First wave moves left to right, marking distances to previous 'e'
2. Second wave moves right to left, fine-tuning distances to next 'e'
3. Where these waves intersect, we get the shortest distance

### Mental Model Practice

Try to trace the algorithm manually:

- Pick a random index
- How would you calculate its distance to the nearest 'e'?
- Can you see how the two-pass approach helps?

Would you like me to elaborate on any specific part of this explanation or demonstrate with another example?
I'll break down the concept of space complexity and clarify why the output array isn't counted as extra space.

### Understanding Space Complexity

In algorithm analysis, space complexity is about tracking the additional memory an algorithm uses beyond the input and output. Let's dive into what this means:

#### Input and Output Are Different

When we talk about space complexity, we distinguish between:

1. **Input Space**: The memory used by the original input (in our case, the input string)
2. **Output Space**: The memory needed to store the result
3. **Extra/Auxiliary Space**: Additional memory used by the algorithm during computation

#### Why Output Doesn't Count as Extra Space

Imagine you're asked to create a function that transforms an input array into a new array. The space used by the result array isn't considered "extra" because:

- The problem requires you to return a new array
- This output is an expected part of the solution, not additional memory

**Example Comparison**:

```javascript
// This uses O(1) extra space
function transformArray(arr) {
  // Creates result array, but this is the expected output
  const result = new Array(arr.length);

  // Uses only a few extra variables
  let temp = 0;
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[i] * 2;
  }

  return result;
}

// This uses O(n) extra space
function transformWithAdditionalStorage(arr) {
  // Creates extra storage not required by the problem
  const extraStorage = [];
  const result = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    // Unnecessarily storing intermediate results
    extraStorage.push(arr[i] * 2);
    result[i] = arr[i] * 2;
  }

  return result;
}
```

### Practical Breakdown for Our Problem

In the shortest distance problem:

```javascript
function shortestToChar(s, c) {
  // This result array is the REQUIRED OUTPUT
  const result = new Array(n).fill(0);

  // These are our EXTRA variables
  let prev = -Infinity;
  let next = Infinity;

  // Computation logic...
  return result;
}
```

#### What Counts as Extra Space?

- `prev` variable
- `next` variable
- Any temporary variables used in computation

#### What Doesn't Count as Extra Space

- `result` array (the output we're required to produce)
- Input string `s`

### Mental Model Exercise

Think about solving a problem where you must:

1. Take an input
2. Produce a transformed output
3. Do so efficiently

The space used by the transformed output isn't considered "extra" - it's just the nature of the solution!

### Deeper Complexity Nuance

- O(1) extra space means the additional memory used doesn't grow with input size
- O(n) extra space means additional memory grows linearly with input
- In our solution, we use O(1) extra space because `prev` and `next` are just two variables

### Practical Implication

This distinction matters in:

- Interview questions
- Resource-constrained environments
- Understanding algorithmic efficiency

Would you like me to elaborate on any part of this explanation or explore how space complexity is analyzed in more depth?
