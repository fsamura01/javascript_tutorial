function findClosestElements(arr, k, x) {
  let left = 0,
    right = arr.length - k;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    // Compare the element at mid with the element at mid + k
    if (x - arr[mid] > arr[mid + k] - x) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // The window from `left` to `left + k` will be our result
  return arr.slice(left, left + k);
}

// Example usage:
console.log(findClosestElements([1, 2, 3, 4, 5], 4, 3)); // Output: [1, 2, 3, 4]
console.log(findClosestElements([1, 2, 3, 4, 5], 4, -1)); // Output: [1, 2, 3, 4]
