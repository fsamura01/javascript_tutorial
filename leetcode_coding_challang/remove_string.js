/**
 * @param {string} s
 * @return {string}
 */
function removeStars(s) {
  // Use stack to keep track of characters
  const stack = [];

  // Iterate through each character
  for (let char of s) {
    if (char === "*") {
      // If star found, remove last non-star character
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      // Add non-star character to stack
      stack.push(char);
    }
  }

  // Join remaining characters
  return stack.join("");
}

function explainRemoveStars(s) {
  const stack = [];
  let step = 1;

  console.log(`\nProcessing string: "${s}"`);
  console.log("─".repeat(50));

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    console.log(`\nStep ${step}:`);
    console.log(`Current character: ${char}`);

    if (char === "*") {
      if (stack.length > 0) {
        const removed = stack.pop();
        console.log(`Star found - removing previous character: ${removed}`);
      } else {
        console.log("Star found but no characters to remove");
      }
    } else {
      stack.push(char);
      console.log(`Adding character: ${char}`);
    }

    console.log(`Current stack: ${JSON.stringify(stack)}`);
    console.log(`Current string: "${stack.join("")}"`);
    step++;
  }

  console.log("\n" + "─".repeat(50));
  console.log(`Final result: "${stack.join("")}"`);
  return stack.join("");
}

// Test cases
console.log("\nTest Case 1:");
explainRemoveStars("leet**cod*e"); // "lecoe"

console.log("\nTest Case 2:");
explainRemoveStars("erase*****"); // ""

// Alternative Solution using Two Arrays:
function removeStarsWithArrays(s) {
  const result = [];
  let starCount = 0;

  // First pass: count stars and store non-star characters
  for (let char of s) {
    if (char === "*") {
      starCount++;
    } else {
      result.push(char);
    }
  }

  // Second pass: remove last starCount characters
  return result.slice(0, result.length - starCount).join("");
}

//Optimized Solution using String Building:
function removeStarsOptimized(s) {
  let result = "";
  let skipCount = 0;

  // Iterate from right to left
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "*") {
      skipCount++;
    } else if (skipCount > 0) {
      skipCount--;
    } else {
      result = s[i] + result;
    }
  }

  return result;
}

function runTests() {
  const testCases = [
    "leet**cod*e", // "lecoe"
    "erase*****", // ""
    "a*", // ""
    "a*b*c*", // ""
    "abc", // "abc"
    "***", // ""
    "a*b*c", // "c"
    "****", // ""
    "a*b*c*d*e*", // ""
  ];

  console.log("\nRunning test cases:");
  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}:`);
    console.log(`Input: "${test}"`);
    console.log(`Output: "${removeStars(test)}"`);
  });
}

runTests();

function removeStarsWithValidation(s) {
  // Input validation
  if (!s || s.length === 0) return "";
  if (!s.includes("*")) return s;

  const stack = [];

  for (let char of s) {
    if (char === "*") {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(char);
    }
  }

  return stack.join("");
}
