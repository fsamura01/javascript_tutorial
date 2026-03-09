# LeetCode #392 — Is Subsequence

**Pattern:** Two Pointers (Same Direction)  
**Difficulty:** Easy

---

## Problem

Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise.

A subsequence is formed by deleting some characters from the original string without disturbing the relative order of remaining characters.

***Example 1***

```Javascript
Input:  s = "abc", t = "ahbgdc"
Output: true

Explanation:
  a → found at t[0] ✅
  b → found at t[2] ✅
  c → found at t[5] ✅
```

***Example 2***

```Javascript
Input:  s = "axc", t = "ahbgdc"
Output: false

Explanation:
  a → found at t[0] ✅
  x → not found in t ❌
```

***Constraints***

- `0 <= s.length <= 100`
- `0 <= t.length <= 10⁴`
- `s` and `t` consist only of lowercase English letters

---

## Clarifying Questions & Answers

**Q: What is the difference between a subsequence and a substring?**

|            | Gaps allowed? | Order maintained? |
|------------|---------------|-------------------|
| Subsequence| ✅ Yes        | ✅ Yes            |
| Substring  | ❌ No         | ✅ Yes            |

```Javascript
"ace" is a subsequence of "abcde" ✅  (gaps allowed)
"ace" is NOT a substring of "abcde" ❌ (not contiguous)
```

**Q: What if `s` is an empty string?**  
Always return `true` — an empty string is a subsequence of any string.

**Q: What if `t` is an empty string?**  
Return `true` only if `s` is also empty. If `s` has characters but `t` is empty → `false`.

---

## Key Concepts

**Two pointers moving in the same direction:**

```Javascript
s = "a c e"
     ↑
     i → moves ONLY when s[i] === t[j]

t = "a b c d e"
     ↑
     j → ALWAYS moves forward
```

**Decision at each step:**

- If `s[i] === t[j]` → match found! Move both `i` and `j`
- If `s[i] !== t[j]` → no match, move only `j`

**Return conditions:**

- `i === s.length` → all characters of `s` matched → `true`
- `j` reaches end of `t` but `i !== s.length` → `false`

---

## Comparison with #1764

|        |#392 Is Subsequence  |#1764 Form Array     |
|--------|---------------------|---------------------|
| Type   | Subsequence         | Subarray            |
| Gaps   | ✅ Allowed          | ❌ Not allowed      |
| Match  | One char at a time  | Contiguous block    |
| Helper | Not needed          | matchesAt needed    |
| Time   | O(m)                | O(m·k)              |
| Greedy | ✅ Take first match | ✅ Take first match |

Both use greedy — take the first valid match immediately!

---

## Brute Force vs Optimized

|        | Brute Force                  | Two Pointers                  |
|--------|------------------------------|-------------------------------|
| Method | Check every subsequence of t | Scan t once with two pointers |
| Time   | O(2^m)                       | O(m)                          |
| Space  | O(2^m)                       | O(1)                          |

**Why O(2^m) brute force?**  
For each character in `t` you can include or exclude it → 2 choices × m characters = 2^m subsequences.

---

## Pseudocode

```Javascript
function isSubsequence(s, t):
  i = 0    // pointer for s
  j = 0    // pointer for t

  while j < t.length:
    if s[i] === t[j]:
      i++          // match found, move s pointer
    j++            // always move t pointer

    if i === s.length:
      return true  // all of s matched!

  return i === s.length
```

---

## Solution

```javascript
function isSubsequence(s, t) {
  let i = 0;
  let j = 0;

  while (j < t.length) {
    if (s[i] === t[j]) {
      i++;  // match found, move s pointer
    }
    j++;    // always move t pointer

    if (i === s.length) {
      return true;  // all of s matched early!
    }
  }

  return i === s.length;
}
```

---

## Dry Run

`s = "abc"`, `t = "ahbgdc"`

| j | t[j] | i | s[i] | Match? | i after | j after |
|---|------|---|------|--------|---------|---------|
| 0 | 'a'  | 0 | 'a'  | ✅     | 1       | 1       |
| 1 | 'h'  | 1 | 'b'  | ❌     | 1       | 2       |
| 2 | 'b'  | 1 | 'b'  | ✅     | 2       | 3       |
| 3 | 'g'  | 2 | 'c'  | ❌     | 2       | 4       |
| 4 | 'd'  | 2 | 'c'  | ❌     | 2       | 5       |
| 5 | 'c'  | 2 | 'c'  | ✅     | 3       | 6       |

`i=3 === s.length=3` → return `true` ✅

---

## Edge Cases

| Case                        | Behavior                                                |
|-----------------------------|---------------------------------------------------------|
| `s` is empty                | `i=0 === s.length=0` → `true` immediately               |
| `t` is empty, `s` not empty | Loop never runs → `i=0 !== s.length` → `false`          |
| `s` longer than `t`         | `j` exhausts `t` before `i` reaches `s.length` → `false`|
| `s` and `t` identical       | Every character matches → `true`                        |

---

## Complexity

|       | Value | Reason                                 |
|-------|-------|----------------------------------------|
| Time  | O(m)  | Scan `t` once, one comparison per step |
| Space | O(1)  | Only `i` and `j` variables             |

---

## Follow Up — Multiple Queries

**Problem:** k >= 10⁹ incoming `s` strings, check each against same `t`.

**Current solution:** O(k·m) → 10⁹ × 10⁴ = too slow! ❌

**Optimized approach — Index Mapping:**  
Preprocess `t` into a map: for each position and character, store the **next occurrence** of that character.

```Javascript
t = "ahbgdc"

nextIndex[0]['a'] = 0
nextIndex[0]['b'] = 2
nextIndex[0]['c'] = 5
...
```

For each query `s`:

- Instead of scanning `t` character by character → **jump directly** to next occurrence
- Each lookup → O(log m) using binary search
- Each query → O(n log m) instead of O(m)
- Total → **O(m² + k·n·log m)** — much faster for large k! ✅

---

## Reflection

**Why greedy works:**  
Taking the first match of each character in `t` is always optimal. Skipping a valid match can only delay or prevent matching remaining characters.

**When to use this pattern:**  

- Checking if one sequence appears within another in order
- Elements don't need to be contiguous
- Two strings/arrays being compared simultaneously

**Common mistakes to avoid:**

- Moving `i` even when there's no match
- Forgetting the final `return i === s.length` for when loop ends without early return
- Confusing subsequence with substring — gaps ARE allowed!
- Returning `false` for empty `s` — empty string is always a valid subsequence!

---

## Related Problems

| #    | Title                                 | Pattern               |
|------|---------------------------------------|-----------------------|
| 1764 | Form Array by Concatenating Subarrays | Greedy + Two Pointers |
| 792  | Number of Matching Subsequences       | Index Mapping         |
| 1055 | Shortest Way to Form String           | Greedy + Two Pointers |
| 28   | Find Index of First Occurrence        | Pattern Matching      |
