function addBinary(a, b) {
  let i = a.length - 1,
    j = b.length - 1,
    carry = 0,
    result = "";

  while (i >= 0 || j >= 0 || carry > 0) {
    const digitA = i >= 0 ? parseInt(a[i]) : 0;
    const digitB = j >= 0 ? parseInt(b[j]) : 0;
    const sum = digitA + digitB + carry;
    carry = Math.floor(sum / 2);
    result = (sum % 2) + result;
    i--;
    j--;
  }

  return result;
}

function addBinary(a, b) {
  let i = a.length - 1; // Pointer for string a
  let j = b.length - 1; // Pointer for string b
  let carry = 0; // Initialize carry to 0
  let result = []; // Array to store the result bits

  // Loop through both strings from the end to the beginning
  while (i >= 0 || j >= 0 || carry > 0) {
    let sum = carry; // Start with the carry

    // Add the bit from a if within bounds
    if (i >= 0) {
      sum += parseInt(a[i]);
      i--; // Move the pointer left in a
    }

    // Add the bit from b if within bounds
    if (j >= 0) {
      sum += parseInt(b[j]);
      j--; // Move the pointer left in b
    }

    // Compute the new carry and the current bit to add to the result
    carry = Math.floor(sum / 2);
    result.push(sum % 2); // Append the remainder to result
  }

  // Reverse and join the array to form the binary string
  return result.reverse().join("");
}

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  // Convert the binary strings to arrays of digits
  const digitA = a.split("").map(Number);
  const digitB = b.split("").map(Number);

  // Initialize variables
  let carry = 0;
  let result = [];

  // Iterate through the digits, starting from the least significant
  let i = digitA.length - 1;
  let j = digitB.length - 1;

  while (i >= 0 || j >= 0 || carry > 0) {
    // Get the current digits from the two numbers
    const currentA = digitA[i] || 0;
    const currentB = digitB[j] || 0;

    // Calculate the sum and carry
    const sum = currentA + currentB + carry;
    carry = Math.floor(sum / 2);
    result.unshift(sum % 2);

    // Move to the next digits
    i--;
    j--;
  }

  return result.join("");
};

// Test cases
console.log(addBinary("11", "1")); // '100'
console.log(addBinary("1010", "1011")); // '10101'
console.log(addBinary("1", "111")); // '1000'
console.log(addBinary("1111", "1111")); // '11110'
