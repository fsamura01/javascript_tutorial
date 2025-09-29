/**
 * 1652. Defuse the Bomb
 * @param {number[]} code
 * @param {number} k
 * @return {number[]}
 */
function decrypt(code, k) {
  const n = code.length;

  // Case 1: k === 0, replace all numbers with 0
  if (k === 0) {
    return new Array(n).fill(0);
  }

  const result = new Array(n).fill(0);

  // Case 2: k > 0, sum of next k numbers
  if (k > 0) {
    for (let i = 0; i < n; i++) {
      let sum = 0;
      // Sum next k numbers with wraparound
      for (let j = 1; j <= k; j++) {
        const nextIndex = (i + j) % n;
        sum += code[nextIndex];
      }
      result[i] = sum;
    }
  }
  // Case 3: k < 0, sum of previous k numbers
  else {
    for (let i = 0; i < n; i++) {
      let sum = 0;
      // Sum previous |k| numbers with wraparound
      for (let j = 1; j <= Math.abs(k); j++) {
        // Add n to handle negative indices before modulo
        const prevIndex = (i - j + n) % n;
        sum += code[prevIndex];
      }
      result[i] = sum;
    }
  }

  return result;
}

/**
 * Alternative implementation using array doubling
 * This approach can be more efficient for larger k values
 */
function decryptOptimized(code, k) {
  const n = code.length;

  if (k === 0) {
    return new Array(n).fill(0);
  }

  // Create a doubled array to handle wraparound more easily
  const doubled = [...code, ...code];
  const result = new Array(n).fill(0);

  // Determine starting position based on k
  const start = k > 0 ? 0 : n;

  // Calculate running sum for first window
  let windowSum = 0;
  const absK = Math.abs(k);
  for (let i = 0; i < absK; i++) {
    windowSum += doubled[start + i + (k < 0 ? -absK + 1 : 1)];
  }

  // Use sliding window to calculate sums
  for (let i = 0; i < n; i++) {
    result[i] = windowSum;

    // Update window: remove leftmost element, add new rightmost element
    if (k > 0) {
      windowSum -= doubled[i + 1];
      windowSum += doubled[i + k + 1];
    } else {
      windowSum -= doubled[start + i - absK];
      windowSum += doubled[start + i];
    }
  }

  return result;
}

// Test cases
const testCases = [
  { code: [5, 7, 1, 4], k: 3 },
  { code: [1, 2, 3, 4], k: 0 },
  { code: [2, 4, 9, 3], k: -2 },
  { code: [1], k: 0 },
  { code: [1, 2], k: 1 },
];

// Test function
function runTests() {
  testCases.forEach((test, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log(`Input: code = [${test.code}], k = ${test.k}`);
    console.log(`Output (Basic): [${decrypt(test.code, test.k)}]`);
    console.log(
      `Output (Optimized): [${decryptOptimized(test.code, test.k)}]\n`
    );
  });
}

// Run tests
runTests();

function decrypt(code, k) {
  const n = code.length;
  const result = new Array(n).fill(0);

  if (k === 0) {
    // Case when k is 0, replace all elements with 0
    return result;
  }

  for (let i = 0; i < n; i++) {
    let sum = 0;
    if (k > 0) {
      // Sum of the next k elements
      for (let j = 1; j <= k; j++) {
        sum += code[(i + j) % n];
      }
    } else if (k < 0) {
      // Sum of the previous |k| elements
      for (let j = 1; j <= Math.abs(k); j++) {
        sum += code[(i - j + n) % n];
      }
    }
    result[i] = sum;
  }

  return result;
}
