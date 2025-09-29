class MyCircularQueue {
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  }
  // operation to get the first element in in the queue;
  Front() {
    if (this.isEmpty()) return -1;
    return this.queue[this.front];
  }

  //  Operation to get the last element in the queue
  Rear() {
    if (this.isEmpty()) return -1;
    return this.queue[this.rear];
  }

  enQueue(value) {
    if (this.isFull()) return false;

    this.rear = (this.rear + 1) % this.capacity;
    this.queue[this.rear] = value;
    this.size++;
    return true;
  }

  deQueue() {
    if (this.isEmpty()) return false;
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return true;
  }

  isFull() {
    return this.size === this.capacity;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const circularQueue = new MyCircularQueue(3);

console.log("🚀 ~ circularQueue.enQueue(1):", circularQueue.enQueue(1)); // Output: true
console.log("🚀 ~ circularQueue.enQueue(2):", circularQueue.enQueue(2)); // Output: true
console.log("🚀 ~ circularQueue.enQueue(3):", circularQueue.enQueue(3)); // Output: true
console.log("🚀 ~ circularQueue:", circularQueue);
console.log("🚀 ~ circularQueue.enQueue(4):", circularQueue.enQueue(4)); // Output: false (queue is full)
console.log("🚀 ~ circularQueue.Rear():", circularQueue.Rear()); // Output: 3
console.log("🚀 ~ circularQueue.isFull():", circularQueue.isFull()); // Output: true
console.log("🚀 ~ circularQueue.deQueue():", circularQueue.deQueue()); // Output: true
console.log("🚀 ~ After dequeue", circularQueue);
console.log("🚀 ~ circularQueue.enQueue(4):", circularQueue.enQueue(4)); // Output: true
console.log("🚀 ~ After enqueue", circularQueue);
console.log("🚀 ~ circularQueue.Rear():", circularQueue.Rear()); // Output: 4
