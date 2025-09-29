# **522. Longest Uncommon Subsequence II**

I'll guide you through LeetCode 522 using first-principles thinking.

## 1. Problem Understanding

**Simple terms:** Find the longest string that appears as a subsequence in exactly one string from the array, but not in any others.

**Key insight:** If a string is unique (appears only once), then the string itself is automatically an "uncommon subsequence" since it's a subsequence of itself but not of any other string.

**Edge cases:**

- All strings identical → return -1
- Empty array → not possible per constraints
- Single unique string → return its length

## 2. Constraints Analysis

- 2 ≤ strs.length ≤ 50: Small array, brute force acceptable
- 1 ≤ strs[i].length ≤ 10: Short strings, subsequence checking is fast
- Lowercase letters only: No special character handling needed

## 3. Breaking Down the Problem

**Part 1:** Identify candidate strings (unique strings have highest priority)
**Part 2:** For each candidate, check if it's a subsequence of any other string
**Part 3:** Return the maximum length among valid candidates

## 4. Pattern Identification

**Primary Pattern:** Brute Force with Subsequence Checking

- Not a classic DP/sliding window problem
- The key insight makes this simpler than it appears

**Secondary Pattern:** String matching (subsequence validation)

## 5. Step-by-Step Approach

1. **Prioritize unique strings:** Any unique string is automatically an uncommon subsequence
2. **Check non-unique strings:** For duplicate strings, check their proper subsequences
3. **Subsequence validation:** For each candidate, verify it's not a subsequence of other strings
4. **Return maximum length**

**Key insight:** We can sort strings by length (descending) and return the first valid uncommon subsequence found.

## 6. Code Implementation

```Javascript
// LeetCode 522: Longest Uncommon Subsequence II
// Time: O(n^2 * m), Space: O(1)

function findLUSlength(strs) {
    // Helper function to check if s1 is a subsequence of s2
    function isSubsequence(s1, s2) {
        if (s1.length > s2.length) return false;
        
        let i = 0; // pointer for s1
        let j = 0; // pointer for s2
        
        while (i < s1.length && j < s2.length) {
            if (s1[i] === s2[j]) {
                i++;
            }
            j++;
        }
        
        return i === s1.length;
    }
    
    // Sort strings by length in descending order
    // This ensures we check longer potential candidates first
    strs.sort((a, b) => b.length - a.length);
    
    // Check each string as a potential uncommon subsequence
    for (let i = 0; i < strs.length; i++) {
        let isUncommon = true;
        
        // Check if current string is a subsequence of any other string
        for (let j = 0; j < strs.length; j++) {
            if (i !== j && isSubsequence(strs[i], strs[j])) {
                isUncommon = false;
                break;
            }
        }
        
        // If it's not a subsequence of any other string, it's uncommon
        if (isUncommon) {
            return strs[i].length;
        }
    }
    
    return -1; // No uncommon subsequence found
}

// Test cases
console.log(findLUSlength(["aba","cdc","eae"])); // Output: 3
console.log(findLUSlength(["aaa","aaa","aa"]));  // Output: -1
console.log(findLUSlength(["abc","def"]));       // Output: 3
```

```Java
// LeetCode 522: Longest Uncommon Subsequence II
// Time: O(n^2 * m), Space: O(1)

import java.util.*;

class Solution {
    public int findLUSlength(String[] strs) {
        // Helper method to check if s1 is a subsequence of s2
        boolean isSubsequence(String s1, String s2) {
            if (s1.length() > s2.length()) return false;
            
            int i = 0; // pointer for s1
            int j = 0; // pointer for s2
            
            while (i < s1.length() && j < s2.length()) {
                if (s1.charAt(i) == s2.charAt(j)) {
                    i++;
                }
                j++;
            }
            
            return i == s1.length();
        }
        
        // Sort strings by length in descending order
        Arrays.sort(strs, (a, b) -> b.length() - a.length());
        
        // Check each string as a potential uncommon subsequence
        for (int i = 0; i < strs.length; i++) {
            boolean isUncommon = true;
            
            // Check if current string is a subsequence of any other string
            for (int j = 0; j < strs.length; j++) {
                if (i != j && isSubsequence(strs[i], strs[j])) {
                    isUncommon = false;
                    break;
                }
            }
            
            // If it's not a subsequence of any other string, it's uncommon
            if (isUncommon) {
                return strs[i].length();
            }
        }
        
        return -1; // No uncommon subsequence found
    }
    
    // Test method
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.findLUSlength(new String[]{"aba","cdc","eae"})); // Output: 3
        System.out.println(sol.findLUSlength(new String[]{"aaa","aaa","aa"}));  // Output: -1
        System.out.println(sol.findLUSlength(new String[]{"abc","def"}));       // Output: 3
    }
}
```

## 7. Complexity Analysis

**Time Complexity:** O(n² × m)

- n = number of strings
- m = average length of strings  
- For each string (n), we check against all others (n), with subsequence check taking O(m)

**Space Complexity:** O(1)

- Only using constant extra space (excluding input)

## 8. Alternative Solutions

- **Approach 1: No sorting optimization**

- Check strings in original order
- Same time complexity but potentially more iterations

- **Approach 2: Generate all subsequences**

- Generate all possible subsequences for each string
- Check uniqueness across strings
- Much higher complexity: O(n × 2^m)

The sorting approach is optimal given the constraints.

## 9. Practice Recommendations

**Similar Pattern Problems:**

- LeetCode 521: Longest Uncommon Subsequence I (easier)
- LeetCode 392: Is Subsequence
- LeetCode 1143: Longest Common Subsequence  
- LeetCode 516: Longest Palindromic Subsequence

**Key Pattern:** Subsequence validation and string comparison problems.

## 10. Flowchart Design

## Key Takeaways

**Core insight:** A string that appears uniquely in the array is automatically an uncommon subsequence of maximum possible length.

**Problem-solving pattern:** When dealing with subsequence problems, consider the brute force approach first - the constraints often make it viable.

**Critical realization:** We don't need to generate subsequences; we check if existing strings qualify as uncommon subsequences.

This problem teaches you to look for the "trick" - sometimes the optimal solution is much simpler than the problem statement suggests. The key is recognizing that unique strings are automatically valid answers.

You're right to question that statement - it's actually **incorrect** and confusing.

**Corrected explanation:**

An "uncommon subsequence" is a string that:

1. **IS** a subsequence of exactly one string in the array
2. **IS NOT** a subsequence of any other strings in the array

**Key insight:** Any string that appears uniquely in the array (not duplicated) automatically qualifies as an uncommon subsequence of itself.

**Examples:**

For `["aba", "cdc", "eae"]`:

- "aba" is a subsequence of "aba" but NOT of "cdc" or "eae" ✓
- "cdc" is a subsequence of "cdc" but NOT of "aba" or "eae" ✓  
- "eae" is a subsequence of "eae" but NOT of "aba" or "cdc" ✓

All three strings are uncommon subsequences. The longest has length 3.

For `["aaa", "aaa", "aa"]`:

- "aaa" appears twice, so it's a subsequence of two strings ✗
- "aa" is a subsequence of both "aaa" strings ✗

No uncommon subsequences exist, return -1.

The problem asks for the **length** of the longest such string, not the string itself.

```
Great observation! You're thinking about subsequences correctly, but let me trace through the specific example:

## Tracing `isSubsequence("eae", "aba")`

**Question**: Is "aba" a subsequence of "eae"?

```javascript
s2 = "eae" (the string we're checking against)
s1 = "aba" (the potential subsequence)

i = 0, j = 0
s2[0] = 'e', s1[0] = 'a' → no match, i++

i = 1, j = 0  
s2[1] = 'a', s1[0] = 'a' → MATCH! j++

i = 2, j = 1
s2[2] = 'e', s1[1] = 'b' → no match, i++

i = 3 (out of bounds), j = 1
Return j === s1.length → 1 === 3 → false
```

**Result**: "aba" is **NOT** a subsequence of "eae"

## Why "aba" is NOT a subsequence of "eae"

To be a subsequence, we need to find ALL characters of "aba" in order within "eae":

- ✅ Found 'a' at position 1 in "eae"  
- ❌ Need 'b' after position 1 - not found
- ❌ Never get to check for the final 'a'

## What IS a subsequence of "eae"?

- "e" ✅
- "a" ✅  
- "ea" ✅
- "ae" ✅
- "eae" ✅
- "" (empty string) ✅

But "aba" requires a 'b' which doesn't exist in "eae".

## Test Case 1 Result

Since "aba", "cdc", and "eae" are all unique strings and none is a subsequence of the others, they're all uncommon subsequences. The longest has length 3.

Your subsequence understanding is correct - the algorithm properly determines that "aba" cannot be formed from "eae"!

```
Let me trace through `isSubsequence("ebe", "aba")`:

**Question**: Is "aba" a subsequence of "ebe"?

```javascript
s2 = "ebe" (the string we're checking against)
s1 = "aba" (the potential subsequence)

i = 0, j = 0
s2[0] = 'e', s1[0] = 'a' → no match, i++

i = 1, j = 0  
s2[1] = 'b', s1[0] = 'a' → no match, i++

i = 2, j = 0
s2[2] = 'e', s1[0] = 'a' → no match, i++

i = 3 (out of bounds), j = 0
Return j === s1.length → 0 === 3 → false
```

**Answer: NO** - "aba" is **NOT** a subsequence of "ebe"

## Why not?

"ebe" doesn't contain the character 'a' at all! To form "aba" as a subsequence, we need:

1. An 'a'
2. Then a 'b' (after the 'a')
3. Then another 'a' (after the 'b')

But "ebe" = ['e', 'b', 'e'] has no 'a' characters.

## What ARE subsequences of "ebe"?

- "" (empty string) ✅
- "e" ✅
- "b" ✅
- "eb" ✅
- "be" ✅  
- "ee" ✅
- "ebe" ✅

The key insight: a subsequence can only use characters that actually exist in the target string!

```
You're absolutely right that both strings have 'b' at position 1! But let me clarify how subsequences work:

## Subsequence Definition
A subsequence must maintain the **relative order** of characters, but they don't need to be at the same positions.

## Tracing "aba" in "ebe" step by step:

```javascript
Target: "ebe" 
Looking for: "aba"

Step 1: Find first 'a' in "ebe"
- Position 0: 'e' ≠ 'a'
- Position 1: 'b' ≠ 'a' 
- Position 2: 'e' ≠ 'a'
- Result: NO 'a' found in "ebe"
```

Since we can't even find the first character 'a' in "ebe", we can't form "aba" as a subsequence.

## The Key Point

Even though both strings have 'b' at position 1, that doesn't matter for subsequences because:

1. **We need 'a' first** (from "aba")
2. **There's no 'a' anywhere in "ebe"**
3. **We never get to use the 'b'**

## Position vs. Subsequence

- **Position matching**: Characters at same index
- **Subsequence**: Characters in same relative order (positions can differ)

For "aba" to be a subsequence of any string, that string **must contain at least one 'a', then a 'b', then another 'a'** in that order.

"ebe" fails at the very first requirement - it contains no 'a' at all!

```
Let me trace through `isSubsequence("ace", "aba")`:

**Question**: Is "aba" a subsequence of "ace"?

```javascript
Target: "ace" (the string we're checking against)
Looking for: "aba" (the potential subsequence)

i = 0, j = 0
"ace"[0] = 'a', "aba"[0] = 'a' → MATCH! j++

i = 1, j = 1  
"ace"[1] = 'c', "aba"[1] = 'b' → no match, i++

i = 2, j = 1
"ace"[2] = 'e', "aba"[1] = 'b' → no match, i++

i = 3 (out of bounds), j = 1
Return j === "aba".length → 1 === 3 → false
```

**Answer: NO** - "aba" is **NOT** a subsequence of "ace"

## Why not-?

We successfully found the first 'a', but then we needed to find 'b' in the remaining string "ce". Since "ce" doesn't contain 'b', we can't complete the subsequence "aba".

## What we found

- ✅ First 'a' at position 0
- ❌ Need 'b' after position 0 - not found in "ce"
- ❌ Never get to look for the final 'a'

## What ARE subsequences of "ace"?

- "a" ✅
- "c" ✅
- "e" ✅
- "ac" ✅
- "ae" ✅
- "ce" ✅
- "ace" ✅
- "" ✅

But **not** "aba" because there's no 'b' in "ace".
