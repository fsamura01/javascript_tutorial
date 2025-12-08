function longestMountain(arr) {
  const n = arr.length;
  let maxLength = 0;

  // Iterate through potential peaks (indices 1 to n-2)
  for (let i = 1; i < n - 1; i++) {
    // Check if i is a peak: strictly greater than both neighbors
    if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
      let left = i - 1;
      let right = i + 1;

      // Expand left while strictly increasing (going backward)
      while (left > 0 && arr[left] > arr[left - 1]) {
        left--;
      }

      // Expand right while strictly decreasing
      while (right < n - 1 && arr[right] > arr[right + 1]) {
        right++;
      }

      // Calculate mountain length and update max
      const currentLength = right - left + 1;
      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}

longestMountain([2, 1, 4, 7, 3, 2, 5]);
longestMountain([2, 2, 2]);
