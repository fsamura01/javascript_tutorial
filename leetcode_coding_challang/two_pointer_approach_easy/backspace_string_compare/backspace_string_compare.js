/* Approach 1: Stack-Based Simulation */
function processString(s) {
  let stack = [];
  for (let char of s) {
    if (char === "#") {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(char);
    }
  }
  return stack.join("");
}

function backspaceCompare(s, t) {
  return processString(s) === processString(t);
}

// Example Test Cases
console.log(backspaceCompare("ab#c", "ad#c")); // true
console.log(backspaceCompare("ab##", "c#d#")); // true
console.log(backspaceCompare("a#c", "b")); // false

/*Approach 2: Two-Pointer Optimization*/
function backspaceCompare(s, t) {
  function getNextValidIndex(str, index) {
    let backspaceCount = 0;
    while (index >= 0) {
      if (str[index] === "#") {
        backspaceCount++;
      } else if (backspaceCount > 0) {
        backspaceCount--;
      } else {
        return index;
      }
      index--;
    }
    return index; // -1 means no valid characters left
  }

  let i = s.length - 1,
    j = t.length - 1;

  while (i >= 0 || j >= 0) {
    i = getNextValidIndex(s, i);
    j = getNextValidIndex(t, j);

    if (i >= 0 && j >= 0 && s[i] !== t[j]) {
      return false;
    }

    if (i >= 0 !== j >= 0) {
      // If one string is exhausted before the other
      return false;
    }

    i--;
    j--;
  }

  return true;
}

// Example Test Cases
console.log(backspaceCompare("ab#c", "ad#c")); // true
console.log(backspaceCompare("ab##", "c#d#")); // true
console.log(backspaceCompare("a#c", "b")); // false
