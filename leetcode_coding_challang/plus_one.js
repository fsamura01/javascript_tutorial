/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  // Start from the rightmost digit
  for (let i = digits.length - 1; i >= 0; i--) {
    // If the current digit is less than 9, we can simply increment it and return
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    // If the current digit is 9, set it to 0 and continue to the next digit
    digits[i] = 0;
  }

  // If we get here, it means all digits were 9
  // We need to add a new digit 1 at the beginning
  return [1, ...digits];
};

// Test cases
console.log(plusOne([1, 2, 3])); // [1,2,4]
console.log(plusOne([4, 3, 2, 1])); // [4,3,2,2]
console.log(plusOne([9])); // [1,0]
console.log(plusOne([9, 9, 9])); // [1,0,0,0]

function plusOne(digits) {
  // Start from the last digit and move towards the first digit
  for (let i = digits.length - 1; i >= 0; i--) {
    // Increment the current digit by 1
    digits[i]++;

    // If the current digit is less than 10, no carry is required
    if (digits[i] < 10) {
      return digits; // Return immediately since no more carry is needed
    }

    // If we reach here, it means digits[i] == 10, so we set it to 0 and continue
    digits[i] = 0;
  }

  // If all digits were 9, we will have all zeros in the array after the loop
  // Add 1 at the beginning of the array to account for the overflow
  digits.unshift(1);

  return digits;
}

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let carry = 1; // Initial carry-over for incrementing by 1

  for (let i = digits.length - 1; i >= 0; i--) {
    const sum = digits[i] + carry;
    digits[i] = sum % 10; // Update the digit at the current position
    carry = Math.floor(sum / 10); // Calculate the carry-over for the next digit

    if (carry === 0) {
      // No more carry-over, we can break the loop
      break;
    }
  }

  // If there's still a carry-over after processing all digits, it means we need to prepend a 1
  if (carry > 0) {
    digits.unshift(carry);
  }

  return digits;
};
