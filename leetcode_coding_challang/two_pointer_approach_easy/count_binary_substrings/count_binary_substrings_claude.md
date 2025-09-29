# **696. Count Binary Substrings**

Let me help you understand this problem step by step.
This is a great pattern to learn as it combines string manipulation with counting techniques.

First, let's understand what we're looking for:

1. We need to find substrings that have equal numbers of 0s and 1s
2. The 0s and 1s must be grouped together (consecutive)
3. We count duplicate substrings multiple times

Let's break down the problem using the first example "00110011":

Looking at a valid substring like "0011":

- All 0s are grouped together (00)
- All 1s are grouped together (11)
- The count of 0s equals the count of 1s (2 each)

Here's a solution with detailed explanations:

```javascript
function countBinarySubstrings(s) {
  // This will store our final count of valid substrings
  let count = 0;

  // prevCount keeps track of the count of previous character group
  // currCount keeps track of the count of current character group
  let prevCount = 0;
  let currCount = 1;

  // We'll iterate through the string starting from index 1
  // comparing each character with the previous one
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      // If current character matches previous, increment current group count
      currCount++;
    } else {
      // If we find a different character:
      // 1. Add to total count the minimum of previous and current group counts
      // 2. Update prevCount to be the last currCount
      // 3. Reset currCount for the new group
      count += Math.min(prevCount, currCount);
      prevCount = currCount;
      currCount = 1;
    }
  }

  // Don't forget to count the last group comparison
  count += Math.min(prevCount, currCount);

  return count;
}
```

Let's see how this works with the example "00110011":

1. Start with "00":

   - currCount becomes 2 (two zeros)
   - prevCount is 0

2. When we hit "11":

   - We can form min(2,2) = 2 substrings ("0011" and "01")
   - prevCount becomes 2 (from the zeros)
   - currCount counts the ones, becomes 2

3. This pattern continues for the second "0011"

The time complexity is O(n) where n is the length of the string, as we:

- Make a single pass through the string
- Perform constant-time operations at each step

The space complexity is O(1) as we:

- Only use a few variables regardless of input size
- Don't create any data structures that grow with input size

To better understand why this works, consider these key insights:

1. When we have consecutive characters (like "00" and "11"), the number of valid substrings we can form is limited by the smaller of the two groups
2. We only need to keep track of two counts at a time (previous and current) because valid substrings must have consecutive groups

Would you like me to walk through another example to help solidify your understanding? Or would you like to explore how we might modify this solution to handle different variations of the problem?

Let's explore some interesting variations of this problem that will help deepen our understanding of the pattern and strengthen our problem-solving skills.

Variation 1: Count Binary Substrings with Minimum Length
Let's modify our solution to only count substrings that meet a minimum length requirement. This could be useful in real-world applications where we want to filter out very short patterns.

```javascript
function countBinarySubstringsWithMinLength(s, minLength) {
  let count = 0;
  let prevCount = 0;
  let currCount = 1;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      currCount++;
    } else {
      // Only count if the potential substring length meets minimum
      if (Math.min(prevCount, currCount) * 2 >= minLength) {
        count += Math.min(prevCount, currCount);
      }
      prevCount = currCount;
      currCount = 1;
    }
  }

  // Check the last group
  if (Math.min(prevCount, currCount) * 2 >= minLength) {
    count += Math.min(prevCount, currCount);
  }

  return count;
}
```

Variation 2: Finding the Longest Valid Substring
Instead of counting all valid substrings, let's find the longest one. This introduces the concept of tracking maximum values while processing the string:

```javascript
function findLongestBinarySubstring(s) {
  let maxLength = 0;
  let maxSubstring = "";
  let prevCount = 0;
  let currCount = 1;
  let start = 0; // Track start of current group

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      currCount++;
    } else {
      // When we find a potential valid substring
      let possibleLength = Math.min(prevCount, currCount) * 2;
      if (possibleLength > maxLength) {
        maxLength = possibleLength;
        // Extract the substring using our tracked positions
        let substringStart = i - prevCount - currCount;
        maxSubstring = s.substring(substringStart, i);
      }
      prevCount = currCount;
      currCount = 1;
      start = i;
    }
  }

  // Check the last group
  let possibleLength = Math.min(prevCount, currCount) * 2;
  if (possibleLength > maxLength) {
    let substringStart = s.length - prevCount - currCount;
    maxSubstring = s.substring(substringStart, s.length);
  }

  return {
    length: maxLength,
    substring: maxSubstring,
  };
}
```

Variation 3: Finding All Unique Valid Substrings
If we want to find all unique valid substrings without counting duplicates, we can modify our solution to use a Set:

```javascript
function findUniqueBinarySubstrings(s) {
  const uniqueSubstrings = new Set();
  let prevCount = 0;
  let currCount = 1;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      currCount++;
    } else {
      // When we find groups that could form valid substrings
      let validLength = Math.min(prevCount, currCount);
      let start = i - prevCount - currCount;

      // Generate all possible valid substrings from current position
      for (let len = 1; len <= validLength; len++) {
        let substring = s.substring(
          start + (prevCount - len),
          start + prevCount + len
        );
        uniqueSubstrings.add(substring);
      }

      prevCount = currCount;
      currCount = 1;
    }
  }

  // Process the last group
  let validLength = Math.min(prevCount, currCount);
  let start = s.length - prevCount - currCount;
  for (let len = 1; len <= validLength; len++) {
    let substring = s.substring(
      start + (prevCount - len),
      start + prevCount + len
    );
    uniqueSubstrings.add(substring);
  }

  return Array.from(uniqueSubstrings);
}
```

These variations teach us several important programming concepts:

1. State Tracking: We learn how to maintain and update multiple pieces of state (counts, positions, maximums) while processing a string.

2. Substring Generation: We see different ways to generate and validate substrings, from simple counting to actually extracting the substrings.

3. Data Structure Usage: The Set in Variation 3 shows how different data structures can help us solve new requirements efficiently.

4. Edge Cases: Each variation forces us to think about different edge cases, like minimum lengths or handling the last group of characters.

Would you like to explore how we might further modify these solutions to handle other interesting cases, such as:

- Finding substrings with specific ratios of 0s to 1s instead of just equal numbers?
- Handling strings with more than two different characters?
- Optimizing for very long strings using sliding windows?

Let me know which aspect interests you most, and we can dive deeper into that particular variation!
