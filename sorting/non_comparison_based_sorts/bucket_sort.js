function bucketSort(arr, K) {
  // Step 1: Initialize buckets
  const buckets = Array.from({ length: K }, () => []);

  // Step 2: Calculate the shift and maxValue
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  // Step 3: Determine the bucket size
  const bucketSize = Math.floor((max - min) / K);
  if (bucketSize < 1) {
    bucketSize = 1;
  }

  // Step 4: Distribute elements into buckets
  for (let i = 0; i < arr.length; i++) {
    // Determine the bucket index where to place the current element
    let index = Math.floor((arr[i] - min) / bucketSize);
    if (index === K) {
      // Handle case where the element is exactly the maximum value
      buckets[K - 1].push(arr[i]);
    } else {
      buckets[index].push(arr[i]);
    }
  }

  // Step 5: Sort individual buckets
  for (let i = 0; i < buckets.length; i++) {
    buckets[i].sort((a, b) => a - b);
  }

  // Step 6: Concatenate sorted buckets into the original array
  let sortedIndex = 0;
  for (let i = 0; i < buckets.length; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      arr[sortedIndex++] = buckets[i][j];
    }
  }
  /*
  let idx = 0 
  for(let bucket of buckets) {
   for(let elem of bucket) {
    arr[idx++] = elem;
   }
    }
  */

  // let sortedArray = [];
  // let index = 0;
  // for (let i = 0; i < buckets.length; i++) {
  //   for (let j = 0; j < buckets[i].length; j++) {
  //     sortedArray[index++] = buckets[i][j];
  //   }
  // }
}

// Example usage:
const arr = [29, 25, 3, 49, 9, 37, 21, 43];
const K = 5; // Number of buckets
bucketSort(arr, K);
console.log(arr); // Output: [3, 9, 21, 25, 29, 37, 43, 49]

const flatten = (arrayOfArrays) => {
  //let flattenedArray = arrayOfArrays.reduce((acc, val) => acc.concat(val), []);
  let flattenedArray = arrayOfArrays.flat();
  return flattenedArray;
};
let arrayOfArrays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

flatten(arrayOfArrays);
console.log("🚀 ~ flatten(arrayOfArrays):", flatten(arrayOfArrays));
