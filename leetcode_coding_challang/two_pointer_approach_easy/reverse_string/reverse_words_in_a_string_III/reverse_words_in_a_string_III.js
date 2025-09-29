var reverseWords = function (s) {
  return s
    .split(" ") // Step 1: Split into words
    .map((word) => word.split("").reverse().join("")) // Step 2: Reverse each word
    .join(" "); // Step 3: Join words back with spaces
};

reverseWords("Let's take LeetCode contest");
reverseWords("Mr Ding");

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

// Two pointer approach
var reverseWords = function (s) {
  let arr = s.split(""); // Convert string to character array
  let n = arr.length;
  let left = 0;

  for (let right = 0; right <= n; right++) {
    // When we find a space or reach the end, reverse the word
    if (right === n || arr[right] === " ") {
      reverse(arr, left, right - 1);
      left = right + 1; // Move left to start of next word
    }
  }

  return arr.join(""); // Convert array back to string
};

// Helper function to reverse characters in place
function reverse(arr, left, right) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // Swap characters
    left++;
    right--;
  }
}
