/**
 * @param {string} s
 * @return {string}
 */
function reverseOnlyLetters(s) {
  // Convert string to array since strings are immutable in JavaScript
  const arr = s.split("");

  // Initialize two pointers
  let left = 0;
  let right = s.length - 1;

  // Helper function to check if character is a letter
  const isLetter = (char) => {
    return /[a-zA-Z]/.test(char);
  };

  // Continue until pointers meet
  while (left < right) {
    // Skip non-letters from left
    while (left < right && !isLetter(arr[left])) {
      left++;
    }

    // Skip non-letters from right
    while (left < right && !isLetter(arr[right])) {
      right--;
    }

    // Swap letters if pointers haven't met
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  // Convert array back to string
  return arr.join("");
}
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
