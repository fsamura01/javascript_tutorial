// JavaScript Solution
function nextGreaterElement(n) {
  // Convert to digit array
  const digits = n.toString().split("").map(Number);
  const len = digits.length;

  // Step 1: Find rightmost digit that is smaller than its next digit (pivot)
  let pivot = -1;
  for (let i = len - 2; i >= 0; i--) {
    if (digits[i] < digits[i + 1]) {
      pivot = i;
      break;
    }
  }

  // If no pivot found, no greater permutation exists
  if (pivot === -1) return -1;

  // Step 2: Find smallest digit to right of pivot that's greater than pivot
  let successor = -1;
  for (let i = len - 1; i > pivot; i--) {
    if (digits[i] > digits[pivot]) {
      successor = i;
      break;
    }
  }

  // Step 3: Swap pivot and successor
  [digits[pivot], digits[successor]] = [digits[successor], digits[pivot]];

  // Step 4: Reverse everything after pivot to get smallest arrangement
  reverse(digits, pivot + 1);

  // Step 5: Check 32-bit constraint
  const result = parseInt(digits.join(""));
  return result > 2147483647 ? -1 : result;
}

function reverse(arr, start) {
  let end = arr.length - 1;
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

// Example walkthrough: n = 1243
// digits = [1, 2, 4, 3]
// pivot = 2 (digit 4 at index 2, since 4 > 3 but 2 < 4)
// successor = 3 (digit 3 at index 3, smallest digit > 2 to the right)
// After swap: [1, 3, 4, 2]
// After reverse from index 3: [1, 3, 2, 4]
// Result: 1324
