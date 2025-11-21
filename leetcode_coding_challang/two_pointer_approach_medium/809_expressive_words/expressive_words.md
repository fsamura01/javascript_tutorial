# Learning Leetcode 809: Expressive Words Through First Principles

Let me guide you through this problem step by step, building your understanding from the ground up.

## 1. Problem Understanding

At its heart, this problem is asking us to determine whether a word can be "stretched" to match a target string through a specific transformation rule. Think of it like pulling taffy—you can only stretch certain parts, and only in certain ways.

The key insight is that we can extend groups of identical characters, but only if we extend them to at least three characters total. For example, if we have "ll" (two l's), we can stretch it to "lll", "llll", "lllll", and so on. But we cannot stretch "l" (a single l) to "ll" because that would only be two characters, which is less than the required minimum of three.

Let me clarify some important edge cases that might trip us up. First, if a word contains a character that doesn't exist in the target string at the same position, it can never be stretchy—the characters must match exactly, just in different quantities. Second, if the target string has a group of characters that's smaller than the corresponding group in the word, that word cannot be stretchy because we can only add characters, never remove them. Third, if the target string has exactly two of some character, the word must also have exactly two—we cannot stretch from one to two, nor can we shrink from three or more down to two.

## 2. Constraints of the Problem

Understanding the constraints helps us choose the right approach and avoid overthinking the solution. With strings of length up to one hundred and up to one hundred words to check, we're dealing with relatively small inputs. This means we don't need to worry about highly optimized solutions—a straightforward approach that runs in reasonable time will work perfectly fine.

The fact that all strings consist only of lowercase letters simplifies our work because we don't need to handle special characters, numbers, or case sensitivity. We can focus purely on the stretching logic.

The constraint that each word can have length up to one hundred means that in the worst case, we might process around ten thousand character comparisons for a single test case, which is well within acceptable performance bounds for most programming challenges.

## 3. Breaking Down the Problem

Let me break this problem into digestible pieces. The fundamental operation we need to perform is comparing two strings character group by character group. A character group is simply a sequence of identical adjacent characters, like "eee" or "ll" or "oooo".

For each word, we need to extract its character groups and compare them with the character groups in the target string. If the groups don't match up—either in terms of which characters appear or in what order—then the word isn't stretchy.

Once we know the groups align, we need to validate the stretching rules. For each corresponding pair of groups, we check whether the word's group can be legitimately extended to match the target's group. This means the target group must be either the same size as the word's group (no stretching needed), or it must be at least size three (allowing stretching) and larger than the word's group.

## 4. Pattern Identification

This problem fits beautifully into the two-pointer pattern, which is a technique where we maintain pointers into two different sequences and advance them based on certain conditions. Think of it like reading two books side by side, moving bookmarks forward as we compare corresponding sections.

The two-pointer approach works wonderfully here because we're comparing two strings position by position, but we're not just comparing individual characters—we're comparing groups of characters. As we identify each group in both strings, we advance our pointers past those groups and move on to the next comparison.

This pattern appears frequently in problems involving string comparison, merging sorted arrays, or any scenario where you need to process two sequences in parallel. Recognizing this pattern will help you tackle many similar problems efficiently.

## 5. Step-by-Step Approach

Let me walk you through the solution strategy as if we were solving it together on a whiteboard. First, we need a helper function that can identify and measure character groups. This function takes a string and a starting position, then counts how many consecutive identical characters appear from that position.

For each word in our input array, we'll use a two-pointer technique where one pointer traverses the target string and another traverses the current word. We start both pointers at the beginning of their respective strings.

At each step, we first check if the characters at both pointers match. If they don't, we immediately know this word cannot be stretchy, so we move on to the next word. If they do match, we count the size of the character group starting from each pointer position.

Now comes the crucial validation logic. We compare the group sizes. If the target string's group is smaller than the word's group, that's impossible—we can't shrink characters. If the target's group is larger than the word's group but smaller than three characters, that's also impossible because we can't extend to a group of size two. Otherwise, the stretching is valid for this group.

After validating one pair of groups, we advance both pointers past those groups and continue to the next groups. If we successfully process all groups and both pointers reach the end of their strings simultaneously, we've found a stretchy word and increment our count.

## 6. Code Implementation

Let me show you how this translates into actual code, with detailed comments explaining each decision.

### Javascript implementation

```Javascript
/**
 * @param {string} s - The target stretchy string
 * @param {string[]} words - Array of query words to check
 * @return {number} - Count of stretchy words
 */
function expressiveWords(s, words) {
    // Main function that counts how many words can be stretched to match s
    let count = 0;
    
    // Check each word individually to see if it's stretchy
    for (let word of words) {
        if (isStretchy(s, word)) {
            count++;
        }
    }
    
    return count;
}

/**
 * Helper function to determine if a word can be stretched to match target
 * Uses two-pointer technique to compare character groups
 */
function isStretchy(target, word) {
    // Initialize pointers for both strings
    let i = 0; // pointer for target string
    let j = 0; // pointer for word string
    
    // Process both strings character group by character group
    while (i < target.length && j < word.length) {
        // First, verify that the characters at both pointers match
        // If they don't match, this word cannot be stretchy
        if (target[i] !== word[j]) {
            return false;
        }
        
        // Count the size of the character group in target string
        // This tells us how many consecutive identical characters we have
        let targetGroupLength = getGroupLength(target, i);
        
        // Count the size of the character group in word string
        let wordGroupLength = getGroupLength(word, j);
        
        // Now apply the stretching rules to validate this pair of groups
        // Rule 1: If target group is smaller than word group, impossible to stretch
        // We can only add characters, never remove them
        if (targetGroupLength < wordGroupLength) {
            return false;
        }
        
        // Rule 2: If target group is larger but less than 3, also impossible
        // We cannot extend a group to size 2 (minimum extension is to size 3)
        // Exception: if both groups are the same size, no stretching is needed
        if (targetGroupLength > wordGroupLength && targetGroupLength < 3) {
            return false;
        }
        
        // If we've passed both validation checks, this group pair is valid
        // Move both pointers past the current groups to check the next groups
        i += targetGroupLength;
        j += wordGroupLength;
    }
    
    // For the word to be stretchy, both pointers must reach the end simultaneously
    // If one string has remaining characters, the structures don't match
    return i === target.length && j === word.length;
}

/**
 * Helper function to count consecutive identical characters
 * Returns the length of the character group starting at position start
 */
function getGroupLength(str, start) {
    let end = start;
    // Keep advancing while we see the same character
    while (end < str.length && str[end] === str[start]) {
        end++;
    }
    // Return the count of identical characters
    return end - start;
}

// Example usage and testing
console.log(expressiveWords("heeellooo", ["hello", "hi", "helo"])); // Output: 1
console.log(expressiveWords("zzzzzyyyyy", ["zzyy","zy","zyy"])); // Output: 3
```

### Java implementation

```Java
class Solution {
    /**
     * Main method that counts how many words can be stretched to match s
     * @param s The target stretchy string
     * @param words Array of query words to check
     * @return Count of stretchy words
     */
    public int expressiveWords(String s, String[] words) {
        int count = 0;
        
        // Check each word individually to see if it's stretchy
        for (String word : words) {
            if (isStretchy(s, word)) {
                count++;
            }
        }
        
        return count;
    }
    
    /**
     * Helper method to determine if a word can be stretched to match target
     * Uses two-pointer technique to compare character groups
     * @param target The string we want to match
     * @param word The word we're checking for stretchiness
     * @return true if word is stretchy, false otherwise
     */
    private boolean isStretchy(String target, String word) {
        // Initialize pointers for both strings
        int i = 0; // pointer for target string
        int j = 0; // pointer for word string
        
        // Process both strings character group by character group
        while (i < target.length() && j < word.length()) {
            // First, verify that the characters at both pointers match
            // If they don't match, this word cannot be stretchy
            if (target.charAt(i) != word.charAt(j)) {
                return false;
            }
            
            // Count the size of the character group in target string
            // This tells us how many consecutive identical characters we have
            int targetGroupLength = getGroupLength(target, i);
            
            // Count the size of the character group in word string
            int wordGroupLength = getGroupLength(word, j);
            
            // Now apply the stretching rules to validate this pair of groups
            // Rule 1: If target group is smaller than word group, impossible to stretch
            // We can only add characters, never remove them
            if (targetGroupLength < wordGroupLength) {
                return false;
            }
            
            // Rule 2: If target group is larger but less than 3, also impossible
            // We cannot extend a group to size 2 (minimum extension is to size 3)
            // Exception: if both groups are the same size, no stretching is needed
            if (targetGroupLength > wordGroupLength && targetGroupLength < 3) {
                return false;
            }
            
            // If we've passed both validation checks, this group pair is valid
            // Move both pointers past the current groups to check the next groups
            i += targetGroupLength;
            j += wordGroupLength;
        }
        
        // For the word to be stretchy, both pointers must reach the end simultaneously
        // If one string has remaining characters, the structures don't match
        return i == target.length() && j == word.length();
    }
    
    /**
     * Helper method to count consecutive identical characters
     * Returns the length of the character group starting at position start
     * @param str The string to analyze
     * @param start The starting position
     * @return The count of consecutive identical characters
     */
    private int getGroupLength(String str, int start) {
        int end = start;
        // Keep advancing while we see the same character
        while (end < str.length() && str.charAt(end) == str.charAt(start)) {
            end++;
        }
        // Return the count of identical characters
        return end - start;
    }
}

// Example usage for testing
class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test case 1
        String s1 = "heeellooo";
        String[] words1 = {"hello", "hi", "helo"};
        System.out.println(solution.expressiveWords(s1, words1)); // Output: 1
        
        // Test case 2
        String s2 = "zzzzzyyyyy";
        String[] words2 = {"zzyy", "zy", "zyy"};
        System.out.println(solution.expressiveWords(s2, words2)); // Output: 3
    }
}
```

Now let me show you the Java implementation, which follows the same logical structure but with Java's syntax and conventions:

## 7. Complexity Analysis

Let me break down the performance characteristics of our solution so you can understand how it behaves with different input sizes.

For time complexity, we need to consider what happens when we process each word. For every word we examine, we traverse both the target string and the word itself using our two-pointer approach. In the worst case, we might look at every character in both strings exactly once. If the target string has length n and we're checking a word of length m, that single comparison takes O(n + m) time. Since we do this for k words, our overall time complexity is O(k × (n + m)). Given the constraints where everything is bounded by one hundred, this translates to roughly ten thousand operations in the worst case, which executes almost instantaneously on modern hardware.

The space complexity is remarkably efficient. We only use a constant amount of extra space—just a few integer variables for our pointers and counters, plus the single integer to track our result count. We don't create any arrays, hash maps, or other data structures that grow with the input size. This gives us O(1) space complexity, which is as good as it gets.

## 8. Alternative Solutions

While our two-pointer solution is clean and efficient, let me share another perspective that might help cement your understanding. Some programmers prefer to explicitly extract all character groups into separate data structures before comparing them. You could create a list of pairs for each string, where each pair stores a character and its count, like [('h', 1), ('e', 3), ('l', 2), ('o', 3)].

This approach makes the comparison logic slightly more intuitive because you can iterate through two lists and compare corresponding elements directly. However, it comes at the cost of additional space—you'd need O(n + m) space to store these group representations. For this particular problem with its small constraints, the space trade-off doesn't matter much, but the two-pointer approach we used is more elegant and demonstrates a technique that scales better to problems with tighter memory requirements.

Another variation worth considering is using regular expressions to extract character groups, though this tends to be overkill for competitive programming and can obscure the underlying logic. The direct pointer manipulation we've used gives you maximum control and makes the algorithm's behavior completely transparent.

## 9. Practice Recommendations

Now that you understand the two-pointer pattern in the context of character group comparison, let me suggest some problems that will reinforce and expand your skills in this area.

I recommend tackling **LeetCode 844: Backspace String Compare**, which also uses two pointers but adds the twist of processing strings that contain backspace characters. This problem will strengthen your ability to manipulate pointers in non-trivial ways.

Next, try **LeetCode 443: String Compression**, which asks you to compress strings by replacing consecutive characters with the character followed by its count. This problem is almost like the inverse of our current problem—instead of checking if compression is valid, you're actually performing the compression. The technique of identifying character groups will be directly applicable.

Another excellent problem is **LeetCode 408: Valid Word Abbreviation**, which involves comparing a word against its potential abbreviation using a similar character-by-character matching strategy with different rules for advancement.

Finally, challenge yourself with **LeetCode 524: Longest Word in Dictionary through Deleting**, which uses two pointers to determine if one string is a subsequence of another. This will broaden your two-pointer toolkit beyond exact character matching to include skipping characters strategically.

## 10. Flowchart Design

Let me create a visual representation of our algorithm's flow, showing how decisions cascade through the solution:

---

## Key Takeaways

This problem beautifully demonstrates how the two-pointer pattern can elegantly solve string comparison problems where you need to process groups of elements rather than individual elements. The essence of the solution lies in recognizing that we're not just comparing strings character by character, but rather group by group, and that each group comparison must satisfy specific stretching rules.

The most crucial insight is understanding when stretching is valid. Remember that we can only add characters, never remove them, and we can only create groups of three or more characters through stretching. A group of size two cannot be created by stretching—it must exist in the original word.

As you practice more problems, you'll start to recognize when a two-pointer approach is appropriate. Look for situations where you're comparing two sequences, processing them in parallel, or need to track positions in multiple strings simultaneously. This pattern appears frequently in interview questions and competitive programming because it's both powerful and efficient.

Keep practicing, and remember that understanding the underlying principles—like recognizing character groups and validating transformation rules—is more valuable than memorizing the code. Once you grasp these concepts, you can apply them to countless variations of similar problems.

---
Excellent question! Let me clarify this crucial concept with concrete examples from the test cases you provided.

## The "Exactly Two" Rule Explained

The statement means: **If the target string has a group of exactly 2 identical characters, the original word MUST also have exactly 2 of that same character in that position.**

Let me break down why this rule exists and show you examples:

### Why Can't We Stretch from 1 to 2?

The problem states we can only extend a group **to 3 or more characters**. We cannot extend a group to exactly 2 characters.

**Example from "heeellooo" vs "hello":**

- Target: "he**ee**ellooo" (has 3 e's)
- Word: "h**e**llo" (has 1 e)
- ✅ **This works!** We can stretch 1 e → 3 e's (or more)

But if we had:

- Target: "h**ee**llooo" (only 2 e's)
- Word: "h**e**llo" (has 1 e)
- ❌ **This FAILS!** We cannot stretch 1 e → 2 e's (not allowed by the rules)

### Why Can't We Shrink from 3+ to 2?

Remember, we can only **ADD** characters, never remove them. So if the word has 3 or more of a character, the target must have at least that many (or more).

**Example:**

- Target: "h**ee**llo" (has 2 e's)
- Word: "h**eee**llo" (has 3 e's)
- ❌ **This FAILS!** We'd need to remove an 'e', which is impossible

### Real Examples from the Test Cases

Let me trace through your examples to show where this rule applies:

#### Example 1: s = "heeellooo", words = ["hello", "hi", "helo"]

**Checking "hello":**

```javascript
Target: h-eee-ll-ooo
Word:   h-e--ll-o

Groups comparison:
- 'h': target=1, word=1 → ✅ Equal (no stretching needed)
- 'e': target=3, word=1 → ✅ Can stretch 1→3 (≥3 allowed)
- 'l': target=2, word=2 → ✅ Equal (no stretching needed)
- 'o': target=3, word=1 → ✅ Can stretch 1→3 (≥3 allowed)

Result: ✅ STRETCHY
```

**Checking "helo":**

```javascript
Target: h-eee-ll-ooo
Word:   h-e--l--o

Groups comparison:
- 'h': target=1, word=1 → ✅ Equal
- 'e': target=3, word=1 → ✅ Can stretch 1→3
- 'l': target=2, word=1 → ❌ CANNOT stretch 1→2 (must be ≥3)

Result: ❌ NOT STRETCHY
```

See how the 'll' group in the target (size 2) requires the word to also have exactly 2 l's? Since "helo" only has 1 'l', it fails.

#### Example 2: s = "zzzzzyyyyy", words = ["zzyy","zy","zyy"]

**Checking "zzyy":**

```javascript
Target: zzzzz-yyyyy
Word:   zz----yy

Groups comparison:
- 'z': target=5, word=2 → ✅ Can stretch 2→5 (target ≥3)
- 'y': target=5, word=2 → ✅ Can stretch 2→5 (target ≥3)

Result: ✅ STRETCHY
```

**Checking "zy":**

```javascript
Target: zzzzz-yyyyy
Word:   z-----y

Groups comparison:
- 'z': target=5, word=1 → ✅ Can stretch 1→5 (target ≥3)
- 'y': target=5, word=1 → ✅ Can stretch 1→5 (target ≥3)

Result: ✅ STRETCHY
```

**Checking "zyy":**

```javascript
Target: zzzzz-yyyyy
Word:   z-----yy

Groups comparison:
- 'z': target=5, word=1 → ✅ Can stretch 1→5 (target ≥3)
- 'y': target=5, word=2 → ✅ Can stretch 2→5 (target ≥3)

Result: ✅ STRETCHY
```

### The Key Rule Visualized

Here's a simple decision tree for any character group:

```javascript
Word has X characters, Target has Y characters

Case 1: X == Y
  → ✅ VALID (no stretching needed)

Case 2: X < Y
  Sub-case 2a: Y >= 3
    → ✅ VALID (can stretch to 3+)
  Sub-case 2b: Y == 2
    → ❌ INVALID (cannot stretch to exactly 2)
  Sub-case 2c: Y == 1
    → ❌ INVALID (already impossible since X < Y and Y=1)

Case 3: X > Y
  → ❌ INVALID (cannot remove characters)
```

### More Examples to Solidify Understanding

Let me create a few more examples:

- **Example A: Target has exactly 2 characters**

```javascript
Target: "aa"
Word:   "a"    → ❌ Cannot stretch 1→2
Word:   "aa"   → ✅ Exact match (no stretching)
Word:   "aaa"  → ❌ Cannot shrink 3→2
```

- **Example B: Target has 3+ characters**

```javascript
Target: "aaa"
Word:   "a"    → ✅ Can stretch 1→3
Word:   "aa"   → ✅ Can stretch 2→3
Word:   "aaa"  → ✅ Exact match
Word:   "aaaa" → ❌ Cannot shrink 4→3
```

### Why This Rule Makes Sense

Think about the real-world metaphor: when we type "hellooo" to show excitement, we hold down a key to add extra characters. You can hold 'o' to get "ooo" (3+), but if you tap it twice quickly for "oo" (2), that's a deliberate choice—not an extension. The rule reflects that groups of exactly 2 characters are intentional and cannot be created by "stretching" from a single character.

Does this clarification help? The key insight is that **2 is a special boundary**: stretching operations must create groups of 3 or more, making groups of exactly 2 unchangeable—they must match exactly between word and target.

---
Excellent question! These two pieces of code look similar but behave **very differently**. Let me break down exactly what each one does with concrete examples.

## The Two Versions

### Version 1 (Our Correct Solution)

```javascript
while (end < str.length && str[end] === str[start]) {
    end++;
}
```

### Version 2 (Problematic Version)

```javascript
while (end < str.length) {
    if (str[end] === str[start]) {
        end++;
    }
}
```

## Key Difference: Loop Termination

The critical difference is **when the loop stops**.

### Version 1: Stops When Characters Differ

- Checks TWO conditions: `end < str.length` **AND** `str[end] === str[start]`
- Loop continues ONLY if **BOTH** conditions are true
- **Stops immediately** when it encounters a different character

### Version 2: Never Stops (Infinite Loop!)

- Checks ONE condition: `end < str.length`
- The `if` statement inside doesn't affect loop termination
- **Continues until end of string**, regardless of character matching

## Step-by-Step Walkthrough

Let me trace through both versions with a concrete example:

```javascript
str = "heeellooo"
start = 1  // pointing at first 'e'
end = 1    // also starting at first 'e'
```

### Version 1 Execution (Correct)

```
Iteration 1:
  Check: end(1) < 9 ✓ AND str[1]('e') === str[1]('e') ✓
  Action: end++ → end = 2

Iteration 2:
  Check: end(2) < 9 ✓ AND str[2]('e') === str[1]('e') ✓
  Action: end++ → end = 3

Iteration 3:
  Check: end(3) < 9 ✓ AND str[3]('e') === str[1]('e') ✓
  Action: end++ → end = 4

Iteration 4:
  Check: end(4) < 9 ✓ AND str[4]('l') === str[1]('e') ✗
  Action: STOP LOOP
  
Final: end = 4
Group length: 4 - 1 = 3 ✓ (correct! three 'e's)
```

### Version 2 Execution (Infinite Loop)

```
Iteration 1:
  Check: end(1) < 9 ✓ → Enter loop
  If: str[1]('e') === str[1]('e') ✓
  Action: end++ → end = 2

Iteration 2:
  Check: end(2) < 9 ✓ → Enter loop
  If: str[2]('e') === str[1]('e') ✓
  Action: end++ → end = 3

Iteration 3:
  Check: end(3) < 9 ✓ → Enter loop
  If: str[3]('e') === str[1]('e') ✓
  Action: end++ → end = 4

Iteration 4:
  Check: end(4) < 9 ✓ → Enter loop
  If: str[4]('l') === str[1]('e') ✗
  Action: end stays at 4 (no increment)

Iteration 5:
  Check: end(4) < 9 ✓ → Enter loop AGAIN!
  If: str[4]('l') === str[1]('e') ✗
  Action: end stays at 4 (no increment)

Iteration 6:
  Check: end(4) < 9 ✓ → Enter loop AGAIN!
  If: str[4]('l') === str[1]('e') ✗
  Action: end stays at 4 (no increment)

... INFINITE LOOP! end never advances, so it never reaches str.length
```

## Visual Comparison

Let me create a visual representation:## The Problem with Version 2

The fundamental issue is that **the `if` statement inside the loop doesn't control when the loop exits**. Let me illustrate:

```javascript
// Version 2's problem:
while (end < str.length) {  // ← This is the ONLY exit condition
    if (str[end] === str[start]) {
        end++;  // ← Only increments if characters match
    }
    // ← If characters DON'T match, end stays the same
    // ← Loop continues because end < str.length is still true!
}
```

When `str[end] !== str[start]`:

- The `if` condition is false
- `end++` doesn't execute
- `end` stays at the same value
- Next iteration: `end < str.length` is still true
- Loop continues with the same `end` value
- **Infinite loop!**

## The Correct Approach (Version 1)

```javascript
// Version 1's solution:
while (end < str.length && str[end] === str[start]) {
    end++;
}
```

The `&&` operator creates a **compound condition**. Both must be true:

- When `str[end] !== str[start]`, the entire condition becomes false
- Loop exits immediately
- No infinite loop possible

## Another Way to Fix Version 2

If you wanted to keep the nested structure, you'd need to explicitly break:

```javascript
// Version 2 Fixed:
while (end < str.length) {
    if (str[end] === str[start]) {
        end++;
    } else {
        break;  // ← Must explicitly exit the loop
    }
}
```

But this is unnecessarily verbose compared to Version 1's elegant solution.

## Summary Table

| Aspect                | Version 1 (`&&`)                    | Version 2 (nested `if`)              |
|-----------------------|-------------------------------------|--------------------------------------|
| **Exit condition**    | Two conditions (bounds AND match)   | One condition (bounds only)          |
| **When chars differ** | Loop exits immediately              | Loop continues forever               |
| **Result**            | Correct group length                | Infinite loop (crashes)              |
| **Why**               | `&&` makes BOTH conditions required | `if` doesn't affect loop termination |

The key insight: **`&&` in the while condition makes both checks mandatory for continuation, while a nested `if` only conditionally executes its body but doesn't stop the loop.**
