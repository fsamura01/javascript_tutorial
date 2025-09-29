const NUM_DIGITS = 10;

function countingSort(arr, placeVal) {
  let counts = new Array(NUM_DIGITS).fill(0);

  for (let elem of arr) {
    let current = Math.floor(elem / placeVal);
    counts[current % NUM_DIGITS] += 1;
  }

  let startingIndex = 0;
  for (let i = 0; i < counts.length; i++) {
    let count = counts[i];
    counts[i] = startingIndex;
    startingIndex += count;
  }

  let sortedArray = new Array(arr.length);
  for (let elem of arr) {
    let current = Math.floor(elem / placeVal);
    sortedArray[counts[current % NUM_DIGITS]] = elem;
    counts[current % NUM_DIGITS] += 1;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = sortedArray[i];
  }
}

function radixSort(arr) {
  let maxElem = Math.max(...arr);

  let placeVal = 1;
  while (Math.floor(maxElem / placeVal) > 0) {
    countingSort(arr, placeVal);
    placeVal *= 10;
  }
}

// Example usage:
const arr = [170, 45, 75, 90, 802, 24, 2, 66];
radixSort(arr);
console.log(arr);
