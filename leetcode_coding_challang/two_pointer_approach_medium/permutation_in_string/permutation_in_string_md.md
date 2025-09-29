# *567. Permutation in String*

I'll guide you through solving LeetCode 567 using first-principles thinking. Let's break this down systematically.

## 1. Problem Understanding

**Core Question**: Does string `s2` contain any anagram (permutation) of string `s1`?

**Key Insight**: A permutation has the same character frequencies as the original string, just rearranged.

**Examples**:

- `s1 = "ab"` has permutations: `"ab"`, `"ba"`
- In `s2 = "eidbaooo"`, we find `"ba"` at positions 3-4
- In `s2 = "eidboaoo"`, no valid permutation exists

## 2. Constraints Analysis

- `1 ≤ s1.length, s2.length ≤ 10⁴` → Need efficient O(n) or O(n log n) solution
- Only lowercase English letters → Can use array[26] for character counting
- `s1` could be longer than `s2` → Handle edge case where no solution exists

## 3. Breaking Down the Problem

The problem reduces to:

1. **Target**: Character frequency map of `s1`
2. **Search**: Find any substring in `s2` with length `s1.length` that matches this frequency
3. **Optimization**: Avoid recalculating frequencies for every substring

## 4. Pattern Identification

**Sliding Window Pattern** - specifically the "Fixed-Size Sliding Window":

- Window size = `s1.length`
- Slide through `s2`, maintaining character frequencies
- Compare current window frequencies with target frequencies

## 5. Step-by-Step Approach

1. **Frequency Map**: Count character frequencies in `s1`
2. **Initialize Window**: Create frequency map for first `s1.length` characters in `s2`
3. **Compare**: Check if frequencies match
4. **Slide Window**: For each new position:
   - Add new character (right side)
   - Remove old character (left side)
   - Compare frequencies

## 6. Code Implementation

```Javascript
/**
 * LeetCode 567: Permutation in String
 * Pattern: Fixed-Size Sliding Window
 */

function checkInclusion(s1, s2) {
    // Edge case: s1 longer than s2
    if (s1.length > s2.length) return false;
    
    // Create frequency maps
    const s1Freq = new Array(26).fill(0);
    const windowFreq = new Array(26).fill(0);
    
    // Helper function to convert char to index
    const charToIndex = (char) => char.charCodeAt(0) - 'a'.charCodeAt(0);
    
    // Count frequencies in s1 and first window of s2
    for (let i = 0; i < s1.length; i++) {
        s1Freq[charToIndex(s1[i])]++;
        windowFreq[charToIndex(s2[i])]++;
    }
    
    // Check if first window matches
    if (arraysEqual(s1Freq, windowFreq)) return true;
    
    // Slide the window
    for (let i = s1.length; i < s2.length; i++) {
        // Add new character (right side of window)
        windowFreq[charToIndex(s2[i])]++;
        
        // Remove old character (left side of window)
        windowFreq[charToIndex(s2[i - s1.length])]--;
        
        // Check if current window matches
        if (arraysEqual(s1Freq, windowFreq)) return true;
    }
    
    return false;
}

// Helper function to compare frequency arrays
function arraysEqual(arr1, arr2) {
    for (let i = 0; i < 26; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Alternative optimized solution using matches counter
function checkInclusionOptimized(s1, s2) {
    if (s1.length > s2.length) return false;
    
    const s1Freq = new Array(26).fill(0);
    const windowFreq = new Array(26).fill(0);
    
    const charToIndex = (char) => char.charCodeAt(0) - 'a'.charCodeAt(0);
    
    // Count s1 frequencies
    for (const char of s1) {
        s1Freq[charToIndex(char)]++;
    }
    
    let matches = 0; // Count of characters with correct frequency
    
    // Process sliding window
    for (let i = 0; i < s2.length; i++) {
        const rightIndex = charToIndex(s2[i]);
        windowFreq[rightIndex]++;
        
        // Check if this character now has correct frequency
        if (windowFreq[rightIndex] === s1Freq[rightIndex]) {
            matches++;
        } else if (windowFreq[rightIndex] === s1Freq[rightIndex] + 1) {
            matches--; // Was correct, now overcounted
        }
        
        // Remove left character if window too large
        if (i >= s1.length) {
            const leftIndex = charToIndex(s2[i - s1.length]);
            
            if (windowFreq[leftIndex] === s1Freq[leftIndex]) {
                matches--;
            } else if (windowFreq[leftIndex] === s1Freq[leftIndex] + 1) {
                matches++;
            }
            
            windowFreq[leftIndex]--;
        }
        
        // Check if all 26 characters have correct frequency
        if (matches === 26) return true;
    }
    
    return false;
}

// Test cases
console.log(checkInclusion("ab", "eidbaooo")); // true
console.log(checkInclusion("ab", "eidboaoo")); // false
```

```Java
/**
 * LeetCode 567: Permutation in String - Java Solutions
 * Pattern: Fixed-Size Sliding Window
 */

class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        
        // Frequency arrays for lowercase letters
        int[] s1Freq = new int[26];
        int[] windowFreq = new int[26];
        
        // Count frequencies in s1 and first window of s2
        for (int i = 0; i < s1.length(); i++) {
            s1Freq[s1.charAt(i) - 'a']++;
            windowFreq[s2.charAt(i) - 'a']++;
        }
        
        // Check first window
        if (Arrays.equals(s1Freq, windowFreq)) return true;
        
        // Slide window through s2
        for (int i = s1.length(); i < s2.length(); i++) {
            // Add new character (right)
            windowFreq[s2.charAt(i) - 'a']++;
            
            // Remove old character (left)
            windowFreq[s2.charAt(i - s1.length()) - 'a']--;
            
            if (Arrays.equals(s1Freq, windowFreq)) return true;
        }
        
        return false;
    }
    
    // Optimized version using matches counter
    public boolean checkInclusionOptimized(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        
        int[] s1Freq = new int[26];
        int[] windowFreq = new int[26];
        
        // Count s1 frequencies
        for (char c : s1.toCharArray()) {
            s1Freq[c - 'a']++;
        }
        
        int matches = 0;
        
        for (int i = 0; i < s2.length(); i++) {
            int rightIndex = s2.charAt(i) - 'a';
            windowFreq[rightIndex]++;
            
            if (windowFreq[rightIndex] == s1Freq[rightIndex]) {
                matches++;
            } else if (windowFreq[rightIndex] == s1Freq[rightIndex] + 1) {
                matches--;
            }
            
            // Shrink window if needed
            if (i >= s1.length()) {
                int leftIndex = s2.charAt(i - s1.length()) - 'a';
                
                if (windowFreq[leftIndex] == s1Freq[leftIndex]) {
                    matches--;
                } else if (windowFreq[leftIndex] == s1Freq[leftIndex] + 1) {
                    matches++;
                }
                
                windowFreq[leftIndex]--;
            }
            
            if (matches == 26) return true;
        }
        
        return false;
    }
}

// Test class
public class PermutationInString {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        System.out.println(solution.checkInclusion("ab", "eidbaooo")); // true
        System.out.println(solution.checkInclusion("ab", "eidboaoo")); // false
    }
}
```

## 7. Complexity Analysis

**Time Complexity**: O(n) where n = s2.length

- Single pass through s2
- Array comparison is O(26) = O(1)

**Space Complexity**: O(1)

- Two arrays of fixed size 26
- No additional space scales with input

## 8. Alternative Solutions

**HashMap Approach**: Use HashMap instead of arrays (same complexity, more readable for some)

**Character Matching Count**: Track how many characters have correct frequency (shown in optimized version)

## 9. Practice Recommendations

Similar sliding window problems:

- **LeetCode 76**: Minimum Window Substring
- **LeetCode 438**: Find All Anagrams in a String  
- **LeetCode 3**: Longest Substring Without Repeating Characters
- **LeetCode 424**: Longest Repeating Character Replacement

## 10. Flowchart Design

The key insight for LeetCode 567 is recognizing it as a **fixed-size sliding window** problem where you need to match character frequencies.

**Core Strategy**:

1. Create frequency map for target string (`s1`)
2. Maintain sliding window of size `s1.length` in `s2`
3. Compare frequencies at each position

The sliding window approach gives us O(n) time complexity by efficiently updating frequencies as we move the window, rather than recalculating from scratch each time.

**Pattern Recognition**: This is a classic template for "find substring with specific character constraints" problems - you'll see this same pattern in anagram detection, minimum window substring, and similar challenges.

---
Great question! Let me address each hint and show how they guide us to the optimal solution:

## Hint 1: "Obviously, brute force will result in TLE. Think of something else."

**Brute Force Analysis:**

```javascript
// This would be O(n! * m) - TERRIBLE!
function bruteForceTLE(s1, s2) {
    // Generate all permutations of s1: O(n!)
    const permutations = getAllPermutations(s1);
    
    // Check if any permutation exists in s2: O(m)
    for (let perm of permutations) {
        if (s2.includes(perm)) return true;
    }
    return false;
}
```

**Why TLE?**

- Generating permutations: O(n!) factorial time
- For s1 = "abc", that's 3! = 6 permutations
- For s1 with 10 characters: 10! = 3,628,800 permutations!
- With constraints up to 10⁴ characters, this explodes

## Hint 2: "How will you check whether one string is a permutation of another string?"

**Key Insight:** Two strings are permutations if they contain the exact same characters with the same frequencies.

```javascript
// Example:
// "abc" and "bca" are permutations
// Both have: a:1, b:1, c:1

// "abc" and "bcd" are NOT permutations  
// First has: a:1, b:1, c:1
// Second has: b:1, c:1, d:1
```

## Hint 3: "One way is to sort the string and then compare. But, Is there a better way?"

**Sorting Approach:**

```javascript
function checkPermutationBySort(str1, str2) {
    return str1.split('').sort().join('') === str2.split('').sort().join('');
}
// Time: O(n log n) for sorting
```

**Better Way:** Character frequency counting in O(n) time!

## Hint 4: "If one string is a permutation of another string then they must have one common metric. What is that?"

- **The Common Metric: CHARACTER FREQUENCIES**

```javascript
// These are permutations - same frequencies:
"listen" → {l:1, i:1, s:1, t:1, e:1, n:1}
"silent" → {s:1, i:1, l:1, e:1, n:1, t:1}

// These are NOT - different frequencies:
"abc" → {a:1, b:1, c:1}
"def" → {d:1, e:1, f:1}
```

## Hint 5: "Both strings must have same character frequencies, if one is permutation of another. Which data structure should be used to store frequencies?"

**Data Structure Options:**

1. **HashMap/Object:** `{a: 2, b: 1, c: 3}`
2. **Array:** `[2, 1, 3, 0, 0, ...]` (index represents character)

Both work, but array is slightly faster for lowercase letters.

## Hint 6: "What about hash table? An array of size 26?"

**Perfect! Array of size 26 for lowercase English letters:**## How the Hints Lead to the Optimal Solution:

**Hint Progression:**

1. **Hint 1:** Eliminate brute force → Use sliding window
2. **Hint 2:** Focus on permutation detection → Character analysis
3. **Hint 3:** Avoid O(n log n) sorting → Use O(n) frequency counting
4. **Hint 4:** Identify the key metric → Character frequencies
5. **Hint 5:** Choose right data structure → Array or HashMap
6. **Hint 6:** Optimize for constraints → Array[26] for lowercase letters

**Final Algorithm Synthesis:**

```javascript
// Combining all hints:
// 1. Use sliding window (not brute force)
// 2. Check permutations via frequencies
// 3. Count frequencies in O(n) time
// 4. Compare frequency arrays
// 5. Use efficient data structure
// 6. Array[26] for lowercase letters

function optimalSolution(s1, s2) {
    // Apply all hints in one efficient solution
    // Time: O(n), Space: O(1)
}
```

The hints cleverly guide you from recognizing the inefficiency of brute force to understanding
that permutations share character frequencies, finally leading to the sliding window technique
with array-based frequency tracking - resulting in an optimal O(n) solution!

---
Excellent question! Let me explain why we pass `0` to `charCodeAt(0)`.

## Understanding `charCodeAt(0)`

The `0` is the **index parameter** that specifies which character in the string to get the Unicode code for.## The Key Points:

### 1. **What `charCodeAt(index)` does:**

- Returns the Unicode code point of the character at the specified `index`
- For string "hello":
  - `charCodeAt(0)` → 'h' → 104
  - `charCodeAt(1)` → 'e' → 101

### 2. **Why we use `0` specifically:**

- In our sliding window, when we iterate through strings, each `char` is a **single character**
- For single characters, the only valid index is `0`
- `'a'.charCodeAt(0)` = 97 ✓
- `'a'.charCodeAt(1)` = NaN ✗ (no character at index 1)

### 3. **The mapping formula:**

```javascript
// ASCII values: a=97, b=98, c=99, ..., z=122
char.charCodeAt(0) - 'a'.charCodeAt(0)

// Examples:
'a'.charCodeAt(0) - 'a'.charCodeAt(0) = 97 - 97 = 0  // array[0]
'b'.charCodeAt(0) - 'a'.charCodeAt(0) = 98 - 97 = 1  // array[1]  
'z'.charCodeAt(0) - 'a'.charCodeAt(0) = 122 - 97 = 25 // array[25]
```

### 4. **In our loop context:**

```javascript
for (let char of s2) {
    // 'char' is a single character like 'a', 'b', 'c'
    // So char.charCodeAt(0) gets the Unicode of that single character
    const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
}
```

The `0` parameter tells JavaScript "give me the Unicode code of the **first** (and only)
character in this single-character string." It's the position parameter, not a magic number!

---
Excellent question! This is about understanding how the **sliding window** maintains its fixed size. Let me break this down step by step.## The Core Concept: **Maintaining Fixed Window Size**

### 1. **The Window Must Always Be Size `s1.length`**

```Javascript
For s1 = "ab" (length 2), s2 = "eidbaooo"

Position i=0: Window = "ei" (indices 0,1)
Position i=1: Window = "id" (indices 1,2)  
Position i=2: Window = "db" (indices 2,3)
Position i=3: Window = "ba" (indices 3,4) ✓ Match!
```

### 2. **Why `i - s1.length`?**

When we're at position `i`, our window spans:

- **Window end**: `i` (current position)
- **Window start**: `i - s1.length + 1`
- **Window size**: `i - (i - s1.length + 1) + 1 = s1.length` ✓

**The character to remove** is the one that was at the **left edge of the previous window**:

- Previous window: `[i-1-s1.length+1, i-1]` = `[i-s1.length, i-1]`
- Current window: `[i-s1.length+1, i]`
- **Character leaving**: `s2[i-s1.length]` (leftmost of previous window)

### 3. **Visual Example**

```Javascript
s1 = "ab" (length = 2), s2 = "eidbaooo"
Indices:     0 1 2 3 4 5 6 7
s2:          e i d b a o o o

Initial window (i=0 to i=1): [e i]

i=2: Add s2[2]='d', Remove s2[2-2]='e' → Window: [i d]
i=3: Add s2[3]='b', Remove s2[3-2]='i' → Window: [d b] 
i=4: Add s2[4]='a', Remove s2[4-2]='d' → Window: [b a] ✓
```

### 4. **The Algorithm Logic**

```javascript
for (let i = s1.length; i < s2.length; i++) {
    // Current window ends at position i
    // Current window starts at position (i - s1.length + 1)
    
    // Add new character (right side)
    windowFreq[charToIndex(s2[i])]++;
    
    // Remove old character (left side of PREVIOUS window)
    // Previous window started at (i-1 - s1.length + 1) = (i - s1.length)
    windowFreq[charToIndex(s2[i - s1.length])]--;
}
```

### 5. **Why Not `i - 1`?**

```javascript
// WRONG: This would shrink the window
windowFreq[charToIndex(s2[i - 1])]--; // ❌

// At i=3 in "eidbaooo":
// Add: s2[3] = 'b'
// Remove: s2[2] = 'd'  
// Result: Window = ['b'] (size 1) ❌ Should be size 2!
```

The key insight is: **`i - s1.length` gives us the character that's exactly `s1.length` positions behind our current position**,
which is precisely the character that needs to leave the window to maintain the fixed size.

It's like a conveyor belt - as one item enters on the right, the item that entered `s1.length` steps ago must exit on the left!

---

Excellent question! Let me clarify why the window start is `i - s1.length + 1` with a detailed breakdown.## The Mathematical Derivation

### **Starting Point: Relationship Between Indices and Length**

For any array segment:

- **Length** = (end_index - start_index) + 1
- **Why +1?** Because indices are 0-based, but length counts actual elements

### **Deriving the Window Start Formula**

Given:

- Window **end** = `i` (current position)
- Window **size** = `s1.length`
- Window **start** = ?

**Step-by-step derivation:**

```Javascript
Window size = (end_index - start_index) + 1
s1.length = (i - start_index) + 1
s1.length - 1 = i - start_index
start_index = i - (s1.length - 1)
start_index = i - s1.length + 1  ← This is our formula!
```

## Visual Examples

### **Example 1: Window size 2**

```Javascript
s2 = "eidbaooo"
Indices: 0 1 2 3 4 5 6 7

At i = 3 (window ends here):
Window start = 3 - 2 + 1 = 2
Window: s2[2:3] = "db" (length = 3-2+1 = 2) ✓

At i = 4:
Window start = 4 - 2 + 1 = 3  
Window: s2[3:4] = "ba" (length = 4-3+1 = 2) ✓
```

### **Example 2: Window size 3**

```Javascript
s2 = "eidbaooo"
At i = 4:
Window start = 4 - 3 + 1 = 2
Window: s2[2:4] = "dba" (length = 4-2+1 = 3) ✓
```

## Why the +1 is Critical

**Without +1 (WRONG):**

```javascript
start = i - s1.length = 3 - 2 = 1
Window = s2[1:3] = "idb" (length = 3) ❌ Too big!
```

**With +1 (CORRECT):**

```javascript
start = i - s1.length + 1 = 3 - 2 + 1 = 2  
Window = s2[2:3] = "db" (length = 2) ✓ Perfect!
```

## The Key Insight

The **+1** compensates for the difference between:

- **Index counting** (0-based): positions 2,3 = 2 positions
- **Length counting** (1-based): "db" = length 2

**Think of it this way:**

- To get **N consecutive elements** ending at position `i`
- Start at position `i - N + 1`
- This gives you exactly N elements: `[i-N+1, i-N+2, ..., i-1, i]`

The formula `i - s1.length + 1` ensures our sliding window always maintains exactly `s1.length` characters, which is essential for comparing permutations!

---
Perfect! Let me provide concrete numerical examples to make this crystal clear.## **Concrete Example 1: s1.length = 2**

```Javascript
s1 = "ab" (s1.length = 2)
s2 = "eidbaooo"
Indices: 0 1 2 3 4 5 6 7
String:  e i d b a o o o
```

### **When i = 3:**

- **Window end** = i = **3**
- **Window start** = i - s1.length + 1 = 3 - 2 + 1 = **2**
- **Window size** = end - start + 1 = 3 - 2 + 1 = **2** ✓
- **Window content**: s2[2:3] = **"db"**

### **When i = 4:**

- **Window end** = i = **4**
- **Window start** = i - s1.length + 1 = 4 - 2 + 1 = **3**
- **Window size** = end - start + 1 = 4 - 3 + 1 = **2** ✓
- **Window content**: s2[3:4] = **"ba"**

## **Concrete Example 2: s1.length = 3**

```Javascript
s1 = "abc" (s1.length = 3)
s2 = "xyzabcdef"
Indices: 0 1 2 3 4 5 6 7 8
String:  x y z a b c d e f
```

### **When i = 5:**

- **Window end** = i = **5**
- **Window start** = i - s1.length + 1 = 5 - 3 + 1 = **3**
- **Window size** = end - start + 1 = 5 - 3 + 1 = **3** ✓
- **Window content**: s2[3:5] = **"abc"**

### **When i = 7:**

- **Window end** = i = **7**
- **Window start** = i - s1.length + 1 = 7 - 3 + 1 = **5**
- **Window size** = end - start + 1 = 7 - 5 + 1 = **3** ✓
- **Window content**: s2[5:7] = **"cde"**

## **Algebraic Verification**

**Given:**

- Window end = i
- Window start = i - s1.length + 1
- Window size formula = (end - start) + 1

**Substitution:**

```Javascript
Window size = i - (i - s1.length + 1) + 1
            = i - i + s1.length - 1 + 1
            = s1.length ✓
```

## **Key Insight with Numbers**

The formula `i - s1.length + 1` ensures:

1. **Always correct size**: Window size = s1.length
2. **Proper indexing**: Accounts for 0-based indexing
3. **Sliding mechanism**: When i increases by 1, window start also increases by 1

**Example progression (s1.length = 2):**

- i = 1: window [0:1] → "ei"
- i = 2: window [1:2] → "id"  
- i = 3: window [2:3] → "db"
- i = 4: window [3:4] → "ba" ← **Found permutation!**

Each window is exactly 2 characters, and they slide perfectly one position at a time!

---
EXCELLENT observation! You've spotted a crucial distinction that many miss. Let me clarify this important difference.## **The Key Distinction**

These are **two completely different questions** with **different answers**:

### **Question 1: "Where does the current window START?"**

**Answer:** `i - s1.length + 1` ✓ (WITH +1)

### **Question 2: "Which character should we REMOVE?"**

**Answer:** `i - s1.length` ✓ (NO +1)

## **Concrete Example with Numbers**

```Javascript
s1 = "ab" (s1.length = 2)
s2 = "eidbaooo"
Indices: 0 1 2 3 4 5 6 7
String:  e i d b a o o o
```

**At i = 3:**

### **Current Window Boundaries:**

- Window start = `i - s1.length + 1 = 3 - 2 + 1 = 2`
- Window end = `i = 3`
- Current window = s2[2:3] = **"db"**

### **Character to Remove:**

- Remove index = `i - s1.length = 3 - 2 = 1`
- Character to remove = s2[1] = **"i"**

### **Why Different?**

- **Previous window** was s2[1:2] = "id"
- **Current window** is s2[2:3] = "db"  
- The character **"i"** (at index 1) was the **leftmost** of the previous window
- That's exactly what `i - s1.length = 1` gives us!

## **Mathematical Verification**

**Previous window ended at:** `i - 1 = 2`
**Previous window started at:** `(i-1) - s1.length + 1 = 2 - 2 + 1 = 1`

**Character to remove** = leftmost of previous window = **index 1**
**Removal formula** = `i - s1.length = 3 - 2 = 1` ✓

## **Visual Representation**

```Javascript
At i = 3:
Indices: 0 1 2 3 4 5 6 7
String:  e{i}[d b]a o o o
         ^   ^---^
      remove current
             window
```

- **Current window**: [d b] (indices 2-3)
- **Remove character**: {i} (index 1) - leftmost from previous window

## **Why No +1 for Removal?**

The **+1** in window start compensates for **inclusive range calculation**.
The **removal index** doesn't need +1 because it's a **direct position reference**.

**Window start**: "How many positions back does my range begin?" → needs +1 adjustment
**Removal index**: "Which specific position do I need?" → direct index, no adjustment

Both formulas are correct for their specific purposes!
