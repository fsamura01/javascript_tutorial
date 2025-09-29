/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function (arr) {
  const n = arr.length;

  // Iterate through the array from right to left
  for (let i = n - 1; i >= 0; i--) {
    // If the current element is zero, duplicate it and shift the remaining elements to the right
    if (arr[i] === 0) {
      for (let j = n - 1; j > i; j--) {
        arr[j] = arr[j - 1];
      }

      // Increment the index to skip the duplicated zero
      i++;
    }
  }
};

// Example usage:
const arr1 = [1, 0, 2, 3, 0, 4, 5, 0];
duplicateZeros(arr1);
console.log(arr1); // Output: [1, 0, 0, 2, 3, 0, 0, 4]

const arr2 = [1, 2, 3];
duplicateZeros(arr2);
console.log(arr2); // Output: [1, 2, 3]
