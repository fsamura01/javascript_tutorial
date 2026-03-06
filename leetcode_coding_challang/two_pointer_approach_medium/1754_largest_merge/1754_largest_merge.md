# LeetCode1754 — Largest Merge Of Two Strings

**Pattern:** Greedy Algorithm + Two Pointers  
**Difficulty:** Medium

---

## Problem

Given two strings `word1` and `word2`, construct a string `merge` by repeatedly appending the first character of either string. Return the **lexicographically largest** merge possible.

***Example 1***

```Javascript
Input:  word1 = "cabaa", word2 = "bcaaa"
Output: "cbcabaaaaa"

Explanation:
  - 'c' > 'b' → take from word1 → merge="c"
  - 'a' < 'b' → take from word2 → merge="cb"
  - 'a' < 'c' → take from word2 → merge="cbc"
  - "abaa" > "aaa" → take from word1 → merge="cbca"
  - "baa"  > "aaa" → take from word1 → merge="cbcab"
  - Append remaining 5 a's → merge="cbcabaaaaa"
```

***Example 2***

```Javascript
Input:  word1 = "abcabc", word2 = "abdcaba"
Output: "abdcabcabcaba"
```

***Constraints***

- `1 <= word1.length, word2.length <= 3000`
- `word1` and `word2` consist only of lowercase English letters

---

## Clarifying Questions & Answers

**Q: What does lexicographically larger mean?**  
A character/string that appears later in dictionary order. `'z' > 'a'`, `'c' > 'b'`, `"abd" > "abc"`.

**Q: Why was `'c'` chosen over `'b'` in the first step?**  
Because `'c' > 'b'` in dictionary order — we always pick the character that gives the largest possible result.

**Q: What if both strings start with the same character?**  
Compare the FULL remaining strings and pick from whichever is lexicographically larger. This ensures the best long-term decision, not just based on one character.

**Q: Can we compare strings directly with `>` in JavaScript?**  
YES! JavaScript compares strings lexicographically by default:

```js
"cabc" > "caz"  // false — "caz" is larger
"abd"  > "abc"  // true
"aa"   > "a"    // true  — longer wins when all chars match
"a"    > ""     // true  — non-empty always beats empty
```

---

## Key Concepts

**Greedy Algorithm:** At each step, make the locally best choice to get the globally best result. Don't explore all possibilities — just pick the best option available right now!

**Two Pointers:** One pointer per string, moving forward as we pick characters.

**Decision rule — one comparison handles all three cases:**

```Javascript
if word1 > word2 → pick from word1
else             → pick from word2
```

| Case                  | How it's handled                      |
|-----------------------|---------------------------------------|
| `word1[i] > word2[j]` | word1 is larger — picks word1         |
| `word2[j] > word1[i]` | word2 is larger — picks word2         |
| Equal first char      | Compares rest of string automatically |

---

## Brute Force vs Optimized

|        | Brute Force                    | Greedy                         |
|--------|--------------------------------|--------------------------------|
| Method | Try every possible combination | Pick locally best at each step |
| Time   | O(2^(n+m)) — impossible        | O((n+m)²)                      |
| Space  | O(2^(n+m))                     | O(n+m)                         |

**Why O(2^(n+m)) brute force?**  
At each of n+m steps we have 2 choices (word1 or word2) → 2 × 2 × 2 ... (n+m times) = 2^(n+m) combinations.

**Why O((n+m)²) greedy?**  
n+m total steps × O(n+m) per string comparison = O((n+m)²).

**Dramatic difference with max constraints (n=m=3000):**

```Javascript
Brute force: 2^6000 → astronomically large
Greedy:      6000²  = 36,000,000 → fast!
```

---

## Algorithm Steps

1. Initialize `merge = ""`
2. While `word1` OR `word2` is not empty:
   - If `word1` not empty AND `word1 > word2` → append `word1[0]`, remove it from `word1`
   - Else if `word2` not empty → append `word2[0]`, remove it from `word2`
3. Return `merge`

> **Note:** The condition `word1 not empty AND word1 > word2` is key:
>
> - `word1 not empty` prevents picking from an exhausted string
> - `word1 > word2` handles tie-breaking automatically
> - If `word1` is empty → `"" < anything` → picks `word2`
> - If `word2` is empty → `word1 > ""` → picks `word1`

---

## Pseudocode

```Javascript
function largestMerge(word1, word2):
  merge = ""

  while word1 is not empty OR word2 is not empty:
    if word1 is not empty AND word1 > word2:
      merge += word1[0]           // append first char
      word1 = word1.slice(1)      // remove first char

    else if word2 is not empty:
      merge += word2[0]           // append first char
      word2 = word2.slice(1)      // remove first char

  return merge
```

---

## Solution

```javascript
function largestMerge(word1, word2) {
  let merge = "";

  while (word1 !== "" || word2 !== "") {
    if (word1 !== "" && word1 > word2) {
      merge += word1[0];          // append first char of word1
      word1 = word1.slice(1);     // remove first char of word1
    } else if (word2 !== "") {
      merge += word2[0];          // append first char of word2
      word2 = word2.slice(1);     // remove first char of word2
    }
  }

  return merge;
}
```

---

## Dry Run

`word1 = "cabaa"`, `word2 = "bcaaa"`

| Step | word1   | word2   | Comparison               | Pick | merge        |
|------|---------|---------|--------------------------|------|--------------|
| 1    | "cabaa" | "bcaaa" | 'c' > 'b' → true         | w1   | "c"          |
| 2    | "abaa"  | "bcaaa" | 'a' < 'b' → false        | w2   | "cb"         |
| 3    | "abaa"  | "caaa"  | 'a' < 'c' → false        | w2   | "cbc"        |
| 4    | "abaa"  | "aaa"   | "abaa" > "aaa" ('b'>'a') | w1   | "cbca"       |
| 5    | "baa"   | "aaa"   | 'b' > 'a' → true         | w1   | "cbcab"      |
| 6    | "aa"    | "aaa"   | "aa" < "aaa" → false     | w2   | "cbcaba"     |
| 7    | "aa"    | "aa"    | equal → false            | w2   | "cbcabaa"    |
| 8    | "aa"    | "a"     | "aa" > "a" → true        | w1   | "cbcabaaa"   |
| 9    | "a"     | "a"     | equal → false            | w2   | "cbcabaaaa"  |
| 10   | "a"     | ""      | "a" > "" → true          | w1   | "cbcabaaaaa" |
| 11   | ""      | ""      | both empty → STOP        |      |              |

Result: `"cbcabaaaaa"` ✅

**Tie-breaking notes:**

```Javascript
"aa" > "aaa" → false  (shorter loses when all chars match)
"aa" > "a"   → true   (longer wins when all chars match)
"a"  > ""    → true   (non-empty always > empty)
```

---

## Edge Cases

| Case                        | Behavior                                               |
|-----------------------------|--------------------------------------------------------|
| One string empty from start | `"" > "abc"` → false → appends all of remaining string |
| Both strings identical      | Always picks word2, result same either way             |
| One string entirely larger  | Picks all of larger string first, then appends rest    |

---

## Complexity

|       |Value      | Reason                                                 |
|-------|-----------|--------------------------------------------------------|
| Time  | O((n+m)²) | n+m steps × O(n+m) per string comparison               |
| Space | O(n+m)    | merge string contains all characters from both strings |

---

## Reflection

**Why greedy works here:**

- We want the largest character as early as possible
- When tied, the string that diverges higher later is better
- These properties make greedy choices always optimal

**When to use greedy:**

- Making the locally best choice leads to the globally best result
- Problem involves optimization (maximize/minimize something)
- Ask yourself: *"Does taking the best option NOW ever hurt me later?"*

**Common mistakes to avoid:**

- Comparing only first characters when they are equal — must compare full remaining strings
- Forgetting to check if string is non-empty before picking
- Using `==` instead of `>` — `==` checks equality, `>` checks lexicographic order
- Confusing greedy with brute force — greedy picks BEST at each step, not ALL possibilities

---

## Related Problems

| #   | Title                            | Pattern               |
|-----|----------------------------------|-----------------------|
| 455 | Assign Cookies                   | Greedy                |
| 881 | Boats to Save People             | Greedy + Two Pointers |
| 435 | Non-overlapping Intervals        | Greedy                |
| 452 | Minimum Arrows to Burst Balloons | Greedy                |
| 135 | Candy                            | Greedy (Hard)         |
| 45  | Jump Game II                     | Greedy (Hard)         |
