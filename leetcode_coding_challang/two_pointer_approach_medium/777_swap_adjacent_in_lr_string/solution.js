/**
 * @param {string} start
 * @param {string} result
 * @return {boolean}
 */
var canTransform = function (start, result) {
  const n = start.length;

  // Two pointers: i for start, j for result
  let i = 0,
    j = 0;

  while (i < n || j < n) {
    // Skip all 'X' in start string
    while (i < n && start[i] === "X") {
      i++;
    }

    // Skip all 'X' in result string
    while (j < n && result[j] === "X") {
      j++;
    }

    // If both pointers reached the end, transformation is valid
    if (i === n && j === n) {
      return true;
    }

    // If only one pointer reached the end, invalid
    if (i === n || j === n) {
      return false;
    }

    // Characters at current positions must match
    if (start[i] !== result[j]) {
      return false;
    }

    // Check movement constraints:
    // 'L' can only move left (result position <= start position)
    if (start[i] === "L" && i < j) {
      return false;
    }

    // 'R' can only move right (result position >= start position)
    if (start[i] === "R" && i > j) {
      return false;
    }

    // Move both pointers forward
    i++;
    j++;
  }

  return true;
};

// Test cases
console.log(canTransform("RXXLRXRXL", "XRLXXRRLX")); // true
console.log(canTransform("X", "L")); // false
console.log(canTransform("XXXXXLXXXX", "LXXXXXXXXX")); // true
