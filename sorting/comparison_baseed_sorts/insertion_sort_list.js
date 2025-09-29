function insertionSort(arr) {
  // Iterate through each element in the array starting from the second element
  for (let i = 1; i < arr.length; i++) {
    let currentIndex = i;
    // Continue swapping the current element with the previous element
    // if it is out of order
    while (currentIndex > 0 && arr[currentIndex - 1] > arr[currentIndex]) {
      // Swap elements that are out of order
      let temp = arr[currentIndex];
      arr[currentIndex] = arr[currentIndex - 1];
      arr[currentIndex - 1] = temp;
      currentIndex -= 1;
    }
  }
}

// Example usage:
let arr = [12, 11, 13, 5, 6];
insertionSort(arr);
console.log(arr); // Output: [5, 6, 11, 12, 13]
