var topKFrequentHeap = function (nums, k) {
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Min heap implementation using array
  const heap = [];

  for (const [num, freq] of freqMap) {
    heap.push([num, freq]);
    heap.sort((a, b) => a[1] - b[1]); // Sort by frequency ascending

    // Keep only k elements
    if (heap.length > k) {
      heap.shift(); // Remove minimum
    }
  }

  return heap.map((item) => item[0]);
};
topKFrequentHeap([1, 1, 1, 2, 2, 3], 2); // [1, 2]
