/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Step 1: Create a stack to keep track of opening brackets
  const stack = [];

  // Step 2: Iterate through the input string
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // Step 3: If the current character is an opening bracket, push it onto the stack
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    }
    // Step 4: If the current character is a closing bracket, check if it matches the last opening bracket on the stack
    else {
      // If the stack is empty, it means there's no corresponding opening bracket, so the input is invalid
      if (stack.length === 0) {
        return false;
      }

      const lastOpeningBracket = stack.pop();
      if (
        (char === ")" && lastOpeningBracket !== "(") ||
        (char === "]" && lastOpeningBracket !== "[") ||
        (char === "}" && lastOpeningBracket !== "{")
      ) {
        return false;
      }
    }
  }

  // Step 5: If the stack is empty, it means all opening brackets have been matched with their corresponding closing brackets, so the input is valid
  return stack.length === 0;
}

isValid("()");
isValid("()[]{}");
isValid("(]");
isValid("([])");

function isValid(s) {
  const stack = [];
  const pairs = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    if (char in pairs) {
      // If it's an opening bracket, push it onto the stack
      stack.push(char);
    } else {
      // If it's a closing bracket
      if (stack.length === 0) return false; // No corresponding opening bracket
      const top = stack.pop(); // Pop the top element from the stack
      if (pairs[top] !== char) return false; // Mismatched brackets
    }
  }

  // If the stack is empty, all brackets matched
  return stack.length === 0;
}

// Example usage:
console.log(isValid("()")); // Output: true
console.log(isValid("()[]{}")); // Output: true
console.log(isValid("(]")); // Output: false
