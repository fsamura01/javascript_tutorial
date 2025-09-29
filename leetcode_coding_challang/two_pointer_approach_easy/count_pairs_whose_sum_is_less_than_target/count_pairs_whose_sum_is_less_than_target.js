/* Brute Force Approach */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function countPairs(nums, target) {
    let count = 0;
    const n = nums.length;
    
    // Check all possible pairs
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // If the sum is less than target, increment counter
            if (nums[i] + nums[j] < target) {
                count++;
            }
        }
    }
    
    return count;
}

/* Two Pointers Approach: */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function countPairs(nums, target) {
    // Sort the array
    nums.sort((a, b) => a - b);
    
    let count = 0;
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        if (nums[left] + nums[right] < target) {
            // All pairs with left and any index from left+1 to right are valid
            count += right - left;
            left++;
        } else {
            // Sum is too large, try a smaller value
            right--;
        }
    }
    
    return count;
}