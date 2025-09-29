function heapSort(arr) {
  // Build max heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    maxHeapify(arr, arr.length, i);
  }

  // Extract elements from heap one by one
  for (let i = arr.length - 1; i > 0; i--) {
    // Move current root to end
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    // Call maxHeapify on the reduced heap
    maxHeapify(arr, i, 0);
  }
}

function maxHeapify(arr, heapSize, index) {
  let largest = index;
  let left = 2 * index + 1;
  let right = 2 * index + 2;

  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== index) {
    // Swap
    let temp = arr[index];
    arr[index] = arr[largest];
    arr[largest] = temp;
    // Recursively heapify the affected sub-tree
    maxHeapify(arr, heapSize, largest);
  }
}

// Example usage:
let arr = [12, 11, 13, 5, 6, 7];
heapSort(arr);
console.log(arr); // Output: [5, 6, 7, 11, 12, 13]
