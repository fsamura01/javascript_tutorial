/* # Find the Index of the First Occurrence in a String

## Solution Approaches

### 1. Two-Pointer Sliding Window Approach */
function strStr(haystack, needle) {
  // Edge case: empty needle
  if (needle === "") return 0;

  // Iterate through haystack
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let match = true;

    // Check substring starting at current index
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        match = false;
        break;
      }
    }

    // Return first match found
    if (match) return i;
  }

  return -1;
}

// Test cases
console.log(strStr("sadbutsad", "sad")); // Output: 0
console.log(strStr("leetcode", "leeto")); // Output: -1

/* ### 2. Optimized Two-Pointer Approach */
function strStrOptimized(haystack, needle) {
  // Sliding window with early termination
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    // Substring extraction and comparison
    if (haystack.slice(i, i + needle.length) === needle) {
      return i;
    }
  }

  return -1;
}

/* ### 3. Built-in Method Approach */
function strStrBuiltIn(haystack, needle) {
  return haystack.indexOf(needle);
}

/* 
 ## Complexity Analysis

### Approach 1: Two-Pointer Manual Comparison
- **Time Complexity**: O(n * m)
  - n = haystack length
  - m = needle length
  - Worst case: checking every substring

- **Space Complexity**: O(1)
  - No extra space used
  - In-place comparisons

### Approach 2: Slice Method
- **Time Complexity**: O(n * m)
  - Slice operation adds slight overhead
  - Similar to manual approach

- **Space Complexity**: O(m)
  - Creates substring for each comparison

### Approach 3: Built-in indexOf
- **Time Complexity**: O(n * m)
- **Space Complexity**: O(1)
- Most concise solution

## Advanced Solution: KMP Algorithm
*/
function strStrKMP(haystack, needle) {
  // Knuth-Morris-Pratt Algorithm
  function computeLPS(pattern) {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < pattern.length) {
      if (pattern[i] === pattern[len]) {
        len++;
        lps[i] = len;
        i++;
      } else {
        if (len !== 0) {
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }

    return lps;
  }

  const lps = computeLPS(needle);
  let i = 0; // haystack index
  let j = 0; // needle index

  while (i < haystack.length) {
    if (needle[j] === haystack[i]) {
      i++;
      j++;
    }

    if (j === needle.length) {
      return i - j;
    } else if (i < haystack.length && needle[j] !== haystack[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return -1;
}

/* 
 ## KMP Algorithm Complexity
- **Time Complexity**: O(n + m)
- **Space Complexity**: O(m)
- Most efficient for repeated pattern matching

## Key Insights
1. Two-pointer technique crucial for substring search
2. Multiple approaches with trade-offs
3. Built-in methods provide simplicity
4. KMP offers optimal performance for complex scenarios

## Best Practices
- Handle edge cases (empty strings)
- Consider input constraints
- Choose algorithm based on specific requirements
- Understand time and space trade-offs

## Interview Tips
- Discuss multiple approaches
- Explain time and space complexity
- Demonstrate problem-solving thought process
- Optimize and refactor your solution

## Recommended Practice
1. Implement all three approaches
2. Understand sliding window concept
3. Learn KMP algorithm fundamentals
4. Analyze performance characteristics
*/
