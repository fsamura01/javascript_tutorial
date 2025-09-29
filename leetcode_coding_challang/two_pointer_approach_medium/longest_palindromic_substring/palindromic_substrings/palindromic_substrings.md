# *647. Palindromic Substrings*

I'll guide you through solving LeetCode 647 (Palindromic Substrings) using first-principles thinking. Let's break this down systematically.

## 1. Problem Understanding

At its core, this problem asks us to **count how many substrings in a given string are palindromes**.

A palindrome reads the same forwards and backwards (like "racecar" or "aba"). A substring is any contiguous sequence of characters from the original string.

For example, in "abc":

- All single characters are palindromes: "a", "b", "c" (3 total)
- No longer substrings are palindromes
- Total: 3

In "aaa":

- Single chars: "a", "a", "a" (3)
- Two-char pairs: "aa", "aa" (2)
- Three-char: "aaa" (1)
- Total: 6

## 2. Constraints of the Problem

- **String length**: 1 ≤ s.length ≤ 1000
- **Characters**: Only lowercase English letters
- **Output**: Return count as integer

These constraints tell us:

- We don't need to worry about empty strings
- No special characters or case sensitivity
- The string is relatively short (≤1000), so O(n²) or even O(n³) solutions might be acceptable

## 3. Breaking Down Into Manageable Parts

Let's decompose this problem:

1. **Generate all possible substrings** of the input string
2. **Check if each substring is a palindrome**
3. **Count the palindromic ones**

However, we can be smarter than generating all substrings explicitly. We can:

1. **For each possible center point**, expand outwards to find palindromes
2. **Handle both odd and even length palindromes** separately
3. **Count as we go**

## 4. Pattern Identification

This problem uses the **"Expand Around Centers"** pattern, which is a variation of the **Two Pointers** technique.

**Key insight**: Every palindrome has a center. For odd-length palindromes, the center is a single character. For even-length palindromes, the center is between two characters.

## 5. Approach Discussion

**Step-by-step approach:**

1. **Iterate through each possible center**:
   - For odd-length palindromes: center at index i
   - For even-length palindromes: center between indices i and i+1

2. **For each center, expand outwards**:
   - Use two pointers (left and right)
   - While characters at left and right are equal, we have a palindrome
   - Move left-- and right++, count the palindrome
   - Stop when characters don't match or we go out of bounds

3. **Sum up all palindromes found**

**Why this works**: Instead of checking every substring individually (O(n³)), we leverage the property that palindromes expand symmetrically from their centers.

## 6. Code Implementation

```Javascript
// LeetCode 647: Palindromic Substrings
// Approach: Expand Around Centers

function countSubstrings(s) {
    if (!s || s.length === 0) return 0;
    
    let count = 0;
    
    // Helper function to expand around center and count palindromes
    function expandAroundCenter(left, right) {
        let localCount = 0;
        
        // Expand while characters match and indices are valid
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            localCount++; // Found a palindrome
            left--;       // Expand left
            right++;      // Expand right
        }
        
        return localCount;
    }
    
    // Check all possible centers
    for (let i = 0; i < s.length; i++) {
        // Odd-length palindromes (center at i)
        count += expandAroundCenter(i, i);
        
        // Even-length palindromes (center between i and i+1)
        count += expandAroundCenter(i, i + 1);
    }
    
    return count;
}

// Test cases
console.log(countSubstrings("abc"));  // Output: 3
console.log(countSubstrings("aaa"));  // Output: 6

// Step-by-step example for "aaa":
// i=0: center at 0: "a" (1), center at 0,1: "aa" (1) 
// i=1: center at 1: "a", "aaa" (2), center at 1,2: "aa" (1)
// i=2: center at 2: "a" (1), center at 2,3: none (0)
// Total: 1+1+2+1+1+0 = 6
```

```Java
// LeetCode 647: Palindromic Substrings
// Approach: Expand Around Centers

public class PalindromicSubstrings {
    
    public int countSubstrings(String s) {
        if (s == null || s.length() == 0) return 0;
        
        int count = 0;
        
        // Check all possible centers
        for (int i = 0; i < s.length(); i++) {
            // Odd-length palindromes (center at i)
            count += expandAroundCenter(s, i, i);
            
            // Even-length palindromes (center between i and i+1)
            count += expandAroundCenter(s, i, i + 1);
        }
        
        return count;
    }
    
    /**
     * Helper method to expand around center and count palindromes
     * @param s The input string
     * @param left Starting left pointer
     * @param right Starting right pointer
     * @return Number of palindromes found expanding from this center
     */
    private int expandAroundCenter(String s, int left, int right) {
        int count = 0;
        
        // Expand while characters match and indices are valid
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            count++;   // Found a palindrome
            left--;    // Expand left
            right++;   // Expand right
        }
        
        return count;
    }
    
    // Test method
    public static void main(String[] args) {
        PalindromicSubstrings solution = new PalindromicSubstrings();
        
        System.out.println(solution.countSubstrings("abc")); // Output: 3
        System.out.println(solution.countSubstrings("aaa")); // Output: 6
        
        // Trace for "aaa":
        // i=0: expandAroundCenter(0,0) finds "a" = 1
        //      expandAroundCenter(0,1) finds "aa" = 1
        // i=1: expandAroundCenter(1,1) finds "a", then "aaa" = 2  
        //      expandAroundCenter(1,2) finds "aa" = 1
        // i=2: expandAroundCenter(2,2) finds "a" = 1
        //      expandAroundCenter(2,3) finds nothing = 0
        // Total: 1+1+2+1+1+0 = 6
    }
}
```

## 7. Complexity Analysis

- **Time Complexity: O(n²)**

- We iterate through n possible centers
- For each center, we potentially expand up to n/2 characters in each direction
- In the worst case (like "aaaa..."), we might expand the full length for each center
- Overall: O(n × n) = O(n²)

- **Space Complexity: O(1)**

- We only use a constant amount of extra space (count variable, left/right pointers)
- No additional data structures needed

## 8. Alternative Solutions

### Alternative 1: Brute Force (Less Efficient)

```javascript
// Check every substring explicitly - O(n³)
function countSubstrings(s) {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            if (isPalindrome(s.substring(i, j + 1))) {
                count++;
            }
        }
    }
    return count;
}
```

### Alternative 2: Dynamic Programming

```javascript
// Use DP table - O(n²) time, O(n²) space
function countSubstrings(s) {
    const n = s.length;
    const dp = Array(n).fill().map(() => Array(n).fill(false));
    let count = 0;
    
    // Single characters
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
        count++;
    }
    
    // Two characters
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            count++;
        }
    }
    
    // Longer substrings
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                count++;
            }
        }
    }
    
    return count;
}
```

**The expand-around-centers approach is optimal** because it achieves O(n²) time with O(1) space.

## 9. Practice Recommendations

Similar problems that use the "Expand Around Centers" pattern:

1. **LeetCode 5 - Longest Palindromic Substring**: Find the longest palindrome instead of counting
2. **LeetCode 516 - Longest Palindromic Subsequence**: Uses DP, but understanding palindrome structure helps
3. **LeetCode 125 - Valid Palindrome**: Basic palindrome checking with two pointers
4. **LeetCode 131 - Palindrome Partitioning**: More complex palindrome problem
5. **LeetCode 409 - Longest Palindrome**: Different approach but palindrome-related

**Pattern Recognition**: Any time you need to find/count palindromes in a string, consider:

- Two pointers for validation
- Expand around centers for enumeration
- DP for optimization when overlapping subproblems exist

1. **Pattern Recognition**: This is a classic "Expand Around Centers" problem - whenever you need to find palindromes, consider this approach.

2. **Optimization Insight**: Instead of checking all O(n²) substrings individually, we leverage palindrome symmetry to check them more efficiently.

3. **Handle Both Cases**: Remember to check both odd-length (single center) and even-length (double center) palindromes.

4. **Time vs Space Trade-off**: The expand-around-centers approach gives us optimal space complexity O(1) while maintaining reasonable time complexity O(n²).

You should now understand how to identify palindrome-counting problems, apply the expand-around-centers technique, and recognize when this pattern is applicable to other similar problems. Practice with the recommended problems to solidify your understanding!
