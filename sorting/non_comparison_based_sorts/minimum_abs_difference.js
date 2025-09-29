function minimumAbsDifference(arr) {
  // Step 1: Sort the array
  arr.sort((a, b) => a - b);

  // Step 2: Find the minimum absolute difference
  let minDiff = Infinity;
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];
    if (diff < minDiff) {
      minDiff = diff;
    }
  }

  // Step 3: Collect pairs with the minimum absolute difference
  const result = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];
    if (diff === minDiff) {
      result.push([arr[i], arr[i + 1]]);
    }
  }

  // Step 4: Return the result
  return result;
}

// Example usage:
console.log(minimumAbsDifference([4, 2, 1, 3])); // Output: [[1, 2], [2, 3], [3, 4]]
console.log(minimumAbsDifference([1, 3, 6, 10, 15])); // Output: [[1, 3]]
console.log(minimumAbsDifference([3, 8, -10, 23, 19, -4, -14, 27])); // Output: [[-14, -10], [19, 23], [23, 27]]
