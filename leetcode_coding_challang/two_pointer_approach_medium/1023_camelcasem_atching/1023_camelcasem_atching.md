# **LeetCode 1023: Camelcase Matching - Complete Tutorial**

## **1. Problem Understanding**

Let's break this down in the simplest terms:

**What are we doing?**

- We have a `pattern` string (like "FB")
- We have multiple `query` strings (like "FooBar", "FootBall", etc.)
- For each query, we need to check: "Can I insert only lowercase letters into the pattern to make it match this query?"

**Key insight:** We can only INSERT lowercase letters. We cannot:

- Remove characters from the pattern
- Change the order of pattern characters
- Insert uppercase letters

**Example walkthrough:**

- Pattern: "FB"
- Query: "FooBar"
- Can we match? `F` + (insert "oo") + `B` + (insert "ar") = "FooBar" ✓
- Query: "FooBarTest"
- Can we match? We'd need to insert "T" (uppercase!), so NO ✗

## **2. Constraints Analysis**

```javascript
1 <= pattern.length, queries.length <= 100
1 <= queries[i].length <= 100
```

**What the constraints tell us:**

1. **Small input size** (≤100): We can afford O(n*m) solutions where n = number of queries, m = average query length
2. **No need for complex optimization**: Simple, clear solutions will work fine
3. **String matching problem**: We're dealing with character-by-character comparison
4. **Multiple queries**: We need to apply the same logic repeatedly, suggesting a helper function

## **3. Highlight Keywords**

🔑 **Critical Keywords:**

1. **"insert lowercase English letters"** - We can ONLY add lowercase letters
2. **"insert at any position"** - Flexibility in where we add letters
3. **"matches pattern"** - The pattern characters must appear in order
4. **"may choose not to insert"** - We don't have to add anything

**Pattern Recognition Signals:**

- "matches" → String matching
- "in order" → Sequential processing, two pointers
- "insert characters" → Pattern subsequence problem
- "uppercase vs lowercase" → Character classification matters

## **4. Break Down Into Manageable Parts**

**Sub-problems to solve:**

**Part 1:** Check if pattern is a subsequence of query

- All pattern characters must appear in query in the same order

**Part 2:** Verify only lowercase letters are inserted

- Any character in query that's not in pattern must be lowercase

**Part 3:** Handle edge cases

- Pattern longer than query? → Impossible match
- Extra uppercase letters in query? → No match

**The algorithm flow:**

```javascript
For each query:
├── Use two pointers (one for pattern, one for query)
├── For each character in query:
│   ├── Does it match current pattern character? 
│   │   └── Yes: Move both pointers forward
│   ├── Is it lowercase?
│   │   └── Yes: Skip it (we "inserted" this), move query pointer
│   └── Is it uppercase and doesn't match pattern?
│       └── FAIL - we can't insert uppercase
└── Did we match all pattern characters?
    └── Yes: SUCCESS, No: FAIL
```

## **5. Pattern Identification**

**Primary Pattern:
Two Pointers + String Matching**

This is a **subsequence matching problem with constraints**:

**Why Two Pointers?**

- We need to traverse both strings simultaneously
- Pattern order must be preserved
- We need to make decisions character-by-character

**Similar pattern appears in:**

- Subsequence problems (Is Subsequence - LC 392)
- Pattern matching with wildcards
- String filtering problems

**Pattern Template:**

```javascript
pointer_pattern = 0
pointer_query = 0

while pointer_query < query.length:
    if matches pattern[pointer_pattern]:
        pointer_pattern++
    else if not allowed:
        return false
    pointer_query++

return pointer_pattern == pattern.length
```

## **6. Step-by-Step Approach**

**Strategy:**

**Step 1:
Set up two pointers**

- `patternIndex` = 0 (tracks position in pattern)
- `queryIndex` = 0 (tracks position in query)

**Step 2:
Iterate through the query string**

- For each character in query, we have 3 cases:

**Case A:** Character matches current pattern character

```javascript
query[queryIndex] == pattern[patternIndex]
→ This is good! Move both pointers forward
```

**Case B:** Character is lowercase but doesn't match pattern

```javascript
query[queryIndex] is lowercase
→ This is an "inserted" character, skip it
→ Move only queryIndex forward
```

**Case C:** Character is uppercase but doesn't match pattern

```javascript
query[queryIndex] is uppercase AND doesn't match pattern
→ INVALID! We can't insert uppercase letters
→ Return false immediately
```

**Step 3:
Final validation**

- After traversing the entire query, check:
  - Did we match ALL pattern characters? (patternIndex == pattern.length)
  - If yes → true, if no → false

## **7. Code Implementation**

### **JavaScript Implementation**

```javascript
/**
 * @param {string[]} queries
 * @param {string} pattern
 * @return {boolean[]}
 */
var camelMatch = function(queries, pattern) {
    // Helper function to check if a single query matches the pattern
    const isMatch = (query, pattern) => {
        let patternIdx = 0; // Pointer for pattern
        
        // Iterate through each character in the query
        for (let i = 0; i < query.length; i++) {
            const queryChar = query[i];
            
            // Case 1: Current character matches the pattern character
            if (patternIdx < pattern.length && queryChar === pattern[patternIdx]) {
                patternIdx++; // Move pattern pointer forward
            }
            // Case 2: Character is uppercase but doesn't match pattern
            // This means we have an extra uppercase letter we can't "insert"
            else if (queryChar >= 'A' && queryChar <= 'Z') {
                return false; // Invalid match
            }
            // Case 3: Character is lowercase (implicit)
            // This is an "inserted" character, just skip it
        }
        
        // We must have matched ALL pattern characters
        return patternIdx === pattern.length;
    };
    
    // Apply the matching function to all queries
    return queries.map(query => isMatch(query, pattern));
};

// Example usage:
console.log(camelMatch(
    ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], 
    "FB"
)); // [true, false, true, true, false]
```

### **Java Implementation**

```javascript
class Solution {
    /**
     * Main function to check all queries against pattern
     */
    public List<Boolean> camelMatch(String[] queries, String pattern) {
        List<Boolean> result = new ArrayList<>();
        
        // Check each query individually
        for (String query : queries) {
            result.add(isMatch(query, pattern));
        }
        
        return result;
    }
    
    /**
     * Helper function to check if a single query matches the pattern
     * @param query The query string to check
     * @param pattern The pattern to match against
     * @return true if query matches pattern, false otherwise
     */
    private boolean isMatch(String query, String pattern) {
        int patternIdx = 0; // Pointer for pattern
        
        // Iterate through each character in the query
        for (int i = 0; i < query.length(); i++) {
            char queryChar = query.charAt(i);
            
            // Case 1: Current character matches the pattern character
            if (patternIdx < pattern.length() && 
                queryChar == pattern.charAt(patternIdx)) {
                patternIdx++; // Move pattern pointer forward
            }
            // Case 2: Character is uppercase but doesn't match pattern
            // This means we have an extra uppercase letter
            else if (Character.isUpperCase(queryChar)) {
                return false; // Invalid match - can't insert uppercase
            }
            // Case 3: Character is lowercase (implicit else)
            // This is an "inserted" character, continue to next char
        }
        
        // Success only if we've matched all pattern characters
        return patternIdx == pattern.length;
    }
}

// Example usage:
// Solution sol = new Solution();
// String[] queries = {"FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"};
// System.out.println(sol.camelMatch(queries, "FB")); 
// Output: [true, false, true, true, false]
```

**Code Walkthrough Example:**

```Javascript
Query: "FooBar", Pattern: "FB"

i=0: query[0]='F', pattern[0]='F' → MATCH → patternIdx=1
i=1: query[1]='o', lowercase → SKIP (inserted char)
i=2: query[2]='o', lowercase → SKIP (inserted char)
i=3: query[3]='B', pattern[1]='B' → MATCH → patternIdx=2
i=4: query[4]='a', lowercase → SKIP (inserted char)
i=5: query[5]='r', lowercase → SKIP (inserted char)

Final: patternIdx=2, pattern.length=2 → TRUE ✓
```

## **8. Complexity Analysis**

### **Time Complexity: **O(N × M)****

Where:

- N = number of queries
- M = average length of each query

**Breakdown:**

- For each query: We iterate through all characters once → O(M)
- We have N queries → O(N × M)
- Character comparison is O(1)

**Why not O(N × (M + P))?**

- We don't iterate pattern separately; we just check characters as we go
- Pattern pointer movements are bounded by the query iteration

### **Space Complexity: **O(N)****

**Breakdown:**

- Result array stores N boolean values → O(N)
- Pattern pointer and loop variables → O(1)
- No recursion, no additional data structures

**Note:** If we don't count the output array, space complexity is **O(1)**.

### **Optimization Analysis**

**Can we do better?**

- Time: No. We must examine each character in each query at least once
- Space: No. We must store N results

This is an **optimal solution** for this problem!

## **9. Alternative Solutions**

### **Alternative 1: Regular Expression Approach**

**Idea:** Convert pattern to regex: Insert `[a-z]*` between pattern characters

```javascript
var camelMatchRegex = function(queries, pattern) {
    // Build regex: "FB" → "^[a-z]*F[a-z]*B[a-z]*$"
    let regex = '^[a-z]*';
    for (let char of pattern) {
        regex += char + '[a-z]*';
    }
    regex += '$';
    
    const re = new RegExp(regex);
    return queries.map(query => re.test(query));
};
```

**Pros:**

- Concise, elegant code
- Easy to understand once you know regex

**Cons:**

- Regex compilation overhead
- Less efficient (regex engines have overhead)
- Harder to debug
- Not as interview-friendly

**Time Complexity:** O(N × M) but with higher constant factor

---

### **Alternative 2: Recursive Approach**

```javascript
var camelMatchRecursive = function(queries, pattern) {
    const isMatch = (query, qIdx, pattern, pIdx) => {
        // Base case: processed entire query
        if (qIdx === query.length) {
            return pIdx === pattern.length;
        }
        
        // Current characters
        const qChar = query[qIdx];
        const pChar = pIdx < pattern.length ? pattern[pIdx] : null;
        
        // If characters match, advance both
        if (qChar === pChar) {
            return isMatch(query, qIdx + 1, pattern, pIdx + 1);
        }
        
        // If uppercase and doesn't match, fail
        if (qChar >= 'A' && qChar <= 'Z') {
            return false;
        }
        
        // Lowercase - skip it (inserted char)
        return isMatch(query, qIdx + 1, pattern, pIdx);
    };
    
    return queries.map(q => isMatch(q, 0, pattern, 0));
};
```

**Pros:**

- Elegant recursive structure
- Easy to add memoization if needed

**Cons:**

- Call stack overhead
- Risk of stack overflow (though unlikely with constraints)
- Slightly less efficient than iterative

---

### **Comparison Table**

| Approach                   | Time    | Space | Code Clarity | Interview Suitability |
|----------------------------|---------|-------|--------------|-----------------------|
| Two Pointers (Recommended) | O(N×M)  | O(N)  | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐          |
| Regex                      | O(N×M)* | O(N)  | ⭐⭐⭐      | ⭐⭐                 |
| Recursive                  | O(N×M)  | O(N+M)| ⭐⭐⭐⭐    | ⭐⭐⭐⭐            |

**Recommendation:** Use the **two-pointer iterative approach** for interviews!

## **10. Practice Recommendations**

### **Similar Problems (Same Pattern)**

**Beginner Level:**

1. **LC 392 - Is Subsequence** ⭐
   - Direct application of two-pointer subsequence matching
   - Perfect warm-up problem

2. **LC 524 - Longest Word in Dictionary through Deleting**
   - Subsequence matching with comparison
   - Adds sorting element

**Intermediate Level:**
3. **LC 792 - Number of Matching Subsequences** ⭐⭐

- Multiple pattern matching
- Optimization with bucketing

1. **LC 844 - Backspace String Compare**
   - Two pointer with modification rules
   - Different constraint but similar logic

2. **LC 125 - Valid Palindrome**
   - Two pointers with character filtering
   - Character classification (like uppercase/lowercase)

**Advanced Level:**
6. **LC 727 - Minimum Window Subsequence** ⭐⭐⭐

- Subsequence with sliding window
- Combines multiple patterns

1. **LC 940 - Distinct Subsequences II**
   - Dynamic programming on subsequences
   - More complex version

### **Practice Strategy**

**Week 1:** Master the basics

- Day 1-2: LC 392 (Is Subsequence)
- Day 3-4: LC 1023 (This problem)
- Day 5-7: LC 524

**Week 2:** Build complexity

- LC 844, 792
- Review and compare solutions

**Week 3:** Advanced applications

- LC 727, 940
- Mock interview practice

### **Pattern Recognition Template**

When you see these keywords in a problem:

- ✅ "subsequence"
- ✅ "matches pattern"
- ✅ "insert/delete characters"
- ✅ "maintain order"

**Think:** Two-pointer subsequence matching!

## **11. Flowchart Design---**

## **Key Takeaways 🎯**

### **1. **Core Concept****

This is a **constrained subsequence matching** problem. The pattern must appear as a subsequence in the query, with only lowercase letters allowed as insertions.

### **2. **The Two-Pointer Technique****

- One pointer tracks progress in the pattern
- One pointer scans the query
- Decision made at each query character

### **3. **Character Classification Matters****

- Uppercase in pattern → must match exactly
- Uppercase not in pattern → immediate failure
- Lowercase → flexible (can be inserted)

### **4. **Interview Tips****

- Start by clarifying: "Can we insert uppercase?" (No!)
- Walk through an example before coding
- Test edge cases: empty strings, all uppercase, pattern longer than query

### **5. **Pattern Recognition****

When you see "insert characters" + "maintain order" → Think two-pointers!

---

**You're now ready to tackle similar problems!** Practice the recommended problems to solidify this pattern. Good luck! 🚀
