class MinHeap {
  constructor(heapSize) {
    this.heapSize = heapSize;
    this.minHeap = new Array(heapSize + 1).fill(0);
    this.realSize = 0;
  }

  add(element) {
    this.realSize++;
    if (this.realSize > this.heapSize) {
      console.log("Added too many elements!");
      this.realSize--;
      return;
    }
    this.minHeap[this.realSize] = element;
    let index = this.realSize;
    let parent = Math.floor(index / 2);
    while (this.minHeap[index] < this.minHeap[parent] && index > 1) {
      [this.minHeap[index], this.minHeap[parent]] = [
        this.minHeap[parent],
        this.minHeap[index],
      ];
      index = parent;
      parent = Math.floor(index / 2);
    }
  }

  peek() {
    return this.minHeap[1];
  }

  pop() {
    if (this.realSize < 1) {
      console.log("Don't have any element!");
      return Number.MAX_SAFE_INTEGER;
    } else {
      const removeElement = this.minHeap[1];
      this.minHeap[1] = this.minHeap[this.realSize];
      this.realSize--;
      let index = 1;
      while (index <= Math.floor(this.realSize / 2)) {
        let left = index * 2;
        let right = index * 2 + 1;
        if (
          this.minHeap[index] > this.minHeap[left] ||
          this.minHeap[index] > this.minHeap[right]
        ) {
          if (this.minHeap[left] < this.minHeap[right]) {
            [this.minHeap[left], this.minHeap[index]] = [
              this.minHeap[index],
              this.minHeap[left],
            ];
            index = left;
          } else {
            [this.minHeap[right], this.minHeap[index]] = [
              this.minHeap[index],
              this.minHeap[right],
            ];
            index = right;
          }
        } else {
          break;
        }
      }
      return removeElement;
    }
  }

  size() {
    return this.realSize;
  }

  toString() {
    if (this.realSize === 0) {
      return "No element!";
    } else {
      return "[" + this.minHeap.slice(1, this.realSize + 1).join(",") + "]";
    }
  }
}

// Test case
const minHeap = new MinHeap(3);
minHeap.add(3);
minHeap.add(1);
minHeap.add(2);
// [1,3,2]
console.log(minHeap.toString());
// 1
console.log(minHeap.peek());
// 1
console.log(minHeap.pop());
// [2,3]
console.log(minHeap.toString());
minHeap.add(4);
// Add too many elements
minHeap.add(5);
// [2,3,4]
console.log(minHeap.toString());
