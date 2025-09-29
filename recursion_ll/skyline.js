class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Inserts a value into the heap
  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  // Removes a value from the heap
  remove(val) {
    const index = this.heap.indexOf(val);
    if (index === -1) return false;
    const end = this.heap.pop();
    if (index === this.heap.length) return true;
    this.heap[index] = end;
    this.bubbleDown(index);
    this.bubbleUp(index);
    return true;
  }

  // Returns the maximum value in the heap
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  bubbleUp(index = this.heap.length - 1) {
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (element <= parent) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  bubbleDown(index = 0) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild > element) swap = leftChildIndex;
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }
}

function getSkyline(buildings) {
  const events = [];
  for (const [left, right, height] of buildings) {
    events.push([left, -height]); // Building starts
    events.push([right, height]); // Building ends
  }

  // Sort events: first by x, then by height (starts before ends)
  events.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  const result = [];
  const maxHeap = new MaxHeap();
  maxHeap.push(0);
  let prevMax = 0;

  for (const [x, height] of events) {
    if (height < 0) {
      // Building starts, add its height
      maxHeap.push(-height);
    } else {
      // Building ends, remove its height
      maxHeap.remove(height);
    }

    const currentMax = maxHeap.peek();
    if (currentMax !== prevMax) {
      result.push([x, currentMax]);
      prevMax = currentMax;
    }
  }

  return result;
}

// Example usage
const buildings1 = [
  [2, 9, 10],
  [3, 7, 15],
  [5, 12, 12],
  [15, 20, 10],
  [19, 24, 8],
];
console.log(getSkyline(buildings1)); // Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]

const buildings2 = [
  [0, 2, 3],
  [2, 5, 3],
];
console.log(getSkyline(buildings2)); // Output: [[0,3],[5,0]]
