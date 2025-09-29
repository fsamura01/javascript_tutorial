# **942. DI String Match**

Let me guide you through solving the "DI String Match" problem in a structured way that will help build your problem-solving skills.

## 1. Problem Understanding

Let's start by breaking down what this problem is asking us to do:

We're given a string S consisting only of the characters "D" (decrease) and "I" (increase). The length of the string is N. We need to find a permutation of numbers from 0 to N that satisfies the following conditions:

- If S[i] = "I", then P[i] < P[i+1]
- If S[i] = "D", then P[i] > P[i+1]

For example, if S = "IDID", we need to find numbers P[0], P[1], P[2], P[3], P[4] where:

- P[0] < P[1] (because S[0] = "I")
- P[1] > P[2] (because S[1] = "D")
- P[2] < P[3] (because S[2] = "I")
- P[3] > P[4] (because S[3] = "D")

## 2. Pattern Identification

This problem exhibits characteristics of the "Greedy Algorithm" pattern. Here's why:

- We can make locally optimal choices at each step
- We don't need to backtrack or consider future implications
- The problem can be solved by making the best possible choice at each position

## 3. Approach Discussion

Let's develop our approach using logical reasoning:

1. We need to assign numbers from 0 to N (where N is the length of string)
2. Key insight: When we see:

   - "I": We want the next number to be larger
   - "D": We want the next number to be smaller

3. To ensure we always have numbers available, we can:
   - Keep track of the smallest and largest available numbers
   - For "I": Use the smallest available number
   - For "D": Use the largest available number

Let's think through an example: "IDID"

- Available numbers: [0,1,2,3,4]
- Starting: low = 0, high = 4

## 4. Code Implementation

Let me write the solution in JavaScript with detailed comments:

```javascript
/**
 * @param {string} s
 * @return {number[]}
 */
function diStringMatch(s) {
  // Initialize our result array
  const result = [];

  // Initialize our range of available numbers
  let low = 0;
  let high = s.length;

  // Iterate through each character in the string
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "I") {
      // For 'I', use the smallest available number
      result.push(low++);
    } else {
      // For 'D', use the largest available number
      result.push(high--);
    }
  }

  // Don't forget to add the last number
  // At this point, low and high will be equal
  result.push(low);

  return result;
}
```

## 5. Complexity Analysis

Time Complexity: O(N), where N is the length of the input string

- We only need to iterate through the string once
- Each operation within the loop is O(1)

Space Complexity: O(N)

- We need to store the result array of size N+1
- All other variables use constant space

## 6. Alternative Solutions

While our greedy approach is optimal, there's an alternative approach using a two-pass solution:

1. First pass: Assign temporary values
2. Second pass: Normalize the values

However, this would be less efficient as it requires two passes through the array.

## 7. Practice Recommendations

To master similar patterns, try these problems:

1. LeetCode 944: Delete Columns to Make Sorted
2. LeetCode 767: Reorganize String
3. LeetCode 955: Delete Columns to Make Sorted II

## 8. Flowchart Design

Let me create a flowchart to visualize the solution process:

To solidify your understanding, let's walk through a small example:

Input: "ID"
Available numbers: [0,1,2]

Step-by-step:

1. For 'I': Use low=0, increment low to 1
2. For 'D': Use high=2, decrement high to 1
3. Add final number (low=1)
   Result: [0,2,1]

Would you like to try solving a similar problem to practice this pattern? I can guide you through another example that uses the greedy approach in a slightly different context.

Let me explain the concept of "locally optimal choices" in the context of this problem through a clear example.

Think of building a tower with numbered blocks, where each block must satisfy certain rules based on whether it should be higher or lower than the next block. The "DI String" tells us these rules - 'I' means the next block must be higher, 'D' means it must be lower.

In this problem, making a "locally optimal choice" means that when we place each block, we can make the best possible decision right now without worrying about future placements. Here's why this works:

For the string "IDID", let's see why our choices are locally optimal:

1. At position 0 ('I'):

   - We need the next number to be larger
   - By choosing the smallest available number (0), we guarantee two things:
     a. We can definitely find a larger number for the next position
     b. We preserve larger numbers for future positions where we might need them

2. At position 1 ('D'):
   - We need the next number to be smaller
   - By choosing the largest available number (4), we ensure:
     a. We can definitely find a smaller number for the next position
     b. We preserve smaller numbers for future positions where we might need them

This is similar to how you might fill a water bottle from a large tank. If you need the water level to increase, you pour from the bottom of the tank (lowest available). If you need it to decrease, you pour from the top (highest available). Each decision is optimal for that moment and doesn't prevent us from making future correct choices.

To contrast this with problems where local choices DON'T work, consider finding the longest path in a maze. Making what seems like the best choice at each intersection (locally optimal) might lead you down a dead end, forcing you to backtrack. But in our DI String problem, we never need to backtrack or undo our choices.

Let's verify this with a concrete example:

```javascript
// For string "IDID"
// Available numbers: [0,1,2,3,4]

// Position 0 ('I'): Choose 0 (smallest)
// Remaining: [1,2,3,4]
// Result: [0]

// Position 1 ('D'): Choose 4 (largest)
// Remaining: [1,2,3]
// Result: [0,4]

// Position 2 ('I'): Choose 1 (smallest)
// Remaining: [2,3]
// Result: [0,4,1]

// Position 3 ('D'): Choose 3 (largest)
// Remaining: [2]
// Result: [0,4,1,3,2]
```

Each choice we made was:

1. Optimal for its position (satisfied the I/D requirement)
2. Left us with valid options for future positions
3. Never needed to be reconsidered or changed

This is what makes it a true "locally optimal" solution - each decision stands on its own and contributes to the overall correct solution without requiring any future adjustments or backtracking.

Would you like to explore another example to further reinforce this concept, or shall we discuss how this principle applies to other similar problems?

Let me guide you through solving the DI String Match problem with a focus on developing your problem-solving skills.

## **Problem Understanding**

The problem gives us a string S consisting only of "I" (increase) and "D" (decrease) characters. We need to find a permutation of numbers from 0 to n (where n is the length of the string) such that:

- For character "I": the number at position i should be smaller than the number at position i+1
- For character "D": the number at position i should be larger than the number at position i+1

For example, if S = "ID", the length is 2, so we need to use numbers [0,1,2] to create a sequence where:

- At position 0 ("I"): the number should be smaller than position 1
- At position 1 ("D"): the number should be larger than position 2

## **Pattern Identification**

This problem demonstrates the "Greedy Algorithm" pattern. What makes it interesting is that we can make locally optimal choices at each step to reach a globally optimal solution. The key insight is that we can use the maximum and minimum available numbers strategically based on whether we need an increase or decrease.

## **Approach Discussion**

Let's think about this step by step:

1. First, we observe that we need n+1 numbers (0 to n) for a string of length n.
2. For an "I", we want the next number to be larger, so it's optimal to use the smallest available number.
3. For a "D", we want the next number to be smaller, so it's optimal to use the largest available number.
4. We can maintain two pointers: low (starting at 0) and high (starting at n).

Let me implement the solution and then explain further:

## **Complexity Analysis**

- Time Complexity: O(n) where n is the length of the string
- Space Complexity: O(n) to store the result array
- We only make a single pass through the string, and each operation is constant time

## **Alternative Solutions**

While our greedy approach is optimal, there are a few variations:

1. We could work backwards through the string
2. We could use a different range of numbers (like 1 to n+1 instead of 0 to n)
3. We could build the array in reverse

However, none of these would improve the time or space complexity.

Let me create a flowchart to visualize the solution:

## **Practice Recommendations**

To strengthen your understanding of similar patterns, I recommend these problems:

1. LeetCode 944 - Delete Columns to Make Sorted
1. LeetCode 1081 - Smallest Subsequence of Distinct Characters
1. LeetCode 763 - Partition Labels

These problems also involve making greedy choices based on character properties or positions.

Key Learning Points:

1. The importance of identifying when a greedy approach can work
2. How to use two pointers effectively
3. The value of visualizing the problem state as you process the input
4. How local optimal choices can lead to a global optimal solution

Would you like to explore any particular aspect of the solution in more detail? For instance, we could:

1. Work through more complex test cases
2. Analyze why the greedy approach guarantees correctness
3. Explore how to prove the optimality of the solution

Let me help you understand why this problem is a perfect example of the Greedy Algorithm pattern by breaking it down step by step.

First, let's understand what makes an algorithm "greedy":
A greedy algorithm makes the locally optimal choice at each step, hoping these choices will lead to a globally optimal solution. The key challenge is proving that local optimal choices won't prevent us from reaching the best overall solution.

In this problem, let's see why our choices are both locally optimal and globally safe:

1. Understanding Local Optimality:
   When we see an 'I', we need the next number to be larger. Think about what this means:

```javascript
// If we have "I" at position i
nums[i] < nums[i + 1];
```

When we see a 'D', we need the next number to be smaller:

```javascript
// If we have "D" at position i
nums[i] > nums[i + 1];
```

## **The Brilliant Insight:**

Consider what happens when we use the smallest available number (let's call it 'low') for 'I':

- We guarantee we can always find a larger number for the next position
- Why? Because all remaining unused numbers are larger than 'low'

Similarly, when we use the largest available number (let's call it 'high') for 'D':

- We guarantee we can always find a smaller number for the next position
- Why? Because all remaining unused numbers are smaller than 'high'

Let's see this in action with an example: "IDI"

```javascript
// Starting numbers: [0,1,2,3]
// First char 'I': Use 0 (smallest)
// Numbers left: [1,2,3]
[0,...]

// Next char 'D': Use 3 (largest)
// Numbers left: [1,2]
[0,3,...]

// Last char 'I': Use 1 (smallest)
// Numbers left: [2]
[0,3,1,2]
```

## **Why It's Guaranteed to Work:**

- For any 'I', using the smallest number means all future numbers can satisfy any future 'I' or 'D'
- For any 'D', using the largest number means all future numbers can satisfy any future 'I' or 'D'
- We never "paint ourselves into a corner" because:
  - After using low for 'I': remaining numbers > low
  - After using high for 'D': remaining numbers < high

1. The Global Optimality:
   This approach isn't just one way to solve the problem - it's guaranteed to find a valid solution because:

- We never run out of larger numbers after an 'I'
- We never run out of smaller numbers after a 'D'
- We use exactly the numbers 0 to n exactly once

This is why the greedy approach is beautiful here - each local choice:

1. Solves the immediate requirement ('I' or 'D')
2. Maintains the invariant that we can solve all future requirements
3. Uses each number exactly once

Would you like me to create a visual demonstration showing how these choices play out step by step for a specific example? That might help make the concept even clearer.

Let me create a visual step-by-step demonstration of how the greedy algorithm works for the string "IDID". This will help us see exactly how local choices lead to a global solution.

Let me explain why each choice in this process is both locally optimal and globally safe:

1. First 'I' (Step 1 → Step 2):

   - We choose 0 (the smallest number)
   - This is locally optimal because we need the next number to be larger
   - It's globally safe because all remaining numbers (1,2,3,4) are larger than 0

2. First 'D' (Step 2 → Step 3):

   - We choose 4 (the largest number)
   - This is locally optimal because we need the next number to be smaller
   - It's globally safe because all remaining numbers (1,2,3) are smaller than 4

3. Second 'I' (Step 3 → Step 4):

   - We choose 1 (the smallest remaining number)
   - This is locally optimal because we need the next number to be larger
   - It's globally safe because remaining numbers (2,3) are larger than 1

4. Second 'D' (Step 4 → Step 5):
   - We choose 3 (the largest remaining number)
   - This is locally optimal because we need the next number to be smaller
   - It's globally safe because the last remaining number (2) is smaller than 3

Let's verify our solution meets all requirements:

1. For 'I' at position 0: 0 < 4 ✓
2. For 'D' at position 1: 4 > 1 ✓
3. For 'I' at position 2: 1 < 3 ✓
4. For 'D' at position 3: 3 > 2 ✓

The beauty of this greedy approach is that:

1. We never need to backtrack
2. Each decision is final
3. We use each number exactly once
4. We guarantee all constraints are satisfied

Think of it like dealing cards into a sequence: we always know whether to pick from the top (smallest) or bottom (largest) of our deck based on whether we need the next number to be bigger or smaller. This mental model can help understand why the greedy approach works perfectly here.

Would you like to try working through another example together to reinforce this understanding? Or shall we explore why other approaches (like backtracking) would be unnecessarily complex for this problem?
