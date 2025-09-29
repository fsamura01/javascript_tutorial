const countingSort = (arr) => {
  // Get the largest element from the input array
  const K = Math.max(...arr);

  // Create an array based on the largest element in the array
  const counts = new Array(K + 1).fill(0);

  // Count the frequency of each element in the input array
  for (let i = 0; i < arr.length; i++) {
    counts[arr[i]] += 1;
  }

  let startingIndex = 0;
  for (let i = 0; i < K + 1; i++) {
    let count = counts[i];
    counts[i] = startingIndex;
    startingIndex += count;
  }

  const sortedArray = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    sortedArray[counts[arr[i]]] = arr[i];
    counts[arr[i]] += 1;
  }

  // Copy the sorted array into the original array
  for (let i = 0; i < sortedArray.length; i++) {
    arr[i] = sortedArray[i];
  }
};

const binarySearch = (arr, target) => {
  countingSort(arr);

  if (arr === null || arr.length === 0) return -1;

  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return arr[mid];
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};

const arr = [1, 3, 2, 4, 8, 7, 5, 6];
const target = 8;
binarySearch(arr, target);
