class MaxHeap {
  constructor(heapSize) {
    this.heapSize = heapSize;
    this.maxHeap = new Array(heapSize + 1).fill(0);
    this.realSize = 0;
  }

  add(element) {
    this.realSize++;
    if (this.realSize > this.heapSize) {
      console.log("Added too many elements!");
      this.realSize--;
      return;
    }
    this.maxHeap[this.realSize] = element;
    let index = this.realSize;
    let parent = Math.floor(index / 2);
    while (this.maxHeap[index] > this.maxHeap[parent] && index > 1) {
      [this.maxHeap[index], this.maxHeap[parent]] = [
        this.maxHeap[parent],
        this.maxHeap[index],
      ];
      index = parent;
      parent = Math.floor(index / 2);
    }
  }

  peek() {
    return this.maxHeap[1];
  }

  pop() {
    if (this.realSize < 1) {
      console.log("Don't have any element!");
      return Number.MIN_SAFE_INTEGER;
    } else {
      const removeElement = this.maxHeap[1];
      this.maxHeap[1] = this.maxHeap[this.realSize];
      this.realSize--;
      let index = 1;
      while (index <= Math.floor(this.realSize / 2)) {
        let left = index * 2;
        let right = index * 2 + 1;
        if (
          this.maxHeap[index] < this.maxHeap[left] ||
          this.maxHeap[index] < this.maxHeap[right]
        ) {
          if (this.maxHeap[left] > this.maxHeap[right]) {
            [this.maxHeap[left], this.maxHeap[index]] = [
              this.maxHeap[index],
              this.maxHeap[left],
            ];
            index = left;
          } else {
            [this.maxHeap[right], this.maxHeap[index]] = [
              this.maxHeap[index],
              this.maxHeap[right],
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
      return "[" + this.maxHeap.slice(1, this.realSize + 1).join(",") + "]";
    }
  }
}

// Test case
const maxheap = new MaxHeap(5);
maxheap.add(1);
maxheap.add(2);
maxheap.add(3);
// [3,1,2]
console.log(maxheap.toString());
// 3
console.log(maxheap.peek());
// 3
console.log(maxheap.pop());
console.log(maxheap.pop());
console.log(maxheap.pop());
// No element
console.log(maxheap.toString());
maxheap.add(4);
// Add too many elements
maxheap.add(5);
// [4,1,2]
console.log(maxheap.toString());
