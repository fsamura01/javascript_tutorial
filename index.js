var findLengthOfShortestSubarray_BruteForce = function (arr) {
  /*   const n = arr.length;

  const isSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  // Try removing subarray of length 0, 1, 2, ... n-1
  for (let len = 0; len < n; len++) {
    for (let i = 0; i <= n - len; i++) {
      // Remove arr[i...i+len-1]
      let remaining = arr.slice(0, i).concat(arr.slice(i + len));
      if (isSorted(remaining)) {
        return len;
      }
    }
  }

  return n - 1; */
  for (let i = 0; i < arr.length; i++) {
    let predessor = arr.slice(0, i) + arr.slice(i + 1);
    console.log(predessor);
  }
};

findLengthOfShortestSubarray_BruteForce([1, 2, 3, 10, 4, 2, 3, 5]);
