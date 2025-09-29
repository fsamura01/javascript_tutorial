/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */

/* Two Pointer Approach */
function mergeAlternately(word1, word2) {
  // Initialize result string and pointers for both words
  let result = "";
  let i = 0,
    j = 0;

  // Continue while either string has characters left
  while (i < word1.length || j < word2.length) {
    // If word1 has characters remaining, add the next one
    if (i < word1.length) {
      result += word1[i];
      i++;
    }

    // If word2 has characters remaining, add the next one
    if (j < word2.length) {
      result += word2[j];
      j++;
    }
  }

  return result;
}

function mergeAlternately(word1, word2) {
  const maxLength = Math.max(word1.length, word2.length);
  return Array.from(
    { length: maxLength },
    (_, i) => (word1[i] || "") + (word2[i] || "")
  ).join("");
}

var mergeAlternately = function (word1, word2) {
  let merged = ""; // Result string
  let i = 0,
    j = 0; // Two pointers

  while (i < word1.length || j < word2.length) {
    if (i < word1.length) merged += word1[i++];
    if (j < word2.length) merged += word2[j++];
  }

  return merged;
};

// Example Test Cases
console.log(mergeAlternately("abc", "pqr")); // Output: "apbqcr"
console.log(mergeAlternately("ab", "pqrs")); // Output: "apbqrs"
console.log(mergeAlternately("abcd", "pq")); // Output: "apbqcd"

var mergeAlternately = function (word1, word2) {
  let result = [];
  let i = 0,
    j = 0;

  while (i < word1.length || j < word2.length) {
    if (i < word1.length) result.push(word1[i++]);
    if (j < word2.length) result.push(word2[j++]);
  }

  return result.join(""); // Efficient merging
};

var mergeAlternately = function (word1, word2, i = 0, j = 0) {
  if (i === word1.length) return word2.slice(j);
  if (j === word2.length) return word1.slice(i);
  return word1[i] + word2[j] + mergeAlternately(word1, word2, i + 1, j + 1);
};
