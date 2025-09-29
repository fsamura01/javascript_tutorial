class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class MyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  addAtHead(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return this.head;
  }

  addAtTail(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = newNode;
      this.size++;
    }
  }

  get(index) {
    if (index < 0 || index > this.head) return -1;
    let curr = this.head;
    for (let i = 0; i < index; i++) {
      curr = curr.next;
    }
    return curr.val;
  }

  addAtIndent(index, val) {
    const newNode = new Node(val);
    if (index > this.size) return;
    if (index <= 0) {
      this.addAtHead(val);
      return;
    }
    if (index === this.size) {
      this.addAtTail(val);
      return;
    }
    let curr = this.head;
    for (let i = 0; i < index - 1; i++) {
      curr = curr.next;
    }
    newNode.next = curr.next;
    curr.next = newNode;
    this.size++;
  }

  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) return;
    if (index === 0) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    let curr = this.head;
    for (let i = 0; i < index - 1; i++) {
      curr = curr.next;
    }
    curr.next = curr.next.next.next;
    this.size--;
    return;
  }
}

const myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
myLinkedList.addAtTail(2);
myLinkedList.get(0);
console.log("🚀 ~ myLinkedList.get(0);:", myLinkedList.get(0));
myLinkedList.addAtIndent(0, 5);
myLinkedList.deleteAtIndex(0);
console.log("🚀 ~ myLinkedList.get(0):", myLinkedList.get(0));
console.log("🚀 ~ myLinkedList:", myLinkedList);
