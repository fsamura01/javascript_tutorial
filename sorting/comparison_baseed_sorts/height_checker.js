function heightChecker(heights) {
  // Create a sorted copy of heights to get the expected order
  const expected = [...heights].sort((a, b) => a - b);

  // Initialize the count of mismatches
  let mismatchCount = 0;

  // Iterate through the arrays and count mismatches
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== expected[i]) {
      mismatchCount++;
    }
  }

  return mismatchCount;
}

// Example usage:
const heights1 = [1, 1, 4, 2, 1, 3];
console.log(heightChecker(heights1)); // Output: 3

const heights2 = [5, 1, 2, 3, 4];
console.log(heightChecker(heights2)); // Output: 5

const heights3 = [1, 2, 3, 4, 5];
console.log(heightChecker(heights3)); // Output: 0

/*
function bubbleSort(arr) {
    let hasSwapped = true;
    while (hasSwapped) {
        hasSwapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap adjacent elements
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                hasSwapped = true;
            }
        }
    }
}

// Example usage:
let arr = [64, 34, 25, 12, 22, 11, 90];
bubbleSort(arr);
console.log(arr);  // Output: [11, 12, 22, 25, 34, 64, 90]
*/
