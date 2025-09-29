/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  // Edge case: empty list
  if (!head) return null;

  // Create dummy heads for our two partitions
  let smallerDummy = new ListNode(0);
  let greaterDummy = new ListNode(0);

  // Pointers to the tails of our two partitions
  let smallerTail = smallerDummy;
  let greaterTail = greaterDummy;

  // Traverse the original list
  let current = head;
  while (current) {
    if (current.val < x) {
      // Add to smaller partition
      smallerTail.next = current;
      smallerTail = smallerTail.next;
    } else {
      // Add to greater/equal partition
      greaterTail.next = current;
      greaterTail = greaterTail.next;
    }
    current = current.next;
  }

  // Connect the smaller partition to the greater partition
  smallerTail.next = greaterDummy.next;

  // Important: set the tail of the greater partition to null to avoid cycles
  greaterTail.next = null;

  // Return the head of the smaller partition (which is now the head of the entire list)
  return smallerDummy.next;
};

// Test case
const createAListFromAarray = (arr) => {
  if (arr.length === 0) return null;

  const nodes = [];

  // Create a nodes
  for (let i = 0; i < arr.length; i++) {
    nodes.push(new ListNode(arr[i]));
  }

  // Connect the nodes
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  return nodes[0];
};
const head = createAListFromAarray([1, 4, 3, 2, 5, 2]);
const x = 3;
const expected = createAListFromAarray([1, 2, 2, 4, 3, 5]);
const actual = partition(head, x);
console.log(actual);
