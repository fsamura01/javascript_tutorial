/**
 * @param {string} s
 * @return {string}
 */
function makeFancyString(s) {
  // Create array to build result
  const result = [];
  // Counter for consecutive characters
  let count = 1;

  // Add first character as it will always be included
  result.push(s[0]);

  // Iterate through string starting from second character
  for (let i = 1; i < s.length; i++) {
    // Check if current character matches previous character
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      // Reset counter for new character
      count = 1;
    }

    // Add character if we haven't seen three consecutive
    if (count < 3) {
      result.push(s[i]);
    }
  }

  // Join array back into string
  return result.join("");
}

function explainMakeFancyString(s) {
  const result = [];
  let count = 1;

  console.log(`\nMaking fancy string from: "${s}"`);
  console.log("─".repeat(50));

  // Add first character
  result.push(s[0]);
  console.log(`Initial character: ${s[0]}`);

  for (let i = 1; i < s.length; i++) {
    console.log(`\nStep ${i}:`);
    console.log(`Current character: ${s[i]}`);
    console.log(`Previous character: ${s[i - 1]}`);

    if (s[i] === s[i - 1]) {
      count++;
      console.log(`Consecutive count increased to: ${count}`);
    } else {
      count = 1;
      console.log(`New character, reset count to: ${count}`);
    }

    if (count < 3) {
      result.push(s[i]);
      console.log(`Added character: ${s[i]}`);
    } else {
      console.log(`Skipped character (count = ${count})`);
    }

    console.log(`Current result: "${result.join("")}"`);
  }

  console.log("\n" + "─".repeat(50));
  console.log(`Final result: "${result.join("")}"`);
  return result.join("");
}

// Test cases
console.log("\nTest Case 1:");
explainMakeFancyString("leeetcode"); // "leetcode"

console.log("\nTest Case 2:");
explainMakeFancyString("aaabaaaa"); // "aabaa"

console.log("\nTest Case 3:");
explainMakeFancyString("aab"); // "aab"

function makeFancyStringString(s) {
  let result = s[0];
  let count = 1;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      count = 1;
    }

    if (count < 3) {
      result += s[i];
    }
  }

  return result;
}

// Additional test cases
console.log(makeFancyString("")); // ""
console.log(makeFancyString("a")); // "a"
console.log(makeFancyString("aa")); // "aa"
console.log(makeFancyString("aaa")); // "aa"
console.log(makeFancyString("aaaa")); // "aa"
console.log(makeFancyString("aabbcc")); // "aabbcc"
console.log(makeFancyString("aaabbbccc")); // "aabbcc"
