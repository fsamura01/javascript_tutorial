function romanToInt(s) {
  // Step 1: Define the Roman numeral values in a map
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // Step 2: Initialize result variable
  let result = 0;

  // Step 3: Iterate over the string
  for (let i = 0; i < s.length; i++) {
    const current = romanValues[s[i]];
    const next = romanValues[s[i + 1]];

    // Step 4: Decide to add or subtract based on comparison with the next numeral
    if (next && current < next) {
      result -= current; // Subtract if current value is less than the next
    } else {
      result += current; // Otherwise, add the current value
    }
  }

  // Step 5: Return the final result
  return result;
}

/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
  // Step 1: Create a mapping of Roman numerals to integers
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  // Step 2: Iterate through the string
  for (let i = 0; i < s.length; i++) {
    // Get current and next values
    const currentValue = romanValues[s[i]];
    const nextValue = romanValues[s[i + 1]] || 0; // Use 0 if next value doesn't exist

    // Step 3: Compare current value with next value
    if (currentValue < nextValue) {
      // Subtraction case
      result += nextValue - currentValue;
      i++; // Skip next character as we've already used it
    } else {
      // Addition case
      result += currentValue;
    }
  }

  return result;
}

// Additional test cases
console.log(romanToInt("III")); // 3
console.log(romanToInt("LVIII")); // 58
console.log(romanToInt("MCMXCIV")); // 1994
console.log(romanToInt("IX")); // 9
console.log(romanToInt("XL")); // 40
console.log(romanToInt("CD")); // 400

var romanToInt = function (s) {
  const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const currentValue = romanMap[s[i]];
    const nextValue = romanMap[s[i + 1]] || 0;

    if (currentValue < nextValue) {
      if (s.length > i) {
        result += nextValue - currentValue;
        i++;
      }
    } else {
      result += currentValue;
    }
  }

  return result;
};
