/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
function duplicateZeros(arr) {
  // Step 1: Count zeros to understand how many elements will be shifted
  let possibleDups = 0;
  let length = arr.length - 1;

  // First pass: Count all zeros except the last possible zero
  for (let left = 0; left <= length - possibleDups; left++) {
    if (arr[left] === 0) {
      // Edge case: Don't count the last zero if it can't be duplicated
      if (left === length - possibleDups) {
        arr[length] = 0;
        length -= 1;
        break;
      }
      possibleDups++;
    }
  }

  // Step 2: Start from the last element and shift elements to the right
  let last = length - possibleDups;

  // Second pass: Copy elements from right to left
  for (let i = last; i >= 0; i--) {
    if (arr[i] === 0) {
      // Duplicate zero
      arr[i + possibleDups] = 0;
      possibleDups--;
      arr[i + possibleDups] = 0;
    } else {
      // Copy non-zero element
      arr[i + possibleDups] = arr[i];
    }
  }
}

var duplicateZeros = function (arr) {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    // If the current element is zero, duplicate it
    if (arr[i] === 0) {
      // Use splice to insert a zero at the current position
      arr.splice(i, 0, 0);

      // Remove the last element to maintain the original length
      arr.pop();

      // Skip the next position as it is already processed
      i++;
    }
  }
};

// Example usage and test cases
let arr1 = [1, 0, 2, 3, 0, 4, 5, 0];
console.log("Before:", arr1);
duplicateZeros(arr1);
console.log("After:", arr1);

let arr2 = [1, 2, 3];
console.log("\nBefore:", arr2);
duplicateZeros(arr2);
console.log("After:", arr2);

let arr3 = [0, 0, 0, 0, 0, 0, 0];
console.log("\nBefore:", arr3);
duplicateZeros(arr3);
console.log("After:", arr3);
