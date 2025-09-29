# **557. Reverse Words in a String III**

## **I'll solve the problem step by step with a comprehensive JavaScript solution and complexity analysis.**

```javascript
/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
  // Split the string into words
  const words = s.split(" ");

  // Reverse each word
  const reversedWords = words.map((word) => {
    // Convert word to array, reverse, then join back
    return word.split("").reverse().join("");
  });

  // Join the reversed words back with spaces
  return reversedWords.join(" ");
}
```

Let's break down the solution:

## **Approach Explanation:**

1. `s.split(' ')`: Splits the string into an array of words

   - For "Let's take LeetCode contest" → ["Let's", "take", "LeetCode", "contest"]

2. `.map(word => {...})`: Transforms each word

   - Splits each word into characters
   - Reverses the characters
   - Joins characters back into a word
   - For "Let's" → "s'teL"

3. `.join(' ')`: Reconstructs the sentence with reversed words

## **Complexity Analysis:**

- **Time Complexity: O(n)**

  - Splitting string: O(n)
  - Mapping and reversing each word: O(n)
  - Joining words back: O(n)
  - Overall: O(n), where n is the length of the string

- **Space Complexity: O(n)**
  - We create new arrays for words and reversed words
  - Each character is stored in memory during reversal
  - Total space used is proportional to input string length

## **Alternative One-Liner Solution:**

```javascript
const reverseWords = (s) =>
  s
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
```

### **Example Walkthrough:**

```javascript
Input: "Let's take LeetCode contest"

Step 1: Split into words
["Let's", "take", "LeetCode", "contest"]

Step 2: Reverse each word
["s'teL", "ekat", "edoCteeL", "tsetnoc"]

Step 3: Join back
"s'teL ekat edoCteeL tsetnoc"
```

## **Edge Case Handling:**

- Works with single-character words
- Handles punctuation within words
- Preserves original word order
- Maintains single space between words

## **Key JavaScript Methods Used:**

- `split()`: Converts string to array
- `map()`: Transforms each element
- `reverse()`: Reverses array in-place
- `join()`: Converts array back to string
