class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addAtTail(val) {
    const newNode = { val: val, next: null };
    if (!this.head) {
      this.head = newNode;
    }
    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
  }

  addAtHead(val) {
    const newNode = { val: val, next: this.head };
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
  }

  toArray() {
    const element = [];
    let curr = this.head;
    while (curr) {
      element.push(curr);
      curr = curr.next;
    }
    return element;
  }

  delete(val) {
    if (!this.head) {
      return;
    }

    while (this.head && this.head.val === val) {
      this.head = this.head.next;
    }

    let curr = this.head;

    while (curr.next) {
      if (curr.next.val === val) {
        curr.next = curr.next.next;
      } else {
        curr = curr.next;
      }
    }

    if (this.tail.val === val) {
      this.tail = curr;
    }
  }

  insertAfter(val, afterVal) {
    const existingNode = this.findNode(afterVal);

    if (existingNode) {
      const newNode = { val: val, next: existingNode.next };
      existingNode.next = newNode;
    }
  }

  findNode(val) {
    if (!this.head) {
      return null;
    }

    let curr = this.head;
    while (curr) {
      if (curr.val === val) {
        return curr;
      }
      curr = curr.next;
    }
    return null;
  }
  /* 
  getNodevalue(index) {
    if (index < 0) return -1;
    let curr = this.head;
    for (let i = 0; i < index; i++) {
      curr = curr.next;
    }
    return curr.val;
  } */
}

// instance of a linkedList
const linkedList = new LinkedList();

linkedList.addAtTail(1);
linkedList.addAtTail("Hello There");
linkedList.addAtTail("Max");
linkedList.addAtTail("Max");
linkedList.addAtTail(true);
linkedList.addAtTail(18.51);
linkedList.addAtHead("First Value");
linkedList.addAtHead("First Value");

console.log(linkedList.toArray());

linkedList.delete("Max");
linkedList.delete("First Value");
linkedList.delete(18.51);

console.log(linkedList.toArray());
console.log(`🚀 ~ linkedList.get("Max"):`, linkedList.findNode("Max"));

console.log(
  `🚀 ~ linkedList.get("Hello There"):`,
  linkedList.findNode("Hello There")
);

linkedList.insertAfter("New_Node_1", 1);
linkedList.insertAfter("New_Node_2", "Hello There");

console.log(linkedList.toArray());
/* linkedList.getNodevalue(1);
console.log("🚀 ~ linkedList.getNodevalue(1):", linkedList.getNodevalue(1));
linkedList.getNodevalue(2);
console.log("🚀 ~ linkedList.getNodevalue(2):", linkedList.getNodevalue(2)); */
