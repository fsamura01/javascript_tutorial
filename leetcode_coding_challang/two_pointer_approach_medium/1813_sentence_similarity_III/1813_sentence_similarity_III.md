# LeetCode #1813 — Sentence Similarity III

**Pattern:** Two Pointers (Opposite Ends)  
**Difficulty:** Medium

---

## Problem

Given two strings `sentence1` and `sentence2`, return `true` if they are similar. Two sentences are similar if inserting an arbitrary sentence into ONE of them can make them equal. The inserted words must be separated by spaces.

***Example 1***

```Javascript
Input:  sentence1 = "My name is Haley", sentence2 = "My Haley"
Output: true

Explanation: Insert "name is" between "My" and "Haley" in sentence2
```

***Example 2***

```Javascript
Input:  sentence1 = "of", sentence2 = "A lot of words"
Output: false

Explanation: "of" exists in sentence2 but we can only insert
             one contiguous block — not before AND after "of" ❌
```

***Example 3***

```Javascript
Input:  sentence1 = "Eating right now", sentence2 = "Eating"
Output: true

Explanation: Insert "right now" at the end of sentence2
```

***Constraints***

- `1 <= sentence1.length, sentence2.length <= 100`
- Consist of lowercase and uppercase English letters and spaces
- Words separated by a single space

---

## Clarifying Questions & Answers

**Q: Why is Example 2 false if "of" exists in sentence2?**  
We can only insert one contiguous block in ONE place. Making `"of"` equal to `"A lot of words"` would require inserting before AND after `"of"` — two separate insertions ❌

**Q: Why does `"Frog cool"` and `"Frogs are cool"` fail?**  
Words must match EXACTLY — `"Frog" !== "Frogs"`. The inserted `"s are"` is not separated from `"Frog"` by a space ❌

**Q: Where can the inserted block go?**

```Javascript
Beginning: [INSERT] "Hello" "Jane"
Middle:    "Hello" [INSERT] "Jane"
End:       "Hello" "Jane" [INSERT]
```

**Q: Why split sentences into word arrays?**  
Comparing word by word is cleaner than character by character and avoids partial word matching issues like `"Frog" !== "Frogs"`.

---

## Key Concepts

**Core insight:** Match words from BOTH ends simultaneously. Whatever is left unmatched in the middle must only exist in the LONGER sentence.

**Two pointers — counter approach:**

```Javascript
left  = 0  → counts words matched from the LEFT
right = 0  → counts words matched from the RIGHT
```

Both start at `0` because they COUNT matches, not positions!

**Accessing elements from the right:**

```Javascript
words[words.length - 1 - right]

right=0 → last element        ("matched 0 so far")
right=1 → second to last      ("matched 1 so far")
right=2 → third to last       ("matched 2 so far")
```

**Why not `right = array.length - 1`?**

Normal two pointer on ONE array uses `right = array.length - 1`. Here we have TWO arrays of DIFFERENT lengths — one right index can't serve both! The counter formula works independently for each array using its OWN length.

**Final condition — why `>=` not `===`?**  
When sentences are identical, pointers OVERLAP — same words counted twice:

```Javascript
words1 = ["My", "Haley"] → left=2, right=2
left + right = 4 > Math.min(2,2) = 2
4 === 2 → false ❌ WRONG!
4 >= 2  → true  ✅ CORRECT!
```

---

## Brute Force vs Optimized

| | Brute Force | Two Pointers |
|---|---|---|
| Method | Try every insertion position and block | Match from both ends |
| Time | O(n⁴) | O(n) |
| Space | O(1) | O(n) |

**Why O(n⁴) brute force?**

```Javascript
Loop 1 — insertion positions:    O(n)
  Loop 2 — start of block:       O(n)   ← nested inside loop 1
    Loop 3 — end of block:       O(n)   ← nested inside loop 2
      Loop 4 — comparison:       O(n)   ← nested inside loop 3
Total: n × n × n × n = O(n⁴) ❌
```

**Sequential vs Nested operations:**

```Javascript
Sequential (one after another) → ADD:      O(n) + O(n) = O(n)
Nested (inside each other)     → MULTIPLY: O(n) × O(n) = O(n²)
```

---

## Pseudocode

```Javascript
function areSentencesSimilar(sentence1, sentence2):
  words1 = sentence1.split(" ")
  words2 = sentence2.split(" ")

  left  = 0
  right = 0

  // Match from left
  while left < words1.length AND left < words2.length
        AND words1[left] === words2[left]:
    left++

  // Match from right
  while right < words1.length AND right < words2.length
        AND words1[words1.length-1-right] === words2[words2.length-1-right]:
    right++

  return left + right >= Math.min(words1.length, words2.length)
```

---

## Solution

```javascript
function areSentencesSimilar(sentence1, sentence2) {
  const words1 = sentence1.split(" ");
  const words2 = sentence2.split(" ");

  let left  = 0;
  let right = 0;

  // Match from left
  while (left < words1.length && left < words2.length
         && words1[left] === words2[left]) {
    left++;
  }

  // Match from right
  while (right < words1.length && right < words2.length
         && words1[words1.length-1-right] === words2[words2.length-1-right]) {
    right++;
  }

  return left + right >= Math.min(words1.length, words2.length);
}
```

---

## Dry Run

**Example 1:** `sentence1 = "My name is Haley"`, `sentence2 = "My Haley"`

```Javascript
words1 = ["My", "name", "is", "Haley"]
words2 = ["My", "Haley"]
left=0, right=0
```

**Left matching:**

| left | words1[left] | words2[left] | Match? | Action |
|------|-------------|-------------|--------|--------|
| 0 | "My" | "My" | ✅ | left=1 |
| 1 | "name" | "Haley" | ❌ | stop |

**Right matching:**

| right | words1[3-right] | words2[1-right] | Match? | Action |
|-------|----------------|----------------|--------|--------|
| 0 | words1[3]="Haley" | words2[1]="Haley" | ✅ | right=1 |
| 1 | words1[2]="is" | words2[0]="My" | ❌ | stop |

**Final check:**

```Javascript
left + right = 1 + 1 = 2
Math.min(4, 2) = 2
2 >= 2 → true ✅
```

---

**Example 2:** `sentence1 = "of"`, `sentence2 = "A lot of words"`

```Javascript
words1 = ["of"]
words2 = ["A", "lot", "of", "words"]
```

Left matching: `"of" !== "A"` → left=0  
Right matching: `"of" !== "words"` → right=0

```Javascript
left + right = 0
Math.min(1, 4) = 1
0 >= 1 → false ✅
```

---

## Edge Cases

| Case | left | right | Result |
|------|------|-------|--------|
| Both sentences identical | n | n | left+right=2n >= n → `true` |
| Single word matches first word | 1 | 0 | 1 >= 1 → `true` |
| Single word matches last word | 0 | 1 | 1 >= 1 → `true` |

---

## Complexity

| | Value | Reason |
|---|---|---|
| Time | O(n) | Split + left match + right match — all sequential |
| Space | O(n) | words1 and words2 arrays created from splitting |

---

## Reflection

**Why the counter approach works:**  
`words[words.length - 1 - right]` lets one counter serve as a "distance from the end" for ANY array — each array uses its own length independently!

**Common mistakes to avoid:**

- Using `right = array.length - 1` (index) instead of `right = 0` (counter)
- Using `===` instead of `>=` in the final condition — fails for identical sentences!
- Forgetting bounds check on BOTH arrays in while loops
- Comparing characters instead of words — must split first!
- Partial word matching — `"Frog" !== "Frogs"` is always false!

---

## Related Problems

| # | Title | Pattern |
|---|-------|---------|
| 1750 | Minimum Length of String After Deleting Similar Ends | Two Pointers (Opposite Ends) |
| 392 | Is Subsequence | Two Pointers (Same Direction) |
| 1764 | Form Array by Concatenating Subarrays | Greedy + Two Pointers |
