function letterCombinations(digits) {
  // if(!digits.length) return [];
  if (digits.length === 0) return [];
  if (!digits) return [];

  const digitToLetters = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];

  function backtrack(i, currentString) {
    if (currentString.length === digits.length) {
      result.push(currentString);
      return;
    }

    const letters = digitToLetters[digits[i]];
    for (const letter of letters) {
      backtrack(i + 1, currentString + letter);
    }
  }

  backtrack(0, "");
  return result;
}

// Example usage:
console.log(letterCombinations("23")); // Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(letterCombinations("")); // Output: []
console.log(letterCombinations("2")); // Output: ["a","b","c"]
