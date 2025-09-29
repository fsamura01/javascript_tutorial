class ListNode {
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}

class MyHashSet {
  constructor() {
    this.size = 1000; // Choose a prime number for better distribution
    this.buckets = new Array(this.size).fill(null);
  }

  hash(key) {
    return key % this.size;
  }

  add(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = new ListNode(key);
      return;
    }
    let current = this.buckets[index];
    while (current) {
      if (current.key === key) return; // Key already exists
      if (!current.next) {
        current.next = new ListNode(key);
        return;
      }
      current = current.next;
    }
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

  contains(key) {
    const index = this.hash(key);
    let current = this.buckets[index];
    while (current) {
      if (current.key === key) return true;
      current = current.next;
    }
    return false;
  }
}
var obj = new MyHashSet();
obj.add(1);
obj.remove(2);
var param_3 = obj.contains(1);

class MyHashSet {
  constructor() {
    // Initialize an array with a size of 1,000,001 to cover all key values (0 to 1,000,000).
    this.storage = new Array(1000001).fill(false);
  }

  /**
   * Add the key to the HashSet.
   * @param {number} key
   * @return {void}
   */
  add(key) {
    this.storage[key] = true;
  }

  /**
   * Remove the key from the HashSet.
   * @param {number} key
   * @return {void}
   */
  remove(key) {
    this.storage[key] = false;
  }

  /**
   * Check if the key exists in the HashSet.
   * @param {number} key
   * @return {boolean}
   */
  contains(key) {
    return this.storage[key] === true;
  }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
let myHashSet = new MyHashSet();
myHashSet.add(1); // Set becomes [1]
myHashSet.add(2); // Set becomes [1, 2]
console.log(myHashSet.contains(1)); // returns true
console.log(myHashSet.contains(3)); // returns false (3 not in set)
myHashSet.add(2); // Set remains [1, 2]
console.log(myHashSet.contains(2)); // returns true
myHashSet.remove(2); // Set becomes [1]
console.log(myHashSet.contains(2)); // returns false (2 has been removed)
