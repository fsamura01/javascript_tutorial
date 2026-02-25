# CODING INTERVIEW STUDY NOTES

LeetCode 1616 — Split Two Strings to Make Palindrome
  Pattern: Two Pointers | Difficulty: Hard

----------------------------------------------------------------

1. PROBLEM STATEMENT

----------------------------------------------------------------

You are given two strings a and b of the same length.
Choose an index and split both strings at the same index:

- a → aprefix + asuffix
- b → bprefix + bsuffix

Check if either combination forms a palindrome:

- aprefix + bsuffix
- bprefix + asuffix

Return true if possible, otherwise false.

Example 1:
  Input:  a = "x", b = "y"
  Output: true

- aprefix="" + bsuffix="y" = "y" → palindrome ✅

Example 2:
  Input:  a = "xbdef", b = "xecab"
  Output: false

Example 3:
  Input:  a = "ulacfd", b = "jizalu"
  Output: true

- Split at index 3:
- aprefix="ula" + bsuffix="alu" = "ulaalu" → palindrome ✅

Constraints:

- 1 <= a.length, b.length <= 10^5
- a.length == b.length
- a and b consist of lowercase English letters

----------------------------------------------------------------

1. KEY CLARIFICATIONS

----------------------------------------------------------------

- A palindrome reads the same forwards and backwards
- Each element can only belong to ONE combination
- Either prefix or suffix can be empty (whole string used)
- Empty split is useful when one whole string is a palindrome
- We must check BOTH combinations independently

----------------------------------------------------------------

1. CORE INSIGHT

----------------------------------------------------------------

For aprefix + bsuffix to be a palindrome:

  1. OUTER characters of aprefix and bsuffix must MIRROR each other
     (i.e. aprefix and bsuffix must be reverses of each other
      from the outside in)

  2. When outer characters STOP matching, the LEFTOVER MIDDLE
     must itself be a palindrome

Example:
  aprefix = "ula",  bsuffix = "alu"
  "ula" reversed = "alu" → they mirror each other ✅
  Combined: "ulaalu" → palindrome ✅

When characters stop matching:
  a = "ul",  b = "alu"
  u matches u ✅, l matches l ✅
  leftover middle from b = "a" → palindrome ✅

----------------------------------------------------------------

1. PATTERN: TWO POINTERS (across two strings)

----------------------------------------------------------------

Instead of one array, we use two pointers across TWO strings:

  aprefix:  u  l  a
            ↑           left pointer moving right →

  bsuffix:  a  l  u
                  ↑     right pointer moving left ←

- Move inward while a[left] == b[right]
- When they stop matching → check leftover middle
- Leftover middle: isPalindrome(a, left, right)
                  OR isPalindrome(b, left, right)

----------------------------------------------------------------

1. BRUTE FORCE vs OPTIMIZED

----------------------------------------------------------------

  Approach   | Brute Force                | Two Pointers (Optimized)
  -----------|----------------------------|-------------------------
  Method     | Try every split index      | Two pointer scan
  Time       | O(n^2) — too slow ❌       | O(n) — efficient ✅
  Space      | O(1)                       | O(1)

Why O(n^2)?
  n split indexes × O(n) palindrome check = O(n^2)

Why O(n)?
  Two pointer scan → O(n)
  Leftover palindrome check → O(n)
  Done twice for both combinations → O(2n) = O(n)

----------------------------------------------------------------

1. ALGORITHM STEPS

----------------------------------------------------------------

We need 3 functions:

  isPalindrome(s, left, right):
    - While left < right:
        if s[left] != s[right] → return false
        left++, right--
    - return true

  checkCombination(a, b):
    - left = 0, right = n - 1
    - While left < right AND a[left] == b[right]:
        left++, right--
    - return isPalindrome(a, left, right)
           OR isPalindrome(b, left, right)

  checkPalindromeFormation(a, b):
    - return checkCombination(a, b)
           OR checkCombination(b, a)

NOTE: checkCombination(a, b) handles → aprefix + bsuffix
      checkCombination(b, a) handles → bprefix + asuffix

----------------------------------------------------------------

1. DRY RUN — Example 3

----------------------------------------------------------------

Input: a = "ulacfd", b = "jizalu"
Call: checkCombination(a, b)

  Step | left | right | a[left] | b[right] | Match?
  -----|------|-------|---------|----------|-------
  1    |  0   |   5   |   u     |    u     |  ✅ move inward
  2    |  1   |   4   |   l     |    l     |  ✅ move inward
  3    |  2   |   3   |   a     |    a     |  ✅ move inward
  4    |  3   |   2   |   —     |    —     |  left > right → STOP

left=3 > right=2 → isPalindrome(a, 3, 2) → left > right → true ✅

Result: true ✅ (matches expected output)

----------------------------------------------------------------

1. FINAL JAVASCRIPT SOLUTION

----------------------------------------------------------------

```Javascript
function isPalindrome(s, left, right) {
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

function checkCombination(a, b) {
  let left = 0, right = a.length - 1;

  // Move inward while outer characters match
  while (left < right && a[left] === b[right]) {
    left++;
    right--;
  }

  // Check if either leftover middle is a palindrome
  return isPalindrome(a, left, right) || isPalindrome(b, left, right);
}

function checkPalindromeFormation(a, b) {
  // Check both combinations
  return checkCombination(a, b) || checkCombination(b, a);
}
```

NOTE on short-circuit evaluation:

- If checkCombination(a, b) returns true → right side is SKIPPED
- If checkCombination(a, b) returns false → right side is checked
- The two combinations are INDEPENDENT — one failing does not
    mean the other fails!

----------------------------------------------------------------

1. COMPLEXITY ANALYSIS

----------------------------------------------------------------

  Time:  O(n)
         - Two pointer scan       → O(n)
         - Leftover palindrome    → O(n)
         - Both combinations      → O(2n) = O(n)

  Space: O(1)
         - Only pointers and variables
         - No extra data structures

----------------------------------------------------------------

1. EDGE CASES

----------------------------------------------------------------

- a or b already a palindrome   → returns true ✅
- Both strings identical        → returns true ✅
- Length 1                      → left = right = 0,
                                    loop never executes,
                                    single char is palindrome → true ✅
- Pointers never stop matching  → left >= right,
                                    isPalindrome returns true
                                    automatically ✅

All edge cases handled naturally — no special cases needed!

----------------------------------------------------------------

1. KEY TAKEAWAYS

----------------------------------------------------------------

- Two pointers can work ACROSS two different strings
- When outer characters stop matching, check the leftover middle
- The leftover middle from EITHER string can save us → use OR
- Swapping arguments checkCombination(b, a) elegantly handles
    the second combination
- Short circuit evaluation (||) means we skip the second
    combination if the first already returns true

================================================================
