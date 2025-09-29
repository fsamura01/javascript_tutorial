function sortArray(nums) {
  const mergeSort = (arr) => {
    // base case check if the length of the array is 0 or 1 no sort is needed
    if (arr.length <= 1) return arr;

    // Divide the array into two halves
    const middle = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle));

    return merge(left, right);
  };

  // Compare the two arrays and meerge them
  const merge = (left, right) => {
    const merged = [];
    let leftArrayIndex = 0;
    let rightArrayIndex = 0;

    while (leftArrayIndex < left.length && rightArrayIndex < right.length) {
      if (left[leftArrayIndex] < right[rightArrayIndex]) {
        merged.push(left[leftArrayIndex]);
        leftArrayIndex++;
      } else {
        merged.push(right[rightArrayIndex]);
        rightArrayIndex++;
      }
    }

    // Append the remaining elements
    while (leftArrayIndex < left.length) {
      merged.push(left[leftArrayIndex]);
      leftArrayIndex++;
    }
    while (rightArrayIndex < right.length) {
      merged.push(right[rightArrayIndex]);
      rightArrayIndex++;
    }

    return merged;
  };
  return mergeSort(nums);
}
// Example usage:
const nums1 = [5, 2, 6, 3, 1];
sortArray(nums1); // Output: [1, 2, 3, 5]

const nums2 = [5, 1, 1, 2, 0, 0];
sortArray(nums2); // Output: [0, 0, 1, 1, 2, 5]
