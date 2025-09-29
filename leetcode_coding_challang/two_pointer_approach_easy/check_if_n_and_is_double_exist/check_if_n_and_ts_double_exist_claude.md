# **1346. Check If N and Its Double Exist**

Let me guide you through solving the "Check If N and Its Double Exist" problem, breaking it down in a way that will help you understand both this specific problem and the broader problem-solving patterns.

1. Problem Understanding

Let's start by breaking down what the problem is asking us to do:

- We're given an array of integers `arr`
- We need to determine if there exist two different indices `i` and `j` such that:
  - `arr[i] == 2 * arr[j]`
- In other words, we're looking for any number and its double within the array

Key constraints and edge cases to consider:

- Array length is between 2 and 500
- Array elements are integers in the range [-10^3, 10^3]
- We need to handle:
  - Positive numbers and their doubles
  - Negative numbers and their doubles
  - Zeros (special case - is 0 its own double?)
  - Empty or single-element arrays

## **Pattern Identification**

This problem falls into the "Array Search Pattern" category, specifically dealing with pair relationships. There are several approaches we could take:

- Brute Force: Check every possible pair
- Hash Set: Store values for O(1) lookup
- Sorting + Two Pointers: Sort array and use two pointers to find pairs

The most efficient approach here would be using a Hash Set, as it gives us O(1) lookup time for each element's potential double or half.

1. Step-by-Step Approach

Let me create a flowchart to visualize our approach using the Hash Set method:

## **Code Implementation**

Let's implement the solution in JavaScript with detailed comments explaining each step:

```javascript
/**
 * @param {number[]} arr
 * @return {boolean}
 */
const checkIfExist = function (arr) {
  // Create a Set to store numbers we've seen
  const seen = new Set();

  // Handle edge case: multiple zeros
  let zeroCount = 0;

  // Iterate through each number in the array
  for (const num of arr) {
    // Count zeros separately (special case)
    if (num === 0) {
      zeroCount++;
      // If we've seen more than one zero, return true
      if (zeroCount > 1) return true;
      continue;
    }

    // Check if either the double or half exists in our set
    if (seen.has(num * 2) || seen.has(num / 2)) {
      return true;
    }

    // Add the current number to our set
    seen.add(num);
  }

  // If we haven't found any pairs, return false
  return false;
};
```

## **Complexity Analysis**

Time Complexity: O(n)

- We iterate through the array once
- Set operations (add, has) are O(1)

Space Complexity: O(n)

- We store at most n elements in our Set

## **Alternative Solutions**

We could also solve this using a sorting approach:

```javascript
const checkIfExistSort = function (arr) {
  // Sort the array
  arr.sort((a, b) => a - b);

  // Use two pointers
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] === 2 * arr[i]) return true;
      if (arr[j] > 2 * arr[i]) break; // Optimization
    }
  }
  return false;
};
```

This approach has O(n log n) time complexity due to sorting, but might perform better for small arrays due to better cache locality.

## **Practice Recommendations**

Similar problems to practice this pattern:

1. "Two Sum" - Finding pairs that sum to a target
2. "Find the Duplicate Number" - Finding a number that appears twice
3. "Intersection of Two Arrays" - Finding common elements
4. "Pairs of Songs With Total Durations Divisible by 60" - More complex pair relationship

Key lessons from this problem:

- Always consider edge cases (like zeros in this problem)
- Think about using hash structures for O(1) lookup
- Consider the trade-offs between different approaches (hash set vs. sorting)
- Look for ways to break early when conditions are met

Would you like me to elaborate on any part of the solution or explain how to approach any of the recommended practice problems?

Let me guide you through solving this problem with a focus on building a strong conceptual understanding that you can apply to similar challenges.

**1. Problem Understanding**
Let's start by breaking down what the problem is asking us to do. Given an array of integers `arr`, we need to determine if there exist two numbers where one is double the other. In other words, we're looking for a pair of numbers `x` and `y` where `x = 2 * y` or `y = 2 * x`.

Key constraints and edge cases to consider:

- The array can contain both positive and negative numbers
- We need to consider zero (special case since 2 \* 0 = 0)
- The array length can range from 2 to 500
- Numbers in the array are within the range [-10^3, 10^3]

**2. Pattern Identification**
This problem falls into the "Array Search Pattern" category, specifically dealing with pair relationships. The key insight is that we're looking for a relationship between elements rather than the elements themselves. This is similar to the "Two Sum" pattern, but with a multiplication relationship instead of addition.

**3. Approach Discussion**
Let's develop our solution step by step:

1. First, we need a way to efficiently check if a number's double exists in the array
2. We could use a hash set to store numbers we've seen, making lookups O(1)
3. For each number n, we need to check for both n\*2 and n/2
4. Special consideration needed for zero, as it's its own double

**4. Code Implementation**
Let me write a solution with detailed comments explaining each step:

```javascript
/**
 * @param {number[]} arr
 * @return {boolean}
 */
const checkIfExist = function (arr) {
  // Create a Set to store numbers we've seen
  const seen = new Set();

  // Handle each number in the array
  for (const num of arr) {
    // Check if either double or half of current number exists
    // Note: We check both because we might see the double
    // before we see the original number
    if (seen.has(num * 2) || seen.has(num / 2)) {
      return true;
    }

    // Special case for zero to avoid false positives
    // since 2 * 0 = 0
    seen.add(num);
  }

  // If we haven't found any pairs, return false
  return false;
};
```

**5. Complexity Analysis**
Time Complexity: O(n) where n is the length of the array

- We make a single pass through the array
- Set operations (add and has) are O(1)

Space Complexity: O(n)

- We store at most n numbers in our Set

**6. Alternative Solutions**
We could also solve this using a nested loop approach:

```javascript
const checkIfExistBruteForce = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && arr[i] === 2 * arr[j]) {
        return true;
      }
    }
  }
  return false;
};
```

This solution has O(n²) time complexity but O(1) space complexity. While simpler to understand, it's less efficient for larger inputs.

**7. Practice Recommendations**
To reinforce your understanding of array search patterns, try these related problems:

1. "Two Sum" (LeetCode #1)
2. "Find All Duplicates in an Array" (LeetCode #442)
3. "Pairs of Songs With Total Durations Divisible by 60" (LeetCode #1010)

**8. Flowchart Design**
Let me create a flowchart to visualize the solution process:

The key to mastering these types of problems is recognizing the pattern of searching for relationships between elements in an array. In this case, we're looking for a multiplicative relationship (double), but the same approach can be adapted for other relationships like sums, differences, or more complex mathematical relationships.

Would you like me to explain any part of the solution in more detail? Or shall we discuss how this pattern applies to other similar problems?

Let me break down this key line of code and explain why we need to check both conditions. This is a subtle but important part of the solution that often trips up developers.

Let's understand it through an example. Imagine we have the array [10, 5, 20]:

```javascript
// Let's trace through what happens:
const arr = [10, 5, 20];
const seen = new Set();

// First iteration: num = 10
if (seen.has(20) || seen.has(5)) {
  // seen is empty, so both checks fail
  return true;
}
seen.add(10); // seen now contains: [10]

// Second iteration: num = 5
if (seen.has(10) || seen.has(2.5)) {
  // First check succeeds! Because 10 = 5 * 2
  return true; // We found our pair!
}
```

We check for both `num * 2` and `num / 2` because we don't know which number we'll encounter first in the array. There are two ways we could find a valid pair:

1. We might see the smaller number first:

   ```javascript
   arr = [5, 10]; // 5 comes before its double 10
   ```

2. We might see the larger number first:

   ```javascript
   arr = [10, 5]; // 10 comes before its half 5
   ```

That's why we need both checks:

- `seen.has(num * 2)` catches cases where we've already seen the double
- `seen.has(num / 2)` catches cases where we've already seen the half

Here's the same code with more detailed comments to show the reasoning:

```javascript
if (
  seen.has(num * 2) || // Check if we've seen this number's double
  seen.has(num / 2) // Check if we've seen this number's half
) {
  return true; // We found either case, so we have a valid pair
}
seen.add(num); // If no pair found, add this number for future checks
```

A real-world analogy might help: Imagine you're checking if any two people in a room are siblings. When each new person enters, you need to check both:

1. "Do they have a younger sibling already in the room?"
2. "Do they have an older sibling already in the room?"

Just like with siblings, the relationship works both ways, and we don't know which member of the pair we'll encounter first.

Would you like to work through some more examples to solidify this understanding? Or shall we explore how this two-way relationship check pattern appears in other programming problems?
