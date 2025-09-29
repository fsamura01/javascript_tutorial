# *524. Longest Word in Dictionary through Deleting*

## 1. Problem Understanding

This problem asks us to find the longest string from a dictionary that can be formed as a **subsequence** of the given string `s`. A subsequence maintains relative order but allows deletions.

Key points:

- We're finding subsequences, not substrings
- If multiple words have the same length, return the lexicographically smallest
- Return empty string if no valid word exists

## 2. Constraints Analysis

- `s.length ≤ 1000`: Small enough for O(n²) solutions
- `dictionary.length ≤ 1000`: Can check each word individually
- `dictionary[i].length ≤ 1000`: Individual word checks are manageable
- All lowercase letters: No case sensitivity issues

## 3. Breaking Down the Problem

1. Check if each dictionary word can be formed as a subsequence of `s`
2. Among valid words, find the longest one
3. If tie in length, choose lexicographically smallest

## 4. Pattern Identification

**Two Pointers Pattern**: Use two pointers to check if one string is a subsequence of another. This is a classic subsequence matching problem.

## 5. Step-by-Step Approach

1. Create a helper function `isSubsequence(word, s)` using two pointers
2. Iterate through dictionary, checking each word
3. Track the best valid word based on length and lexicographical order
4. Return the best word or empty string

## 6. Code Implementation

## 7. Complexity Analysis

**Time Complexity**: O(n × m × k)

- n = dictionary length
- m = average word length
- k = string s length
- For each word, we scan through s once

**Space Complexity**: O(1)

- Only using a few variables, no extra data structures

## 8. Alternative Solutions

**Optimization**: Sort dictionary by length (descending) then lexicographically. Return first valid subsequence found.

```javascript
// Sort optimization
dictionary.sort((a, b) => b.length - a.length || a.localeCompare(b));
for (let word of dictionary) {
    if (isSubsequence(word, s)) return word;
}
return "";
```

## 9. Practice Recommendations

Similar subsequence problems:

- **392. Is Subsequence**: Direct application of the helper function
- **524. Longest Word in Dictionary through Deleting**: This problem
- **792. Number of Matching Subsequences**: Multiple subsequence matching

## 10. Flowchart Design

## Summary

This problem uses the **two pointers** pattern for subsequence matching. The key insight is that we need to:

1. Check each word as a potential subsequence
2. Compare candidates by length first, then lexicographically
3. Use efficient O(n) subsequence checking with two pointers

The pattern appears frequently in string problems and is essential for technical interviews. Practice the recommended problems to solidify your understanding of subsequence operations.

---
Absolutely! Let me break down this condition in detail:

## String Comparison Logic

```javascript
(word.length === result.length && word < result)
```

This condition handles the **tie-breaking rule** when two words have the same length.

### Part 1: `word.length === result.length`

This checks if the current word and our best result so far have the same length.

### Part 2: `word < result`

This is **lexicographical comparison** - comparing strings alphabetically like in a dictionary.

## How String Comparison Works

In both JavaScript and Java, when you compare strings with `<` or `>`, they compare character by character using ASCII values:

```javascript
"apple" < "apply"  // true (e comes before y)
"a" < "b"         // true 
"abc" < "abd"     // true (c comes before d)
"apple" < "banana" // true (a comes before b)
```

## Visual Example

Let's trace through Example 1:

- `s = "abpcplea"`
- `dictionary = ["ale","apple","monkey","plea"]`

**Step by step:**

1. **"ale"** (length 3) - is subsequence ✓
   - `result = "ale"`

2. **"apple"** (length 5) - is subsequence ✓
   - `5 > 3`, so `result = "apple"`

3. **"monkey"** (length 6) - **NOT** a subsequence ✗
   - Skip this word

4. **"plea"** (length 4) - is subsequence ✓
   - `4 < 5`, so keep `result = "apple"`

## Another Example with Ties

```javascript
s = "abc"
dictionary = ["cab", "abc", "bac"]
```

All three words have length 3 and are subsequences:

1. **"cab"** - `result = "cab"`
2. **"abc"** - Same length (3), but `"abc" < "cab"` ✓
   - `result = "abc"`
3. **"bac"** - Same length (3), but `"bac" > "abc"` ✗
   - Keep `result = "abc"`

## Code Walkthrough## The Complete Condition Breakdown

```javascript
if (word.length > result.length || 
    (word.length === result.length && word < result)) {
    result = word;
}
```

This reads as: "Update result if the new word is..."

- **Longer** than current result, OR
- **Same length** AND **lexicographically smaller**

## Why This Order Matters

We check length first because the problem prioritizes:

1. **Length** (longer is better)
2. **Lexicographical order** (only when lengths are equal)

If we wrote `word < result || word.length > result.length`, it would incorrectly prioritize alphabetical order over length!

This tie-breaking mechanism ensures we always get the "best" answer according to the problem's criteria

---
Great question! String comparison doesn't stop at the first character - it continues character by character until it finds a difference.

## How String Comparison Actually Works

```javascript
"apple" < "banana"
```

**Step by step:**

1. Compare `a` vs `b` → `a` comes before `b` in alphabet
2. Since we found a difference, return `true`
3. **Stop here** - no need to check remaining characters

## When It Continues Past First Character

```javascript
"apple" < "apply"
```

**Step by step:**

1. `a` vs `a` → same, continue
2. `p` vs `p` → same, continue  
3. `p` vs `p` → same, continue
4. `l` vs `l` → same, continue
5. `e` vs `y` → `e` comes before `y`, return `true`

## More Examples

```javascript
"cat" < "car"    // false (t > r at position 2)
"abc" < "abcd"   // true (shorter string when all chars match)
"zoo" < "apple"  // false (z > a at position 0)
```

The comparison stops as soon as it finds the first differing character. In `"apple" < "banana"`, that happens immediately at position 0, so it looks like only the first character matters - but it would continue if needed.
