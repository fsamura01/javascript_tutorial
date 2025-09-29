// Definition for singly-linked list node
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/**
 * Find the intersection node of two linked lists
 * Time Complexity: O(m + n) where m and n are lengths of the lists
 * Space Complexity: O(1) as we only use two pointers
 * 
 * @param {ListNode} headA - Head of the first linked list
 * @param {ListNode} headB - Head of the second linked list
 * @return {ListNode} - Intersection node or null if no intersection
 */
function getIntersectionNode(headA, headB) {
    // Handle edge cases
    if (!headA || !headB) {
        return null;
    }
    
    // Initialize pointers for both lists
    let pointerA = headA;
    let pointerB = headB;
    
    // Continue until pointers meet or both become null
    while (pointerA !== pointerB) {
        // Move pointer A to next node or switch to headB if at end
        pointerA = pointerA ? pointerA.next : headB;
        
        // Move pointer B to next node or switch to headA if at end
        pointerB = pointerB ? pointerB.next : headA;
    }
    
    // Return intersection node (or null if no intersection)
    return pointerA;
}

// Helper function to create test cases
function createIntersectedLists(listAVals, listBVals, intersectVal, skipA, skipB) {
    // Create nodes for list A
    const nodesA = listAVals.map(val => new ListNode(val));
    const nodesB = listBVals.map(val => new ListNode(val));
    
    // Link nodes in list A
    for (let i = 0; i < nodesA.length - 1; i++) {
        nodesA[i].next = nodesA[i + 1];
    }
    
    // Link nodes in list B
    for (let i = 0; i < nodesB.length - 1; i++) {
        nodesB[i].next = nodesB[i + 1];
    }
    
    // Create intersection if intersectVal is not 0
    if (intersectVal !== 0) {
        // Find intersection point in list A
        const intersectionNode = nodesA[skipA];
        
        // Connect list B to intersection point
        nodesB[skipB - 1].next = intersectionNode;
    }
    
    return { headA: nodesA[0], headB: nodesB[0] };
}

// Test cases
// Test Case 1: Lists intersect at 8
const test1 = createIntersectedLists(
    [4,1,8,4,5],
    [5,6,1,8,4,5],
    8,
    2,
    3
);
const result1 = getIntersectionNode(test1.headA, test1.headB);
console.log("Test 1:", result1 ? result1.val : null); // Expected: 8

// Test Case 2: Lists intersect at 2
const test2 = createIntersectedLists(
    [1,9,1,2,4],
    [3,2,4],
    2,
    3,
    1
);
const result2 = getIntersectionNode(test2.headA, test2.headB);
console.log("Test 2:", result2 ? result2.val : null); // Expected: 2

// Test Case 3: No intersection
const test3 = createIntersectedLists(
    [2,6,4],
    [1,5],
    0,
    3,
    2
);
const result3 = getIntersectionNode(test3.headA, test3.headB);
console.log("Test 3:", result3 ? result3.val : null); // Expected: null
