/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
    // Step 1: Initialize left and right pointers
    let left = 0;
    let right = nums.length - 1;

    // Step 2: Perform binary search
    while (left <= right) {
        // Step 3: Calculate the middle index
        const mid = Math.floor((left + right) / 2);

        // Step 4: Check if the target is found
        if (nums[mid] === target) {
            return mid;
        }
        // Step 5: If the target is less than the current element,
        // the insert position is on the left side
        else if (target < nums[mid]) {
            right = mid - 1;
        }
        // Step 6: If the target is greater than the current element,
        // the insert position is on the right side
        else {
            left = mid + 1;
        }
    }

    // Step 7: If the target is not found, return the position
    // where it would be inserted in ascending order
    return left;
}

// Test cases
console.log(searchInsert([1, 3, 5, 6], 5)); // Output: 2
console.log(searchInsert([1, 3, 5, 6], 2)); // Output: 1
console.log(searchInsert([1, 3, 5, 6], 7)); // Output: 4
console.log(searchInsert([1, 3, 5, 6], 0)); // Output: 0
