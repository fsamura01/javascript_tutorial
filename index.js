const subarrayset = (arr) => {
  const subarrays = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j <= arr.length; j++) {
      // slice(start, end) takes elements from index i to j-1
      subarrays.push(arr.slice(i, j));
    }
  }
};

subarrayset([1, 2, 3, 4]);
