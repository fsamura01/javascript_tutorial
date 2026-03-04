# CODING INTERVIEW STUDY NOTES

LeetCode 1750 — Minimum Length of String After Deleting Similar Ends

  Pattern: Two Pointers (Both Ends) | Difficulty: Medium

----------------------------------------------------------------

1. PROBLEM STATEMENT

----------------------------------------------------------------

Given a string s consisting only of 'a', 'b', and 'c'.
Apply the following algorithm any number of times:

  1. Pick a non-empty PREFIX where all characters are equal
  2. Pick a non-empty SUFFIX where all characters are equal
  3. Prefix and suffix must NOT intersect
  4. Characters from prefix and suffix must be the SAME
  5. Delete both prefix and suffix

Return the minimum length of s after performing operations.

Example 1:
  Input:  s = "ca"
  Output: 2
  Explanation: 'c' != 'a' → can't remove anything

Example 2:
  Input:  s = "cabaabac"
  Output: 0
  Explanation:
    - Remove prefix="c", suffix="c" → "abaaba"
    - Remove prefix="a", suffix="a" → "baab"
    - Remove prefix="b", suffix="b" → "aa"
    - Remove prefix="a", suffix="a" → ""

Example 3:
  Input:  s = "aabccabba"
  Output: 3
  Explanation:
    - Remove prefix="aa", suffix="a" → "bccabb"
    - Remove prefix="b", suffix="bb" → "cca"

Constraints:

- 1 <= s.length <= 10^5
- s only consists of 'a', 'b', 'c'

----------------------------------------------------------------

1. CLARIFYING QUESTIONS & ANSWERS

----------------------------------------------------------------

Q: Can prefix and suffix be different lengths?
A: YES! They just need to be made of the SAME character.
   Example: prefix="aa" and suffix="a" are both 'a' → valid ✅

Q: Why must prefix and suffix not intersect?
A: Without this condition, both pointers could point to the
   same character — trying to remove it twice. They must be
   completely separate parts of the string.

Q: Why can't we remove anything from "ca"?
A: s[left]='c' and s[right]='a' are DIFFERENT characters.
   Condition 4 fails — prefix and suffix must be same character.

Q: How do we represent current boundaries without modifying string?
A: Use two pointers:

- left  → starts at index 0
- right → starts at index s.length - 1
   Current length = right - left + 1

----------------------------------------------------------------

1. PATTERN: TWO POINTERS FROM BOTH ENDS

----------------------------------------------------------------

Start from both ends and move INWARD:

  s = "c a b a a b a c"
       ↑               ↑
      left            right

When s[left] === s[right]:

- Save matchChar = s[left]
- Move left inward while s[left] === matchChar
- Move right inward while s[right] === matchChar

When s[left] !== s[right]:

- Stop! Can't remove anything more

WHY SAVE matchChar FIRST?
  As we move left inward, s[left] changes!
  We need to remember what character we started with.

----------------------------------------------------------------

1. BRUTE FORCE vs OPTIMIZED

----------------------------------------------------------------

  Approach   | Brute Force                | Two Pointers (Optimized)
  -----------|----------------------------|-------------------------
  Method     | Build new string each      | Move pointers inward

             | operation                  | no new strings!
  Time       | O(n^2) — too slow ❌      | O(n) — single pass ✅
  Space      | O(n) — new strings ❌     | O(1) — just pointers ✅

Why O(n^2) brute force?
  n operations × O(n) to build new string = O(n^2)

Why O(n) two pointers?
  Each character is visited AT MOST ONCE → O(n)

----------------------------------------------------------------

1. ALGORITHM STEPS

----------------------------------------------------------------

1. Initialize left=0, right=s.length-1
2. While left < right AND s[left] === s[right]:
   a. Save matchChar = s[left]
   b. Move left inward while left<=right AND s[left]===matchChar
   c. Move right inward while left<=right AND s[right]===matchChar
3. Return Math.max(0, right - left + 1)

WHY left < right in outer loop?
  When left === right, both pointers point to SAME character.
  Prefix and suffix would intersect → not allowed!
  So we need TWO separate characters to compare.

WHY Math.max(0, right - left + 1)?
  When string is fully deleted, left > right.
  right - left + 1 gives NEGATIVE number.
  Math.max(0, ...) handles this → returns 0 correctly!

----------------------------------------------------------------

1. PSEUDOCODE

----------------------------------------------------------------

>function minimumLength(s):
>
> left = 0
> >
> right = s.length - 1
>
> while left < right AND s[left] === s[right]:
>
> matchChar = s[left]         // save matching character
>
> // Move left inward while matching
>
> while left <= right AND s[left] === matchChar:
> left++
>
> // Move right inward while matching
>
> while left <= right AND s[right] === matchChar:
> right--
>
> return Math.max(0, right - left + 1)

----------------------------------------------------------------

1. DRY RUN — Example 2

----------------------------------------------------------------

Input: s = "cabaabac"

            01234567

Initial: left=0, right=7

--- Iteration 1 ---

s[0]='c', s[7]='c' → match! ✅

matchChar = 'c'

Move left:

  s[0]='c' matches ✅ left++ → left=1

  s[1]='a' no match ❌ stop!

Move right:

  s[7]='c' matches ✅ right-- → right=6

  s[6]='a' no match ❌ stop!

State: left=1, right=6

Remaining: s[1..6] = "abaaba"

--- Iteration 2 ---

s[1]='a', s[6]='a' → match! ✅

matchChar = 'a'

Move left:

  s[1]='a' matches ✅ left++ → left=2

  s[2]='b' no match ❌ stop!

Move right:

  s[6]='a' matches ✅ right-- → right=5

  s[5]='b' no match ❌ stop!

State: left=2, right=5

Remaining: s[2..5] = "baab"

--- Iteration 3 ---

s[2]='b', s[5]='b' → match! ✅

matchChar = 'b'

Move left:

  s[2]='b' matches ✅ left++ → left=3

  s[3]='a' no match ❌ stop!

Move right:

  s[5]='b' matches ✅ right-- → right=4

  s[4]='a' no match ❌ stop!

State: left=3, right=4

Remaining: s[3..4] = "aa"

--- Iteration 4 ---

s[3]='a', s[4]='a' → match! ✅

matchChar = 'a'

Move left:

  s[3]='a' matches ✅ left++ → left=4

  s[4]='a' matches ✅ left++ → left=5

Move right:

  s[4]='a' matches ✅ right-- → right=3

State: left=5, right=3 → left > right!

Outer loop: left < right → 5 < 3 → false! STOP!

Return: Math.max(0, 3 - 5 + 1) = Math.max(0, -1) = 0 ✅

Matches expected output!

----------------------------------------------------------------

1. EDGE CASES

----------------------------------------------------------------

- Single character (e.g. "a"):
-
    left=0, right=0

    outer loop: 0 < 0 → false, never runs

    return Math.max(0, 0-0+1) = 1 ✅

- All same characters (e.g. "aaaa"):
  
    keep removing until left > right

    return Math.max(0, negative) = 0 ✅

- No match at ends (e.g. "ab"):
  
    s[0]='a' !== s[1]='b'

    outer loop never runs

    return Math.max(0, 1-0+1) = 2 ✅

All edge cases handled naturally — no special cases needed!

----------------------------------------------------------------

1. FINAL JAVASCRIPT SOLUTION

----------------------------------------------------------------

```Javascript
function minimumLength(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right && s[left] === s[right]) {
    let matchChar = s[left];    // save matching character

    // Move left inward while matching
    while (left <= right && s[left] === matchChar) {
      left++;
    }

    // Move right inward while matching
    while (left <= right && s[right] === matchChar) {
      right--;
    }
  }

  return Math.max(0, right - left + 1);
}
```

----------------------------------------------------------------

1. COMPLEXITY ANALYSIS

----------------------------------------------------------------

  Time:  O(n)

         - Each character is visited AT MOST ONCE
  
         - Single pass through string ✅

  Space: O(1)

         - Only left, right, and matchChar variables
  
         - No extra data structures

----------------------------------------------------------------

1. REFLECTION — KEY LESSONS

----------------------------------------------------------------

PATTERN USED:

> Two Pointers from BOTH ENDS moving inward
>
> (same as palindrome check, Two Sum II)

KEY INSIGHT:

> Instead of building new strings O(n^2), use two pointers
>
>moving inward — single pass O(n)!
>
>No need to actually modify the string — just move boundaries!

WHY Math.max(0, right - left + 1)?

>When left > right, string is fully deleted.
>
> right - left + 1 gives negative number.
>
> Math.max(0, ...) correctly returns 0.

TWO POINTER FROM BOTH ENDS APPLICATIONS:

- Valid Palindrome (LeetCode #125)

- Container With Most Water (#11)

- Trapping Rain Water (#42)
  
- Two Sum II (#167)
  
- Reverse a string in place
  
- This problem — delete matching ends

WHEN TO USE THIS PATTERN:

- Working from both ends of string/array simultaneously
  
- Comparing characters/values from opposite ends
  
- Shrinking boundaries inward based on conditions

COMMON MISTAKES TO AVOID:

- Putting return statement INSIDE outer while loop
    (returns after just one operation instead of all!)

- Using left <= right in outer loop
    (allows same character to be prefix AND suffix → intersect!)

- Forgetting to save matchChar before moving pointers
    (s[left] changes as we move — need original character!)

- Forgetting Math.max(0, ...) for fully deleted string
