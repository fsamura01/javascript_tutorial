/**
 * Find the Duplicate Number using Floyd's Cycle Detection
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    // Phase 1: Detect Cycle
    let slow = nums[0];
    let fast = nums[0];
    
    // Find meeting point inside the cycle
    do {
        slow = nums[slow];       // Move slow pointer one step
        fast = nums[nums[fast]]; // Move fast pointer two steps
    } while (slow !== fast);
    
    // Phase 2: Find Cycle Entrance (Duplicate Number)
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
};

// Test cases
console.log(findDuplicate([1,3,4,2,2])); // Should output 2
console.log(findDuplicate([3,1,3,4,2])); // Should output 3
