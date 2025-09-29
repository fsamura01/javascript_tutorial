function sortArray(nums) {
  // Helper function to heapify a subtree rooted with node i
  function maxHeapify(arr, heapSize, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < heapSize && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < heapSize && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      let temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;
      maxHeapify(arr, heapSize, largest);
    }
  }

  // Build a max heap
  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    maxHeapify(nums, nums.length, i);
  }

  // Extract elements from the heap
  for (let i = nums.length - 1; i > 0; i--) {
    let temp = nums[0];
    nums[0] = nums[i];
    nums[i] = temp;
    maxHeapify(nums, i, 0);
  }

  return nums;
}

// Example usage:
let nums1 = [5, 2, 3, 1];
console.log(sortArray(nums1)); // Output: [1, 2, 3, 5]

let nums2 = [5, 1, 1, 2, 0, 0];
console.log(sortArray(nums2)); // Output: [0, 0, 1, 1, 2, 5]

/*
function mergeSort(arr) {
  // Base case: Array with 1 element is already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Divide the array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Recursively sort left and right halves
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  // Compare elements from left and right arrays and add the smaller one to the result
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add remaining elements from either left or right array
  result.push(...left.slice(i));
  result.push(...right.slice(j));

  return result;
}

*/
