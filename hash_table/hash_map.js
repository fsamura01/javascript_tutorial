class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class MyHashMap {
  constructor() {
    this.size = 1000; // Choose a prime number for better distribution
    this.buckets = new Array(this.size).fill(null);
  }

  hash(key) {
    return key % this.size;
  }

  put(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = new ListNode(key, value);
      return;
    }
    let current = this.buckets[index];
    while (current) {
      if (current.key === key) {
        current.value = value; // Update value if key exists
        return;
      }
      if (!current.next) {
        current.next = new ListNode(key, value);
        return;
      }
      current = current.next;
    }
  }

  get(key) {
    const index = this.hash(key);
    let current = this.buckets[index];
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return -1; // Key not found
  }

  remove(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) return;
    if (this.buckets[index].key === key) {
      this.buckets[index] = this.buckets[index].next;
      return;
    }
    let current = this.buckets[index];
    while (current.next) {
      if (current.next.key === key) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }
}

const myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1); // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3); // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2); // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2); // return -1 (i.e., not found), The map is now [[1,1]]
