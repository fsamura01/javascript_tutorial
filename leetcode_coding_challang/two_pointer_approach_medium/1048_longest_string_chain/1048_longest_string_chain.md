# Leetcode 1048: Longest String Chain - Complete Tutorial

Let me guide you through this problem using first-principles thinking!

## 1. Problem Understanding 🎯

**In Simple Terms:**
Imagine you have a collection of words. You can build a "chain" by starting with a shorter word and repeatedly adding one letter at a time (anywhere in the word) to create the next word. Find the longest such chain you can build.

**Key Rules:**

- You can only ADD one letter (not remove, replace, or rearrange)
- The order of existing letters must stay the same
- Each word can only appear once in a chain
- A single word counts as a chain of length 1

**Examples to Clarify:**

- ✅ "abc" → "abdc" (added 'd' in middle)
- ✅ "cat" → "cart" (added 'r')
- ❌ "abc" → "bac" (reordered letters)
- ❌ "abc" → "ab" (removed letter instead of adding)

**Edge Cases:**

- All words same length → answer is 1
- No valid predecessors → answer is 1
- Empty array → answer is 0

---

## 2. Constraints Analysis 🔍

Let's extract insights from the constraints:

```Javascript
1 <= words.length <= 1000
1 <= words[i].length <= 16
words[i] only consists of lowercase English letters
```

**What the constraints tell us:**

1. **Array size (≤ 1000):** Moderate input size
   - O(n²) solutions are acceptable
   - O(n³) might be too slow
2. **Word length (≤ 16):** Small word size
   - We can afford O(word_length) operations per word
   - Checking if one word is predecessor of another is cheap
3. **Lowercase letters only:**
   - No special character handling needed
   - Simplified string comparison

4. **Key Insight:** Since word lengths are small (≤16), and we can only ADD letters, words in a chain must have strictly increasing lengths!

---

## 3. Keyword Highlighting 🔑

Let me highlight the critical keywords that unlock the solution:

| Keyword                         | Significance                 | Problem-Solving Hint                   |
| ------------------------------- | ---------------------------- | -------------------------------------- |
| **"longest"**                   | We need to optimize/maximize | Think DP, greedy, or BFS/DFS           |
| **"chain"**                     | Sequential dependency        | Build from smaller to larger           |
| **"insert exactly one letter"** | Transformation rule          | Words differ by exactly 1 character    |
| **"sequence"**                  | Order matters                | Process in a specific order            |
| **"predecessor"**               | Dependency relationship      | DAG (Directed Acyclic Graph) structure |

**Pattern Recognition Triggers:**

- "Longest" + "sequence" → Dynamic Programming
- "Build upon previous results" → DP
- "Dependency chain" → Topological sort or DP

---

## 4. Breaking Down The Problem 🧩

Let's decompose this into manageable subproblems:

**Subproblem 1: How do we check if wordA is a predecessor of wordB?**

- WordB must be exactly 1 character longer than wordA
- Removing exactly one character from wordB should give wordA

**Subproblem 2: What's the optimal order to process words?**

- Start with shortest words (they can't have predecessors)
- Process in increasing length order

**Subproblem 3: How do we track the longest chain ending at each word?**

- Use a map/dictionary to store: `word → longest chain length ending at this word`

**Subproblem 4: How do we build chains?**

- For each word, try removing each character to find potential predecessors
- The longest chain at current word = 1 + max(chains of all predecessors)

---

## 5. Pattern Identification 🎨

**Primary Pattern:
Dynamic Programming (Bottom-Up)**

**Why DP?**

1. ✅ Overlapping subproblems: The longest chain at word X helps compute chains for longer words
2. ✅ Optimal substructure: Longest chain at word = 1 + longest chain at predecessor
3. ✅ We can build solutions incrementally

**DP State Design:**

- `dp[word]` = length of longest chain ending at `word`
- Base case: Every word starts with chain length 1

**Additional Patterns Present:**

- **Sorting:** Process words by length
- **Hash Map:** Fast lookup of predecessor chains
- **String Manipulation:** Generate predecessors by character removal

**Similar Problems Using This Pattern:**

- Longest Increasing Subsequence
- Word Break
- Coin Change

---

## 6. Step-by-Step Approach 📋

**Algorithm Blueprint:**

```Javascript
STEP 1: Sort words by length (ascending)
   Why? Shorter words must be processed before longer ones

STEP 2: Initialize DP map
   dp = {} (empty hash map)
   Each word will map to its longest chain length

STEP 3: For each word in sorted order:
   a. Start with chain length = 1 (the word itself)

   b. Try removing each character one at a time
      - Generate all possible predecessors

   c. For each predecessor:
      - If it exists in dp, update current chain length
      - chain_length = max(chain_length, dp[predecessor] + 1)

   d. Store result: dp[word] = chain_length

STEP 4: Return the maximum value in dp
```

**Example Walkthrough:**

```Javascript
Input: ["a", "ba", "bda", "bdca"]

After sorting: ["a", "ba", "bda", "bdca"] (already sorted by length)

Process "a":
  - No predecessors (length 1)
  - dp["a"] = 1

Process "ba":
  - Try removing 'b': "a" exists! dp["a"] = 1
  - Try removing 'a': "b" doesn't exist
  - dp["ba"] = 1 + dp["a"] = 2

Process "bda":
  - Try removing 'b': "da" doesn't exist
  - Try removing 'd': "ba" exists! dp["ba"] = 2
  - Try removing 'a': "bd" doesn't exist
  - dp["bda"] = 1 + dp["ba"] = 3

Process "bdca":
  - Try removing 'b': "dca" doesn't exist
  - Try removing 'd': "bca" doesn't exist
  - Try removing 'c': "bda" exists! dp["bda"] = 3
  - Try removing 'a': "bdc" doesn't exist
  - dp["bdca"] = 1 + dp["bda"] = 4

Answer: max(1, 2, 3, 4) = 4
```

---

## 7. Code Implementation 💻

### JavaScript Implementation

```javascript
/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words) {
  // STEP 1: Sort words by length (shortest first)
  // This ensures we process predecessors before successors
  words.sort((a, b) => a.length - b.length);

  // STEP 2: Initialize DP map
  // Key: word, Value: longest chain length ending at this word
  const dp = new Map();

  // Track the global maximum chain length
  let maxChain = 1;

  // STEP 3: Process each word
  for (const word of words) {
    // Base case: every word forms a chain of at least length 1
    let currentChainLength = 1;

    // Try removing each character to find predecessors
    for (let i = 0; i < word.length; i++) {
      // Generate predecessor by removing character at index i
      const predecessor = word.slice(0, i) + word.slice(i + 1);

      // If predecessor exists in our chain, extend it
      if (dp.has(predecessor)) {
        currentChainLength = Math.max(
          currentChainLength,
          dp.get(predecessor) + 1,
        );
      }
    }

    // Store the longest chain ending at this word
    dp.set(word, currentChainLength);

    // Update global maximum
    maxChain = Math.max(maxChain, currentChainLength);
  }

  // STEP 4: Return the maximum chain length found
  return maxChain;
};

// Test cases
console.log(longestStrChain(["a", "b", "ba", "bca", "bda", "bdca"])); // 4
console.log(longestStrChain(["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"])); // 5
console.log(longestStrChain(["abcd", "dbqca"])); // 1
```

### Java Implementation

```java
class Solution {
    /**
     * Finds the longest string chain from the given words
     * @param words Array of words to process
     * @return Length of longest chain
     */
    public int longestStrChain(String[] words) {
        // STEP 1: Sort words by length (shortest first)
        // Comparator compares based on string length
        Arrays.sort(words, (a, b) -> a.length() - b.length());

        // STEP 2: Initialize DP map
        // Key: word, Value: longest chain length ending at this word
        Map<String, Integer> dp = new HashMap<>();

        // Track the global maximum chain length
        int maxChain = 1;

        // STEP 3: Process each word
        for (String word : words) {
            // Base case: every word forms a chain of at least length 1
            int currentChainLength = 1;

            // Try removing each character to find predecessors
            for (int i = 0; i < word.length(); i++) {
                // Generate predecessor by removing character at index i
                // substring(0, i) gets chars before i
                // substring(i + 1) gets chars after i
                String predecessor = word.substring(0, i) + word.substring(i + 1);

                // If predecessor exists in our chain, extend it
                if (dp.containsKey(predecessor)) {
                    currentChainLength = Math.max(
                        currentChainLength,
                        dp.get(predecessor) + 1
                    );
                }
            }

            // Store the longest chain ending at this word
            dp.put(word, currentChainLength);

            // Update global maximum
            maxChain = Math.max(maxChain, currentChainLength);
        }

        // STEP 4: Return the maximum chain length found
        return maxChain;
    }
}
```

**Key Implementation Details:**

1. **Sorting:** We use `O(n log n)` sort which is fine given n ≤ 1000
2. **String Slicing:** Creating predecessors is O(word_length) per operation
3. **HashMap:** O(1) average case lookup and insertion
4. **No need to track actual chains:** We only need the length, not the words themselves

---

## 8. Complexity Analysis ⚡

### Time Complexity: **O(n × L² + n log n)**

**Breaking it down:**

1. **Sorting:** `O(n log n)` where n = number of words
2. **Main Loop:** We iterate through each word once: `O(n)`

3. **Inner Loop (per word):** For each character in the word (length L):
   - Remove character: `O(L)` for string manipulation
   - HashMap lookup: `O(L)` for hashing the string
   - Total per character: `O(L)`
   - Total per word: `O(L × L) = O(L²)`

4. **Combined:** `O(n log n + n × L²)`

**Since L ≤ 16 (constant), we can say:** `O(n log n + n) = O(n log n)` in practice

**Given constraints (n ≤ 1000, L ≤ 16):**

- Worst case: ~1000 × log(1000) + 1000 × 16² ≈ 10,000 + 256,000 ≈ 266,000 operations
- Very efficient! ✅

### Space Complexity: **O(n × L)**

**Breaking it down:**

1. **DP HashMap:** Stores at most n words
   - Each word has average length L
   - Total: `O(n × L)`

2. **Sorting:** `O(log n)` or `O(n)` depending on implementation (auxiliary space)

3. **String operations:** `O(L)` temporary strings during predecessor generation

**Dominant term:** `O(n × L)`

**Given constraints:** 1000 × 16 = 16,000 characters maximum - very reasonable! ✅

---

## 9. Alternative Solutions 🔄

### Alternative 1: DFS/Memoization (Top-Down DP)

```javascript
var longestStrChain = function (words) {
  const wordSet = new Set(words);
  const memo = new Map();

  function dfs(word) {
    if (memo.has(word)) return memo.get(word);

    let maxLength = 1;

    // Try adding each character at each position
    for (let i = 0; i <= word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        // 'a' to 'z'
        const nextWord =
          word.slice(0, i) + String.fromCharCode(c) + word.slice(i);
        if (wordSet.has(nextWord)) {
          maxLength = Math.max(maxLength, 1 + dfs(nextWord));
        }
      }
    }

    memo.set(word, maxLength);
    return maxLength;
  }

  let result = 0;
  for (const word of words) {
    result = Math.max(result, dfs(word));
  }
  return result;
};
```

**Pros:**

- More intuitive for some people (think forward instead of backward)
- Good for sparse graphs

**Cons:**

- Slower: O(n × L² × 26) due to trying all 26 letters
- More complex implementation

### Alternative 2: BFS Approach

Similar to level-order traversal where each "level" is words of the same length.

**Comparison:**

| Approach                    | Time       | Space  | Readability | Best For       |
| --------------------------- | ---------- | ------ | ----------- | -------------- |
| Bottom-Up DP (our solution) | O(n×L²)    | O(n×L) | ⭐⭐⭐⭐    | Interviews     |
| Top-Down DFS                | O(n×L²×26) | O(n×L) | ⭐⭐⭐      | Complex graphs |
| BFS                         | O(n×L²)    | O(n×L) | ⭐⭐        | Educational    |

**Recommendation:** Stick with Bottom-Up DP for interviews - it's the most efficient and clean!

---

## 10. Practice Recommendations 📚

Master this pattern with these similar problems:

### Same Pattern (Longest Chain/Sequence with Constraints)

1. **[300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)** ⭐⭐
   - Core DP pattern
   - Build chains based on value constraints

2. **[673. Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/)** ⭐⭐⭐
   - Extension: count chains, not just find longest

3. **[1027. Longest Arithmetic Subsequence](https://leetcode.com/problems/longest-arithmetic-subsequence/)** ⭐⭐
   - Chains with arithmetic constraints

### String + DP Problems

1. **[139. Word Break](https://leetcode.com/problems/word-break/)** ⭐⭐
   - DP on strings with dictionary lookup

2. **[472. Concatenated Words](https://leetcode.com/problems/concatenated-words/)** ⭐⭐⭐
   - Similar word building logic

3. **[720. Longest Word in Dictionary](https://leetcode.com/problems/longest-word-in-dictionary/)** ⭐⭐
   - Build words incrementally

### Graph + DP Problems

1. **[329. Longest Increasing Path in a Matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)** ⭐⭐⭐
   - DP on DAG structure

2. **[1218. Longest Arithmetic Subsequence of Given Difference](https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/)** ⭐⭐
   - HashMap + DP combo

**Practice Strategy:**

1. Start with #300 (simpler version of the pattern)
2. Do #1048 (this problem)
3. Move to #673 (adds complexity)
4. Try string variants (#139, #720)

---

## 11. Flowchart Design 📊---

## 🎯 Key Takeaways

**Pattern Recognition Checklist:**

- ✅ "Longest" + "chain/sequence" → Think DP
- ✅ Dependency relationships → Process in order (sort)
- ✅ Building on previous results → Bottom-up DP
- ✅ Fast lookups needed → Use HashMap

**Interview Tips:**

1. **Clarify the problem:** Ask if words can repeat, if order matters
2. **Identify the pattern early:** Mention "This looks like a DP problem with dependencies"
3. **Start simple:** Explain the brute force, then optimize
4. **Use examples:** Walk through small inputs to verify logic
5. **Communicate complexity:** Always analyze time/space before coding

**Common Mistakes to Avoid:**

- ❌ Forgetting to sort by length first
- ❌ Trying to build chains in wrong order
- ❌ Using O(n²) comparisons instead of O(L) predecessor generation
- ❌ Not handling single-word chains (base case)

**Mental Model:**
Think of it as building a tower with blocks. You must place smaller blocks before larger ones. Each block's height depends on the tallest stack beneath it. The DP map tracks the height of each block!

---

You now have a complete understanding of this problem! Practice the recommended problems to solidify this pattern. Good luck! 🚀

---

## Clarifying the Predecessor Generation Logic 🔍

Let me break down this crucial line with detailed examples!

```javascript
const predecessor = word.slice(0, i) + word.slice(i + 1);
```

## What This Line Does

**Goal:** Remove the character at position `i` from the word to create a potential predecessor.

---

## Visual Breakdown with Example

Let's use the word **"bdca"** and see what happens at each iteration:

### Setup

```Javascript
word = "bdca"
Indices:  0   1   2   3
         'b' 'd' 'c' 'a'
```

---

### Iteration 1: i = 0 (Remove 'b')

```javascript
const predecessor = word.slice(0, 0) + word.slice(0 + 1);
//                  word.slice(0, 0) + word.slice(1);
```

**Breaking it down:**

| Expression         | What it does                                                  | Result              |
| ------------------ | ------------------------------------------------------------- | ------------------- |
| `word.slice(0, 0)` | Get characters from index 0 up to (but not including) index 0 | `""` (empty string) |
| `word.slice(1)`    | Get characters from index 1 to the end                        | `"dca"`             |
| **Concatenation**  | `"" + "dca"`                                                  | **`"dca"`**         |

**Visual:**

```Javascript
b d c a
↑ remove this
  ─────
  "dca"  ← predecessor
```

---

### Iteration 2: i = 1 (Remove 'd')

```javascript
const predecessor = word.slice(0, 1) + word.slice(1 + 1);
//                  word.slice(0, 1) + word.slice(2);
```

**Breaking it down:**

| Expression         | What it does                                                  | Result      |
| ------------------ | ------------------------------------------------------------- | ----------- |
| `word.slice(0, 1)` | Get characters from index 0 up to (but not including) index 1 | `"b"`       |
| `word.slice(2)`    | Get characters from index 2 to the end                        | `"ca"`      |
| **Concatenation**  | `"b" + "ca"`                                                  | **`"bca"`** |

**Visual:**

```Javascript
b d c a
─   ───
"b" "ca"

"b" + "ca" = "bca"  ← predecessor
```

---

### Iteration 3: i = 2 (Remove 'c')

```javascript
const predecessor = word.slice(0, 2) + word.slice(2 + 1);
//                  word.slice(0, 2) + word.slice(3);
```

**Breaking it down:**

| Expression         | What it does                                                  | Result        |
| ------------------ | ------------------------------------------------------------- | ------------- |
| `word.slice(0, 2)` | Get characters from index 0 up to (but not including) index 2 | `"bd"`        |
| `word.slice(3)`    | Get characters from index 3 to the end                        | `"a"`         |
| **Concatenation**  | `"bd" + "a"`                                                  | **`"bda"`** ✓ |

**Visual:**

```Javascript
b d c a
─── remove this
        ─
"bd"   "a"

"bd" + "a" = "bda"  ← predecessor (FOUND IN DP!)
```

---

### Iteration 4: i = 3 (Remove 'a')

```javascript
const predecessor = word.slice(0, 3) + word.slice(3 + 1);
//                  word.slice(0, 3) + word.slice(4);
```

**Breaking it down:**

| Expression         | What it does                                                  | Result                            |
| ------------------ | ------------------------------------------------------------- | --------------------------------- |
| `word.slice(0, 3)` | Get characters from index 0 up to (but not including) index 3 | `"bdc"`                           |
| `word.slice(4)`    | Get characters from index 4 to the end                        | `""` (empty - beyond word length) |
| **Concatenation**  | `"bdc" + ""`                                                  | **`"bdc"`**                       |

**Visual:**

```Javascript
b d c a
───── remove this
"bdc"

"bdc" + "" = "bdc"  ← predecessor
```

---

## Complete Summary Table

For word **"bdca"** (length 4), we generate 4 possible predecessors:

| i   | Character at i | word.slice(0, i) | word.slice(i+1) | Predecessor | Meaning            |
| --- | -------------- | ---------------- | --------------- | ----------- | ------------------ |
| 0   | 'b'            | `""`             | `"dca"`         | `"dca"`     | Remove first char  |
| 1   | 'd'            | `"b"`            | `"ca"`          | `"bca"`     | Remove second char |
| 2   | 'c'            | `"bd"`           | `"a"`           | `"bda"`     | Remove third char  |
| 3   | 'a'            | `"bdc"`          | `""`            | `"bdc"`     | Remove last char   |

---

## The `.slice()` Method Explained

### Syntax Reminder

```javascript
string.slice(start, end);
```

- **`start`**: Index where extraction begins (inclusive)
- **`end`**: Index where extraction ends (exclusive) - optional
- If `end` is omitted, extracts to the end of the string

### Key Examples

```javascript
let word = "hello";

word.slice(0, 2); // "he"   (indices 0, 1)
word.slice(2); // "llo"  (index 2 to end)
word.slice(0, 0); // ""     (empty - start equals end)
word.slice(5); // ""     (empty - beyond string length)
```

---

## Why This Approach Works

### The Logic Behind It

To remove character at position `i`, we need:

1. **Everything BEFORE position i**: `word.slice(0, i)`
2. **Everything AFTER position i**: `word.slice(i + 1)`
3. **Skip position i itself**

```javascript
Original: [part before i] + [char at i] + [part after i]
Result:   [part before i] + [part after i]
```

---

## Another Complete Example

Let's trace through **"abc"** → finding predecessors:

```javascript
word = "abc";
```

| i   | Calculation | Result | Verification             |
| --- | ----------- | ------ | ------------------------ |
| 0   | `"" + "bc"` | `"bc"` | "abc" with 'a' removed ✓ |
| 1   | `"a" + "c"` | `"ac"` | "abc" with 'b' removed ✓ |
| 2   | `"ab" + ""` | `"ab"` | "abc" with 'c' removed ✓ |

**Visual representation:**

```Javascript
i=0: abc → bc   (remove a)
     ↑

i=1: abc → ac   (remove b)
      ↑

i=2: abc → ab   (remove c)
       ↑
```

---

## Code with Detailed Comments

```javascript
for (let i = 0; i < word.length; i++) {
  // Example: word = "bdca", i = 2

  // STEP 1: Get everything BEFORE position i
  // word.slice(0, 2) → "bd" (characters at indices 0, 1)
  const beforeChar = word.slice(0, i);

  // STEP 2: Get everything AFTER position i
  // word.slice(3) → "a" (characters from index 3 to end)
  const afterChar = word.slice(i + 1);

  // STEP 3: Concatenate (skipping character at position i)
  // "bd" + "a" → "bda"
  const predecessor = beforeChar + afterChar;

  // STEP 4: Check if this predecessor exists in our DP map
  if (dp.has(predecessor)) {
    // Found a valid predecessor!
    currentChainLength = Math.max(currentChainLength, dp.get(predecessor) + 1);
  }
}
```

---

## Common Confusion Points Clarified

### ❓ "Why `i + 1` and not just `i`?"

```javascript
// If we used slice(i), we'd INCLUDE the character we want to remove!
word.slice(0, i) + word.slice(i); // WRONG - includes char at i
word.slice(0, i) + word.slice(i + 1); // CORRECT - excludes char at i
```

**Example:**

```javascript
word = "abc", i = 1 (want to remove 'b')

WRONG: word.slice(0, 1) + word.slice(1)
       = "a" + "bc"
       = "abc"  ❌ (nothing removed!)

RIGHT: word.slice(0, 1) + word.slice(1 + 1)
       = "a" + "c"
       = "ac"   ✓ (successfully removed 'b')
```

### ❓ "What if i = 0?"

```javascript
word.slice(0, 0) = ""  // Empty string - this is correct!
// We want nothing before the first character
```

### ❓ "What if i is the last index?"

```javascript
word = "abc", i = 2
word.slice(3) = ""  // Empty string - this is correct!
// There's nothing after the last character
```

---

## Practice Exercise

Try it yourself! For the word **"cart"**, what are all the predecessors?

| i   | Predecessor | Calculation  |
| --- | ----------- | ------------ |
| 0   | `"art"`     | `"" + "art"` |
| 1   | `"crt"`     | `"c" + "rt"` |
| 2   | `"cat"`     | `"ca" + "t"` |
| 3   | `"car"`     | `"car" + ""` |

---

**Key Takeaway:** This one line elegantly removes each character by concatenating everything before it with everything after it, creating all possible predecessor candidates in O(L) time per iteration! 🎯

---

## Clarifying the Logic

`dp.get(predecessor) + 1` 🔍

Let me break down this crucial DP transition with detailed examples!

```javascript
currentChainLength = Math.max(currentChainLength, dp.get(predecessor) + 1);
```

---

## What This Line Does-

**Goal:** Build upon existing chains by adding the current word to the longest chain ending at its predecessor.

**The "+1" represents:** Adding the current word to the chain!

---

## Complete Example Walkthrough

Let's trace through the array **`["a", "ba", "bda", "bdca"]`** step by step.

### Initial State

```javascript
words = ["a", "ba", "bda", "bdca"]; // Already sorted by length
dp = {}; // Empty HashMap
maxChain = 1;
```

---

## Processing Word 1: "a"

```javascript
word = "a";
currentChainLength = 1; // Base case
```

### Try removing each character

**i = 0:** Remove 'a'

```javascript
predecessor = "" + "" = ""  // Empty string
dp.has("")  // false - doesn't exist
// No update
```

### Store result

```javascript
dp["a"] = 1;
```

**Current DP state:**

```javascript
dp = {
  a: 1, // Chain: ["a"]
};
```

---

## Processing Word 2: "ba"

```javascript
word = "ba";
currentChainLength = 1; // Base case
```

### Try removing each character\_

**i = 0:** Remove 'b'

```javascript
predecessor = "" + "a" = "a"
dp.has("a")  // true! ✓

// The magic happens here:
currentChainLength = Math.max(
    1,                  // Current value
    dp.get("a") + 1     // dp.get("a") = 1, so 1 + 1 = 2
)
currentChainLength = Math.max(1, 2) = 2
```

**What's happening:**

- `dp.get("a")` returns **1** (the longest chain ending at "a")
- We add **+1** because we're extending that chain with "ba"
- Chain visualization: `["a"]` → `["a", "ba"]` (length 2)

**i = 1:** Remove 'a'

```javascript
predecessor = "b" + "" = "b"
dp.has("b")  // false - doesn't exist
// No update (currentChainLength stays 2)
```

### Store result\_

```javascript
dp["ba"] = 2;
```

**Current DP state:**

```javascript
dp = {
  a: 1, // Chain: ["a"]
  ba: 2, // Chain: ["a", "ba"]
};
```

---

## Processing Word 3: "bda"

```javascript
word = "bda";
currentChainLength = 1; // Base case
```

### Try removing each character-

**i = 0:** Remove 'b'

```javascript
predecessor = "" + "da" = "da"
dp.has("da")  // false
// No update
```

**i = 1:** Remove 'd'

```javascript
predecessor = "b" + "a" = "ba"
dp.has("ba")  // true! ✓

currentChainLength = Math.max(
    1,                   // Current value
    dp.get("ba") + 1     // dp.get("ba") = 2, so 2 + 1 = 3
)
currentChainLength = Math.max(1, 3) = 3
```

**What's happening:**

- `dp.get("ba")` returns **2** (the chain `["a", "ba"]` has length 2)
- We add **+1** because we're adding "bda" to that chain
- Chain visualization: `["a", "ba"]` → `["a", "ba", "bda"]` (length 3)

**i = 2:** Remove 'a'

```javascript
predecessor = "bd" + "" = "bd"
dp.has("bd")  // false
// No update (currentChainLength stays 3)
```

### Store result\_\_

```javascript
dp["bda"] = 3;
```

**Current DP state:**

```javascript
dp = {
  a: 1, // Chain: ["a"]
  ba: 2, // Chain: ["a", "ba"]
  bda: 3, // Chain: ["a", "ba", "bda"]
};
```

---

## Processing Word 4: "bdca"

```javascript
word = "bdca";
currentChainLength = 1; // Base case
```

### Try removing each character\_\_

**i = 0:** Remove 'b'

```javascript
predecessor = "" + "dca" = "dca"
dp.has("dca")  // false
// No update
```

**i = 1:** Remove 'd'

```javascript
predecessor = "b" + "ca" = "bca"
dp.has("bca")  // false
// No update
```

**i = 2:** Remove 'c'

```javascript
predecessor = "bd" + "a" = "bda"
dp.has("bda")  // true! ✓

currentChainLength = Math.max(
    1,                    // Current value
    dp.get("bda") + 1     // dp.get("bda") = 3, so 3 + 1 = 4
)
currentChainLength = Math.max(1, 4) = 4
```

**What's happening:**

- `dp.get("bda")` returns **3** (the chain `["a", "ba", "bda"]` has length 3)
- We add **+1** because we're adding "bdca" to that chain
- Chain visualization: `["a", "ba", "bda"]` → `["a", "ba", "bda", "bdca"]` (length 4)

**i = 3:** Remove 'a'

```javascript
predecessor = "bdc" + "" = "bdc"
dp.has("bdc")  // false
// No update (currentChainLength stays 4)
```

### Store result\_\_\_

```javascript
dp["bdca"] = 4;
```

**Final DP state:**

```javascript
dp = {
  a: 1, // Chain: ["a"]
  ba: 2, // Chain: ["a", "ba"]
  bda: 3, // Chain: ["a", "ba", "bda"]
  bdca: 4, // Chain: ["a", "ba", "bda", "bdca"]
};

maxChain = 4; // Answer!
```

---

## Visual Chain Building

Here's how the chain grows with each `+1`:

```Javascript
Step 1: Process "a"
   dp["a"] = 1
   Chain: [a]
   Length: 1

Step 2: Process "ba"
   Find predecessor "a" with dp["a"] = 1
   dp["ba"] = dp["a"] + 1 = 1 + 1 = 2
   Chain: [a] → [a, ba]
   Length: 1 → 2

Step 3: Process "bda"
   Find predecessor "ba" with dp["ba"] = 2
   dp["bda"] = dp["ba"] + 1 = 2 + 1 = 3
   Chain: [a, ba] → [a, ba, bda]
   Length: 2 → 3

Step 4: Process "bdca"
   Find predecessor "bda" with dp["bda"] = 3
   dp["bdca"] = dp["bda"] + 1 = 3 + 1 = 4
   Chain: [a, ba, bda] → [a, ba, bda, bdca]
   Length: 3 → 4
```

---

## The Math Behind `+ 1`

### Why add 1?

The `+1` represents **the current word itself**!

```Javascript
Total chain length = (predecessor's chain length) + (current word)
                   = dp.get(predecessor) + 1
```

**Example:**

```javascript
// Predecessor "ba" has chain: ["a", "ba"] (length 2)
// Current word: "bda"
// New chain: ["a", "ba", "bda"] (length 3)

dp["bda"] = dp["ba"] + 1
          = 2 + 1
          = 3
```

---

## Multiple Predecessors Example

What if a word has **multiple valid predecessors**? We take the **maximum**!

### Example: Word "abc"

```javascript
// Suppose our DP state is:
dp = {
    "ab": 2,   // Chain length 2
    "ac": 3,   // Chain length 3
    "bc": 1    // Chain length 1
}

// Processing "abc":
currentChainLength = 1

// Try removing 'a': predecessor = "bc"
currentChainLength = Math.max(1, dp["bc"] + 1) = Math.max(1, 2) = 2

// Try removing 'b': predecessor = "ac"
currentChainLength = Math.max(2, dp["ac"] + 1) = Math.max(2, 4) = 4

// Try removing 'c': predecessor = "ab"
currentChainLength = Math.max(4, dp["ab"] + 1) = Math.max(4, 3) = 4

// Final result:
dp["abc"] = 4  // We chose the longest predecessor chain!
```

**Visualization:**

```Javascript
Option 1: "bc" → "abc"  (length 1 + 1 = 2)
Option 2: "ac" → "abc"  (length 3 + 1 = 4) ✓ BEST!
Option 3: "ab" → "abc"  (length 2 + 1 = 3)

We pick the longest: 4
```

---

## Detailed Code Trace

Here's the code with detailed comments for word "bda":

```javascript
word = "bda";
currentChainLength = 1; // Every word forms a chain of at least 1

// Loop through each position
for (let i = 0; i < word.length; i++) {
  const predecessor = word.slice(0, i) + word.slice(i + 1);

  if (dp.has(predecessor)) {
    // Found a valid predecessor!

    // BEFORE: currentChainLength = 1
    // predecessor = "ba"
    // dp.get("ba") = 2  (chain ["a", "ba"] has length 2)

    currentChainLength = Math.max(
      currentChainLength, // 1
      dp.get(predecessor) + 1, // 2 + 1 = 3
    );

    // AFTER: currentChainLength = 3
    // This means: we can build a chain of length 3 ending at "bda"
    // The chain is: ["a", "ba", "bda"]
  }
}

// Store the longest chain ending at this word
dp.set(word, currentChainLength); // dp["bda"] = 3
```

---

## Why Use `Math.max()`?

We use `Math.max()` because a word might have **multiple predecessors**, and we want the **longest** chain.

### Example Scenario

```javascript
// Imagine this DP state:
dp = {
    "ba": 2,
    "da": 1
}

// Processing "bda":
word = "bda"
currentChainLength = 1

// Remove 'b' → predecessor = "da"
if (dp.has("da")) {  // true
    currentChainLength = Math.max(1, dp["da"] + 1)
                       = Math.max(1, 1 + 1)
                       = Math.max(1, 2)
                       = 2
}

// Remove 'd' → predecessor = "ba"
if (dp.has("ba")) {  // true
    currentChainLength = Math.max(2, dp["ba"] + 1)
                       = Math.max(2, 2 + 1)
                       = Math.max(2, 3)
                       = 3  ✓ Better option!
}

// We keep the maximum: 3
dp["bda"] = 3
```

---

## Complete Example Table

For the array `["a", "ba", "bda", "bdca"]`:

| Word   | Predecessors Found | Calculation       | Result           | Chain Representation         |
| ------ | ------------------ | ----------------- | ---------------- | ---------------------------- |
| "a"    | None               | Base case         | `dp["a"] = 1`    | `["a"]`                      |
| "ba"   | "a" (dp=1)         | `max(1, 1+1) = 2` | `dp["ba"] = 2`   | `["a", "ba"]`                |
| "bda"  | "ba" (dp=2)        | `max(1, 2+1) = 3` | `dp["bda"] = 3`  | `["a", "ba", "bda"]`         |
| "bdca" | "bda" (dp=3)       | `max(1, 3+1) = 4` | `dp["bdca"] = 4` | `["a", "ba", "bda", "bdca"]` |

---

## Key Insights

### The DP Recurrence Relation

```Javascript
dp[word] = max(
    1,  // Base case: word itself forms a chain
    max(dp[predecessor] + 1) for all valid predecessors
)
```

### What Each Part Means

- **`dp[predecessor]`**: The longest chain we've already built ending at the predecessor
- **`+ 1`**: Add the current word to extend that chain
- **`Math.max()`**: Choose the best predecessor if multiple exist

### The Building Block Principle

Think of it like stacking blocks:

- Each word is a block
- You can only stack on blocks below (predecessors)
- The height of your stack = height of block below + 1
- Choose the tallest stack to build upon!

```Javascript
"bdca"  ← Current word (block we're placing)
  |
  +1    ← Adding this word to the chain
  |
 "bda"  ← Best predecessor (dp value = 3)
  ↓
Chain length = 3 + 1 = 4
```

---

**Key Takeaway:** `dp.get(predecessor) + 1` is the heart of the DP solution! It says: "Take the longest chain ending at my predecessor and add me to it!" 🎯javascript
