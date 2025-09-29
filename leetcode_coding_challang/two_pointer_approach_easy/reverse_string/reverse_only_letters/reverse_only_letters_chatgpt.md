# **917. Reverse Only Letters**

## **Step 1: Problem Understanding**

The problem **917. Reverse Only Letters** requires us to reverse only the letters in a given string while keeping the non-letter characters in their original positions.

### **Clarifying Constraints and Edge Cases**

- The input string consists of printable ASCII characters.
- Non-letter characters (digits, punctuation, spaces) should remain in place.
- Only **letters (a-z, A-Z)** should be reversed.
- The case should remain unchanged.
- Edge cases:
  - An empty string → Return `""`.
  - A string with no letters → Return the same string.
  - A string with only letters → Reverse the entire string.

---

## **Step 2: Pattern Identification**

This problem can be effectively solved using the **Two Pointers** technique:

- One pointer starts from the left (`i = 0`).
- Another pointer starts from the right (`j = length - 1`).
- Swap only the letter characters and move pointers accordingly.

---

## **Step 3: Approach Discussion**

1. Convert the string into an array (since strings are immutable in JavaScript).
2. Initialize two pointers:
   - `i` (left) at the beginning.
   - `j` (right) at the end.
3. Move `i` forward if it's pointing to a non-letter.
4. Move `j` backward if it's pointing to a non-letter.
5. Swap characters at `i` and `j` when both are letters.
6. Continue this process until `i >= j`.

---

## **Step 4: Code Implementation (JavaScript)**

```javascript
function reverseOnlyLetters(s) {
  let arr = s.split(""); // Convert string to array
  let i = 0,
    j = arr.length - 1;

  while (i < j) {
    if (!isLetter(arr[i])) {
      i++; // Move left pointer if not a letter
    } else if (!isLetter(arr[j])) {
      j--; // Move right pointer if not a letter
    } else {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap letters
      i++;
      j--;
    }
  }

  return arr.join(""); // Convert array back to string
}

// Helper function to check if a character is a letter
function isLetter(ch) {
  return /^[a-zA-Z]$/.test(ch);
}

// Example Test Cases
console.log(reverseOnlyLetters("ab-cd")); // "dc-ba"
console.log(reverseOnlyLetters("a-bC-dEf-ghIj")); // "j-Ih-gfE-dCba"
console.log(reverseOnlyLetters("Test1ng-Leet=code-Q!")); // "Qedo1ct-eeLg=ntse-T!"
```

---

## **Step 5: Complexity Analysis**

- **Time Complexity:** \(O(n)\)
  - We iterate through the string **at most once** with two pointers.
- **Space Complexity:** \(O(n)\)
  - We use an extra array to store the modified string.

---

## **Step 6: Alternative Solutions**

1. **Stack-Based Approach:**

   - Extract all letters into a stack.
   - Iterate through the string and replace letters with the ones popped from the stack.
   - **Time Complexity:** \(O(n)\), **Space Complexity:** \(O(n)\) (due to stack storage).

2. **Using Regular Expressions:**
   - Extract all letters → Reverse them → Replace in original positions.
   - More elegant but requires **extra space**.

---

## **Step 7: Practice Recommendations**

- **125. Valid Palindrome** (Two Pointers)
- **344. Reverse String** (Two Pointers)
- **345. Reverse Vowels of a String** (Two Pointers)
- **151. Reverse Words in a String** (String Manipulation)

---

## **Step 8: Flowchart Design**

I’ll generate a **flowchart** to illustrate the solution visually.

There was an issue with generating the flowchart. Let me correct it and provide a clear diagram.

I’ve created a **flowchart** that visually represents the **two-pointer approach**. You can follow the steps in the diagram to understand how the algorithm processes the string efficiently.

Would you like me to generate a downloadable version of the flowchart? 🚀
