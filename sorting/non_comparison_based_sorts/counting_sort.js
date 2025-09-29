function countingSort(arr) {
  // Sorts an array of integers where the minimum value is 0 and the maximum value is K
  const K = Math.max(...arr);
  const counts = new Array(K + 1).fill(0);

  // for (let elem of arr) {
  //   counts[elem] += 1;
  // }

  for (let i = 0; i < arr.length; i++) {
    counts[arr[i]] += 1;
  }

  // Overwrite our original counts with the starting index of each element in the final sorted array
  let startingIndex = 0;
  for (let i = 0; i < K + 1; i++) {
    let count = counts[i];
    counts[i] = startingIndex;
    startingIndex += count;
  }

  const sortedArray = new Array(arr.length);
  for (let elem of arr) {
    sortedArray[counts[elem]] = elem;
    // Increment counts[elem] index by 1 so the next duplicate element is placed in the appropriate index
    counts[elem] += 1;
  }

  // Copy over sorted list into original arr
  for (let i = 0; i < arr.length; i++) {
    arr[i] = sortedArray[i];
  }
}

// Example usage:
const arr = [5, 4, 5, 5, 1, 1, 3];
countingSort(arr);
console.log(arr); // Output will be the sorted array

function countingSort(arr) {
  // Step 1: Find the minimum and maximum values in the array to determine the range
  const shift = Math.min(...arr);
  const K = Math.max(...arr) - shift;

  // Step 2: Initialize the counts array
  const counts = new Array(K + 1).fill(0);

  // Step 3: Populate the counts array with the frequency of each element
  for (let elem of arr) {
    counts[elem - shift] += 1;
  }

  // Step 4: Overwrite the counts array with the starting index of each element in the final sorted array
  let startingIndex = 0;
  for (let i = 0; i < counts.length; i++) {
    let count = counts[i];
    counts[i] = startingIndex;
    startingIndex += count;
  }

  // Step 5: Create the sorted array by placing elements at their correct positions
  const sortedArray = new Array(arr.length);
  for (let elem of arr) {
    sortedArray[counts[elem - shift]] = elem;
    counts[elem - shift] += 1;
  }

  // Step 6: Copy the sorted array back to the original array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = sortedArray[i];
  }
}

// Example usage:
//let arr = [3, -2, 7, 1, -5, 3];
countingSort(arr);
console.log(arr); // Output: [-5, -2, 1, 3, 3, 7]
